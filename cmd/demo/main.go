package main

import (
	"embed"
	"flag"
	"fmt"
	"net/http"
	"os"

	"gitee.com/xuender/gca"
	"github.com/samber/lo"
	"github.com/xuender/kit/logs"
)

//go:embed www/**
var WWW embed.FS

func main() {
	flag.Usage = usage
	flag.Parse()

	http.HandleFunc("/exit", func(w http.ResponseWriter, r *http.Request) { os.Exit(0) })
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `<html>
	<head><title>GCA Demo</title></head>
	<body>
		<h1>Hello, GCA!</h1>
		<script type="text/javascript">
window.addEventListener("beforeunload",function(e){
var x=new XMLHttpRequest();
x.open("POST","/exit",true);
x.send();
e.returnValue="Ary you exit?";
});
	</script>
	</body>
</html>`)
	})

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
	// nolint: gosec
	lo.Must0(http.ListenAndServe(addr, nil))
}

func usage() {
	fmt.Fprintf(os.Stderr, "demo\n\n")
	fmt.Fprintf(os.Stderr, "TODO: demo.\n\n")
	fmt.Fprintf(os.Stderr, "Usage: %s [flags]\n", os.Args[0])
	flag.PrintDefaults()
	os.Exit(1)
}
