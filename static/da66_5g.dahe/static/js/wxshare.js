/**
 * Created by lxx on 2019/07/18.
 */
function wxshare(t, d, i) {
    // 定义分享内容，title：标题   des：描述   icon：分享logo
    var localhref = window.location.href;

    var sharetitle = t;
    var sharelink = localhref;
    var shareimgUrl = i;
    var sharedes = d;

    if (shareimgUrl === undefined) {
        shareimgUrl = 'https://4g.dahe.cn/resources/img/wxlogo.gif';
    }

    var result = fetch("https://share.dahe.cn/share/dahe?url=" + encodeURIComponent(localhref));
    result.then(function(response) {
        return response.json()
    }).then(function(data) {
        var text = data.object;

        // QQ
		setShareInfo({
			title:     sharetitle, // 分享标题
			summary:   sharedes, // 分享内容
			pic:       shareimgUrl, // 分享图片
			url:       sharelink, // 分享链接
			// 微信权限验证配置信息，若不在微信传播，可忽略
			WXconfig: {
				swapTitleInWX: false, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
				appId: text.appId, // 公众号的唯一标识
				timestamp: text.timestamp, // 生成签名的时间戳
				nonceStr: text.nonceStr, // 生成签名的随机串
				signature: text.signature // 签名
			}
		});
        /* 微信 */
        wx.config({
            debug: false, // 开启调试模式。
            appId: text.appId, // 必填，公众号的唯一标识
            timestamp: text.timestamp, // 必填，生成签名的时间戳
            nonceStr: text.nonceStr, // 必填，生成签名的随机串
            signature: text.signature, // 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        });

        wx.checkJsApi({
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                // console.log(res)
            }
        });

        //需在用户可能点击分享按钮前就先调用
        wx.ready(function() {

            // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            wx.updateAppMessageShareData({
                title: sharetitle, // 分享标题
                link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareimgUrl, // 分享图标
                desc: sharedes, // 分享描述
                success: function() {
                    // 设置成功
                }
            })

            // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            wx.updateTimelineShareData({
                title: sharetitle, // 分享标题
                link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareimgUrl, // 分享图标
                success: function() {
                    // 设置成功
                }
            })
        });

        wx.error(function(res) {
            console.log("err: " + res)
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }).catch(function(ex) {
        console.log('failed', ex)
    })
}