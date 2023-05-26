/**
 * Created by Administrator on 2016/10/20 0020.
 */
$(function(){
    $('.pager li > a').text(' ');
    $('.wj_05_content_thumbnail').mousemove(function(){
        $('.pager').css({display:'block'})
    });
     $('.wj_05_content_thumbnail').mouseleave(function(){
        $('.pager').css({display:'none'})
    })
    $(".storage_content_pic:first").mouseenter(function(){
        $(".btn").stop(true,true).fadeIn()
    });
    $(".storage_content_pic:first").mouseleave(function(){
        $(".btn").stop(true,true).fadeOut()
    });
    $(".abs .text:first").css({color:"#35669c"});
});