var urls = location.href.split('#')[0];
urls = encodeURIComponent(urls);
$.ajax({
	type:"post",
	url:"/service/web_jssdk.php",
	data:{url:urls},
	dataType: "json",
	success:function(data){
			//alert(JSON.stringify(data));
			//console.log(JSON.stringify(data));
			//console.log('连接成功。');
			wx.config({
					debug:false,
					appId: data.appId,
					timestamp: data.timestamp,
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList: [
						"onMenuShareTimeline", //分享给好友
						"onMenuShareAppMessage", //分享到朋友圈
						"onMenuShareQQ", //分享到QQ
						"onMenuShareWeibo" //分享到微博
					]
				});
	},
	error:function(data){
		//console.log('Error:连接失败！');
	}
});