// 当网页向下滑动 20px 出现"返回顶部" 按钮
window.onscroll = function() {scrollFunction()};
 
function scrollFunction() {console.log(121);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}
 
// 点击按钮，返回顶部
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// JavaScript Document
$(document).ready(function(){
  hoverMenuShow();
});

function hoverMenuShow(){
  let $btn = $('.nav-d');
  let $menu = $('.dropdown-menu');

  // 移入显示 原理是手动给 dropdown-menu 加入一个显示类
  $btn.mouseover(function(){
	 $menu.addClass('show');
  });

  /*
  移出消失 原理是手动删除 dropdown-menu 的类

	 这里需要注意两个细节：
	 1、当我们移入下边的菜单栏的时候我们不让菜单栏消失，这里我们使用定时器。让它延迟100毫秒消失，如果在100毫秒内移入菜单栏, 那么我们就关闭定时器，dropdown-menu就不会消失
	 2、当我们从下边的菜单栏再次移入按钮的时候，也不能让菜单栏消失。原理同上

  */
  $btn.mouseout(function (){
	 $hide = setTimeout(function(){
		// 移入菜单栏，取消隐藏
		$menu.mouseover(function(){
		   clearTimeout($hide);
		});
		// 再次移入按钮，取消定时器，不让其隐藏。
		$btn.mouseover(function(){
		   clearTimeout($hide);
		});
		$menu.removeClass('show');
	 },100);
  })
}


/*页面智能层浮动*/ 
jQuery(document).ready(function($){ 
  var $sidebar = $("#rgg"), 
  $window = $(window), 
  offset = $sidebar.offset(), 
  topPadding = 80; 
  $window.scroll(function() { 
    if ($window.scrollTop() > offset.top) { 
      $sidebar.stop().animate({ 
        marginTop: $window.scrollTop() - offset.top + topPadding 
      }); 
    } else { 
      $sidebar.stop().animate({ 
        marginTop: 0 
      }); 
    } 
  }); 
}); 


//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a6b70cfd8de08d3717a99747dd80d794";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
