package form

import "fmt"

type Result[T any] struct {
	Success bool              `json:"success"`
	Data    T                 `json:"data,omitempty"`
	Error   string            `json:"error,omitempty"`
	Form    map[string]string `json:"form,omitempty"`
	Count   int               `json:"count,omitempty"`
	Page    int               `json:"page,omitempty"`
	Limit   int               `json:"limit,omitempty"`
}

func NewResult[T any](data T) *Result[T] {
	return &Result[T]{Success: true, Data: data}
}

func NewResultError(data any) *Result[any] {
	switch err := data.(type) {
	case error:
		return &Result[any]{Error: err.Error()}
	case string:
		return &Result[any]{Error: err}
	case fmt.Stringer:
		return &Result[any]{Error: err.String()}
	case *Result[any]:
		return err
	default:
		return &Result[any]{Error: fmt.Sprintf("%v", err)}
	}
}

func NewResultForm(data map[string]string) *Result[any] {
	return &Result[any]{Error: "校验错误", Form: data}
}
