function WeChatJsApiConfig(titleParam, descParam, imgUrlParam) {
	var appId = "";
	var noncestr = "";
	var signature = "";
	var timestamp = "";

	var url = location.href.split('#')[0];
	imgUrlParam = (imgUrlParam == null || imgUrlParam == undefined || imgUrlParam == "") ?
		"http://www.sxrb.com/GB/logo.jpg" : imgUrlParam;

	$.ajax({
		url: 'http://wx.sxrb.com/JsApi/getWxConfigParam?url=' + url,
		type: "post",
		dataType: "jsonp",
		jsonp: "callback",
		async: false,
		success: function(data) {

			appId = data.appId;
			noncestr = data.noncestr;
			signature = data.signature;
			timestamp = data.timestamp;

			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: appId, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: noncestr, // 必填，生成签名的随机串
				signature: signature, // 必填，签名
				jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
				// 必填，需要使用的JS接口列表
			});

			wx.ready(function() {
				wx.updateAppMessageShareData({
					title: titleParam, // 分享标题
					desc: descParam, // 分享描述
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrlParam, // 分享图标
					success: function() {
						console.log("success");
					}
				});
			});

			wx.ready(function() { // 需在用户可能点击分享按钮前就先调用
				wx.updateTimelineShareData({
					title: titleParam, // 分享标题
					link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imgUrlParam, // 分享图标
					success: function() {
						// 设置成功
					}
				});
			});

		},
	});

}
