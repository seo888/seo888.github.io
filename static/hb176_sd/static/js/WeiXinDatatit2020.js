var shareWXData = function() {
	peopleWXConfig.debug = false;
	peopleWXConfig.jsApiList = [
		'checkJsApi',
		'onMenuShareTimeline',
		'onMenuShareAppMessage',
		'onMenuShareQQ',
		'onMenuShareWeibo'
	];

	wx.config(peopleWXConfig);

	wx.ready(function() {
		wx.onMenuShareTimeline({
			title: wxData.title, // 分享标题
			link: wxData.link, // 分享链接
			imgUrl: wxData.imgUrl, // 分享图标
			success: function() {

			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareAppMessage({
			title: wxData.title, // 分享标题
			link: wxData.link, // 分享链接
			imgUrl: wxData.imgUrl, // 分享图标
			desc: wxData.desc, // 分享描述
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				// 用户确认分享后执行的回调函数
				// alert(wxData.link + "|" + wxData.imgUrl);
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数

			}
		});

		wx.onMenuShareQQ({
			title: wxData.title, // 分享标题
			link: wxData.link, // 分享链接
			imgUrl: wxData.imgUrl, // 分享图标
			desc: wxData.desc, // 分享描述
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});

		wx.onMenuShareWeibo({
			title: wxData.title, // 分享标题
			link: wxData.link, // 分享链接
			imgUrl: wxData.imgUrl, // 分享图标
			desc: wxData.desc, // 分享描述
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		});



	});



	wx.error(function(res) {
		//alert('验证出错:' + JSON.stringify(res))
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

	});
}

$(function() {
	//var src = "http://58.68.146.12/weixin/JS.js?url=" + encodeURIComponent(this.location);
	var src = "http://wx-api.people.com.cn/weixin/JS.js?url=" + encodeURIComponent(this.location);
	var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		importJs(src);//在微信中打开
	}
	function importJs(src) {
		
		var script = document.createElement('script');
		script.src = src;
		script.onload = script.onreadystatechange = function() {

			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				script.onload = script.onreadystatechange = null;				
				setTimeout(function() {
					shareWXData();
				}, 200)
			}
		};
		document.body.appendChild(script);
	};

})