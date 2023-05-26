$(function() {
    /*导航切换*/

    if ($("title").html() == "机构概况_江苏作家网") {

        $(".nav_all>li:eq(1)").attr('id', 'def');
        $(".nav_all>li:eq(1)").addClass("def");
    }

    if ($("title").html() == "作协动态_江苏作家网") {
        $(".nav_all>li:eq(2)").attr('id', 'def');
        $(".nav_all>li:eq(2)").addClass("def");

    }

    if ($("title").html() == "作家沙龙_江苏作家网") {
        $(".nav_all>li:eq(3)").attr('id', 'def');
        $(".nav_all>li:eq(3)").addClass("def");

    }

    if ($("title").html() == "新书速递_江苏作家网") {
        $(".nav_all>li:eq(4)").attr('id', 'def');
        $(".nav_all>li:eq(4)").addClass("def");

    }

    if ($("title").html() == "文学期刊_江苏作家网") {
        $(".nav_all>li:eq(5)").attr('id', 'def');
        $(".nav_all>li:eq(5)").addClass("def");

    }

    if ($("title").html() == "文学奖项_江苏作家网") {
        $(".nav_all>li:eq(6)").attr('id', 'def');
        $(".nav_all>li:eq(6)").addClass("def");

    }
    if ($("title").html() == "联系我们_江苏作家网") {
        $(".nav_all>li:eq(7)").attr('id', 'def');
        $(".nav_all>li:eq(7)").addClass("def");

    }
    var st = 200;

    $('.nav_all>li').mouseenter(function() {
        $("#def").removeClass('def');
        $(this).find('.sub_nav').stop(false, true).slideDown(st);
    }).mouseleave(function() {
        $("#def").addClass('def');
        $(this).find('.sub_nav').stop(false, true).slideUp(st);
    });

    $(this).find('.sub_nav').css({
        fontSize: '13px',
        fontFamily: '微软雅黑',
        position: 'absolute',
        left: function(index, value) {
            return index * 1.5 + 9.5 + "%";
        }
    });
      $('.nav_all>li:eq(5)').find('.sub_nav').css({
        fontSize: '13px',
        fontFamily: '微软雅黑',
        position: 'absolute',
        left: '10%'
    });

    $('.nav_all>li:eq(6)').find('.sub_nav').css({
        fontSize: '13px',
        fontFamily: '微软雅黑',
        position: 'absolute',
        left: '20%'
    });

    //首页大图切换 使用swiper   

    var mySwiper = new Swiper('.swiper-container_a',{
        autoplay: 5000,
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        wrapperClass: 'photo-wrapper',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next_a',
        prevButton: '.swiper-button-prev_a',
    })
    //作家沙龙 使用swiper
    var mySwiper = new Swiper('.swiper-zjsl',{
        wrapperClass: 'zjsl-wrapper',
        loop: true,
        autoplay: 5000,
        //可选选项，自动滑动 
        pagination: '.swiper-pagination',
        paginationClickable: true,
    })

    var $titles = $('.smallPicTitle');
    var len = $titles.length;
    var index = 0;
    $titles.hide();
    $titles.eq(0).hide();

    //广告
    var mySwiperAct = new Swiper('.swiper-container_act',{
        autoplay: 3000,
        pagination: '.swiper-pagination_act',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }

    });

    //期刊方阵 使用swiper
    var mySwiperBook = new Swiper('.swiper-container_book',{
        loop: true,
        autoplay: 5000,
        //可选选项，自动滑动 
        slidesPerView: 6,
        spaceBetween: 22,
        // 如果需要前进后退按钮
        nextButton: '.next_book',
        prevButton: '.prev_book'
    })
    var $titles = $('.smallPicTitle');
    var len = $titles.length;
    var index = 0;
    $titles.hide();
    $titles.eq(0).hide();

});
