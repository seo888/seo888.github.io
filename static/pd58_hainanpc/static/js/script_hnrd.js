/*****
*海南人大首页JS
*@crtime:2017年12月03日10:51
*@Company:湖南正宇 
*@Author:李刚(moaol@foxmail.com)
*@modifyLog:	what	when	who
*
*/
$(function(){
	//m-news-list-wrap增加u-toutiao类
	$(".m-news-list-wrap li:first-child").addClass("u-toutiao");
	
    // 通知公告
    $(".txtScroll-announce").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"topLoop",autoPlay:true});
    // 人大党建
    $(".picScroll-rddj").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,vis:5,pnLoop:false});
	// 主任会议成员
	jQuery(".m-bd").slide({mainCell:".bd",autoPlay:true,effect:"topLoop"});
	//成员名单
	jQuery(".m-bd-2").slide({mainCell:".bd",autoPlay:true,effect:"leftLoop",vis:2});
	
	jQuery(".tabBox").slide({titCell:".hd a",mailCell:".bd ul"});
	//列表页左右对齐
	var left = $(".g-body-subpage .g-box-red"),
		right = $(".g-body-subpage .g-box1");
	if(left.height()>right.height())
	{
		right.height(left.height());
	}else{
		left.height(right.height());
	}
	
	var mark = function (ishow){
		var $mark = $("#selfmark");
		if($mark.size()<1)
		{
			$mark = $("<div class='selfmark' id='selfmark'></div>");
			$("body").append($mark);
			$mark.click(function(){
				$("#menu_show_mobile").trigger("click");
			});
			$(".u-doc-content p img").each(function(){
				var $thisspan = $(this);
				console.log($thisspan);
				$thisspan.parent("p").css({"line-height":"100%","margin":"0"});
	
			})
		}
		if(ishow)
		{
			$mark.show(0);
		}else{
			$mark.hide(0);
		}
	};
	//内容页无相关信息自动隐藏
	var author = $(".u-doc-author font,.subtitle");
	if(author.size()>0)
	{
		author.each(function(){
			var $this = $(this);
			if($this.text()=="")
			{
				var $p = $this.parent("span");
				if($p.size()>0)
				{
					$this.parent("span").hide(0);
				}else{
					$this.hide(0);
				}
				
			}
		});
		$(".jiantitle>span").css("maxWidth",$(".u-doc-title span").width()-50+"px");
		//有center属性的表格不居中显示BUG
		$(".u-doc-content table[align='center']").css("margin","0 auto");
		//将标题中的空替换成换行
		var _tit = $("#hhtitle");/*
			_restr = /\n|\r\n| /g,
			_date = $(".u-doc-author span:last").text().replace(/年|月/g,"-").replace(/日/,""),
			_qianyiDate = "2018-12-19";//数据迁移时间节点。*/
		if($.trim(_tit.text()).length>0)
		{
			$("#mytitle").html(_tit.html());
			/*
			if(_date>_qianyiDate)
			{
				$("#mytitle").html($.trim(_tit.text()).replace(/\n|\r\n| /g,'<br/>'));
			}else{
				$("#mytitle").html(_tit.html());
			}*/
		}
	}
	
	 //首页二维码
    $('.right-nav li').hover(function(){
        $(this).find('.show-ewm').animate({'left':'-160px','opacity':'1'}).show();
    },function(){
        $(this).find('.show-ewm').animate({'left':'-50px','opacity':'0'}).hide();
    })
	//移动适配二维码
    $('.right-nav li').hover(function(){
        $(this).find('#mapp').animate({'left':'-160px','opacity':'1'}).show();
    },function(){
        $(this).find('#mapp').animate({'left':'-50px','opacity':'0'}).hide();
    })
	
	
	//手机端单击菜单效果
	$("#nav_show_mobile").click(function(){
		
		var thisLink=$(this),
		    showDom=$(".g-sd-chnls");
			
		thisLink.toggleClass('menu-is-open');
		
		if(thisLink.hasClass('menu-is-open')){
			new mark(1);
			showDom.css("left",-600).show().animate({left:0},500);
		}else{
			showDom.animate({left:-600},500);
			new mark(0);
		}
	});
	$("#menu_show_mobile").click(function(){
		var thisLink=$(this),
		    showMenu=$(".m-nav");
		thisLink.toggleClass('menu-is-open');
		
		if(thisLink.hasClass('menu-is-open')){
			new mark(1);
			showMenu.slideDown();
		}else{
			showMenu.slideUp();
			new mark(0);
		}
	});
	
$(window).scroll(function() {
		autoRightFun();
		autoduilian()
	});
	autoRightFun();
	autoduilian()
	setTimeout(duilian,10000);
});
function autoRightFun(){
		var sclHeight =$(window).scrollTop();
		var r_nav=$(".right-nav");
		if(sclHeight>2530){
			r_nav.css({"position":"absolute","top": "2715px"});
		}	
		else if(sclHeight<120){
			r_nav.css({"position":"absolute","top": "358px"});
		}		
		else{
			r_nav.css({"position":"fixed","top": "auto"});
		}
}
function autoduilian(){
		var sclHeight =$(window).scrollTop();
		var r_nav=$(".duilian2020>i");
		if(sclHeight>2530){
			r_nav.css({"position":"fixed","top": "748px"});
		}	
		else if(sclHeight<120){
			r_nav.css({"position":"fixed","top": "568px"});
		}		
		else{
			r_nav.css({"position":"fixed","top": "318px"});
		}
}
function duilian(){
	$("#duilian2019>i").slideUp("slow");
}