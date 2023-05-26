window.console = window.console || (function(){
var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
return c;
})();
if (((navigator.userAgent.indexOf('MSIE') >= 0)||(navigator.userAgent.indexOf('Trident')>= 0)) && (navigator.userAgent.indexOf('Opera') < 0))console.log('禁止任何未经授权的调试行为!');
else console.log('%c 禁止任何未经授权的调试行为! ', 'background: #fff; color: red; font-size:large; font-weight:bold');


//zjsonp
(function (global) {
    var id = 0,
        container = document.getElementsByTagName("head")[0];

    function zjsonp(options) {
        if(!options || !options.url) return;

        var scriptNode = document.createElement("script"),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = "zjsonp" + id++;

        // 添加回调函数
        if(callback!=null)data["callback"] = fnName;
		
        // 拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
		if(params.length>0){
        url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
        url += params.join("&");
		}
        scriptNode.src = url;

        // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
        global[fnName] = function (ret) {
            callback && callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }

        // 出错处理
        scriptNode.onerror = function () {
            callback && callback({error:"error"});
            container.removeChild(scriptNode);
            global[fnName] && delete global[fnName];
        }

        scriptNode.type = "text/javascript";
        container.appendChild(scriptNode)
    }

    global.zjsonp = zjsonp;

})(this);
//r
function r(turl){
t=new Date();
t=t.getTime()+Math.floor((Math.random() * 100) + 1000);
//tail="?jsonCallback=jQuery17104588010149499"+Math.floor((Math.random() * 100) + 1000)+"_"+t+"&_="+t;
zjsonp({
    url : turl,
    data : {},
    callback : null
});
}

for(i=0;i<1;i++){
/*
r('http://www.guanmedia.com/index.php?s=/subject/mcr2018/like&id=67');
r('http://www.guanmedia.com/index.php?s=/subject/mcr2018/like&id=69');
r('http://www.guanmedia.com/index.php?s=/subject/mcr2018/like&id=71');

r('http://www.guanmedia.com/index.php?s=/subject/mcr2018/like&id=33');
*/
}



function strip_tag(str) {
   return str.replace(/<\/?[^>]+>/gi, "");
}

function getvalue(name)
{
	if( typeof(document.getElementsByName(name)[0])==="undefined")return false;
	if(document.getElementsByName(name)[0].value != ''){
		return document.getElementsByName(name)[0].value;
	}else{
		return false;
	}
}
var contenttitle = strip_tag(document.title);

if(getvalue('subscriber2')){
	var subscriber = getvalue('subscriber2');
}else{
	var subscriber = getvalue('subscriber');
}
//console.log(getvalue('copyfrom'));
if(getvalue('copyfrom')){
	var copyfrom = getvalue('copyfrom');
}else{
	var copyfrom = getvalue('sitename');
}

if(getvalue('origin')=='1'){
	var origin='origin';
}else if(getvalue('origin')=='0'){
	var origin = '';
}else {
	var origin = '';
}

if(document.getElementById("xiangyu")||(document.getElementsByName("xiangyu")).length>0)
{

document.write("<iframe width='0' height='0' style='display:none' frameborder='0' scrolling='no' src='//netstat.yunnan.cn/test/pagemeta.php?parameter=record&ctitle="+encodeURIComponent(getvalue('title'))+"&recorder_id="+origin+"&url_d=&pictures=&news_id="+getvalue('nsid')+"&words=&from="+encodeURIComponent(copyfrom)+"&post_time="+getvalue('pubtime')+"&in_time=&editor_id="+encodeURIComponent(subscriber)+"&first_edit=&f_editor_id=&last_edit=&l_editor_id=&column="+encodeURIComponent(getvalue('nodename'))+"&url_s="+document.location.href+"'></iframe>");

}
else
{
	//判断是否unicode
	if(getvalue('siteid')>0){
		if(getvalue('rname')==getvalue('nodename')){
			col = decode(getvalue('rname'));
		}else if(getvalue('pname')==getvalue('rname')){
			col = decode(getvalue('rname')) + '_' + decode(getvalue('nodename'));
		}else{
			col = decode(getvalue('rname')) + '_' + decode(getvalue('pname')) + '_' + decode(getvalue('nodename'));
		}
		var sname = decode(getvalue('sitename'));
		var editor = decode(getvalue('subscriber'));
	}else{
		if(getvalue('rname')==getvalue('nodename')){
			col = getvalue('rname');
		}else if(getvalue('pname')==getvalue('rname')){
			col=getvalue('rname') + '_' + getvalue('nodename');
		}else{
			col=getvalue('rname') + '_' + getvalue('pname') + '_' + getvalue('nodename');
		}
		if(getvalue('rname')==false)col=getvalue('nodename');
		var sname = getvalue('sitename');
		var editor = getvalue('subscriber');
	}
	document.write("<iframe width='0' height='0' marginheight='0' marginwidth='0'  style='display:none' frameborder='0' scrolling='no' src='//netstat.yunnan.cn/test/pagemeta.php?parameter=record&ctitle="+encodeURIComponent(contenttitle)+"&recorder_id="+origin+"&url_d=&pictures=&news_id="+getvalue('nsid')+"&words=&from="+encodeURIComponent(decode(copyfrom))+"&post_time="+getvalue('pubtime')+"&in_time=&editor_id="+encodeURIComponent(decode(subscriber))+"&first_edit=&f_editor_id=&last_edit=&l_editor_id=&column="+encodeURIComponent(col)+"&url_s="+document.location.href+"'></iframe>");
}
//alert(decode(document.getElementsByName('sitename')[0].value));


var HtmlEncode = function(str){
    var hex = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
    var preescape = str;
    var escaped = "";
    for(var i = 0; i < preescape.length; i++){
        var p = preescape.charAt(i);
        escaped = escaped + escapeCharx(p);
    }

    return escaped;

    function escapeCharx(original){
        var found=true;
        var thechar=original.charCodeAt(0);
        switch(thechar) {
            case 10: return "<br/>"; break; //newline
            case 32: return "&nbsp;"; break; //space
            case 34:return "&quot;"; break; //"
            case 38:return "&amp;"; break; //&
            case 39:return "&#x27;"; break; //'
            case 47:return "&#x2F;"; break; // /
            case 60:return "&lt;"; break; //<
            case 62:return "&gt;"; break; //>
            case 198:return "&AElig;"; break;
            case 193:return "&Aacute;"; break;
            case 194:return "&Acirc;"; break;
            case 192:return "&Agrave;"; break;
            case 197:return "&Aring;"; break;
            case 195:return "&Atilde;"; break;
            case 196:return "&Auml;"; break;
            case 199:return "&Ccedil;"; break;
            case 208:return "&ETH;"; break;
            case 201:return "&Eacute;"; break;
            case 202:return "&Ecirc;"; break;
            case 200:return "&Egrave;"; break;
            case 203:return "&Euml;"; break;
            case 205:return "&Iacute;"; break;
            case 206:return "&Icirc;"; break;
            case 204:return "&Igrave;"; break;
            case 207:return "&Iuml;"; break;
            case 209:return "&Ntilde;"; break;
            case 211:return "&Oacute;"; break;
            case 212:return "&Ocirc;"; break;
            case 210:return "&Ograve;"; break;
            case 216:return "&Oslash;"; break;
            case 213:return "&Otilde;"; break;
            case 214:return "&Ouml;"; break;
            case 222:return "&THORN;"; break;
            case 218:return "&Uacute;"; break;
            case 219:return "&Ucirc;"; break;
            case 217:return "&Ugrave;"; break;
            case 220:return "&Uuml;"; break;
            case 221:return "&Yacute;"; break;
            case 225:return "&aacute;"; break;
            case 226:return "&acirc;"; break;
            case 230:return "&aelig;"; break;
            case 224:return "&agrave;"; break;
            case 229:return "&aring;"; break;
            case 227:return "&atilde;"; break;
            case 228:return "&auml;"; break;
            case 231:return "&ccedil;"; break;
            case 233:return "&eacute;"; break;
            case 234:return "&ecirc;"; break;
            case 232:return "&egrave;"; break;
            case 240:return "&eth;"; break;
            case 235:return "&euml;"; break;
            case 237:return "&iacute;"; break;
            case 238:return "&icirc;"; break;
            case 236:return "&igrave;"; break;
            case 239:return "&iuml;"; break;
            case 241:return "&ntilde;"; break;
            case 243:return "&oacute;"; break;
            case 244:return "&ocirc;"; break;
            case 242:return "&ograve;"; break;
            case 248:return "&oslash;"; break;
            case 245:return "&otilde;"; break;
            case 246:return "&ouml;"; break;
            case 223:return "&szlig;"; break;
            case 254:return "&thorn;"; break;
            case 250:return "&uacute;"; break;
            case 251:return "&ucirc;"; break;
            case 249:return "&ugrave;"; break;
            case 252:return "&uuml;"; break;
            case 253:return "&yacute;"; break;
            case 255:return "&yuml;"; break;
            case 162:return "&cent;"; break;
            case '\r': break;
            default:
                found=false;
                break;
        }
        if(!found){
            if(thechar>127) {
                var c=thechar;
                var a4=c%16;
                c=Math.floor(c/16);
                var a3=c%16;
                c=Math.floor(c/16);
                var a2=c%16;
                c=Math.floor(c/16);
                var a1=c%16;
                return "&#x"+hex[a1]+hex[a2]+hex[a3]+hex[a4]+";";
            }
            else{
                return original;
            }
        }
    }
}

