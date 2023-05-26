var browser = {
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
            iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

var http = window.location.protocol;
var host = window.location.host;
var port = window.location.port;
var pathname = window.location.pathname;
var search = window.location.search;
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios)
{
    var mobilUrl=http+"//"+host+"/mobile/article.html?path=" + pathname;
    document.location.href=mobilUrl;
}
$(document).ready(function(){
    // var date = new Date();
    // var publishTime = new Date($(".pub-time").text());
    // var diffTime = date.getTime() - publishTime.getTime();
    // var id = $("#id").val();
    // var dph = 12;
    // var dpm = dph / 60;
    // var minutes = Math.ceil(diffTime / (60 * 1000));
    // var x = id % 100 + publishTime.getSeconds();
    // var n = Math.ceil(x / dpm);
    // n = minutes <= n ? minutes : n;
    // var uv = Math.round(minutes + n * x - (n + (n * n - n) * dpm / 2));
    // if(id == 87801){
    //     uv *= 5;
    // }
    // $(".uv").text("访问量：" + uv);
    //
    //
    // //点赞
    // var support = $(".support");
    // var supported = false;
    // var supportCookie = getCookie("frz-support");
    // if(supportCookie != ""){
    //     supported = true;
    //     support.children("img").attr("src", "/news/46.files/image/supported.png");
    //     setCookie("frz-support", 1, 120);
    // }
    // support.on("click", function(e){
    //     if(supported){
    //         supported = false;
    //         support.children("img").attr("src", "/news/46.files/image/support-n.png");
    //         setCookie("frz-support", "", 0);
    //     }else{
    //         supported = true;
    //         support.children("img").attr("src", "/news/46.files/image/supported.png");
    //         setCookie("frz-support", 1, 120);
    //     }
    // })

    function setCookie(cname,cvalue,exdays)
    {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }
});