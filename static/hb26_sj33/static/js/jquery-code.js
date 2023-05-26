$(document).ready(function(){
    (function(){
	var n=350;
	var obj=document.getElementById("quickmenu");
	if(!obj){return false;}
	var x=100;
	var fe=$("#quickmenu");
	window.onscroll=function(){
		obj.style.top=(document.body.scrollTop||document.documentElement.scrollTop)+n+'px';
		x=(document.body.scrollTop||document.documentElement.scrollTop)+n;
		if(x==350){fe.fadeOut().hide()}else{fe.fadeIn().show()};
	};
	window.onresize=function(){obj.style.top=(document.body.scrollTop||document.documentElement.scrollTop)+n+'px'};
})();
   $("#quickmenu .q_gotop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 400);
	});
	$("#newnav li").hover(function(){
        $(this).addClass("current");
        $('ul:first',this).css('visibility', 'visible');
    
    }, function(){
        $(this).removeClass("current");
        $('ul:first',this).css('visibility', 'hidden');
    
    });
    $("#newnav li:has(ul)").find("a:first").addClass("suba");
});


// fav
function addToFavorite(){var a="http://www.sj33.cn/";var b="设计之家";if(document.all){window.external.AddFavorite(a,b)}else if(window.sidebar){window.sidebar.addPanel(b,a,"")}else{alert("您的浏览器不支持此操作\n请直接使用Ctrl+D收藏本站~")}}

// 固定层
function buffer(a,b,c){var d;return function(){if(d)return;d=setTimeout(function(){a.call(this),d=undefined},b)}}(function(){function e(){var d=document.body.scrollTop||document.documentElement.scrollTop;d>b?(a.className="div1 div2",c&&(a.style.top=d-b+"px")):a.className="div1"}var a=document.getElementById("float");if(a==undefined)return!1;var b=0,c,d=a;while(d)b+=d.offsetTop,d=d.offsetParent;c=window.ActiveXObject&&!window.XMLHttpRequest;if(!c||!0)window.onscroll=buffer(e,150,this)})();