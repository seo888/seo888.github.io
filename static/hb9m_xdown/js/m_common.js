
// 头部
;(function(){
	var navList = true;
	$('.nav-icon').click(function(){
		if(navList){
			var _display= $(".new_head").css("display")
			if(_display=="block"){
				$(".nav").attr("style","top:"+($(".new_head").height()*1+$(".logo").height()*1)+"px")				
			}else{
				$(".nav").attr("style","top:"+($(".logo").height()*1)+"px")				
			}
			$('.nav').slideDown();
			navList = false;
		}else{
			$('.nav').slideUp();
			navList = true;
		}
	})
})()