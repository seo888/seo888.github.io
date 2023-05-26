; (function ($) {
	var $warp = $(".inner"),
		$tab = $(".switch-nav");
	$(function () {
		$warp.mouseover(function () {
			$tab.removeClass("mouseout").addClass("mouseover");
		});
		$warp.mouseout(function () {
			$tab.removeClass("mouseover").addClass("mouseout");
		});
	});
	$.fn.extend({
		/**
		 * 图片轮播公共组件.
		 * 跟页面结构强耦合,阅读时请参照以下页面结构.
		 * <div class="inner" id="inner2">
		 *      <div class="hot-event">
		 *          //左右切换箭头(若不需要，可以删掉)
		 *          <div class="switch-nav">
		 *            <a href="javascript:void(0);" onclick="return false;" class="prev"><i class="ico i-prev"></i></a>
		 *            <a href="javascript:void(0);" onclick="return false;" class="next"><i class="ico i-next"></i></a>
		 *          </div
		 *
		 *          //广告图片和文字主题
		 *          <div class="event-item" style="display: block; opacity: 1;">1</div>
		 *          <div class="event-item" style="display: none; opacity: 0;">2</div>
		 *          <div class="event-item" style="display: none; opacity: 0;">3</div>
		 *
		 *          //切换按钮(若不需要可以删掉)
		 *          <div class="switch-tab">
		 *            <a href="javascript:void(0)" onclick="return false;" class="">1</a>
		 *            <a href="javascript:void(0)" onclick="return false;" class="">2</a>
		 *            <a href="javascript:void(0)" onclick="return false;" class="current">3</a>
		 *          </div>
		 *      </div>
		 * </div>
		 * @param con 轮播参数设置.
		 * @example con = {
		 *  t: 5000, //轮播间隔时间,单位ms
		 *  a: 1000, //透明度渐变时间,单位ms
		 *  auto: true //是否自动轮播
		 * }
		 * @example 调用方式：$('#inner').nav({ t: 5000, a: 1});
		 * @returns {调用该方法的jquery对象}
		 */
		"nav": function (con) {
			var $this = $(this),
				$nav = $this.find('.switch-tab'),
				$page = $this.find('.inner_page'),
				t = (con && con.t) || 3000,
				a = (con && con.a) || 500,
				i = 0,
				len = $this.find(".event-item").length,
				autoChange = function () {
					var nextI;
					// 点击向左轮播箭头且当前为第一张图时(此时i=-2)，设置下一张图为最后一张图(nextI=len-1)
					if (i==-2) {
						nextI = len-1;
					} else {
						nextI = i + 1 === len ? 0 : i + 1;
					}
					$nav.find('a:eq(' + nextI + ')').addClass('current').siblings().removeClass('current');
					$this.find('.event-item:eq(' + i + ')').css('display', 'none').end().find('.event-item:eq(' + nextI + ')').css({
						display: 'block',
						opacity: 0
					}).animate({
						opacity: 1
					}, a, function () {
						i = nextI;
					}).siblings('.event-item').css({
						display: 'none',
						opacity: 0
					});

					var curIdx = $nav.find('.current').index() + 1;
					$(".switch-tabTxt").children("b").text(curIdx);//@TODO:暂不清楚做什么用,后续补充.

					if (a == "true") {
						con.auto = false;
					}

					if($page) {
						$page.find('.page_total').text(len);
						$page.find('.page_current').text(nextI+1);
					}
				},
				st,//计数器.
				auto = (con.auto || con.auto == undefined) ? true : false;
			if (auto) {
				st = setInterval(autoChange, t);
			}
			$this.hover(function () {
				clearInterval(st);
				return false;
			}, function () {
				if (auto) {
					st = setInterval(autoChange, t);
				}
				return false;
			}).find('.switch-nav>a').on('click', function () { //右下角页码按钮点击事件绑定.
				var blockItem = $this.find(".event-item:visible");			
				var current = blockItem.index() - 1;
				i = $(this).attr('class') === 'prev' ? current - 2 : current;
				autoChange(true);
				return false;
			}).end().find('.switch-tab>a').on('click', function () { //左右切换箭头点击事件绑定.
				i = $(this).index() - 1;
				autoChange(true);
				return false;
			});
			//@TODO:暂不清楚做什么用,后续补充.
			$(".switch-tabAll").children("b").text(len);
			if($page) {
				$page.find('.page_total').text(len);
				$page.find('.page_current').text(i+1);
			}
			return $this;

		}
	});
}(jQuery));
