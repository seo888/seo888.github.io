function openApp(contentId,contentType) {
	var isAndroid = !!navigator.userAgent.match(/android/ig),
		isIos = !!navigator.userAgent.match(/iphone|ipod/ig),
		isIpad = !!navigator.userAgent.match(/ipad/ig),
		isIos9 = !!navigator.userAgent.match(/OS 9/ig),
		isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
		isQQ = (/qq/ig).test(navigator.userAgent);
	if (isIos || isIpad) {
		if (isWeixin) {
			function isIphoneX(){
				return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
			}
			html ='<div class="cover" style="position:absolute;z-index:99999;width: 100%;height: 100%;top: 0;background: rgba(0, 0, 0, 0.8);">'+
				'<img style="z-index: 100;position: fixed;max-width: 100%;height: auto;top: 0;" src="http://moment.rednet.cn/common/img/cover-ios-2.png">'+
				'</div>';
			$(html).appendTo($('body'))
			$(".cover").on('click',function(){
				$(".cover").hide();
			})
		} else {
			var url = "https://client.rednet.cn/app/index.html";
			if(contentId){
				url = "https://client.rednet.cn/app/index.html?contentId="+contentId+"&contentType="+contentType;
			}
			
			$(event.currentTarget).attr('href',url);
		}
		/*setTimeout(function() {
			window.open("https://itunes.apple.com/us/app/shi-ke-xin-wen/id945559511?ls=1&mt=8", "_blank");
		}, 1000);*/
	} else if (isAndroid) {
		if (isWeixin || isQQ) {
			window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.rednet.moment", "_blank");
		} else {
			//window.open("http://moment.rednet.cn/newsapp/mobile/", "_blank");
			window.open("https://moment.rednet.cn/appClient/moment_download.html", "_blank");
		}
		setTimeout(function() {
			window.open("rednet://moment.app/android", "_blank");
		}, 1000);
	} else {
		//window.location.href = "http://moment.rednet.cn/newsapp/mobile/";
		window.location.href = "https://moment.rednet.cn/appClient/moment_download.html";
	}
}