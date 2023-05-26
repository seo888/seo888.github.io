/*  */
if($('.lazy').size()>=0){
	 $("img.lazy").lazyload({
//	 placeholder : "images/loading.gif",
	 effect : "fadeIn",
	 threshold : 200
 });
}

function IsPhoneNum(phone){
	var validateReg = /^1\d{10}$/;
	return validateReg.test($.trim(phone));
}
$(function(){
	
//top-meun
$('.header_lis').mouseenter(function(){
	$('.lis_meun').show()
	}).mouseleave(function(){
		$('.lis_meun').hide()
	})
	
//幻灯
if($('.slide-001uBox').size()>=1){
	jQuery(".slide-001uBox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true});
}

//通栏
if($('.tlpi-001uc1').size()>=1){
	jQuery(".tlpi-001uc1").slide({titCell:".tlpi-001uc1 .hd ul",mainCell:" .bd ul",autoPage:true,effect:"leftLoop",vis:4});
}
//礼包TAB

$('.L_lbt-001uop P').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
	$('.L_lbcont .L_lbl-001uist').hide().eq($(this).index()).show();
	
})

//视频TAB
$('.vid-t-001uop ul li').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
	$('.vid-l-001uis ul').hide().eq($(this).index()).show();
})

//视频排行周月TAB
$('.vidph--001utop ul li').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
	$('.vidph--001ulis ul').hide().eq($(this).index()).show();
})
//hover
$('.vidph--001ulis ul li').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
})

//排行榜TAB

$('.phb-t-001uop ul li').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
	$('.phbwr-001uap .lis').hide().eq($(this).index()).show();
})
$('.ph-b-001uox ul li').mouseenter(function(){
	$(this).addClass('on').siblings().removeClass('on');
})

//左右 滚动
	function HomeScroll(a,b){function g(){var g=$(window).scrollLeft(),h=$(window).scrollTop(),i=$(document).height(),j=$(window).height(),k=c.height(),l=d.height(),m=k>l?f:e,n=k>l?d:c,o=k>l?c.offset().left+c.outerWidth(!0)-g:d.offset().left-c.outerWidth(!0)-g,p=k>l?l:k,q=k>l?k:l,r=parseInt(q-j)-parseInt(p-j);$(a+","+b).removeAttr("style"),j>i||p>q||m>h||p-j+m>=h?n.removeAttr("style"):j>p&&h-m>=r||p>j&&h-m>=q-j?n.attr("style","margin-top:"+r+"px;"):n.attr("style","_margin-top:"+(h-m)+"px;position:fixed;left:"+o+"px;"+(j>p?"top":"bottom")+":0;")}if($(a).length>0&&$(b).length>0){var c=$(a),d=$(b),e=c.offset().top,f=d.offset().top;$(window).resize(g).scroll(g).trigger("resize")}}
	$(function(){
//		HomeScroll(".con-left",".con-right");
		HomeScroll(".phb-ri-001ught",".phb-right");
//		HomeScroll(".flph_l",".flph_r");
	})

	//图片位置
  function resize_left(){
	  var win_w = $(window).width();
	  var img_w = $('.ztb-001ug ul li img').width();
	  if(win_w>=1200){
	  	$('.ztb-001ug ul li img').css('left',win_w/2 - img_w/2)
	  
	  }
	  	$('.Mid-001u2 .ztb-001ug .mengb-001uan').css('left',win_w/2 - 800)
	  	
	}
 	function go_up(){// fixnav
 		var win_w =  $(window).width();
		var top_r = (win_w - 1200) /2 - 60;
    	$('.Fix_n-001uav').css('right',top_r);
    	$('.Fix_n-001uav ul li').click(function(){
    		var date_c = $(this).attr('data-position')
    		if(date_c == 'top'){
    			$("html,body").animate({scrollTop: 0}, 500);
    		}else{
    			var nav_num = document.getElementById(date_c).offsetTop
				$("body,html").animate({scrollTop:nav_num},500);
    		}
    		
    		
		})
	}
 	
    go_up();
	
	
	 $(window).scroll(function(){
	 	var scroll_len = $(window).scrollTop();
	 	 if(scroll_len > 300) {
            $('.Fix_n-001uav').fadeIn();
        } else {
            $('.Fix_n-001uav').fadeOut();
        };
	 })
	
	$(window).resize(function() {
	  resize_left();
	 // go_up();
	});
	resize_left()

//	专题栏背景tab
	$('.Mid2--001utab ul li').mouseenter(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.Mid2-l-001uist .lis-001ut').hide().eq($(this).index()).show();
		$('.ztb-001ug ul li').eq($(this).index()).addClass('on').siblings().removeClass('on');
		$('.ztb-001ug ul li').stop(true,true).animate({opacity:"0.2"},400);
		$('.ztb-001ug ul li').eq($(this).index()).addClass('on').stop(true,true).animate({opacity:"1"});
	})
	
//	新闻列表 右 R tab
	$('.rtab span').mouseenter(function(){
		var this_ = $(this).parents('.rtab').find('span');
		var thisp_ = $(this).parents('.bt-c2').next('.rtabwarp').find('.rtablist');
		var rtbnm = $(this).index();
		this_.removeClass('rtabstyle');
		$(this).addClass('rtabstyle');
		thisp_.hide();
		thisp_.eq(rtbnm).show();
	})
	
	
//	随机成成标签样式
	var x = 20;
	var y = 1;
	
	$('.bq_likelis ul li,#tagscloud a').each(function(){
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		$(this).addClass('c_'+ rand)
	})

})

//listtab
$('.bt--001uc span').mouseenter(function(){
	var tab_num = $(this).index();
	$(this).parent('.bt--001uc').find('span').removeClass('bttab-s-001utyle');
	$(this).parent('.bt--001uc').find('span').eq(tab_num-1).addClass('bttab-s-001utyle');
	$(this).parent('.bt--001uc').next('.tab-c-001uont').find('.tab-l-001uist').hide();
	$(this).parent('.bt--001uc').next('.tab-c-001uont').find('.tab-l-001uist').eq(tab_num-1).show();
	//downl_info
	if(tab_num==1){
		$('.tab-link a').eq(0).show().siblings().hide()
	}else{
		$('.tab-link a').eq(1).show().siblings().hide()
	}
	
})


//排行榜样式
	$('.phb-l-001uisc>ul>li').eq(0).find('.phlis-lef').find('span').css('background-position','-150px 0');
	$('.phb-l-001uisc>ul>li').eq(1).find('.phlis-lef').find('span').css('background-position','-100px 0');
	$('.phb-l-001uisc>ul>li').eq(2).find('.phlis-lef').find('span').css('background-position','-50px 0');

//phlist show
	$('.phb-ri-001ught ul li p').click(function(){
		$('.phb-ri-001ught ul li .phb-l-001uist').hide();
		$(this).parent('li').find('.phb-l-001uist').slideToggle();
		$('.phb-ri-001ught ul li').removeClass('phb-s-001utyl');
		$(this).parent('li').addClass('phb-s-001utyl');
	})
//phtop showmor
	var listb = true
	$('.ls-showmor').click(function(){
		$('.phb-r--001utop ul').css('max-height','none');
		var maxh = $('.phb-r--001utop ul').height();
		$('.phb-r--001utop ul').css('max-height','120px');
		if(listb==true){
			$('.phb-r--001utop ul').animate({maxHeight:maxh+20},'fast');
			$(this).find('p').html('- 收起')
			listb = false
		}else{
			$('.phb-r--001utop ul').animate({maxHeight:'120px'},'fast');
			$(this).find('p').html('+ 展开')
			listb = true
		}
	})
	
if($('#tagscloud').size()>=1){
		//标签云
	var radius = 90;
	var d = 250;
	var dtr = Math.PI / 180;
	var mcList = [];
	var lasta = 1;
	var lastb = 1;
	var distr = true;
	var tspeed = 11;
	var size = 200;
	var mouseX = 0;
	var mouseY = 10;
	var howElliptical = 1;
	var aA = null;
	var oDiv = null;
	window.onload=function ()
	{
		var i=0;
		var oTag=null;
		oDiv=document.getElementById('tagscloud');
		aA=oDiv.getElementsByTagName('a');
		for(i=0;i<aA.length;i++)
		{
			oTag={};		
			aA[i].onmouseover = (function (obj) {
				return function () {
					obj.on = true;
					this.style.zIndex = 9999;
					this.style.padding = '5px 5px';
					this.style.filter = "alpha(opacity=100)";
					this.style.opacity = 1;
				}
			})(oTag)
			aA[i].onmouseout = (function (obj) {
				return function () {
					obj.on = false;
					this.style.zIndex = obj.zIndex;
					this.style.padding = '5px';
					this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
					this.style.opacity = obj.alpha;
					this.style.zIndex = obj.zIndex;
				}
			})(oTag)
			oTag.offsetWidth = aA[i].offsetWidth;
			oTag.offsetHeight = aA[i].offsetHeight;
			mcList.push(oTag);
		}
		sineCosine( 0,0,0 );
		positionAll();
		(function () {
	            update();
	            setTimeout(arguments.callee, 40);
	        })();
	};
	function update()
	{
		var a, b, c = 0;
	        a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
	        b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
	        lasta = a;
	        lastb = b;
	        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
	            return;
	        }
	        sineCosine(a, b, c);
	        for (var i = 0; i < mcList.length; i++) {
	            if (mcList[i].on) {
	                continue;
	            }
	            var rx1 = mcList[i].cx;
	            var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
	            var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;
	
	            var rx2 = rx1 * cb + rz1 * sb;
	            var ry2 = ry1;
	            var rz2 = rx1 * (-sb) + rz1 * cb;
	
	            var rx3 = rx2 * cc + ry2 * (-sc);
	            var ry3 = rx2 * sc + ry2 * cc;
	            var rz3 = rz2;
	
	            mcList[i].cx = rx3;
	            mcList[i].cy = ry3;
	            mcList[i].cz = rz3;
	
	            per = d / (d + rz3);
	
	            mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
	            mcList[i].y = ry3 * per;
	            mcList[i].scale = per;
	            var alpha = per;
	            alpha = (alpha - 0.6) * (10 / 6);
	            mcList[i].alpha = alpha * alpha * alpha - 0.2;
	            mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
	        }
	        doPosition();
	}
	function positionAll()
	{
		var phi = 0;
	    var theta = 0;
	    var max = mcList.length;
	    for (var i = 0; i < max; i++) {
	        if (distr) {
	            phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
	            theta = Math.sqrt(max * Math.PI) * phi;
	        } else {
	            phi = Math.random() * (Math.PI);
	            theta = Math.random() * (2 * Math.PI);
	        }
	        //坐标变换
	        mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
	        mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
	        mcList[i].cz = radius * Math.cos(phi);
	
	        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
	        aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
	    }
	}
	function doPosition()
	{
		var l = oDiv.offsetWidth / 2;
	        var t = oDiv.offsetHeight / 2;
	        for (var i = 0; i < mcList.length; i++) {
	            if (mcList[i].on) {
	                continue;
	            }
	            var aAs = aA[i].style;
	            if (mcList[i].alpha > 0.1) {
	                if (aAs.display != '')
	                    aAs.display = '';
	            } else {
	                if (aAs.display != 'none')
	                    aAs.display = 'none';
	                continue;
	            }
	            aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
	            aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
	            //aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
	            //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
	            aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
	            aAs.zIndex = mcList[i].zIndex;
	            aAs.opacity = mcList[i].alpha;
	        }
	}
	function sineCosine( a, b, c)
	{
		sa = Math.sin(a * dtr);
	    ca = Math.cos(a * dtr);
	    sb = Math.sin(b * dtr);
	    cb = Math.cos(b * dtr);
		sc = Math.sin(c * dtr);
		cc = Math.cos(c * dtr);
	}
}

//	合集详情设备切换
$('.xt-tab').css('height',$('.zthj-list').eq(0).height()+20)
$('.xt_tab span').mouseenter(function(){
	$('.xt_tab span').removeClass('bttab-s-001utyle2');
	$(this).addClass('bttab-s-001utyle2');
	var indx_nm = $(this).index();
	if(indx_nm==0){
		var url = $('.top-nav a').eq(1).attr('href');
		$('.urls').attr('href',url);
		$('.zthj-list').eq(0).stop(true, true).animate({marginLeft:'0'},'fast')
		$('.xt-tab').css('height',$('.zthj-list').eq(0).height()+20)
	}else if(indx_nm==1){
		var url = $('.top-nav a').eq(2).attr('href');
		$('.urls').attr('href',url);
		$('.zthj-list').eq(0).stop(true, true).animate({marginLeft:'-1244px'},'fast')
		$('.xt-tab').css('height',$('.zthj-list').eq(1).height()+20)
	}
	return false
})

/*
$('.xt_tab span').mouseenter(function(){
		$('.xt_tab span').removeClass('bttab-s-001utyle2');
		$(this).addClass('bttab-s-001utyle2');
		var indx_nm = $(this).index();
		if(indx_nm==0){
			$('.zthj-list').eq(0).stop(true, true).animate({marginLeft:'0'},'fast')
			$('.xt-tab').css('height','auto')
		}else if(indx_nm==1){
			$('.zthj-list').eq(0).stop(true, true).animate({marginLeft:'-1255px'},'fast')
			$('.xt-tab').css('height',$('.zthj-list').eq(1).height()+20)
		}
		return false
	})
*/

//页游下一页
$('.nextpg span').click(function(){
	if($(this).html() == '上一页'){
		$(this).html('下一页')
		$('.tjwrap ul').animate({'left':'0'},100)
	}else{
		$(this).html('上一页')
		$('.tjwrap ul').animate({'left':'-1226px'},100)
	}
	
	
})
$(document).ready(function() {
	function resizeWindow() {
		var l_width;
		var r_width;
		var screenWidth = $(window).width();
		l_width = (screenWidth - 1200) / 2 - 140;
		r_width = (screenWidth - 1200) /2 - 140;
		$("#cs_left_couplet").css('left',l_width);
		$("#cs_right_couplet").css('right',r_width);
		$("#cs_CFdivdlST_B_0").css('left',l_width);
		$("#cs_CFdivdlST_B_1").css('right',r_width);
	}
	$(window).resize(function() {
		resizeWindow();
	});
	$(window).scroll(function() {
		resizeWindow();
	});
	resizeWindow();
});