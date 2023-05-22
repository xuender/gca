// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0-devel
// 	protoc        v3.14.0
// source: cmd/demo/pb/book.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// Book 图书.
type Book struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// ID 主健.
	ID uint64 `protobuf:"varint,1,opt,name=ID,proto3" json:"ID,omitempty"`
	// Title 书籍标题.
	// @gotags: validate:"required,min=1,max=20" form:"label=标题"
	Title string `protobuf:"bytes,2,opt,name=title,proto3" json:"title,omitempty" validate:"required,min=1,max=20" form:"label=标题"`
	// Authors 作者们.
	Authors []*Author `protobuf:"bytes,3,rep,name=authors,proto3" json:"authors,omitempty"`
	// Price 单位分.
	// @gotags: validate:"gte=-1000,lte=1000000" form:"label=单价"
	Price int32 `protobuf:"varint,4,opt,name=price,proto3" json:"price,omitempty" validate:"gte=-1000,lte=1000000" form:"label=单价"`
	// Amount 库存数量.
	// @gotags: validate:"gte=0,lte=1000000" form:"label=库存"
	Amount uint32 `protobuf:"varint,5,opt,name=amount,proto3" json:"amount,omitempty" validate:"gte=0,lte=1000000" form:"label=库存"`
}

func (x *Book) Reset() {
	*x = Book{}
	if protoimpl.UnsafeEnabled {
		mi := &file_cmd_demo_pb_book_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Book) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Book) ProtoMessage() {}

func (x *Book) ProtoReflect() protoreflect.Message {
	mi := &file_cmd_demo_pb_book_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Book.ProtoReflect.Descriptor instead.
func (*Book) Descriptor() ([]byte, []int) {
	return file_cmd_demo_pb_book_proto_rawDescGZIP(), []int{0}
}

func (x *Book) GetID() uint64 {
	if x != nil {
		return x.ID
	}
	return 0
}

func (x *Book) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *Book) GetAuthors() []*Author {
	if x != nil {
		return x.Authors
	}
	return nil
}

func (x *Book) GetPrice() int32 {
	if x != nil {
		return x.Price
	}
	return 0
}

func (x *Book) GetAmount() uint32 {
	if x != nil {
		return x.Amount
	}
	return 0
}

var File_cmd_demo_pb_book_proto protoreflect.FileDescriptor

var file_cmd_demo_pb_book_proto_rawDesc = []byte{
	0x0a, 0x16, 0x63, 0x6d, 0x64, 0x2f, 0x64, 0x65, 0x6d, 0x6f, 0x2f, 0x70, 0x62, 0x2f, 0x62, 0x6f,
	0x6f, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x02, 0x70, 0x62, 0x1a, 0x18, 0x63, 0x6d,
	0x64, 0x2f, 0x64, 0x65, 0x6d, 0x6f, 0x2f, 0x70, 0x62, 0x2f, 0x61, 0x75, 0x74, 0x68, 0x6f, 0x72,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x80, 0x01, 0x0a, 0x04, 0x42, 0x6f, 0x6f, 0x6b, 0x12,
	0x0e, 0x0a, 0x02, 0x49, 0x44, 0x18, 0x01, 0x20, 0x01, 0x28, 0x04, 0x52, 0x02, 0x49, 0x44, 0x12,
	0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x24, 0x0a, 0x07, 0x61, 0x75, 0x74, 0x68, 0x6f, 0x72, 0x73,
	0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x0a, 0x2e, 0x70, 0x62, 0x2e, 0x41, 0x75, 0x74, 0x68,
	0x6f, 0x72, 0x52, 0x07, 0x61, 0x75, 0x74, 0x68, 0x6f, 0x72, 0x73, 0x12, 0x14, 0x0a, 0x05, 0x70,
	0x72, 0x69, 0x63, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x70, 0x72, 0x69, 0x63,
	0x65, 0x12, 0x16, 0x0a, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28,
	0x0d, 0x52, 0x06, 0x61, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x42, 0x0f, 0x5a, 0x0d, 0x2e, 0x2f, 0x63,
	0x6d, 0x64, 0x2f, 0x64, 0x65, 0x6d, 0x6f, 0x2f, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var (
	file_cmd_demo_pb_book_proto_rawDescOnce sync.Once
	file_cmd_demo_pb_book_proto_rawDescData = file_cmd_demo_pb_book_proto_rawDesc
)

func file_cmd_demo_pb_book_proto_rawDescGZIP() []byte {
	file_cmd_demo_pb_book_proto_rawDescOnce.Do(func() {
		file_cmd_demo_pb_book_proto_rawDescData = protoimpl.X.CompressGZIP(file_cmd_demo_pb_book_proto_rawDescData)
	})
	return file_cmd_demo_pb_book_proto_rawDescData
}

var file_cmd_demo_pb_book_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_cmd_demo_pb_book_proto_goTypes = []interface{}{
	(*Book)(nil),   // 0: pb.Book
	(*Author)(nil), // 1: pb.Author
}
var file_cmd_demo_pb_book_proto_depIdxs = []int32{
	1, // 0: pb.Book.authors:type_name -> pb.Author
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_cmd_demo_pb_book_proto_init() }
func file_cmd_demo_pb_book_proto_init() {
	if File_cmd_demo_pb_book_proto != nil {
		return
	}
	file_cmd_demo_pb_author_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_cmd_demo_pb_book_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Book); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_cmd_demo_pb_book_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_cmd_demo_pb_book_proto_goTypes,
		DependencyIndexes: file_cmd_demo_pb_book_proto_depIdxs,
		MessageInfos:      file_cmd_demo_pb_book_proto_msgTypes,
	}.Build()
	File_cmd_demo_pb_book_proto = out.File
	file_cmd_demo_pb_book_proto_rawDesc = nil
	file_cmd_demo_pb_book_proto_goTypes = nil
	file_cmd_demo_pb_book_proto_depIdxs = nil
}