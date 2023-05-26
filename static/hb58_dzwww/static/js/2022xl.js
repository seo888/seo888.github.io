// 导航弹出开始
// PC端
function show_div() {
    var obj = document.getElementById('test_div');
    //var btn = document.getElementById('show_btn');
    if (obj.style.display == 'none') {
        obj.style.display = 'block';
        $('#show_btn').addClass('open');
    } else {
        obj.style.display = 'none';
        $('#show_btn').removeClass('open');
    }
}
// 手机端
function show_div1() {
    var obj = document.getElementById('wap-nav');
    //var btn = document.getElementById('show_btn1');
    if (obj.style.display == 'none') {
        obj.style.display = 'block';
    } else {
        obj.style.display = 'none';
    }
}
function show1() {
    $("#wap-nav").hide();
}
//搜索结束
function fill_redian(news){
	$("#redian").append(news);
}
//热点新闻 -->
var REDIAN = {
    curPage: 1,
    pageSize: 10,
    allNum: 0,
    init: function () {
        this.allNum = $("#redian ul li").length;
        $("#redian ul li").hide();
        $("#redian").show();
        this.showPageContent(this.curPage);
        this.addEvent();
    },
    showPageContent: function (page) {
        var start = parseInt((page - 1) * this.pageSize);
        var end = start + this.pageSize;
        if (start < 0) {
            start = 0;
        }
        if (start >= this.allNum) {
            return false;
        }
        $("#redian ul li").each(function (index, ele) {
            if (index >= start && index < end) {
                $(ele).show();
            }
        });
    },
    showNext: function () {
        this.curPage++;
        this.showPageContent(this.curPage);
    },
    addEvent: function () {
        var _this = this;
        $(document).endlessScroll({
            bottomPixels: 150,
            fireDelay: 30,
            callback: function (p) {
                _this.showNext();
            }
        });
    }
};

// 导航弹出结束
// 搜索
// 1、搜索框弹出
$(function(){
var navParts = $(".drop-title");
var conParts = $(".drop-box");
var Gflag = 0,
    Gtimer = null;
	navParts.each(function (index, element) {
		$(element).on('mouseover', function () {
			Gflag = 1;
			conParts.hide();
			navParts.removeClass('open');
			$(conParts).eq(index).show();
			if ($(this).hasClass('arrow')) {
				$(this).addClass('open')
			}
			startDetect();
		})
		$(element).on('mouseout', function () {
			Gflag = 0;
		})
		$(conParts).eq(index).on('mouseover', function () {
			Gflag = 1;
		})
		$(conParts).eq(index).on('mouseout', function () {
			Gflag = 0;
		})
	});
	function startDetect() {
		if (Gtimer) {
			clearInterval(Gtimer);
		}
		Gtimer = setInterval(function () {
			if (Gflag == 0) {
				conParts.hide();
				navParts.removeClass('open');
				clearInterval(Gtimer);
			}
		}, 1000);
	}
	(function(){
		var script=document.createElement("script"),
		head=document.getElementsByTagName('head')[0]||document.documentElement;
		script.src="//hb.dzwww.com/index.php?c=news&act=detail";
		script.charset="gb2312";
		document.body.appendChild(script);
	})();
});


//2、搜索开始
//判断字符是否为空的方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}
function searchform() {
    var searchword = $("#searchwordtext").val();
    if (isEmpty(searchword)) {
        document.forms.searchform.action = "//so.dzwww.com/web/index.jsp";
    } else {
        document.forms.searchform.action = "//so.dzwww.com/web/search";
    }
    document.forms.searchform.submit();
}

function myClipPage(tpArr,name,ext){
	//by licxpro PageClip
	var pageCount=tpArr.pop(),curPage=tpArr.pop(),flag=tpArr.pop(),i,strA,href,tempA;
	strA='',sepBef='',sepAft='';
	if(tpArr.length<2) return "";
	if(6===flag){sepBef="<a>...</a>";
		}else if(8===flag){sepAft="<a>...</a>";
		}else if(9===flag){sepBef="<a>...</a>";sepAft="<a>...</a>";
	}
	href=name+"."+ext;
	if(curPage==0){
		tempA='<a class="current">'+'1'+'</a>';
	}else{tempA='<a href="'+href+'" >'+'1'+'</a>';
		strA+='<a class="text" href="'+href+'">上一页</a>';
	}
	strA+=tempA+sepBef;
	for(i=1;i<tpArr.length;i++){
		href=name+"_"+tpArr[i]+"."+ext;
		if(curPage==tpArr[i]){
			tempA='<a class="current">'+(tpArr[i]+1)+'</a>';
		}else tempA='<a href="'+href+'" >'+(tpArr[i]+1)+'</a>';
		if(i==tpArr.length-2)
			strA+=tempA+sepAft;
		else
			strA+=tempA;
	}
	if(curPage+1!=pageCount){
		strA+='<a class="text" href="'+name+'_'+(curPage+1)+'.'+ext+'">下一页</a>';
	}
	document.write(strA);
}
function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt) {
    if (_nPageCount == null || _nPageCount <= 1) return;
    var nCurrIndex = _nCurrIndex || 0;
    //--------头部------
    if (nCurrIndex == 0) {
        document.write('<a class="current" href="#">1</a>'); //上一页
    } else {
        if (document.getElementById("videocontent")) {
            document.getElementById("videocontent").style.display = 'none';
        }
        if (nCurrIndex > 1) //上一页
        {
            document.write('<A  class="text"  href="' + _sPageName + '_' + (_nCurrIndex - 1) + '.' + _sPageExt +
                '"><</A>');
        } else {
            document.write('<A class="text" href="' + _sPageName + '.' + _sPageExt + '"><</A>');
        }
        //
        document.write('<A href="' + _sPageName + '.' + _sPageExt + '">1</A>');
    }
    for (var i = 1; i < _nPageCount; i++) {
        if (i % 10 == 0)
            document.write("<br/><br/>");
        if (nCurrIndex == i)
            document.write('<a href="javascript:void(0)" class="current">' + (i + 1) + '</a>');
        else
            document.write("<a href=\"" + _sPageName + "_" + i + "." + _sPageExt + "\">" + (i + 1) + "</a>");
    }
    //---------尾部-----
    if (_nPageCount > 1) {
        if (nCurrIndex == (_nPageCount - 1)) {} else {
            document.write('<A  class="text" href="' + _sPageName + '_' + (_nCurrIndex + 1) + '.' + _sPageExt +
                '">></A>');
        }
    } else {
        document.write('<A  href="' + _sPageName + '.' + _sPageExt + '">></A>');
    }
    //------------------
}
function x_nextPage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt, _text) {
    if (_nCurrIndex == (_nPageCount - 1) || _nPageCount == 1) {
        document.write('<A  href="javascript:void(0)">' + _text + '</A>');
    } else {
        document.write('<A  href="' + _sPageName + '_' + (_nCurrIndex + 1) + '.' + _sPageExt + '">' + _text + '</A>');
    }
}
function x_beforePage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt, _text) {
    if (_nCurrIndex > 1) //上一页
    {
        document.write('<A  href="' + _sPageName + '_' + (_nCurrIndex - 1) + '.' + _sPageExt + '">' + _text + '</A>');
    } else {
        document.write('<A  href="' + _sPageName + '.' + _sPageExt + '">' + _text + '</A>');
    }
}
function nextpage(act) {
    if (NeedBack == 0) {
        if (PAGE_COUNT == null || PAGE_COUNT <= 1) {
            //alert('本篇无分页');
            return;
        }
        PAGE_INDEX = PAGE_INDEX || 0;
        if (PAGE_COUNT == PAGE_INDEX + 1) {
            alert('已是最末页.再次点击将回到第一页');
            NeedBack = 1;
            return;
        }
        PAGE_INDEX = PAGE_INDEX + 1;
        var url = _sPageName + "_" + PAGE_INDEX + "." + _sPageExt;
    } else {
        var url = _sPageName + "." + _sPageExt;
    }
    window.location.href = url;
}
function GoNextPage(doc) {
    for (num; num < doc.images.length; num++) {
        if (doc.images[num].getAttribute("OLDSRC")) {
            var img = doc.images[num];
            img.onclick = function () {
                nextpage();
            }
            img.onmouseover = function () {
                img.style.cursor = "pointer";
                img.alt = "点击浏览下一张";
                img.title = "点击浏览下一张";
            }
        } //end if
    }
}


///////////////////////sea.js   朋友圈分享----------->>>>>>>>>>>
/*! Sea.js 3.0.3 | seajs.org/LICENSE.md */
/*
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return B++}function e(a){return a.match(E)[0]}function f(a){for(a=a.replace(F,"/"),a=a.replace(H,"$1/");a.match(G);)a=a.replace(G,"/");return a}function g(a){var b=a.length-1,c=a.charCodeAt(b);return 35===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||47===c?a:a+".js"}function h(a){var b=v.alias;return b&&x(b[a])?b[a]:a}function i(a){var b=v.paths,c;return b&&(c=a.match(I))&&x(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=v.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(J,function(a,c){return x(b[c])?b[c]:a})),a}function k(a){var b=v.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=z(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charCodeAt(0);if(K.test(a))c=a;else if(46===d)c=(b?e(b):v.cwd)+a;else if(47===d){var g=v.cwd.match(L);c=g?g[0]+a.substring(1):a}else c=v.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),f(c)}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=h(a),a=j(a),a=h(a),a=g(a),a=h(a);var c=l(a,b);return c=h(c),c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c,d){var e;try{importScripts(a)}catch(f){e=f}b(e)}function p(a,b,c,d){var e=Z.createElement("script");c&&(e.charset=c),A(d)||e.setAttribute("crossorigin",d),q(e,b,a),e.async=!0,e.src=a,ca=e,ba?aa.insertBefore(e,ba):aa.appendChild(e),ca=null}function q(a,b,c){function d(c){a.onload=a.onerror=a.onreadystatechange=null,v.debug||aa.removeChild(a),a=null,b(c)}var e="onload"in a;e?(a.onload=d,a.onerror=function(){D("error",{uri:c,node:a}),d(!0)}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&d()}}function r(){if(ca)return ca;if(da&&"interactive"===da.readyState)return da;for(var a=aa.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return da=c}}function s(a){var b=[];return a.replace(fa,"").replace(ea,function(a,c,d){d&&b.push(d)}),b}function t(a,b){this.uri=a,this.dependencies=b||[],this.deps={},this.status=0,this._entry=[]}if(!a.seajs){var u=a.seajs={version:"3.0.3"},v=u.data={},w=c("Object"),x=c("String"),y=Array.isArray||c("Array"),z=c("Function"),A=c("Undefined"),B=0,C=v.events={};u.on=function(a,b){var c=C[a]||(C[a]=[]);return c.push(b),u},u.off=function(a,b){if(!a&&!b)return C=v.events={},u;var c=C[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete C[a];return u};var D=u.emit=function(a,b){var c=C[a];if(c){c=c.slice();for(var d=0,e=c.length;e>d;d++)c[d](b)}return u},E=/[^?#]*\//,F=/\/\.\//g,G=/\/[^\/]+\/\.\.\//,H=/([^:\/])\/+\//g,I=/^([^\/:]+)(\/.+)$/,J=/{([^{]+)}/g,K=/^\/\/.|:\//,L=/^.*?\/\/.*?\//;u.resolve=m;var M="undefined"==typeof window&&"undefined"!=typeof importScripts&&z(importScripts),N=/^(about|blob):/,O,P,Q=!location.href||N.test(location.href)?"":e(location.href);if(M){var R;try{var S=Error();throw S}catch(T){R=T.stack.split("\n")}R.shift();for(var U,V=/.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i,W=/(.*?):\d+:\d+\)?$/;R.length>0;){var X=R.shift();if(U=V.exec(X),null!=U)break}var Y;if(null!=U)var Y=W.exec(U[1])[1];P=Y,O=e(Y||Q),""===Q&&(Q=O)}else{var Z=document,$=Z.scripts,_=Z.getElementById("seajsnode")||$[$.length-1];P=n(_),O=e(P||Q)}if(M)u.request=o;else{var Z=document,aa=Z.head||Z.getElementsByTagName("head")[0]||Z.documentElement,ba=aa.getElementsByTagName("base")[0],ca;u.request=p}var da,ea=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,fa=/\\\\/g,ga=u.cache={},ha,ia={},ja={},ka={},la=t.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6,ERROR:7};t.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=t.resolve(b[d],a.uri);return c},t.prototype.pass=function(){for(var a=this,b=a.dependencies.length,c=0;c<a._entry.length;c++){for(var d=a._entry[c],e=0,f=0;b>f;f++){var g=a.deps[a.dependencies[f]];g.status<la.LOADED&&!d.history.hasOwnProperty(g.uri)&&(d.history[g.uri]=!0,e++,g._entry.push(d),g.status===la.LOADING&&g.pass())}e>0&&(d.remain+=e-1,a._entry.shift(),c--)}},t.prototype.load=function(){var a=this;if(!(a.status>=la.LOADING)){a.status=la.LOADING;var c=a.resolve();D("load",c);for(var d=0,e=c.length;e>d;d++)a.deps[a.dependencies[d]]=t.get(c[d]);if(a.pass(),a._entry.length)return a.onload(),b;var f={},g;for(d=0;e>d;d++)g=ga[c[d]],g.status<la.FETCHING?g.fetch(f):g.status===la.SAVED&&g.load();for(var h in f)f.hasOwnProperty(h)&&f[h]()}},t.prototype.onload=function(){var a=this;a.status=la.LOADED;for(var b=0,c=(a._entry||[]).length;c>b;b++){var d=a._entry[b];0===--d.remain&&d.callback()}delete a._entry},t.prototype.error=function(){var a=this;a.onload(),a.status=la.ERROR},t.prototype.exec=function(){function a(b){var d=c.deps[b]||t.get(a.resolve(b));if(d.status==la.ERROR)throw Error("module was broken: "+d.uri);return d.exec()}var c=this;if(c.status>=la.EXECUTING)return c.exports;if(c.status=la.EXECUTING,c._entry&&!c._entry.length&&delete c._entry,!c.hasOwnProperty("factory"))return c.non=!0,b;var e=c.uri;a.resolve=function(a){return t.resolve(a,e)},a.async=function(b,c){return t.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=z(f)?f.call(c.exports={},a,c.exports,c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=la.EXECUTED,D("exec",c),c.exports},t.prototype.fetch=function(a){function c(){u.request(g.requestUri,g.onRequest,g.charset,g.crossorigin)}function d(a){delete ia[h],ja[h]=!0,ha&&(t.save(f,ha),ha=null);var b,c=ka[h];for(delete ka[h];b=c.shift();)a===!0?b.error():b.load()}var e=this,f=e.uri;e.status=la.FETCHING;var g={uri:f};D("fetch",g);var h=g.requestUri||f;return!h||ja.hasOwnProperty(h)?(e.load(),b):ia.hasOwnProperty(h)?(ka[h].push(e),b):(ia[h]=!0,ka[h]=[e],D("request",g={uri:f,requestUri:h,onRequest:d,charset:z(v.charset)?v.charset(h):v.charset,crossorigin:z(v.crossorigin)?v.crossorigin(h):v.crossorigin}),g.requested||(a?a[g.requestUri]=c:c()),b)},t.resolve=function(a,b){var c={id:a,refUri:b};return D("resolve",c),c.uri||u.resolve(c.id,b)},t.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,y(a)?(c=a,a=b):c=b),!y(c)&&z(d)&&(c=b===s?[]:s(""+d));var f={id:a,uri:t.resolve(a),deps:c,factory:d};if(!M&&!f.uri&&Z.attachEvent&&b!==r){var g=r();g&&(f.uri=g.src)}D("define",f),f.uri?t.save(f.uri,f):ha=f},t.save=function(a,b){var c=t.get(a);c.status<la.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=la.SAVED,D("save",c))},t.get=function(a,b){return ga[a]||(ga[a]=new t(a,b))},t.use=function(b,c,d){var e=t.get(d,y(b)?b:[b]);e._entry.push(e),e.history={},e.remain=1,e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=ga[d[f]].exec();c&&c.apply(a,b),delete e.callback,delete e.history,delete e.remain,delete e._entry},e.load()},u.use=function(a,b){return t.use(a,b,v.cwd+"_use_"+d()),u},t.define.cmd={},a.define=t.define,u.Module=t,v.fetchedList=ja,v.cid=d,u.require=function(a){var b=t.get(t.resolve(a));return b.status<la.EXECUTING&&(b.onload(),b.exec()),b.exports},v.base=O,v.dir=O,v.loader=P,v.cwd=Q,v.charset="utf-8",u.config=function(a){for(var b in a){var c=a[b],d=v[b];if(d&&w(d))for(var e in c)d[e]=c[e];else y(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),v[b]=c}return D("config",a),u}}}(this);
seajs.config({
  alias: {
	'wxapi': 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js',
	'wxconfig':'https://w.dzwww.com/wechat/sign_sea.php?id=2&url='+encodeURIComponent(location.href.split('#')[0])
  }
});
function addEventNew(wx,obj){
	wx.updateAppMessageShareData({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
	wx.updateTimelineShareData({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
}
function addEventOld(wx,obj){
	wx.onMenuShareTimeline({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
	wx.onMenuShareAppMessage({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
	wx.onMenuShareQQ({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
	wx.onMenuShareWeibo({ 
		title: obj.title, // 分享标题
		desc: obj.desc, // 分享描述
		link: obj.path, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: obj.pic, // 分享图标
		success: function () {
		  // 设置成功
		}
	}); 
}
seajs.use(['wxconfig','wxapi'], function(config,wx) {
	//console.log(config);
	 
	var $ = window.$;
	var title = window._share.title;
	var desc = window._share.desc;
	//var pic = window._share.pic;
	wx.config({
		debug: false,
		appId: config.wxConfig.appId,
		timestamp: config.wxConfig.timestamp,
		nonceStr: config.wxConfig.nonceStr,
		signature: config.wxConfig.signature,
		jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo', 
			'chooseImage',
			'previewImage',
			'uploadImage',
			'downloadImage',
			'updateAppMessageShareData',
			'updateTimelineShareData'
		]
	});
	var _path = location.href.split('#')[0];
    var _defaultPic = 'http://www.dzwww.com/temp/dzw.jpg'; 
	var _arr = _path.split('/');
	_arr.pop();
	if($("div.TRS_Editor img").length>0){
		var _src = $("div.TRS_Editor img").eq(0).attr('src');
		if(_src.indexOf('http')<0){
			_defaultPic=_arr.join('/')+'/'+$("div.TRS_Editor img").eq(0).attr('src');
		}else{
			_defaultPic = _src;
		} 
	}
	if(window._share.pic){
		_defaultPic = window._share.pic;
	}
	var shareObj = {title:title,desc:desc,pic:_defaultPic,path:_path};
	//console.log(shareObj);
	wx.ready(function () {   //需在用户可能点击分享按钮前就先调用]
		wx.checkJsApi({
			jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function(res) {
				// 以键值对的形式返回，可用的api值true，不可用为false
				// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				if(res.checkResult.updateAppMessageShareData){
					addEventNew(wx,shareObj);
				}else{
					addEventOld(wx,shareObj);
				}
			}
		});
		
	});
	wx.error(function (res) {
		console.log(res);
	});
});
*/
///////////////////////sea.js   朋友圈分享-----------<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<