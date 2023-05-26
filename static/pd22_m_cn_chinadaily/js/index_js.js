$(function  () {
//  var li_ww=$(".Infographic_img li").width();
//  var li_marL=parseInt($(".Infographic_img li").css("marginLeft"));
//  var juli_=li_ww+li_marL;
    function box_WH (){
        //获取屏幕宽高
        var Ww=$(window).width();
        var Wh=$(window).height();
        //使html和body的font-size等比例变化
        $('html').css("font-size",Ww/640*100+'px');


        li_ww=$(".Infographic_img li").width();
        li_marL=parseInt($(".Infographic_img li").css("marginLeft"));
        juli_=li_ww+li_marL;

    }
    //进入页面执行
    box_WH ();
    //页面尺寸变换执行
    $(window).resize(box_WH);

    // 导航条点击后添加选中样式-start
        function nav_click () {
            $(".nav li").on("click",function  () {
                $(this).addClass("nav_color").siblings().removeClass("nav_color");
            })
        }
        // nav_click();
    // 导航条点击后添加选中样式-end

    // 头部的轮播-start
        $.fn.extend({
            tmdqh:function (){
                var x=0;
                var timer1=null;
                var $_this=$(this);//指向父级
                // 第1步：点击左边
                $_this.find('.header_imglunbo_L').click(function (){
                    clearInterval(timer1);
                    x--;
                    if (x<0) {
                        x=$_this.find('ul img').length-1;
                    };
                    bian();
                });
                // 第2步：点击右边
                $_this.find('.header_imglunbo_R').click(function (){
                    clearInterval(timer1);
                    x++;
                    if (x>=$_this.find('ul img').length) {
                        x=0;
                    };
                    bian();
                });
                // 第4步：自动轮播
                function autoMove(){
                    timer1=setInterval(function (){
                        x++;
                        if (x>=$_this.find('ul img').length) {
                            x=0;
                        };
                        bian();
                    },2000);
                }
                autoMove();//进入页面执行
                // 第5步：提取公用部分
                function bian(){
                    // $_this.find('li').eq(x).fadeIn().siblings().hide();
                    $_this.find('li').eq(x).addClass('show').siblings().removeClass('show');
                }
            }
        })
        $('.header_imglunbo').tmdqh();
    // 头部的轮播-end

    // Infographic的轮播-start
        function Infographic_lunbo () {
            // var li_ww=$(".Infographic_img li").width();
            // var li_marL=parseInt($(".Infographic_img li").css("marginLeft"));
            // var juli_=li_ww+li_marL;
            var x=0;
            $(".Infographic_imglunbo_R").click(function  () {
                x++;
                if (x>=$(".Infographic_img li").length-1) {
                    x--;
                };
                $(".Infographic_img").stop().animate({left:"-"+juli_*x+""});
            })
            $(".Infographic_imglunbo_L").click(function  () {
                x--;
                if (x<0) {
                    x++;
                };
                $(".Infographic_img").stop().animate({left:"-"+juli_*x+""});
            })
        }
        Infographic_lunbo ();
    // Infographic的轮播-end
    
    // 返回顶部-start
        $(".toTop").click(function(){
            $("html,body").animate({ scrollTop:0},300);
        })
    // 返回顶部-end
    
	//  手机端点击导航栏-start
        // function phone_nav_click () {
        //     $('body').on('click',function  (event) {
        //         if($('.nav').hasClass('nav_show')){
        //             if($(event.target).parents().hasClass('nav')==false){
        //                 $('.nav ul').animate({left:"-3.85rem"},function(){
        //                     $('.nav').removeClass('nav_show');
        //                 });
        //             }
        //         }else{
        //             if($(event.target).attr('class')=="nav_phone_logo"){
        //                 $('.nav ul').animate({left:0});
        //                 $('.nav').addClass('nav_show');
        //             }
        //         }
        //     })
        // }
        //手机导航
		function phone_nav_click () {

            touchEvent.tap($('body')[0],function () {
                if($('.nav').hasClass('nav_show')){
                    if($(event.target).parents().hasClass('nav')==false){
                        $('.nav ul').animate({right:"-2.69rem"},function(){
                            $('.nav').removeClass('nav_show');
                        });
                    }
                }else{
                    if($(event.target).attr('class')=="nav_phone_logo"){
                        $('.nav ul').animate({right:0});
                        $('.nav').addClass('nav_show');
                    }
                }
            })

		}
		phone_nav_click ();
	//	手机端点击导航栏-end
	
	//手机二级菜单
	$(".tri>img").click(function(){
		 if($(".nav_two").hasClass("nav_two_show")){
            	$(".nav_two").removeClass("nav_two_show");
            	$(".nav_two").slideUp();
            }else{
                $(".nav_two").addClass("nav_two_show");
            	$(".nav_two").slideDown();
            }
	})
})