/*!
 * 
 *
 * @version   v1.0.0  
 * @auhor    maguoxiong@chinaso.com  
 * @data      
 * 
 */

(function($) {
	// 搜索框
	var search = $('.search'),
		searchInput = $('.search-input'),
		searchBtn = $('.search-btn');

	searchBtn.on('click', function(event) {
		event.preventDefault();
		var formUrl = 'http://zhannei.baidu.com/cse/search?s=2188754613952038681&entry=1&q=';

		var val = '当代先锋网';
		if (searchInput.val()) {
			val = searchInput.val();
		}

		if (searchInput.is(':hidden')) {
			search.addClass('search-cur');
			searchInput.show();
		} else {
			search.removeClass('search-cur');
			searchInput.hide();
			window.open(formUrl + val);
		}
	});

	// 关注微信
	var weixinBtn = $('.weixin-btn'),
		weixinLogo = $('.weixin-logo');
	var weixinTimer;
	weixinBtn.on({
		mouseover: function() {
			var _this = $(this);
			clearTimeout(weixinTimer);
			weixinTimer = setTimeout(function() {
				weixinLogo.fadeIn();
			}, 100);
		},
		mouseout: function() {
			weixinLogo.fadeOut();
			clearTimeout(weixinTimer);
		}
	});

	// 导航
	var moreNav = $('#moreNav'),
		moreNavCon = $('#moreNavCon');
	moreNav.on('click', function(event) {
		event.stopPropagation();
		moreNavCon.fadeToggle();
	});

	$(document).on('click', function(event) {
		if (moreNavCon.css('display') === 'block') {
			moreNav.click();
		}
	});
})(jQuery)