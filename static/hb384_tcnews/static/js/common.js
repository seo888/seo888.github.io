$(".sel").click(function() {
    if($(".wxb_dh").css("display") == "block") {
        $(".wxb_dh").css("display", "none");
    } else {
        $(".wxb_dh").css("display", "block");
    }
})
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
if (isWeixin) {
  	$(function(){
		var url = window.location.href;
	    $.ajax({ 
	    	type : "get",  
	    	async:false,  
	    	url : "http://api.common.tcnews.cc/wechat/share", 
	    	data:{
	        url: url,
	    	},
		    dataType : "jsonp",//数据类型为jsonp  
		    jsonp: "callback",//服务端用于接收callback调用的function名的参数  
		    success : function(res){ //console.log(res) 
		        wx.config(res);
		        wx.ready(function () {
		        var title = $('title').text();
		        //var desc = $("meta[name='Description']").attr('content');
		        var desc = "桐城新闻网是由桐城市融媒体中心主办，依托市内主流新闻媒体，专业采编队伍所建立的新媒体，是桐城市对外发布新闻的权威平台。";
		        wx.updateTimelineShareData({
		            title: title, // 分享标题
		            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		            imgUrl: shareimg, // 分享图标
		            success: function () {
		                
		            },
		            cancel: function () {
		                // 用户取消分享后执行的回调函数
		            }
		        });
		        wx.updateAppMessageShareData({
		            title: title, // 分享标题
		            desc: desc, // 分享描述
		            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		            imgUrl: shareimg, // 分享图标
		            type: '', // 分享类型,music、video或link，不填默认为link
		            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		            success: function () {
		                
		            },
		            cancel: function () {
		                // 用户取消分享后执行的回调函数
		            }
		        });
		        },'json');
		    },  
		    error:function(){  
		        alert('fail');  
		    }  
		}); 
    })
}