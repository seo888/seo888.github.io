var qrcode = function () {
    var j = function (x, n) {
        var F = 236;
        var E = 17;
        var r = x;
        var t = g[n];
        var p = null;
        var A = 0;
        var l = null;
        var v = new Array();
        var B = {};
        var y = function (H, G) {
            A = r * 4 + 17;
            p = function (L) {
                var J = new Array(L);
                for (var K = 0; K < L; K += 1) {
                    J[K] = new Array(L);
                    for (var I = 0; I < L; I += 1) {
                        J[K][I] = null
                    }
                }
                return J
            }(A);
            u(0, 0);
            u(A - 7, 0);
            u(0, A - 7);
            w();
            m();
            D(H, G);
            if (r >= 7) {
                s(H)
            }
            if (l == null) {
                l = o(r, t, v)
            }
            z(l, G)
        };
        var u = function (I, G) {
            for (var H = -1; H <= 7; H += 1) {
                if (I + H <= -1 || A <= I + H) {
                    continue
                }
                for (var J = -1; J <= 7; J += 1) {
                    if (G + J <= -1 || A <= G + J) {
                        continue
                    }
                    if ((0 <= H && H <= 6 && (J == 0 || J == 6)) || (0 <= J && J <= 6 && (H == 0 || H == 6)) ||
                        (2 <= H && H <= 4 && 2 <= J && J <= 4)) {
                        p[I + H][G + J] = true
                    } else {
                        p[I + H][G + J] = false
                    }
                }
            }
        };
        var q = function () {
            var J = 0;
            var I = 0;
            for (var H = 0; H < 8; H += 1) {
                y(true, H);
                var G = f.getLostPoint(B);
                if (H == 0 || J > G) {
                    J = G;
                    I = H
                }
            }
            return I
        };
        var m = function () {
            for (var G = 8; G < A - 8; G += 1) {
                if (p[G][6] != null) {
                    continue
                }
                p[G][6] = (G % 2 == 0)
            }
            for (var H = 8; H < A - 8; H += 1) {
                if (p[6][H] != null) {
                    continue
                }
                p[6][H] = (H % 2 == 0)
            }
        };
        var w = function () {
            var M = f.getPatternPosition(r);
            for (var I = 0; I < M.length; I += 1) {
                for (var H = 0; H < M.length; H += 1) {
                    var K = M[I];
                    var G = M[H];
                    if (p[K][G] != null) {
                        continue
                    }
                    for (var J = -2; J <= 2; J += 1) {
                        for (var L = -2; L <= 2; L += 1) {
                            if (J == -2 || J == 2 || L == -2 || L == 2 || (J == 0 && L == 0)) {
                                p[K + J][G + L] = true
                            } else {
                                p[K + J][G + L] = false
                            }
                        }
                    }
                }
            }
        };
        var s = function (J) {
            var I = f.getBCHTypeNumber(r);
            for (var H = 0; H < 18; H += 1) {
                var G = (!J && ((I >> H) & 1) == 1);
                p[Math.floor(H / 3)][H % 3 + A - 8 - 3] = G
            }
            for (var H = 0; H < 18; H += 1) {
                var G = (!J && ((I >> H) & 1) == 1);
                p[H % 3 + A - 8 - 3][Math.floor(H / 3)] = G
            }
        };
        var D = function (L, K) {
            var J = (t << 3) | K;
            var I = f.getBCHTypeInfo(J);
            for (var H = 0; H < 15; H += 1) {
                var G = (!L && ((I >> H) & 1) == 1);
                if (H < 6) {
                    p[H][8] = G
                } else {
                    if (H < 8) {
                        p[H + 1][8] = G
                    } else {
                        p[A - 15 + H][8] = G
                    }
                }
            }
            for (var H = 0; H < 15; H += 1) {
                var G = (!L && ((I >> H) & 1) == 1);
                if (H < 8) {
                    p[8][A - H - 1] = G
                } else {
                    if (H < 9) {
                        p[8][15 - H - 1 + 1] = G
                    } else {
                        p[8][15 - H - 1] = G
                    }
                }
            }
            p[A - 8][8] = (!L)
        };
        var z = function (L, H) {
            var J = -1;
            var Q = A - 1;
            var K = 7;
            var G = 0;
            var O = f.getMaskFunction(H);
            for (var I = A - 1; I > 0; I -= 2) {
                if (I == 6) {
                    I -= 1
                }
                while (true) {
                    for (var N = 0; N < 2; N += 1) {
                        if (p[Q][I - N] == null) {
                            var M = false;
                            if (G < L.length) {
                                M = (((L[G] >>> K) & 1) == 1)
                            }
                            var P = O(Q, I - N);
                            if (P) {
                                M = !M
                            }
                            p[Q][I - N] = M;
                            K -= 1;
                            if (K == -1) {
                                G += 1;
                                K = 7
                            }
                        }
                    }
                    Q += J;
                    if (Q < 0 || A <= Q) {
                        Q -= J;
                        J = -J;
                        break
                    }
                }
            }
        };
        var C = function (Q, T) {
            var I = 0;
            var W = 0;
            var U = 0;
            var H = new Array(T.length);
            var L = new Array(T.length);
            for (var O = 0; O < T.length; O += 1) {
                var P = T[O].dataCount;
                var G = T[O].totalCount - P;
                W = Math.max(W, P);
                U = Math.max(U, G);
                H[O] = new Array(P);
                for (var R = 0; R < H[O].length; R += 1) {
                    H[O][R] = 255 & Q.getBuffer()[R + I]
                }
                I += P;
                var M = f.getErrorCorrectPolynomial(G);
                var V = c(H[O], M.getLength() - 1);
                var J = V.mod(M);
                L[O] = new Array(M.getLength() - 1);
                for (var R = 0; R < L[O].length; R += 1) {
                    var N = R + J.getLength() - L[O].length;
                    L[O][R] = (N >= 0) ? J.getAt(N) : 0
                }
            }
            var S = 0;
            for (var R = 0; R < T.length; R += 1) {
                S += T[R].totalCount
            }
            var X = new Array(S);
            var K = 0;
            for (var R = 0; R < W; R += 1) {
                for (var O = 0; O < T.length; O += 1) {
                    if (R < H[O].length) {
                        X[K] = H[O][R];
                        K += 1
                    }
                }
            }
            for (var R = 0; R < U; R += 1) {
                for (var O = 0; O < T.length; O += 1) {
                    if (R < L[O].length) {
                        X[K] = L[O][R];
                        K += 1
                    }
                }
            }
            return X
        };
        var o = function (N, M, J) {
            var H = e.getRSBlocks(N, M);
            var G = d();
            for (var I = 0; I < J.length; I += 1) {
                var L = J[I];
                G.put(L.getMode(), 4);
                G.put(L.getLength(), f.getLengthInBits(L.getMode(), N));
                L.write(G)

            }
            var K = 0;
            for (var I = 0; I < H.length; I += 1) {
                K += H[I].dataCount
            }
            if (G.getLengthInBits() > K * 8) {
                throw new Error("code length overflow. (" + G.getLengthInBits() + ">" + K * 8 + ")")
            }
            if (G.getLengthInBits() + 4 <= K * 8) {
                G.put(0, 4)
            }
            while (G.getLengthInBits() % 8 != 0) {
                G.putBit(false)
            }
            while (true) {
                if (G.getLengthInBits() >= K * 8) {
                    break
                }
                G.put(F, 8);
                if (G.getLengthInBits() >= K * 8) {
                    break
                }
                G.put(E, 8)
            }
            return C(G, H)
        };
        B.addData = function (H) {
            var G = i(H);
            v.push(G);
            l = null
        };
        B.isDark = function (H, G) {
            if (H < 0 || A <= H || G < 0 || A <= G) {
                throw new Error(H + "," + G)
            }
            return p[H][G]
        };
        B.getModuleCount = function () {
            return A
        };
        B.make = function () {
            y(false, q())
        };
        B.createTableTag = function (K, I) {
            K = K || 2;
            I = (typeof I == "undefined") ? "auto" : I;
            var G = "";
            G += '<table style="';
            G += " border-width: 0px; border-style: none;";
            G += " border-collapse: collapse;";
            G += " padding: 0px; margin:" + I + ";";
            G += '">';
            G += "<tbody>";
            for (var H = 0; H < B.getModuleCount(); H += 1) {
                G += "<tr>";
                for (var J = 0; J < B.getModuleCount(); J += 1) {
                    G += '<td style="';
                    G += " border-width: 0px; border-style: none;";
                    G += " border-collapse: collapse;";
                    G += " padding: 0px; margin: 0px;";
                    G += " width: " + K + "px;";
                    G += " height: " + K + "px;";
                    G += " background-color: ";
                    G += B.isDark(H, J) ? "#000000" : "#ffffff";
                    G += ";";
                    G += '"/>'
                }
                G += "</tr>"
            }
            G += "</tbody>";
            G += "</table>";
            return G
        };
        return B
    };
    j.stringToBytes = function (n) {
        var l = new Array();
        for (var m = 0; m < n.length; m += 1) {
            var o = n.charCodeAt(m);
            l.push(o & 255)
        }
        return l
    };
    j.createStringToBytes = function (o, n) {
        var m = function () {
            var z = a(o);
            var p = function () {
                var v = z.read();
                if (v == -1) {
                    throw new Error()
                }
                return v
            };
            var r = 0;
            var s = {};
            while (true) {
                var x = z.read();
                if (x == -1) {
                    break
                }
                var w = p();
                var u = p();
                var t = p();
                var q = String.fromCharCode((x << 8) | w);
                var y = (u << 8) | t;
                s[q] = y;
                r += 1
            }
            if (r != n) {
                throw new Error(r + " != " + n)
            }
            return s
        }();
        var l = "?".charCodeAt(0);
        return function (t) {
            var q = new Array();
            for (var r = 0; r < t.length; r += 1) {
                var u = t.charCodeAt(r);
                if (u < 128) {
                    q.push(u)
                } else {
                    var p = m[t.charAt(r)];
                    if (typeof p == "number") {
                        if ((p & 255) == p) {
                            q.push(p)
                        } else {
                            q.push(p >>> 8);
                            q.push(p & 255)
                        }
                    } else {
                        q.push(l)
                    }
                }
            }
            return q
        }
    };
    var h = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
    };
    var g = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    };
    var b = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    };
    var f = function () {
        var o = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28,
                50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50,
                74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30,
                58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6,
                26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86,
                114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102,
                128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82,
                110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];
        var l = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
        var q = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
        var n = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
        var p = {};
        var m = function (r) {
            var s = 0;
            while (r != 0) {
                s += 1;
                r >>>= 1
            }
            return s
        };
        p.getBCHTypeInfo = function (r) {
            var s = r << 10;
            while (m(s) - m(l) >= 0) {
                s ^= (l << (m(s) - m(l)))
            }
            return ((r << 10) | s) ^ n
        };
        p.getBCHTypeNumber = function (r) {
            var s = r << 12;
            while (m(s) - m(q) >= 0) {
                s ^= (q << (m(s) - m(q)))
            }
            return (r << 12) | s
        };
        p.getPatternPosition = function (r) {
            return o[r - 1]
        };
        p.getMaskFunction = function (r) {
            switch (r) {
                case b.PATTERN000:
                    return function (t, s) {
                        return (t + s) % 2 == 0
                    };
                case b.PATTERN001:
                    return function (t, s) {
                        return t % 2 == 0
                    };
                case b.PATTERN010:
                    return function (t, s) {
                        return s % 3 == 0
                    };
                case b.PATTERN011:
                    return function (t, s) {
                        return (t + s) % 3 == 0
                    };
                case b.PATTERN100:
                    return function (t, s) {
                        return (Math.floor(t / 2) + Math.floor(s / 3)) % 2 == 0
                    };
                case b.PATTERN101:
                    return function (t, s) {
                        return (t * s) % 2 + (t * s) % 3 == 0
                    };
                case b.PATTERN110:
                    return function (t, s) {
                        return ((t * s) % 2 + (t * s) % 3) % 2 == 0
                    };
                case b.PATTERN111:
                    return function (t, s) {
                        return ((t * s) % 3 + (t + s) % 2) % 2 == 0
                    };
                default:
                    throw new Error("bad maskPattern:" + r)
            }
        };
        p.getErrorCorrectPolynomial = function (s) {
            var r = c([1], 0);
            for (var t = 0; t < s; t += 1) {
                r = r.multiply(c([1, k.gexp(t)], 0))
            }
            return r
        };
        p.getLengthInBits = function (s, r) {
            if (1 <= r && r < 10) {
                switch (s) {
                    case h.MODE_NUMBER:
                        return 10;
                    case h.MODE_ALPHA_NUM:
                        return 9;
                    case h.MODE_8BIT_BYTE:
                        return 8;
                    case h.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + s)
                }
            } else {
                if (r < 27) {
                    switch (s) {
                        case h.MODE_NUMBER:
                            return 12;
                        case h.MODE_ALPHA_NUM:
                            return 11;
                        case h.MODE_8BIT_BYTE:
                            return 16;
                        case h.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + s)
                    }
                } else {
                    if (r < 41) {
                        switch (s) {
                            case h.MODE_NUMBER:
                                return 14;
                            case h.MODE_ALPHA_NUM:
                                return 13;
                            case h.MODE_8BIT_BYTE:
                                return 16;
                            case h.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + s)
                        }
                    } else {
                        throw new Error("type:" + r)
                    }
                }
            }
        };
        p.getLostPoint = function (B) {
            var u = B.getModuleCount();
            var v = 0;
            for (var D = 0; D < u; D += 1) {
                for (var t = 0; t < u; t += 1) {
                    var A = 0;
                    var z = B.isDark(D, t);
                    for (var s = -1; s <= 1; s += 1) {
                        if (D + s < 0 || u <= D + s) {
                            continue
                        }
                        for (var y = -1; y <= 1; y += 1) {
                            if (t + y < 0 || u <= t + y) {
                                continue
                            }
                            if (s == 0 && y == 0) {
                                continue
                            }
                            if (z == B.isDark(D + s, t + y)) {
                                A += 1
                            }
                        }
                    }
                    if (A > 5) {
                        v += (3 + A - 5)
                    }
                }
            }
            for (var D = 0; D < u - 1; D += 1) {
                for (var t = 0; t < u - 1; t += 1) {
                    var w = 0;
                    if (B.isDark(D, t)) {
                        w += 1
                    }
                    if (B.isDark(D + 1, t)) {
                        w += 1
                    }
                    if (B.isDark(D, t + 1)) {
                        w += 1
                    }
                    if (B.isDark(D + 1, t + 1)) {
                        w += 1
                    }
                    if (w == 0 || w == 4) {
                        v += 3
                    }
                }
            }
            for (var D = 0; D < u; D += 1) {
                for (var t = 0; t < u - 6; t += 1) {
                    if (B.isDark(D, t) && !B.isDark(D, t + 1) && B.isDark(D, t + 2) && B.isDark(D, t + 3) &&
                        B.isDark(D, t + 4) && !B.isDark(D, t + 5) && B.isDark(D, t + 6)) {
                        v += 40
                    }
                }
            }
            for (var t = 0; t < u; t += 1) {
                for (var D = 0; D < u - 6; D += 1) {
                    if (B.isDark(D, t) && !B.isDark(D + 1, t) && B.isDark(D + 2, t) && B.isDark(D + 3, t) &&
                        B.isDark(D + 4, t) && !B.isDark(D + 5, t) && B.isDark(D + 6, t)) {
                        v += 40
                    }
                }
            }
            var C = 0;
            for (var t = 0; t < u; t += 1) {
                for (var D = 0; D < u; D += 1) {
                    if (B.isDark(D, t)) {
                        C += 1
                    }
                }
            }
            var x = Math.abs(100 * C / u / u - 50) / 5;
            v += x * 10;
            return v
        };
        return p
    }();
    var k = function () {
        var l = new Array(256);
        var n = new Array(256);
        for (var m = 0; m < 8; m += 1) {
            l[m] = 1 << m
        }
        for (var m = 8; m < 256; m += 1) {
            l[m] = l[m - 4] ^ l[m - 5] ^ l[m - 6] ^ l[m - 8]
        }
        for (var m = 0; m < 255; m += 1) {
            n[l[m]] = m
        }
        var o = {};
        o.glog = function (p) {
            if (p < 1) {
                throw new Error("glog(" + p + ")")
            }
            return n[p]
        };
        o.gexp = function (p) {
            while (p < 0) {
                p += 255
            }
            while (p >= 256) {
                p -= 255
            }
            return l[p]
        };
        return o
    }();

    function c(m, l) {
        if (typeof m.length == "undefined") {
            throw new Error(m.length + "/" + l)
        }
        var n = function () {
            var r = 0;
            while (r < m.length && m[r] == 0) {
                r += 1
            }
            var q = new Array(m.length - r + l);
            for (var p = 0; p < m.length - r; p += 1) {
                q[p] = m[p + r]
            }
            return q
        }();
        var o = {};
        o.getAt = function (p) {
            return n[p]
        };
        o.getLength = function () {
            return n.length
        };
        o.multiply = function (s) {
            var q = new Array(o.getLength() + s.getLength() - 1);
            for (var r = 0; r < o.getLength(); r += 1) {
                for (var p = 0; p < s.getLength(); p += 1) {
                    q[r + p] ^= k.gexp(k.glog(o.getAt(r)) + k.glog(s.getAt(p)))
                }
            }
            return c(q, 0)
        };
        o.mod = function (s) {
            if (o.getLength() - s.getLength() < 0) {
                return o
            }
            var r = k.glog(o.getAt(0)) - k.glog(s.getAt(0));
            var p = new Array(o.getLength());
            for (var q = 0; q < o.getLength(); q += 1) {
                p[q] = o.getAt(q)
            }
            for (var q = 0; q < s.getLength(); q += 1) {
                p[q] ^= k.gexp(k.glog(s.getAt(q)) + r)
            }
            return c(p, 0).mod(s)
        };
        return o
    }
    var e = function () {
        var m = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1,
                44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2,
                50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34,
                12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32,
                14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2,
                41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37,
                17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2,
                44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51,
                23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20,
                6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4,
                45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11,
                36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66,
                42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45,
                3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [
                10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1,
                151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3,
                141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16,
                40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15,
                43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19,
                46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34,
                37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16,
                45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16,
                55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7,
                54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4,
                75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22,
                73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10,
                148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7,
                146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26,
                46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [
                23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24,
                1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24,
                35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46,
                23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14,
                152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17,
                152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46,
                46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [
                42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24,
                22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        var l = function (p, q) {
            var r = {};
            r.totalCount = p;
            r.dataCount = q;
            return r
        };
        var o = {};
        var n = function (q, p) {
            switch (p) {
                case g.L:
                    return m[(q - 1) * 4 + 0];
                case g.M:
                    return m[(q - 1) * 4 + 1];
                case g.Q:
                    return m[(q - 1) * 4 + 2];
                case g.H:
                    return m[(q - 1) * 4 + 3];
                default:
                    return undefined
            }
        };
        o.getRSBlocks = function (r, x) {
            var q = n(r, x);
            if (typeof q == "undefined") {
                throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + x)
            }
            var p = q.length / 3;
            var v = new Array();
            for (var t = 0; t < p; t += 1) {
                var u = q[t * 3 + 0];
                var y = q[t * 3 + 1];
                var w = q[t * 3 + 2];
                for (var s = 0; s < u; s += 1) {
                    v.push(l(y, w))
                }
            }
            return v
        };
        return o
    }();
    var d = function () {
        var l = new Array();
        var n = 0;
        var m = {};
        m.getBuffer = function () {
            return l
        };
        m.getAt = function (o) {
            var p = Math.floor(o / 8);
            return ((l[p] >>> (7 - o % 8)) & 1) == 1
        };
        m.put = function (o, q) {
            for (var p = 0; p < q; p += 1) {
                m.putBit(((o >>> (q - p - 1)) & 1) == 1)
            }
        };
        m.getLengthInBits = function () {
            return n
        };
        m.putBit = function (p) {
            var o = Math.floor(n / 8);
            if (l.length <= o) {
                l.push(0)
            }
            if (p) {
                l[o] |= (128 >>> (n % 8))
            }
            n += 1
        };
        return m
    };
    var i = function (o) {
        var n = h.MODE_8BIT_BYTE;
        var l = o;
        var m = j.stringToBytes(o);
        var p = {};
        p.getMode = function () {
            return n
        };
        p.getLength = function (q) {
            return m.length
        };
        p.write = function (q) {
            for (var r = 0; r < m.length; r += 1) {
                q.put(m[r], 8)
            }
        };
        return p
    };
    var a = function (p) {
        var r = p;
        var l = 0;
        var m = 0;
        var n = 0;
        var q = {};
        q.read = function () {
            while (n < 8) {
                if (l >= r.length) {
                    if (n == 0) {
                        return -1
                    }
                    throw new Error("unexpected end of file./" + n)
                }
                var t = r.charAt(l);
                l += 1;
                if (t == "=") {
                    n = 0;
                    return -1
                } else {
                    if (t.match(/^\s$/)) {
                        continue
                    }
                }
                m = (m << 6) | o(t.charCodeAt(0));
                n += 6
            }
            var s = (m >>> (n - 8)) & 255;
            n -= 8;
            return s
        };
        var o = function (s) {
            if (65 <= s && s <= 90) {
                return s - 65
            } else {
                if (97 <= s && s <= 122) {
                    return s - 97 + 26
                } else {
                    if (48 <= s && s <= 57) {
                        return s - 48 + 52
                    } else {
                        if (s == 43) {
                            return 62
                        } else {
                            if (s == 47) {
                                return 63
                            } else {
                                throw new Error("c:" + s)
                            }
                        }
                    }
                }
            }
        };
        return q
    };
    return j
}();
(function (a) {
    if (typeof define === "function" && define.amd) {
        define([], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a()
        }
    }
}(function () {
    return qrcode
}));
(function () {
    var a =
        ".ops_shareLayer ul,.ops_shareLayer li,.ops_shareLayer a,.ops_shareLayer i{margin:0px;padding:0px;}.ops_shareLayer{line-height:30px; position:absolute; top:12px;right:60px;}.ops_shareLayer .ops_tit{color:#666;float:left;margin-right:10px;}.ops_shareLayer .ops_icons{float:left;}.ops_shareLayer .ops_icons li{float:left;height:30px;width:30px;list-style:outside none none;margin-right:10px;}.ops_shareLayer .ops_icons a{float:left;border-radius:15px;-moz-border-radius:15px;-webkit-border-radius:15px;padding:5px;}.ops_shareLayer .ops_icons a i{background-image:url(http://www.imline.cn/images/ops_icons_02.png);height:20px;width:20px;line-height:20px;display:block;cursor:pointer;}.ops_shareLayer .ops_icons a.icon_sina{background-color:#d9534f;}.ops_shareLayer .ops_icons a.icon_sina:hover,.ops_shareLayer .ops_icons a.icon_sina:focus{background-color:#000;}.ops_shareLayer .ops_icons a.icon_sina i{background-position:0  1px;}.ops_shareLayer .ops_icons a.icon_weixin{background-color:#5cb85c;}.ops_shareLayer .ops_icons a.icon_weixin:hover,.ops_shareLayer .ops_icons a.icon_weixin:focus{background-color:#000;}.ops_shareLayer .ops_icons a.icon_weixin i{background-position:0 -43px;}.ops_shareLayer .ops_icons a.icon_qzone{background-color:#f0ad4e;}.ops_shareLayer .ops_icons a.icon_qzone:hover,.ops_shareLayer .ops_icons a.icon_qzone:focus{background-color:#000;}.ops_shareLayer .ops_icons a.icon_qzone i{background-position:0 -84px;}.ops_shareLayer .ops_icons a.icon_copy{background-color:#428bca;}.ops_shareLayer .ops_icons a.icon_copy:hover,.ops_shareLayer .ops_icons a.icon_copy:focus{background-color:#000;}.ops_shareLayer .ops_icons a.icon_copy i{background-position:0 -132px;}.weixin_popup{background:#fff none repeat scroll 0 0;border:1px solid #d8d8d8;padding:10px;position:fixed;z-index:11001;text-align:left;font-size:12px;color:#333;}.weixin_popup .weixin_popup_head{color:#000;font-weight:bold;height:16px;line-height:16px;position:relative;text-align:left;}.weixin_popup .weixin_popup_head .weixin_popup_close{color:#999;font-size:16px;height:16px;position:absolute;right:0;text-decoration:none;top:0;width:16px;}.weixin_popup .weixin_popup_main{TEXT-ALIGN: center;padding-top:10px;padding-bottom:10px;}.weixin_popup .weixin_popup_foot{color:#666;line-height:22px;text-align:left;}#weixin_qrcode{height:295px;left:333.5px;bottom:150px;width:240px;}";
    var f = document.createElement("style");
    f.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(f);
    if (f.styleSheet) {
        f.styleSheet.cssText = a
    } else {
        f.textContent = a
    }
    var c = false;
    var i = document.getElementById("ops_share");
    var g = function () {
        var l = document.createElement("div");
        i.appendChild(l);
        l.className = "ops_shareLayer";
        var k = "";

        for (var j = 0; j < _opsShare.btns.length; j++) {
            k += '<li><a href="javascript:void(0)" onclick="_opsShare.share(\'' + _opsShare.btns[j].className +
                '\');return false;" class="' + _opsShare.btns[j].className + '" title=' + _opsShare.btns[j].title +
                "><i> </i></a></li>"
        }
        l.innerHTML = '<span class="ops_tit">分享到：</span><ul class="ops_icons">' + k + "</ul></div>"
    };
    var b = function () {
        d();
        c.style.display = "block";
        c.style.left = document.body.clientWidth > c.offsetWidth ? (document.body.scrollLeft + ((document.body.clientWidth -
            c.offsetWidth) / 2)) + "px" : 0 + "px"
    };
    var d = function () {
        if (c) {
            return
        }
        c = document.createElement("div");
        i.parentNode.insertBefore(c, i);
        c.id = "weixin_qrcode";
        c.className = "weixin_popup";
        c.style.display = "none";
		var shareurl = "";
		if($('#mUrl').length && $('#mUrl').length>0) shareurl = $('#mUrl').val();
		if(shareurl=="") shareurl = window.location.href;
        var k =
            '<div class="weixin_popup_head"><span>分享到微信朋友圈</span><a class="weixin_popup_close" id="weixin_close" onclick="hideWeixin();return false;" href="#">×</a> </div>';
        var j = '<div class="weixin_popup_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。 </div>';
        var l = document.createElement("div");
        l.className = "weixin_popup_main";
        //l.innerHTML = h(window.location.href, 21, "L");
		l.innerHTML = h(shareurl, 21, "L");
        c.innerHTML = k + j;
        c.insertBefore(l, c.lastChild)
    };
    var h = function (n, m, l, k) {
        var j = qrcode(m || 21, l || "L");
        j.addData(n);
        j.make();
        return j.createTableTag()
    };
    var e = function () {
        var j = window.location.href;
        if (window.clipboardData) {
            window.clipboardData.clearData();
            clipboardData.setData("Text", j);
            alert("复制成功！")
        } else {
            if (navigator.userAgent.indexOf("Opera") != -1) {
                window.location = j;
                alert("复制成功！")
            } else {
                if (window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                    } catch (n) {
                        window.prompt("复制链接: Ctrl+C, 并点击确认或按下Enter键", j)
                    }
                    var l = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces
                        .nsIClipboard);
                    if (!l) {
                        return
                    }
                    var k = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces
                        .nsITransferable);
                    if (!k) {
                        return
                    }
                    k.addDataFlavor("text/unicode");
                    var o = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces
                        .nsISupportsString);
                    var p = j;
                    o.data = p;
                    k.setTransferData("text/unicode", o, p.length * 2);
                    var m = Components.interfaces.nsIClipboard;
                    if (!l) {
                        return false
                    }
                    l.setData(k, null, m.kGlobalClipboard);
                    alert("复制成功！")
                } else {
                    window.prompt("复制链接: Ctrl+C, 并点击确认或按下Enter键", j)
                }
            }
        }
    };
    window._opsShare = {
        text: document.title,
        url: window.location.href,
        //url: getParam(  getJsPath(""),'link' ),
        //pic: getParam(  getJsPath(""),'img' ),
        pic: "",
        btns: [{
            title: "微信",
            className: "icon_weixin",
            url: "",
            width: 612,
            height: 350
        }, {
            title: "新浪微博",
            className: "icon_sina",
            url: "http://service.weibo.com/share/share.php?url=[$url]&title=[$text]&source=北疆新闻网&sourceUrl=http://www.imline.cn/&content=utf-8&pic=[$pic]",
            width: 650,
            height: 500
        }, {
            title: "QQ空间",
            className: "icon_qzone",
            url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=[$url]&title=[$text]&pics=[$pic]&summary=",
            width: 612,
            height: 500
        }, {
            title: "复制地址",
            className: "icon_copy",
            url: "",
            width: 612,
            height: 500
        }],
        onload: function () {
            g()
        },
        share: function (k) {
            for (var j = 0; j < document.images.length; j++) {
                if (document.images[j].width >= 400 && document.images[j].height >= 300 || document.images[
                        j].height >= 400 && document.images[j].width >= 300) {
                    this.pic = document.images[j].src;
                    break
                }
            }
            for (var j = 0; j < this.btns.length; j++) {
                if (this.btns[j].className == k) {
                    switch (k) {
                        case "icon_weixin":
                            b();
                            break;
                        case "icon_copy":
                            e();
                            break;
                        default:
                            url = this.btns[j].url;
                            url = url.replace(/\[\$text\]/g, encodeURIComponent(this.text));
                            url = url.replace(/\[\$pic\]/g, encodeURIComponent(this.pic));
                            url = url.replace(/\[\$url\]/g, encodeURIComponent(this.url));
                            window.open(url, "opsShare", "toolbar=0,status=0,resizable=1,width=" + this.btns[
                                j].width + ",height=" + this.btns[j].height + ",left=" + Math.round(
                                screen.width / 2 - this.btns[j].width / 2) + ",top=" + Math.round(
                                screen.height / 2 - this.btns[j].height / 2));
                            break
                    }
                }
            }
        }
    };
    if (typeof window._opsShare.onload == "function") {
        window._opsShare.onload()
    }
})();

function hideWeixin() {
    document.getElementById("weixin_qrcode").style.display = "none"
};


function getJsPath(jsname) {
    var js = document.scripts;
    var jsPath = "";
    for (var i = js.length; i > 0; i--) {
        if (js[i - 1].src.indexOf(jsname) > -1) {
            return js[i - 1].src;
        }
    }
    return jsPath;
}

function getParam(jspath, parm) {
    var urlparse = jspath.split("\?");
    var parms = urlparse[1].split("&");
    var values = {};
    for(var i = 0; i < parms.length; i++) {
        var pr = parms[i].split("=");
        if (pr[0] == parm)
        return pr[1];
    }
    return "";
}

