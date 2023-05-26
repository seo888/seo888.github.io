$(function() {
	var $nav = $("#nav"),$fixedNav = $("#fixedNav");
	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();

		if( (scrollTop > $nav.offset().top) && (scrollTop + windowHeight != scrollHeight) ){
			$fixedNav.show()
		}
		else{
			$fixedNav.hide()
		}
	});
});
