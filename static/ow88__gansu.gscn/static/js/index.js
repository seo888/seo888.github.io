$("#h-adv").html("<a href='http://gansu.gscn.com.cn/system/2023/03/15/012924981.shtml' target='_blank'><img src='http://www.gscn.com.cn/pic/003/015/172/00301517282_64acb923.png' alt='“2023年甘肃省“迎老乡·回故乡·建家乡” 主题征文、短视频征集大奖赛公告' style='margin-right:19px'></a><a href='http://gansu.gscn.com.cn/zhoukan/' target='_blank'><img src='http://www.gscn.com.cn/cms_sys/cms_template/100/000/732/images/lzhoukan.gif' alt='陇周刊-壹周甘肃新闻荟萃'></a>");
$("#ads").html("<a href='http://cx.gscn.com.cn/' target='_blank'><img src='http://www.gscn.com.cn/cms_sys/cms_template/100/000/732/images/dlx.jpg' alt='鼎立信' style='margin-right:19px'></a>");
$(function(){
$('video').bind('contextmenu',function() { return false; });
        $("#m-header i").on("click",function(){
            $("body").css({"height":"100%","overflow":"hidden"});
            $(".mask").fadeIn();
            $("#show_box").fadeIn();
        });
        $(".box_footer").on("click",function(){
            $("#show_box").fadeOut();
            $(".mask").fadeOut();
            $("body").css({"height":"auto","overflow":"scroll"});
        });

	$("#weixin-ns").on("click",function(){
		$(".sns-share").css("display","block");
		 $("body").css({"overflow":"hidden"}); 
	});
	$(".sns-share").on("click",function(){
		// $(".sns-share").css("display","none");
		$(this).hide();
		 $("body").css({"overflow":"scroll"}); 
	});

	if($('.main').height() > $('.sub').height()){
	$('.sub').height($('.main').height() - 50);
}

	// 滚动监听，侧栏自动定位
	/*t = $('#fixed').offset().top;
	mh = $('.main').height();
	$('.sub').height(mh);
	fh = $('#fixed').height();
	$(window).scroll(function(){
		if($('#fixed').offset().top == 0){
			$('#fixed').css({'position':'fixed','top':'0'});
		}
		s = $(document).scrollTop();	
		if(s > t - 10){
			$('#fixed').css('position','fixed');
			if(s + fh < mh){
				$('#fixed').css('top',mh-s-fh+'px');	
			}				
		}else{
			$('#fixed').css('position','');
		}*/
})
// news api
function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadApi() {
    var urlarr = window.location.href.split('/')
    newsId = urlarr[urlarr.length - 1].split('.')[0]
    spm.config({
        siteId: 'zm5104-001',
        additionalInfo: {
            targetID: newsId,
            organization: 'zm5104',
            // 上报进入事件
            category: 'event',
            action: 'comeIn'
        }
    })
}
if(window.location.href.split('/').length==8) {
    loadScript('https://p.wts.xinwen.cn/dot-wts/spm.js', loadApi)
}
window.onbeforeunload = function() {
    spm.push({category:'event',action:'leave'})
}

// share api

var wxShareHref = window.location.href;

if (/\?from=/ig.test(wxShareHref)) {
    var noJump = /nojump/ig.test(wxShareHref);
    if (noJump == false) {
        window.location.href = wxShareHref.split('?from=')[0];
    }
}

var json_wx = {
    'jsonpurl': (function(callback) {
        var str, loc = wxShareHref.substring(0, wxShareHref.indexOf('#') < 0 ? undefined : wxShareHref.indexOf('#'));
        str = "http://api.gscn.com.cn/jsapi?callback=cb" + "&url=" + encodeURIComponent(loc) + "&time=" + (new Date()).getTime();
        return str;
    })(),
    'createTag': function(url) {
        var wxcomm = document.createElement("script");
        wxcomm.src = 'https://res.wx.qq.com/open/js/jweixin-1.4.0.js';
        document.querySelector("head").appendChild(wxcomm);
        var tag = document.createElement("script");
        tag.src = url;
        document.querySelector("body").appendChild(tag);
    }
};

function cb(data) {
    if (data.code !== 200) console.log("shibai");
    wx.config({
        debug: false,
        appId: data.content.appId,
        timestamp: data.content.timestamp,
        nonceStr: data.content.nonceStr,
        signature: data.content.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });
    wx.ready(function() {

        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function(res) {}
        });

        var shareTit = document.querySelector(".artical .a-header h1").innerHTML.trim();
        var sharesum = document.querySelector(".share-substr") ? document.querySelector(".share-substr").innerHTML.trim() : document.querySelector(".artical .a-header h1").innerHTML.trim();
        var shareImg = document.querySelector(".sns-share-icon").nodeName.toLowerCase() === "div" ? document.querySelector(".sns-share-icon").querySelector("img").src : document.querySelector(".sns-share-icon").src

        var shareUrl = wxShareHref;
        wx.onMenuShareAppMessage({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });

        wx.onMenuShareTimeline({
            title: shareTit,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });

        wx.onMenuShareQQ({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function(res) {},
            complete: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });

        wx.onMenuShareWeibo({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function(res) {},
            complete: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });

        wx.onMenuShareQZone({
            title: shareTit,
            desc: sharesum,
            link: shareUrl,
            imgUrl: shareImg,
            trigger: function(res) {},
            complete: function(res) {},
            success: function(res) {},
            cancel: function(res) {},
            fail: function(res) {}
        });
    });
    wx.error(function(res) {});
}

(function(isM) {
    var _mob = isM || false;
    _mob ? (json_wx.createTag(json_wx.jsonpurl)) : null;
})((function(w) {
    var ua = w.navigator.userAgent.toLowerCase(),
        isMatchMob = /phone|pad|pod|iphone|ipod|ios|ipad|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone|micromessenger/gi.test(ua) ? true : false;;
    return isMatchMob;
})(window));<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2023-03-22 11:03:05" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->