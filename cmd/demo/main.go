package main

import (
	"embed"
	"flag"
	"fmt"
	"os"

	"gitee.com/xuender/gca"
	"github.com/xuender/kit/logs"
)

//go:embed www/**
var WWW embed.FS

func main() {
	isServer := false
	flag.Usage = usage
	flag.BoolVar(&isServer, "server", false, "服务模式")
	flag.Parse()

	app := gca.NewApp()
	app.Server = isServer
	app.Static("/", "www", WWW)

	addr := "127.0.0.1:9527"

	if !isServer {
		go func() {
			if err := gca.Open(
				"http://"+addr,
				gca.NewOption().Maximized(true),
			); err != nil {
				logs.E.Println(err)
				os.Exit(1)
			}
		}()
	}

	app.Run(addr)
}

func usage() {
	fmt.Fprintf(os.Stderr, "demo\n\n")
	fmt.Fprintf(os.Stderr, "TODO: demo.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
