$(document).ready(function () {
    
    //语言选择
    $(".drop").on("click", function (ev) {

    var flag = $(this).hasClass("active");
    if (flag) {
      $(this).removeClass("active");
    } else {
      $(".drop").removeClass("active");
      $(this).addClass("active");
    }
    // 变更图标上下方向
    if ($(this).find('.toggle-arrow').hasClass('fa fa-angle-up')) {
      $('.dropup').find('.toggle-arrow').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
      $('.dropdown').find('.toggle-arrow').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
      $(this).find('.toggle-arrow').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');

    } else if ($(this).find('.toggle-arrow').hasClass('fa fa-angle-down')) {
      $('.dropup').find('.toggle-arrow').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
      $('.dropdown').find('.toggle-arrow').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
      $(this).find('.toggle-arrow').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');

    } else {}
    ev.stopPropagation();
  });
  
  //一级导航栏start
  if ($(".nav-subnav").length > 0) {
    var sheigth = $(".nav-subnav").offset().top + $(".nav-subnav").height();

    $(document).on('scroll', function (e) {
      var scrollTop = document.documentElement.scrollTop;
      if (sheigth < scrollTop) {
        $(".nav-subnav").addClass('fixed');
        if ($('.nav-subnav .initial').length == 0 && $('.nav-main-nav .open').length == 0) {
          // console.log($('.nav-main-nav li'));
          $('.nav-subnav .second-hidden-navbar').addClass('open');
        } else {}
      } else {
        $(".nav-subnav").removeClass('fixed');
        if ($('.nav-subnav .initial').length == 0) {
          $('.nav-subnav .second-hidden-navbar').removeClass('open');
        } else {}
      }
      
      // fixed
      $('.nav-subnav.fixed').css('left', -$(document).scrollLeft());
    })
  }
  //一级导航栏 end


  // 二级导航栏start
  $('.nav-main-nav li').hover(function () {
    $(this).addClass('open');
    var index = $('.nav-main-nav li').index(this);
    $('.nav-subnav .second-navbar').hide();
    $('.nav-subnav .second-navbar').eq(index).show();
  }, function () {
    $(this).removeClass('open');
    $('.nav-subnav .second-navbar').hide();
    $('.nav-subnav .second-navbar.initial').show();
  });
  $('.nav-subnav .second-navbar').hover(function () {
    var index = $('.nav-subnav .second-navbar').index(this);
    $('.nav-main-nav li').eq(index).addClass('open');
    $('.nav-subnav .second-navbar').hide();
    $(this).show();
  }, function () {
    $('.nav-main-nav li').removeClass('open');
    $('.nav-subnav .second-navbar').hide();
    $('.nav-subnav .second-navbar.initial').show();
  });
  // 二级导航栏 end
  
  // search mask toggle start
  $('.nav-search-text').on('click', function () {
    $('.nav-search-mask').fadeIn(150);
    $('.nav-search-input').focus();
  });

  $('.nav-search-mask').on('click', function () {
    $(this).fadeOut(150);
  });

  $('.nav-search-wrap').on('click', function (ev) {
    ev.stopPropagation();
  });

  $(document).on("keydown", function (ev) {
    if (ev.which === 27) {
      $('.nav-search-mask').fadeOut(150);
    }
  });
  // search mask toggle end
  
  $('nav.initial .fixed-navbar').on('click', function (ev) {
    ev.stopPropagation();
    console.log(ev.target);
    $(this).toggleClass('active');
  })
    
})