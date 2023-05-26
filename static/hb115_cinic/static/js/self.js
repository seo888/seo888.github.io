$(document).ready(function($) {
  //----------------------------
  asmonload();//初始化执行函数
  $(window).resize(function() {asmresize();}); //浏览器动态放大缩小
  $(window).bind("scroll", function(event){asmscroll();});//浏览器滚动监听函数
   //------------------------------
    function asmonload(){
      //pdappear();//是否出现在可视区域内
    }//初始化监听
    function asmresize(){
      //pdappear();//是否出现在可视区域内
    }//缩放监听
    function asmscroll(){
      //pdappear();//是否出现在可视区域内

      setTimeout(function(){asmtoped();}, 300);
    }//滚动监听
  //-----------------------------
var jqwd;
    jqwd=$(window).width();
function widthresize(){
  var jqwd;
    jqwd=$(window).width();
    if(jqwd>767){
    }
}//widthresize end

//rem框架--响应式
tryrem();
function tryrem(){
  try{
  window['adaptive'].desinWidth = 1200;
  window['adaptive'].maxWidth = 1200;// 页面最大宽度 默认540
  window['adaptive'].init();
  }catch(err){}
}

//幻灯片
swftry();
function swftry(){
  try{
    $(".slick1").slick({
    dots: true,
    arrows:false,
    infinite: true,
    autoplay:true,
    slidesToShow: 1,
    slidesToScroll:1
    });
    $(".slick2").slick({
    dots: false,
    arrows:true,
    infinite: true,
    autoplay:true,
    slidesToShow: 3,
    slidesToScroll:1,
    responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToScroll: 2,
               slidesToShow: 2
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToScroll: 1,
                slidesToShow: 1
            }
          }
        ]
    });
    $(".slick3").slick({
    dots: false,
    arrows:true,
    infinite: true,
    autoplay:true,
    slidesToShow: 6,
    slidesToScroll:2,
    responsive: [
          {
            breakpoint: 959,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToScroll: 2,
               slidesToShow: 2
            }
          },
          {
            breakpoint: 320,
            settings: {
              slidesToScroll: 1,
                slidesToShow: 1
            }
          }
        ]
    });

    $(".slick4").slick({
    dots: false,
    arrows:true,
    infinite: true,
    autoplay:true,
    slidesToShow: 4,
    slidesToScroll:1,
    responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToScroll: 2,
               slidesToShow: 2
            }
          },
          {
            breakpoint: 479,
            settings: {
              slidesToScroll: 1,
                slidesToShow: 1
            }
          }
        ]
    });
    $(".slick5").slick({
    dots: false,
    arrows:true,
    infinite: true,
    autoplay:false,
    slidesToShow: 1,
    slidesToScroll:1
    });

    $(".slick6").slick({
    dots: true,
    arrows:true,
    infinite: true,
    autoplay:true,
    slidesToShow: 1,
    speed:1000,
    autoplaySpeed:5000,
    slidesToScroll:1
    });


  }catch(err){}
}

// mobile导航
  $('.btn-pop').click(function(e){
      $('.m-nav').stop().slideToggle(400);
      e.stopPropagation();
  });
  $('.m-nav li').click(function(event) {
      $(this).find('.m-sub').slideToggle();
      $(this).find('.v1').toggleClass('on');
      $(this).siblings('li').children('.m-sub').slideUp();
      $(this).siblings('li').children('.v1').removeClass('on');
  });
//mb-搜索
$('#m-hd .soso-mb .soso-btn').click(function(e){
  $(this).addClass("hid");
  $("#m-hd .box-so-mb").removeClass("soso-w");
  $("#m-hd .logo").addClass("hid");
  $('.box-so-mb input[type="text"]').focus();
  $('#m-hd .soso-mb').addClass("soso-w2");
});
$('.box-so-mb input[type="text"]').blur(function(e){
  if($(this).val()==""){
    $("#m-hd .box-so-mb").addClass("soso-w");
   $('#m-hd .soso-mb').removeClass("soso-w2");
    setTimeout(function(){$("#m-hd .soso-mb .soso-btn").removeClass("hid"); $("#m-hd .logo").removeClass("hid"); }, 310);
  }
});
//关闭事件
$("html").click(function(e){
  var _con = $('.mb-nav');   // 除了这块的目标区域
  if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
    closembnav();
  }
});
function closembnav(){
  $('.m-nav').stop().slideUp(400);
  //e.stopPropagation();
}


//wow动画
wowdh();
function wowdh(){
try{
 if((navigator.userAgent.indexOf("MSIE 6.0")>0)||(navigator.userAgent.indexOf("MSIE 7.0")>0)||(navigator.userAgent.indexOf("MSIE 8.0")>0))
    {
    }else{
     new WOW().init();
    }//if ie版本判断 end
  }catch(err){}
}

//滚动到顶端固定
function asmtoped(){
  //alert("mm"+$(this).scrollTop());
  //alert("yy"+$(".navlist").offset().top);
  if(($(this).scrollTop())>=($(".scro1").offset().top)){
      //alert("fsf");
     $(".navlist").addClass('dc-ctop1');
  }else{
      $(".navlist").removeClass('dc-ctop1');
  }
}

//瀑布流
pbljsf();
function pbljsf(){
  try{
    $("#gallery-wrapper").pinterest_grid({
        no_columns: 2,
        padding_x: 5,
        padding_y: 5,
        margin_bottom:5,
        single_column_breakpoint:479
    });
  }catch(err){}
}//pbljsf

//公告
msgnotices();
function msgnotices(){
  try{

if(jqwd>959){
  jQuery(".txtScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,scroll:2,vis:4});
    $(".txtScroll-left .bd ul").removeClass("slide-wdbug");
    $(".txtScroll-left .bd ul").addClass("slide-wdbug2");
}
if((jqwd<=959)&&(jqwd>=400)){
  jQuery(".txtScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,scroll:2,vis:2});
    $(".txtScroll-left .bd ul").removeClass("slide-wdbug");
    $(".txtScroll-left .bd ul").addClass("slide-wdbug2");
}

if(jqwd<400){
jQuery(".txtScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,scroll:1,vis:1});
  $(".txtScroll-left .bd ul").removeClass("slide-wdbug");
  $(".txtScroll-left .bd ul").addClass("slide-wdbug2");

}

  }catch(err){}
}

//大话幻灯片
dahuaswf();
function dahuaswf(){
  try{
    jQuery(".slideBox").slide({mainCell:".bd ul",effect:"left",autoPlay:true,trigger:"click",pnLoop:false});
    $(".slideBox .bd ul").removeClass("slide-wdbug");
    $(".slideBox .bd ul").addClass("slide-wdbug2");
  }catch(err){}
}

//下拉动画
//xialas();
function xialas(){
  setTimeout(function(){
    var getval=$(".hdxl-img img").height();
    getval=getval+"px";
    //alert(getval);
    $(".dh-ddelayt").css("height",getval);
  }, 1000);
  setTimeout(function(){ $(".dh-ddelayt").css("height","0px");}, 8000);
}//xialas end

//弹窗
$(".dc-cet1-open1").click(function(){
    $(".dc-cet1").removeClass('msg-hid');
        //自动关闭执行函数
        setTimeout(function(){ adddn(".dc-cet1-autoclose1")}, 3000);
});
$(".dc-cet1-close1").click(function(){
    $(".dc-cet1").addClass('msg-hid');
});
//自动关闭函数
function adddn(cname){
    $(cname).addClass("msg-hid");
}

var rdMore = $('js-rdzt-more');
$('.js-rdzt-more').click(function(e) {
  $(this).parent().siblings().slideDown();
})
$('.close').click(function(e) {
  $(this).parent().slideUp();
})

});

/* 文化艺术 聚焦tab*/
window.onload = function() {
    var oDiv = document.getElementById("tab-jj");
    var oLi = document.getElementById("tablist-jj").getElementsByTagName("li");
    var aCon = document.getElementById("tabcon-jj").getElementsByClassName("tabCon-jj-div");
    var timer = null;

    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function() {
            show(this.index);
        }
    }
    function show(a) {
        index = a;
        var alpha = 0;
        for (var j = 0; j < oLi.length; j++) {
            oLi[j].className = 'none';

            // aCon[j].className = "";
            aCon[j].style.display = 'none';
            aCon[j].style.filter = "alpha(opacity=0)";
        }
        oLi[index].className = "cur";
        clearInterval(timer);
        timer = setInterval(function() {
            alpha += 2;
            alpha > 100 && (alpha = 100);
            aCon[index].style.display = 'block';
            aCon[index].style.filter = "alpha(opacity=" + alpha + ")";
            alpha == 100 && clearInterval(timer);
        },
        5)
    }

    /*  文化艺术第二个tablist  */
    var tabAdd = document.getElementById("tab-add");
    var addLi = document.getElementById("tablist-add").getElementsByTagName("li");
    var addCon = document.getElementById("tabcon-add").getElementsByClassName("tabCon-add-div");
    var addTimer = null;

    for (var i = 0; i < addLi.length; i++) {
        addLi[i].index = i;
        addLi[i].onclick = function() {
            addshow(this.index);
        }
    }
    function addshow(a) {
        index = a;
        var alpha = 0;
        for (var j = 0; j < addLi.length; j++) {
            addLi[j].className = 'none';

            // aCon[j].className = "";
            addCon[j].style.display = 'none';
            addCon[j].style.filter = "alpha(opacity=0)";
        }
        addLi[index].className = "cur";
        clearInterval(addTimer);
        timer = setInterval(function() {
            alpha += 2;
            alpha > 100 && (alpha = 100);
            addCon[index].style.display = 'block';
            addCon[index].style.filter = "alpha(opacity=" + alpha + ")";
            alpha == 100 && clearInterval(addTimer);
        },
        5)
    }

    /* 文化艺术 名人坊  */
    $(function($) {
      $(".mrf-list").first().addClass('mrf-current');
      $('.mrf-list').hover(function(){
        $(this).addClass('mrf-current');
        $(this).siblings().removeClass('mrf-current');
      })
    })
    /*  文化艺术右侧视频/访谈  */
    var tabVideo = document.getElementById("tab-video");
    var videoLi = document.getElementById("tablist-video").getElementsByTagName("li");
    var videoCon = document.getElementById("tabcon-video").getElementsByClassName("tabCone-video-div");
    var videoTimer = null;

    for (var i = 0; i < videoLi.length; i++) {
        videoLi[i].index = i;
        videoLi[i].onclick = function() {
            videoshow(this.index);
        }
    }
    function videoshow(a) {
        index = a;
        var alpha = 0;
        for (var j = 0; j < videoLi.length; j++) {
            videoLi[j].className = 'unfoucs';

            // aCon[j].className = "";
            videoCon[j].style.display = 'none';
            videoCon[j].style.filter = "alpha(opacity=0)";
        }
        videoLi[index].className = "cur";
        clearInterval(videoTimer);
        videoTimer = setInterval(function() {
            alpha += 2;
            alpha > 100 && (alpha = 100);
            videoCon[index].style.display = 'block';
            videoCon[index].style.filter = "alpha(opacity=" + alpha + ")";
            alpha == 100 && clearInterval(videoTimer);
        },
        5)
    }
}
