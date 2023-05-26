$(function () {
  //搜索
  var sList = $('#search-all ul'),
    cats = $('a', sList),
    cat = $('#search-all .cat-selected'),
    navList = $('#navh li');

  $('body').click(function () {
    sList.hasClass('visible') && sList.removeClass('visible');
    cat.hasClass('close') && cat.removeClass('close');
  });
  $('.tab-wrap').each(function () {
    if ($(this).attr('id') === 'imgs-show') {
      $(this).Tabs({ autoPlay: true });
    } else {
      $(this).Tabs()
    }
  });

  cat.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (!sList.hasClass('visible')) {
      $(this).addClass('close');
      sList.addClass('visible');
    } else {
      $(this).removeClass('close');
      sList.removeClass('visible');
    }
  });
  cats.click(function (e) {
    e.preventDefault();
    cat.text($(this).text())
  });

  $('.ld a').eq(4).text('[更多]').css({
    float: 'right',
    color: '#898989'
  });

  //回到顶部
  if ($(window).width() > 1000) {
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 500) {
        $('.section-float').fadeIn(500);
        $('.section-float').css({ "left": ($(window).width() - 1200) * 0.5 + 1210 + "px" });
      } else {
        $('.section-float').fadeOut(500);
      }
    });
    $('.section-float .back-to-top').on('click', function () {
      $('html,body').animate({ scrollTop: 0 }, 750);
      return false;
    })

    $('.section-float .qr').hover(function () {
      $(this).next().fadeIn(300);
    }, function () {
      $(this).next().fadeOut(300);
    });
  }
  //查看更多
  $('.other .more').on('click', function () {
    // alert(1)
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $('.news-pic-item:gt(2)').addClass('undis');
      $(this).text('查看更多');
    } else {
      $(this).addClass('open');
      $('.news-pic-item:gt(2)').removeClass('undis');
      $(this).text('收起');
    }
    return false;
  });

  /* 20200628 */
  var oVideo = $('video');
  for (var i = 0; i < oVideo.length; i++) {
    $(oVideo[i]).attr("width", "").attr("height", "");
  }

});