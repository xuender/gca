package gca_test

import (
	"testing"

	"gitee.com/xuender/gca"
	"github.com/stretchr/testify/assert"
)

func TestWindowsPaths(t *testing.T) {
	t.Parallel()

	ass := assert.New(t)
	paths := gca.WindowsPaths()
	ass.Len(paths, 21)
}
