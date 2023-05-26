(function (exports) {

    //var baseUrl = "https://zh.tycom.cn:10288/mobile/api/guest/get_wx_share_config?clear=1";
    var baseUrl = tycom.utils.gen_http_url(tycom.config.appManagerServer, "/mobile/api/guest/get_wx_share_config");

    /*
    * /mobile/api/guest/get_wx_share_config?url=xxxxxxxx
    * data:{serverUrl:服务器地址，shareLink:xxxx部分，getShareTimelineParams:获取分享朋友圈参数的函数，getShareAppMessageParams:获取分享给好友参数的函数，onError:发生错误执行的函数(可选)}
    * */
    exports.wx_share = function (data) {
        //var getConfigUrl = data.serverUrl+baseUrl+data.shareLink;    //获取公众号配置信息
        //var getConfigUrl = baseUrl+ window.location.href;    //获取公众号配置信息

        $.ajax({
            url: baseUrl,
            type: "POST",
            data: {
                url: data.shareLink
            },
            success: function (res) {
                if (res && res.data) {
                    var wx_config = res.data.config;   // wx_config 放置后台返回的公众号配置信息
                    wx_config.debug = false;
                    wx_config.jsApiList = [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareQZone',
                        'onMenuShareWeibo'
                    ];
                    wx.config(wx_config);
                } else if (res && !res.data) {
                    console.log(res.msg);
                }
            },
            error: function (err) {
                if (data.onError) {
                    data.onError(err);
                }
            }
        });

        wx.ready(function () {
            var TimelineParams = data.getShareTimelineParams();     //朋友圈参数
            var AppMessageParams = data.getShareAppMessageParams(); //好友参数

            // 注册分享朋友圈事件
            if (!TimelineParams.title || !TimelineParams.link) {   // 缺少title或link
                if (data.onError) {
                    let err = {errMsg: '缺少title或link'};
                    data.onError(err);
                }
            } else {
                wx.onMenuShareTimeline(TimelineParams);
            }

            // 注册分享给好友事件
            if (!AppMessageParams.title || !AppMessageParams.link) {   // 缺少title或link
                if (data.onError) {
                    let err = {errMsg: '缺少title或link'};
                    data.onError(err);
                }
            } else {
                wx.onMenuShareAppMessage(AppMessageParams);
                wx.onMenuShareQQ(AppMessageParams);
                wx.onMenuShareQZone(AppMessageParams);
                wx.onMenuShareWeibo(AppMessageParams);
            }

        });


        // config验证失败
        wx.error(function (err) {

            // alert("wx.config error:"+JSON.stringify(err));
            var res = {
                msg: 'config验证失败',
                err: err
            }
            if (data.onError) {
                data.onError(res);
            }
        });

    }


})((function () {
    if (typeof exports === 'undefined') {
        if (typeof window.tycom === 'undefined') {
            window.tycom = {};
        }
        return window.tycom;
    } else {
        return exports;
    }
})());
