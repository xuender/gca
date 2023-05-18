package gca

import (
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/jpillora/overseer"
	"github.com/jpillora/overseer/fetcher"
	"github.com/samber/lo"
	"github.com/xuender/kit/logs"
	"github.com/xuender/kit/times"
	"golang.design/x/clipboard"
	"google.golang.org/protobuf/proto"
)

type App[M proto.Message] struct {
	r          *gin.Engine
	API        *gin.RouterGroup
	upGrader   websocket.Upgrader
	stopCancel func()
	IsDebug    bool
	OnStart    func()
	OnSay      func(M, *websocket.Conn)
	NewMsg     func() M
}

func NewApp[M proto.Message]() *App[M] {
	app := &App[M]{
		upGrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
	}
	app.r = gin.Default()
	app.r.Use(Recovery)
	app.r.GET("/ws", app.ws)
	app.API = app.r.Group("/api")
	group := app.r.Group("/app")

	group.POST("/unload", app.unload)
	group.POST("/load", app.load)
	group.POST("/clipboard", app.toClipboard) //
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

	for {
		// 读取ws中的数据
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		if mt != websocket.BinaryMessage {
			logs.D.Println(string(message))

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
	ctx.JSON(http.StatusOK, NewResult(time.Now()))
}

func (p *App[M]) toClipboard(ctx *gin.Context) {
	fmt := clipboard.FmtText
	if ctx.DefaultQuery("fmt", "Text") != "Text" {
		fmt = clipboard.FmtImage
	}

	clipboard.Write(fmt, lo.Must1(io.ReadAll(ctx.Request.Body)))
	ctx.JSON(http.StatusOK, NewResult(true))
}

func (p *App[M]) unload(ctx *gin.Context) {
	logs.D.Println("解除加载")

	if !p.IsDebug {
		p.stopCancel = times.WithTimer(time.Second, func() {
			logs.I.Println("退出")

			os.Exit(0)
		})
	}
}

func (p *App[M]) load(ctx *gin.Context) {
	logs.D.Println("加载")

	if p.stopCancel != nil {
		p.stopCancel()
		logs.D.Println("取消退出")
	}
}

func (p *App[M]) Static(url, path string, fsys fs.FS) {
	p.r.Use(StaticHandler(url, fsys, path))
}

func (p *App[M]) Run(port int, update string, option *Option) {
	if min := 1000; port < min {
		port = RandomPort()
	}

	addr := fmt.Sprintf("127.0.0.1:%d", port)

	if p.IsDebug {
		if p.OnStart != nil {
			go p.OnStart()
		}
		// nolint: gosec
		lo.Must0(http.ListenAndServe(addr, p.r))

		return
	}
	// 平滑升级应用检查
	overseer.SanityCheck()

	cfg := overseer.Config{
		Program: func(state overseer.State) {
			if slaveID := os.Getenv("OVERSEER_SLAVE_ID"); slaveID == "1" {
				logs.I.Println(addr)

				if p.OnStart != nil {
					go p.OnStart()
				}

				go func() {
					if err := Window("http://"+addr, option); err != nil {
						logs.E.Println(err)
						os.Exit(1)
					}
				}()
			} else {
				logs.I.Println("升级:", slaveID)
			}
			// nolint: gosec
			_ = http.Serve(state.Listener, p.r)
		},
		Address: addr,
	}

	if strings.HasPrefix(strings.ToLower(update), "http") {
		cfg.Fetcher = &fetcher.HTTP{
			URL:      update,
			Interval: time.Minute,
		}
	} else {
		cfg.Fetcher = &fetcher.File{Path: update}
	}

	overseer.Run(cfg)
}
