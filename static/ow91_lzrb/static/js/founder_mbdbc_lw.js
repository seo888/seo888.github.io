//'use strict';
// 兰网 http://www.lzrb.com.cn/

 // 定义一个参数配置对象，主要存放接口地址及应用标识appid
var mbd_config = {
    appid : "26750",
    apiUrl: (("https:" == document.location.protocol) ? "https://" : "http://") + "mbduser.newaircloud.com/event",
    homePage : {
        // 首页地址可能有多个，多个用";"隔开
        pageUrl : "http://www.lzrb.com.cn/" 
    },
    column: {
        // 判断是否为栏目页的正则表达式
        iscurrent: /^((https|http):\/\/)?(www\.lzrb\.com\.cn){1}\/(([\s\S]+)\/)?(index.html)$/, 
        // 获取栏目名，是否走通用方式：从“当前位置”中获取
        common: true, 
        posTag: "div",
        posClass:"m-crumb"
    },article :{
        // 判断是否为文章页的正则表达式
        iscurrent: /^((https|http):\/\/)?(www\.lzrb\.com\.cn){1}\/([\s\S]+)\/(content_\d+.html)$/, 
        // 获取文章id，是否走通用方式：从当前文章链接中获取
        common: true
    },
    // 获取文章id
    getArticleId : function(){
        var aid = "";
        if(mbd_config.article.common){
            var curWeb = window.location.href ;
            var articleID = curWeb.substring(curWeb.lastIndexOf("/")+1, curWeb.lastIndexOf("."));
            aid = articleID.split("_")[1];
            if(mbd_utils.isBlank(aid) || !/^[0-9]\d*$/.test(aid)){
                aid = "";
            }
        }else{
            // TODO 其他方式获取文章id
        }
        
        return aid;
    },
    // 获取栏目名，有级联关系，需获取全部栏目，直接用斜杠/分隔
    getColumnName : function(){
        var column="";
        if(mbd_config.column.common){
            // 获取当前位置dom是否存在
            var tagElement = mbd_utils.getElesByClassName(mbd_config.column.posTag, mbd_config.column.posClass);
            if(typeof tagElement!='undefined' && tagElement.length>=1){
                var aEles = tagElement[0].getElementsByTagName('a');
                if(typeof aEles!='undefined' && aEles.length>=1){
                    for(i=0;i<aEles.length;i++){
                        // 导航条中 首页 不作为栏目
                        var curName = mbd_utils.trim(mbd_utils.getInnerText(aEles[i]).replace(/>|\s+/g,''));
                        if(i==0 && (curName=='黑龙江新闻网' || curName=='网站首页' || curName=='首页' || curName=='主页')) continue;
                        if(curName=='正文') continue;
                        column += curName + "/";
                    }
                }
            }
        }else{
            // TODO 其他方式获取栏目名
        }

        if(column.lastIndexOf("/")==column.length-1){
            column = column.substring(0, column.length-1);
        }

        return column;
    }
}

var mbd_init = function(){
    var curAddr = window.location.href;

    // 调用启动和关闭事件
    // 利用cookie来管理一次会话，在浏览器一次启动关闭期间，浏览该网站只调用一次启动事件
    // 获取初始化标识
    var pageInit = mbd_cache.getCookie("mbdInit");
    if(mbd_utils.isBlank(pageInit)){ // cookie中的标识为空，则表示是当前会话中第一次加载
        // 标识写入cookie
        mbd_cache.setCookie("mbdInit", "Initialized");
        // 初始化事件
        mbd_event.appinit();

        // 在用户关闭浏览器时，无法通过页面关闭事件判定是否发送关闭请求
        // 在localStorage中存储一个时间标识，当每个页面关闭时，便更新该时间
        // 当下次启动时，获取该时间执行一次关闭事件，便可尽可能与初始化事件配对
        // 由于网站浏览时长是按照天进行统计的，所以超过一天的时限，放弃发送关闭事件请求
        var lastTime = mbd_cache.getLS("mbdLoadTime");
        if(!mbd_utils.isBlank(lastTime)){
            var timeArray = lastTime.split(";");
            if(timeArray.length==2){
                var lastDate = timeArray[0];
                var timestamp = timeArray[1];
                if(lastDate == mbd_utils.getNowFormatDate()){ // 同一天的请求才进行处理
                    mbd_event.appclose(timestamp);
                }
            }
        }
    }

    // 刚进入页面，向localStorage中写入事件戳标识，每个页面均加载，主要配合会话关闭事件使用，格式："年月日;时间戳"
    var loadTime = mbd_utils.getNowFormatDate() + ";" + new Date().getTime();
    mbd_cache.setLS("mbdLoadTime", loadTime);

    // 判断页面类型
    // 首页作为栏目页进行处理，当配置首页地址同页面获取地址一致，则调取栏目点击事件，主要是为了保证网站浏览量数据的准确
    // 应用场景：用户浏览网站只是打开了首页，不打开其他页面，首页也需要统计
    if(mbd_config.homePage.pageUrl.indexOf(curAddr)!=-1){ 
        mbd_event.columnclick('首页');
    }else if(new RegExp(mbd_config.article.iscurrent).test(curAddr)){  // 稿件详情页
        var aid = mbd_config.getArticleId();
        var columnName = mbd_config.getColumnName();
        // 文章点击
        mbd_event.articleclick(columnName, aid);
        // 文章浏览
        // mbd_event.articleview(columnName, aid);
        // 文章返回，该事件和文章浏览配合使用，用于计算停留时长
        //window.onbeforeunload=function (){ 
        //    mbd_event.articlereturn(columnName, aid);
        //}
        
        //其他事件，文件使用者自行调用，参照mbd_event下的各方法
        // TODO ......
        
    }else if(new RegExp(mbd_config.column.iscurrent).test( curAddr )){ // 栏目页
        var columnName = mbd_config.getColumnName();
        // 栏目页点击事件（或栏目浏览事件）
        mbd_event.columnclick(columnName);
    }

}

// 定义行为事件方法
var mbd_event = {
    appinit : function(){
        var params = mbd_event.initParamObject();
        if(mbd_utils.isBlank(params.dev)) return false;
        mbd_utils.sendRequest(mbd_config.apiUrl + "/appinit", params);
    },
    appclose : function(t){
        var params = mbd_event.createParamObject();
        params.t = t;
        if(mbd_utils.isBlank(params.dev)) return false;
        delete params.separator;
        mbd_utils.sendRequest(mbd_config.apiUrl + "/appclose", params);
    },
    columnclick : function(cname){
        if(mbd_utils.isBlank(cname)) return false;
        var params = mbd_event.createParamObject();
        if(mbd_utils.isBlank(params.dev)) return false;
        params.cname = cname;
        mbd_utils.sendRequest(mbd_config.apiUrl + "/columnclick", params);
    },
    articleclick : function(cname, aid){
        if(mbd_utils.isBlank(cname) || mbd_utils.isBlank(aid)) return false;
        var params = mbd_event.createParamObject();
        if(mbd_utils.isBlank(params.dev)) return false;
        params.cname = cname;
        params.aid = aid;
        params.bid="";
        params.rt="online";
        mbd_utils.sendRequest(mbd_config.apiUrl + "/articleclick", params);
    },
    articleview : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articleview");
    },
    articlecomment : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articlecomment");
    },
    articleshare : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articleshare");
    },
    articlefavorite : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articlefavorite");
    },
    articlereturn : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articlereturn");
    },
    articlelike : function(cname, aid){
        mbd_event.commonProcess(cname, aid, "/articlelike");
    },

    // 通用调用方式
    commonProcess: function(cname, aid, apiName){
        if(mbd_utils.isBlank(cname) || mbd_utils.isBlank(aid)) return false;
        var params = mbd_event.createParamObject();
        if(mbd_utils.isBlank(params.dev)) return false;
        params.cname = cname;
        params.aid = aid;
        mbd_utils.sendRequest(mbd_config.apiUrl + apiName, params);
    },

    // 生成一个参数对象
    createParamObject : function(){
        var params = {};
        params.appid = mbd_config.appid;
        params.dev = mbd_utils.getDev();
        params.t = new Date().getTime().toString();
        params.uid = "";
        params.separator = "/";

        return params;
    },
    initParamObject : function(){
        var params = {};
        params.appid = mbd_config.appid;
        params.dev = mbd_utils.getDev();
        params.t = new Date().getTime().toString();
        params.uid = "";
        params.type = mbd_utils.browserType();
        params.net = "";
        params.pro = "";
        params.v = "";
        params.h = window.screen.height.toString();
        params.w = window.screen.width.toString();
        params.os = mbd_utils.detectOS();
        params.osv = "";
        params.devClass = "";
        params.lon = "";
        params.lat = "";
        params.mainVersion = "";

        return params;
    }
}

// 定义一些常用的工具类
var mbd_utils = {

    isBlank : function(str){ // 判断字符串是否为空
        if(null==str || str=="undefined" || str.length<=0){
            return true;
        }
        return false;
    },

    trim : function(str){ // 去除字符串两边的空格
        return str.replace(/(^\s*)|(\s*$)/g,'');
    },
    guid : function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
    },
    uuid : function(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
     
        if (len) {
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
          var r;
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random()*16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return  mbd_config.appid + uuid.join('');
    },
    convertReqParams : function(jsonData){
        var pstr = '';
        for(var key in jsonData){
            pstr += key + "=" + jsonData[key] + "&";
        }
        if(mbd_utils.isBlank(pstr)) return '';
        return pstr.substr(0, pstr.lastIndexOf("&"));
    },
    // 异步请求发出后，不需要对返回结果做任何处理
    sendRequest: function(url, data){

        // data对象转换为post参数格式
        var datastr = mbd_utils.convertReqParams(data);
        if("IE"==mbd_utils.browserType() && mbd_utils.IEVersion()<=9 && window.XDomainRequest){
            var xdr = new XDomainRequest();
            xdr.open("POST", url);
            //xdr.onload = function () {}
            //xdr.onerror = function () {}
            //xdr.ontimeout = function () {}
            //xdr.onprogress = function () {}
			if (data instanceof Object) {
				data = JSON.stringify(data);
				setTimeout(function () {
					xdr.send(data);
				}, 0);
			}
        }else{
            var xmlHttp ;
            if(window.XMLHttpRequest){
                xmlHttp = new XMLHttpRequest();
            } else {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlHttp.open("POST", url , true);
            xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlHttp.send(datastr);
        }
        // 返回结果无需处理
    },
    // 生成一个uuid，存储在localStorage中作为用户标识
    getDev: function(){
        var mbdUid = mbd_cache.getLS("mbdUid");
        if(mbd_utils.isBlank(mbdUid)){
            // 若取不到，则重新生成一个
            mbdUid = mbd_utils.uuid(18, 16);
            mbd_cache.setLS("mbdUid", mbdUid);
        }
        return mbdUid;
    },
    // 获取浏览器类型
    browserType : function(){
        var ua = navigator.userAgent.toLowerCase();

        var isOpera = ua.indexOf('opera')>-1 || ua.indexOf('opr')>-1;
        var isIE = ua.indexOf("compatible")>-1 && ua.indexOf("msie")>-1 && !isOpera;
        var isEdge = ua.indexOf('edge')>-1 && !isIE;
        var isIE11 = ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1;

        if(isOpera){
            return "Opera";
        }else if(isIE){
            return "IE";
        }else if(isEdge){
            return "Edge";
        }else if(isIE11){
            return "IE11";
        }else if(ua.indexOf('firefox')>-1){
            return "Firefox";
        }else if(window.MessageEvent&&!document.getBoxObjectFor&&ua.indexOf('chrome') > -1){
            return "Chrome";
        }else if(ua.indexOf("safari") > -1 && ua.indexOf("chrome") == -1){
            return "Safari";
        }else if(ua.indexOf('netscape')>-1){
            return "Netscape";
        }else{
            return "Unknown";
        }
    },
    // 获取IE浏览器版本
    IEVersion : function(){
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1; 
        var isEdge = ua.indexOf('edge')>-1 && !isIE;
        var isIE11 = ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1;

        if(isIE) { 
            var reIE = new RegExp("msie (\\d+\\.\\d+);"); 
            reIE.test(ua); 
            var fIEVersion = parseFloat(RegExp["$1"]); 
            if(fIEVersion == 7){ 
                return 7;
            }else if(fIEVersion == 8) { 
                return 8;
            }else if(fIEVersion == 9) { 
                return 9;
            }else if(fIEVersion == 10) { 
                return 10;
            }else{ 
                return 6;//IE版本过低 
            }
        } else if(isEdge){ 
            return "Edge"; 
        }else if(isIE11){
            return 11;
        }else{
            return -1;
        }
        
    },
    // 获取操作系统
    detectOS: function(){
        var ua = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows") || userAgent.indexOf("Win") > -1;
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = ua.indexOf("Windows NT 5.0") > -1 || ua.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = ua.indexOf("Windows NT 5.1") > -1 || ua.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = ua.indexOf("Windows NT 5.2") > -1 || ua.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista= ua.indexOf("Windows NT 6.0") > -1 || ua.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = ua.indexOf("Windows NT 6.1") > -1 || ua.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
            var isWin8 = ua.indexOf("Windows NT 6.2") > -1 || ua.indexOf("Windows 8") > -1;
            if(isWin8) return "Win8";
            var isWin81 = ua.indexOf("Windows NT 6.3") > -1 ;
            if(isWin81) return "Win8.1";
            var isWin10 = ua.indexOf("Windows NT 10") > -1
            if(isWin10) return "Win10";
        }
        return "Unknown";
    },
    // 获取当前日期，年月日格式:yyyyMMdd
    getNowFormatDate : function(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + '' + month + '' + strDate;
    },
    getElesByClassName: function(TagName, ClassName){
        if(document.getElementsByClassName){
            return document.getElementsByClassName(ClassName);
        }else{
            if(TagName == '')  TagName='*';
            var allElements=document.getElementsByTagName(TagName);
            var classElements=[];
            for(var i=0;i<allElements.length;i++){
                if(allElements[i].className==ClassName){
                    classElements.push(allElements[i])
                }
            }
            return classElements;
        }
    },
    getInnerText: function(element){
        if(typeof element.textContent == 'undefined') {
            return element.innerText;
        }else {
            return element.textContent;
        }
    },
    // 多个onbeforeunload事件
    addOnbeforeunloadEvent : function(func){
        var oldonbeforeunload = window.onbeforeunload;
        if (typeof window.onbeforeunload != 'function') {
            window.onbeforeunload = func;
        } else {  
            window.onbeforeunload = function() {
                oldonbeforeunload();
                func();
            }
        }
    }
}

// 定义localStorage的一些方法
var mbd_cache = {
    enabled: function(){
        if(window.localStorage){
            return true; // 浏览器支持localStorage
        }
        return false;
    },
    setLS : function(key, value){
        window.localStorage.setItem(key, value);
    },
    getLS : function(key){
        var value = window.localStorage.getItem(key);
        if (value) {
            try {
                var value_json = JSON.parse(value);
                if (typeof value_json === 'object') {
                    return value_json;
                } else if (typeof value_json === 'number') {
                    return value_json;
                }
            } catch(e) {
                return value;
            }
        } else {
            return '';
        }
    },
    removeLS : function(key){
        window.localStorage.removeItem(key);
    },
    clearLS : function(){
        window.localStorage.clear();
    },
    setCookie: function(cname, cvalue){
        document.cookie = cname + "=" + escape(cvalue) + "; path=/";
    },
    getCookie: function(cname){
        var cvalue = "";
        var all = document.cookie;
        if(all==="") return cvalue;
        var list = all.split("; ");
        for(var i=0; i<list.length; i++){
            var cookie = list[i];
            var p = cookie.indexOf("=");
            var name = cookie.substring(0,p);
            var value = cookie.substring(p+1);
            value = unescape(value);
            if(cname == name){
                cvalue = value;
                break;
            }
        }
        return cvalue;
    },
    removeCookie: function(cname){
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }
}

// 文档准备就绪后执行
var mbd_whenReady = (function(){
    var funcs = [];
    var ready = false;

    function handler(e){
        if(ready) return;

        if(e.type === "readystatechange" && document.readyState !== "complete")
            return;
        for(var i=0; i<funcs.length; i++){
            funcs[i].call(document);
        }

        ready = true;
        funcs = null;
    }

    if(document.addEventListener){
        document.removeEventListener('DOMContentLoaded',handler ,false);
        document.removeEventListener('readystatechange',handler ,false);
        window.addEventListener("load", handler, false);
    }else if(document.attachEvent){
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }

    return function whenReady(f){
        if(ready) f.call(document);
        else funcs.push(f);
    }

}());

// 引入json2.js 压缩版本，主要是为了兼容IE8、IE9 JSON未定义的问题
if(typeof JSON == 'undefined'){
	if(typeof JSON!=="object"){JSON={};}(function(){var rx_one=/^[\],:{}\s]*$/;var rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rx_four=/(?:^|:|,)(?:\s*\[)+/g;var rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return(n<10)?"0"+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?(this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"):null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var gap;var indent;var meta;var rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i;var k;var v;var length;var mind=gap;var partial;var value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key);}if(typeof rep==="function"){value=rep.call(holder,key,value);}switch(typeof value){case"string":return quote(value);case"number":return(isFinite(value))?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null";}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null";}v=partial.length===0?"[]":gap?("[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]"):"["+partial.join(",")+"]";gap=mind;return v;}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v);}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v;}}if(typeof JSON.stringify!=="function"){meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" ";}}else{if(typeof space==="string"){indent=space;}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify");}return str("",{"":value});};}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
	function walk(holder,key){var k;var v;var value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return("\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4));});}if(rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,""))){j=eval("("+text+")");return(typeof reviver==="function")?walk({"":j},""):j;}throw new SyntaxError("JSON.parse");};}}());if(typeof JSON!=="object"){JSON={};}(function(){var rx_one=/^[\],:{}\s]*$/;var rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rx_four=/(?:^|:|,)(?:\s*\[)+/g;var rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return(n<10)?"0"+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?(this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"):null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var gap;var indent;var meta;var rep;function quote(string){rx_escapable.lastIndex=0;return rx_escapable.test(string)?'"'+string.replace(rx_escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i;var k;var v;var length;var mind=gap;var partial;var value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key);}if(typeof rep==="function"){value=rep.call(holder,key,value);}switch(typeof value){case"string":return quote(value);case"number":return(isFinite(value))?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null";}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null";}v=partial.length===0?"[]":gap?("[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]"):"["+partial.join(",")+"]";gap=mind;return v;}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+((gap)?": ":":")+v);}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v;}}if(typeof JSON.stringify!=="function"){meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" ";}}else{if(typeof space==="string"){indent=space;}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify");}return str("",{"":value});};}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k;var v;var value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);rx_dangerous.lastIndex=0;if(rx_dangerous.test(text)){text=text.replace(rx_dangerous,function(a){return("\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4));});}if(rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,""))){j=eval("("+text+")");return(typeof reviver==="function")?walk({"":j},""):j;}throw new SyntaxError("JSON.parse");};}}());
}
// 程序入口
mbd_whenReady(function(){
    mbd_init();
})
