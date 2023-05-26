function isWeiXin() {

    var ua = window.navigator.userAgent.toLowerCase();

    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
var imgUrl = "https://pic.tt.jxnews.com.cn/upload/202011/b87eacdfb5eb8aa7cacc2c14f44b5577.png?w=128&h=128";
$(function () {
    if (isWeiXin()) {

        url = window.location.href.split('#')[0];
        if (typeof wx !== 'undefined') {


            $.ajax({
                url: "https://tt.m.jxnews.com.cn/wechat/sign",
                type: 'post',
                data: { url: url },
                success: function (data) {
                    appid = data.appid;
                    timestamp = data.timestamp;
                    nnoncestr = data.nonceStr;
                    signature = data.signature;
                    wx.config({
                        debug: false,
                        appId: appid,
                        timestamp: timestamp,
                        nonceStr: nnoncestr,
                        signature: signature,
                        jsApiList: [
                            /* 'checkJsApi',  */
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                            /*'onMenuShareQQ',  
                            'onMenuShareWeibo',  
                            'chooseWXPay'  */
                        ]
                    });
                    wx.ready(function () {

                        wx.onMenuShareAppMessage({
                            title: $('head > title').text(),
                            desc: $('meta[name="description"]').attr('content') || $('head > title').text(),
                            link: url,
                            imgUrl: imgUrl,
                            type: 'link',
                            dataUrl: '',
                            success: function () {
                                $(".newsModal").show();
                                $(".shareModal").show();

                            },
                            cancel: function () {


                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: $('head > title').text(),
                            link: url,
                            imgUrl: imgUrl,
                            type: 'link',
                            dataUrl: '',
                            success: function () {

                            },
                            cancel: function () {


                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                    })
                }
            })
        }
    }
})

