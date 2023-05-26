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

     if($('[name="mocbar"]').length>0) {
            var isClose = 0;
             $('[name="mocbar"]').bind("click",function(){
                 if(isClose>0) {
                     isClose--;
                     $('.mConRight').show(300);
                     $('.mConLeft').css("width","890px");
                     $('.mConLtop').css("width","850px");
                     $('.mConLcon').css("width","850px");
                     $('.mConLList li').css("width","388px");
                     $('[name="mocbar"]').attr('title',"关闭侧栏");
                     $('[name="mocbar"]').css("background-image","url(/images/clobar.png)");
                  }else{
                     isClose++;
                     $('.mConRight').hide(300);
                     $('.mConLeft').css("width","100%");
              	     $('.mConLtop').css("width","1160px");
              	     $('.mConLcon').css("width","1160px");
                     $('.mConLList li').css("width","542px");
                     $('[name="mocbar"]').attr('title',"打开侧栏");
                     $('[name="mocbar"]').css("background-image","url(/images/opebar.png)");
                 }
                 //console.log(isClose);
             });
     }
	
	
	
	if($('[name="mfont"]').length>0) {
		
		//字体
		var cssFontSize = $(".mConLcon").find("p").css("font-size");
		var fontSize = parseFloat(cssFontSize);
		var fontUnit = cssFontSize.slice(-2);
		
		//行高
		var cssPlineH = $(".mConLcon").find("p").css("line-height");
		var lineHeight = parseFloat(cssPlineH);
		var lineUnit = cssPlineH.slice(-2);
			
		$('[name="mfont"]').click(function(){
			
			var mObj = $(this).attr("class");

			if(mObj == "mfontd") {
				if(fontSize<=24) {
					fontSize += 1;
					lineHeight += 2;
				}
			}else if(mObj == "mfonts") {
				if(fontSize>=14) {
					fontSize -= 1;
					lineHeight -= 2;
				}
			}
			$(".mConLcon").css({"font-size":fontSize + fontUnit});
			$(".mConLcon").find("p").css({"font-size":fontSize + fontUnit});
			$(".mConLcon").find("p").css({"line-height":lineHeight + lineUnit});
			
		});
		
		
		
	}
	
	
	var mflag = isChkMobile();
	if(mflag){
		
		$('embed').width("100%");
		$('embed').height(parseInt($(window).width() * 0.7));
		$('iframe').width("100%");
		$('iframe').height(parseInt($(window).width() * 0.7));

	}else{
		
		$('embed').width("100%");
		$('iframe').width("100%");
	}
	
	
	
 });
