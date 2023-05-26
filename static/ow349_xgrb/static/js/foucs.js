// JavaScript Document
var t = count = n = 0;
$(function(){
	$(".big_img a:not(:first)").hide();
	$(".link_nav a:not(:first)").hide();
	$num_nav = $(".num_nav span");
	$big_img = $(".big_img a");
	count = $big_img.length;
	t = setInterval("showAuto()", 2000);  
	
	$num_nav.click(function(){
		var num_nav = $(".num_nav span").index(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		$big_img.filter(":visible").fadeOut(500).parent().children().eq(num_nav).fadeIn(1000); 
		$(".link_nav a").filter(":visible").fadeOut(500).parent().children().eq(num_nav).fadeIn(1000); 
	});
	$(".img_nav").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 2000);}); 
})

function showAuto()   
{   
	n = n >= 4 ? 0 : (n + 1);   
	$num_nav.eq(n).trigger('click');   
}