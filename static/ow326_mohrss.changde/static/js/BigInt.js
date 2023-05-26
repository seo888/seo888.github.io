var biRadixBase = 2;
var biRadixBits = 16;
var bitsPerDigit = biRadixBits;
var biRadix = 1 << 16;
var biHalfRadix = biRadix >>> 1;
var biRadixSquared = biRadix * biRadix;
var maxDigitVal = biRadix - 1;
var maxInteger = 9999999999999998;
var maxDigits;
var ZERO_ARRAY;
var bigZero,
    bigOne;

function setMaxDigits(a) {
    maxDigits = a;
    ZERO_ARRAY = new Array(maxDigits);
    for (var b = 0; b < ZERO_ARRAY.length; b++) {
        ZERO_ARRAY[b] = 0;
    }
    bigZero = new BigInt;
    bigOne = new BigInt;
    bigOne.digits[0] = 1;
}

setMaxDigits(20);
var dpl10 = 15;
var lr10 = biFromNumber(1e15);

function BigInt(a) {
    if ("boolean" == typeof a && true == a) {
        this.digits = null;
    } else {
        this.digits = ZERO_ARRAY.slice(0);
    }
    this.isNeg = false;
}

function biFromDecimal(a) {
    var b = "-" == a.charAt(0);
    var c = b ? 1 : 0;
    var d;
    while (c < a.length && "0" == a.charAt(c)) {
        ++c;
    }
    if (c == a.length) {
        d = new BigInt;
    } else {
        var e = a.length - c;
        var f = e % dpl10;
        if (0 == f) {
            f = dpl10;
        }
        d = biFromNumber(Number(a.substr(c, f)));
        c += f;
        while (c < a.length) {
            d = biAdd(biMultiply(d, lr10), biFromNumber(Number(a.substr(c, dpl10))));
            c += dpl10;
        }
        d.isNeg = b;
    }
    return d;
}

function biCopy(a) {
    var b = new BigInt(true);
    b.digits = a.digits.slice(0);
    b.isNeg = a.isNeg;
    return b;
}

function biFromNumber(a) {
    var b = new BigInt;
    b.isNeg = a < 0;
    a = Math.abs(a);
    var c = 0;
    while (a > 0) {
        b.digits[c++] = a & maxDigitVal;
        a = Math.floor(a / biRadix);
    }
    return b;
}

function reverseStr(a) {
    var b = "";
    for (var c = a.length - 1; c > -1; --c) {
        b += a.charAt(c);
    }
    return b;
}

var hexatrigesimalToChar = new Array("0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z");

function biToString(a, b) {
    var c = new BigInt;
    c.digits[0] = b;
    var d = biDivideModulo(a, c);
    var e = hexatrigesimalToChar[d[1].digits[0]];
    while (1 == biCompare(d[0], bigZero)) {
        d = biDivideModulo(d[0], c);
        digit = d[1].digits[0];
        e += hexatrigesimalToChar[d[1].digits[0]];
    }
    return (a.isNeg ? "-" : "") + reverseStr(e);
}

function biToDecimal(a) {
    var b = new BigInt;
    b.digits[0] = 10;
    var c = biDivideModulo(a, b);
    var d = String(c[1].digits[0]);
    while (1 == biCompare(c[0], bigZero)) {
        c = biDivideModulo(c[0], b);
        d += String(c[1].digits[0]);
    }
    return (a.isNeg ? "-" : "") + reverseStr(d);
}

var hexToChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

function digitToHex(a) {
    var b = 15;
    var c = "";
    for (i = 0; i < 4; ++i) {
        c += hexToChar[a & b];
        a >>>= 4;
    }
    return reverseStr(c);
}

function biToHex(a) {
    var b = "";
    var c = biHighIndex(a);
    for (var d = biHighIndex(a); d > -1; --d) {
        b += digitToHex(a.digits[d]);
    }
    return b;
}

function charToHex(a) {
    var b = 48;
    var c = b + 9;
    var d = 97;
    var e = d + 25;
    var f = 65;
    var g = 65 + 25;
    var h;
    if (a >= b && a <= c) {
        h = a - b;
    } else if (a >= f && a <= g) {
        h = 10 + a - f;
    } else if (a >= d && a <= e) {
        h = 10 + a - d;
    } else {
        h = 0;
    }
    return h;
}

function hexToDigit(a) {
    var b = 0;
    var c = Math.min(a.length, 4);
    for (var d = 0; d < c; ++d) {
        b <<= 4;
        b |= charToHex(a.charCodeAt(d));
    }
    return b;
}

function biFromHex(a) {
    var b = new BigInt;
    var c = a.length;
    for (var d = c,
        e = 0;
        d > 0;
        d -= 4, ++e) {
        b.digits[e] = hexToDigit(a.substr(Math.max(d - 4, 0), Math.min(d, 4)));
    }
    return b;
}

function biFromString(a, b) {
    var c = "-" == a.charAt(0);
    var d = c ? 1 : 0;
    var e = new BigInt;
    var f = new BigInt;
    f.digits[0] = 1;
    for (var g = a.length - 1; g >= d; g--) {
        var h = a.charCodeAt(g);
        var i = charToHex(h);
        var j = biMultiplyDigit(f, i);
        e = biAdd(e, j);
        f = biMultiplyDigit(f, b);
    }
    e.isNeg = c;
    return e;
}

function biDump(a) { return (a.isNeg ? "-" : "") + a.digits.join(" ") }

function biAdd(a, b) {
    var c;
    if (a.isNeg != b.isNeg) {
        b.isNeg = !b.isNeg;
        c = biSubtract(a, b);
        b.isNeg = !b.isNeg;
    } else {
        c = new BigInt;
        var d = 0;
        var e;
        for (var f = 0; f < a.digits.length; ++f) {
            e = a.digits[f] + b.digits[f] + d;
            c.digits[f] = e % biRadix;
            d = Number(e >= biRadix);
        }
        c.isNeg = a.isNeg;
    }
    return c;
}

function biSubtract(a, b) {
    var c;
    if (a.isNeg != b.isNeg) {
        b.isNeg = !b.isNeg;
        c = biAdd(a, b);
        b.isNeg = !b.isNeg;
    } else {
        c = new BigInt;
        var d,
            e;
        e = 0;
        for (var f = 0; f < a.digits.length; ++f) {
            d = a.digits[f] - b.digits[f] + e;
            c.digits[f] = d % biRadix;
            if (c.digits[f] < 0) {
                c.digits[f] += biRadix;
            }
            e = 0 - Number(d < 0);
        }
        if (e == -1) {
            e = 0;
            for (var f = 0; f < a.digits.length; ++f) {
                d = 0 - c.digits[f] + e;
                c.digits[f] = d % biRadix;
                if (c.digits[f] < 0) {
                    c.digits[f] += biRadix;
                }
                e = 0 - Number(d < 0);
            }
            c.isNeg = !a.isNeg;
        } else {
            c.isNeg = a.isNeg;
        }
    }
    return c;
}

function biHighIndex(a) {
    var b = a.digits.length - 1;
    while (b > 0 && 0 == a.digits[b]) {
        --b;
    }
    return b;
}

function biNumBits(a) {
    var b = biHighIndex(a);
    var c = a.digits[b];
    var d = (b + 1) * bitsPerDigit;
    var e;
    for (e = d; e > d - bitsPerDigit; --e) {
        if (0 != (32768 & c)) {
            break;
        }
        c <<= 1;
    }
    return e;
}

function biMultiply(a, b) {
    var c = new BigInt;
    var d;
    var e = biHighIndex(a);
    var f = biHighIndex(b);
    var g,
        h,
        i;
    for (var k = 0; k <= f; ++k) {
        d = 0;
        i = k;
        for (j = 0; j <= e; ++j, ++i) {
            h = c.digits[i] + a.digits[j] * b.digits[k] + d;
            c.digits[i] = h & maxDigitVal;
            d = h >>> biRadixBits;
        }
        c.digits[k + e + 1] = d;
    }
    c.isNeg = a.isNeg != b.isNeg;
    return c;
}

function biMultiplyDigit(a, b) {
    var c,
        d,
        e;
    result = new BigInt;
    c = biHighIndex(a);
    d = 0;
    for (var f = 0; f <= c; ++f) {
        e = result.digits[f] + a.digits[f] * b + d;
        result.digits[f] = e & maxDigitVal;
        d = e >>> biRadixBits;
    }
    result.digits[1 + c] = d;
    return result;
}

function arrayCopy(a, b, c, d, e) {
    var f = Math.min(b + e, a.length);
    for (var g = b,
        h = d;
        g < f;
        ++g, ++h) {
        c[h] = a[g];
    }
}

var highBitMasks = new Array(0,
    32768,
    49152,
    57344,
    61440,
    63488,
    64512,
    65024,
    65280,
    65408,
    65472,
    65504,
    65520,
    65528,
    65532,
    65534,
    65535);

function biShiftLeft(a, b) {
    var c = Math.floor(b / bitsPerDigit);
    var d = new BigInt;
    arrayCopy(a.digits, 0, d.digits, c, d.digits.length - c);
    var e = b % bitsPerDigit;
    var f = bitsPerDigit - e;
    for (var g = d.digits.length - 1,
        h = g - 1;
        g > 0;
        --g, --h) {
        d.digits[g] = d.digits[g] << e & maxDigitVal | (d.digits[h] & highBitMasks[e]) >>> f;
    }
    d.digits[0] = d.digits[g] << e & maxDigitVal;
    d.isNeg = a.isNeg;
    return d;
}

var lowBitMasks = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);

function biShiftRight(a, b) {
    var c = Math.floor(b / bitsPerDigit);
    var d = new BigInt;
    arrayCopy(a.digits, c, d.digits, 0, a.digits.length - c);
    var e = b % bitsPerDigit;
    var f = bitsPerDigit - e;
    for (var g = 0,
        h = g + 1;
        g < d.digits.length - 1;
        ++g, ++h) {
        d.digits[g] = d.digits[g] >>> e | (d.digits[h] & lowBitMasks[e]) << f;
    }
    d.digits[d.digits.length - 1] >>>= e;
    d.isNeg = a.isNeg;
    return d;
}

function biMultiplyByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, 0, c.digits, b, c.digits.length - b);
    return c;
}

function biDivideByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, b, c.digits, 0, c.digits.length - b);
    return c;
}

function biModuloByRadixPower(a, b) {
    var c = new BigInt;
    arrayCopy(a.digits, 0, c.digits, 0, b);
    return c;
}

function biCompare(a, b) {
    if (a.isNeg != b.isNeg) {
        return 1 - 2 * Number(a.isNeg);
    }
    for (var c = a.digits.length - 1; c >= 0; --c) {
        if (a.digits[c] != b.digits[c]) {
            if (a.isNeg) {
                return 1 - 2 * Number(a.digits[c] > b.digits[c]);
            } else {
                return 1 - 2 * Number(a.digits[c] < b.digits[c]);
            }
        }
    }
    return 0;
}

function biDivideModulo(a, b) {
    var c = biNumBits(a);
    var d = biNumBits(b);
    var e = b.isNeg;
    var f,
        g;
    if (c < d) {
        if (a.isNeg) {
            f = biCopy(bigOne);
            f.isNeg = !b.isNeg;
            a.isNeg = false;
            b.isNeg = false;
            g = biSubtract(b, a);
            a.isNeg = true;
            b.isNeg = e;
        } else {
            f = new BigInt;
            g = biCopy(a);
        }
        return new Array(f, g);
    }
    f = new BigInt;
    g = a;
    var h = Math.ceil(d / bitsPerDigit) - 1;
    var i = 0;
    while (b.digits[h] < biHalfRadix) {
        b = biShiftLeft(b, 1);
        ++i;
        ++d;
        h = Math.ceil(d / bitsPerDigit) - 1;
    }
    g = biShiftLeft(g, i);
    c += i;
    var j = Math.ceil(c / bitsPerDigit) - 1;
    var k = biMultiplyByRadixPower(b, j - h);
    while (biCompare(g, k) != -1) {
        ++f.digits[j - h];
        g = biSubtract(g, k);
    }
    for (var l = j; l > h; --l) {
        var m = l >= g.digits.length ? 0 : g.digits[l];
        var n = l - 1 >= g.digits.length ? 0 : g.digits[l - 1];
        var o = l - 2 >= g.digits.length ? 0 : g.digits[l - 2];
        var p = h >= b.digits.length ? 0 : b.digits[h];
        var q = h - 1 >= b.digits.length ? 0 : b.digits[h - 1];
        if (m == p) {
            f.digits[l - h - 1] = maxDigitVal;
        } else {
            f.digits[l - h - 1] = Math.floor((m * biRadix + n) / p);
        }
        var r = f.digits[l - h - 1] * (p * biRadix + q);
        var s = m * biRadixSquared + (n * biRadix + o);
        while (r > s) {
            --f.digits[l - h - 1];
            r = f.digits[l - h - 1] * (p * biRadix | q);
            s = m * biRadix * biRadix + (n * biRadix + o);
        }
        k = biMultiplyByRadixPower(b, l - h - 1);
        g = biSubtract(g, biMultiplyDigit(k, f.digits[l - h - 1]));
        if (g.isNeg) {
            g = biAdd(g, k);
            --f.digits[l - h - 1];
        }
    }
    g = biShiftRight(g, i);
    f.isNeg = a.isNeg != e;
    if (a.isNeg) {
        if (e) {
            f = biAdd(f, bigOne);
        } else {
            f = biSubtract(f, bigOne);
        }
        b = biShiftRight(b, i);
        g = biSubtract(b, g);
    }
    if (0 == g.digits[0] && 0 == biHighIndex(g)) {
        g.isNeg = false;
    }
    return new Array(f, g);
}

function biDivide(a, b) { return biDivideModulo(a, b)[0] }

function biModulo(a, b) { return biDivideModulo(a, b)[1] }

function biMultiplyMod(a, b, c) { return biModulo(biMultiply(a, b), c) }

function biPow(a, b) {
    var c = bigOne;
    var d = a;
    while (true) {
        if (0 != (1 & b)) {
            c = biMultiply(c, d);
        }
        b >>= 1;
        if (0 == b) {
            break;
        }
        d = biMultiply(d, d);
    }
    return c;
}

function biPowMod(a, b, c) {
    var d = bigOne;
    var e = a;
    var f = b;
    while (true) {
        if (0 != (1 & f.digits[0])) {
            d = biMultiplyMod(d, e, c);
        }
        f = biShiftRight(f, 1);
        if (0 == f.digits[0] && 0 == biHighIndex(f)) {
            break;
        }
        e = biMultiplyMod(e, e, c);
    }
    return d;
}