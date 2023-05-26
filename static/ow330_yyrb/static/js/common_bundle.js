/**import from `/static/js/lib/qboot.js` **/
(function() {
    var e = {
        poll: function(t, n, r, i, s) {
            n = n || 100,
            r == null && (r = Infinity);
            if (r <= 0) {
                i && i();
                return
            }
            t() !== !1 ? setTimeout(function() {
                e.poll(t, n, r - 1, i, s)
            },
            n) : s && s()
        },
        await: function(t, n, r, i, s) {
            e.poll(function() {
                return t() ? (n(), !1) : !0
            },
            i, s, r)
        },
        jsonp: function() {
            var t = {},
            n = 0,
            r = 6e5,
            i = {},
            s = function(o, u, a, f) {
                typeof u != "object" && (f = a, a = u, u = null),
                f = e.mix(f || {},
                {
                    jsonp: "_callback",
                    timeout: 3e4,
                    threshold: r
                }),
                u && (o += (/\?/.test(o) ? "&": "?") + e.encodeURIJson(u));
                var l;
                l = t[o] = t[o] || f.cb || "__jsonp" + n+++"__",
                i[l] = {
                    url: o,
                    startTime: +(new Date)
                },
                o += (/\?/.test(o) ? "&": "?") + f.jsonp + "=" + encodeURIComponent(l) + "&t=" + Math.floor((new Date).getTime() / f.threshold),
                window[l] || (window[l] = function() {
                    var e = [],
                    t = function(t, n) {
                        i[l].endTime = +(new Date),
                        s.fire("resourceLoaded", {
                            data: i[l]
                        });
                        var r = e.shift();
                        r && r(t, n)
                    };
                    return t.add = function(t) {
                        e.push(t)
                    },
                    t
                } ());
                var c = setTimeout(function() {
                    window[l](null, {
                        status: "error",
                        reason: "timeout"
                    })
                },
                f.timeout);
                window[l].add(function(e, t) {
                    clearTimeout(c),
                    a && (t = t || {
                        status: "ok"
                    },
                    a(e, t))
                }),
                qload({
                    path: o,
                    type: "js",
                    force: !0
                }),
                e.createEvents(s)
            };
            return s.getMonitorData = function() {
                return i
            },
            s
        } (),
        encodeURIJson: function(e) {
            var t = [];
            for (var n in e) {
                if (e[n] == null) continue;
                if (e[n] instanceof Array) for (var r = 0; r < e[n].length; r++) t.push(encodeURIComponent(n) + "[]=" + encodeURIComponent(e[n][r]));
                else t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
            }
            return t.join("&")
        },
        mix: function(e, t, n) {
            n = n ||
            function(t, n, r) {
                return e[r] || r in e ? t: n
            },
            n === !0 && (n = function(e, t) {
                return t
            });
            for (var r in t) e[r] = n(e[r], t[r], r, e, t),
            e[r] === undefined && delete e[r];
            return e
        },
        createEvents: function(t) {
            var n = {},
            r = e.mix,
            i = $.extend;
            return i(!0, t, {
                on: function(e, t) {
                    n[e] = n[e] || [];
                    if (n[e].indexOf(t) > -1) return;
                    return n[e].push(t),
                    !0
                },
                off: function(e, t) {
                    n[e] = n[e] || [];
                    if (t) {
                        var r = n[e].indexOf(t);
                        if (r < 0) return ! 1;
                        n[e].splice(r, 1)
                    } else n[e] = [];
                    return ! 0
                },
                fire: function(e, r) {
                    r = r || {},
                    i(!0, r, {
                        type: e,
                        target: t,
                        preventDefault: function() {
                            r.returnValue = !1
                        }
                    });
                    var s = n[e] || [];
                    for (var o = 0; o < s.length; o++) s[o](r);
                    return r.returnValue !== !1
                }
            }),
            r(t, {
                on: function(e, t) {
                    n[e] = n[e] || [],
                    n[e].push(t)
                },
                fire: function(e, i) {
                    i = i || {},
                    r(i, {
                        type: e,
                        target: t,
                        preventDefault: function() {
                            i.returnValue = !1
                        }
                    });
                    var s = n[e] || [];
                    for (var o = 0; o < s.length; o++) s[o](i);
                    return i.returnValue !== !1
                }
            }),
            t.trigger = t.fire,
            t
        }
    };
    e.cookie = {
        getRaw: function(e) {
            var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
            n = t.exec(document.cookie);
            return n ? n[2] || null: null
        },
        get: function(t) {
            var n = e.cookie.getRaw(t);
            return "string" == typeof n ? (n = decodeURIComponent(n), n) : null
        },
        setRaw: function(e, t, n) {
            n = n || {};
            var r = n.expires;
            "number" == typeof n.expires && (r = new Date, r.setTime(r.getTime() + n.expires)),
            document.cookie = e + "=" + t + (n.path ? "; path=" + n.path: "") + (r ? "; expires=" + r.toGMTString() : "") + (n.domain ? "; domain=" + n.domain: "") + (n.secure ? "; secure": "")
        },
        set: function(t, n, r) {
            e.cookie.setRaw(t, encodeURIComponent(n), r)
        },
        remove: function(t, n) {
            n = n || {},
            n.expires = new Date(0),
            e.cookie.setRaw(t, "", n)
        }
    },
    window.qboot = e
})();
var qload = qload || {};
qload = function() {
    var e = document,
    t = window,
    n = {},
    r = {},
    i = function(e) {
        return e.constructor === Array
    },
    s = {
        mods: {}
    },
    o = e.getElementsByTagName("script"),
    u = o[o.length - 1],
    a,
    f = function(e) {
        if (e.clearAttributes) e.clearAttributes();
        else for (var t in e) e.hasOwnProperty(t) && t.toLowerCase() !== "parentnode" && delete e[t];
        e && e.parentNode && e.parentNode.removeChild(e),
        e = null
    },
    l = e.createElement("script").readyState ?
    function(e, t) {
        e.onreadystatechange = function() {
            var n = e.readyState;
            if (n === "loaded" || n === "complete") e.onreadystatechange = null,
            t.apply(this)
        }
    }: function(e, t) {
        e.addEventListener("load", t, !1)
    },
    c = function(t, i, s, o, a, h) {
        var p = u;
        if (!t) return;
        if (n[t]) {
            r[t] = !1;
            if (!o) {
                a && a(t, h);
                return
            }
        }
        if (r[t]) {
            setTimeout(function() {
                c(t, i, s, o, a, h)
            },
            1);
            return
        }
        r[t] = !0;
        var d;
        if (i === "js" || t.indexOf(".js") >= 0) d = e.createElement("script"),
        d.setAttribute("type", "text/javascript"),
        s && (d.charset = s),
        d.setAttribute("src", t),
        d.setAttribute("async", !0),
        l(d,
        function() {
            n[t] = !0,
            a && a(t, h),
            f(d)
        }),
        p.parentNode.insertBefore(d, p);
        else if (i === "css" || t.indexOf(".css") >= 0) {
            d = e.createElement("link"),
            d.setAttribute("type", "text/css"),
            s && (d.charset = s),
            d.setAttribute("rel", "stylesheet"),
            d.setAttribute("href", t),
            n[t] = !0,
            p.parentNode.insertBefore(d, p),
            a && a(t, h);
            return
        }
    },
    h = function(e) {
        if (!e || !i(e)) return;
        var t = 0,
        n, r = [],
        o = s.mods,
        u = [],
        a = {},
        f = function(e) {
            var t = 0,
            n, r;
            if (a[e]) return u;
            a[e] = !0;
            if (o[e].requires) {
                r = o[e].requires;
                for (; typeof(n = r[t++]) != "undefined";) o[n] ? (f(n), u.push(n)) : u.push(n);
                return u
            }
            return u
        };
        for (; typeof(n = e[t++]) != "undefined";) o[n] && o[n].requires && o[n].requires[0] && (u = [], a = {},
        r = r.concat(f(n))),
        r.push(n);
        return r
    },
    p = function(e) {
        if (!e || !i(e)) return;
        this.queue = e,
        this.current = null
    };
    return p.prototype = {
        _interval: 10,
        start: function() {
            var e = this;
            this.current = this.next();
            if (!this.current) {
                this.end = !0;
                return
            }
            this.run()
        },
        run: function() {
            var e = this,
            t, n = this.current;
            if (typeof n == "function") {
                n(),
                this.start();
                return
            }
            typeof n == "string" && (s.mods[n] ? (t = s.mods[n], c(t.path, t.type, t.charset, t.force,
            function(t) {
                e.start()
            },
            e)) : /\.js|\.css/i.test(n) ? c(n, "", "", "",
            function(e, t) {
                t.start()
            },
            e) : this.start())
        },
        next: function() {
            return this.queue.shift()
        }
    },
    a = function() {
        var e = [].slice.call(arguments),
        t,
        n = e[0];
        if (typeof n != "string" && typeof n != "function") {
            var r = n.name || n.path,
            i = n.callback || e[1];
            a.add(r, n),
            e[0] = r,
            e[1] = i
        }
        t = new p(h(e)),
        t.start()
    },
    a.add = function(e, t) {
        if (!e || !t || !t.path) return;
        s.mods[e] = t
    },
    a.delay = function() {
        var e = [].slice.call(arguments),
        n = e.shift();
        t.setTimeout(function() {
            a.apply(this, e)
        },
        n)
    },
    a.done = function() {
        var e = [].slice.call(arguments),
        t = 0,
        r;
        for (; r = e[t++];) typeof r == "string" && (s.mods[r] ? (mod = s.mods[r], n[mod.path] = !0) : /\.js|\.css/i.test(r) && (n[r] = !0))
    },
    a.css = function(t, n) {
        n = n || "qboot-inline-css";
        var r = e.getElementById(n);
        r || (r = e.createElement("style"), r.type = "text/css", r.id = n, e.getElementsByTagName("head")[0].appendChild(r)),
        r.styleSheet ? r.styleSheet.cssText = r.styleSheet.cssText + t: r.appendChild(e.createTextNode(t))
    },
    a.setConfig = function(e, t) {
        return s[e] = t,
        a
    },
    a.getConfig = function(e) {
        return s[e]
    },
    a
} (),
function(e) {
    "use strict";
    function t(e, t) {
        var n = (e & 65535) + (t & 65535),
        r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | n & 65535
    }
    function n(e, t) {
        return e << t | e >>> 32 - t
    }
    function r(e, r, i, s, o, u) {
        return t(n(t(t(r, e), t(s, u)), o), i)
    }
    function i(e, t, n, i, s, o, u) {
        return r(t & n | ~t & i, e, t, s, o, u)
    }
    function s(e, t, n, i, s, o, u) {
        return r(t & i | n & ~i, e, t, s, o, u)
    }
    function o(e, t, n, i, s, o, u) {
        return r(t ^ n ^ i, e, t, s, o, u)
    }
    function u(e, t, n, i, s, o, u) {
        return r(n ^ (t | ~i), e, t, s, o, u)
    }
    function a(e, n) {
        e[n >> 5] |= 128 << n % 32,
        e[(n + 64 >>> 9 << 4) + 14] = n;
        var r, a, f, l, c, h = 1732584193,
        p = -271733879,
        d = -1732584194,
        v = 271733878;
        for (r = 0; r < e.length; r += 16) a = h,
        f = p,
        l = d,
        c = v,
        h = i(h, p, d, v, e[r], 7, -680876936),
        v = i(v, h, p, d, e[r + 1], 12, -389564586),
        d = i(d, v, h, p, e[r + 2], 17, 606105819),
        p = i(p, d, v, h, e[r + 3], 22, -1044525330),
        h = i(h, p, d, v, e[r + 4], 7, -176418897),
        v = i(v, h, p, d, e[r + 5], 12, 1200080426),
        d = i(d, v, h, p, e[r + 6], 17, -1473231341),
        p = i(p, d, v, h, e[r + 7], 22, -45705983),
        h = i(h, p, d, v, e[r + 8], 7, 1770035416),
        v = i(v, h, p, d, e[r + 9], 12, -1958414417),
        d = i(d, v, h, p, e[r + 10], 17, -42063),
        p = i(p, d, v, h, e[r + 11], 22, -1990404162),
        h = i(h, p, d, v, e[r + 12], 7, 1804603682),
        v = i(v, h, p, d, e[r + 13], 12, -40341101),
        d = i(d, v, h, p, e[r + 14], 17, -1502002290),
        p = i(p, d, v, h, e[r + 15], 22, 1236535329),
        h = s(h, p, d, v, e[r + 1], 5, -165796510),
        v = s(v, h, p, d, e[r + 6], 9, -1069501632),
        d = s(d, v, h, p, e[r + 11], 14, 643717713),
        p = s(p, d, v, h, e[r], 20, -373897302),
        h = s(h, p, d, v, e[r + 5], 5, -701558691),
        v = s(v, h, p, d, e[r + 10], 9, 38016083),
        d = s(d, v, h, p, e[r + 15], 14, -660478335),
        p = s(p, d, v, h, e[r + 4], 20, -405537848),
        h = s(h, p, d, v, e[r + 9], 5, 568446438),
        v = s(v, h, p, d, e[r + 14], 9, -1019803690),
        d = s(d, v, h, p, e[r + 3], 14, -187363961),
        p = s(p, d, v, h, e[r + 8], 20, 1163531501),
        h = s(h, p, d, v, e[r + 13], 5, -1444681467),
        v = s(v, h, p, d, e[r + 2], 9, -51403784),
        d = s(d, v, h, p, e[r + 7], 14, 1735328473),
        p = s(p, d, v, h, e[r + 12], 20, -1926607734),
        h = o(h, p, d, v, e[r + 5], 4, -378558),
        v = o(v, h, p, d, e[r + 8], 11, -2022574463),
        d = o(d, v, h, p, e[r + 11], 16, 1839030562),
        p = o(p, d, v, h, e[r + 14], 23, -35309556),
        h = o(h, p, d, v, e[r + 1], 4, -1530992060),
        v = o(v, h, p, d, e[r + 4], 11, 1272893353),
        d = o(d, v, h, p, e[r + 7], 16, -155497632),
        p = o(p, d, v, h, e[r + 10], 23, -1094730640),
        h = o(h, p, d, v, e[r + 13], 4, 681279174),
        v = o(v, h, p, d, e[r], 11, -358537222),
        d = o(d, v, h, p, e[r + 3], 16, -722521979),
        p = o(p, d, v, h, e[r + 6], 23, 76029189),
        h = o(h, p, d, v, e[r + 9], 4, -640364487),
        v = o(v, h, p, d, e[r + 12], 11, -421815835),
        d = o(d, v, h, p, e[r + 15], 16, 530742520),
        p = o(p, d, v, h, e[r + 2], 23, -995338651),
        h = u(h, p, d, v, e[r], 6, -198630844),
        v = u(v, h, p, d, e[r + 7], 10, 1126891415),
        d = u(d, v, h, p, e[r + 14], 15, -1416354905),
        p = u(p, d, v, h, e[r + 5], 21, -57434055),
        h = u(h, p, d, v, e[r + 12], 6, 1700485571),
        v = u(v, h, p, d, e[r + 3], 10, -1894986606),
        d = u(d, v, h, p, e[r + 10], 15, -1051523),
        p = u(p, d, v, h, e[r + 1], 21, -2054922799),
        h = u(h, p, d, v, e[r + 8], 6, 1873313359),
        v = u(v, h, p, d, e[r + 15], 10, -30611744),
        d = u(d, v, h, p, e[r + 6], 15, -1560198380),
        p = u(p, d, v, h, e[r + 13], 21, 1309151649),
        h = u(h, p, d, v, e[r + 4], 6, -145523070),
        v = u(v, h, p, d, e[r + 11], 10, -1120210379),
        d = u(d, v, h, p, e[r + 2], 15, 718787259),
        p = u(p, d, v, h, e[r + 9], 21, -343485551),
        h = t(h, a),
        p = t(p, f),
        d = t(d, l),
        v = t(v, c);
        return [h, p, d, v]
    }
    function f(e) {
        var t, n = "";
        for (t = 0; t < e.length * 32; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
    }
    function l(e) {
        var t, n = [];
        n[(e.length >> 2) - 1] = undefined;
        for (t = 0; t < n.length; t += 1) n[t] = 0;
        for (t = 0; t < e.length * 8; t += 8) n[t >> 5] |= (e.charCodeAt(t / 8) & 255) << t % 32;
        return n
    }
    function c(e) {
        return f(a(l(e), e.length * 8))
    }
    function h(e, t) {
        var n, r = l(e),
        i = [],
        s = [],
        o;
        i[15] = s[15] = undefined,
        r.length > 16 && (r = a(r, e.length * 8));
        for (n = 0; n < 16; n += 1) i[n] = r[n] ^ 909522486,
        s[n] = r[n] ^ 1549556828;
        return o = a(i.concat(l(t)), 512 + t.length * 8),
        f(a(s.concat(o), 640))
    }
    function p(e) {
        var t = "0123456789abcdef",
        n = "",
        r, i;
        for (i = 0; i < e.length; i += 1) r = e.charCodeAt(i),
        n += t.charAt(r >>> 4 & 15) + t.charAt(r & 15);
        return n
    }
    function d(e) {
        return unescape(encodeURIComponent(e))
    }
    function v(e) {
        return c(d(e))
    }
    function m(e) {
        return p(v(e))
    }
    function g(e, t) {
        return h(d(e), d(t))
    }
    function y(e, t) {
        return p(g(e, t))
    }
    function b(e, t, n) {
        return t ? n ? g(t, e) : y(t, e) : n ? v(e) : m(e)
    }
    typeof define == "function" && define.amd ? define(function() {
        return b
    }) : e.md5 = b
} (this);
var JSEncryptExports = {}; (function(e) {
    function t(e, t, n) {
        e != null && ("number" == typeof e ? this.fromNumber(e, t, n) : t == null && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
    }
    function n() {
        return new t(null)
    }
    function r(e, t, n, r, i, s) {
        while (--s >= 0) {
            var o = t * this[e++] + n[r] + i;
            i = Math.floor(o / 67108864),
            n[r++] = o & 67108863
        }
        return i
    }
    function i(e, t, n, r, i, s) {
        var o = t & 32767,
        u = t >> 15;
        while (--s >= 0) {
            var a = this[e] & 32767,
            f = this[e++] >> 15,
            l = u * a + f * o;
            a = o * a + ((l & 32767) << 15) + n[r] + (i & 1073741823),
            i = (a >>> 30) + (l >>> 15) + u * f + (i >>> 30),
            n[r++] = a & 1073741823
        }
        return i
    }
    function s(e, t, n, r, i, s) {
        var o = t & 16383,
        u = t >> 14;
        while (--s >= 0) {
            var a = this[e] & 16383,
            f = this[e++] >> 14,
            l = u * a + f * o;
            a = o * a + ((l & 16383) << 14) + n[r] + i,
            i = (a >> 28) + (l >> 14) + u * f,
            n[r++] = a & 268435455
        }
        return i
    }
    function o(e) {
        return An.charAt(e)
    }
    function u(e, t) {
        var n = On[e.charCodeAt(t)];
        return n == null ? -1 : n
    }
    function a(e) {
        for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
        e.t = this.t,
        e.s = this.s
    }
    function f(e) {
        this.t = 1,
        this.s = e < 0 ? -1 : 0,
        e > 0 ? this[0] = e: e < -1 ? this[0] = e + DV: this.t = 0
    }
    function l(e) {
        var t = n();
        return t.fromInt(e),
        t
    }
    function c(e, n) {
        var r;
        if (n == 16) r = 4;
        else if (n == 8) r = 3;
        else if (n == 256) r = 8;
        else if (n == 2) r = 1;
        else if (n == 32) r = 5;
        else {
            if (n != 4) {
                this.fromRadix(e, n);
                return
            }
            r = 2
        }
        this.t = 0,
        this.s = 0;
        var i = e.length,
        s = !1,
        o = 0;
        while (--i >= 0) {
            var a = r == 8 ? e[i] & 255 : u(e, i);
            if (a < 0) {
                e.charAt(i) == "-" && (s = !0);
                continue
            }
            s = !1,
            o == 0 ? this[this.t++] = a: o + r > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - o) - 1) << o, this[this.t++] = a >> this.DB - o) : this[this.t - 1] |= a << o,
            o += r,
            o >= this.DB && (o -= this.DB)
        }
        r == 8 && (e[0] & 128) != 0 && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
        this.clamp(),
        s && t.ZERO.subTo(this, this)
    }
    function h() {
        var e = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == e)--this.t
    }
    function p(e) {
        if (this.s < 0) return "-" + this.negate().toString(e);
        var t;
        if (e == 16) t = 4;
        else if (e == 8) t = 3;
        else if (e == 2) t = 1;
        else if (e == 32) t = 5;
        else {
            if (e != 4) return this.toRadix(e);
            t = 2
        }
        var n = (1 << t) - 1,
        r,
        i = !1,
        s = "",
        u = this.t,
        a = this.DB - u * this.DB % t;
        if (u-->0) {
            a < this.DB && (r = this[u] >> a) > 0 && (i = !0, s = o(r));
            while (u >= 0) a < t ? (r = (this[u] & (1 << a) - 1) << t - a, r |= this[--u] >> (a += this.DB - t)) : (r = this[u] >> (a -= t) & n, a <= 0 && (a += this.DB, --u)),
            r > 0 && (i = !0),
            i && (s += o(r))
        }
        return i ? s: "0"
    }
    function d() {
        var e = n();
        return t.ZERO.subTo(this, e),
        e
    }
    function m() {
        return this.s < 0 ? this.negate() : this
    }
    function g(e) {
        var t = this.s - e.s;
        if (t != 0) return t;
        var n = this.t;
        t = n - e.t;
        if (t != 0) return this.s < 0 ? -t: t;
        while (--n >= 0) if ((t = this[n] - e[n]) != 0) return t;
        return 0
    }
    function y(e) {
        var t = 1,
        n;
        return (n = e >>> 16) != 0 && (e = n, t += 16),
        (n = e >> 8) != 0 && (e = n, t += 8),
        (n = e >> 4) != 0 && (e = n, t += 4),
        (n = e >> 2) != 0 && (e = n, t += 2),
        (n = e >> 1) != 0 && (e = n, t += 1),
        t
    }
    function b() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
    }
    function w(e, t) {
        var n;
        for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
        for (n = e - 1; n >= 0; --n) t[n] = 0;
        t.t = this.t + e,
        t.s = this.s
    }
    function E(e, t) {
        for (var n = e; n < this.t; ++n) t[n - e] = this[n];
        t.t = Math.max(this.t - e, 0),
        t.s = this.s
    }
    function S(e, t) {
        var n = e % this.DB,
        r = this.DB - n,
        i = (1 << r) - 1,
        s = Math.floor(e / this.DB),
        o = this.s << n & this.DM,
        u;
        for (u = this.t - 1; u >= 0; --u) t[u + s + 1] = this[u] >> r | o,
        o = (this[u] & i) << n;
        for (u = s - 1; u >= 0; --u) t[u] = 0;
        t[s] = o,
        t.t = this.t + s + 1,
        t.s = this.s,
        t.clamp()
    }
    function x(e, t) {
        t.s = this.s;
        var n = Math.floor(e / this.DB);
        if (n >= this.t) {
            t.t = 0;
            return
        }
        var r = e % this.DB,
        i = this.DB - r,
        s = (1 << r) - 1;
        t[0] = this[n] >> r;
        for (var o = n + 1; o < this.t; ++o) t[o - n - 1] |= (this[o] & s) << i,
        t[o - n] = this[o] >> r;
        r > 0 && (t[this.t - n - 1] |= (this.s & s) << i),
        t.t = this.t - n,
        t.clamp()
    }
    function T(e, t) {
        var n = 0,
        r = 0,
        i = Math.min(e.t, this.t);
        while (n < i) r += this[n] - e[n],
        t[n++] = r & this.DM,
        r >>= this.DB;
        if (e.t < this.t) {
            r -= e.s;
            while (n < this.t) r += this[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
            r += this.s
        } else {
            r += this.s;
            while (n < e.t) r -= e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
            r -= e.s
        }
        t.s = r < 0 ? -1 : 0,
        r < -1 ? t[n++] = this.DV + r: r > 0 && (t[n++] = r),
        t.t = n,
        t.clamp()
    }
    function N(e, n) {
        var r = this.abs(),
        i = e.abs(),
        s = r.t;
        n.t = s + i.t;
        while (--s >= 0) n[s] = 0;
        for (s = 0; s < i.t; ++s) n[s + r.t] = r.am(0, i[s], n, s, 0, r.t);
        n.s = 0,
        n.clamp(),
        this.s != e.s && t.ZERO.subTo(n, n)
    }
    function C(e) {
        var t = this.abs(),
        n = e.t = 2 * t.t;
        while (--n >= 0) e[n] = 0;
        for (n = 0; n < t.t - 1; ++n) {
            var r = t.am(n, t[n], e, 2 * n, 0, 1); (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV, e[n + t.t + 1] = 1)
        }
        e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
        e.s = 0,
        e.clamp()
    }
    function k(e, r, i) {
        var s = e.abs();
        if (s.t <= 0) return;
        var o = this.abs();
        if (o.t < s.t) {
            r != null && r.fromInt(0),
            i != null && this.copyTo(i);
            return
        }
        i == null && (i = n());
        var u = n(),
        a = this.s,
        f = e.s,
        l = this.DB - y(s[s.t - 1]);
        l > 0 ? (s.lShiftTo(l, u), o.lShiftTo(l, i)) : (s.copyTo(u), o.copyTo(i));
        var c = u.t,
        h = u[c - 1];
        if (h == 0) return;
        var p = h * (1 << this.F1) + (c > 1 ? u[c - 2] >> this.F2: 0),
        d = this.FV / p,
        v = (1 << this.F1) / p,
        m = 1 << this.F2,
        g = i.t,
        b = g - c,
        w = r == null ? n() : r;
        u.dlShiftTo(b, w),
        i.compareTo(w) >= 0 && (i[i.t++] = 1, i.subTo(w, i)),
        t.ONE.dlShiftTo(c, w),
        w.subTo(u, u);
        while (u.t < c) u[u.t++] = 0;
        while (--b >= 0) {
            var E = i[--g] == h ? this.DM: Math.floor(i[g] * d + (i[g - 1] + m) * v);
            if ((i[g] += u.am(0, E, i, b, 0, c)) < E) {
                u.dlShiftTo(b, w),
                i.subTo(w, i);
                while (i[g] < --E) i.subTo(w, i)
            }
        }
        r != null && (i.drShiftTo(c, r), a != f && t.ZERO.subTo(r, r)),
        i.t = c,
        i.clamp(),
        l > 0 && i.rShiftTo(l, i),
        a < 0 && t.ZERO.subTo(i, i)
    }
    function L(e) {
        var r = n();
        return this.abs().divRemTo(e, null, r),
        this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r),
        r
    }
    function A(e) {
        this.m = e
    }
    function O(e) {
        return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
    }
    function M(e) {
        return e
    }
    function _(e) {
        e.divRemTo(this.m, null, e)
    }
    function D(e, t, n) {
        e.multiplyTo(t, n),
        this.reduce(n)
    }
    function P(e, t) {
        e.squareTo(t),
        this.reduce(t)
    }
    function H() {
        if (this.t < 1) return 0;
        var e = this[0];
        if ((e & 1) == 0) return 0;
        var t = e & 3;
        return t = t * (2 - (e & 15) * t) & 15,
        t = t * (2 - (e & 255) * t) & 255,
        t = t * (2 - ((e & 65535) * t & 65535)) & 65535,
        t = t * (2 - e * t % this.DV) % this.DV,
        t > 0 ? this.DV - t: -t
    }
    function B(e) {
        this.m = e,
        this.mp = e.invDigit(),
        this.mpl = this.mp & 32767,
        this.mph = this.mp >> 15,
        this.um = (1 << e.DB - 15) - 1,
        this.mt2 = 2 * e.t
    }
    function j(e) {
        var r = n();
        return e.abs().dlShiftTo(this.m.t, r),
        r.divRemTo(this.m, null, r),
        e.s < 0 && r.compareTo(t.ZERO) > 0 && this.m.subTo(r, r),
        r
    }
    function F(e) {
        var t = n();
        return e.copyTo(t),
        this.reduce(t),
        t
    }
    function I(e) {
        while (e.t <= this.mt2) e[e.t++] = 0;
        for (var t = 0; t < this.m.t; ++t) {
            var n = e[t] & 32767,
            r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
            n = t + this.m.t,
            e[n] += this.m.am(0, r, e, t, 0, this.m.t);
            while (e[n] >= e.DV) e[n] -= e.DV,
            e[++n]++
        }
        e.clamp(),
        e.drShiftTo(this.m.t, e),
        e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
    }
    function q(e, t) {
        e.squareTo(t),
        this.reduce(t)
    }
    function R(e, t, n) {
        e.multiplyTo(t, n),
        this.reduce(n)
    }
    function U() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }
    function z(e, r) {
        if (e > 4294967295 || e < 1) return t.ONE;
        var i = n(),
        s = n(),
        o = r.convert(this),
        u = y(e) - 1;
        o.copyTo(i);
        while (--u >= 0) {
            r.sqrTo(i, s);
            if ((e & 1 << u) > 0) r.mulTo(s, o, i);
            else {
                var a = i;
                i = s,
                s = a
            }
        }
        return r.revert(i)
    }
    function W(e, t) {
        var n;
        return e < 256 || t.isEven() ? n = new A(t) : n = new B(t),
        this.exp(e, n)
    }
    function X() {
        var e = n();
        return this.copyTo(e),
        e
    }
    function V() {
        if (this.s < 0) {
            if (this.t == 1) return this[0] - this.DV;
            if (this.t == 0) return - 1
        } else {
            if (this.t == 1) return this[0];
            if (this.t == 0) return 0
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }
    function $() {
        return this.t == 0 ? this.s: this[0] << 24 >> 24
    }
    function J() {
        return this.t == 0 ? this.s: this[0] << 16 >> 16
    }
    function K(e) {
        return Math.floor(Math.LN2 * this.DB / Math.log(e))
    }
    function Q() {
        return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1
    }
    function G(e) {
        e == null && (e = 10);
        if (this.signum() == 0 || e < 2 || e > 36) return "0";
        var t = this.chunkSize(e),
        r = Math.pow(e, t),
        i = l(r),
        s = n(),
        o = n(),
        u = "";
        this.divRemTo(i, s, o);
        while (s.signum() > 0) u = (r + o.intValue()).toString(e).substr(1) + u,
        s.divRemTo(i, s, o);
        return o.intValue().toString(e) + u
    }
    function Y(e, n) {
        this.fromInt(0),
        n == null && (n = 10);
        var r = this.chunkSize(n),
        i = Math.pow(n, r),
        s = !1,
        o = 0,
        a = 0;
        for (var f = 0; f < e.length; ++f) {
            var l = u(e, f);
            if (l < 0) {
                e.charAt(f) == "-" && this.signum() == 0 && (s = !0);
                continue
            }
            a = n * a + l,
            ++o >= r && (this.dMultiply(i), this.dAddOffset(a, 0), o = 0, a = 0)
        }
        o > 0 && (this.dMultiply(Math.pow(n, o)), this.dAddOffset(a, 0)),
        s && t.ZERO.subTo(this, this)
    }
    function Z(e, n, r) {
        if ("number" == typeof n) if (e < 2) this.fromInt(1);
        else {
            this.fromNumber(e, r),
            this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), ut, this),
            this.isEven() && this.dAddOffset(1, 0);
            while (!this.isProbablePrime(n)) this.dAddOffset(2, 0),
            this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this)
        } else {
            var i = new Array,
            s = e & 7;
            i.length = (e >> 3) + 1,
            n.nextBytes(i),
            s > 0 ? i[0] &= (1 << s) - 1 : i[0] = 0,
            this.fromString(i, 256)
        }
    }
    function et() {
        var e = this.t,
        t = new Array;
        t[0] = this.s;
        var n = this.DB - e * this.DB % 8,
        r, i = 0;
        if (e-->0) {
            n < this.DB && (r = this[e] >> n) != (this.s & this.DM) >> n && (t[i++] = r | this.s << this.DB - n);
            while (e >= 0) {
                n < 8 ? (r = (this[e] & (1 << n) - 1) << 8 - n, r |= this[--e] >> (n += this.DB - 8)) : (r = this[e] >> (n -= 8) & 255, n <= 0 && (n += this.DB, --e)),
                (r & 128) != 0 && (r |= -256),
                i == 0 && (this.s & 128) != (r & 128) && ++i;
                if (i > 0 || r != this.s) t[i++] = r
            }
        }
        return t
    }
    function tt(e) {
        return this.compareTo(e) == 0
    }
    function nt(e) {
        return this.compareTo(e) < 0 ? this: e
    }
    function rt(e) {
        return this.compareTo(e) > 0 ? this: e
    }
    function it(e, t, n) {
        var r, i, s = Math.min(e.t, this.t);
        for (r = 0; r < s; ++r) n[r] = t(this[r], e[r]);
        if (e.t < this.t) {
            i = e.s & this.DM;
            for (r = s; r < this.t; ++r) n[r] = t(this[r], i);
            n.t = this.t
        } else {
            i = this.s & this.DM;
            for (r = s; r < e.t; ++r) n[r] = t(i, e[r]);
            n.t = e.t
        }
        n.s = t(this.s, e.s),
        n.clamp()
    }
    function st(e, t) {
        return e & t
    }
    function ot(e) {
        var t = n();
        return this.bitwiseTo(e, st, t),
        t
    }
    function ut(e, t) {
        return e | t
    }
    function at(e) {
        var t = n();
        return this.bitwiseTo(e, ut, t),
        t
    }
    function ft(e, t) {
        return e ^ t
    }
    function lt(e) {
        var t = n();
        return this.bitwiseTo(e, ft, t),
        t
    }
    function ct(e, t) {
        return e & ~t
    }
    function ht(e) {
        var t = n();
        return this.bitwiseTo(e, ct, t),
        t
    }
    function pt() {
        var e = n();
        for (var t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
        return e.t = this.t,
        e.s = ~this.s,
        e
    }
    function dt(e) {
        var t = n();
        return e < 0 ? this.rShiftTo( - e, t) : this.lShiftTo(e, t),
        t
    }
    function vt(e) {
        var t = n();
        return e < 0 ? this.lShiftTo( - e, t) : this.rShiftTo(e, t),
        t
    }
    function mt(e) {
        if (e == 0) return - 1;
        var t = 0;
        return (e & 65535) == 0 && (e >>= 16, t += 16),
        (e & 255) == 0 && (e >>= 8, t += 8),
        (e & 15) == 0 && (e >>= 4, t += 4),
        (e & 3) == 0 && (e >>= 2, t += 2),
        (e & 1) == 0 && ++t,
        t
    }
    function gt() {
        for (var e = 0; e < this.t; ++e) if (this[e] != 0) return e * this.DB + mt(this[e]);
        return this.s < 0 ? this.t * this.DB: -1
    }
    function yt(e) {
        var t = 0;
        while (e != 0) e &= e - 1,
        ++t;
        return t
    }
    function bt() {
        var e = 0,
        t = this.s & this.DM;
        for (var n = 0; n < this.t; ++n) e += yt(this[n] ^ t);
        return e
    }
    function wt(e) {
        var t = Math.floor(e / this.DB);
        return t >= this.t ? this.s != 0 : (this[t] & 1 << e % this.DB) != 0
    }
    function Et(e, n) {
        var r = t.ONE.shiftLeft(e);
        return this.bitwiseTo(r, n, r),
        r
    }
    function St(e) {
        return this.changeBit(e, ut)
    }
    function xt(e) {
        return this.changeBit(e, ct)
    }
    function Tt(e) {
        return this.changeBit(e, ft)
    }
    function Nt(e, t) {
        var n = 0,
        r = 0,
        i = Math.min(e.t, this.t);
        while (n < i) r += this[n] + e[n],
        t[n++] = r & this.DM,
        r >>= this.DB;
        if (e.t < this.t) {
            r += e.s;
            while (n < this.t) r += this[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
            r += this.s
        } else {
            r += this.s;
            while (n < e.t) r += e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
            r += e.s
        }
        t.s = r < 0 ? -1 : 0,
        r > 0 ? t[n++] = r: r < -1 && (t[n++] = this.DV + r),
        t.t = n,
        t.clamp()
    }
    function Ct(e) {
        var t = n();
        return this.addTo(e, t),
        t
    }
    function kt(e) {
        var t = n();
        return this.subTo(e, t),
        t
    }
    function Lt(e) {
        var t = n();
        return this.multiplyTo(e, t),
        t
    }
    function At() {
        var e = n();
        return this.squareTo(e),
        e
    }
    function Ot(e) {
        var t = n();
        return this.divRemTo(e, t, null),
        t
    }
    function Mt(e) {
        var t = n();
        return this.divRemTo(e, null, t),
        t
    }
    function _t(e) {
        var t = n(),
        r = n();
        return this.divRemTo(e, t, r),
        new Array(t, r)
    }
    function Dt(e) {
        this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
        ++this.t,
        this.clamp()
    }
    function Pt(e, t) {
        if (e == 0) return;
        while (this.t <= t) this[this.t++] = 0;
        this[t] += e;
        while (this[t] >= this.DV) this[t] -= this.DV,
        ++t >= this.t && (this[this.t++] = 0),
        ++this[t]
    }
    function Ht() {}
    function Bt(e) {
        return e
    }
    function jt(e, t, n) {
        e.multiplyTo(t, n)
    }
    function Ft(e, t) {
        e.squareTo(t)
    }
    function It(e) {
        return this.exp(e, new Ht)
    }
    function qt(e, t, n) {
        var r = Math.min(this.t + e.t, t);
        n.s = 0,
        n.t = r;
        while (r > 0) n[--r] = 0;
        var i;
        for (i = n.t - this.t; r < i; ++r) n[r + this.t] = this.am(0, e[r], n, r, 0, this.t);
        for (i = Math.min(e.t, t); r < i; ++r) this.am(0, e[r], n, r, 0, t - r);
        n.clamp()
    }
    function Rt(e, t, n) {--t;
        var r = n.t = this.t + e.t - t;
        n.s = 0;
        while (--r >= 0) n[r] = 0;
        for (r = Math.max(t - this.t, 0); r < e.t; ++r) n[this.t + r - t] = this.am(t - r, e[r], n, 0, 0, this.t + r - t);
        n.clamp(),
        n.drShiftTo(1, n)
    }
    function Ut(e) {
        this.r2 = n(),
        this.q3 = n(),
        t.ONE.dlShiftTo(2 * e.t, this.r2),
        this.mu = this.r2.divide(e),
        this.m = e
    }
    function zt(e) {
        if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
        if (e.compareTo(this.m) < 0) return e;
        var t = n();
        return e.copyTo(t),
        this.reduce(t),
        t
    }
    function Wt(e) {
        return e
    }
    function Xt(e) {
        e.drShiftTo(this.m.t - 1, this.r2),
        e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()),
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (e.compareTo(this.r2) < 0) e.dAddOffset(1, this.m.t + 1);
        e.subTo(this.r2, e);
        while (e.compareTo(this.m) >= 0) e.subTo(this.m, e)
    }
    function Vt(e, t) {
        e.squareTo(t),
        this.reduce(t)
    }
    function $t(e, t, n) {
        e.multiplyTo(t, n),
        this.reduce(n)
    }
    function Jt(e, t) {
        var r = e.bitLength(),
        i,
        s = l(1),
        o;
        if (r <= 0) return s;
        r < 18 ? i = 1 : r < 48 ? i = 3 : r < 144 ? i = 4 : r < 768 ? i = 5 : i = 6,
        r < 8 ? o = new A(t) : t.isEven() ? o = new Ut(t) : o = new B(t);
        var u = new Array,
        a = 3,
        f = i - 1,
        c = (1 << i) - 1;
        u[1] = o.convert(this);
        if (i > 1) {
            var h = n();
            o.sqrTo(u[1], h);
            while (a <= c) u[a] = n(),
            o.mulTo(h, u[a - 2], u[a]),
            a += 2
        }
        var p = e.t - 1,
        d, v = !0,
        m = n(),
        g;
        r = y(e[p]) - 1;
        while (p >= 0) {
            r >= f ? d = e[p] >> r - f & c: (d = (e[p] & (1 << r + 1) - 1) << f - r, p > 0 && (d |= e[p - 1] >> this.DB + r - f)),
            a = i;
            while ((d & 1) == 0) d >>= 1,
            --a; (r -= a) < 0 && (r += this.DB, --p);
            if (v) u[d].copyTo(s),
            v = !1;
            else {
                while (a > 1) o.sqrTo(s, m),
                o.sqrTo(m, s),
                a -= 2;
                a > 0 ? o.sqrTo(s, m) : (g = s, s = m, m = g),
                o.mulTo(m, u[d], s)
            }
            while (p >= 0 && (e[p] & 1 << r) == 0) o.sqrTo(s, m),
            g = s,
            s = m,
            m = g,
            --r < 0 && (r = this.DB - 1, --p)
        }
        return o.revert(s)
    }
    function Kt(e) {
        var t = this.s < 0 ? this.negate() : this.clone(),
        n = e.s < 0 ? e.negate() : e.clone();
        if (t.compareTo(n) < 0) {
            var r = t;
            t = n,
            n = r
        }
        var i = t.getLowestSetBit(),
        s = n.getLowestSetBit();
        if (s < 0) return t;
        i < s && (s = i),
        s > 0 && (t.rShiftTo(s, t), n.rShiftTo(s, n));
        while (t.signum() > 0)(i = t.getLowestSetBit()) > 0 && t.rShiftTo(i, t),
        (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
        t.compareTo(n) >= 0 ? (t.subTo(n, t), t.rShiftTo(1, t)) : (n.subTo(t, n), n.rShiftTo(1, n));
        return s > 0 && n.lShiftTo(s, n),
        n
    }
    function Qt(e) {
        if (e <= 0) return 0;
        var t = this.DV % e,
        n = this.s < 0 ? e - 1 : 0;
        if (this.t > 0) if (t == 0) n = this[0] % e;
        else for (var r = this.t - 1; r >= 0; --r) n = (t * n + this[r]) % e;
        return n
    }
    function Gt(e) {
        var n = e.isEven();
        if (this.isEven() && n || e.signum() == 0) return t.ZERO;
        var r = e.clone(),
        i = this.clone(),
        s = l(1),
        o = l(0),
        u = l(0),
        a = l(1);
        while (r.signum() != 0) {
            while (r.isEven()) {
                r.rShiftTo(1, r);
                if (n) {
                    if (!s.isEven() || !o.isEven()) s.addTo(this, s),
                    o.subTo(e, o);
                    s.rShiftTo(1, s)
                } else o.isEven() || o.subTo(e, o);
                o.rShiftTo(1, o)
            }
            while (i.isEven()) {
                i.rShiftTo(1, i);
                if (n) {
                    if (!u.isEven() || !a.isEven()) u.addTo(this, u),
                    a.subTo(e, a);
                    u.rShiftTo(1, u)
                } else a.isEven() || a.subTo(e, a);
                a.rShiftTo(1, a)
            }
            r.compareTo(i) >= 0 ? (r.subTo(i, r), n && s.subTo(u, s), o.subTo(a, o)) : (i.subTo(r, i), n && u.subTo(s, u), a.subTo(o, a))
        }
        return i.compareTo(t.ONE) != 0 ? t.ZERO: a.compareTo(e) >= 0 ? a.subtract(e) : a.signum() < 0 ? (a.addTo(e, a), a.signum() < 0 ? a.add(e) : a) : a
    }
    function Yt(e) {
        var t, n = this.abs();
        if (n.t == 1 && n[0] <= Dn[Dn.length - 1]) {
            for (t = 0; t < Dn.length; ++t) if (n[0] == Dn[t]) return ! 0;
            return ! 1
        }
        if (n.isEven()) return ! 1;
        t = 1;
        while (t < Dn.length) {
            var r = Dn[t],
            i = t + 1;
            while (i < Dn.length && r < Pn) r *= Dn[i++];
            r = n.modInt(r);
            while (t < i) if (r % Dn[t++] == 0) return ! 1
        }
        return n.millerRabin(e)
    }
    function Zt(e) {
        var r = this.subtract(t.ONE),
        i = r.getLowestSetBit();
        if (i <= 0) return ! 1;
        var s = r.shiftRight(i);
        e = e + 1 >> 1,
        e > Dn.length && (e = Dn.length);
        var o = n();
        for (var u = 0; u < e; ++u) {
            o.fromInt(Dn[Math.floor(Math.random() * Dn.length)]);
            var a = o.modPow(s, this);
            if (a.compareTo(t.ONE) != 0 && a.compareTo(r) != 0) {
                var f = 1;
                while (f++<i && a.compareTo(r) != 0) {
                    a = a.modPowInt(2, this);
                    if (a.compareTo(t.ONE) == 0) return ! 1
                }
                if (a.compareTo(r) != 0) return ! 1
            }
        }
        return ! 0
    }
    function en() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function tn(e) {
        var t, n, r;
        for (t = 0; t < 256; ++t) this.S[t] = t;
        n = 0;
        for (t = 0; t < 256; ++t) n = n + this.S[t] + e[t % e.length] & 255,
        r = this.S[t],
        this.S[t] = this.S[n],
        this.S[n] = r;
        this.i = 0,
        this.j = 0
    }
    function nn() {
        var e;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        e = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = e,
        this.S[e + this.S[this.i] & 255]
    }
    function rn() {
        return new en
    }
    function sn() {
        if (Bn == null) {
            Bn = rn();
            while (Fn < Hn) {
                var e = Math.floor(65536 * Math.random());
                jn[Fn++] = e & 255
            }
            Bn.init(jn);
            for (Fn = 0; Fn < jn.length; ++Fn) jn[Fn] = 0;
            Fn = 0
        }
        return Bn.next()
    }
    function on(e) {
        var t;
        for (t = 0; t < e.length; ++t) e[t] = sn()
    }
    function un() {}
    function an(e, n) {
        return new t(e, n)
    }
    function fn(e, t) {
        var n = "",
        r = 0;
        while (r + t < e.length) n += e.substring(r, r + t) + "\n",
        r += t;
        return n + e.substring(r, e.length)
    }
    function ln(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16)
    }
    function cn(e, n) {
        if (n < e.length + 11) return console.error("Message too long for RSA"),
        null;
        var r = new Array,
        i = e.length - 1;
        while (i >= 0 && n > 0) {
            var s = e.charCodeAt(i--);
            s < 128 ? r[--n] = s: s > 127 && s < 2048 ? (r[--n] = s & 63 | 128, r[--n] = s >> 6 | 192) : (r[--n] = s & 63 | 128, r[--n] = s >> 6 & 63 | 128, r[--n] = s >> 12 | 224)
        }
        r[--n] = 0;
        var o = new un,
        u = new Array;
        while (n > 2) {
            u[0] = 0;
            while (u[0] == 0) o.nextBytes(u);
            r[--n] = u[0]
        }
        return r[--n] = 2,
        r[--n] = 0,
        new t(r)
    }
    function hn() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function pn(e, t) {
        e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = an(e, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
    }
    function dn(e) {
        return e.modPowInt(this.e, this.n)
    }
    function vn(e) {
        var t = cn(e, this.n.bitLength() + 7 >> 3);
        if (t == null) return null;
        var n = this.doPublic(t);
        if (n == null) return null;
        var r = n.toString(16);
        return (r.length & 1) == 0 ? r: "0" + r
    }
    function mn(e, t) {
        var n = e.toByteArray(),
        r = 0;
        while (r < n.length && n[r] == 0)++r;
        if (n.length - r != t - 1 || n[r] != 2) return null; ++r;
        while (n[r] != 0) if (++r >= n.length) return null;
        var i = "";
        while (++r < n.length) {
            var s = n[r] & 255;
            s < 128 ? i += String.fromCharCode(s) : s > 191 && s < 224 ? (i += String.fromCharCode((s & 31) << 6 | n[r + 1] & 63), ++r) : (i += String.fromCharCode((s & 15) << 12 | (n[r + 1] & 63) << 6 | n[r + 2] & 63), r += 2)
        }
        return i
    }
    function gn(e, t, n) {
        e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = an(e, 16), this.e = parseInt(t, 16), this.d = an(n, 16)) : console.error("Invalid RSA private key")
    }
    function yn(e, t, n, r, i, s, o, u) {
        e != null && t != null && e.length > 0 && t.length > 0 ? (this.n = an(e, 16), this.e = parseInt(t, 16), this.d = an(n, 16), this.p = an(r, 16), this.q = an(i, 16), this.dmp1 = an(s, 16), this.dmq1 = an(o, 16), this.coeff = an(u, 16)) : console.error("Invalid RSA private key")
    }
    function bn(e, n) {
        var r = new un,
        i = e >> 1;
        this.e = parseInt(n, 16);
        var s = new t(n, 16);
        for (;;) {
            for (;;) {
                this.p = new t(e - i, 1, r);
                if (this.p.subtract(t.ONE).gcd(s).compareTo(t.ONE) == 0 && this.p.isProbablePrime(10)) break
            }
            for (;;) {
                this.q = new t(i, 1, r);
                if (this.q.subtract(t.ONE).gcd(s).compareTo(t.ONE) == 0 && this.q.isProbablePrime(10)) break
            }
            if (this.p.compareTo(this.q) <= 0) {
                var o = this.p;
                this.p = this.q,
                this.q = o
            }
            var u = this.p.subtract(t.ONE),
            a = this.q.subtract(t.ONE),
            f = u.multiply(a);
            if (f.gcd(s).compareTo(t.ONE) == 0) {
                this.n = this.p.multiply(this.q),
                this.d = s.modInverse(f),
                this.dmp1 = this.d.mod(u),
                this.dmq1 = this.d.mod(a),
                this.coeff = this.q.modInverse(this.p);
                break
            }
        }
    }
    function wn(e) {
        if (this.p == null || this.q == null) return e.modPow(this.d, this.n);
        var t = e.mod(this.p).modPow(this.dmp1, this.p),
        n = e.mod(this.q).modPow(this.dmq1, this.q);
        while (t.compareTo(n) < 0) t = t.add(this.p);
        return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
    }
    function En(e) {
        var t = an(e, 16),
        n = this.doPrivate(t);
        return n == null ? null: mn(n, this.n.bitLength() + 7 >> 3)
    }
    function Sn(e) {
        var t, n, r = "";
        for (t = 0; t + 3 <= e.length; t += 3) n = parseInt(e.substring(t, t + 3), 16),
        r += Un.charAt(n >> 6) + Un.charAt(n & 63);
        t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16), r += Un.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16), r += Un.charAt(n >> 2) + Un.charAt((n & 3) << 4));
        while ((r.length & 3) > 0) r += zn;
        return r
    }
    function xn(e) {
        var t = "",
        n, r = 0,
        i;
        for (n = 0; n < e.length; ++n) {
            if (e.charAt(n) == zn) break;
            v = Un.indexOf(e.charAt(n));
            if (v < 0) continue;
            r == 0 ? (t += o(v >> 2), i = v & 3, r = 1) : r == 1 ? (t += o(i << 2 | v >> 4), i = v & 15, r = 2) : r == 2 ? (t += o(i), t += o(v >> 2), i = v & 3, r = 3) : (t += o(i << 2 | v >> 4), t += o(v & 15), r = 0)
        }
        return r == 1 && (t += o(i << 2)),
        t
    }
    function Tn(e) {
        var t = xn(e),
        n,
        r = new Array;
        for (n = 0; 2 * n < t.length; ++n) r[n] = parseInt(t.substring(2 * n, 2 * n + 2), 16);
        return r
    }
    var Nn, Cn = 0xdeadbeefcafe,
    kn = (Cn & 16777215) == 15715070;
    kn && navigator.appName == "Microsoft Internet Explorer" ? (t.prototype.am = i, Nn = 30) : kn && navigator.appName != "Netscape" ? (t.prototype.am = r, Nn = 26) : (t.prototype.am = s, Nn = 28),
    t.prototype.DB = Nn,
    t.prototype.DM = (1 << Nn) - 1,
    t.prototype.DV = 1 << Nn;
    var Ln = 52;
    t.prototype.FV = Math.pow(2, Ln),
    t.prototype.F1 = Ln - Nn,
    t.prototype.F2 = 2 * Nn - Ln;
    var An = "0123456789abcdefghijklmnopqrstuvwxyz",
    On = new Array,
    Mn, _n;
    Mn = "0".charCodeAt(0);
    for (_n = 0; _n <= 9; ++_n) On[Mn++] = _n;
    Mn = "a".charCodeAt(0);
    for (_n = 10; _n < 36; ++_n) On[Mn++] = _n;
    Mn = "A".charCodeAt(0);
    for (_n = 10; _n < 36; ++_n) On[Mn++] = _n;
    A.prototype.convert = O,
    A.prototype.revert = M,
    A.prototype.reduce = _,
    A.prototype.mulTo = D,
    A.prototype.sqrTo = P,
    B.prototype.convert = j,
    B.prototype.revert = F,
    B.prototype.reduce = I,
    B.prototype.mulTo = R,
    B.prototype.sqrTo = q,
    t.prototype.copyTo = a,
    t.prototype.fromInt = f,
    t.prototype.fromString = c,
    t.prototype.clamp = h,
    t.prototype.dlShiftTo = w,
    t.prototype.drShiftTo = E,
    t.prototype.lShiftTo = S,
    t.prototype.rShiftTo = x,
    t.prototype.subTo = T,
    t.prototype.multiplyTo = N,
    t.prototype.squareTo = C,
    t.prototype.divRemTo = k,
    t.prototype.invDigit = H,
    t.prototype.isEven = U,
    t.prototype.exp = z,
    t.prototype.toString = p,
    t.prototype.negate = d,
    t.prototype.abs = m,
    t.prototype.compareTo = g,
    t.prototype.bitLength = b,
    t.prototype.mod = L,
    t.prototype.modPowInt = W,
    t.ZERO = l(0),
    t.ONE = l(1),
    Ht.prototype.convert = Bt,
    Ht.prototype.revert = Bt,
    Ht.prototype.mulTo = jt,
    Ht.prototype.sqrTo = Ft,
    Ut.prototype.convert = zt,
    Ut.prototype.revert = Wt,
    Ut.prototype.reduce = Xt,
    Ut.prototype.mulTo = $t,
    Ut.prototype.sqrTo = Vt;
    var Dn = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
    Pn = (1 << 26) / Dn[Dn.length - 1];
    t.prototype.chunkSize = K,
    t.prototype.toRadix = G,
    t.prototype.fromRadix = Y,
    t.prototype.fromNumber = Z,
    t.prototype.bitwiseTo = it,
    t.prototype.changeBit = Et,
    t.prototype.addTo = Nt,
    t.prototype.dMultiply = Dt,
    t.prototype.dAddOffset = Pt,
    t.prototype.multiplyLowerTo = qt,
    t.prototype.multiplyUpperTo = Rt,
    t.prototype.modInt = Qt,
    t.prototype.millerRabin = Zt,
    t.prototype.clone = X,
    t.prototype.intValue = V,
    t.prototype.byteValue = $,
    t.prototype.shortValue = J,
    t.prototype.signum = Q,
    t.prototype.toByteArray = et,
    t.prototype.equals = tt,
    t.prototype.min = nt,
    t.prototype.max = rt,
    t.prototype.and = ot,
    t.prototype.or = at,
    t.prototype.xor = lt,
    t.prototype.andNot = ht,
    t.prototype.not = pt,
    t.prototype.shiftLeft = dt,
    t.prototype.shiftRight = vt,
    t.prototype.getLowestSetBit = gt,
    t.prototype.bitCount = bt,
    t.prototype.testBit = wt,
    t.prototype.setBit = St,
    t.prototype.clearBit = xt,
    t.prototype.flipBit = Tt,
    t.prototype.add = Ct,
    t.prototype.subtract = kt,
    t.prototype.multiply = Lt,
    t.prototype.divide = Ot,
    t.prototype.remainder = Mt,
    t.prototype.divideAndRemainder = _t,
    t.prototype.modPow = Jt,
    t.prototype.modInverse = Gt,
    t.prototype.pow = It,
    t.prototype.gcd = Kt,
    t.prototype.isProbablePrime = Yt,
    t.prototype.square = At,
    en.prototype.init = tn,
    en.prototype.next = nn;
    var Hn = 256,
    Bn, jn, Fn;
    if (jn == null) {
        jn = new Array,
        Fn = 0;
        var In;
        if (window.crypto && window.crypto.getRandomValues) {
            var qn = new Uint32Array(256);
            window.crypto.getRandomValues(qn);
            for (In = 0; In < qn.length; ++In) jn[Fn++] = qn[In] & 255
        }
        var Rn = function(e) {
            this.count = this.count || 0;
            if (this.count >= 256 || Fn >= Hn) {
                window.removeEventListener ? window.removeEventListener("mousemove", Rn) : window.detachEvent && window.detachEvent("onmousemove", Rn);
                return
            }

            this.count += 1;
            var t = e.x + e.y;
            jn[Fn++] = t & 255
        };
        window.addEventListener ? window.addEventListener("mousemove", Rn) : window.attachEvent && window.attachEvent("onmousemove", Rn)
    }
    un.prototype.nextBytes = on,
    hn.prototype.doPublic = dn,
    hn.prototype.setPublic = pn,
    hn.prototype.encrypt = vn,
    hn.prototype.doPrivate = wn,
    hn.prototype.setPrivate = gn,
    hn.prototype.setPrivateEx = yn,
    hn.prototype.generate = bn,
    hn.prototype.decrypt = En,
    function() {
        var e = function(e, r, i) {
            var s = new un,
            o = e >> 1;
            this.e = parseInt(r, 16);
            var u = new t(r, 16),
            a = this,
            f = function() {
                var r = function() {
                    if (a.p.compareTo(a.q) <= 0) {
                        var e = a.p;
                        a.p = a.q,
                        a.q = e
                    }
                    var n = a.p.subtract(t.ONE),
                    r = a.q.subtract(t.ONE),
                    s = n.multiply(r);
                    s.gcd(u).compareTo(t.ONE) == 0 ? (a.n = a.p.multiply(a.q), a.d = u.modInverse(s), a.dmp1 = a.d.mod(n), a.dmq1 = a.d.mod(r), a.coeff = a.q.modInverse(a.p), setTimeout(function() {
                        i()
                    },
                    0)) : setTimeout(f, 0)
                },
                l = function() {
                    a.q = n(),
                    a.q.fromNumberAsync(o, 1, s,
                    function() {
                        a.q.subtract(t.ONE).gcda(u,
                        function(e) {
                            e.compareTo(t.ONE) == 0 && a.q.isProbablePrime(10) ? setTimeout(r, 0) : setTimeout(l, 0)
                        })
                    })
                },
                c = function() {
                    a.p = n(),
                    a.p.fromNumberAsync(e - o, 1, s,
                    function() {
                        a.p.subtract(t.ONE).gcda(u,
                        function(e) {
                            e.compareTo(t.ONE) == 0 && a.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(c, 0)
                        })
                    })
                };
                setTimeout(c, 0)
            };
            setTimeout(f, 0)
        };
        hn.prototype.generateAsync = e;
        var r = function(e, t) {
            var n = this.s < 0 ? this.negate() : this.clone(),
            r = e.s < 0 ? e.negate() : e.clone();
            if (n.compareTo(r) < 0) {
                var i = n;
                n = r,
                r = i
            }
            var s = n.getLowestSetBit(),
            o = r.getLowestSetBit();
            if (o < 0) {
                t(n);
                return
            }
            s < o && (o = s),
            o > 0 && (n.rShiftTo(o, n), r.rShiftTo(o, r));
            var u = function() { (s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n),
                (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r),
                n.compareTo(r) >= 0 ? (n.subTo(r, n), n.rShiftTo(1, n)) : (r.subTo(n, r), r.rShiftTo(1, r)),
                n.signum() > 0 ? setTimeout(u, 0) : (o > 0 && r.lShiftTo(o, r), setTimeout(function() {
                    t(r)
                },
                0))
            };
            setTimeout(u, 10)
        };
        t.prototype.gcda = r;
        var i = function(e, n, r, i) {
            if ("number" == typeof n) if (e < 2) this.fromInt(1);
            else {
                this.fromNumber(e, r),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), ut, this),
                this.isEven() && this.dAddOffset(1, 0);
                var s = this,
                o = function() {
                    s.dAddOffset(2, 0),
                    s.bitLength() > e && s.subTo(t.ONE.shiftLeft(e - 1), s),
                    s.isProbablePrime(n) ? setTimeout(function() {
                        i()
                    },
                    0) : setTimeout(o, 0)
                };
                setTimeout(o, 0)
            } else {
                var u = new Array,
                a = e & 7;
                u.length = (e >> 3) + 1,
                n.nextBytes(u),
                a > 0 ? u[0] &= (1 << a) - 1 : u[0] = 0,
                this.fromString(u, 256)
            }
        };
        t.prototype.fromNumberAsync = i
    } ();
    var Un = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    zn = "=",
    Wn = Wn || {};
    Wn.env = Wn.env || {};
    var Xn = Wn,
    Vn = Object.prototype,
    $n = "[object Function]",
    Jn = ["toString", "valueOf"];
    Wn.env.parseUA = function(e) {
        var t = function(e) {
            var t = 0;
            return parseFloat(e.replace(/\./g,
            function() {
                return t++==1 ? "": "."
            }))
        },
        n = navigator,
        r = {
            ie: 0,
            opera: 0,
            gecko: 0,
            webkit: 0,
            chrome: 0,
            mobile: null,
            air: 0,
            ipad: 0,
            iphone: 0,
            ipod: 0,
            ios: null,
            android: 0,
            webos: 0,
            caja: n && n.cajaVersion,
            secure: !1,
            os: null
        },
        i = e || navigator && navigator.userAgent,
        s = window && window.location,
        o = s && s.href,
        u;
        return r.secure = o && o.toLowerCase().indexOf("https") === 0,
        i && (/windows|win32/i.test(i) ? r.os = "windows": /macintosh/i.test(i) ? r.os = "macintosh": /rhino/i.test(i) && (r.os = "rhino"), /KHTML/.test(i) && (r.webkit = 1), u = i.match(/AppleWebKit\/([^\s]*)/), u && u[1] && (r.webkit = t(u[1]), / Mobile\//.test(i) ? (r.mobile = "Apple", u = i.match(/OS ([^\s]*)/), u && u[1] && (u = t(u[1].replace("_", "."))), r.ios = u, r.ipad = r.ipod = r.iphone = 0, u = i.match(/iPad|iPod|iPhone/), u && u[0] && (r[u[0].toLowerCase()] = r.ios)) : (u = i.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/), u && (r.mobile = u[0]), /webOS/.test(i) && (r.mobile = "WebOS", u = i.match(/webOS\/([^\s]*);/), u && u[1] && (r.webos = t(u[1]))), / Android/.test(i) && (r.mobile = "Android", u = i.match(/Android ([^\s]*);/), u && u[1] && (r.android = t(u[1])))), u = i.match(/Chrome\/([^\s]*)/), u && u[1] ? r.chrome = t(u[1]) : (u = i.match(/AdobeAIR\/([^\s]*)/), u && (r.air = u[0]))), r.webkit || (u = i.match(/Opera[\s\/]([^\s]*)/), u && u[1] ? (r.opera = t(u[1]), u = i.match(/Version\/([^\s]*)/), u && u[1] && (r.opera = t(u[1])), u = i.match(/Opera Mini[^;]*/), u && (r.mobile = u[0])) : (u = i.match(/MSIE\s([^;]*)/), u && u[1] ? r.ie = t(u[1]) : (u = i.match(/Gecko\/([^\s]*)/), u && (r.gecko = 1, u = i.match(/rv:([^\s\)]*)/), u && u[1] && (r.gecko = t(u[1]))))))),
        r
    },
    Wn.env.ua = Wn.env.parseUA(),
    Wn.isFunction = function(e) {
        return typeof e == "function" || Vn.toString.apply(e) === $n
    },
    Wn._IEEnumFix = Wn.env.ua.ie ?
    function(e, t) {
        var n, r, i;
        for (n = 0; n < Jn.length; n += 1) r = Jn[n],
        i = t[r],
        Xn.isFunction(i) && i != Vn[r] && (e[r] = i)
    }: function() {},
    Wn.extend = function(e, t, n) {
        if (!t || !e) throw new Error("extend failed, please check that all dependencies are included.");
        var r = function() {},
        i;
        r.prototype = t.prototype,
        e.prototype = new r,
        e.prototype.constructor = e,
        e.superclass = t.prototype,
        t.prototype.constructor == Vn.constructor && (t.prototype.constructor = t);
        if (n) {
            for (i in n) Xn.hasOwnProperty(n, i) && (e.prototype[i] = n[i]);
            Xn._IEEnumFix(e.prototype, n)
        }
    };
    if (typeof KJUR == "undefined" || !KJUR) KJUR = {};
    if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};
    KJUR.asn1.ASN1Util = new
    function() {
        this.integerToByteHex = function(e) {
            var t = e.toString(16);
            return t.length % 2 == 1 && (t = "0" + t),
            t
        },
        this.bigIntToMinTwosComplementsHex = function(e) {
            var n = e.toString(16);
            if (n.substr(0, 1) != "-") n.length % 2 == 1 ? n = "0" + n: n.match(/^[0-7]/) || (n = "00" + n);
            else {
                var r = n.substr(1),
                i = r.length;
                i % 2 == 1 ? i += 1 : n.match(/^[0-7]/) || (i += 2);
                var s = "";
                for (var o = 0; o < i; o++) s += "f";
                var u = new t(s, 16),
                a = u.xor(e).add(t.ONE);
                n = a.toString(16).replace(/^-/, "")
            }
            return n
        },
        this.getPEMStringFromHex = function(e, t) {
            var n = CryptoJS.enc.Hex.parse(e),
            r = CryptoJS.enc.Base64.stringify(n),
            i = r.replace(/(.{64})/g, "$1\r\n");
            return i = i.replace(/\r\n$/, ""),
            "-----BEGIN " + t + "-----\r\n" + i + "\r\n-----END " + t + "-----\r\n"
        }
    },
    KJUR.asn1.ASN1Object = function() {
        var e = !0,
        t = null,
        n = "00",
        r = "00",
        i = "";
        this.getLengthHexFromValue = function() {
            if (typeof this.hV == "undefined" || this.hV == null) throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + i.length + ",v=" + this.hV;
            var e = this.hV.length / 2,
            t = e.toString(16);
            t.length % 2 == 1 && (t = "0" + t);
            if (e < 128) return t;
            var n = t.length / 2;
            if (n > 15) throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
            var r = 128 + n;
            return r.toString(16) + t
        },
        this.getEncodedHex = function() {
            if (this.hTLV == null || this.isModified) this.hV = this.getFreshValueHex(),
            this.hL = this.getLengthHexFromValue(),
            this.hTLV = this.hT + this.hL + this.hV,
            this.isModified = !1;
            return this.hTLV
        },
        this.getValueHex = function() {
            return this.getEncodedHex(),
            this.hV
        },
        this.getFreshValueHex = function() {
            return ""
        }
    },
    KJUR.asn1.DERAbstractString = function(e) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var t = null,
        n = null;
        this.getString = function() {
            return this.s
        },
        this.setString = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = e,
            this.hV = stohex(this.s)
        },
        this.setStringHex = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = e
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        typeof e != "undefined" && (typeof e["str"] != "undefined" ? this.setString(e.str) : typeof e["hex"] != "undefined" && this.setStringHex(e.hex))
    },
    Wn.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERAbstractTime = function(e) {
        KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
        var t = null,
        n = null;
        this.localDateToUTC = function(e) {
            utc = e.getTime() + e.getTimezoneOffset() * 6e4;
            var t = new Date(utc);
            return t
        },
        this.formatDate = function(e, t) {
            var n = this.zeroPadding,
            r = this.localDateToUTC(e),
            i = String(r.getFullYear());
            t == "utc" && (i = i.substr(2, 2));
            var s = n(String(r.getMonth() + 1), 2),
            o = n(String(r.getDate()), 2),
            u = n(String(r.getHours()), 2),
            a = n(String(r.getMinutes()), 2),
            f = n(String(r.getSeconds()), 2);
            return i + s + o + u + a + f + "Z"
        },
        this.zeroPadding = function(e, t) {
            return e.length >= t ? e: (new Array(t - e.length + 1)).join("0") + e
        },
        this.getString = function() {
            return this.s
        },
        this.setString = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = e,
            this.hV = stohex(this.s)
        },
        this.setByDateValue = function(e, t, n, r, i, s) {
            var o = new Date(Date.UTC(e, t - 1, n, r, i, s, 0));
            this.setByDate(o)
        },
        this.getFreshValueHex = function() {
            return this.hV
        }
    },
    Wn.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERAbstractStructured = function(e) {
        KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
        var t = null;
        this.setByASN1ObjectArray = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array = e
        },
        this.appendASN1Object = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array.push(e)
        },
        this.asn1Array = new Array,
        typeof e != "undefined" && typeof e["array"] != "undefined" && (this.asn1Array = e.array)
    },
    Wn.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERBoolean = function() {
        KJUR.asn1.DERBoolean.superclass.constructor.call(this),
        this.hT = "01",
        this.hTLV = "0101ff"
    },
    Wn.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERInteger = function(e) {
        KJUR.asn1.DERInteger.superclass.constructor.call(this),
        this.hT = "02",
        this.setByBigInteger = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
        },
        this.setByInteger = function(e) {
            var n = new t(String(e), 10);
            this.setByBigInteger(n)
        },
        this.setValueHex = function(e) {
            this.hV = e
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        typeof e != "undefined" && (typeof e["bigint"] != "undefined" ? this.setByBigInteger(e.bigint) : typeof e["int"] != "undefined" ? this.setByInteger(e["int"]) : typeof e["hex"] != "undefined" && this.setValueHex(e.hex))
    },
    Wn.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERBitString = function(e) {
        KJUR.asn1.DERBitString.superclass.constructor.call(this),
        this.hT = "03",
        this.setHexValueIncludingUnusedBits = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = e
        },
        this.setUnusedBitsAndHexValue = function(e, t) {
            if (e < 0 || 7 < e) throw "unused bits shall be from 0 to 7: u = " + e;
            var n = "0" + e;
            this.hTLV = null,
            this.isModified = !0,
            this.hV = n + t
        },
        this.setByBinaryString = function(e) {
            e = e.replace(/0+$/, "");
            var t = 8 - e.length % 8;
            t == 8 && (t = 0);
            for (var n = 0; n <= t; n++) e += "0";
            var r = "";
            for (var n = 0; n < e.length - 1; n += 8) {
                var i = e.substr(n, 8),
                s = parseInt(i, 2).toString(16);
                s.length == 1 && (s = "0" + s),
                r += s
            }
            this.hTLV = null,
            this.isModified = !0,
            this.hV = "0" + t + r
        },
        this.setByBooleanArray = function(e) {
            var t = "";
            for (var n = 0; n < e.length; n++) e[n] == 1 ? t += "1": t += "0";
            this.setByBinaryString(t)
        },
        this.newFalseArray = function(e) {
            var t = new Array(e);
            for (var n = 0; n < e; n++) t[n] = !1;
            return t
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        typeof e != "undefined" && (typeof e["hex"] != "undefined" ? this.setHexValueIncludingUnusedBits(e.hex) : typeof e["bin"] != "undefined" ? this.setByBinaryString(e.bin) : typeof e["array"] != "undefined" && this.setByBooleanArray(e.array))
    },
    Wn.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
    KJUR.asn1.DEROctetString = function(e) {
        KJUR.asn1.DEROctetString.superclass.constructor.call(this, e),
        this.hT = "04"
    },
    Wn.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERNull = function() {
        KJUR.asn1.DERNull.superclass.constructor.call(this),
        this.hT = "05",
        this.hTLV = "0500"
    },
    Wn.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERObjectIdentifier = function(e) {
        var n = function(e) {
            var t = e.toString(16);
            return t.length == 1 && (t = "0" + t),
            t
        },
        r = function(e) {
            var r = "",
            i = new t(e, 10),
            s = i.toString(2),
            o = 7 - s.length % 7;
            o == 7 && (o = 0);
            var u = "";
            for (var a = 0; a < o; a++) u += "0";
            s = u + s;
            for (var a = 0; a < s.length - 1; a += 7) {
                var f = s.substr(a, 7);
                a != s.length - 7 && (f = "1" + f),
                r += n(parseInt(f, 2))
            }
            return r
        };
        KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
        this.hT = "06",
        this.setValueHex = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = e
        },
        this.setValueOidString = function(e) {
            if (!e.match(/^[0-9.]+$/)) throw "malformed oid string: " + e;
            var t = "",
            i = e.split("."),
            s = parseInt(i[0]) * 40 + parseInt(i[1]);
            t += n(s),
            i.splice(0, 2);
            for (var o = 0; o < i.length; o++) t += r(i[o]);
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        },
        this.setValueName = function(e) {
            if (typeof KJUR.asn1.x509.OID.name2oidList[e] == "undefined") throw "DERObjectIdentifier oidName undefined: " + e;
            var t = KJUR.asn1.x509.OID.name2oidList[e];
            this.setValueOidString(t)
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        typeof e != "undefined" && (typeof e["oid"] != "undefined" ? this.setValueOidString(e.oid) : typeof e["hex"] != "undefined" ? this.setValueHex(e.hex) : typeof e["name"] != "undefined" && this.setValueName(e.name))
    },
    Wn.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
    KJUR.asn1.DERUTF8String = function(e) {
        KJUR.asn1.DERUTF8String.superclass.constructor.call(this, e),
        this.hT = "0c"
    },
    Wn.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERNumericString = function(e) {
        KJUR.asn1.DERNumericString.superclass.constructor.call(this, e),
        this.hT = "12"
    },
    Wn.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERPrintableString = function(e) {
        KJUR.asn1.DERPrintableString.superclass.constructor.call(this, e),
        this.hT = "13"
    },
    Wn.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERTeletexString = function(e) {
        KJUR.asn1.DERTeletexString.superclass.constructor.call(this, e),
        this.hT = "14"
    },
    Wn.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERIA5String = function(e) {
        KJUR.asn1.DERIA5String.superclass.constructor.call(this, e),
        this.hT = "16"
    },
    Wn.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
    KJUR.asn1.DERUTCTime = function(e) {
        KJUR.asn1.DERUTCTime.superclass.constructor.call(this, e),
        this.hT = "17",
        this.setByDate = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = e,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)
        },
        typeof e != "undefined" && (typeof e["str"] != "undefined" ? this.setString(e.str) : typeof e["hex"] != "undefined" ? this.setStringHex(e.hex) : typeof e["date"] != "undefined" && this.setByDate(e.date))
    },
    Wn.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
    KJUR.asn1.DERGeneralizedTime = function(e) {
        KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, e),
        this.hT = "18",
        this.setByDate = function(e) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = e,
            this.s = this.formatDate(this.date, "gen"),
            this.hV = stohex(this.s)
        },
        typeof e != "undefined" && (typeof e["str"] != "undefined" ? this.setString(e.str) : typeof e["hex"] != "undefined" ? this.setStringHex(e.hex) : typeof e["date"] != "undefined" && this.setByDate(e.date))
    },
    Wn.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
    KJUR.asn1.DERSequence = function(e) {
        KJUR.asn1.DERSequence.superclass.constructor.call(this, e),
        this.hT = "30",
        this.getFreshValueHex = function() {
            var e = "";
            for (var t = 0; t < this.asn1Array.length; t++) {
                var n = this.asn1Array[t];
                e += n.getEncodedHex()
            }
            return this.hV = e,
            this.hV
        }
    },
    Wn.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
    KJUR.asn1.DERSet = function(e) {
        KJUR.asn1.DERSet.superclass.constructor.call(this, e),
        this.hT = "31",
        this.getFreshValueHex = function() {
            var e = new Array;
            for (var t = 0; t < this.asn1Array.length; t++) {
                var n = this.asn1Array[t];
                e.push(n.getEncodedHex())
            }
            return e.sort(),
            this.hV = e.join(""),
            this.hV
        }
    },
    Wn.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
    KJUR.asn1.DERTaggedObject = function(e) {
        KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
        this.hT = "a0",
        this.hV = "",
        this.isExplicit = !0,
        this.asn1Object = null,
        this.setASN1Object = function(e, t, n) {
            this.hT = t,
            this.isExplicit = e,
            this.asn1Object = n,
            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = n.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1)
        },
        this.getFreshValueHex = function() {
            return this.hV
        },
        typeof e != "undefined" && (typeof e["tag"] != "undefined" && (this.hT = e.tag), typeof e["explicit"] != "undefined" && (this.isExplicit = e.explicit), typeof e["obj"] != "undefined" && (this.asn1Object = e.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    },
    Wn.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
    function(e) {
        "use strict";
        var t = {},
        n;
        t.decode = function(t) {
            var r;
            if (n === e) {
                var i = "0123456789ABCDEF",
                s = " \f\n\r	 \u2028\u2029";
                n = [];
                for (r = 0; r < 16; ++r) n[i.charAt(r)] = r;
                i = i.toLowerCase();
                for (r = 10; r < 16; ++r) n[i.charAt(r)] = r;
                for (r = 0; r < s.length; ++r) n[s.charAt(r)] = -1
            }
            var o = [],
            u = 0,
            a = 0;
            for (r = 0; r < t.length; ++r) {
                var f = t.charAt(r);
                if (f == "=") break;
                f = n[f];
                if (f == -1) continue;
                if (f === e) throw "Illegal character at offset " + r;
                u |= f,
                ++a >= 2 ? (o[o.length] = u, u = 0, a = 0) : u <<= 4
            }
            if (a) throw "Hex encoding incomplete: 4 bits missing";
            return o
        },
        window.Hex = t
    } (),
    function(e) {
        "use strict";
        var t = {},
        n;
        t.decode = function(t) {
            var r;
            if (n === e) {
                var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                s = "= \f\n\r	 \u2028\u2029";
                n = [];
                for (r = 0; r < 64; ++r) n[i.charAt(r)] = r;
                for (r = 0; r < s.length; ++r) n[s.charAt(r)] = -1
            }
            var o = [],
            u = 0,
            a = 0;
            for (r = 0; r < t.length; ++r) {
                var f = t.charAt(r);
                if (f == "=") break;
                f = n[f];
                if (f == -1) continue;
                if (f === e) throw "Illegal character at offset " + r;
                u |= f,
                ++a >= 4 ? (o[o.length] = u >> 16, o[o.length] = u >> 8 & 255, o[o.length] = u & 255, u = 0, a = 0) : u <<= 6
            }
            switch (a) {
            case 1:
                throw "Base64 encoding incomplete: at least 2 bits missing";
            case 2:
                o[o.length] = u >> 10;
                break;
            case 3:
                o[o.length] = u >> 16,
                o[o.length] = u >> 8 & 255
            }
            return o
        },
        t.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        t.unarmor = function(e) {
            var n = t.re.exec(e);
            if (n) if (n[1]) e = n[1];
            else {
                if (!n[2]) throw "RegExp out of sync";
                e = n[2]
            }
            return t.decode(e)
        },
        window.Base64 = t
    } (),
    function(e) {
        "use strict";
        function t(e, n) {
            e instanceof t ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = n)
        }
        function n(e, t, n, r, i) {
            this.stream = e,
            this.header = t,
            this.length = n,
            this.tag = r,
            this.sub = i
        }
        var r = 100,
        i = "…",
        s = {
            tag: function(e, t) {
                var n = document.createElement(e);
                return n.className = t,
                n
            },
            text: function(e) {
                return document.createTextNode(e)
            }
        };
        t.prototype.get = function(t) {
            t === e && (t = this.pos++);
            if (t >= this.enc.length) throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
            return this.enc[t]
        },
        t.prototype.hexDigits = "0123456789ABCDEF",
        t.prototype.hexByte = function(e) {
            return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(e & 15)
        },
        t.prototype.hexDump = function(e, t, n) {
            var r = "";
            for (var i = e; i < t; ++i) {
                r += this.hexByte(this.get(i));
                if (n !== !0) switch (i & 15) {
                case 7:
                    r += "  ";
                    break;
                case 15:
                    r += "\n";
                    break;
                default:
                    r += " "
                }
            }
            return r
        },
        t.prototype.parseStringISO = function(e, t) {
            var n = "";
            for (var r = e; r < t; ++r) n += String.fromCharCode(this.get(r));
            return n
        },
        t.prototype.parseStringUTF = function(e, t) {
            var n = "";
            for (var r = e; r < t;) {
                var i = this.get(r++);
                i < 128 ? n += String.fromCharCode(i) : i > 191 && i < 224 ? n += String.fromCharCode((i & 31) << 6 | this.get(r++) & 63) : n += String.fromCharCode((i & 15) << 12 | (this.get(r++) & 63) << 6 | this.get(r++) & 63)
            }
            return n
        },
        t.prototype.parseStringBMP = function(e, t) {
            var n = "";
            for (var r = e; r < t; r += 2) {
                var i = this.get(r),
                s = this.get(r + 1);
                n += String.fromCharCode((i << 8) + s)
            }
            return n
        },
        t.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
        t.prototype.parseTime = function(e, t) {
            var n = this.parseStringISO(e, t),
            r = this.reTime.exec(n);
            return r ? (n = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4], r[5] && (n += ":" + r[5], r[6] && (n += ":" + r[6], r[7] && (n += "." + r[7]))), r[8] && (n += " UTC", r[8] != "Z" && (n += r[8], r[9] && (n += ":" + r[9]))), n) : "Unrecognized time: " + n
        },
        t.prototype.parseInteger = function(e, t) {
            var n = t - e;
            if (n > 4) {
                n <<= 3;
                var r = this.get(e);
                if (r === 0) n -= 8;
                else while (r < 128) r <<= 1,
                --n;
                return "(" + n + " bit)"
            }
            var i = 0;
            for (var s = e; s < t; ++s) i = i << 8 | this.get(s);
            return i
        },
        t.prototype.parseBitString = function(e, t) {
            var n = this.get(e),
            r = (t - e - 1 << 3) - n,
            i = "(" + r + " bit)";
            if (r <= 20) {
                var s = n;
                i += " ";
                for (var o = t - 1; o > e; --o) {
                    var u = this.get(o);
                    for (var a = s; a < 8; ++a) i += u >> a & 1 ? "1": "0";
                    s = 0
                }
            }
            return i
        },
        t.prototype.parseOctetString = function(e, t) {
            var n = t - e,
            s = "(" + n + " byte) ";
            n > r && (t = e + r);
            for (var o = e; o < t; ++o) s += this.hexByte(this.get(o));
            return n > r && (s += i),
            s
        },
        t.prototype.parseOID = function(e, t) {
            var n = "",
            r = 0,
            i = 0;
            for (var s = e; s < t; ++s) {
                var o = this.get(s);
                r = r << 7 | o & 127,
                i += 7;
                if (! (o & 128)) {
                    if (n === "") {
                        var u = r < 80 ? r < 40 ? 0 : 1 : 2;
                        n = u + "." + (r - u * 40)
                    } else n += "." + (i >= 31 ? "bigint": r);
                    r = i = 0
                }
            }
            return n
        },
        n.prototype.typeName = function() {
            if (this.tag === e) return "unknown";
            var t = this.tag >> 6,
            n = this.tag >> 5 & 1,
            r = this.tag & 31;
            switch (t) {
            case 0:
                switch (r) {
                case 0:
                    return "EOC";
                case 1:
                    return "BOOLEAN";
                case 2:
                    return "INTEGER";
                case 3:
                    return "BIT_STRING";
                case 4:
                    return "OCTET_STRING";
                case 5:
                    return "NULL";
                case 6:
                    return "OBJECT_IDENTIFIER";
                case 7:
                    return "ObjectDescriptor";
                case 8:
                    return "EXTERNAL";
                case 9:
                    return "REAL";
                case 10:
                    return "ENUMERATED";
                case 11:
                    return "EMBEDDED_PDV";
                case 12:
                    return "UTF8String";
                case 16:
                    return "SEQUENCE";
                case 17:
                    return "SET";
                case 18:
                    return "NumericString";
                case 19:
                    return "PrintableString";
                case 20:
                    return "TeletexString";
                case 21:
                    return "VideotexString";
                case 22:
                    return "IA5String";
                case 23:
                    return "UTCTime";
                case 24:
                    return "GeneralizedTime";
                case 25:
                    return "GraphicString";
                case 26:
                    return "VisibleString";
                case 27:
                    return "GeneralString";
                case 28:
                    return "UniversalString";
                case 30:
                    return "BMPString";
                default:
                    return "Universal_" + r.toString(16)
                };
            case 1:
                return "Application_" + r.toString(16);
            case 2:
                return "[" + r + "]";
            case 3:
                return "Private_" + r.toString(16)
            }
        },
        n.prototype.reSeemsASCII = /^[ -~]+$/,
        n.prototype.content = function() {
            if (this.tag === e) return null;
            var t = this.tag >> 6,
            n = this.tag & 31,
            s = this.posContent(),
            o = Math.abs(this.length);
            if (t !== 0) {
                if (this.sub !== null) return "(" + this.sub.length + " elem)";
                var u = this.stream.parseStringISO(s, s + Math.min(o, r));
                return this.reSeemsASCII.test(u) ? u.substring(0, 2 * r) + (u.length > 2 * r ? i: "") : this.stream.parseOctetString(s, s + o)
            }
            switch (n) {
            case 1:
                return this.stream.get(s) === 0 ? "false": "true";
            case 2:
                return this.stream.parseInteger(s, s + o);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)": this.stream.parseBitString(s, s + o);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)": this.stream.parseOctetString(s, s + o);
            case 6:
                return this.stream.parseOID(s, s + o);
            case 16:
            case 17:
                return "(" + this.sub.length + " elem)";
            case 12:
                return this.stream.parseStringUTF(s, s + o);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return this.stream.parseStringISO(s, s + o);
            case 30:
                return this.stream.parseStringBMP(s, s + o);
            case 23:
            case 24:
                return this.stream.parseTime(s, s + o)
            }
            return null
        },
        n.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null": this.sub.length) + "]"
        },
        n.prototype.print = function(t) {
            t === e && (t = ""),
            document.writeln(t + this);
            if (this.sub !== null) {
                t += "  ";
                for (var n = 0,
                r = this.sub.length; n < r; ++n) this.sub[n].print(t)
            }
        },
        n.prototype.toPrettyString = function(t) {
            t === e && (t = "");
            var n = t + this.typeName() + " @" + this.stream.pos;
            this.length >= 0 && (n += "+"),
            n += this.length,
            this.tag & 32 ? n += " (constructed)": (this.tag == 3 || this.tag == 4) && this.sub !== null && (n += " (encapsulates)"),
            n += "\n";
            if (this.sub !== null) {
                t += "  ";
                for (var r = 0,
                i = this.sub.length; r < i; ++r) n += this.sub[r].toPrettyString(t)
            }
            return n
        },
        n.prototype.toDOM = function() {
            var e = s.tag("div", "node");
            e.asn1 = this;
            var t = s.tag("div", "head"),
            n = this.typeName().replace(/_/g, " ");
            t.innerHTML = n;
            var r = this.content();
            if (r !== null) {
                r = String(r).replace(/</g, "&lt;");
                var i = s.tag("span", "preview");
                i.appendChild(s.text(r)),
                t.appendChild(i)
            }
            e.appendChild(t),
            this.node = e,
            this.head = t;
            var o = s.tag("div", "value");
            n = "Offset: " + this.stream.pos + "<br/>",
            n += "Length: " + this.header + "+",
            this.length >= 0 ? n += this.length: n += -this.length + " (undefined)",
            this.tag & 32 ? n += "<br/>(constructed)": (this.tag == 3 || this.tag == 4) && this.sub !== null && (n += "<br/>(encapsulates)");
            if (r !== null) {
                n += "<br/>Value:<br/><b>" + r + "</b>";
                if (typeof oids == "object" && this.tag == 6) {
                    var u = oids[r];
                    u && (u.d && (n += "<br/>" + u.d), u.c && (n += "<br/>" + u.c), u.w && (n += "<br/>(warning!)"))
                }
            }
            o.innerHTML = n,
            e.appendChild(o);
            var a = s.tag("div", "sub");
            if (this.sub !== null) for (var f = 0,
            l = this.sub.length; f < l; ++f) a.appendChild(this.sub[f].toDOM());
            return e.appendChild(a),
            t.onclick = function() {
                e.className = e.className == "node collapsed" ? "node": "node collapsed"
            },
            e
        },
        n.prototype.posStart = function() {
            return this.stream.pos
        },
        n.prototype.posContent = function() {
            return this.stream.pos + this.header
        },
        n.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        },
        n.prototype.fakeHover = function(e) {
            this.node.className += " hover",
            e && (this.head.className += " hover")
        },
        n.prototype.fakeOut = function(e) {
            var t = / ?hover/;
            this.node.className = this.node.className.replace(t, ""),
            e && (this.head.className = this.head.className.replace(t, ""))
        },
        n.prototype.toHexDOM_sub = function(e, t, n, r, i) {
            if (r >= i) return;
            var o = s.tag("span", t);
            o.appendChild(s.text(n.hexDump(r, i))),
            e.appendChild(o)
        },
        n.prototype.toHexDOM = function(t) {
            var n = s.tag("span", "hex");
            t === e && (t = n),
            this.head.hexNode = n,
            this.head.onmouseover = function() {
                this.hexNode.className = "hexCurrent"
            },
            this.head.onmouseout = function() {
                this.hexNode.className = "hex"
            },
            n.asn1 = this,
            n.onmouseover = function() {
                var e = !t.selected;
                e && (t.selected = this.asn1, this.className = "hexCurrent"),
                this.asn1.fakeHover(e)
            },
            n.onmouseout = function() {
                var e = t.selected == this.asn1;
                this.asn1.fakeOut(e),
                e && (t.selected = null, this.className = "hex")
            },
            this.toHexDOM_sub(n, "tag", this.stream, this.posStart(), this.posStart() + 1),
            this.toHexDOM_sub(n, this.length >= 0 ? "dlen": "ulen", this.stream, this.posStart() + 1, this.posContent());
            if (this.sub === null) n.appendChild(s.text(this.stream.hexDump(this.posContent(), this.posEnd())));
            else if (this.sub.length > 0) {
                var r = this.sub[0],
                i = this.sub[this.sub.length - 1];
                this.toHexDOM_sub(n, "intro", this.stream, this.posContent(), r.posStart());
                for (var o = 0,
                u = this.sub.length; o < u; ++o) n.appendChild(this.sub[o].toHexDOM(t));
                this.toHexDOM_sub(n, "outro", this.stream, i.posEnd(), this.posEnd())
            }
            return n
        },
        n.prototype.toHexString = function(e) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        },
        n.decodeLength = function(e) {
            var t = e.get(),
            n = t & 127;
            if (n == t) return n;
            if (n > 3) throw "Length over 24 bits not supported at position " + (e.pos - 1);
            if (n === 0) return - 1;
            t = 0;
            for (var r = 0; r < n; ++r) t = t << 8 | e.get();
            return t
        },
        n.hasContent = function(e, r, i) {
            if (e & 32) return ! 0;
            if (e < 3 || e > 4) return ! 1;
            var s = new t(i);
            e == 3 && s.get();
            var o = s.get();
            if (o >> 6 & 1) return ! 1;
            try {
                var u = n.decodeLength(s);
                return s.pos - i.pos + u == r
            } catch(a) {
                return ! 1
            }
        },
        n.decode = function(e) {
            e instanceof t || (e = new t(e, 0));
            var r = new t(e),
            i = e.get(),
            s = n.decodeLength(e),
            o = e.pos - r.pos,
            u = null;
            if (n.hasContent(i, s, e)) {
                var a = e.pos;
                i == 3 && e.get(),
                u = [];
                if (s >= 0) {
                    var f = a + s;
                    while (e.pos < f) u[u.length] = n.decode(e);
                    if (e.pos != f) throw "Content size is not correct for container starting at offset " + a
                } else try {
                    for (;;) {
                        var l = n.decode(e);
                        if (l.tag === 0) break;
                        u[u.length] = l
                    }
                    s = a - e.pos
                } catch(c) {
                    throw "Exception while decoding undefined length content: " + c
                }
            } else e.pos += s;
            return new n(r, o, s, i, u)
        },
        n.test = function() {
            var e = [{
                value: [39],
                expected: 39
            },
            {
                value: [129, 201],
                expected: 201
            },
            {
                value: [131, 254, 220, 186],
                expected: 16702650
            }];
            for (var r = 0,
            i = e.length; r < i; ++r) {
                var s = 0,
                o = new t(e[r].value, 0),
                u = n.decodeLength(o);
                u != e[r].expected && document.write("In test[" + r + "] expected " + e[r].expected + " got " + u + "\n")
            }
        },
        window.ASN1 = n
    } (),
    ASN1.prototype.getHexStringValue = function() {
        var e = this.toHexString(),
        t = this.header * 2,
        n = this.length * 2;
        return e.substr(t, n)
    },
    hn.prototype.parseKey = function(e) {
        try {
            var t = 0,
            n = 0,
            r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
            i = r.test(e) ? Hex.decode(e) : Base64.unarmor(e),
            s = ASN1.decode(i);
            if (s.sub.length === 9) {
                t = s.sub[1].getHexStringValue(),
                this.n = an(t, 16),
                n = s.sub[2].getHexStringValue(),
                this.e = parseInt(n, 16);
                var o = s.sub[3].getHexStringValue();
                this.d = an(o, 16);
                var u = s.sub[4].getHexStringValue();
                this.p = an(u, 16);
                var a = s.sub[5].getHexStringValue();
                this.q = an(a, 16);
                var f = s.sub[6].getHexStringValue();
                this.dmp1 = an(f, 16);
                var l = s.sub[7].getHexStringValue();
                this.dmq1 = an(l, 16);
                var c = s.sub[8].getHexStringValue();
                this.coeff = an(c, 16)
            } else {
                if (s.sub.length !== 2) return ! 1;
                var h = s.sub[1],
                p = h.sub[0];
                t = p.sub[0].getHexStringValue(),
                this.n = an(t, 16),
                n = p.sub[1].getHexStringValue(),
                this.e = parseInt(n, 16)
            }
            return ! 0
        } catch(d) {
            return ! 1
        }
    },
    hn.prototype.getPrivateBaseKey = function() {
        var e = {
            array: [new KJUR.asn1.DERInteger({
                "int": 0
            }), new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                "int": this.e
            }), new KJUR.asn1.DERInteger({
                bigint: this.d
            }), new KJUR.asn1.DERInteger({
                bigint: this.p
            }), new KJUR.asn1.DERInteger({
                bigint: this.q
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmp1
            }), new KJUR.asn1.DERInteger({
                bigint: this.dmq1
            }), new KJUR.asn1.DERInteger({
                bigint: this.coeff
            })]
        },
        t = new KJUR.asn1.DERSequence(e);
        return t.getEncodedHex()
    },
    hn.prototype.getPrivateBaseKeyB64 = function() {
        return Sn(this.getPrivateBaseKey())
    },
    hn.prototype.getPublicBaseKey = function() {
        var e = {
            array: [new KJUR.asn1.DERObjectIdentifier({
                oid: "1.2.840.113549.1.1.1"
            }), new KJUR.asn1.DERNull]
        },
        t = new KJUR.asn1.DERSequence(e);
        e = {
            array: [new KJUR.asn1.DERInteger({
                bigint: this.n
            }), new KJUR.asn1.DERInteger({
                "int": this.e
            })]
        };
        var n = new KJUR.asn1.DERSequence(e);
        e = {
            hex: "00" + n.getEncodedHex()
        };
        var r = new KJUR.asn1.DERBitString(e);
        e = {
            array: [t, r]
        };
        var i = new KJUR.asn1.DERSequence(e);
        return i.getEncodedHex()
    },
    hn.prototype.getPublicBaseKeyB64 = function() {
        return Sn(this.getPublicBaseKey())
    },
    hn.prototype.wordwrap = function(e, t) {
        t = t || 64;
        if (!e) return e;
        var n = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
        return e.match(RegExp(n, "g")).join("\n")
    },
    hn.prototype.getPrivateKey = function() {
        var e = "-----BEGIN RSA PRIVATE KEY-----\n";
        return e += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
        e += "-----END RSA PRIVATE KEY-----",
        e
    },
    hn.prototype.getPublicKey = function() {
        var e = "-----BEGIN PUBLIC KEY-----\n";
        return e += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
        e += "-----END PUBLIC KEY-----",
        e
    },
    hn.prototype.hasPublicKeyProperty = function(e) {
        return e = e || {},
        e.hasOwnProperty("n") && e.hasOwnProperty("e")
    },
    hn.prototype.hasPrivateKeyProperty = function(e) {
        return e = e || {},
        e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
    },
    hn.prototype.parsePropertiesFrom = function(e) {
        this.n = e.n,
        this.e = e.e,
        e.hasOwnProperty("d") && (this.d = e.d, this.p = e.p, this.q = e.q, this.dmp1 = e.dmp1, this.dmq1 = e.dmq1, this.coeff = e.coeff)
    };
    var Kn = function(e) {
        hn.call(this),
        e && (typeof e == "string" ? this.parseKey(e) : (this.hasPrivateKeyProperty(e) || this.hasPublicKeyProperty(e)) && this.parsePropertiesFrom(e))
    };
    Kn.prototype = new hn,
    Kn.prototype.constructor = Kn;
    var Qn = function(e) {
        e = e || {},
        this.default_key_size = parseInt(e.default_key_size) || 1024,
        this.default_public_exponent = e.default_public_exponent || "010001",
        this.log = e.log || !1,
        this.key = null
    };
    Qn.prototype.setKey = function(e) {
        this.log && this.key && console.warn("A key was already set, overriding existing."),
        this.key = new Kn(e)
    },
    Qn.prototype.setPrivateKey = function(e) {
        this.setKey(e)
    },
    Qn.prototype.setPublicKey = function(e) {
        this.setKey(e)
    },
    Qn.prototype.decrypt = function(e) {
        try {
            return this.getKey().decrypt(xn(e))
        } catch(t) {
            return ! 1
        }
    },
    Qn.prototype.encrypt = function(e) {
        try {
            return Sn(this.getKey().encrypt(e))
        } catch(t) {
            return ! 1
        }
    },
    Qn.prototype.getKey = function(e) {
        if (!this.key) {
            this.key = new Kn;
            if (e && {}.toString.call(e) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
                return
            }
            this.key.generate(this.default_key_size, this.default_public_exponent)
        }
        return this.key
    },
    Qn.prototype.getPrivateKey = function() {
        return this.getKey().getPrivateKey()
    },
    Qn.prototype.getPrivateKeyB64 = function() {
        return this.getKey().getPrivateBaseKeyB64()
    },
    Qn.prototype.getPublicKey = function() {
        return this.getKey().getPublicKey()
    },
    Qn.prototype.getPublicKeyB64 = function() {
        return this.getKey().getPublicBaseKeyB64()
    },
    e.JSEncrypt = Qn
})(JSEncryptExports);
var JSEncrypt = JSEncryptExports.JSEncrypt; (function(g) {
    function tryget(e, t, n) {
        var r = t.split("."),
        i,
        s = r.length;
        for (var o = e,
        u = 0; u < s; ++u) {
            i = r[u];
            if (! (i in o)) return n;
            o = o[r[u]]
        }
        return o
    }
    function normalizeDateTime(e) {
        if (!e) return null;
        var t;
        return e = e.toString(),
        e.match(/^\d{10}$/) ? t = new Date(parseInt(e, 10) * 1e3) : e.match(/^\d{10,}$/) ? t = new Date(parseInt(e, 10)) : e.indexOf("-") > 0 && (t = new Date(Date.parse(e.replace(/-/g, "/")))),
        t
    }
    function chsdate(e, t) {
        var n = normalizeDateTime(e),
        r;
        return n ? (r = format("{month}月{date}日 {hour}:{minute,2,0}", {
            month: n.getMonth() + 1,
            date: n.getDate(),
            hour: n.getHours(),
            minute: n.getMinutes()
        }), t ? n.getFullYear() + "年" + r: r) : null
    }
    function jsonToStr(e, t, n) {
        t = t || "&",
        n = n || "=";
        var r = [],
        i,
        s;
        for (i in e) {
            s = e[i];
            if (s == null) continue;
            e.hasOwnProperty(i) && (s instanceof Array ? r.push(encodeURIComponent(i) + "[]" + n + encodeURIComponent(s)) : r.push(encodeURIComponent(i) + n + encodeURIComponent(s)))
        }
        return r.join(t)
    }
    function belowthefold(e, t) {
        var n, r = $(window);
        return n = (window.innerHeight ? window.innerHeight: r.height()) + r.scrollTop(),
        n <= $(e).offset().top - t.threshold
    }
    function rightoffold(e, t) {
        var n, r = $(window);
        return n = r.width() + r.scrollLeft(),
        n <= $(e).offset().left - t.threshold
    }
    function abovethetop(e, t) {
        var n, r = $(window);
        return n = r.scrollTop(),
        n >= $(e).offset().top + t.threshold + $(e).height()
    }
    function leftofbegin(e, t) {
        var n, r = $(window);
        return n = r.scrollLeft(),
        n >= $(e).offset().left + t.threshold + $(e).width()
    }
    function inviewport(e, t) {
        return ! rightoffold(e, t) && !leftofbegin(e, t) && !belowthefold(e, t) && !abovethetop(e, t)
    }
    var utils = g.$utils || {},
    isPlainObject = $.isPlainObject;
    utils.tryget = tryget;
    var format = function() {
        function e(e, t) {
            var n = parseInt(t.align),
            r = Math.abs(t.align),
            i,
            s;
            if (e == null) s = "";
            else {
                if (typeof e != "number") throw new Error("Invalid argument type!");
                s = "" + e
            }
            return r === 0 ? e: (r < s.length ? i = n > 0 ? s.slice(0, r) : s.slice( - r) : (i = Array(r - s.length + 1).join(t.pad || format.DefaultPaddingChar), i = n > 0 ? i + s: s + i), i)
        }
        function t(e) {
            var t = {},
            n, r, i = format.DefaultFieldSeperator;
            return n = e.indexOf(i),
            n < 0 ? t.index = e: (t.index = e.substr(0, n), r = e.indexOf(i, n + 1), r < 0 ? t.align = e.substring(n + 1, e.length) : (t.align = e.substring(n + 1, r), t.pad = e.substring(r + 1, e.length))),
            t
        }
        return function(n, r) {
            var i = arguments.length;
            if (i > 2) r = Array.prototype.slice.call(arguments, 1);
            else if (i === 2 && !

            isPlainObject(r)) r = [r];
            else if (i === 1) return n;
            return n.replace(format.InterpolationPattern,
            function(n, i) {
                var s = t(i),
                o = tryget(r, s.index);
                return o == null && (o = s.index),
                s.align == null && s.pad == null ? o: e(o, s) || o
            })
        }
    } ();
    format.DefaultPaddingChar = " ",
    format.DefaultFieldSeperator = ",",
    format.InterpolationPattern = /\{(.*?)\}/g,
    utils.format = format,
    utils.formatDate = function(e, t) {
        t = t || {};
        var n = String(e),
        r,
        i = n.match(/000$/) ? 1 : 1e3;
        return n.match(/^[\d]+$/) ? r = new Date(parseInt(e * i, 10)) : r = new Date(Date.parse(n.replace(/-/g, "/"))),
        format(t.format || utils.formatDate.DateFormatShort, {
            year: r.getFullYear(),
            month: r.getMonth() + 1,
            date: r.getDate(),
            hour: r.getHours(),
            min: r.getMinutes()
        })
    },
    utils.formatDate.DateFormatShort = "{month,2,0}-{date,2,0} {hour,2,0}:{min,2,0}";
    var a = document.createElement("a"),
    ratio = window.devicePixelRatio || 1;
    utils.dmfd = function(e, t, n, r) {
        return utils.optimizeQhimg(e, {
            type: "dmfd",
            width: t,
            height: n,
            useRatio: !!r
        })
    },
    utils.dmt = function(e, t, n, r) {
        return utils.optimizeQhimg(e, {
            type: "dmt",
            width: t,
            height: n,
            useRatio: !!r
        })
    },
    utils.optimizeQhimg = function(e, t) {
        if (!~e.indexOf("qhimg.com")) return e;
        var n = "dc dr sdr bdr edr edrh dm dmt dmb dml dmr bdm bdmt bdmb bdml bdmr sdmt dmfd dmtfd dmsmty",
        r = {
            width: 200,
            height: 100,
            quality: 70,
            type: "dmfd",
            useRatio: !1
        },
        i = {},
        s = n.replace(/[^, ]+/g,
        function(e) {
            return ["\\/", e, "\\/"].join("")
        });
        if ((new RegExp("(" + s.split(" ").join("|") + ")")).test(e)) {
            if (!t) return e;
            i.type = RegExp.$1.slice(1, -1),
            e = e.replace(new RegExp(i.type + "\\/(\\d*_\\d*_\\d*)\\/"),
            function(e, t) {
                var n = t.split("_");
                return i.width = n[0],
                i.height = n[1],
                i.quality = n[2],
                ""
            })
        } (t && t.type && n.indexOf(t.type) === -1 || t && !t.type) && delete t.type,
        t = $.extend({},
        r, i, t),
        window.$netType == 0 && t.useRatio && (t.useRatio = !1);
        if (t.useRatio) {
            var o = window.devicePixelRatio;
            o >= 2 ? o = 2 : o = 1,
            t.width && (t.width *= o),
            t.height && (t.height *= o)
        }
        var u = utils.getParam("zoom_out", e) || 70;
        u && (t.width && (t.width *= u / 100), t.height && (t.height *= u / 100)),
        t.width = t.width ? Math.round(t.width) : t.width,
        t.height = t.height ? Math.round(t.height) : t.height;
        var a = [t.type, [t.width, t.height, t.quality].join("_")].join("/");
        return e.replace(/((?:http:\/\/|https:\/\?)?[A-Za-z0-9\.]+)\/(.*)/,
        function(e, t, n) {
            return [t, a, n].join("/")
        })
    },
    utils.chsdate = chsdate,
    utils.elapse = function(e) {
        var t = normalizeDateTime(e);
        if (!t) return null;
        var n = new Date,
        r = Math.floor((n - t) / 1e3);
        if (r <= 60) return "刚刚";
        if (r > 60 && r < 3600) return Math.floor(r / 60) + "分钟前";
        if (r >= 3600 && r < 86400) return Math.floor(r / 3600) + "小时前";
        if (r >= 86400 && r < 259200) return Math.floor(r / 86400) + "天前";
        if (r >= 259200) {
            var n = new Date,
            i = "{month,2,0}月{date,2,0}日";
            return n.getFullYear() !== t.getFullYear() && (i = "{year}年{month,2,0}月{date,2,0}日"),
            format(i, {
                year: t.getFullYear(),
                month: t.getMonth() + 1,
                date: t.getDate()
            })
        }
    },
    utils.resizeAmap = function(e, t, n) {
        return e.replace(/size=(\d+)\*(\d+)/,
        function(e, r, i) {
            return "size=" + t + "*" + n
        })
    },
    utils.unescape = function(e) {
        return e.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#39;/g, "'")
    },
    utils.escape = function(e) {
        return e ? e.replace(/&/g, "&amp").replace(/</g, "&lt").replace(/>/g, "&gt").replace(/\"/g, "&quot").replace(/'/g, "&#039").replace(/'/g, "&#39") : e
    },
    utils.uuid = function() {
        return "xxxxxxxx.xxxx.4xxx.yxxx.xxxxxxxxxxxx".replace(/[xy]/g,
        function(e) {
            var t = Math.random() * 16 | 0,
            n = e == "x" ? t: t & 3 | 8;
            return n.toString(16)
        })
    },
    utils.toKw = function(e) {
        return e < 1e3 ? e: e < 1e4 && e >= 1e3 ? (e / 1e3).toFixed(0) + "K": (e / 1e4).toFixed(0) + "W"
    },
    utils.fromKw = function(e) {
        var t = {
            k: 1e3,
            w: 1e4
        },
        n = e.toLowerCase().replace(/([\d.]+)(k|w)$/,
        function(e, n, r) {
            return parseInt(n, 10) * (t[r] || 1)
        });
        return parseInt(n, 10)
    },
    utils.extractVideoUrl = function(e) {
        a.href = e;
        var t = a.search.toString();
        return ! t || t.indexOf("?url=") < 0 ? e: (t = a.search.split("="), t.length < 2 ? e: decodeURIComponent(t[1]))
    };
    var stripTagDiv = document.createElement("div");
    utils.stripTags = function(e) {
        return stripTagDiv.innerHTML = e,
        stripTagDiv.textContent || stripTagDiv.innerText
    },
    utils.trunc = function(e, t, n, r) {
        if (!e) return e;
        r && (e = utils.stripTags(e));
        var i = 0,
        s = e.length,
        o, u = "",
        a = 0;
        if (s < t / 2) return e;
        for (; i < s && a < t; ++i) o = e.charAt(i),
        u += o,
        a += o.match(/[ 。 ；  ， ： “ ”（ ） 、 ？ 《 》\u4E00-\u9FA5]/) ? 2 : 1;
        return u + (n || "")
    },
    utils.getParam = function(e, t) {
        var n = t ? t: window.location.search,
        r = n.match(new RegExp("[?&]{1}" + e + "=([^&]*)"));
        return r === null ? null: decodeURIComponent(r[1])
    };
    var cookie = {
        get: function(e) {
            if (typeof e != "string" || !e || !document.cookie) return;
            e = e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
            var t = new RegExp("(?:^|;)\\s?" + e + "=(.*?)(?:;|$)", "i"),
            n = document.cookie.match(t);
            return n && decodeURIComponent(n[1])
        },
        set: function(e, t, n) {
            if (typeof e != "string" || !e) return;
            n = n || {};
            var r = n.expires,
            i = e + "=" + t;
            return typeof r == "number" && (r = new Date, r.setTime(r.getTime() + n.expires)),
            r instanceof Date && (i += "; expires=" + r.toUTCString()),
            n.domain && (i += "; domain=" + n.domain),
            n.path && (i += "; path=" + n.path),
            n.secure && (i += "; secure"),
            document.cookie = i,
            i
        }
    };
    utils.cookie = cookie,
    utils.jsonToStr = jsonToStr,
    utils.countNum = function(e, t) {
        var n = 0,
        r = /[\u4e00-\u9fa5]/,
        i = parseInt("FF61", 16),
        s = parseInt("FF9F", 16),
        o = parseInt("FFE8", 16),
        u = parseInt("FFEE", 16);
        for (var a = 0,
        f = e.length; a < f; a++) if (r.test(e[a])) n += 1;
        else {
            var l = parseInt(e.charCodeAt(a));
            l < 256 ? n += .5 : i <= l && l <= s ? n += .5 : o <= l && l <= u ? n += .5 : n += 1
        }
        return n >= t ? e.substr(0, t - 2) + "...": e
    },
    utils.isEmptyObj = function(e) {
        for (var t in e) return ! 1;
        return ! 0
    },
    utils.inviewport = inviewport,
    utils.setWeblogMonitorMap = function(e) {
        if (! (typeof e == "object" && e instanceof Array)) return;
        var t = window.weblogMap ? window.weblogMap: {};
        for (var n = 0,
        r = e.length; n < r; n++) {
            var i = e[n];
            if (!t[i.gid]) {
                var s, o, u = {},
                a = "";
                i.is_ad && i.data && i.data.ads && (i = i.data.ads[0]),
                i.ad_id ? (s = i.ad_id, o = 1) : (s = i.gid, o = 0),
                i.s_log.length && (u = i.s_log, a = JSON.parse(u).channel_position ? "-" + JSON.parse(u).channel_position[1] : ""),
                t[s + a] = {},
                t[s + a].slog = i.s_log.length ? i.s_log: "{}",
                t[s + a].adtrack = o
            }
        }
        window.weblogMap = t
    },
    utils.ExtendJson = function() {
        window.JSON || (window.JSON = {
            parse: function(sJSON) {
                return eval("(" + sJSON + ")")
            },
            stringify: function() {
                var e = Object.prototype.toString,
                t = Array.isArray ||
                function(t) {
                    return e.call(t) === "[object Array]"
                },
                n = {
                    '"': '\\"',
                    "\\": "\\\\",
                    "\b": "\\b",
                    "\f": "\\f",
                    "\n": "\\n",
                    "\r": "\\r",
                    "	": "\\t"
                },
                r = function(e) {
                    return n[e] || "\\u" + (e.charCodeAt(0) + 65536).toString(16).substr(1)
                },
                i = /[\\"\u0000-\u001F\u2028\u2029]/g;
                return function s(n) {
                    if (n == null) return "null";
                    if (typeof n == "number") return isFinite(n) ? n.toString() : "null";
                    if (typeof n == "boolean") return n.toString();
                    if (typeof n == "object") {
                        if (typeof n.toJSON == "function") return s(n.toJSON());
                        if (t(n)) {
                            var o = "[";
                            for (var u = 0; u < n.length; u++) o += (u ? ", ": "") + s(n[u]);
                            return o + "]"
                        }
                        if (e.call(n) === "[object Object]") {
                            var a = [];
                            for (var f in n) n.hasOwnProperty(f) && a.push(s(f) + ": " + s(n[f]));
                            return "{" + a.join(", ") + "}"
                        }
                    }
                    return '"' + n.toString().replace(i, r) + '"'
                }
            } ()
        })
    } (),
    utils.decryptVideo = function(e) {
        var t = e.substr(3);
        nlen = t.length,
        temp = "";
        for (var n = 0; n < nlen; n += 11) temp += t.substr(n + 1, 10);
        return t = temp,
        window.Base64.decode(t).reverse().map(function(e) {
            return String.fromCharCode(e)
        }).join("")
    },
    utils.getObjByKey = function(e, t, n) {
        if (!e) return;
        var r;
        if (e[t]) r = e;
        else for (var i in e) typeof e[i] == "object" && utils.getObjByKey(e[i], t, n);
        return r && n.push(r),
        n
    },
    $.ajaxSetup({
        success: function(e, t, n) {
            if (e) {
                var r = utils.getObjByKey(e, "s_log", []);
                utils.setWeblogMonitorMap(r)
            }
        }
    }),
    g.$utils || (g.$utils = utils)
})(this),
function(e, t) {
    var n = e.jQuery || e.Cowboy || (e.Cowboy = {}),
    r;
    n.throttle = r = function(e, r, i, s) {
        function a() {
            function l() {
                u = +(new Date),
                i.apply(n, f)
            }
            function c() {
                o = t
            }
            var n = this,
            a = +(new Date) - u,
            f = arguments;
            s && !o && l(),
            o && clearTimeout(o),
            s === t && a > e ? l() : r !== !0 && (o = setTimeout(s ? c: l, s === t ? e - a: e))
        }
        var o, u = 0;
        return typeof r != "boolean" && (s = i, i = r, r = t),
        n.guid && (a.guid = i.guid = i.guid || n.guid++),
        a
    },
    n.debounce = function(e, n, i) {
        return i === t ? r(e, n, !1) : r(e, i, n !== !1)
    }
} (this),
!
function() {
    function S(e) {
        return e.replace(m, "").replace(g, ",").replace(y, "").replace(b, "").replace(w, "").split(E)
    }
    function x(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }
    function T(e, t) {
        function C(e) {
            return a += e.split(/\n/).length - 1,
            o && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
            e && (e = p[1] + x(e) + p[2] + "\n"),
            e
        }
        function k(e) {
            var r = a;
            s ? e = s(e, t) : n && (e = e.replace(/\n/g,
            function() {
                return a++,
                "$line=" + a + ";"
            }));
            if (e.indexOf("=") === 0) {
                var i = u && !/^=[=#]/.test(e);
                e = e.replace(/^=[=#]?|[\s;]*$/g, "");
                if (i) {
                    var o = e.replace(/\s*\([^\)]+\)/, ""); ! l[o] && !/^(include|print)$/.test(o) && (e = "$escape(" + e + ")")
                } else e = "$string(" + e + ")";
                e = p[1] + e + p[2]
            }
            return n && (e = "$line=" + r + ";" + e),
            d(S(e),
            function(e) {
                if (!e || f[e]) return;
                var t;
                e === "print" ? t = m: e === "include" ? t = g: l[e] ? t = "$utils." + e: c[e] ? t = "$helpers." + e: t = "$data." + e,
                y += e + "=" + t + ",",
                f[e] = !0
            }),
            e + "\n"
        }
        var n = t.debug,
        r = t.openTag,
        i = t.closeTag,
        s = t.parser,
        o = t.compress,
        u = t.escape,
        a = 1,
        f = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        },
        h = "".trim,
        p = h ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        v = h ? "$out+=text;return $out;": "$out.push(text);",
        m = "function(){var text=''.concat.apply('',arguments);" + v + "}",
        g = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + v + "}",
        y = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (n ? "$line=0,": ""),
        b = p[0],
        w = "return new String(" + p[3] + ");";
        d(e.split(r),
        function(e) {
            e = e.split(i);
            var t = e[0],
            n = e[1];
            e.length === 1 ? b += C(t) : (b += k(t), n && (b += C(n)))
        });
        var E = y + b + w;
        n && (E = "try{" + E + "}catch(e){" + "throw {" + "filename:$filename," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + x(e) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')" + "};" + "}");
        try {
            var T = new Function("$data", "$filename", E);
            return T.prototype = l,
            T
        } catch(N) {
            throw N.temp = "function anonymous($data,$filename) {" + E + "}",
            N
        }
    }
    var e = function(e, t) {
        return typeof t == "string" ? p(t, {
            filename: e
        }) : r(e, t)
    };
    e.version = "3.0.0",
    e.config = function(e, n) {
        t[e] = n
    };
    var t = e.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    },
    n = e.cache = {};
    e.render = function(e, t) {
        return p(e, t)
    };
    var r = e.renderFile = function(t, n) {
        var r = e.get(t) || h({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return n ? r(n) : r
    };
    e.get = function(e) {
        var t;
        if (n[e]) t = n[e];
        else if (typeof document == "object") {
            var r = document.getElementById(e);
            if (r) {
                var i = (r.value || r.innerHTML).replace(/^\s*|\s*$/g, "");
                t = p(i, {
                    filename: e
                })
            }
        }
        return t
    };
    var i = function(e, t) {
        return typeof e != "string" && (t = typeof e, t === "number" ? e += "": t === "function" ? e = i(e.call(e)) : e = ""),
        e
    },
    s = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    o = function(e) {
        return s[e]
    },
    u = function(e) {
        return i(e).replace(/&(?![\w#]+;)|[<>"']/g, o)
    },
    a = Array.isArray ||
    function(e) {
        return {}.toString.call(e) === "[object Array]"
    },
    f = function(e, t) {
        var n, r;
        if (a(e)) for (n = 0, r = e.length; n < r; n++) t.call(e, e[n], n, e);
        else for (n in e) t.call(e, e[n], n)
    },
    l = e.utils = {
        $helpers: {},
        $include: r,
        $string: i,
        $escape: u,
        $each: f
    };
    e.helper = function(e, t) {
        c[e] = t
    };
    var c = e.helpers = l.$helpers;
    e.onerror = function(e) {
        var t = "Template Error\n\n";
        for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
    };
    var h = function(t) {
        return e.onerror(t),
        function() {
            return "{Template Error}"
        }
    },
    p = e.compile = function(e, r) {
        function a(t) {
            try {
                return new o(t, s) + ""
            } catch(n) {
                return r.debug ? h(n)() : (r.debug = !0, p(e, r)(t))
            }
        }
        r = r || {};
        for (var i in t) r[i] === undefined && (r[i] = t[i]);
        var s = r.filename;
        try {
            var o = T(e, r)
        } catch(u) {
            return u.filename = s || "anonymous",
            u.name = "Syntax Error",
            h(u)
        }
        return a.prototype = o.prototype,
        a.toString = function() {
            return o.toString()
        },
        s && r.cache && (n[s] = a),
        a
    },
    d = l.$each,
    v = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
    m = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
    g = /[^\w$]+/g,
    y = new RegExp(["\\b" + v.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
    b = /^\d[^,]*|,\d[^,]*/g,
    w = /^,+|,+$/g,
    E = /^$|,+/;
    t.openTag = "{{",
    t.closeTag = "}}";
    var N = function(e, t) {
        var n = t.split(":"),
        r = n.shift(),
        i = n.join(":") || "";
        return i && (i = ", " + i),
        "$helpers." + r + "(" + e + i + ")"
    };
    t.parser = function(t, n) {
        t = t.replace(/^\s/, "");
        var r = t.split(" "),
        i = r.shift(),
        s = r.join(" ");
        switch (i) {
        case "if":
            t = "if(" + s + "){";
            break;
        case "else":
            r.shift() === "if" ? r = " if(" + r.join(" ") + ")": r = "",
            t = "}else" + r + "{";
            break;
        case "/if":
            t = "}";
            break;
        case "each":
            var o = r[0] || "$data",
            u = r[1] || "as",
            a = r[2] || "$value",
            f = r[3] || "$index",
            l = a + "," + f;
            u !== "as" && (o = "[]"),
            t = "$each(" + o + ",function(" + l + "){";
            break;
        case "/each":
            t = "});";
            break;
        case "echo":
            t = "print(" + s + ");";
            break;
        case "print":
        case "include":
            t = i + "(" + r.join(",") + ");";
            break;
        default:
            if (/^\s*\|\s*[\w\$]/.test(s)) {
                var c = !0;
                t.indexOf("#") === 0 && (t = t.substr(1), c = !1);
                var h = 0,
                p = t.split("|"),
                d = p.length,
                v = p[h++];
                for (; h < d; h++) v = N(v, p[h]);
                t = (c ? "=": "=#") + v
            } else e.helpers[i] ? t = "=#" + i + "(" + r.join(",") + ");": t = "=" + t
        }
        return t
    },
    typeof define == "function" ? define(function() {
        return e
    }) : typeof exports != "undefined" ? module.exports = e: this.template = e
} (),
function() {
    template.helper("cutCityProvince",
    function(e, t) {
        if (!e) return "";
        var n, r;
        r = e.length,
        n = e.slice(r - 1, r);
        if (n == "市" || n == "省") e = e.slice(0, r - 1);
        return e
    }),
    template.helper("catUrl",
    function(e) {
        return + e == 43e4 ? "//hunan.btime.com": e ? webRoot + "/local/" + e: ""
    }),
    template.helper("cutter",
    function(e, t) {
        var n, r, i, s, o;
        return e ? e.indexOf("qhimg.com") < 0 && e.indexOf("qhmsg.com") < 0 && e.indexOf("cdn.btime") < 0 ? e: (t && (s = t.split("-")[0] + "_" + t.split("-")[1] + "_", o = e.match(/^(https?:\/\/.+?)(\/.+)*(\/.+)$/), o && o.length > 0 && (n = [o[1], "/", "dmfd", "/", s, o[3]].join(""))), n ? n: e) : "//p3.ssl.cdn.btime.com/t01742f4d8eae91b502.png"
    }),
    template.helper("strCount",
    function(e, t) {
        var e = $.trim(e),
        n = 0,
        r = /[\u4e00-\u9fa5]/,
        i = parseInt("FF61", 16),
        s = parseInt("FF9F", 16),
        o = parseInt("FFE8", 16),
        u = parseInt("FFEE", 16);
        for (var a = 0,
        f = e.length; a < f; a++) if (r.test(e[a])) n += 1;
        else {
            var l = parseInt(e.charCodeAt(a));
            l < 256 ? n += .5 : i <= l && l <= s ? n += .5 : o <= l && l <= u ? n += .5 : n += 1
        }
        return n
    }),
    template.helper("ellipsis",
    function(e, t) {
        return e.length > t && (e = e.slice(0, t - 3) + "..."),
        e
    }),
    template.helper("getChannelPosition",
    function(e) {
        if (e) return JSON.parse(e).channel_position ? JSON.parse(e).channel_position[1] : ""
    })
} (),
function(e) {
    e.isScrollToFixed = function(t) {
        return !! e(t).data("ScrollToFixed")
    },
    e.ScrollToFixed = function(t, n) {
        function b() {
            s.trigger("preUnfixed.ScrollToFixed"),
            C(),
            s.trigger("unfixed.ScrollToFixed"),
            d = -1,
            c = s.offset().top,
            h = s.offset().left,
            r.options.offsets && (h += s.offset().left - s.position().left),
            p == -1 && (p = h),
            o = s.css("position"),
            i = !0,
            r.options.bottom != -1 && !r.options.bottom_reverse && (s.trigger("preFixed.ScrollToFixed"), T(), s.trigger("fixed.ScrollToFixed"))
        }
        function w() {
            var e = r.options.limit;
            return e ? typeof e == "function" ? e.apply(s) : e: 0
        }
        function E() {
            return o === "fixed"
        }
        function S() {
            return o === "absolute"
        }
        function x() {
            return ! E() && !S()
        }
        function T() {
            if (!E()) {
                var e = s[0].getBoundingClientRect();
                v.css({
                    display: s.css("display"),
                    width: e.width,
                    height: e.height,
                    "float": s.css("float")
                }),
                y = {
                    "z-index": r.options.zIndex,
                    position: "fixed",
                    top: r.options.bottom == -1 ? L() : "",
                    bottom: r.options.bottom == -1 ? "": r.options.bottom,
                    "margin-left": "0px"
                },
                r.options.dontSetWidth || (y.width = s.css("width")),
                s.css(y),
                s.addClass(r.options.baseClassName),
                r.options.className && s.addClass(r.options.className),
                o = "fixed"
            }
        }
        function N() {
            var e = w(),
            t = h;
            r.options.removeOffsets && (t = "", e -= c),
            y = {
                position: "absolute",
                top: e,
                left: t,
                "margin-left": "0px",
                bottom: ""
            },
            r.options.dontSetWidth || (y.width = s.css("width")),
            s.css(y),
            o = "absolute"
        }
        function C() {
            x() || (d = -1, v.css("display", "none"), s.css({
                "z-index": l,
                width: "",
                position: u,
                left: "",
                top: f,
                "margin-left": ""
            }), s.removeClass("scroll-to-fixed-fixed"), r.options.className && s.removeClass(r.options.className), o = null)
        }
        function k(e) {
            e != d && (s.css("left", h - e), d = e)
        }
        function L() {
            var e = r.options.marginTop;
            return e ? typeof e == "function" ? e.apply(s) : e: 0
        }
        function A() {
            if (!e.isScrollToFixed(s) || s.is(":hidden")) return;
            var t = i,
            n = x();
            i ? x() && (c = s.offset().top, h = s.offset().left) : b();
            var o = e(window).scrollLeft(),
            a = e(window).scrollTop(),
            f = w();
            if (r.options.minWidth && e(window).width() < r.options.minWidth) {
                if (!x() || !t) M(),
                s.trigger("preUnfixed.ScrollToFixed"),
                C(),
                s.trigger("unfixed.ScrollToFixed")
            } else if (r.options.maxWidth && e(window).width() > r.options.maxWidth) {
                if (!x() || !t) M(),
                s.trigger("preUnfixed.ScrollToFixed"),
                C(),
                s.trigger("unfixed.ScrollToFixed")
            } else if (r.options.bottom == -1) {
                if (f > 0 && a >= f - L()) ! n && (!S() || !t) && (M(), s.trigger("preAbsolute.ScrollToFixed"), N(), s.trigger("unfixed.ScrollToFixed"));
                else if (a >= c - L()) {
                    if (!E() || !t) M(),
                    s.trigger("preFixed.ScrollToFixed"),
                    T(),
                    d = -1,
                    s.trigger("fixed.ScrollToFixed");
                    k(o)
                } else if (!x() || !t) M(),
                s.trigger("preUnfixed.ScrollToFixed"),
                C(),
                s.trigger("unfixed.ScrollToFixed")
            } else f > 0 ? r.options.bottom_reverse ? a + e(window).height() - s.outerHeight(!0) >= f - (L() || -O()) ? (E() || (M(), s.trigger("preFixed.ScrollToFixed"), T()), k(o), s.trigger("fixed.ScrollToFixed")) : E() && (M(), s.trigger("preUnfixed.ScrollToFixed"), u === "absolute" ? N() : C(), s.trigger("unfixed.ScrollToFixed")) : a + e(window).height() - s.outerHeight(!0) >= f - (L() || -O()) ? E() && (M(), s.trigger("preUnfixed.ScrollToFixed"), u === "absolute" ? N() : C(), s.trigger("unfixed.ScrollToFixed")) : (E() || (M(), s.trigger("preFixed.ScrollToFixed"), T()), k(o), s.trigger("fixed.ScrollToFixed")) : k(o)
        }
        function O() {
            return r.options.bottom ? r.options.bottom: 0
        }
        function M() {
            var e = s.css("position");
            e == "absolute" ? s.trigger("postAbsolute.ScrollToFixed") : e == "fixed" ? s.trigger("postFixed.ScrollToFixed") : s.trigger("postUnfixed.ScrollToFixed")
        }
        var r = this;
        r.$el = e(t),
        r.el = t,
        r.$el.data("ScrollToFixed", r);
        var i = !1,
        s = r.$el,
        o, u, a, f, l, c = 0,
        h = 0,
        p = -1,
        d = -1,
        v = null,
        m, g, y, _ = function(e) {
            s.is(":visible") ? (i = !1, A()) : C()
        },
        D = function(e) {
            window.requestAnimationFrame ? requestAnimationFrame(A) : A()
        },
        P = function() {
            var e = document.body;
            if (document.createElement && e && e.appendChild && e.removeChild) {
                var t = document.createElement("div");
                if (!t.getBoundingClientRect) return null;
                t.innerHTML = "x",
                t.style.cssText = "position:fixed;top:100px;",
                e.appendChild(t);
                var n = e.style.height,
                r = e.scrollTop;
                e.style.height = "3000px",
                e.scrollTop = 500;
                var i = t.getBoundingClientRect().top;
                e.style.height = n;
                var s = i === 100;
                return e.removeChild(t),
                e.scrollTop = r,
                s
            }
            return null
        },
        H = function(e) {
            e = e || window.event,
            e.preventDefault && e.preventDefault(),
            e.returnValue = !1
        };
        r.init = function() {
            r.options = e.extend({},
            e.ScrollToFixed.defaultOptions, n),
            l = s.css("z-index"),
            r.$el.css("z-index", r.options.zIndex),
            v = e("<div />"),
            o = s.css("position"),
            u = s.css("position"),
            a = s.css("float"),
            f = s.css("top"),
            x() && r.$el.after(v),
            e(window).bind("resize.ScrollToFixed", _),
            e(window).bind("scroll.ScrollToFixed", D),
            "ontouchmove" in window && e(window).bind("touchmove.ScrollToFixed", A),
            r.options.preFixed && s.bind("preFixed.ScrollToFixed", r.options.preFixed),
            r.options.postFixed && s.bind("postFixed.ScrollToFixed", r.options.postFixed),
            r.options.preUnfixed && s.bind("preUnfixed.ScrollToFixed", r.options.preUnfixed),
            r.options.postUnfixed && s.bind("postUnfixed.ScrollToFixed", r.options.postUnfixed),
            r.options.preAbsolute && s.bind("preAbsolute.ScrollToFixed", r.options.preAbsolute),
            r.options.postAbsolute && s.bind("postAbsolute.ScrollToFixed", r.options.postAbsolute),
            r.options.fixed && s.bind("fixed.ScrollToFixed", r.options.fixed),
            r.options.unfixed && s.bind("unfixed.ScrollToFixed", r.options.unfixed),
            r.options.spacerClass && v.addClass(r.options.spacerClass),
            s.bind("resize.ScrollToFixed",
            function() {
                v.height(s.height())
            }),
            s.bind("scroll.ScrollToFixed",
            function() {
                s.trigger("preUnfixed.ScrollToFixed"),
                C(),
                s.trigger("unfixed.ScrollToFixed"),
                A()
            }),
            s.bind("detach.ScrollToFixed",
            function(t) {
                H(t),
                s.trigger("preUnfixed.ScrollToFixed"),
                C(),
                s.trigger("unfixed.ScrollToFixed"),
                e(window).unbind("resize.ScrollToFixed", _),
                e(window).unbind("scroll.ScrollToFixed", D),
                s.unbind(".ScrollToFixed"),
                v.remove(),
                r.$el.removeData("ScrollToFixed")
            }),
            _()
        },
        r.init()
    },
    e.ScrollToFixed.defaultOptions = {
        marginTop: 0,
        limit: 0,
        bottom: -1,
        zIndex: 1e3,
        baseClassName: "scroll-to-fixed-fixed",
        bottom_reverse: !1
    },
    e.fn.scrollToFixed = function(t) {
        return this.each(function() {
            new e.ScrollToFixed(this, t)
        })
    }
} (jQuery),
function(e, t, n, r) {
    var i = e(t);
    e.fn.lazyload = function(s) {
        function f() {
            var t = 0;
            o.each(function() {
                var n = e(this);
                if (a.skip_invisible && !n.is(":visible")) return;
                if (!e.abovethetop(this, a) && !e.leftofbegin(this, a)) if (!e.belowthefold(this, a) && !e.rightoffold(this, a)) n.trigger("appear"),
                t = 0;
                else if (++t > a.failure_limit) return ! 1
            })
        }
        var o = this,
        u, a = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: t,
            data_attribute: "original",
            skip_invisible: !1,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return s && (r !== s.failurelimit && (s.failure_limit = s.failurelimit, delete s.failurelimit), r !== s.effectspeed && (s.effect_speed = s.effectspeed, delete s.effectspeed), e.extend(a, s)),
        u = a.container === r || a.container === t ? i: e(a.container),
        0 === a.event.indexOf("scroll") && u.on(a.event,
        function() {
            return f()
        }),
        this.each(function() {
            var t = this,
            n = e(t);
            t.loaded = !1,
            (n.attr("src") === r || n.attr("src") === !1) && n.is("img") && n.attr("src", a.placeholder),
            n.one("appear",
            function() {
                if (!this.loaded) {
                    if (a.appear) {
                        var r = o.length;
                        a.appear.call(t, r, a)
                    }
                    e("<img />").one("load",
                    function() {
                        var r = n.attr("data-" + a.data_attribute);
                        n.hide(),
                        n.is("img") ? n.attr("src", r) : n.css("background-image", "url('" + r + "')"),
                        n[a.effect](a.effect_speed),
                        t.loaded = !0;
                        var i = e.grep(o,
                        function(e) {
                            return ! e.loaded
                        });
                        o = e(i);
                        if (a.load) {
                            var s = o.length;
                            a.load.call(t, s, a)
                        }
                    }).attr("src", n.attr("data-" + a.data_attribute))
                }
            }),
            0 !== a.event.indexOf("scroll") && n.on(a.event,
            function() {
                t.loaded || n.trigger("appear")
            })
        }),
        i.on("resize",
        function() {
            f()
        }),
        /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && i.on("pageshow",
        function(t) {
            t.originalEvent && t.originalEvent.persisted && o.each(function() {
                e(this).trigger("appear")
            })
        }),
        e(n).ready(function() {
            f()
        }),
        this
    },
    e.belowthefold = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = (t.innerHeight ? t.innerHeight: i.height()) + i.scrollTop() : o = e(s.container).offset().top + e(s.container).height(),
        o <= e(n).offset().top - s.threshold
    },
    e.rightoffold = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.width() + i.scrollLeft() : o = e(s.container).offset().left + e(s.container).width(),
        o <= e(n).offset().left - s.threshold
    },
    e.abovethetop = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.scrollTop() : o = e(s.container).offset().top,
        o >= e(n).offset().top + s.threshold + e(n).height()
    },
    e.leftofbegin = function(n, s) {
        var o;
        return s.container === r || s.container === t ? o = i.scrollLeft() : o = e(s.container).offset().left,
        o >= e(n).offset().left + s.threshold + e(n).width()
    },
    e.inviewport = function(t, n) {
        return ! e.rightoffold(t, n) && !e.leftofbegin(t, n) && !e.belowthefold(t, n) && !e.abovethetop(t, n)
    },
    e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return ! e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return ! e.rightoffold(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        },
        "above-the-fold": function(t) {
            return ! e.belowthefold(t, {
                threshold: 0
            })
        },
        "right-of-fold": function(t) {
            return e.rightoffold(t, {
                threshold: 0
            })
        },
        "left-of-fold": function(t) {
            return ! e.rightoffold(t, {
                threshold: 0
            })
        }
    })
} (jQuery, window, document);
var requirejs, require, define; (function(global, setTimeout) {
    function commentReplace(e, t) {
        return t || ""
    }
    function isFunction(e) {
        return ostring.call(e) === "[object Function]"
    }
    function isArray(e) {
        return ostring.call(e) === "[object Array]"
    }
    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length; n += 1) if (e[n] && t(e[n], n, e)) break
        }
    }
    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1; n -= 1) if (e[n] && t(e[n], n, e)) break
        }
    }
    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }
    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }
    function eachProp(e, t) {
        var n;
        for (n in e) if (hasProp(e, n) && t(e[n], n)) break
    }
    function mixin(e, t, n, r) {
        return t && eachProp(t,
        function(t, i) {
            if (n || !hasProp(e, i)) r && typeof t == "object" && t && !isArray(t) && !isFunction(t) && !(t instanceof RegExp) ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
        }),
        e
    }
    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function defaultOnError(e) {
        throw e
    }
    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."),
        function(e) {
            t = t[e]
        }),
        t
    }
    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e,
        i.requireModules = r,
        n && (i.originalError = n),
        i
    }
    function newContext(e) {
        function m(e) {
            var t, n;
            for (t = 0; t < e.length; t++) {
                n = e[t];
                if (n === ".") e.splice(t, 1),
                t -= 1;
                else if (n === "..") {
                    if (t === 0 || t === 1 && e[2] === ".." || e[t - 1] === "..") continue;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
        }
        function g(e, t, n) {
            var r, i, s, u, a, f, l, c, h, p, d, v, g = t && t.split("/"),
            y = o.map,
            b = y && y["*"];
            e && (e = e.split("/"), l = e.length - 1, o.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e[0].charAt(0) === "." && g && (v = g.slice(0, g.length - 1), e = v.concat(e)), m(e), e = e.join("/"));
            if (n && y && (g || b)) {
                s = e.split("/");
                e: for (u = s.length; u > 0; u -= 1) {
                    f = s.slice(0, u).join("/");
                    if (g) for (a = g.length; a > 0; a -= 1) {
                        i = getOwn(y, g.slice(0, a).join("/"));
                        if (i) {
                            i = getOwn(i, f);
                            if (i) {
                                c = i,
                                h = u;
                                break e
                            }
                        }
                    } ! p && b && getOwn(b, f) && (p = getOwn(b, f), d = u)
                } ! c && p && (c = p, h = d),
                c && (s.splice(0, h, c), e = s.join("/"))
            }
            return r = getOwn(o.pkgs, e),
            r ? r: e
        }
        function y(e) {
            isBrowser && each(scripts(),
            function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName) return t.parentNode.removeChild(t),
                !0
            })
        }
        function b(e) {
            var t = getOwn(o.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(),
            r.require.undef(e),
            r.makeRequire(null, {
                skipMap: !0
            })([e]),
            !0
        }
        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)),
            [t, e]
        }
        function E(e, t, n, i) {
            var s, o, u, a, f = null,
            l = t ? t.name: null,
            h = e,
            p = !0,
            m = "";
            return e || (p = !1, e = "_@r" + (d += 1)),
            a = w(e),
            f = a[0],
            e = a[1],
            f && (f = g(f, l, i), o = getOwn(c, f)),
            e && (f ? n ? m = e: o && o.normalize ? m = o.normalize(e,
            function(e) {
                return g(e, l, i)
            }) : m = e.indexOf("!") === -1 ? g(e, l, i) : e: (m = g(e, l, i), a = w(m), f = a[0], m = a[1], n = !0, s = r.nameToUrl(m))),
            u = f && !o && !n ? "_unnormalized" + (v += 1) : "",
            {
                prefix: f,
                name: m,
                parentMap: t,
                unnormalized: !!u,
                url: s,
                originalName: h,
                isDefine: p,
                id: (f ? f + "!" + m: m) + u
            }
        }
        function S(e) {
            var t = e.id,
            n = getOwn(u, t);
            return n || (n = u[t] = new r.Module(e)),
            n
        }
        function x(e, t, n) {
            var r = e.id,
            i = getOwn(u, r);
            hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = S(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
        }
        function T(e, t) {
            var n = e.requireModules,
            r = !1;
            t ? t(e) : (each(n,
            function(t) {
                var n = getOwn(u, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }
        function N() {
            globalDefQueue.length && (each(globalDefQueue,
            function(e) {
                var t = e[0];
                typeof t == "string" && (r.defQueueMap[t] = !0),
                l.push(e)
            }), globalDefQueue = [])
        }
        function C(e) {
            delete u[e],
            delete a[e]
        }
        function k(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps,
            function(r, i) {
                var s = r.id,
                o = getOwn(u, s);
                o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : k(o, t, n))
            }), n[r] = !0)
        }
        function L() {
            var e, n, i = o.waitSeconds * 1e3,
            u = i && r.startTime + i < (new Date).getTime(),
            f = [],
            l = [],
            c = !1,
            h = !0;
            if (t) return;
            t = !0,
            eachProp(a,
            function(e) {
                var t = e.map,
                r = t.id;
                if (!e.enabled) return;
                t.isDefine || l.push(e);
                if (!e.error) if (!e.inited && u) b(r) ? (n = !0, c = !0) : (f.push(r), y(r));
                else if (!e.inited && e.fetched && t.isDefine) {
                    c = !0;
                    if (!t.prefix) return h = !1
                }
            });
            if (u && f.length) return e = makeError("timeout", "Load timeout for modules: " + f, null, f),
            e.contextName = r.contextName,
            T(e);
            h && each(l,
            function(e) {
                k(e, {},
                {})
            }),
            (!u || n) && c && (isBrowser || isWebWorker) && !s && (s = setTimeout(function() {
                s = 0,
                L()
            },
            50)),
            t = !1
        }
        function A(e) {
            hasProp(c, e[0]) || S(E(e[0], null, !0)).init(e[1], e[2])
        }
        function O(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }
        function M(e) {
            var t = e.currentTarget || e.srcElement;
            return O(t, r.onScriptLoad, "load", "onreadystatechange"),
            O(t, r.onScriptError, "error"),
            {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }
        function _() {
            var e;
            N();
            while (l.length) {
                e = l.shift();
                if (e[0] === null) return T(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                A(e)
            }
            r.defQueueMap = {}
        }
        var t, n, r, i, s, o = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
        u = {},
        a = {},
        f = {},
        l = [],
        c = {},
        h = {},
        p = {},
        d = 1,
        v = 1;
        return i = {
            require: function(e) {
                return e.require ? e.require: e.require = r.makeRequire(e.map)
            },
            exports: function(e) {
                e.usingExports = !0;
                if (e.map.isDefine) return e.exports ? c[e.map.id] = e.exports: e.exports = c[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module: e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(o.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        },
        n = function(e) {
            this.events = getOwn(f, e.id) || {},
            this.map = e,
            this.shim = getOwn(o.shim, e.id),
            this.depExports = [],
            this.depMaps = [],
            this.depMatched = [],
            this.pluginMaps = {},
            this.depCount = 0
        },
        n.prototype = {
            init: function(e, t, n, r) {
                r = r || {};
                if (this.inited) return;
                this.factory = t,
                n ? this.on("error", n) : this.events.error && (n = bind(this,
                function(e) {
                    this.emit("error", e)
                })),
                this.depMaps = e && e.slice(0),
                this.errback = n,
                this.inited = !0,
                this.ignore = r.ignore,
                r.enabled || this.enabled ? this.enable() : this.check()
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (this.fetched) return;
                this.fetched = !0,
                r.startTime = (new Date).getTime();
                var e = this.map;
                if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
                r.makeRequire(this.map, {
                    enableBuildCallback: !0
                })(this.shim.deps || [], bind(this,
                function() {
                    return e.prefix ? this.callPlugin() : this.load()
                }))
            },
            load: function() {
                var e = this.map.url;
                h[e] || (h[e] = !0, r.load(this.map.id, e))
            },
            check: function() {
                if (!this.enabled || this.enabling) return;
                var e, t, n = this.map.id,
                i = this.depExports,
                s = this.exports,
                o = this.factory;
                if (!this.inited) hasProp(r.defQueueMap, n) || this.fetch();
                else if (this.error) this.emit("error", this.error);
                else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(o)) {
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                s = r.execCb(n, o, i, s)
                            } catch(u) {
                                e = u
                            } else s = r.execCb(n, o, i, s);
                            this.map.isDefine && s === undefined && (t = this.module, t ? s = t.exports: this.usingExports && (s = this.exports));
                            if (e) return e.requireMap = this.map,
                            e.requireModules = this.map.isDefine ? [this.map.id] : null,
                            e.requireType = this.map.isDefine ? "define": "require",
                            T(this.error = e)
                        } else s = o;
                        this.exports = s;
                        if (this.map.isDefine && !this.ignore) {
                            c[n] = s;
                            if (req.onResourceLoad) {
                                var a = [];
                                each(this.depMaps,
                                function(e) {
                                    a.push(e.normalizedMap || e)
                                }),
                                req.onResourceLoad(r, this.map, a)
                            }
                        }
                        C(n),
                        this.defined = !0
                    }
                    this.defining = !1,
                    this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            },
            callPlugin: function() {
                var e = this.map,
                t = e.id,
                n = E(e.prefix);
                this.depMaps.push(n),
                x(n, "defined", bind(this,
                function(n) {
                    var i, s, a, f = getOwn(p, this.map.id),
                    l = this.map.name,
                    c = this.map.parentMap ? this.map.parentMap.name: null,
                    h = r.makeRequire(e.parentMap, {
                        enableBuildCallback: !0
                    });
                    if (this.map.unnormalized) {
                        n.normalize && (l = n.normalize(l,
                        function(e) {
                            return g(e, c, !0)
                        }) || ""),
                        s = E(e.prefix + "!" + l, this.map.parentMap, !0),
                        x(s, "defined", bind(this,
                        function(e) {
                            this.map.normalizedMap = s,
                            this.init([],
                            function() {
                                return e
                            },
                            null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })),
                        a = getOwn(u, s.id),
                        a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this,
                        function(e) {
                            this.emit("error", e)
                        })), a.enable());
                        return
                    }
                    if (f) {
                        this.map.url = r.nameToUrl(f),
                        this.load();
                        return
                    }
                    i = bind(this,
                    function(e) {
                        this.init([],
                        function() {
                            return e
                        },
                        null, {
                            enabled: !0
                        })
                    }),
                    i.error = bind(this,
                    function(e) {
                        this.inited = !0,
                        this.error = e,
                        e.requireModules = [t],
                        eachProp(u,
                        function(e) {
                            e.map.id.indexOf(t + "_unnormalized") === 0 && C(e.map.id)
                        }),
                        T(e)
                    }),
                    i.fromText = bind(this,
                    function(n, s) {
                        var u = e.name,
                        a = E(u),
                        f = useInteractive;
                        s && (n = s),
                        f && (useInteractive = !1),
                        S(a),
                        hasProp(o.config, t) && (o.config[u] = o.config[t]);
                        try {
                            req.exec(n)
                        } catch(l) {
                            return T(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                        }
                        f && (useInteractive = !0),
                        this.depMaps.push(a),
                        r.completeLoad(u),
                        h([u], i)
                    }),
                    n.load(e.name, h, i, o)
                })),
                r.enable(n, this),
                this.pluginMaps[n.id] = n
            },
            enable: function() {
                a[this.map.id] = this,
                this.enabled = !0,
                this.enabling = !0,
                each(this.depMaps, bind(this,
                function(e, t) {
                    var n, s, o;
                    if (typeof e == "string") {
                        e = E(e, this.map.isDefine ? this.map: this.map.parentMap, !1, !this.skipMap),
                        this.depMaps[t] = e,
                        o = getOwn(i, e.id);
                        if (o) {
                            this.depExports[t] = o(this);
                            return
                        }
                        this.depCount += 1,
                        x(e, "defined", bind(this,
                        function(e) {
                            if (this.undefed) return;
                            this.defineDep(t, e),
                            this.check()
                        })),
                        this.errback ? x(e, "error", bind(this, this.errback)) : this.events.error && x(e, "error", bind(this,
                        function(e) {
                            this.emit("error", e)
                        }))
                    }
                    n = e.id,
                    s = u[n],
                    !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
                })),
                eachProp(this.pluginMaps, bind(this,
                function(e) {
                    var t = getOwn(u, e.id);
                    t && !t.enabled && r.enable(e, this)
                })),
                this.enabling = !1,
                this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []),
                n.push(t)
            },
            emit: function(

            e, t) {
                each(this.events[e],
                function(e) {
                    e(t)
                }),
                e === "error" && delete this.events[e]
            }
        },
        r = {
            config: o,
            contextName: e,
            registry: u,
            defined: c,
            urlFetched: h,
            defQueue: l,
            defQueueMap: {},
            Module: n,
            makeModuleMap: E,
            nextTick: req.nextTick,
            onError: T,
            configure: function(e) {
                e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                if (typeof e.urlArgs == "string") {
                    var t = e.urlArgs;
                    e.urlArgs = function(e, n) {
                        return (n.indexOf("?") === -1 ? "?": "&") + t
                    }
                }
                var n = o.shim,
                i = {
                    paths: !0,
                    bundles: !0,
                    config: !0,
                    map: !0
                };
                eachProp(e,
                function(e, t) {
                    i[t] ? (o[t] || (o[t] = {}), mixin(o[t], e, !0, !0)) : o[t] = e
                }),
                e.bundles && eachProp(e.bundles,
                function(e, t) {
                    each(e,
                    function(e) {
                        e !== t && (p[e] = t)
                    })
                }),
                e.shim && (eachProp(e.shim,
                function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }),
                    (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)),
                    n[t] = e
                }), o.shim = n),
                e.packages && each(e.packages,
                function(e) {
                    var t, n;
                    e = typeof e == "string" ? {
                        name: e
                    }: e,
                    n = e.name,
                    t = e.location,
                    t && (o.paths[n] = e.location),
                    o.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }),
                eachProp(u,
                function(e, t) { ! e.inited && !e.map.unnormalized && (e.map = E(t, null, !0))
                }),
                (e.deps || e.callback) && r.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)),
                    t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, n) {
                function s(o, a, f) {
                    var l, h, p;
                    return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0),
                    typeof o == "string" ? isFunction(a) ? T(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = E(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : T(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "": ". Use require([])")))) : (_(), r.nextTick(function() {
                        _(),
                        p = S(E(null, t)),
                        p.skipMap = n.skipMap,
                        p.init(o, a, f, {
                            enabled: !0
                        }),
                        L()
                    }), s)
                }
                return n = n || {},
                mixin(s, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var n, i = e.lastIndexOf("."),
                        s = e.split("/")[0],
                        o = s === "." || s === "..";
                        return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)),
                        r.nameToUrl(g(e, t && t.id, !0), n, !0)
                    },
                    defined: function(e) {
                        return hasProp(c, E(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = E(e, t, !1, !0).id,
                        hasProp(c, e) || hasProp(u, e)
                    }
                }),
                t || (s.undef = function(e) {
                    N();
                    var n = E(e, t, !0),
                    i = getOwn(u, e);
                    i.undefed = !0,
                    y(e),
                    delete c[e],
                    delete h[n.url],
                    delete f[e],
                    eachReverse(l,
                    function(t, n) {
                        t[0] === e && l.splice(n, 1)
                    }),
                    delete r.defQueueMap[e],
                    i && (i.events.defined && (f[e] = i.events), C(e))
                }),
                s
            },
            enable: function(e) {
                var t = getOwn(u, e.id);
                t && S(e).enable()
            },
            completeLoad: function(e) {
                var t, n, i, s = getOwn(o.shim, e) || {},
                a = s.exports;
                N();
                while (l.length) {
                    n = l.shift();
                    if (n[0] === null) {
                        n[0] = e;
                        if (t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    A(n)
                }
                r.defQueueMap = {},
                i = getOwn(u, e);
                if (!t && !hasProp(c, e) && i && !i.inited) {
                    if (o.enforceDefine && (!a || !getGlobal(a))) {
                        if (b(e)) return;
                        return T(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    A([e, s.deps || [], s.exportsFn])
                }
                L()
            },
            nameToUrl: function(e, t, n) {
                var i, s, u, a, f, l, c, h = getOwn(o.pkgs, e);
                h && (e = h),
                c = getOwn(p, e);
                if (c) return r.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) f = e + (t || "");
                else {
                    i = o.paths,
                    s = e.split("/");
                    for (u = s.length; u > 0; u -= 1) {
                        a = s.slice(0, u).join("/"),
                        l = getOwn(i, a);
                        if (l) {
                            isArray(l) && (l = l[0]),
                            s.splice(0, u, l);
                            break
                        }
                    }
                    f = s.join("/"),
                    f += t || (/^data\:|^blob\:|\?/.test(f) || n ? "": ".js"),
                    f = (f.charAt(0) === "/" || f.match(/^[\w\+\.\-]+:/) ? "": o.baseUrl) + f
                }
                return o.urlArgs && !/^blob\:/.test(f) ? f + o.urlArgs(e, f) : f
            },
            load: function(e, t) {
                req.load(r, e, t)
            },
            execCb: function(e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function(e) {
                if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = M(e);
                    r.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = M(e);
                if (!b(t.id)) {
                    var n = [];
                    return eachProp(u,
                    function(e, r) {
                        r.indexOf("_@r") !== 0 && each(e.depMaps,
                        function(e) {
                            if (e.id === t.id) return n.push(r),
                            !0
                        })
                    }),
                    T(makeError("scripterror", 'Script error for "' + t.id + (n.length ? '", needed by: ' + n.join(", ") : '"'), e, [t.id]))
                }
            }
        },
        r.require = r.makeRequire(),
        r
    }
    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript: (eachReverse(scripts(),
        function(e) {
            if (e.readyState === "interactive") return interactiveScript = e
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.3",
    commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
    cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    jsSuffixRegExp = /\.js$/,
    currDirRegExp = /^\.\//,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document,
    isWebWorker = !isBrowser && typeof importScripts != "undefined",
    readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/: /^(complete|loaded)$/,
    defContextName = "_",
    isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
    contexts = {},
    cfg = {},
    globalDefQueue = [],
    useInteractive = !1;
    if (typeof define != "undefined") return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs)) return;
        cfg = requirejs,
        requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined),
    req = requirejs = function(e, t, n, r) {
        var i, s, o = defContextName;
        return ! isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []),
        s && s.context && (o = s.context),
        i = getOwn(contexts, o),
        i || (i = contexts[o] = req.s.newContext(o)),
        s && i.configure(s),
        i.require(e, t, n)
    },
    req.config = function(e) {
        return req(e)
    },
    req.nextTick = typeof setTimeout != "undefined" ?
    function(e) {
        setTimeout(e, 4)
    }: function(e) {
        e()
    },
    require || (require = req),
    req.version = version,
    req.jsExtRegExp = /^\/|:|\?|\.js$/,
    req.isBrowser = isBrowser,
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    },
    req({}),
    each(["toUrl", "undef", "defined", "specified"],
    function(e) {
        req[e] = function() {
            var t = contexts[defContextName];
            return t.require[e].apply(t, arguments)
        }
    }),
    isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
    req.onError = defaultOnError,
    req.createNode = function(e, t, n) {
        var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return r.type = e.scriptType || "text/javascript",
        r.charset = "utf-8",
        r.async = !0,
        r
    },
    req.load = function(e, t, n) {
        var r = e && e.config || {},
        i;
        if (isBrowser) return i = req.createNode(r, t, n),
        i.setAttribute("data-requirecontext", e.contextName),
        i.setAttribute("data-requiremodule", t),
        i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)),
        i.src = n,
        r.onNodeCreated && r.onNodeCreated(i, r, t, n),
        currentlyAddingScript = i,
        baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i),
        currentlyAddingScript = null,
        i;
        if (isWebWorker) try {
            setTimeout(function() {},
            0),
            importScripts(n),
            e.completeLoad(t)
        } catch(s) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
        }
    },
    isBrowser && !cfg.skipDataMain && eachReverse(scripts(),
    function(e) {
        head || (head = e.parentNode),
        dataMain = e.getAttribute("data-main");
        if (dataMain) return mainScript = dataMain,
        !cfg.baseUrl && mainScript.indexOf("!") === -1 && (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/": "./", cfg.baseUrl = subPath),
        mainScript = mainScript.replace(jsSuffixRegExp, ""),
        req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
        cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript],
        !0
    }),
    define = function(e, t, n) {
        var r, i;
        typeof e != "string" && (n = t, t = e, e = null),
        isArray(t) || (n = t, t = null),
        !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp,
        function(e, n) {
            t.push(n)
        }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))),
        useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])),
        i ? (i.defQueue.push([e, t, n]), i.defQueueMap[e] = !0) : globalDefQueue.push([e, t, n])
    },
    define.amd = {
        jQuery: !0
    },
    req.exec = function(text) {
        return eval(text)
    },
    req(cfg)
})(this, typeof setTimeout == "undefined" ? undefined: setTimeout),
function() {
    var e = function(e, t, n) {
        if (e == null) return;
        if (e.length === +e.length) for (var r = 0,
        i = e.length; r < i; r++) t.call(n, r, e[r], e);
        else for (var s in e) _.has(e, s) && t.call(n, s, e[s], e)
    },
    t = function(t) {
        return e(Array.prototype.slice.call(arguments, 1),
        function(e, n) {
            if (n) for (var r in n) t[r] = n[r]
        }),
        t
    },
    n = function(t, n, r) {
        typeof t == "string" && (r = n, n = t, t = window);
        var i = n.split(".");
        return e(i,
        function(e) {
            t[i[e]] = t[i[e]] || (e === i.length - 1 ? r || {}: {}),
            t = t[i[e]]
        }),
        t
    },
    r = function() {
        var e = document.getElementsByTagName("script"),
        t = e[e.length - 1],
        n = t.src,
        r = /(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
        i,
        s = {};
        while ((i = r.exec(n)) != null) s[i[1]] = decodeURIComponent(i[2]);
        return {
            src: n,
            params: s
        }
    },
    i = function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        n = window.location.search.substr(1).match(t);
        return n != null ? unescape(n[2]) : null
    };
    try {
        var s = n("App.config.requirejs"),
        o = {
            baseUrl: "//localhost:8002/dist/"
        },
        u = r(),
        a = i("_feb"),
        f = u.src.match(/^(.*\/\/[^\/]*\/)([^\/]*)\/\S*$/),
        l = u.params.version || f[2] || DEFAULT_VERSION,
        c = a ? o: t({
            baseUrl: f[1] + (u.params.version || f[2]) + "/"
        },
        s);
        requirejs.config(c);
        var h = requirejs;
        requirejs = require = function() {
            var r = arguments;
            h(["feb/common"],
            function(i) {
                i.init({
                    publicPath: c.baseUrl
                }),
                i.each = e,
                i.extend = t,
                i.namespace = n,
                h.apply(window, r),
                requirejs = require = h
            })
        }
    } catch(p) {
        console.log("error_require_config: " + p)
    }
} ();