//写cookies
function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

$(function () {
	$('.inp').next().attr('type','button');
	$('.so .so-ff form').prop("outerHTML", $('.so .so-ff form').html());
	$('.so .so-ff .inp').bind('keypress',function(event){
		if(event.keyCode == "13"){
			$(".so-ff .btn").click();
		}
	});
	$('.so-ff .btn').click(function(){
		location.href="/search.php?m=search&c=index&a=init&typeid=0&sort=updatetime&q="+$('.inp').val();
	})
    /*下载地址*/
    if ($(".down_flag").length > 0) {
        $('.down_flag .btn a').css("background","url(../statics/images/az_down_close.png) no-repeat");
        $('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/close_down.jpg">');
        $('.down_flag .btn a').removeClass('a_down');
        //$('.down_flag .btn').html('<div class="s7"><a rel="nofollow" href="javascript:;">已下架</a></div>');
    }
    /*下载地址*/
	//安卓二维码文字
	$('.header .so .so-eq span p:eq(0)').text('\u624b\u673a\u626b\u4e00\u626b');
	$('.header .so .so-eq span p:eq(1)').text('\u6d77\u91cf\u8d44\u6e90\u4e00\u624b\u638c\u63e1');
	//安卓首页开始
	$('.con .con-apptab .ul-apptxt li a').each(function(){
		if($(this).text().length>6){
			$(this).text($(this).text().substr(0,6));
		}
	});
	$('.bd .tempWrap .li-opbg li .item .con .txt .tit a').each(function(){
		if($(this).text().length>5){
			$(this).text($(this).text().substr(0,5));
		}
	});
	
	//安卓首页选中第一个分类
	$('.row-2b:eq(0) .col-r ul li:eq(0)').addClass('on');//单机
	$('.row-2b:eq(1) .col-r ul li:eq(0)').addClass('on');//网络

	//安卓首页结束
	//文章分页没有的时候隐藏
	if($('.pages a').length<=0){
		$('.pages').hide();
		$('.pages').next().hide();
	}
	if($('.art-list ul li').length<=6){
		$('.lookmore').hide();
	}

	$('.art-fd .btn .btn-good').click(function(){
		//getCmsFen(1);
		if(getCookie("zan_"+id)==null||getCookie("zan_"+id)==false){getCmsFen(1);setCookie("zan_"+id,1);}else{alert('对不起，您投票过了！');}
	});


	if(location.href.indexOf('az/d')>-1){//安卓游戏时
		if($gametype==0){$('.m-gameclass dl:eq(0) dd a:eq(0)').addClass('on');}
		if($gametype==1){$('.m-gameclass dl:eq(0) dd a:eq(1)').addClass('on');}
		if($gametype==2){$('.m-gameclass dl:eq(0) dd a:eq(2)').addClass('on');}
		if($language!=''){
		$('.m-gameclass dl:eq(1) dd a').each(function(){
		if($(this).index()==$language){
		//$('.m-gameclass dl:eq(1) dd a:eq(0)').removeClass('on');$(this).addClass('on');
		}
		});
		}

		if($catid!=''){
		$('.m-gameclass dl:eq(1) dd a').each(function(){
		if($(this).attr('val')==$catid){
		$('.m-gameclass dl:eq(1) dd a:eq(0)').removeClass('on');$(this).addClass('on');
		}
		});
		}

		if($tezheng!=''){
		$('.m-gameclass dl:eq(3) dd a').each(function(i){
		if($(this).attr('val')==$tezheng){
		//$(this).addClass('on');
		//if(i>17){$(this).parent().css('height','auto');$('.more').addClass('more-ok');$('.more').text('\u6536\u8d77');}
		}
		});
		}

		if($sort!=''){
		$('.m-gameclass dl:eq(2) dd a').each(function(){
		if($(this).index()==$sort){
		$('.m-gameclass dl:eq(2) dd a:eq(0)').removeClass('on');$(this).addClass('on');
		}
		});
		}
	}else if(location.href.indexOf('az/s')>-1){//安卓软件
        if($catid!=''){
		$('.m-gameclass dl:eq(0) dd a').each(function(){
		if($(this).attr('val')==$catid){
		$('.m-gameclass dl:eq(0) dd a:eq(0)').removeClass('on');$(this).addClass('on');
		}
		});
		}
        if($sort!=''){
		$('.m-gameclass dl:eq(1) dd a').each(function(){
		if($(this).index()==$sort){
		$('.m-gameclass dl:eq(1) dd a:eq(0)').removeClass('on');$(this).addClass('on');
		}
		});
		}
    }

	if($('.art-body').text().length<=200){//如果内容中的字数少于300个，则隐藏展开按钮
		$('.art-openz').click();
		$('.art-openz').hide();
	}

	var xgyd_isnull = true;
	$('.m-likeinfo').each(function(i){//相关阅读空的时候，删除相关阅读
		
		$(this).find('dd .slidetxt .bd .txtlist').each(function(k){
			console.log(k);
			if($.trim($(this).html())==''){$('.m-likeinfo:eq('+i+')').hide();}else{xgyd_isnull=false;}
		});
	});
	if(xgyd_isnull==true){$('#q6').hide();}

	if(location.href.indexOf('news')>-1 || location.href.indexOf('a=show')>-1 ||(typeof(is_zt)!='undefined' && is_zt=='1')){//文章时(增加专题判断)
		
		var love_not_null = false;
		$('.ul-art-tag').parent().parent().find('.tab-love-con').each(function(index){
			if($.trim($(this).find('.ul-applove').html())==''){
				$(this).hide();
			}else{love_not_null=true;}
		});
		if(love_not_null==false){$('.ul-art-tag').parent().hide();}


		if(typeof(id)!="undefined"){getCmsFen(0);}//得到好评数




jQuery(".slidetxt .bd").each(function(i){
	$(this).find('li').slice(0,6).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(6,12).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(12,18).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(18,24).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
});
/* 调用SuperSlide，每次滚动一个ul，相当于每次滚动6个li */
jQuery(".slidetxt").slide({titCell:".hd ul",mainCell:".bd .txtlist",autoPage:true,effect:"leftLoop",autoPlay:true});


		//  js 翻页
        $(document).bind('keydown', function(event) {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==37){ 
				// 按 左 上一页
                //window.location.href=""; 
				$('.pages li').each(function(i){
					if($(this).hasClass('on')){//如果是选中的
						if(i==0){alert('对不起，这已经是第一页了！');}else{window.location.href=$('.pages li:eq('+(i-1)+') a').attr('href');}
					}
				});
            }
			if(e && e.keyCode==39){ 
                 // 按 右 下一页
                 //window.location.href="";
				var pg = $('.pages li').length-2;
				$('.pages li').each(function(i){
					if($(this).hasClass('on')){//如果是选中的
					if(i==pg){alert('对不起，这已经是最后一页了！');}else{window.location.href=$('.pages li:eq('+(i+1)+') a').attr('href');}
					}
				});
            }            
         })

		$('.art-app .con .txt p:eq(1) a').each(function(i){
			$(this).click(function(){
				tzxh(i);
			});
		});
		$('.tab-love-con').each(function(i){
			if(i>0){$(this).hide();}
		});
		$('.btn-ping').click(function(){
			var ss = $('#ping').offset().top;
			$('html,body').animate({scrollTop:ss},600);
			return false;
		});
		function tzxh(x){
			  var ss = $('#q3').offset().top;
			  $('html,body').animate({scrollTop:ss},600);
			  $('.ul-art-tag li').eq(x).addClass('on').siblings('li').removeClass('on');
			  $('.tab-love-con').eq(x).show().siblings('.tab-love-con').hide();
		}
	}


	if($('.art-openz2').prev().find('li').length<5){//游戏其他版本小于5个，隐藏展开按钮
		$('.art-openz2').text('');
	}
	/*var isAllNUll = true;
	$('.tab-love-con').each(function(i){
		if($.trim($(this).find('.ul-applove').html())==''){
			$(this).hide();
			$('.bigtit .ul-art-tag li:eq('+i+')').hide();
		}else{isAllNUll=false;}
		if(i>0){
			$(this).hide();
		}
	});
	if(isAllNUll==true){$('.qbox .bigtit .ul-art-tag').parent().parent().hide();}*/

	$('.art-appinfo .m-hottag a').each(function(i){
		$(this).addClass('c'+(i+1));
	});
	$('.m-hottag a').each(function(i){
		$(this).addClass('c'+(i+1));
	});

	if($.trim($('.art-softtip').text())=='软件特别说明' || $.trim($('.art-softtip').text())=='特别说明'){$('.art-softtip').hide();}
	if($('.ul-hotgame').find('li').length<12){//热门游戏小于12个，隐藏
		$('.ul-hotgame').prev().hide();
		$('.ul-hotgame').hide();
	}

	//默认把第一个热门资讯选中
	$('.ul-hotinfo li:eq(0)').addClass('ok');
	
  // 选项卡 鼠标经过切换
  $(".TAB li").mousemove(function(){
    var tab=$(this).parent(".TAB");
    var con=tab.attr("id");
    var on=tab.find("li").index(this);
    $(this).addClass('on').siblings(tab.find("li")).removeClass('on');
    $(con).eq(on).show().siblings(con).hide();
  });

  // 选项卡 鼠标点击
  $(".TAB_CLICK li[class!='li-page']").click(function(){
    var tab=$(this).parent(".TAB_CLICK");
    var con=tab.attr("id");
    var on=tab.find("li").index(this);
    $(this).addClass('on').siblings(tab.find("li")).removeClass('on');
    $(con).eq(on).show().siblings(con).hide();
    return false;
  });


  $('.HOTTOP li').mouseover(function(){
    $(this).parent('ul').find('.ok').removeClass('ok');
    $(this).addClass('ok');
    if(!$(this).next('li').text()){
        $(this).addClass('end');
    }
  });

  $('.molook').hover(function() {
    $(this).addClass('molook-ok');
  }, function() {
    $(this).removeClass('molook-ok');
  });

  $('.art-list ul li:gt(9)').hide();

  $('.lookmore').click(function() {
     var s=$(this).hasClass('lookmore-on');
     if(s){
      $('.art-list ul li:gt(9)').hide();
       $(this).removeClass('lookmore-on');
       $(this).find('span').text('\u5c55\u5f00\u67e5\u770b\u66f4\u591a');
     }
     else
    {
        $('.art-list ul li:gt(9)').show();
        $(this).addClass('lookmore-on');
       $(this).find('span').text('\u6536\u8d77\u67e5\u770b\u66f4\u591a');
    }
    return false;
  });
  $('.art-openz1').html('<b style="cursor: pointer;">\u5c55\u5f00</b>');
  $('.art-openz1 b').click(function() {
     var s=$(this).hasClass('ok');
     if(s){
        $('.art-body2').css('height','500px');
       $(this).removeClass('ok').text('\u5c55\u5f00');
     }
     else
    {
      $(this).addClass('ok').text('\u6536\u8d77');
      $('.art-body2').css('height','auto');
    }
    return false;
  });

  $('.ul-oapp li:gt(4)').hide();

  $('.art-openz2 a').click(function() {
     var s=$(this).hasClass('ok');
     if(s){
      $('.ul-oapp li:gt(4)').hide();
       $(this).removeClass('ok').text('\u5c55\u5f00');
     }
     else
    {
        $('.ul-oapp li:gt(4)').show();
        $(this).addClass('ok').text('\u6536\u8d77');
    }
    return false;
  });


    var timer = null;
    $(".toplink .s3").hover(function() {
        clearTimeout(timer);
        $('.top-menu').show();
        $(".toplink .s3").addClass('s3-ok');
    }, function() {
        timer = setTimeout(function() {
            $('.top-menu').hide();
            $(".toplink .s3").removeClass('s3-ok');
        }, 500);
    });
 
    $(".top-menu").hover(function() {
        clearTimeout(timer);
    }, function() {
        $('.top-menu').hide();   
        $(".toplink .s3").removeClass('s3-ok');
    });

    $('.ul-apptxt li a:eq(9),.ul-apptxt li a:eq(19)').css('border',0);


    function fix(){
      w = $(window).width();
      left = (w-1200)/2-100;
      $('#fixnav').css('right',left);
      $('#s_goTop').css('right',left+482);  

    }

    fix();

    $(window).resize(function(){
      fix();
    });

    // 游戏下载更多展开

    

    $('.m-gameclass dl.okmore dd .more').click(function() {
       var s=$(this).hasClass('more-ok');
       if(s){
         $('.m-gameclass dl.okmore dd').css('height','35px');
         $(this).removeClass('more-ok').text('\u5c55\u5f00');
       }
       else
      {
          $('.m-gameclass dl.okmore dd').css('height','auto');
          $(this).addClass('more-ok').text('\u6536\u8d77');
      }
      return false;
    });



  $('#goTop,.a_top').click(function(){$(".level2 span").removeClass("qlcur");$('html,body').animate({scrollTop:0},700);});

  $('.a_down').click(function(){
    $(".catalog-title").removeClass("catalog-title-on");
    $(this).parents('.catalog-title').addClass('catalog-title-on');
    go = $(this).attr('rel');
    console.log(go);
    tt = $(go).offset().top-50;
    $('html,body').animate({scrollTop:tt},700);
  });


// 首页选项卡菜单切换

              ix = -1;
              i = 0;
              n = $('.menu-pn1 li').length - 1;
              $('.menu-pn1 .prev').click(function() {
                  i=i-4;
                  if(i<0) i = 0;
                  if(ix==i) i = n - 11;
                  $(".menu-pn1 li[class!='li-page']").hide();
                  for (var x = i ; x < i+11; x++) {
                     $('.menu-pn1 li').eq(x).show();
                  }
                  ix=i;
              });
              $('.menu-pn1 .next').click(function() {
                  i=i+4;
                  if(i + 11 >= n ) i = n - 11;
                  if(ix==i) i = 0;
                  $(".menu-pn1 li[class!='li-page']").hide();
                  for (var x = i ; x < i+11; x++) {
                     $('.menu-pn1 li').eq(x).show();
                  }
                  ix=i;
              });


              ix2 = -1;
              i2 = 0;
              n2 = $('.menu-pn2 li').length - 1;
              $('.menu-pn2 .prev').click(function() {
                  i2=i2-4;
                  if(i2<0) i2 = 0;
                  if(ix2==i2) i2 = n2 - 11;
                  $(".menu-pn2 li[class!='li-page']").hide();
                  for (var x2 = i2 ; x2 < i2+11; x2++) {
                     $('.menu-pn2 li').eq(x2).show();
                  }
                  ix2=i2;
              });
              $('.menu-pn2 .next').click(function() {
                  i2=i2+4;
                  if(i2 + 11 >= n2 ) i2 = n2 - 11;
                  if(ix2==i2) i2 = 0;
                  $(".menu-pn2 li[class!='li-page']").hide();
                  for (var x2 = i2 ; x2 < i2+11; x2++) {
                     $('.menu-pn2 li').eq(x2).show();
                  }
                  ix2=i2;
              });
              
              
              ix3 = -1;
              i3 = 0;
              n3 = $('.menu-pn3 li').length - 1;
              $('.menu-pn3 .prev').click(function() {
                  i3=i3-4;
                  if(i3<0) i3 = 0;
                  if(ix3==i3) i3 = n3 - 11;
                  $(".menu-pn3 li[class!='li-page']").hide();
                  for (var x3 = i3 ; x3 < i3+11; x3++) {
                     $('.menu-pn3 li').eq(x3).show();
                  }
                  ix3=i3;
              });
              $('.menu-pn3 .next').click(function() {
                  i3=i3+4;
                  if(i3 + 11 >= n3 ) i3 = n3 - 11;
                  if(ix3==i3) i3 = 0;
                  $(".menu-pn3 li[class!='li-page']").hide();
                  for (var x3 = i3 ; x3 < i3+11; x3++) {
                     $('.menu-pn3 li').eq(x3).show();
                  }
                  ix3=i3;
              });


              if(location.href.indexOf('news')>-1)$('body').append('<a href="javascript:;" id="gotop" class="a_top" rel="nofollow"></a>');

              $("#gotop,.gotop").click(function() {
                  $("html,body").stop(true, false).animate({
                      scrollTop: 0
                  });
              });

              gotop();
              $(window).resize(function(){
                gotop();
              });

              $(window).scroll(function() {
                s=$(window).scrollTop();
                if(s>100){
                  $('#gotop').fadeIn(300);
                }
                else
                {
                  $('#gotop').fadeOut(300);
                }
              });

              function gotop(){
                w=$(window).width();
                w2=(w-1200)/2-50;
                $('#gotop').css('right',w2);
              }

if(location.href.indexOf('news/')>-1 && (location.href.indexOf('az/z')<=-1||location.href.indexOf('az/g')<=-1||location.href.indexOf('az/v')<=-1||location.href.indexOf('az/p')<=-1||location.href.indexOf('az/l')<=-1||location.href.indexOf('az/h')<=-1)){//安卓资讯时
	getHits(4);
}
	//安卓游戏时
	if(location.href.indexOf('/az/')>-1 && location.href.indexOf('/az/d')<=-1){
		$('#gotop').remove();//往上滚隐藏
	}
	if($('.art-body2').height()>500){//如果高度大于255，则隐藏
		$('.art-body2').css('height','500px');
	}else{
		$('.art-openz').hide();
	}
	if(typeof(is_content_hide)!='undefined' && is_content_hide=='1'){$('.art-openz1 b').click();}//内容不隐藏的时候
});

function addFavorite2() {
    var url = "http://www.3h3.com";
    var title = "当游网";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("\u7531\u4e8e\u0033\u0036\u0030\u6d4f\u89c8\u5668\u529f\u80fd\u9650\u5236\uff0c\u8bf7\u6309\u0020\u0043\u0074\u0072\u006c\u002b\u0044\u0020\u624b\u52a8\u6536\u85cf\uff01");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
  try{
   window.external.addFavorite(url, title);
  }catch(e){
   alert('\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u002c\u8bf7\u6309\u0020\u0043\u0074\u0072\u006c\u002b\u0044\u0020\u624b\u52a8\u6536\u85cf\u0021');
  }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
  alert('\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u002c\u8bf7\u6309\u0020\u0043\u0074\u0072\u006c\u002b\u0044\u0020\u624b\u52a8\u6536\u85cf\u0021');
    }
}


function getCmsFen(num){//资讯页面好评数
    $.getJSON('/index.php?m=content&c=content_ajax&a=getzan&id='+id+'&modelid='+1, function(data) {
        if(data.code == 200) {
            $('.art-fd .btn .btn-good span').html('+' + data.datas.zancount);
        }
    });
}

function getHits(action){//页面统计，4为文章
	if(typeof(id)!='undefined'){
	    $.ajax({url:"/api.php?op=count&id="+id+"&modelid=1", async:true, success:function(data){}});
	}
}

function isZjDownHide(){
	$.ajax({
		type:"get",
		url:"/index.php",
		data:"action=isZjIp",
		success:function(data){
			if(data==1){
				$('.m-downaddr').hide();
			}
		}
	});
}

$(function(){
	//isZjDownHide();//隐藏下载地址
	$('.footer .footer-copy a:eq(4)').after('<em>|</em><a href="/app/custody.html" target="_blank" rel="nofollow">\u5bb6\u957f\u76d1\u63a7\u000d\u000a</a><em>|</em><a href="http://pt.3h3.com" target="_blank" rel="nofollow">\u8f6f\u4ef6\u53d1\u5e03</a>');
	$('.footer .footer-copy p:eq(0)').after('<p>\u5f53\u6e38\u7f51\u6e29\u99a8\u63d0\u793a\u003a\u9002\u5ea6\u6e38\u620f\u5a31\u4e50\u0020\u6c89\u8ff7\u6e38\u620f\u4f24\u8eab\u0020\u5408\u7406\u5b89\u6392\u65f6\u95f4\u0020\u4eab\u53d7\u5355\u673a\u6e38\u620f</p>');
})