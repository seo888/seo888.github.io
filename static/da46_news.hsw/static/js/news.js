/**
 * Created by Hanwei on 2014/12/29.
 */
(function($) {
	$(function () {
		$(document).on('mouseenter', '.rank.sub-tab2 .cf a', function () {
			var _target = $(this).attr('target');
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
			$(_target).siblings('div').hide();
			$(_target).show();
		});
	});

	var nav = $('.Crumbs-Article a').eq(1).html();
	$('.mainNav a').each(function(){
		if($(this).html() == nav){
			var nav_ok = $(this).index();
			$('.mainNav a').eq(nav_ok).addClass('current').siblings().removeClass('current');
		}
	});
})(jQuery);