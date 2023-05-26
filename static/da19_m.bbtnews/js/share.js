function share(params) {
    params = params || {};
    params.postUrl = params.postUrl || console.error('分享请求地址错误');
    params.title = params.title || '';
    params.description = encodeURIComponent(params.description) || '';
    params.url = encodeURIComponent(params.url) || '';
    params.thumb = params.thumb || '';

    var wstitle, wsdesc, wslink, wsimg, appId, timestamp, nonceStr, signature;
    $.getJSON(params.postUrl + '/index.php?controller=share&action=getWxConfig&title=' + params.title + '&description=' + params.description + '&url=' + params.url + '&thumb=' + params.thumb + '&jsoncallback=?', function (json) {
        wstitle = json.title;
        wsdesc = json.description;
        wslink = json.url;
        wsimg = json.thumb;
        appId = json.appId;
        timestamp = json.timestamp;
        nonceStr = json.nonceStr;
        signature = json.signature;
	wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
            ]
        });

        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: wstitle,
                link: wslink,
                imgUrl: wsimg,
                success: function () {

                    alert('分享成功');
                },
                cancel: function () {
                }
            });

            wx.onMenuShareAppMessage({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                    alert('分享成功');
                },
                cancel: function () {
                }
            });

            wx.onMenuShareQQ({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                    alert('分享成功');
                },
                cancel: function () {
                }
            });

            wx.onMenuShareWeibo({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                    alert('分享成功');
                },
                cancel: function () {
                }
            });

            wx.onMenuShareQZone({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                    alert('分享成功');
                },
                cancel: function () {
                }
            });

        });

    });
}

