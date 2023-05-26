$(function() {
  var lanren = $("img[data-src],img[_src]"), //延时加载
    toTop = $("#toTop"), //回到顶部
    head = $("#head"), //头部随屏
    slidelr = $("#slidelr"), //左右广告
    bigslide = $("#bigslide"), //中框广告
    biginfo = bigslide.find("img"), //中框判断是否有img
    actionUrl = "http://search.cjn.cn/was40/search?channelid=5877&template=cjseach.jsp&searchword=", //搜索链接
    isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest; //如果为IE6
  //搜索相关 
  function utf8(wide) { //搜索字符解析
    var c, s;
    var enc = "";
    var i = 0;
    while (i < wide.length) {
      c = wide.charCodeAt(i++);
      //   handle   UTF-16   surrogates  
      if (c >= 56320 && c < 57344) continue;
      if (c >= 55296 && c < 56320) {
        if (i >= wide.length) continue;
        s = wide.charCodeAt(i++);
        if (s < 56320 || c >= 56832) continue;
        c = (c - 55296 << 10) + (s - 56320) + 65536;
      }
      //output   value  
      if (c < 128) enc += String.fromCharCode(c);
      else if (c < 2048) enc += String.fromCharCode(192 + (c >> 6), 128 + (c & 63));
      else if (c < 65536) enc += String.fromCharCode(224 + (c >> 12), 128 + (c >> 6 & 63), 128 + (c & 63));
      else enc += String.fromCharCode(240 + (c >> 18), 128 + (c >> 12 & 63), 128 + (c >> 6 & 63), 128 + (c & 63));
    }
    return enc;
  }
  var hexchars = "0123456789ABCDEF";

  function toHex(n) {
    return hexchars.charAt(n >> 4) + hexchars.charAt(n & 15);
  }
  var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

  function encodeURIComponentNew(s) {
    var s = utf8(s);
    var c;
    var enc = "";
    for (var i = 0; i < s.length; i++) {
      if (okURIchars.indexOf(s.charAt(i)) == -1) enc += "%" + toHex(s.charCodeAt(i));
      else enc += s.charAt(i);
    }
    return enc;
  }
  //搜索字符解析end
  $(".seach").click(function() { //开始搜索
    keyword = encodeURIComponentNew($(this).siblings(".cjn-seach").val()); //搜索关键字
    window.open(actionUrl + keyword);
  });
  $(".seach-start").hover(function() {
    $(".seach-con").stop().animate({
      "width": "220"
    }, 350);
  }, function() {
    $(".seach-con").stop().animate({
      "width": "0"
    }, 350);
  });
  if (!isPlaceholder()) { //如果不支持Placeholder
    $("input").not("input[type='password']").each(function() {
      if ($(this).val() == "" && $(this).attr("placeholder") != "") {
        $(this).val($(this).attr("placeholder"));
        $(this).focus(function() {
          if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
        });
        $(this).blur(function() {
          if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
        });
      }
    });
  };

  function isPlaceholder() {
    return "placeholder" in document.createElement("input");
  };
  $(".cjn-rdtj li").prepend(function(n) { //热点推荐
    var sp = "<span>" + (n + 1) + "</span>";
    if (n > 2) sp = "<span style='background-color:#97accc'>" + (n + 1) + "</span>";
    return sp;
  });
  //全局延时加载添加默认图片
  lanren.attr("src", "http://img.cjn.cn/2013cjn/pub/sucai/blank.png");
  //全局主内容块清除浮动
  //$(".con-main").append("<div class='clearfix h0'></div>");
  //全局字盖图
  $(".pic-title").each(function() {
    var pic_txt = $("<p class='pngbg pic-title-txt'><span></span></p>");
    $(this).parent().parent().css({
      "position": "relative"
    }).append(pic_txt);
    pic_txt.css({
      "width": $(this).width()
    }).text($(this).attr("alt"));
  });
  //点击返回顶部按钮
  toTop.children(".Tohead").click(function() {
    $("html, body").scrollTop(0);
  });
  $("#slidelr li").each(function() { //左右广告层自适应图片
    var imgw, imgh;
    if ($(this).find("img").length > 0) {
      imgw = $("img", this).width();
      imgh = $("img", this).height();
    } else if ($(this).find("iframe").length > 0) {
      imgw = $("iframe", this).width();
      imgh = $("iframe", this).height();
    } else {
      imgw = 120;
      imgh = 270;
    }
    $(this).parent("ul").css("width", imgw + 6);
    $(this).css({
      width: imgw,
      height: imgh
    });
    $("p", this).css({
      width: imgw - 10,
      height: imgh - 10
    });
    $(this).siblings("span").css("width", imgw + 6);
  });

  function slider_start() { //左右广告显示初始化
    var winw_s = $(window).width();
    if (winw_s < 1160) {
      slidelr.hide();
      winw_s > 1110 ? ($(".slidelr-show").height(50), toTop.css("display", "block")) : (toTop.css("display", "none"), $(".slidelr-show").height(0));
    } else {
      $(".slidelr-show").height(0);
      slidelr.show();
    }
  };
  slider_start(); //运行一次
  var slidelrShow = function(win) { //屏幕尺寸以及相关匹配显示
    if (win < 1160) {
      slidelr.hide();
      win > 1110 ? ($(".slidelr-show").height(50), toTop.css("display", "block")) : (toTop.css("display", "none"), $(".slidelr-show").height(0));
    } else {
      toTop.css("display", "block");
      $(".slidelr-show").height() == 50 ? slidelr.hide() : slidelr.show();
    }
  };
  $(window).resize(function() { //监视窗口大小改变
    var winw = $(window).width();
    slidelrShow(winw);
  });
  //slidelr轮换效果
  /*if ($.support.transition) {//判断是否支持特效
    $("#slidelr li").hover(function() {
      $("img", this).stop(false, true).transition({
        rotateY:"180deg",
        opacity:"0"
      });
      $("p", this).css({
        display:"block",
        opacity:"0",
        rotateY:"-180deg"
      }).stop(false, true).transition({
        rotateY:"0deg",
        opacity:"1"
      });
    }, function() {
      $("img", this).show().stop(false, true).transition({
        rotateY:"0deg",
        opacity:"1"
      });
      $("p", this).stop(false, true).transition({
        rotateY:"-180deg",
        opacity:"0"
      });
    });
    $("#slidelr .slidelr-close").click(function() {//关闭左右
      $("#slidelr").fadeOut(500, function() {
        $(".slidelr-show").css({
          rotateY:"-180deg"
        }).stop(false, true).transition({
          rotateY:"0deg",
          height:"50px"
        });
      });
    });
    $(".slidelr-show").click(function() {//打开左右
      if ($(window).width() < 1160) {//屏幕提示
        alert("你屏幕太小,无法打开");
      } else {
        $(this).stop(false, true).transition({
          rotateY:"-180deg",
          height:"0"
        });
        $("#slidelr").fadeIn(500);
      }
    });
  } else {//if不支持特效  };*/
  /*$("#slidelr li").hover(function() {
    $("img", this).stop(false, true).slideUp();
    $("p", this).stop(false, true).slideDown();
  }, function() {
    $("img", this).stop(false, true).slideDown();
    $("p", this).stop(false, true).slideUp();
  });*/
  $("#slidelr .slidelr-close").click(function() { //关闭左右
    $(this).parent().fadeOut(500, function() { //同时控制就删除
      var sl = $('.slide-l').css('display'),
        sr = $('.slide-r').css('display'); //同时控制就删除
      if (sl == "none" && sr == "none") {
        $(".slidelr-show").animate({
          "height": "50px"
        });
      } //同时控制就删除
    });
    // $("#slidelr").fadeOut(500,function(){//同时控制就显示
    //$(".slidelr-show").animate({"height":"50px"});//显示
    //});
  });
  $(".slidelr-show").click(function() { //打开左右
    if ($(window).width() < 1160) { //屏幕提示
      alert("你屏幕太小,无法打开");
    } else {
      $(".slidelr-show").animate({
        "height": "0"
      }, function() {
        $("#slidelr").fadeIn(500);
        $("#slidelr ul").fadeIn(500); //同时控制就删除
      });
    }
  });
  //滚动相关
  var scrollLoad = function() { //滚动加载事件
    $("img[data-src]").each(function() {
      var t = $(this);
      if (t.offset().top <= $(document).scrollTop() + $(window).height() + 10) {
        t.attr("src", t.attr("data-src")).removeAttr("data-src");
      }
    });
  };
  scrollLoad(); //运行一次
  $(window).scroll(function() { //滚动监视
    var st = $(document).scrollTop(),
      winh = $(window).height(),
      th = toTop.height(); //监视滚动轴距顶高和窗口高
    st > 400 ? toTop.children(".Tohead").show() : toTop.children(".Tohead").hide(); //回到顶部显示控制
    if (isIE6) { //IE6HACK
      toTop.css("top", st + winh - th - 50); //回到顶部位置
      head.css("top", st); //头部位置
    }
    st > 80 ? head.addClass("move") : head.removeClass("move"); //HEAD滚动
    scrollLoad();
    slidelr.css("top", st); //左右广告位置
  });
  //特大广告
  function big_open() {
    var id = 0;
    bigslide.fadeIn(500, function() {
      id = setTimeout("$('.big_close').trigger('click')", 5000); //10秒后自动模拟点击关闭 1e4
      bigslide.hover(function() { //鼠标经过滑出
        clearTimeout(id);
      }, function() {
        id = setTimeout("$('.big_close').trigger('click')", 5000);
      });
    });
    $(".big_close").click(function() { //手动关闭
      bigslide.hide(500);
      clearTimeout(id);
    });
  };

  function loadDelay(w, h, s) { //获取参数并显示
    biginfo.attr("src", s).removeAttr("data-url");
    bigslide.css({ //大图外层控制
      "width": w,
      "height": h,
      "margin-left": -w / 2 - 5,
      "margin-top": -h / 2 - 5
    });
    big_open();
  };

  function big_load() { //加载大图
    var n = new Image();
    n.onload = function() {
      loadDelay(n.width, n.height, n.src);
    };
    n.src = biginfo.attr("data-url");
  };

  function big_data() {
    if (typeof biginfo.attr("data-url") == "undefined") { //判断是否存在data-url
      return false;
    } else {
      return true;
    };
  };
  if (big_data()) { //判断地址是否为空
    biginfo.attr("data-url").length != 0 ? big_load() : "";
  };
  //列表页面
  $("#main-content .art-li").each(function() {
    var i = $(this).index() + 1;
    i % 5 == 0 && i > 0 ? $(this).css({
      "padding-bottom": "20px",
      "border-bottom": "1px #e4e4e4 dashed"
    }) : '';
    i % 5 - 1 == 0 ? $(this).css("padding-top", "20px") : '';
  });
  //全局Side动画
  $(".sidebar").slide({
    effect: "fold",
    autoPlay: true,
    interTime: "5000"
  });
  $(".sidebar-lr").slide({
    effect: "fold",
    autoPlay: true,
    interTime: "8000"
  });
  $(".art-tab").slide({
    effect: "fade",
    titCell: ".hd h2",
    delayTime: "0",
    triggerTime: "0"
  });
  $(".art-tab-h3").slide({
    effect: "fade",
    titCell: ".hd h3",
    delayTime: "0",
    triggerTime: "0"
  });
  $(".cjn-link-txt").slide({
    effect: "fade",
    titCell: ".hd h2",
    delayTime: "0",
    triggerTime: "0"
  });
  $(".cjn-video").slide({
    effect: "left",
    titCell: ".hd",
    autoPage: "<span></span>"
  });
  //登录
  $("#ifr-dl").attr("src", "http://bbs.cjn.cn/index.php?m=area&alias=lady");
  //文章页图片相关
  var box = $("<div class='box-img pngbg'><img src=''></div>");
  ($(".art-main img").length > 0) ? $("body").append(box): '';
  $(".art-main img").each(function() {
    // var fy = $("<em class='ny' title='下一页'></em><em class='qy' title='上一页'></em>"),
    //   yt = $("<p class='box-show'>点击查看高清原图</p>");
    // $(this).parent().css({
    //   "position": "relative",
    //   "width": "100%"
    // }).prepend(fy).append(yt).find("em").css({
    //   "height": $(this).height(),
    //   "width": $(this).parent().width() / 2
    // });
    $(this).attr({
      "alt": "点击查看高清原图",
      "title": "点击查看高清原图"
    });
  })
  // $(".ny").click(function() {
  //   ($(".nt a").length > 0) ? location.href = $(".nt a").attr("href"): alert("已经是尾页了");
  // })
  // $(".qy").click(function() {
  //   ($(".qt a").length > 0) ? location.href = $(".qt a").attr("href"): alert("已经是第一页了");
  // })
  // $(".box-show").click(function() {
  //   $(".box-img").width($(window).width()).height($(window).height()).fadeIn();
  //   $(".box-img img").attr("src", $(this).siblings("img").attr("src"));
  //   (isIE6) ? $(".box-img").css("top", $(document).scrollTop()): '';
  // })
  // $(".art-main img").click(function() {
  //   $(".box-img").width($(window).width()).height($(window).height()).fadeIn();
  //   $(".box-img img").attr("src", $(this).attr("src"));
  //   (isIE6) ? $(".box-img").css("top", $(document).scrollTop()): '';
  // })
  $(".box-img").click(function() {
    $(this).fadeOut();
  })
  //文章页字体
  $(".f-a").click(function() {
    var c_n = $(".art-main").css("font-size").substr(0, 2);
    if (c_n < 20) {
      $(".art-main").css("font-size", function(index, value) {
        return parseFloat(value) + 2;
      });
      $(this).siblings('a').removeClass('on');
    } else {
      $(this).addClass('on').siblings('a').removeClass('on');
      return
    }
  });
  $(".f-b").click(function() {
    var c_n = $(".art-main").css("font-size").substr(0, 2);
    if (c_n > 14) {
      $(".art-main").css("font-size", function(index, value) {
        return parseFloat(value) - 2;
      });
      $(this).siblings('a').removeClass('on');
    } else {
      $(this).addClass('on').siblings('a').removeClass('on');
      return
    }
  });
});