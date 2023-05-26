(function() {
	var backToTopTxt1 = $(".index_layer").html(),
		backToTopEle1 = backToTopTxt1,
		backToTopFun1 = function() {
			var stback = $(document).scrollTop(),
				winh1 = $(window).height();
			$(".index_layer").show();
			(stback > 0) ? $("#newsbacktop").css('display', 'block'): $("#newsbacktop").css('display', 'none');
			//IE6
			if(!window.XMLHttpRequest) {
				$(".index_layer").css("top", stback + winh1 - 200);
			}
		};
	$(window).bind("scroll", backToTopFun1);
	backToTopFun1();

})();
/*lunhuan*/
function focusBox(o) {
	if(!o) return;
	var w = 830,
		$o = $('#' + o),
		i = 0,
		l = 0;
	arr = [], t = null,
		$infoLi = $o.find('.banner_info li'), len = $infoLi.length * 2,
		$ul = $o.find('.banner_pic>ul');
	$ul.append($ul.html()).css({
		'width': len * w,
		'left': -len * w / 2
	});
	$infoLi.eq(0).addClass('current');
	arr.push('<div class="banner_pages"><ul>');
	$infoLi.each(function(i) {
		if(i == 0) {
			arr.push('<li class="current"><span>' + (i + 1) + '</span></li>');
		} else {
			arr.push('<li><span>' + (i + 1) + '</span></li>');
		}
	});
	arr.push('</ul></div>');
	$o.append(arr.join(''));
	var $pagesLi = $o.find('.banner_pages li');
	//mouse
	$pagesLi.children('span').click(function() {
		var p = $pagesLi.index($o.find('.banner_pages li.current'));
		i = $pagesLi.children('span').index($(this));
		if(i == p) return;
		l = parseInt($ul.css('left')) + w * (p - i);
		addCurrent(i, l);
		return false;
	})
	$o.children('div.btn_prev_shang').click(function() {
		i = $pagesLi.index($o.find('.banner_pages li.current'));
		(i == 0) ? i = (len / 2 - 1): i--;
		l = parseInt($ul.css('left')) + w;
		addCurrent(i, l);
		return false;
	})
	$o.children('div.btn_next_xia').click(function() {
		i = ($pagesLi.index($o.find('.banner_pages li.current')) + 1) % (len / 2);
		l = parseInt($ul.css('left')) - w;
		addCurrent(i, l);
		return false;
	})
	//auto focus
//	t = setInterval(init, 8000);
//	$o.hover(function() {
//		clearInterval(t);
//	}, function() {
//		t = setInterval(init, 8000);
//	});

	function init() {
		$o.children('div.btn_next').trigger('click');
	}
	//add focus
	function addCurrent(i, l) {
		if($ul.is(':animated')) return;
		$ul.animate({
			'left': l
		}, 500, function() {
			$o.children('.banner_count').text(i + 1);
			$infoLi.not($infoLi.eq(i).addClass('current')).removeClass('current');
			$pagesLi.not($pagesLi.eq(i).addClass('current')).removeClass('current');
			if(l == (1 - len) * w) {
				$ul.css({
					'left': (1 - len / 2) * w
				});
			} else if(l == 0) {
				$ul.css({
					'left': -len * w / 2
				});
			}
		});
	}
}
$(function() {
	focusBox('kakaFocus');
})
function addchage1() {
	$("#right_titr li").each(function(i) {
		$(this).hover(function() {
			for(a = 0; a < 8; a++) {
				$("#content_" + a).hide();
			}
			$(this).addClass("right_titr" + i).siblings().removeClass();
			$(this).addClass("titsel").siblings().removeClass();

			$("#content_" + i).show();
		})
		$(this).click(function() {
			for(a = 0; a < 8; a++) {
				$("#content_" + a).hide();
			}
			$(this).addClass("right_titr" + i).siblings().removeClass();
			$(this).addClass("titsel").siblings().removeClass();
			$("#content_" + i).show();
		})
	})
}
$(document).ready(function() {
	addchage1();
});