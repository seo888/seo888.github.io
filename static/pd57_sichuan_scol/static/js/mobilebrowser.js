function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

	} else {
		var pcURL = document.URL.replace("/m/","/");
		location = pcURL;
	}
}

browserRedirect();


window.onload=function() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsWKB = sUserAgent.match(/wkbrowser/i) == "wkbrowser";
	if (bIsWKB) {
		document.getElementById("header").style.display="none";
    }
};

var miniAgent = navigator.userAgent.toLowerCase().indexOf('miniprogram'), thisUrl = window.location.href.indexOf('miniprogram');

if (thisUrl != -1 || miniAgent != -1) {
    $('head').append('<style>#header{display:none;}</style>');
}

$(function () {
    if (thisUrl != -1 || miniAgent != -1) {
        $('body').prepend('<div id="logo_miniprogram"><img src="//www.scol.com.cn/scol-3/images/logo_miniprogram.jpg" width="100%" alt =""></div>');
    }

});

