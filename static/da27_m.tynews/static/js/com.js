$(function(){
	loadInit.init();
	mobileHeader.init();
    returnTop.init();
    returnHome.init();
    windowScroll.init();
	var isTouchDevice = 'ontouchstart' in window;

})
// 初始化加载内容 
var loadInit = {
    init:function(){
    	loadInit.baseSet();

        $("img.domPC").each(function(){
        	var $_this = $(this);
			$_this.attr("src",$_this.attr("data-original"));
        }); 
    },
    baseSet:function(){
		WinH = $(window).height();
		winW = $(window).width();
    }
}

// 手机菜单
var mobileHeader = {
    init:function(){
		$("#mobileHeader .right").click(function(){
			var $_this = $(this),
				$_mobileNavList = $("#mobileHeader .mobileNavList");
			if(!$_this.hasClass("open")){
				$_this.addClass("open");
				$_mobileNavList.animate({height:316}, 200);
			}else{
				$_this.removeClass("open");
				$_mobileNavList.animate({height:0}, 200);
			}
		});
    }
};
// 滚动事件
var windowScroll = {
    init:function(){
        $(window).scroll( function() {
            var _this = $(this);

            $(".adIframeLazy").each(function(){ //iframe延迟
                if(_this.scrollTop() > ($(this).offset().top-WinH) && !$(this).attr("src")){
                    $(this).attr("src",$(this).attr("data-src"));
                }
            });
            $(".imgLazy").each(function(){ //隐藏图片延迟
                if(_this.scrollTop() > ($(this).offset().top-WinH)){
                    $(this).attr("src",$(this).attr("data-src")).removeClass("imgLazy");
                }
            });


            if(_this.scrollTop()>(WinH*2)){
                $("#returnTop").show(); $("#returnHome").show();                  
            }else{
                $("#returnTop").hide(); $("#returnHome").hide();    
            };
        });
    }
};
//返回顶部
var returnTop = {
    init:function(){
        var $_returnTop = $("#returnTop");
        $_returnTop.click(function(){
            scroll(0,0);
            $(this).hide();
        })
    }
};
//返回首页
var returnHome = {
    init:function(){
        var $_returnHome = $("#returnHome");
        $_returnHome.click(function(){
            $(this).hide();
        })
    }
};
