$(function(){
	var ua = navigator.userAgent.toLowerCase();
	window.iswx = false;
	if (ua.indexOf('micromessenger')>-1) {
		window.iswx = true;
	} 

	//(支持“←、→”按键翻页) 
	$(document).on("keydown", function(e){
		var theEvent = e;     
		var code = theEvent.keyCode || theEvent.which;    
		if (code == 37 && $('#artCon_prev').attr('href') != undefined) { //左箭头按键
			window.location = $('#artCon_prev').attr('href');
		}
		if (code == 39 && $('#artCon_next').attr('href') != undefined) { //右箭头按键
			window.location = $('#artCon_next').attr('href');
		} else {
			showTip();
		}
	});

	//文章正文修正 
	$(".article-content p").each(function(){
		var p = $(this);
		if (p.text().indexOf("　　")==0){
			p.css("text-indent", "2em");
		}
		var html = p.html();
		while (html.indexOf("&nbsp;")==0){
			html = html.replace("&nbsp;", "");
		}
		while (html.indexOf("　")==0){
			html = html.replace("　", "");
		}
		p.html($.trim(html));

		//修正居中 
		var align =  p.attr("align") || p.css("text-align");

		if ( align=="center") {
			p.css("cssText", "text-indent:0 !important; text-align: center; ");
			var img = p.find("img");
			var width = img.width();
			img.css("cssText", "margin-left:0 !important;");
			//if (width>0) img.css("width", width);
			p.find("iframe").css("cssText", "margin-left:0 !important;");
		}
		
		//修正颜色 
		p.find("span, font").each(function(){
			var span = $(this);
			var color = span.attr("color") || span.css("color") ;
			color = color.toLowerCase();
			var a = span;
			if ( color == "rgb(0, 0, 255)" || color == "blue" ) {
				span.css("color", "#04d");
			}
			if ( color == "rgb(255, 0, 0)" || color == "red") {
				span.css("color", "#c00");
			}
		});
		
		
		//修正多余的字号 
		//  if(md && md.mobile()){
		if(window.screen.width<=800){
			console.log("clear font-size");
			p.find("span").each(function(){
				var span = $(this);
				span.css("font-size", "");
				span.css("word-break", "break-word");
			});
			
			p.css("line-height", "");
		}

		//处理全红
		p.find("font[color=#ff0000]").each(function(){
			var font = $(this);
			font.removeAttr("color");
		});

		//修正图片 
		p.find("img").each(function(){
			var img = $(this);
			if (Math.ceil(img.width())>838) {
				img.css("width", "838");
			}
			img.css("height", "auto");
		});
	});
	
	//iframe播放全屏 
	$(".article-content iframe").each(function(){
		var iframe = $(this);
		var new_iframe = iframe.clone();
		new_iframe.attr("webkitallowfullscreen", "true");
		new_iframe.attr("mozallowfullscreen", "true");
		new_iframe.attr("allowfullscreen", "true");
		new_iframe.attr("allowtransparency", "true");
		if (new_iframe.attr("height")==408) {
			new_iframe.attr("height", "450");
		}
		new_iframe = $(new_iframe[0].outerHTML.replace(/=408/gi, "=450"));
		iframe.replaceWith(new_iframe);
		new_iframe.parents("p:first").css("text-align", "center");
		console && console.log("renew iframe...");
	});


	//显示正文 
	$(".article-content, .article").show().css("visibility", "visible").css("opacity", "1");

	//手机跳转 
	$.get("https://www.gxnews.com.cn/js/mobile-detect.min.js", function(js){
		eval(js);
		$.get("https://www.gxnews.com.cn/js/jquery.cookie.js", function(js){
			eval(js);
			var md = new MobileDetect(window.navigator.userAgent);
			console && console.log(md);
			var pcview = document.location.href.indexOf("pcview")>-1;
			var hasSetPC = $.cookie("pcview");
			if (pcview) {
				var cookieName = 'pcview';
				var cookieValue = '1';
				var myDate = new Date();
				myDate.setDate(myDate.getDate() + 1);
				var domain = window.document.domain;
				document.cookie = cookieName +"=" + cookieValue + ";expires=" + myDate + ";domain="+domain+";path=/";
			} else if (!hasSetPC && md.mobile()){
				//window.location.href="https://3g.gxnews.com.cn/formwww.html?ref="+encodeURIComponent(window.document.location.href);
			}
		});
	});

	//分享  
	var share_vars = {
		title: $.trim($("h1:first").text()),
		link: document.location.href,
		imgUrl: $.trim($("meta[name=thumbnail]").attr("content")),
		desc: $.trim($("meta[name=description]").attr("content"))
	};
	if (!share_vars.imgUrl) {
		var img = $(".article-content img:first, .bigPic img:first");
		if (img.length) {
			share_vars.imgUrl = img.attr("src").replace("/uploadpic/", "/littlepic/"); 
		}
	}
	if (!share_vars.imgUrl) {
		share_vars.imgUrl = "http://cdn.gxxw.com/app/gxnews_logo.png"; 
	}
	if (!share_vars.desc) {
		share_vars.desc = share_vars.title;
	}
	window._bd_share_config = {
		"common":{
			"bdSnsKey":{},
			"bdText": share_vars.title,
			"bdMini":"2",
			"bdMiniList":false,
			"bdPic": share_vars.imgUrl,
			"bdStyle":"0",
			"bdSize":"32"
		},
		"share":{}
	};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://cdn.gxxw.com/libs/baiduShare/static/api/js/share.js?v=89860593.js&cdnversion='+~(-new Date()/36e5)];

	//分享微信 
	if (window.iswx) {
		$.get("https://cdn.gxxw.com/libs/weixin/wx.js", function(js){
			eval(js);
			wx.wait(function(){
				wx.onMenuShareTimeline(share_vars);
				wx.onMenuShareAppMessage(share_vars);
				wx.onMenuShareQQ(share_vars);
			});
		});
	}
});



	function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

	function showTip(){
		$("#div_play_end").show("slow");
	}
