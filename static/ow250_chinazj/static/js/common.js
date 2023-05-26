 
 function rechange(str){
	c_str=str.replace(/document.write\("/g,"").replace(/"\);/g,"").replace(/\\\"/g,"\"").replace(/\\\'/g,"\'").replace(/\\\//g,"\/").replace(/\\\\/g,"\\");
	return c_str;
 }
$(document).ready(function(){

//搜索
  $(".search-show").click(function(){  
    $(".site-search,.navto-search").toggleClass("active");
	$(".sbtn").toggleClass("fa-remove");
  });
$(".minnav").click(function(){
    $(".minul").toggleClass("active");
  });

//首页幻灯
if(isNeeded('#slide')){$(function(){(function($){$.fn.Slide=function(options){var defaults={item:"slide-item",nav:"slide-nav",nowClass:"nownav",loading:"slide-loading"},options=options||{};options=$.extend(defaults,options);var cont=$(this),item=cont.find("."+options.item),nav=cont.find("."+options.nav),curr=options.nowClass,len=item.length,width=item.width(),html="",index=order=0,timer=null,lw="-"+width+"px",rw=width+"px",newtimer,ld=cont.find("."+options.loading);item.each(function(i){$(this).css({left:i===index?0:(i>index?width+'px':'-'+width+'px')});html+='<a href="javascript:">'+(i+1)+'</a>';});$("#slide").hover(function(){$('#next').fadeIn();$('#prev').fadeIn();},function(){$('#next').fadeOut();$('#prev').fadeOut();});nav.html(html);var navitem=nav.find("a");navitem.eq(index).addClass(curr);function anim(index,dir){loading();if(order===len-1&&dir==='next'){item.eq(order).stop(true,false).animate({left:lw});item.eq(index).css({left:rw}).stop(true,false).animate({left:0});}else if(order===0&&dir==='prev'){item.eq(0).stop(true,false).animate({left:rw});item.eq(index).css({left:lw}).stop(true,false).animate({left:0});}else{item.eq(order).stop(true,false).animate({left:index>order?lw:rw});item.eq(index).stop(true,false).css({left:index>order?rw:lw}).animate({left:0});}
order=index;navitem.removeClass(curr).eq(index).addClass(curr);}
function next(){index=order>=len-1?0:order+1;_stop();ld.stop(true,true).animate({"width":0},0);anim(index,'next');timer=setInterval(next,5000);}
function prev(){index=order<=0?len-1:order-1;_stop();ld.stop(true,true).animate({"width":0},0);anim(index,'prev');timer=setInterval(next,5000);}
function auto(){loading();timer=setInterval(next,5000);}
function _stop(){clearInterval(timer);}
function loading(){ld.css({"height":"0","height":"5px","position":"absolute","left":"0","bottom":"0","background":"#FF4939","z-index":"10"});ld.animate({"width":"100%"},5000).animate({"width":0},0);}
return this.each(function(){auto();navitem.hover(function(){_stop();var i=navitem.index(this);if(/nownav/.test($(this).attr('class'))){return false;}
if(newtimer)clearTimeout(newtimer);newtimer=setTimeout(function(){_stop();ld.stop(true,true).animate({"width":0},0);anim(i,this);},250);},auto);$('#next').on('click',next);$('#prev').on('click',prev);});};})(jQuery);$("#slide").Slide();})}


//点击展开查看详细介绍
if(isNeeded('#countalldiv')){$(document).ready(function(){$(".intro_more").click(function(){if(isNeeded('.infotxt')){$(".infotxt").toggleClass("active");}else{$(".intro_art").toggleClass("active");}});});}
//判断是不是有右边浮动广告
if(isNeeded('.float_ad')){
	$(function(){$(function() {
	// 检查对象，#sidebar-tab是要随滚动条固定的ID，可根据需要更改
		var offset = $('.float_ad').offset(); //1965		
		fh_left=$('.fh_left').height();
		fh_right=$('.fh_right').height();
		if(fh_left>fh_right){
		$(window).scroll(function () {	
		// 检查对象的顶部是否在游览器可见的范围内		
		var scrollTop = $(window).scrollTop();		
			if (offset.top < scrollTop){
				$('.float_ad').addClass('float_ad_fixed');
				}else{
					$('.float_ad').removeClass('float_ad_fixed');
				}
			});
		}
		});
	})	
}
//回顶部
$(window).scroll(function(){
	//设置回顶部按钮的位置
		if($(window).width()>1200){
			cha_width=$(window).width()-1200;
			width=cha_width/2-30;
			$("#elevator_item").css("width",width+"px");
		}
		var scrolltop=$(this).scrollTop();
		if(scrolltop>=200){
			$("#elevator_item").fadeIn();
		}else{
			$("#elevator_item").fadeOut();
		}		
	});
	$("#elevator").click(function(){
		$("html,body").animate({scrollTop: 0}, 500);
	});
	$(".qr").hover(function(){
		$(".qr-popup").fadeIn();
	},function(){
		$(".qr-popup").fadeOut();
	});
  
});

function isNeeded(selectors){
    var selectors = (typeof selectors == 'string') ? [selectors] : selectors,
        isNeeded;
    for(var i=0;i<selectors.length;i++){
        var selector = selectors[i];
        if( $(selector).length > 0 ) { 
            isNeeded = true; 
            break; 
        }
    };
    return isNeeded ;
};
function length() {
    $(".cli").each(function() {
        if ($(this).find("li").size() > 1) {
            var mun = 0;
            var $this = $(this);
            console.log($this.find("li").size());
            for (i = 1; i <= $this.find("li").size(); i++) {
                mun = mun + $this.find("li").eq(i - 1).width() + 50;
            }
            $this.css("width", mun + 'px');
        }
    })
}