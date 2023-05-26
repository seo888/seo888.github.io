//SSO Loader [v 1.1.0]
(function(){var s="http://sso.people.com.cn/resource/js/sso.js";function e(b){return function(){RMWSSO.cache.push({n:b,a:arguments})}}function d(b,c){var a=document.createElement("script");a.type="text/javascript";a.onreadystatechange=a.onload=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(c&&c(),a.onreadystatechange=a.onload=null,a.parentNode.removeChild(a))};a.src=b;document.getElementsByTagName("head")[0].appendChild(a)}if(!window.RMWSSO){var c=["login","logout","getUsername","getUserData","crossDomainLogin","ready"];window.RMWSSO={type:"loader",cache:[]};for(var b=0;b<c.length;b++)RMWSSO[c[b]]=e(c[b]);var f=setTimeout(function(){d(s)},5E3);d(s,function(){clearTimeout(f)})}})();
RMWSSO.getUserData(function(user){
	if(!user.userId){
		//$("#txz_dlq").show();
		//$("#txz_dlh").hide();
		//console.log('未登录');
	}else{
		//$("#txz_dlq").hide();
		$("#txz_dlh").show();
		var loginMsg = "<a href='http://sso.people.com.cn/login' target='_blank'>"+user.nickname+"</a><br />欢迎您";
		$("#loginMsg").html(loginMsg);
		//alert('当前登录用户：' + user.nickname);
		$("#login_button").html("<em></em>"+user.nickname.substring(0,2)+"…");
	}
});
/*function loginSuccess(){
	$("#txz_dlq").hide();
	$("#txz_dlh").show();
	RMWSSO.getUserData(function(user){
		if(user.userId){ 
		var loginMsg = "<a href='http://sso.people.com.cn/login' target='_blank'>"+user.nickname+"</a><br />欢迎您";
		 $("#loginMsg").html(loginMsg);
		 $("#login_button").html("<em></em>"+user.nickname.substring(0,2)+"…");
		}
	})	
	$("#p_login").css({"display":"none"});
	$(".rm_nav").css("height","55px");
}*/
$("#logout").bind('click', function(event){
	RMWSSO.logout(function(){
		//alert('退出成功！')
		//$("#txz_dlq").show();
		//$("#txz_dlh").hide();
		$("#p_login").css({"display":"none"});
		$(".rm_nav").css("height","55px");
		$("#login_button").html("<em></em>"+"<a href=\"http://sso.people.com.cn/login\" target=\"_blank\">登录</a>");
	});
})
$(document).ready(function() {
	/*rm_nav*/
	$(".rm_nav").css("height","55px");
	$(".rm_nav_con .col-1 ul li.menu_item").not(".navhome").hover(function(){
		$("#p_login").hide();
		$(this).addClass("navmoon");
		$(this).find("span").addClass("active");
		//$(".rm_nav").css("height","110px");
		//$(".rm_nav").stop(false, true).animate({height:110},600);
		$(".rm_nav").css({height:111});
		$(this).find("img").removeClass("arrowDown").addClass("arrowUp");
	},function(){
		$(this).removeClass("navmoon");
		$(this).find("span").removeClass("active");
		//$(".rm_nav").css("height","55px");
		// $(".rm_nav").stop(false, true).animate({height:55},0);
		$(".rm_nav").css({height:55});
		$(this).find("img").removeClass("arrowUp").addClass("arrowDown");
	});
	$(".rm_nav_con .col-1 ul li.language").not(".navhome").hover(function(){
		$("#p_login").hide();
		$(this).addClass("navmoon");
		$(this).find("span").addClass("active");
		var index=$(".rm_nav_con .col-1 ul li.language").index(this);
		$(".rm_nav").css({height:111});
		/*if(index==1){
			//$(".rm_nav").stop(false, true).animate({height:165},600);
			$(".rm_nav").css({height:167});
		}
		else{
		// $(".rm_nav").stop(false, true).animate({height:110},600);
		$(".rm_nav").css({height:115});
		}*/
		$(this).find("span").find("img").removeClass("arrowDown").addClass("arrowUp");
	},function(){
		$(this).removeClass("navmoon");
		$(this).find("span").removeClass("active");
		//$(".rm_nav").stop(false, true).animate({height:55},300);
		$(".rm_nav").css({height:55});
		$(this).find("span").find("img").removeClass("arrowUp").addClass("arrowDown");
	});
	$(".rm_nav_con .col-1 ul li.menu_itemth").not(".navhome").hover(function(){
		$("#p_login").hide();
		$(this).addClass("navmoon");
		$(this).find("span").addClass("active");
		var index=$(".rm_nav_con .col-1 ul li.menu_itemth").index(this);
		$(".rm_nav").css({height:167});
		$(this).find("span").find("img").removeClass("arrowDown").addClass("arrowUp");
	},function(){
		$(this).removeClass("navmoon");
		$(this).find("span").removeClass("active");
		$(".rm_nav").css({height:55});
		$(this).find("span").find("img").removeClass("arrowUp").addClass("arrowDown");
	});
	$(window).on("load", function () {		
		$("#login_button").bind("mouseenter", function() {
			if($("#login_button").text().indexOf("登录") == -1){
				$(".rm_nav").css({height:167});
				$("#p_login").show();
			}
		}),$("#p_login").bind("mouseleave", function() {
			$("#p_login").hide();
			$(".rm_nav").css({height:55});
		});		
	});
	$(".nav_more").click(function(){
		$(".nav_more_con").show();
		$(".nav_mask").show();
		$("body").css("overflow-y","hidden");
		$(".nav_more_con").css({   
			"position": "fixed",
			"width": $(window).width(),
			"height": 0,
			"top": 0,
			"z-index":100 
		});		
		$(".nav_more_con").stop(false, true).animate({height:$(window).height()},1000);
		$(".nav_mask").css({
			width: $(document).width(),
			display: "block",
			height: $(document).height()
		});
	});
	$(".more_btn").click(function(){
		$(".nav_more_con").hide();
		$(".nav_mask").hide();
		$("body").css("overflow-y","auto");
	})
	$('.nav_more_con ul li:nth-child(6n+1)').css("margin-left",0);
	$(window).on("load", function () {
		var w1=document.body.offsetWidth;
		console.log(w1)
		if(w1<1000 && w1 > 700){
			$(".header").css("min-width","1000px")
		}
	})
	y_ipad();
	var i;
	function y_ipad(){
	 var ua = navigator.userAgent.toLowerCase();
	 var s;
	 s = ua.match(/iPad/i);	
	 if(s=="ipad")
	 {
	  var viewport = document.querySelector("meta[name=viewport]");viewport.setAttribute('content', 'width=device-width, initial-scale=1');
	 }
	 else{
	  return false;
	 }
	}
});
