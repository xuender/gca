package form_test

import (
	"testing"

	"gitee.com/xuender/gca/form"
	"github.com/stretchr/testify/assert"
)

type testForm struct {
	Name string `json:"name,omitempty" validate:"required,min=2,max=20" form:"label=姓名"`
}

func TestService_Check(t *testing.T) {
	t.Parallel()

	ass := assert.New(t)
	service := form.NewService()

	ass.Panics(func() {
		service.Check(&testForm{})
	})
}
