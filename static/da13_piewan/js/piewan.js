function HomeScroll(a, b) {
	function g() {
		var g = $(window).scrollLeft(),
		h = $(window).scrollTop(),
		i = $(document).height(),
		j = $(window).height(),
		k = c.height(),
		l = d.height(),
		m = k > l ? f: e,
		n = k > l ? d: c,
		o = k > l ? c.offset().left + c.outerWidth(!0) - g: d.offset().left - c.outerWidth(!0) - g,
		p = k > l ? l: k,
		q = k > l ? k: l,
		r = parseInt(q - j) - parseInt(p - j);
		$(a + "," + b).removeAttr("style"),
		j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;left:" + o + "px;" + (j > p ? "top": "bottom") + ":0;")
	}
	if ($(a).length > 0 && $(b).length > 0) {
		var c = $(a),
		d = $(b),
		e = c.offset().top,
		f = d.offset().top;
		$(window).resize(g).scroll(g).trigger("resize")
	}
}
HomeScroll("#dw-left", "#dw-right"),
$(function () {
    // tab
	$('.qiehuan-lanmu').find('span').on('click', function () {
	    var times = $(this).index();
	    $(this).addClass('current').siblings().removeClass('current');
	    $(this).parents('.qiehuan').find('.qiehuan-list').eq(times).show().siblings().hide();
	})

$('.qiehuan-lanmu').find('li').on('click', function () {
	    var times = $(this).index();
	    $(this).addClass('current').siblings().removeClass('current');
	    $(this).parents('.qiehuan').find('.qiehuan-list').eq(times).show().siblings().hide();
	})

$('.tab-paihang').find('li').hover(function() {
		$(this).find('.tab-paihang-list').removeClass('hide').siblings('.fBox').addClass('hide');
		$(this).siblings().find('.tab-paihang-list').addClass('hide').siblings('.fBox').removeClass('hide');
	});
	
	$('.tfBox').find('li').hover(function() {
		$(this).find('.tBox').removeClass('hide').siblings('.fBox').addClass('hide');
		$(this).siblings().find('.tBox').addClass('hide').siblings('.fBox').removeClass('hide');
	});

	$('.isubMenu').find('span').on('click', function () {
	    var times = $(this).index();
	    $(this).addClass('current').siblings().removeClass('current');
	    $(this).parents('.isubBox').find('ul').eq(times).show().siblings().hide();
	})

    // indexslider
    var sliderLength = $('.slider').find('li').length,sliderWidth = $('.slider').find('li').width(),dot = 0,dotCont = ' ',slider = '';
    $('.slider').find('ul').css({'width':sliderWidth*sliderLength});
    for(dot ; dot < sliderLength ; dot++){
    	dotCont += '<i></i>';
    }
    $('.slider').find('.dot').append(dotCont);
    $('.slider').find('.dot i').first().addClass('current');
    $('.slider').find('.dot').on('click','i',function(){
    	slider = $(this).index();
    	sliderMove();
    });
    var zidong = setInterval( run , 3000 );
    function run(){
    	slider++;
    	if( slider > sliderLength-1){
    		slider = 0;
    	};
    	sliderMove();
    };
    $('.slider').hover(function(){
    	clearInterval(zidong);
    },function(){
    	zidong = setInterval( run , 3000 );
    });
    function sliderMove(){
    	$('.slider').find('.dot i').eq(slider).addClass('current').siblings().removeClass('current');
    	$('.slider').find('ul').stop().animate({'left': -sliderWidth*slider},500);
    }	
	


	// hj
	if($('.index-ztgame').length>0){
		function moveAnimated(moveElement, targetLeft) {
			clearInterval(moveElement.timeId);
			moveElement.timeId = setInterval(function() {
				var currentLeft = moveElement.offsetLeft;
				var step = 10;
				step = currentLeft < targetLeft ? step : -step;
				currentLeft += step;
				if (Math.abs(targetLeft - currentLeft) > Math.abs(step)) {
					moveElement.style.left = currentLeft + "px";
				} else {
					clearInterval(moveElement.timeId);
					moveElement.style.left = targetLeft + "px";
				}
			}, 8)
		}
		
		var imgWidth = $(".ztgame-qiehuan-ul div").width();
		var circleIndex = 0;
		$(".ztgame-qiehuan-ul div").each(function(i) {
			$(".ztgame-qiehuan-up").append("<span></span>");
			$(".ztgame-qiehuan-up>span:last").attr("index", i);
		})
		$(".ztgame-qiehuan-up>span:first").attr("class", "on");
		$(".ztgame-qiehuan-ul div:first").clone(true).appendTo($(".ztgame-qiehuan-ul"))
		$(".ztgame-qiehuan-pre").on("click", function() {
			if (circleIndex == 0) {
				circleIndex = $(".ztgame-qiehuan-up>span").length;
				$(".ztgame-qiehuan-ul").css("left", -circleIndex * imgWidth + "px");
			}
			circleIndex--;
			moveAnimated($(".ztgame-qiehuan-ul")[0], -circleIndex * imgWidth)
			$(".ztgame-qiehuan-up>span").attr("class", "")
			$(".ztgame-qiehuan-up span:eq(" + circleIndex + ")").attr("class", "on");
		
		})
		
		function clickRight() {
			if (circleIndex == $(".ztgame-qiehuan-ul").children().length - 1) {
				circleIndex = 0;
				$(".ztgame-qiehuan-ul").css("left", "0px");
			}
			circleIndex++;
			moveAnimated($(".ztgame-qiehuan-ul")[0], -circleIndex * imgWidth)
			if (circleIndex == $(".ztgame-qiehuan-ul").children().length - 1) {
				$(".ztgame-qiehuan-up>span:first").attr("class", "on");
				$(".ztgame-qiehuan-up>span:last").attr("class", "");
			} else {
				$(".ztgame-qiehuan-up>span").attr("class", "")
				$(".ztgame-qiehuan-up span:eq(" + circleIndex + ")").attr("class", "on");
			}
		}
		$(".ztgame-qiehuan-nex").on("click", clickRight)	
	}	
		


	// TOP
$('.dianzhan').each(function(){
		$(this).click(function(){
			$(this).addClass("current");
			var id=$('#bg_id').attr("value");
			var classid=$('#bg_flag').attr("value");
			$.ajax({
				url: "/css/dianzhan/",
				type:"get",
				data: {id:id,classid:classid},
				dataType: 'json',
				async:false,
				success:function(result) {	
result = eval(result);			
				    alert("点赞成功+1");
					 $(".number").html(result.data);

				}
			});


		})	
	})



	// TOP
	$('.piewan-top-fh').click(function () {$('body,html').animate({"scrollTop": 0}, 600);});
	$(window).scroll(function () { if ($(window).scrollTop() > 600) { $('.piewan-top-fh').fadeIn();  } else { $('.piewan-top-fh').hide(); }; });
	


if($("img[osrc]")){lazy_load_img_init();other_lazy_load_img_init()} 
 
})
var lazy_load_timer=null;
var lazy_load_obj=null;
function lazy_load_img(){window.clearTimeout(lazy_load_timer);lazy_load_timer=window.setTimeout(function(){var o_list=lazy_load_obj.filter(":visible");if(o_list.length){var v_h=$(window).height()+$(document).scrollTop()+100;o_list.each(function(i){if($(this).offset().top<v_h){$(this).attr("src",$(this).attr("osrc"));lazy_load_obj=lazy_load_obj.not($(this).removeAttr("osrc"));};});};if(!lazy_load_obj.length){lazy_load_img_remove();}},0);};
function lazy_load_img_remove(){lazy_load_timer=null;lazy_load_obj=null;$(self).unbind("scroll",lazy_load_img);$(self).unbind("resize",lazy_load_img);if($.isFunction(self.other_lazy_load_img_remove)){other_lazy_load_img_remove();};};
function lazy_load_img_init(){lazy_load_obj=$("img[osrc]");if(lazy_load_obj.length){$(self).scroll(lazy_load_img);$(self).resize(lazy_load_img);if($.isFunction(self.other_lazy_load_img_init)){other_lazy_load_img_init();};lazy_load_img();};};
 function other_lazy_load_img_init(){$("body section").bind("mouseenter",lazy_load_img);$("body .fBox").bind("mouseenter",lazy_load_img);$("body section").bind("click",lazy_load_img);};
function other_lazy_load_img_remove(){$("body section").unbind("mouseenter",lazy_load_img);$("body .fBox").unbind("mouseenter",lazy_load_img);$("body section").unbind("click",lazy_load_img);};

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f676f5d6c32ea9a890fd21df01dcc4d3";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();




