$(document).ready(function(e) {	
	$(function () {
		$(".tab-box").each(function(){
			try {
				$(this).find(".tab-menu ul li").each(function(index){
					$(this).hover(function(){
						$(this).addClass("current").siblings("li").removeClass("current");
						$(this).parent().parent().siblings(".tab-main").find(".tab-con").eq(index).show().siblings(".tab-con").hide();
					});
				});
			} catch(e) {
	
			}
		});
	});
	//切换more
	//适当改下$('ul')的元素名
	$('.tab-menu').each(function(index, element) {
		$(this).find('.moreB').eq(0).show();
	});
	
	$('.tab-menu').each(function(index, element) {
		var $_this = $(this);
		var $_this_menu = $_this.find('li');
		var $_this_more = $_this.find('.moreB');
		
		$_this_menu.hover(function(e) {
			$_this_more.hide();
			$(this).find('.moreB').show();
		});
	});
});