//智能判断返回上一页
function GoBack() {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE  
        if (history.length > 0) {
            history.go(-1);
        } else {
            location.href = 'http://m.gog.cn/';
        }
    } else { //非IE浏览器  
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0) {
            if (history.length > 2) {
                history.go(-1);
            } else {
                location.href = 'http://m.gog.cn/';
            }
        } else {//未知的浏览器  
            if (history.length > 1) {
                history.go(-1);
            } else {
                location.href = 'http://m.gog.cn/';
            }
       	}
    }
}

//判断客户端浏览器是否为Safari浏览器
var ua=0;
window.onload=function(){	
	if(navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0){
		//ios系统
		if(navigator.userAgent.indexOf("Safari") > 0){
			if(navigator.userAgent.indexOf("Chrome") > 0){ ua=0;}
			else{
				if(navigator.userAgent.indexOf("MXiOS") > 0){ ua=0;}
				else{ 
					if(navigator.userAgent.indexOf("QQ") > 0){ ua=0;}
					else{
						//Safari浏览器						
						ua=1;
					} 
				}
			}
		}
		else{ ua=0;}
	}
	else if(navigator.userAgent.indexOf("Android") > 0){
		//android系统
		document.getElementById('up2home').innerHTML='<a href="http://221.236.21.155/dd.myapp.com/16891/62FC669CBB1B196A27D9D96551E66957.apk?mkey=5645598e5bf90ccf&f=2284&fsname=cn.com.gog_2.0.0.4_21.apk&asr=02f1&p=.apk">下载客户端</a>';
		ua=2;
	}
	else{
		//pc端
		document.getElementById('up2home').innerHTML='<a href="http://www.gog.cn">访问电脑版</a>';
		ua=3;
	} 
}

$(document).ready(function(){
	//自适应大小
	var w = $(window).width()>=736 ? 736 : $(window).width();
	$("html").css("width",w);
	$("html").css("font-size",w/64);
	$(".index_top").css("height",w/12.8);	
	$(".index_menu").css("height",w/12.8);
	$(".index_menu ul li").css("height",w/12.8);
	$(".index_menu ul li").css("line-height",w/12.8+"px");	
	$(".index_focus").css("height",w/2);
	$("#ifocus_menu ul li").css("width",w/30);
	$("#ifocus_menu ul li").css("height",w/30);
	$("#ifocus_menu ul li").css("margin-left",w/40);
	$(".index_news ul li").css("height",w/6.4);
	$(".index_news ul li img").css("width",w/4.3);
	$(".index_news .pic img").css("width",0.43*w);
	$(".index_news ul li h5").css("height",w/10);
	$(".index_news ul li h5").css("line-height",w/20+"px");	
	$(".column_headline").css("height",w/4.3);
	$(".column_headline img").css("width",w/3);
	$(".column_headline p").css("line-height",w/20+"px");	
	$(".index_video p").css("margin-top",w/6);
	$(".column_pics p").css("margin-top",w/6);
	$(".top").css("height",w/7.3);
	$(".menu").css("height",w/5);
	$(".menu ul li").css("height",w/15);
	$(".menu ul li").css("line-height",w/15+"px");
	
	//首页更多菜单
	$(".itop_more").click(function(){ 
		if($("#menu_more").is(":hidden")){
			$("#menu_more").show();
			$(".index_menu").animate({height:w/4.3});
		}
		else{
			$("#menu_more").hide();
			$(".index_menu").animate({height:w/6.4});			
		}
	});
	
	//文章页、栏目页更多菜单
	$(".top_more").click(function(){ 
		$(".menu").slideToggle();
	});

	//焦点图代码
	$("#ifocus_menu ul li").click(function(){ 
		$(this).addClass("selected").siblings().removeClass("selected");
		var i = $("#ifocus_menu ul li").index(this);
		$("#ifocus_box ul li").eq(i).fadeIn("slow").siblings().hide();
	});
	function foucs(){  
    	var i = $("#ifocus_menu ul .selected").index()+1;
		if(i>=4){i = 0}
		$("#ifocus_menu ul li").eq(i).addClass("selected").siblings().removeClass("selected");
		$("#ifocus_box ul li").eq(i).fadeIn("slow").siblings().hide();
  	}  
  	$(function(){	
    	var auto_foucs=setInterval(foucs,3000)
    	$(".index_focus").hover(function(){clearInterval(auto_foucs);},function(){auto_foucs=setInterval(foucs,3000);});
  	});
	
	//横竖屏监听
	$(window).resize(function() {
  		if($(window).width()!=w){
			location=location;
		}
	});
	
	//回到顶部
	$(window).scroll(function(){ 
    	var y_height = document.documentElement.scrollTop + document.body.scrollTop; 
   		if( y_height > 300 ){ 
        	$("#uphome img").show(); 
        }
    	else{
        	$("#uphome img").hide();
        }
  	});
    $("#uphome img").click(function(){
    	$("body,html").animate({scrollTop:0},1000); 
		return false; 
    }); 
	
	//市州联播切换
	$("#szlb_menu ul li").click(function(){
		if($(this).hasClass("select")){
			$(this).removeClass("select");  
			$("#szlb_show>ul>li").eq(0).fadeIn("slow").siblings().hide();
		}
		else{										 
    		$(this).addClass("select").siblings().removeClass("select");  //当前<li>元素高亮，去掉其它同辈<li>元素的高亮
			var szlb_i = $("#szlb_menu ul li").index(this)+1;  // 获取当前点击的<li>元素在全部li元素中的索引。
			$("#szlb_show>ul>li").eq(szlb_i).fadeIn("slow").siblings().hide(); //显示 <li>元素对应的<div>元素，隐藏其它几个同辈的<div>元素
		}
  	});
	
	//放到桌面
	$("#up2home").click(function(){
		if(ua==1){
			$("#u2h_show").show().delay(3000).hide(0);			
		}
		else if(ua==0){
			alert("您目前使用的第三方浏览器不支持该功能，请使用ios自带的Safari浏览器访问。");
		}
	});	
});