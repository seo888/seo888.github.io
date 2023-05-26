$(function(){
    $(window).scroll(function(){ //scroll--浏览器滚动条滚动式触发
        var wHeight=$(window).height(); //获取浏览器可视窗口高度
        var wTop=$(window).scrollTop(); //获取滚动条距离顶部高度
        if(wTop>=wHeight) //当滚动条距离顶部高度超过一屏时执行
        {
           $("#topbtn").show(); //返回顶部按钮显示
        }
        else{
           $("#topbtn").hide(); //返回顶部按钮隐藏
        }
      });
      $("#topbtn").click(function(){
          $("html,body").animate({scrollTop:0},500); //页面500毫秒返回顶部
      });


	
	var mflag = isChkMobile();
	var bl = 1.78;
	if(mflag){
		var widWidth = $(window).width();
		var hl = Math.ceil(widWidth/bl);
		$('embed').width("100%");
		$('embed').height(hl);
		$('iframe').width("100%");
		$('iframe').height(hl);

	}else{
		var widWidth = $(document.body).width();
		$('embed').width("780");
		$('embed').height("auto");
		$('iframe').width("780");
		$('iframe').height("auto");
	}
	
	
 });


function isChkMobile() {
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
    var mobile_flag = false;
    
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    if(screen_width < 500 && screen_height < 800){
        mobile_flag = true;
    }
 	return mobile_flag;
}