// 滚动顶部样式
$(".Hb_Top").hide();
$(window).bind("scroll", function () {
    var sTop = $(window).scrollTop();
    var sTop = parseInt(sTop);
    if (sTop >= 0.1) {
        if (!$(".Hb_Top").is(":visible")) {
            try {
                $(".Hb_Top").slideDown();
                // $('.menu').show();
            } catch (e) {
                $(".Hb_Top").show();
                $('.menu').hide();
            }
        }
    } else {
        if ($(".Hb_Top").is(":visible")) {
            try {
                $(".Hb_Top").slideUp();
                // $('.menu').hide();
            } catch (e) {
                $(".Hb_Top").hide();
                $('.menu').show();
            }
        }
    }
});