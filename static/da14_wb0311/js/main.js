function HomeScroll(a, b) { function g() { var g = $(window).scrollLeft(), h = $(window).scrollTop(), i = $(document).height(), j = $(window).height(), k = c.height(), l = d.height(), m = k > l ? f : e, n = k > l ? d : c, o = k > l ? c.offset().left + c.outerWidth(!0) - g : d.offset().left - c.outerWidth(!0) - g, p = k > l ? l : k, q = k > l ? k : l, r = parseInt(q - j) - parseInt(p - j); $(a + "," + b).removeAttr("style"), j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;left:" + o + "px;" + (j > p ? "top" : "bottom") + ":0;") } if ($(a).length > 0 && $(b).length > 0) { var c = $(a), d = $(b), e = c.offset().top, f = d.offset().top; $(window).resize(g).scroll(g).trigger("resize") } }
function Tab_hover(hd, bd) { hd.hover(function () { $(this).addClass('on').siblings().removeClass('on'); if (bd) { bd.hide().eq($(this).index()).show(); } }) }

$(function () {
    HomeScroll("#Min_L", "#Min_R");//RL 滚动
    //tab
    $('.Min .tab_hd span').hover(function () {
        $(this).addClass('on').siblings().removeClass();
        $(this).parents('.tab_hd').next('.tab_bd').find('ul').hide().eq($(this).index()).show()
    })

    Tab_hover($('.ph_item ul li'))
    //like
    $('.like_item .tab_hd_lk a').hover(function () {
        $(this).addClass('on').siblings().removeClass();
        $(this).parents('.like_item').find('.tab_bd_lk').find('.item').hide().eq($(this).index()).show()
        $(this).parents('.like_item').find('.tab_link').find('a').hide().eq($(this).index()).show()
    })
    $('.yx_xz').each(function(){
        $(this).find('.tab_hd span').eq(9).unbind();
    })
})

