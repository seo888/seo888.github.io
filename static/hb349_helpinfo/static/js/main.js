/*-------------------
-------------------*/
$(function(){
	//Lazy-img
	$("img").lazyload({
		effect : "fadeIn"
	});
	//MainNav
	$("#mainav li:has(ul)").each(function(){
		$(this).children("a").append("<i class=\"fa fa-angle-down\"></i>");
	});
	$("#mainav li:has(ul)").mouseenter(function(){
		$(this).find("ul").slideDown(100);
	}).mouseleave(function(){
		$(this).find("ul").slideUp(100);
	});
	$("#mainav .fa-navicon").click(function(){
		$("#mainav .bar").toggle();
	})
	//Side Last
	var slastop = $("#sidebar>li:last").offset().top;
	$(window).scroll(function(){
		var scrollht=$(window).scrollTop();
		//MainNav
		if(scrollht>30){
			$(".navbox").addClass("headfix").animate({height:"42px"},10);
		}else{
			$(".navbox").removeClass("headfix").animate({height:"68px"},10);
		}
		//Side Last
		if(scrollht>slastop){
			$("#sidebar>li:first").addClass("slfix");
		}else{
			$("#sidebar>li:first").removeClass("slfix");
		}
		//BackTop
		if(scrollht>500){
			$("#backtop").fadeIn().css({bottom:"170px"});
		}else{
			$("#backtop").fadeOut();
		}		
	});
	//Side Sort
	$("#blogsort ul li .sico").each(function(){
		$(this).click(function(){
			$(this).parent().find("ul").slideToggle();
			$(this).children(".fa").toggleClass("fa-rotate-180");
		})
	});
	//BackTop
	$("#backtop").click(function(){
		$("html, body").animate({ scrollTop: 0 },300);
		$(this).animate({bottom:"1500px"},500);
	})
})