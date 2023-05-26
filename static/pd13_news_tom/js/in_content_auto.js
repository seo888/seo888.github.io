$(function() {
    $('.news_box_banner_pc').html("<a class='a_img_border' href='https://qiye.tom.com/logon.html?sourceFrom=1' target='_blank'><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/video/news_box_banner_pc.jpg ' alt ><div class='guanggao'>广告</div></a>");
    $('.news_box_banner_phone').html("<a class='a_img_border' href='https://qiye.tom.com/m/logon.html?sourceFrom=1' target='_blank'><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/video/news_box_banner_phone.jpg' alt ><div class='guanggao'>广告</div></a>");
    $('#body_right_bottom_banner').html("<a class='a_img_border' href='https://vip.tom.com/intro/suixinyou.html?sourceFrom=1' target='_blank'><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_sui.jpg' alt><div class='guanggao'>广告</div></a>");
    $('.news_box_banner_pc1').html("<a class='a_img_border' href='//game.tom.com/?pop=1' target='_blank'><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_pc1.jpg' alt ><div class='guanggao'>广告</div></a>");
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
    } else {
        bp.src = '//push.zhanzhang.baidu.com/push.js'
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(bp, s);
    if ($('.infor_from_a').length > 0) {
        var href_no_space = $('span.infor_from  a').attr('href');
        href_no_space = href_no_space.replace(/\s*/g, '');
        $('span.infor_from  a').attr('href', href_no_space)
    }
    if (category == 'news' || category == 'popular' || category == 'ent' || category == 'gossip' || category == 'fashion' || category == 'finance' || category == 'biz') {
        $('.news_box_banner_pc1').html("<a class='a_img_border' href='https://vip.tom.com/register/vip.html' target='_blank'><img src='https://www.tom.com/system/modules/my.opencms.news/resources/tom/help/static/img/news_vip.jpg' alt ><div class='guanggao'>广告</div></a>")
    } else {}
});
var jsonString, A, B, C, a, b, c;
var hflag = true;

function initJson() {
    var json = null;
    $.ajax({
        type: 'GET',
        url: '//www.tom.com/hot/json/hot5.json?s=' + +new Date(),
        async: false,
        dataType: 'text',
        success: function(data) {
            json = eval('(' + data + ')')
        },
        error: function(xhr, type) {},
    });
    return json
}
$(function() {
    if (!IsPC()) {
        var valu = $('.infor_froma a').text();
        var balu;
        if (valu.indexOf('ELLE MEN睿士中文网') > -1) {
            balu = 'ELLEMEN睿士';
            $('.infor_froma').text(balu);
            $('.infor_froma').show()
        } else if (valu.indexOf('安妮福克斯健趣网') > -1) {
            balu = '健趣网';
            $('.infor_froma').text(balu);
            $('.infor_froma').show()
        } else if (valu.indexOf('C144中国通信网') > -1) {
            balu = 'Ｃ114';
            $('.infor_froma').text(balu);
            $('.infor_froma').show()
        } else if (valu.indexOf('亚洲文娱官网') > -1) {
            $('.infor_froma').show();
            balu = '亚洲文娱';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('中国葡萄酒资讯网') > -1) {
            $('.infor_froma').show();
            balu = '葡萄酒资讯';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('中国葡萄酒资讯网') > -1) {
            $('.infor_froma').show();
            balu = '葡萄酒资讯';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('中国文化传媒网') > -1) {
            $('.infor_froma').show();
            balu = '中国文化传媒网';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('太平洋家居网') > -1) {
            $('.infor_froma').show();
            balu = '太平洋家居网';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('太平洋电脑网') > -1) {
            $('.infor_froma').show();
            balu = '太平洋电脑网';
            $('.infor_froma').text(balu)
        } else if (valu.indexOf('贵州体育在线') > -1) {
            $('.infor_from').show();
            balu = '贵州体育在线';
            $('.infor_froma').text(balu)
        } else {
            $('.infor_froma').show()
        }
    }
    var imgs = $('.news_box_text img');
    if (imgs != null && imgs.length > 0) {
        if (!IsPC()) {
            for (var i = 0; i < imgs.length; i++) {
                if (($(imgs[i]).attr('src') == null || $(imgs[i]).attr('src') == '') && ($(imgs[i]).attr('data-src') != null || $(imgs[i]).attr('data-src') == 'undefind')) {
                    $(imgs[i]).attr('src', $(imgs[i]).attr('data-src').replace('85180006pimgs', '85180006mimgs'))
                }
            }
        } else {
            for (var i = 0; i < imgs.length; i++) {
                if (($(imgs[i]).attr('src') == null || $(imgs[i]).attr('src') == '') && ($(imgs[i]).attr('data-src') != null || $(imgs[i]).attr('data-src') == 'undefind')) {
                    $(imgs[i]).attr('src', $(imgs[i]).attr('data-src'))
                }
            }
        }
    }
    var from = $('.infor_from').html();
    if (from.indexOf('99健康网') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('pclady') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('pconline') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('pchouse') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('pcbaby') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('家庭医生在线') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('内涵网') > -1) {
        $('.news_box_text img').remove()
    } else if (from.indexOf('行车视线网') > -1) {
        $('.infor_from a').attr('href', '#');
        $('.infor_from a').attr('onclick', 'return false;')
    }
    if ($($('.news_box_text p')[0]).html() != null && $($('.news_box_text p')[0]).html() != '') {
        if ($($('.news_box_text p')[0]).text().replace(/\s*/g, '').length == 0 && $($('.news_box_text p')[0]).html().indexOf('<img') == -1) {
            $($('.news_box_text p')[0]).remove()
        }
    }
    if (IsPC()) {
        $('.infor_from').html($('.infor_from').html().replace('/sourcelink.html?linkfrom=', ''));
        var from = $('.infor_from').html();
        if (from.indexOf('中国网汽车') > -1 || from.indexOf('中国网科技') > -1 || from.indexOf('中国网财经 ') > -1 || from.indexOf('盖世汽车网') > -1 || from.indexOf('太平洋汽车网') > -1 || from.indexOf('中国天气网') > -1 || from.indexOf('1234笑话网') > -1 || from.indexOf('pcbaby') > -1 || from.indexOf('驱动中国') > -1 || from.indexOf('第六感') > -1 || from.indexOf('C114中国通信网') > -1 || from.indexOf('前瞻网') > -1 || from.indexOf('弈城围棋网') > -1 || from.indexOf('中国婴游网') > -1 || from.indexOf('时代财经网') > -1 || from.indexOf('BoTi体育') > -1 || from.indexOf('气象在线') > -1 || from.indexOf('电影界') > -1 || from.indexOf('球会体育') > -1 || from.indexOf('雷科技网') > -1 || from.indexOf('热点科技网') > -1 || from.indexOf('全民健康网') > -1) {} else if (from.indexOf('TOM') > -1 || from.indexOf('Tom') > -1) {
            $('.infor_from a').attr('href', 'www.tom.com')
        } else if (from.indexOf('轻壹健康') > -1) {
            $('.infor_from a').attr('href', 'www.cndoct.com')
        } else if (from.indexOf('出奇体育') > -1) {
            $('.infor_from a').attr('href', 'www.chuqi.com')
        } else if (from.indexOf('瑞尔安心网') > -1) {
            $('.infor_from a').attr('href', 'www.irealcare.com/')
        } else {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        }
    } else {
        var from = $('.infor_from').html();
        if (from.indexOf('人民网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.people.cn')
        } else if (from.indexOf('99健康网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.99.com.cn')
        } else if (from.indexOf('信报网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.stardaily.com.cn')
        } else if (from.indexOf('pclady') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//g.pclady.com.cn')
        } else if (from.indexOf('亲贝网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.qinbei.co')
        } else if (from.indexOf('快科技') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.mydrivers.com')
        } else if (from.indexOf('车质网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.12365auto.com')
        } else if (from.indexOf('球智库') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.qiuzk.com')
        } else if (from.indexOf('pcbaby') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.pcbaby.com.cn')
        } else if (from.indexOf('中国网汽车') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.china.com.cn/')
        } else if (from.indexOf('中国网财经') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.china.com.cn/')
        } else if (from.indexOf('中国天气网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.weather.com.cn/')
        } else if (from.indexOf('中国网科技') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.china.com.cn/')
        } else if (from.indexOf('购车网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.ecar168.cn')
        } else if (from.indexOf('58车') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.58che.com')
        } else if (from.indexOf('汽车江湖网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.qc188.com')
        } else if (from.indexOf('捷报比分网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.nowscore.com')
        } else if (from.indexOf('越野e族') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.fblife.com')
        } else if (from.indexOf('中国旅游网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.cntour.cn')
        } else if (from.indexOf('StyleMode中文网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.stylemode.com')
        } else if (from.indexOf('泡泡网') > -1) {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        } else if (from.indexOf('行车视线网') > -1) {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        } else if (from.indexOf('大众养生网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.cndzys.com')
        } else if (from.indexOf('么么亲子网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.enmuo.com')
        } else if (from.indexOf('怀孕网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.mama53.com')
        } else if (from.indexOf('全球婴童网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.ytpp.com.cn')
        } else if (from.indexOf('TOM') > -1 || from.indexOf('Tom') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/index2.html')
        } else if (from.indexOf('中国葡萄酒网') > -1) {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        } else if (from.indexOf('内涵网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.neihan.net')
        } else if (from.indexOf('科技新报') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//technews.cn')
        } else if (from.indexOf('科技新报') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//technews.cn')
        } else if (from.indexOf('家庭医生在线') > -1) {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        } else if (from.indexOf('越野e族网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//m.fblife.com')
        } else if (from.indexOf('中奢网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.chinaluxus.com')
        } else if (from.indexOf('科技紫微星座网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.go108.com.cn')
        } else if (from.indexOf('女人街') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.mimito.com.cn')
        } else if (from.indexOf('国华娱乐网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.guohuayule.com')
        } else if (from.indexOf('家有宝宝网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.jbaobao.com')
        } else if (from.indexOf('亚洲娱乐网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.cntvan.com')
        } else if (from.indexOf('新融街') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.xinrongnews.com')
        } else if (from.indexOf('南娱网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.southyule.com')
        } else if (from.indexOf('星关系') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.linkeddb.com')
        } else if (from.indexOf('新旅界') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.lvjie.com.cn')
        } else if (from.indexOf('砍柴网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.ikanchai.com')
        } else if (from.indexOf('红酒世界网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.wine-world.com')
        } else if (from.indexOf('有意思吧') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.u148.net')
        } else if (from.indexOf('百思不得姐') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.budejie.com')
        } else if (from.indexOf('云掌财经网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.123.com.cn/')
        } else if (from.indexOf('一比分体育网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.13322.com//')
        } else if (from.indexOf('中国棋牌网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.qipai.org.cn/')
        } else if (from.indexOf('男人窝') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.nanrenwo.net/')
        } else if (from.indexOf('中国婴游网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.youyong360.com/')
        } else if (from.indexOf('弈城围棋网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.eweiqi.com/')
        } else if (from.indexOf('网通社') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.news18a.com/')
        } else if (from.indexOf('前瞻网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.qianzhan.com/')
        } else if (from.indexOf('1234笑话网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//xiaohua.dn1234.com/')
        } else if (from.indexOf('好波网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.6383.com/')
        } else if (from.indexOf('上海有色网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.smm.cn/')
        } else if (from.indexOf('盖世汽车网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//auto.gasgoo.com/')
        } else if (from.indexOf('第六感') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//auto.gasgoo.com/')
        } else if (from.indexOf('蓝鲸TMT网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.lanjingtmt.com/')
        } else if (from.indexOf('时代财经网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.tfcaijing.com/')
        } else if (from.indexOf('驱动中国') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.qudong.com/')
        } else if (from.indexOf('BoTi体育') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=http://www.boti.net')
        } else if (from.indexOf('气象在线') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=http://www.weatherol.com/')
        } else if (from.indexOf('电影界') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.dianyingjie.com/')
        } else if (from.indexOf('轻壹健康') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.cndoct.com/')
        } else if (from.indexOf('出奇体育') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.chuqi.com/')
        } else if (from.indexOf('中国葡萄酒资讯网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.wines-info.com/')
        } else if (from.indexOf('C114中国通信网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=//www.c114.com.cn/')
        } else if (from.indexOf('球会体育') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.qiuhui.com/')
        } else if (from.indexOf('瑞尔安心网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=http://www.irealcare.com/')
        } else if (from.indexOf('雷科技网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.leikeji.com/')
        } else if (from.indexOf('热点科技网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=https://www.itheat.com/')
        } else if (from.indexOf('全民健康网') > -1) {
            $('.infor_from a').attr('href', '//www.tom.com/sourcelink.html?linkfrom=http://www.qm120.com/')
        } else {
            $('.infor_from a').attr('href', '#');
            $('.infor_from a').attr('onclick', 'return false;')
        }
    }
    a = window.document.getElementById('list-container');
    b = window.document.getElementById('body_right_banner');
    A = a.offsetHeight;
    B = b.offsetHeight;
    var url = window.location.href;
    var qrcode;
    qrcode = new QRCode(document.getElementById('weixin_share_scan'), {
        width: 70,
        height: 70
    });
    qrcode.makeCode(url);
    var qr;
    if (navigator.appName.indexOf('Microsoft') != -1) {
        if (navigator.appVersion.match(/8./i) == '8.') {
            qr = new QRCode(document.getElementById('scan_box_img'), {
                width: 86,
                height: 86
            })
        } else if (navigator.appVersion.match(/7./i) == '7.') {
            qr = new QRCode(document.getElementById('scan_box_img'), {
                width: 86,
                height: 86
            })
        }
    } else {
        qr = new QRCode(document.getElementById('scan_box_img'), {
            width: 76,
            height: 76
        })
    }
    qr.makeCode(url);
    $('.scan_box_img img').attr('alt', '');
    var source_title = $('.news_box_title').text();
    var source_description = $('meta[name=Description]').attr('content');
    var contect_title = encodeURIComponent(source_title);
    var content_description = encodeURIComponent(source_description);
    var content_url = window.location.href;
    var content_imageurl = $('meta[name=Imageurl]').attr('content');
    var weibo_title = source_title + ' ' + source_description;
    if (weibo_title.length + content_url.length > 140) {
        var title_length = 100 - content_url.length - 3;
        weibo_title = encodeURIComponent(weibo_title.substring(0, title_length) + '...')
    } else {
        weibo_title = encodeURIComponent(weibo_title)
    }
    var pics = $('.news_box_text img');
    var imgurls = '';
    for (var i = 0; i < pics.length; i++) {
        imgurls += $(pics[i]).attr('src') + ','
    }
    var qqzonestring = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + content_description + '&url=' + content_url + '&title=' + contect_title + '&pics=' + content_imageurl + '&desc=' + contect_title;
    var sinastring = 'https://service.weibo.com/share/share.php?title=' + weibo_title + '&url=' + content_url + '&content=utf-8&sourceUrl=' + content_url + '&pic=' + content_imageurl;
    $('[class$=_share]').click(function() {
        var className = $(this).attr('class');
        if (className == 'kongjian_share') {
            window.open(qqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100')
        } else if (className == 'weibo_share') {
            window.open(sinastring, 'newwindow', 'height=400,width=400,top=100,left=100')
        }
    });
    var loadingMask = window.document.getElementById('loadingimg');
    if (typeof loadingMask != undefined && loadingMask != null) {
        loadingMask.style.display = 'none'
    }
    setTimeout(changeAdFlag, 150);
    setTimeout(changeFlag, 5000);
    var obj = document.getElementById('ina_fhdb');

    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop
    }

    function setScrollTop(value) {
        document.documentElement.scrollTop = value;
        document.body.scrollTop = value
    }
    window.onscroll = function() {
        getScrollTop() > 0 ? (obj.style.display = 'block') : (obj.style.display = 'none')
    };
    obj.onclick = function() {
        var goTop = setInterval(scrollMove, 10);

        function scrollMove() {
            setScrollTop(getScrollTop() / 1.1);
            if (getScrollTop() < 1) {
                clearInterval(goTop)
            }
        }
    };
    var len = $('#ina_dh1').find('li').length;
    $('#ina_dh1').find('li').width(100 / len + '%')
});

function changeAdFlag() {
    var adspan = document.getElementById('adright');
    $('#body_right_banner').html('');
    if (!adspan) {
        $('#body_right_banner').append("<img src='https://imgs.tom.com/adsender/202009/CONTENT5551480B23EA4C9D.jpg' alt>");
        return
    }
    var adtype = document.getElementById('adright').innerText;
    if (!adtype) {
        $('#body_right_banner').append("<img src='https://imgs.tom.com/adsender/202009/CONTENT5551480B23EA4C9D.jpg' alt>");
        return
    }
    var index = parseInt(adtype);
    if (index == 0) {
        $('#body_right_banner').append("<a href='https://www.tom.com/game/adv/cpnhpz.html'  title='贪吃蛇与方块' ><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_topgam.jpg' alt></a>");
        return
    }
    if (index == 1001) {
        $('#body_right_banner').append("<a href='//qy.tom.com/webmail-static/applyUse.html' title='企邮' ><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_topmail.jpg' alt></a>")
    } else if (index == 1002) {
        $('#body_right_banner').append("<a href='//qy.tom.com/webmail-static/applyUse.html' title='企邮' ><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_topmail.jpg' alt></a>")
    } else {
        $('#body_right_banner').append("<a href='https://www.tom.com/game/adv/cpnhpz.html'  title='贪吃蛇与方块' ><img src='https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/banner/tem_topgam.jpg' alt></a>")
    }
}

function changeFlag() {
    hflag = false
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Tom'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break
        }
    }
    return flag
}
$(document).scroll(function() {
    if ($(document).scrollTop() > 120) {
        $('#content_body_left').css({
            position: 'fixed',
            top: '36px'
        })
    } else {
        $('#content_body_left').css({
            position: 'absolute',
            top: '120px'
        })
    }
});

function daodu() {
    var text = $('.news_box_text>p>em').text();
    if (text == '文章导读') {
        $('.news_box_text>p>em').css('font-size', '13px');
        $('.news_box_text>p>em').css('color', '#666666');
        $('.news_box_text>p>em').css('font-style', 'unset');
        $('.news_box_text>p').css('margin-bottom', '11px')
    }
}
$(function() {
    daodu();
    if ($('.infor_from_a').length > 0) {
        var link = $('span.infor_from > a').attr('href');
        if (!(link.indexOf('javascript:volid(0);') != -1 || link.indexOf('#') != -1 || link.indexOf('http') != -1)) {
            link = 'http://' + link;
            $('span.infor_from > a').attr('href', link)
        }
    }
});
$(function() {
    $('div.recommend_text a').each(function() {
        var urlOld = $(this).attr('href');
        urlOld = urlOld.replace('auto.tom.com', 'car.tom.com').replace('http:', '');
        $(this).attr('href', urlOld)
    })
});
window.onload = function() {
    var h = $('#recommend_pic_news').height();
    $('#markvalue').val(h)
};
$(window).scroll(function() {
    var topScroll = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop;
    var bignav = document.getElementById('recommend_pic_news');
    var top_line = $('#markvalue').offset().top;
    var heig = $('#content_body_right').height();
    if (topScroll > heig + 120) {
        if ($('#markdiv').length > 0) {
            bignav.style.position = 'fixed';
            bignav.style.top = '-10px';
            bignav.style.width = '306px';
            bignav.style.zIndex = '9999';
            return
        }
        $('#body_right_banner').after("<div id='markdiv' style='height: " + $('#markvalue').val() + "px;'></div>");
        bignav.style.position = 'fixed';
        bignav.style.top = '-10px';
        bignav.style.width = '306px';
        bignav.style.zIndex = '9999'
    } else {
        bignav.style.position = 'static';
        $('#markdiv').remove()
    }
});
$(function() {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Tom'];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break
            }
        }
        return flag
    }
    if (!IsPC()) {
        $('.tom_share').css('display', 'block')
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        $('.tom_share').css('display', 'none')
    }
});
$(function() {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Tom'];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break
            }
        }
        return flag
    }
    if (!IsPC()) {
        $('.sohu-index-v3').css('display', 'none')
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {}
});
var timer;
$('#alert_share .close').click(function() {
    $('#alert_share').hide(200);
    clearTimeout(timer)
});
$('.tom_fabulous').click(function() {
    console.log($(this));
    var uab = navigator.userAgent.toLowerCase();
    var isWeixin = uab.indexOf('micromessenger') != -1;
    if (isWeixin) {
        $('.setdata').attr('data-target', '#wxmyModal')
    } else {}
    $('#alert_share').show(200);
    clearTimeout(timer);
    if ($('#alert_share').show()) {
        timer = setTimeout(function() {
            $('#alert_share').hide(200)
        }, 10000)
    }
    if ($('#wxmyModal').hasClass('in')) {
        setTimeout(function() {
            $('#wxmyModal').modal('hide')
        }, 6000)
    }
});
$('.amodal-content').click(function() {
    $('#wxmyModal').modal('hide')
});
$('.setdata').click(function() {
    if ($('.setdata').attr('data-target') == '#wxmyModal') {
        setTimeout(function() {
            $('#wxmyModal').modal('hide')
        }, 6000)
    }
});
$('#pyq').click(function() {
    var ua = navigator.userAgent;
    var regCheck = /Tom/g;
    if (regCheck.test(ua)) {
        shareToWxpyq()
    }
});
$('#wx').click(function() {
    var ua = navigator.userAgent;
    var regCheck = /Tom/g;
    if (regCheck.test(ua)) {
        shareToWx()
    }
});
$('#pyq, #wx').click(function() {
    var u = navigator.userAgent;
    var regCheck = /Tom/g;
    if (!regCheck.test(u)) {
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        var sUserAgent = navigator.userAgent.toLowerCase();
        var userAgent = navigator.userAgent;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 && ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 && ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
            $('.sharicoimg').attr('src', 'https://www.tom.com/system/modules/my.opencms.news/resources/shareios1.png')
        } else if (isAndroid) {
            $('.sharicoimg').attr('src', 'https://www.tom.com/system/modules/my.opencms.news/resources/shareios3.png')
        }
        $('.wxAlert').show();
        setTimeout(function() {
            $('.wxAlert').hide()
        }, 6000)
    }
});
$('.wxAlert img').click(function() {
    $('.wxAlert').hide()
});
$('#back_top').click(function() {
    $(window).scrollTop(0)
});
$('#ina_fhdb').click(function() {
    $(window).scrollTop(0)
});
$(function() {
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    }
    if (isWeiXin()) {
        $('.sohu-index-v3').css('display', 'none');
        $.getScript('//res.wx.qq.com/open/js/jweixin-1.2.0.js', function() {
            $.getScript('https://www.tom.com/system/modules/my.opencms.news/resources/pc/js/weixinshare.js')
        })
    }
});
$('.bs-example-modal-lg').bind('touchmove', function(e) {
    e.preventDefault();
    e.stopPropagation()
});
var category = $('#category').val().replace(/\//g, '');
$('.formtag').html(getChannelName(category));

function getChannelName(category) {
    var channel = {
        news: '新闻',
        tv: '视频',
        tech: '科技',
        ent: '娱乐',
        sports: '体育',
        gossip: '明星',
        auto: '汽车',
        fashion: '时尚',
        game: '游戏',
        travel: '旅游',
        health: '健康',
        life: '生活',
        baby: '母婴',
        joke: '段子',
        biz: '商业',
        xiaofei: '消费',
        finance: '财经',
        mail: '邮箱',
        popular: '流行',
    };
    return channel[category]
}
$(function() {
    var createTime = $('.infor_time').text().trim();
    var url = '//like.tom.com/pageview';
    var clicked_pc_src = '//www.tom.com/system/modules/my.opencms.news/resources/pc/pic/pc_clicked.png';
    var clicked_pc_video_src = '//www.tom.com/system/modules/my.opencms.news/resources/pc/pic/video/zan_clicked.png';
    var clicked_m_src = '//www.tom.com/system/modules/my.opencms.news/resources/tom/phone_clicked1.png';
    var content_title = $('title').eq(0).text();

    function getkey() {
        var this_url = window.location.href;
        var reg = /[\w\d-]+(?=\.html)/;
        var key = this_url.match(reg);
        if (key != null) {
            return key[key.length - 1]
        }
        return null
    }

    function getCookie(name) {
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if ((arr = document.cookie.match(reg))) {
            return unescape(arr[2])
        } else {
            return null
        }
    }
    var visitor = getCookie('visitor');

    function setCookie(name, value, days) {
        days = days || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
    }
    var ajaxcs = {
        url: url + '/likenum',
        async: false,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
            title: content_title,
            createTime: createTime
        },
        success: function(data) {
            var pc_html = '赞';
            var m_html = '赞';
            if (data.like != 0) {
                pc_html = data.like + '人喜欢';
                m_html = data.like
            }
            $('#pc_like #num').text(pc_html);
            $('#m_like #num').text(m_html);
            iszan();
            if (data.uuid != null && data.uuid != '') {
                setCookie('visitor', data.uuid, 30000);
                visitor = data.uuid
            }
        },
    };

    function iszan() {
        var windowWidth = $(window).width();
        if (windowWidth < 768) {
            $('.tom_fabulousa').show()
        } else {
            $('.tom_fabulousa').hide()
        }
    }
    window.onresize = function() {
        watchChangeSize()
    };

    function watchChangeSize() {
        var windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 750) {
            $('.tom_fabulousa').show()
        } else {
            $('.tom_fabulousa').hide()
        }
    }
    if (visitor != null) {
        ajaxcs.data.uuid = visitor
    }
    $.ajax(ajaxcs);
    var title = getkey();
    var liked = false;
    if (title != null) {
        if (getCookie(title) != null) {
            liked = true;
            offlike()
        }
    }

    function offlike() {
        if ($('#pc_like').attr('type') == 'video') {
            $('#pc_like img').attr('src', clicked_pc_video_src)
        } else {
            $('#pc_like img').attr('src', clicked_pc_src);
            $('#pc_like').css('color', '#31ba52')
        }
        $('#m_like img').attr('src', clicked_m_src);
        $('#m_like').css('color', '#31ba52');
        $('#m_like').css('border-color', '#31ba52')
    }
    if (!liked) {
        $('#pc_like,#m_like').click(function() {
            $('#pc_like,#m_like').off();
            offlike();
            setCookie(title, 1);
            var source = $('#pc_like #num').html();
            var num = 1;
            if (source != '赞') {
                num = parseInt(source.match(/\d+/)[0]) + 1
            }
            $('#pc_like #num').text(num + '人喜欢');
            $('#m_like #num').text(num);
            $.get(url + '/clicklike', {
                uuid: visitor,
                title: content_title
            })
        })
    }
});
$(function() {
    var text = $('.infor_from a').text();
    if (text.indexOf('93913') != -1) {
        $('.news_box_text img').removeAttr('srcset')
    }
});
var ua = navigator.userAgent;
var regCheck = /Tom/g;
var contect_title = regCheck.test(ua) ? $('.news_box_title').text() : encodeURIComponent($('.news_box_title').text());
var content_description = regCheck.test(ua) ? $('meta[property="og:description"]').attr('content') : encodeURIComponent($('meta[property="og:description"]').attr('content'));
var content_url = window.location.href + '?fromshare=weixin';
var content_imageurl = $('meta[property="og:image"]').attr('content');
if (!content_imageurl) {
    content_imageurl = 'https://www.tom.com/system/modules/my.opencms.news/resources/pc/pic/tom_icon200.png'
} else {
    content_imageurl = content_imageurl.replace('85180006pimgs', '85180006mimgs')
}
if (regCheck.test(ua)) {
    var test = 'function shareToWx(){var title = contect_title; var digest = content_description; var url = content_url; var message = "wx"; var imageurl = content_imageurl; var sharecontent = new Array(title,digest,url,message,imageurl); try{ var sharecontent2 = {title,digest,url,message,imageurl}; window.webkit.messageHandlers.shareToClient.postMessage(sharecontent2);}catch(e){console.log(e)}; TomShareInterface.shareToClient(sharecontent); } function shareToWxpyq(){var title = contect_title+"_tom.com"; var digest =content_description; var url = content_url; var message = "pyq"; var imageurl = content_imageurl; var sharecontent = new Array(title,digest,url,message,imageurl);try{ var sharecontent2 = {title,digest,url,message,imageurl}; window.webkit.messageHandlers.shareToClient.postMessage(sharecontent2);}catch(e){console.log(e)}; TomShareInterface.shareToClient(sharecontent); } function shareToQQ(){var title = contect_title; var digest = content_description;var url = content_url; var message = "qq"; var imageurl = content_imageurl; var sharecontent = new Array(title,digest,url,message,imageurl);try{ var sharecontent2 = {title,digest,url,message,imageurl}; window.webkit.messageHandlers.shareToClient.postMessage(sharecontent2);}catch(e){console.log(e)}; TomShareInterface.shareToClient(sharecontent); } function shareToQzone(){var title = contect_title;var digest = content_description; var url = content_url; var message = "qzone"; var imageurl = content_imageurl; var sharecontent = new Array(title,digest,url,message,imageurl);try{ var sharecontent2 = {title,digest,url,message,imageurl}; window.webkit.messageHandlers.shareToClient.postMessage(sharecontent2);}catch(e){console.log(e)}; TomShareInterface.shareToClient(sharecontent); } function shareopen(){var title = contect_title+"_tom.com"; var digest = content_description; var url = content_url; var message = "dialog"; var imageurl = content_imageurl; var sharecontent = new Array(title,digest,url,message,imageurl); try{ var sharecontent2 = {title,digest,url,message,imageurl}; window.webkit.messageHandlers.shareToClient.postMessage(sharecontent2);}catch(e){console.log(e)}; TomShareInterface.shareToClient(sharecontent); }';
    document.getElementById('app').innerHTML = test;
    document.getElementById('news_box_share').style.display = 'block'
} else {
    var sj = "var url = location.href+'?fromshare=weixin'; function shareToWx(){var qrcode = document.getElementById('qrcode'); qrcode.innerHTML = '<img src=\"//qr.liantu.com/api.php?text='+ url +'\" width=\"200\" height=\"200\" />'; qrcode.style.display = 'block'; qrcode.onclick = function(){qrcode.style.display = 'none'; } } function shareToWxpyq(){var qrcode = document.getElementById('qrcode'); qrcode.innerHTML = '<img src=\"//qr.liantu.com/api.php?text='+ url +'\" width=\"200\" height=\"200\" />'; qrcode.style.display = 'block'; qrcode.onclick = function(){qrcode.style.display = 'none'; } } function shareToQQ(){location.href = '//connect.qq.com/widget/shareqq/index.html?url='+url; } function shareToQzone(){var title = contect_title;var pics = content_imageurl;var summary = content_description;location.href = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&sharesource=qzone&title='+title+'&pics='+pics+'&summary='+summary; }";
    document.getElementById('app').innerHTML = sj
}