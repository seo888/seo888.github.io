$(function(){bline($(".hotapp_img"));$(".game_package .package").each(function(){$(this).mouseover(function(){$(this).siblings().removeClass("on");$(this).addClass("on");})});});$(function(){function a(){var a=d.scrollTop(),b=e.innerHeight();b>h&&(a+i>g+h?a+i>g+b?f.css({position:"absolute",bottom:"0px"}):f.css({position:"fixed",bottom:"0px"}):f.css({position:"static"}))}
var b=navigator.userAgent;if(!(b.indexOf("MSIE 6")>0)){var c=$(window),d=$(document),e=$(".pagemst .left"),f=$(".pagemst .fh_right"),g=e.offset().top,h=f.height(),i=c.height();c.on({scroll:a,resize:function(){i=c.height()}}),a()}});
