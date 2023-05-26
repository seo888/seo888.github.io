/*微信升级后分享有5种情况：
1，客户端分享链接是卡片形式
2，公众号文章分享是卡片形式
3，电脑版页面，点击右上角微信分享，扫描二维码分享，是卡片形式
4，旧版微信分享的卡片链接，再次分享，是卡片形式
5，新版微信（8.0.15及之后的版本）中直接发送链接，打开后分享，统一都只能显示为链接形式，微信改版后做的限制

参数：分享标题，分享描述，分享图片，分享链接，公众号名称（nacos中配置）;微信接口中debug;是否使用测试wxshare接口
*/

function wxshare(share_title, share_desc, share_img, share_url, name,isDebug,isDevEnv) {
    var domainPrefix = isDevEnv?'dev-':'';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "//" + domainPrefix + "wxshare.chinanews.com.cn/jssdksign?name=" + name + "&url=" + encodeURIComponent(share_url));
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if(isDevEnv){
                console.log("appId",data.data.appId);
            }
            //通过config接口注入权限验证配置
            wx.config({
                debug: isDebug,
                appId: data.data.appId,
                timestamp: data.data.timestamp,
                nonceStr: data.data.nonceStr,
                signature: data.data.signature,
                jsApiList: [
                    'updateAppMessageShareData', //分享给朋友及qq
                    'updateTimelineShareData', //分享到朋友圈及分享到QQ空间
                    'onMenuShareWeibo', //分享到腾讯微博
                    'onMenuShareTimeline',//分享到朋友圈（即将废弃）
                    'onMenuShareAppMessage',//分享给朋友（即将废弃）
                    'onMenuShareQQ',//分享到QQ（即将废弃）
                    'onMenuShareQZone',//分享到QQ空间（即将废弃）

                ]
            });

            //通过ready接口处理成功验证
            wx.ready(function () {
                //判断当前客户端版本是否支持指定JS接口
                wx.checkJsApi({
                    //checkJsApi:是判断客户端支不支持这个api，不代表有权限调
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'],//
                    success: function (res) {
                        //分享给朋友及qq
                        if (res.checkResult.updateAppMessageShareData) {
                            if(isDevEnv){
                                 console.log("res.checkResult:",res.checkResult);
                                 console.log("res.checkResult.updateAppMessageShareData:",res.checkResult.updateAppMessageShareData);
                            }

                            wx.updateAppMessageShareData({
                                title: share_title, // 分享标题
                                desc: share_desc, // 分享描述
                                link: share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: share_img, // 分享图标
                                success: function () {
                                    console.log("分享成功");
                                }
                            });
                        }
                        //分享到朋友圈及分享到QQ空间
                        if (res.checkResult.updateTimelineShareData) {
                            wx.updateTimelineShareData({
                                title: share_title, // 分享标题
                                link: share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: share_img, // 分享图标
                                success: function () {
                                    // console.log("分享成功");
                                }
                            })
                        }

                        //分享到腾讯微博
                        if (res.checkResult.onMenuShareWeibo) {
                            wx.onMenuShareWeibo({
                                title: share_title, // 分享标题
                                desc: share_desc, // 分享描述
                                link: share_url, // 分享链接
                                imgUrl: share_img, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }

                        /*//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）  !res.checkResult.updateTimelineShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareTimeline){
                            wx.onMenuShareTimeline({
                                title: share_title, // 分享标题
                                link: share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: share_img, // 分享图标
                                success: function () {
                                    // 用户点击了分享后执行的回调函数
                                }
                            });
                        }
                        //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃） !res.checkResult.updateAppMessageShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareAppMessage){
                            wx.onMenuShareAppMessage({
                                title: share_title, // 分享标题
                                desc: share_desc, // 分享描述
                                link: share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: share_img, // 分享图标
                                type: 'link', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '',// 如果type是music或video，则要提供数据链接，默认为空
                                success: function () {
                                    // 用户点击了分享后执行的回调函数
                                }
                            });
                        }
                        //获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）!res.checkResult.updateAppMessageShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareQQ){
                            wx.onMenuShareQQ({
                                title: share_title, // 分享标题
                                desc: share_desc, // 分享描述
                                link: share_url, // 分享链接
                                imgUrl: share_img,// 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }
                        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）!res.checkResult.updateTimelineShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareQZone){
                            wx.onMenuShareQZone({
                                title: share_title, // 分享标题
                                desc: share_desc, // 分享描述
                                link: share_url, // 分享链接
                                imgUrl: share_img, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        }*/
                    },
                });
            });

            //通过error接口处理失败验证
            wx.error(function (res) {
                console.log(res);
            });
        }
    };
}