$(function(){
	/*导航栏更多按钮效果*/
	$(".main-nav .menu .menu-hd").hover(function(){
		$(this).parents(".menu").addClass("hover").end().siblings(".menu-bd").show();
	},function(){
		$(this).parents(".menu").removeClass("hover").end().siblings(".menu-bd").hide();
	});
	$(".main-nav .menu .menu-bd").hover(function(){
		$(this).show().parents(".menu").addClass("hover").end().siblings(".menu-hd").show();
	},function(){
		$(this).hide().parents(".menu").removeClass("hover");
	});
	/*END导航栏更多按钮效果*/
})