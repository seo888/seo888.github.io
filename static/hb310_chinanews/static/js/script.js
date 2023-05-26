jQuery(document).ready(function($) {

  // init 滚动消息
  if ($.isFunction($.fn.scrolling)) {
    $("#scroll").scrolling();
  }
  
  if ($.isFunction($.swiper)) { 
    // init banner swiper
    var bannerSwiper = $('#banner').swiper({
      pagination: '#banner .swiper-pagination',
      nextButton: '#banner .swiper-button-next',
      prevButton: '#banner .swiper-button-prev',
      slidesPerView: 1,
      paginationClickable: true,
      loop: true,
      autoplay: 3000,
      autoplayDisableOnInteraction: false
    });
  
    // init 产品 swiper
    var productSwiper = $('#product').swiper({
      nextButton: '#product .swiper-button-next',
      prevButton: '#product .swiper-button-prev',
      slidesPerView: 5,
      paginationClickable: true,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: 1800,
      autoplayDisableOnInteraction: false
    });
  }
  
  // tab 标签
  $('.section-tab').each(function() {
    var $box = $(this);
    var $tabs =  $box.find('ul.section-tab-head');
    var $content = $box.find('div.section-tab-content');
    // init
    $tabs.find('li').removeClass('active').eq(0).addClass('active');
    $content.removeClass('active').eq(0).addClass('active');
    // event
    $tabs.find('li').on('mouseover', function(event) {
      event.preventDefault();
      if (!$(this).hasClass('active')) {
        $(this).addClass('active').siblings().removeClass('active');
        $content.eq($(this).index()).addClass('active').siblings().removeClass('active');
      }
    });
  });
  
  // 滚动广告
  $('.custom-slide').each(function(index, el) {
    var $ul = $(this).find('ul');
    var $ol = $(this).find('ol');
    var $ctrl = $(this).find('.custom-ctrl');
    var isAuto = $(this).hasClass('custom-slide-auto');
    var isPage = $(this).hasClass('custom-slide-page');
  
    // init
    $ul.find('li').removeClass('active').eq(0).addClass('active');
    if (!isPage) {
      $ol.find('li').removeClass('active').eq(0).addClass('active');
    } else {
      $ol = $('<ol class="lh-banner-headline-ol"/>')
      $(this).append($ol);
  
      $ul.find('li').each(function(index, el) {
        if (index === 0) {
          $ol.append('<li class="active"></li> ')
        } else {
          $ol.append('<li></li> ')
        }
      });
    }
  
    // auto
    var auto = function(dir) {
      if (typeof(dir) == 'undefined' || dir == 'next') {
        if($ul.find('li.active').next().length > 0){
          $ul.find('li.active').removeClass('active').next().addClass('active');
          $ol.find('li.active').removeClass('active').next().addClass('active');
        }else{
          $ul.find('li').removeClass('active').eq(0).addClass('active');
          $ol.find('li').removeClass('active').eq(0).addClass('active');
        }
      } else {
        if($ul.find('li.active').prev().length > 0){
          $ul.find('li.active').removeClass('active').prev().addClass('active');
          $ol.find('li.active').removeClass('active').prev().addClass('active');
        }else{
          $ul.find('li').removeClass('active').eq($ul.find('li').length-1).addClass('active');
          $ol.find('li').removeClass('active').eq($ul.find('li').length-1).addClass('active');
        }
      }
    }
  
    // 是否开启auto
    var timer;
    if (isAuto) {
      timer = setInterval(auto, 4500);
    }
    // event
    $ol.find('li').on('mouseenter', function(event) {
      event.preventDefault();
      $(this).addClass('active').siblings().removeClass('active');
      $ul.find('li').eq($(this).index()).addClass('active').siblings().removeClass('active');
      clearInterval(timer);
    });
    $ol.find('li').on('mouseenter', function(event) {
      event.preventDefault();
      if (isAuto) {
        timer = setInterval(auto, 4500);
      }
    });
    $ul.find('li').on('mouseleave', function(event) {
      event.preventDefault();
      if (isAuto) {
        timer = setInterval(auto, 4500);
      }
    });
    $ul.find('li').on('mouseenter', function(event) {
      event.preventDefault();
      clearInterval(timer);
    });
  
  
  
    $ctrl.find('.prev').on('click', function(event) {
      event.preventDefault();
      auto('prev')      
    });
    $ctrl.find('.next').on('click', function(event) {
      event.preventDefault();
      auto('next')      
    });
  });
  
  // 文章页轮播前处理
  var photoContent=$('.content.photo');
  var articleContent = photoContent.find('.article-content');
  var photoSwiper = $('#articleSwiper .swiper-container');
  var photoWrapper = photoSwiper.find('.swiper-wrapper');
  var photosArr = articleContent.find('.img_wrapper');
  var newContent = $('<div class="article-content" />').append(articleContent.children(':not(.img_wrapper)'));
  articleContent.after(newContent);
  // 推入/处理
  articleContent.hide();
  photoWrapper.empty();
  
  for (var i = 0; i < photosArr.length; i++) {
    var description = $(photosArr[i]).find('span').length !== 0?$(photosArr[i]).find('span').text():$(photosArr[i]).find('.img_descr').text();
    photoWrapper.append('<div class="swiper-slide">' +
      '  <div class="content-slide">' +
      '    <img src="'+$(photosArr[i]).find('img').attr('src')+'" title="'+$(photosArr[i]).find('img').attr('title')+'">' +
      '    <div class="bottom">' +
      '      <div class="text">'+description+'</div>' +
      '    </div>' +
      '  </div>' +
      '</div>');
  }
  
  // 文章页轮播
  if(photoSwiper.is(':visible')){
    var pnums = $('#articleSwiper .pagination-nums');
    pnums.html('<span class="on">1</span>/<span class="bg">/</span>');
  
    var photoSwiper = new Swiper(photoSwiper.get(0), {
      loop: true,
      grabCursor: true,
      autoplay: 5000,
  
      onFirstInit: function(swiper) {
        pnums.find('.on').text('1');
        pnums.find('.bg').text(swiper.slides.length-2);
      },
      onSlideChangeEnd: function(swiper) {
        var n = swiper.activeIndex;
        if (n==0) {
          n=swiper.slides.length-2;
        } else if (n>swiper.slides.length-2) {
          console.log(n);
          n=1;
        } else {
          n=swiper.activeIndex;
        }
        pnums.find('.on').text(n)
      }
    })
    $('#articleSwiper .arrow-left').on('click', function(e) {
      e.preventDefault()
      photoSwiper.swipePrev()
    })
    $('#articleSwiper .arrow-right').on('click', function(e) {
      e.preventDefault()
      photoSwiper.swipeNext()
    })
  }
  
  // 回到顶部
  var $body = $(document.body);;
  var $bottomTools = $('.bottom_tools');
    $(window).scroll(function () {
      var scrollHeight = $(document).height();
      var scrollTop = $(window).scrollTop();
      var $footerHeight = $('.page-footer').outerHeight(true);
      var $windowHeight = $(window).innerHeight();
      scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display","block") : $("#scrollUp").fadeOut(200);     
      $bottomTools.css("bottom", scrollHeight - scrollTop - $footerHeight > $windowHeight ? 40 : $windowHeight + scrollTop + $footerHeight + 40 - scrollHeight);
    });
    $('#scrollUp').click(function (e) {
      e.preventDefault();
      $('html,body').animate({ scrollTop:0});
    });
    
  // 标题空白
  var empty = $('.isempty');
  empty.each(function(index, el) {
    if ($(this).find('span').html() == '') {
      $(this).remove();
    }
  });
  
  // 搜索控制
  function searchHandle(str) {
    if (str !== '') {
      //console.log(str);
      window.open('http://search.news.chinanews.com/search.do?q='+encodeURIComponent(str)+'&dbtype=fj');
    } else{
      return false;
    }
  }
  $('div.search').find('button.icon-search').on('click', function(event) {
    event.preventDefault();
    searchHandle($(this).siblings('input').val());
  });
  $('div.search').find('input[type="text"]').on('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == '13') {
      //console.log($(this).val());
      searchHandle($(this).val());
    }
  });
  
  if ($.isFunction($.fn.lazyload)) {
    // 懒加载
    $("#listContainer img").lazyload({
        event : "turnPage",
        effect : "fadeIn"
    });
  }
  
  if ($.isFunction($.fn.jPages)) {
    // 分页处理
    $("div#pageContainer").jPages({
      containerID: "listContainer",
      perPage: $('#listContainer').data('size')?$('#listContainer').data('size'):12,
      previous: "上一页",
      next: "下一页",
      callback: function(pages, items) {
        $("#listContainer").show();
        /* lazy load current images */
        items.showing.find("img").trigger("turnPage");
        /* lazy load next page images */
        items.oncoming.find("img").trigger("turnPage");
      }
    });
    $('#listContainer').css({
      minHeight: 0
    })
  }
  console.log('%cTS:cheneyliu QQ:475598052 ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:12px;');
  // end
  });