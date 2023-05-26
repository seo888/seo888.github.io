(function ($) {
	$(document).ready(function () {


		if ($(".win-gd").length > 0) {
			$(".win-gd-t span").click(function () {
				$(this).parents(".win-gd-box").hide().siblings().show();
			});
			$(".win-gd-icon").click(function () {
				$(this).hide().siblings().show();
			});
		};

		$(".goto").click(function () {
			var ddIndex = $(this).stop().attr('href').replace("#", "");
			var windowTop = $("[id=" + ddIndex + "]").offset().top;
			var hh = $(".top-nav").height();
			$('body,html').animate({
				scrollTop: windowTop - hh
			}, 200);
			return false;
		});

		$(".h-tab-check").hover(function () {
			$(this).addClass("active").siblings().removeClass("active").parent().siblings(".b").children(".b-tab").hide().siblings("." + $(this).attr("id")).show();
		});

		$(".pz-check-num").each(function () {
			var pzn = $(this).html();
			if (pzn >= 8) {
				$(this).addClass("best");
			} else if (pzn >= 5 && pzn < 8) {
				$(this).addClass("better");
			} else {
				$(this).addClass("good");
			}
		});

        $(".app-ranklist li").hover(function () {
            $(this).addClass("active").siblings().removeClass();
          });

		if ($(".sider-fixed").length > 0 && $(window).width() >= 1200) {
			var fixedT = $(".sider-fixed"),
                fixedTh = fixedT.height(),
                fixedTw = fixedT.width(),
				fixedTtop = fixedT.offset().top,
				toph=$(".top-nav").height();
			$(window).scroll(function () {
				if ($(window).scrollTop() > fixedTtop -toph) {
					fixedT.css({
						"position": "fixed",
						"top": toph,
                        "z-index": "9999",
                        "width":fixedTw
					}).addClass("isfixed");
					if (fixedT.siblings(".sider-fixed-mod").length < 1) {
						fixedT.parent(".box").append("<div style='height:" + fixedTh + "px' class='sider-fixed-mod' />");
					}
				} else {
					fixedT.removeClass("isfixed").removeAttr("style").siblings(".sider-fixed-mod").remove();
				}
			});
		}

		//返回顶部
		var $backToTopTxt = "返回顶部",
			$backToTopEle = $('<div class="backtotop fc-gray"><i class="icf i-backtop"></i></div>').appendTo($("body")).attr("title", $backToTopTxt).click(function () {
				$("html, body").animate({
					scrollTop: 0
				}, 200);
			}),
			$backToTopFun = function () {
				var st = $(document).scrollTop(),
					winh = $(window).height();
				(st > 0) ? $backToTopEle.show(): $backToTopEle.hide();
				if ($(".win-gd").length > 0) {
					$(".backtotop").addClass("lb");
				};
				//IE6下的定位
				if (!window.XMLHttpRequest) {
					$backToTopEle.css("top", st + winh - 200);
				}
			};
		$(window).bind("scroll", $backToTopFun);
		$(function () {
			$backToTopFun();
		});
		

	});
})(window.jQuery);