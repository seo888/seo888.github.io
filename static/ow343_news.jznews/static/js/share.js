var desc = "荆州新闻网";
   var title = document.title;
   var imgUrl ='http://news.jznews.com.cn/images/logo.jpg'
   var link = window.location.href;
   var descStr = $("meta[name='description']").attr("content"); //描述
   $.post("http://wxapp.jznews.com.cn/app.php/index/index/jznews",{rl:link},
     function(data,status){
        
         var obj = eval('(' + data + ')');
         wx.config({
         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
         appId: obj.appId, // 必填，公众号的唯一标识
         timestamp: obj.timestamp , // 必填，生成签名的时间戳
         nonceStr: obj.nonceStr, // 必填，生成签名的随机串
         signature: obj.signature,// 必填，签名
         jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
		});
		
		 
		 
		 wx.ready(function(){
             wx.updateAppMessageShareData({
                        title: title, // 分享标题
                        desc: descStr, // 分享描述
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功

                        }
                    });

                    wx.updateTimelineShareData({
                        title: title, // 分享标题
                        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                           
                        }
                    });
                });
        
         
     });
	
	
	<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2023-03-14 17:19:16" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->