$(document).ready(function () {
    qnPlayerShow();
});
//m3u8播放器
function qnPlayerShow() {
    for (var i = 0; i < $('.qiniu-player').length; i++) {
        var playerId = $('.qiniu-player').eq(i).attr('id');
        var playerUrl = $('.qiniu-player').eq(i).attr('data-url');
        new QPlayer({url: playerUrl, container: document.getElementById(playerId), autoplay: false, loggerLevel: 3});
    }
}
//看大图按钮
function goGroup(imgCon, imgBtn, goBtn) {
    //imgCon	包含图片的容器；
    //imgBtn	按钮整体；
    //goBtn		按钮上点击链接按钮；

    var btnBgUrl = 'http://icon.fengniao.com/article/images/go-group24.png';	//图片地址；
    var btnText = '查看大图';				//按钮文案，限四个汉字；
    $('body').append('<style>.img-extend { display:none; position:absolute; left:0; top:0; *zoom:1; overflow:hidden; z-index:10;}.img-extend .go-group{ display:block; width:60px; height:28px; padding-left:28px; background:url(' + btnBgUrl + ') no-repeat; _background:none; _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=' + '"' + 'true' + '"' + ',src=' + '"' + btnBgUrl + '"' + ',sizingMethod=' + '"' + 'scale' + '"' + ') ; font:bold 12px/28px Arial; color:#fff; cursor:pointer;}.img-extend .go-group:hover { color:#fff!important; text-decoration:none;}</style><div class=' + '"' + 'img-extend' + '"' + '><a href=' + '"' + '#' + '"' + ' class=' + '"' + 'go-group' + '"' + ' title=' + '"' + btnText + '"' + ' target=' + '"' + '_blank' + '"' + '>' + btnText + '</a></div>');
    var btnTimer = null;
    $(imgCon + ' img').hover(function () {
        clearTimeout(btnTimer);
        var imgBody = {
            'imgX': $(this).offset().left,
            'imgY': $(this).offset().top,
            'imgW': this.offsetWidth,
            'imgH': this.offsetHeight,
            'imgUrl': $(this).parents('a').attr('href') || false,
            'imgTit': $(this).attr('title') || btnText
        };

        if (!imgBody.imgUrl) {
            return false;
        }

        var btnBody = {
            'btnW': $(imgBtn).outerWidth(true),
            'btnH': $(imgBtn).outerHeight(true)
        };

        $(goBtn).attr({
            'href': imgBody.imgUrl,
            'title': imgBody.imgTit
        });

        $(imgBtn).css({
            'left': imgBody.imgX + imgBody.imgW - btnBody.btnW - 10,
            'top': imgBody.imgY + imgBody.imgH - btnBody.btnH - 10
        }).show();

    }, function () {
        btnTimer = setTimeout(function () {
            $(imgBtn).hide();
        }, 15);
    });

    $(imgBtn).hover(function () {
        clearTimeout(btnTimer);
        $(this).show();
    });

    $(window).resize(function () {
        $(imgBtn).hide();
    }, function () {
        btnTimer = setTimeout(function () {
            $(imgBtn).hide();
        }, 15);
    });
}

//添加看图页
function article_rurl() {
    var isTest = (location.host === 'preview.cms.fengniao.com') ? true : false;
    if (isAll == 1) {
        return false;
    }
    if (docId == '4075377') {//这篇文章有问题对这个方法排斥，所以不用他
        return false;
    }
    var article_c = $('.txt-wrap').html();
    //var img_re = /href="http:\/\/img2.fengniao.com\/product\/\d+\/\d+\/.+?\.[jpgnbmeif]{3,4}/g;
    var img_re = /href="https:\/\/cms.qn.img-space.com\/product\/\d+\/\d+\/.+?\.[jpgnbmeif]{3,4}/g;
    var img_re_img = /href="http:\/\/img2.fengniao.com\/g\d+\/M00\/\d+\/\w+\/.+?\.[jpgnbmeif]{3,4}/g;
    var img_re_cms = /href="http:\/\/cms.fn.img-space.com\/g\d+\/M00\/\d+\/\w+\/.+?\.[jpgnbmeif]{3,4}/g;
    var img_cnt = 1;
    var img_url = "";
    img_url = img_re.exec(article_c);
    if (img_url == null) {
        img_url = img_re_img.exec(article_c);
    }
    if (img_url == null) {
        img_url = img_re_cms.exec(article_c);
    }
    while (img_url != null) {
        if (isTest) {
            article_c = article_c.replace(img_url, 'href="pic.php?id=' + docId + '&num=' + img_cnt);
        } else {
            article_c = article_c.replace(img_url, 'href="pic_' + docId + '_' + img_cnt + '.html');
        }
        img_url = img_re.exec(article_c);
        if (img_url == null) {
            img_url = img_re_img.exec(article_c);
        }
        if (img_url == null) {
            img_url = img_re_cms.exec(article_c);
        }
        img_cnt++;
    }
    $('.txt-wrap').html(article_c);
}

//article_rurl();
goGroup('.txt-wrap', '.img-extend', '.img-extend .go-group');


/**
 * 文章的赞与踩函数
 */
function articleZan(type, documentId) {
    var type = parseInt(type);
    var info = {'type': type, 'documentId': documentId};
    //Ajax操作
    $.ajax({
        url: 'https://comment.fengniao.com/2015/AjaxArticle.php?t=' + Math.random(),
        type: 'GET',
        data: info,
        dataType: "jsonp",
        jsonp: 'callback',
        //async:false,
        success: function (data) {
            if (data.flag == 1) {
                if (type == 1) {
                    var w = 'good';
                } else {
                    var w = 'bad';
                }
                var oldZan = $("#" + w + "_" + documentId).text();
                var newZan = parseInt(oldZan) + 1;
                //alert(data.meg);
                $("#" + w + "_" + documentId).text(newZan);
                return false;
            }
            //alert(data.meg);
            return false;
        },
        error: function () {
            //alert("操作失败！");
        }
    });
}

//大家都在看
$(".look-list li").mouseover(function () {
    $(".look-list li").removeClass("now");
    $(this).addClass("now");
});

//论坛帖子
$(".tab-title li a").mouseover(function () {
    $(".tab-title li a").removeClass("tabs-focus");
    $(this).addClass("tabs-focus");
    var num = $(this).parent().index();
    $('#tab-cont-1 div').css('display', 'none');
    $('#tab-cont-1 div').eq(num).css('display', 'block');
});

//键盘事件翻页
document.onkeydown = function (b) {
    b = (b) ? b : window.event;
    var keycode = b.keyCode;
    if (keycode == 37) {
        var pre = document.getElementById("previousPage");
        if (pre) {
            var preUrl = pre.getAttribute("href");
            window.location.href = preUrl;
        }
    }
    if (keycode == 39) {
        var next = document.getElementById("nextPage");
        if (next) {
            var nextUrl = next.getAttribute("href");
            window.location.href = nextUrl;
        }
    }
}

$(document).ready(function () {
    // 分页居中效果
    function pic_centered() {
        var elem = $('.page-ul').css({'position': 'relative'});
        var tw = elem.width();
        var pw = elem.parent().width();
        var v = (pw - tw) / 2;
        elem.css('left', v + 'px');
    }
    pic_centered();

    var documentId = $("#article_rootid").val();

    //文章评论总数  点赞数 踩数
    var totalComment = 0;
    var good_hits = 0;
    var bad_hits = 0;
    var info = {'id': 1, 'action': 'totalComment', 'documentid': documentId};
    $.ajax({
        url: 'https://comment.fengniao.com/2015/AjaxComment.php?t=' + Math.random(),
        type: 'GET',
        data: info,
        dataType: "jsonp",
        jsonp: 'callback',
        //async:false,	//同步
        success: function (data) {
            totalComment = data.total;
            good_hits = data.good_hits;
            bad_hits = data.bad_hits;
            //$('#comment-num').text(totalComment);
            //$('#comment-num1').text(totalComment);
            $('#good_' + documentId).text(good_hits);
            $('#bad_' + documentId).text(bad_hits);
        },
        error: function () {
        }
    });

    //要不要显示adword节点
    var adwordFlg = $('.adword ul>li').length;
    if (!adwordFlg) {
        $('.adword').remove();
    }
});


//上方的分享下拉
$("#shareBtn").mouseover(function () {
    $(this).addClass("hover");
}).mouseout(function () {
    $(this).removeClass("hover");
});

//新浪微博分享接口
function sinaShare(pic) {
    var title = document.title;
    var url = document.location;
    var _w = 72, _h = 16;
    var param = {
        url: url,
        type: '3',
        count: '', /**是否显示分享数，1显示(可选)*/
        appkey: '3397900440', /**您申请的应用appkey,显示分享来源(可选)*/
        title: '@蜂鸟网 ：' + title, /**分享的文字内容(可选，默认为所在页面的title)*/
        pic: pic, /**分享图片的路径(可选)*/
        //ralateUid: '1721284411', /**关联用户的UID，分享微博会@该用户(可选)*/
        language: 'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
        rnd: new Date().valueOf() /**拿到原始的时间值*/
    }
    var temp = [];
    for (var p in param) {
        /**encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。*/
        temp.push(p + '=' + encodeURIComponent(param[p] || ''))
    }
    var url = 'http://service.weibo.com/share/share.php?' + temp.join('&') + 'width=' + _w + 'height=' + _h;
    window.open(url);
}

//-----------微信分享
var _url = $('#m_url').val();
// 设置参数方式
var qrcode = new QRCode('qrcode', {
    text: _url,
    width: 208,
    height: 208
});
function createQrcode(url) {
    qrcode.clear();
    qrcode.makeCode(url);
}
//    点击分享二维码
function weiXin() {
    $('.weixinBox').show();
    $('.weixinBox .close').unbind('click').bind('click', function () {
        $('.weixinBox').hide();
    })
}