package gca

import (
	"io/fs"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"github.com/xuender/kit/logs"
	"github.com/xuender/kit/times"
)

type App struct {
	r          *gin.Engine
	API        *gin.RouterGroup
	stopCancel func()
	Server     bool
}

func NewApp() *App {
	app := &App{}
	app.r = gin.Default()
	app.API = app.r.Group("/api")
	group := app.r.Group("/app")

	group.POST("/unload", app.unload)
	group.POST("/load", app.load)

	return app
}

func (p *App) unload(ctx *gin.Context) {
	logs.D.Println("解除加载")

	if !p.Server {
		p.stopCancel = times.WithTimer(time.Second, func() {
			logs.D.Println("退出")

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

func (p *App) Run(addr string) {
	// nolint: gosec
	lo.Must0(http.ListenAndServe(addr, p.r))
}
