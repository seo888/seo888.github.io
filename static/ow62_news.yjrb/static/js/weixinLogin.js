var weixinLogin={
    init:function(loginSuccessCb){
        if(tycom.api.member.get_login_user_info()!=null){
            tycom.api.member.get_login_user_info(function (result) {
                if(result){
                    loginSuccessCb(result);
                }
            })
        }
    },
    login:function(loginSuccessCb){
        if (/MicroMessenger/i.test(navigator.userAgent)) {
//    	if(true){
            tycom.api.member.get_login_user_info(function (user) {
                if(user==null){
                    tycom.api.member.get_wechat_app_id(function (e,result) {
                        var appId;
                        if(result&&result.appID){
                            appId=result.appID;
                        }else{
                            return console.error("获取公众号参数失败")
                        }
                        // var appId=tycom.api.member.get_wechat_app_id().appID;
                        var html = encodeURIComponent(window.location.href);
                        var state = Math.random().toString(36).substr(2);
                        var host="http://"+window.location.host;
                        // var uri=encodeURIComponent("http://www.yjrb.com.cn/apps/am/mobile/api/guest/get_wechat_browser_callback?callback_html="+html);
                        //by tyj 为解决app问题，在nginx增加weixin_callback.html的代理
                        var uri=encodeURIComponent(host+"/public_resource/public/html/weixin_callback.html?callback_html="+html);
                        //写死有问题， app无法使用微信登陆
                        //var uri=encodeURIComponent("http://m.yjrb.com.cn"+"/public_resource/public/html/weixin_callback.html?callback_html="+html);
                        var weixin_html=" https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+uri+"&response_type=code&scope=snsapi_userinfo&state="+state+"&connect_redirect=1#wechat_redirect"
                        // var weixin_comment = tycom.url.weixin_comment(uri, state);
                        $("body").append("<a href="+weixin_html+" id='a_login' onclick='true' style='display: none'><span id='span_login' style='display: none'>跳转测试</span></a>")
                        // console.log(weixin_html);
                        $("#span_login").trigger("click");
                    })
                }else{
                    if(loginSuccessCb){
                        loginSuccessCb(user)
                    }
                }

            })
        }
    },
    isWeixin:function() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/micromessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
}


//by tyj 暂时不放在公共脚本里， 当前只在图文直播模板中生效，以后其它页面都需要的时候，再迁移到public_method.js文件里
function getLoginStatus(cb) {
    if (!tycom.userinfo.current_member){
        // layer.confirm('尚未登录,点击是前往登录页面？登录成功后刷新本页面', {
        //     btn: ['是','否'] //按钮
        // }, function(){
        //     window.open("/public_resource/wangzhan/web/public_resource/public/html/login.html");
        // }, function(){
        // });
        // swal({
        //     title: '尚未登录',
        //     text: '点击是前往登录页面？登录成功后刷新本页面',
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: "#1e9fff",
        //     confirmButtonText: '是',
        //     cancelButtonText: '否',
        // },function (isConfirm) {
        //     if(isConfirm){
            if (tycom.native.isNative()){
                tycom.native.getToken(function(token){
                	if (token){
	                	tycom.userinfo.refresh_current_member(token, cb);
	                }else{
	                	tycom.native.openLogin(function(token){
	                    if (token){
	                        tycom.userinfo.refresh_current_member(token, cb);
	                    }
	                	});
	                }
                });
            }else {
                //alert("login3");
                weixinLogin.login();
                
                //跳转到登陆页面
                //window.location.href = tycom.common.api_tools.gen_url("/apps/am/user_center/view/login", {redirect_url: window.location.href});
                
            }
            // }else {
            //
            // }
        //});
        return false;
    }else{
        //alert("login4");
        return true;
    }
}