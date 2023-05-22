/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pb = (function() {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    pb.Author = (function() {

        /**
         * Properties of an Author.
         * @memberof pb
         * @interface IAuthor
         * @property {number|Long|null} [ID] Author ID
         * @property {string|null} [name] Author name
         */

        /**
         * Constructs a new Author.
         * @memberof pb
         * @classdesc Represents an Author.
         * @implements IAuthor
         * @constructor
         * @param {pb.IAuthor=} [properties] Properties to set
         */
        function Author(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Author ID.
         * @member {number|Long} ID
         * @memberof pb.Author
         * @instance
         */
        Author.prototype.ID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Author name.
         * @member {string} name
         * @memberof pb.Author
         * @instance
         */
        Author.prototype.name = "";

        /**
         * Creates a new Author instance using the specified properties.
         * @function create
         * @memberof pb.Author
         * @static
         * @param {pb.IAuthor=} [properties] Properties to set
         * @returns {pb.Author} Author instance
         */
        Author.create = function create(properties) {
            return new Author(properties);
        };

        /**
         * Encodes the specified Author message. Does not implicitly {@link pb.Author.verify|verify} messages.
         * @function encode
         * @memberof pb.Author
         * @static
         * @param {pb.IAuthor} message Author message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Author.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ID);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Author message, length delimited. Does not implicitly {@link pb.Author.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Author
         * @static
         * @param {pb.IAuthor} message Author message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Author.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Author message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Author
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Author} Author
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Author.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Author();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ID = reader.uint64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Author message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Author
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Author} Author
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Author.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Author message.
         * @function verify
         * @memberof pb.Author
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Author.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isInteger(message.ID) && !(message.ID && $util.isInteger(message.ID.low) && $util.isInteger(message.ID.high)))
                    return "ID: integer|Long expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates an Author message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Author
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Author} Author
         */
        Author.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Author)
                return object;
            var message = new $root.pb.Author();
            if (object.ID != null)
                if ($util.Long)
                    (message.ID = $util.Long.fromValue(object.ID)).unsigned = true;
                else if (typeof object.ID === "string")
                    message.ID = parseInt(object.ID, 10);
                else if (typeof object.ID === "number")
                    message.ID = object.ID;
                else if (typeof object.ID === "object")
                    message.ID = new $util.LongBits(object.ID.low >>> 0, object.ID.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from an Author message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Author
         * @static
         * @param {pb.Author} message Author
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Author.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.ID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ID = options.longs === String ? "0" : 0;
                object.name = "";
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (typeof message.ID === "number")
                    object.ID = options.longs === String ? String(message.ID) : message.ID;
                else
                    object.ID = options.longs === String ? $util.Long.prototype.toString.call(message.ID) : options.longs === Number ? new $util.LongBits(message.ID.low >>> 0, message.ID.high >>> 0).toNumber(true) : message.ID;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Author to JSON.
         * @function toJSON
         * @memberof pb.Author
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Author.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Author
         * @function getTypeUrl
         * @memberof pb.Author
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Author.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Author";
        };

        return Author;
    })();

    pb.Book = (function() {

        /**
         * Properties of a Book.
         * @memberof pb
         * @interface IBook
         * @property {number|Long|null} [ID] Book ID
         * @property {string|null} [title] Book title
         * @property {Array.<pb.IAuthor>|null} [authors] Book authors
         * @property {number|null} [price] Book price
         * @property {number|null} [amount] Book amount
         */

        /**
         * Constructs a new Book.
         * @memberof pb
         * @classdesc Represents a Book.
         * @implements IBook
         * @constructor
         * @param {pb.IBook=} [properties] Properties to set
         */
        function Book(properties) {
            this.authors = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Book ID.
         * @member {number|Long} ID
         * @memberof pb.Book
         * @instance
         */
        Book.prototype.ID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Book title.
         * @member {string} title
         * @memberof pb.Book
         * @instance
         */
        Book.prototype.title = "";

        /**
         * Book authors.
         * @member {Array.<pb.IAuthor>} authors
         * @memberof pb.Book
         * @instance
         */
        Book.prototype.authors = $util.emptyArray;

        /**
         * Book price.
         * @member {number} price
         * @memberof pb.Book
         * @instance
         */
        Book.prototype.price = 0;

        /**
         * Book amount.
         * @member {number} amount
         * @memberof pb.Book
         * @instance
         */
        Book.prototype.amount = 0;

        /**
         * Creates a new Book instance using the specified properties.
         * @function create
         * @memberof pb.Book
         * @static
         * @param {pb.IBook=} [properties] Properties to set
         * @returns {pb.Book} Book instance
         */
        Book.create = function create(properties) {
            return new Book(properties);
        };

        /**
         * Encodes the specified Book message. Does not implicitly {@link pb.Book.verify|verify} messages.
         * @function encode
         * @memberof pb.Book
         * @static
         * @param {pb.IBook} message Book message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Book.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ID);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.authors != null && message.authors.length)
                for (var i = 0; i < message.authors.length; ++i)
                    $root.pb.Author.encode(message.authors[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.price);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.amount);
            return writer;
        };

        /**
         * Encodes the specified Book message, length delimited. Does not implicitly {@link pb.Book.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Book
         * @static
         * @param {pb.IBook} message Book message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Book.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Book message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Book
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Book} Book
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Book.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Book();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.ID = reader.uint64();
                        break;
                    }
                case 2: {
                        message.title = reader.string();
                        break;
                    }
                case 3: {
                        if (!(message.authors && message.authors.length))
                            message.authors = [];
                        message.authors.push($root.pb.Author.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        message.price = reader.int32();
                        break;
                    }
                case 5: {
                        message.amount = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Book message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Book
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Book} Book
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Book.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Book message.
         * @function verify
         * @memberof pb.Book
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Book.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (!$util.isInteger(message.ID) && !(message.ID && $util.isInteger(message.ID.low) && $util.isInteger(message.ID.high)))
                    return "ID: integer|Long expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.authors != null && message.hasOwnProperty("authors")) {
                if (!Array.isArray(message.authors))
                    return "authors: array expected";
                for (var i = 0; i < message.authors.length; ++i) {
                    var error = $root.pb.Author.verify(message.authors[i]);
                    if (error)
                        return "authors." + error;
                }
            }
            if (message.price != null && message.hasOwnProperty("price"))
                if (!$util.isInteger(message.price))
                    return "price: integer expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (!$util.isInteger(message.amount))
                    return "amount: integer expected";
            return null;
        };

        /**
         * Creates a Book message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Book
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Book} Book
         */
        Book.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Book)
                return object;
            var message = new $root.pb.Book();
            if (object.ID != null)
                if ($util.Long)
                    (message.ID = $util.Long.fromValue(object.ID)).unsigned = true;
                else if (typeof object.ID === "string")
                    message.ID = parseInt(object.ID, 10);
                else if (typeof object.ID === "number")
                    message.ID = object.ID;
                else if (typeof object.ID === "object")
                    message.ID = new $util.LongBits(object.ID.low >>> 0, object.ID.high >>> 0).toNumber(true);
            if (object.title != null)
                message.title = String(object.title);
            if (object.authors) {
                if (!Array.isArray(object.authors))
                    throw TypeError(".pb.Book.authors: array expected");
                message.authors = [];
                for (var i = 0; i < object.authors.length; ++i) {
                    if (typeof object.authors[i] !== "object")
                        throw TypeError(".pb.Book.authors: object expected");
                    message.authors[i] = $root.pb.Author.fromObject(object.authors[i]);
                }
            }
            if (object.price != null)
                message.price = object.price | 0;
            if (object.amount != null)
                message.amount = object.amount >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Book message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Book
         * @static
         * @param {pb.Book} message Book
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Book.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.authors = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.ID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ID = options.longs === String ? "0" : 0;
                object.title = "";
                object.price = 0;
                object.amount = 0;
            }
            if (message.ID != null && message.hasOwnProperty("ID"))
                if (typeof message.ID === "number")
                    object.ID = options.longs === String ? String(message.ID) : message.ID;
                else
                    object.ID = options.longs === String ? $util.Long.prototype.toString.call(message.ID) : options.longs === Number ? new $util.LongBits(message.ID.low >>> 0, message.ID.high >>> 0).toNumber(true) : message.ID;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.authors && message.authors.length) {
                object.authors = [];
                for (var j = 0; j < message.authors.length; ++j)
                    object.authors[j] = $root.pb.Author.toObject(message.authors[j], options);
            }
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = message.price;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = message.amount;
            return object;
        };

        /**
         * Converts this Book to JSON.
         * @function toJSON
         * @memberof pb.Book
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Book.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Book
         * @function getTypeUrl
         * @memberof pb.Book
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Book.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Book";
        };

        return Book;
    })();

    pb.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof pb
         * @interface IMsg
         * @property {string|null} [data] Msg data
         * @property {number|Long|null} [number] Msg number
         */

        /**
         * Constructs a new Msg.
         * @memberof pb
         * @classdesc Represents a Msg.
         * @implements IMsg
         * @constructor
         * @param {pb.IMsg=} [properties] Properties to set
         */
        function Msg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg data.
         * @member {string} data
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.data = "";

        /**
         * Msg number.
         * @member {number|Long} number
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.number = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Msg instance using the specified properties.
         * @function create
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg=} [properties] Properties to set
         * @returns {pb.Msg} Msg instance
         */
        Msg.create = function create(properties) {
            return new Msg(properties);
        };

        /**
         * Encodes the specified Msg message. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encode
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.data);
            if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.number);
            return writer;
        };

        /**
         * Encodes the specified Msg message, length delimited. Does not implicitly {@link pb.Msg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {pb.IMsg} message Msg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Msg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Msg message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Msg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.data = reader.string();
                        break;
                    }
                case 2: {
                        message.number = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Msg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Msg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Msg} Msg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Msg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Msg message.
         * @function verify
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Msg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            if (message.number != null && message.hasOwnProperty("number"))
                if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high)))
                    return "number: integer|Long expected";
            return null;
        };

        /**
         * Creates a Msg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Msg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Msg} Msg
         */
        Msg.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Msg)
                return object;
            var message = new $root.pb.Msg();
            if (object.data != null)
                message.data = String(object.data);
            if (object.number != null)
                if ($util.Long)
                    (message.number = $util.Long.fromValue(object.number)).unsigned = false;
                else if (typeof object.number === "string")
                    message.number = parseInt(object.number, 10);
                else if (typeof object.number === "number")
                    message.number = object.number;
                else if (typeof object.number === "object")
                    message.number = new $util.LongBits(object.number.low >>> 0, object.number.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Msg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Msg
         * @static
         * @param {pb.Msg} message Msg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Msg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.data = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.number = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.number = options.longs === String ? "0" : 0;
            }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            if (message.number != null && message.hasOwnProperty("number"))
                if (typeof message.number === "number")
                    object.number = options.longs === String ? String(message.number) : message.number;
                else
                    object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
            return object;
        };

        /**
         * Converts this Msg to JSON.
         * @function toJSON
         * @memberof pb.Msg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Msg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Msg
         * @function getTypeUrl
         * @memberof pb.Msg
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Msg.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/pb.Msg";
        };

        return Msg;
    })();

    return pb;
})();

module.exports = $root;
