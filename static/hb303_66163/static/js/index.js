$(function(){	
	//显示微信
	$('#weixin').hover(function(){
		$('#weixinimg').stop().fadeIn();
	},function(){
		$('#weixinimg').stop().fadeOut();
	})
	
	//导航部分
	$('.slidenav').hover(function(){
		var list = $(this).find('.listbar a');
		$(this).find('.hover').css('top', '-40px');
		$(this).find('.listbar').stop().slideDown(200)
		navHover(list);
	},function(){
		$(this).find('.listbar a').off('mouseover');
		$(this).find('.listbar').stop().slideUp(200)
	})
	
	function navHover(elem){
		elem.on('mouseover', function(){
			elem.parent().find('.hover').stop().animate({'top': $(this).index()*40},200)
		})
	}
	
	//第一屏焦点图
	$('#mod1_slide').fjzcSlide({
		btn: true,
		time: 3000,
		effect: 2,
		navType: 2
	});
	
	//热门精选
	$('#hottit li').on('click', function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('#hotcont ul').eq(index).fadeIn(200).siblings().hide();
	})
	
	$('.newstab li').on('mouseenter', function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parents('.newstab').next().find('.jtab').eq(index).show().siblings().hide();
	})
	
	
	$("img.lazy").lazyload({
 	   effect : "fadeIn"
	});
	
	//精美贴图
	$('#jmtt li').hover(function(){
		$(this).find('p').stop().animate({'bottom':0},200)
	},function(){
		$(this).find('p').stop().animate({'bottom':'-32px'},200)
	})
	
	//友情链接
	$('#linkstit li').on('click', function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('#linkscont ul').eq(index).fadeIn().siblings().hide();
	})
	
	// 返回顶部按钮
	$(document).on('click', '#totop', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 300);
	});
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 500) {
			$('#totop').fadeIn(300);
		} else {
			$('#totop').fadeOut(300);
		}
	});
	
	//板块跳转
	$('#fastnav li').on('click', function(){
		var mod = '#' + $(this).data('to');
		$(this).addClass('on').siblings().removeClass('on');
		$('#fasthover').stop().animate({'top': $(this).index()*24},200)
		$.scrollTo(mod,500);
	})
})