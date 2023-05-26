// JavaScript Document

$(function(){
	jQuery(".tips-list").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"top",autoPlay:true,delayTime:1000});
	jQuery(".newsPic").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"fold",autoPlay:true,});
	jQuery(".hotNews-cont").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,});
	jQuery(".local-tab a").each(function(index) {
	jQuery(this).mouseover(function() {
		$(".local-tab a").removeClass("on");
		$(".local-tab a:eq(" + index + ")").addClass("on");
		$(".local-con ul").css("display", "none");
		$(".local-con ul:eq(" + index + ")").css("display", "block");
	});
	});
	
	jQuery(".dynamic-tab li").each(function(index) {
	jQuery(this).mouseover(function() {
		$(".dynamic-tab li").removeClass("on");
		$(".dynamic-tab li:eq(" + index + ")").addClass("on");
		$(".dynamic-cont").css("display", "none");
		$(".dynamic-cont:eq(" + index + ")").css("display", "block");
	});
	});
	
	jQuery(".qsn-tab li").each(function(index) {
	jQuery(this).mouseover(function() {
		$(".qsn-tab li").removeClass("on");
		$(".qsn-tab li:eq(" + index + ")").addClass("on");
		$(".qsn-con").css("display", "none");
		$(".qsn-con:eq(" + index + ")").css("display", "block");
	});
	});
	
	jQuery(".Pover-item .title li").each(function(index) {
	jQuery(this).mouseover(function() {
		$(".Pover-item .title li").removeClass("on");
		$(".Pover-item .title li:eq(" + index + ")").addClass("on");
		$(".popular-cont").css("display", "none");
		$(".popular-cont:eq(" + index + ")").css("display", "block");
	});
	});
	
	jQuery(".login-title a").each(function(index) {
	jQuery(this).click(function() {
		$(".login-title a").removeClass("on");
		$(".login-title a:eq(" + index + ")").addClass("on");
		$(".loginBox, .registBox").css("display", "none");
		$(".loginBox, .registBox:eq(" + index + ")").css("display", "block");
	});
	});
	
	//返回顶部
	$(function(){
		showScroll();
		function showScroll(){
			$(window).scroll( function() { 
				var scrollValue=$(window).scrollTop();
				scrollValue > 100 ? $('div[class=c-top]').fadeIn():$('div[class=c-top]').fadeOut();
			} );	
			$('.c-top').click(function(){
				$("html,body").animate({scrollTop:0},200);	
			});	
		}
	})
	
	
	//展开全文	
	$(function(){
        $(".pexperts-word .c").each(function(){
            var maxwidth=235;//设置最多显示的字数
            var text=$(this).text();
            if($(this).text().length>maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+"..."+"<a href='###' class='zhank'>展开+</a>");//如果字数超过最大字数，超出部分用...代替，并且在后面加上点击展开的链接；
            };
            $(this).find("a").click(function(){
                $(this).parent().text(text);//点击“点击展开”，展开全文
            })
        })
    })
	
	$(function(){
        $(".vHelp-photo .con .c").each(function(){
            var maxwidth=130;//设置最多显示的字数
            var text=$(this).text();
            if($(this).text().length>maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+"..."+"<a href='###' class='zhank'>展开+</a>");//如果字数超过最大字数，超出部分用...代替，并且在后面加上点击展开的链接；
            };
            $(this).find("a").click(function(){
                $(this).parent().text(text);//点击“点击展开”，展开全文
            })
        })
    })
	
});

