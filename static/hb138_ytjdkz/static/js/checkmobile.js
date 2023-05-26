// JavaScript Document
//检查是否为移动客户端访问。pad除外。返回1为是。返回0为否
function cmobile(){
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
		if(window.location.href.indexOf("?mobile")<0){
			try{
				if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
					return 1;
				}else if(/iPad/i.test(navigator.userAgent)){
					return 0;
				}else{
					return 1;
				}
			}catch(e){}
		}
	}	
}
if(cmobile()) {    
    var webUrl = document.location.href;
    var n = webUrl.split('.');
    if (n.length == 2 ) {
        //str = 'm.' + webUrl; 
        str = webUrl.replace("://","://m.");
    } else {
        str = webUrl.replace("www","m"); 
    }
    window.location.href = str;	
}