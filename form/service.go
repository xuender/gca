package form

import (
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	zhongwen "github.com/go-playground/locales/zh"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/go-playground/validator/v10/translations/zh"
	"github.com/samber/lo"
	"github.com/xuender/oils/base"
)

type Service struct {
	validate *validator.Validate
	trans    ut.Translator
}

func NewService() *Service {
	validate := validator.New()
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		if tag, has := fld.Tag.Lookup("form"); has {
			tags := Tag2Map(tag)

			return tags["label"]
		}

		return fld.Name
	})

	zhs := zhongwen.New()
	uni := ut.New(zhs, zhs)
	trans, has := uni.GetTranslator("zh")

	if !has {
		panic("缺少中文翻译")
	}

	lo.Must0(zh.RegisterDefaultTranslations(validate, trans))

	return &Service{
		validate: validate,
		trans:    trans,
	}
}

func (p *Service) Check(form any) {
	err := p.validate.Struct(form)

	if err == nil {
		return
	}
	// nolint: errorlint
	errs, ok := err.(validator.ValidationErrors)
	if !ok {
		panic("验证异常")
	}

	data := map[string]string{}
	for _, err := range errs {
		data[err.StructField()] = err.Translate(p.trans)
	}

	panic(NewResultForm(data))
}

func (p *Service) Bind(ctx *gin.Context, form any) {
	base.Must(ctx.Bind(form))
	p.Check(form)
}

// String2Map 字符串转换成 map.
func String2Map(split, equal string, elems ...string) map[string]string {
	ret := map[string]string{}

	for _, elem := range elems {
		for _, keyValue := range strings.Split(elem, split) {
			data := strings.Split(keyValue, equal)
			if len(data) > 1 {
				ret[data[0]] = data[1]

				continue
			}

			ret[data[0]] = ""
		}
	}

	return ret
}

// Tag2Map stuct 的 Tag 转换成 map.
func Tag2Map(tag string) map[string]string {
	return String2Map(",", "=", tag)
}
