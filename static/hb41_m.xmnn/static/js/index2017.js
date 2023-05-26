$(function(){
	$("#xmnn_wx1").hover(function(){$(".cooper .xmnn_ewm1").show()},function(){$(".cooper .xmnn_ewm1").hide()})
	$("#xmnn_wx2").hover(function(){$(".cooper .xmnn_ewm2").show()},function(){$(".cooper .xmnn_ewm2").hide()})
	jQuery("#nav").slide({ 
		type:"menu",// 效果类型，针对菜单/导航而引入的参数（默认slide）
		titCell:".nLi", //鼠标触发对象
		targetCell:".sub", //titCell里面包含的要显示/消失的对象
		effect:"slideDown", //targetCell下拉效果
		delayTime:300 , //效果时间
		triggerTime:0, //鼠标延迟触发时间（默认150）
		returnDefault:true //鼠标移走后返回默认状态，例如默认频道是“预告片”，鼠标移走后会返回“预告片”（默认false）
	});
	jQuery("#xhead .head5 .kx").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:2,interTime:50});
	jQuery("#slideBox").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"fold",autoPlay:true,interTime:3000,vis:1});

	jQuery("#esdBox").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"fold",autoPlay:true,interTime:3000,vis:1});

	jQuery("#rdhdBox").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,interTime:4000,vis:1});

	$("#gotop_btn,#search-btn").click(function(e) {
		$("body, html").animate({scrollTop:0},1000);
		return false;
	});
    // $("#page a").click(function(e) {
	// 	$("body, html").animate({scrollTop:0},0);
	// 	return false;
	// });
	$('#right-ad a').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 1000)
      })

	$("#goTop .qr-code").hover(function(){$("#goTop .qr-code-container").show()},function(){$("#goTop .qr-code-container").hide()})
	
	$('.acon').each(function(){
		s=$(this).find('.tag').text();
		if(s!=''){ $(this).find('.tag').show()}else{$(this).find('.tag').hide()}
	})
	$.fn.tap = function(fn){
		var collection = this,
		isTouch = "ontouchend" in document.createElement("div"),
		tstart = isTouch ? "touchstart" : "mousedown",
		tmove = isTouch ? "touchmove" : "mousemove",
		tend = isTouch ? "touchend" : "mouseup",
		tcancel = isTouch ? "touchcancel" : "mouseout";
		collection.each(function(){
			var i = {};
			i.target = this;
			$(i.target).on(tstart,function(e){
				var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
				i.startX = p.clientX;
				i.startY = p.clientY;
				i.endX = p.clientX;
				i.endY = p.clientY;
				i.startTime = + new Date;
			});
			$(i.target).on(tmove,function(e){
				var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
				i.endX = p.clientX;
				i.endY = p.clientY;
			});
			$(i.target).on(tend,function(e){
				if((+ new Date)-i.startTime<300){
					if(Math.abs(i.endX-i.startX)+Math.abs(i.endY-i.startY)<20){
						var e = e || window.event;
						e.preventDefault();
						fn.call(i.target);
					}
				}
				i.startTime = undefined;
				i.startX = undefined;
				i.startY = undefined;
				i.endX = undefined;
				i.endY = undefined;
			});
		});
		return collection;
	}
	function is_Location(){ 
		$('#m-menu').tap(function () {
			$('#circle').addClass("chennel");
			$('#wap-head .nav_hot').hide();
			$("#wap-search").removeClass("on");
			$(".wap_bg").removeClass("cur");
			$('.collect').removeClass("let");
		})
		$('#nav-off').tap(function () {
			$('#circle').removeClass("chennel");
			$('#wap-head .nav_hot').show();
		})
		$("#quju1").tap(function(){
			if(!$(this).hasClass('quju-more')){
				$(this).addClass("quju-more").siblings(".sub").removeClass("quju-more");
				$("#wap-head .quju1").addClass("show");
				$("#wap-head .quju2,#wap-head .quju3").removeClass("show");
				$("#wap-search").removeClass("on");	
				$(".wap_bg").removeClass("cur");
				$('.collect').removeClass("let");
			}else{
				$(this).removeClass("quju-more");
				$("#wap-head .quju1").removeClass("show");		
			}	
		})
		$("#quju2").tap(function(){
			if(!$(this).hasClass('quju-more')){
				$(this).addClass("quju-more").siblings(".sub").removeClass("quju-more");
				$("#wap-head .quju2").addClass("show");
				$("#wap-head .quju1,#wap-head .quju3").removeClass("show");
				$("#wap-search").removeClass("on");	
				$(".wap_bg").removeClass("cur");
			}else{
				$(this).removeClass("quju-more");
				$("#wap-head .quju2").removeClass("show");		
			}	
		})
		$("#quju3").tap(function(){
			if(!$(this).hasClass('quju-more')){
				$(this).addClass("quju-more").siblings(".sub").removeClass("quju-more");
				$("#wap-head .quju3").addClass("show");
				$("#wap-head .quju1,#wap-head .quju2").removeClass("show");
				$("#wap-search").removeClass("on");	
				$(".wap_bg").removeClass("cur");
			}else{
				$(this).removeClass("quju-more");
				$("#wap-head .quju3").removeClass("show");		
			}	
		})
		$(".wap-search").tap(function(){
			if(!$("#wap-search").hasClass('on')){
				$("#wap-search").addClass("on");
				$(".wap_bg").addClass("cur");
				$('#circle').removeClass("chennel");
				$('#wap-head .nav_hot').show();	
				$("#wap-head .sub").removeClass("quju-more");
				$("#wap-head .quju").removeClass("show");	
			}else{
				$("#wap-search").removeClass("on");
				$(".wap_bg").removeClass("cur");		
			}	
		})
		$('.wap_bg,#circle').bind("touchmove",function(e){  
                e.preventDefault();  
        });
		$(".wap_bg").tap(function(){
				$("#wap-search").removeClass("on");
				$(".wap_bg").removeClass("cur");
		})
	}		   
	is_Location()
	
	// $(".box2 .h a").hover(function(){
	// 	var index = $('.box2 .h a').index(this);
    //     $('.box2 .b ').eq(index).addClass('cur').siblings('.b').removeClass('cur');
    //     $(this).addClass('on').siblings('a').removeClass('on');	
	// })
	$(".box15 .h a").hover(function(){
		var index = $('.box15 .h a').index(this);
        $('.box15 .b ').eq(index).addClass('cur').siblings('.b').removeClass('cur');
        $(this).addClass('on').siblings('a').removeClass('on');	
	})
	$(".box16 .h a").hover(function(){
		var index = $('.box16 .h a').index(this);
        $('.box16 .b ').eq(index).addClass('cur').siblings('.b').removeClass('cur');
        $(this).addClass('on').siblings('a').removeClass('on');	
	})
	$(".pics-xmnn li a").hover(function(){
		$(this).find(".ht").stop(false,true).animate({top:"0"})
		$(this).find(".bg").stop(false,true).animate({bottom:"0"})	
	},function(){
		$(this).find(".ht").stop(false,true).animate({top:"-100%"})	
		$(this).find(".bg").stop(false,true).animate({bottom:"-100%"})	
	})
	
	var contHeight=$(".content .cont-b").height();
	if(contHeight<1000){
		$("#qw").hide();	
	}
	$("#qw").tap(function(){
		$(".content .cont-b").addClass("out")
		$(this).fadeOut();
	})
	$("#fontSet .small").click(function(){
		$(this).addClass("opt").siblings().removeClass("opt");
		$(".content .cont-b").addClass("font-small").removeClass("font-middle").removeClass("font-big");
	})
	$("#fontSet .middle").click(function(){
		$(this).addClass("opt").siblings().removeClass("opt");
		$(".content .cont-b").addClass("font-middle").removeClass("font-small").removeClass("font-big");
	})
	$("#fontSet .big").click(function(){
		$(this).addClass("opt").siblings().removeClass("opt");
		$(".content .cont-b").addClass("font-big").removeClass("font-small").removeClass("font-middle");
	})
	$('.list li').each(function(){
		s=$(this).find('img').attr('src')
		if(s!=''){ $(this).find('img').show()}else{$(this).find('img').hide()}
	})
	$('#feedAv div').remove();
})