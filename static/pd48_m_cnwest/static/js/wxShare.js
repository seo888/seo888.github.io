var url_gos = escape(wxUrl);

function initWechatShare(data,callback)
{
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: data.appId, // 必填，公众号的唯一标识2
		timestamp:data.timestamp , // 必填，生成签名的时间戳
		nonceStr: data.nonceStr, // 必填，生成签名的随机串
		signature: data.signature,// 必填，签名，见附录1
		jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function(){	 
		wx.onMenuShareTimeline({
			title: wxTitleTimeline, // 分享标题
			link: wxUrl, // 分享链接
			imgUrl: wxImg,
			success: function () {/*alert('分享成功');// 用户确认分享后执行的回调函数*/},
			cancel: function () {/*alert('取消了分享'); // 用户取消分享后执行的回调函数*/}
		});
		wx.onMenuShareAppMessage({
			title: wxTitle, // 分享标题
			desc: wxDes, // 分享描述
			link: wxUrl, // 分享链接
			imgUrl: wxImg, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { /*alert('分享成功'); // 用户确认分享后执行的回调函数*/},
			cancel: function () { /*alert('分享失败');// 用户取消分享后执行的回调函数*/}
		});
		if(typeof callback == "function") callback();
	});
}

/*获取微信分享sdk*/
var wxInteUrl ='http://live.cnwest.com/index.php?m=wechatWebSdk&gu='+url_gos;
$.ajax({  
	url:wxInteUrl,      
	type:"get",  
	dataType:"jsonp",  
	jsonp:"callback",
	success:function(data){  
		initWechatShare(data,function(){
		});
	},  
	error:function(){  
		//alert("发生异常");  
	}  
});