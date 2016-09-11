var isString = require("@nathanfaucett/is_string"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined");


module.exports = toString;


function toString(value) {
    if (isString(value)) {
        return value;
    } else if (isNullOrUndefined(value)) {
        return "";
    } else {
        return value + "";
    }
}
