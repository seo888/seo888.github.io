;(function(win) {


var presentUrl = win.location.href,
    host = win.location.host,
    presentUrlType = 0,
	deviceType = "",
	isHome = false,
	isArticle = false;




    function redirect() {
    	
        // 如果当前URL中有cancel=true，设置sessionStorage，以确保之后打开页面不再判断终端进行重定向
        if( presentUrl.indexOf('cancel=true') > -1 && !!sessionStorage ){
            sessionStorage['cancel'] = 'true';
        }

        if( (!!sessionStorage && !!sessionStorage['cancel'] && sessionStorage['cancel'] == 'true') || !presentUrl || GetQueryString("cancel") === "true" ){
            return;
        }

    	if( presentUrl.indexOf("/m") > -1 ){
    		presentUrlType = 2; // 链接地址为移动端地址
    	}else{
    		presentUrlType = 1; // 链接地址为pc端地址
    	}

        deviceType = getDeviceType();
		

        if( deviceType === "mobile" && presentUrlType === 1 ){
        	location.href = getNewUrl(presentUrlType);
        }else if( deviceType === "pc" && presentUrlType === 2 ){
        	location.href = getNewUrl(presentUrlType);
        }else{
        	return;
        }

    }
    redirect();
    // 判断是不是首页
    function isHomePage(url) {
        var reg = new RegExp("(" + host + "/index\.html$)|(" + host + "/?$)", "ig");
        return reg.test(url);
    }
    // 判断是不是内容页
    function isDetailPage(url) {
        var reg = /\d{6}\/\d{2}\//ig;
        return reg.test(url);
    }
    // 判断终端
    function getDeviceType() {
        if( navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ){
        	return "mobile";
        }else{
        	return "pc";
        }
    }
    // 当前链接是pc端链接时，presentUrlType=1;
    // 当前链接是触屏版链接时，presentUrlType=2;
    function getNewUrl(f){
    	if( f === 1 ){
            var partsOfUrl = presentUrl.split(host);
    		return partsOfUrl[0]+host+'/m'+partsOfUrl[1];
    	}else if( f === 2 ){
    		return presentUrl.replace('/m','');
    	}
    }
    // 获取查询字符串
    function GetQueryString(name){
    	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    	if( presentUrl.split("?")[1] ){
    		var r = presentUrl.split("?")[1].match(reg);
    		if(r!=null)return  unescape(r[2]); return null;
    	}
    	
	}
	

    


})(window);