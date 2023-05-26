//懒加载
Echo.init({ offset: 800, throttle: 0 });

$(function() {
    /**页面基础方法 */
    $(".newInfo img").parent('p').css("text-indent", "0");
    $(".fontT").click(function() {
        $(this).css('display', "none").siblings('a').css("display", "block");
        $(".newInfo *").css("font-size", "20px");
    });
    $(".fontS").click(function() {
        $(this).css('display', "none").siblings('a').css("display", "block");
        $(".newInfo *").css("font-size", "18px");
    });

    var data = new Date(),
        yy = data.getYear() + 1900;
    $("#footer p").html("Copyright © 1998-" + yy + " 大河网 版权所有");

    /* 易分析埋码 */
    var phphtml = "<!-- PHPStat Start -->" +
        '<script language="JavaScript" id="phpstat_js_id_10000007">' +
        "var _trackDataType = 'wap';" +
        "var _trackData = _trackData || [];" +
        "(function() {" +
        "var phpstat_js = document.createElement('script'); phpstat_js.type = 'text/javascript'; " +
        "phpstat_js.charset = 'utf-8'; phpstat_js.id = 'phpstat_async_js_id_10000007'; phpstat_js.async = true;" +
        "phpstat_js.src = '//js.dahe.cn/count/10000007/10000007.js';" +
        "var phpstat_cjs = document.getElementsByTagName('script')[0]; phpstat_cjs.parentNode.insertBefore(phpstat_js, phpstat_cjs);" +
        "})();" +
        "</script>" +
        "<!--/PHPStat End -->";

    $("body").append(phphtml);

    /* 百度统计 */
    var bdhtml = '<script>' +
        'var _hmt = _hmt || [];' +
        '(function() {' +
        'var hm = document.createElement("script");' +
        'hm.src = "https://hm.baidu.com/hm.js?5fb56e96c12e4012b2d8b699de81a4f5";' +
        'var s = document.getElementsByTagName("script")[0];' +
        's.parentNode.insertBefore(hm, s);' +
        '})();' +
        '</script>';

    $("body").append(bdhtml);

	/**
	 * 图片预览
	 */
    var str = '<div class="pageBox" ><div class="page"><div id="slider"><ul>';
    var arr = [];
    $('.newInfo').find('img').each(function(index, value) {
        arr.push($(value).attr('data-echo'));
        str += '<li ><div class="pinch-zoom"> <img src="' + $(value).attr('data-echo') + '"/></div></li>';
    });
    str += '</ul></div></div></div>';
    $('body').append(str);
    var k = 0;
    $('.newInfo img').click(function() {
        var src = $(this).attr('src');
        var i;
        $.each(arr, function(index, value) {
            if (src == value)
                i = index;
        });
        var pageBox = $('.pageBox');
        pageBox.css('display', 'block');
        if (k == 0) {
            $('div.pinch-zoom').each(function() {
                new RTP.PinchZoom($(this), {}, $('#slider').find('li').height());
            });
            k++;
        }

        window.mySwipe = new Swipe(document.getElementById('slider'), {
            speed: 400,
            startSlide: i
        });
        pageBox.addClass('visible');
        pageBox.click(function() {
            $('.pageBox').hide().removeClass('visible');
        });
        pageBox.on('click', 'img', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
    })


});