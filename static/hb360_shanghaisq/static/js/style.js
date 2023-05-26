/**
 * Created by 001 on 2017/6/6.
 */

$(function () {
    var oConDl=$("#con_cc_3 dl");
    oConDl.each(function(){
        var oDtHeight=$(this).find("dt").height();
        var oDdHeight=$(this).find("dd").height();
        var oChaHeight=oDtHeight-oDdHeight;
        if(oChaHeight>0){
            $(this).find("dd").css({
                'margin-top':oChaHeight/2
            })
        }else{
            $(this).find("dt").css({
                'margin-top':-(oChaHeight/2)
            })
        }
    })

    var oConDl1=$("#con_cc_1 dl");
    oConDl1.each(function(){
        var oDtHeight=$(this).find("dt").height();
        var oDdHeight=$(this).find("dd").height();
        var oChaHeight=oDtHeight-oDdHeight;
        if(oChaHeight>0){
            $(this).find("dd").css({
                'margin-top':oChaHeight/2
            })
        }else{
            $(this).find("dt").css({
                'margin-top':-(oChaHeight/2)
            })
        }
    })
    
    var oConDl1=$("#con_cc_2 dl");
    oConDl1.each(function(){
        var oDtHeight=$(this).find("dt").height();
        var oDdHeight=$(this).find("dd").height();
        var oChaHeight=oDtHeight-oDdHeight;
        if(oChaHeight>0){
            $(this).find("dd").css({
                'margin-top':oChaHeight/2
            })
        }else{
            $(this).find("dt").css({
                'margin-top':-(oChaHeight/2)
            })
        }
    })
    $('.exam .main_cnt_r .exam_cnt,.main_cnt_r .school_list').css('display','none')
    $('.exam .main_cnt_r .box_hover,.main_cnt_r .school_list.box_hover').css('display','block')




    var width = $(window).width();
    var w=(width-1200)/2;
    if(w>0 ){
        $("#toTop").css({
            'right' :w-90
        });
    }else{
        $("#toTop").css({
            'right' :10
        });
    }
    $(window).scroll(function() {
        if ($(this).scrollTop()> 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 800);
    })


    if(width>767){
        $('.scroll03 ').css('position',null)
    }
    
    var aHeight=$('.zhaosheng #con_cc_2 a').height()
    if(aHeight>48){
        $('.zhaosheng #con_cc_2 a').css({
            'line-height':'24px'
        })
    }
    if(width<=767){
     var dlHeight=$('.school_list dl').outerHeight(true)
        $('.zhaosheng .school_list').css({
            'height':dlHeight*4,
            'overflow':'hidden'
        })
        $('.zhaosheng #con_cc_2').css({
            'height':'auto',
        })

        $('.zhaosheng .main-tit').after($('.zhaosheng .main-tit>ul'))
        $('.exam .main-tit').after($('.exam .main-tit>ul'))
    }
    if(width<=681){
        var dlHeight1=$('.school_list dl').outerHeight(true)
        $('.zhaosheng .school_list').css({
            'height':dlHeight1*6-1,
        })
        $('.zhaosheng #con_cc_2').css({
            'height':'auto',
        })
    }
    if(width<=400){
        var dlHeight2=$('.school_list dl').outerHeight(true)
        $('.zhaosheng .school_list').css({
            'height':dlHeight2*6-3,
        })
        $('.zhaosheng #con_cc_2').css({
            'height':'auto',
        })
    }






    $(".container").hover(function(){
        $(".container .tabCon>div").hide();
    })

    /*var tabWidth=$('.nav-box .tab').width()
     $('.nav-box .banner_box').css({
     'margin-left':tabWidth+20
     })*/

    var newsHeight=$('.update-news').outerHeight()
    $('.update-news').css('display','none')
    $('.headline').css({
        'height':newsHeight
    })
    var sHeight=$('.sign-up .main_cnt_r').height()
    $('.sign-up .main_cnt_l').css({
        'height':sHeight
    })
    var tjHeight=$('.exam .main_cnt_l').height()
    $('.exam .main_cnt_r').css({
        'height':tjHeight
    })
    var bmHeight=$('.baoming .main_cnt_l').height()
    $('.baoming .main_cnt_r').css({
        'height':bmHeight
    })
    var zsHeight=$('.zhaosheng .main_cnt_r').height()
    $('.zhaosheng .main_cnt_l').css({
        'height':zsHeight
    })

    if(width>1024){
        var lHeight=$('.jiaoliu .main_cnt_l').height()
        var rHeight=$('.jiaoliu .main_cnt_r').height()
        if(lHeight>=rHeight){
            $('.jiaoliu .main_cnt_r').css({
                'height':lHeight
            })
        }else (
            $('.jiaoliu .main_cnt_l').css({
                'height':lHeight
            })
        )
    }
})