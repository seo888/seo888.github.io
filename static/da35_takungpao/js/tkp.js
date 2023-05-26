var tkp = tkp || {};

!function (t, w) {
    Date.prototype.Format = function (fmt) { var o = { "M+": this.getMonth() + 1, "d+": this.getDate(), "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, "H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S": this.getMilliseconds() }; var week = { "0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d" }; if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)) } if (/(E+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]) } for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))) } } return fmt };
    t.getQueryString = function (name) { var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); var r = window.location.search.substr(1).match(reg); if (r != null) return (r[2]); return null; }
    t.getCookieStr = function (name) { var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) { var j = i + alen; if (document.cookie.substring(i, j) == arg) { var endstr = document.cookie.indexOf(";", j); if (endstr == -1) endstr = document.cookie.length; return decodeURIComponent(document.cookie.substring(j, endstr)); } i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break; } return ""; }
    t.isStorage = function () { try { return 'localStorage' in window && window['localStorage'] !== null; } catch (e) { return false; } }
    t.debug = function (o) { !!o ? alert('y') : alert('n'); }
    t.isMobile = function () { var ua = navigator.userAgent; return !!ua.match(/AppleWebKit.*Mobile/) || !!ua.match(/Windows Phone/) || !!ua.match(/Android/) || !!ua.match(/MQQBrowser/); }
    t.jtimeToDate = function (ts) { return eval(ts.replace(/\/Date\((\d+)\)\//gi, "new Date($1)")); }
    t.isIE = !!window.ActiveXObject || "ActiveXObject" in window;
    t.isHK = /\.hk/i.test(location.href);
    t.isTKP = /takungpao\.com/i.test(location.href);
    t.isCanvas = function () { var elem = document.createElement('canvas'); return !!(elem.getContext && elem.getContext('2d')); }

    t.ui = function () {
        var u = {
            userid: parseInt(t.getCookieStr("takung_uid")),
            username: t.getCookieStr("takung_username"),
            email: t.getCookieStr("takung_email")
        };
        u.status = !!u.userid;
        return u;
    }

    t.config = {
        service: "http://p.takungpao.com"
    }

    t.server = {
        stat: function (id, type, channel, source) {
            var p = { ID: id, Type: type };
            p.Channel = channel || t.getQueryString("tkpc") || t.isMobile() ? 1 : 0;
            p.Source = source || t.getQueryString("tkps") || document.referrer;
            p.url = location.href;
            $.getJSON(t.config.service + "/newstatcms/viewcount", p)
                .done(function (d) { console.log(d.Message); })
                .fail(function (d) { console.log(d.Message); });
        },
        pclick: function (p, t, u) {
            var p = { Page: p, Title: t, Uri: u };
            $.getJSON(t.config.service + "/StatPage/ClickView", p)
                .done(function (d) { console.log(d.Message); })
                .fail(function (d) { console.log(d.Message); });
        }
    };

}(tkp, window)

var _hmt = _hmt || [];
!function () {
    var hm = document.createElement("script");
    var b = !!(tkp.isHK)? "12a28f642812ca6a940aed0a408c9006" : "556301cb9e28db67d66c099f7a7323cd";
    var src = "https://hm.baidu.com/hm.js?" + b;
    hm.src = src;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}();

$(function () {
    tkp.server.stat(window.tkp_aid, window.tkp_at);
    //$('#tkpcomment') && $('#tkpcomment').load("http://r.takungpao.com/lib/comment/comment.html");
})

