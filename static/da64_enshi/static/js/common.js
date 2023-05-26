/*************
**恩施新闻网**
*************/

//文字截断
//cut_str(string, 10, '...');
function cut_str(str, len, char){
	if(!char) char="...";
	var char_length = 0;
	for (var i=0; i<str.length; i++){
		encodeURI(str.charAt(i)).length>2 ? char_length+=1 : char_length+=0.5;
		if (char_length>=len){
			var sub_len=char_length==len ? i+1 : i;
			return str.substr(0, sub_len)+char;
			break;
		} else {
			return str.substr(0, len)+char;
		}
	}
}

//文字垂直居中
function textVertical(){
	var textDiv = $('.text-vertical');
	if(!textDiv.length) return;
	$('>li>a', textDiv).each(function(i, o) {
		var a=$(this), d=$(this).find('div'),ah=0,dh=0;
		ah = a.outerHeight() ? a.outerHeight() : $(this).parent().outerHeight();
		dh = d.outerHeight() ? d.outerHeight() : 28;
		if(ah==dh) dh=d.height();
		d.css({
			'paddingTop' : Math.ceil((ah-dh)/2),
			'paddingBottom' : Math.ceil((ah-dh)/2)
		})
	})
}

//半角转化为全角
function ToDBC(txtstring) {
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
            tmp = tmp + String.fromCharCode(12288);
        }
        if (txtstring.charCodeAt(i) < 127) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
        }
    }
    return tmp;
}

//全角转换为半角
function ToCDB(str) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) == 12288) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
            continue;
        }
        if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
            tmp += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return tmp
}

//指定随机数范围
function randomNum(minNum, maxNum) { 
	switch(arguments.length){
		case 1:
			return parseInt(Math.random()*minNum+1,10);
			break;
		case 2:
			return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
			break;
		default:
			return 0;
			break;
	}
}

//toUnicode
function toUnicode(str) {
    var temp, i = 0,
    r = '',
    len = str.length;
    for (; i < len; i++) {
        temp = str.charCodeAt(i).toString(16);
        while (temp.length < 4) temp = '0' + temp;
        r += '\\u' + temp;
    }
    return r;
}

//li_hover
function li_hover(){
	var hClass = $('.li_hover');
	if(!hClass.length) return;
	$('>li', hClass).each(function(i, o) {
		$(this).hover(function(){
			$(this).addClass("on");
		}, function(){
			$(this).removeClass("on");
		})
	})
}

//phover
function pHover() {
	var pHoverDiv = $('.phover');
	if(!pHoverDiv.length) return;
	$('>li>a', pHoverDiv).each(function() {
		var a=$(this), d=$(this).find('div'),ah=0,dh=0;
		ah = a.outerHeight() ? a.outerHeight() : $(this).parent().outerHeight();
		dh = d.outerHeight() ? d.outerHeight() : 28;
		d.css({
			'paddingTop' : Math.ceil((ah-dh)/2),
			'paddingBottom' : Math.ceil((ah-dh)/2)
		});
	})
	$('>li>a', pHoverDiv).hover(function(){
		$('div', $(this)).animate({
			'opacity' : 0.99
		},'fast')
	}, function(){
		$('div', $(this)).animate({
			'opacity' : 0
		},'fast')
	})
	$('>li>a', pHoverDiv).find('div').css('opacity', 0);
};

//设为首页
function SetHome(obj, url) {
	try {
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
	}
	catch(e) {
		if(window.netscape) {
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch(e) {
				alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
		}
		else {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
		}
	}
}

//加入收藏
function AddFavorite(title, url) {
	try {
		window.external.addFavorite(url, title);
	}
	catch(e) {
		try {
			window.sidebar.addPanel(title, url, "");
		}
		catch(e) {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

//手机版跳转
function JumpMobile(template, url, force) {
	var device = window.screen.width<=768;
	if(!force && document.location.search.match(/(\?|&)mobile=(yes|no)(&|$)/i)) return;
	if(typeof(template) == 'undefined' || template == '' || template == null) {template = false;}
	if(typeof(url) == 'undefined' || url == '' || url == null) {url = document.location.href;}
	if(!force && device == template) return;
	var jumpstr = (force ? !template : device) ? 'yes' : 'no';
	var jump = url.replace(/(\?|&)(mobile)=?(.*?)(?=&|$)/i, '$1$2='+jumpstr);
	if(!jump.match(/(\?|&)mobile=(yes|no)(&|$)/i)) {
		jump = jump+(jump.indexOf('?')!=-1 ? '&' : '?')+'mobile='+jumpstr;
	}
	document.location.replace(jump);
}

//PV
function PV(){
	$.getJSON(
		APP_URL+'?app=system&controller=content&action=stat&jsoncallback=?&contentid='+contentid,
		function(data) {
			if($('#info-pv').length && $("#info-pv").is(':visible')) $('#info-pv').html("浏览："+data.pv+"次");
		}
	)
}

//判断是否为链接
function isURL(url){
	if(url.length>8){
		var urlHttps = url.slice(0, 5);
		var urlHttp = url.slice(0, 4);
		if(urlHttps == "https") {
			var https = url.slice(0, 8);
			if(https == "https://") {
				return true
			}else{
				return false
			}
		}else if(urlHttp == "http"){
			var http = url.slice(0, 7);
			if(http == "http://"){
				return true
			}else{
				return false
			}
		}else{
			return false
		}
	}else{
		return false
	}
}

//动态加载js
function loadJS(str){
	/*
	** str
	** 字符串："filename1.js, path/filename2.js, http://www.*.cn/path/filename3.js"
	** 数  组：["", "", ""]
	*/
	var arr = new Array();
	function createJS(jsFile){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = jsFile; 
	    document.body.appendChild(script);
	}
	if(typeof str === 'object' && !isNaN(str.length)){
		arr = str;
	}else{
		arr = str.split(',');
	}
	for(var i in arr){
		var jsFile = arr[i].replace(/\s+/g,"");
		if(!isURL(jsFile)) jsFile = IMG_URL+jsFile;
		createJS(jsFile);
	}
}

/*IE BUG*/
if(!Array.prototype.every) { /*every*/
 	Array.prototype.every = function (every_fun, thisArg) {
 		var _this = null,
 		iKey = 0,
 		len = this.length; //无符号右移
 		if (typeof every_fun !== "function") {
 			throw new TypeError("every_fun is not a function");
 		}
 		if (thisArg) {
 			_this = thisArg;
 		}//绑定执行环境
 		for (; iKey < len; iKey++) {
 			var  key_Value = this[iKey];
 			if(!every_fun.call(_this, key_Value, iKey, this)){
 				return false;
 			};
 		}
 		return true;
 	}
}
if(!Array.prototype.some) { /*some*/
    Array.prototype.some = function (some_fun, thisArg) {
        var _this = null,
            iKey = 0,
            arr_len = this.length;
        if (typeof some_fun != 'function') {
            throw new typeError('some_fun is not a function')
        }
        if (thisArg) {
            _this = thisArg;
        }
        for (; iKey < arr_len; iKey++) {
            var key_value = this[iKey];
            // some_fun.call(_this, arr_value, i, this)&&return true;
            if (some_fun.call(_this, key_value, iKey, this)) {
                return true;
            }
        }
        return false;
    }
}
if(!Array.prototype.indexOf){ /*indexOf*/
	Array.prototype.indexOf=function(obj,start){
	    for(var index=(start || 0), j=this.length;index<j;index++){
	    	if(this[index]===obj){ 
	    		return index; 
	    	}
	    }
	    return -1;
	}
}
if(!Array.prototype.filter) { /*filter*/
    Array.prototype.filter = function(fun /*, thisp*/){
        var len = this.length;
        if (typeof fun != "function"){
            throw new TypeError();
        }
        var res = new Array();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++){
            if (i in this){
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}
if(!Array.isArray) { /*isArray*/
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if(!Date.now){ /*date.now*/
	Date.now = function(){
		return new Date().valueOf();
	}
}
/*trim*/
String.prototype.trim = function (){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function (){
	return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function (){
	return this.replace(/(\s*$)/g, "");
}

//unixtime
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function(){
	if($(".tab").length){
		$(".tab").slide({delayTime: 500});
	}
	if($(".cTab").length){
		$(".cTab").slide({trigger: "click"});
	}
	textVertical();
	pHover();
	li_hover();
	if(typeof(contentid)!='undefined') PV();
});