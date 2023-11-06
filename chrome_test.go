package gca_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/xuender/gca"
)

func TestWindowsPaths(t *testing.T) {
	t.Parallel()

	ass := assert.New(t)
	paths := gca.WindowsPaths()
	ass.Len(paths, 21)
}
