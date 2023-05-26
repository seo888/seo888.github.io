var url = window.location.href;
 var the_title=document.title;
 var meta =document.getElementsByTagName('meta');
 var the_desc = "";
	for(i in meta){
	 if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
	  the_desc = meta[i].content;
	 }
	} //console.log(the_title);
 var url = encodeURIComponent(url)
  $.ajax({
    type : "get",
    url : "http://min.hkwb.net/s/jssdk.php?url="+url,
    dataType : "jsonp",
    jsonp: "callback",
    jsonpCallback:"success_jsonpCallback",
    success : function(data){ 
        wx.config({
	   // debug:true,
		appId: data.appId,
		timestamp: data.timestamp,
		nonceStr: data.nonceStr,
		signature: data.signature,
		jsApiList: [
		"onMenuShareTimeline",
		"onMenuShareAppMessage",
		'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        
		]
		});
    },
   error:function(data){ alert("连接失败！");}
});

window.share_config = {
     "share": {
        "imgUrl": "http://www.hkwb.net/news/extra/18510.files/hkwlogo.jpg",//分享图，默认当相对路径处理，所以使用绝对路径的的话，"http://"协议前缀必须在。
        "title": the_title,
        "desc": the_desc, // 分享摘要
        "link": window.location.href,//分享出去后的链接，这里可以将链接设置为另一个页面。
        "link": window.location.href,//分享出去后的链接，这里可以将链接设置为另一个页面。
        "success":function(){ },//分享成功后的回调函数
        'cancel': function () { } // 用户取消分享后执行的回调函数
    }
};  
 
  wx.ready(function (){
	 wx.onMenuShareAppMessage(share_config.share);//分享给好友
	 wx.onMenuShareTimeline(share_config.share);//分享到朋友圈
	 wx.onMenuShareQQ(share_config.share);//分享给手机QQ
	 wx.onMenuShareWeibo(share_config.share);//分享到腾讯微博
    });


