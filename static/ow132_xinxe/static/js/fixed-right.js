
$( document).ready(function(e) {
    $('.ad_close').click(function () {
        $(this).parent().parent().stop().slideUp(500);
    });

    $('.right_silderbar dt').each(function (index, item) {
        $(item).removeClass('on')
        $(item).height(122);
        $(item).addClass('on')
    })


    $('.right_silderbar>dl').hover(function () {
        $(this).children('dt').removeClass('on')
    },function(){
        $(this).children('dt').addClass('on')
    });

    var otherwidth = (document.body.scrollWidth - 1300)/2;
    if(otherwidth > 150){
        if(otherwidth > 150){
            $('.right_ewm').css({'right':otherwidth /8});
        }
        $(window).scroll(function(){
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();

            if(scrollTop > 350) {
                $('.right_silderbar').slideUp(600);

            }else{
                $('.right_silderbar').slideDown(1000);

            }

        });
    }else{
        $('.right_silderbar').hide();
        $('.fixed_left').hide();
    }
    $(".back_top").hide();
    $('.back_bottom').addClass('animated').css({'top': '0px'});
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();

        if((scrollHeight - windowHeight) - scrollTop < 60){
            $('.back_bottom').fadeOut(500);
        }else{
            $(".back_bottom").fadeIn(500);
        }

        if(scrollTop > 350) {
            $(".back_top").fadeIn(500).addClass('animated');
            $('.back_bottom').stop().animate({'top': '60px'});
            $('.back_top').hover(function(){
                $(this).addClass('rotateIn');
            },function(){
                $(this).removeClass('rotateIn');
            });

        }else{
            $(".back_top").fadeOut(500).next('.back_bottom').stop().animate({'top': '0px'});
            $('.back_bottom').hover(function(){
                $(this).addClass('rotateIn');
            },function(){
                $(this).removeClass('rotateIn');
            });
        }

    });
    $('.back_top').click(function () {
        $('html,body').animate({ scrollTop:0});
    });
    $('.back_bottom').click(function () {
        $('html,body').animate({ scrollTop: $(document).height()-$(window).height()});
    });


    $('.right_silderbar>em').click(function () {
        $(this).parent().slideUp();
    });
})
