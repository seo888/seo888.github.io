//判断是否PC平台：1是  0否
function IsPC() {  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = 1;  
    for ( var i = 0; i < Agents.length; i++ ) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) { 
            flag = 0;
            break; 
        }
    }  
    return flag;
}

//如果不是PC平台则跳转到手机版
if ( IsPC() == 0 ) {
    window.location.href="http://3g.gxnews.com.cn/formwww.html?ref="+encodeURIComponent(window.document.location.href);
}