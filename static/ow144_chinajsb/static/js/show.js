function initNum(o, e) {
    var t = {
        url: " http://api.chinajsb.cn/show.php?s=/Readnum/readnum",
        type: "get",
        data: {type: "article", id: $("#articleId").val(), record: o},
        fn: function (t) {
            "read" == o && $("#readNum").html(t.PVcount), $("#likeNum").html(t.praisePvcount), e && $(".like").addClass("suported")
        }
    };
    $K_GLOBAL.requestFn(t)
}

$(function () {
    //微信分享
    var o = $("#articleId").val();
    var jweixin = document.createElement('script');
    jweixin.setAttribute('type', 'text/javascript');
    jweixin.setAttribute('src', 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
    document.body.appendChild(jweixin);
    var new_element = document.createElement('script');
    new_element.setAttribute('type', 'text/javascript');
    new_element.setAttribute('src', 'http://www.chinajsb.cn/Public/m_zhuj/dist/js/config.js');
    document.body.appendChild(new_element);
    $.ajax({
        type: "post",
        url: "http://api.chinajsb.cn/show.php?s=/Api/shareInfo",
        dataType: "json",
        data: {docid: o},
        success: function (res) {
            console.log(res)
            ZW_config(res.data.photo, res.data.title, res.data.summary)
        }
    })


    console.log(o);
    var e = $K_GLOBAL.getCookie(o);
    $.ajax({
        type: "get",
        url: "http://api.chinajsb.cn/show.php?s=/Readnum/readnum",
        dataType: "json",
        data: {type: "article", id: o, record: "read"},
        success: function (t) {
            $("#readNum").html(t.PVcount), "" != e ? ($("#likeNum").html(e), $(".like").addClass("suported")) : $("#likeNum").html(t.praisePvcount)
        }
    }), $(".like").on("click", function () {
        "" == e ? $.ajax({
            type: "get",
            url: "http://api.chinajsb.cn/show.php?s=/Readnum/readnum",
            dataType: "json",
            data: {type: "article", id: o, record: "praise"},
            success: function (t) {
                $("#likeNum").html(t.praisePvcount), $(".like").addClass("suported"), $K_GLOBAL.setCookie(o, t.praisePvcount, 1)
            }
        }) : console.log("已点赞")
    }), getList(), $K_GLOBAL.getCookie("zhujaccesstoken") ? ($(".noLogin").hide(), $(".isLogin").show().find("img").attr("src", $K_GLOBAL.userInfo.avatar)) : ($(".isLogin").hide(), $(".noLogin").show());
    var a = !1, n = $(window).width() < 750 ? "touch" : "pc";
    if (n === "touch") {
        if ($K_GLOBAL.userInfo.avatar) {
            $('.top .toLogin').css('background', 'url(' + $K_GLOBAL.userInfo.avatar + ') 50% 50%/cover');
        }
    }

    $(".commentSubmit").click(function () {
        var t = $("#articleId").val(), o = $K_GLOBAL.getCookie("zhujaccesstoken");
        a || (a = !1, $.ajax({
            type: "post",
            url: "http://api.chinajsb.cn/show.php?s=/Comment/addComment",
            dataType: "json",
            data: {token: o, docid: t, userId: $K_GLOBAL.userInfo.uid, comment: $("#commentInput").val(), cmt_from: n},
            success: function (t) {
                layer.msg(t.errmsg), setTimeout(function () {
                    a = !1
                }, 500)
            },
            error: function (t) {
                getListLock = !1, $(".hasComment").hide(), $(".noComment").show()
            }
        }))
    })
    $('.content p').each(function (index, element) {
        if ($(element).children(".upload_pic").attr('class') === 'nd-element upload_pic') {
            $(element).css('textIndent', '0em')
        }
    })
    // 广告位
    $.ajax({
        type: "post",
        url: "http://api.chinajsb.cn/show.php?s=/Api/getChannelAd",
        dataType: "json",
        success: function (t) {
            $('.fl div:eq(0)').children().attr({
                "src": t.data[0]['position1'].imgurl,
                "style": "height:inherit; width:100%"
            });
            $('.ad a').attr('href', t.data[2]['position5'].outlink)
            $('.ad a').children().attr('src', t.data[2]['position5'].imgurl)
            $('.column_picture a').attr('href', t.data[3]['position6'].outlink)
            $('.column_picture a').children().attr('src', t.data[3]['position6'].imgurl)
        },
        error: function (t) {
        }
    })

    $("body").append('<footer class="footer_zw"><p>中国建设新闻网</p><p>&#169 2001-2019 CHINAJSB.CN All Rights Reserved.</p><p>中国建设报社版权所有 京ICP备05051626号-1</p><p>制作单位：中国建设报社</p><p>互联网新闻信息服务许可证10120190011号</p><p>违法和不良信息举报电话：010-58934834</p></footer>')
});
var getListLock = !1;

function getList(i) {
    var t = $("#articleId").val();
    getListLock || (getListLock = !0, $.ajax({
        type: "post",
        url: "http://api.chinajsb.cn/show.php?s=/Comment/getCommentList",
        dataType: "json",
        data: {docid: t, count: i || 0},
        success: function (t) {
            var o = t.data.list, e = "";
            if (o && 0 < o.length) {
                for (var a = 0; a < o.length; a++) e += '<li><div class="img"><img src="' + o[a].avatar + '" alt=""></div><div><p class="user">' + o[a].username + "<span>" + o[a].ctime + '</span></p><p class="content">' + o[a].comment + "</p></div></li>";
                $(".hasComment ul").find("a").before(e);
                var n = $(".loadMore").data("count");
                $(".loadMore").data("count", n + 20), o.length == t.data.rows ? 0 == i && loadInit() : ($(".loadMore").hide(), scrollLock = !0), setTimeout(function () {
                    getListLock = !1
                }, 500), $(".hasComment").show(), $(".noComment").hide()
            } else $(".hasComment").hide(), $(".noComment").show()
        },
        error: function (t) {
            getListLock = !1, $(".hasComment").hide(), $(".noComment").show()
        }
    }))
}

var scrollLock = !1;

function loadInit() {
    $(window).scroll(function () {
        if (!scrollLock) {
            var t = $(window).height() + $(document).scrollTop();
            $(".loadMore").offset().top < t && getList($(".loadMore").data("count"))
        }
    })
}
