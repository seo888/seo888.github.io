//nav
$('.sitenav').mouseenter(function () {
    $('.sitenav .topr').stop().slideDown();
}).mouseleave(function () {
    $('.sitenav .topr').stop().slideUp();
})
 

 // 回到顶部
$(function(){
    $('#gototop').on('click', function(){
        $('html, body').animate({scrollTop: 0}, 500);
    })


    var timer = 0, sbar = $('.side-toolbar').eq(0);
    $(document).on('scroll', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            if($(document).scrollTop() >= 600){
                sbar.fadeIn(200);
            }else{
                sbar.fadeOut(200);
            }
        }, 200)
    })    
});

//排行
$('#ph li').eq(0).addClass('on');
$('#ph li').hover(function(){
    $(this).addClass('on').siblings().removeClass('on');
})

//

//领取礼包
$('.lqlb li').hover(function(){
    $(this).addClass('on').siblings().removeClass('on');
})

function HomeScroll(a,b){function g(){var g=$(window).scrollLeft(),h=$(window).scrollTop(),i=$(document).height(),j=$(window).height(),k=c.height(),l=d.height(),m=k>l?f:e,n=k>l?d:c,o=k>l?c.offset().left+c.outerWidth(!0)-g:d.offset().left-c.outerWidth(!0)-g,p=k>l?l:k,q=k>l?k:l,r=parseInt(q-j)-parseInt(p-j);$(a+","+b).removeAttr("style"),j>i||p>q||m>h||p-j+m>=h?n.removeAttr("style"):j>p&&h-m>=r||p>j&&h-m>=q-j?n.attr("style","margin-top:"+r+"px;"):n.attr("style","_margin-top:"+(h-m)+"px;position:fixed;left:"+o+"px;"+(j>p?"top":"bottom")+":0;")}if($(a).length>0&&$(b).length>0){var c=$(a),d=$(b),e=c.offset().top,f=d.offset().top;$(window).resize(g).scroll(g).trigger("resize")}}
 
HomeScroll("#Min_L","#Min_R");