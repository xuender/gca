default: lint test

tools:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/cespare/reflex@latest
	go install github.com/favadi/protoc-go-inject-tag@latest

lint:
	golangci-lint run --timeout 60s --max-same-issues 50 ./...

lint-fix:
	golangci-lint run --timeout 60s --max-same-issues 50 --fix ./...

test:
	go test -race -v ./... -gcflags=all=-l -cover

watch-test:
	reflex -t 50ms -s -- sh -c 'gotest -v ./...'

clean:
	rm -rf dist

dev-demo:
	cd cmd/demo && node_modules/@ionic/cli/bin/ionic serve -- --proxy-config proxy.conf.json

dev-demo-go:
	go run cmd/demo/main.go -debug -port=9527

build-demo:
	cd demo && node_modules/@ionic/cli/bin/ionic build --prod
	echo '' > cmd/demo/www/.gitkeep

build-demo-go: build-demo
	go build -o dist/gca-demo cmd/demo/main.go

proto: protojs
	protoc --go_out=. cmd/demo/pb/*.proto

protojs:
	cd demo && node_modules/.bin/pbjs -t static-module -w commonjs -o src/pb.js ../cmd/demo/pb/*.proto
	cd demo && node_modules/.bin/pbts -o src/pb.d.ts src/pb.js

windows:
	GOOS=windows GOARCH=amd64 go build -ldflags "-H windowsgui" -o dist/demo.exe cmd/demo/main.go

