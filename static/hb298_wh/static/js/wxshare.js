$(function () {
    var wxShareUrl = location.href.split('?')[0];
    var wxShareUrlOrig = location.href;
    var xyUrl = "https://appif.ahnews.com.cn/app_if/";
    var baseShareImg = "https://www.ahnews.com.cn/images/ahnewslogo.png";  //默认标题图片
    
    $.ajax({
        url: xyUrl + "wx/signature",
        data: { url: wxShareUrl },
        dataType: 'json',
		async:true, 
        success: function (dataShare) {
            var shareData = {
                title: document.title.replace(/<[^>]+>|&[^>]+;/g, "  "),
                desc: '安徽新闻网',
                link: wxShareUrl,//详情页带#
                imgUrl: baseShareImg
            };
            wx.config({
                appId: dataShare.appid,
                nonceStr: dataShare.noncestr,  // 必填，生成签名的随机串
                timestamp: dataShare.timestamp,  // 必填，生成签名的时间戳
                signature: dataShare.signature, // 必填，签名
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareQZone"
                ]
            });
            wx.ready(function () {
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareQZone(shareData);
            });

            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log(res);
               

            });
        },
        error: function (dataShare) {
        }
    });
})
