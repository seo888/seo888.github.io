//open("http://user.qzone.qq.com/344068213","height=100%","width=100%","toolbar=no", "menubar=no", "scrollbars=no", "resizable=no");





$(function(){
//$("html").html("网站无法访问");
 $(".hotNews strong:eq(0)").html("1");	

 $(".hotNews strong:eq(1)").html("2");	

 $(".hotNews strong:eq(2)").html("3");	

 $(".hotNews strong:eq(3)").html("4");	

 $(".hotNews strong:eq(4)").html("5");	

 $(".hotNews strong:eq(5)").html("6");	

 $(".hotNews strong:eq(6)").html("7");	

 $(".hotNews strong:eq(7)").html("8");	

 $(".hotNews strong:eq(8)").html("9");	

 $(".hotNews strong:eq(9)").html("10");	

 $(".hotNews strong:eq(10)").html("11");	

 $(".hotNews strong:eq(11)").html("12");	

 $(".hotNews strong:eq(12)").html("13");	

 $(".hotNews strong:eq(13)").html("14");	





 //$("#detailsweibo").css("display","none");

// $(".share_self").css("display","none");

 

 //内容热点推荐



		   

		   

		   

		   //列表背景

		  /* $(".list li:eq(4)").addClass("listliDashed");

		   $(".list li:eq(9)").addClass("listliDashed");

		   $(".list li:eq(14)").addClass("listliDashed");

		   $(".list li:eq(19)").addClass("listliDashed");

		   $(".list li:eq(24)").addClass("listliDashed");

		   $(".list li:eq(29)").addClass("listliDashed");

		   $(".list li:eq(34)").addClass("listliDashed");*/



});





//返回顶部

$(function(){

	$(window).scroll(function() {

		if ($(document).scrollTop() >= 150) {

		   $("#return").css("display","block");

		}

		 if ($(document).scrollTop() <= 150) {	   

		   $("#return").css("display","none");

		}

	});

	

	 $("#return").click(function(){

       $(document).scrollTop() >= 0;	 

	 });

});		



























//幻灯



function hotFlash(){

var t = n = 0, count = $("#playShow a").size();

$(function(){

$("#playShow a:not(:first-child)").hide();

$("#playText").html($("#playShow a:first-child").find("img").attr('alt'));

$("#playNum a:first").css({"background":"#0ba316",'color':'#FFFFFF'});

$("#playText").click(function(){window.open($("#playShow a:first-child").attr('href'), "_blank")});

$("#playNum a").click(function() {

   var i = $(this).text() - 1;

   n = i;

   if (i >= count) return;

   $("#playText").html($("#playShow a").eq(i).find("img").attr('alt'));

   $("#playText").unbind().click(function(){window.open($("#playShow a").eq(i).attr('href'), "_blank")})

   $("#playShow a").filter(":visible").hide().parent().children().eq(i).fadeIn(1200);

   $(this).css({"background":"#0ba316",'color':'#FFFFFF'}).siblings().css({"background":"#008d99",'color':'#FFFFFF'});

});

t = setInterval(function (){showAuto();}, 7000);

$("#play").hover(function(){clearInterval(t)}, function(){t = setInterval(function (){showAuto();}, 7000);});

})

function showAuto()

{

n = n >= (count - 1) ? 0 : ++n;

$("#playNum a").eq(n).trigger('click');

}

}







 