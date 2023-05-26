function Add2Desktop() {
    new shortcutIos({key: 'home'});
    new shortcutAndroidNew({
        key: 'home',
        url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jxnews.jxnews",
        imgUrl: "https://m.jxnews.com.cn/assets/i/down.png"
});
}

function isIosSafari() {
	var a =	navigator.userAgent;
	return /iphone\s+os\s+\d/i.test(a) && !/crios/i.test(a) && !/mqqbrowser/i.test(a) && /safari\/[\d\.]+$/i.test(a) ? !0 : !1
}
function isAndroid() {
	return /android/i.test(navigator.userAgent) ? !0 : !1
}

if(isIosSafari() || isAndroid()){
	document.getElementById("desktop").style.display="block";
}else{
	document.getElementById("desktop").style.display="none";
}

(function(setWindow, setHcx) {
	 setWindow.shortcutAndroidNew = setHcx(setWindow)
})(window, function(hcx) {
	var divString = '<div class="c_20150316" id="shortcut-tx"><a href="{%url%}" class="u-target" target="_blank"><button class="iclose"></button><img class="sct-img" src="{%imgUrl%}" alt="" /></a></div>',
        getStorageFunc = function(setWindow) {
			try {
                var storage = "localStorage" in setWindow && setWindow.localStorage;
                storage &&
                    (localStorage.setItem("storage", ""), localStorage.removeItem("storage"));
                return storage
            } catch (c) {
                return !1
            }
        }(window);
    hcx = function(b) {
		this.defaultConfig = {
            key: "home",
            name: "cn.com.jxnews.lite",
            url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jxnews.jxnews",
            imgUrl: "https://www.jxnews.com.cn/first/images/logo-icon96-96.png"
        };
        this.config = this.extend(this.defaultConfig, b || {});
        this.hasShowKey = "hasShowDlg-" + this.config.key;
        this.init.call(this)
    };
    hcx.prototype = {
        init: function() {
            getStorageFunc && this._isShow() && (this._createDom(), this._initEvent(), localStorage.setItem(this.hasShowKey, 0), this.log("show," + this.config.key))
        },
        _createDom: function() {
			var b = this.config;
            divString = divString.replace("{%url%}", b.url).replace("{%imgUrl%}", b.imgUrl);
            document.querySelector("body").insertAdjacentHTML("beforeend", divString);
            document.querySelector("head").insertAdjacentHTML("beforeend", "<style>.c_20150316 { display: none; position: fixed; left: 0; top: 0; z-index: 100; background: rgba(255,255,255,0.75); }.c_20150316 .iclose { display: block; width: 45px; height: 45px; padding: 0; border: none; outline: none; background: url(https://www.jxnews.com.cn/first/images/sct_close.png) no-repeat center; background-size: 30px auto; position: absolute; right: 0; top: 0; z-index: 1001; }.c_20150316 .u-target { display: block; margin: 0 auto; position: absolute; top: 50%; left: 50%; opacity: 1; }.c_20150316 .u-target img { display: block; border-radius: 2px; }</style>");
            this.el = document.querySelector("#shortcut-tx");
            this.linkEl = this.el.querySelector(".u-target");
            this.imgEl = this.el.querySelector(".sct-img");
            this.show()
        },
        _setPos: function() {
            var b = this.linkEl,
                a = this.imgEl,
                c = 0,
                f = 0,
                c = window.innerWidth,
                f = window.innerHeight;
            this.el.style.width = c + "px";
            this.el.style.height = f + 50 + "px";
            1 > c / f ? (b.style.width = "88%", a.style.width = "100%", b.style.height = "auto", a.style.height = "auto", c *= 0.88, f = 849 * c / 798) : (b.style.height = "88%", a.style.height = "100%", b.style.width = "auto", a.style.width =
                "auto", f *= 0.88, c = 798 * f / 849);
            b.style.marginTop = -(f / 2) + "px";
            b.style.marginLeft = -(c / 2) + "px"
        },
        _actLink: function(b) {
            var a = this.config;
            "button" == b.target.tagName.toLowerCase() ? b.preventDefault() : (this.hide(), this.log("download," + a.key))
        },
        _actClose: function() {
            this.log("close");
            this.hide()
        },
        _initEvent: function() {
            window.addEventListener("resize", this.proxy(this._setPos, this), !1);
            window.addEventListener("orientationchange", this.proxy(this._setPos, this), !1);
            this.el.querySelector(".iclose").addEventListener("click",
                this.proxy(this._actClose, this), !1);
            this.linkEl.addEventListener("click", this.proxy(this._actLink, this), !1);
            document.body.addEventListener("touchmove", this._preventMove)
        },
        _preventMove: function(setEvent) {
            setEvent.preventDefault()
        },
        _isShow: function() {
            var b = this.config,
                ua = navigator.userAgent,
                storage = localStorage.getItem(this.hasShowKey);
            return !this.isAndroid() || window.x5mtt && 1 == window.x5mtt.packages().isApkInstalled(JSON.stringify({
                packagename: b.name
            //})) || /MQQBrowserLightApp/i.test(ua) || 1 == storage || /mobile.*qq/i.test(ua) ? !1 : !0
			})) ||  1 == storage ? !1 : !0
        },
        show: function() {
            var b = document.querySelector("#video-div");
            this.el.style.display = "block";
            b && (b.style.visibility = "hidden");
            this._setPos()
        },
        hide: function() {
            var b = document.querySelector("#video-div");
            document.body.removeEventListener("touchmove", this._preventMove);
            this.el.style.display = "none";
            b && (b.style.visibility = "visible")
        },
        isAndroid: function() {
            return /android/i.test(navigator.userAgent) ? !0 : !1
        },
        extend: function(b, a) {
            for (var c in a) b[c] != a[c] && (b[c] = "object" == typeof a[c] ? extend(b[c], a[c]) : a[c]);
            return b
        },
        proxy: function(b, a, c) {
            return function() {
                return c ? b.apply(a, c) : b.apply(a, arguments)
            }
        },
        log: function(b) {
            var a = new Image,
                c = "log" + Math.floor(2147483648 * Math.random()).toString(36);
            window[c] = a;
            a.onload = a.onerror = a.onabort = function() {
                a.onload = a.onerror = a.onabort = null;
                a = window[c] = null
            };
            //a.src = "http://infoapp.3g.qq.com/g/common/log/templog.jsp?logType=shortcut&params=" + b
        }
    };
    return hcx
});
(function(setWindow, e) {
    "function" === typeof define ? define("shortcutIos", [], function() {
        return e(setWindow)
    }) : window.core && "function" === typeof core.define ? core.define("shortcutIos", [], function() {
        return e(setWindow)
    }) : setWindow.shortcutIos = e(setWindow)
})(window, function(d) {
	var e = '<div id="shortcut-i-pannel"><div class="con"><div class="ic-bg ic-closebtn"></div><div class="tip"><img src="{%imgurl%}" /><p>点击<span class="ic-bg ic-add"></span><br/> 然后添加主屏幕</p></div><div class="ic-bg ic-arrow"></div></div></div>',
        iconsArray = {
            home: {
                icon: "https://www.jxnews.com.cn/first/images/logo-icon96-96.png"
            }
        },
        b = function(a) {
            try {
                var c = "localStorage" in a && a.localStorage;
                c && (localStorage.setItem("storage", ""), localStorage.removeItem("storage"));
                return c
            } catch (b) {
                return !1
            }
        }(window);
    d = function(a) {
        this.defaultConfig = {
            key: "home"
        };
        this.config = this.extend(this.defaultConfig, a || {});
        this.dailyShowKey = "dailyShow-" + this.config.key;
        this.forceCloseKey = "forceClose-" + this.config.key;
        this.init.call(this)
    };
    d.prototype = {
        init: function() {
            b && (this.isIosSafari() && this._createMeta(), this._isShow() && (this._createDom(), this._initEvent(),
                localStorage.setItem(this.dailyShowKey, this.getFormatDate(new Date))));
				//if(this.isIosSafari()) alert("isIosSafari");
        },
        _createDom: function() {
            e = e.replace("{%imgurl%}", iconsArray[this.config.key].icon);
            document.querySelector("head").insertAdjacentHTML("beforeend", "<style>#shortcut-i-pannel {display:none; z-index:9999; position:fixed; width:190px; height:76px; bottom:10px; background-color:#666666; opacity:0.9; border-radius:3px; }#shortcut-i-pannel .con { position:relative; height:76px; }#shortcut-i-pannel .ic-bg {background:transparent url(https://ad.jxnews.com.cn/2015/images/bg-ic.png) no-repeat scroll; -webkit-background-size: 20px auto;}#shortcut-i-pannel .ic-closebtn {position:absolute; right:10px; top:10px; z-index:3; width:11px; height:11px; background-position:left top;}#shortcut-i-pannel .tip {padding:15px 10px;}#shortcut-i-pannel .tip img {width:48px; height:48px; border-radius:3px; float:left; margin-right:10px;}#shortcut-i-pannel .tip p {color:#FFFFFF; position:relative; top:-16px; font-size:14px;}#shortcut-i-pannel .ic-add { display:inline-block; width:16px; height:20px; background-position:left -19px; position:relative; top:3px; margin-left:5px; }#shortcut-i-pannel .ic-arrow {position:absolute; width:20px; height:10px; bottom:-10px; left:83px; background-position:left -44px;}</style>");
            document.querySelector("body").insertAdjacentHTML("beforeend", e);
            this.el = document.querySelector("#shortcut-i-pannel");
            this.show();
			this.isAndroid() && alert("isAndroid");


        },
        _createMeta: function() {
            var a = this.config,
                c = document.querySelector("head");
            document.querySelector("link[rel=apple-touch-icon-precomposed]") || c.insertAdjacentHTML("beforeend", '<link rel="apple-touch-icon-precomposed" href="' + iconsArray[this.config.key].icon + '">')
        },
        _setPos: function() {
            this.el.style.left = (document.body.clientWidth - 186) / 2 + "px"
        },
        _actClose: function() {
            this.hide();
            localStorage.setItem(this.forceCloseKey,
                this.getFormatDate(new Date))
        },
        _initEvent: function() {
            window.addEventListener("resize", this.proxy(this._setPos, this), !1);
            window.addEventListener("orientationchange", this.proxy(this._setPos, this), !1);
            this.el.querySelector(".ic-closebtn").addEventListener("click", this.proxy(this._actClose, this), !1)
        },
        _autoClose: function() {
            var a = this;
            setTimeout(function() {
                a.hide()
            }, 6E3)
        },
        _isShow: function() {
            var a = this.getFormatDate(new Date),
                c = localStorage.getItem(this.dailyShowKey),
                b = localStorage.getItem(this.forceCloseKey);
            /*if (!this.isIosSafari() || navigator.standalone || c && 6048E5 > +new Date(a) - +new Date(c)) return !1;
            if (b) {
                if (6048E5 > +new Date(a) - +new Date(b)) return !1;
                localStorage.removeItem(this.forceCloseKey)
            }*/
			
            if (!this.isIosSafari() || navigator.standalone) return !1;
            if (b) {
                localStorage.removeItem(this.forceCloseKey)
            }
            return !0
        },
        show: function() {
            this._setPos();
            this.el.style.display = "block";
            this._autoClose()
        },
        hide: function() {
            this.el.style.display = "none"
        },
        getFormatDate: function(a) {
            function c(a) {
                var b = a;
                10 > a && (b = "0" + a);
                return b
            }
            var b = a.getFullYear(),
                d = a.getMonth() + 1;
            a = a.getDate();
            return b + "-" + c(d) + "-" + c(a)
        },
        isIosSafari: function() {
            var a =
                navigator.userAgent;
            return /iphone\s+os\s+\d/i.test(a) && !/crios/i.test(a) && !/mqqbrowser/i.test(a) && /safari\/[\d\.]+$/i.test(a) ? !0 : !1
        },
        isAndroid: function() {
            return /android/i.test(navigator.userAgent) ? !0 : !1
        },
        extend: function(a, b) {
            for (var d in b) a[d] != b[d] && (a[d] = "object" == typeof b[d] ? extend(a[d], b[d]) : b[d]);
            return a
        },
        proxy: function(a, b, d) {
            return function() {
                return d ? a.apply(b, d) : a.apply(b, arguments)
            }
        }
    };
    return d
});

/*FEND*/