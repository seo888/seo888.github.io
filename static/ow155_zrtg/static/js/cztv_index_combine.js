var cztv_width;
var sl = 0;
var can = 1;
$(function(){
	navActive();
	//navActive2();
	$(window).resize(navActive)
	slideBox();
	sec3Timebar();
	secTxt();
	pageSlideImg();
	brandsTab();
	toTop();
	scrollfun();

	cztv_width = $(window).width();

	var jdt_ind = 0,jdt_len=$(".con-slider li").length,flag=true,flag2=true,isclickPermit=true;
	var ele_last = $(".con-slider li").eq(jdt_len-1);
	var ul = $(".con-slider");

	/***********判断导航栏显示层级开始*********/
	function GetRequest() { 
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object(); 
		if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
		theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); 
		} 
		} 

		return theRequest; 
	} 
	var Request = new Object(); 
	Request = GetRequest(); 
	var value;
	cengjiOne = Request['one']; 
	cengjiTwo = Request['two']; 

	/***********判断导航栏显示层级结束*********/
	
	
	$("#firstpane .menu_body:eq("+cengjiOne+")").show().addClass("current").find("a:eq("+cengjiTwo+")").addClass("liBingo");
	
	$(".menu_head"+cengjiOne).find('.imgNo').show();
	if(cengjiOne != undefined && cengjiTwo != undefined){
		if(cengjiOne == 0){			
			$(".xian").animate({"height":900 },300)			
		}else if(cengjiOne == 1){
			$(".xian").animate({"height": 750 },300)			
		}else if(cengjiOne == 2){			
			$(".xian").animate({"height": 500 },300)			
		}else if(cengjiOne == 3){			
			$(".xian").animate({"height": 730 },300)			
		}else if(cengjiOne == 4){			
			$(".xian").animate({"height":550 },300)			
		}else if(cengjiOne == 5){			
			$(".xian").animate({"height":710 },300)			
		}	
	}else{		
		$(".xian").animate({"height":450 },300)
	}
	
	if($(".content-right2") != undefined && $(".content-right2").find("img").length == 0 ){
		$(".content-right2").css({"padding-top":"70px"})
	}

	//通知公告滚动播报
	tzggfun();
})

function tzggfun(){
	// console.log(111)
	// var _hei = $(".tzgg li").height()*$(".tzgg li").length;
	// var _hei2=$(".sec-txt").height();
	// $(".tzgg").stop().animate({"top":-_hei},10000,function(){
	// 	var item = $(".tzgg").clone(true);
	// 	$(".tzgg").remove();
	// 	$(".sec1-right .sec-txt").append(item);
	// 	$(".tzgg").css("top",_hei2);

	// 	tzggfun();
	// })

	var _hei = $(".tzgg li").height();
	setInterval(function(){
		$(".tzgg").animate({"top":-_hei*5},function(){
			var item1 = $(".tzgg li").eq(0).clone(true);
			var item2 = $(".tzgg li").eq(1).clone(true);
			var item3 = $(".tzgg li").eq(2).clone(true);
			var item4 = $(".tzgg li").eq(3).clone(true);
			var item5 = $(".tzgg li").eq(4).clone(true);
			$(".tzgg li").eq(0).remove();
			$(".tzgg li").eq(0).remove();
			$(".tzgg li").eq(0).remove();
			$(".tzgg li").eq(0).remove();
			$(".tzgg li").eq(0).remove();
			$(".tzgg").append(item1).append(item2).append(item3).append(item4).append(item5).css("top",0);
		})
	},2000)	

	//setTimeout(function(){tzggfun()},3000)
}

function navActive(){
	var imgw=1050;
	var w=$(window).width();
	var navliW=$(".main-nav li.active").width();
	var l=$(".main-nav li.active").offset().left;
	$(".nav-active-bar").width(navliW);
	$(".nav-active-bar").css({left:l})

	var len=$(".con-slider li").length;
	//$(".cztv-slideBox ul li:first,.slideBox-leftBtn").css({marginLeft:(w-1050)/2})
	$(".con-slider,.slideBox-leftBtn").css({marginLeft:(w-imgw)/2})
	$(".slideBox-rightBtn").css({marginLeft:1000 + (w-imgw)/2})
	$(".cztv-slideBox ul").css({marginLeft:-imgw+(w-imgw)/2})
	//$(".cztv-slideBox ul li:last").css({marginLeft:-len*1050})
	$(".slideBox-leftSec").css({marginLeft:-(imgw-(w-imgw)/2)})
	$(".slideBox-rightSec").css({marginLeft:imgw+(w-imgw)/2})
	$(".cztv-slideBox-d").css({right:(w-imgw)/2+5});
	var res = GetRequest();
    	if(res['a']!='pc'){
    		var ua=navigator.userAgent.toLowerCase();
    		var contains=function (a, b) {
    			if(a.indexOf(b)!=-1){return true;}
    		};
    		var toMobileVertion = function(){
				$('.slideBox-leftSec,.slideBox-rightSec,.page-slideBox-rightSec,.page-slideBox-leftSec').hide();
				$('.hosts-list').css('width','1050px');
				$('.hosts-list-box-li').css('width','200px');
				$('.cztv-slideBox-d').css('right','5px');
				$('.hosts-content ul li').css('margin-left','32px');
				$('.slideBox-rightBtn').css('margin-left','1000px');
				$('.slideBox-leftBtn').css('margin-left','0');
				$(".cztv-slideBox ul").css('margin-left','-1050px');
				$(".cztv-slideBox").css('overflow','hidden');
    			//window.location.href = 'http://i.cztv.com/view/<?php echo $data['maindata']['id']?>.html';
    		};
    		if(contains(ua,"ipad")||(contains(ua,"rv:1.2.3.4"))||(contains(ua,"0.0.0.0"))||(contains(ua,"8.0.552.237"))){return false;}
    		if((contains(ua,"android") && contains(ua,"mobile"))||(contains(ua,"android") && contains(ua,"mozilla")) ||(contains(ua,"android") && contains(ua,"opera"))  	||contains(ua,"ucweb7")||contains(ua,"iphone")){toMobileVertion();}
    	}

    function GetRequest() {
    	var url = location.search;
    	var theRequest = new Object();
    	if (url.indexOf("?") != -1) {
    		var str = url.substr(1);
    		strs = str.split("&");
    		for(var i = 0; i < strs.length; i ++) {
    			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    		}
    	}
    	return theRequest;
    }
}

function slideBox(){	//焦点图
	var imgw=1050;
	$.each($(".con-slider li"),function(){
		var index=$(this).index();
		$(this).addClass("cztv-slideBox-list"+index)
	})
	$(".con-slider li:last").prependTo(".con-slider");
	var w=$(window).width();
	$(".cztv-slideBox").on("click",".slideBox-rightBtn",function(){
		rightSlide();
	})

	function rightSlide(){
		if(!$(".cztv-slideBox li").is(":animated")){
			var oldp=$(".cztv-slideBox-d span.active").index();
			var newp=$(".cztv-slideBox-d span.active").next().index();
			if(oldp==$(".cztv-slideBox-d span").length-1){
				newp=0;
			}

			$(".cztv-slideBox li:first").animate({marginLeft:-imgw+"px"},function(){
				$(this).appendTo(".cztv-slideBox ul").css({marginLeft:0});
				$(".cztv-slideBox-d span").eq(oldp).removeClass("active");
				$(".cztv-slideBox-d span").eq(newp).addClass("active");
			})
		}
	}
	/* var auto=setInterval(function(){rightSlide()},5000);
	$(".cztv-slideBox").mouseenter(function(){
		clearInterval(auto)
	})
	$(".cztv-slideBox").mouseleave(function(){
		auto=setInterval(function(){rightSlide()},5000);
	}) */

	$(".cztv-slideBox").on("click",".slideBox-leftBtn",function(){
		if(!$(".cztv-slideBox li").is(":animated")){
			var oldp=$(".cztv-slideBox-d span.active").index();
			var newp=$(".cztv-slideBox-d span.active").prev().index();
			if(oldp==0){
				newp=$(".cztv-slideBox-d span").length-1;
			}

			$(".cztv-slideBox li:last").css({marginLeft:-imgw+"px"}).prependTo(".cztv-slideBox ul").animate({marginLeft:0},function(){
				$(".cztv-slideBox-d span").eq(oldp).removeClass("active");
				$(".cztv-slideBox-d span").eq(newp).addClass("active");
			})

		}
	})
	$(".cztv-slideBox-d").on("mouseenter","span",function(){
		if(!$(".cztv-slideBox li").is(":animated")){	//判断有没有li还在进行动画
			var newp=$(this).index();
			var oldp=$(".cztv-slideBox-d span.active").index();
			$(this).addClass("active").siblings().removeClass("active")
			var len=$(".cztv-slideBox-list"+newp).prevAll().length-1;

			if(newp>oldp){
				if(len<0){
					$(".cztv-slideBox li:last").css({marginLeft:-imgw+"px"}).prependTo(".con-slider");
					$(".cztv-slideBox li:first").animate({marginLeft:"0"})
				}
				for(var i=0;i<len;i++){
					$(".cztv-slideBox li").eq(i).animate({marginLeft:-imgw+"px"},function(){
						$(this).appendTo(".con-slider").css({marginLeft:0})
					})
				}
			}
			
			else{
				var liLen=$(".cztv-slideBox li").length;
				if((oldp-newp)>liLen-2){
					$(".cztv-slideBox li:first").animate({marginLeft:-imgw+"px"},function(){
						$(this).appendTo(".con-slider").css({marginLeft:0})
					})
				}else{
					len=oldp-newp;
					for(var i=0;i<len;i++){
						$(".cztv-slideBox li:last").css({marginLeft:-imgw+"px"}).prependTo(".con-slider").animate({marginLeft:0})
					}
				}
			}
		}
	})
}


$('.page-ul li').click(function(){
	$('.page-li').removeClass('bingo');
	$(this).addClass('bingo');
})

$('.noticePage-ul li').click(function(){
	$('.noticePage-li').removeClass('noticePage-bingo');
	$(this).addClass('noticePage-bingo');	
})


$('.title-li').click(function(){	
	var liName = $(this).attr('name');
	$('.img2').hide();
	$('.imgBg'+liName).show();
	
	$('.right-column').hide();
	$('.right-column'+liName).show();
})


$('.column-li3').click(function(){
	$('.column-li3').addClass('columnBingo')
	$('.li-bingo1').hide();
	$('.li-bingo2').show();
	$('.column-li3 span').css('color','#000');
	$(this).find('.li-bingo2').hide();
	$(this).find('.li-bingo1').show();
	$(this).find('span').css('color','#fff');
	$(this).removeClass('columnBingo')
})


$('.columnBingo').hover(function(){
		$('.columnBingo').find('.li-bingo1').hide();
		$('.columnBingo').find('.li-bingo2').show();
		$('.columnBingo span').css('color','#000');
		$(this).find('.li-bingo2').hide();
		$(this).find('.li-bingo1').show();
		$(this).find('span').css('color','#fff');	
},function(){
		$('.columnBingo').find('.li-bingo1').hide();
		$('.columnBingo').find('.li-bingo2').show();
		$('.columnBingo span').css('color','#000');
})

$('.left-li').click(function(){
	
	var thisNr = $(this);
	var ulGaodu = thisNr.find("ul").height();
	
	if(thisNr.find("ul").css("display") == "none"){
		
		$('.li-ul').hide();
		thisNr.find("ul").show();
		//thisNr.css('margin-bottom',ulGaodu + 'px')	
	}	
})


$('.menu_body a').click(function(){	
	$('.menu_body a').removeClass('liBingo')
	$(this).addClass('liBingo')	
})

function sec3Timebar(){ //sec3 时间轴动画
	$(".sec3-timebar dd a").mouseenter(function(){
		var oldp=$(".sec3-timebar .active").index()
		var newp=$(this).parent().index();
		if(oldp!=newp){
			$(this).parent().addClass("active").siblings().removeClass("active");
			$(this).children("img").stop().fadeIn();
			$(this).children("p").stop().animate({marginTop:"10px",opacity:0})
			$(".sec3-timebar dd a").eq(oldp).children("p").stop().animate({marginTop:0,opacity:1})
			$(".sec3-timebar dd a").eq(oldp).children("img").stop().fadeOut();
			$(".sec3-timebar-ctx dd").eq(oldp).stop().fadeOut(0,function(){
				$(".sec3-timebar-ctx dd").eq(newp).stop().fadeIn();
			});
		}
	})
}
function secTxt(){
	//品牌栏目 品牌活动 图片轮播 
	$(".sec2 .rightBtn,.sec3 .rightBtn").click(function(){
		if($(this).siblings("ul").is(":animated")){
			return
		}
		$(this).siblings(".leftBtn").show();
		var w=$(this).siblings("ul").children("li").width()+parseInt($(this).siblings("ul").children("li").css("marginRight"));
		var oldp=$(this).parent().find("li.active").index();
		var num=$(this).parent().find("li.active").nextAll().length;
		var ml=parseInt($(this).siblings("ul").css("margin-left"));
		if(num<=4){
			$(this).siblings("ul").animate({marginLeft:ml-num*w},function(){
			})
			$(this).hide();
		}else{
			num=4;
			$(this).siblings("ul").animate({marginLeft:ml-4*w})
		}
		$(this).siblings("ul").children().eq(oldp+num).addClass("active").siblings().removeClass("active")
	})
	$(".sec2 .leftBtn,.sec3 .leftBtn").click(function(){
		if($(this).siblings("ul").is(":animated")){
			return
		}
		$(this).siblings(".rightBtn").show();
		var w=$(this).siblings("ul").children("li").width()+parseInt($(this).siblings("ul").children("li").css("marginRight"));
		var oldp=$(this).parent().find("li.active").index();
		var num=$(this).parent().find("li.active").nextAll().length;
		var ml=parseInt($(this).siblings("ul").css("margin-left"));
		if((oldp-4)<=3){
			$(this).siblings("ul").animate({marginLeft:ml+(oldp-3)*w},function(){
				$(this).children().eq(3).addClass("active").siblings().removeClass("active")
			})
			$(this).hide();
		}else{
			num=4;
			$(this).siblings("ul").animate({marginLeft:ml+4*w})
			$(this).siblings("ul").children().eq(oldp-num).addClass("active").siblings().removeClass("active")
		}
	})

	//主持人风采 图片轮播
	$(".sec4 .rightBtn").click(function(){
		if($(this).siblings("ul").is(":animated")){
			return
		}
		$(this).siblings(".leftBtn").show();
		var w=$(this).siblings("ul").children("li").width()+parseInt($(this).siblings("ul").children("li").css("marginRight"));
		var oldp=$(this).parent().find("li.active").index();
		var num=$(this).parent().find("li.active").nextAll().length;
		var ml=parseInt($(this).siblings("ul").css("margin-left"));
		if(num<=7){
			$(this).siblings("ul").animate({marginLeft:ml-num*w},function(){
			})
			$(this).hide();
		}else{
			num=7;
			$(this).siblings("ul").animate({marginLeft:ml-7*w})
		}
		$(this).siblings("ul").children().eq(oldp+num).addClass("active").siblings().removeClass("active")
	})
	$(".sec4 .leftBtn").click(function(){
		if($(this).siblings("ul").is(":animated")){
			return
		}
		$(this).siblings(".rightBtn").show();
		var w=$(this).siblings("ul").children("li").width()+parseInt($(this).siblings("ul").children("li").css("marginRight"));
		var oldp=$(this).parent().find("li.active").index();
		var num=$(this).parent().find("li.active").nextAll().length;
		var ml=parseInt($(this).siblings("ul").css("margin-left"));
		if((oldp-7)<=7){
			$(this).siblings("ul").animate({marginLeft:ml+(oldp-6)*w},function(){
				$(this).children().eq(6).addClass("active").siblings().removeClass("active")
			})
			$(this).hide();
		}else{
			num=7;
			$(this).siblings("ul").animate({marginLeft:ml+7*w})
			$(this).siblings("ul").children().eq(oldp-num).addClass("active").siblings().removeClass("active")
		}
	})

	$.each($(".img-list h4"),function(){
		var html=$(this).html();
		var len=$(this).html().length;
		//$(this).attr("title",html)
		if(len>=15){
			var str=html.substring(0,14)
			$(this).html(str)
		}
	})
	$.each($(".img-list p"),function(){
		var html=$(this).html();
		var len=$(this).html().length;
		//$(this).attr("title",html)
		if(len>=30){
			var str=html.substring(0,16)
			$(this).html(str)
		}
	})
}

function pageSlideImg(){//page页面的图片轮播
	$(".page-slideBox-rightBtn").click(function(){
		slideRight();
	})
	$(".page-slideBox-leftBtn").click(function(){
		if(!$(".slide-img ul").is(":animated")){
			var newp=$(".page-cztv-slideBox-d span.active").prev().index();
			var oldp=$(".page-cztv-slideBox-d span.active").index();
			if(oldp==0){
				newp=$(".page-cztv-slideBox-d span").length-1;
			}
			$(".page-cztv-slideBox-d span").eq(newp).addClass("active");
			$(".page-cztv-slideBox-d span").eq(oldp).removeClass("active");
			$(".slide-img ul").animate({marginLeft:-1050*newp})
		}
	})
	function slideRight(){
		if(!$(".slide-img ul").is(":animated")){
			var newp=$(".page-cztv-slideBox-d span.active").next().index();
			var oldp=$(".page-cztv-slideBox-d span.active").index();
			if(oldp==$(".page-cztv-slideBox-d span").length-1){
				newp=0;
			}
			$(".page-cztv-slideBox-d span").eq(newp).addClass("active");
			$(".page-cztv-slideBox-d span").eq(oldp).removeClass("active");
			$(".slide-img ul").animate({marginLeft:-1050*newp})
		}
	}
	$(".page-cztv-slideBox-d span").mouseenter(function(){
		if(!$(".slide-img ul").is(":animated")){
			var newp=$(this).index();
			var oldp=$(".page-cztv-slideBox-d span.active").index();
			$(".slide-img ul").animate({marginLeft:-1050*newp});
			$(this).addClass("active").siblings().removeClass("active")
		}
	})
	$(".slide-img").mouseenter(function(){
		clearInterval(auto)	//清楚自动轮播
	})
	$(".slide-img").mouseleave(function(){
		auto=setInterval(function(){slideRight()},5000)
	})
	var auto=setInterval(function(){slideRight()},5000)	//设置自动轮播
}
function brandsTab(){//brands页面的tab切换
	$(".brands-tab li").click(function(){
		var newp=$(this).index();
		var oldp=$(".brands-tab li.active").index();
		if(oldp!=newp){
			$(".brands-tab li").eq(newp).addClass("active");
			$(".brands-tab li").eq(oldp).removeClass("active");
			if(newp!=2){
				$(".brands-lists dd").eq(newp).show();
				$(".brands-lists dd").eq(oldp).hide();
			}
		}
		
	})
}
function toTop(){
	$(window).scroll(function(){
		scrollfun();
	})
	$(".float-sec-btns").click(function(){

		if( can == 1 ){
			
			$("html,body").animate({scrollTop:0},500)
			
			can++;
			
			setTimeout(function(){
				
				can=1;
				
			},500)
		}
		
	})
}
function scrollfun(){
	var h=$(window).height();
	if($(window).scrollTop()>=h){
		$(".float-sec-btns").stop().fadeIn();
		return
	}
	else{
		$(".float-sec-btns").stop().fadeOut();
	}
}
$(function(){
	/*filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60); IE7透明效果*/
	/* 划滑过图片效果*/
	$(".img-list-more li a").mouseenter(function(){
		var lineW="2px";
		var lineC="opacity: 0;background: #fff";
		var html="<div class='top-line' style='position: absolute;top: 10px;left:0;width:0;height:"+lineW+";"+lineC+"'></div>"+
				 "<div class='right-line' style='position: absolute;top: 0;right:10px;width:"+lineW+";height:10px;"+lineC+"'></div>"+
				 "<div class='left-line' style='position: absolute;bottom: 0;left:10px;width:"+lineW+";height:0;"+lineC+"'></div>"
		$(this).append(html)
		$(this).children(".top-line").animate({width:"100%",opacity:"0.6"});
		$(this).children(".right-line").animate({height:"100%",opacity:"0.6"});
		$(this).children(".left-line").animate({height:"100%",opacity:"0.6"});
		$(this).children(".ui-mask-black-text").animate()
	})
	$(".img-list-more li a").mouseleave(function(){
		$(this).children(".top-line").animate({width:"0",opacity:"0"},function(){
			$(this).remove();
		})
		$(this).children(".right-line").animate({height:"0",opacity:"0"},function(){
			$(this).remove();
		})
		$(this).children(".left-line").animate({height:"0",opacity:"0"},function(){
			$(this).remove();
		})
		
	})
})

/***********手风琴菜单效果开始*********/
	$("#firstpane h3.menu_head").click(function(){
		
			/*setTimeout(function(){
				
				
				alert($(".menu_list").height())
				
				
			},500)*/
			
			var thisOne = $(this).attr("one");
		
			/*if(thisOne != 5){
				if($(".menu_body"+thisOne).css("display") == "none"){
					
					setTimeout(function(){
						$(".xian").animate({"height":$(".menu_list").height() - 60 },300)
					},500)	
				
				}else{
					
					setTimeout(function(){
							$(".xian").animate({"height":$(".menu_list").height() - 60 },300)
					},500)			
				}
			}else{
				
					setTimeout(function(){
							$(".xian").animate({"height":$(".menu_list").height() -20 },300)
					},500)	
				
			}*/
			//alert(thisOne)
			if($(".menu_body"+thisOne).css("display") == "none"){
				if(thisOne == 0){
					
					$(".xian").animate({"height":900 },300)
					
				}else if(thisOne == 1){
					
					$(".xian").animate({"height": 750 },300)
					
				}else if(thisOne == 2){
					
					$(".xian").animate({"height": 500 },300)
					
				}else if(thisOne == 3){
					
					$(".xian").animate({"height": 730 },300)
					
				}else if(thisOne == 4){
					
					$(".xian").animate({"height":550 },300)
					
				}else if(thisOne == 5){
					
					$(".xian").animate({"height":710 },300)
					
				}
			}else{
				
				$(".xian").animate({"height":450 },300)
			}
			
			$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
			$(".menu_head").siblings().removeClass("current");
			$('.imgNo').hide();
			$(this).find('.imgNo').show();

			
		
	
	});


/***********手风琴菜单效果结束*********/

/*$(".menu_body a").click(function(){
	
	var cjTwo = $(this).attr("two");
	var cjOne = $(this).parent().attr("one");
	var url  = location.href;
	var arr = url.split('?one');
	var ar = arr[0];
	
	if(cjOne == 5){
		
		window.open("channel2.html" + "?one=" + cjOne + "&two=" + cjTwo)
		
	}else{
		
		window.open("channel.html" + "?one=" + cjOne + "&two=" + cjTwo)
		
		
	}
	

	
})*/
$(function(){
	$(".float-sec-btns").mouseenter(function(){
		var h=$(this).children(".top-btn").height();
		$(this).children(".top-btn").stop().animate({marginTop:-h,opacity:0})
		$(this).children(".float-sec-txt").stop().animate({opacity:1})
	})
	$(".float-sec-btns").mouseleave(function(){
		var h=$(this).children(".top-btn").height();
		$(this).children(".top-btn").stop().animate({marginTop:0,opacity:1})
		$(this).children(".float-sec-txt").stop().animate({opacity:0})
	})
})


$('.menu_body a').hover(function(){
	
	$(this).addClass("menu_bingo")
	
	
	
},function(){
	
	
	$(this).removeClass("menu_bingo")
	

})
$(".column-li3").each(function(){
	
	sl++;
	
	if(sl % 4 == 0){
		
		$(this).css("margin-right","0")
		
	}
		
})

$('.goHome a,.goMore a').hover(function(){
	
	$(this).parent().css("background-color","#0065ab")
	$(this).css("color","#fff")
	
	
	
},function(){
	
	
	$(this).parent().css("background-color","#fff")
	$(this).css("color","#0065ab")

})
