(function (exports) {

    //var baseUrl = "http://localhost:9010/apps/am";
    var root = "/yjxww/web";


    //var baseUrl = "http://172.20.4.232:802/apps/am";
    //var baseUrl = "http://172.20.4.232:802/apps/am";
    var baseUrl = "http://zh.tycom.cn/apps/am/";
    var host="http://www.yjrb.com.cn";

    function get_app_url(url) {
        return tycom.common.api_tools.gen_http_url(baseUrl, url);
    }
    exports.url={
        home:function () {
            return "../../../"
        },
        bind_account:function (data) {
            return tycom.common.api_tools.gen_url("/public_resource/public/html/bind_account.html",data);

        },
        login:function () {

            return "/public_resource/public/html/login.html" ;

        },
        redirect_uri:function () {
          return encodeURIComponent(host+"/public_resource/public/html/callback.html");
        },
        weixin_redirect_uri:function () {
          return encodeURIComponent(host+"/public_resource/public/html/weixin_callback.html");
        },
        weixin_login:function (uri,weixin_state) {
            return "https://open.weixin.qq.com/connect/qrconnect?appid=wx9c6616d929f2b7d8&redirect_uri="+uri+"&response_type=code&scope=snsapi_login&state="+weixin_state+"#wechat_redirect";
        },
        weixin_comment:function (uri,weixin_state) {
            return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5b914d99751b3796&redirect_uri="+uri+"&response_type=code&scope=snsapi_userinfo&state="+weixin_state+"&connect_redirect=1#wechat_redirect"
        }

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
