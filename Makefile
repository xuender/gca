default: lint test

tools:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/cespare/reflex@latest

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

build:
	go build -o dist/gca main.go

dev-demo:
	cd cmd/demo && node_modules/@ionic/cli/bin/ionic serve -- --proxy-config proxy.conf.json
dev-demo-go:
	go run cmd/demo/main.go -server

build-demo:
	cd cmd/demo && node_modules/@ionic/cli/bin/ionic build
	echo '' > cmd/demo/www/.gitkeep

proto:
	protoc --go_out=. pb/*.proto
	# protoc-go-inject-tag -input=**/pb/*.pb.go
	# protoc --go_out=. pb/*.proto
