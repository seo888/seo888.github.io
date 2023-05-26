// document.write('<script src="//img.takefoto.cn/web/skin/static/js/common.js"></script>');
document.write("<script src='//img.takefoto.cn/web/skin/static/js/layer.js'></script>");
document.write('<script src="//img.takefoto.cn/web/skin/static/js/jquery.cookie.min.js"></script>');
document.write('<script src="//img.takefoto.cn/web/skin/static/js/baseUrl.js"></script>');
document.write('<script src="//img.takefoto.cn/web/skin/static/js/ajax.js"></script>');
document.write("<script src='//img.takefoto.cn/web/skin/static/js/md5.min.js'></script>");
document.write("<script src='//img.takefoto.cn/web/skin/static/js/dayjs.min.js'></script>");

// footer选项
$('.government-universities').on('click', function (e) {
    fnFooter($(this), e);
});

$('.government-website').on('click', function (e) {
    fnFooter($(this), e);
});

$('.bjd-group').on('click', function (e) {
    fnFooter($(this), e);
});

function fnFooter(obj, e) {
    $('.ul-not-show').hide();
    obj.find('ul').show();
    e.stopPropagation();
}

$(document).on('click', function () {
    $('.ul-not-show').hide();
});


//图集
$(function () {
    $('.bjd-theory-imgBlack:eq(1)').mouseover();
    $(".nav-more a").popover({
        placement: 'bottom',
        html: true,
        trigger: 'click',
        content: $(".nav-more-ct").html(),
    });
});

$('.bjd-theory-imgBlack').on('mouseover', function () {
    $('.bjd-theory-imgBlack').removeClass('activetheory')
    $('.bjd-theory-imgBlack').find("div:eq(0)").removeClass('activetheoryp')
    $('.bjd-theory-imgBlack').find("div:eq(1)").removeClass('theoryShow');
    $(this).addClass('activetheory');
    $(this).find("div:eq(0)").addClass('activetheoryp');
    $(this).find("div:eq(1)").addClass('theoryShow');
});

$(function () {
    $('.bjd-theory-imgBlack.theory-data-src').each(function () {
        this.style.background = "url(" + this.getAttribute('data-src') + ") no-repeat center";
        this.style.backgroundSize = "/ 100%";
    })
});


// 页面置顶
$("#toTop").on('click', function () {
    $('html,body').animate({ scrollTop: 0 }, Math.ceil($('html')[0].offsetHeight / 10));
});


//集团介绍
$('.baibutton').on('click', function () {
    console.log($(this));
});

$(".nav.nav-tabs.nav-tab-btn li").on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).find('.bjd-crumbs-black').addClass('active').parent().siblings().find('.bjd-crumbs-black').removeClass('active');
});

//视频控制播放js
$(function () {
    $('.bjd-article-centent p video').attr('controls', 'controls');
});

//二级栏目页footer统一js
function isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) return true;
    return false;
}

$(function () {
    if (isMobile()) {
        var url = "//wap.bjd.com.cn/";
        window.location.href = url;
    }
});

$(function () {
    var s_3721 = document.createElement("script");
    var refs_3721 = document.referrer;
    var parts = null;
    s_3721.type = "text/javascript";
    s_3721.async = true;
    if (refs_3721.indexOf("http") != -1) {
        parts = refs_3721.split("?");
        if (parts != null && parts.length > 1) {
            refs_3721 = parts[0];
        }
    }
    s_3721.src = "//trace.bjd.com.cn/tj_tool.js?ref=" + refs_3721 + "&title=" + encodeURI(document.title);
    var x_3721 = document.getElementsByTagName("script")[0];
    x_3721.parentNode.insertBefore(s_3721, x_3721);
});

//图片详情页js
$(function () {
    $('.bottom-bar ul').css('width', $('.bottom-bar img').length * 232 + 'px');
    $('.bottom-bar ul li a').each(function () {
        let src = $(this).find('img').attr('src');
        $(this).css({
            'background': 'url(' + src + ') no-repeat center',
            'background-size': 'contain'
        })
    });
});

//图片二级页js
$(function () {
    $(".nav-more-ctdianzi").popover({
        placement: 'bottom',
        html: true,
        trigger: 'click',
        content: $("div.nav-more-ctdianzi").html(),
    });
    $('.bjd-header-menu ul li').eq(0).attr('class', 'active');
    $('.bjd-header-menu ul li').on('mouseover', function () {
        $('.bjd-header-menu ul li').eq(0).removeClass('active');
    });
    $('.bjd-header-menu ul li').on('mouseout', function () {
        $('.bjd-header-menu ul li').eq(0).addClass('active');
    });
});

$(function () {
    $(".bjh-more-btn").popover({
        placement: 'bottom',
        html: true,
        trigger: 'click',
        content: $(".bjh-more-ct").html(),
    });
    $(".nav-more-ctdianzi").popover({
        placement: 'bottom',
        html: true,
        trigger: 'click',
        content: $("div.nav-more-ctdianzi").html(),
    });
});

//集团介绍
$('.tab-nav-aboutul li').on('click', function () {
    $('.tab-nav-aboutul li').removeClass('active');
    $('.tab-nav-aboutul li').children('.tab-nav-aboutspan').hide();
    $('.tab-nav-aboutul li').children('a').removeClass('active');
    $('.tab-nav-aboutul li').children('a').removeAttr('class', 'tab-nav-abouttext');
    $('.tab-nav-aboutul li').children('a').addClass('dtnaa');
    $(this).addClass('active');
    $(this).children('.tab-nav-aboutspan').show();
    $(this).children('a').removeClass('dtnaa');
    $(this).children('a').addClass('tab-nav-abouttext active');
    $('.tab-content').children().removeClass('tab-pane fade in active show');
    $('.tab-content').children().addClass('tab-pane fade in');
    $($(this).children('a').attr('href')).addClass('tab-pane fade in active show');
});

$('.bjd-header-search-append').on('click', function () {
    var itext = encodeURIComponent($('.bjd-header-search-input').val());
    window.open('/common/bjd_search.shtml?keyboard=' + itext);
});
$("input[name='q']").bind('keyup', function (event) {
  if (event.keyCode == "13") {
    var itext = encodeURIComponent($('.bjd-header-search-input').val());
    window.open('/common/bjd_search.shtml?keyboard=' + itext);
  }
});
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm--baidu--com--01057tk3b7ba0.wsipv6.com/hm.js?162a2ae8b540393bd5792dda2692396e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function openLogin() {
    $(".login-mask").fadeIn(100)
    $(".login-model").fadeIn(100)
}
function closeLogin() {
  $(".login-mask").fadeOut(100)
  $(".login-model").fadeOut(100)
}
$(document).ready(function () {
$(".bjd-article-main .collection").show()
$(".bjd-article-main .collection").attr("title","收藏")
$(".login-btn").click(function () {
    if ($.cookie('isLogin') == '1') {
        window.location.href = '//www.bjd.com.cn/common/user_info.shtml'
    } else {
        $(".login-mask").fadeIn(100)
        $(".login-model").fadeIn(100)
    }
})
$(".login-mask").click(function () {
    closeLogin()
    $("body").css("overflow", "auto")
    $(".model-fixed").hide();
})
})

$(".bjd-article-main .article-tools div").hover(function () {
    if (!$(this).hasClass("collection")) {
        $(this).children("img.d").hide()
        $(this).children("img.s").show()
        if ($(this).attr('class') == 'article-tools-wechat' || $(this).attr('class') == 'article-tools-phone') {
            $(this).find(".tools-qrcode").show()
        }
    }
}, function () {
    if (!$(this).hasClass("collection")) {
        $(this).children("img.d").show()
        $(this).children("img.s").hide()
        $(this).find(".tools-qrcode").hide()
    }
})
