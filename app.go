package gca

import (
	"fmt"
	"io/fs"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/times"
	"google.golang.org/protobuf/proto"
)

const DebugPort = 8080

type App[M proto.Message] struct {
	upGrader   websocket.Upgrader
	stopCancel func()
	isDebug    bool
	OnStart    func(*websocket.Conn)
	OnSay      func(M, *websocket.Conn)
	NewMsg     func() M
}

func NewApp[M proto.Message]() *App[M] {
	app := &App[M]{
		upGrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
	}

	return app
}

func (p *App[M]) ws(writer http.ResponseWriter, request *http.Request) {
	conn, err := p.upGrader.Upgrade(writer, request, nil)
	if err != nil {
		return
	}

	p.load()

	defer func() {
		conn.Close()
		p.unload()
	}()

	if p.OnStart != nil && p.OnSay != nil {
		go p.OnStart(conn)
	}

	for {
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

func (p *App[M]) unload() {
	slog.Info("unload")

	if !p.isDebug {
		p.stopCancel = times.WithTimer(time.Second, func() {
			slog.Info("exit")

			os.Exit(0)
		})
	}
}

func (p *App[M]) load() {
	slog.Info("load")

	if p.stopCancel != nil {
		p.stopCancel()
		slog.Info("load cancel")
	}
}

func (p *App[M]) Static(fsys fs.FS, path string) {
	http.HandleFunc("/", StaticHandler(fsys, path))
}

func getAddr(port int) string {
	if min := 1000; port < min {
		port = RandomPort()
	}

	return fmt.Sprintf("127.0.0.1:%d", port)
}

func (p *App[M]) Run(port int, option *Option) {
	addr := getAddr(port)
	p.isDebug = port == DebugPort

	if p.OnStart != nil && p.OnSay == nil {
		go p.OnStart(nil)
	}

	if !p.isDebug {
		go func() {
			if err := Window("http://"+addr, option); err != nil {
				los.Must0(err)
				os.Exit(1)
			}
		}()
	}

	http.HandleFunc("/ws", p.ws)
	// nolint: gosec
	los.Must0(http.ListenAndServe(addr, nil))
}
