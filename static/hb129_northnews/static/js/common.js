// jquery.browser.js
(function( jQuery, window, undefined ) {
  "use strict";

  var matched, browser;

  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    var platform_match = /(ipad)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/i.exec( ua ) ||
        [];

    return {
        browser: match[ 3 ] || match[ 1 ] || "",
        version: match[ 2 ] || "0",
        platform: platform_match[ 0 ] || ""
    };
  };

  matched = jQuery.uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  jQuery.browser = browser;
})( jQuery, window );

// go to top
(function($){
    var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        //$(this).hide();
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var controlLeft;
            if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
                controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
            }else{
                controlLeft = $window.width()- opts.pageWidthJg-$this.width();
            }
            var cssfixedsupport=$.browser.msie && parseFloat($.browser.version) < 7;//判断是否ie6
            
            var controlTop=$window.height() - $this.height()-opts.pageHeightJg;
            
            controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;
            
            if (shouldvisible){
                $this.stop().show();
            }else{
                $this.stop().hide();
            }
            
            $this.css({
                position: cssfixedsupport ? 'absolute' : 'fixed',
                top: controlTop,
                left: controlLeft
            });
        },30);
        
        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };
    
    $.fn.goToTop.def={
        pageWidth:1100,//页面宽度
        pageWidthJg:60,//按钮和页面的间隔距离
        pageHeightJg:95,//按钮和页面底部的间隔距离
        startline:130,//出现回到顶部按钮的滚动条scrollTop距离
        duration:2000,//回到顶部的速度时间
        targetObg:"body"//目标位置
    };

    $(function(){
        $('<a href="javascript:;" class="backToTop" title="返回顶部"></a>').appendTo("body");
        var data=$("body").attr("data");
    });
})(jQuery);

// 菜单
(function () {
    var topMenu = [];
    if (window.location.pathname === '/') {
        $('nav li:first > a').addClass('sel');
    }
    $('nav > ul > li > a').each(function () {
      topMenu.push($(this).attr('href'));
    });
    var menusel = window.location.href.split('?')[0].replace(/\/$/, '');
    $('nav .sel').removeClass('sel');
    $('nav a').each(function () {
        var a = $(this);
        if (a.attr('href').replace(/\/$/, '') === menusel) {
            a.addClass('sel');
            if (menusel !== '/' && $.inArray(a.attr('href'), topMenu) === -1) {
                $('nav').find('.all > a').addClass('sel');
                $('nav').find('.all > a > span').html(a.html());
                $('nav').find('.more > a > span').html(a.html());
            }
            //if (window.location.pathname !== '/') {
            //}
        }
    });

    $('nav').find('.all > a').on('click', function () {
      if ($('nav').find('.menu-all-box').is(':visible')) {
        $('nav').find('.menu-all-box').hide();
      } else {
        width = $('nav').width();
        $('nav').find('.menu-all-box').show();
        $(window).off('resize').on('resize', function () {
          $('nav').find('.menu-all-box').css({
            right: $(document).width() - $('nav').find('.all').offset().left - $('nav').find('.all').width(),
            maxWidth: $('nav').width() - 25
          });
        });
        $(window).trigger('resize');
      }
    });

    $('nav').find('.more > a').on('click', function () {
      if ($('nav').find('.menu-more-box').is(':visible')) {
        $('nav').find('.menu-more-box').hide();
      } else {
        $('nav').find('.menu-more-box').show();
      }
    });
}());

// 二维码图标替换
(function () {
  $('[qrcode]').each(function () {
    new QRCode(this, {
      text: this.getAttribute('qrcode'),
      width: this.getAttribute('width'),
      height: this.getAttribute('height'),
      title:this.getAttribute('title')
    });
  });
}());

// 隐藏裂图
$(function(){
    $(".rmwz img, .hide-bad-img img").off("error").on("error",function(){
        $(this).hide();
    });
});
