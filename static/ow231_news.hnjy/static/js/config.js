var VIDEOFILEID = (window.location.href.indexOf("onlyred") > 0 ? "1400080256" : "1400085894");
var APIURL = (window.location.href.indexOf("172.16.6.2") > 0 ? "//172.16.6.49:8080" : "https://front-web.rednet.cn");




//fav data Verification
Number.prototype.isInteger = function(global) {
	var floor = Math.floor,
		isFinite = global.isFinite;

	Object.defineProperty(Number, 'isInteger', {
		value: function isInteger(value) {
			return typeof value === 'number' &&
				isFinite(value) &&
				floor(value) === value;
		},
		configurable: true,
		enumerable: false,
		writable: true
	});
};

//写cookies
function setCookie(name, value) {
	var Days = 1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//读取wap cookies
function getCookie_wap(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function shareTo(type, tle) {
	var a = "height=540,width=720, top = " + (window.screen.height - 540) / 2 + ", left = " + (window.screen.width - 720) /
		2 + ", toolbar=no,menubar=no,resizable=yes,location=yes,status=no",
		url = encodeURIComponent(window.location.href),
		title = encodeURIComponent(tle);
	if (type == 'WB') {
		var i = "http://service.weibo.com/share/share.php?url=" + url + "&appkey=&title=" + title +
			"&pic=&ralateUid=&language=&searchPic=" + !1;
		window.open(i, "shareWB", a);
	} else if (type == 'QQ') {
		var n = "http://connect.qq.com/widget/shareqq/index.html?url=" + url + "&showcount=0&desc=" + title +
			"&summary=&title=" + title + "&pics=&style=203&width=19&height=22";
		window.open(n, "shareQQ", a)
	}
}

function addFav() {
	setCookie(ckie, contentId + '-fav-' + new Date().getTime());
	$.ajax({
		type: "put",
		url: APIURL + "/content/star/" + contentId,
		data: {
			'cookieUUID': getCookie(ckie)
		},
		dataType: 'text',
		success: function(data) {
			//$(".starCount").html(data);
			var tmpData = $(".starCount").html();
			$(".starCount").html(Number(tmpData) + 1);
		}
	});
}

function addFavs() {
	addFav();
}



var tokenbaidu;

$(function() {

	if (window.siteId) {

		/*默认terminal不设置值时为 1 ，*/
		if(typeof terminal!=='undefined'  && terminal!=1){
			terminal = 2;
		}else{
			terminal = 1;
		}
		/*加载百度统计代码*/
		$.ajax({
			//请求方式
			type: "GET",
			//请求的媒体类型
			contentType: "application/json;charset=UTF-8",
			//请求地址
			url: APIURL + "/site-baidu-token/get-token?siteId=" + siteId + "&terminal="+terminal,
			//请求成功
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
		
		pcJumpWap();
		/*百度统计结束*/
	}else{
		console.log("----------------- error --------------------");
		console.log("site is undefined");
		console.log("--------------------------------------------");
	}



	// try {
	// 	var qmCustomJsUrl = "//j.rednet.cn/site/static/www/filter/custom2.js"
	// 	console.log("______________________________try it______________________________");

	// 	if (typeof getScript === "function") {
	// 		getScript(qmCustomJsUrl, function() {
	// 			console.log("filter custom ok");
	// 			qmSetHeadStyle();
	// 		});
	// 		console.log("______________________________一帆风顺______________________________");

	// 	} else {
	// 		console.log("______________________________小插曲来了______________________________");

	// 		function getScript(url, success) {
	// 			var script = document.createElement('script');
	// 			script.src = url;
	// 			var head = document.getElementsByTagName('head')[0],
	// 				done = false;
	// 			script.onload = script.onreadystatechange = function() {
	// 				if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
	// 					done = true;
	// 					success();
	// 					script.onload = script.onreadystatechange = null;
	// 					head.removeChild(script);
	// 					return this
	// 				}
	// 			};
	// 			head.appendChild(script)
	// 		};
	// 		getScript(qmCustomJsUrl, function() {
	// 			console.log("filter custom ok");
	// 			qmSetHeadStyle();
	// 		});
	// 	}
	// 	console.log("______________________________try done______________________________");

	// } catch (e) {
	// 	console.log("______________________________滤镜无法加载______________________________");
	// 	console.log(e);
	// }

//吸顶函数
topMenuFlex();

//注释组图里的图片LOGO
if($('.tr_logo').length >0){
$('.tr_logo').css('display','none');
}

$.getScript("//j.rednet.cn/site/static/www/sharingfunction/js/share.getData.js");

});


function pcJumpWap(){
	
		
		
		/*WAP访问PC*/
		$.ajax({
			type: "get",
			url: APIURL + "/site/" + siteId,
			success: function(data) {
				var siteChannel = "channel";
				var siteContent = "content";
				if (data.mDomain.indexOf('-wap') >= 0) {
					var siteM = data.mDomain + "/";
				} else {
					var siteM = data.mDomain + "/m/";
				}
				var siteHref = window.location.href;
				var channel = siteHref.indexOf(siteChannel);
				var content = siteHref.indexOf(siteContent);
				// console.log(siteM);
				// console.log(siteHref);
				if (channel >= 0 || content >= 0) {
					console.log(window.location.host);
				} else {
					if (siteHref == siteM) {

						//$("footer").replaceAll('<div style="padding-bottom:1.3rem;"><div class="entrance" style="margin-top:20px; color:#000; font-weight:bold;display:none;"><a style="color: #f93e4d;" <#--href="'+data.mDomain+'"-->>触屏版</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+data.pcDomain+'?mobile&f=pad">电脑版</a></div>'+$("footer").prop("outerHTML")+'</div>');

						var footerdis = $("footer").css("display");
						if (footerdis == "flex") {
							$("footer").replaceWith(
								'<div class="mains"><div class="entrance" style="margin-top:20px; color:#000; font-weight:bold;"><a style="color: #f93e4d;" >触屏版</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="' +
								data.pcDomain + '?mobile&f=pad">电脑版</a></div>' + $("footer").prop("outerHTML") + '</div>');
						} else {
							$("footer").replaceWith(
								'<div class="mains" style="padding-bottom:1.3rem;"><div class="entrance" style="margin-top:20px; color:#000; font-weight:bold;"><a style="color: #f93e4d;" >触屏版</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="' +
								data.pcDomain + '?mobile&f=pad">电脑版</a></div>' + $("footer").prop("outerHTML") + '</div>');
						}
						$(".separate").css("height", "0.2rem");
						$(".main").css("padding-bottom", "0");
					} else if ((siteHref.indexOf('?mobile') != -1) || (siteHref.indexOf('f=pad') != -1)) {
						var bodyBlock = $(".block").css("width");
						$("body").css("width", bodyBlock);
					}
				}


			}
		});
	
}



/**********  吸顶跟屏 ***********/
function topMenuFlex(){
/************ 导航跟屏  **************/
if((typeof contentId)!= "undefined" && contentId!="" && siteId!="6"){

 window.addEventListener('scroll', function(){
    let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
    
if ( $("header").length > 0 ) {
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
}

 })
}


}


 var vipw = window.screen.availWidth;  // 自动获取设备宽
 var vw = vipw - 10;                  // 减去10 让页面显示两边有少量空白
 var sw = 1280;                      // 这里是页面宽 根据设计需要调整
 var vcw = vw/sw;
 var wcv = sw/vw;
 document.write("<meta name='viewport' content='width="+ vw +",initial-scale="+vcw +",target-densitydpi=device-dpi,minimum-scale="+vcw+",maximum-scale="+wcv+",user-scalable="+wcv+"' />");
// 动态自适应手机端宽;











/**********  详情图片放大展示效果 ***********/
$(function(){
	$(".detail_article_content").after('<div id="outerdiv" style="position:fixed;top:0;left:0;background:rgba(0,0,0,0.5);z-index:99;width:100%;height:100%;display:none;"><div id="innerdiv" style="width: 100%;text-align: center;  display:table-cell;vertical-align:middle;align-self: center;"><img id="bigimg" src="" /></div></div>');
	$(".detail_article_content img").click(function(){  
		var _this = $(this);//将当前的pimg元素作为_this传入函数  
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);  
	});
});  

function zoomImg(o){
	var zoom = parseInt(o.style.zoom, 10) || 100;//console.log(2000, zoom, o.style.zoom);
	zoom += event.wheelDelta / 5;
	if(zoom > 30) o.style.zoom = zoom + "%";
}

function imgShow(outerdiv, innerdiv, bigimg, _this){
	var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
	$(bigimg).attr("src", src);//设置#bigimg元素的src属性  
  
		/*获取当前点击图片的真实大小，并显示弹出层及大图*/  
	$("<img/>").attr("src", src).load(function(){  
		var windowW = $(window).width();//获取当前窗口宽度  
		var windowH = $(window).height();//获取当前窗口高度  
		var realWidth = this.width;//获取图片真实宽度  
		var realHeight = this.height;//获取图片真实高度  
		var imgWidth, imgHeight;  
		var scale = 0.5;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
		  
		if(realHeight>windowH*scale) {//判断图片高度  
			imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放  
			imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度  
			if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度  
				imgWidth = windowW*scale;//再对宽度进行缩放  
			}  
		} else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度  
			imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放  
						imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度  
		} else {//如果图片真实高度和宽度都符合要求，高宽不变  
			imgWidth = realWidth;  
			imgHeight = realHeight;  
		}  
				$(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
		  
		var w = '';//(windowW-imgWidth)/2;//计算图片与窗口左边距  
		var h = (windowH-imgHeight)/3;//计算图片与窗口上边距  
		$(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性  
		$(outerdiv).css({"display":"flex"});//设置#innerdiv的top和left属性  
		$(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
		
		$("#innerdiv img").bind("mousewheel",
		function(){
			zoomImg(this);
			return false;
		});
	});  
	  
	  
	$(outerdiv).click(function(){//再次点击淡出消失弹出层  
		$(this).fadeOut("fast");  
		zoom = '';
	});  
}