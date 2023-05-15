package gca

import "fmt"

type Result[T any] struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
	Data    T      `json:"data"`
	Count   int    `json:"count"`
}

func NewResultError(err any) *Result[any] {
	switch err := err.(type) {
	case error:
		return newResultError(err.Error())
	case string:
		return newResultError(err)
	case fmt.Stringer:
		return newResultError(err.String())
	default:
		return newResultError(fmt.Sprintf("%v", err))
	}
}

func newResultError(err string) *Result[any] {
	return &Result[any]{Error: err}
}

func NewResult[T any](data T) *Result[T] {
	return &Result[T]{
		Success: true,
		Data:    data,
	}
}
