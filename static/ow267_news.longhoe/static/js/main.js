/*-------------------
*Description:        For www.ewceo.com
*Website:            http://www.ewceo.com
*Author:             尔今 erx@qq.com
*update:             2015-8-30
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
			$("#sidebar>li:last").addClass("slfix");
		}else{
			$("#sidebar>li:last").removeClass("slfix");
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
	//Comment
	$(".comment-post .cpost .fa-plus").click(function(){
		$("#comment").animate({ height: "200px" },300);
	})
	function getRandomNum(lbound, ubound) {
		return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
	}
	rctext = new Array();
	rctext[0] = "真心不错的文章，已经收藏了！";
	rctext[1] = "顶啊！你猜这句话有没有十五个字？";
	rctext[2] = "我来评论加赞咯，以后就算认识了~";
	rctext[3] = "我接下来的话很重要！一定要看完！在我评论之后会出现两种情况：1、我回过之后没人回了，沉了！这说明这篇文章很有问题，很可能是篇罕见渣文！2、我回过之后，很多人回，火了！呵呵，不要以为是文章好他们才回，那是因为我在！";
	rctext[4] = "曾经沧海难为水，鱼香肉丝配鸡腿。我是来打酱油的…";
	$(".comment-post .cpost .fa-pencil").click(function(){
		xyrd=getRandomNum(0,rctext.length);
		$(".comment-post input[name=comname]").val("游客");
		$("#comment").val(rctext[xyrd]);
	})
	$(".comment-post .cpost .fa-reply").click(function(){
		$("#comment").val("").focus();
	})
	if ($(".comment-post p:eq(3)").is(":empty")) {
		$(".comment-post p:eq(3)").hide();
	}
	//BackTop
	$("#backtop").click(function(){
		$("html, body").animate({ scrollTop: 0 },300);
		$(this).animate({bottom:"1500px"},500);
	})
})