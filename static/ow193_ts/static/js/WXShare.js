/*  页面基本信息  */
var web_page_share_info = {
    name: "天山网",
    title: $('title').text(),
    icon: "https://www.ts.cn/cdn/material/home/images/apple-touch-icon-256x256.png",
    description: "上天山 知新疆",
    api_url: "https://www.ts.cn/api/wechat.do",
    domain: "www.ts.cn"
}

/*  生成页面二维码  */
var qrcode = new QRCode("qrcode", {
    text: window.location.href,
    width: 128,
    height: 128,
    colorDark : "#333333",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});






setWechatShareInfo();

/**
 * 优化微信分享参数
 */
function setWechatShareInfo() {

    $.ajax({
        url: web_page_share_info.api_url,
        type: 'GET',
        dataType: 'jsonp',
        data: {
            'url': window.location.href,
            "domain": web_page_share_info.domain
        },
        jsonp: 'callback',
        jsonpCallback: "receive",
        success(result,status,xhr){
            if(result.code==200){
                wx.config({
                    appId: result.data.appid, // 必填，公众号的唯一标识
                    timestamp: result.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                    signature: result.data.signature,// 必填，签名
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'updateAppMessageShareData',
                        'updateTimelineShareData'
                    ]
                });


                wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
                    wx.updateAppMessageShareData({
                        title: web_page_share_info.title, // 分享标题
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
                        imgUrl: web_page_share_info.icon, // 分享图标
                        desc: web_page_share_info.description,
                    })
                    wx.updateTimelineShareData({
                        title: web_page_share_info.title, // 分享标题
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
                        imgUrl: web_page_share_info.icon, // 分享图标
                    })
                });



            }
        }

    })
}
