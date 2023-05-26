;(function(designWidth, maxWidth) {     //PX rem转换
    var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth && (width=maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);	 
function showTip(e) {
    var o = '<div class="pop-tip"><p><span>' + e + "</span></p></div>";
    $("body").append(o),
    $(".pop-tip").fadeIn(function() {
        setTimeout(function() {
            $(".pop-tip").fadeOut(function() {
                $(".pop-tip").remove()
            })
        },
        1000)
    }),
    $(".pop-tip").css("top", 0.45 * $(window).height())
}
function getUrlParam(e) {
    var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
    t = window.location.search.substr(1).match(o);
    return null != t ? unescape(t[2]) : null
}
function IsPC() {
    for (var e = navigator.userAgent,
    o = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], t = !0, n = 0; n < o.length; n++) {
        if (e.indexOf(o[n]) > 0) {
            t = !1;
            break
        }
    }
    return t
}
function setCookie(e, o) {
    var t = 30,
    n = new Date;
    n.setTime(n.getTime() + 24 * t * 60 * 60 * 1000),
    document.cookie = e + "=" + escape(o) + ";expires=" + n.toGMTString()
}
function getCookie(e) {
    var o, t = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
    return (o = document.cookie.match(t)) ? unescape(o[2]) : null
}
var userid = getUrlParam("userid"),
ostype = getUrlParam("ostype"),
appversion = getUrlParam("appversion"),
uuid = getUrlParam("uuid"),
isNight = getUrlParam("isNight"),
infofrom = getUrlParam("infofrom"),
scale=window.innerWidth/750<=1?window.innerWidth/750:1;;
if (null != userid && null != ostype) {} else {
    var longurl, android, ios;
    longurl = window.location.href,
    android = longurl.indexOf("android"),
    ios = longurl.indexOf("ios"),
    longurl.indexOf("userid") > -1 && (android > 0 ? (userid = longurl.split("=")[2], ostype = "android") : ios > 0 && (userid = longurl.split("&")[2], ostype = "ios"))
}
$.fn.isOnScreen = function() {
    var e = $(window),
    o = {
        top: e.scrollTop(),
        left: e.scrollLeft()
    };
    o.right = o.left + e.width(),
    o.bottom = o.top + e.height();
    var t = this.offset();
    return t.right = t.left + this.outerWidth(),
    t.bottom = t.top + this.outerHeight(),
    !(o.right < t.left || o.left > t.right || o.bottom < t.top || o.top > t.bottom)
};