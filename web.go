package gca

import (
	"fmt"
	"io/fs"
	"math/rand"
	"net"
	"net/http"
	"os"
	"strconv"
	"time"

	"gitee.com/xuender/gca/form"
	"github.com/gin-gonic/gin"
	"github.com/xuender/kit/logs"
)

// StaticHandler fs.
func StaticHandler(urlPrefix string, fsys fs.FS, dir string) gin.HandlerFunc {
	if dir != "" {
		fsys, _ = fs.Sub(fsys, dir)
	}

	handler := http.FileServer(http.FS(fsys))
	if urlPrefix != "" {
		handler = http.StripPrefix(urlPrefix, handler)
	}

	return func(c *gin.Context) {
		path := c.Request.URL.Path[1:]
		if _, err := fsys.Open(path); path == "" || err == nil {
			handler.ServeHTTP(c.Writer, c.Request)
			c.Abort()
		}
	}
}

func Recovery() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				logs.E.Println("异常:", err)
				ctx.JSON(http.StatusInternalServerError, form.NewResultError(err))
				ctx.Abort()
			}
		}()

		ctx.Next()
	}
}

// RandomPort 随机可用的端口号.
func RandomPort() int {
	if old, err := strconv.Atoi(os.Getenv("GCA_PORT")); err == nil && old > 1000 {
		return old
	}

	const (
		min = 1000
		max = 9000
	)

	rand.Seed(time.Now().UnixMicro())
	// nolint: gosec
	port := rand.Intn(max) + min

	for {
		if conn, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", port)); err == nil {
			conn.Close()

			break
		}
		// nolint: gosec
		port = rand.Intn(max) + min
	}

	os.Setenv("GCA_PORT", strconv.Itoa(port))

	return port
}
