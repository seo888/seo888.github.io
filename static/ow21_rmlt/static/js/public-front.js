function wx_share(param) {
    $.ajax({
        type:"get",
        url:"http://api.media.rmlt.com.cn/wxShare.php?type=ajax&url=" + encodeURIComponent(param['shareUrl']),
        dataType:"jsonp",
        jsonp:'callback',
        success:function(data){
            wx.config({
                debug:false,
                appId:data.appId,
                timestamp:data.timestamp,
                nonceStr:data.nonceStr,
                signature:data.signature,
                jsApiList:["updateAppMessageShareData","updateTimelineShareData","checkJsApi","onMenuShareQQ","onMenuShareWeibo"]
            });
            wx.ready(function(){
				var _desc = '人民日报社主管中央主要新闻网站中央重点理论网站';
                var shareData = {
                    title:param['shareTitle'],
                    desc:_desc.substring(0,7)+'\n'+_desc.substring(7,15)+'\n'+_desc.substring(15,),
                    link:param['shareUrl'],
                    imgUrl:param['shareImg']
                };
				wx.updateAppMessageShareData(shareData);//分享到朋友圈-新接口
				wx.updateTimelineShareData(shareData);//分享给朋友-新接口
                wx.onMenuShareWeibo(shareData);
                /*wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);*/
            });
        }
    });
}
function is_weixin(param) {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        var ele= document.createElement("script");
        ele.setAttribute("type", "text/javascript");
        //ele.setAttribute("src", "http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
        ele.setAttribute("src", "http://res.wx.qq.com/open/js/jweixin-1.6.0.js");
        document.body.appendChild(ele);
        wx_share(param);
    } else {
         return false;
    }
}

$(function(){
	var param = [];
	param['shareTitle'] = $("h1.article-title").text() || $("title").text();
	param['shareDesc'] = $("meta[name='description']").attr("content");
	param['shareUrl'] = window.location.href;
	param['shareImg'] = "http://img.rmlt.com.cn/templates/rmlt2013/img/wx_share.jpg?1589803459";
	is_weixin(param);
});
$(function(){
/*视频缩放兼容代码2020.7.1*/
	var browser = {
	versions: function() {
		var u = navigator.userAgent,
		app = navigator.appVersion;
		return {
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
			iPhone: u.indexOf("iPhone") > -1,
			iPad: u.indexOf("iPad") > -1
		};
	} (),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	if(browser.versions.mobile && ($(".article-main").length > 0)) {
		video_width = $(".article-main .inner").width() || $(window).width();
		video_width = (parseInt(video_width)-54) + "px";
		$("video").css({"width":"max-width:100%","width":"100%","height":"auto","margin":"0 auto"});
		$(".addon-video").css({"width":video_width,"text-align":"center"});
	}
});
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?321c97f9d02ec221cbdca88b0717bc77";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
