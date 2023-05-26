$(function(){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
		//如果是手机端，则不进行相关操作
		return;
	}
	var isSmall = (document.body.clientWidth < 1200);;//是否小于1200px
	var myEfficientFn = debounce(function() {
		if(isSmall){//小屏幕不进行操作
			return;
		}
	    // 滚动中的真正的操作
	    var scrollTop = $(window).scrollTop();
		if(!isHeaderFixed&&scrollTop>120){
		  	$("#header").css({"position":"absolute","width":"100%"});
		  	$(".NewsCenter.contentPage").css({"padding-top":"95px"});
		    $("#header").animate({"top":scrollTop+"px"},300,function(){
		    	$("#header").css({"position":"fixed","top":"0px","z-index":99});
		    });
		    $("#header .navbar-brand").animate({"top":"100px"},300);
		    $("#header .subNav").animate({"top":"100px"},300);
		    isHeaderFixed = true;
		}
		if(isHeaderFixed&&scrollTop<120){
		    $("#header").removeAttr("style");
		    $(".NewsCenter.contentPage").css({"padding-top":"0px"});
//		    $("#header .logo").removeAttr("style");
//		    $("#header .subNav").removeAttr("style");
		    $("#header .navbar-brand").animate({"top":"190px"},300);
		    $("#header .subNav").animate({"top":"190px"},300);
		    isHeaderFixed = false;
		}
	}, 500);

	window.addEventListener("resize",function(){
		isSmall = (document.body.clientWidth <= 1200);
		if(isSmall){
			resetStyle();
			window.removeEventListener("scroll",myEfficientFn);
		}else{
			window.addEventListener('scroll', myEfficientFn);
		}
	})
	if(isSmall){
		return;
	}else{
		// 绑定监听
		window.addEventListener('scroll', myEfficientFn);
	}
	console.log(document.referrer);
	//根据面包屑设置当前所在频道选中样式
	var currentChannelName = $(".crumbNav a:last-child").text();
	console.log(currentChannelName);
	var channelArray = $(".subNav li");
	var channelArrayLength = channelArray.size();
	for(let i = 0; i < channelArrayLength; i++){
		
		if(channelArray.eq(i).text().indexOf(currentChannelName) !== -1){
			channelArray.eq(i).addClass("active");
		}
	}

	var dateObj=new Date();
	var newsCenterPageYear,newsCenterMonth,newsCenterDays;
//	hour=dateObj.getHours();
//	if(dateObj.getDay()==0)day='星期日'
	dateStr=(dateObj.getFullYear())+'年'+(dateObj.getMonth() + 1 )+'月'+dateObj.getDate()+'日';
	newsCenterPageYear = dateObj.getFullYear();
	if((dateObj.getMonth()+1)<10){
		newsCenterMonth = "0"+(dateObj.getMonth()+1);
	}else{
		newsCenterMonth = dateObj.getMonth()+1;
	}
	if(dateObj.getDate()<10){
		newsCenterDays = "0"+dateObj.getDate();
	}else{
		newsCenterDays = dateObj.getDate();
	}
	//显示日期
	$("<div class='calendar'><div class='year'><span>"+newsCenterPageYear+"</span></div><div class='days'>"+newsCenterMonth+"/"+newsCenterDays+"</div></div>")
	.appendTo($(".NewsCenter.contentPage .header .subNav"));

	//将内容页图片设置为懒加载
if(typeof $("img.lazyload").lazyload == "function"){
    $(".contentPage img").each(function(){
        $(this).addClass("lazyload");
        var srcStr = $(this).attr("src");
        $(this).attr("data-src",srcStr);
        $(this).removeAttr("src");
    });
    $("img.lazyload").lazyload();
}

	var isHeaderFixed = false;
	// 防抖动函数
	function debounce(func, wait, immediate) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};
	 
	//将设置动画的元素重置
	 function resetStyle(){
		$("#header .subNav").removeAttr("style");
		$("#header").removeAttr("style");
		$(".NewsCenter.contentPage").removeAttr("style");
	 }
	
});
//如果存在音频，则进行初始化
		if($(".article audio").length){
//$(".article audio").each(function(){$(this).css("display","none")});
			//存在audio标签
			 audiojs.events.ready(function() { 
		        audiojs.createAll();
		      });
		}