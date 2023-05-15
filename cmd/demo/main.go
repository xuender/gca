package main

import (
	"embed"
	"flag"
	"fmt"
	"net/http"
	"os"
	"runtime"
	"strings"

	"gitee.com/xuender/gca"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"github.com/xuender/kit/base"
	"github.com/xuender/kit/logs"
)

//go:embed www/**
var WWW embed.FS

//go:embed icons.txt
var Icons string

// nolint: gochecknoglobals
var _icons = lo.Filter(strings.Split(Icons, "\n"), func(str string, _ int) bool { return len(str) > 0 })

func main() {
	isDebug := false
	update := ""
	port := 9527
	flag.Usage = usage
	flag.BoolVar(&isDebug, "debug", false, "调试模式")
	flag.StringVar(&update, "update", "/tmp/demo.update", "升级网址或文件")
	flag.IntVar(&port, "port", port, "本地端口号")
	flag.Parse()

	if !isDebug {
		gin.SetMode(gin.ReleaseMode)
		logs.SetLevel(logs.Info)
	}

	app := gca.NewApp()
	app.IsDebug = isDebug
	app.Static("/", "www", WWW)
	app.API.POST("/icons", icons)
	app.API.GET("/info", info)

	app.Run(port, update, gca.NewOption().Maximized(true))
}

func info(ctx *gin.Context) {
	ret := map[string]any{}
	ret["版本"] = "1.0.23"
	ret["用户目录"] = base.Result1(os.UserHomeDir())
	ret["当前目录"] = base.Result1(os.Getwd())
	ret["GOOS"] = runtime.GOOS
	ret["GOROOT"] = runtime.GOROOT()
	ret["GOARCH"] = runtime.GOARCH
	ret["NumCPU"] = runtime.NumCPU()
	ret["NumCgoCall"] = runtime.NumCgoCall()
	ret["NumGoroutine"] = runtime.NumGoroutine()

	for _, env := range os.Environ() {
		if data := strings.Split(env, "="); len(data) > 1 {
			ret[data[0]] = data[1]
		}
	}

	readMem(ret)
	ctx.JSON(http.StatusOK, ret)
}

func readMem(ret map[string]any) {
	mem := &runtime.MemStats{}
	runtime.ReadMemStats(mem)
	ret["堆空间分配的字节数"] = mem.Alloc
	ret["分配的堆空间总和"] = mem.TotalAlloc
	ret["现在使用的内存"] = mem.Sys
	ret["监视的指针数"] = mem.Lookups
	ret["Malloc的次数"] = mem.Mallocs
	ret["服务回收的heap对象数"] = mem.Frees
	ret["服务分配的堆内存"] = mem.HeapAlloc
	ret["系统分配的堆内存"] = mem.HeapSys
	ret["可用堆内存"] = mem.HeapIdle
	ret["使用的堆内存"] = mem.HeapInuse
	ret["返回给OS的堆内存"] = mem.HeapReleased
	ret["堆内存块申请的量"] = mem.HeapObjects
	ret["正在使用的栈"] = mem.StackInuse
	ret["运行栈内存"] = mem.StackSys
	ret["测试结构体使用的字节数"] = mem.MSpanInuse
	ret["测试结构体分配的字节数"] = mem.MSpanSys
	ret["结构体申请的字节数"] = mem.MCacheInuse
	ret["系统堆空间cache"] = mem.MCacheSys
	ret["剖析桶散列堆空间"] = mem.BuckHashSys
	ret["垃圾回收标记元信息内存"] = mem.GCSys
	ret["系统额外空间"] = mem.OtherSys
	ret["垃圾回收器检视的内存"] = mem.NextGC
	ret["垃圾回收器最后一次时间"] = mem.LastGC
	ret["服务暂停的次数"] = mem.PauseTotalNs
	ret["垃圾回收的内存大小"] = mem.NumGC
	ret["强制垃圾回收次数"] = mem.NumForcedGC
	ret["垃圾回收CPU工作的时间"] = mem.GCCPUFraction
	ret["是否启用GC"] = mem.EnableGC
	ret["是否调试GC"] = mem.DebugGC
}

type Query struct {
	Text  string
	Limit int
}

func icons(ctx *gin.Context) {
	query := &Query{}
	_ = ctx.Bind(query)
	data := _icons

	if query.Text != "" {
		data = lo.Filter(data, func(name string, _ int) bool {
			return strings.Contains(name, query.Text)
		})
	}

	ret := &gca.Result[[]string]{}

	left := query.Limit
	if left >= len(data) {
		left = len(data)
	}

	right := left + base.Hundred
	if right >= len(data) {
		right = len(data)
	}

	ret.Data = data[left:right]
	ret.Count = len(data)

	ctx.JSON(http.StatusOK, ret)
}

func usage() {
	fmt.Fprintf(os.Stderr, "demo\n\n")
	fmt.Fprintf(os.Stderr, "GCA demo.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
