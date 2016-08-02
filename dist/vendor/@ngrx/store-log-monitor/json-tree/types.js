"use strict";
var compose_1 = require('@ngrx/core/compose');
exports.KNOWN = {
    Array: 'array',
    Object: 'object',
    Null: 'null',
    Undefined: 'undefined',
    Boolean: 'boolean',
    Number: 'number',
    String: 'string',
    Symbol: 'symbol',
    Function: 'function',
    Iterable: 'iterable'
};
function getTypeOf(object) {
    var literalType = typeof object;
    if (literalType === 'object') {
        if (Array.isArray(object)) {
            return exports.KNOWN.Array;
        }
        if (object === null) {
            return exports.KNOWN.Null;
        }
        if (typeof object[Symbol.iterator] === 'function') {
            return exports.KNOWN.Iterable;
        }
    }
    return literalType;
}
exports.getTypeOf = getTypeOf;
var arrayLength = function (value) { return value.length; };
var lengthLabel = function (single, plural) { return function (length) { return (length + " " + (length === 1 ? single : plural)); }; };
var typeIndicator = function (typeIndicator) { return function (input) { return (typeIndicator + " " + input); }; };
var typeIdentity = function (type) { return function () { return type; }; };
var withQuotes = function (val) { return ("\"" + val + "\""); };
var toString = function (val) { return val.toString(); };
var iterableToArray = function (value) { return Array.from(value); };
var labelFactoriesForTypes = (_a = {},
    _a[exports.KNOWN.Array] = compose_1.compose(typeIndicator('[]'), lengthLabel('item', 'items'), arrayLength),
    _a[exports.KNOWN.Object] = compose_1.compose(typeIndicator('{}'), lengthLabel('key', 'keys'), arrayLength, Object.getOwnPropertyNames),
    _a[exports.KNOWN.Null] = typeIdentity(exports.KNOWN.Null),
    _a[exports.KNOWN.Undefined] = typeIdentity(exports.KNOWN.Undefined),
    _a[exports.KNOWN.Boolean] = function (val) { return val ? 'true' : 'false'; },
    _a[exports.KNOWN.Number] = toString,
    _a[exports.KNOWN.String] = withQuotes,
    _a[exports.KNOWN.Symbol] = compose_1.compose(withQuotes, toString),
    _a[exports.KNOWN.Function] = typeIdentity(exports.KNOWN.Function),
    _a[exports.KNOWN.Iterable] = compose_1.compose(typeIndicator('()'), lengthLabel('entry', 'entries'), arrayLength, iterableToArray),
    _a
);
var lookupLabelForType = function (type) { return labelFactoriesForTypes[type]; };
exports.getLabelFor = function (object) { return labelFactoriesForTypes[getTypeOf(object)](object); };
function getChildrenFor(object) {
    var literalType = getTypeOf(object);
    if (literalType === exports.KNOWN.Object) {
        return Object.getOwnPropertyNames(object).map(function (name) {
            return { key: name, value: object[name] };
        });
    }
    else if (literalType === exports.KNOWN.Array) {
        return object.map(function (value, index) {
            return { key: index, value: value };
        });
    }
    else if (literalType === exports.KNOWN.Iterable) {
        return Array.from(object).map(function (value, index) {
            return { key: index, value: value };
        });
    }
    throw new TypeError("Tried to get children for non-enumerable type \"" + literalType + "\"");
}
exports.getChildrenFor = getChildrenFor;
var _a;
