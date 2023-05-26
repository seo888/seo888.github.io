$(function () {
  //点击相关网站展开收起操作
  $('.foot-top').on('click', '.foot-a-1', function (e) {
    e.stopPropagation();
    $(this).parent().siblings().find('.foot-a-1').removeClass('cur');
    $(this).parent().siblings().find('.foot-li-box').hide();
    if ($(this).hasClass('cur')) {
      $(this).removeClass('cur');
      $(this).next().stop().animate({height: 0}, 500, 'swing', function () {
        $(this).next().hide();
      });
    } else {
      $(this).addClass('cur');
      if (IEVersion() < 10) {
        $(this).next().css('display','block').stop().animate({height: '200px'}, 500, 'swing');
      } else {
        $(this).next().css('display','block').stop().animate({height: '1.96rem'}, 500, 'swing');
      }
    }
  })
  //点击其他地方收起
  $(document).on('click', function () {
    //收起底步下拉展开菜单
    $('.foot-t-cont').find('.cur').removeClass('cur').next().stop().animate({height: 0}, 500, 'swing', function () {
      $(this).next().hide();
    });
    //收起手机头部下拉展开菜单
    $('.head-nav-2').animate({right: '-3rem'}, 500, 'swing');
  })

  //点击导航栏内部区域收起手机头部下拉展开菜单
  $('.head-nav-2').on('click', function () {
    $('.head-nav-2').animate({right: '-3rem'}, 500, 'swing');
  })

  //点击导航栏内部文字阻止收起手机头部下拉展开菜单
  $('.head-nav-2').on('click', 'a', function (e) {
    var _index = $(this).index()
    if (_index === 0) {
      return;
    }
    e.stopPropagation();
  })

  //点击公共头部2-wap端下拉按钮展开菜单
  $('#head-wap').on('click', '.head-drop-btn', function (e) {
    e.stopPropagation();
    $('.head-nav-2').animate({right: 0}, 500, 'swing');
  })
  //点击导航部门内容阻止收起
  $('#head-wap').on('click', '.head-nav-2', function (e) {
    e.stopPropagation();
  })

  //文本省略
  // $('.ellipsis2').ellipsis({row:2})
});
