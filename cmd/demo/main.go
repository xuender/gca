package main

import (
	"embed"
	"flag"
	"fmt"
	"os"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/samber/lo"
	"github.com/xuender/gca"
	"github.com/xuender/gca/cmd/demo/pb"
	"github.com/xuender/kit/base"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/types"
	"google.golang.org/protobuf/proto"
)

//go:embed www
var WWW embed.FS

//go:embed icons.txt
var Icons string

// nolint: gochecknoglobals
var _icons = lo.Filter(strings.Split(Icons, "\n"), func(str string, _ int) bool { return len(str) > 0 })

func main() {
	port := 0
	flag.Usage = usage
	flag.IntVar(&port, "port", port, "Web port")
	flag.Parse()

	app := gca.NewApp[*pb.Msg]()
	app.Static(WWW, "www")
	app.OnSay = say
	app.NewMsg = func() *pb.Msg { return &pb.Msg{} }

	app.Run(port, gca.NewOption().Maximized(true))
}

func say(msg *pb.Msg, conn *websocket.Conn) {
	switch msg.GetType() {
	case pb.Type_ping:
		ping(msg, conn)
	case pb.Type_icons:
		icons(msg, conn)
	case pb.Type_info:
		info(msg, conn)
	}
}

func ping(msg *pb.Msg, conn *websocket.Conn) {
	msg.Data = time.Now().Format("2006-01-02T15:04:05Z")
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func info(msg *pb.Msg, conn *websocket.Conn) {
	ret := map[string]string{}
	ret["版本"] = "1.0.23"
	ret["用户目录"] = base.Result1(os.UserHomeDir())
	ret["当前目录"] = base.Result1(os.Getwd())
	ret["GOOS"] = runtime.GOOS
	ret["GOROOT"] = runtime.GOROOT()
	ret["GOARCH"] = runtime.GOARCH
	ret["NumCPU"] = types.Itoa(runtime.NumCPU())
	ret["NumCgoCall"] = types.Itoa(runtime.NumCgoCall())
	ret["NumGoroutine"] = types.Itoa(runtime.NumGoroutine())

	for _, env := range os.Environ() {
		if data := strings.Split(env, "="); len(data) > 1 {
			ret[data[0]] = data[1]
		}
	}

	readMem(ret)
	msg.Info = ret
	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func readMem(ret map[string]string) {
	mem := &runtime.MemStats{}
	runtime.ReadMemStats(mem)
	ret["堆空间分配的字节数"] = types.Itoa(mem.Alloc)
	ret["分配的堆空间总和"] = types.Itoa(mem.TotalAlloc)
	ret["现在使用的内存"] = types.Itoa(mem.Sys)
	ret["监视的指针数"] = types.Itoa(mem.Lookups)
	ret["Malloc的次数"] = types.Itoa(mem.Mallocs)
	ret["服务回收的heap对象数"] = types.Itoa(mem.Frees)
	ret["服务分配的堆内存"] = types.Itoa(mem.HeapAlloc)
	ret["系统分配的堆内存"] = types.Itoa(mem.HeapSys)
	ret["可用堆内存"] = types.Itoa(mem.HeapIdle)
	ret["使用的堆内存"] = types.Itoa(mem.HeapInuse)
	ret["返回给OS的堆内存"] = types.Itoa(mem.HeapReleased)
	ret["堆内存块申请的量"] = types.Itoa(mem.HeapObjects)
	ret["正在使用的栈"] = types.Itoa(mem.StackInuse)
	ret["运行栈内存"] = types.Itoa(mem.StackSys)
	ret["测试结构体使用的字节数"] = types.Itoa(mem.MSpanInuse)
	ret["测试结构体分配的字节数"] = types.Itoa(mem.MSpanSys)
	ret["结构体申请的字节数"] = types.Itoa(mem.MCacheInuse)
	ret["系统堆空间cache"] = types.Itoa(mem.MCacheSys)
	ret["剖析桶散列堆空间"] = types.Itoa(mem.BuckHashSys)
	ret["垃圾回收标记元信息内存"] = types.Itoa(mem.GCSys)
	ret["系统额外空间"] = types.Itoa(mem.OtherSys)
	ret["垃圾回收器检视的内存"] = types.Itoa(mem.NextGC)
	ret["垃圾回收器最后一次时间"] = types.Itoa(mem.LastGC)
	ret["服务暂停的次数"] = types.Itoa(mem.PauseTotalNs)
	ret["垃圾回收的内存大小"] = types.Itoa(mem.NumGC)
	ret["强制垃圾回收次数"] = types.Itoa(mem.NumForcedGC)
	ret["垃圾回收CPU工作的时间"] = types.Itoa(mem.GCCPUFraction)
	ret["是否启用GC"] = strconv.FormatBool(mem.EnableGC)
	ret["是否调试GC"] = strconv.FormatBool(mem.DebugGC)
}

func icons(msg *pb.Msg, conn *websocket.Conn) {
	data := _icons

	if msg.GetText() != "" {
		data = lo.Filter(data, func(name string, _ int) bool {
			return strings.Contains(name, msg.GetText())
		})
	}

	left := int(msg.GetOffset())
	if left >= len(data) {
		left = len(data)
	}

	right := left + base.Hundred
	if right >= len(data) {
		right = len(data)
	}

	msg.Icons = data[left:right]
	msg.Count = int64(len(_icons))

	los.Must0(conn.WriteMessage(websocket.BinaryMessage, los.Must(proto.Marshal(msg))))
}

func usage() {
	fmt.Fprintf(os.Stderr, "demo\n\n")
	fmt.Fprintf(os.Stderr, "GCA demo.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
