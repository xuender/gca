package form

import (
	"github.com/gin-gonic/gin"
	"github.com/xuender/kit/base"
	"gorm.io/gorm"
)

type QueryObj struct {
	Offset int
	Limit  int
	Order  string
	Make   uint
}

func Query(ctx *gin.Context, txdb *gorm.DB) *gorm.DB {
	query := &QueryObj{}
	if err := ctx.BindQuery(query); err == nil {
		if query.Offset > 0 {
			txdb = txdb.Offset(query.Offset)
		}

		if query.Limit == 0 {
			query.Limit = base.Hundred
		}

		txdb = txdb.Limit(query.Limit)

		if query.Order != "" {
			txdb = txdb.Order(query.Order)
		}

		if query.Make > 0 {
			txdb = txdb.Where("id>", query.Make)
		}
	}

	return txdb
}
