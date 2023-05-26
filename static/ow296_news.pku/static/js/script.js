(function () {
//定义页面参数
var page ={
	render: function () {
		//垂直导航下拉
		this.verticalNav();
		//侧边导航栏固定
		//this.asideNavFix();
		//水平导航
		this.horizontalNav();
		//footer底部媒体下拉
		this.mediaSlide();
		//手机端导航切换
		this.mobileNav();
		//置顶gotop
		this.goTop();
		//拖拽移动
		this.moveDrag();
	},
	//垂直导航下拉
	verticalNav: function () {
		var oNav = $('#nav');
		var aLi = oNav.find('li');
		var navWidth = $('.v-nav')
		var iWSon =document.documentElement.clientWidth;
		if(iWSon >= 998){
			aLi.hover(function (){
		       $(this).addClass('on');
		       if($(this).children().hasClass('v-subNav')){
		       		navWidth.addClass('widthResize')
		       }
		       $(this).find('.v-arrow').toggleClass('icon-previewright icon-arrow3')
			},function (){
		      $(this).removeClass('on');
		      if($(this).children().hasClass('v-subNav')){
		       	navWidth.removeClass('widthResize')
		       	$(this).find('.v-arrow').toggleClass('icon-previewright icon-arrow3')
		      }
			})
		}else{
			aLi.find('.v-arrow').click(function(){
				$(this).parent().parent().toggleClass('on');
				if($(this).parent().parent().hasClass('on')){
					$(this).addClass('icon-arrow3')
					$(this).removeClass('icon-previewright')
					$(this).parent().next('.v-subNav').addClass('fadeInUp')
					
				}else{
					$(this).addClass('icon-previewright')
					$(this).removeClass('icon-arrow3');
					$(this).parent().next('.v-subNav').removeClass('fadeInUp')
				}
			})
		}
		
		
	},
	//水平导航
	horizontalNav: function (){
		var oLi = $('.h-nav').find('li');
		oLi.hover(function(){
			$(this).addClass('on');
			$(this).find('.h-subNav').addClass('fadeInUp');
		},function(){
			$(this).removeClass('on');
			$(this).find('.h-subNav').removeClass('fadeInUp');
		})
	},
	//footer底部媒体下拉
	mediaSlide: function (){
		var sWSon = document.documentElement.clientWidth;
		if(sWSon > 1024){
			$('.nList').find('li').hover(function(){
				var subImgHeight =$(this).find('.subImg').height();
				$(this).addClass('on')
				$(this).find('.subImg').addClass('fadeInDown')
				$(this).find('.subImg').css('top',-subImgHeight)
			},function(){
				$(this).removeClass('on')
				$(this).find('.subImg').removeClass('fadeInDown')
			})
		}else{
			$('.nList').find('.wechat').click(function(){
				var subImgHeight =$(this).find('.subImg').height();
				$(this).toggleClass('on')
				$(this).find('.subImg').css('top',-subImgHeight)
			})
		}
		
	},
	//手机端导航切换
	mobileNav: function (){
		$('.mobile-header-icon').click(function(){
			$('body').toggleClass('nav-open');

		})
		$('.body-overlay').click(function(){
			$('body').toggleClass('nav-open')
		})
		$('.mobile-header-close').click(function(){
			$('body').toggleClass('nav-open')
		})
	},
	//置顶gotop
	goTop: function(){
		$('.goTop').click(function(){
			$('body,html').stop().animate({scrollTop:0});
			return false;
		});
		$(window).scroll(function(){
        //获取窗口的滚动条的垂直位置
	        var s = $(window).scrollTop();
	        if( s > 600){
	            $(".goTop").fadeIn(100);
	        }else{
	            $(".goTop").fadeOut(200);
	        };
	    });
	},
	//拖拽移动
	moveDrag: function() {
	    var isMove = false;
	    var X, Y;
	    var left, top;
	    $(".drag" ).bind('mousedown', function (e) {
	        isMove = true;
	        X = e.pageX - parseInt($(".drag").css("left"));
	        Y = e.pageY - parseInt($(".drag").css("top"));
	    })
	    $(".drag").bind('touchstart', function (e) {
	        isMove = true;
	        X = e.originalEvent.touches[0].clientX - parseInt($(".drag").css("left"));
	        Y = e.originalEvent.touches[0].clientY - parseInt($(".drag").css("top"));
	    })
	    $(document).bind('mousemove', function (e) {
	        if (isMove) {
	            left = e.pageX - X;
	            top = e.pageY - Y;
	            if (left < 0) {
	                left = 1
	            }
	            if (top < 0) {
	                top = 1
	            }
	            if (left > $(window).width() - $(".drag").width()) {
	                left = $(window).width() - $(".drag").width() - 2
	            }
	            if (top > $(window).height() - $(".drag").height()) {
	                top = $(window).height() - $(".drag").height() - 2
	            }
	            $(".drag").css({left: left, top: top});
	        }
	    })
	    $(document).bind('touchmove', function (e) {
	        if (isMove) {
	            left = e.originalEvent.touches[0].clientX - X;
	            top = e.originalEvent.touches[0].clientY - Y;
	            if (left < 0) {
	                left = 2
	            }
	            if (top < 0) {
	                top = 2
	            }
	            if (left > $(window).width() - $(".drag").width()) {
	                left = $(window).width() - $(".drag").width() - 2
	            }
	            if (top > $(window).height() - $(".drag").height()) {
	                top = $(window).height() - $(".drag").height() - 2
	            }
	            $(".drag").css({left: left, top: top});
	        }
	    })
	    $(document).bind('mouseup', 'touchend', function (e) {
	        isMove = false;
	    })
	}

}
// 渲染页面
page.render();

var resizeTimer = null;
$(window).bind('resize', function (){
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
          // page.render('verticalNav');
			// page.render('asideNavFix');
    } , 500);
});
})();
logoResize()
function logoResize(){
    var sWSon = document.documentElement.clientWidth;
    if(sWSon<=480){
    	$('.h-logo1').find('image').attr({width:150,height:48})
        $('.h-logo1').find('svg').attr({width:150,height:48}) 
        $('.h-logo2').find('image').attr({width:90,height:48})
        $('.h-logo2').find('svg').attr({width:90,height:48}) 
    }else if(sWSon<=998){
    	$('.h-logo1').find('image').attr({width:180,height:58})
        $('.h-logo1').find('svg').attr({width:180,height:58}) 
        $('.h-logo2').find('image').attr({width:108,height:58})
        $('.h-logo2').find('svg').attr({width:108,height:58}) 
        $('.v-nav').removeClass('scroll-pane')
        
    }else if(sWSon<=1280){
    	$('.h-logo1').find('image').attr({width:180,height:59})
        $('.h-logo1').find('svg').attr({width:180,height:59}) 
        $('.h-logo2').find('image').attr({width:110,height:59})
        $('.h-logo2').find('svg').attr({width:110,height:59}) 
    }
    if(sWSon<=1480){
    	$('.web-v-logo1').find('image').attr({width:100,height:111})
    	$('.web-v-logo1').find('svg').attr({width:100,height:111})
    	$('.web-v-logo2').find('image').attr({width:100,height:46})
    	$('.web-v-logo2').find('svg').attr({width:100,height:46})
    }else{
    	$('.web-v-logo1').find('image').attr({width:139,height:154})
    	$('.web-v-logo1').find('svg').attr({width:139,height:154})
    	$('.web-v-logo2').find('image').attr({width:139,height:64})
    	$('.web-v-logo2').find('svg').attr({width:139,height:64})
    }
}
//分享
function fenxiang(e){
	//$(".bdsharebuttonbox").removeClass('hide');
	$(e).find('.bdsharebuttonbox').addClass('show').removeClass('hide');

	var href2 = $(e).parents('li:first').find('h3').find('a').attr('href');
	var ptext = $(e).parents('li:first').find('h3 a').text();
	$("#shareUrl").val(href2);
	$("#shareText").val(ptext);
   var date = new Date()/36e5;
   window._bd_share_config={
      "common":{
         "bdSnsKey":{},
         "bdMini":"2",
         //"bdDesc":"456",
         "bdMiniList":false,
         "bdPic":"",
         "bdStyle":"0",
         "bdSize":"32",
         "onBeforeClick" : function(id,config){
            return {
				"bdUrl":$("#shareUrl").val(),
				"bdText":$("#shareText").val(),
				"bdDesc":$("#shareText").val()
			}
         }
      },
      "share":{}
   };
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://www.bnu.edu.cn/static/api/js/share.js?v=89860593.js?cdnversion='+~(-date)];
}
//侧边导航栏固定
function asideNavFix(){
		var asideHeight = $(".vertical-wrap-nav").height()
		var iWSon =document.documentElement.clientWidth;
		var clientHeight = document.documentElement.clientHeight;
		var vLogoHeight =$('.v-logo').outerHeight();
		if(iWSon >998){
			$(window).scroll(function(){
				var asideHeight = $(".vertical-wrap-nav").height()
				var conHeight = $(".mode01").height();
				var headerHeight =$('.wrap-header').height();
				var wrapHeight = headerHeight + conHeight -200
				conHeight = conHeight - asideHeight;
				var scrollTop = $(window).scrollTop();
				 if(scrollTop < 27){
				 	$('.vertical-wrap-nav').removeClass('fixTop');
				 }else{
				 	$('.vertical-wrap-nav').addClass('fixTop');

				 }
				 if(scrollTop > conHeight){
				 		$('.vertical-wrap-nav').removeClass('fixTop');
				 		$('.vertical-wrap-nav').addClass('fixBottom');
				 }else{
				 	$('.vertical-wrap-nav').removeClass('fixBottom');
				 }
				 if(scrollTop > wrapHeight){
				 	$('.horizontal-header').slideDown(300)
				 	$('.wrap-header').addClass('fixed')
				 }else{
				 	$('.horizontal-header').slideUp(300);
				 	$('.wrap-header').delay(300).removeClass('fixed')
				 }
			})
		}
	}
//分享
function shareList(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon<=998){
		$('.shareList').find('.item-share').click(function(e){
			if($(this).find('.bdsharebuttonbox ').hasClass('hide')){
				$(document).find('.bdsharebuttonbox').removeClass('show').addClass('hide')
				fenxiang($(this));
				
			}else{
				$(document).find('.bdsharebuttonbox').removeClass('show').addClass('hide')
			}
		})
		$('.shareList').find('li').removeClass('imgHover');
		$('.shareList').find('li > div').removeClass('imgHover');
	}else{
		$('.shareList').find('.item-share').hover(function(e){
			fenxiang($(this));
		},function(){
			$(document).find('.bdsharebuttonbox').removeClass('show').addClass('hide')
		})
	}
}
//音频播放器
function audioPlay(){
    var audio = $('#audioTag').get(0);
    //播放暂停控制
    $('#playPause').click(function(){
        //监听音频播放时间并更新进度条
        audio.addEventListener('timeupdate',updateProgress,true);
        //监听播放完成事件
        audio.addEventListener('ended',audioEnded,true);
        //改变暂停/播放icon
        if(audio.paused){
            audio.play();
            $('.icon-btn').removeClass('icon-play').addClass('icon-pause')
        } else{
            audio.pause();
            $('.icon-btn').removeClass('icon-pause').addClass('icon-play')
        }
    })
    //读取视频长度
    $('#audioTag').on("loadedmetadata",function () {
    	//debugger;
        $('#audioTime').text(transTime(this.duration));

    });
    var pgsWidth = $('.pgs-bg').width()*1; //0.907是 进度条这个div和整个进度条图片宽度的比例
    //点击进度条跳到指定点播放
    $('.pgs').click(function (e) {

        var rate = (e.offsetX - ($(this).width()-pgsWidth)/2)/pgsWidth;
        audio.currentTime = audio.duration * rate;
        updateProgress();
    });
}
//转换音频时长显示
function transTime(time) {
    var duration = parseInt(time);
    var minute = parseInt(duration/60);
    var sec = duration%60+'';
    var isM0 = ':';
    if(minute == 0){
        minute = '00';
    }else if(minute < 10 ){
        minute = '0'+minute;
    }
    if(sec.length == 1){
        sec = '0'+sec;
    }
    return minute+isM0+sec
}
//更新进度条
function updateProgress() {
    var audio =document.getElementsByTagName('audio')[0];
    var value = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100, 0);
    $('.pgs-play').css('width', value * 1 + '%');
    $('.played-time').html(transTime(audio.currentTime));
}
//播放完成
function audioEnded() {
    var audio =document.getElementsByTagName('audio')[0];
    audio.currentTime=0;
    audio.pause();
    $('.play-pause>span').removeClass('icon-pause').addClass('icon-play');
}
//分页下拉框跳转方法
function pageSelect(){
  console.log($('.pageSelect').length)
  if($('.pageSelect').length!=0){
    $('.pageSelect').select2({});
                
    $("#select21").on("change",function(){
      window.location.href=$(this).val()
    })
    $("#select22").on("change",function(){
      var $thval=$(this).val()
      if($thval=="") return false;
      //value 索引从0开始
       $(".camel-list .list").eq($thval).find(".demo-img:first").click();
    })
  }
}
//文章页分享
function articleShare(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon > 1200){
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop >= 126){
				$('.article-share').addClass('position')
			}else{
				$('.article-share').removeClass('position')
			}
		})
	}else if(sWSon <= 768){
		//$('.article-share').find('.icon-31zhuanfa').addClass('on')
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop >= 365){
				$('.article-share').addClass('position')
			}else{
				$('.article-share').removeClass('position')
			}
		})
	}
	$('.article-share').find('.icon-31zhuanfa').click(function(){
		$(this).next('.bdsharebuttonbox').fadeToggle(300);
		$(this).toggleClass('on')
	})
}
//文章页侧边栏固定
function asideFix(){
	var sWSon = document.documentElement.clientWidth;
	if(sWSon > 998){
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var asideHeight = $(".sub_aside2").height();
			var rtHeight = $('.pageArticle .rt').height();
			var lfHeight =  $('.pageArticle .lf').height();
		    var pageArticleHeight = $(".pageArticle").height();
		  conHeight = pageArticleHeight - asideHeight;
			 if(lfHeight > rtHeight && scrollTop >= rtHeight){
			 	$('.sub_aside2').addClass('fixTop');
			 }else{
			 	$('.sub_aside2').removeClass('fixTop');
			 }
			 if(lfHeight > rtHeight && scrollTop > conHeight){
			 		$('.sub_aside2').removeClass('fixTop');
			 		$('.sub_aside2').addClass('fixBottom');
			 }else{
			 	$('.sub_aside2').removeClass('fixBottom');
			 }
		})
	}
	
}
$(window).resize(function(){
	logoResize()
})
//音频播放器2
function audioPlay2(){
    var audio2 = $('#audioTag2').get(0);
	$('#audioTag2').attr('src','');
    //播放暂停控制
	$('.audioLi').click(function(){
		var liSrc = $(this).find('input').get(0).value;
		var audioSrc = $('#audioTag2').attr('src');
		$(this).find('.audioBtn').toggleClass('icon-bofang icon-zanting');
		$(this).siblings().find('.audioBtn').removeClass('icon-zanting').addClass('icon-bofang');
		//debugger;
		if(liSrc == audioSrc){
			if(audio2.paused){
				audio2.play();
			}else{
				audio2.pause();
			}
		}else{
			$('#audioTag2').attr('src',liSrc);
			audio2.play();
		}

		
	})
    
}