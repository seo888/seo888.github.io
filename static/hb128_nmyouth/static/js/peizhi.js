

/* 十年前鲜衣怒马李逍遥，十年后锦衣夜行梅长苏 -----左中秋*/




window.onload = function(){
	//IE7分页去阴影
	$("#AspNetPager1 a").removeAttr("disabled");
	//返回顶部
	$(".to_top").click(function () {$('html,body').animate({ scrollTop: '0px' }, 500); return false;});
};
//===================分割线===================
$(function(){
//表单选择 当获取光标时会把原先的value清除，离开时如果没有改变会回复原先的value
    $("input,textarea").focus(function () {
			if ($(this).val() == "" || $(this).val() == this.defaultValue) {
				$(this).attr('cont',$(this).val())
				$(this).attr("value", "");
			}
	});
    $("input,textarea").blur(function () {
		if ($(this).attr("date") == undefined) {
			if ($(this).val() == "" || $(this).val() == $(this).attr("cont")) {
				$(this).attr("value", $(this).attr("cont"));
			}
		}
	});
});
//===================分割线===================
    //放大放小
    num = $("#contentText").attr("size");
    function fangda(){
        num++;
        if(num > 18){
            num = 18;
        }
        $("#contentText").css({"font-size":num+'px',"line-height":"1.8em"});
        $("#contentText").find("*").css({"font-size":num+'px',"line-height":"1.8em"});
    }
    function suoxiao(){
        num--;
        if(num < 12){
            num = 12;
        }
        $("#contentText").css({"font-size":num+'px',"line-height":"1.8em"});
        $("#contentText").find("*").css({"font-size":num+'px',"line-height":"1.8em"});
    }


//===================分割线===================
function doZoom(size) {
//大中小
	var zoom = document.all ? document.all['Zoom'] : document.getElementById('Zoom');
	$("#Zoom").find("*").css({ "font-size": size + "px" });
	$("#Zoom").css({ "font-size": size + "px" });
}
//===================分割线===================
function SetHome(url){
//设为首页
  if (document.all) {
	  document.body.style.behavior='url(#default#homepage)';
		 document.body.setHomePage(url);
  }else{
	  alert("您好，您的浏览器不支持自动设置页面为首页功能，请您手动在浏览器里设置该页面为首页！");
  }};
function AddFavorite(sURL, sTitle) {
//加入收藏
  sURL = encodeURI(sURL);
  try {
	  window.external.addFavorite(sURL, sTitle);
  } catch (e) {
	  try {
		  window.sidebar.addPanel(sTitle, sURL, "");
	  } catch (e) {
		  alert("加入收藏失败，请使用Ctrl+D进行添加，或手动在浏览器里进行设置。");}}};
//===================分割线===================
//控制ul的li的margin的JQ选项
  //cg_margin_rightnone系列为margin-right:0px;
  //cg_margin_topnone系列为margin-top:0px;
$(document).ready(function(e) {
$(".cg_margin_rightno12 li").each(function(index, element) {if(($(this).index()+1)%12==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno11 li").each(function(index, element) {if(($(this).index()+1)%11==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno10 li").each(function(index, element) {if(($(this).index()+1)%10==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno9 li").each(function(index, element) {if(($(this).index()+1)%9==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno8 li").each(function(index, element) {if(($(this).index()+1)%8==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno7 li").each(function(index, element) {if(($(this).index()+1)%7==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno6 li").each(function(index, element) {if(($(this).index()+1)%6==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno5 li").each(function(index, element) {if(($(this).index()+1)%5==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno4 li").each(function(index, element) {if(($(this).index()+1)%4==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno3 li").each(function(index, element) {if(($(this).index()+1)%3==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_rightno2 li").each(function(index, element) {if(($(this).index()+1)%2==0){$(this).addClass('cg_margin_rightno');}});
$(".cg_margin_topno12 li:lt(12)").addClass('cg_margin_topno');
$(".cg_margin_topno11 li:lt(11)").addClass('cg_margin_topno');
$(".cg_margin_topno10 li:lt(10)").addClass('cg_margin_topno');
$(".cg_margin_topno9 li:lt(9)").addClass('cg_margin_topno');
$(".cg_margin_topno8 li:lt(8)").addClass('cg_margin_topno');
$(".cg_margin_topno7 li:lt(7)").addClass('cg_margin_topno');
$(".cg_margin_topno6 li:lt(6)").addClass('cg_margin_topno');
$(".cg_margin_topno5 li:lt(5)").addClass('cg_margin_topno');
$(".cg_margin_topno4 li:lt(4)").addClass('cg_margin_topno');
$(".cg_margin_topno3 li:lt(3)").addClass('cg_margin_topno');
$(".cg_margin_topno2 li:lt(2)").addClass('cg_margin_topno');
//公用hover显示隐藏JQ

	$('.zz_logo').delay(500).animate({"top":"0px"},400);

    //h1 标题滚动
    (function() {
        if ($('.ql_h_animate').length > 0) {
            var hbtr_top = $('.ql_h_animate').offset().top - 100;
            var timerx = setTimeout(function(){
                $('html,body').animate({ scrollTop: hbtr_top+'px' }, 800); return false;
            },400);
            $(window).on('mousewheel DOMMouseScroll', function() {
                clearTimeout(timerx);
                $('html, body').stop(true);
            });
        }
    })();
    //
    $('.ql_hyxwb li:odd').addClass('ql_hyxwbodd');
    //获取焦点
    //首页banner图开始
    var widths = $(window).width();
    jQuery(".NewRight").slide({});
    if(widths > 1200){
        // //首页banner图开始
        jQuery(".zz_lunbo").slide({mainCell:".bd ul",effect:"left",autoPlay:true});
        jQuery(".dy_lunbo").slide({mainCell:".bd ul",effect:"left",autoPlay:true});
        jQuery(".zz_hengfuc").slide({titCell:".hd ul",mainCell:".bd ul",autoPlay:true,autoPage:"<li></li>"});
        jQuery(".Dis_x").slide({titCell:".hd ul",mainCell:".bd ul",autoPlay:true,effect:"leftLoop",easing:"easeInOutCirc"});
        $(".zz_navc").find("li:last-child").css("background-image","none");
        $(".zz_ycc").find("a:last-child").css("background-image","none");
        //新闻中心切换
        jQuery(".NewLeft").slide({titCell:".hd ul",mainCell:".bd ul",effect:"leftLoop",autoPlay:true,autoPage:"<li></li>"});
        $(".NewRight .hd").find("li:first-child").addClass("New_li1");
        $(".NewRight .bd").find("li:last-child").css("border-bottom","none");
        $(".dy_fo_div").find("li:odd").css("float","right");
        $(".sui_x").find("li:odd").css("float","right");
        jQuery(".zhuan").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:3,interTime:50,trigger:"click"});
        jQuery(".fc_x").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:4,interTime:50,trigger:"click"});
        jQuery(".zz_pic_x").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:false,vis:2,scroll:2});
        $('.slogan').delay(1000).animate({"width":"100%"},2000);
        $(".dy_three").find("li:eq(1)").css("margin","0 27px");
    }else if(widths <= 1024){/*如果是三屏请在这里写代码*/
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper1 = new Swiper('.swiper-container1', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper2 = new Swiper('.swiper-container2', {
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper3 = new Swiper('.swiper-container3', {
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper4 = new Swiper('.swiper-container4', {
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper5 = new Swiper('.swiper-container5', {
            slidesPerView: 2,
            paginationClickable: true,
            spaceBetween: 30
        });
        var swiper6 = new Swiper('.swiper-container6', {
            slidesPerView: 2,
            paginationClickable: true,
            spaceBetween: 10
        });
        var swiper7 = new Swiper('.swiper-container7', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
    }else if(widths <= 750){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper3 = new Swiper('.swiper-container3', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
        var swiper7 = new Swiper('.swiper-container7', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 0,
            loop: true,
            autoplay: 4000,
            speed : 800,
            autoplayDisableOnInteraction : false,
        });
    }
});