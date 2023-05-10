package gca

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
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

func (p *App) Run() error {
	port := os.Getenv("CS_PORT")
	if port == "" {
		port = ":8080"
	}

	if !strings.HasPrefix(port, ":") {
		port = ":" + port
	}
	// nolint: gosec
	return http.ListenAndServe(port, p.r)
}
