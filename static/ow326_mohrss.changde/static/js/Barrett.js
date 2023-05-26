function BarrettMu(a) {
    this.modulus = biCopy(a);
    this.k = biHighIndex(this.modulus) + 1;
    var b = new BigInt;
    b.digits[2 * this.k] = 1;
    this.mu = biDivide(b, this.modulus);
    this.bkplus1 = new BigInt;
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod;
}

function BarrettMu_modulo(a) {
    var b = biDivideByRadixPower(a, this.k - 1);
    var c = biMultiply(b, this.mu);
    var d = biDivideByRadixPower(c, this.k + 1);
    var e = biModuloByRadixPower(a, this.k + 1);
    var f = biMultiply(d, this.modulus);
    var g = biModuloByRadixPower(f, this.k + 1);
    var h = biSubtract(e, g);
    if (h.isNeg) {
        h = biAdd(h, this.bkplus1);
    }
    var i = biCompare(h, this.modulus) >= 0;
    while (i) {
        h = biSubtract(h, this.modulus);
        i = biCompare(h, this.modulus) >= 0;
    }
    return h;
}

function BarrettMu_multiplyMod(a, b) {
    var c = biMultiply(a, b);
    return this.modulo(c);
}

function BarrettMu_powMod(a, b) {
    var c = new BigInt;
    c.digits[0] = 1;
    var d = a;
    var e = b;
    while (true) {
        if (0 != (1 & e.digits[0])) {
            c = this.multiplyMod(c, d);
        }
        e = biShiftRight(e, 1);
        if (0 == e.digits[0] && 0 == biHighIndex(e)) {
            break;
        }
        d = this.multiplyMod(d, d);
    }
    return c;
}