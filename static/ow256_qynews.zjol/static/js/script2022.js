// 轮播图
$(function(){
  // 导航
  $('.nav .nav1').hover(function () {
    $(this).children('.child').stop().show('fast');
  }, function () {
    $(this).children('.child').stop().hide('fast');
  });

//   var num = 0;
//   function auto(){
//     num ++;
//     if(num < 5){
//       $('.banner-img li a').eq(num).fadeIn().siblings().fadeOut();
//       $('.banner-btn li').eq(num).addClass('showRed').siblings().removeClass('showRed');
//     }else{
//       num = 0;
//       $('.banner-img li a').eq(num).fadeIn().siblings().fadeOut();
//       $('.banner-btn li').eq(num).addClass('showRed').siblings().removeClass('showRed');
//     }
//   }
//   var timer = setInterval(auto,2000);
  var lunboNum = 0;
  function caozuo () {
    if(lunboNum < 4){
          var url = $('.lunboBtn li').eq(lunboNum).css('background');
          $('.lunboCon li').eq(lunboNum).find('.lunbotu').css({'background':url})  
          $('.pic_lunbo .pic_lunbo_tu').css({'background':url}) 
          $('.lunboCon li').eq(lunboNum).fadeIn().siblings().fadeOut();
          $('.lunboBtn li').eq(lunboNum).addClass('on').siblings().removeClass('on');
    }else{
          lunboNum = 0;
          var url = $('.lunboBtn li').eq(lunboNum).css('background');
          $('.lunboCon li').eq(lunboNum).find('.lunbotu').css({'background':url})  
          $('.pic_lunbo .pic_lunbo_tu').css({'background':url}) 
          $('.lunboCon li').eq(lunboNum).fadeIn().siblings().fadeOut();
          $('.lunboBtn li').eq(lunboNum).addClass('on').siblings().removeClass('on');
    }
  }
  function lunbo(){
    lunboNum ++;
    caozuo()
  }
  var lunboTimer = setInterval(lunbo,3000);

  $('.lunboBtn li').hover(function(){
    clearInterval(lunboTimer)
    lunboNum = $(this).index()
    caozuo()
  },function(){
    lunboTimer = setInterval(lunbo,3000);
  })
  
 });

function tab(obj, obj2, on) { //obj点击对象  obj2切换内容  on特殊类
  $(obj).click(function() {
    var index = $(this).index(obj);
    $(obj).removeClass(on);
    $(this).addClass(on);
    $(obj2).hide();
    $(obj2).eq(index).show();
  });
}
//链接切换
tab('.link .tit5 p span','.linkCon','on');


$('.link .tit5 p span').hover(function(){
  var index = $(this).index();
  $('.link .tit5 p span').removeClass('on')
  $(this).addClass('on');
  $('.linkCon').hide()
  $('.linkCon').eq(index).show();
})