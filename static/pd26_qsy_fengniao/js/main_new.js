$(document).ready(function () {
    qnPlayerShow();
});
//m3u8������
function qnPlayerShow() {
    for (var i = 0; i < $('.qiniu-player').length; i++) {
        var playerId = $('.qiniu-player').eq(i).attr('id');
        var playerUrl = $('.qiniu-player').eq(i).attr('data-url');
        new QPlayer({url: playerUrl, container: document.getElementById(playerId), autoplay: false, loggerLevel: 3});
    }
}
//����ͼ��ť
function goGroup(imgCon, imgBtn, goBtn) {
    //imgCon	����ͼƬ��������
    //imgBtn	��ť���壻
    //goBtn		��ť�ϵ�����Ӱ�ť��

    var btnBgUrl = 'http://icon.fengniao.com/article/images/go-group24.png';	//ͼƬ��ַ��
    var btnText = '�鿴��ͼ';				//��ť�İ������ĸ����֣�
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

//��ӿ�ͼҳ
function article_rurl() {
    var isTest = (location.host === 'preview.cms.fengniao.com') ? true : false;
    if (isAll == 1) {
        return false;
    }
    if (docId == '4075377') {//��ƪ�������������������ų⣬���Բ�����
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
 * ���µ�����Ⱥ���
 */
function articleZan(type, documentId) {
    var type = parseInt(type);
    var info = {'type': type, 'documentId': documentId};
    //Ajax����
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
            //alert("����ʧ�ܣ�");
        }
    });
}

//��Ҷ��ڿ�
$(".look-list li").mouseover(function () {
    $(".look-list li").removeClass("now");
    $(this).addClass("now");
});

//��̳����
$(".tab-title li a").mouseover(function () {
    $(".tab-title li a").removeClass("tabs-focus");
    $(this).addClass("tabs-focus");
    var num = $(this).parent().index();
    $('#tab-cont-1 div').css('display', 'none');
    $('#tab-cont-1 div').eq(num).css('display', 'block');
});

//�����¼���ҳ
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
    // ��ҳ����Ч��
    function pic_centered() {
        var elem = $('.page-ul').css({'position': 'relative'});
        var tw = elem.width();
        var pw = elem.parent().width();
        var v = (pw - tw) / 2;
        elem.css('left', v + 'px');
    }
    pic_centered();

    var documentId = $("#article_rootid").val();

    //������������  ������ ����
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
        //async:false,	//ͬ��
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

    //Ҫ��Ҫ��ʾadword�ڵ�
    var adwordFlg = $('.adword ul>li').length;
    if (!adwordFlg) {
        $('.adword').remove();
    }
});


//�Ϸ��ķ�������
$("#shareBtn").mouseover(function () {
    $(this).addClass("hover");
}).mouseout(function () {
    $(this).removeClass("hover");
});

//����΢������ӿ�
function sinaShare(pic) {
    var title = document.title;
    var url = document.location;
    var _w = 72, _h = 16;
    var param = {
        url: url,
        type: '3',
        count: '', /**�Ƿ���ʾ��������1��ʾ(��ѡ)*/
        appkey: '3397900440', /**�������Ӧ��appkey,��ʾ������Դ(��ѡ)*/
        title: '@������ ��' + title, /**�������������(��ѡ��Ĭ��Ϊ����ҳ���title)*/
        pic: pic, /**����ͼƬ��·��(��ѡ)*/
        //ralateUid: '1721284411', /**�����û���UID������΢����@���û�(��ѡ)*/
        language: 'zh_cn', /**�������ԣ�zh_cn|zh_tw(��ѡ)*/
        rnd: new Date().valueOf() /**�õ�ԭʼ��ʱ��ֵ*/
    }
    var temp = [];
    for (var p in param) {
        /**encodeURIComponent() �����ɰ��ַ�����Ϊ URI ������б��롣*/
        temp.push(p + '=' + encodeURIComponent(param[p] || ''))
    }
    var url = 'http://service.weibo.com/share/share.php?' + temp.join('&') + 'width=' + _w + 'height=' + _h;
    window.open(url);
}

//-----------΢�ŷ���
var _url = $('#m_url').val();
// ���ò�����ʽ
var qrcode = new QRCode('qrcode', {
    text: _url,
    width: 208,
    height: 208
});
function createQrcode(url) {
    qrcode.clear();
    qrcode.makeCode(url);
}
//    ��������ά��
function weiXin() {
    $('.weixinBox').show();
    $('.weixinBox .close').unbind('click').bind('click', function () {
        $('.weixinBox').hide();
    })
}