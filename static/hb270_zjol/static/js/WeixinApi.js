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
		var overUrl = url+cs;
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
				wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
				  wx.updateAppMessageShareData({ 
					title: shareTitle, // 分享标题
					desc: descContent, // 分享描述
					link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl
				  });
				  wx.updateTimelineShareData({
					title: shareTitle, // 分享标题
					link: lineLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrl
				  })
				}); 
			}
		});
    }, 500);
})