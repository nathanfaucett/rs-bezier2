var keys = require("@nathanfaucett/keys"),
    clamp = require("@nathanfaucett/clamp"),
    isNaNPolyfill = require("@nathanfaucett/is_nan");


var mathf = exports,

    NativeMath = global.Math,

    hasFloat32Array = typeof(Float32Array) !== "undefined",
    NativeFloat32Array = hasFloat32Array ? Float32Array : Array;


mathf.ArrayType = NativeFloat32Array;

mathf.PI = NativeMath.PI;
mathf.TAU = mathf.PI * 2;
mathf.TWO_PI = mathf.TAU;
mathf.HALF_PI = mathf.PI * 0.5;
mathf.FOURTH_PI = mathf.PI * 0.25;

mathf.EPSILON = Number.EPSILON || NativeMath.pow(2, -52);

mathf.TO_RADS = mathf.PI / 180;
mathf.TO_DEGS = 180 / mathf.PI;

mathf.E = NativeMath.E;
mathf.LN2 = NativeMath.LN2;
mathf.LN10 = NativeMath.LN10;
mathf.LOG2E = NativeMath.LOG2E;
mathf.LOG10E = NativeMath.LOG10E;
mathf.SQRT1_2 = NativeMath.SQRT1_2;
mathf.SQRT2 = NativeMath.SQRT2;

mathf.abs = NativeMath.abs;

mathf.acos = NativeMath.acos;
mathf.acosh = NativeMath.acosh || function acosh(x) {
    return mathf.log(x + mathf.sqrt(x * x - 1));
};
mathf.asin = NativeMath.asin;
mathf.asinh = NativeMath.asinh || function asinh(x) {
    if (x === -Infinity) {
        return x;
    } else {
        return mathf.log(x + mathf.sqrt(x * x + 1));
    }
};
mathf.atan = NativeMath.atan;
mathf.atan2 = NativeMath.atan2;
mathf.atanh = NativeMath.atanh || function atanh(x) {
    return mathf.log((1 + x) / (1 - x)) / 2;
};

mathf.cbrt = NativeMath.cbrt || function cbrt(x) {
    var y = mathf.pow(mathf.abs(x), 1 / 3);
    return x < 0 ? -y : y;
};

mathf.ceil = NativeMath.ceil;

mathf.clz32 = NativeMath.clz32 || function clz32(value) {
    value = +value >>> 0;
    return value ? 32 - value.toString(2).length : 32;
};

mathf.cos = NativeMath.cos;
mathf.cosh = NativeMath.cosh || function cosh(x) {
    return (mathf.exp(x) + mathf.exp(-x)) / 2;
};

mathf.exp = NativeMath.exp;

mathf.expm1 = NativeMath.expm1 || function expm1(x) {
    return mathf.exp(x) - 1;
};

mathf.floor = NativeMath.floor;
mathf.fround = NativeMath.fround || (hasFloat32Array ?
    function fround(x) {
        return new NativeFloat32Array([x])[0];
    } :
    function fround(x) {
        return x;
    }
);

mathf.hypot = NativeMath.hypot || function hypot() {
    var y = 0,
        i = -1,
        il = arguments.length - 1,
        value;

    while (i++ < il) {
        value = arguments[i];

        if (value === Infinity || value === -Infinity) {
            return Infinity;
        } else {
            y += value * value;
        }
    }

    return mathf.sqrt(y);
};

mathf.imul = NativeMath.imul || function imul(a, b) {
    var ah = (a >>> 16) & 0xffff,
        al = a & 0xffff,
        bh = (b >>> 16) & 0xffff,
        bl = b & 0xffff;

    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
};

mathf.log = NativeMath.log;

mathf.log1p = NativeMath.log1p || function log1p(x) {
    return mathf.log(1 + x);
};

mathf.log10 = NativeMath.log10 || function log10(x) {
    return mathf.log(x) / mathf.LN10;
};

mathf.log2 = NativeMath.log2 || function log2(x) {
    return mathf.log(x) / mathf.LN2;
};

mathf.max = NativeMath.max;
mathf.min = NativeMath.min;

mathf.pow = NativeMath.pow;

mathf.random = NativeMath.random;
mathf.round = NativeMath.round;

mathf.sign = NativeMath.sign || function sign(x) {
    x = +x;
    if (x === 0 || isNaNPolyfill(x)) {
        return x;
    } else {
        return x > 0 ? 1 : -1;
    }
};

mathf.sin = NativeMath.sin;
mathf.sinh = NativeMath.sinh || function sinh(x) {
    return (mathf.exp(x) - mathf.exp(-x)) / 2;
};

mathf.sqrt = NativeMath.sqrt;

mathf.tan = NativeMath.tan;
mathf.tanh = NativeMath.tanh || function tanh(x) {
    if (x === Infinity) {
        return 1;
    } else if (x === -Infinity) {
        return -1;
    } else {
        return (mathf.exp(x) - mathf.exp(-x)) / (mathf.exp(x) + mathf.exp(-x));
    }
};

mathf.trunc = NativeMath.trunc || function trunc(x) {
    return x < 0 ? mathf.ceil(x) : mathf.floor(x);
};

mathf.equals = function(a, b, e) {
    return mathf.abs(a - b) < (e !== void(0) ? e : mathf.EPSILON);
};

mathf.modulo = function(a, b) {
    var r = a % b;
    return (r * b < 0) ? r + b : r;
};

mathf.standardRadian = function(x) {
    return mathf.modulo(x, mathf.TWO_PI);
};

mathf.standardAngle = function(x) {
    return mathf.modulo(x, 360);
};

mathf.snap = function(x, y) {
    var m = x % y;
    return m < (y * 0.5) ? x - m : x + y - m;
};

mathf.clamp = clamp;

mathf.clampBottom = function(x, min) {
    return x < min ? min : x;
};

mathf.clampTop = function(x, max) {
    return x > max ? max : x;
};

mathf.clamp01 = function(x) {
    if (x < 0) {
        return 0;
    } else if (x > 1) {
        return 1;
    } else {
        return x;
    }
};

mathf.truncate = function(x, n) {
    var p = mathf.pow(10, n),
        num = x * p;

    return (num < 0 ? mathf.ceil(num) : mathf.floor(num)) / p;
};

mathf.lerp = function(a, b, x) {
    return a + (b - a) * x;
};

mathf.lerpRadian = function(a, b, x) {
    return mathf.standardRadian(a + (b - a) * x);
};

mathf.lerpAngle = function(a, b, x) {
    return mathf.standardAngle(a + (b - a) * x);
};

mathf.lerpCos = function(a, b, x) {
    var ft = x * mathf.PI,
        f = (1 - mathf.cos(ft)) * 0.5;

    return a * (1 - f) + b * f;
};

mathf.lerpCubic = function(v0, v1, v2, v3, x) {
    var P, Q, R, S, Px, Qx, Rx;

    v0 = v0 || v1;
    v3 = v3 || v2;

    P = (v3 - v2) - (v0 - v1);
    Q = (v0 - v1) - P;
    R = v2 - v0;
    S = v1;

    Px = P * x;
    Qx = Q * x;
    Rx = R * x;

    return (Px * Px * Px) + (Qx * Qx) + Rx + S;
};

mathf.smoothStep = function(x, min, max) {
    if (x <= min) {
        return 0;
    } else {
        if (x >= max) {
            return 1;
        } else {
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        }
    }
};

mathf.smootherStep = function(x, min, max) {
    if (x <= min) {
        return 0;
    } else {
        if (x >= max) {
            return 1;
        } else {
            x = (x - min) / (max - min);
            return x * x * x * (x * (x * 6 - 15) + 10);
        }
    }
};

mathf.pingPong = function(x, length) {
    length = +length || 1;
    return length - mathf.abs(x % (2 * length) - length);
};

mathf.degsToRads = function(x) {
    return mathf.standardRadian(x * mathf.TO_RADS);
};

mathf.radsToDegs = function(x) {
    return mathf.standardAngle(x * mathf.TO_DEGS);
};

mathf.randInt = function(min, max) {
    return mathf.round(min + (mathf.random() * (max - min)));
};

mathf.randFloat = function(min, max) {
    return min + (mathf.random() * (max - min));
};

mathf.randSign = function() {
    return mathf.random() < 0.5 ? 1 : -1;
};

mathf.shuffle = function(array) {
    var i = array.length,
        j, x;

    while (i) {
        j = (mathf.random() * i--) | 0;
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }

    return array;
};

mathf.randArg = function() {
    return arguments[(mathf.random() * arguments.length) | 0];
};

mathf.randChoice = function(array) {
    return array[(mathf.random() * array.length) | 0];
};

mathf.randChoiceObject = function(object) {
    var objectKeys = keys(object);
    return object[objectKeys[(mathf.random() * objectKeys.length) | 0]];
};

mathf.isPowerOfTwo = function(x) {
    return (x & -x) === x;
};

mathf.floorPowerOfTwo = function(x) {
    var i = 2,
        prev;

    while (i < x) {
        prev = i;
        i *= 2;
    }

    return prev;
};

mathf.ceilPowerOfTwo = function(x) {
    var i = 2;

    while (i < x) {
        i *= 2;
    }

    return i;
};

var n225 = 0.39269908169872414,
    n675 = 1.1780972450961724,
    n1125 = 1.9634954084936207,
    n1575 = 2.748893571891069,
    n2025 = 3.5342917352885173,
    n2475 = 4.319689898685966,
    n2925 = 5.105088062083414,
    n3375 = 5.8904862254808625,

    RIGHT = "right",
    UP_RIGHT = "up_right",
    UP = "up",
    UP_LEFT = "up_left",
    LEFT = "left",
    DOWN_LEFT = "down_left",
    DOWN = "down",
    DOWN_RIGHT = "down_right";

mathf.directionAngle = function(a) {
    a = mathf.standardRadian(a);

    return (
        (a >= n225 && a < n675) ? UP_RIGHT :
        (a >= n675 && a < n1125) ? UP :
        (a >= n1125 && a < n1575) ? UP_LEFT :
        (a >= n1575 && a < n2025) ? LEFT :
        (a >= n2025 && a < n2475) ? DOWN_LEFT :
        (a >= n2475 && a < n2925) ? DOWN :
        (a >= n2925 && a < n3375) ? DOWN_RIGHT :
        RIGHT
    );
};

mathf.direction = function(x, y) {
    var a = mathf.standardRadian(mathf.atan2(y, x));

    return (
        (a >= n225 && a < n675) ? UP_RIGHT :
        (a >= n675 && a < n1125) ? UP :
        (a >= n1125 && a < n1575) ? UP_LEFT :
        (a >= n1575 && a < n2025) ? LEFT :
        (a >= n2025 && a < n2475) ? DOWN_LEFT :
        (a >= n2475 && a < n2925) ? DOWN :
        (a >= n2925 && a < n3375) ? DOWN_RIGHT :
        RIGHT
    );
};
