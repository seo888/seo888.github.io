$(function () {
  if ($(".Min1 .Min1_a .hdwrap .ban2 ul li").size() >= 1) {
    $('#demo1').banqh({
      box: "#hdlist", //总框架
      pic: "#ban_pic1", //大图框架
      pnum: "#ban_num1", //小图框架
      autoplay: true, //是否自动播放
      interTime: 5000, //图片自动切换间隔
      delayTime: 400, //切换一张图片时间
      pop_delayTime: 400, //弹出框切换一张图片时间
      order: 0, //当前显示的图片（从0开始）
      picdire: true, //大图滚动方向（true为水平方向滚动）
      mindire: true, //小图滚动方向（true为水平方向滚动）
      min_picnum: 5, //小图显示数量
      pop_up: false //大图是否有弹出框
    });
  }

  $(".Min1 .Min1_b  .tab_box .tab").click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    $(this).parents(".Min1_b").find(".news ul").eq($(this).index()).show().siblings().hide();
  })
  $(".hj_tuijian .ol  .li").click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    $(this).parents(".hj_tuijian").find(".lab .lis").eq($(this).index()).show().siblings().hide();
  })
  // TAB
  function tab_mouser(e, f) {
    e.mouseenter(function () {
      $(this).addClass('on').siblings().removeClass('on');
      if (f) {
        f.eq($(this).index()).show().siblings().stop().hide();
      }
    })
  }
  tab_mouser($('.phwrap .lis ul li')); //排行榜切换
  tab_mouser($('.MinRb ul li')); //排行榜切换
  tab_mouser($('.Cont_R .MinRe .lab p'), $('.Cont_R .MinRe .lis ul')); //综合排行切换
  tab_mouser($('.MinRec ul li'));
  //切换游戏软件
  $(".Min_  .title .labe li").mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $(this).parents(".Min_").find(".Min_lis ul").eq($(this).index()).show().siblings().hide();
  })
  //切换合集
  $(".Min2   .title .labe li").mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $(this).parents(".Min2 ").find(".lis_ ul").eq($(this).index()).show().siblings().hide();
  })

  //hover  下载二维码
  // 二维码图片
  $('.qrcode').each(function () {
    var url = $(this).attr('url');
    var id = $(this).attr('id');
    makeQRCode(id, url);
    $(this).removeAttr('title');
  });
  //生成二维码图片
  function makeQRCode(codes, url, width, height) {
    var width = width || 130;
    var height = height || 130;
    var qrcode = new QRCode(codes, {
      width: width,
      height: height
    });
    qrcode.makeCode(url);
  }

  $(".game_top .down_box .btn .num").hover(function () {
    $(this).find(".sao").stop().show();
  }, function () {
    $(this).find(".sao").stop().hide();
  })

  //相关切换
  if ($(".Min_R .MinRa .bd li").size() >= 1) {
    jQuery(".Min_R .MinRa ").slide({ mainCell: ".bd ul", titCell: ".hd ul", effect: 'leftLoop', easing: 'swing', autoPage: true });
  };
  //    详情的切换
  //  点击下载详情实现切换
  $(' .Cont_L .warp_swich .data_tab  p').on('click', function () {
    var i = $(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    if (i == 0) {
      $(this).parents(".warp_swich").find(".warp_item .item_").show()
    } else {
      $(this).parents(".warp_swich").find(".warp_item .item_").eq(i + 1).show().siblings().hide()
    }
    $(window).scrollTop(0)
  });

  //排行榜
  $('.PhL ul li .tab').click(function () {
    if ($(this).parents('li').hasClass("on")) {
      $(this).parents('li').removeClass("on");
      $(this).next('.list_box').slideUp(300);
    } else {
      $(this).parents('li').addClass('on').siblings().removeClass("on");
      $(this).next('.list_box').slideDown(300);
    }
  })

  //   显示预约
  $(".game_top .down_box .btn3").click(function () {
    $(".yuyue_warp").show();
    $(".yuyue_warp .yuyue_box").show();
  });
  $(".orderBtn").click(function () {
    $(".yuyue_warp").show();
    $(".yuyue_warp .yuyue_box").show();
  });
  $(".yuyue_warp .item_box .close").click(function () {
    $(".yuyue_warp").hide();
    $(this).parents(".item_box").hide();
  })
});

//预约
function yuyueform(id) {
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  var mobile = $('#mobile').val();
  var murl = $.trim($('#mobile_url').val());
  var game_name = $.trim($("input[name='game_name']").val());
  var type = $.trim($("input[name='type_info']").val());
  if (mobile == "") {
    alert('*请输入手机号')
    return false;
  }
  else if (!myreg.test(mobile)) {
    alert('*请输入正确手机号码')
    return false;
  }
  $.post('/downs/reservation', { phone: mobile, game_id: id, game_name: name, system: 'pc', type_info: type }, function (data) {
    if (data.code == 1) {
      alert('预约成功！');
      $('.close').click();
    }
    else {
      alert(data.msg);
    }
    $(".yuyue_warp").hide();
    $('.close').parents(".item_box").hide();
    return false;

  }, 'json');
}

//截图轮播
$(function () {
  if ($('.snopshot').length > 0) {
    var sst = $(".snopshot");
    var ssct = $('.snapShotCont');
    if (sst.length == 1) {
      $(".snopshot").clone().insertAfter(".snopshot").insertAfter(".snopshot");
      imgShot();

    } else if (sst.length == 2) {
      $(".snopshot:nth-child(2)").clone().insertAfter(".snopshot:nth-child(2)");
      imgShot();

    } else {
      imgShot();
    }
  }

 function imgShot() {
   var img = new Image();
   img.src = $(".snapShotCont li").eq(0).find("img").attr("src");
   img.onload = function () {
     var imgWidth = img.width;
     var imgHeight = img.height;
     if (imgWidth > imgHeight) {
       imgHeight = 320;
       imgWidth = 520;
       sst.css('height', 270)
       $('.snap-shot-btn i').css('top', '40%')
     } else {
       imgHeight = 368;
       imgWidth = 248;
       sst.css('height', 300)
     }
     var snapShotWrap = new posterTvGrid('snapShotWrap', {
       imgHeight: imgHeight,
       imgWidth: imgWidth,
       imgP: parseInt(imgWidth / 1.2)
     });
   }
 }

})

;(function(){$.fn.extend({isOnScreen:function(a){var a=$.extend({},a),b=$(window),c={top:b.scrollTop(),left:b.scrollLeft()};c.right=c.left+b.width(),c.bottom=c.top+b.height();var d=this.offset();return d.right=d.left+this.outerWidth(),d.bottom=d.top+this.outerHeight(),!(c.right<d.left||c.left>d.right||c.bottom<d.top||c.top>d.bottom)},lazyload:function(a){var a=$.extend({cattr:"src",mattr:"data-original",els:"img",rate:200},a),b=function(){var b=$(a.els+":visible["+a.mattr+"]");b.each(function(){$(this).isOnScreen()&&$(this).attr(a.cattr,$(this).attr(a.mattr)).removeAttr(a.mattr)})};loadrun=setInterval(b,a.rate)}})})(jQuery),$(document).ready(function(){var a=$("img[data-original]");a.length&&jQuery("img[data-original]").lazyload({threshold:100})});


//app轮播
if ($(".APP_lunbox .bd li").size() >= 1) {
  jQuery(".APP_lunbox").slide({ titCell: ".hd ul", autoPage: true, mainCell: ".bd ul", autoPlay: true, effect: "leftLoop" });
}

//页面左右划动
function HomeScroll(a, b) { function g() { var g = $(window).scrollLeft(), h = $(window).scrollTop(), i = $(document).height(), j = $(window).height(), k = c.height(), l = d.height(), m = k > l ? f : e, n = k > l ? d : c, o = k > l ? c.offset().left + c.outerWidth(!0) - g : d.offset().left - c.outerWidth(!0) - g, p = k > l ? l : k, q = k > l ? k : l, r = parseInt(q - j) - parseInt(p - j); $(a + "," + b).removeAttr("style"), j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;left:" + o + "px;" + (j > p ? "top" : "bottom") + ":0;") } if ($(a).length > 0 && $(b).length > 0) { var c = $(a), d = $(b), e = c.offset().top, f = d.offset().top; $(window).resize(g).scroll(g).trigger("resize") } }
HomeScroll(".Cont_L", ".Cont_R");
HomeScroll("#PhL", "#PhR");
HomeScroll(".swMidL", ".swMidR");

function zqtext_height() {
  var size_ = $("#tab_box6 .ord_edition ul li").size();
  var h1 = $("#tab_box6 .ord_edition ul").height()
  if (size_ > 3) {
    $("#tab_box6 .ord_edition .more_").show();
    $("#tab_box6 .ord_edition ul li:gt(2)").hide();
    var h2 = $("#tab_box6 .ord_edition ul").height()
    $("#tab_box6 .ord_edition ul").css("height", h2 + 'px')
  } else {
    $("#tab_box6 .ord_edition .more_").hide();
  }
  $("#tab_box6 .ord_edition .more_ a").click(function () {
    var tex = $(this).text();
    if (tex == "展开++") {
      $("#tab_box6 .ord_edition ul li:gt(2)").show();
      $(this).parents("#tab_box6 .ord_edition").find("ul").stop().animate({ "height": h1 + 'px' }, 200);
      $(this).text("收起++")

    } else {
      $("#tab_box6 .ord_edition ul li:gt(2)").hide();
      $(this).parents("#tab_box6 .ord_edition").find("ul").stop().animate({ "height": h2 + 'px' }, 200);
      $(this).text("展开++")
    }
  })
}
zqtext_height();
//更多版本
if ($(".warp_swich .tab_box6more .ord_edition ul li").size() > 10) {
  $(".warp_swich .item_ .more").show();
  $(".warp_swich .item_ .more").click(function () {
    $(".warp_swich .item_ .ord_edition ul").css({ "max-height": "none", "height": "auto" })
    $(this).hide();
  })
}

if ($(".swEdition ul li").size() > 10) {
  $(".swEdition .editionMore").show();
  $(".swEdition .editionMore").click(function () {
    $(".swEdition ul").css({ "max-height": "none", "height": "auto" })
    $(this).hide();
  })
}

//版本日志
detailsoft();
function detailsoft() {
  $(".news_center h3").each(function () {
    var retext = $(this).text();
    if (retext == "版本日志") {
      $(this).addClass("g-revise");
      var elem = $(".g-revise").nextAll().addClass("g-relist");

      if ($(".g-revise").nextAll("h4").length >= 2) {
        $(".g-revise").append('<font class="g-log">历史日志>></font>');
        var bbhtml = '';
        $(".g-relist").each(function () {
          bbhtml += $(this).prop("outerHTML");
        });
        $('.g-log').click(function () {
          $('body').append('<div class="g-model"><p id="addmodel"></p><div class="g-tmodel"><p class="g-tit">历史日志<span class="g-close">×</span></p><div class="g-mlist">' + bbhtml + '</div></div></div>');
          $('body').css("overflow-y", "hidden");
          $("#addmodel").css({
            width: $(document.body).width() + "px",
            height: $(document.body).height() + "px"
          })

          $('.g-close, #addmodel').click(function () {
            $('body').css("overflow-y", "auto");
            $(".g-model").remove();
          });
        });
      }
      $(".news_center h4").each(function () {
        var softtop = $(this).html();
        var softbottom = $(this).next().html();
        $(".news_center h4:gt(0)").css("display", "none");
        $(".news_center h4:gt(0)").next().css("display", "none");
      });
    }
  });
}



function pcsoftDownCount(id) {
  $.post('/Downs/', { id: id });
}
var obj = $(".news_center h3"),
  sum = $(".news_center h3").length,
  arr = [];
sortArr = [];
oldArr = [];
target = null;
obj.each(function () {
  arr.push($(this).text());
})
for (var i = 0; i < sum; i++) {
  sortArr[i] = arr[i].split("");
  oldArr[i] = sortArr[i];
}
for (var x = 0; x < sortArr.length; x++) {
  for (var y = x + 1; y < sortArr.length; y++) {
    if (sortArr[x].length < sortArr[y].length) {
      var val1 = sortArr[x];
      sortArr[x] = sortArr[y];
      sortArr[y] = val1;
    }
  }
}
for (var j = 0; j < sortArr.length; j++) {
  for (var z = j + 1; z < sortArr.length; z++) {
    for (var k = 0; k < sortArr[0].length; k++) {
      if (sortArr[j][k] != sortArr[z][k]) {
        target = k;
        break;
      }
    }
  }
}

for (var o = 0; o < oldArr.length; o++) {
  oldArr[o] = oldArr[o].splice(target);
  oldArr[o] = oldArr[o].toString();
  oldArr[o] = oldArr[o].replace(/,/g, '');
};

var h3Arr = $(".app_l h3")

for (var i = 0; i < h3Arr.length; i++) {
  oldArr.push(h3Arr[i].innerHTML)
}

var h3len = $(".app_l h3").size()
for (var i = 0; i < h3len; i++) {
  $(".right_nav ul").append("<li>" + oldArr[i] + "</li>")
}

$(".app_l h3").addClass("navbox")

$('.right_nav').find('li').click(function () {
  $(this).find('.tBoxs').removeClass('hide').siblings('.fBoxs').addClass('hide');
});

// 平台详情页楼层跳转
var flag = true //设置标识。防止出现跑马灯
$(".right_nav li").click(function () {
  flag = false
  $(this).addClass("current").siblings().removeClass("current")
  var index = $(this).index()//获取当前点击元素的索引
  var top = $(".navbox").eq(index).offset().top;//获取每个li到顶部的距离
  $("html,body").stop(true).animate({ "scrollTop": top }, function () { flag = true })
})

//滚轮滑动切换楼层
$(window).scroll(function () {
  if (flag) {
    //浏览器可视窗口的一半，也可以根据自己需求设定
    var winH = $(window).innerHeight() / 6;
    var scrollT = $(window).scrollTop()
    var len = $(".navbox").size()
    for (var i = 0; i < len; i++) {
      //注意这里banner对象加了i之后变成了js对象,所以用offsetTop
      var bannerGap = $(".navbox")[i].offsetTop - scrollT
      if (bannerGap < winH) {
        $(".right_nav li").eq(i).addClass("current").siblings().removeClass("current")
      }
    }
  }
})

$(window).scroll(function () {
  if ($(window).scrollTop() > 450) {
    $('.right_nav').fadeIn();
  } else {
    $('.right_nav').hide();
  };
});

// 点击回到顶部
$('.back_to_top').click(function () {
  $('body,html').animate({
    "scrollTop": 0
  }, 600);
});

jQuery(window).load(function () {
  if ($('#swCont').find($('.cont')).height() < 660) {
    $('#swCont').css('height', 'auto');
    $('.swIcon').remove();
    $(".swLinear").remove();
  };
})
$(function () {
  $('.swIcon').on('click', function () {
    if ($(this).hasClass('down')) {
      $(this).removeClass('down').addClass("up");
      $(this).html('收起');
      $('#swCont').css('height', 'auto');
      $(".swLinear").addClass("hide");
    } else {
      $(this).removeClass('up').addClass("down");
      $(this).html('展开');
      $('#swCont').css('height', 660);
      $(".swLinear").removeClass("hide");
    }
  })

  $('.swTabMenu').find('span').on('click', function () {
    var times = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
    $(this).parents('.swTabBox').find('.swSubBox').eq(times).show().siblings().hide();
  })

  $('.swNav').find('li').on('click', function () {
    var times = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
  })

  if ($(".swNav").length > 0) { var n = $(".swNav").offset().top; }
  if ($("#swCont").length > 0) { var swCont = $("#swCont").offset().top; $(".swIo").on('click', function () { $('html,body').stop().animate({ scrollTop: $("#swCont").offset().top }, 800); }); }
  if ($(".swScreenShot").length > 0) { var swScreenShot = $(".swScreenShot").offset().top; $(".swSt").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swScreenShot").offset().top - 60 }, 800); }); }
  if ($(".swEdition").length > 0) { var swEdition = $(".swEdition").offset().top; $(".swEt").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swEdition").offset().top - 60 }, 800); }); }
  if ($(".swSaRec").length > 0) { var swSaRec = $(".swSaRec").offset().top; $(".swSr").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swSaRec").offset().top - 60 }, 800); }); }
  if ($(".swEnter").length > 0) { var swEnter = $(".swEnter").offset().top; $(".swNe").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swEnter").offset().top - 60 }, 800); }); }
  if ($(".swReNews").length > 0) { var swReNews = $(".swReNews").offset().top; $(".swRw").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swReNews").offset().top - 60 }, 800); }); }
  if ($(".swaInfo").length > 0) { var swInfo = $(".swaInfo").offset().top; $(".swIf").on('click', function () { $('html,body').stop().animate({ scrollTop: $(".swaInfo").offset().top - 60 }, 800); }); }

  $(window).scroll(function () {
    var s = document.body.scrollTop || document.documentElement.scrollTop;
    if (s > n) { $('.swNav').addClass('fid'); } else { $('.swNav').removeClass('fid'); };
    if (s <= swCont) { $('.swIo').addClass('current').siblings().removeClass('current'); }
    else if (swInfo < s && s <= swScreenShot) { $('.swSt').addClass('current').siblings().removeClass('current'); }
    else if (s <= swEdition) { $('.swEt').addClass('current').siblings().removeClass('current'); }
    else if (swEdition < s && s <= swSaRec) { $('.swSr').addClass('current').siblings().removeClass('current'); }
    else if (s <= swReNews) { $('.swRw').addClass('current').siblings().removeClass('current'); }
    else if (swSaRec < s && s <= swEnter) { $('.swNe').addClass('current').siblings().removeClass('current'); }
    else if (s <= swInfo) { $('.swIf').addClass('current').siblings().removeClass('current'); }
  })


  if ($("#swCont").length > 0) {
    if ($(".app_l .cont>img:nth-child(1)")) {
      $(".app_l .cont>img:nth-child(1)").remove();
    }
    if ($(".app_l .cont>p:nth-child(1)>img")) {
      $(".app_l .cont>p:nth-child(1)>img").remove();
    }

    $(".app_l").find("br").parent("p").remove();
    $(".app_l p").each(function () {
      if ($(this).html() == '') {
        $(this).remove();
      }

    })
  }


  $(".newsCopy span").on("click", function () {
    var pageUrl = location.href;
    $("input[name=pageUrl]").val(pageUrl)
    var inputTxt = $("input[name=pageUrl]");
    inputTxt.select();
    document.execCommand("copy");
    alert("复制成功！")
  })

});

$(function () {
  //下载按钮
  if ($('.downbtn').length > 0) {
    var obj = $('.downbtn');
    var id = obj.attr('id');
    var type = obj.attr('type');
    var reportUrl = "https://linkwe.xiazaihh.com/";
    var baseUrl = "https://www.jz5u.com/";

    $.get(baseUrl + 'downs/detail/' + id + '/' + type, function (res) {
      //console.log(res);return;
      var result = JSON.parse(res);
      if (result.code == 1) {
        //view report
        $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) +
          '&url=' + encodeURIComponent(window.location.href));

        if (result.data.and_url) {
          if (result.data.and_text == 2){
            obj.find('.android2').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=and');
            location.href = result.data.and_url;
          });
          }else{
            obj.find('.android3').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=and');
            location.href = result.data.and_url;
          });
            }
          
        }
        if (result.data.ios_url) {
          if (result.data.ios_text == 2){
          obj.find('.ios2').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=ios');
            window.open(result.data.ios_url);
          });
          }else{
          obj.find('.ios3').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=ios');
            window.open(result.data.ios_url);
          });
          }

        }
        if (result.data.pc_url) {
          obj.find('.pc').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=pc');
            location.href = result.data.pc_url;
          });
        }
      }
    });
  }

    if ($('.downbtn1').length > 0) {
    var obj = $('.downbtn1');
    var id = obj.attr('id');
    var type = obj.attr('type');
    var reportUrl = "https://linkwe.xiazaihh.com/";
    var baseUrl = "https://www.jz5u.com/";

    $.get(baseUrl + 'downs/azdetail/' + id + '/' + type, function (res) {
      //console.log(res);return;
      var result = JSON.parse(res);
      if (result.code == 1) {
        //view report
        $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) +
          '&url=' + encodeURIComponent(window.location.href));

        if (result.data.and_url) {
          if (result.data.and_text == 2){
            obj.find('.android2').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=and');
            location.href = result.data.and_url;
          });
          }else{
            obj.find('.android3').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=and');
            location.href = result.data.and_url;
          });
            }
          
        }
        if (result.data.ios_url) {
          if (result.data.ios_text == 2){
          obj.find('.ios2').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=ios');
            window.open(result.data.ios_url);
          });
          }else{
          obj.find('.ios3').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=ios');
            window.open(result.data.ios_url);
          });
          }

        }
        if (result.data.pc_url) {
          obj.find('.pc').show().click(function () {
            $.getJSON(reportUrl + 'home?callback=?&data=' + encodeURIComponent(JSON.stringify(result.data)) + '&sys=pc');
            location.href = result.data.pc_url;
          });
        }
      }
    });
  }

})


// 2021 10 19 首页 唐
// 换一批
//代表第一次换的是第二组
var listitem = 2;
//这是要换的批数
var listitemMax = 3;
$(".huan").on('click', function () {
  $(".listItem" + listitem).siblings("ul").css("display", "none");
  $(".listItem" + listitem).css("display", "block");
  if (listitem < listitemMax) {
    listitem++;
  } else {
    listitem = 1;
  }
});

$('.tab_menus').find('li').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.tab_boxs').find('.sub_boxs').eq(times).show().siblings().hide();
})

// 2021 10 20 首页
// 首页顶部轮播图
$(function () {
  (function ($) {
    $.fn.Slide = function (options) {
      var defaults = {
        item: "slide-item",
        nav: "slide-nav",
        nowClass: "nownav"
      },
        options = options || {};
      options = $.extend(defaults, options);
      var cont = $(this),
        item = cont.find("." + options.item),
        nav = cont.find("." + options.nav),
        curr = options.nowClass,
        len = item.length,
        width = item.width(),
        html = "",
        index = order = 0,
        timer = null,
        lw = "-" + width + "px",
        rw = width + "px",
        newtimer;
      item.each(function (i) {
        $(this).hover(function () {
          _stop();
        }, function () {
          auto();
        }).css({ left: i === index ? 0 : (i > index ? width + 'px' : '-' + width + 'px') });
        html += '<a href="javascript:">' + (i + 1) + '</a>';
      });
      html += '<div class="nav-mask"></div>';
      nav.html(html);
      var navitem = nav.find("a");
      navitem.eq(index).addClass(curr);
      function anim(index, dir) {
        if (order === len - 1 && dir === 'next') {
          item.eq(order).stop(true, false).animate({
            left: lw
          });
          item.eq(index).css({
            left: rw
          }).stop(true, false).animate({
            left: 0
          });
        } else if (order === 0 && dir === 'prev') {
          item.eq(0).stop(true, false).animate({
            left: rw
          });
          item.eq(index).css({
            left: lw
          }).stop(true, false).animate({
            left: 0
          });

        } else {
          item.eq(order).stop(true, false)
            .animate({
              left: index > order ? lw : rw
            });
          item.eq(index).stop(true, false)
            .css({
              left: index > order ? rw : lw
            })
            .animate({
              left: 0
            });
        }
        order = index;
        navitem.removeClass(curr).eq(index).addClass(curr);
      }

      function next() {
        index = index >= len - 1 ? 0 : index + 1;
        anim(index, 'next');
      }

      function prev() {
        index = index <= 0 ? len - 1 : index - 1;
        anim(index, 'prev');
      }

      function auto() {
        timer = setInterval(next, 3500);
      }

      function _stop() {
        clearInterval(timer);
      }

      return this.each(function () {
        auto();
        navitem.hover(function () {
          _stop();
          var i = navitem.index(this);
          if (/nownav/.test($(this).attr('class'))) {
            return false;
          }
          if (newtimer) clearTimeout(newtimer);
          newtimer = setTimeout(function () {
            anim(i, this)
          }, 250);
        }, auto);
        $("#next,#prev").hover(function () {
          _stop();
        }, auto);
        $('#next').on('click', next);
        $('#prev').on('click', prev);
      });
    }
  })(jQuery);
  $("#slide").Slide();
});

// 选项卡切换
$('.box1_nav p').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.box1_l').find('.sub_box').eq(times).show().siblings().hide();
})
$('.tabnav').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.box1_r').find('.sub_box').eq(times).show().siblings().hide();
})
$('.yynav2').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.box_r2').find('.sub_box').eq(times).show().siblings().hide();
})
$('.yxnav2').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.box_r2').find('.sub_box').eq(times).show().siblings().hide();
})
$('.rjnav').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.box_r4').find('.sub_box').eq(times).show().siblings().hide();
})
$('.ranknav').find('span').on('click', function () {
  var times = $(this).index();
  $(this).addClass('current').siblings().removeClass('current');
  $(this).parents('.indexbox5').find('.sub_box').eq(times).show().siblings().hide();
})

// 2021 10 27 详情页效果
$('.swtIns').find('.closebtn').on('click', function () {
  $('.swtIns').find('div').css('display', 'none');
})

//20221109
if ($('.wzxq_btn').length > 0) {	
	$('.wzxq_btn').each(function (i,v) {
		var wzhref = $(this).parent(".info").find(".qaboxs a").attr("href")
		$(this).attr("href",wzhref)
	})
 }

