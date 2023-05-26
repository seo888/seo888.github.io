(function() {  //用于安卓手机微信浏览器字体放大导致错乱
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
})();
var myScroll, isZoom = !1;
var apiUrl =  "//a.rednet.cn/dispatch";  //  "//a.onlyred.net/dispatch";
var frontUrl =  "//front-web.rednet.cn";  //  "http://172.16.6.49:8080";
if(!playList){
    var playList = [];
}
// 判断是否以前时刻里面的WAP站点
if (window.location.href.indexOf("moment") < 0) {
    //var url = window.location.href.split("rednetcms")[0];
    var url = window.location.host
    $(".header, .footer, .spreadchart, .taglink").remove();
    $("body").prepend('<link href="//moment.rednet.cn/common/css/wap.css" rel="stylesheet" type="text/css" />');
    switch (window.location.hostname.split(".")[0]) {
    case "zhaoshan":
        $("body").prepend('<section class="site_logo site_zhaoshan"><a class="nav_home" href=' +  + "></a></section>");
        break;
    // case "yuetang":
    //     $("body").prepend('<section class="site_logo site_yuetang"><a class="nav_home nav_home_red" href=' + url + "></a></section>");
    //     break;
    case "longhui":
        $("body").prepend('<section class="site_logo site_longhui"><a class="nav_home" href=' + url + "></a></section>");
        break;
    // case "shaodong":
    //     $("body").prepend('<section class="site_logo site_shaodong"><a class="nav_home" href=' + url + "></a></section>");
    //     break;
    // case "yuhua":
    //     $("body").prepend('<section class="site_logo site_yuhua"><a class="nav_home nav_yuhua" href=' + url + "></a></section>");
    //     break;
    case "wuling":
        $("body").prepend('<section class="site_logo"><a class="nav_home" href=' + url + "></a><em></em></section>");
        break;
    }
}
function initScroll() {
    myScroll = new IScroll("#wrapper", {
        zoom: !0,
        zoomMax: 6,
        scrollX: !0,
        scrollY: !0,
        freeScroll: !0,
        mouseWheel: !0,
        wheelAction: "zoom",
        click: iScrollClick()
    }),
    myScroll.on("zoomStart",function() {
        isZoom = !0
    }),
    myScroll.on("zoomEnd",function() {
        var o = -(window.innerWidth * (this.scale - 1) / 2),
        t = -(window.innerHeight * (this.scale - 1) / 2);
        myScroll.x = o,
        myScroll.y = t,
        $("#scroller").css("transform", "matrix(" + myScroll.scale + ", 0, 0, " + myScroll.scale + ", " + o + ", " + t + ")"),
        setTimeout(function() {
                isZoom = !1
            },
            300)
        })
}
function iScrollClick() {
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return ! 0;
    //if (/Chrome/i.test(navigator.userAgent)) return /Android/i.test(navigator.userAgent);
	if (/Chrome/i.test(navigator.userAgent)) return ! 1;
    if (/Silk/i.test(navigator.userAgent)) return ! 1;
    if (/Android/i.test(navigator.userAgent)) {
        //var o = navigator.userAgent.substr(navigator.userAgent.indexOf("Android") + 8, 3);
        //return ! (parseFloat(o[0] + o[3]) < 44)
		return ! 1;
    }
}
function openLink(o) {
    var t = $(o).attr("link"),
    e = $(o).attr("file"),
    i = "";
    //i = "" == t || "null" == t || "undefined" == t ? "//moment.rednet.cn/rednetcms" + e: t,
    i = t;
    i.indexOf("moment.rednet.cn") > -1 && (userid && ostype || window.location.href.indexOf("ostype") > -1) && (i = i.indexOf("?") > -1 ? i + "&ostype=" + ostype + "&appversion=" + appversion + "&userid=" + userid + "&uuid=" + uuid + "&isNight=" + isNight: i + "?ostype=" + ostype + "&appversion=" + appversion + "&userid=" + userid + "&uuid=" + uuid + "&isNight=" + isNight),
    window.open(i, "_blank")
}
var footerClose = !1;
$(document).ready(function() {
    if($(".description table").width()>420){
        $(".description table").width($(".description table").width()*scale)
    }
    // userid && ostype || window.location.href.indexOf("ostype") > -1 ? ($(".header, .footer").hide(), $(".blank").animate({
    userid && ostype || window.location.href.indexOf("ostype") > -1 ? ($(".header, .footer").hide(), $(".blank").animate({
        height: 30 * scale
    })) : ($(document).scroll(function() {
        //footerClose || ($(document).scrollTop() > $(".header").height() ? $(".footer").slideDown() : $(".footer").slideUp())
    }), IsPC() ? ($(".right_1").mouseover(function() {
        this.style.backgroundColor = "#A11716"
    }), $(".right_1").mouseout(function() {
        this.style.backgroundColor = "#C72D20"
    })) : ($(".right_1").bind("touchstart",
    function() {
        this.style.backgroundColor = "#A11716"
    }), $(".right_1").bind("touchmove",
    function() {
        this.style.backgroundColor = "#C72D20"
    }), $(".right_1").bind("touchend",
    function() {
        this.style.backgroundColor = "#C72D20"
    })), $(".close").click(function() {
        //$(".footer").slideUp(),
        $(".blank").animate({
            height: 30 * scale
        }),
        footerClose = !0
    })),
    //IsPC() ? ($(".footer").remove(), $(".tagdetail").mouseover(function() {
    IsPC() ? ($(".tagdetail").mouseover(function() {
        this.style.backgroundColor = 1 == isNight ? "#2D2D2D": "#E1E5E9"
    }), $(".tagdetail").mouseout(function() {
        this.style.backgroundColor = 1 == isNight ? "#444444": "#F2F4F7"
    })) : ($(".tagdetail").bind("touchstart",
    function() {
        this.style.backgroundColor = 1 == isNight ? "#2D2D2D": "#E1E5E9"
    }), $(".tagdetail").bind("touchmove",
    function() {
        this.style.backgroundColor = 1 == isNight ? "#444444": "#F2F4F7"
    }), $(".tagdetail").bind("touchend",
    function() {
        this.style.backgroundColor = 1 == isNight ? "#444444": "#F2F4F7"
    }));
    var o = !1;
    //initScroll(),
    $(".description").delegate("img", "click",
    function() {
        var t = $(this).attr("momenttype");
        if ($(this).hasClass('video-across-img')) return;
        if (t);
        else {
            o = !0;
            var e = this.naturalWidth,
            i = this.naturalHeight,
            n = (window.innerHeight - i * ((window.innerWidth > e ? e: window.innerWidth) / e)) / 2,
            // r = '<img src="' + this.src + '" style="width: ' + (window.innerWidth > e ? e: window.innerWidth) + "px; margin-top: " + n + 'px;" />';
            r = '<img src="' + this.src + '" style="width: ' + (window.innerWidth > e ? e: window.innerWidth) + 'px;" />';
            $(".preview>div").html(r),
            $(".mask, .preview").fadeIn(),
            $("body, html").css("overflow", "hidden")
            var el = document.querySelector('.preview>div');
            new PinchZoom.default(el, {draggableUnzoomed:false});
        }
    }),
    $(".mask").click(function() {
        o && ($(".mask, .preview").fadeOut(function() {
           // myScroll.zoom(1)
           $(".preview").html('<div id="scroller">');
        }), $("body, html").css("overflow", "auto"), o = !1)
    })
});




var uId = "-1";
function addFav() {
    setCookie(ckie,contentId + '-fav-'+new Date().getTime());
    $.ajax({
      type: "put",
      url: frontUrl + "/content/star/" + contentId,
      data:{
        'cookieUUID': getCookie(ckie)
      },
      dataType:'text',
      success: function(data){
          $(".favNum").html(upsFomatter(data));
          var src  =  $(".favImg").attr("src")
          //$(".favImg").attr("src", site+"/images/ico_like_on.png");
          $(".favImg").attr("src", src.replace(".png","_on.png"));
          if(src.indexOf("hand")>0){
            $(".favNum").css("color", "#C0A57B");
          }else{
            $(".favNum").css("color", "#EE191A");
          }
          $(".fav").css('border-width','0.02rem');
      }
    });
}
function upsFomatter(val) {
    var value = "";
    if ((val + "").length > 4) {
        value = (parseFloat(val) / 10000).toFixed(4);
        value = Number(value.toString().match(/^\d+(?:\.\d{0,1})?/)) + "";
        if (value.split(".")[1] == "0") {
            value = value.split(".")[0]
        }
        return value + "万"
    } else {
        return val
    }
}
function initSpreadChart_bak() {
    var params = {contentId:contentId,siteId:siteId};
    $.ajax({
		url : apiUrl,
		type : "POST",
		headers:{
			//"version" : appversion,
			"Content-Type" : "application/json; charset=UTF-8",
			"version" : appversion?appversion:"7.0",
			"userid" : "EWYCZpEDqvLvMhdqygXLAA==",
			//"crc" : "93916e5859cab1c7e0d72568f93fc0cb",
			"traceid" : "1231231",
			"bizop" : "queryDetailAdList",
			"biztype" : 'serviceInfo'
		 },
		data:JSON.stringify(params),
		success: function(json) {
            var obj = JSON.parse(json);
            var data = obj.data;
            if (data && data.detailAd&&data.detailAd.picUrl) {
                var href = data.detailAd.picUrl;
                $(".spreadchart").attr("link", data.detailAd.linkUrl);
                $(".spreadchart>h1").html($.trim(data.detailAd.title));
                $(".spreadchart>img").attr("src", href);
                $(".spreadchart>img").show()
            } else {
                $(".spreadchart").remove()
                $(".spreadchart").next().remove();
            }
        }
    })
}
function initSpreadChart() {/** 更新广告接口 轮播 **/
    var params = {contentId:contentId,siteId:siteId};
    $.ajax({
		url : apiUrl,
		type : "POST",
		headers:{
			//"version" : appversion,
			"Content-Type" : "application/json; charset=UTF-8",
			//"version" : appversion?appversion:"7.0",
			"userid" : "EWYCZpEDqvLvMhdqygXLAA==",
			//"crc" : "93916e5859cab1c7e0d72568f93fc0cb",
			"traceid" : "1231231",
			"bizop" : "queryContentDetailAdList",
			"biztype" : 'serviceInfo'
		 },
		data:JSON.stringify(params),
		success: function(json) {
            var obj = JSON.parse(json);
            var data = obj.data;
            if (data && data.detailAdVoList.length>0) {
              var  shtml='<div class="swiper-container"><div class="swiper-wrapper">';
                for(var i=0;i<data.detailAdVoList.length;i++){

                    shtml=shtml+'<div class="swiper-slide"><a href="'+data.detailAdVoList[i].linkUrl+'" target="_blank"><h1 style="text-align: left;">'+$.trim(data.detailAdVoList[i].title)+'</h1><img src="'+data.detailAdVoList[i].picUrl+'"/></a></div>';

                    //shtml=shtml+'<div class="swiper-slide"><a href="'+decodeURIComponent(request(data.detailAdVoList[i].linkUrl,"adUrl"))+'" onclick="ggClick('+request(data.detailAdVoList[i].linkUrl,"ggContentId")+');" target="_blank"><h1 style="text-align: left;">'+$.trim(data.detailAdVoList[i].title)+'</h1><img src="'+data.detailAdVoList[i].picUrl+'"/></a></div>';

                    }
                shtml=shtml+"</div></div>";
                $.getScript("https://moment.rednet.cn/js/swiper.min.js",function(){  //加载test.js,成功后，并执行回调函数
                $('.spreadchart').html(shtml);
                var swiper = new Swiper('.spreadchart .swiper-container',{autoplay:true,loop:true});$(".spreadchart").attr("onclick",'');$(".spreadchart").attr("link",'');
                });
           
            } else {
                $(".spreadchart").remove();
                $(".spreadchart").next().remove();
            }

        }
    })}
function getHotNews() {
    var params ={siteId:siteId,pageSize:4,contentId:contentId};
    $.ajax({
		url : apiUrl,
		type : "POST",
		headers:{
			"Content-Type" : "application/json; charset=UTF-8",
			"version" : appversion?appversion:"7.0",
			"userid" : "EWYCZpEDqvLvMhdqygXLAA==",
			"traceid" : "1231231",
			"bizop" : "queryRecentlyHotList",
			"biztype" : 'contentIndexDigest'
		 },
		data:JSON.stringify(params),
		success: function(json) {
            var obj = JSON.parse(json);
            var hotNews = obj.data&&obj.data.recentlyHotList ? obj.data.recentlyHotList: [];
            var html = [];
            for (var i = 0; i < hotNews.length; i++) { //取4条最热新闻
                html.push('<div class="swiper-slide">' + '<img src="' + hotNews[i].titleImg + '"  />' + '<a href="'+ hotNews[i].shareUrl +'">'+ hotNews[i].title +'</a></div>');
            }
            $(".footer .swiper-wrapper").append(html.join(""));
            var swiper = new Swiper('.footer .swiper-container', {
                pagination: {
                  el: '.swiper-pagination',
                },
                //自动播放时间
                autoplay:true,
                loop:true
            });
            if(hotNews.length == 0){
                $(".footer").hide();
            }
        }
    })
}

function mutiVideoCheck(){
    var plyrSvg = '<svg width="100%" height="100%" viewBox="0 0 348 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="白色按钮"><g><path d="M174,5c93.826,0 170,76.174 170,170c0,93.826 -76.174,170 -170,170c-93.826,0 -170,-76.174 -170,-170c0,-93.826 76.174,-170 170,-170Zm0,10c88.306,0 160,71.694 160,160c0,88.306 -71.694,160 -160,160c-88.306,0 -160,-71.694 -160,-160c0,-88.306 71.694,-160 160,-160Z" style="fill:#fff;"/><path d="M145.464,115.814c-2.359,-1.363 -5.261,-1.363 -7.612,0c-2.36,1.362 -3.81,3.882 -3.81,6.615l0,105.445c0,2.733 1.45,5.254 3.81,6.616c1.179,0.681 2.495,1.022 3.81,1.022c1.316,0 2.631,-0.341 3.811,-1.022l91.017,-52.723c2.351,-1.362 3.802,-3.882 3.802,-6.615c0,-2.733 -1.451,-5.254 -3.81,-6.616l-91.018,-52.722Z" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>'
    if($(".edui-faked-video").length > 0 ){
        for(var i = 0, n = $(".edui-faked-video").length; i < n; i++){
            var dom = $($(".edui-faked-video")[i]);
            var video = '<video class="video-plyr" id="player'+i+'" poster="'+dom.attr("coverImg")+'" displayType="'+dom.attr("displayType")+'" preload="auto" width="680" playsinline webkit-playinline controls><source src="' + dom.attr("urlCloud") + '"  type="video/mp4"></source></video>';
            dom.parent().append(video);
            (function(i){
                var player = new Plyr("#player"+i,{controls:['play-large', 'play', 'progress', 'current-time',  'fullscreen']})
                playList.push(player)
                player.on('ready', function(event) {
                    $(".plyr__control--overlaid svg").remove();
                    $(".plyr__control--overlaid .plyr__sr-only").before(plyrSvg)
                });
                player.on('play', function() {
                    for(var j= 0 , k= playList.length; j < k; j++){
                        if(!(player == playList[j])){
                          playList[j].pause();
                        }
                    }
                    $(".jp-jplayer").jPlayer("pause");
                });
                player.on('enterfullscreen',function(){
                    $(player.media).addClass("fullscreen")
                });
                player.on('exitfullscreen',function(){
                    $(player.media).removeClass("fullscreen")
                });
            })(i)
        }
        $(".edui-faked-video").remove();
    }
    var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;
    $(".video-plyr").css("width",680*scale +"px");
    $(".video-plyr").each(function(){
        if($(this).attr("displayType") == "1"){  //横视频展示
            $(this).css("height",(680*9/16)*scale + "px");
        }else if($(this).attr("displayType") == "2"){  //竖视频展示
            $(this).css("height",(680*16/9)*scale + "px");
        }
        
    });
    
}

function mutiVideoCheck_suspended(){
    var plyrSvg = '<svg width="100%" height="100%" viewBox="0 0 348 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="白色按钮"><g><path d="M174,5c93.826,0 170,76.174 170,170c0,93.826 -76.174,170 -170,170c-93.826,0 -170,-76.174 -170,-170c0,-93.826 76.174,-170 170,-170Zm0,10c88.306,0 160,71.694 160,160c0,88.306 -71.694,160 -160,160c-88.306,0 -160,-71.694 -160,-160c0,-88.306 71.694,-160 160,-160Z" style="fill:#fff;"/><path d="M145.464,115.814c-2.359,-1.363 -5.261,-1.363 -7.612,0c-2.36,1.362 -3.81,3.882 -3.81,6.615l0,105.445c0,2.733 1.45,5.254 3.81,6.616c1.179,0.681 2.495,1.022 3.81,1.022c1.316,0 2.631,-0.341 3.811,-1.022l91.017,-52.723c2.351,-1.362 3.802,-3.882 3.802,-6.615c0,-2.733 -1.451,-5.254 -3.81,-6.616l-91.018,-52.722Z" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>'
    var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;

    if($(".edui-faked-video").length > 0 ){
        for(var i = 0, n = $(".edui-faked-video").length; i < n; i++){
            var dom = $($(".edui-faked-video")[i]);
            var width = 680*scale;
            var tempNode;
            if (dom.attr("displayType") === "1") {
                tempNode = '<div class="video-across-preview">\n' +
                            '  <img class="video-across-img" src="'+ dom.attr("coverImg") +'" vedioUrl="'+ dom.attr("urlCloud") +'" style="width: '+ width +'px; height: '+ (680*9/16)*scale +'px !important;"></img>\n' +
                            '  <div class="btn-play">'+ plyrSvg +'</div>\n' +
                            '</div>';
                            
            } else if (dom.attr("displayType") === "2") {
                tempNode = '<video controls="controls" src="'+ dom.attr("urlCloud") +'" poster="'+ dom.attr("coverImg") +'" webkit-playsinline="" preload="" x-webkit-airplay="true" playsinline="true" style="width: '+ width +'px;" onplay="clearTopPlayVideoAcross()"></video>';
            }
            dom.parent().append(tempNode);
        }
        $(".edui-faked-video").remove();
    }

    // 内容横屏视频播放
    let $videoFixed = $(".video-fixed");
    let oPlayVideoWrapper = document.getElementById("player-video-wrapper");
    $('.content').on('click', '.video-across-preview', function() {
        window.event.stopPropagation();
        
        $playerVideoWrapper.attr("poster", $($(this).children('img.video-across-img')).attr("src"));
        $playerVideoWrapper.attr("src", $($(this).children('img.video-across-img')).attr("vedioUrl"));
        $videoFixed.removeClass('c-hide');
        oPlayVideoWrapper.play();
    })
    $(".video-close").on('click', function() {
        if (!$videoFixed.hasClass('c-hide')) {
        $videoFixed.addClass('c-hide');
        oPlayVideoWrapper.pause();
        $playerVideoWrapper.attr("poster", '');
        $playerVideoWrapper.attr("src", '');
        }
    });
}

function videoPlay(index){
    for(var i = 0 ,n = players.length; i< n;i++){
        players[i].pause();
    }
    if(index != -1){
        players[index-1]&&players[index-1].play();
    }
}

function getContentUps() {
    $.ajax({
        type: "get",
        url: frontUrl + "/content/star/" + contentId,
        success: function(data){
            $(".favNum").html(upsFomatter(data));
            $(".favNum").attr("ups", parseInt(data))
        }
    });
}
function initHotComment() {
    var params = {contentId:contentId};
    $.ajax({
		url : apiUrl,
		type : "POST",
		headers:{
			//"version" : appversion,
			"Content-Type" : "application/json; charset=UTF-8",
			"version" : appversion?appversion:"7.0",
			"userid" : "EWYCZpEDqvLvMhdqygXLAA==",
			//"crc" : "93916e5859cab1c7e0d72568f93fc0cb",
			"traceid" : "1231231",
			"bizop" : "queryContentHotCommentList",
			"biztype" : 'contentDetail'
		 },
		data:JSON.stringify(params),
		success: function(json) {
            var obj = JSON.parse(json);
			var objList = obj.data.hotCommentList;
			if (!objList  || objList.length == 0) {
                $(".hotnew-txt,.commentlist").hide();
                return
            }
            for (var i = 0; i < objList.length; i++) {
                objList[i].commentTime = objList[i].commentTime?objList[i].commentTime.substring(5):"";
                // if (!objList[i].userImg) {
                //     objList[i].userImg = apiUrl + "/rednetMoment-http/comment/images/head.png"
                // } else {
                //     if (objList[i].userImg.indexOf("http") == -1) {
                //         objList[i].userImg = imgAppUrl + objList[i].userImg
                //     }
                // }
                $("<li>" + '<div class="userimg">' + ((objList[i].headdress && objList[i].headdress != '') ?'<img src="'+objList[i].headdress+'" class="touxiang_bg" />':'') + '<img src="' + objList[i].userImg + '"  onerror="errorImg(this)"/>' + "</div>" + '<div class="commentDetail">' + ' <div class="usertitle1">' + '<span class="username">' + objList[i].commentUserName + "</span>" + "</div>" + '<div class="usertitle2">' + '<span class="commenttime">' + (objList[i].commentTime).substring(0, objList[i].commentTime.length - 3) + "</span>" + '<span class="commentarea">' + objList[i].areaSite + "</span>" + "</div>" + '<div class="comment">' + objList[i].commentText + "</div>\n" + "</div>" + "</li>").appendTo($(".commentlist"))
            }
        }
    });
}
function getViews() {
    $.ajax({
        type: "get",
        contentType: "application/json; charset=utf-8",
        url: frontUrl + "/content/clicks/"+siteId+"/" +contentId,
        dataType: 'json',
        success: function (resp) {
            if(resp != 0){
                $(".views").html("浏览量：" + upsFomatter(resp))
            }else {
                $(".views").html($(".time").last().html())
                $(".time").last().remove()
                $(".time").first().css('marginBottom','0.55rem')
            }
        }
    });
}

function visitLog() {
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: frontUrl + "/content/visit/",
        data: JSON.stringify({
            contentId: contentId,
            siteId: siteId,
            terminal: '3',
            url: window.location.href
        }),
        dataType: 'json',
        success: function (resp) {

        }
    });
}

function getRelatedContentList() {
    $.ajax({
        type: "get",
        contentType: "application/json; charset=utf-8",
        url: frontUrl + "/content/keyword/" + siteId + "/" +contentId +"/10?terminal=3",
        dataType: 'json',
        success: function (resp) {
            var html = [];
            if(resp.length > 0){
                $(".taglink-text").show();
                for(var i = 0 ,n = resp.length ; i < n; i++){
                    if ((userid && ostype) || (window.location.href.indexOf("ostype") > -1)) { // 用来判断是否客户端内打开
                        var contentUrl = resp[i].contentUrl;
                        if (contentUrl.indexOf("?") > -1) {
                            resp[i].contentUrl = resp[i].contentUrl + "&ostype=" + ostype + "&appversion=" + appversion + "&userid=" + userid + "&uuid=" + uuid + "&isNight=" + isNight;
                        } else {
                            resp[i].contentUrl = resp[i].contentUrl + "?ostype=" + ostype + "&appversion=" + appversion + "&userid=" + userid + "&uuid=" + uuid + "&isNight=" + isNight;
                        }
                    }
                    html.push('<li class="tagdetail" link="'+ resp[i].contentUrl + '" file="" onclick="openLink(this);">');
                    html.push('<div class="tagimg"><img src="'+ resp[i].urlCloud +'"></div>');
                    // html.push('<div class="tagimg"><img data-original="'+ resp[i].urlCloud +'" class="lazyload1"></div>');
                    html.push('<div class="tagtitle">'+  resp[i].title +'</div>');
                    if(resp[i].publishTimeStr){
                        html.push('<div class="taginfo">' + resp[i].publishTimeStr + '</div>');
                    }
                }
                $(".taglist").append(html.join(""));
            }
            // if($("img.lazyload1").length > 0 && $("img.lazyload1").lazyload){
            //     $("img.lazyload1").lazyload({ threshold :200,effect: "fadeIn"});
            // }
        }
    });
}

  //判断是否手机端访问
var userAgentInfo = navigator.userAgent.toLowerCase();
var Agents = ["android", "iphone",
              "symbianos", "windows phone",
              "ipad", "ipod"];
var isPc = true;
for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) >= 0) {
          isPc = false;
      }
  }
if(isPc){ 
    $("p[name='appImgDesc']").css('fontSize','28px');
    $("span[name='appImgDesc']").css('fontSize','28px')
}
if ((userid && ostype) || (window.location.href.indexOf("ostype") > -1)) {  // 判断是否客户端内打开
    $(".topic a").attr("href", $(".topic a").attr("href") + "&ostype=" + ostype + "&appversion=" + appversion + "&userid=" + userid + "&uuid=" + uuid + "&isNight=" + isNight);
    $(".hotcomment .openmoment").hide();
}

/* 回到顶部相应显示 */
$(window).scroll(function(){   
    if ($(window).scrollTop()>100){ 
        $(".back-to-top").fadeIn(700); 
    }else{
        $(".back-to-top").fadeOut(700); 
    }
});

$(".back-to-top").click(function(){   
    $('body,html').animate({ 
        scrollTop:0 
    },700);
    return false; //防止冒泡
});

/*字体设置 及显示更多设置 */
(function(){
    if($(".news").height()>7200){
        $(".news").addClass("packed")
        $(".show-article").show();
    }
    $(".show-article .more").on('click',function(){
        $(".show-article").hide();
        $(".news").removeClass("packed")
    })
    $(".font-setting").on('click',function(e){
      if($(e.target).hasClass('font-small')){
        $(".news").removeClass("big");
        $(".news").addClass("small");
      }else if($(e.target).hasClass('font-big')){
        $(".news").removeClass("small");
        $(".news").addClass("big");
      }else if($(e.target).hasClass('font-medium')){
        $(".news").removeClass("small");
        $(".news").removeClass("big");
      }else{
        return;
      }
      $(".font-setting span").removeClass("current");
      $(e.target).addClass('current')
    });
    // if($("img.lazyload").length > 0 && $("img.lazyload").lazyload){
    //     $("img.lazyload").lazyload({ threshold :200,effect: "fadeIn"});
    //     setTimeout(function () {
    //         $(window).trigger("resize");
    //     }, 50);
    // }
    // setTimeout(function(){
    //     if($(".news").height()>1200){
    //         $(".news").addClass("packed")
    //         $(".show-article").show();
    //     }
    // },500)
})();

//图像加载出错时的处理
function errorImg(img) {
	img.src = "https://moment.rednet.cn/images/head.png" //"https://app.rednet.cn/rednetMoment-http/comment/images/head.png";
	img.onerror = null;
}


(function(w,d,g,r){
    w['_wd_o']=r;
    w[r]=w[r]||function(){arguments.t=1*new Date(),(w[r].q=w[r].q||[]).push(arguments);};
    var a=d.createElement('script'),m=d.getElementsByTagName('script')[0];
    a.async=1;
    a.src=g;m.parentNode.insertBefore(a,m);
    })(window,document,'//cl3.webterren.com/webdig.js?z=41','_wa');
    _wa('wd_paramtracker', '_wdxid=000000000000000000000000000000000000000000');

/*加载百度统计代码*/
var tokenbaidu;
$(function(){
	
	$.ajax({
		//请求方式
		type : "GET",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		//请求地址
		url : frontUrl+"/site-baidu-token/get-token?siteId="+siteId+"&terminal=1",
		//请求成功
		success : function(result) {
			console.log(result);
			//token = 'e0a05e5666097628262b7497bb0b6363';
			tokenbaidu = result;
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?" + tokenbaidu;
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		},
		//请求失败，包含具体的错误信息
		error : function(e){
			console.log(e.status);
			console.log(e.responseText);
		}
	});
});

function getPosterInfo(){
    $.ajax({
		url : apiUrl,
		type : "POST",
		headers:{
			//"version" : appversion,
			"Content-Type" : "application/json; charset=UTF-8",
			"version" : appversion?appversion:"7.0",
			"userid" : "EWYCZpEDqvLvMhdqygXLAA==",
			//"crc" : "93916e5859cab1c7e0d72568f93fc0cb",
			"traceid" : "1231231",
			"bizop" : "queryContentDetail",
			"biztype" : 'contentDetail'
		 },
		data:JSON.stringify({contentId: contentId  ,siteId:siteId}),
		success: function(json) {
            var obj = JSON.parse(json);
            var data =  obj.data && obj.data.contentDetailVo
            console.log('data',data)
            // if(data.keywords.includes('江泽民')) {
            //     if(data.contentId == '12104125' || data.contentId == '12104858') {
            //         $('.header, .time, .show-article, .footer, .back-to-top').css('filter','grayscale(1)')
            //     } else {
            //         $('body').css('filter','grayscale(1)')
            //     }
            // }
            if(data.postFlag){  //是否关联了论坛帖子 ,关联了就显示 
                var poster = '<div class="poster"><div class="poster-info"><div class="poster-head"><img src="'+data.postCreatedImg+'"   onerror="posterErrorImg(this)"></div>' +
                    '<div class="poster-user"><div class="nick">'+data.postCreatedName+'</div>' +
                    '<div class="position">'+data.postCreatedTitle+'</div></div> </div>' +
                    '<div class="poster-url"><a href="'+data.postUrl+'" target="_blank">查看原帖</a></div>';
                $(".news .content").before($(poster))
                var reply =  '<div class="poster-list-wrap"><div class="poster-list-title"><img class="title-img" src="https://moment.rednet.cn/images/bg_forum_hot_posting.png">' +
                  '<div class="title-more"><a href="#" target="_blank">更多</a></div></div><div class="swiper-container poster-list"><div class="swiper-wrapper">';
                var html = [],postReplyList = data.postReplyList;
                for (var i = 0; i < postReplyList.length; i++) { //取4条最热新闻
                    html.push('<div class="swiper-slide">' + '<div class="reply-info"><div class="reply-head"><img src="'+postReplyList[i].replyImg+'"   onerror="posterErrorImg(this)"></div> ');
                    html.push('<div class="reply-user"><div class="nick">'+postReplyList[i].replyName+'</div>');
                    html.push('<div class="reply-time">' +formatTime(postReplyList[i].replyTime)+'</div></div></div>');
                    html.push('<div class="reply-content"><p>' +postReplyList[i].replyContent+'</p></div></div>');
                }
                reply = reply + html.join("")
                reply += '</div><div class="swiper-pagination"></div></div></div>';
                $("#toLike").before($(reply))
                var swiper = new Swiper('.poster-list', {
                    pagination: {
                      el: '.poster-list .swiper-pagination',
                    },
                    slidesPerView: 'auto'
                });
                
            }
            if(data.postSourceFlag){  //是否跳转到帖子
                $(".poster-url,.poster-list-title .title-more").show()
                $(".poster-url a,.poster-list-title .title-more a").prop("href",data.postUrl)
            }
        }
    })
}
setTimeout(function(){
    getPosterInfo()
},500)

//图像加载出错时的处理
function posterErrorImg(img) {
	img.src = "https://moment.rednet.cn/images/poster_default.png" //"https://app.rednet.cn/rednetMoment-http/comment/images/head.png";
	img.onerror = null;
}

function formatTime(time) {
    if(!time){
      return '/';
    }
    if ((time + '').length === 10) {
      time = +time * 1000;
    }
    const d = new Date(time);
    const now = Date.now();
  
    const diff = (now - d) / 1000;
    let month = d.getMonth() + 1;
    return ((month < 10)?('0' + month):month) + '-' + d.getDate() + ' ' + ((d.getHours() < 10)?('0' + d.getHours()):d.getHours())  + ':' + ((d.getMinutes() < 10)?('0' + d.getMinutes()):d.getMinutes())
  }
  $(".dydata").each(function(){
    var iframeHeight = $(this).prop("height");
    var iframeWidth = $(this).prop("width");
    var pageWidth = (window.innerWidth > 0) ? window.innerWidth : (screen.width)
    if(iframeWidth > pageWidth){
           var width = pageWidth *0.9;
           $(this).prop("width",width);
          $(this).prop("height",width*iframeHeight/iframeWidth);
    }
});



function ggClick(vContentId){
	
    $.ajax({url:frontUrl+"/gg-content/ggClick?ggContentId="+vContentId,success:function(result){
}});
	
}
function request(href,paras) {
            var url = href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {}
            for (i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof (returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
}

// 隐藏顶部视频悬浮框并清空
function clearTopPlayVideoAcross() {
    if (!$('.video-fixed').hasClass('c-hide')) {
        var oPlayVideoWrapper = document.getElementById("player-video-wrapper");
        var $playerVideoWrapper = $("#player-video-wrapper");
        $('.video-fixed').addClass('c-hide');
        oPlayVideoWrapper.pause();
        $playerVideoWrapper.attr("poster", '');
        $playerVideoWrapper.attr("src", '');
    }
}