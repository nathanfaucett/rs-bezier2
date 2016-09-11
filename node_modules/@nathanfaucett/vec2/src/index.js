var mathf = require("@nathanfaucett/mathf"),
    isNumber = require("@nathanfaucett/is_number");


var vec2 = exports;


vec2.ArrayType = typeof(Float32Array) !== "undefined" ? Float32Array : mathf.ArrayType;


vec2.create = function(x, y) {
    var out = new vec2.ArrayType(2);

    out[0] = isNumber(x) ? x : 0;
    out[1] = isNumber(y) ? y : 0;

    return out;
};

vec2.copy = function(out, a) {

    out[0] = a[0];
    out[1] = a[1];

    return out;
};

vec2.clone = function(a) {
    var out = new vec2.ArrayType(2);

    out[0] = a[0];
    out[1] = a[1];

    return out;
};

vec2.set = function(out, x, y) {

    out[0] = isNumber(x) ? x : 0;
    out[1] = isNumber(y) ? y : 0;

    return out;
};

vec2.add = function(out, a, b) {

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];

    return out;
};

vec2.sub = function(out, a, b) {

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];

    return out;
};

vec2.mul = function(out, a, b) {

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];

    return out;
};

vec2.div = function(out, a, b) {
    var bx = b[0],
        by = b[1];

    out[0] = a[0] * (bx !== 0 ? 1 / bx : bx);
    out[1] = a[1] * (by !== 0 ? 1 / by : by);

    return out;
};

vec2.sadd = function(out, a, s) {

    out[0] = a[0] + s;
    out[1] = a[1] + s;

    return out;
};

vec2.ssub = function(out, a, s) {

    out[0] = a[0] - s;
    out[1] = a[1] - s;

    return out;
};

vec2.smul = function(out, a, s) {

    out[0] = a[0] * s;
    out[1] = a[1] * s;

    return out;
};

vec2.sdiv = function(out, a, s) {
    s = s !== 0 ? 1 / s : s;

    out[0] = a[0] * s;
    out[1] = a[1] * s;

    return out;
};

vec2.lengthSqValues = function(x, y) {
    return x * x + y * y;
};

vec2.lengthValues = function(x, y) {
    var lsq = vec2.lengthSqValues(x, y);
    return lsq !== 0 ? mathf.sqrt(lsq) : lsq;
};

vec2.invLengthValues = function(x, y) {
    var lsq = vec2.lengthSqValues(x, y);
    return lsq !== 0 ? 1 / mathf.sqrt(lsq) : lsq;
};

vec2.cross = function(a, b) {
    return a[0] * b[1] - a[1] * b[0];
};

vec2.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

vec2.lengthSq = function(a) {
    return vec2.dot(a, a);
};

vec2.length = function(a) {
    var lsq = vec2.lengthSq(a);
    return lsq !== 0 ? mathf.sqrt(lsq) : lsq;
};

vec2.invLength = function(a) {
    var lsq = vec2.lengthSq(a);
    return lsq !== 0 ? 1 / mathf.sqrt(lsq) : lsq;
};

vec2.setLength = function(out, a, length) {
    var x = a[0],
        y = a[1],
        s = length * vec2.invLengthValues(x, y);

    out[0] = x * s;
    out[1] = y * s;

    return out;
};

vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        invlsq = vec2.invLengthValues(x, y);

    out[0] = x * invlsq;
    out[1] = y * invlsq;

    return out;
};

vec2.inverse = function(out, a) {

    out[0] = a[0] * -1;
    out[1] = a[1] * -1;

    return out;
};

vec2.lerp = function(out, a, b, x) {
    var lerp = mathf.lerp;

    out[0] = lerp(a[0], b[0], x);
    out[1] = lerp(a[1], b[1], x);

    return out;
};

vec2.perp = function(out, a) {

    out[0] = a[1];
    out[1] = -a[0];

    return out;
};

vec2.perpR = function(out, a) {

    out[0] = -a[1];
    out[1] = a[0];

    return out;
};

vec2.angle = function(a, b) {
    return Math.acos(vec2.dot(a, b) / (vec2.length(a) * vec2.length(b)));
};

vec2.min = function(out, a, b) {
    var ax = a[0],
        ay = a[1],
        bx = b[0],
        by = b[1];

    out[0] = bx < ax ? bx : ax;
    out[1] = by < ay ? by : ay;

    return out;
};

vec2.max = function(out, a, b) {
    var ax = a[0],
        ay = a[1],
        bx = b[0],
        by = b[1];

    out[0] = bx > ax ? bx : ax;
    out[1] = by > ay ? by : ay;

    return out;
};

vec2.clamp = function(out, a, min, max) {
    var x = a[0],
        y = a[1],
        minx = min[0],
        miny = min[1],
        maxx = max[0],
        maxy = max[1];

    out[0] = x < minx ? minx : x > maxx ? maxx : x;
    out[1] = y < miny ? miny : y > maxy ? maxy : y;

    return out;
};

vec2.transformAngle = function(out, a, angle) {
    var x = a[0],
        y = a[1],
        c = mathf.cos(angle),
        s = mathf.sin(angle);

    out[0] = x * c - y * s;
    out[1] = x * s + y * c;

    return out;
};

vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];

    out[0] = x * m[0] + y * m[2];
    out[1] = x * m[1] + y * m[3];

    return out;
};

vec2.transformMat32 = function(out, a, m) {
    var x = a[0],
        y = a[1];

    out[0] = x * m[0] + y * m[2] + m[4];
    out[1] = x * m[1] + y * m[3] + m[5];

    return out;
};

vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];

    out[0] = x * m[0] + y * m[3] + m[6];
    out[1] = x * m[1] + y * m[4] + m[7];

    return out;
};

vec2.transformMat4 = function(out, a, m) {
    var x = a[0],
        y = a[1];

    out[0] = x * m[0] + y * m[4] + m[12];
    out[1] = x * m[1] + y * m[5] + m[13];

    return out;
};

vec2.transformProjection = function(out, a, m) {
    var x = a[0],
        y = a[1],
        d = x * m[3] + y * m[7] + m[11] + m[15];

    d = d !== 0 ? 1 / d : d;

    out[0] = (x * m[0] + y * m[4] + m[12]) * d;
    out[1] = (x * m[1] + y * m[5] + m[13]) * d;

    return out;
};

vec2.positionFromMat32 = function(out, m) {

    out[0] = m[4];
    out[1] = m[5];

    return out;
};

vec2.positionFromMat4 = function(out, m) {

    out[0] = m[12];
    out[1] = m[13];

    return out;
};

vec2.scaleFromMat2 = function(out, m) {

    out[0] = vec2.lengthValues(m[0], m[2]);
    out[1] = vec2.lengthValues(m[1], m[3]);

    return out;
};

vec2.scaleFromMat32 = vec2.scaleFromMat2;

vec2.scaleFromMat3 = function(out, m) {

    out[0] = vec2.lengthValues(m[0], m[3]);
    out[1] = vec2.lengthValues(m[1], m[4]);

    return out;
};

vec2.scaleFromMat4 = function(out, m) {

    out[0] = vec2.lengthValues(m[0], m[4]);
    out[1] = vec2.lengthValues(m[1], m[5]);

    return out;
};

vec2.equal = function(a, b) {
    return !(
        a[0] !== b[0] ||
        a[1] !== b[1]
    );
};

vec2.notEqual = function(a, b) {
    return (
        a[0] !== b[0] ||
        a[1] !== b[1]
    );
};

vec2.str = function(out) {
    return "Vec2(" + out[0] + ", " + out[1] + ")";
};

vec2.string = vec2.toString = vec2.str;
