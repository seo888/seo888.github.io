$(document).ready(function() {
    $("#searchform").submit(function(){
        window.open("https://www.baidu.com/s?wd="+$("#searchword").val()+" site%3Ashuren100.com",'_blank');
        return false;
    });
    jQuery(".navDown").slide({ type:"menu",  titCell:".m", targetCell:".sub",effect:"slideDown", delayTime:300, triggerTime:0,returnDefault:true  });
    jQuery("#picScroll_a").slide({ mainCell:"ul", effect:"leftLoop", vis:3, scroll:1,autoPage:true,switchLoad:"_src" });
    $("#yxbk").find("li:nth-child(6n)").css({"margin-right":"0px"})
    jQuery(".slideBox1").slide({mainCell:"ul.scrollUl",effect:"leftLoop",autoPlay:false, vis:2, scroll:1});
    $(".ewm").hover(function(){
        $(this).css('background-image', 'url(' + $(this).attr("ewmpic") + ')');
    },function(){
        $(this).css('background-image', 'url(' + $(this).attr("pic") + ')');
    })

    jQuery(".prev,.next").show();
    jQuery(".slideBox").hover(function(){ jQuery(this).find(".prev,.next").stop(true,true).fadeTo("show",0.5) });
    jQuery(".slideBox").slide({ titCell:".num li", mainCell:".pic",effect:"left", autoPlay:true,trigger:"click",delayTime:600,interTime:3500,

        startFun:function(i){
            jQuery(".slideBox .txt li").eq(i).show().siblings().hide();
        }
    });
    jQuery(".slideBox3").slide({ titCell:".num li", mainCell:".pic",effect:"left", autoPlay:true,trigger:"click",delayTime:600,interTime:3500,

        startFun:function(i){
            jQuery(".slideBox3 .txt li").eq(i).show().siblings().hide();
        }
    });
    if($(".swiper-container").length>0){
        var certifySwiper = new Swiper('.diepic .swiper-container', {
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            autoplay: 3000,
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slideToClickedSlide: true,
            onProgress: function(swiper, progress) {
                for(i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides.eq(i);
                    var slideProgress = swiper.slides[i].progress;
                    modify = 1;
                    if(Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    translate = slideProgress * modify * 50 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 3;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if(Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            onSetTransition: function(swiper, transition) {
                for(var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides.eq(i)
                    slide.transition(transition);
                }

            },
            onSlideChangeStart: function(swiper) {
                if(swiper.activeIndex == 4) {
                    swiper.bullets.eq(9).addClass('swiper-pagination-bullet-active');
                    console.log(swiper.bullets.length);
                }
            }
        });
    }
    var $jujiao = true;
    function jujiao_next() {
        if($jujiao) {
            $jujiao = false;
            $("#jujiao .imgbox ul").css({
                marginLeft: -560
            }).find("li:last").prependTo($("#jujiao .imgbox ul"));
            $("#jujiao .imgbox ul").stop().animate({
                marginLeft: 0
            }, 1000, function() {
                $jujiao = true;
            });
            $("#jujiao .txtbox ul").css({
                marginTop: -390
            }).find("li:last").prependTo($("#jujiao .txtbox ul"));
            $("#jujiao .txtbox ul").stop().animate({
                marginTop: 0
            }, 1000, function() {
                $jujiao = true;
            });
        }
    }

    function jujiao_prev() {
        if($jujiao) {
            $jujiao = false;
            $("#jujiao .imgbox ul").stop().animate({
                marginLeft: -560
            }, 1000, function() {
                $("#jujiao .imgbox ul").css({
                    marginLeft: 0
                }).find("li:first").appendTo($("#jujiao .imgbox ul"));
                $jujiao = true;
            });
            $("#jujiao .txtbox ul").stop().animate({
                marginTop: -390
            }, 1000, function() {
                $("#jujiao .txtbox ul").css({
                    marginTop: 0
                }).find("li:first").appendTo($("#jujiao .txtbox ul"));
                $jujiao = true;
            });
        }
    }
    $("#jujiao .next").click(function() {
        jujiao_next();
    });
    $("#jujiao .prev").click(function() {
        jujiao_prev();
    });
    /*$(function() {
        var jujiao_auto = setInterval(jujiao_prev, 5200);
        $("#jujiao .roll").hover(function() {
            clearInterval(jujiao_auto);
        }, function() {
            jujiao_auto = setInterval(jujiao_prev, 5200);
        });
    });*/
    /*小屏顶部导航开始*/
    var initialSlide=$(".m_top_nav li").index($(".m_top_nav li.cur"));
    if($('.swiper_container_top_nav').size()>0){

        var mySwiperNav = new Swiper('.swiper_container_top_nav',{
            freeMode : true,
            freeModeFluid : true,
            calculateHeight : true,
            slidesPerView : 'auto',
            cssWidthAndHeight : true,
            initialSlide : initialSlide,
            onFirstInit: function(swiper){
                if ($(".m_top_nav li").index($(".m_top_nav li.cur")) >= $(".m_top_nav li").size() -6) {
                    $('#m_nav_mask_fun').hide();
                }
                else {
                    $('#m_nav_mask_fun_left').hide();
                }
                holdPosition=0,mySwiperNavTimer=null;
            },
            onTouchStart:function(swiper){
                holdPosition=0,clearTimeout(mySwiperNavTimer);
            },
            onTouchEnd:function(swiper){
                if(holdPosition!=0){
                    $('#m_nav_mask_fun').hide();
                    mySwiperNavTimer=setTimeout(function(){$('#m_nav_mask_fun_left').stop().fadeIn();   },1000)
                }else{
                    mySwiperNavTimer=setTimeout(function(){$('#m_nav_mask_fun').stop().fadeIn();   },1000)
                    $('#m_nav_mask_fun_left').hide();
                }
            },
            onResistanceAfter: function(swiper,pos){
                holdPosition = pos
            }
        })

        function topNavFun(){
            if($(window).scrollTop()>
                ($('.m_tou_date').height()+$('.m_top_logo').height()  )
            ){

                if(!$('.swiper_container_top_nav').hasClass('fixed')){
                    $('.swiper_container_top_nav').addClass('fixed');
                }
            }else if(
                $(window).scrollTop()<=
                ($('.m_top_logo').height()  )
            ){

                if($('.swiper_container_top_nav').hasClass('fixed')){
                    $('.swiper_container_top_nav').removeClass('fixed');
                }
            }
        }
        // topNavFun();
        $(window).scroll(function(){
            topNavFun();
        });

    }
    /*小屏顶部导航结束*/
    if($('#moeCode')[0]){
        var qrcode = new QRCode($('#moeCode')[0], {
            width : 150,
            height : 150
        });
        qrcode.makeCode(window.location.href);
        if(typeof($('#moeCode').find('img')) === 'object'){
            $('#moeCode').append('扫一扫分享本页');
        }
    }
})

function nTabs(thisObj,Num) {
    if (thisObj.className == "active")return;
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("a");
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            thisObj.className = "this";
            document.getElementById(tabObj + "_Content" + i).style.display = "block";
        } else {
            tabList[i].className = "normal";
            document.getElementById(tabObj + "_Content" + i).style.display = "none";
        }
    }
}