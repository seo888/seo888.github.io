function aload(a) { "use strict"; a = a || window.document.querySelectorAll("[data-aload]"), void 0 === a.length && (a = [a]); var b, c = 0, d = a.length; for (c; d > c; c += 1)b = a[c], b["LINK" !== b.tagName ? "src" : "href"] = b.getAttribute("data-aload"), b.removeAttribute("data-aload"); return a }

// 封账的轮播
(function ($) {
  $.fn.Carousel = function (options) {
    var dtf = {
      wrapper: "NBD_Car_Wrapper",
      items: "u-img-items",
      time_test: 5000,
      adTimer: "adTimer",
      point: true,
      isAuto:true
    }
    var ops = $.extend(dtf, options);
    var imgWidth = $(this).find("li").width();
    var imgNum = $(this).find("li").length;
    var ul = $(this);
    var img_index = 0;
    function showpic(img_index) {
      boxMove = img_index * imgWidth;
      ul.stop(true, false).animate({ left: -boxMove }, 400);
      $("." + ops.items).find("a").eq(img_index).addClass("on").siblings().removeClass("on");
      titleText = ["图数馆", "火山财富"];
      Link = ["http://www.nbd.com.cn/columns/442", "http://www.nbd.com.cn/corp/2016products/"];
      var That = $("#NBD_Recom ").find(".on").index();
      $("#NBD_Recom abbr").text(titleText[That]);
      $("#NBD_Recom abbr").attr("dataUrl", Link[That]);
    }
    $("." + ops.items).find("a").each(function (i) {
      $(this).on("click", function () {
        img_index = i;
        showpic(img_index);
      })
    });
    $("#" + ops.wrapper).hover(function () {
      $(".point").show();
      clearInterval(ops.adTimer);
    }, function () {
      $(".point").hide();

      if(ops.isAuto) {
        ops.adTimer = setInterval(function () {
          img_index += 1;
          if (img_index > ul.find("li").length - 1) {       //最后一张图片之后，转到第一张
            img_index = 0;
          }
          showpic(img_index)
        }, ops.time_test);
      }

    }).trigger("mouseleave");
    if (ops.point == true) {

      $(".img_next").click(function () {
        clearInterval(ops.adTimer);
        img_index += 1;
        if (img_index > ul.find("li").length - 1) {
          img_index = 0;
        }
        showpic(img_index);
      })
      $(".img_prev").click(function () {
        clearInterval(ops.adTimer);
        img_index -= 1;
        if (img_index == -1) {
          img_index = ul.find("li").length - 1;
        }
        showpic(img_index);
      })
    } else {

    };

  };

})(jQuery);

// 



// 实时新闻滚动
(function () {
  window.onload = function () {
    scrollLeftToRight();
    // $(".g-main a ").hover(function () {
    //   $(this).attr("title", $(this).text())
    // });
    $("#NBD_Recom abbr").click(function () {
      window.open($(this).attr("dataUrl"));
    })
  };
  function scrollLeftToRight() {
    var $wrap = $('.g-currentNews');
    var $ul = $wrap.find('ul');
    var wrap_width = $wrap.width();
    var timer = null;
    var li_w = 0;
    $ul.find('li').each(function () {
      li_w += $(this).outerWidth(true);
    });

    if (li_w <= wrap_width) {
      return false;
    }
    $ul.css('width', li_w);
    var i = 0;
    var x = 0;
    function _marquee() {
      var _w = $ul.find('li:eq(0)').outerWidth();
      i++;
      if (i >= _w) {
        $ul.find('li:eq(0)').remove();
        i = 0;
        x = 0;
      } else {
        $ul.find('li:eq(0)').css('marginLeft', -i);
        if (i >= Math.max(_w - wrap_width, 0)) {
          if (x === 0) {
            var _li = $ul.find('li:eq(0)').clone(true);
            $ul.append(_li.css('marginLeft', 0));
            x = 1;
          }
        }
      }
      var _ul_w = 0;
      $ul.find('li').each(function () {
        _ul_w += $(this).outerWidth();
      });
      $ul.css('width', _ul_w);
    }

    $(".g-real").hover(function () {
      clearInterval(timer);
    }, function () {
      timer = setInterval(_marquee, 20);
    })
    timer = setInterval(_marquee, 20);
  }

})();


$(function () {
  var items = $("[data-aload]");
  var showItems = function () {
    items.each(function (index, item) {
      if (item.getAttribute('data-aload') != undefined) {
        if ($(item).parents('ul').css('visibility') === 'hidden') {
          return true;
        }
        var top = item.getBoundingClientRect().top;
        var se = document.documentElement.clientHeight;
        if (top <= se) {
          $(item).css('visibility', 'visible');
          $(item).hide();
          $(item).fadeIn();
          aload(item);
        }
      }
    });
    // console.log(1)
  }
  if ($(".g-main").length !== 0) {
    ReturnTopLeft = $(".g-main").offset().left + $(".g-main").width() + 20;
    $(".u-return-top").css({ "left": ReturnTopLeft });
    $(window).resize(function () {
      ReturnTopLeft = $(".g-main").offset().left + $(".g-main").width() + 20;
      $(".u-return-top").css({ "left": ReturnTopLeft });
    });
  } else {
    $(".u-return-top").hide();
  };
  showItems();
  window.onscroll = function () {
    showItems();
    if ($(".g-main").length !== 0) {
      var TouchAbsolute = $(document).height() - $(window).height() - $(".footer").outerHeight();
      if ($(document).scrollTop() < 100) {
        $(".u-return-top").hide();
        return
      }
      if ($(document).scrollTop() > TouchAbsolute) {
        var AbsoleTop = $(".u-return-top").offset().top;
        $(".u-return-top").css({
          "top": $(document).height() - $(".footer").outerHeight() - $(".u-return-top").height() - 40,
          "position": "absolute"
        })
      } else {
        $(".u-return-top").removeAttr("style");
        $(".u-return-top").css({
          "bottom": "10px",
          "left": ReturnTopLeft,
          "position": "fixed"
        })
      }
      //NewYearTheme
      // if ($("body").scrollTop() > 139) {
      //   $(".NewYearChicken-left").css({
      //     "position":"fixed",
      //     "top":"35px",
      //     "left":$(".g-main").offset().left-114
      //   })
      //   $(".NewYearChicken-right").css({
      //     "position":"fixed",
      //     "top":"35px",
      //     "left":$(".g-main").offset().left + 1120
      //   })
      // }else{
      //   $(".NewYearChicken-left").removeAttr("style");
      //   $(".NewYearChicken-right").removeAttr("style")
      // };
    }
  }

})