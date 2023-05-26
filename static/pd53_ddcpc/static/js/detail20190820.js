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
	var searchBtn = $('#searchBtn'),
		searchInputBox = $('#searchInputBox'),
		searchInput = $('.search-input-content');

	searchBtn.on('click', function(event) {
		event.stopPropagation();
		var formUrl = 'http://zhannei.baidu.com/cse/search?s=2188754613952038681&entry=1&q=';
		var val = '当代先锋网';
		if (searchInput.val()) {
			val = searchInput.val();
		}

		if (!searchInputBox.is(':hidden')) {
			window.open(formUrl + val);
			// window.location.href = formUrl + val;
		}
		searchInputBox.fadeToggle();
	});

	// 导航
	var detailNavBtn = $('#detailNavBtn'),
		detailNav = $('#detailNav');
	detailNavBtn.on('click', function(event) {
		event.stopPropagation();
		detailNav.fadeToggle();
	});

	$(document).on('click', function(event) {
		if (detailNav.css('display') === 'block') {
			detailNavBtn.click();
		}
	});


	// 判断图片地址是否正确
	var imgitems = $('.detail-content img');
	imgitems.each(function(index, el) {
		var img = $(el).attr('src');
		var imgw = $(el).attr('width');
		var index = img.indexOf('/data/upload/image/');

		var dew = 720;
		if (index == 0) {
			$(el).attr('src', 'http://jgz.app.todayguizhou.com' + img);
		}

		console.log(imgw)
		if (imgw > dew) {
			$(el).css({
				width: '100%',
				height: 'auto'
			})
		} else {
			$(el).css({
				width: imgw + 'px',
				height: 'auto'
			})
		}
	});

	// 判断是否有图片 没有则不显示左侧
	var recommendItems = $('.recommend-items img');
	recommendItems.each(function(index, el) {
		var img = $(el).attr('src');
		if (!img) {
			$(el).parents('.recommend-item-img').hide();
		}
	});

	var detailTitleContent = $('.detail-title-content'),
		jtContent = $('.detail-title-content-jt'),
		ftContent = $('.detail-title-content-ft');

	if ($.trim(jtContent.html())  || $.trim(ftContent.html())) {
		detailTitleContent.addClass('cur');
	}

})(jQuery)