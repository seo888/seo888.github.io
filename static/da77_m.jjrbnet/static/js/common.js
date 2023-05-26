


// 重置页面基础rem值
(function () {
    var t;
    function setbaseFont() {
        var w_width = $(window).width();
        var baseFontSize = w_width / 10;
        $('html').css('font-size', (baseFontSize > 64 ? 64 : baseFontSize) + 'px');
    }
    setbaseFont();
    $(window).on('resize', function (e) {
        // t = setInterval(,200)
        setbaseFont();
    });
})();
(function () {
    function preloadimages(arr) {
        var img = null;
        var img_arr = Array.isArray(arr) ? arr : [arr];
        for (var i = 0; i < img_arr.length; i++) {
            img = new Image();
            img.src = img_arr[i];
        }
    }
    preloadimages(['style002/images/logo.png',
        'style002/images/ico_topc.png',
        'style002/images/ico_search.png'
    ]);
})();
$(document).ready(function () {
    // 根据导航数量初始化导航条宽度
    (function () {
        var $scrollnav = $('.nav-list');
        var $navItems = $scrollnav.find('li');
        var scroll_width = 0;

        for (var i = 0; i < $navItems.length; i++) {
            scroll_width += $($navItems[i]).width();
        }
        $scrollnav.width(scroll_width);
    })();
    // 为导航添加定位效果
    (function () {
        var headHeight = $('.container > header').height();
        var $nav = $('.nav-container');
        var $more = $('.nav-more-btn');
        var t;

        $(window).on('scroll', function (e) {
            t = setTimeout(function () {
                clearTimeout(t);
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;

                if (scrollTop > headHeight) { //滚动高度比head高度高, 固定导航条
                    $nav.addClass('fixtop');
                } else {
                    $nav.removeClass('fixtop');
                }
            }, 200);
        });
    })();

    // 展开、关闭导航按钮
    (function () {
        var $navShowBtn = $('.nav-more-btn');
        var $navMoreContent = $('.nav-more-content');
        var $navCloseBtn = $('.nav-close');
        var $body = $('body');

        // function forbiddenScroll(e) {
        //     e.preventDefault();
        // }
        $navShowBtn.on('click', function (e) {
            e.preventDefault();
            $navMoreContent.addClass('show');
            // $body.on('touchmove', forbiddenScroll);
        });

        $navCloseBtn.on('click', function (e) {
            e.preventDefault();
            $navMoreContent.removeClass('show');
            // $body.off('touchmove', forbiddenScroll);
        });
    })();

    // 搜索功能
    (function () {
        var $searchBtn = $('.search');
        var $searchBar = $('#searchbar');
        var $kwd = $('.search-kwd input');
        var on = false;
        $searchBtn.on('click', function (e) {
            if (!on) {
                $searchBar.addClass('show');
                $searchBtn.addClass('off');
                $kwd.trigger('focus');
            } else {
                $searchBar.removeClass('show');
                $searchBtn.removeClass('off');
            }
            on = !on;
        });

    })();

});