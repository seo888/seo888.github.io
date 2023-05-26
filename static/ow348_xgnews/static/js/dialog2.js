window.Kdialog = function(o) {
	var option = o || {};
	var self = this;
	self.ver = 1.10
	var container,overlay,panel = null;
	var isIE6 = (/opera/.test(navigator.userAgent.toLowerCase()) ? 0 : parseInt((/.+msie[\/: ]([\d.]+)/.exec(navigator.userAgent.toLowerCase()) || {1:0})[1]) == 6);
	var isCenter = false;
	var winResizeBackup;
	var divMaker = function(attribute, style, parentObj) {
		attribute = attribute || {};
		style = style || {};
		var obj = document.createElement('div');
		for (var key in attribute) {
			if (key == 'class') {
				obj.setAttribute('class', attribute[key]);
				obj.setAttribute('className', attribute[key]);	// IE
			} else {
				obj.setAttribute(key, attribute[key]);
			}
		}
		for (var key in style) {
			obj.style[key] = style[key];
		}
		if (!parentObj) {
			parentObj = document.body;
		}
		parentObj.appendChild(obj);
		return obj;
	}
	var getWidth	= function() {
		var width	= window.innerWidth;
		if (width == undefined) { // IE
			width	= document.documentElement.clientWidth;
		}
		return width;
	}
	var getHeight = function() {
		var height	= window.innerHeight;
		if (height == undefined) { //IE
			height	= document.documentElement.clientHeight;
			height	= ((window.screen.height - 100) < height) ? window.screen.height - 100 : height;
		}
		return height;
	}
	var getWebHeight = function() {
		return Math.max(
			document.documentElement["clientHeight"],
			document.body["scrollHeight"], document.documentElement["scrollHeight"],
			document.body["offsetHeight"], document.documentElement["offsetHeight"]
		);
	}
	var bind = function bind(obj, action, func) {
		if (window.addEventListener) {
			obj.addEventListener( action, function(event) {
				func(obj, event);
			}, false);
		} else if (window.attachEvent) { //IE
			obj.attachEvent('on' +action, function(event) {
				func(obj, event);
			});
		}
	}
	var unbind = function(obj, action, func) {
		if (window.removeEventListener) {
			obj.removeEventListener(action, func , false);
		} else if (window.detachEvent) { //IE
			obj.detachEvent(action, func);
		}
	}
	self.isOpen = false;
	self.miniWin = false;
	self.open = function(o) {
		var left, top, close, shadow;
		if (typeof (o) == 'object') {
			for (var i in o) {
				option[i] = o[i];
			}
		}
		if (self.isOpen) return;
		self.isOpen = true;
		isCenter = (!option.top && !option.left);
		for(var i = ['width','height','left','top'], item; item = i.pop(); ) {
			option[item] = parseInt(option[item]);
		}
		option.width	= (option.width + 16) || 400;
		option.height	= (option.height + 16) || (option.confirm ? 180 : 280);
		option.title	= option.title || '';
		left = option.left || (getWidth() - option.width) / 2;
		if (left < 0) left = 0;
		left += 'px';
		top = option.top || (getHeight() - option.height) / 2;
		if (top < 0) top = 0;
		if (isIE6) {
			top += document.documentElement.scrollTop;
		}
		top += 'px';
		if (option.hasOverlay) {
			overlay = divMaker({'class':'kdialog-overlay'}, {'height':'998%', 'position':'fixed'});
			bind(overlay, 'click', function () {
				self.close();
			});
		}
		container = divMaker({'class':'kdialog-container'}, {'width':(option.width+'px'), 'height':(option.height+'px'), 'left':left, 'top':top});
		shadow	= divMaker({'class':'kdialog-shadow'},{},container);
		panel	= divMaker({'class':'kdialog-panel'}, {'width':(option.width-16+'px'), 'height':(option.height-16+'px'), 'left':'8px', 'top':'8px'}, container);
		if (option.hasCloseIco) {
			close	= divMaker({'class':'kdialog-close'},{},container);
			bind(close, 'click', self.close);
		}
		if (option.url) {
			var ifm	= document.createElement('iframe');
			ifm.src	= option.url;
			ifm.style.width		= '100%';
			ifm.style.height	= '100%';
			ifm.frameBorder		= 0;
			panel.appendChild(ifm);
		} else if (option.html) {
			// 特殊处理script标签
			var s = new Array();
			option.html = option.html.replace(/<script[^>]+>([\s\S]+?)<\/script>/ig,function($1,$2){
				s.push($2);
				return '';
			});
			panel.innerHTML = option.html;
			for (var i=0,l=s.length; i<l; i++) {
				window[ "eval" ].call( window, s[i] );
			}
		} else if (typeof(option.confirm) == 'function') {
			var infoPanel = divMaker({'class':'kdialog-confirm-panel'}, {}, panel);
			divMaker({'class':'kdialog-info-ico'}, {'marginRight':'12px'}, infoPanel);
			var infoDiv = divMaker({'class':'kdialog-confirm-info'}, {'display':'inline-block'}, infoPanel);
			infoDiv.innerHTML = option.text || '';
			var confirmDiv = divMaker({'class':'kdialog-confirm-select'}, {}, panel);
			var okBtn = divMaker({'class':'kdialog-btn'}, {'margin':'0 6px'}, confirmDiv);
			okBtn.innerHTML = '确定';
			var canelBtn = divMaker({'class':'kdialog-btn'}, {'margin':'0 6px'}, confirmDiv);
			canelBtn.innerHTML = '取消';
			bind(okBtn, 'click',  option.confirm);
			bind(okBtn, 'click',  self.close);
			bind(canelBtn, 'click', self.close);
		} else if(option.text) {
			panel.innerHTML = '<p style="line-height: '+(option.height-16)+'px; text-align:center;">'+option.text+'</p>';
		}
		if (parseInt(option.closeDelay)) {
			setTimeout(self.close, option.closeDelay);
		}
		winResizeBackup = window.onresize;
		if (isCenter) {
			window.onresize = function() {
				if (typeof (winResizeBackup) == 'function') winResizeBackup();
				var left = (getWidth() - option.width) / 2;
				if (left < 0) left = 0;
				left += 'px';
				var top = (getHeight() - option.height) / 2;
				if (top < 0) top = 0;
				if (isIE6) {
					top += document.documentElement.scrollTop;
				}
				top += 'px';
				container.style.top = top;
				container.style.left = left;
			}
		}
	} 
	self.close = function() {
		if (!self.isOpen) return;
		self.isOpen = false;
		if (overlay) {
			overlay.parentNode.removeChild(overlay);
		}
		if (container) {
			container.parentNode.removeChild(container);
		}
		window.onresize = winResizeBackup;
	}
	self.resize = function(newWidth, newHeight) {
		if (newWidth && newWidth > 0) {
			container.style.width = newWidth + 16 + 'px';
			panel.style.width = newWidth + 'px';
		}
		if (newHeight && newHeight > 0) {
			container.style.height = newHeight + 16 + 'px';
			panel.style.height = newHeight + 'px';
		}
	}
}