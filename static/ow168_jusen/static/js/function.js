(function(a){function h(b){for(var a=["Webkit","Moz","O","ms"],c=0;c<a.length;c++)if(a[c]+"Transition"in b.style)return"-"+a[c].toLowerCase()+"-";return"transition"in b.style?"":!1}a.fn.removeStyle=function(b){return this.each(function(){var h=a(this);b=b.replace(/\s+/g,"");var c=b.split(",");a.each(c,function(){var a=RegExp(this.toString()+"[^;]+;?","g");h.attr("style",function(b,c){if(c)return c.replace(a,"")})})})};var t=function(b){return this.each(function(){function n(a,b){function j(){f.eq(a).removeStyle("opacity, z-index");
f.eq(b).removeStyle(h+"transition, transition");k=b;p=l=!1;q=setTimeout(function(){c("next")},d.slideDur);"function"==typeof d.onFadeEnd&&d.onFadeEnd.call(this,f.eq(k))}if(l||a==b)return!1;l=!0;"function"==typeof d.onFadeStart&&!p&&d.onFadeStart.call(this,f.eq(e));r.removeClass("active").eq(e).addClass("active");f.eq(a).css("z-index",2);f.eq(b).css("z-index",3);if(h){var g={};g[h+"transition"]="opacity "+d.fadeDur+"ms";g.opacity=1;f.eq(b).css(g);setTimeout(function(){j()},d.fadeDur)}else f.eq(b).animate({opacity:1},
d.fadeDur,function(){j()})}function c(a){"next"==a?(e=k+1,e>m-1&&(e=0)):"prev"==a?(e=k-1,0>e&&(e=m-1)):e=a;n(k,e)}var d={slideDur:7E3,fadeDur:800,onFadeStart:null,onFadeEnd:null};b&&a.extend(d,b);this.config=d;var j=a(this),l=!1,p=!0,q,k,e,f=j.find(".slide"),m=f.length,s=j.find(".pager_list");h=a.support.leadingWhitespace?h(j[0]):!1;for(var g=0;g<m;g++)s.append('<li class="page" data-target="'+g+'">'+g+"</li>");j.find(".page").bind("click",function(){var b=a(this).attr("data-target");clearTimeout(q);
c(b)});var r=s.find(".page");r.eq(0).addClass("active");n(1,0)})};a.fn.easyFader=function(a){return t.apply(this,arguments)}})(jQuery);

$(document).ready(function () {	
	  
	 //nav 		
    var obj=null;
    var As=document.getElementById('starlist').getElementsByTagName('a');
    obj = As[0];
    for(i=1;i<As.length;i++){if(window.location.href.indexOf(As[i].href)>=0)
    obj=As[i];}
    obj.id='selected';
	 
     //nav
	$("#mnavh").click(function(){
    $("#starlist").toggle();
	
	$("#header").toggleClass("navsd");
	$("#mnavh").toggleClass("open");
	});
	
    //search	
	$(".searchico").click(function(){
	$(".search").toggleClass("open");
	});
	
	 //searchclose	
    $(".searchclose").click(function(){
	$(".search").removeClass("open");
	});	
	
	//banner
    $('#banner').easyFader();
		
   //nav menu   
   $(".menu").click(function(event) {
   $(this).children('.sub').slideToggle();
   });
   
   //tab
   $('.tab_buttons li').click(function(){
   $(this).addClass('newscurrent').siblings().removeClass('newscurrent');
   $('.newstab>div:eq('+$(this).index()+')').show().siblings().hide();
    });

		
});




//返回顶部  
var bigfa_scroll = {  
    drawCircle: function(id, percentage, color) {  
        var width = jQuery(id).width();  
        var height = jQuery(id).height();  
        var radius = parseInt(width / 2.20);  
        var position = width;  
        var positionBy2 = position / 2;  
        var bg = jQuery(id)[0];  
        id = id.split("#");  
        var ctx = bg.getContext("2d");  
        var imd = null;  
        var circ = Math.PI * 2;  
        var quart = Math.PI / 2;  
        ctx.clearRect(0, 0, width, height);  
        ctx.beginPath();  
        ctx.strokeStyle = color;  
        ctx.lineCap = "square";  
        ctx.closePath();  
        ctx.fill();  
        ctx.lineWidth = 3;  
        imd = ctx.getImageData(0, 0, position, position);  
        var draw = function(current, ctxPass) {  
            ctxPass.putImageData(imd, 0, 0);  
            ctxPass.beginPath();  
            ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);  
            ctxPass.stroke();  
        }  
        draw(percentage / 100, ctx);  
    },  
    backToTop: function($this) {  
        $this.click(function() {  
            jQuery("body,html").animate({  
                scrollTop: 0  
            },  
            800);  
            return false;  
        });  
    },  
    scrollHook: function($this, color) {  
        color = color ? color: "#000000";  
        $this.scroll(function() {  
            var docHeight = (jQuery(document).height() - jQuery(window).height()),  
            $windowObj = $this,  
            $per = jQuery(".per"),  
            percentage = 0;  
            defaultScroll = $windowObj.scrollTop();  
            percentage = parseInt((defaultScroll / docHeight) * 100);  
            var backToTop = jQuery("#backtoTop");  
            if (backToTop.length > 0) {  
                if ($windowObj.scrollTop() > 100) {  
                    backToTop.addClass("button--show");  
                } else {  
                    backToTop.removeClass("button--show");  
                }  
                $per.attr("data-percent", percentage);  
                bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);  
            }  
        });  
    }  
}  
jQuery(document).ready(function() {  
    jQuery("body").append('<div id="backtoTop" data-action="gototop"><canvas id="backtoTopCanvas" width="45" height="45"></canvas><div class="per"></div></div>');  
    var T = bigfa_scroll;  
    T.backToTop(jQuery("#backtoTop"));  
    T.scrollHook(jQuery(window), "#12b7de");  
}); 



          		$(document).ready(function() {
          	        $(".pay-author").click(function() {
          		        $(".panel-reward").toggle();
          	        });
          			$(".sharebtntn").click(function() {
          		        $(".action-share").toggle();
          	        })
                  });
          	