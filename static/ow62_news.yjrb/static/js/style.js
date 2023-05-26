/**
 * Created by Administrator on 2018/3/1.
 */
$(function () {
  var $slider = $('#demo-slider-0');
  var counter = 0;
  var getSlide = function() {
    counter++;
    return '<li><img src="http://s.amazeui.org/media/i/demos/bing-' +
      (Math.floor(Math.random() * 4) + 1) + '.jpg" />' +
      '<div class="am-slider-desc">动态插入的 slide ' + counter + '</div></li>';
  };

  $('.js-demo-slider-btn').on('click', function() {
    var action = this.getAttribute('data-action');
    if (action === 'add') {
      $slider.flexslider('addSlide', getSlide());
    } else {
      var count = $slider.flexslider('count');
      count > 1 && $slider.flexslider('removeSlide', $slider.flexslider('count') - 1);
    }
  });

    // 移动端点击显示、隐藏导航
  $('#open_nav').click(function () {
    $("#mini_nav").show();
  })
  $('#close_nav').click(function(){
    $('#mini_nav').hide();
  })

    //页脚友情链接鼠标移入事件
    $(".fir-line ul li").hover(function () {
        var $index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".fir-line-content .fir-line-box").eq($index).addClass("active").siblings().removeClass("active");
    });

    //导航处设为首页事件
    $(".set_home").off("click").on("click",function () {
        SetHome($(this),window.location)
    });

    //导航处收藏事件
    $(".set_shoucang").off("click").on("click",function () {
        shoucang(document.title,window.location);
    });

    //首页文章块时间格式化
    if($(".homebox").find(".time").length > 0){
        $(".homebox").find(".time").each(function () {
            var $this = $(this);
            var $text = $this.attr("data-time");
            if($text){
                $this.text(date_format($text));
            }

        })
    }

    //文章详情页分享事件
    var $share = $(".news-share"),
        $shareBox = $share.find(".share");
    if($share.length > 0){
        $share.hover(function(){
            $shareBox.stop(true,false).slideDown(200);
        },function(){
            $shareBox.stop(true,false).slideUp(200);
        })
    }

    //视频详情页分享事件
    var $videoShare = $(".video_content_share"),
        $videoShareBox = $videoShare.find(".share");
    if($videoShare.length > 0){
        $videoShare.hover(function(){
            $videoShareBox.stop(true,false).slideDown(200);
        },function(){
            $videoShareBox.stop(true,false).slideUp(200);
        })
    }

    //微信中打开分享事件
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var ua = navigator.userAgent.toLowerCase();

    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //在微信中打开
        $(".mobile-share").find(".bds_weixin").removeClass("bds_weixin");

        $("body").on("click",".am-icon-wechat",function (e) {
            e.stopPropagation();
            e.preventDefault();

            var $modal = $("#attention-alert");
            if($modal.length >0) $modal.modal();

        });
        $(".know-btn").off("click").on("click",function (e) {
            e.stopPropagation();
            $("#attention-alert").modal('close');
        })
    }

    //导航处时间显示
    var days=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var today=new Date();
    var str= (today.getYear()<1900?1900+today.getYear():today.getYear())+"年" + [today.getMonth()+1]+"月" +today.getDate() +"日 "+ days[today.getDay()];
    $(".weather-time").find(".time").text(str);

    //小屏幕导航打开事件
    $(".mininav .am-icon-bars").click(function(){
        $(".am-menu-dropdown1").show();
        $("body").css({
            overflow: "hidden"
        });
        $("#Backtop").hide();
    });

    //小屏幕导航关闭事件
    $(".closebtn").click(function(){
        $(".am-menu-dropdown1").hide();
        $(".popupbox").hide();
        $("body").removeAttr("style");
        $("#Backtop").show();
    });

    //一键回顶部
    $(window).scroll(function(){
        if($(window).scrollTop()>100){
            $("#Backtop .go-top").removeAttr("disabled");
        }else{
            $("#Backtop .go-top").attr("disabled",true);
        }
    });

    //一键回顶部
    $("#Backtop .go-top").click(function(){
        $('body,html').animate({scrollTop:0},1000);
        return false;
    });

    //右侧视频初始化
    if(window.screen.width > 800){
        var $sideVideo = $("#side_video");
        var $bigVideo = $("#big_video");
        if($sideVideo.length > 0){
            var sideVideo = neplayer("side_video");
        }
        if($bigVideo.length > 0){
            var bigVideo = neplayer("big_video");
        }
    }

    //文章详情页二维码
    if($(".news-hd").length > 0){
        $("#Backtop").find(".content-qrcode-i").show();
        if($('.content-qrcode').find("canvas").length <= 0){
            $('.content-qrcode').qrcode({
                render: "canvas", //也可以替换为table
                width: 100,
                height: 100,
                text: window.location.href
            });
        }
    }

    $("button.content-qrcode-i").hover(function () {
        $(".content-qrcode").toggleClass("show");
    })

    $("button.content-qrcode-i").hover(function(){
        $(".content-qrcode").fadeIn("fast");
    },function(){
        $(".content-qrcode").fadeOut("fast");
    })

    // var $newslideHeight = $(".news-sidebar").height();
    // var $height = $(".news-cut").height();
    // var $topHeight = $height - 256;
    //
    // $(window).scroll(function(){
    //     if($(window).scrollTop()>265 && $(window).scrollTop() < $newslideHeight){
    //         $(".news-sidebar").css({
    //             position: "fixed",
    //             top: "0",
    //             width: "386px"
    //         });
    //     } else if($(window).scrollTop()<265){
    //         $(".news-sidebar").removeAttr("style");
    //     } else if($(window).scrollTop() > $height){
    //         $(".news-sidebar").css({
    //             position: "absolute",
    //             top: $topHeight,
    //             width: "386px"
    //         });
    //     }
    // });
});
