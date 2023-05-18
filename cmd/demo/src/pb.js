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
