//modified -b-cosmos-jit 12-19


/*
$(document).ready(function(){
var wh = $(window).height();
$("#js_ads_banner_top_slide").height(wh);//banner 根据窗口高度赋值

$("#mdgov_enterpriseNavigationWrap").animate({top:"-207"},850,function(){

	$("#mdgov_enterpriseNavigationWrap").show();

$("#mdgov_enterpriseNavigationWrap").animate({top:"0"},1500,function(){

   $(".bounce").delay(1000).slideDown(1000); 
 //$(".contents").delay(1000).animate({"margin-top":"440"},1000); 
   $(".bounce").delay(9000).slideUp(500);
 //$(".contents").delay(9000).animate({"margin-top":"188"},1000); 


	
	}); 
});
if ($("#js_ads_banner_top_slide").length){
	var $slidebannertop = $("#js_ads_banner_top_slide"),$bannertop = $("#js_ads_banner_top");
	setTimeout(function(){$slidebannertop.slideUp(1500,function (){$bannertop.slideDown(1000);});},1000);
}
});


*/


$(document).ready(function(){
	var widthZero = $(".yw_left_list").eq(0).width();
	var widthOne = $(".class_push_img").eq(0).width();
	var widthTow = $(".dfczby_wrap").eq(0).width()/2-2.5;
	window.onresize = function(){
		console.log($(document.body).outerWidth(true));
		if($(document.body).outerWidth(true)>964){
			widthZero = $(".yw_left_list").eq(0).width();
			widthOne = $(".class_push_img").eq(0).width();
			widthTow = $(".dfczby_wrap").eq(0).width()/2-2.5;
			
			$(".widthZero").width(widthZero);
			$(".widthZero iframe").width(widthZero-100);
			$(".class_push h1.class_push_tit").width(widthOne);
			$(".classDouble").width(widthTow);
		}else{
			$(".classDouble").removeAttr("style");
		}
	}
	console.log($(document.body).width());
	$(".widthZero").width(widthZero);
	$(".widthZero iframe").width(widthZero-100);
	$(".class_push h1.class_push_tit").width(widthOne);	
	$(".classDouble").width(widthTow);
})








