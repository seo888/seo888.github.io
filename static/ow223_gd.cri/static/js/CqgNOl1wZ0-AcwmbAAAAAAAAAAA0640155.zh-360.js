// JavaScript Document
var engines = new Array("站内搜索","百度", "中国搜索", "必应");
var searchTimer;
function loadjs(url, callback) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = script.onerror = function () {
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		script.onload = script.onreadystatechange = script.onerror = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		callback();
	}
	script.src = url;
	try {
		head.appendChild(script);
	} catch (exp) { }
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}

addLoadEvent(function () {
	if (typeof (jQuery) == "undefined")
		loadjs("/include/jquery-1.7.1.min.js", head13init);
	else
		head13init();
});

function head13init() {
	for (var i = 0; i < engines.length; i++) {
		$("#engine").append('<a href="#' + i + '">' + engines[i] + '</a>');
	}
	$("#engine a").click(function (e) {
		$("div#selectId").attr("value", $(this).index());
		$(".head13_search2").text(engines[$(this).index()]);
		$("#engine").fadeOut("fast");
		$("#q1").trigger("focus");
		return false;
	});
	$(".head13_search2").click(function () {

		$('.search-select-box').css('overflow','visible');
		var ie = !!window.ActiveXObject;
		var ie6 = ie && !window.XMLHttpRequest;
		if (ie6) {

			if ($("#engine").css("display") == "none") {
				$("#engine").css({ 'left': '3px', 'top': '45px' }).slideDown("fast")
				
				// $("#engine").css({left:$(this).offset().left,top:$(this).offset().top-35}).slideDown("fast");
			}
			else
				$("#engine").slideUp("fast");

		}
		else {

			if ($("#engine").css("display") == "none") {
				$("#engine").css({ 'left': '3px', 'top': '45px' }).slideDown("fast")
				// $("#engine").css({left:$(this).offset().left,top:$(this).offset().top+15}).slideDown("fast");
			}
			else
				$("#engine").slideUp("fast");
		}
	});
	$("#head13login").click(function (e) {
		if ($("#headlogin").css("display") == "none") {
			$("#headlogin").css({ left: $(this).offset().left - 170, top: $(this).offset().top + 20 }).slideDown("fast");
			$("input[name='username']").trigger("focus");
		}
		else
			$("#headlogin").slideUp("fast");
	});
	$(".headlogin_close").click(function (e) {
		$("#headlogin").slideUp("fast");
	});
	$(document).click(function (e) {
        e.stopPropagation();
		if ($(e.target).hasClass("head13_search2")) {
			return false;
		}
		$("#engine").css("display") == "block" && $("#engine").slideUp("fast");
	})
}

function loginsub(f) {
	$("#headlogin").fadeOut("fast");
	document.charset = 'utf-8';
	f.submit();
	document.charset = 'gb2312';
	return false;
}
