$(function(){
  //nav
  $('.nav ul.font24>li').each(function(){
	     if($(this).has('div').length>0){
			 $(this).hover(function(){
				 $(this).find('div').stop(true,false).slideDown('fast');
				 $(this).find('>a').addClass('cur')
				 },function(){
					   $(this).find('div').stop(true,false).slideUp('fast');
				       $(this).find('>a').removeClass('cur')
					 })
			 }
		 $(this).find('ul').css('margin-left',$(this).position().left)
	  })
  
  
  $('.wx_box .bd ul li a').each(function(){
	  $(this).hover(function(){
		  $(this).find('>i').fadeIn('fast')
		  },function(){
			  $(this).find('>i').fadeOut('fast')
			  })
	  })
  
  
  $('.share a:nth-child(1)').hover(function(){
	  $(this).find('div').stop(true,false).fadeIn('fast')
	  },function(){
		  $(this).find('div').stop(true,false).fadeOut('fast')
		  })
  
  
  //ie8
  $('.nav>.w1200>ul>li:last').css('border',0)
  $('.tb01 td.song>div').eq(5).find('a').css({
	  'width':'auto',
	  'height':'auto',
	  'border':0
	  })
	  
  // go top  
 $('.floatR li.backToTop').click(function(){
	 $('html,body').animate({scrollTop:0},500)
  })

	
})

//tab
  function setTab(name,cursel,n){
	for(var i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		    con=document.getElementById('con_'+name+'_'+i);
		menu.className=i==cursel?'hover':'';
		con.style.display=i==cursel?'block':'none'
		}
	}

//内容页标题、日期、字号滑动
$(function(){
        var mobile_flag = isMobile();
        if(mobile_flag){
                
        }else{
           doc_fixed()     
        }
    })
$(window).resize(function(){
	doc_fixed()
	if($(window).width() < 1200){
		$(".head").removeClass("fixed_head").removeAttr("style");
		$(".fixed_title").detach();
		$(".i_nav").show();
		}
	})
 //判断是否是手机
function isMobile() {
  var userAgentInfo = navigator.userAgent;
  var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
  var mobile_flag = false;
  //根据userAgent判断是否是手机
   for (var v = 0; v < mobileAgents.length; v++) {
     if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
       mobile_flag = true;
       break;
      }
     }
   var screen_width = window.screen.width;
   var screen_height = window.screen.height;    
   //根据屏幕分辨率判断是否是手机
   if(screen_width < 500 && screen_height < 800){
      mobile_flag = true;
     }
     return mobile_flag;
  }

//内容页滑动效果
function doc_fixed(){
 $(document).ready(function () {  
    if($(".bigTit").length > 0){
		var menuYloc = $(".bigTit").offset().top;
		var title = $(".bigTit").html();
		var win_width = $(window).width()
		$(window).scroll(function () { 
		  if($(window).scrollTop() > menuYloc && win_width > 1200){
			  $(".head").addClass("fixed_head").css("position","fixed").animate({ top: '0' }, { duration: 0, queue: false }); 
			  var fd_title = $(".head").children().hasClass("fixed_title");
			  if(!fd_title){
				  $(".head .home").after('<p class="fixed_title">' +  title + '</p>');
				  }
			  if($(".bigTit").hasClass("long_title")){
			     $(".fixed_title").addClass("long_title") 
			    };
			  $(".ldate").css("position","fixed").animate({ top: '80px' }, { duration: 0, queue: false }); 
			  $(".rcon .fontSize").animate({ top: $(window).scrollTop() }, { duration: 600, queue: false });
			   $('.floatR').css({
				   'position':'fixed',
				   'left':"50%"
				   }).animate({ top: 200 }, { duration: 300, queue: false });
			  $(".i_nav").hide();
			}else{
				$(".head").removeClass("fixed_head").removeAttr("style");
				$(".fixed_title").detach();
				$(".i_nav").show();
				$(".ldate").removeAttr("style");
				$(".fontSize").animate({ top: 0 }, { duration: 600, queue: false });
				$('.floatR').css({
				   'position':'fixed',
				   'left':"50%"
				   }).animate({ top: 280 }, { duration: 300, queue: false });
				}
	 
		  }); 
		}else{
		  //首页、列表页右侧工具条滑动
	      $(window).scroll(function () { 
		     if($(window).scrollTop() > 200){
			  $('.floatR').css({
				   'position':'fixed',
				   'left':"50%"
				   }).animate({ top: 20 }, { duration: 300, queue: false });
			  }else{
				  $('.floatR').css({
				   'position':'fixed',
				   'left':"50%"
				   }).animate({ top: 280 }, { duration: 300, queue: false });
				  }
		     })
			}

 }); 
}


//font big
$(".big i").click(function(){
	var arc = $("#zoom");
	var arc_font = arc.attr("class");
	$(this).parent().siblings("li").children("i").removeClass("default");
	if(arc_font == "font22"){
		$(this).addClass("default");
		}
		else{
			$(this).removeClass("default");
			switch(arc_font) {
			 case 'font14':
				arc.removeClass("font14").addClass("font16");
				break;
			 case 'font16':
				arc.removeClass("font16").addClass("font18");
				break;
			 case 'font18':
				arc.removeClass("font18").addClass("font20");
				break;
			 case 'font20':
				arc.removeClass("font20").addClass("font22");
				break;
			 default:
				
			  } 
			}
	})
//font small
  $(".small i").click(function(){
  var arc = $("#zoom");
  var arc_font = arc.attr("class");
  $(this).parent().siblings("li").children("i").removeClass("default");
  if(arc_font == "font14"){
	  $(this).addClass("default");
	  }
	  else{
		  $(this).removeClass("default");
		  switch(arc_font) {
		   case 'font22':
			  arc.removeClass("font22").addClass("font20");
			  break;
		   case 'font20':
			  arc.removeClass("font20").addClass("font18");
			  break;
		   case 'font18':
			  arc.removeClass("font18").addClass("font16");
			  break;
		   case 'font16':
			  arc.removeClass("font16").addClass("font14");
			  break;
		   default:
			  
			} 
		  }
  })
  
//share
 
var $ShareLi = $('.share');
var share_url = encodeURIComponent(location.href);
var share_title = encodeURIComponent(document.title);

//qq空间
$($ShareLi).find('.fa-star').on('click', function () {
	window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share_url + "&title=" + share_title , "newwindow");
});

//新浪微博
$($ShareLi).find('.fa-weibo').on('click', function () {
	var param = {
		url: share_url,
		title: share_title,
		rnd: new Date().valueOf()
	};
	var temp = [];
	for (var p in param) {
		temp.push(p + '=' + encodeURIComponent(param[p] || ''))
	}
	//window.open('http://v.t.sina.com.cn/share/share.php?' + temp.join('&'));
	window.open("http://v.t.sina.com.cn/share/share.php?appkey=4120396272&title=" + share_title+"&url="+share_url)
});

//腾讯微博
$($ShareLi).find('.fa-tencent-weibo').on('click', function () {
	window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + share_title + '&url=' + share_url + '', 'newwindow');
});

//领导专栏
$(".hide_show i").click(function(){
	$(this).toggleClass("up");
	$(".intor").toggleClass("show");
})


//内容页头部隐藏
$(document).ready(function () {  
    if($(".tit01").length > 0){
		$(".head").addClass("article_head")
		}
	$(".bottom").append('<div class="mob_bottom"> 1998-2023 无锡日报报业集团无锡新传媒网版权所有</div>')
})

//2023/2/13移动端内容页导航
$(function(){
	var mob_nav = "<div class='mob_nav'><div class='logo'><a href='/'><img src='/static/images/logo_white.png'></a></div><div class='back'><a href='/'>返回首页</a></div>"
	if ($(".article_head").length > 0){
		$('body').prepend(mob_nav)
	}
})