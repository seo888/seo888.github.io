$=TY;

 function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
} 
 //微信分享
function wxShare(){
	jQuery.getScript("//content.tianya.cn/inerfaceOut/weixinShare.jsp?var=signMap&url="+location.href,function(){
		if(wxDescContent ==""){
		   wxDescContent = jQuery(".tui-content .content").html().replace(/<[^>]+>|&nbsp;/g,"").trim().substring(0,50);
		  }
		wx.config({
		//debug: true,
		appId: signMap.appid, // 必填，公众号的唯一标识
		timestamp: signMap.timestamp, // 必填，生成签名的时间戳
		nonceStr:  signMap.nonceStr, // 必填，生成签名的随机串
		signature: signMap.signature,// 必填，签名，见附录1
		//jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		
	wx.ready(function(){
	   //分享朋友
		wx.updateAppMessageShareData({ 
			title: wxShareTitle, // 分享标题
			desc: wxDescContent.replace("\"","'"), // 分享描述
			link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: wxImgUrl, // 分享图标
			success: function () {
			  // 设置成功
			}
		  });
		
	   //分享朋友圈
	   wx.updateTimelineShareData({ 
			title: wxShareTitle, // 分享标题
			link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: wxImgUrl, // 分享图标
			success: function () {
			  // 设置成功
			}
		  })
	   
	});

	})
  
}
$(function(){

	if (isWeiXin()){
	
		wxShare();
	}
	})
