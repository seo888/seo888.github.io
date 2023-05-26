var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var sbar;
(sbar = ua.match(/msie ([\d.]+)/)) ? Sys.ie = sbar[1] :
(sbar = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = sbar[1] :
(sbar = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = sbar[1] :
(sbar = ua.match(/opera.([\d.]+)/)) ? Sys.opera = sbar[1] :
(sbar = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = sbar[1] : 0;
var host;
$(document).ready(function(){
	if(Sys.ie == "6.0"){
		$('#site_scrollbar').attr('style', 'position:absolute;left:expression(eval(document.documentElement.scrollLeft+document.documentElement.clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,0)||0)-(parseInt(this.currentStyle.marginRight,0)||0));top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,0)||0)-(parseInt(this.currentStyle.marginBottom,0)||100)))');
	}
    $(window).scroll(function () {
        var offsetTop = $(window).scrollTop();
        if (offsetTop > 150) {
            $('#site_scrollbar').find('.gotop').addClass('go');
        } else {
            $('#site_scrollbar').find('.gotop').removeClass('go');
        }
    });
    $('#site_scrollbar').delegate('.gotop','click',function(){
        if($(this).hasClass("go")){
            if (Sys.ie){
                $('html,body').scrollTop(0);
            }else{
                obody = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                obody.animate({
                    scrollTop: 0
                }, 500);
            }
        }
        return false;
    })
    $('#site_scrollbar').find(".suspend").mouseenter(function(){
        $(this).siblings("div").show();
    })
    $('#site_scrollbar').find(".suspend").mouseleave(function(){
        $(this).siblings("div").hide();
    })
    
})
