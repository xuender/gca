package gca

import (
	"fmt"
	"io"
	"io/fs"
	"log"
	"log/slog"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/jpillora/overseer"
	"github.com/jpillora/overseer/fetcher"
	"github.com/xuender/kgin"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
	"github.com/xuender/kit/times"
	"golang.design/x/clipboard"
	"google.golang.org/protobuf/proto"
)

type App[M proto.Message] struct {
	r          *gin.Engine
	API        *gin.RouterGroup
	upGrader   websocket.Upgrader
	pro        *oss.ProcInfo
	stopCancel func()
	IsDebug    bool
	OnStart    func(*websocket.Conn)
	OnSay      func(M, *websocket.Conn)
	NewMsg     func() M
}

func NewApp[M proto.Message]() *App[M] {
	app := &App[M]{
		upGrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
		pro: oss.NewProcInfo(),
	}
	app.r = kgin.Default()
	app.r.Use(kgin.RecoveryHandler)
	app.r.GET("/ws", app.ws)
	app.API = app.r.Group("/api")
	group := app.r.Group("/app")

	group.POST("/unload", app.unload)
	group.POST("/load", app.load)
	group.POST("/clipboard", app.toClipboard)
	group.GET("/ping", app.ping)

	return app
}

func (p *App[M]) ws(ctx *gin.Context) {
	conn, err := p.upGrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		return
	}

	p.load(ctx)

	defer func() {
		conn.Close()
		p.unload(ctx)
	}()

	if p.OnStart != nil && p.OnSay != nil {
		go p.OnStart(conn)
	}

	for {
		// 读取ws中的数据
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		if mt != websocket.BinaryMessage {
			slog.Info(string(message))

			continue
		}

		if p.NewMsg == nil || p.OnSay == nil {
			continue
		}

		msg := p.NewMsg()
		if err := proto.Unmarshal(message, msg); err != nil {
			log.Println(err)

			continue
		}

		p.OnSay(msg, conn)
	}
}

func (p *App[M]) ping(ctx *gin.Context) {
	ctx.String(http.StatusOK, p.pro.String())
}

func (p *App[M]) toClipboard(ctx *gin.Context) {
	fmt := clipboard.FmtText
	if ctx.DefaultQuery("fmt", "Text") != "Text" {
		fmt = clipboard.FmtImage
	}

	clipboard.Write(fmt, los.Must(io.ReadAll(ctx.Request.Body)))
	ctx.JSON(http.StatusOK, true)
}

func (p *App[M]) unload(ctx *gin.Context) {
	slog.Info("解除加载")

	if !p.IsDebug {
		p.stopCancel = times.WithTimer(time.Second, func() {
			slog.Info("退出")

			os.Exit(0)
		})
	}

	ctx.String(http.StatusOK, "unload")
}

func (p *App[M]) load(ctx *gin.Context) {
	slog.Info("加载")

	if p.stopCancel != nil {
		p.stopCancel()
		slog.Info("取消退出")
	}

	ctx.String(http.StatusOK, "load")
}

func (p *App[M]) Static(fsys fs.FS, path string) {
	p.r.NoRoute(kgin.StaticHandler(fsys, path))
}

func getAddr(port int) string {
	if min := 1000; port < min {
		port = RandomPort()
	}

	return fmt.Sprintf("127.0.0.1:%d", port)
}

func (p *App[M]) Run(port int, upgrade string, option *Option) {
	addr := getAddr(port)

	if p.IsDebug || upgrade == "" {
		if p.OnStart != nil && p.OnSay == nil {
			go p.OnStart(nil)
		}

		if upgrade == "" {
			openUI(addr, option)
		}
		// nolint: gosec
		los.Must0(http.ListenAndServe(addr, p.r))

		return
	}
	// 平滑升级应用检查
	overseer.SanityCheck()

	cfg := overseer.Config{
		Program: func(state overseer.State) {
			slaveID := os.Getenv("OVERSEER_SLAVE_ID")
			if slaveID == "1" {
				slog.Info(addr)

				if p.OnStart != nil && p.OnSay == nil {
					go p.OnStart(nil)
				}

				openUI(addr, option)
			}

			slog.Info("升级:", "slave", slaveID)
			// nolint: gosec
			_ = http.Serve(state.Listener, p.r)
		},
		Address: addr,
	}

	if strings.HasPrefix(strings.ToLower(upgrade), "http") {
		cfg.Fetcher = &fetcher.HTTP{
			URL:      upgrade,
			Interval: time.Minute,
		}
	} else {
		cfg.Fetcher = &fetcher.File{Path: upgrade}
	}

	overseer.Run(cfg)
}

func openUI(addr string, option *Option) {
	go func() {
		if err := Window("http://"+addr, option); err != nil {
			los.Must0(err)
			os.Exit(1)
		}
	}()
}
