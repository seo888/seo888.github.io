$(document).ready(function(){
    imgchange();
   
    // 图片轮播
 function imgchange() {
    $(function() {
        $('#slideshow').cycle({
            fx: 'fade',
            speed: 1000,
            timeout: 3000,
            pager: '.ss_wrapper .slideshow_paging',
            prev: '.ss_wrapper .slideshow_prev',
            next: '.ss_wrapper .slideshow_next',
            before: function(currSlideElement, nextSlideElement) {
                var data = $('.data', $(nextSlideElement)).html();
                $('.ss_wrapper .slideshow_box .data').fadeOut(300, function(){
                  $('.ss_wrapper .slideshow_box .data').remove();
                  $('<div class="data">'+data+'</div>').hide().appendTo('.ss_wrapper .slideshow_box').fadeIn(300);
                });
                // $('.ss2_wrapper .slideshow_box').stop(true, true).animate({ bottom: '-80px' }, 400, function() {
                //     $('.ss2_wrapper .slideshow_box .data').html(data);
                // });
                // $('.ss2_wrapper .slideshow_box').delay(100).animate({ bottom: '0' }, 100);
            }
        });
        $('.ss_wrapper').mouseenter(function() {
            $('#slideshow').cycle('pause');
            $('.ss_wrapper .slideshow_prev').stop(true, true).animate({ left: '20px' }, 200);
            $('.ss_wrapper .slideshow_next').stop(true, true).animate({ right: '20px' }, 200);
        }).mouseleave(function() {
            $('#slideshow').cycle('resume');
            $('.ss_wrapper .slideshow_prev').stop(true, true).animate({ left: '-42px' }, 200);
            $('.ss_wrapper .slideshow_next').stop(true, true).animate({ right: '-42px' }, 200);
        })
    })
	}
 
})

// 精彩专题动画
$(function(){
    $("#zhuanti-list ul li").mouseover(function() {
        $("#zhuanti-list ul li .zt-num").removeClass('zt-num-f');
        $(this).find('.zt-num').addClass('zt-num-f');
        $(this).children('a').children('img').show();
        $(this).siblings('li').children('a').children('img').hide();
    });
});