var __$j;
var __$CountType;
var __$l;
var __$m;
var __$CountIframe;
var __$nodeid;
var __$contentid;
var __$pubtime;
var __$PictureUrlPh;
var __$title;
var __$Editor;
var __$Author;
var __$o;
var __$p = '0';
var __$q = '0';
var __$r = '';
var __$s = 'countlogo8.gif';
var __$t = 'abceffgh';
var __$u = window.document;
var __$v = 'http://stat.taizhou.com.cn/mysql';
var __$clienturlstr = '';
function __$a() {
    return true;
};
window.onerror = __$a;
var __$w = __$v + '/logcount.php';
if (__$CountIframe == true) {
    var __$x = top.location.href;
    var __$y = top.document.referrer;
    var __$z = __$title == null ? top.document.title: __$title;
} else {
    var __$x = top.location.href;
    var __$y = top.document.referrer;
    var __$z = __$title == null ? top.document.title: __$title;
};
var __$A = (navigator.systemLanguage ? navigator.systemLanguage: navigator.language);
var __$B = screen.colorDepth;
var __$C = screen.width + '*' + screen.height;
var __$D = __$u.charset == null ? 'zh_cn': __$u.charset;
var __$ck = navigator.cookieEnabled ? 1 : 0;
var __$E = navigator.userAgent.toLowerCase();
var __$F = new Array();
var __$G = new Array();
var __$H = new Array();
var __$I = new Array();
var __$II = new Array();
var __$III = new Array(); __$F[0]='baidu';__$G[0]='wd';__$H[0]='gbk';__$I[0]='default';__$II[0]='bs';__$III[0]='ie';__$F[1]='baidu';__$G[1]='word';__$H[1]='gbk';__$I[1]='default';__$II[1]='bs';__$III[1]='ie';__$F[2]='google';__$G[2]='q';__$H[2]='utf-8';__$I[2]='default';__$II[2]='';__$III[2]='';__$F[3]='yahoo';__$G[3]='p';__$H[3]='gbk';__$I[3]='default';__$II[3]='';__$III[3]='';__$F[4]='sogou';__$G[4]='query';__$H[4]='gbk';__$I[4]='default';__$II[4]='';__$III[4]='';__$F[5]='bing';__$G[5]='q';__$H[5]='utf-8';__$I[5]='default';__$II[5]='';__$III[5]='';__$F[6]='youdao';__$G[6]='q';__$H[6]='utf-8';__$I[6]='default';__$II[6]='lq';__$III[6]='';__$F[7]='soso';__$G[7]='w';__$H[7]='gbk';__$I[7]='default';__$II[7]='bs';__$III[7]='ie';__$F[8]='haosou';__$G[8]='q';__$H[8]='utf-8';__$I[8]='default';__$II[8]='';__$III[8]='';;
var __$ITEMP = new Array(); ;
var __$J;
var __$K;
var __$L;
var __$U_C_;
var __$N;
__$J = __$e('__FTabceffgh');
if (__$J == '') {
    __$J = __$d();
    __$K = __$J;
    __$f('__FTabceffgh', __$J, 10000000 * 3600000);
} else {
    __$K = __$d();
};
if (__$CountType == null) {
    __$CountType = 1;
};
__$L = __$e('__RECabceffgh');
__$L = __$L == '' ? 0 : __$L;
__$N = __$e('PHPSTATNULLCOOKIE');
__$U_C_ = __$e('__NRUabceffgh');
if (__$U_C_ == '') {
    __$U_C_ = __$d(2);
    __$f('__NRUabceffgh', __$U_C_, 10000000 * 3600000);
}
if (__$ck == '0') {
    __$U_C_ = 'nocookie';
};
__$O = __$e('__RTabceffgh');
if (__$O == '') {
    __$O = __$d();
    __$f('__RTabceffgh', __$O, 10000000 * 3600000);
};
__$P = __$O.split('-');
__$Q = new Date(__$P[0], __$P[1] - 1, __$P[2], __$P[3], __$P[4], __$P[5]);
__$R = new Date();
if (__$R - __$Q >= 86400000) {
    __$f('__RECabceffgh', ++__$L, 10000000 * 3600000);
    __$f('__RTabceffgh', __$d(), 10000000 * 3600000);
} else {
    __$L = __$L;
};
function __$b(__$S) {
    __$T = "0";
    if (__$U.indexOf(__$S) != -1) if (navigator.mimeTypes[__$S].enabledPlugin != null) __$T = "1";
    return __$T;
};
function __$c(__$S) {
    pFind = false;
    __$u.write('<SCR' + 'IPT LANGUAGE=VBScript>\n on error resume next \n pFind = IsObject(CreateObject("' + __$S + '")) </SCR' + 'IPT>\n');
    if (pFind) return '1';
    else return '0';
};
if (navigator.javaEnabled()) __$p = '1';
else __$p = '0';
var __$W = /(firefox|netscape|opera|myie|tencenttraveler|theworld|safari|maxthon|webtv|msn|konqueror|lynx|chrome)/.exec(__$E);
if (!__$W) __$W = /(msie) ([0-9\.]*)[^;)]/.exec(__$E);
var __$X = __$W == null ? 'other': __$W[0];
var __$Y = /(windows nt|windows|unix|linux|sunos|bsd) ([0-9\.]*)[^;)]/.exec(__$E);
var __$Z = __$Y == null ? 'other': __$Y[0];
var __$00 = /(nokia|sony|ericsson|mot|dopod|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile)/.exec(__$E);
var __$01 = __$00 == null ? '': __$00[0];
var __$02 = (__$E.indexOf("alexa") != -1) == false ? '0': '1';
var __$03 = (navigator.appName.indexOf("Netscape") != -1);
var __$04 = (__$E.indexOf("msie") != -1);
var __$05 = (__$E.indexOf("mac") != -1);
var __$06 = ((__$E.indexOf("win") != -1) || (__$E.indexOf("32bit") != -1));
if (__$06 && __$04) {
    var __$q = __$c("ShockwaveFlash.ShockwaveFlash.1");
};
if (!__$06 || __$03) {
    __$U = "";
    for (var i = 0; i < navigator.mimeTypes.length; i++) __$U += navigator.mimeTypes[i].type.toLowerCase();
    var __$q = __$b("application/x-shockwave-flash");
};
var __$07 = __$g(__$y, 'host');
var __$08 = __$g(__$x, 'host');
var __$09 = __$g(__$x, 'dir');
var __$0a = __$g(__$x, 'page');
var __$00a = escape(__$g(__$y, 'page'));
var __$0b = __$i(__$g(__$x, 'clickmap'));
__$0a = escape(__$0a);
var __$0c = __$w + '?' + 'C_U_=' + __$v + '&P_U_=' + __$0a + '&W_S_=' + __$t + '&R_F_=' + __$00a + '&F_S_=' + __$07 + __$h(__$y) + '&P_S_=' + __$08 + '&N_D_I_D_=' + (__$nodeid == null ? 0 : __$nodeid) + '&C_T_I_D_=' + (__$contentid == null ? 0 : __$contentid) + '&E_D_T_=' + escape(__$Editor == null ? '': __$Editor) + '&P_T_=' + __$pubtime + '&PIC_U_=' + __$PictureUrlPh + '&P_D_=' + __$09 + '&L_G_=' + __$A + '&C_L_=' + __$B + '&C_K_=' + __$ck + '&S_S_=' + __$C + '&F_T_=' + __$J + '&L_T_=' + __$K + '&C_S_=' + __$D + '&F_L_=' + __$q + '&J_V_=' + __$p + '&A_L_=' + __$02 + '&S_Y_=' + escape(__$Z) + '&B_R_=' + escape(__$X) + '&T_Z_=' + (new Date()).getTimezoneOffset() / 60 + '&A_U_=' + __$Author + '&U_N_=' + __$N + '&M_T_=' + __$01 + '&U_C_=' + __$U_C_ + '&R_C_=' + __$L + '&D_B_=' + (__$j == null ? '': __$j) + '&T_P_=' + __$CountType + '&I_M_=' + (__$s == null ? '': __$s) + '&T_X_=' + (__$r == null ? '': __$r) + '&T_T_=' + escape(__$z);

if(__$E.indexOf('spider')<0)
{
 __$u.write("<script src='" + __$0c + "'></script>");
}

function __$d(__$0d) {
    __$0e = new Date();
    Y = __$0e.getYear() < 1900 ? __$0e.getYear() + 1900 : __$0e.getYear();
    M = __$0e.getMonth() + 1;
    D = __$0e.getDate();
    H = __$0e.getHours();
    m = __$0e.getMinutes();
    S = __$0e.getSeconds();
    if (__$0d == '2') return __$0e.getTime();
    else if (__$0d == '1') return Y + "-" + M + "-" + D;
    else return Y + "-" + M + "-" + D + "-" + H + "-" + m + "-" + S;
};
function __$e(name) {
    var cV = "";
    var __$0f = name + "=";
    if (__$u.cookie.length > 0) {
        __$0g = __$u.cookie.indexOf(__$0f);
        if (__$0g != -1) {
            __$0g += __$0f.length;
            end = __$u.cookie.indexOf(";", __$0g);
            if (end == -1) end = __$u.cookie.length;
            cV = unescape(__$u.cookie.substring(__$0g, end))
        }
    };
    return cV;
};
function __$f(name, __$0h, __$0i) {
    var __$0j = "";
    if (__$0i != null) {
        __$0j = new Date((new Date()).getTime() + __$0i);
        __$0j = "; expires=" + __$0j.toGMTString();
    };
    __$u.cookie = name + "=" + escape(__$0h) + __$0j + "domain=;" + "path=/;";
};
function __$g(__$0k, __$0d) {
    var i = 0,
    j = 0,
    h, __$0l,hp;
    if ((i = __$0k.indexOf("://")) < 0) return "";

    hp = __$0k.substring(0, i + 3);
    h = __$0k.substring(i + 3, __$0k.length);
    if (__$0d == "click") {
        if (h.indexOf("?") > 0) return h.substring(0, h.indexOf("?"));
        else return h;
    };
    if ((i = h.indexOf("/")) > -1) {
        if (__$0d == "dir") {
            if (__$0k.indexOf("?") <= -1) h = h.substring(i + 1, __$0k.length);
            else h = h.substring(i + 1, __$0k.indexOf("?"));
            if ((i = h.lastIndexOf("/")) > -1) {
                h = '/' + h.substring(0, i + 1);
            } else h = '/';
        } else if (__$0d == "page") {
            if ((j = h.indexOf('#clickmapcode=')) > 0) h = h.substring(0, j);
            if ((parseInt(__$0k.length) - i) > 400) __$0l = 400 + i;
            else __$0l = __$0k.length;
            h = h.substring(i, __$0l);
        } else if (__$0d == "clickmap") {
            if ((j = h.indexOf('#clickmapcode=')) > 0) h = h.substring(j + 14, h.length);
            else h = '';
        } else h = hp+h.substring(0, h.indexOf("/"));
    };
    return h;
};
function __$h(__$0k) {
    var i, j, h, k, rk, e, ek, f, p = 10;
    var __$0d, __$0m;
    __$0k = __$0k.toLowerCase();
    h = __$g(__$0k);
    for (var ii = 0; ii < __$F.length; ii++) {
        if (h.toLowerCase().indexOf(__$F[ii].toLowerCase()) > -1) {
            if (__$III[ii]) {
                if ((e = __$0k.indexOf('?' + __$III[ii] + '=')) > -1 || (e = __$0k.indexOf('&' + __$III[ii] + '=')) > -1) {
                    ek = __$0k.substring(e + __$III[ii].length + 2, __$0k.length);
                    __$H[ii] = ek;
                    if ((e = ek.indexOf("&")) > -1) {
                        ek = ek.substring(0, e);
                        __$H[ii] = ek
                    }
                }
            }
            if ((i = __$0k.indexOf("?" + __$G[ii] + "=")) > -1 || (i = __$0k.indexOf("&" + __$G[ii] + "=")) > -1) {
                k = __$0k.substring(i + __$G[ii].length + 2, __$0k.length);
                __$0d = "&K_W_=" + escape(k) + "&W_C_=" + __$H[ii] + "&W_P_=" + __$F[ii];
                if ((i = k.indexOf("&")) > -1) {
                    k = k.substring(0, i);
                    __$0d = "&K_W_=" + escape(k) + "&W_C_=" + __$H[ii] + "&W_P_=" + __$F[ii];
                }
            }
            if ((i = __$0k.indexOf("?" + __$II[ii] + "=")) > -1 || (i = __$0k.indexOf("&" + __$II[ii] + "=")) > -1) {
                k = __$0k.substring(i + __$II[ii].length + 2, __$0k.length);
                rk = "&R_W_=" + k;
                if ((i = k.indexOf("&")) > -1) {
                    k = k.substring(0, i);
                    rk = "&R_W_=" + k;
                }
            }
        }
    };
    if (__$0d == '' || __$0d == null) return "&K_W_=&W_C_=&W_P_=&R_W_=";
    else if (rk) return __$0d + rk;
    else return __$0d;
};
function __$i(__$0n) {
    if (__$0n) {
        if (__$e('__MAPabceffgh') == '' || __$0n != __$e('__MAPabceffgh')) __$f('__MAPabceffgh', __$0n, 2);
        return __$0n;
    } else if (__$e('__MAPabceffgh')) return __$e('__MAPabceffgh');
    else return '';
};
if (__$0b || __$e('__MAPabceffgh')) {
    var __$0o = __$v + '/clickmap.js.php';
    var __$0p = document.createElement("script");
    __$0p.type = "text/javascript";
    __$0p.charset = "utf-8";
    __$0p.src = __$0o + "?website=" + __$t + "&StartTime=" + __$e('__MAPSTARTDATE') + "&EndTime=" + __$e('__MAPENDDATE') + "&PageSite=" + __$08 + "&PageUrl=" + __$0a + "&clickmapcode=" + __$0b + "&rand=" + Math.random();
    document.getElementsByTagName("head").item(0).appendChild(__$0p);
}
function __$addlistener(a, b, c) {
    if (a.addEventListener) {
        a.addEventListener(b, c, false)
    } else {
        if (a.attachEvent) {
            a.attachEvent('on' + b, c)
        }
    }
}
function __$unload() {
	__$loadgif(__$clienturlstr);
	__$clienturlstr = ''
}
function __$trackevent()
{
	var s = '';
	if( typeof(_trackEvent) != 'undefined' && _trackEvent.trackActionUrl.length > 0 )
	{
		s = _trackEvent.trackActionUrl;
		_trackEvent.trackActionUrl = '';
	}
	return s;
}
function __$directtrackevent()
{
	if( typeof(_trackEvent) != 'undefined' && _trackEvent.trackActionUrl.length > 0 )
	{
		__$loadgif('');
	}
}
function __$loadgif(gs) {
    var gif = new Image();
    gif.src = __$w + '?W_S_=' + __$t + '&R_D_=record&U_C_=' + __$U_C_ + '&P_S_=' + __$08 + '&P_U_=' + __$0a + '&C_L_E_=' + __$trackevent() + '&rand=' + Math.random();
    gif.onload = function () {
        gif.onload = null;
        gif.onerror = null
    };
    gif.onerror = function () {
        gif.onload = null;
        gif.onerror = null
    };
}

	__$addlistener(window, 'unload', __$unload);
    __$addlistener(window, 'blur', __$unload);
var __$ccc = __$v + '/clickstat.php';
if (document.addEventListener) {
    document.addEventListener("click", __$bcc, false)
} else if (document.attachEvent) {
    document.attachEvent("onclick", __$bcc)
};
function __$acc() {
    var x = 0;
    var y = 0;
    if (document.body.scrollTop) {
        x = document.body.scrollLeft;
        y = document.body.scrollTop
    } else {
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop
    };
    return {
        x: x,
        y: y
    }
};
var __$clickhot;
var __$pathname = document.location.pathname;
var __$clickarray = new Array(); __$clickarray[0]='/';__$clickarray[1]='index.*';;
var __$clickreg = '';
if (__$clickarray[0] == 'clickhotall') {
    __$clickhotok = 1
};
if (__$clickhot != 'clickhot' && __$clickarray[0] != 'clickhotall') {
    for (var ci = 0; ci < __$clickarray.length; ci++) {
        if (__$clickarray[ci].lastIndexOf('*') > -1) {
            __$clickarray[ci] = __$clickarray[ci].replace(/\\/g, '\\/');
            __$clickarray[ci] = __$clickarray[ci].replace(/\*/g, '(.*)');
            if (__$clickarray[ci].indexOf('/') == 0) {
                __$clickarray[ci] = __$clickarray[ci].substring(1)
            }
            __$clickreg = eval('/' + __$clickarray[ci] + '/ig');
            if (__$clickreg.test(__$pathname)) {
                __$clickhotok = 1;
                break
            }
        } else {
            if (__$clickarray[ci].indexOf('/') != 0) {
                __$clickarray[ci] = '/' + __$clickarray[ci]
            }
            if (__$clickarray[ci] == __$pathname) {
                __$clickhotok = 1;
                break
            }
        }
    }
}
function __$bcc(ev) {
    ev = ev || window.event;
    var el = ev.target || ev.srcElement;
    var cko = 'taizhou.com';
    var ckd = '.doc|.csv|.xls|.pdf|.rar|.zip|.jpg';
    if ((el.tagName == 'A' || el.tagName == 'IMG') && cko) {
        if (el.tagName == 'IMG') {
            var elp = el.parnetNode;
            if (elp.tagName == 'A') {
                el = elp
            }
        }
        var __$n0a = el.href;
        var __$n0ah = __$g(__$n0a, 'host');
        var __$n0ap = __$g(__$n0a, 'page');
        var ckoa = new Array(); ckoa[0]='taizhou.com';;
        var ckda = new Array(); ckda[0]='.doc';ckda[1]='.csv';ckda[2]='.xls';ckda[3]='.pdf';ckda[4]='.rar';ckda[5]='.zip';ckda[6]='.jpg';
        var ckook = true;
        var __$S_T_ = 'clickout';
        for (var ckoi = 0; ckoi < ckoa.length; ckoi++) {
            if (__$n0ah.indexOf(ckoa[ckoi]) > 0 || __$n0ah == ckoa[ckoi]) {
                ckook = false;
                break
            }
        };
        var __$n0aptolower = __$n0ap.toLowerCase();
        for (var ckdi = 0; ckdi < ckda.length; ckdi++) {
            if (__$n0aptolower.indexOf(ckda[ckdi]) > 0) {
                ckook = true;
                __$S_T_ = 'clickdown';
                break
            }
        };
        if (ckook) {
            var __$0cc = __$0c;
            __$0cc = __$0cc.replace("&F_S_=" + __$07, "&F_S_=" + __$08);
            __$0cc = __$0cc.replace("&R_F_=" + __$00a, "&R_F_=" + __$0a);
            __$0cc = __$0cc.replace("&P_S_=" + __$08, "&P_S_=" + __$n0ah);
            __$0cc = __$0cc.replace("&P_U_=" + __$0a, "&P_U_=" + escape(__$n0ap));
            __$0cc = __$0cc.replace("&P_D_=" + __$0a, "&P_D_=/");
            __$0cc = __$0cc.replace("&I_M_=" + __$s, "&I_M_=");
            __$0cc = __$0cc.replace("&T_X_=" + __$r, "&T_X_=hidden");
            __$0cc = __$0cc + '&S_T_=' + __$S_T_ + '';
            try {
                var ss = document.createElement("script");
                ss.type = "text/javascript";
                ss.src = __$0cc;
                document.getElementsByTagName("head").item(0).appendChild(ss)
            } catch(ev) {
                __$a()
            }
        }
    }
    if (parseInt(Math.random() * 10) < 0 || __$clickhotok == '0') return;
    var x = ev.clientX + __$acc().x - document.getElementsByTagName("body")[0].offsetLeft;
    var y = ev.clientY + __$acc().y - document.getElementsByTagName("body")[0].offsetTop;
    if (x < 0 || y < 0) return;
    try {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = __$ccc + "?website=" + __$t + "&page=" + __$08 + __$0a + "&w=" + screen.width + "&x=" + x + "&y=" + y + "&width=" + screen.width;
        document.getElementsByTagName("head").item(0).appendChild(s)
    } catch(ev) {
        __$a()
    }
}