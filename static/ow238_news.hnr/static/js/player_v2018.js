// --  @# annoted by fulltimelink @ 2018-08-31 11:36:50
// --  @# 视频播放JS兼容Video重新整理
$(document).ready(function(){
    for(var i=0;i<$(".edui-faked-video").length;i++){
        var video_url=$(".edui-faked-video").eq(i).attr("src");
        var video_img=$(".edui-faked-video").eq(i).attr("data-img");
        //***@#$ 2018-07-05 09:25 by lmx | 添加宽度高度参数
        var video_width=$(".edui-faked-video").eq(i).attr("width");
        var video_height=$(".edui-faked-video").eq(i).attr("height");
        if(typeof video_width == typeof undefined || video_width==false || $.trim(video_width)=='') video_width='600';
        if(typeof video_height == typeof undefined || video_height==false || $.trim(video_height)=='') video_height='450';
        //***@#$ 2018-07-05 09:30 by lmx | 添加宽度高度参数
        if($.trim(video_img)==""){
            video_img="http://d1.hnr.cn/hnr2015/public/video2015/preview.gif";
        }
        //判断是否有视频，是否添加视频div层
        if(video_url!=""){
            $(".edui-faked-video").eq(i).after("<div id='playVideo"+i+"'><div id='playVideo_box"+i+"'><div id='flashContent"+i+"'></div></div></div>");
            //***@#$ 2018-07-19 09:15 by lmx | 固定宽度改为100%，添加居中
            $("#playVideo"+i).css({"width":"100%","padding":"20px 0px","margin":"0px auto","text-align":"center"});

            function checkhHtml5() {
                if (typeof (Worker) !== "undefined") {
                    return true;
                } else{
                    return false;
                }
            }

            var browser = {
                versions: function() {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    var browserName = navigator.userAgent.toLowerCase();
                    return {//移动终端浏览器版本信息
                        //IE内核
                        trident: /msie/i.test(browserName) && !/opera/.test(browserName), //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        //是否为移动终端
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        Windows: u.indexOf('Windows') > -1 //是否Windows
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()
            };

            if (browser.versions.iPad || browser.versions.iPhone || (checkhHtml5() && browser.versions.android)){
                //***@#$ 2018-07-19 09:16 by lmx | 去掉手机版宽高，使其能自适应（width="'+video_width+'" height="'+video_height+'"）
                $("#flashContent"+i).append('<div class="video_control"  id="p_player'+i+'"><video style="width:100%;" id="video'+i+'" controls="controls" autoplay="true" poster="'+video_img+'" src="'+video_url+'"  x-webkit-airplay="true" webkit-playsinline="true" playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"/></video></div>');
            } else {
                if (browser.versions.android){ //android 3.x
                    location.replace(video_url);
                } else {
                    $("#flashContent"+i).append("<p>To view this page ensure that Adobe Flash Player version 11.1.0 or greater is installed. </p>");
                    var pageHost = ((document.location.protocol == "https:") ? "https://" : "http://");
                    $("#flashContent"+i).append("<a href='http://www.adobe.com/go/getflashplayer'><img src='"
                        + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>");
                    var swfVersionStr = "11.1.0";
                    var xiSwfUrlStr = "http://d1.hnr.cn/hnr2015/public/video2015/playerProductInstall.swf";
                    var xiSwfBoxName = "flashContent"+i;
                    var flashvars = {};
                    flashvars.playerWidth = video_width;
                    flashvars.playerHeight = video_height;
                    flashvars.url = video_url;//点播地址
                    flashvars.pic = video_img;//图片链接
                    flashvars.isauto ="true";
                    flashvars.ad = ""; //广告链接
                    var params = {};
                    params.wmode = "transparent";
                    params.quality = "high";
                    params.bgcolor = "#000";
                    params.allowscriptaccess = "sameDomain";
                    params.allowfullscreen = "true";
                    var attributes = {};
                    attributes.id = "Main";
                    attributes.name = "Main";
                    attributes.align = "middle";
                    swfobject.embedSWF("http://d1.hnr.cn/hnr2015/public/video2015/Main.swf", xiSwfBoxName,video_width, video_height,swfVersionStr, xiSwfUrlStr,flashvars, params, attributes);
                }
            }
        }

    }

});