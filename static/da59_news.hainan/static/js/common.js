//通用模块，自动执行
var require, define;

(function(global) {
    var head = document.getElementsByTagName('head')[0],
        loadingMap = {},
        factoryMap = {},
        modulesMap = {},
        scriptsMap = {},
        resMap = {},
        pkgMap = {};



    function createScript(url, onerror) {
        if (url in scriptsMap) return;
        scriptsMap[url] = true;

        var script = document.createElement('script');
        if (onerror) {
            var tid = setTimeout(onerror, require.timeout);

            script.onerror = function() {
                clearTimeout(tid);
                onerror();
            };

            script.onreadystatechange = function() {
                if (this.readyState == 'complete') {
                    clearTimeout(tid);
                }
            }
        }
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
        return script;
    }

    function loadScript(id, callback, onerror) {
        var queue = loadingMap[id] || (loadingMap[id] = []);
        queue.push(callback);

        //
        // resource map query
        //
        var res = resMap[id] || {};
        var pkg = res.pkg;
        var url;

        if (pkg) {
            url = pkgMap[pkg].url;
        } else {
            url = res.url || id;
        }

        createScript(url, onerror && function() {
            onerror(id);
        });
    }

    define = function(id, factory) {
        factoryMap[id] = factory;

        var queue = loadingMap[id];
        if (queue) {
            for(var i = 0, n = queue.length; i < n; i++) {
                queue[i]();
            }
            delete loadingMap[id];
        }
    };

    require = function(id) {
        id = require.alias(id);

        var mod = modulesMap[id];
        if (mod) {
            return mod.exports;
        }

        //
        // init module
        //
        var factory = factoryMap[id];
        if (!factory) {
            throw '[ModJS] Cannot find module `' + id + '`';
        }

        mod = modulesMap[id] = {
            exports: {}
        };

        //
        // factory: function OR value
        //
        var ret = (typeof factory == 'function')
                ? factory.apply(mod, [require, mod.exports, mod])
                : factory;

        if (ret) {
            mod.exports = ret;
        }
        return mod.exports;
    };

    require.async = function(names, onload, onerror) {
        if (typeof names == 'string') {
            names = [names];
        }
        
        for(var i = 0, n = names.length; i < n; i++) {
            names[i] = require.alias(names[i]);
        }

        var needMap = {};
        var needNum = 0;

        function findNeed(depArr) {
            for(var i = 0, n = depArr.length; i < n; i++) {
                //
                // skip loading or loaded
                //
                var dep = depArr[i];

                var child = resMap[dep];
                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
                
                if (dep in factoryMap || dep in needMap) {
                    continue;
                }

                needMap[dep] = true;
                needNum++;
                loadScript(dep, updateNeed, onerror);
            }
        }

        function updateNeed() {
            if (0 == needNum--) {
                var args = [];
                for(var i = 0, n = names.length; i < n; i++) {
                    args[i] = require(names[i]);
                }

                onload && onload.apply(global, args);
            }
        }
        
        findNeed(names);
        updateNeed();
    };

    require.resourceMap = function(obj) {
        var k, col;

        // merge `res` & `pkg` fields
        col = obj.res;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                resMap[k] = col[k];
            }
        }

        col = obj.pkg;
        for(k in col) {
            if (col.hasOwnProperty(k)) {
                pkgMap[k] = col[k];
            }
        }
    };

    require.loadJs = function(url) {
        createScript(url);
    };

    require.loadCss = function(cfg) {
        if (cfg.content) {
            var sty = document.createElement('style');
            sty.type = 'text/css';
            
            if (sty.styleSheet) {       // IE
                sty.styleSheet.cssText = cfg.content;
            } else {
                sty.innerHTML = cfg.content;
            }
            head.appendChild(sty);
        }
        else if (cfg.url) {
            var link = document.createElement('link');
            link.href = cfg.url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        }
    };


    require.alias = function(id) {return id};

    require.timeout = 5000;

})(this);

var CMS=(function ($){
	//判断浏览器的尺寸
	function getWindowWidth(){
		var size=[600,850,1000];
		var w = TY(window).width();
		for(var i=0,l=size.length;i<l;i++){
			if(w<size[i]){
				break;
			}
		}
		return i+1;
	}
	
	
	function tyLogin()
	{
		if(getWindowWidth()>=3)
			TY.loginAction();
		else
			window.location="http://passport.tianya.cn/login_m.jsp?fowardURL="+encodeURIComponent(window.location);
	}
	
	function tyRegist()
	{
		if(getWindowWidth()>=3)
			window.location="http://passport.tianya.cn/register/default.jsp?sourceURL="+encodeURIComponent(window.location);
		else
			window.location="http://passport.tianya.cn/login_m.jsp?fowardURL="+encodeURIComponent(window.location);
	}
	
	//加载广告脚本
	function getADV(url){
		//三栏结构有广告
		if(getWindowWidth()>=3){
			TY.loadUrl(url,function(ret){
				
			});
		}else{
		//不加载广告
			TY(".static_adpic").hide();
		}
	}
	
	//调整图片的尺寸，防止人为原因图片尺寸大小不一。
	function adjustImg(sel1,sel2){
		sel1= sel1 || ".tui-pic-list,.tui-pic-text";
		sel2 = sel2 || "img.h-auto";
		var img_list = TY(sel1);
		img_list.each(function(i,el){
			var imgs = TY(TY(el).find(sel2));
			if(imgs.size()){
				var img = imgs.eq(0);
				var scale = img.attr("img-scale"),w,h,ow,oh;
				if(!scale){//没有比例，则load图片，计算下尺寸
					var src = img.attr("data-original")||img.attr("src");		
					var newImg = new Image();
					newImg.onload =function(){
						
						h = img.height();
						w = img.width();

						if(h){
							img.attr({'img-scale':w/h,"auto-h":h})
							imgs.css("cssText","height:"+h+"px!important");
						}
						newImg=null;
					}
					newImg.src=src;
				}else{
					w=img.width();
					h = img.attr("auto-h")||0;
					imgs.css("cssText","height:"+(h ? h : w/scale)+"px!important"); 
				}
			}
		});
	}
	
	//图片延迟加载
	function loadImg(){
		TY.loader("TY.m.lazyload",function(mod){
			var lazyLoadR = new mod();
			lazyLoadR.load("img.lazy:visible",null,"data-original");
			
			//var lazyLoadL = new mod();
			//lazyLoadL.load(".left-side img.lazy:visible",null,"data-original");
			
			//var lazyLoadB = new mod();
			//lazyLoadB.load(".bottom-size img.lazy:visible",null,"data-original");
		})
	}
	//判断浏览器是否支持iscroll
	//兼容mobile safari、android默认浏览器、safari、chrome、firefox5+、opera11+、IE9+及其他webkit核心浏览器
	var isScroll = (function isScroll(){
		//移动设备
		if(TY.mobile.isMobile()){
			return true
		}
		//webkit、火狐、oprea浏览器、ie9+
		var UA=navigator.userAgent.toLowerCase();
		if(/webkit/i.test(UA) || (/firefox/i).test(UA) || ('opera' in window) || ($.browser.msie && parseInt($.browser.version,10)>9.0)){ 
			return true;
		}
		return false;
	})();
	
	function tabinit(){
		$=TY;
		
		$(".tui-tabsection").each(function(i,el){
			var nav,cont,CLS="tabon";
			el =$(el)
			nav = el.find(".hd li");
			cont = el.find(".bd");
			if(cont.find(".bd").length>0){
				cont=el.find(".static-tab-column-bd").children(".bd")
			}
			if (typeof($(this).attr("eventtype"))!="undefined")
				nav.bind($(this).attr("eventtype"),function(){
					var me = $(this),index=me.index();
					nav.removeClass(CLS);
					nav.addClass("taboff");
					nav.eq(index).removeClass("taboff");
					nav.eq(index).addClass(CLS);
					cont.hide();
					cont.eq(index).show();
					return false;
				});
		})
		
	}
	
	function linkChange(){
		if ($(window).width()<=800) {
			//BBS链接替换为手机端链接
			$("body").delegate('a','click',function(){
				var yuan_href ='',temp = [],yuan_addm='';
				var def = 'http://bbs.tianya.cn/';
				$(this).each(function(){
					yuan_href = $(this).attr('href');
					yuan_addm = $(this).attr('add_m');
					if(yuan_href&&yuan_addm&&yuan_href.indexOf(def) >= 0&&yuan_addm!='yes'){
						temp = yuan_href.split('//')[1].split('/')[1];
						$(this).attr({
							href:def+'m/'+temp,
							add_m:'yes'
						});
					}
					return true;
				});
			});
		}
	}
	
	$("body").ready(function(){
		loadImg();
		adjustImg();
		tabinit();
		//getADV();
		linkChange();
		$(window).resize(adjustImg);
	});
	var pub={};
	pub.adjustImg=adjustImg;
	pub.loadImg=loadImg;
	pub.isScroll =isScroll;
	pub.getWindowWidth=getWindowWidth;
	pub.tyLogin=tyLogin;
	pub.tyRegist=tyRegist;
	pub.getADV=getADV;
	return pub;
})(TY);