// JavaScript Document
<!--
function menu_on(x,id,y)

{

for(i=1;i<=y;i++)

{
document.getElementById("menu_"+x+"_"+i+"_"+y).className = "";

document.getElementById("cont_"+x+"_"+i+"_"+y).style.display = "none";

}

document.getElementById("menu_"+x+"_"+id+"_"+y).className = "active";

document.getElementById("cont_"+x+"_"+id+"_"+y).style.display = "block";

} 

$('#txt_x').click(function(){
						$('.left_zw').css('font-size','16px');  
						$('#txt_z').removeClass("on");
						$('#txt_d').removeClass("on");
						$('#txt_x').addClass("on");

						  });
$('#txt_z').click(function(){
						$('.left_zw').css('font-size','20px');  
						$('#txt_x').removeClass("on");
						$('#txt_d').removeClass("on");
						$('#txt_z').addClass("on");

						  });
$('#txt_d').click(function(){
						$('.left_zw').css('font-size','22px');  
						$('#txt_z').removeClass("on");
						$('#txt_x').removeClass("on");
						$('#txt_d').addClass("on");

						  });

$('#menu_1_1_2').click(function(){
						$('#menu_1_2_2').removeClass("active");	
						$('#menu_1_1_2').addClass("active");
						$('#cont_1_1_2').slideUp();
							$('#cont_1_1_2').slideDown();
						$('#cont_1_2_2').hide();	

								});
$('#menu_1_2_2').click(function(){
						$('#menu_1_1_2').removeClass("active");	
						$('#menu_1_2_2').addClass("active");
						$('#cont_1_2_2').show();
						$('#cont_1_1_2').slideUp();	
});

$('#txt_x1').click(function(){
						$('.left_zw').css('font-size','16px');  
						$('#txt_z1').removeClass("on");
						$('#txt_d1').removeClass("on");
						$('#txt_x1').addClass("on");

						  });
$('#txt_z1').click(function(){
						$('.left_zw').css('font-size','20px');  
						$('#txt_x1').removeClass("on");
						$('#txt_d1').removeClass("on");
						$('#txt_z1').addClass("on");

						  });
$('#txt_d1').click(function(){
						$('.left_zw').css('font-size','22px');  
						$('#txt_z1').removeClass("on");
						$('#txt_x1').removeClass("on");
						$('#txt_d1').addClass("on");

						  });

jQuery(document).ready(function(){
	jQuery('#menus > li').each(function(){
		jQuery(this).hover(

			function(){
				jQuery(this).find('ul:eq(0)').show();
			},

			function(){
				jQuery(this).find('ul:eq(0)').hide();
			}

		);
	});
});

function xzfl(fl){
	if (fl ==1){
		document.getElementsByName('search_fl').value='title';
				$('#menus li span').html("标题<input name='search_fl' id='search_fl' value='title' type='hidden' />");

		}
		if (fl ==2){
		document.getElementsByName('search_fl').value='content';
		$('#menus li span').html("新闻<input name='search_fl' id='search_fl' value='content' type='hidden' />");

		}
		if (fl ==3){
		document.getElementsByName('search_fl').value='pic';
				$('#menus li span').html("图片<input name='search_fl' id='search_fl' value='pic' type='hidden' />");

		}
		if (fl ==4){
		document.getElementsByName('search_fl').value='sp';
				$('#menus li span').html("视频<input name='search_fl' id='search_fl' value='sp' type='hidden' />");

		}
		document.getElementById('child').style.display='none';

	}

function submitFun() {

var hotword=document.getElementsByName('q')[0].value;

if (hotword==''){

alert('请输入关键字!');

return false;

}
else
{

$.ajax({
  type: "GET",
  url: "http://lc.chinanews.com:8090/rpc/pa.jsp?pid=1&paid=50&u=sousuo&aj="+encodeURI(Math.random()+ (new Date())),
  dataType: "jsonp"
});

if(document.getElementsByName('s0')[0].value=='cns')
{

 window.open("http://sou.chinanews.com/search.do?q="+encodeURIComponent(hotword));
 }
 else if(document.getElementsByName('s0')[0].value=='baidu')
 {
 window.open("http://www.baidu.com/s?ie=utf-8&bs=%E4%B8+%9B%BD&sr=&z=&cl=3&f=8&wd="+encodeURIComponent(hotword)+"&ct=0");
 }

}

}

function quickQueryCust(evt){
        evt = (evt) ? evt : ((window.event) ? window.event : "") //兼容IE和Firefox获得keyBoardEvent对象
        var key = evt.keyCode?evt.keyCode:evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
        if(key == 13){ //判断是否是回车事件。
            submitFun();
      }
}
-->