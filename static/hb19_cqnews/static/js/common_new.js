
/** 2020-12-22 18:08 **/
/**微信IOS新版本（v6.3.22）增加安全限制，凡页面内含有iframe，分享后打开地址会跳转到该iframe的链接，因此注释掉87行**/

/**加载外部JS**/
function loadJS(url,callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type= 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
            // Handle memory leak in IE 
            script.onload = script.onreadystatechange = null;
        }
    };  
    script.src = url;
    head.appendChild(script);
    try {
        setTimeout("eval("+callback+")",5);
    }
    catch(e){
        //console.log("The function '"+callback+"'  is found error.");
    }
}

/**文字溢出自动缩小字号**/
function changeSize(doms,fontSize,h){
    var nh=doms.height();
    if(
        !(nh <= h) && (fontSize >= 12)
    ) {
        doms.css("fontSize", fontSize);
        fontSize--;
        changeSize(doms,fontSize,h);
    } else {
        return
    };
};

/*读取CSS/JS组*/
var dynamicLoading = {
    __loadJS_pre:[],
    __loadJS_after:[],
    __loadCSS:[],
    css: function(cssFile) {
        /**
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }**/
        that = this;
        var head = document.getElementsByTagName('head')[0];
        var _link = document.createElement('link');
        _link.setAttribute("rel","stylesheet"+(cssFile.indexOf("\.less")>0?"\/less":""));
        if (cssFile.indexOf("\.css") > 0) _link.setAttribute("type","text\/css");
        _link.setAttribute("href",cssFile);
        head.appendChild(_link);
    },
    js: function(arr,obj) {
        if (!arr[this.arrJSIndex.count]) return;
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = arr[this.arrJSIndex.count].split("##")[1] || "";
        script.src = arr[this.arrJSIndex.count].split("##")[0];
        script.onload = script.onreadystatechange = function() {
            //JS组加载完成
            if (obj.arrJSIndex.count == arr.length-1 && obj.arrJSIndex.index == 0) {
				common.getDomById("_h5_box").style.display = "block";
                common.getDomById("_h5_loading").style.display = "none";
                /**后加载的JS**/
                obj.arrJSIndex.count = 0;
                obj.arrJSIndex.index = 1;
                obj.js(obj.__loadJS_after,obj);
                /*视频加载*/
                common.loadH5Video();
            }
            else if (obj.arrJSIndex.count <= arr.length-1) {
                obj.arrJSIndex.count ++;
                /******针对split("##")[2]的标签，如果不使用，则不去加载该JS******/
                try {
                    var hasObjectStr = arr[obj.arrJSIndex.count].split("##")[2];
                    if (hasObjectStr && !common.getDomById(hasObjectStr)) {
                        obj.arrJSIndex.count ++;
                    }
                }
                catch(e) {}
                /***********************************************************/
                setTimeout(function() {obj.js(arr,obj);},1);
            }
        }
        head.appendChild(script);
    },
    arrJSIndex: {
        index:0,
        count:0
    }
    //arrCSSIndex: 0
};

var common = {
    
    //是否为移动版
    __h5Flag: false,
    
    //强制到PC版
    forceToPC: function() {
        this.setCookie("forceToPC",1);
        window.location.reload();
    },
    
    //获取DOM ID
    getDomById: function(id) {
        return document.getElementById(id);
    },
    
    //浏览器信息
    browser: {
        versions: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    
    //插入DOM
    insertAfter:function(newElement,targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.insertBefore(newElement);
        }
        else {
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    },
    
    //加载JS_new
    loadJS_new: function(url,callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                script.onload = script.onreadystatechange = null;  // Handle memory leak in IE
                try {
                    setTimeout(callback,5);
                }
                catch(e) {
                    //console.log("The function '"+callback+"'  is found error.");
                }
            }
        }; 
        script.src = url;
        head.appendChild(script);
    },
    
    //加载JS
    loadJS: function(url,callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type= 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                script.onload = script.onreadystatechange = null;  // Handle memory leak in IE
                try {
                    setTimeout("eval("+callback+")",5);
                }
                catch(e) {
                    //console.log("The function '"+callback+"'  is found error.");
                }
            }
        }; 
        script.src = url;
        head.appendChild(script);
    },
    
    //停止加载
    documentStop: function() {
        if (!!(window.attachEvent && !window.opera))
            document.execCommand("stop");
        else
            window.stop();
    },
    
    //设置栏目导航样式
    setLanmuNav: function(parentID,className) {
        var nurl = window.location.pathname,
            nurl = nurl.substr(nurl.lastIndexOf("\/")+1) || "index";
            lmURL_a = document.getElementById(parentID).getElementsByTagName("a"),
            lmURL = [];
        for (var i=0;i<lmURL_a.length;i++) {
            if (lmURL_a[i].getAttribute("href").indexOf(nurl)>-1)
                lmURL_a[i].parentNode.setAttribute("class",className);
            else
                lmURL_a[i].parentNode.setAttribute("class","");
        }
    },
    
    //加载手机端音视频
    loadH5Video: function() {
        if (!vurl) return;
        var poster = "", purl = vurl;
        vurl = vurl.toLowerCase();
        if (vurl.substr(0,4) != "http") {
            var tmpvurl = vurl.split(",");
            du = {};
            for (var i=0;i<tmpvurl.length;i++) {
                var t = tmpvurl[i].split(":\/\/");
                du[t[0]] = "http://"+t[1];
            }
            if (du.ld) purl = du.ld;
            //else if (du.sd) purl = du.sd;
            //else if (du.hd) purl = du.hd;
            else if (du.audio) purl = du.audio;
            purl += "/av-g.m3u8";
            poster = (this.getDomById("_h5_share").getAttribute("src").substr(-11) == "weblogo.png" ? "" : " poster='"+common.getDomById("_h5_share").getAttribute("src")+"'");
        }
        poster = (this.getDomById("_h5_share").getAttribute("src").substr(-11) == "weblogo.png" ? "" : " poster='"+common.getDomById("_h5_share").getAttribute("src")+"'").replace(/(http[s]{0,1}:)/,'');
        var ftype = vurl.substr(vurl.lastIndexOf("\."),4),
            ftype1 = vurl.substr(vurl.lastIndexOf("\."),5);
        if (ftype == "\.mp4" || ftype1 == "\.m3u8") {
            this.getDomById("_h5_content").innerHTML = "<video id=\"player\"" + poster + " src=\""+purl+"\" width=\"95%\" height=\""+Math.round(window.innerWidth*.8*3/4)+"\" controls=\"yes\" type=\"video\/mp4\" style=\"display:block; margin:0 auto 1.5rem;\"><\/video>" + this.getDomById("_h5_content").innerHTML;
        }
        else if (ftype == "\.mp3") {
            this.getDomById("_h5_content").innerHTML = "<audio width='100%' autoplay='autoplay' src='"+purl+"' controls='controls'></audio>" + this.getDomById("_h5_content").innerHTML;
        }
    },
	
	hasVideo:false,
    
    //加载PC端音视频
    loadPCVideo: function() {
        that = this;
        if (!vurl) return;
        //音频
        if (vurl.substr(vurl.lastIndexOf("\."),4).toLowerCase() == "\.mp3") {
        	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
        		//ie8使用embed，之前的代码，未动过。
	            this.whenReady(function() {
	                that.getDomById("main_text").innerHTML = "<embed autoplay='true' src='"+vurl+"' width='100%' height='75' />" + that.getDomById("main_text").innerHTML;
	            });
	            return;
        	}else{
        		//防止embed有黑边框，改为video
	            this.whenReady(function() {
	                that.getDomById("main_text").innerHTML = "<audio controls='' autoplay='' controlsList='nodownload' style='width: 100%; height: 50px;'><source src='"+vurl+"' type='audio/mpeg'>您的浏览器不支持 audio 元素。</audio>" + that.getDomById("main_text").innerHTML;
	            });
	            return;
        	}
        }   
        
        //视频
        var tmpvurl = vurl.split(",");
        du = {};
        for (var i=0;i<tmpvurl.length;i++) {
            var t = tmpvurl[i].split(":\/\/");
            du[t[0]] = "http://"+t[1];
        }
        this.whenReady(function() {                    
			if (!that.hasVideo) {
				that.hasVideo = true;	
         			setTimeout(function(){   			
					that.loadJS_new("//v.cqnews.net/vplayer/jwzt/video.js");
         			},1000);
			}
            
        });
    },
    
    //meta查找
    getMeta: function(name,content) {
        var _tmp = document.getElementsByTagName("meta");
        for (var i=0;i<_tmp.length;i++) {
            if (_tmp[i].getAttribute(name) == content) return _tmp[i];
        }
        return undefined;
    },
    
    //meta创建
    createMeta: function(name,content,property) {
        var _meta = document.createElement("meta");
        if (name) _meta.name = name;
        if (property) _meta.setAttribute("property",property);
        _meta.content = content;
        document.getElementsByTagName("head")[0].appendChild(_meta);    
    },
    
    //meta修改
    setMeta: function(fmeta,name,content) {
        fmeta && fmeta.setAttribute(name,content);
        return fmeta;
    },
    
    //meta删除
    delMeta: function(fmeta) {
        fmeta && fmeta.parentNode.removeChild(fmeta);
    },
    
    //加载完成
    whenReady: (function() {   //这个函数返回whenReady()函数
        var funcs = [];             //当获得事件时，要运行的函数
        var ready = false;          //当触发事件处理程序时,切换为true
        
        //当文档就绪时,调用事件处理程序
        function handler(e) {
            if (ready) return;       //确保事件处理程序只完整运行一次
            
            //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
            if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
                return;
            }
    
            //注意每次都要计算funcs.length
            //以防这些函数的调用可能会导致注册更多的函数
            for (var i=0; i<funcs.length; i++) {
                funcs[i].call(document);
            }
            //事件处理函数完整执行,切换ready状态, 并移除所有函数
            ready = true;
            funcs = null;
        }
        //为接收到的任何事件注册处理程序
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', handler, false);
            document.addEventListener('readystatechange', handler, false); //IE9+
            window.addEventListener('load', handler, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', handler);
            window.attachEvent('onload', handler);
        }
        //返回whenReady()函数
        return function whenReady(fn) {
            if (ready) { fn.call(document); }
            else { funcs.push(fn); }
        }
    })(),
    
    //ipad是否显示为移动版
    ipadToMobile: false,
    
	//中宣部埋点代码
	zxbmd:function() {
		that = this;
		this.whenReady(function() {
			that.loadJS_new("https://p.wts.xinwen.cn/dot-wts/spm.js",function(){
				var contentID = document.location.href.match(/content_\d{6,16}\.htm[l]?/);
				if (contentID != null) {
					if (window.spm) {
						spm.config({
							siteId: 'zm5129-001', // 此处填写该网站对应的网站标识（即SPM a段） 例如'zmXXXX-001'
							additionalInfo: {
								targetID: contentID[0].replace(/content_|\.htm[l]?/ig,''), // 此处填写稿件ID
								organization: 'zm5129', // 此处填写机构ID
								// 上报进入事件
								category: 'event',
								action: 'comeIn'
							}
						});
					}
					window.onbeforeunload = function() {
						spm.push({category: 'event', action: 'leave' });   //上报离开事件
					};
					var getByClass = function(oParent,sClass) {  
						var aEle = document.getElementsByTagName('*');  
						var arr = [];  
						for (var i=0;i<aEle.length;i++) {  
							if (aEle[i].className == sClass) arr.push(aEle[i]);
						}  
						return arr;  
					};
					var addForward = function(className) {
						try {
							var tmpp = getByClass('',className)[0];
							tmpp = tmpp.getElementsByTagName("a");
							for (var i=0;i<tmpp.length-1;i++) {
								tmpp[i].addEventListener('click',function(){
									spm.push({ category: 'event', action: 'forward' });
								});
							}
						}
						catch(e) {}
					};
					addForward("shareBnt1");
					addForward("shareBnt");
				}								
			});				
		});
	},
	
    //手机端适配
    mobile:function() {

        /***********统计系统需提取的信息***********/
        webdig_pos = this.getDomById("pos").innerHTML;
        vurl = this.getDomById("vdo") && this.getDomById("vdo").innerHTML.replace(/\s/ig,"");  //读取视频信息
        if ((this.browser.versions.ios || this.browser.versions.android) && (!this.browser.versions.iPad || (this.ipadToMobile = window.ipadToMobile)) && !this.getCookie("forceToPC")) {
                //var docH = document.implementation.createHTMLDocument(document.title);
                isH5 = true;
                //this.documentStop();
                
                /*****记录HTML头部信息*****/
                var description, keywords, tMeta = document.getElementsByTagName("meta"), __newmeta = new Array();
                var __webterren = ["description","keywords","filetype","publishedtype","pagetype","author","catalogs","contentid","name","image"];
                
                /******包含记录专家系统标签******/
                for (var i=0;i<tMeta.length;i++) {
                    for (var j=0;j<__webterren.length;j++) {
                        if (tMeta[i].name == __webterren[j] || tMeta[i].getAttribute("itemprop") == __webterren[j]) {
                            __newmeta.push(tMeta[i].cloneNode(true));
                        }
                    }
                }
                
                _h5_box = this.getDomById("_h5_box");
                
                /**预先加载的JS**/
                dynamicLoading.__loadJS_pre = [
                    "//www.cqnews.net/js/jquery.min.js",
                    "//www.cqnews.net/js/zpto-all.js",
                    "//www.cqnews.net/js/common/util.js",
                    "//www.cqnews.net/js/wx/shareData.js",
					"//p.wts.xinwen.cn/dot-wts/spm.js"									
                ];
                
                /**后加载的JS**/
                dynamicLoading.__loadJS_after = [
                    "//cmt.cqnews.net/template/js/hlcmt.js"
                ];
                                
                /**获取加载的JS/CSS或LESS**/
                var __plugins = this.getDomById("__plugins").getElementsByTagName("img");
                __lessInsertFlag = false;  //是否需要使用less
                for (var i=0;i<__plugins.length;i++) {
                    var _tmp = __plugins[i].getAttribute("src");
                    if (_tmp.indexOf("\.css")+4 == _tmp.length || _tmp.indexOf("\.less")+5 == _tmp.length) {
                        /****** 如果有less文件，则启用less.min.js ******/
                        if (_tmp.indexOf("\.less")+5 == _tmp.length && !__lessInsertFlag) {
                            __lessInsertFlag = true;
                            dynamicLoading.__loadJS_pre.push("//www.cqnews.net/js/mobile/less-1.3.3.min.js");
                        }
                        /********************************************/
                        dynamicLoading.__loadCSS.push(_tmp);
                    }
                    else {
                        var _tmp1 = _tmp.split("##")[0];
                        if (_tmp1.indexOf("\.js")+3 == _tmp1.length) dynamicLoading.__loadJS_after.push(_tmp);
                    }
                }
                
                /*****重建文档*****/
                var doctype = document.implementation.createDocumentType('html','','');  
                var titleDoc = document.title;
                bodyhtml = _h5_box.innerHTML;
                document.removeChild(document.firstChild);
                document.removeChild(document.lastChild);
                document.appendChild(doctype);
                var html = document.createElement("html");              
                var head = document.createElement("head");
                var base = document.createElement("base");
                base.setAttribute("target","_self");
                var title = document.createElement("title");
                var body = document.createElement("body");
                head.appendChild(base);
                head.appendChild(title);
                html.appendChild(head);
                /**加载统一样式表**/
                var _style = document.createElement("style");
                _style.innerHTML = "html {-webkit-text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;text-size-adjust:none;}";
                html.appendChild(_style);
                /****************/
                html.appendChild(body);
                document.appendChild(html);
                document.title = titleDoc;
                for (var _c=0;_c<dynamicLoading.__loadCSS.length;_c++) dynamicLoading.css(dynamicLoading.__loadCSS[_c]); //开始加载CSS
                this.createMeta("apple-mobile-web-app-capable", "yes","");
                this.createMeta("applicable-device","pc,mobile","");
                this.createMeta("viewport","width=device-width, user-scalable=no,initial-scale=1,minimum-scale=1, maximum-scale=1","");
                this.createMeta("charset","utf-8","");
                //meta("apple-touch-fullscreen","yes");
                
                    
                /******修改标题栏******/
                // document.title = document.title.replace(/(-[\s*])|([\s*]-)/i,"-").replace(/-.*/i,"");
                document.title = document.title.replace(/(-[\s*])|([\s*]-)/i,"-");

                /******设置H5页面内容******/
                setH5Content();
				/******加载中宣部埋点代码******/
				//this.zxbmd();
        }
        else {
            isH5 = false;
            var _h5box = this.getDomById("_h5_box");
            document.body.removeChild(_h5box);
			/******加载中宣部埋点代码******/
			that = this;
			//setTimeout(function(){that.zxbmd()},500);  //加载中宣部埋点代码
            this.loadPCVideo();  //设置视频
            this.setCookie("forceToPC","");  //强制电脑版后还原
        } 
    },

    //设置COOKIE
    setCookie: function(c_name,value,expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    },

    //取出cookie
    getCookie: function(c_name) {
        var c_start, c_end;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) { 
                c_start = c_start + c_name.length + 1; 
                c_end = document.cookie.indexOf(";",c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            } 
        }
        return "";
    },
    //清除cookie  
    clearCookie: function(c_name) {  
        this.setCookie(c_name, "", -1);  
    }
}

/***设置H5页面内容***/
function setH5Content() {
    /***加载LOADING***/
    var loading = document.createElement("div");
    loading.id = "_h5_loading";
    document.body.appendChild(loading);
    common.getDomById("_h5_loading").style.display = "block";
    
    /***加载BOX***/
    var __mobileBox = document.createElement("div");
    __mobileBox.id = "_h5_box";
    __mobileBox.style.display = "none";
    __mobileBox.innerHTML = bodyhtml;
    document.body.appendChild(__mobileBox);

    
    /***加载iframe***/
    var __iframe = document.getElementsByTagName("iframe");
    for (var i=0;i<__iframe.length;i++) {
		var iframeURL = __iframe[i].getAttribute("data-url");
        if (typeof iframeURL === 'string' && /\S+/.test(iframeURL)) __iframe[i].setAttribute("src",iframeURL);
        __iframe[i].setAttribute("width",Math.min(window.innerWidth,window.screen.width));
    }
    
    /**appcache缓存**/
    var cacheIframe = document.createElement("iframe");
    cacheIframe.setAttribute("src","//www.cqnews.net/common/cache/appcache.html");
    cacheIframe.style.display = "none";
    document.body.appendChild(cacheIframe);
    dynamicLoading.js(dynamicLoading.__loadJS_pre,dynamicLoading);  //开始加载JS
}

window.addEventListener("load", function () {
    var l = document.querySelectorAll(".footer_copyright a");
    if(l.forEach) {
        l.forEach(function (v) {
            if (v.text == '法律顾问') {
                v.remove();
            }
        })
    } else {
        for(var _i in l) {
            if (l[_i].text == '法律顾问') {
                l[_i].remove();
            }
        }
    }
})