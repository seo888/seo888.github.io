/**
 * 主要为了实现文章上一条及下一条功能 add by lcfeng
 */
;
(function($) {
	$.fn.adjoin = function(options) {
		var defaults = {
			url : ''
		}, $this = $(this);
		var options = $.extend(defaults, options);
		this.each(function() {
			initHandleClick();
		});

		// 初始化上一条和下一条的click事件
		function initHandleClick() {
			if ($this.find(".prev").html().indexOf('上一篇：') == -1) {
				// 找到所有的“上一条”，初始化器Click事件
				$this.find(".prev").click(function() {
					$.post(defaults.url, {
						optionType : "prev"
					}, function(result) {
						if (result) {
							var info = eval('(' + result + ')');
							if (info.status !== 1) {
								alert(info.message);
								return;
							}
							window.location.href = info.url;
						}
					});
				});

				// 找到所有的“下一条”，初始化器Click事件
				$this.find(".next").click(function() {
					$.post(defaults.url, {
						optionType : "next"
					}, function(result) {
						if (result) {
							var info = eval('(' + result + ')');
							if (info.status !== 1) {
								alert(info.message);
								return;
							}
							window.location.href = info.url;
						}
					});
				});
			} else {
				$.post(defaults.url, {
					isShowTitle : "1"
				}, function(result) {
					if (result) {
						var info = eval('(' + result + ')');
						if (info.length > 0) {
							for (var i = 0; i < info.length; i++) {
								var a = "无";
								if (info[i].status == 1) {
									a = "<a href='" + info[i].url + "'>"
											+ info[i].title + "</a>";
								}
								$(info[i].type).html(a);
							}
						}
					}
				});
			}
		}
	};
})(jQuery);

/**
 * $(document).ready(function() { $('.wp_artfuns art_adjoin').adjoin({ url:
 * '/webplus3/_web/cms/folder/getAdjoinURL.do?_p=YXM9MjI1JnQ9NjA0JnA9MSZtPU4m'
 * }); });
 */
