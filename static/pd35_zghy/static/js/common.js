
/**跳转链接*/
var _g = function(url) {
	location.href = url;
};

/**
 * 搜索
 * @param searchWord
 */
function doSearch(searchWord) {
	if(searchWord == "") {
		_toast._show("请输入搜索内容");
		return;
	}
	var area_code = $('.user_address a').attr('data-code');
	if(area_code == '-1') {
		area_code = 'quanguo';
	};
	location.href = "";
};

/**弹框*/
var _toast = {
	_center: function() {
		var _left = _._zero(_._client().bw - $("#toast").outerWidth()) / 2 + "px";
		$("#toast").css({
			"bottom": "80px",
			"left": _left
		});
	},
	_show: function(text, fun) {
		$("#toast").html(text);
		_toast._center();
		$("#toast").show();
		$("#toast").bind("resize", _toast._center);
		setTimeout(function() {
			_toast._hide(fun);
		}, 3 * 1000);
	},
	_hide: function(fun) {
		$("#toast").hide();
		$("#toast").unbind("resize");
		if(fun) {
			(fun)();
		}
	}
};

/**公用*/
var _ = {
	_trim: function(text) {
		if(text != undefined) {
			return text.replace(/(^\s*)|(\s*$)/g, "");
		}
	},
	_len: function(text) {
		return text.replace(/[^\x00-\xff]/g, "aa").length;
	},
	_encode: function(text) {
		return escape(encodeURIComponent(text));
	},
	_htmlencode: function(text) {
		return text.replace(/\'/g, "&#39;")
			.replace(/\"/g, "&quot;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/ /g, "&nbsp;")
			.replace(/\n\r/g, "<br>")
			.replace(/\r\n/g, "<br>")
			.replace(/\n/g, "<br>");
	},
	_htmlencodeReturn: function(text) {
		return text.replace(/&#39;/g, "\'")
			.replace(/&quot;/g, "\"")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&nbsp;/g, " ")
			.replace(/&amp;/g, "&");
	},
	_zero: function(n) {
		return n < 0 ? 0 : n;
	},
	_scroll: function() {
		return {
			x: $(document).scrollLeft() + $(window).scrollLeft(),
			y: $(document).scrollTop() + $(window).scrollTop()
		};
	},
	_client: function() {
		return {
			w: document.documentElement.scrollWidth,
			h: document.documentElement.scrollHeight,
			bw: $(window).width(),
			bh: $(window).height()
		};
	},
	_center: function(id) {
		var _top = _._zero(_._client().bh - $("#" + id).outerHeight()) / 2;
		var _left = _._zero(_._client().bw - $("#" + id).outerWidth()) / 2;

		$("#" + id).css({
			"top": _top + "px",
			"left": _left + "px"
		});
	},
	_isHide: function(id) {
		$("#" + id).css("display") == "none";
	},
	//获取文件大小，单位KB
	_fileSize: function(id) {
		var fileSize = id.get(0).files[0].size;
		return fileSize / 1024;
	}
};
/**加载*/
var _loading = {
	_center: function() {
		var y = $(window).height();
		var w = $("body").width();
		$(".loadingDiv").css({
			"left": (w - 120) / 2 + "px",
			"top": (y - 120) / 2 + "px",
			"z-index": 10000
		});
	},
	_show: function(text) {
		_loading._center();
		$("#cover").css({
			"background-color": "#ffffff",
			"opacity": 0,
			"position": "fixed"
		});
		_cover._show("cover");
		$(".loadingDiv .pTxt").html(text);
		$(".loadingDiv").show();
		$(window).bind("resize", "", _loading._center);
	},
	_hide: function() {
		_cover._hide("cover");
		$(".loadingDiv").hide();
		$("#cover").css({
			"background-color": "#000000",
			"opacity": 0.7
		});
	}
};
/**后面的蒙板*/
var _cover = {
	_flag: false,
	_resize: function(id) {
		var _width = (_._client().w > _._client().bw ? _._client().w : _._client().bw) + "px";
		var _height = (_._client().h > _._client().bh ? _._client().h : _._client().bh) + "px";
		$("#" + id).css({
			"width": _width,
			"height": _height
		});
	},
	_resizeAll: function() {
		if($("#cover2")) {
			_cover._resize("cover2");
		}
		_cover._resize("cover");
	},
	_show: function(id) {
		_cover._flag = true;
		$("#" + id).show();
		$("#" + id).css({
			"position": "fixed",
			"width": "100%",
			"height": "100%"
		});
	},
	_hide: function(id) {
		$("#" + id).hide();
		_cover._flag = false;
		if(($("#cover2") && !_._isHide("cover2")) || !_._isHide("cover")) {
			return;
		};
		if(!_user._useIOs()) {
			return;
		}
		$(window).unbind("resize");
		$("#" + id).unbind("click");
	}
};
/**公用的异步*/
var _$ = function(url, param, fun) {
	$.ajax({
		type: "POST",
		url: url,
		// timeout:2000,
		data: param,
		cache: false,
		dataType: "json",
		success: function(data) {
			if(data != null) {
				var _state = data.code;
				//请求正常
				if(_state == '0') {
					fun(data, _state);
				}
				if(_state == '1'){
					fun(data, _state);
				}
				//请求异常
				else {
					var _error = data.error;
					if(_error != undefined && _error != "") {
						_toast._show(_error);
						fun(data, parseInt(_state));
					}
				}
			}
		},
		error: function() {
			_loading._hide();
			_toast._show("网络错误，请重试");
		}
	});
};

/*公共弹窗*/
var _tc = {
	_id: "",
	_center: function() {
		var _top = _._zero(_._client().bh - $("#" + _tc._id).outerHeight()) / 2 + "px";
		var _left = _._zero(_._client().bw - $("#" + _tc._id).outerWidth()) / 2 + "px";
		$("#" + _tc._id).css({
			"left": _left,
			"top": _top,
			"z-index": "3000",
			"position": "fixed"
		});
		if(_tc._id == "login" && $("#login").css("display") == "block") {
			$("#login").css("z-index", "4001");
		}
	},
	_show: function(id) {
		_tc._id = id;
		$("#" + _tc._id).show();
		_cover._show("cover2");
		$("#cover2").bind("click", _tc._hide);
		_tc._center();
		$(window).bind("resize", _tc._center);
		_cover._show("cover2");
	},
	_hide: function() {
		_cover._hide("cover2");
		$("#" + _tc._id).hide();
	}
};

/**默认文字*/
var _placeholder = {
	_support: function() {
		return "placeholder" in document.createElement("input");
	},
	_add: function(o) {
		var _ph = o.getAttribute("placeholder") || "";
		if(_ph == "" || o.getAttribute("noplaceholder")) {
			return;
		}
		var _holder = document.createElement("div");
		_holder.className = "form_placeholder";
		_holder.innerHTML = _ph;
		o.parentNode.parentNode.insertBefore(_holder, o.parentNode);
		o.parentNode.style.marginTop = "0";
	},
	_init: function(formId) {
		if(_placeholder._support()) {
			return;
		}
		var _input = $("#" + formId + " input");
		for(var i = 0, _len = _input.length; i < _len; i++) {
			_placeholder._add(_input[i]);
		}
		var _textarea = $("#" + formId + " textarea");
		for(var i = 0, _len = _textarea.length; i < _len; i++) {
			_placeholder._add(_textarea[i]);
		}
	}
};
//全站分享
var gotoShareNew = {
	qzone: function() { //QQ空间
		var p = {
			url: dataForShare.url,
			desc: dataForShare.description,
			summary: "",
			title: dataForShare.title,
			site: "",
			pics: dataForShare.share_big_img == "" ? dataForShare.qq_icon : "" + dataForShare.share_big_img,
			style: '201',
			width: 25,
			height: 25
		};
		var s = [];
		for(var i in p) {
			console.log(i + '---' + p[i]);
			s.push(i + '=' + encodeURIComponent(p[i] || ''));
		}
		var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&');
		window.open(url);
		//dataForShareCallback("qzone");
		return false;
	},
	sina: function() { //新浪微博
		var param = {
			url: dataForShare.url,
			title: dataForShare.title,
			searchPic: true,
			pic: dataForShare.share_big_img == "" ? dataForShare.weibo_icon : "" + dataForShare.share_big_img,
			language: 'zh_cn'
		};
		var temp = "http://service.weibo.com/share/share.php?";
		for(var p in param) {
			temp += (p + '=' + encodeURIComponent(param[p] || '') + "&");
		}
		window.open(temp);
		//dataForShareCallback("weibo");
		return false;
	}
};
var _popUp = {
		_center: function() {
			var _left = _._zero(_._client().bw - $("#pc_inner").outerWidth()) / 2 + "px";
			$("#pc_inner").css({
				"top": "50%",
				"left": _left
			});
		},
		_show: function(text, fun) {
			$("#pc_inner i").html(text);
			_popUp._center();
			$("#pc_inner").fadeIn();
			$("#pc_inner").bind("resize", _popUp._center);
			setTimeout(function() {
				_popUp._hide(fun);
			}, 2 * 1000);
		},
		_hide: function(fun) {
			$("#pc_inner").fadeOut();
			$("#pc_inner").unbind("resize");
			if(fun) {
				(fun)();
			}
		}
	};




//返回顶部
$(window).scroll(function(event) {
	$(window).scrollTop() > $(window).height() ? $(".party_scroollTop").show() : $(".party_scroollTop ").hide();
});
_scroollTop = {
	_top: function(id, delay, move) {
		var scroll_offset = $(id).offset();
		null != scroll_offset && setTimeout(function() {
			var scroll_offset = $(id).offset();
			$("body,html").animate({
				scrollTop: 0
			}, move)
		}, delay)
	}
}
_scroollComment = {
		_top: function(id, delay, move) {
			var $articleHeight = $('.article-box').height() - 100;
			var scroll_offset = $(id).offset();
			null != scroll_offset && setTimeout(function() {
				var scroll_offset = $(id).offset();
				$("body,html").animate({
					scrollTop: $articleHeight
				}, move)
			}, delay)
		}
	}
