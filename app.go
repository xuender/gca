package gca

import (
	"io/fs"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type App struct {
	r *gin.Engine
}

func NewApp() *App {
	app := &App{}
	app.r = gin.Default()
	app.r.POST("/exit", app.exit)

	return app
}

func (p *App) exit(_ *gin.Context) {
	os.Exit(0)
}

func (p *App) Static(url, path string, fsys fs.FS) {
	p.r.Use(StaticHandler(url, fsys, path))
}

func (p *App) Run(addr string) {
	// nolint: gosec
	lo.Must0(http.ListenAndServe(addr, p.r))
}
