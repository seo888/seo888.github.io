var title;
var outerPic;
var desc;

/**
 *初始化新闻的标题
 */
function initNewsData(newsTitle, newsOuterPic, newsDesc){
	title = newsTitle;
	outerPic = newsOuterPic;
	desc = newsDesc;
    var d = document.createElement('script');
    d.setAttribute('type','text/javascript');
    d.setAttribute('src','//vote.china.com/user/BoAoWeixinAction.do?processID=getSign&jsonp=setjssdk&link='+location.href.split('?')[0]);
    document.getElementsByTagName('head')[0].appendChild(d);
}
function setjssdk(jsonData){
	var appId = jsonData.appId;
	var timestamp = jsonData.timestamp;
	var nonceStr = jsonData.nonceStr;
	var signature = jsonData.signature;
	
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature,// 必填，签名，见附录1
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone'
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	var titleStr= title;
	var indexUrl ='';
	// 新闻外显图
	//var imageUrl = outerPic!='' ? outerPic : 'https://3g.china.com/img/touch-icon.png';
    var imageUrl = 'https://3g.china.com/img/touch-icon.png';// 默认外显图
	var descStr= desc;
	wx.ready(function(){
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		//分享到朋友圈
		wx.onMenuShareTimeline({
			title: titleStr, // 分享标题
			link: indexUrl, // 分享链接
			imgUrl: imageUrl, // 分享图标
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		//分享给朋友
		wx.onMenuShareAppMessage({
			title: titleStr, // 分享标题
			desc: descStr, // 分享描述
			link: indexUrl, // 分享链接
			imgUrl: imageUrl, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		//分享给QQ
		wx.onMenuShareQQ({
			title: titleStr, // 分享标题
			desc: descStr, // 分享描述
			link: indexUrl, // 分享链接
			imgUrl: imageUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
			},
			cancel: function () { 
			   // 用户取消分享后执行的回调函数
			}
		});
		//分享到腾讯微博

		wx.onMenuShareWeibo({
			title: titleStr, // 分享标题
			desc: descStr, // 分享描述
			link: indexUrl, // 分享链接
			imgUrl: imageUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		//分享到QQ空间
		wx.onMenuShareQZone({
			title: titleStr, // 分享标题
			desc: descStr, // 分享描述
			link: indexUrl, // 分享链接
			imgUrl: imageUrl, // 分享图标
			success: function () { 
			   // 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
	});
};