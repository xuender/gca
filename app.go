package gca

import (
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jpillora/overseer"
	"github.com/jpillora/overseer/fetcher"
	"github.com/samber/lo"
	"github.com/xuender/kit/logs"
	"github.com/xuender/kit/times"
	"golang.design/x/clipboard"
)

type App struct {
	r          *gin.Engine
	API        *gin.RouterGroup
	stopCancel func()
	IsDebug    bool
}

func NewApp() *App {
	app := &App{}
	app.r = gin.Default()
	app.API = app.r.Group("/api")
	group := app.r.Group("/app")

	group.POST("/unload", app.unload)
	group.POST("/load", app.load)
	group.POST("/clipboard", app.toClipboard) //
	group.GET("/ping", app.ping)

	return app
}

func (p *App) ping(ctx *gin.Context) {
	ret := map[string]any{}
	ret["msg"] = "PONG"
	ret["time"] = time.Now()
	ctx.JSON(http.StatusOK, ret)
}

func (p *App) toClipboard(ctx *gin.Context) {
	fmt := clipboard.FmtText
	if ctx.DefaultQuery("fmt", "Text") != "Text" {
		fmt = clipboard.FmtImage
	}

	clipboard.Write(fmt, lo.Must1(io.ReadAll(ctx.Request.Body)))
	ctx.JSON(http.StatusOK, true)
}

func (p *App) unload(ctx *gin.Context) {
	logs.D.Println("解除加载")

	if !p.IsDebug {
		p.stopCancel = times.WithTimer(time.Second, func() {
			logs.I.Println("退出")

			os.Exit(0)
		})
	}
}

func (p *App) load(ctx *gin.Context) {
	logs.D.Println("加载")

	if p.stopCancel != nil {
		p.stopCancel()
		logs.D.Println("取消退出")
	}
}

func (p *App) Static(url, path string, fsys fs.FS) {
	p.r.Use(StaticHandler(url, fsys, path))
}

func (p *App) Run(port int, update string, option *Option) {
	addr := fmt.Sprintf("127.0.0.1:%d", port)

	if p.IsDebug {
		// nolint: gosec
		lo.Must0(http.ListenAndServe(addr, p.r))

		return
	}
	// 平滑升级应用检查
	overseer.SanityCheck()

	cfg := overseer.Config{
		Program: func(state overseer.State) {
			if slaveID := os.Getenv("OVERSEER_SLAVE_ID"); slaveID == "1" {
				go func() {
					if err := Open("http://"+addr, option); err != nil {
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
