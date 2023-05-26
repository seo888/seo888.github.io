(function (exports) {

    exports.captcha_url = function () {
        return tycom.api.member.captcha_url();
    };

    /**
     * 登陆
     * @param data      {code:"test",password:"test",captcha:"1234"//验证码}
     * @param callback
     */
    exports.login = function (data, callback) {
        return tycom.api.member.login(data, callback);
    }

    /**
     * 获取手机验证码
     * @param data      {mobile:"136123456789"}
     * @param callback
     */
    exports.send_valification_code = function (data, callback) {
        return tycom.api.member.send_valification_code(data, callback);
    }

    /**
     * 注册
     * @param data      {code:"test",password:"test",valification_code:"1234"//短信验证码,email:"123@qq.com",name:""}
     * @param callback
     */
    exports.register = function (data, callback) {
        return tycom.api.member.register(data, callback);
    };

    /**
     * 退出登录
     * @param callback
     */
    exports.logout = function (callback) {
        return tycom.api.member.logout(callback);
    }

    /**
     * 第三方登录
     * @param data      {bindType:""//绑定类型(qqId,weixinId,weiboId),bindValue:""//第三方返回userId,nick:""//昵称,img:""//图片url}
     * @param callback
     */
    exports.third_login = function (data, callback) {
        return tycom.api.member.third_login(data, callback);
    }

    /**
     * 检查验证码
     * @param data      {captcha:"1234"//验证码}
     * @param callback
     */
    exports.check_captcha = function (data, callback) {
        return tycom.api.member.check_captcha(data, callback);
    }

    /**
     * 获取当前登陆用户信息
     * @param callback
     */
    exports.get_login_user_info = function (callback) {
        return tycom.api.member.get_login_user_info(callback);
    }

    /**
     * 修改密码
     * @param data      {old_password:"",new_password:""}
     * @param callback
     */
    exports.modify_psw = function (data, callback) {
        return tycom.api.member.modify_psw(data, callback);
    }

    /**
     * 修改用户头像
     * @param data      {file:""//base64}
     * @param callback
     */
    exports.save_user_img = function (data, callback) {
        return tycom.api.member.save_user_img(data, callback);
    }

    /**
     * 修改密码
     * @param data      {old_password : "",new_password : ""}
     * @param callback
     */
    exports.modify_psw = function (data, callback) {
        return tycom.api.member.modify_psw(data, callback);
    }

    /**
     * 检查是否绑定
     * @param data      {bindType : "qq|weixin",bindValue : ""}
     * @param callback
     */
    exports.check_bind_other = function (data, callback) {
        return tycom.api.member.check_bind_other(data, callback);
    }

    /**
     * 验证手机号是否已经注册
     * @param data      {mobile:""}
     * @param callback
     */
    exports.check_usercode_register = function (data, callback) {
        return tycom.api.member.check_usercode_register(data, callback);
    }

    /**
     * 验证手机短信验证码
     * @param data      {mobile:"",valification_code:""}
     * @param callback
     */
    exports.check_valification_code = function (data, callback) {
        return tycom.api.member.check_valification_code(data, callback);
    }

    /**
     * 重置密码
     * @param data      {code:"",password:"",valification_code:""}
     * @param callback
     */
    exports.reset_psw = function (data, callback) {
        return tycom.api.member.reset_psw(data, callback);
    }

    exports.bl = tycom.api.bl

})((function () {
    if (typeof exports === 'undefined') {
        if (typeof window.tycom === 'undefined')
            window.tycom = {};

        if (typeof window.tycom.app_manager === 'undefined')
            window.tycom.app_manager = {};
        return window.tycom.app_manager;
    }
    else {
        return exports;
    }
})());