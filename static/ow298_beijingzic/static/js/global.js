$(function(){

    (function(){
        var topbtn = $('#gotop_btn'),
            $shouCang = $('#J_shoucang');	// 收藏
        $shouCang.hover(function(){
            $(this).addClass('active');
            $(this).next().show();
        }, function(){
            $(this).removeClass('active');
            $(this).next().hide();
        });
        //绑定页面滚动事件
        $(window).bind('scroll',function(){
            var len=$(this).scrollTop();
            if(len>=100){
                //显示回到顶部按钮
                $('.goto_top').show();
            }else{
                //影藏回到顶部按钮
                $('.goto_top').hide();
            }
        });
        //顶部
        topbtn.on('click', function(){
            $("html, body").filter(':not(:animated)').animate({
                scrollTop: 0
            });
        });
    })();

    $('ul.nav li:last').hover(function(){
        $(this).children('div').show();
    },function(){
        $(this).children('div').hide();
    });

});
