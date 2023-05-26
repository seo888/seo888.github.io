"use strict";
document.write(unescape("<script src=\"//res.wx.qq.com/open/js/jweixin-1.6.0.js\" ></script>"));
/* 微信分享 */
function wxConfig(config) {
    var url = '//api.lznews.cn/wechat/share';
    $.ajax({
        url: url,
        type: 'get',
        data: {
            url: window.location.href
        },
        success: function success(res) {
            console.log(res);
            wx.config(eval('('+res+')'));
            wxReady(config);
        }
    });
}

function wxReady(config) {
    window.wx.ready(function () {
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        window.wx.updateAppMessageShareData({
            title: config.title,
            desc: config.desc,
            link: config.link,
            imgUrl: config.imgUrl
        }); // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容

        window.wx.updateTimelineShareData({
            title: config.title,
            link: config.link,
            imgUrl: config.imgUrl
        });
    });
}
