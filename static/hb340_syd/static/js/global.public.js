//全网自定义脚本
$(function(){

if(location.href.indexOf("ztzl.") != -1){
	//专题专栏下，不动态显示图片
	$(".newsList.imgNews.dynamic .newsItem").each(function(){
			$(this).addClass("hidenImg");
	});
}else{
	//动态设置图片新闻列表样式
	$(".newsList.imgNews.dynamic .newsItem").each(function(){
		var srcStr = $(this).find("img").attr("src");
		if(srcStr == ""){
			$(this).addClass("hidenImg");

			var domAbs = $(this).find(".abs");
			if(domAbs.find("a").html() == ""){
				domAbs.css({"display":"none"});
			}
		}

	});
}
	//根据当前的url设置设置页脚#change_view_model的连接
	var fromUrl = document.referrer;
	var currentUrl = location.href;
	var pcModelParam = "viewmodel=pc";
	var pcRegp = /\?viewmodel=pc|&viewmodel=pc/;
	var isPcModel = false;//是否按照PC模式显示
	var changeModelBtn = $("#change_view_model");
	var isChannelListPageRegp = /c\d{19}_\d{9}/;

	if(isChannelListPageRegp.test(currentUrl)&&pcRegp.test(fromUrl)){//熔断
		//列表页使用js进行跳转，无法监控click，故判断当前连接
		isPcModel = true;
	}else{
		isPcModel = pcRegp.test(currentUrl);
	}
	
	var globalHFCSSRegp = /(global\.header\.footer)(\.css)$/;
	var channelHeaderCssRegp = /(header)(\.css)/;
	var indexCSSRegp = /(index)(\.css)$/;
	var columnCSSRegp = /(column)(\.css)$/;
	var contentCSSRegp = /(content)(\.css)$/;
	var pcCSSRegp = /(\.pc)(\.css)$/;
	
	if(isPcModel){//当前是在PC模式
		console.log("当前为PC模式");
		//1.将changeModelBtn的连接替换连接为自适应的
		var newUrl = currentUrl.replace(pcRegp,"");
		if(changeModelBtn.length){
			changeModelBtn.attr("href",newUrl).find("span").text("移动");			
		}
		//2.监控当前页面内的a
		$("a:not([id])").click(function(e){
			e.preventDefault();
			var requestUrl = getPcUrlString($(this).attr("href"));
			window.open(requestUrl,"_blank");
		});
		//可缩放
		$("meta[name=viewport]").attr("content","width=device-width ,initial-scale=0.25 ,maximum-scale=4 ,minimum-scale=0.25 ,user-scalable=yes ,viewport-fit=cover");
		//将header,index替换
		$("link").each(function(){
			var href = $(this).attr("href");
			
			if(globalHFCSSRegp.test(href)){
				var newHref = href.replace(globalHFCSSRegp,"$1.pc$2");
				$(this).attr("href",newHref);
			}else if(channelHeaderCssRegp.test(href)){
				//只有首页和新闻中心才替换header
				if(/www\.syd\.com\.cn|news\.syd\.com\.cn|ecucation\.syd\.com\.cn/.test(currentUrl)){
					var newHref = href.replace(channelHeaderCssRegp,"$1.pc$2");
					$(this).attr("href",newHref);
					
				}
			}else if(indexCSSRegp.test(href)){
				var newHref = href.replace(indexCSSRegp,"$1.pc$2");
				$(this).attr("href",newHref);
			}else if(columnCSSRegp.test(href)){
				var newHref = href.replace(columnCSSRegp,"$1.pc$2");
				$(this).attr("href",newHref);
			}else if(contentCSSRegp.test(href)){
				var newHref = href.replace(contentCSSRegp,"$1.pc$2");
				$(this).attr("href",newHref);
			}
		});
	}else{//自适应模式
		console.log("当前为Mobile模式");
		$("link").each(function(){
			var href = $(this).attr("href");
			
			if(pcCSSRegp.test(href)){
				var newHref = href.replace(globalHFCSSRegp,"$2");
				$(this).attr("href",newHref);
			}
		});
		var pcUrl = getPcUrlString(currentUrl);
		if(changeModelBtn.length){
			changeModelBtn.attr("href",pcUrl).find("span").text("电脑");			
		}
	}
	/*根据当前url获取pc端的连接地址*/
	function getPcUrlString(url){
		var pcUrl = "";
		if(/html$|syd.com.cn$/.test(url)){
			pcUrl = url+"?"+pcModelParam;
		}else if(/html\/$|syd.com.cn\/$/.test(url)){
			pcUrl = url.substr(0,(url.length-1))+"?"+pcModelParam;
		}else if(/html\?$|syd.com.cn\?$/.test(url)){
			pcUrl = url+pcModelParam;
		}else if(url.indexOf("epaper") != -1){//前往数字报
			pcUrl = url;
		}else{
			pcUrl = url+"&"+pcModelParam;
		}
		return pcUrl;
	}
	//publicSidebar滚动新闻动态设置
	var publicSiderbar = $(".publicSidebar").eq(0);
	if(publicSiderbar.get(0) != undefined){
		//获取滚动新闻
		var scrollNewsList = publicSiderbar.find(".titleNewsList").eq(0);
		rollNewsStart(scrollNewsList,5);
//		rollNewsStart2(".publicSidebar .titleNewsList",5)
	}
});
/*滚动新闻函数*/	
function rollNewsStart2(scrollNewsList,showNum,intervalTime){
	(function(scrollNewsList,showNum,intervalTime){
		var defaultShowNum = showNum || 1;
		var autoPlay = intervalTime || 5000;
		 var swiper = new Swiper(scrollNewsList, {
	        autoplay: autoPlay,
	        loop: true,
	        paginationClickable: true,
	        slidesPerView:defaultShowNum,
	        direction: 'vertical'
	    });
	    $(scrollNewsList).mouseenter(function() {
		    swiper.stopAutoplay();
		}).mouseleave(function() {
		    swiper.startAutoplay();
		});
	})(scrollNewsList,showNum,intervalTime);
}
function rollNewsStart(scrollNewsList,showNum,intervalTime){

	//var scrollNewsList = publicSiderbar.find(".titleNewsList").eq(0);
	
	var scrollNewsLiArray = scrollNewsList.find("li");
	var scrollNewsFirstLi = scrollNewsLiArray.eq(0);
	var intervalTime = intervalTime || 2500;//移动间隔时间
	var scrollNewsShowNums = showNum || 5;
	var scrollNewsLength = Math.floor(scrollNewsLiArray.length);
	var scrollNewsLiHeight = scrollNewsLiArray.eq(0).height();
	var animateNums = 0;
	console.log("liHeight="+scrollNewsLiHeight+",scrollNewsShowNums="+scrollNewsShowNums);
	scrollNewsList.css({
		"height": scrollNewsLiHeight*scrollNewsShowNums +"px",
		"overflow" : "hidden"
	});
	scrollNewsLiArray.clone().appendTo(scrollNewsList);
	scrollNewsList.hover(function(){
		clearTimeout(scrollNewsTimeOut)
	},function(){
		scrollNewsBegin()
	})
	var scrollNewsTimeOut;
	function scrollNewsBegin(){
		animateNums += 1;
		scrollNewsFirstLi.animate({
			"margin-top": animateNums*(-scrollNewsLiHeight)+"px"
		},700,function(){
			if(animateNums >= scrollNewsLength){
				scrollNewsFirstLi.css("margin-top","0px");
				animateNums = 0;
			}
		});
		scrollNewsTimeOut = setTimeout(scrollNewsBegin,intervalTime);
	}
	scrollNewsBegin();
}
if(document.addEventListener){
	window.addEventListener('load',shareWX,false);
}else{
	window.attachEvent('onload',shareWX);
}

function shareWX(){
//执行wx分享
var shareTitle = document.title;
	var ShareDesc = document.title;
	var shareUrl = location.href;
	var shareImgUrl='https://www.syd.com.cn/index_node/images/syd.global.wxShare.logo.120.jpg';
	
	wx.ready(function (){
		wx.onMenuShareAppMessage({
		    title: shareTitle,
		    desc: ShareDesc,
		    link: shareUrl,
		    imgUrl:shareImgUrl,
		    trigger: function (res) {
		    },
		    success: function (res) {
	            console.log("success");
		    },
		    cancel: function (res) {
	            console.log("cancel");
		    },
		    fail: function (res) {
	            console.log("fail");
		    }
		});
	    wx.onMenuShareTimeline({
		    title: shareTitle,
		    desc: ShareDesc,
		    link: shareUrl,
		    imgUrl:shareImgUrl, 
		    success: function () { 
		        // 用户确认分享后执行的回调函数
	            console.log("success");
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
	               console.log("cancel");
		    }
		   });
		wx.onMenuShareQQ({
	    	title: shareTitle, 
	    	desc: ShareDesc, 
	    	link: shareUrl, 
	    	imgUrl:shareImgUrl, // 分享图标
	    	success: function () { 
	    	   // 用户确认分享后执行的回调函数
	            console.log("success");
	    	},
		
	    	cancel: function () { 
	    	   // 用户取消分享后执行的回调函数
	            console.log("cancel");
	    	}
		});
		wx.onMenuShareQZone({
	    	title: shareTitle, // 分享标题
	    	desc: ShareDesc, // 分享描述
	    	link: shareUrl,// 分享链接
	    	imgUrl:shareImgUrl, // 分享图标
	    	success: function () { 
	       		// 用户确认分享后执行的回调函数
	            console.log("success");
	    	},
	    	cancel: function () { 
	        	// 用户取消分享后执行的回调函数
	            console.log("cancel");
	    	}
		});
	});
}