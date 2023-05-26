
var lwt_catid = $("#info").data('catid');
var lwt_type = $("#info").data('type');

if (lwt_catid) {

    if (lwt_type == 'sz') {
        $.getJSON('http://www.shuren100.com/api/jiaoyu_weixin/get_wx_article.php?callback=?', {
            type: "get_zx_article",
            mod_type: "sizheng",
        }, function (data) {
            if (data.state == 1) {

                var cell = '<li><a target="_blank" ></a></li>';

                if (data.data.length != 0) {

                    for (var index = 0; index < data.data.length; index++) {
                        var element = data.data[index];
                        var temp_list = $(cell);
                        temp_list.find('a').text(element.title).attr('href', element.linkurl);

                        temp_list.appendTo('#zxfb ul');
                    }
                }
            }
        })
    } else {
        $.getJSON('http://www.shuren100.com/api/jiaoyu_weixin/get_wx_article.php?callback=?', {
            type: "get_zx_article",
        }, function (data) {
            if (data.state == 1) {

                var cell = '<li><a target="_blank" ></a></li>';

                if (data.data.length != 0) {

                    for (var index = 0; index < data.data.length; index++) {
                        var element = data.data[index];
                        var temp_list = $(cell);
                        temp_list.find('a').text(element.title).attr('href', element.linkurl);

                        temp_list.appendTo('#zxfb ul');
                    }
                }
            }
        })
    }
}

if (lwt_type == 'sz') {
    $.getJSON('http://www.shuren100.com/api/jiaoyu_weixin/get_wx_article.php?callback=?', {
        type: "get_wx_article",
        mod_type: "sizheng",
    }, function (data) {
        if (data.state == 1) {
            var cell = '<li><h3 class="f28"><span class="left"><img class="small_wx_img" src="" alt=""></span><span class="wx_title"></span></h3><a href="" target="_blank"><img class="wx_thumb" src=""/></a></li>';
            var cell2 = '<li><a href="" target="_blank"></a></li>';

            if (data.data.length != 0) {
                for (var index = 0; index < data.data.length; index++) {
                    var element = data.data[index];
                    var temp_list = $(cell);
                    var temp_list2 = $(cell2);
                    temp_list.find('.wx_title').text(element.title);
                    temp_list.find('.small_wx_img').attr('src', element.wxpic);
                    temp_list.find('a').attr('href', element.linkurl);
                    temp_list.find('.wx_thumb').attr('src', element.thumb);

                    temp_list2.find('a').attr('href', element.linkurl).text(element.introduce);

                    temp_list.appendTo('.slideBox3 .pic');
                    temp_list2.appendTo('.slideBox3 .txt.lh32 ul');

                }
            }
            jQuery(".slideBox3").slide({
                titCell: ".num li", mainCell: ".pic", effect: "left", autoPlay: true, trigger: "click", delayTime: 600, interTime: 3500,

                startFun: function (i) {
                    jQuery(".slideBox3 .txt li").eq(i).show().siblings().hide();
                }
            });

        }
    })
} else {
    $.getJSON('http://www.shuren100.com/api/jiaoyu_weixin/get_wx_article.php?callback=?', {
        type: "get_wx_article"
    }, function (data) {
        if (data.state == 1) {
            var cell = '<li><h3 class="f28"><span class="left"><img class="small_wx_img" src="" alt=""></span><span class="wx_title"></span></h3><a href="" target="_blank"><img class="wx_thumb" src=""/></a></li>';
            var cell2 = '<li><a href="" target="_blank"></a></li>';

            if (data.data.length != 0) {
                for (var index = 0; index < data.data.length; index++) {
                    var element = data.data[index];
                    var temp_list = $(cell);
                    var temp_list2 = $(cell2);
                    temp_list.find('.wx_title').text(element.title);
                    temp_list.find('.small_wx_img').attr('src', element.wxpic);
                    temp_list.find('a').attr('href', element.linkurl);
                    temp_list.find('.wx_thumb').attr('src', element.thumb);

                    temp_list2.find('a').attr('href', element.linkurl).text(element.introduce);

                    temp_list.appendTo('.slideBox3 .pic');
                    temp_list2.appendTo('.slideBox3 .txt.lh32 ul');

                }
            }
            jQuery(".slideBox3").slide({
                titCell: ".num li", mainCell: ".pic", effect: "left", autoPlay: true, trigger: "click", delayTime: 600, interTime: 3500,

                startFun: function (i) {
                    jQuery(".slideBox3 .txt li").eq(i).show().siblings().hide();
                }
            });

        }
    })
}

