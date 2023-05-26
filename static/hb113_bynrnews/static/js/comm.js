$(window).resize(function(){

    initBackTopSeat();

});


$(function(){


    backTop();
    
    
    $('.page-nav .nav ul li').each(function (i, el) {
        $(el).hover(function () {
            if ($(this).index() != 0) {
                $(this).addClass('active').siblings().removeClass('active');
                $(this).find('.pulldown').show();
            }
        }, function () {
            $(this).removeClass('active');
            $(this).find('.pulldown').hide();
        });
    });


    $(".index-fly p").click(function() {
        $(this).parents(".index-fly").hide();
    });


    $(".index-media .bd ul li").last().css("margin-right",0);
    $(".list-main .list-l .list-ul").last().css('border-bottom', 0);
    $(".listTwo-news ul li").last().css('border-bottom', 0);
	$(".index-ad-2 .item").last().css("margin-right",0);
	$(".nativeLiterature-yilin .list-ul li").last().css("margin-right",0);


    $('.commentTheory-main .list').each(function (i, el) {
        $(el).find('.item').last().css('border-bottom', 0);
    });


    $(".specialList-list .item").each(function(index,el){
        if(($(el).index()+1)%3 === 0){
            $(el).css("margin-right",0);
        }
    });
    
    
    $(".company-intro-piclist .item").each(function(index,el){
        if(($(el).index()+1)%3 === 0){
            $(el).css("margin-right",0);
        }
    });


    $(".picList-list .item").each(function(index,el){
        if(($(el).index()+1)%3 === 0){
            $(el).css("margin-right",0);
        }
    });


    $(".index-ad .item").each(function(index,el){
        if(($(el).index()+1)%4 === 0){
            $(el).css("margin-right",0);
        }
    });


    $(".nativeLiterature-yilin .list li").each(function(index,el){
        if(($(el).index()+1)%2 === 0){
            $(el).css("margin-right",0);
        }
    });


    $(".commTemplate-main .sec").each(function(index,el){
        if(($(el).index()+1)%2 === 0){
            $(el).css("margin-right",0);
        }
    });
    
    
    $(".media-list .item").each(function(index,el){
        if(($(el).index()+1)%5 === 0){
            $(el).css("margin-right",0);
        }
    });


    $('.page-nav .nav li').last().css('background', 'none');
    $('.page-nav .nav li').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).prev().css('background', 'none');
    }).mouseleave(function () {
        $(this).removeClass('active');
        $(this).prev().css('background', 'url(/sites/main/img/line-1.jpg) no-repeat right center');
    });


    $(".index-friend-link .tab-cnt .tab-panel").first().show();
    $(".index-friend-link .tab-nav .item").each(function (index, el) {
        $(el).mouseover(function (event) {
            var $this = $(this);
            timer = setTimeout(autoplay, 200);
            function autoplay() {
                $this.addClass('active').siblings().removeClass('active');
                $(".index-friend-link .tab-cnt .tab-panel").eq(index).show().siblings().hide();
            }
        });
        $(el).mouseout(function (event) {
            clearTimeout(timer);
        });
    });


});


var backTop = function backTop() {
    var Heig = document.documentElement.clientHeight;
    star(Heig, '.back-to-top');
    $('.back-to-top').click(function () {
        $('body,html').animate({scrollTop: 0},500);
        $('.sidebar-fixed-wrapper').css({ 'bottom': 40 });
    });

    function star(a, b) {
        $(window).scroll(function () {
            if ($(document).scrollTop() > a) {
                $(b).stop().show();
                initBackTopSeat();
            } else {
                $(b).stop().hide();
            }
        });
    }
};


function initBackTopSeat() {
    var bottomDistance = 40;
    if ($('.page-footer').length) {
        if ($(document).scrollTop() >= $('.page-footer').offset().top - document.documentElement.clientHeight) {
            $('.sidebar-fixed-wrapper').css({ 'bottom': $('.page-footer').innerHeight() - ($(document).height() - $(document).scrollTop() - document.documentElement.clientHeight - 40) });
        } else {
            $('.sidebar-fixed-wrapper').css({ 'bottom': bottomDistance });
        }
    }
}