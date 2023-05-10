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
	flag.Usage = usage
	flag.Parse()

	app := gca.NewApp()
	app.Static("/", "www", WWW)

	addr := "127.0.0.1:9527"

	go func() {
		if err := gca.Open(
			"http://"+addr,
			gca.NewOption().Maximized(true),
		); err != nil {
			logs.E.Println(err)
			os.Exit(1)
		}
	}()

	app.Run(addr)
}

func usage() {
	fmt.Fprintf(os.Stderr, "demo\n\n")
	fmt.Fprintf(os.Stderr, "TODO: demo.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
