$(window).load(function(){
	$('.ads-box').each(function(i, ele) {
		if($(this).find('div').length > 0) {
			$(this).addClass('ads-text');
		} else {
			$(this).removeClass('ads-text');
		}
	});
	
	$('.zleftf img').parent('p').css('text-indent', '0');
})

window.onload = function() {
};