package book

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"gitee.com/xuender/gca/cmd/demo/pb"
	"gitee.com/xuender/gca/form"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Ctrl is 图书控制.
type Ctrl struct {
	db *gorm.DB
	fs *form.Service
}

// NewCtrl creates a new instance of Ctrl.
func NewCtrl() *Ctrl {
	cache := lo.Must1(os.UserCacheDir())
	db := lo.Must1(gorm.Open(sqlite.Open(filepath.Join(cache, "demo.db")), &gorm.Config{}))

	lo.Must0(db.AutoMigrate(&Book{}))

	return &Ctrl{
		db: db,
		fs: form.NewService(),
	}
}

func (p *Ctrl) Group(router *gin.RouterGroup) {
	router.GET("/", p.List)
	router.GET("/:id", p.Get)
	router.POST("/", p.Post)
	router.PUT("/:id", p.Put)
	router.DELETE("/:id", p.Delete)
}

func (p *Ctrl) List(ctx *gin.Context) {
	ret := []*Book{}
	lo.Must0(p.db.Find(&ret).Error)

	ctx.JSON(http.StatusOK, ToPbBooks(ret))
}

func (p *Ctrl) Get(ctx *gin.Context) {
	id := lo.Must1(strconv.Atoi(ctx.Param("id")))
	book := &Book{}
	lo.Must0(p.db.First(book, id).Error)

	ctx.JSON(http.StatusOK, book.ToPbBook())
}

func (p *Ctrl) Post(ctx *gin.Context) {
	input := &pb.Book{}
	book := &Book{}

	p.fs.Bind(ctx, input)
	book.FromPbBook(input)
	lo.Must0(p.db.Create(book).Error)

	ctx.JSON(http.StatusOK, book.ToPbBook())
}

func (p *Ctrl) Put(ctx *gin.Context) {
	id := lo.Must1(strconv.Atoi(ctx.Param("id")))
	book := &Book{}
	input := &pb.Book{}

	lo.Must0(p.db.First(book, id).Error)
	lo.Must0(ctx.Bind(input))
	book.FromPbBook(input)
	lo.Must0(p.db.Save(book).Error)

	ctx.JSON(http.StatusOK, book.ToPbBook())
}

func (p *Ctrl) Delete(ctx *gin.Context) {
	id := lo.Must1(strconv.Atoi(ctx.Param("id")))

	lo.Must0(p.db.Delete(&Book{}, id).Error)

	ctx.JSON(http.StatusOK, true)
}
