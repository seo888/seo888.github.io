function showmsg(msg, redirectUrl) {
	var obj = $("#msgtip");
	if (obj.length == 0)
	{
		obj = $('<div id="msgtip"><i class="icon"></i>' + msg + '</div>');
		obj.css({"top": 120, "left": ($("body").width() - 250) / 2, "position": "fixed"});
		$('body').append(obj);
	}
	else
	{
		obj.html("<i class=\"icon\"></i>" + msg);
	}

	setTimeout(function () {
		if (redirectUrl == "refresh")
		{
			window.location.reload();
		}
		else if (redirectUrl == undefined || redirectUrl == '')
		{
			console.log(redirectUrl);
			obj.hide().remove();
		}
		else if (redirectUrl != "")
		{
			window.location.href = redirectUrl;
		}
	}, 2000);
}

$(function () {

	$(".guide_list_con").find("dt").click(function () {
		var _this = $(this);
		var id = _this.attr("data-target");
		if (_this.hasClass("closed"))
		{
			_this.add("#" + id).removeClass("closed").addClass("opened");
		}
		else
		{
			_this.add("#" + id).removeClass("opened").addClass("closed");
		}
	});

	$(".guide_list_con").find("dd").find("li").click(function () {
		var _this = $(this);
		if (_this.find("a").siblings("ul").length != 0)
		{
			_this.find("a").siblings("ul").toggle();
		}
	});

	var backTop = $(".global_gotop"), prevTop = document.body.scrollTop || document.documentElement.scrollTop;
	backTop.bind("click", function (e) {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		return false;
	});

	$(document).bind("scroll", function () {
		var top = document.body.scrollTop || document.documentElement.scrollTop;
		if (prevTop > top)
		{
			backTop.show();
			$(".top_head").css({"position": "fixed", "top": "0"});
		}
		else
		{
			backTop.hide();
			$(".top_head").css({"position": "relative", "top": "0"});
		}
		prevTop = top;
	});

	$.cookie = function (key, value, options) {

		// key and at least value given, set cookie...
		if (arguments.length > 1 && String(value) !== "[object Object]")
		{
			options = $.extend({}, options);

			if (value === null || value === undefined)
			{
				options.expires = -1;
			}

			if (typeof options.expires === 'number')
			{
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = String(value);

			return (document.cookie = [
				encodeURIComponent(key),
				'=',
				options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};
//电脑版
	var cs_version;
	var date = new Date();
	date.setTime(date.getTime() + (30 * 60 * 1000));//30分钟

	$(".diannaoban").on("click",function(){
		$.cookie('cs_version', 1, {'expires': date, 'path': '/','domain':'wj001.com'});
	})
//电脑版

	if ($("#suspend").length > 0 && navigator.userAgent.indexOf("iPhone") > 0 && navigator.userAgent.indexOf("Safari") > 0)
	{
		if ($.cookie('recomm_time') == null)
		{
			$("#suspend").css({position: "fixed", left: ($(window).width() - 190) / 2});
			$("#suspend").show();
		}

		$(".suspend_close").on("click", function () {
			$("#suspend").hide();
			$.cookie('recomm_time', 1);
			return false;
		});
	}
	else
	{
		if ($.cookie('bottom_khdxz') == null)
		{
			$(".bottom_khdxz").show();
		}

		$(".bottom_khdxz_close").on("click", function () {
			$(".bottom_khdxz").hide();
			$.cookie('bottom_khdxz', 1, {'expires': 1, 'path': '/'});
			return false;
		});
	}

	$(".nav_mini_btn").on('click', function () {
		if ($(".nav_mini_pop").css('display') == 'block')
			$(".nav_mini_pop").hide();
		else
			$(".nav_mini_pop").show();
	});

	if ($('#loginSubmit').length > 0)
	{
		$("#loginSubmit").on("click", function () {
			var pwuser = $("input[name='pwuser']").val();
			var pwpwd = $("input[name='pwpwd']").val();
			if (pwuser.length == 0)
				showmsg('请填写用户名');
			else if (pwpwd.length == 0)
				showmsg('请填写密码');
			else
				$("#loginForm").submit();
		});
	}

	//首页获取更多
	var getting = false;
	$('#news_list_more').click(function () {
		if (!getting)
		{
			getting = true;
			var _this = $(this);
			var _page = _this.attr('data-page');
			$.ajax({
					   type: 'get',
					   url: '/site/ajax',
					   data: {'page': _page},
					   dataType: 'json',
					   success: function (data) {
						   if (data.code == 1)
						   {
							   if (data.msg.length > 0)
							   {
								   $('#news_list').append(data.msg);
								   _page = parseInt(_page) + 1;
								   if (_page == 10)
									   _this.remove();
								   else
									   _this.attr('data-page', _page);

							   }
						   }
						   else
						   {
							   showmsg('没有更多了...');
							   _this.hide();
						   }
					   },
					   error: function (data) {
						   showmsg(data.responseText);
					   },
					   complete: function () {
						   getting = false;
					   }
				   })
		}
		return false;
	});

	Zepto('.lazyload').picLazyLoad();

});