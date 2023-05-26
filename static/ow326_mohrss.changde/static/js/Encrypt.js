function RSAKeyPair(a, b, c) {
    this.e = biFromHex(a);
    this.d = biFromHex(b);
    this.m = biFromHex(c);
    this.digitSize = 2 * biHighIndex(this.m) + 2;
    this.chunkSize = this.digitSize - 11;
    this.radix = 16;
    this.barrett = new BarrettMu(this.m);
}

function twoDigit(a) {
    return (a < 10 ? "0" : "") + String(a);
}

function encryptedString(a, b) {
    if (a.chunkSize > a.digitSize - 11) {
        return "Error";
    }
    var c = new Array;
    var d = b.length;
    var e = 0;
    while (e < d) {
        c[e] = b.charCodeAt(e);
        e++;
    }
    var f = c.length;
    var g = "";
    var h,
        i,
        j;
    for (e = 0; e < f; e += a.chunkSize) {
        j = new BigInt;
        h = 0;
        var k;
        var l = e + a.chunkSize > f ? f % a.chunkSize : a.chunkSize;
        var m = new Array;
        for (k = 0; k < l; k++) {
            m[k] = c[e + l - 1 - k];
        }
        m[l] = 0;
        var n = Math.max(8, a.digitSize - 3 - l);
        for (k = 0; k < n; k++) {
            m[l + 1 + k] = Math.floor(254 * Math.random()) + 1;
        }
        m[a.digitSize - 2] = 2;
        m[a.digitSize - 1] = 0;
        for (i = 0; i < a.digitSize; ++h) {
            j.digits[h] = m[i++];
            j.digits[h] += m[i++] << 8;
        }
        var o = a.barrett.powMod(j, a.e);
        var p = 16 == a.radix ? biToHex(o) : biToString(o, a.radix);
        g += p + " ";
    }
    return g.substring(0, g.length - 1);
}

function decryptedString(a, b) {
    var c = b.split(" ");
    var d = "";
    var e,
        f,
        g;
    for (e = 0; e < c.length; ++e) {
        var h;
        if (16 == a.radix) {
            h = biFromHex(c[e]);
        } else {
            h = biFromString(c[e], a.radix);
        }
        g = a.barrett.powMod(h, a.d);
        for (f = 0; f <= biHighIndex(g); ++f) {
            d += String.fromCharCode(255 & g.digits[f], g.digits[f] >> 8);
        }
    }
    if (0 == d.charCodeAt(d.length - 1)) {
        d = d.substring(0, d.length - 1);
    }
    return d;
}