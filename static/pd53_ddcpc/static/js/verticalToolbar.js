/**
 * 右侧快捷导航
 * 返回顶部
 */
(function($) {

  // 增加 jquery 页面结构加载完成回调函数
  // 避免 IE8 及一下浏览器在 body 没有完成时 append 元素后出错
  // $('body').append();
$(function () {
	function init() {
		var toolbarDom = '<div class="shortcur_nav" id="shortcur_nav" log_action="5913cd5b66ff9d20e7c8dc0f"><ul><li><a class="shortcurNav_goTopBtn no_text" id="shortcurNav_goTopBtn" href="javascript:;"></a></li></ul></div>';
		var screenW = window.screen.width;
		if (screenW <= 1024) {
			return false;
		} else {
			$('body').append(toolbarDom);
		}
		var shortcurNav = $("#shortcur_nav"),
			shortcurNavs = shortcurNav[0],
			shortcurNavEwm = shortcurNav.find('.shortcurNav_ewm'),
			shortcurNavWx = shortcurNav.find('.shortcurNavWX'),
			shortcurNavGoTop = shortcurNav.find('#shortcurNav_goTopBtn');

		$(window).scroll(function() {
			$(window).scrollTop() > 0 ? shortcurNav.show() : shortcurNav.hide();
		});
		shortcurNavEwm.hover(function() {
			shortcurNavWx.show();
		}, function() {
			shortcurNavWx.hide();
		});

		shortcurNavGoTop.on("click", function() {
			$("html,body").animate({
				scrollTop: 0
			}, 300);
			return false;
		});

		//ie6兼容性处理
		fixedPosition(shortcurNav[0], {
			bottom: 70
		});
	}
	/**
	 * 获取IE浏览器的版本.
	 * @return
	 */
	var myBrowser = {
		getBrowserInfo: function() {
			var agent = navigator.userAgent.toLowerCase();
			var regStr_ie = /msie [\d.]+;/gi;
			if (agent.indexOf("msie") > 0) {
				return agent.match(regStr_ie);
			}
		},
		getIEVersion: function() {
			var browser = this.getBrowserInfo();
			if ((browser + "").match(/msie\s*\d{1,2}.\d/ig)) {
				var verinfo = (browser + "").replace(/[^0-9.]/ig, "");
				return parseInt(verinfo);
			};
		}
	};
	var fixedPosition = function() {
		var isIE6 = (myBrowser.getIEVersion() === 6),
			html = document.getElementsByTagName('html')[0],
			dd = document.documentElement,
			db = document.body,
			doc = dd || db;
		if (isIE6 && db.currentStyle.backgroundAttachment !== 'fixed') {
			html.style.backgroundImage = 'url(about:blank)';
			html.style.backgroundAttachment = 'fixed';
		}
		return isIE6 ?
			function(elem, pos) {
				var style = elem.style,
					dom = '(document.documentElement || document.body)';
				if (typeof pos.left !== 'number') {
					pos.left = doc.clientWidth - pos.right - elem.offsetWidth;
				}
				if (typeof pos.top !== 'number') {
					pos.top = doc.clientHeight - pos.bottom - elem.offsetHeight - 220;
				}
				elem.style.position = 'absolute';
				style.removeExpression('left');
				style.removeExpression('top');
				style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + pos.left + ') + "px"');
				style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + pos.top + ') + "px"');
			} :
			function(elem, pos) {
				var style = elem.style;
				style.position = 'fixed';
				if (typeof pos.left === 'number') {
					style.left = pos.left + 'px';
				}
				if (typeof pos.top === 'number') {
					style.top = pos.top + 'px';
				}
			};
	}();
	init();
});
})(jQuery);
