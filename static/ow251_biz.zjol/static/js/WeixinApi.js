var _getScript = function(url, callback) {
	 var head = document.getElementsByTagName('head')[0],
		 js = document.createElement('script');

	 js.setAttribute('type', 'text/javascript'); 
	 js.setAttribute('src', url); 

	 head.appendChild(js);

	 var callbackFn = function(){
			 if(typeof callback === 'function'){
				 callback();
			 }
		 };

	 if (document.all) {
		 js.onreadystatechange = function() {
			 if (js.readyState == 'loaded' || js.readyState == 'complete') {
				 callbackFn();
			 }
		}
	} else {
		 js.onload = function() {
			 callbackFn();
		 }
	}
}
_getScript("https://res.wx.qq.com/open/js/jweixin-1.6.0.js");

jQuery(function($) {
    setTimeout(function () {
        var imgUrl = '';
        var text = $("img.OutLInePics").attr("src");
        if (text) {
            var index = text.indexOf('http');
            if (index == 0) {
                imgUrl = text;
            } else {
                imgUrl = 'https:' + text;
            }
        }

        var lineLink = window.location.href;
        var descContent = $('.abstract').text();
        var shareTitle = document.title;
        var shareUrl = $("#shareUrl").val();
        var appid = '';
      
        if (shareUrl != null && shareUrl !=''){
            lineLink = shareUrl;
        }
		var pattern_phone = new RegExp("iphone","i");
		var isIphone = pattern_phone.test(navigator.userAgent.toLowerCase());
		var cs = '?refererUrl='+lineLink;
		var url = 'https://weixin.zjol.com.cn/weixin/wxapi/share_sign.do';
		var overUrl = isIphone?url:url+cs;
		$.ajax({
			url: overUrl,
			type: 'get',
			dataType: 'script',
			success: function success(res) {
				wx.config({
					 debug: false,
					 appId: sign_params.appId,
					 timestamp: sign_params.timestamp,
					 nonceStr: sign_params.nonceStr,
					 signature: sign_params.signature,
					 jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "chooseImage", "getLocalImgData"]
				});
				wx.ready(function () {
				  wx.updateAppMessageShareData({ 
					title: shareTitle,
					desc: descContent,
					link: lineLink,
					imgUrl: imgUrl
				  });
				  wx.updateTimelineShareData({
					title: shareTitle,
					link: lineLink,
					imgUrl: imgUrl
				  })
				}); 
			}
		});
    }, 500);
})