package gca_test

import (
	"testing"

	"gitee.com/xuender/gca"
	"github.com/stretchr/testify/assert"
)

func TestRandomPort(t *testing.T) {
	t.Parallel()

	assert.Greater(t, gca.RandomPort(), 1000)
}
