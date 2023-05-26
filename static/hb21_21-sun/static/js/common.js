$(function() {

	// 头部吸顶
	$(window).scroll(function() {
		fixedHeader();
	});
	fixedHeader();

	function fixedHeader() {
		if ($(window).scrollTop() > $('.header').height()) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
		if ($(window).scrollTop() > $('.header').height() + 80) {
			$('.header').addClass('pos');
		} else {
			$('.header').removeClass('pos');
		}
	}

	/**
	 * 顶部二维码联动
	 */
	var ewm_index = 0;
	$('.header .qr_area').on('mouseover', '.qr_item', function() {
		ewm_index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.header .qr_big_show').find('img').eq(ewm_index).removeClass('hide').siblings().addClass('hide');
	})


	//返回顶部
	$('body').on('click', '.gotop', function() {
		$('html,body').stop(1).animate({
			scrollTop: '0'
		}, 300);
		return false
	});

	// 底部二维码
	$('.fixed_float .code .tab_index').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('.fixed_float .code .tab-content .tab_con').eq($(this).index()).addClass('active').siblings().removeClass(
			'active');
	})

	// 手机端下拉
	$('.m_header .mobile_key').on('click', function(event) {
		$('.m_header .m_nav').stop().slideToggle(300);
		if ($('.m_header').hasClass('menu-open')) {
			$('.m_header').removeClass('menu-open');
			$('body').height('auto');
			$('body').css('overflow', 'auto');
			$('body').css({
				position: 'static'
			});
		} else {
			$('.m_header').addClass('menu-open');
			$('body').height($(window).height());
			$('body').css('overflow', 'hidden');
			$('body').css({
				position: 'fixed',
				left: '0',
				right: '0',
				top: '0'
			});
		}
	});

	// 手机端二级下拉
	$('.m_nav .mNav_bott').on('click', '.m_navli', function(event) {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).find('.m_secNav').stop().slideUp();
		} else {
			$(this).addClass('active').siblings().removeClass('active');
			$('.m_nav .mNav_bott .m_navli .m_secNav').slideUp();
			$(this).find('.m_secNav').stop().slideDown();
		}
	});

	$('.m_header .m_search').click(function() {
		$('.m_header .m_nav').stop().slideUp(300);
		$('.m_header').removeClass('menu-open');
		$('.search-alert').toggleClass('active');
	})
	$('.search-alert .close').click(function() {
		$('.search-alert').removeClass('active')
	})

	// 筛选功能 - 更多
	$('.filter .more').on('click', function() {
		var _Box = $(this).parent().parent();
		if ($(this).hasClass('cur')) {
			$(this).removeClass('cur');
			_Box.find('.all').animate({
				height: 0
			}, 'fast');
		} else {
			$(this).addClass('cur');
			_Box.find('.all').animate({
				height: _Box.find('.all_con').height() + 'px'
			}, 'fast');
		}
	})

	//  筛选处理
	$('.txd_address').click(function(e) {
		event.stopPropagation();
		$('.cityboxbtn').removeClass('cityboxbtn_on');
		$('.citybox').hide();
		if (!$(this).find('.cityboxbtn').hasClass('cityboxbtn_on')) {
			$(this).find('.cityboxbtn').addClass('cityboxbtn_on');
			$(this).find('.citybox').show();
		} else {
			$(this).find('.cityboxbtn').removeClass('cityboxbtn_on');
			$(this).find('.citybox').hide();
		}
	});
	$('body').click(function() {
		$('.cityboxbtn').removeClass('cityboxbtn_on');
		$('.citybox').hide();
	})
})
