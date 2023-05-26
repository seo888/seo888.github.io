$(function(){
	// 礼包经过
	$(".game_top_app,.kflist,.gongluo_top ul").each(function(){
		$(this).find("li").each(function(){
			$(this).mouseover(function(){$(this).siblings().removeClass("on");$(this).addClass("on");})
		});
	});
	tab1($(".game_hot .hd li"),$(".game_hot .bd ul"),"on","hover");
	//游戏页导航跟随

$(".app-info .desc .more").hover(function(){		
		$(this).parent().find(".tips").fadeIn("fast");
		//$(this).find(".cor").fadeIn("fast");
	},function(){
		$(this).parent().find(".tips").fadeOut("fast");
		//$(this).find(".cor").fadeOut("fast");
	});
	
//右固定
	window.onload = window.onscroll = window.onresize = function () {
		var ht=$('#header').height()+$('.loaction').height()+$('.appinfo').height()+80;
		
		if($(window).scrollTop() <ht ){
			$('#bnav').removeClass('guding');
			//$("#bnav").hide();
		
		}
		else {
			$('#bnav').addClass('guding');
			
			//$("#bnav").show();
			
			}
		}

 $('.endtext img').each(function(){
                	if($(this).width()==0 || $(this).height()==0){
                		return false;
                	}
                    var x = 630; 
                    var w=$(this).width(), h=$(this).height();
                    if (w > x) { 
                        var w_original=w, h_original=h;
                        h = parseInt(h * (x / w));
                        w = x; 
                    }
                    $(this).attr({width:w,height:h});
                });


	function a() {
		var a = d.scrollTop(),
			b = e.innerHeight();
		b > h && (a + i > g + h ? a + i > g + b ? f.css({
			position: "absolute",
			bottom: "0px"
		}) : f.css({
			position: "fixed",
			bottom: "0px"
		}) : f.css({
			position: "static"
		}))
	}
	var b = navigator.userAgent;
	if (!(b.indexOf("MSIE 6") > 0)) {
		var c = $(window),
			d = $(document),
			e = $(".wrap .left"),
			f = $(".wrap .fh_right"),
			g = e.offset().top,
			h = f.height(),
			i = c.height();
		c.on({
			scroll: a,
			resize: function() {
				i = c.height()
			}
		}), a()
	}
//下载内容
if($(".endtext").length >0 ) {
	//查看全文
$('.packupButton').click(function(){
	$('.endtext').addClass('slidedown');
	$('.packupButton').hide();
});
	var article_height=$('.endtext').height();

	if(article_height>=500){
		$('.packupButton').show();
		$('.endtext').addClass('the_height');
	}else{
		$('.packupButton').hide();
		$('.endtext').addClass('slidedown');
	}
}
if($(".yuyue").length>0){
//预约弹框
$(".yuyue").click(function() {
		var bodyheight = $(document).height();
		$(".opacity_bg").css("height", bodyheight);
		$(".msg_box,.opacity_bg").fadeIn();
});
$(".msg_box .msg_close").click(function(){
		$(".msg_box,.opacity_bg").fadeOut();
});

//提交预约
$(document).on("click",".yuyue_btn",function(e){
		var id=$(this).attr("data-id");		
		var phone = $("input[name=phone]").val();
		var type=$(this).attr("data-type");	
		var reg=/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(199|198|166)|(17[0,1,3,5,6,7,8]))\d{8}$/;
		if(!reg.test(phone)){
			alert('请填写正确手机号码');
			return false;
		}
		$.post("/e/extend/isajax.php",{'name':'yuyue','id':id,'phone':phone,'type':type},function(res){
			var data = eval("("+res+")");
			if(data.status){
				alert('恭喜您，预约成功。');
				$(".msg_box,.opacity_bg").fadeOut();
				$("#phone").val('');
				return false;
			}else{
				alert(data.message);
				return false;
			}
		});	
		
});


}

//赞操作
$(".diggget").click(function(){
		var id = $(this).attr("data-id");
		var cid = $(this).attr("data-cid");
		var rVal = $("#diggtopshowdiv");
	$.post("/e/extend/isajax.php",{'name':'digg','id':id,'classid':cid,'dotop':1},function(res){
			var data = eval("("+res+")");
			if(data.status){
				rVal.text(Number(rVal.text())+1);
			}else{
				alert(data.message);
				return false;
			}
		});							  
});




});