// JavaScript Document By Millia
$(function($){
	$(".menu_btn").click(function(){
		$(".navBox").toggle(1);		
	});
	
	var y = $(".main").height();
	var h = $(window).height()/2;
	var r = $(".ranktop").height();

		$(window).scroll(function(){
			var x = $(window).scrollTop();
			//滚动440px，左侧导航固定定位
			if ( x > 440 && x < y){
				$(".leftFixed").css({"position":"fixed","top":10});
			}else{
				$(".leftFixed").css({"position":"","top":""});
			};
			if( x >= y+h ){
				$(".recFixed").css({"position":"fixed","top":10});
			}else{
				$(".recFixed").css({"position":"","top":""});
			}
			if(x > r+h){
				$(".rankinglist").css({"position":"fixed","top":10});	
			}else{
				$(".rankinglist").css({"position":"","top":""});
			};
	
		});
	
	
	var $uli = $(".ranking li");
	    $uli.hover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
			var index = $uli.index(this);
		$("div.rankingbox > ul").eq(index).show().siblings().hide();
	});	
	

	$(".sizeAdd").click(function(){
		$("#content").animate({ fontSize:"+=2px" });
			
	});
	$(".sizeSub").click(function(){
		$("#content").animate({ fontSize:"-=2px" });
			
	});	
	
	


	
	
	
	$('#changyan_count_unit').bind("click",function(){
		$('html,body').animate({scrollTop:$('#SOHUCS').offset().top}, 800);
	});
	
});

//自定义百度分享
	var ShareId = "";    
	$(function () {
		$(".bdsharebuttonbox a").mouseover(function () {
			ShareId = $(this).attr("data-id");
			ShareTxt = $(this).attr("title");
		});
	});

	function SetShareUrl(cmd, config) {            
		if (ShareId) {
		config.bdUrl = ShareId; 
		config.bdText = ShareTxt;    
		}
		return config;
    }	
		
window._bd_share_config = {
	common : {
		onBeforeClick:SetShareUrl,
		//bdText : '',
		bdMiniList : ["weixin","tsina","qzone","sqq",],
	},
	share : [{
		//"tag" : "share_1",
		"bdSize" : 32
	}],		
}
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];