$(function(){
  //导航小图标
	$('.nav_wechat').mouseover(function(){
            $(this).parent().find('.hide').fadeIn('slow');
  });
  $('.nav_wechat').mouseleave(function(){
      $(this).parent().find('.hide').fadeOut('slow');
  });
  $('.nav_email').click(function(){
      if ($(this).parent().find('.hide').css("display")=="none") 
      {
         $(this).parent().find('.hide').fadeIn('slow');
      }
     else
     {
      $(this).parent().find('.hide').fadeOut('slow');
     }
  });
  //搜索
  $('.search').mouseover(function(){
      $(this).parent().find(".search_show").fadeIn('slow');
  });
  $('.search').parent().mouseleave(function(){
      $(this).find(".search_show").fadeOut('slow');
  });
   $('.share').mouseover(function(){
      $(this).parent().find(".share_show").fadeIn('slow');
  });
  $('.share').parent().mouseleave(function(){
      $(this).find(".share_show").fadeOut('slow');
  });
  //导航栏
  $(".nav ul li").mouseover(function(){
        $(this).find("ul").stop().slideDown('200');
  });
  $(".nav ul li").mouseleave(function(){
      $(this).find("ul").stop().slideUp('200');
  });
  //学术顾问
  $(".content .cont_right .xsgw ul li").hover(function(){
      $(this).find(".gw_info").stop().animate({
      height:"toggle",
      width:"toggle"
      },300);
    }); 

  $('.yj').click(function(){
      if ($(".yjhide").css("display")=="none") 
      {
         $(".yjhide").fadeIn('slow');
      }
     else
     {
      $(".yjhide").fadeOut('slow');
     }
  });
  $('.wx').mouseover(function(){
      $(".wxhide").fadeIn('slow');
  });
  $('.wx').mouseleave(function(){
      $(".wxhide").fadeOut('slow');
  });
  $("img").lazyload({
        effect : "fadeIn"
    });
});

function chagv()
{
    var date=new Date();
    var now=date.getTime();
    $('.vimg').attr('src',verifySrc);
}
//收藏
function favor()
{
  var aid=$("#aid").val();
  var title=$("#title").val();
  $.post("index.php/Index/favor",{title:title,aid:aid},function(data){
    if (data.code=="0") 
    {
      alert('您还没有登录，请先登录！');
    }
    else if(data.code==1)
    {
      var fav= $("#fav");
      fav.html("已收藏");
      fav.removeAttr('onclick');
      fav.css("background-position", "1px -24px");
    }
  });
}
//显示时间函数
function getnow()
{   
  var date=new Date();   
  var month=date.getMonth()+1;   
  var day=date.getDate();   
    
  if(month.toString().length == 1){  //或者用if (eval(month) <10) {month="0"+month}   
    
  month='0'+month;   
  }   
  if(day.toString().length == 1){   
  day='0'+day;   
  }   
  return date.getFullYear()+'年'+month+'月'+day+'日'+'  '+date.toLocaleString().substring(date.toLocaleString().length-9)+'  '+'星期'+'日一二三四五六'.charAt(date.getDay());    
}
