
/**
 * 同步分页
 * cont:分页所在容器id
 * sum:总页数
 * color:分页颜色（默认：#AF0000）
 * group:连续显示分页数（默认：10）
 * 
 */
function initLinkPage(page){
//	var skip=page.skip!=undefined?page.skip:true;
	var first=page.first!=undefined?page.first:'首页';
	var last=page.last!=undefined?page.last:'尾页';
	laypage({
	    cont: $("#"+page.cont), //容器。值支持id名、原生dom对象，jquery对象,
	    pages: page.sum, //总页数
//	    skip: skip, //是否开启跳页
	    skin: '#207be6',//颜色
	    groups: page.group || 10, //连续显示分页数
	    first:first,
	    last:last,
	    curr: function(){ //通过url获取当前页，也可以同上（pages）方式获取
	        var page = location.search.match(/page=(\d+)/);
	        return page ? page[1] : 1;
	    }(), 
	    jump: function(e, first){ //触发分页后的回调
	        if(!first){ //一定要加此判断，否则初始时会无限刷新
	            location.href = '?page='+e.curr;
	        }
	        if(page.view){
	            var pageurl = location.search.match(/page/);
	        	if(pageurl != null){
	        		//定位
	            	var y=$("#"+page.view).offset().top;
	            	window.scrollTo(0,y);
	        	}
	        }
	    }
	});
}
/**
 * ajax分页
 * url:请求地址
 * cont:分页所在容器id
 * view:内容所在容器id
 * color:分页颜色（默认：#AF0000）
 * group:连续显示分页数（默认：3）
 */
function initAjaxPage(page){
	$.getJSON(page.url, {
        page: page.curr || 1 //向服务端传的参数，此处只是演示
    }, function(res){
    	$("#"+page.view).html($("#"+page.tmp).tmpl(res.data));
    	if(page.curr!=undefined){
    		//定位
        	var y=$("#"+page.view).offset().top;
        	window.scrollTo(0,y);
    	}
        laypage({
            cont: page.cont, 
            pages: res.sum, //通过后台拿到的总页数
            curr: page.curr || 1, //当前页
    	    skip: true, //是否开启跳页
    	    skin: '#64bfc3',//颜色
    	    groups: page.group || 3, //连续显示分页数
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                	page.curr=obj.curr;
                	initAjaxPage(page);
                }
            }
        });
    });
}
/**
 * 判断是否是手机
 */
function initIsMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
         return false;
    } else {
       return true;
    }
}
/**
 * 判断浏览器版本是否IE8
 */
function initIsIE8() {
	var DEFAULT_VERSION = 8.0;
	var ua = navigator.userAgent.toLowerCase();
	var isIE = ua.indexOf("msie")>-1;
	var safariVersion;
	if(isIE){
	    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
	}
	if(safariVersion < DEFAULT_VERSION ){
	    alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请及时更新浏览器版本！'); 
	}else if(safariVersion == DEFAULT_VERSION){
	    return true;
	}
	return false;
}
/**
 * 判断useH5Prism 阿里云视频H5播放 不是ie8 则h5播放
 */
function initUseH5Prism(){
	if(initIsIE8()){
		return false;
	}
	return true;
}
/**
 * 判断useFlashPrism 阿里云视频Flash播放 ie8下为flash播放
 */
function initUseFlashPrism(){
	if(initIsIE8()){
		return true;
	}
	return false;
}
/**
 * 适配浏览器宽 得出视频弹框大小和阿里云视频宽
 */
function initVodPlayVideoWH(){
	var width = document.documentElement.clientWidth || document.body.clientWidth; 
	var res = new Array();
	if ( width>1280 ) {
	  res['areawidth']  	= '1280px';
	  res['areahight']  	= '720px';
	  res['vplayerheight'] 	= '720px';
	}else if( width>960 ){
	  res['areawidth']  	= '960px';
	  res['areahight']  	= '540px';
	  res['vplayerheight'] 	= '540px';
	}else{
	  res['areawidth']  	= '640px';
	  res['areahight']  	= '360px';
	  res['vplayerheight'] 	= '360px';
	}
	return res;
}

function verify_email(email) {
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (!reg.test(email)) {
        return false;
    }

    return true;
}

function verify_phone(phone) {
    var reg = /^1[34578]\d{9}$/;
    if (!reg.test(phone)) {
        return false;
    }
    return true;
}

