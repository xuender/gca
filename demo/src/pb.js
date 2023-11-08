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

    pb.Msg = (function() {

        /**
         * Properties of a Msg.
         * @memberof pb
         * @interface IMsg
         * @property {pb.Type|null} [type] Msg type
         * @property {string|null} [data] Msg data
         * @property {number|Long|null} [number] Msg number
         * @property {number|Long|null} [count] Msg count
         * @property {string|null} [text] Msg text
         * @property {number|Long|null} [offset] Msg offset
         * @property {Array.<string>|null} [icons] Msg icons
         * @property {Object.<string,string>|null} [info] Msg info
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
            this.icons = [];
            this.info = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Msg type.
         * @member {pb.Type} type
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.type = 0;

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
         * Msg count.
         * @member {number|Long} count
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Msg text.
         * @member {string} text
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.text = "";

        /**
         * Msg offset.
         * @member {number|Long} offset
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.offset = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Msg icons.
         * @member {Array.<string>} icons
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.icons = $util.emptyArray;

        /**
         * Msg info.
         * @member {Object.<string,string>} info
         * @memberof pb.Msg
         * @instance
         */
        Msg.prototype.info = $util.emptyObject;

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
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
            if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.number);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.count);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.text);
            if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.offset);
            if (message.icons != null && message.icons.length)
                for (var i = 0; i < message.icons.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.icons[i]);
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                for (var keys = Object.keys(message.info), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.info[keys[i]]).ldelim();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Msg(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.data = reader.string();
                        break;
                    }
                case 3: {
                        message.number = reader.int64();
                        break;
                    }
                case 4: {
                        message.count = reader.int64();
                        break;
                    }
                case 5: {
                        message.text = reader.string();
                        break;
                    }
                case 6: {
                        message.offset = reader.int64();
                        break;
                    }
                case 7: {
                        if (!(message.icons && message.icons.length))
                            message.icons = [];
                        message.icons.push(reader.string());
                        break;
                    }
                case 8: {
                        if (message.info === $util.emptyObject)
                            message.info = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.info[key] = value;
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
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            if (message.number != null && message.hasOwnProperty("number"))
                if (!$util.isInteger(message.number) && !(message.number && $util.isInteger(message.number.low) && $util.isInteger(message.number.high)))
                    return "number: integer|Long expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.offset != null && message.hasOwnProperty("offset"))
                if (!$util.isInteger(message.offset) && !(message.offset && $util.isInteger(message.offset.low) && $util.isInteger(message.offset.high)))
                    return "offset: integer|Long expected";
            if (message.icons != null && message.hasOwnProperty("icons")) {
                if (!Array.isArray(message.icons))
                    return "icons: array expected";
                for (var i = 0; i < message.icons.length; ++i)
                    if (!$util.isString(message.icons[i]))
                        return "icons: string[] expected";
            }
            if (message.info != null && message.hasOwnProperty("info")) {
                if (!$util.isObject(message.info))
                    return "info: object expected";
                var key = Object.keys(message.info);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.info[key[i]]))
                        return "info: string{k:string} expected";
            }
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
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "ping":
            case 0:
                message.type = 0;
                break;
            case "icons":
            case 1:
                message.type = 1;
                break;
            case "info":
            case 2:
                message.type = 2;
                break;
            }
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
            if (object.count != null)
                if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                else if (typeof object.count === "number")
                    message.count = object.count;
                else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
            if (object.text != null)
                message.text = String(object.text);
            if (object.offset != null)
                if ($util.Long)
                    (message.offset = $util.Long.fromValue(object.offset)).unsigned = false;
                else if (typeof object.offset === "string")
                    message.offset = parseInt(object.offset, 10);
                else if (typeof object.offset === "number")
                    message.offset = object.offset;
                else if (typeof object.offset === "object")
                    message.offset = new $util.LongBits(object.offset.low >>> 0, object.offset.high >>> 0).toNumber();
            if (object.icons) {
                if (!Array.isArray(object.icons))
                    throw TypeError(".pb.Msg.icons: array expected");
                message.icons = [];
                for (var i = 0; i < object.icons.length; ++i)
                    message.icons[i] = String(object.icons[i]);
            }
            if (object.info) {
                if (typeof object.info !== "object")
                    throw TypeError(".pb.Msg.info: object expected");
                message.info = {};
                for (var keys = Object.keys(object.info), i = 0; i < keys.length; ++i)
                    message.info[keys[i]] = String(object.info[keys[i]]);
            }
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
            if (options.arrays || options.defaults)
                object.icons = [];
            if (options.objects || options.defaults)
                object.info = {};
            if (options.defaults) {
                object.type = options.enums === String ? "ping" : 0;
                object.data = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.number = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.number = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.count = options.longs === String ? "0" : 0;
                object.text = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.offset = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.offset = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.pb.Type[message.type] === undefined ? message.type : $root.pb.Type[message.type] : message.type;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            if (message.number != null && message.hasOwnProperty("number"))
                if (typeof message.number === "number")
                    object.number = options.longs === String ? String(message.number) : message.number;
                else
                    object.number = options.longs === String ? $util.Long.prototype.toString.call(message.number) : options.longs === Number ? new $util.LongBits(message.number.low >>> 0, message.number.high >>> 0).toNumber() : message.number;
            if (message.count != null && message.hasOwnProperty("count"))
                if (typeof message.count === "number")
                    object.count = options.longs === String ? String(message.count) : message.count;
                else
                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            if (message.offset != null && message.hasOwnProperty("offset"))
                if (typeof message.offset === "number")
                    object.offset = options.longs === String ? String(message.offset) : message.offset;
                else
                    object.offset = options.longs === String ? $util.Long.prototype.toString.call(message.offset) : options.longs === Number ? new $util.LongBits(message.offset.low >>> 0, message.offset.high >>> 0).toNumber() : message.offset;
            if (message.icons && message.icons.length) {
                object.icons = [];
                for (var j = 0; j < message.icons.length; ++j)
                    object.icons[j] = message.icons[j];
            }
            var keys2;
            if (message.info && (keys2 = Object.keys(message.info)).length) {
                object.info = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.info[keys2[j]] = message.info[keys2[j]];
            }
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

    /**
     * Type enum.
     * @name pb.Type
     * @enum {number}
     * @property {number} ping=0 ping value
     * @property {number} icons=1 icons value
     * @property {number} info=2 info value
     */
    pb.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ping"] = 0;
        values[valuesById[1] = "icons"] = 1;
        values[valuesById[2] = "info"] = 2;
        return values;
    })();

    return pb;
})();

module.exports = $root;
