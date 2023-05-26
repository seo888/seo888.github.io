// 在文档高度不到一屏的时候保持footer沉底 start
function footerPosition() {
  $("footer").removeClass("fixed-bottom");
  //网页正文全文高度
  var contentHeight = document.body.scrollHeight;
  //可视窗口高度，不包括浏览器顶部工具栏
  var winHeight = window.innerHeight;
  if (!(contentHeight > winHeight)) {
    //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
    $("footer").addClass("fixed-bottom");
  } else {
    $("footer").removeClass("fixed-bottom");
  }
}

$.fn.extend({
  ellipsis: function () {
    $(this).each(function (index, element) {
      var outer = this.clientHeight;
      var inner = this.scrollHeight;
      if (inner - outer > 2) {
        $(this).addClass("ellipsis");
      }
    });
  }
});

// video fullscreen toggle
function videoFullScreen() {
  $('.video-fullscreen-hide-wrap').on('click', function () {
    $(this).fadeOut(150);
    $('.video-fullscreen-hide-wrap').find('video')[0].pause();
  });
  $('.video-fullscreen-container').on('click', function (ev) {
    ev.stopPropagation();
  });
  $('.video-fullscreen-play').on('click', function () {
    $(this).parent('.video-fullscreen-wrap').find('.video-fullscreen-hide-wrap').fadeIn(
      150);
  });
  $(document).on("keydown", function (ev) {
    if (ev.which === 27) {
      $('.video-fullscreen-hide-wrap').fadeOut(150);
      $('.video-fullscreen-hide-wrap').find('video')[0].pause();
    }
  });
}

$(function () {
  $('.rightBotton>li').each(function () {
    $(this).mouseover(function () {
        $(this).children('.divHover').show()
        $(this).siblings().children('.divHover').hide()
    });
  
  })
  $('.rightBotton>li').mouseleave(function () {
    $('.divHover').hide()
  })
  // click dropup/dropdown start
  $(".drop").on("click", function (ev) {
    // 判断当前被点击的drop是否是激活状态
    var flag = $(this).hasClass("active");
    if (flag) {
      // 如果是激活状态则移除激活状态的class
      $(this).removeClass("active");
    } else {
      // 如果不是激活状态
      // 先移除全部drop的激活状态的class
      $(".drop").removeClass("active");
      // 给当前被点击的drop增加激活状态的class
      $(this).addClass("active");
    }

    // 判断当前drop箭头的状态
    if ($(this).find('.toggle-arrow').hasClass('icon-arrow-up')) {
      // 先将全部drop的箭头恢复初始状态
      $('.dropup').find('.toggle-arrow').removeClass('icon-arrow-down').addClass('icon-arrow-up');
      $('.dropdown').find('.toggle-arrow').removeClass('icon-arrow-up').addClass('icon-arrow-down');
      // 将当前drop按钮切换为相反的状态
      $(this).find('.toggle-arrow').removeClass('icon-arrow-up').addClass('icon-arrow-down');

    } else if ($(this).find('.toggle-arrow').hasClass('icon-arrow-down')) {
      // 先将全部drop的箭头恢复初始状态
      $('.dropup').find('.toggle-arrow').removeClass('icon-arrow-down').addClass('icon-arrow-up');
      $('.dropdown').find('.toggle-arrow').removeClass('icon-arrow-up').addClass('icon-arrow-down');
      // 将当前drop按钮切换为相反的状态
      $(this).find('.toggle-arrow').removeClass('icon-arrow-down').addClass('icon-arrow-up');

    } else {}
    // 阻止drop的click事件冒泡到document
    ev.stopPropagation();
  });

  $(".drop-menu").on("click", function (ev) {
    // 阻止drop-menu的click事件冒泡到drop
    ev.stopPropagation();
  });

  $(document).on("click", function (e) {
    // 当触发document上的click事件时
    //日历控件收回
    $('.search-result-section').removeClass('active');
    $('.calendar').addClass('hidden');

    //资源库分享收回
    $('.resources-section .resiconwrap').removeClass("active");


    // 移除全部drop的激活状态的class
    $(".drop").removeClass("active");
    // 将全部drop的箭头恢复初始状态
    $('.dropup').find('.toggle-arrow').removeClass('icon-arrow-down').addClass('icon-arrow-up');
    $('.dropdown').find('.toggle-arrow').removeClass('icon-arrow-up').addClass('icon-arrow-down');
    // 移除fixed-navbar的激活状态
    $('nav.initial .fixed-navbar').removeClass("active");

    //分享里更多分享关闭 by Carley
    $('.shareMoreTC').hide();

    //关闭新闻稿正文页标题旁边的多语言下拉 by Carley
    $(".dropdown_menu").hide();

    $('.btn-dropdown i').removeClass('icon-arrow-up');
    $('.btn-dropdown i').addClass('icon-arrow-down');
    $(".dropdown_menu").hide();

  });
  // click dropup/dropdown end

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


  //二级固定导航左侧下拉
  $('nav.initial .fixed-navbar').on('click', function (ev) {
    ev.stopPropagation();
    console.log(ev.target);
    $(this).toggleClass('active');
  })

  //悬浮导航 获取nav-subnav的offsetTop start
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
      
      // fixed 导航在横向滚动条滚动时跟随滚动
      $('.nav-subnav.fixed').css('left', -$(document).scrollLeft());
    })
  }
  //悬浮导航 获取nav-subnav的offsetTop end


  // 导航联动 start
  // 一级导航hover
  $('.nav-main-nav li').hover(function () {
    // 添加一级导航打开标识
    $(this).addClass('open');
    // 获取一级导航索引值
    var index = $('.nav-main-nav li').index(this);
    // 全部二级导航隐藏
    $('.nav-subnav .second-navbar').hide();
    // 对应索引值的二级导航显示
    $('.nav-subnav .second-navbar').eq(index).show();
  }, function () {
    // 移除一级导航打开标识
    $(this).removeClass('open');
    // 全部二级导航隐藏
    $('.nav-subnav .second-navbar').hide();
    // 初始二级导航（如果有）显示
    $('.nav-subnav .second-navbar.initial').show();
  });
  // 二级导航hover
  $('.nav-subnav .second-navbar').hover(function () {
    // 获取二级导航索引值
    var index = $('.nav-subnav .second-navbar').index(this);
    // 将二级导航对应索引值的一级导航添加hover标识，以表示当前打开的二级导航对应的一级导航
    $('.nav-main-nav li').eq(index).addClass('open');
    // 所有二级导航隐藏(隐藏初始二级导航)
    $('.nav-subnav .second-navbar').hide();
    // 被hover的二级导航显示
    $(this).show();
  }, function () {
    // 隐藏一级导航hover标识
    $('.nav-main-nav li').removeClass('open');
    // 全部二级导航隐藏
    $('.nav-subnav .second-navbar').hide();
    // 初始二级导航（如果有）显示
    $('.nav-subnav .second-navbar.initial').show();
  });
  // 导航联动 end

  footerPosition();
  $(window).resize(footerPosition);
  // 在文档高度不到一屏的时候保持footer沉底 end

  //**************************** jingyuan 添加 s ************************************
  if ($("h3 a").length > 0 || $('h4 a').length > 0) {
    //**************************** jingyuan 添加 e ************************************
    $(".h3-large a").ellipsis();
    $(".h3-normal a").ellipsis();
    $(".h3-small a").ellipsis();
    $(".h4-normal a").ellipsis();
    $(".card-text-summary").ellipsis();
  }



  //**************************** Carley 1 ************************************

  $(".btn-dropdown").click(function (ev) {
    if($(".dropdown_menu").css("display") == "none")
    {
      $('.btn-dropdown i').removeClass('icon-arrow-down');
      $('.btn-dropdown i').addClass('icon-arrow-up');
      $(".dropdown_menu").show();
    }
    else
    {
      $('.btn-dropdown i').removeClass('icon-arrow-up');
      $('.btn-dropdown i').addClass('icon-arrow-down');
      $(".dropdown_menu").hide();
    }
      
    //$(".dropdown_menu").toggle();
    ev.stopPropagation();
    
  });



  //**************************** Carley 2 ************************************




});

//******************************getContentHeight start*************************
function getContentHeight() {
  var browserH = 0;
  if (window.innerHeight) {
    browserH = window.innerHeight;
  } else if (document.documentElement.clientHeight) {
    browserH = document.documentElement.clientHeight;
  } else {

  }

  var headerH = Math.ceil(document.getElementsByTagName('header')[0].offsetHeight);
  var footerH = Math.ceil(document.getElementsByTagName('footer')[0].offsetHeight);
  //console.log(headerH);
  //console.log(footerH);

  var contentHeight = browserH - headerH - footerH;

  return contentHeight;


}
//******************************getContentHeight end***************************

//******************************show more start********************************
function showMoreText() {
  var moreCP = 0;
  var browserH = 0;
  var dvTop = 0;
  var dvH = 0;
  var showPos = 0;

  if (window.innerHeight) {
    browserH = window.innerHeight;
  } else if (document.documentElement.clientHeight) {
    browserH = document.documentElement.clientHeight;
  } else {

  }

  //console.log(browserH);
  moreCP = browserH * 4 + Math.ceil(browserH / 2);
  //console.log(moreCP);

  dvTop = Math.ceil(document.getElementById("dvCE").offsetTop);
  //console.log(dvTop);

  dvH = Math.ceil(document.getElementById("dvCE").offsetHeight);

  // 正文结束位置在moreCP之上，不加 more click
  if ((dvTop + dvH) <= moreCP) {
    $('#showMore').hide();
  } else {
    showPos = moreCP - dvTop;

    //正文开始的位置在 moreCP 之上，显示从正文开始到一屏半的位置
    if (showPos > 0) {
      $('#dvCE').css('height', showPos + 'px');
    }
    // 正文开始的位置在 moreCP 之下 默认只显示500px的正文
    else {
      $('#dvCE').css('height', '500px');
    }

    $('#dvCE').css('overflow', 'hidden');

    $('#showMore').click(function () {
      $('#showMore').hide();
      $('#dvCE').css('height', 'auto');
    });

  }
}
//******************************show more end*******************************


//******************************qrcode start********************************
function qrcode() {
  //console.log(888);
  $('.socail-wechat').click(function () {
    $('.qrcode-block').show();
  });

  $('.TCtopClose').click(function (ev) {
    $('.qrcode-block').hide();
    ev.stopPropagation();
  });
}
//******************************qrcode end**********************************

//******************************mediaroom_minlegth start********************************
function mediaroom_minlegth() {
  //console.log(888);
  mlh = Math.ceil(document.getElementById("mediaroom-left").offsetHeight);
  $('.mediaroom-right .mediaroom-list').css('min-height', (mlh-10)+'px');
}
//******************************mediaroom_minlegth end**********************************



//分页
(function ($) {
  var ms = {
    init: function (obj, args) {
      return (function () {
        ms.fillHtml(obj, args);
        ms.bindEvent(obj, args);
      })();
    },
    //填充html
    fillHtml: function (obj, args) {
      return (function () {
        obj.empty();
        //上一页
        if (args.current > 1) {
          obj.append('<a href="javascript:;" class="prevPage"><i class="fa fa-angle-left"></i></a>');
        } else {
          obj.remove('.prevPage');
          obj.append('<span class="disabled"><i class="fa fa-angle-left"></i></span>');
        }
        //中间页码
        if (args.current != 1 && args.current >= 4 && args.pageCount != 4) {
          obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
        }
        if (args.current - 2 > 2 && args.current <= args.pageCount && args.pageCount > 5) {
          obj.append('<span>...</span>');
        }
        var start = args.current - 2,
          end = args.current + 2;
        if ((start > 1 && args.current < 4) || args.current == 1) {
          end++;
        }
        if (args.current > args.pageCount - 4 && args.current >= args.pageCount) {
          start--;
        }
        for (; start <= end; start++) {
          if (start <= args.pageCount && start >= 1) {
            if (start != args.current) {
              obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
            } else {
              obj.append('<span class="current">' + start + '</span>');
            }
          }
        }
        if (args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5) {
          obj.append('<span>...</span>');
        }
        if (args.current != args.pageCount && args.current < args.pageCount - 2 && args.pageCount != 4) {
          obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
        }
        //下一页
        if (args.current < args.pageCount) {
          obj.append('<a href="javascript:;" class="nextPage"><i class="fa fa-angle-right"></i></a>');
        } else {
          obj.remove('.nextPage');
          obj.append('<span class="disabled"><i class="fa fa-angle-right"></i></span>');
        }
      })();
    },
    //绑定事件
    bindEvent: function (obj, args) {
      return (function () {
        obj.on("click", "a.tcdNumber", function () {
          var current = parseInt($(this).text());
          ms.fillHtml(obj, {
            "current": current,
            "pageCount": args.pageCount
          });
          if (typeof (args.backFn) == "function") {
            args.backFn(current);
          }
        });
        //上一页
        obj.on("click", "a.prevPage", function () {
          var current = parseInt(obj.children("span.current").text());
          ms.fillHtml(obj, {
            "current": current - 1,
            "pageCount": args.pageCount
          });
          if (typeof (args.backFn) == "function") {
            args.backFn(current - 1);
          }
        });
        //下一页
        obj.on("click", "a.nextPage", function () {
          var current = parseInt(obj.children("span.current").text());
          ms.fillHtml(obj, {
            "current": current + 1,
            "pageCount": args.pageCount
          });
          if (typeof (args.backFn) == "function") {
            args.backFn(current + 1);
          }
        });
      })();
    }
  }
  $.fn.createPage = function (options) {
    var args = $.extend({
      pageCount: 15,
      current: 1,
      backFn: function () {}
    }, options);
    ms.init(this, args);
  }
})(jQuery);

;
(function (undefined) {
  var _global;
  //工具函数
  //配置合并
  function extend(def, opt, override) {
    for (var k in opt) {
      if (opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)) {
        def[k] = opt[k]
      }
    }
    return def;
  }
  //日期格式化
  function formartDate(y, m, d, symbol) {
    symbol = symbol || '-';
    m = (m.toString())[1] ? m : '0' + m;
    d = (d.toString())[1] ? d : '0' + d;
    return y + symbol + m + symbol + d
  }

  function Schedule(opt) {
    var def = {},
      opt = extend(def, opt, true),
      curDate = opt.date ? new Date(opt.date) : new Date(),
      year = curDate.getFullYear(),
      month = curDate.getMonth(),
      day = curDate.getDate(),
      currentYear = curDate.getFullYear(),
      currentMonth = curDate.getMonth(),
      currentDay = curDate.getDate(),
      selectedDate = '',
      el = document.querySelector(opt.el) || document.querySelector('body'),
      _this = this;
    var bindEvent = function () {
      el.addEventListener('click', function (e) {
        switch (e.target.id) {
          case 'nextMonth':
            _this.nextMonthFun();
            break;
          case 'nextYear':
            _this.nextYearFun();
            break;
          case 'prevMonth':
            _this.prevMonthFun();
            break;
          case 'prevYear':
            _this.prevYearFun();
            break;
          default:
            break;
        };
        if (e.target.className.indexOf('currentDate') > -1) {
          opt.clickCb && opt.clickCb(year, month + 1, e.target.innerHTML);
          selectedDate = e.target.title;
          day = e.target.innerHTML;
          render();
        }
      }, false)
    }
    var init = function () {
      var scheduleHd = '<div class="schedule-hd">' +
        '<div>' +
        '<span class="icon iconfont icon-doublearrow-left" id="prevYear" ></span>' +
        '<span class="icon iconfont icon-arrow-left" id="prevMonth"></span>' +
        '</div>' +
        '<div class="today">' + formartDate(year, month + 1, day, '-') + '</div>' +
        '<div>' +
        '<span class="icon iconfont icon-arrow-right" id="nextMonth"></span>' +
        '<span class="icon iconfont icon-doublearrow-right" id="nextYear"></span>' +
        '</div>' +
        '</div>'
      
      var scheduleWeek = "";
      var regScheduleWeek = /^(http|https):\/\/(www|www\.qa|cnmobile|cnmobile\.qa)\.prnasia\.com/i;
      if(regScheduleWeek.test(window.location.href)) {
        scheduleWeek = '<ul class="week-ul ul-box">' +
        '<li>日</li>' +
        '<li>一</li>' +
        '<li>二</li>' +
        '<li>三</li>' +
        '<li>四</li>' +
        '<li>五</li>' +
        '<li>六</li>' +
        '</ul>'
      } else {
        scheduleWeek = '<ul class="week-ul ul-box">' +
        '<li>Sun</li>' +
        '<li>Mon</li>' +
        '<li>Tues</li>' +
        '<li>Wed</li>' +
        '<li>Thur</li>' +
        '<li>Fri</li>' +
        '<li>Sat</li>' +
        '</ul>'
      }
      

      // var scheduleWeek = '<ul class="week-ul ul-box">' +
      //   '<li>日</li>' +
      //   '<li>一</li>' +
      //   '<li>二</li>' +
      //   '<li>三</li>' +
      //   '<li>四</li>' +
      //   '<li>五</li>' +
      //   '<li>六</li>' +
      //   '</ul>'
      var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>';
      el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
      bindEvent();
      render();
    }
    var nowdate = new Date().toJSON().slice(0, 10).replace(/\-/g, '');

    var render = function () {
      var fullDay = new Date(year, month + 1, 0).getDate(), //当月总天数
        startWeek = new Date(year, month, 1).getDay(), //当月第一天是周几
        total = (fullDay + startWeek) % 7 == 0 ? (fullDay + startWeek) : fullDay + startWeek + (7 - (fullDay + startWeek) % 7), //元素总个数
        lastMonthDay = new Date(year, month, 0).getDate(), //上月最后一天
        eleTemp = [];
      for (var i = 0; i < total; i++) {
        if (i < startWeek) {
          eleTemp.push('<li class="other-month"><span class="dayStyle">' + (lastMonthDay - startWeek + 1 + i) + '</span></li>')
        } else if (i < (startWeek + fullDay)) {
          var nowDate = formartDate(year, month + 1, (i + 1 - startWeek), '-');
          var addClass = '';
          selectedDate == nowDate && (addClass = 'selected-style');
          // formartDate(currentYear, currentMonth + 1, currentDay, '-') == nowDate && (addClass = 'today-flag');
          var currentDate = formartDate(currentYear, currentMonth + 1, currentDay, '-')
          currentDate == nowDate && (addClass = 'selected');
          curdate = nowDate.replace(/\-/g, '');

          if (nowdate >= curdate) {
            eleTemp.push('<li class="current-month" ><span title=' + nowDate + ' class="currentDate dayStyle ' + addClass + '">' + (i + 1 - startWeek) + '</span></li>')
          } else {
            eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - startWeek) + '</span></li>')
          }
        } else {
          eleTemp.push('<li class="other-month"><span class="dayStyle">' + (i + 1 - (startWeek + fullDay)) + '</span></li>')
        }
      }
      el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
      el.querySelector('.today').innerHTML = formartDate(year, month + 1, day, '-');
    };
    this.nextMonthFun = function () {
        if (month + 1 > 11) {
          year += 1;
          month = 0;
        } else {
          month += 1;
        }
        render();
        opt.nextMonthCb && opt.nextMonthCb(year, month + 1, day);
      },
      this.nextYearFun = function () {
        year += 1;
        render();
        opt.nextYeayCb && opt.nextYeayCb(year, month + 1, day);
      },
      this.prevMonthFun = function () {
        if (month - 1 < 0) {
          year -= 1;
          month = 11;
        } else {
          month -= 1;
        }
        render();
        opt.prevMonthCb && opt.prevMonthCb(year, month + 1, day);
      },
      this.prevYearFun = function () {
        year -= 1;
        render();
        opt.prevYearCb && opt.prevYearCb(year, month + 1, day);
      }
    init();
  }
  //将插件暴露给全局对象
  _global = (function () {
    return this || (0, eval)('this')
  }());
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Schedule;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return Schedule;
    })
  } else {
    !('Schedule' in _global) && (_global.Schedule = Schedule);
  }

}());