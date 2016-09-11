var has = require("@nathanfaucett/has"),
    isNative = require("@nathanfaucett/is_native"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined"),
    isObject = require("@nathanfaucett/is_object");


var nativeKeys = Object.keys;


module.exports = keys;


function keys(value) {
    if (isNullOrUndefined(value)) {
        return [];
    } else {
        return nativeKeys(isObject(value) ? value : Object(value));
    }
}

if (!isNative(nativeKeys)) {
    nativeKeys = function keys(value) {
        var localHas = has,
            out = [],
            i = 0,
            key;

        for (key in value) {
            if (localHas(value, key)) {
                out[i++] = key;
            }
        }

        return out;
    };
}
