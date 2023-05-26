var sUserAgent = navigator.userAgent.toLowerCase();
var isWhat = {
    bIsIpad: sUserAgent.match(/ipad/i) == "ipad",//是否iPad
    bIsIphoneOs: sUserAgent.match(/iphone os/i) == "iphone os",//是否为iPhone
    bIsMidp: sUserAgent.match(/midp/i) == "midp",
    bIsUc7: sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
    bIsUc: sUserAgent.match(/ucweb/i) == "ucweb",
    bIsCE: sUserAgent.match(/windows ce/i) == "windows ce",
    bIsWM: sUserAgent.match(/windows mobile/i) == "windows mobile",
    bIsAndroid: sUserAgent.indexOf('android') > -1 || sUserAgent.indexOf('linux') > -1, //android终端或者uc浏览器
    bIsTrident: sUserAgent.indexOf('trident') > -1, //IE内核
    bIsPresto: sUserAgent.indexOf('presto') > -1, //opera内核
    bIsWebKit: sUserAgent.indexOf('applewebkit') > -1, //苹果、谷歌内核
    bIsGecko: sUserAgent.indexOf('gecko') > -1 && sUserAgent.indexOf('khtml') == -1, //火狐内核
    bIsMobile: !!sUserAgent.match(/applewebkit.*mobile.*/)||!!sUserAgent.match(/appleWebkit/), //是否为移动终端
    bIsIos: !!sUserAgent.match(/\(i[^;]+;( u;)? cpsuseragent.+mac os x/), //ios终端
    // bIsIPhone: sUserAgent.indexOf('iphone') > -1 || sUserAgent.indexOf('mac') > -1, //是否为iPhone或者QQHD浏览器
    bIsWebApp: sUserAgent.indexOf('safari') == -1 //是否web应该程序，没有头部与底部
};
if ((isWhat.bIsIpad || isWhat.bIsIphoneOs || isWhat.bIsMidp || isWhat.bIsUc7 || isWhat.bIsUc || isWhat.bIsAndroid || isWhat.bIsCE || isWhat.bIsWM)){//Mobile
  if((/[/]\d{8}[/]/.test(window.location.href))){
  	var webUrl = window.location.href;
  	var webUrlNew = webUrl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1');
  	webUrlNew = "/" + webUrlNew
  	var date = webUrlNew.match(/[/]\d{8}[/]/);
  	var year = date[0].substr(1,4);
  	var month = date[0].substr(5,2);
  	var day = date[0].substr(7,2);
  	var newDate = '/'+year+"-"+month+"-"+day+'/';
    var newUrl = webUrlNew.replace(date,newDate);
    window.location.href = window.location.protocol +"//"+ window.location.host + newUrl;
  }
}