/**
 * 各种配置化参数
 * 本文件在head中引用
 */


/*pcltLogo:'PC端左上LOGO',pcltRemark:'PC端左上LOGO  备注',pcrtLogo:'PC端右上LOGO',pcrtRemark:'PC端右上LOGO 备注',pcbLogo:'PC端底部logo',pcbRemark:'PC端底部logo  备注',pccLogo:'PC端栏目页logo',pccRemark:PC端栏目页logo 备注'',wapLogo:'WAP端LOGO',wapLogoRemark:'WAP端LOGO 备注',defLogo:'缺省logo',defLogoRemark:'缺省logo  备注',shareLogo:'wap分享图  ',shareRemark:'wap分享图  备注',coverLogo:'历史文章封面图',coverRema备注',theme:'WAP端主题色',gzhId:'公众号平台唯一ID',wapCi:'WAP版权信息',pcCi:'PC版权信息',pvShow:'阅读量显示',wapJumpFlag:0  'WAP跳PC',dlSha,backFlag用于满足部分县区不需要wap首页的需求。*/

var isAndroid = !!navigator.userAgent.match(/android/ig),
	isIos = !!navigator.userAgent.match(/iphone|ipod/ig),
	isIpad = !!navigator.userAgent.match(/ipad/ig),
	isIos9 = !!navigator.userAgent.match(/OS 9/ig),
	isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
	isQQ = (/qq/ig).test(navigator.userAgent);

var defaultNewsTitlePic = pcltLogo = pcltRemark = pcrtLogo = pcrtRemark = pcbLogo = pcbRemark = pccLogo = pccRemark =
	wapLogo = wapLogoRemark = defLogo = defLogoRemark = shareLogo = shareRemark = coverLogo = coverRemark = theme = gzhId =
	wapCi = pcCi = pvShow = wapJumpFlag = dlShare = siteConfig = backFlag = null;
var intVisitSecond = -1
var terminal = 1;


/**
 * 解决移动端查看pc页面无法自动缩放的问题
 */
var vipw = window.screen.availWidth; // 自动获取设备宽
var vw = vipw - 10; // 减去10 让页面显示两边有少量空白
var sw = 1200; // 这里是页面宽 根据设计需要调整
var vcw = vw / sw;
var wcv = sw / vw;
var oMeta = document.createElement('meta');
oMeta.content = "<meta name='viewport' content='width=" + vw + ",initial-scale=" + vcw +
	",target-densitydpi=device-dpi,minimum-scale=" + vcw + ",maximum-scale=" + wcv + ",user-scalable=" + wcv + "' />";
oMeta.name = 'viewport';
document.getElementsByTagName('head')[0].appendChild(oMeta);

// 动态自适应手机端宽;


/**
 * VIDEOFILEID:UAT 和 PRO 对应ID
 */
var __VIDEOFILEID = (window.location.href.indexOf("onlyred") > 0 ? "1400080256" : "1400085894");

/**
 * 默认接口host
 */
var APIURL = __DEFUALTAPIHOST = ((window.location.href.indexOf("172.16.6.2") > 0 && window.location.host=="" || window.location.href.indexOf(
	"127.0.0.1") > 0  || window.location.href.indexOf(
	"momenttest.onlyred.net") > 0) ? "http://172.16.6.49:8080" : "https://front-web.rednet.cn");


/**
 * 默认接口配置
 */
var __APICONFIG = {

	/* 栏目稿件列联表 */
	"articleListApiUrl": __DEFUALTAPIHOST + "/content/list/channel",
	/* 新闻标签 */
	"newsTagListApiUrl": __DEFUALTAPIHOST + "/dic/news_tag",
	/* 增加点击量 */
	"newsVisitApiUrl": __DEFUALTAPIHOST + "/content/visit/",
	/* 点赞、祈福 */
	"newsStarApiUrl": __DEFUALTAPIHOST + "/content/star/",
	/* 各类站点信息(logo/默认图/版权等),+/siteId */
	"siteConfigApiUrl": __DEFUALTAPIHOST + "/site/config/",
	/* 百度统计token */
	"baiduTokenApiUrl": __DEFUALTAPIHOST + "/site-baidu-token/get-token",
	/* 新闻阅读量 */
	"newsPvNumApiUrl": __DEFUALTAPIHOST + "/content/clicks/",
	/* app配置 */
	"appConfigApiUrl": __DEFUALTAPIHOST + "/site/share/",
	/* 站点配置信息 */
	"pcConfigApiUrl": __DEFUALTAPIHOST + "/site/"
};

var __pcThemeDir = "//j.rednet.cn/site/static/theme/";
var __themePC = {
	themeRed: {
		url: __pcThemeDir + "red.css",
		type: "css",
		version: "v0001"
	},
	themeBlue: {
		url: __pcThemeDir + "blue.css",
		type: "css",
		version: "v0001"
	},
	themeDarkblue: {
		url: __pcThemeDir + "darkblue.css",
		type: "css",
		version: "v0001"
	},
	themeLightblue: {
		url: __pcThemeDir + "lightblue.css",
		type: "css",
		version: "v0001"
	},
	themeGreen: {
		url: __pcThemeDir + "green.css",
		type: "css",
		version: "v0001"
	},
	themeLinghtGreen: {
		url: __pcThemeDir + "linghtgreen.css",
		type: "css",
		version: "v0001"
	},
	themeOrange: {
		url: __pcThemeDir + "orange.css",
		type: "css",
		version: "v0001"
	},
	themeBlue0766cc: {
		url: __pcThemeDir + "blue0766cc.css",
		type: "css",
		version: "v0001"
	}
}


/**
 * 初始化站点信息
 */
function initSite() {
getApi("siteConfig");
	
}

/****数据函数***/
function newJsonContent(json){
	
		var newJson = checkSiteConfigJson(json);
		pcltLogo = newJson.pcltLogo;
		pcltRemark = newJson.pcltRemark;
		pcrtLogo = newJson.pcrtLogo;
		pcrtRemark = newJson.pcrtRemark;
		pcbLogo = newJson.pcbLogo;
		pcbRemark = newJson.pcbRemark;
		pccLogo = newJson.pccLogo;
		pccRemark = newJson.pccRemark;
		wapLogo = newJson.wapLogo;
		wapLogoRemark = newJson.wapLogoRemark;
		defLogo = defaultNewsTitlePic = newJson.defLogo;
		defLogoRemark = newJson.defLogoRemark;
		shareLogo = newJson.shareLogo;
		shareRemark = newJson.shareRemark;
		coverLogo = newJson.coverLogo;
		coverRemark = newJson.coverRemark;
		theme = newJson.theme;
		gzhId = newJson.gzhId;

		if (newJson.wapCi) {
			wapCi = newJson.wapCi;
		} else {
			wapCi = "<p>Copyright © " + getCurrYear() + " "+wapDomain+"</p><p>版权所有 "+((typeof siteName== "undefined" || siteName=='')? "":siteName)+"</p>";
		}

		if (newJson.pcCi) {
			pcCi = newJson.pcCi;
		} else {
			pcCi = "<p>Copyright © " + getCurrYear() + " "+pcDomain+"</p><p>版权所有 "+((typeof siteName== "undefined" || siteName=='')? "":siteName)+"</p>";
		}

		pvShow = newJson.pvShow;
		wapJumpFlag = newJson.wapJumpFlag;
		backFlag = newJson.backFlag;
		footScript();
		
}
/**
 * 往json对象添加新建的key和value，key，value是动态的方法
 * @param {Object} json ：json对象
 * @param {Object} prop ：属性（Key）
 * @param {Object} val ： 值
 */
// 参数：json =  ，prop = 属性，val = 值
function checkSiteConfigJson(json) {
	if (!json) return null;
	var keys = ["pcltLogo", "pcltRemark", "pcrtLogo", "pcrtRemark", "pcbLogo", "pcbRemark", "pccLogo", "pccRemark",
		"wapLogo", "wapLogoRemark", "defLogo", "defLogoRemark", "shareLogo", "shareRemark", "coverLogo", "coverRemark",
		"theme", "gzhId", "wapCi", "pcCi", "pvShow", "wapJumpFlag", "dlShare", "backFlag"
	];
	for (var i = 0; i < keys.length; i++) {
		if (!json.hasOwnProperty(keys[i]) || json[keys[i]] == '') {
			json[keys[i].toString()] = null;
		}
	}
	return json;
}




/*  PC 和 WAP 多视频加载代码 20190826 LiuXiaoRong Edit */
if (!playList) { //视频文件中判断多视频个数，需要判断是否已经存在
	var playList = [];
}


/**
 * 动态加载外部CSS
 * @param {string} url 样式地址
 */
function dynamicLoadCss(url) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	head.appendChild(link);
	console.log("dynamicLoadCss ok");
}


/**
 * 动态添加样式代码到head
 * @param {Object} cssStr ： 样式代码
 */
function setHeadStyle(cssStr) {
	if (!cssStr) return;
	var head = document.getElementsByTagName('head')[0],
		style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = cssStr;
	} else {
		style.appendChild(document.createTextNode(cssStr));
	}
	head.appendChild(style);
	console.log("setHeasStyle ok");
}


/**
 * 动态加载脚本到 head
 * @param {Object} url	脚本地址
 * @param {Object} success	成功回调函数;
 */
// function getScript(url, success) {
// 	var script = document.createElement('script');
// 	script.src = url;
// 	var head = document.getElementsByTagName('head')[0],
// 		done = false;
// 	script.onload = script.onreadystatechange = function() {
// 		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
// 			done = true;
// 			if (success) {
// 				success();
// 			} else {
// 				console.log("callback is null")
// 			}
// 			script.onload = script.onreadystatechange = null;
// 			return this
// 		}
// 	};
// 	head.appendChild(script)
// };


function getScriptToPosition(url, position, success) {

	if (!position) position = "head";

	var script = document.createElement('script');
	script.src = url;
	var body = document.getElementsByTagName(position)[0],
		done = false;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			if (success) {
				success();
			} else {
				console.log("callback is null")
			}
			script.onload = script.onreadystatechange = null;
			return this
		}
	};
	body.appendChild(script)
};

function getScriptToBody(url, success) {
	var script = document.createElement('script');
	script.src = url;
	var body = document.getElementsByTagName('body')[0],
		done = false;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;
			if (success) {
				success();
			} else {
				console.log("callback is null")
			}
			script.onload = script.onreadystatechange = null;
			return this
		}
	};
	body.appendChild(script)
};


/**
 * 加载指定JSHash，修改版本以防止缓存
 * @param {Object} keys 键，可加载多个
 */
function loadJSHash(keys) {
	console.log("loadJSHash begin:" + keys);
	if (keys && JSHash) {
		for (var i = 0; i < keys.length; i++) {
			var jsnode = JSHash[keys[i]];

			if (jsnode.type == "javascript") {
				getScriptToHead(jsnode.url);
			} else if (jsnode.type == "css") {
				dynamicLoadCss(jsnode.url);
			} else {
				console.log("loadScript.type error :" + jsnode.type)
			}
		}
	}
}


function loadTheme(keys) {
	console.log("loadTheme begin:" + keys);
	if (keys && __themePC) {
		for (var i = 0; i < keys.length; i++) {
			var jsnode = __themePC[keys[i]];

			if (jsnode.type == "javascript") {
				getScriptToHead(jsnode.url);
			} else if (jsnode.type == "css") {
				dynamicLoadCss(jsnode.url);
			} else {
				console.log("loadScript.type error :" + jsnode.type)
			}
		}
	}
}

// 获取当前年份
function getCurrYear() {
	var myDate = new Date();
	var tYear = myDate.getFullYear();
	return tYear;
}



// 调用各类借口，在site-config.js 之后引用



/**
 * 从接口拿数据
 */
function getApi(s) {
	console.log('getApi - ' + s);
	var json = null;
	switch (s) {

		case "siteConfig":
			if (siteId) {

				jQuery.support.cors = true;//兼容ie10以下浏览器
				var getUrl = __APICONFIG.siteConfigApiUrl + siteId;
				var IEcode=IEVersion();//函数判断IE浏览器版本
				
				if(IEcode==-1 || IEcode>9){

					$.ajax({
						type: "get",
						url: getUrl,
						async: false,
						success: function(result) {
							json = result;
							siteConfig = json;
							if (json) {
								$.ajax({
								type: "get",
								url: __APICONFIG.pcConfigApiUrl + siteId,
								success: function(data) {
									newJsonContent(json);
									if(data.icpNum && data.icpNum!=""){
										$('#icpNum').html('<a href="//beian.miit.gov.cn">'+data.icpNum+'</a>');
									}
									if(data.policeNum && data.policeNum!=""){
										$('#policeNum').html('<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+data.policeNum+'">湘公网安备'+data.policeNum+'号</a>');
									}
									$("#yearCode").html(new Date().getFullYear());

								}
								});
							}
									if(siteConfig.dlShare && siteConfig.dlShare!=""){
									dlShare = siteConfig.dlShare;
									}
							//footScript();
						}
					});

				}else if(IEcode<10){//兼容ie10以下浏览器
				
					$.ajax({
						type: "GET",
						url: getUrl,
						dataType : "JSON",
						success: function(result) {
							json = result;
							siteConfig = json;
							if (json) {
								$.ajax({
									type: "get",
									url: __APICONFIG.pcConfigApiUrl + siteId,
									success: function(data) {
									newJsonContent(json);
									if(data.icpNum && data.icpNum!=""){
										$('#icpNum').html('<a href="//beian.miit.gov.cn">'+data.icpNum+'</a>');
									}
									if(data.policeNum && data.policeNum!=""){
										$('#policeNum').html('<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+data.policeNum+'">湘公网安备'+data.policeNum+'号</a>');
									}
									$("#yearCode").html(new Date().getFullYear());

								}
								});
							}
							
							//footScript();
							
							
						},
						error:function(){
							console.log("接口错误");
						}
					});
					
				}
				
			}
			break;
		case "newsPvNum":
			// 阅读量显示
			if (typeof contentId != "undefined" && siteId) {
				$.ajax({
					type: "get",
					url: __APICONFIG.newsPvNumApiUrl + siteId + "/" + contentId,
					async: false,
					success: function(result) {
						$("#numpv").html("阅读：" + Math.floor(result*0.391813));
					}
				});
			}
			break;
		default:
			break;
	}
	return json;
}

function strIIF(str, dstr) {
	if (Boolean(str)) {
		return str;
		// console.log("s1")
	} else {
		return dstr;
		// console.log("s2")
	}
}




/**
 * 访问量 visit
 */
function visitLogPc() {
	//需要全局contentId
	if (typeof contentId != "undefined" && typeof channelId != "undefined" && siteId) {
		var isPass = isVisit();
		if (isPass) {
			// console.log("visit(3)")
			$.ajax({
				type: "post",
				contentType: "application/json; charset=utf-8",
				url: __APICONFIG.newsVisitApiUrl,
				data: JSON.stringify({
					contentId: contentId,
					channelId: channelId,
					siteId: siteId,
					terminal: terminal,
					url: window.location.href
				}),
				// async:true,
				dataType: 'text',
				success: function(resp) {
					// $("#numpv").html("阅读：" + resp);
					myStorage.setItem("site-" + siteId + "-cookie-last-time-" + contentId, getClientDateTime());
					console.log("run visit() success")
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					// 状态码
					console.log("visitLog:" + XMLHttpRequest.status);
					// 状态
					console.log("visitLog:" + XMLHttpRequest.readyState);
					// 错误信息   
					console.log("visitLog:" + textStatus);
				}
			});
		}

	} else {
		console.log("visitLog:ontentId is failed")
	}
}


/**
 * 点赞 star
 */
function addFav() {
	if (typeof ckie != "undefined") {
		if (isAddFav() == 0) {
			$.ajax({
				type: "put",
				url: __APICONFIG.newsStarApiUrl + contentId,
				async: true,
				dataType: 'text',
				success: function(data) {
					myStorage.setItem(ckie, ckie + '-fav');
					var tmpData = parseInt($(".starCount").html()) + 1;

					$(".starCount").html(upsFomatter(tmpData));
					var src = $(".favImg").attr("src")
					$(".fav").css('border-width', '0.02rem');
					$('.fav-box').addClass('active');

				}
			});
		} else {
			$('.fav-tips').fadeIn(500).delay(2000).fadeOut(500);
		}
	} else {
		console.log("lost 'ckie' value");
	}
}


function isAddFav() {
	var cookieUUID = myStorage.getItem(ckie);
	if (cookieUUID && cookieUUID.indexOf(contentId + '-fav') > -1) {
		$('.fav-box').addClass('active');
		return 1
	}
	return 0;
}


/**
 * 获取点赞数并格式化数据
 */
function getContentUps() {
	if ($(".favNum").length) {
		$.ajax({
			type: "get",
			url: __APICONFIG.newsStarApiUrl + contentId,
			success: function(data) {
				$(".favNum").html(upsFomatter(data));
				$(".favNum").attr("ups", parseInt(data))
				isAddFav();
			}
		});
	}
}



/**
 * 格式化点赞数字
 * @param {Object} val
 */
function upsFomatter(val) {
	var value = "";
	if ((val + "").length > 4) {
		value = (parseFloat(val) / 10000).toFixed(4);
		value = Number(value.toString().match(/^\d+(?:\.\d{0,1})?/)) + "";
		if (value.split(".")[1] == "0") {
			value = value.split(".")[0];
		}
		return value + "万";
	} else {
		return val;
	}
}



/**
 * 百度统计 baidu
 * 需定义全局 terminal =1，2，3 
 */
var baiduToken;

function baiduTongji() {
	var t = 1;
	if (typeof terminal != "undefined") {
		t = terminal;
	}

	try {
		/*加载百度统计代码*/
		$.ajax({
			//请求方式
			type: "GET",
			//请求的媒体类型
			contentType: "application/json;charset=UTF-8",
			//请求地址
			url: __APICONFIG.baiduTokenApiUrl + "?siteId=" + siteId + "&terminal=" + t,
			//请求成功
			dataType: "text",
			success: function(result) {
				// console.log(result);
				//token = 'e0a05e5666097628262b7497bb0b6363';
				tokenbaidu = result;
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?" + tokenbaidu;
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			},
			//请求失败，包含具体的错误信息
			error: function(e) {
				console.log(e.status);
				console.log(e.responseText);
			}
		});
		/*百度统计结束*/
	} catch (e) {
		console.log(e.status);
		console.log(e.responseText);
	}

}



/*
* 显示阅读量标签，在相应的位置调用
* @param [Object] contentId

*/
function showClicks() {
	if (typeof contentId != "undefined" && pvShow == 1) {
		getApi("newsPvNum");
	}
	console.log("showClicks > pvShow:" + pvShow);
}



/**
 * 百度自动推送
 */
function baiduAutoPush() {

	var bp = document.createElement('script');
	var curProtocol = window.location.protocol.split(':')[0];
	if (curProtocol === 'https') {
		bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	} else {
		bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	}
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(bp, s);
}


/**
 * 获取url中的参数值
 * @param {Object} e
 */
function getUrlParam(e) {
	var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
	var t = window.location.search.substr(1).match(o);
	return null != t ? unescape(t[2]) : null;
}





/**
 * 多视频检测并初始化
 */
function mutiVideoCheck() {

	if (typeof contentId != "undefined") {
		var plyrSvg =
			'<svg width="100%" height="100%" viewBox="0 0 348 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="白色按钮"><g><path d="M174,5c93.826,0 170,76.174 170,170c0,93.826 -76.174,170 -170,170c-93.826,0 -170,-76.174 -170,-170c0,-93.826 76.174,-170 170,-170Zm0,10c88.306,0 160,71.694 160,160c0,88.306 -71.694,160 -160,160c-88.306,0 -160,-71.694 -160,-160c0,-88.306 71.694,-160 160,-160Z" style="fill:#fff;"/><path d="M145.464,115.814c-2.359,-1.363 -5.261,-1.363 -7.612,0c-2.36,1.362 -3.81,3.882 -3.81,6.615l0,105.445c0,2.733 1.45,5.254 3.81,6.616c1.179,0.681 2.495,1.022 3.81,1.022c1.316,0 2.631,-0.341 3.811,-1.022l91.017,-52.723c2.351,-1.362 3.802,-3.882 3.802,-6.615c0,-2.733 -1.451,-5.254 -3.81,-6.616l-91.018,-52.722Z" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>'
		if ($(".edui-faked-video").length > 0) {
			for (var i = 0, n = $(".edui-faked-video").length; i < n; i++) {
				var dom = $($(".edui-faked-video")[i]);
				var video = '<video class="video-plyr" id="player' + i + '" poster="' + dom.attr("coverImg") + '" displayType="' +
					dom.attr("displayType") + '" preload="auto" width="680" playsinline webkit-playinline controls><source src="' +
					dom
					.attr("urlCloud") + '"  type="video/mp4"></source></video>';
				dom.parent().append(video);
				(function(i) {
					var player = new Plyr("#player" + i, {
						controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'fullscreen']
					})
					playList.push(player)
					player.on('ready', function(event) {
						$(".plyr__control--overlaid svg").remove();
						$(".plyr__control--overlaid .plyr__sr-only").before(plyrSvg)
					});
					player.on('play', function() {
						for (var j = 0, k = playList.length; j < k; j++) {
							if (!(player == playList[j])) {
								playList[j].pause();
							}
						}
					});

					/*全屏事件*/
					player.on('enterfullscreen', function(event) {
						var element = event.detail.plyr.media;
						$(element).css("width", "100%");
						$(element).css("height", "100%");
						console.log(event)
					});
					/*退出全屏事件*/
					player.on('exitfullscreen', function(event) {
						var element = event.detail.plyr.media;
						var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;
						//$(element).css("width",680*scale +"px");
						$(".video-plyr").css("width", "100%");
						$(element).css("height", (680 * 9 / 16) * scale + "px");
					});
				})(i)
			}
			$(".edui-faked-video").remove();
		}
		var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;
		$(".video-plyr").css("width", "100%");
		$(".video-plyr").each(function() {
			if ($(this).attr("displayType") == "1") { //横视频展示
				$(this).css("height", (680 * 9 / 16) * scale + "px");
			} else if ($(this).attr("displayType") == "2") { //竖视频展示
				$(this).css("height", (680 * 16 / 9) * scale + "px");
			}
			/*
			    $(this).css("height","382.5px");
			*/

		});
	}
}

/**
 * 图文、视频详情：播放器暂停、播放
 * @param {Object} index
 */
function videoPlay(index) {
	for (var i = 0, n = players.length; i < n; i++) {
		players[i].pause();
	}
	if (index != -1) {
		players[index - 1] && players[index - 1].play();
	}
}
/* video end  */


/**
 * 稿件visit
 * @param {Object} contentId	稿件id
 * @param {Object} intN		间隔多少（秒）
 */
function isVisit() {

	if (typeof contentId == "undefined" && !siteId) {
		return -1;
	}

	var isPass = -1;
	var ckiePvN = "site-" + siteId + "-cookie-pvn-" + contentId
	var contentPvNum = myStorage.getItem(ckiePvN);
	var ckiePvT = "site-" + siteId + "-cookie-last-time-" + contentId

	var ckiePvLastTime = myStorage.getItem(ckiePvT);
	var currT = getClientDateTime();
	myStorage.setItem("currT", currT);
	if (ckiePvLastTime) {
		if (getDateDiffBy2Dates(ckiePvLastTime, currT, "second") >= intVisitSecond) {
			isPass = 1;
		} else {
			isPass = 0;
		}
	} else {
		isPass = 1;
	}

	return isPass;
}



function getDateDiffBy2Dates(startTime, endTime, diffType) {

	if (startTime && endTime) {
		//alert(endTime);
		//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		//将计算间隔类性字符转换为小写
		diffType = diffType.toLowerCase();

		var sTime = new Date(startTime); //开始时间
		var eTime = new Date(endTime); //结束时间
		//作为除数的数字
		var timeType = 1;
		switch (diffType) {
			case "second":
				timeType = 1000;
				break;
			case "minute":
				timeType = 1000 * 60;
				break;
			case "hour":
				timeType = 1000 * 3600;
				break;
			case "day":
				timeType = 1000 * 3600 * 24;
				break;
			default:
				break;
		}

		return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
	} else {
		return -1;
	}

}



/**
 * 获取客户端当前时间
 */
function getClientDateTime() {
	var d = new Date(),
		str = '';
	//str += d.getFullYear() + '年'; //获取当前年份
	//str += d.getMonth() + 1 + '月'; //获取当前月份（0——11）
	//str += d.getDate() + '日';
	//str += d.getHours() + '时';
	//str += d.getMinutes() + '分';
	//str += d.getSeconds() + '秒';
	str += d.getFullYear(); //获取当前年份
	var month = d.getMonth() + 1;
	month = (month < 10 ? "0" + month : month);
	str += "-" + month; //获取当前月份（0——11）
	var date = d.getDate();
	date = (date < 10 ? "0" + date : date);
	str += "-" + date;
	var hour = d.getHours();
	hour = (hour < 10 ? "0" + hour : hour);
	str += " " + hour;
	var minute = d.getMinutes();
	minute = (minute < 10 ? "0" + minute : minute);
	str += ":" + minute;
	var second = d.getSeconds();
	second = (second < 10 ? "0" + second : second);
	str += ":" + second;
	return str;
}


/*****************************/
function footScript(){
	


	if (typeof WXSHARE_LOGO != "undefined") {
		if (!WXSHARE_LOGO) {
			if (shareLogo) {
				console.log("sharelogo:" + shareLogo);
				WXSHARE_LOGO = shareLogo
				console.log("WXSHARE_LOGO :" + WXSHARE_LOGO);
			} else {
				WXSHARE_LOGO = "https://j.rednet.cn/site/static/wap/images/logo-wap-share.jpg";
				console.log("else WXSHARE_LOGO :" + WXSHARE_LOGO);
			}
		}
	}


	// 独立域名分享 -S
	getScriptToBody("//res.wx.qq.com/open/js/jweixin-1.2.0.js", function() {
		console.log("微信分享框架——ok");
	});
	if (pcDomain.indexOf("rednet.cn") < 0) {
		if (dlShare) {
			getScriptToBody(dlShare, function() {
				console.log("独立域名分享接口——ok");
			});
		} else {
			console.log("======================================");
			console.log("注意：独立域名请配置微信分享接口！");
			console.log("======================================");
		}
	} else {
		getScriptToBody("//j.rednet.cn/site/static/js/wxshare.js", function() {
			console.log("微信分享默认接口——ok");
		});
	}
	// 独立域名分享 -E



	// 识别端自动跳转
	pcDomains=pcDomain.split("//");
	wapDomains=wapDomain.split("//");
        if (pcDomain.indexOf(window.location.host)==-1)
        {
            window.location.href = window.location.href.replace(window.location.origin,pcDomain);//非主域名跳转
            //window.location.href = pcDomain+contentUrl;
            window.location,href(window.location.href.replace(window.location.origin,pcDomain));
        }

	if (wapJumpFlag === "1" ) {	//backFlag澧炲姞鍒ゆ柇锛屾棤WAP棣栭〉鏃舵墦寮€PC涓嶄細璺宠浆
	 if(backFlag==1){
		if(window.location.href.indexOf("channel") >0 || window.location.href.indexOf("content") >0){
		  if (pcDomains[1] != wapDomains[1] && (window.location.href.indexOf('f=pad')== -1)) {
			if (/Mobile/i.test(navigator.userAgent)) {
				try {
					var url = window.location.href.replace("https:","http:");
					url = url.replace(pcDomains[1], wapDomains[1]);
					window.location.href = url;
				} catch (e) {}
			}
		  }
		}
	    }else if((backFlag==0  || backFlag==null) || window.location.href.indexOf("channel") ==-1 || window.location.href.indexOf("content") ==-1){
		if (pcDomains[1] != wapDomains[1] && (window.location.href.indexOf('f=pad')== -1)) {
			if (/Mobile/i.test(navigator.userAgent)) {
				try {
					var url = window.location.href.replace("https:","http:");
					url = url.replace(pcDomains[1], wapDomains[1]);
					window.location.href = url;
				} catch (e) {}
			}
		}

	   }
	}


	console.log(pcltLogo);
	$('#pcltLogo').attr('src', pcltLogo);
	$('#pcrtLogo').attr('src', pcrtLogo);
	$('#pcbLogo').attr('src', pcbLogo);
	
	// pc版权信息
	 $("#copyright").html(pcCi);
	
	// 列表左上角logo
	$(".channelHeader").css("background", "url('" + pccLogo + "') left center no-repeat");

	var IEcode=IEVersion();//函数判断IE浏览器版本
	if(theme!=undefined){
		if(theme.indexOf("theme")>-1){
		//change theme
			if (theme) {
				loadTheme([theme]);
			} else {
				theme = "themeRed";
				loadTheme([theme]);
				console.log("config theme error");
			}
		}else{

			if(IEcode!=-1){
					//var theme="green";
					/**** 右侧排序颜色  ****/
					$(".aside_wrap ul li a span.prize,a.more").css("color",theme);
					/**** 顶部边颜色  ****/
					$(".nav-theme").css("border-top","2px solid "+theme);
					/**** 底边颜色  ****/
					$(".news_list_title,.news_list_tab .active, .friendship_link .title .active,.news_list_tab .active").css("border-bottom","2px solid "+theme);
					/**** 背景颜色  ****/
					$(".navbg,.group_carousel_label,ul.side-nav li.active, ul.side-nav li.active,.layui-laydate .layui-laydate-main .layui-this, .nfooter .about,.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus").css("background",theme);
					/*** hover访问颜色兼容  ***/
					$(".breadcrumb a,ul.news_list li a,ul.news-list li a,.aside_wrap ul li a,ul.list14h34 li a,.layui-laydate-footer span, .layui-laydate-header i,.layui-laydate-header span,.breadcrumb a, .nav-theme ul.menu li a,.news_list_ul li a").hover(function(){
					$(this).css("color",theme);
					},function(){
					$(this).css("color","");
					});

					/**** 背景颜色  ****/
					$(".dropdown-content a,ul.side-nav li,.readnext .readnex_detail a.btn,.pagination>.active>span,.foot_nav, .group_carousel .group_carousel_label,.nav ul.menu li").hover(function(){
					$(this).css("background","");
					},function(){
					$(this).css("background",theme);
					});

					/**** 底边框hover颜色  ****/
					$(".news_list_tab li").hover(function(){
					$(this).css("border-bottom","2px solid "+theme);
					},function(){
					$(this).css("border-bottom","");
					});
					/**** 边框颜色  ****/
					$(".readnext .readnex_detail a.btn,.pagination>.active>a,.pagination>.active>span").hover(function(){
					$(this).css("border-color","");
					},function(){
					$(this).css("border-color",theme);
					});
					$(".pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>span, .pagination>.active>span:focus").css("border-color",theme);

					$(".group_carousel_swiper .swiper_container .description").css("white-space","nowrap");
					$('.nav_title').append("<style>.nav_title:before{background:"+theme+"}</style>");
					//$(".nav").css("height","45px");

			}else{
					document.documentElement.style.setProperty('--theme-color',theme);
					$('#themeStyle').attr('href','//j.rednet.cn/site/static/theme/default.css');
			}


		}
	}

	// 详情逻辑
	if (typeof contentId != "undefined") {
		if (contentId) {
			// 百度自动推送
			baiduAutoPush();

			if (newsType != 3) {
				mutiVideoCheck();
			}

/**** 临时屏蔽  ***/
var local_kaifu=window.location.href.indexOf('kaifuxw.com');
if(local_kaifu==-1){

			// 点击量统计
			visitLogPc();

			if ($(".fav").length > 0) {
				// 获取当前稿件点赞数
				getContentUps();
				$(".fav").on('click', function() {
					addFav();
				});
			}

			// 阅读量
			showClicks();
}

		}
		
		// 阅读量
		
		
		
	}




	//百度统计
	 baiduTongji();

	
}

/****************************/








$(function() {


/**** 临时屏蔽  ***/
var local_kaifu=window.location.href.indexOf('kaifuxw.com');
if(local_kaifu==-1){


	/**
	 * 初始化
	 */
	initSite();
	
	topMenuFlex();


}


	$("#yearCode").html(new Date().getFullYear());
	//footScript();
});



/*********************************************/

function topMenuFlex(){
/************ 导航跟屏  **************/
if((typeof contentId)!= "undefined" && contentId!=""){

 window.addEventListener('scroll', function(){
    let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
    
    if(t>180){
        $('header.wrapper').addClass('box-active');
		$('header.wrapper .menu li').css('display','none');
		$('.block_1 h1').remove();
		$('header.wrapper #btn').remove();

		if($('.detail_title').html()){
			var detailTitle=$('.detail_title').html();
		}else if($('.box-left1 h1').html()){
			var detailTitle=$('.box-left1 h1').html();
		}else{
			var detailTitle=$('.box_left h1').html();
		}
        var t_p_var=Number($('header.wrapper .menu').css("padding-left").replace(/[^-\d\.]/g, ''))+15+"px";

		$('header.wrapper .menu').after("<h1 id='btn' style='position: absolute;left: "+t_p_var+";font-size: 20px;line-height: 45px;cursor: pointer;'>正在阅读："+detailTitle+"</h1>");
		$("#btn").click(function() {
			$('body,html').animate({
			  scrollTop: 0
			},
			500);
			return false;
		  });
    }else{
        $('header.wrapper').removeClass('box-active');
		$('.block_1 h1').remove();
		$('header.wrapper #btn').remove();
		$('header.wrapper .menu li').css('display','block');
    }

 })
}

//注释组图里的图片LOGO
if($('.tr_logo').length >0){
$('.tr_logo').css('display','none');
}
if(dlShare!=""){
    $.getScript("//j.rednet.cn/site/static/www/sharingfunction/js/share.getData.js");
}
}



/****  wap列表计算时间 ****/
//JS计算时间函数：
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

function getDateDiff(dateTimeStamp) {
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		//若日期不符则弹出窗口告之
		//alert("结束日期不能小于开始日期！");
	}
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	// if(monthC>=1){
	// result= parseInt(monthC) + "个月前";
	// }
	// else if(weekC>=1){
	// result= parseInt(weekC) + "周前";
	// }
	// else 
	if (dayC >= 1) {
		result = ""; //超过一天不显示时间
	} else if (hourC >= 1) {
		result = parseInt(hourC) + "小时前";
	} else if (minC >= 1) {
		result = parseInt(minC) + "分钟前";
	} else {
		result = "1分钟前";
	}

	return result;
}



// 获取IE版本
function IEVersion() {
    // 取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;
    // 判断是否为小于IE11的浏览器
    var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    // 判断是否为IE的Edge浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
    // 判断是否为IE11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isLessIE11) {
        var IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
        // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
        IEReg.test(userAgent);
        // 取正则表达式中第一个小括号里匹配到的值
        var IEVersionNum = parseFloat(RegExp['$1']);
        if (IEVersionNum === 7) {
            // IE7
            return 7
        } else if (IEVersionNum === 8) {
            // IE8
            return 8
        } else if (IEVersionNum === 9) {
            // IE9
            return 9
        } else if (IEVersionNum === 10) {
            // IE10
            return 10
        } else {
            // IE版本<7
            return 6
        }
    } else if (isEdge) {
        // edge
        return 'edge'
    } else if (isIE11) {
        // IE11
        return 11
    } else {
        // 不是ie浏览器
        return -1
    }
}
/************************************/
