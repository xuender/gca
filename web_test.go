package gca_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/xuender/gca"
)

func TestRandomPort(t *testing.T) {
	t.Parallel()

	assert.Greater(t, gca.RandomPort(), 1000)
}
