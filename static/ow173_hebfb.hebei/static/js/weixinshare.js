var isWechart = function () {
    var rst = true
    if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
        var ua = navigator.userAgent.toLowerCase();
        if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
            rst = false;
        }
    }else {
        rst = false;
    }
    return rst;
}
function weixinshare(image6,title6,abstract6,url){
    if(!isWechart()){
       return;
    }
	var _url = encodeURIComponent(location.href.split('#')[0]);
    if(url==""){
        url=window.location.href;
    }

    if(image6==""){
        imgUrl="h"+"ttp://pic1.hebei.com.cn/003/018/385/00301838591_0fe4b935.jpg";
    }else{
        if(!(image6.search("h"+"ttp") != -1)) {
            image6="h"+"ttp:"+image6;
        }
        imgUrl=image6;
    }
    $.ajax({
        type : "get",
        url : "h"+"ttp://cxphp.hebei.com.cn/weixin/index.php/Home/Index/getElement?url="+_url,
        dataType : "jsonp",
        jsonp: "jsoncallback",
        success : function(data){
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage"
                ]
            });
            wx.ready(function () {
                // 在这里调用 API
                wx.onMenuShareTimeline({
                    title: title6, // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:imgUrl 	, // 分享图标
                    success: function () {

                        // 用户确认分享后执行的回调函数
                    },cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title:title6, // 分享标题
                    desc:abstract6, // 分享描述
                    link:url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
// 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
// 用户取消分享后执行的回调函数
                    }
                });
            });
        },
        error:function(data){
            //alert("连接失败！");
        }
    });
}<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2020-06-30 10:26:36" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->