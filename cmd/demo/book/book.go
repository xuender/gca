package book

import (
	"gitee.com/xuender/gca/cmd/demo/pb"
	"github.com/xuender/kit/times"
	"gorm.io/gorm"
)

// nolint: gochecknoglobals
var _idworker = times.NewIDWorker()

type Book struct {
	gorm.Model
	Title  string
	Price  int
	Amount uint
}

func (p *Book) BeforeCreate(tx *gorm.DB) error {
	p.ID = uint(_idworker.ID())

	return nil
}

// FromPbBook from pb.Book.
func (p *Book) FromPbBook(elem *pb.Book) *Book {
	p.Title = elem.Title
	p.Price = int(elem.Price)
	p.Amount = uint(elem.Amount)

	return p
}

// ToPbBook to pb.Book.
func (p *Book) ToPbBook() *pb.Book {
	return &pb.Book{
		ID:     uint64(p.ID),
		Title:  p.Title,
		Price:  int32(p.Price),
		Amount: uint32(p.Amount),
	}
}

func ToPbBooks(books []*Book) []*pb.Book {
	ret := make([]*pb.Book, len(books))

	for index, book := range books {
		ret[index] = book.ToPbBook()
	}

	return ret
}
