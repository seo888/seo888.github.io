var da;

jQuery(function() {
	 var url=location.href.split('#')[0];
    jQuery.ajax({
      type: "GET",
      url: "http://fx.newssc.org:8080/api/share",
      dataType: "json",
      data:{
    	  url:url
      },
      async:false,
      success: function(data){

         da=data;


         wx.config({
             debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
             appId : da.appId, // 必填，公众号的唯一标识
             timestamp : da.timestamp, // 必填，生成签名的时间戳
             nonceStr : da.nonceStr, // 必填，生成签名的随机串
             signature : da.signature,// 必填，签名，见附录1
             jsApiList : ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'getLocalImgData']
         // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });      
          

     
     
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
   console.log(newsTitle);
console.log(url);
    	//分享到朋友
    	wx.updateAppMessageShareData({ 
    	    title: newsTitle, // 分享标题
    	    desc: newsAbs, // 分享描述
    	    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    	    imgUrl: img, // 分享图标
    	    success: function () {
    	      // 设置成功

    	    }
    	});
            
     
        
            //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    	wx.updateTimelineShareData({ 
            title: newsTitle, // 分享标题
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: img, // 分享图标
            success: function () {
              // 设置成功
            }
           });



     });

     }
    });

  
});