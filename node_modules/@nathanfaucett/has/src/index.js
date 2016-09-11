var isNative = require("@nathanfaucett/is_native"),
    getPrototypeOf = require("@nathanfaucett/get_prototype_of"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined");


var nativeHasOwnProp = Object.prototype.hasOwnProperty,
    baseHas;


module.exports = has;


function has(object, key) {
    if (isNullOrUndefined(object)) {
        return false;
    } else {
        return baseHas(object, key);
    }
}

if (isNative(nativeHasOwnProp)) {
    baseHas = function baseHas(object, key) {
        if (object.hasOwnProperty) {
            return object.hasOwnProperty(key);
        } else {
            return nativeHasOwnProp.call(object, key);
        }
    };
} else {
    baseHas = function baseHas(object, key) {
        var proto = getPrototypeOf(object);

        if (isNullOrUndefined(proto)) {
            return key in object;
        } else {
            return (key in object) && (!(key in proto) || proto[key] !== object[key]);
        }
    };
}
