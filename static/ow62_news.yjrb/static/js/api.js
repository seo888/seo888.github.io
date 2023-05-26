(function (exports) {

    // var baseUrl = window.location.protocol + "//" + window.location.host + "/apps/am/";
    var baseUrl = window.location.protocol + "//" + window.location.host + "/apps/am/";
    // var baseUrl = "http://zh.tycom.cn/apps/am/";
    // var baseUrl = "http://172.20.2.160:9010/apps/am";
    // var baseUrl = "http://172.20.4.232:802/apps/am";

    var titleImageRoot = "/upload/static";

    function get_app_url(url) {
        return tycom.common.api_tools.gen_http_url(baseUrl, url);
    }

    exports.api = {
        member: {
            /**
             * 获取验证码地址
             * @returns {*}
             */
            captcha_url: function () {
                return tycom.common.api_tools.gen_url(get_app_url("/mobile/api/guest/captcha"), null, true);
            },
            /**
             * 登陆
             * @param data      {code:"test",password:"test",captcha:"1234"//验证码,img:""//头像}
             * @param callback
             */
            login: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/login_web"), null, data, callback);
            },
            /**
             * 获取手机验证码
             * @param data      {mobile:"136123456789"}
             * @param callback
             */
            send_valification_code: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/send_valification_code"), null, data, callback);
            },
            /**
             * 注册
             * @param data      {code:"test",password:"test",valification_code:"1234"//短信验证码,email:"123@qq.com",name:"",img:""//头像}
             * @param callback
             */
            register: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/register_web"), null, data, callback);
            },
            /**
             * 退出登录
             * @param callback
             */
            logout: function (callback) {
                return tycom.common.api_tools.get_data(get_app_url("/mobile/api/guest/logout"), null, callback);
            },
            /**
             * 第三方登录
             * @param data      {bindType:""//绑定类型(qqId,weixinId,weiboId),bindValue:""//第三方返回userId,nick:""//昵称,img:""//图片url}
             * @param callback
             */
            third_login: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/third_login"), null, data, callback);
            },
            /**
             * 检查验证码
             * @param data      {captcha:"1234"//验证码}
             * @param callback
             */
            check_captcha: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/checkCaptcha"), null, data, callback);
            },
            /**
             * 获取当前登陆用户信息
             * @param callback
             */
            get_login_user_info: function (callback, params) {
                return tycom.common.api_tools.get_data(get_app_url("/mobile/api/guest/get_login_user_info"), params, callback);
            },
            /**
             * 修改密码
             * @param data      {old_password:"",new_password:""}
             * @param callback
             */
            modify_psw: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/user/modify_psw"), null, data, callback);
            },
            /**
             * 修改用户头像
             * @param data      {file:""//base64}
             * @param callback
             */
            save_user_img: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/user/save_user_img_web"), null, data, callback);
            },
            /**
             * 检查第三方账号是否已绑定账号
             * @param data      {bindType : "qq|weixin",bindValue : "",noLogin:bool//阻止自动登陆}
             * @param callback
             */
            check_bind_other: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/check_bind_other"), null, data, callback);
            },
            /**
             * 验证手机号是否已经注册
             * @param data      {mobile:""}
             * @param callback
             */
            check_usercode_register: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/check_usercode_register"), null, data, callback);
            },
            /**
             * 验证手机短信验证码
             * @param data      {mobile:"",valification_code:""}
             * @param callback
             */
            check_valification_code: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/check_valification_code"), null, data, callback);
            },
            /**
             * 重置密码
             * @param data      {code:"",password:"",valification_code:""}
             * @param callback
             */
            reset_psw: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/reset_psw"), null, data, callback);
            },
            /**
             * 绑定第三方登陆
             * @param data      {code : "", password :"", bindType : "",bindValue: "",img:""}
             * @param callback
             */
            bind_other_code: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/bind_other_code"), null, data, callback);
            },
            /**
             * 取消绑定第三方账号
             * @param data      {code : "", password :"", bindType : "qq|weixin|weibo"}
             * @param callback
             */
            unbind_other: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/unbind_other"), null, data, callback);
            },
            /**
             * 检查是否正确
             * @param data      {password :""}
             * @param callback
             */
            check_password: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/check_password"), null, data, callback);
            },
            /**
             * 获取当前登陆用户头像
             */
            get_member_url: function (url) {
                if (url) {
                    return tycom.common.api_tools.gen_url(get_app_url(titleImageRoot + tycom.common.api_tools.add_url_title(url)), null, true);
                }
            },
            /**
             * 微信登陆后服务端获取微信用户信息并缓存
             * @param data      {code:"",state:""}
             * @param callback
             */
            wechat_callback: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/wechat_callback"), null, data, callback);
            },
            wechat_browser_callback: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/wechat_browser_callback"), null, data, callback);
            },
            /**
             * 微信登陆后前端获取微信用户信息并删除
             * @param data      {state:""}
             * @param callback
             */
            get_wechat_user_info: function (data, callback) {
                return tycom.common.api_tools.get_data(get_app_url("/mobile/api/guest/get_wechat_user_info"), data, callback);
            },
            to_wechat_authorized:function (callback) {
                return tycom.common.api_tools.get_data(get_app_url("mobile/api/to_wechat_authorized"),null,callback);
            },
            /**
             * 修改用户信息
             * @param data      {imgUrl:""//头像,name:""//昵称,email:""//邮箱,settings:"",gender:0}
             * @param callback
             */
            modify_info: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/guest/modify_info"), null, data, callback);
            },
            get_wechat_app_id:function (callback) {
                return tycom.common.api_tools.get_data(get_app_url("/mobile/api/guest/get_wechat_app_id"),null,callback);
            }
        },
        bl: {
            /**
             * 返回保存报料的地址
             */
            get_save_bl_url: function () {
                return get_app_url("/mobile/api/file/upload_file");
            },
            save_bl: function (data, callback) {
                return tycom.common.api_tools.post_file_data(get_app_url("/mobile/api/bl/save_bl"), null, data, callback);
            },

            /**
             * 上传文件
             * @param data      {files:"",content:"",location_str:""}
             * @param callback
             */
            save_bl_file: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/bl/save_bl_by_files"), null, data, callback);
            }
        },
        file: {
            get_save_bl_url: function () {
                return get_app_url("/mobile/api/bl/save_bl_by_files");
            }
        },
        collect: {
            /**
             * 用户行为采集
             * @param data      {sourceType:1//来源,platform:"web"//平台,action:"login",count:1}
             * @param callback
             */
            submit: function (data, callback) {
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/collect/submit"), null, data, callback);
            }
        },
        comment:{
          submit:function(data,callback){
            return tycom.common.api_tools.post_data(get_app_url("/mobile/api/user/save_story_comment"), null, data, callback);
          }
        },
        lottery:{
            lottery_begin:function(data,callback){
                return tycom.common.api_tools.post_data(get_app_url("/mobile/api/voteSystem/lottery"), null, data, callback);
            },
            get_lottery_obj:function(data,callback){
            	console.log(get_app_url("/mobile/api/voteSystem/getRecentLotteryObj"));
                return tycom.common.api_tools.get_data(get_app_url("/mobile/api/voteSystem/getRecentLotteryObj"), data, callback);
            }
        }
    };

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
