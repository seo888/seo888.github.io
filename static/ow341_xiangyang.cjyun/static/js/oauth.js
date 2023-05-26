/**
 * User login authorization
 * Created by Administrator on 2015/8/3 0003.
 */

;(function ($) {

    'use strict';
    var Oauth = function (oauthConfig) {
        var self = this;
        var error = '';
        var config = $.extend({'mode' : 'public'}, oauthConfig);

        function doCommonResult (res, successFunc, errorFunc)
        {
            if (res.state && res.code == 0) {
                successFunc && successFunc(res.data);
            } else {
                errorFunc && errorFunc(res.code, res.message);
            }
        }

        function doCheckResult (res, activeFunc, negativeFunc)
        {
            var is_captcha = res.is_captcha && res.is_captcha == true ? true : false;
            if (res.state && res.code == 0) {
                activeFunc(res.noticeurl, is_captcha, res.data);
            } else {
                negativeFunc(res.noticeurl, is_captcha, res.code, res.message);
            }
        }

        return {
            /**
             * 当为私有云方案时，站点程序在每个页面加载时需要去检测用户状态
             * 如果App下用户是已登录的，则设置为各站点登录
             * 如果App下是未登录状态，则各站点应该退出登录
             * @param successFunc
             * @param errorFunc
             */
            "autocheck" : function (loggedFunc, unloggedFunc) {

                if (!config.mode || config.mode != 'private' || !config.appUrl || !config.siteid) {
                    error = '参数错误'; return;
                }

                // 自动检测
                $.getJSON(config.appUrl + '/login/index/check?callback=?', {
                    "noticeurl" : config.noticeUrl,
                    "siteid" : config.siteid,
                    "mode" : config.mode
                }, function (res) {
                    // status : logged unlogged cached
                    doCheckResult(res, loggedFunc, unloggedFunc);
                })
            },
            /**
             * 此方法用于检查用户在App下是否登录，用于公有云方案下的速度登录检查
             * 这个方法提供两个参数，参数1用于登录成功后的回调函数，参数2用于失败后的回调
             *
             * @param successFunc
             * @param errorFunc
             */
            "check" : function (successFunc, errorFunc) {
                if (!config.mode || config.mode != 'public' || !config.appUrl || !config.siteid) {
                    error = '参数错误'; return;
                }

                // 检查登录状态
                $.getJSON(config.appUrl + '/login/index/check?callback=?', {
                    'noticeurl' : config.noticeUrl,
                    'siteid' : config.siteid,
                    'mode' : config.mode
                }, function (res) {
                    doCheckResult(res, successFunc, errorFunc);
                });
            },
            /**
             * 此方法用于用户登录，用JsonP的方法登录，但为避免将用户名密码直接暴露在GET参数中，这里采用了一点小技巧。
             * 具体方法为，用户在站点下服务端，将需要传输的用户数据保存在了globalCache中，生成了一个名为 Member:Login:[UUID] 的缓存数据
             * 这里只将UUID放在签名字符串中传递，到达App站点后，会将这个 cache 数据取出来，并同时删除该缓存信息
             * 因此可以说 UUID 是一个一次性的 token
             *
             * 提供三个参数，签名URL， 登录成功的回调，失败后的回调
             *
             * @param url
             * @param successFunc
             * @param errorFunc
             */
            "login" : function (url, successFunc, errorFunc) {
                if (!url) { return; }

                // 登录
                $.getJSON(url + '&callback=?', function (res) {
                    if (res.state && res.code == 0) {
                        successFunc && successFunc(res.data);
                    } else {

                        var is_captcha = res.is_captcha && res.is_captcha === true ? true : false;
                        errorFunc && errorFunc(is_captcha, res.code, res.message);
                    }
                });
            },
            /**
             * 此方法用于账号退出
             * 此方法仅当私有云（private）方案时调用
             *
             * 参数说明： 签名后的URL, 当退出成功时， 失败时分别传入回调函数
             *
             * @param url
             * @param successFunc
             * @param errorFunc
             */
            "logout" : function (url, successFunc, errorFunc) {
                if (config.mode !== 'private') {
                    return;
                }

                // 退出
                $.getJSON(url + '&callback=?', function (res) {
                    doCommonResult(res, successFunc, errorFunc);
                });
            }
        };
    };

    window['Oauth'] = Oauth;

})(jQuery);
