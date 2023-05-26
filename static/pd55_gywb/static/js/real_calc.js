var has_runed = has_runed;//当前脚本是否已经执行过
if(!has_runed){
	has_runed = true;
	/* 定义并获取全局变量，是否启用click-log begin */
	var click_log_enabled = true;
	var calc_js = false;
	var f4g = false;
	var post_host = "http://cmscalc.gywb.cn:6060/real_calc_w/";
	var spare_host = "http://cmscalc.gywb.cn:6060/real_calc_w/images/s.png?";
	var scripts = document.getElementsByTagName('script');
	var cms = '';
	//取得agent
	var agent = navigator.userAgent;
	for (var i = 0; (!calc_js || !f4g) && i < scripts.length; i++) {
		var url = scripts[i].src;
		if(!calc_js){
			//取js地址后面的参数
			if (url.indexOf('real_calc.js') >= 0) {
				url = url.substring(url.indexOf('?') + 1);
				var params = url.split('&');
				for (var j = 0; j < params.length; j++) {
					var entry = params[j].split('=');
					if ('click' == entry[0]) {
						click_log_enabled = ('true' == entry[1]);
						calc_js = true;
					}else if('cms' == entry[0]){
						cms = entry[1];
					}
				}
			}
		}
		if(!f4g){
			if(url.indexOf('online_calc.js')>-1 && url.indexOf('client=4g')>-1){
				f4g = true;
			}
		}
	}
	/* 定义并获取全局变量，是否启用click-log begin */
	
	/* 读写cookie函数定义 begin */
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	function setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	}
	/* 读写cookie函数定义 end */
	
	/* 获取鼠标单击信息功能 begin */
	function mousePosition(ev) {
		if (ev.pageX || ev.pageY) {
			return {
				x : ev.pageX,
				y : ev.pageY
			};
		}
		return {
			x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
			y : ev.clientY + document.body.scrollTop - document.body.clientTop
		};
	}
	function mClick(ev) {
		if (click_log_enabled) {
			ev = ev || window.event;
			var mousePos = mousePosition(ev);
			var log_params = "clickX=" + mousePos.x + "&clickY=" + mousePos.y + "&screenW="
					+ screen.width + "&screenH=" + screen.height + "&url="
					+ escape(escape(window.location.href)) + "&clientWidth=" + document.body.clientWidth + "&clientHeight=" + document.body.clientHeight
					+ "&referer=" + escape(escape(document.referrer)) + "&agentStr=" + agent;
			//判断是不加上cms参数
			if(''!=cms){
				log_params += '&cms='+cms;
			}
			var target = ev.target || ev.srcElement;
			if (target.tagName == 'A' || target.tagName == 'a') {
				log_params += ("&clickUrl=" + escape(escape(target.attributes.href.value)));
			}
			if(f4g){
				log_params += '&client=4g';
			}
			var script_node = document.createElement('script');
			script_node.src = post_host + "ckLog?" + log_params;
			var head_node = document.getElementsByTagName('head')[0];
			head_node.appendChild(script_node);
			new Image().src = spare_host + log_params + "&time=" + new Date().getTime();
		}
	}
	/* 获取鼠标单击信息功能 end */
	
	/* 事件绑定 begin */
	if (window.addEventListener) {
		document.addEventListener("click", mClick, false);
	} else if (window.attachEvent) {
		document.attachEvent("onclick", mClick);
	}
	/* 事件绑定 end */
	
	/* 页面加载需要处理的信息 begin */
	var is_wx = agent.indexOf("MicroMessenger") > 0, url = escape(escape(window.location.href)), javaEnabled = navigator.javaEnabled(), cookieEnabled = navigator.cookieEnabled;// 仅ie下有效
	var post_params = "agentStr=" + agent
			+ "&referer=" + escape(escape(document.referrer)) + "&isWx=" + is_wx
			+ "&url=" + url + "&javaEnabled=" + javaEnabled + "&screenRes="
			+ (screen.width + "*" + screen.height) + "&cookieEnabled="
			+ cookieEnabled + "&platform=" + navigator.platform;
	if (cookieEnabled) {
		var uid = getCookie("uid");
		if (uid) {
			post_params += ("&uid=" + uid + "&accessType=old");
		} else {
			uid = new Date().getTime() + "_" + ((Math.random() + "").substring(2, 12));
			setCookie("uid", uid, 30000);
			post_params += ("&uid=" + uid + "&accessType=new");
		}
	}
	if(f4g){
		post_params += '&client=4g';
	}
	//判断是不加上cms参数
	if(''!=cms){
		post_params += '&cms='+cms;
	}
	document.write("<script src='" + post_host + "rcw?" + post_params + "'></script>");
	new Image().src = spare_host + post_params + "&time=" + new Date().getTime();
	/* 页面加载需要处理的信息 end */
}<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2018-12-29 16:12:09" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->