var EsdToolbarInit={};

EsdToolbarInit.path = "https://slwza.qianlong.com/slwza/toolbarV6/";
EsdToolbarInit.toolbarOpenStatus = null;
EsdToolbarInit.cookieDoamin = ";domain=.qianlong.com";

try{
	var esdtemp = document.createElement("style");
	esdtemp.setAttribute("type", "text/css");
	esdtemp.id="esdToolsStyle";
	esdtemp.textContent=".esd-tools {background: transparent;font-size:16px;color: #000000;left: 0;padding: 10px;position: absolute;top: -104.2rem;-webkit-transition: all 0.2s ease-in-out;transition: all 0.2s ease-in-out;z-index: 7001;}.esd-tools:focus {background: white;left: 0;outline: 0;position: absolute;top: 0;-webkit-transition: all 0.2s ease-in-out;transition: all 0.2s ease-in-out;}"
	document.getElementsByTagName("head")[0].appendChild(esdtemp);
	
	var esdTipLink1 = document.createElement("a");
	esdTipLink1.setAttribute("href","javascript:void(0);");
	esdTipLink1.setAttribute("aria-label","按回车键在新窗口打开无障碍说明页面,按Ctrl加波浪键打开导盲模式。");
	esdTipLink1.appendChild(document.createTextNode("按回车键在新窗口打开无障碍说明页面,按Ctrl+~键打开导盲模式。"));
	esdTipLink1.tabIndex="7";
	esdTipLink1.id="esdTipLink1";
	esdTipLink1.className = "esd-tools";
	document.getElementsByTagName("BODY")[0].appendChild(esdTipLink1);
	esdTipLink1.onclick = function(){
		window.open(EsdToolbarInit.path+"help.html","_blank");
	}
}catch(e){
	//console.log(e);
}

EsdToolbarInit.loadScript = function(func){
	var esd_jquery_js = document.createElement('script'); 
	esd_jquery_js.setAttribute('type', 'text/javascript'); 
	esd_jquery_js.setAttribute('src', EsdToolbarInit.path+'jquery.js'); 
	esd_jquery_js.setAttribute('charset', 'utf-8'); 
	esd_jquery_js.onload = function(){
		var esd_base64_js = document.createElement('script'); 
		esd_base64_js.setAttribute('type', 'text/javascript'); 
		esd_base64_js.setAttribute('src', EsdToolbarInit.path+'base64.js'); 
		esd_base64_js.setAttribute('charset', 'utf-8'); 
		esd_base64_js.onload = function(){
			var esd_soundmanager2_js = document.createElement('script'); 
			esd_soundmanager2_js.setAttribute('type', 'text/javascript'); 
			esd_soundmanager2_js.setAttribute('src', EsdToolbarInit.path+'soundmanager2.js'); 
			esd_soundmanager2_js.setAttribute('charset', 'utf-8'); 
			esd_soundmanager2_js.onload = function(){
				var esd_pinyin_js = document.createElement('script'); 
				esd_pinyin_js.setAttribute('type', 'text/javascript'); 
				esd_pinyin_js.setAttribute('src', EsdToolbarInit.path+'pinyin.js'); 
				esd_pinyin_js.setAttribute('charset', 'utf-8'); 
				esd_pinyin_js.onload = function(){
					var esd_handleInnerIframe_js = document.createElement('script'); 
					esd_handleInnerIframe_js.setAttribute('type', 'text/javascript'); 
					esd_handleInnerIframe_js.setAttribute('src', EsdToolbarInit.path+'handleInnerIframe.js'); 
					esd_handleInnerIframe_js.setAttribute('charset', 'utf-8'); 
					esd_handleInnerIframe_js.onload = function(){
						var esd_toolbar_js = document.createElement('script'); 
						esd_toolbar_js.setAttribute('type', 'text/javascript'); 
						esd_toolbar_js.setAttribute('src', EsdToolbarInit.path+'toolbar.js'); 
						esd_toolbar_js.setAttribute('charset', 'utf-8'); 
						esd_toolbar_js.setAttribute('id', 'ESDWebAppToolbar'); 
						document.head.appendChild(esd_toolbar_js);
						esd_toolbar_js.onload = function(){
							if(func!=null){
								func();
							}
						};
					};	
					document.head.appendChild(esd_handleInnerIframe_js);	
				};
				document.head.appendChild(esd_pinyin_js);	
			};
			document.head.appendChild(esd_soundmanager2_js);	
		};	
		document.head.appendChild(esd_base64_js);
	};	
	document.head.appendChild(esd_jquery_js);
};

EsdToolbarInit.getCookie = function(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) 
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};
EsdToolbarInit.setCookie = function(name, value, days){
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }
	document.cookie = name + "=" + value + "; path=/"+EsdToolbarInit.cookieDoamin;
};
EsdToolbarInit.esdTabIndex = 0;
EsdToolbarInit.init = function(){
	if(window.esdToolbarInitIsDone){
		return;
	}
	EsdToolbarInit.insertDoms();
	EsdToolbarInit.toolbarOpenStatus = EsdToolbarInit.getCookie("wzaIsOn");
	var readScreenStatus = EsdToolbarInit.getCookie("readScreen");
	if(EsdToolbarInit.toolbarOpenStatus=="true"||EsdToolbarInit.toolbarOpenStatus==true){
		if(typeof(jQuery)=='function'){
			if(readScreenStatus=="true"||readScreenStatus==true){
				jQuery("#toolbar").hide();
				jQuery("#toolbarPage2").show();
				jQuery("#toolbarHtml").show("fast",function(){
					jQuery("body").css("padding-top", "98px");
				});
			}else{
				jQuery("#toolbar").show();
				jQuery("#toolbarPage2").hide();
				jQuery("#toolbarHtml").show("fast",function(){
					jQuery("body").css("padding-top", "98px");
				});
			}
		}else{
			if(readScreenStatus=="true"||readScreenStatus==true){
				document.getElementById("toolbar").style.display = "none";
				document.getElementById("toolbarPage2").style.display = "block";
				document.body.style.paddingTop = "98px";
				document.getElementById("toolbarHtml").style.display = "block";
			}else{
				document.getElementById("toolbar").style.display = "block";
				document.getElementById("toolbarPage2").style.display = "none";
				document.body.style.paddingTop = "98px";
				document.getElementById("toolbarHtml").style.display = "block";
			}
		}
		EsdToolbarInit.loadScript(null);
	}else{
		var esdTempArr = document.getElementsByClassName("toolbarSwitch");
		for(var eti = 0;eti<esdTempArr.length;eti++){
			esdTempArr[eti].onclick=function(){
				if(typeof(jQuery)=='function'){
					if(readScreenStatus=="true"||readScreenStatus==true){
						jQuery("#toolbar").hide();
						jQuery("#toolbarPage2").show();
						jQuery("#toolbarHtml").show("fast",function(){
							jQuery("body").css("padding-top", "98px");
						});
					}else{
						jQuery("#toolbar").show();
						jQuery("#toolbarPage2").hide();
						jQuery("#toolbarHtml").show("fast",function(){
							jQuery("body").css("padding-top", "98px");
						});
					}
				}else{
					if(readScreenStatus=="true"||readScreenStatus==true){
						document.getElementById("toolbar").style.display = "none";
						document.getElementById("toolbarPage2").style.display = "block";
						document.body.style.paddingTop = "98px";
						document.getElementById("toolbarHtml").style.display = "block";
					}else{
						document.getElementById("toolbar").style.display = "block";
						document.getElementById("toolbarPage2").style.display = "none";
						document.body.style.paddingTop = "98px";
						document.getElementById("toolbarHtml").style.display = "block";
					}
				}
				EsdToolbarInit.loadScript(null);
				EsdToolbarInit.setCookie("wzaIsOn", "true", 10);
				for(var etj = 0;etj<esdTempArr.length;etj++){
					esdTempArr[etj].onclick=null;
					esdTempArr[etj].onkeydown=null
				}
			}
			esdTempArr[eti].onkeydown=function(e){
				if (e.keyCode == 13) {
					EsdToolbarInit.setCookie("wzaIsOn", "true", 10);
					EsdToolbarInit.setCookie("readScreen", true, 10);
					EsdToolbarInit.setCookie("speakVolume", 0, 10);
					if(typeof(jQuery)=='function'){
						jQuery("#toolbar").hide();
						jQuery("#toolbarPage2").show();
						jQuery("#toolbarHtml").show("fast",function(){
							jQuery("body").css("padding-top", "98px");
						});
					}else{
						document.getElementById("toolbar").style.display = "none";
						document.getElementById("toolbarPage2").style.display = "block";
						document.body.style.paddingTop = "98px";
						document.getElementById("toolbarHtml").style.display = "block";
					}
					EsdToolbarInit.loadScript(function(){
						//EsdToolbar.readScreen.init();
						jq_t("#toolbar").hide();
						jq_t("#toolbarHtml").show("fast",function(){
							jq_t("#toolbarPage2").show();
							if(EsdToolbar.statusmagnifier == "on"){
								EsdToolbar.magnifier.toolbarMagnifier();
							}
						});
						jq_t("body").css("padding-top", "98px");
						EsdToolbar.rebuild();
						EsdToolbar.isOpen = true;
					});
					for(var etk = 0;etk<esdTempArr.length;etk++){
						esdTempArr[etk].onclick=null;
						esdTempArr[etk].onkeydown=null
					}
					return false;
				}
			}
		}
	}
	window.esdToolbarInitIsDone = true;
	document.onkeydown = function(e){
		if (e.ctrlKey) {
			if(typeof(EsdToolbar)=="undefined"){
				if (e.keyCode == 192) {  //ctrl+~
					if(navigator.userAgent.toLowerCase().indexOf("msie 8.0")>-1||navigator.userAgent.toLowerCase().indexOf("msie 7.0")>-1){
						alert("当前浏览器版本过低,辅助工具无法正常使用!\r\n请使用更高版本的浏览器!");
						return false;
					}
					if(document.getElementById("toolbarSwitch")!=null){
						document.getElementById("toolbarSwitch").onclick=null;
						document.getElementById("toolbarSwitch").onkeydown=null
					}
					EsdToolbarInit.setCookie("wzaIsOn", "true", 10);
					EsdToolbarInit.setCookie("readScreen", true, 10);
					EsdToolbarInit.setCookie("speakVolume", 0, 10);
					if(typeof(jQuery)=='function'){
						jQuery("#toolbar").hide();
						jQuery("#toolbarPage2").show();
						jQuery("#toolbarHtml").show("fast",function(){
							jQuery("body").css("padding-top", "98px");
						});
					}else{
						document.getElementById("toolbar").style.display = "none";
						document.getElementById("toolbarPage2").style.display = "block";
						document.body.style.paddingTop = "98px";
						document.getElementById("toolbarHtml").style.display = "block";
					}
					EsdToolbarInit.loadScript(function(){
						jq_t("#toolbar").hide();
						jq_t("#toolbarHtml").show("fast",function(){
							jq_t("#toolbarPage2").show();
						});
						jq_t("body").css("padding-top", "98px");
						EsdToolbar.rebuild();
						EsdToolbar.isOpen = true;
					});
				}
			}else if(EsdToolbar.isOpen==false){
				if (e.keyCode == 192) {  //ctrl+~
					EsdToolbar.openKeydown();
				}
			}
		}
	}
}


EsdToolbarInit.imgs={}; 
EsdToolbarInit.imgs.closed1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M28.44,31.62,16.13,20a1.8,1.8,0,0,1,0-2.63l.21-.2a2,2,0,0,1,2.77,0L31.41,28.8a1.77,1.77,0,0,1,0,2.62l-.21.2A2,2,0,0,1,28.44,31.62Z"/><path class="cls-1" d="M31.22,19.66,19.42,31.8a2,2,0,0,1-2.76.1l-.22-.19a1.78,1.78,0,0,1-.11-2.62L28.12,17a2,2,0,0,1,2.77-.11l.22.2A1.79,1.79,0,0,1,31.22,19.66Z"/></svg>';
EsdToolbarInit.imgs.color1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M35.83,23.79C34.59,26.29,32,28.85,29.69,29c-2.63.21-1.8-2.71-1.92-3.63s2.08-5,2.58-6.21c.27-.63.8-2.29,1.21-3.67a16.76,16.76,0,0,0-8.08-3.24c-3.5-.54-7.3-.41-10.59,2.29a15.54,15.54,0,0,0-5.2,13.91,17.2,17.2,0,0,0,.91,4.26c1,3,3,4.62,5.92,6,3.12,1.42,6.38-.54,9.17-3.24,1.73-1.67,2.45-2.67,4.7-3.17,1.73-.39,3.64-.43,5-1.64A7.9,7.9,0,0,0,35.83,23.79ZM14.31,19.41a2.84,2.84,0,1,1-2.83,2.83A2.83,2.83,0,0,1,14.31,19.41ZM13,32a2.83,2.83,0,1,1,2.83-2.83A2.83,2.83,0,0,1,13,32Zm5,5.42a2.84,2.84,0,1,1,2.83-2.83A2.83,2.83,0,0,1,18,37.37Zm1.87-16.5a2.67,2.67,0,1,1,2.67-2.67A2.66,2.66,0,0,1,19.89,20.87Z"/><path class="cls-1" d="M31.27,20.07l-2.58,6.09s.41,2.08,2.2,1,3.92-4.84,3.92-4.84S31.64,21.32,31.27,20.07Z"/><path class="cls-1" d="M32.44,16.12s-.71,2.12.45,2.95,3.67,1.71,4.92.67c-.46-.46-1-.17-2.17-.75S32.6,17.78,32.44,16.12Z"/><path class="cls-1" d="M33.27,14.87a5.3,5.3,0,0,1,2.87-3.71c2.42-1,2.42-1.59,2.42-1.59s.5.84.75,1.34,1.38,4,0,5.66a3.36,3.36,0,0,1-4.37.59C34,16.53,33.23,15.87,33.27,14.87Z"/></svg>';
EsdToolbarInit.imgs.continuous_stop1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M37.46,10.94a.28.28,0,0,1,.28.28V37.53a.29.29,0,0,1-.28.28H10.08a.29.29,0,0,1-.28-.28V11.22a.28.28,0,0,1,.28-.28H37.46m0-2H10.08A2.28,2.28,0,0,0,7.8,11.22V37.53a2.28,2.28,0,0,0,2.28,2.28H37.46a2.28,2.28,0,0,0,2.28-2.28V11.22a2.28,2.28,0,0,0-2.28-2.28Z"/><path class="cls-1" d="M20.83,34.12a.49.49,0,0,1-.48-.36.51.51,0,0,1,.35-.62c1.68-.46,4.29-1.71,4.32-2.42,0-.27-1.33-.73-1.88-.93-1.26-.45-2.57-.92-2.29-1.93.21-.75,1.2-1.19,2.34-1.69.66-.29,1.89-.84,1.89-1.17s-1.6-1.23-2.28-1.59c-1.29-.67-2.14-1.11-2-1.81s.8-.89,2.15-1.45c.69-.29,2.13-.89,2.22-1.22-.1-.46-2.21-1.77-4.52-2.79a.49.49,0,0,1-.25-.66.5.5,0,0,1,.66-.25c1.9.84,5.11,2.44,5.11,3.71,0,1-1.38,1.53-2.84,2.13a15.32,15.32,0,0,0-1.43.66,11.22,11.22,0,0,0,1.39.8c1.44.76,2.81,1.47,2.81,2.47s-1.2,1.52-2.48,2.08c-.64.28-1.7.75-1.78,1.05a7.49,7.49,0,0,0,1.66.72c1.27.45,2.59.92,2.54,1.92-.09,1.91-5,3.32-5.05,3.33A.34.34,0,0,1,20.83,34.12Z"/></svg>';
EsdToolbarInit.imgs.cursor1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M23.61,39.59a15,15,0,1,1,15-15A15,15,0,0,1,23.61,39.59Zm0-28a13,13,0,1,0,13,13A13,13,0,0,0,23.61,11.59Z"/><rect class="cls-1" x="4.77" y="23.37" width="11" height="2"/><rect class="cls-1" x="31.77" y="23.37" width="11" height="2"/><rect class="cls-1" x="18.27" y="36.87" width="11" height="2" transform="translate(-14.1 61.64) rotate(-90)"/><rect class="cls-1" x="18.27" y="9.87" width="11" height="2" transform="translate(12.9 34.64) rotate(-90)"/></svg>';
EsdToolbarInit.imgs.enlarge1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M20.68,34.25A12.82,12.82,0,1,1,33.49,21.43,12.83,12.83,0,0,1,20.68,34.25Zm0-23.63A10.82,10.82,0,1,0,31.49,21.43,10.83,10.83,0,0,0,20.68,10.62Z"/><rect class="cls-1" x="26.73" y="31.45" width="13.75" height="5.21" rx="1.52" ry="1.52" transform="translate(33.92 -13.79) rotate(45)"/><rect class="cls-1" x="15.8" y="20.68" width="10.75" height="1.88"/><rect class="cls-1" x="15.8" y="20.68" width="10.75" height="1.88" transform="translate(-0.45 42.8) rotate(-90)"/></svg>';
EsdToolbarInit.imgs.exit1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="cls-1" points="24.64 22.38 19.48 16.82 19.48 27.93 24.64 22.38"/><rect class="cls-1" x="9.3" y="20.75" width="10.78" height="3.09"/><path class="cls-1" d="M15.24,8.75v9.81h2V10.75h19v21h-19V26.06h-2v7.73h23v-25Z"/><polygon class="cls-1" points="36 9.37 26.58 14.45 26.58 39.99 38.12 33.79 37.62 9.45 36 9.37"/></svg>';
EsdToolbarInit.imgs.help1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M19,18.83s.13-6,5-6,5.63,4.75,3.67,7-6.92,5.42-6.92,8.67v2.58h5.13V28.71s-.38-1.5,3.08-4.09,5.46-5,5.46-7.66S33.46,8.87,24,8.87s-10.91,8-10.91,10Z"/><rect class="cls-1" x="20.96" y="33.91" width="5" height="5.96"/></svg>';
EsdToolbarInit.imgs.left_img2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><rect class="cls-1" x="12" y="37.31" width="23.13" height="3.07" rx="1.2" ry="1.2"/><path class="cls-1" d="M19.52,19.93a3.74,3.74,0,1,1-3.73-3.73A3.72,3.72,0,0,1,19.52,19.93Z"/><path class="cls-1" d="M37.45,8.43H9.66A4.38,4.38,0,0,0,5.29,12.8V29a4.39,4.39,0,0,0,4.37,4.38H37.45A4.4,4.4,0,0,0,41.83,29V12.8A4.39,4.39,0,0,0,37.45,8.43ZM26.12,14.8h5.43a1.06,1.06,0,0,1,0,2.12H26.12a1.06,1.06,0,1,1,0-2.12ZM23.3,27.11a1.53,1.53,0,0,1-1.08.46,1.56,1.56,0,0,1-1.09-.46l-2.37-2.37a5.6,5.6,0,0,1-3,.85,5.66,5.66,0,1,1,5.66-5.66,5.46,5.46,0,0,1-.62,2.55L23.3,25A1.52,1.52,0,0,1,23.3,27.11Zm12.63-.63H26.12a1.07,1.07,0,0,1,0-2.13h9.81a1.07,1.07,0,1,1,0,2.13Zm0-4.74H26.12a1.06,1.06,0,0,1,0-2.12h9.81a1.06,1.06,0,1,1,0,2.12Z"/></svg>';
EsdToolbarInit.imgs.left_img5 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M37.46,10.09a.26.26,0,0,1,.28.22V31.24a.26.26,0,0,1-.28.23H10.08a.26.26,0,0,1-.28-.23V10.31a.26.26,0,0,1,.28-.22H37.46m0-1.62H10.08A2.09,2.09,0,0,0,7.8,10.31V31.62a2.1,2.1,0,0,0,2.28,1.85H37.46a2.1,2.1,0,0,0,2.28-1.85V10.31a2.09,2.09,0,0,0-2.28-1.84Z"/><polygon class="cls-1" points="34.69 13.35 34.69 28.41 12.75 28.41 12.75 13.35 21.67 13.35 21.67 19.14 18.71 19.14 24.17 24.47 29.42 19.22 26.59 19.22 26.59 13.35 34.69 13.35"/><rect class="cls-1" x="16.67" y="37.59" width="15.06" height="2.69"/></svg>';
EsdToolbarInit.imgs.point3 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M37.46,10.94a.28.28,0,0,1,.28.28V37.53a.29.29,0,0,1-.28.28H10.08a.29.29,0,0,1-.28-.28V11.22a.28.28,0,0,1,.28-.28H37.46m0-2H10.08A2.28,2.28,0,0,0,7.8,11.22V37.53a2.28,2.28,0,0,0,2.28,2.28H37.46a2.28,2.28,0,0,0,2.28-2.28V11.22a2.28,2.28,0,0,0-2.28-2.28Z"/><polygon class="cls-1" points="23.15 19.84 18.05 24.22 18.05 26.81 22.24 23.5 22.24 33.84 24.33 33.84 24.33 23.4 28.18 26.97 28.18 23.87 23.15 19.84"/><rect class="cls-1" x="9.58" y="14.75" width="28.56" height="1.06"/></svg>';
EsdToolbarInit.imgs.reflash1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M23.4,18.34,26,8.22l-14.31.43,3.75,3.94S7,17.65,7.15,25.53s6,13.06,11.12,15c-4.12-4.88-13.12-16.13,0-25.25A22.85,22.85,0,0,0,23.4,18.34Z"/><path class="cls-1" d="M24.15,30.4,21.58,40.53l14.32-.44L31.83,36s8.55-7.21,8.57-12.81c0-7.88-6-13.07-11.13-15C33.4,13.09,41,20.84,28.17,33,25.9,31.42,24.15,30.4,24.15,30.4Z"/></svg>';
EsdToolbarInit.imgs.reflash2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M13.66,12.93l4.27,21a1.15,1.15,0,0,0,2.07.44L23.12,30,28,36.68a1.14,1.14,0,0,0,1.73.14l2.32-2.26a1.16,1.16,0,0,0,.1-1.53l-4.95-6.36,5.46-1.55A1.15,1.15,0,0,0,33,23L15.42,11.73A1.16,1.16,0,0,0,13.66,12.93Z"/></svg>';
EsdToolbarInit.imgs.screen1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M37.46,10.39a.28.28,0,0,1,.28.28V32.11a.29.29,0,0,1-.28.28H10.08a.29.29,0,0,1-.28-.28V10.67a.28.28,0,0,1,.28-.28H37.46m0-2H10.08A2.28,2.28,0,0,0,7.8,10.67V32.11a2.28,2.28,0,0,0,2.28,2.28H37.46a2.28,2.28,0,0,0,2.28-2.28V10.67a2.28,2.28,0,0,0-2.28-2.28Z"/><polygon class="cls-1" points="11.76 23.37 11.76 30.28 18.82 30.28 18.82 29.31 14.71 28.67 19.16 24.83 16.88 22.68 13.02 27.09 12.66 23.28 11.76 23.37"/><rect class="cls-1" x="16.8" y="37.33" width="14.97" height="3.03"/></svg>';
EsdToolbarInit.imgs.small1 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><rect class="cls-1" x="15.8" y="20.68" width="10.75" height="1.88"/><path class="cls-1" d="M20.68,34.25A12.82,12.82,0,1,1,33.49,21.43,12.83,12.83,0,0,1,20.68,34.25Zm0-23.63A10.82,10.82,0,1,0,31.49,21.43,10.83,10.83,0,0,0,20.68,10.62Z"/><rect class="cls-1" x="26.73" y="31.45" width="13.75" height="5.21" rx="1.52" ry="1.52" transform="translate(33.92 -13.79) rotate(45)"/></svg>';
EsdToolbarInit.imgs.sound_big = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;}</style><path class="st0" d="M16.2,6.2v17.5l-6.2-5H3.8v-7.5H10L16.2,6.2z"/><path class="st0" d="M16.2,17.5c1.9-1.2,1.9-3.8,0-5"/><path class="st0" d="M20,20c2.6-2.6,2.6-7.4,0-10 M22.5,23.8c5-5,5-12.5,0-17.5"/></svg>';
EsdToolbarInit.imgs.sound3 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;}</style><path class="st0" d="M21.5,12.5l5,5 M21.5,17.5l5-5"/><path class="st0" d="M16.2,6.2v17.5l-6.2-5H3.8v-7.5H10L16.2,6.2z"/><path class="st0" d="M16.2,17.5c1.9-1.2,1.9-3.8,0-5"/></svg>';
EsdToolbarInit.imgs.toOriginal = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M32.87,8.9H14.52a5.67,5.67,0,0,0-5.67,5.67v19.6a5.68,5.68,0,0,0,5.67,5.67H25.7v-2H14.52a3.68,3.68,0,0,1-3.67-3.67V14.57a3.68,3.68,0,0,1,3.67-3.67H32.87a3.68,3.68,0,0,1,3.67,3.67V29h2V14.57A5.68,5.68,0,0,0,32.87,8.9Z"/><path class="cls-1" d="M35.75,30.07l-2.93,2.86-2.61,2.41V30.07h5.54m2.94-1.2H29v9.22l4.62-4.28,5.06-4.94Z"/><rect class="cls-1" x="14.6" y="17.78" width="18" height="2"/><rect class="cls-1" x="14.6" y="23.75" width="18" height="2"/><rect class="cls-1" x="14.6" y="29.78" width="8.06" height="2"/></svg>';
EsdToolbarInit.imgs.vol_normal = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M39.54,29.83a16,16,0,0,0,1-5.46A16.64,16.64,0,0,0,23.72,7.87,16.64,16.64,0,0,0,7,24.37a16.64,16.64,0,0,0,16.77,16.5c6.49,0,14.08-3.63,16.87-8.94H37.65c-2.58,3.86-9,6.4-14,6.4a14.21,14.21,0,1,1,0-28.42A14.33,14.33,0,0,1,38.07,24.12a13.83,13.83,0,0,1-1.22,5.71Z"/><polygon class="cls-1" points="8.61 22.89 16.77 22.89 17.8 25.77 22.86 16.14 26.24 27.49 29.33 18.24 33.24 22.83 38.46 22.83 38.46 24.89 32.52 24.89 29.55 20.74 26.21 32.46 22.71 19.96 17.89 29.24 15.52 24.83 8.27 24.83 8.61 22.89"/></svg>';
EsdToolbarInit.imgs.vol_quick = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M39.54,29.83a16,16,0,0,0,1-5.46A16.64,16.64,0,0,0,23.72,7.87,16.64,16.64,0,0,0,7,24.37a16.64,16.64,0,0,0,16.77,16.5c6.49,0,14.08-3.63,16.87-8.94H37.65c-2.58,3.86-9,6.4-14,6.4a14.21,14.21,0,1,1,0-28.42A14.33,14.33,0,0,1,38.07,24.12a13.83,13.83,0,0,1-1.22,5.71Z"/><rect class="cls-1" x="22.96" y="13.78" width="1.97" height="19.94"/><rect class="cls-1" x="18.96" y="16.72" width="1.97" height="14.06"/><rect class="cls-1" x="14.99" y="20.72" width="1.97" height="7.03"/><rect class="cls-1" x="27.02" y="16.72" width="1.97" height="14.06"/><rect class="cls-1" x="30.99" y="20.72" width="1.97" height="7.03"/></svg>';
EsdToolbarInit.imgs.vol_slow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.54 48.75"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M39.54,29.83a16,16,0,0,0,1-5.46A16.64,16.64,0,0,0,23.72,7.87,16.64,16.64,0,0,0,7,24.37a16.64,16.64,0,0,0,16.77,16.5c6.49,0,14.08-3.63,16.87-8.94H37.65c-2.58,3.86-9,6.4-14,6.4a14.21,14.21,0,1,1,0-28.42A14.33,14.33,0,0,1,38.07,24.12a13.83,13.83,0,0,1-1.22,5.71Z"/><rect class="cls-1" x="15.83" y="20.89" width="1.94" height="6.97"/><rect class="cls-1" x="31.83" y="20.89" width="1.94" height="6.97"/><polygon class="cls-1" points="17.46 20.99 21.89 25.33 26.64 20.74 32.58 24.55 32.4 26.8 26.74 23.14 22.11 28.02 16.93 23.18 16.68 21.61 17.46 20.99"/></svg>'
EsdToolbarInit.imgs.pinned = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:5;}</style><path class="st0" d="M7.7,24.7h14.5H7.7z M19.1,14.9v5.4h-8.3v-5.4H5.6l9.3-9.8l9.3,9.8H19.1z"/></svg>';


EsdToolbarInit.toolbarHtmlStr = "";
EsdToolbarInit.toolbarHtmlStr+='<div id="toolbarHtml" style="display: none; z-index: 99999">';
EsdToolbarInit.toolbarHtmlStr+='	<div id="toolbar" class="clearfix">';
EsdToolbarInit.toolbarHtmlStr+='		<div id="canyou_toolbar_div">';
EsdToolbarInit.toolbarHtmlStr+='			<div class="cy_toolbar_bg_table">';
EsdToolbarInit.toolbarHtmlStr+='				<ul>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_refrash" class="li_1"><a href="javascript:void(0);" id="toolbar_refresh"  class="ul_li_a_1" title="重新设置Shift+1">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.reflash1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="重新设置Shift+1">重置</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_playSpeech" class="li_2"><a href="javascript:void(0);" id="toolbar_speakVolume"  class="ul_li_a_1" title="声音">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.sound_big;
EsdToolbarInit.toolbarHtmlStr+='					</a><span class="a_p_3 ul_li_a_1" href="javascript:void(0);" title="声音">声音</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_pointerRead" class="li_1"><a href="javascript:void(0);" id="toolbar_speakSpeed"  class="ul_li_a_1" title="语速">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.vol_normal;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="语速">语速</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_pointerRead" class="li_1"><a href="javascript:void(0);" id="toolbar_readChange"  class="ul_li_a_1" title="阅读方式">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.point3;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="阅读方式">阅读方式</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_color" class="li_2"><a href="javascript:void(0);" class="ul_li_a_1" title="切换配色Shift+5"  id="toolbar_colorChange">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.color1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="调整配色">配色</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_bigword" class="li_1"><a href="javascript:void(0);" id="toolbar_pageZoomIc"  class="ul_li_a_1" title="网页放大Shift+6">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.enlarge1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="网页放大Shift+6">放大</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_smallword" class="li_1"><a href="javascript:void(0);" id="toolbar_pageZoomDc"  class="ul_li_a_1" title="网页缩小Shift+7">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.small1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="网页缩小Shift+7">缩小</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_arrow" class="li_2">';
EsdToolbarInit.toolbarHtmlStr+='						<a href="javascript:void(0);" id="toolbar_refresh1" class="ul_li_a_1"  title="切换鼠标样式Shift+8" >';
EsdToolbarInit.toolbarHtmlStr+=							EsdToolbarInit.imgs.reflash2;
EsdToolbarInit.toolbarHtmlStr+='						</a>';
EsdToolbarInit.toolbarHtmlStr+='						<span class="exap ul_li_a_1" href="javascript:void(0);" title="大鼠标">大鼠标</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_ruler" class="li_1"><a href="javascript:void(0);" id="toolbar_guides"  class="ul_li_a_1" title="十字光标">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.cursor1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="十字光标">光标</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_displayScreen" class="li_2"><a href="javascript:void(0);" id="toolbar_magnifier"  class="ul_li_a_1" title="切换显示屏Shift+0">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.screen1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="a_p_2 ul_li_a_1" href="javascript:void(0);" title="显示屏">显示屏</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_help" class="li_1"><a href="'+EsdToolbarInit.path+'help.html" target="_blank" id="toolbar_help" class="ul_li_a_1" title="开启帮助Shift+问号键">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.help1
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="开启帮助Shift+问号键">帮助</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_pinned" class="li_1"><a href="javascript:void(0);" id="toolbar_pinned" class="ul_li_a_1" title="固定或者隐藏工具栏，请按 Shift+L">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.pinned;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="固定或者隐藏工具栏，请按 Shift+D">固定</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_more" class="li_1"><a href="https://www.yunmd.net/tools/shortcut/url?n=yunnan" target="_blank"  id="toolbar_more" class="ul_li_a_1" title="下载快捷方式 Shift+D">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.left_img5;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="下载快捷方式 Shift+D">快捷方式</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_move" class="li_1"><a href="javascript:void(0);" id="toNav" class="ul_li_a_1"  title="读屏专用：快捷键Shift+N，适用于使用读屏软件的用户，若无读屏软件可通过Shift+2开启声音获取语音提示">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.toOriginal;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="读屏专用：快捷键Shift+N，适用于使用读屏软件的用户，若无读屏软件可通过Shift+2开启声音获取语音提示">读屏专用</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="cy_close" class="li_1"><a href="javascript:void(0);" id="toolbar_exit" class="ul_li_a_1"  title="关闭辅助工具Shift+Q">';
EsdToolbarInit.toolbarHtmlStr+=						EsdToolbarInit.imgs.exit1;
EsdToolbarInit.toolbarHtmlStr+='					</a> <span class="exap ul_li_a_1" href="javascript:void(0);" title="关闭辅助工具Shift+Q">退出</span></li>';
EsdToolbarInit.toolbarHtmlStr+='					<li id="botn" style="clear:both;"></li>';
EsdToolbarInit.toolbarHtmlStr+='				</ul>';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='		</div>';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='	<div id="toolbarPage2" class="btn-hide" style="height: 98px;">';
EsdToolbarInit.toolbarHtmlStr+='		<div id="toolbarPage2content">';
EsdToolbarInit.toolbarHtmlStr+='		<!--  -->';
EsdToolbarInit.toolbarHtmlStr+='			<div id="transform_dp">';

EsdToolbarInit.toolbarHtmlStr+='				<div id="navNumDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">导航区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="navNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+1</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';
EsdToolbarInit.toolbarHtmlStr+='				<div id="infoWinDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">视窗区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="infoWinNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+2</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';
EsdToolbarInit.toolbarHtmlStr+='				<div id="interactionWinDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">交互区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="interactionWinNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+3</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';

EsdToolbarInit.toolbarHtmlStr+='				<div id="serviceWinDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">服务区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="serviceWinNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+4</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';
EsdToolbarInit.toolbarHtmlStr+='				<div id="listAreaWinDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">列表区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="listAreaWinNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+5</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';
EsdToolbarInit.toolbarHtmlStr+='				<div id="articleAreaWinDiv" class="toolbarTexts">';
EsdToolbarInit.toolbarHtmlStr+='					<span class="textSpan textShow">';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textShow"> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textStr textShow">正文区</span> ';
EsdToolbarInit.toolbarHtmlStr+='							<span class="textNum">(<span id="articleAreaWinNum" class="textNum">0</span>)</span>';
EsdToolbarInit.toolbarHtmlStr+='						</p>';
EsdToolbarInit.toolbarHtmlStr+='						<p class="textKey textShow">ALT+6</p>';
EsdToolbarInit.toolbarHtmlStr+='					</span>';
EsdToolbarInit.toolbarHtmlStr+='				</div>';



EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='			<!--  --> ';
EsdToolbarInit.toolbarHtmlStr+='		<div id="otherBtns">';
EsdToolbarInit.toolbarHtmlStr+='			<div class="readDiv" id="cy_playSpeech_2">';
EsdToolbarInit.toolbarHtmlStr+='				<a href="javascript:void(0);" id="toolbar_speakOnOff" title="声音开关"  >';
EsdToolbarInit.toolbarHtmlStr+=					EsdToolbarInit.imgs.sound_big;
EsdToolbarInit.toolbarHtmlStr+='				</a> ';
EsdToolbarInit.toolbarHtmlStr+='				<span class="read-span" title="语音">语音</span>';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='			';
EsdToolbarInit.toolbarHtmlStr+='			<div class="readDiv">';
EsdToolbarInit.toolbarHtmlStr+='				<a href="javascript:void(0);" id="toolbar_help_move" title="开启帮助Shift+问号键">';
EsdToolbarInit.toolbarHtmlStr+=					EsdToolbarInit.imgs.help1;
EsdToolbarInit.toolbarHtmlStr+='				</a> ';
EsdToolbarInit.toolbarHtmlStr+='				<span class="read-span" title="开启帮助Shift+问号键">帮助</span>';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='			<div class="readDiv">';
EsdToolbarInit.toolbarHtmlStr+='				<a href="javascript:void(0);" id="toolbar_magnifier_2" title="显示屏"  >';
EsdToolbarInit.toolbarHtmlStr+=					EsdToolbarInit.imgs.screen1;
EsdToolbarInit.toolbarHtmlStr+='				</a> ';
EsdToolbarInit.toolbarHtmlStr+='				<span class="read-span" title="显示屏">显示屏</span>	';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='			<div class="readDiv">';
EsdToolbarInit.toolbarHtmlStr+='				<a href="javascript:void(0);" id="toFirstPage" title="老人服务：快捷键Shift+N，适用于视力和文化认知底下的人群"  >';
EsdToolbarInit.toolbarHtmlStr+=					EsdToolbarInit.imgs.left_img2;
EsdToolbarInit.toolbarHtmlStr+='				</a> ';
EsdToolbarInit.toolbarHtmlStr+='				<span class="read-span" title="老人服务：快捷键Shift+N，适用于视力和文化认知底下的人群">老人服务</span>';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='			<div class="readDiv">';
EsdToolbarInit.toolbarHtmlStr+='				<a href="javascript:void(0);" id="toolbar_exit2" title="关闭辅助工具Shift+Q"  >';
EsdToolbarInit.toolbarHtmlStr+=					EsdToolbarInit.imgs.exit1;
EsdToolbarInit.toolbarHtmlStr+='				</a> ';
EsdToolbarInit.toolbarHtmlStr+='				<span class="read-span" title="关闭辅助工具Shift+Q">退出</span>';
EsdToolbarInit.toolbarHtmlStr+='			</div>';
EsdToolbarInit.toolbarHtmlStr+='		</div>';
EsdToolbarInit.toolbarHtmlStr+='		</div>';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='	<div id="toolbar_prompt" style="display: none;">';
EsdToolbarInit.toolbarHtmlStr+='		<span>请按F11切换全屏模式</span>';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='	<div id="zwlj_prompt" tabindex="-1" class="ESDAssetsTextCon" style="display: none;" role="alertdialog" aria-label="提示：该链接属站外链接，将无法使用辅助浏览工具！是否继续访问？按tab键进行选择">';
EsdToolbarInit.toolbarHtmlStr+='		<br/>';
EsdToolbarInit.toolbarHtmlStr+='		<span class="ESDAssetsTextCon" data-has-text="1">提示：该链接属站外链接，将无法使用辅助浏览工具！</span>';
EsdToolbarInit.toolbarHtmlStr+='		<br/>';
EsdToolbarInit.toolbarHtmlStr+='		<span class="ESDAssetsTextCon" data-has-text="1">是否继续访问？</span><br/>';
EsdToolbarInit.toolbarHtmlStr+='		<div style="margin-top:15px">';
EsdToolbarInit.toolbarHtmlStr+='		    <input id="zwlj_bt1" type="button" class="ESDAssetsTextCon" aria-label="是,按回车键在新窗口打开链接" value="是" />';
EsdToolbarInit.toolbarHtmlStr+='		    <input id="zwlj_bt2" type="button" class="ESDAssetsTextCon" aria-label="否,按回车键关闭提示框" value="否" />';
EsdToolbarInit.toolbarHtmlStr+='		    <input id="zwlj_href" type="hidden" value=""/>';
EsdToolbarInit.toolbarHtmlStr+='	    </div>';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='	<div id="zwbdtj_prompt" style="display: none;">';
EsdToolbarInit.toolbarHtmlStr+='		<span id="zwbdtj_span1">请注意，该操作链接到其他网站</span><br/>';
EsdToolbarInit.toolbarHtmlStr+='		<span id="zwbdtj_span12">该网站无法启动无障碍工具条！</span>';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='	<div id="no_authorization_prompt" style="display: none;">';
EsdToolbarInit.toolbarHtmlStr+='		<span>当前访问页面超出辅助工具操作范围</span>';
EsdToolbarInit.toolbarHtmlStr+='		<br/>';
EsdToolbarInit.toolbarHtmlStr+='		<span>无障碍辅助工具无法正常工作！</span>';
EsdToolbarInit.toolbarHtmlStr+='		<br/>';
EsdToolbarInit.toolbarHtmlStr+='		<br/>';
EsdToolbarInit.toolbarHtmlStr+='		<input id="na_bt1" type="button" title="点击返回" value="点击返回" />';
EsdToolbarInit.toolbarHtmlStr+='	</div>';
EsdToolbarInit.toolbarHtmlStr+='</div>';

EsdToolbarInit.toolbarCssStr = '#toolbarHtml  {'
+'	top:0;'
+'	left:0;'
+'	position:fixed;'
+'	min-width: 100%;'
+'	color: #666666;'
+'	font-family: Microsoft YaHei;'
+'	font-size: 12px;'
+'	text-align: center;'
+'}'
+'#toolbarHtml h1, #toolbarHtml h2, #toolbarHtml h3, #toolbarHtml h4, #toolbarHtml h5, #toolbarHtml h6 {'
+'	font-size: 12px;'
+'	font-weight: normal;'
+'}'
+'#toolbarHtml li {'
+'	list-style-type: none;'
+'}'
+'#toolbarHtml img {'
+'	border: 0 none;'
+'	display:inline-block;'
+'}'
+'#toolbarHtml a {'
+'	color: #666666;'
+'	text-decoration: none;'
+'}'
+'#toolbarHtml a:not(#cy_playSpeech_dl a) {'
+'	display: block;'
+'}'
+'#toolbarHtml span {'
+'	color: #666666;'
+'}'
+'#toolbarHtml #canyou_toolbar_div {'
+'	background-color:#184f87;'
+'	color:#fff;'
+'	min-width: 103px;'
+'}'
+'#toolbarHtml div.cy_toolbar_bg_table {'
+'	height:98px;'
+'	margin: 0px auto;'
+'	align:centent;'
+'}'
+'#toolbarHtml div.cy_toolbar_bg_table ul {'
+'	font-size: 18px;'
+'	line-height: 30px;'
+'	text-align: center;'
+'	display:inline-block;'
+'	margin: 0 auto;'
+'}'
+'#toolbarHtml #arrow_1 img, #toolbarHtml #arrow_2 img, '
+'#toolbarHtml #arrow_3 img, #toolbarHtml #arrow_4 img,'
+'#toolbarHtml #arrow_5 img {display: none;}'
+'div.cy_toolbar_bg_table ul li{position:relative;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li span.ul_li_a_1{color: #FFF; display:block;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li.li_1 {float:left;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li.li_2 {float:left;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li.li_3 {float:left;}'
+'#toolbarHtml img, #toolbar_more img, #toolbarPage2 img{'
+'	width: 50px;'
+'	height: 50px;'
+'}'
+'#toolbarHtml svg, #toolbar_more svg, #toolbarPage2 svg{'
+'	width: 50px;'
+'	height: 50px;'
+'}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li span.ul_li_a_1 {'
+'	font-weight: bold;'
+'	float:left;'
+'}'
+'#toolbarHtml li#cy_back, #toolbarHtml li#cy_color, '
+'#toolbarHtml li#cy_arrow, #toolbarHtml li#cy_help {'
+'	margin-left:7px;'
+'	padding-left:10px;'
+'}'
+'/*                       下拉框的隐藏                          */'
+'#toolbarHtml li#cy_color dl.yin_1{display:none;}'
+'#toolbarHtml li#cy_color dl.xian_1{display: block;}'
+'#toolbarHtml li#cy_playSpeech dl.yin_1{display:none;}'
+'#toolbarHtml li#cy_playSpeech dl.xian_1{display:block;}'
+'#toolbarHtml li#cy_arrow dl.yin_1 {display: none;}'
+'#toolbarHtml li#cy_arrow dl.xian_1 {display: block;}'
+'#toolbarHtml li#cy_options dl.yin_1{display:none;}'
+'#toolbarHtml li#cy_options dl.xian_1{display: block;}'
+'/*                 配色下拉框                     */'
+'#toolbarHtml li#cy_color dl{'
+'	width:168px;'
+'	height:210px;'
+'	position:absolute; '
+'	left:0;'
+'	top:62px;'
+'	background-color:#fff;'
+'	z-index: 10000;'
+'	border:1px solid #666;'
+'	margin:1px;'
+'	font-size:14px;'
+'}'
+'#toolbarHtml li#cy_color dl dt,li#cy_color dl dd{'
+'	float:left;margin:1px 0;'
+'}'
+'#toolbarHtml li#cy_color dl dt{height:40px;}'
+'#toolbarHtml li#cy_color dl dd{height:40px;}'
+'#toolbarHtml li#cy_color dl dt a,li#cy_color dl dd a{'
+'	display:block;'
+'	float:left;'
+'	 cursor: pointer;'
+'}'
+'#toolbarHtml li#cy_color dl dt a{'
+'	height:40px;'
+'	width:40px;'
+'	background-color:#474747;'
+'	border-bottom:1px solid #fff;'
+'	border-top:1px solid #fff;'
+'}'
+'#toolbarHtml li#cy_color dl dt a img{'
+'	margin-left:5px;'
+'	margin-top:7px;'
+'}'
+'#toolbarHtml li#cy_color dl dd a{'
+'	line-height:40px;'
+'	width:128px;'
+'	height:40px;'
+'	border-bottom:1px solid #fff;'
+'	border-top:1px solid #fff;'
+'}'
+'/*                语音下拉框                     */'
+'#toolbarHtml li#cy_playSpeech dl{'
+'	width:100px;'
+'	height:42px;'
+'	position:absolute; '
+'	left:0;'
+'	top:62px;'
+'	z-index: 2;'
+'	'
+'	margin:1px;'
+'	font-size:14px;'
+'}'
+'#toolbarHtml li#cy_playSpeech dl dd{'
+'	border:1px solid #fff;'
+'	margin-bottom:1px;'
+'	}'
+'/*                  底部文字显示框                           */'
+'#ymd_magnifier{text-align:center;width:100%}'
+'#ymd_magnifier{zoom:1!important; position:fixed;bottom:0;left:0;background:#484a4a;height:160px;overflow:hidden;}'
+'#ymd_magnifier ul{list-style:none;margin:0;padding:0;overflow:hidden;height:160px}'
+'#ymd_magnifier #ymd_magnifier_left{float:left;padding:12px 10px 0 10px;color:#fff;overflow:hidden;height:160px;width:100px;box-sizing:border-box;font-family: "微软雅黑";}'
+'#ymd_magnifier #ymd_magnifierClose,#ymd_magnifier a{color:white;text-decoration:none;display:block;line-height:30px;font-size:18px;letter-spacing:5px;width:auto;border:1px solid rgba(255,255,255,.3);border-radius:5px;text-align:center;clear:left;margin:0 0 15px 0;cursor:pointer;font-style:normal;background:#184f87}#ymd_magnifier #ymd_magnifierClose{margin:0}'
+'#ymd_magnifier #ymd_magnifierClose:hover,#ymd_magnifier a:hover{color:#000000;background:#fff;}#ymd_magnifier #ymd_magnifier_right{font-family:"Microsoft YaHei";text-align:center;font-size:32pt!important;letter-spacing:5px;color:#000;overflow-y:auto;overflow-x:hidden;height:150px;background:#ffffff;border-radius:5px;margin:5px 5px 0 0}#ymd_magnifier #ymd_magnifier_right::-webkit-scrollbar{width:10px;height:1px}#ymd_magnifier #ymd_magnifier_right::-webkit-scrollbar-thumb{border-radius:10px;background-color:rgba(0,0,0,.2)!important;background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,.2) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.2) 75%,transparent 75%,transparent)!important}#ymd_magnifier #ymd_magnifier_right::-webkit-scrollbar-track{box-shadow:inset 0 0 5px rgba(0,0,0,.2);background:#ededed!important;border-radius:10px}'
+'.pinyin{font-size: inherit !important;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:0!important;float:left;line-height:50%;color:#000;font-weight:600!important;margin-left:5px!important}'
+'.pinyin b{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;flex-flow:column;font-weight:400;font-style:normal;padding:0 5px 0 0;position:relative;z-index:2}'
+'.pinyin b::before{content:"";position:absolute;width:37px;height:1px;z-index:1;left:0;bottom:17.5px;border-top:dashed 1px #a9a9a9}'
+'.pinyin b::after{content:"";position:absolute;width:1px;height:37px;z-index:1;left:19px;bottom:0;border-left:dashed 1px #a9a9a9}'
+'.pinyin i{text-align:center;font-style:normal}'
+'.pinyin b>i:first-child{letter-spacing:.5px;color:#000!important;font-size:14pt!important;font-weight:400;margin:10px 0 2px 0;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}'
+'.pinyin b>i:last-child{width:37px;height:37px;line-height:37px;font-size:28pt!important;position:relative;z-index:2;border:solid 1px #a9a9a9!important;color:#000!important;font-family:"楷体",KT,"LiHei Pro Medium";font-weight:600}'
+'.pinyin b>i:last-child::before{content:"";position:absolute;width:49..5px;height:49..5px;z-index:-1;left:0;bottom:0;transform-origin:left bottom;transform:rotate(45deg);border-left:dashed 1px #a9a9a9!important}'
+'.pinyin b>i:last-child::after{content:"";position:absolute;width:49.5px;height:49..5px;z-index:-1;right:0;bottom:0;transform-origin:right bottom;transform:rotate(-45deg);border-right:dashed 1px #a9a9a9!important}'
+'/*                语音下拉框                     */'
+'#toolbarHtml li#cy_playSpeech dl{'
+'	width:120px;'
+'	'
+'	position:absolute; '
+'	left:0;'
+'	top:62px;'
+'	z-index: 2;'
+'	'
+'	margin:1px;'
+'	font-size:14px;'
+'	background-color:#fff;'
+'	 border: 1px solid #666;'
+'}'
+'#toolbarHtml li#cy_playSpeech dl dd{'
+'	border:1px solid #fff;'
+'	margin-bottom:1px;'
+'	height:40px;'
+'	line-height:40px;'
+'	background-color:#474747;'
+'	}'
+'	'
+'#toolbarHtml li#cy_playSpeech dl dd a{'
+'	color:#fff;'
+'    font-weight: bolder ;'
+'	'
+'	}'
+'/*---------------页面加载效果---------------*/'
+'#toolbarHtml .overlay{position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 998; width: 100%; height: 100%; _padding: 0 20px 0 0; background: #f6f4f5; display: none;}'
+'#toolbarHtml .showbox{position: fixed; top: 0; left: 50%; z-index: 9999; opacity: 0; filter: alpha(opacity=0); margin-left: -80px;}'
+'#toolbarHtml *html, *html body{background-image: url(about:blank); background-attachment: fixed;}'
+'/*-------------------全屏弹窗---------------------*/'
+'#toolbarHtml #toolbar_prompt {'
+'	width: 720px;'
+'	height: 150px;'
+'	z-index: 9999;'
+'	position:absolute;'
+'	top:50%;'
+'	left:50%;'
+'	margin-top: -75px;/*注意这里必须是DIV高度的一半*/    '
+'	margin-left: -360px;/*这里是DIV宽度的一半*/'
+'	opacity: 1;'
+'	background-color: #184f87;'
+'}'
+'#toolbarHtml #toolbar_prompt span {'
+'	font-size: 70px;'
+'	line-height: 140px;'
+'	color: #FFFFFF;'
+'}'
+'/*-------------------外链接弹窗---------------------*/'
+'#toolbarHtml #zwlj_prompt {'
+'	width: 720px;'
+'	height: 190px;'
+'	z-index: 9999;'
+'	position:fixed;'
+'	top:50%;'
+'	left:50%;'
+'	margin-top: -75px;/*注意这里必须是DIV高度的一半*/    '
+'	margin-left: -360px;/*这里是DIV宽度的一半*/'
+'	opacity: 1;'
+'	background-color: #184f87;'
+'}'
+'#toolbarHtml #zwlj_prompt span {'
+'	font-size: 24px;'
+'	line-height: 38px;'
+'	color: #FFFFFF;'
+'}'
+'#toolbarHtml #zwlj_prompt input{'
+'	font-size: 24px;'
+'	color:#FFFFFF;'
+'	background: #184f87;'
+'	width:50px;'
+'	height:30px;'
+'	line-height:18px;'
+'	border:0;'
+'}'
+'/*-------------------无权限页面弹窗---------------------*/'
+'#toolbarHtml #no_authorization_prompt {'
+'	width: 800px;'
+'	height: 210px;'
+'	z-index: 9999;'
+'	position:absolute;'
+'	top:50%;'
+'	left:50%;'
+'	margin-top: -75px;/*注意这里必须是DIV高度的一半*/    '
+'	margin-left: -360px;/*这里是DIV宽度的一半*/'
+'	opacity: 1;'
+'	background-color: #184f87;'
+'}'
+'#toolbarHtml #no_authorization_prompt span {'
+'	font-size: 30px;'
+'	line-height: 70px;'
+'	color: #FFFFFF;'
+'}'
+'#toolbarHtml #no_authorization_prompt input{'
+'	font-size: 25px;'
+'	color:#FFFFFF;'
+'	background: #184f87;'
+'	width:100px;'
+'	height:30px;'
+'	line-height:18px;'
+'	border:0;'
+'}'
+'/*-------------------表单站外提交弹窗---------------------*/'
+'#toolbarHtml #zwbdtj_prompt{'
+'	width: 600px;'
+'	height: 150px;'
+'	z-index: 9999;'
+'	position:absolute;'
+'	top:50%;'
+'	left:55%;'
+'	margin-top: -75px;/*注意这里必须是DIV高度的一半*/    '
+'	margin-left: -360px;/*这里是DIV宽度的一半*/'
+'	opacity: 1;'
+'	background-color: #184f87;'
+'}'
+'#toolbarHtml #zwbdtj_prompt span {'
+'	font-size: 30px;'
+'	line-height: 70px;'
+'	color: #FFFFFF;'
+'}'
+''
+'#toolbarHtml #botn{'
+'	width:0px;'
+'	height:0px;'
+'	line-height:0px;'
+'	font-size:0px;'
+'	overflow:hidden;'
+'	}'
+'#toolbarHtml #iframe .ymd_split_span{'
+'	text-decoration:none;	'
+'}'
+'/*           设置下拉框        */             '
+'#toolbarHtml li#cy_options dl{'
+'	width:168px;'
+'	position:absolute; '
+'	left:0;'
+'	top:62px;'
+'	background-color:#fff;'
+'	z-index: 10000;'
+'	border:1px solid #666;'
+'	margin:1px;'
+'	font-size:14px;'
+'}'
+'#toolbarHtml li#cy_options dl dt,li#cy_options dl dd{'
+'	float:left;margin:1px 0;'
+'}'
+'#toolbarHtml li#cy_options dl dt{height:40px;}'
+'#toolbarHtml li#cy_options dl dd{height:40px;}'
+'#toolbarHtml li#cy_options dl dt a,li#cy_options dl dd a{'
+'	display:block;'
+'	float:left;'
+'	cursor: pointer;'
+'}'
+'#toolbarHtml li#cy_options dl dt a{'
+'	height:40px;'
+'	width:40px;'
+'	background-color:#474747;'
+'	border-bottom:1px solid #fff;'
+'	border-top:1px solid #fff;'
+'}'
+'#toolbarHtml li#cy_options dl dt a img{'
+'	margin-left:5px;'
+'	margin-top:7px;'
+'}'
+'#toolbarHtml li#cy_options dl dd a{'
+'	line-height:40px;'
+'	width:128px;'
+'	height:40px;'
+'	border-bottom:1px solid #fff;'
+'	border-top:1px solid #fff;'
+'}'
+'#toolbarHtml li#cy_arrow dl dt,li#cy_arrow dl dd {'
+'	float: left;'
+'	margin: 1px 0;'
+'}'
+'#toolbarHtml li#cy_arrow dl dd {'
+'	height: 40px;'
+'}'
+'#toolbarHtml li#cy_arrow dl dt {'
+'	height: 40px;'
+'}'
+'#toolbarHtml li#cy_arrow dl dt a {'
+'	height: 40px;'
+'	width: 40px;'
+'	background-color: #474747;'
+'	border-bottom: 1px solid #fff;'
+'	border-top: 1px solid #fff;'
+'}'
+'#toolbarHtml li#cy_arrow dl {'
+'	width: 80px;'
+'	height: 210px;'
+'	position: absolute;'
+'	left: 0;'
+'	top: 62px;'
+'	background-color: #fff;'
+'	z-index: 10000;'
+'	border: 1px solid #666;'
+'	margin: 1px;'
+'	font-size: 14px;'
+'}'
+'#toolbarHtml li#cy_arrow dl dt a img {'
+'	margin-left: 5px;'
+'	margin-top: 7px;'
+'}'
+'#toolbarHtml li#cy_arrow dl dt a,li#cy_arrow dl dd a {'
+'	display: block;'
+'	float: left;'
+'	cursor: pointer;'
+'}'
+'#toolbarHtml li#cy_arrow dl dd a img {'
+'	widows: 40px;'
+'	height: 40px;'
+'}'
+'#toolbarHtml li#cy_arrow dl dd a {'
+'	line-height: 40px;'
+'	width: 40px;'
+'	height: 40px;'
+'	border-bottom: 1px solid #fff;'
+'	border-top: 1px solid #fff;'
+'}'
+'#slideLateral {'
+'	width: 100%;'
+'	height: 5px;'
+'}'
+'#slideLongitudinal {'
+'	width: 5px;'
+'	height: 100%;'
+'}'
+'#slideLateral, #slideLongitudinal {'
+'	position: absolute;'
+'	background-color: #ff0000 !important;'
+'	overflow: hidden;'
+'	z-index: 9999;'
+'	left: 0;'
+'	top: 0;'
+'}'
+'/*-------------------------区域导航-----------------------------*/'
+'#toolbarHtml #toolbarPage2 {'
+'    background-color: #184f87;'
+'    display: none;'
+'}'
+'#toolbarPage2 p{'
+'	margin: 0;'
+'	padding: 0;'
+'	text-indent: unset;'
+'}'
+'#toolbarHtml #toolbarPage2 .toolbarTexts {'
+'    width: 110px;'
+'    overflow: hidden;'
+'    cursor: pointer;'
+'   /* height: 77px;*/'
+'    float: left;'
+'    margin-left: 5px;'
+'}'
+'#toolbarHtml #toolbarPage2 .toolbarTexts .textSpan {'
+'    float: left;'
+'    margin-left: 6px;'
+'    cursor: pointer;'
+'}'
+'#toolbarHtml #toolbarPage2 .textStr {'
+'    letter-spacing: 1px;'
+'/*    display: block;*/'
+'    cursor: pointer;'
+'    line-height: 45px;'
+'    overflow: hidden;'
+'    height: 35px;'
+'    font-weight: bold;'
+'    font-size: 18px !important;'
+'    clear: both;'
+'    color: gray;'
+'}'
+'#toolbarHtml #toolbarPage2 .textKey {'
+'    cursor: pointer;'
+'    display: block;'
+'    font-size: 18px !important;'
+'    line-height: 10px;'
+'    height: 35px;'
+'    clear: both;'
+'    color: gray;'
+'    padding-top: 10px;'
+'	font-family: Consolas;'
+'}'
+'#toolbarHtml .textSpan.textShow{'
+'    display: block !important;'
+'}'
+'#toolbarHtml #toolbarPage2 .textSpan span{'
+'    margin: 0px;'
+'    float: none;'
+'	vertical-align: middle;'
+'}'
+'#toolbarHtml #toolbarPage2 .textShow {'
+'    color: #fff;'
+'}'
+'#toolbarHtml #toolbarPage2 .textNum {'
+'    color: #ff9027;'
+'    font-size: 15px;'
+'	font-family: Consolas;'
+'}'
+'#toolbarHtml #toolbarPage2content .toolbarTexts{ float:left;}'
+'#toolbarHtml .displayNone{ display:none;}'
+'#toolbarHtml #toolbarPage2content {'
+'    height: 100%;'
+'    width: 1200px;'
+'    margin: 0 auto;'
+'    position: relative;'
+'}'
+'#toolbarHtml .navText{'
+'	padding-top: 9px; '
+'	width: 120px;'
+'    overflow: hidden;'
+'    float: left;'
+'    margin-left: 5px;'
+'}'
+''
+'#toolbarHtml .textStr2{'
+'	letter-spacing: 1px;'
+'	cursor: default;'
+'    line-height: 45px;'
+'    overflow: hidden;'
+'    height: 35px;'
+'    font-weight: bold;'
+'    font-size: 22px !important;'
+'    clear: both;'
+'    color: gray;'
+'}'
+'#toolbarHtml .readDiv{'
+'	float: left;'
+'	margin-left: 10px;'
+'}'
+'#toolbarHtml .read-span{'
+'    color: #FFF;'
+'    display: block;'
+'    font-size: 18px;'
+'    font-weight: bold;'
+'}'
+'#toolbarHtml div.cy_toolbar_bg_table ul{ padding-top:8px; padding-bottom:8px; padding-left:0px;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li{'
+'	margin:0px 3px;'
+'	text-align:center;'
+'}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li>a{ display:block; /*height:44px; width:100%;*/ text-align:center; border-radius:3px; line-height:0px; font-size:0px;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li>a:active{ background-size:100% 100%;}'
+'#toolbarHtml li#cy_back, li#cy_refrash, li#cy_color, li#cy_playSpeech, li#cy_displayScreen, li#cy_translation{ margin-left:10px;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li>a{'
+'	background-size:100% 100%;'
+'    background-color: rgba(0,0,0,0.2);'
+'    background-repeat: no-repeat;'
+'    background-position: center;'
+'}'
+'#toolbarHtml #cy_zoomAdd a{ float:left; width:50%;}'
+'#toolbarHtml #cy_playSpeech #toolbar_speakVolume{float:left;}'
+'#toolbarHtml #cy_playSpeech #toolbar_playSpeech{ float:left; width:19px;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li span.a_p_2,div.cy_toolbar_bg_table ul li span.a_p_3{ clear:both;}'
+'#toolbarHtml li#cy_playSpeech dl dd a{width:22px; float:left;}'
+'#toolbarHtml li#cy_playSpeech dl dd a.toolbar_speakSpeed{ width:74px;}'
+'#toolbarHtml div#canyou_toolbar_div div.cy_toolbar_bg_table ul li:hover span{background:#888888;}'
+'#toolbarHtml div.cy_toolbar_bg_table ul li span.exap,div.cy_toolbar_bg_table ul li span.a_p_1,div.cy_toolbar_bg_table ul li span.a_p_2,div.cy_toolbar_bg_table ul li span.a_p_3{ font-size:18px; width:100%; padding-top:5px; /*padding-bottom:5px;*/}'
+'#toolbarHtml div#canyou_toolbar_div div.cy_toolbar_bg_table ul>li>a:hover{background:#982426; border-radius:3px; background-size:100% 100%;}'
+'#toolbarHtml div#canyou_toolbar_div div.cy_toolbar_bg_table ul>li>a:active{background:#982426; border-radius:3px; background-size:100% 100%;}'
+'#toolbarHtml #otherBtns a{ display:block; width:100%; line-height:0px; background-size:100% 100%;background-color: rgba(0,0,0,0.2);background-repeat: no-repeat;background-position: center;}'
+'#toolbarHtml #otherBtns a:hover{background:#982426; background-size:100% 100%;}'
+'#toolbarHtml #otherBtns a:active{ background-size:100% 100%;}'
+'#toolbarHtml #otherBtns span{ padding:5px 0px; display:block;float: initial; margin: 0;}'
+'#toolbarHtml #otherBtns>div:hover span{ background:#888888;}'
+'#toolbarHtml #transform_dp{ float:left;}'
+'#toolbarHtml #otherBtns {float:right;}'
+'#toolbarHtml #toolbarPage2content{ overflow:hidden; padding-top:8px;}'
+'/* -----------------更多 -----------------*/'
+'#toolbarHtml #toolbarMore{'
+'	display:none;'
+'	position: fixed;'
+'    top: 0;'
+'    bottom: 0;'
+'    width: 80px;'
+'    background-color: #184f87;'
+'    z-index: 99999;'
+'}'
+'#toolbarHtml #toolbarMore .toolbarMark{'
+'	background-image: url(../img/left_img1.png);'
+'    background-repeat: no-repeat;'
+'    background-position: center;'
+'    margin-left: 10px;'
+'    margin-top: 10px;'
+'    width: 70px;'
+'    height: 65px;'
+'    display: block'
+'}'
+'#toolbarHtml #toolbarMore .toolbarLeft{'
+'	width: 100%;'
+'    padding-top: 5px;'
+'    padding-bottom: 5px;'
+'    float: left;'
+'    color: #FFF;'
+'    display: block;'
+'    font-size: 16px;'
+'    margin-top: -20px;'
+'}'
+'#toolbarHtml #toolbarMore li{'
+'	margin-top: 50px;'
+'}'
+'#toolbarHtml #toolbarMore .leftLi1{'
+'	margin-top: 30px;'
+'}'
+'#toolbarHtml #toolbarMore .leftClose{'
+'	bottom: 0;'
+'    position: fixed;'
+'    margin-left: -68px;'
+'    width: 60px;'
+'}'
+'#toolbarHtml #toolbarMore .leftLi3{'
+'	padding: 5px;'
+'}'


EsdToolbarInit.insertDoms = function(){
	var tempDiv = document.createElement("div");
	tempDiv.id = "EsdToolbarTempDiv";
	document.body.appendChild(tempDiv);
	tempDiv.innerHTML = EsdToolbarInit.toolbarHtmlStr;
	document.body.appendChild(document.getElementById("toolbarHtml"));
	document.body.removeChild(tempDiv);
	
	var tempStyle = document.createElement("style");
	tempStyle.textContent = EsdToolbarInit.toolbarCssStr;
	document.head.appendChild(tempStyle);
	
};
EsdToolbarInit.init();