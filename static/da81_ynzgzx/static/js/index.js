

//首页焦点图片

$(function() {
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").css("opacity",0.6).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	//上一页、下一页按钮透明度处理
	$("#focus .preNext").css("opacity",0.2).hover(function() {
		$(this).stop(true,false).animate({"opacity":"0.7"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.2"},300);
	});

	//上一页按钮
	$("#focus .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});

	//下一页按钮
	$("#focus .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},8000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
});

//选项卡
function nTabs(thisObj,Num){
if(thisObj.className == "active")return;
var tabObj = thisObj.parentNode.id;
var tabList = document.getElementById(tabObj).getElementsByTagName("li");
for(i=0; i <tabList.length; i++)
{
if (i == Num)
{
   thisObj.className = "active"; 
      document.getElementById(tabObj+"_Content"+i).style.display = "block";
}else{
   tabList[i].className = "normal"; 
   document.getElementById(tabObj+"_Content"+i).style.display = "none";
}
} 
}

// jQuery.noConflict();
jQuery(document).ready(function($) {
	if($.browser.msie&&($.browser.version==6.0)&&!$.support.style){
		$('.nav li').each(function(){
			$(this).hover(function(){
				$(this).find('ul:eq(0)').show();
				$(this).css({background:'#262626'});
			},function(){
				$(this).find('ul:eq(0)').hide();
				$(this).css({background:'none'});
			})
		})
	}else{
		$(window).scroll(function(){
			var scroller = $('.rollto');
			document.documentElement.scrollTop+document.body.scrollTop>200?scroller.fadeIn():scroller.fadeOut();
		})
	}

	$('.ico-totop').click(function(){
		$('html,body').animate({scrollTop:0},300);
	})

	$('.ico-torespond').click(function(){
		scrollTo('.ico-torespond');
		$('#comment').focus();
	})

	$(document).click(function() {
		$('.popup-layer,.popup-arrow').hide();
		$('.btn-headermenu').removeClass('btn-active');
	})
	$('.btn-headermenu,.popup-layer,.popup-arrow').click(function(event) {
		event.stopPropagation();
	})
	$('.btn-headermenu').each(function(){
		$(this).click(function(){
			$(this).toggleClass('btn-active');
			$(this).next().toggle();
			$(this).next().next().toggle();
			$(this).parent().siblings().find('.popup-layer,.popup-arrow').hide();
		})
	})

	function scrollTo(name){
		var ID = $($(name).attr('href'));
		if(ID.length>0)
	   	$('html,body').animate({scrollTop: ID.offset().top-10},300);
	}
})
