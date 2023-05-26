/*图文混排焦点图*/
window.onload = function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 5;
            var animated = false;
            var interval = 3000;
            var timer;


            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -600 * len + 'px';
                        }
                        if(left<(-600 * len)) {
                            list.style.left = '-600px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }

            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 5) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-600);
                showButton();
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 5;
                }
                else {
                    index -= 1;
                }
                animate(600);
                showButton();
            }

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -600 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }

            container.onmouseover = stop;
            container.onmouseout = play;

            play();

        }
		

//首页 观察/理论频道 切换
$(function(){
  $(".tab_gc_title a").mouseover(function(){
       var i=$(this).index();
       $(".tab_gc").eq(i).show().siblings().hide();
 });
});

//头部小图标显示效果
function header_top(){
	var oSina=document.getElementById('sina');	
	var oWenxi=document.getElementById('wenxi');	
	oSina.onmouseover=function(){
		oSina.className='on';
	};
	oSina.onmouseout=function(){
		oSina.className='';
	};
	oWenxi.onmouseover=function(){
		oWenxi.className='on';	
	};
	oWenxi.onmouseout=function(){
		oWenxi.className='';
	};
	var oLoginIco=document.getElementById('login_ico');
	var oLogin=document.getElementById('login');
	var oClose=document.getElementById('close');
	oLoginIco.onclick=function(){
		oLogin.style.display='block';
	};
	oClose.onclick=function(){
		oLogin.style.display='none';
	};
};
//给导航增加当前样式
function set_class(li,cur,text){  //选择器,加的样式 、文本
 var name=li; 
 text=jQuery.trim(text);
  jQuery(name).each(function(){
    var li_text=jQuery.trim(jQuery(this).text()+"");
   if(li_text==text){
       jQuery(this).addClass(cur);
  }
});
}

/******标签切换*******/
//"id"为需要切换样式的层的id,与切换相对应的内容id命名规则为id_main_i."cur"为当前层的样式名字."s"为需要切换样式的每个容器的标签,如p、span、li等.
function tabs(id,cur,s){
	var content="_main_";
	if ( jQuery("#"+id).length){
	function closeContent(id,length){
		for(var i=1;i<=length;i++){
		jQuery("#"+id+content+i).hide();
			}	
		}
	var length=jQuery("#"+id+"  "+s).length;
	 jQuery("#"+id+"  "+s).each(function(i){
		jQuery(this).hover(function(){
			 jQuery("#"+id+"  "+s).removeClass(cur);   
			 closeContent(id,length);
			 jQuery(this).addClass(cur);
			 jQuery("#"+id+content+(i+1)).show();
		},function(){
		});						 
	});
	}//end length
}

/******标签切换和图片切换*******/
function tabs2(id,cur,s){
	var content="_main_";
	if ( jQuery("#"+id).length){
	function closeContent(id,length){
		for(var i=1;i<=length;i++){
		jQuery("#"+id+content+i).hide();
			}	
		}
	var length=jQuery("#"+id+"  "+s).length;
	 jQuery("#"+id+"  "+s).each(function(i){
		jQuery(this).hover(function(){
			 jQuery("#"+id+"  "+s).removeClass(cur);   
			 closeContent(id,length);
			 jQuery(this).addClass(cur);			 
			 jQuery("#"+id+content+(i+1)).show();
			 if(i==1 && !jQuery(this).hasClass("o")){
				jQuery("#index_box3_main2").jCarouselLite({
					  btnNext: "#tabs3_prev2",
					  btnPrev: "#tabs3_next2",
					  speed:1000,
					  visible:5,
					  scroll:1,
					  auto:1000
					  });
			 }
			 jQuery(this).addClass("o");
			 
		},function(){
		});						 
	});
	}//end length
}
/******标签切换和图片切换*******/
function tabs3(id,cur,s){
	var content="_main_";
	if ( jQuery("#"+id).length){
	function closeContent(id,length){
		for(var i=1;i<=length;i++){
		jQuery("#"+id+content+i).hide();
			}	
		}
	var length=jQuery("#"+id+"  "+s).length;
	 jQuery("#"+id+"  "+s).each(function(i){
		jQuery(this).hover(function(){
			 jQuery("#"+id+"  "+s).removeClass(cur);   
			 closeContent(id,length);
			 jQuery(this).addClass(cur);			 
			 jQuery("#"+id+content+(i+1)).show();
			 if(i==1 && !jQuery(this).hasClass("o")){

			jQuery("#index_tabs2").jCarouselLite({
				auto:3000,
				speed:1000,
				visible:1,
				btnNext: "#index_tabs2_next",
				btnPrev: "#index_tabs2_prev",
				stop:$("#index_tabs2"),
				btnGo: $("#index_tabs2_li li"),
				btnGoOver:true
            });  
                           
			 }
			 if(i==2 && !jQuery(this).hasClass("o")){
			jQuery("#index_tabs3").jCarouselLite({
				auto:3000,
				speed:1000,
				visible:1,
				btnNext: "#index_tabs3_next",
				btnPrev: "#index_tabs3_prev",
				stop:$("#index_tabs3"),
				btnGo: $("#index_tabs3_li li"),
				btnGoOver:true
            });  
                           
			 }
			 if(i==3 && !jQuery(this).hasClass("o")){
			jQuery("#index_tabs4").jCarouselLite({
				auto:3000,
				speed:1000,
				visible:1,
				btnNext: "#index_tabs4_next",
				btnPrev: "#index_tabs4_prev",
				stop:$("#index_tabs4"),
				btnGo: $("#index_tabs4_li li"),
				btnGoOver:true
            });    
                           
			 }
			 jQuery(this).addClass("o");
			 
		},function(){
		});						 
	});
	}//end length
}
//幻灯切换
(function($) {                                          // update by liyonghai 2010-07-02
$.fn.jCarouselLite = function(o) {
    o = $.extend({
        btnPrev:null,
        btnNext:null,
        btnGo:null,
        btnGoOver:false,
        mouseWheel:false,
        auto:null,
        speed:200,
        easing:null,
        vertical:false,
        circular:true,
        visible:3,
        start:0,
        scroll:1,
        stop:null,//鼠标悬停
		currClass:"on",
		timer:null,
        beforeStart:null,
        afterEnd:null
    }, o || {});
 
    return this.each(function() {                           // Returns the element collection. Chainable.

        var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
        var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;

        if(o.circular) {
            ul.prepend(tLi.slice(tl-v-1+1).clone())
              .append(tLi.slice(0,v).clone());
            o.start += v;
        }

        var li = $("li", ul), itemLength = li.size(), curr = o.start;
        div.css("visibility", "visible");

        li.css({overflow: "hidden", float: o.vertical ? "none" : "left"});
        ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
        div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

        var liSize = o.vertical ? height_(li) : width_(li);   // Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
        var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

        li.css({width: li.width(), height: li.height()});
        ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

        div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

        if(o.btnPrev)
            $(o.btnPrev).click(function() {
                return go(curr-o.scroll);
            });

        if(o.btnNext)
            $(o.btnNext).click(function() {
                return go(curr+o.scroll);
            });

        if(o.btnGo)
            o.btnGo.each(function(i, val) {
                $(this).click(function() {
					if(o.timer)clearInterval(o.timer);
					o.btnGo.removeClass(o.currClass);
					$(this).addClass(o.currClass);
					var g = o.circular ? o.visible*(i+1) : i;
					//window.console.info("g:"+g+","+o.circular);
                    			go(g);
                });
                if(o.btnGoOver){
                $(this).mouseover(function() {
                    running = false;

                    if(o.timer)clearInterval(o.timer);
                    var r = go(o.circular ? o.visible+i : i);
                    $.each(o.btnGo, function(i, val) {$(this).removeClass(o.currClass);});
                    //o.btnGo.removeClass(o.currClass);
		    $(this).addClass(o.currClass);
		    return r;
                });}
            });

        if(o.mouseWheel && div.mousewheel)
            div.mousewheel(function(e, d) {
                return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
            });

        if(o.auto){autoscroll();}

		if(o.stop){
			o.stop.mouseover(function(){
			 if(o.timer)clearInterval(o.timer);
			}).mouseout(function(){
				autoscroll();
			});
		}

		function autoscroll()
		{
		       if(o.auto){
			o.timer = setInterval(function() {
                go(curr+o.scroll);
            }, o.auto+o.speed);}
		};

        function vis() {
            return li.slice(curr).slice(0,v);
        };

        function go(to) {
            if(!running) {

                if(o.beforeStart)
                    o.beforeStart.call(this, vis());

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<=o.start-v-1) {           // If first, then goto last
                        ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
                        curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
                    } else if(to>=itemLength-v+1) { // If last, then goto first
                        ul.css(animCss, -( (v) * liSize ) + "px" );
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
                        curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                }                           // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                ul.stop().animate(
                    animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis());
                        if(o.btnGo)
                        {
                            $(o.btnGo).each(function(i,j){
                            //window.console.info(i+","+j);
                             $(j).removeClass(o.currClass); }); 
                            var index = curr;
                            var tlt = o.visible * o.btnGo.size();
                            //window.console.info("tlt:"+tlt);                        
                            if(index>tlt){index =1;}else{
                            if(index<=0){index=o.btnGo.size();}
                            else{index = index /o.visible;}
                            }
                            //window.console.info("v:"+v+","+tl+",curr:"+curr+","+index+","+o.btnGo[index-1]);
                            $(o.btnGo[index-1]).addClass(o.currClass);
                        }
                        running = false;
                    }
                );
                // Disable buttons when the carousel reaches the last/first, and enable when not
                if(!o.circular) {
                    $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                }

            }
            return false;
        };
    });
};
function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
};
function width_(el) {
    return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
};
function height_(el) {
    return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
};

})(jQuery);


//文字变大变小
function toBig(){
	var oBox=document.getElementById('text');
	oBox.className='size_big';	
}
function toSmall(){
	var oBox=document.getElementById('text');
	oBox.className='size_small';	
}

//日期
function oDate(){
 var   CalendarData=new   Array(20);   
  var   madd=new   Array(12);   
  var   TheDate=new   Date();   
  var   tgString="甲乙丙丁戊己庚辛壬癸";   
  var   dzString="子丑寅卯辰巳午未申酉戌亥";   
  var   numString="一二三四五六七八九十";   
  var   monString="正二三四五六七八九十冬腊";   
  var   weekString="日一二三四五六";   
  var   sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";   
  var   cYear;   
  var   cMonth;   
  var   cDay;   
  var   cHour;   
  var   cDateString;   
  var   DateString;   
  var   Browser=navigator.appName;   
    
  function   init()   
  {     
      CalendarData[0]=0x41A95;   
      CalendarData[1]=0xD4A;   
      CalendarData[2]=0xDA5;   
      CalendarData[3]=0x20B55;   
      CalendarData[4]=0x56A;   
      CalendarData[5]=0x7155B;   
      CalendarData[6]=0x25D;   
      CalendarData[7]=0x92D;   
      CalendarData[8]=0x5192B;   
      CalendarData[9]=0xA95;   
      CalendarData[10]=0xB4A;   
      CalendarData[11]=0x416AA;   
      CalendarData[12]=0xAD5;   
      CalendarData[13]=0x90AB5;   
      CalendarData[14]=0x4BA;   
      CalendarData[15]=0xA5B;   
      CalendarData[16]=0x60A57;   
      CalendarData[17]=0x52B;   
      CalendarData[18]=0xA93;   
      CalendarData[19]=0x40E95;   
      madd[0]=0;   
      madd[1]=31;   
      madd[2]=59;   
      madd[3]=90;   
      madd[4]=120;   
      madd[5]=151;   
      madd[6]=181;   
      madd[7]=212;   
      madd[8]=243;   
      madd[9]=273;   
      madd[10]=304;   
      madd[11]=334;   
    }   
    
  function   GetBit(m,n)   
  {     
        return   (m>>n)&1;   
  }   
    
  function   e2c()   
  {       
      var   total,m,n,k;   
      var   isEnd=false;   
      var   tmp=TheDate.getYear();   
      if   (tmp<1900)     tmp+=1900;   
      total=(tmp-2001)*365   
          +Math.floor((tmp-2001)/4)   
          +madd[TheDate.getMonth()]   
          +TheDate.getDate()   
          -23;   
      if   (TheDate.getYear()%4==0&&TheDate.getMonth()>1)   
          total++;   
      for(m=0;;m++)   
      {       
          k=(CalendarData[m]<0xfff)?11:12;   
          for(n=k;n>=0;n--)   
          {   
              if(total<=29+GetBit(CalendarData[m],n))   
              {     
                  isEnd=true;   
                  break;   
              }   
              total=total-29-GetBit(CalendarData[m],n);   
          }   
          if(isEnd)break;   
      }   
      cYear=2001   +   m;   
      cMonth=k-n+1;   
      cDay=total;   
      if(k==12)   
      {   
          if(cMonth==Math.floor(CalendarData[m]/0x10000)+1)   
              cMonth=1-cMonth;   
          if(cMonth>Math.floor(CalendarData[m]/0x10000)+1)   
              cMonth--;   
      }   
      cHour=Math.floor((TheDate.getHours()+3)/2);   
  }   
    
  function   GetcDateString()   
  {   var   tmp="";   
      tmp+=tgString.charAt((cYear-4)%10);       //年干   
      tmp+=dzString.charAt((cYear-4)%12);       //年支   
      tmp+="年(";   
      tmp+=sx.charAt((cYear-4)%12);   
      tmp+=") ";   
      if(cMonth<1)   
      {     
        tmp+="闰";   
          tmp+=monString.charAt(-cMonth-1);   
      }   
      else   
          tmp+=monString.charAt(cMonth-1);   
      tmp+="月";   
      tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"卅"));   
      if(cDay%10!=0||cDay==10)   
          tmp+=numString.charAt((cDay-1)%10);   
      tmp+="    ";   
      if(cHour==13)tmp+="夜";   
          tmp+=dzString.charAt((cHour-1)%12);   
      tmp+="时";   
      cDateString=tmp;   
      return   tmp;   
  }   
    
  function   GetDateString()   
  {     
      var   tmp="";   
      var   t1=TheDate.getYear();   
      if   (t1<1900)t1+=1900;   
      tmp+=t1   
                +"年"   
                +(TheDate.getMonth()+1)+"月"   
                +TheDate.getDate()+"日"   
                //+TheDate.getHours()+":"   
                //+((TheDate.getMinutes()<10)?"0":"")   
                //+TheDate.getMinutes() 
                +"&nbsp;&nbsp;&nbsp;星期"+weekString.charAt(TheDate.getDay());     
      DateString=tmp;   
      return   tmp;   
  }
    
  init();   
  e2c();   
  GetDateString(); 
  document.write(DateString);
}

//跳转翻页
function  goto(){
        var  page= parseInt($('input[name="page"]').val());         
         if(page>0  &&  page<=totalpage){
                     if(page==1)
                    location.href="list.shtml";
                    else
                    location.href="list_"+page+".shtml";
         } 
}
//跳转翻页2
function  goto2(){
        var  page= parseInt($('input[name="page"]').val());         
         if(page>0  &&  page<=totalpage){
                     if(page==1)
                    location.href="list2.shtml";
                    else
                    location.href="list2_"+page+".shtml";
         } 
}
//天气
function weathers(){
	     var cityid=$("select[name='city'] option:selected").val();
                  $.ajax({
                     type : 'get',
	            data : 'cityid='+cityid,
	            url : '/weather/weather.php',
                    dataType : 'json',
                    success : function(msg){
		      if(msg){		 
	          $('#wind').html(msg.weather+" "+msg.temp1+"~"+msg.temp2+"<img src='http://i.tq121.com.cn/i/mobile/images/"+msg.img1+"' width='30px' height='30px' /><img src='http://i.tq121.com.cn/i/mobile/images/"+msg.img2+"' width='30px' height='30px' />");
	                   }
	                 }
                      });

                     }

	function beijing(){
	                 $.ajax({
                     type : 'get',
	                  url : '/weather/weather.php',
                 dataType : 'json',
                  success : function(msg){
		      if(msg){		 
	          $('#wind').html(msg.weather+" "+msg.temp1+"~"+msg.temp2+"<img src='http://i.tq121.com.cn/i/mobile/images/"+msg.img1+"' width='30px' height='30px' /><img src='http://i.tq121.com.cn/i/mobile/images/"+msg.img2+"' width='30px' height='30px' />");
	                   }
	                 }
                      });
	            }

function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}

//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n请使用Ctrl+D进行添加");
        }
    }
}

function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}



$(function(){
	$('.qikan_list_ico li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.qikan_list .qk_list').eq(i).show().siblings().hide()
	})
	
	$('.dfzlk_main .left_box ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.right_box .right_box_li').eq(i).show().siblings().hide();
	})
	$('#tabs1 .df_list ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$("#tabs1 .df_box1 .df_rwtx_list").eq(i).show().siblings().hide()
	})
	$('#tabs2 .df_list ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$("#tabs2 .df_box1 .df_rwtx_list").eq(i).show().siblings().hide()
	})
	$('#tabs3 .df_list ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$("#tabs3 .df_box1 .df_rwtx_list").eq(i).show().siblings().hide()
	})
	$('#tabs4 .df_list ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$("#tabs4 .df_box1 .df_rwtx_list").eq(i).show().siblings().hide()
	})
	$('#tabs5 .df_list ul li').hover(function(){
		var i =$(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$("#tabs5 .df_box1 .df_rwtx_list").eq(i).show().siblings().hide()
	})
	});

//查询期刊
 function inquire(j){
  var i;
  var i_page=j;
  var years=$('select[name="years"] option:selected').text();
  var issue=$('select[name="issue"] option:selected').text();
  var channelid=$("select[name='years']").attr("rel");
 $.ajax({
    type : 'get',
    data : {'years':years,'number':issue,'page':i_page,"channelid":channelid},
     url : 'http://trends.tibet.cn/search/issue.php',
dataType :'jsonp',
  jsonp  :'callback',
 success : function(json){
       //console.log(json);
       var oo=json.contents;
       var html='';
        for(i=0;i<oo.length;i++){
          html+='<li><a href="'+oo[i]['href']+'" title="'+oo[i]['title']+'" target="_blank">'+oo[i]['title']+'</a></li>'; 
        }
        $("#sz_qk ul").html(html);
        $("#sz_qk h5").html(json.multi);
     }
 });
}

function sous(){
  var keyword=$('#searchs').val();
  window.location.href="http://trends.tibet.cn/search/search.php?keyword="+keyword+"&channelID=30596";
}

//涉藏期刊二级搜索目录
	   function search_s(photo,name1,name2,ids,id){
	     var i;
		 $("select[name='years']").attr("onchange","second()");
		 $(".qk_rgt_summ p").eq(0).html(name1);
		 $(".qk_rgt_summ p").eq(1).html("刊期："+name2);
		 $("#qk_rgt_img").html("<img src='"+photo+"' title='"+name1+"' alt='"+name1+"'>");
		 $("select[name='years']").attr("rel",ids);
	     $.ajax({
		   type:"post",
		   url:"http://trends.tibet.cn/poll/publication.php",
		   data:{"fatname":ids,"chdname":id},
		   dataType:"jsonp",
		   jsonp:"callback",
		   success:function(json){
		     var oo=json.content;
             var ii=json.contents;
			 var opt1="";
			 var opt2="";
             for(i=0;i<oo.length;i++){
			   opt1+="<option value='"+oo[i]['id']+"'>"+oo[i]['Name']+"</option>";
			 }
              $("select[name='years']").html(opt1);
             for(i=0;i<ii.length;i++){
			    opt2+="<option value='"+ii[i]['id']+"'>"+ii[i]['Name']+"</option>";
			 }	
              $("select[name='issue']").html(opt2);
              inquire(1);			  
		   }
		 });
	   }

	   function second(){
	      var ids=$('select[name="years"] option:selected').val();
          var id=$('select[name="years"] option:selected').attr("rel");	
          $.ajax({
		   type:"post",
		   url:"http://trends.tibet.cn/poll/publication.php",
		   data:{"fatname":id,"chdname":ids},
		   dataType:"jsonp",
		   jsonp:"callback",
		   success:function(json){
		     var oo=json.content;
             var ii=json.contents;
			 var opt="";
             for(i=0;i<ii.length;i++){
			    opt+="<option value='"+ii[i]['id']+"'>"+ii[i]['Name']+"</option>";
			 }	
              $("select[name='issue']").html(opt);			 
		   }
		 });		  
	   }

	   $(document).ready(function(){
	   //$("$zbl li").eq(0).children("a").click();
	   search_s('http://image.tibet.cn/images/2016/2/22/20162221456127599595_66_s.jpg','中国西藏','双月刊','32349','');
	    //加载网页时查根据涉藏期刊当前的条件查询
	   inquire(1);
	   });
