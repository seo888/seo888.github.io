function weixinShare(param) {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) != "micromessenger") {
        return;
    }
    $.get("/weixinshare",{"url":param.link},function (res) {
        //console.log(res);
        var newdata=JSON.parse(res);

        wx.config({
            debug: false,
            appId: newdata.appId,
            timestamp: newdata.timestamp,
            nonceStr: newdata.nonceStr,
            signature: newdata.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表
        });
        // config之后会自动调用ready方法
        wx.ready(function() {
            wx.onMenuShareTimeline(param);
            wx.onMenuShareAppMessage(param);


        });
        wx.error(function(res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log(res,"rrr");
        });
        // 开始分享

    })


}
function getCookie(cookieName){
    var cookieValue="";
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            if (cookie.substring(0, cookieName.length + 2).trim() == cookieName.trim() + "=") {
                cookieValue = cookie.substring(cookieName.length + 2, cookie.length);
                break;
            }
        }
    }
    return cookieValue;
}
$(function () {
    $.get('/user/loginstatus',function (data) {
        if(data=="1"){
            var account= decodeURIComponent(getCookie("nickname"));
            var logininfo="<ul class=\"profile\"><li class=\"menu-item dropdown\"><a class=\"menu-item-user\"href=\"/user/account\"><span class=\"menu-item-name\">"+account+"</span></a><ul class=\"dropdown-menu\"><li><a href=\"/user/account\">用户中心</a></li><li><a href=\"/user/article\">我的文章</a></li><li><a href=\"/user/account/\">基本资料</a></li><li><a href=\"/user/account/\">系统通知</a></li><li><a href=\"/user/bind\">帐号绑定</a></li><li><a href=\"/user/logout\">退出登录</a></li></ul></li></ul>"
            $("#j-user-wrap").html(logininfo);

        }
    })

})

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?71e5fbdd56e74009e20e5c48c7bf0172";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
$(function() {
    var url=window.location.pathname;
    var yesno=false;
    var dennyurl="user|search|.html";
    var arr=dennyurl.split('|');
    for(var i=0;i<arr.length;i++)
    {
        if(url.indexOf(arr[i])!=-1)
        {
            yesno=true;
        }

    }

    if(!yesno)
    {
        $.post("/api/makehtml",{"url":url},function (data,status) {
            console.log(data);
        })
    }

})
var sUserAgent = navigator.userAgent.toLowerCase();
if(sUserAgent.indexOf("baidu") > 0) {
    $(".header").attr('style','position: absolute');
}
