package gca

import (
	"os"
	"os/exec"
	"runtime"
)

func Window(url string, option *Option) error {
	chrome := LocateChrome()
	if chrome == "" {
		return ErrNotBrowser
	}

	return exec.Command(chrome, option.Args(url)...).Run()
}

func LocateChrome() string {
	var paths []string

	switch runtime.GOOS {
	case "darwin":
		paths = darwinPaths()
	case "windows":
		paths = WindowsPaths()
	default:
		paths = unixPaths()
	}

	for _, path := range paths {
		if _, err := os.Stat(path); !os.IsNotExist(err) {
			return path
		}
	}

	return ""
}

func darwinPaths() []string {
	return []string{
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
		"/Applications/Chromium.app/Contents/MacOS/Chromium",
		"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
		"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
		"/usr/bin/google-chrome-stable",
		"/usr/bin/google-chrome",
		"/usr/bin/chromium",
		"/usr/bin/chromium-browser",
		"/usr/bin/microsoft-edge",
		"/usr/bin/brave-browser",
	}
}

func WindowsPaths() []string {
	dirs := []string{os.Getenv("LocalAppData"), os.Getenv("ProgramFiles"), os.Getenv("ProgramFiles(x86)")}
	exes := []string{
		"/Microsoft/Edge/Application/msedge.exe",
		"/Google/Chrome/Application/chrome.exe",
		"/Chromium/Application/chrome.exe",
		"/BraveSoftware/Brave-Browser/Application/brave.exe",
		"/360Chrome/Chrome/Application/360chrome.exe", // 360急速
		"/secoresdk/360se6/Application/360se.exe",     // 360安全
		"/Tencent/QQBrowser/QQBrowser.exe",            // QQ浏览器
	}
	paths := make([]string, len(dirs)*len(exes))

	for exeIndex, browser := range exes {
		for dirIndex, path := range dirs {
			paths[exeIndex*len(dirs)+dirIndex] = path + browser
		}
	}

	return paths
}

func unixPaths() []string {
	return []string{
		"/usr/bin/microsoft-edge",
		"/usr/bin/google-chrome-stable",
		"/usr/bin/google-chrome",
		"/usr/bin/chromium",
		"/usr/bin/chromium-browser",
		"/usr/bin/brave-browser",
		"/snap/bin/chromium",
		"/snap/bin/brave",
	}
}
