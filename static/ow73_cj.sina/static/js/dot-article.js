! function() {
    function e(n, t, r) {
        return ("string" == typeof t ? t : t.toString()).replace(n.define || c, function(e, t, o, a) {
            return 0 === t.indexOf("def.") && (t = t.substring(4)), t in r || (":" === o ? (n.defineParams && a.replace(n.defineParams, function(e, n, o) { r[t] = { arg: n, text: o } }), t in r || (r[t] = a)) : new Function("def", "def['" + t + "']=" + a)(r)), ""
        }).replace(n.use || c, function(t, o) {
            n.useParams && (o = o.replace(n.useParams, function(e, n, t, o) {
                return r[t] && r[t].arg && o ? (e = (t + ":" + o).replace(/'|\\/g, "_"), r.__exp = r.__exp || {}, r.__exp[e] = r[t].text.replace(new RegExp("(^|[^\\w$])" + r[t].arg + "([^\\w$])", "g"), "$1" + o + "$2"), n + "def.__exp['" + e + "']") : void 0
            }));
            var a = new Function("def", "return " + o)(r);
            return a ? e(n, a, r) : a
        })
    }

    function n(e) {
        return e.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ")
    }
    var t, r = { version: "1.0.3", templateSettings: { evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g, interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g, define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: !0, append: !0, selfcontained: !1, doNotSkipEncoded: !1 }, template: void 0, compile: void 0 };
    r.encodeHTMLSource = function(e) {
        var n = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
            t = e ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function(e) {
            return e ? e.toString().replace(t, function(e) {
                return n[e] || e
            }) : ""
        }
    }, t = function() {
        return this || (0, eval)("this")
    }(), "undefined" != typeof module && module.exports ? module.exports = r : "function" == typeof define && define.amd ? define(function() {
        return r
    }) : t.doT = r;t.doTFinance = r;
    var o = { start: "'+(", end: ")+'", startencode: "'+encodeHTML(" },
        a = { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" },
        c = /$^/;
    r.template = function(u, i, d) {
        i = i || r.templateSettings;
        var s, l, p = i.append ? o : a,
            f = 0;
        u = i.use || i.define ? e(i, u, d || {}) : u, u = ("var out='" + (i.strip ? u.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : u).replace(/'|\\/g, "\\$&").replace(i.interpolate || c, function(e, t) {
            return p.start + n(t) + p.end
        }).replace(i.encode || c, function(e, t) {
            return s = !0, p.startencode + n(t) + p.end
        }).replace(i.conditional || c, function(e, t, r) {
            return t ? r ? "';}else if(" + n(r) + "){out+='" : "';}else{out+='" : r ? "';if(" + n(r) + "){out+='" : "';}out+='"
        }).replace(i.iterate || c, function(e, t, r, o) {
            return t ? (f += 1, l = o || "i" + f, t = n(t), "';var arr" + f + "=" + t + ";if(arr" + f + "){var " + r + "," + l + "=-1,l" + f + "=arr" + f + ".length-1;while(" + l + "<l" + f + "){" + r + "=arr" + f + "[" + l + "+=1];out+='") : "';} } out+='"
        }).replace(i.evaluate || c, function(e, t) {
            return "';" + n(t) + "out+='"
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, ""), s && (i.selfcontained || !t || t._encodeHTML || (t._encodeHTML = r.encodeHTMLSource(i.doNotSkipEncoded)), u = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + r.encodeHTMLSource.toString() + "(" + (i.doNotSkipEncoded || "") + "));" + u);
        try {
            return new Function(i.varname, u)
        } catch (g) {
            throw "undefined" != typeof console && console.log("Could not create a template function: " + u), g
        }
    }, r.compile = function(e, n) {
        return r.template(e, null, n)
    }
}();
