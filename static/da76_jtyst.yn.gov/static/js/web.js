$(function(){
  $('.layui-tab>.layui-tab-title>li').mouseover(function () {
    var len = $(this).parent('ul').find('li').index(this);
    $(this).siblings('li').removeClass('layui-this');
    $(this).addClass('layui-this');
    $(this).parent('ul').next('.layui-tab-content').find('.layui-tab-item').removeClass('layui-show')
    $(this).parent('ul').next('.layui-tab-content').find('.layui-tab-item').eq(len).addClass('layui-show');
$('.layui-tab>.layui-tab-title>ul>li>a').attr('href',$(this).find('a').attr('href'))
})

//专题栏目循环滚动
  // var zhuantiTime=setInterval(zhuantiRight,3000);

  // $('.zhuanti').hover(function(){
  //   clearInterval(zhuantiTime);
  // },function(){
  //   zhuantiTime=setInterval(zhuantiRight,3000);
  // });

  $('.zhuanti>.prve').click(zhuantiLeft);
  $('.zhuanti>.next').click(zhuantiRight);

  function zhuantiRight(){
    $('.xg_zhuantiN').animate({
      "left":"-300px"
    },function(){
      $('.xg_zhuantilist>li:first').appendTo($('.xg_zhuantilist'));
      $('.xg_zhuantiN').css("left","0px");
    })
  };

  function zhuantiLeft(){
    $('.xg_zhuantiN').css("left","-300px");
    $('.xg_zhuantilist>li:last').prependTo($('.xg_zhuantilist'));
    $('.xg_zhuantiN').animate({
      "left":"0px"
    })
  };


})

$(function(){

    $('.zfxxgklist>li').not($('.active')).each(function(){
        $(this).removeClass('active').find('em').text("+");
        $(this).next('ul').hide();
    })

    $('.zfxxgklist>li').click(function(){
        if($(this).is('.active')){
            $(this).removeClass('active').find('em').text("+");
            $(this).next('ul').hide();
        }else{
            $(this).addClass('active').find('em').text("-");
            $(this).next('ul').show();
        }
    })

  $('.zfxxgklist>ul>li').click(function(){
        $(this).toggleClass("active")
    })

  $(".zfxxgklist a").each(function(i,v){
    var _cid=$(this).attr('c_id');
    if(_cid==cid){
      var tmp=$(this).parent().parent();
      if(tmp.hasClass('secondli')){console.log(1);
        $(this).addClass('selected');
        tmp.show();
        tmp.prev().find('span').html('-');
        $(this).parents('.zfxxgklist_sub').show();
        $(this).parents('.zfxxgklist_sub').prev().addClass('active');
        $(this).parents('.zfxxgklist_sub').prev().find('em').html('-');;
      }else if(tmp.hasClass('zfxxgklist_sub')){console.log(2);
        $(this).addClass('selected');
        $(this).next().show();
        $(this).find('span').html('-');
        tmp.show();
        tmp.prev().addClass('active');
        tmp.prev().find('em').html('-');;
      }else if(tmp.hasClass('zfxxgklist')){console.log(3);
        $(this).parent().addClass('active');
        $(this).parent().find('em').html('-');
        $(this).parent().next().show();
      }
    }
  });

})