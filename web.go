package gca

import (
	"fmt"
	"io/fs"
	"math/rand"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/xuender/kit/set"
)

// RandomPort 随机可用的端口号.
func RandomPort() int {
	if old, err := strconv.Atoi(os.Getenv("GCA_PORT")); err == nil && old > 1000 {
		return old
	}

	const (
		min = 1000
		max = 9000
	)

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

// StaticHandler fs.
func StaticHandler(fsys fs.FS, dirs ...string) http.HandlerFunc {
	if len(dirs) > 0 {
		fsys, _ = fs.Sub(fsys, filepath.Join(dirs...))
	}

	var (
		handler = http.FileServer(http.FS(fsys))
		paths   = set.NewSet[string]()
	)

	return func(writer http.ResponseWriter, request *http.Request) {
		if url := strings.Trim(request.URL.Path, "/"); fsHas(url, paths, fsys) {
			// if url != "" {
			// ctx.Header(CacheControl, MaxAge1y)
			// }
			handler.ServeHTTP(writer, request)
		}
	}
}

func fsHas(path string, paths set.Set[string], fsys fs.FS) bool {
	if path == "" || paths.Has(path) {
		return true
	}

	if file, err := fsys.Open(path); err == nil {
		file.Close()
		paths.Add(path)

		return true
	}

	return false
}
