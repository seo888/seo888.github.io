// JavaScripx Document

function stav(m,n){
var tli=document.getElementById("menu"+m).getElementsByTagName("li");
var mli=document.getElementById("main"+m).getElementsByTagName("div");
for(i=0;i<tli.length;i++){
tli[i].className=i==n?"hover":"";
try{
mli[i].style.display=i==n?"block":"none";}catch(e){}
}
}

function adafa_mm(m,n){
var tli=document.getElementById("menuaa"+m).getElementsByTagName("li");
var mli=document.getElementById("mainaa"+m).getElementsByTagName("ul");
var more=document.getElementById("moreaa"+m).getElementsByTagName("li");
for(i=0;i<tli.length;i++){
tli[i].className=i==n?"hover1":"";
mli[i].style.display=i==n?"block":"none";
more[i].style.display=i==n?"block":"none";
}
}


jQuery(document).ready(function(){
	//判断头条字数
	var num = jQuery(".toutiao_nav").text().length;	
		//alert(num);
		if(num<=28){
			jQuery(".toutiao_nav").css("font-size","34px","color","#F00");
		}
		if(num>28){
			jQuery(".toutiao_nav").css("font-size","32px","color","#F00");
		}
		if(num>29){
			jQuery(".toutiao_nav").css("font-size","30px","color","#F00");
		}
		if(num>30){
			jQuery(".toutiao_nav").css("font-size","30px","color","#F00");
		}
		if(num>31){
			jQuery(".toutiao_nav").css("font-size","28px","color","#F00");
		}
		if(num>32){
			jQuery(".toutiao_nav").css("font-size","28px","color","#F00");
		}
		if(num>33){
			jQuery(".toutiao_nav").css("font-size","26px","color","#F00");
		}
		if(num>36){
			jQuery(".toutiao_nav").css("font-size","24px","color","#F00");
		}
		if(num>39){
			jQuery(".toutiao_nav").css("font-size","22px","color","#F00");
		}
		if(num>43){
			jQuery(".toutiao_nav").css("font-size","20px","color","#F00");
		}
		if(num>47){
			jQuery(".toutiao_nav").css("font-size","18px","color","#F00");
		}
		
	var tirm = location.href
var arrtirm = tirm.split('/');
if(arrtirm[arrtirm.length-1].length>35) {
	try{
		jQuery('.xxgk_content_content p').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
	try{
		jQuery('.xxgk_content_content table').each(function(index, element) {
			jQuery(this).css({'width':"884px","font-size":"15px"});
		});
	}catch(e){}
	try{
		jQuery('.xxgk_content_content img').each(function(index, element) {
			jQuery(this).css({'max-width':"884px","_width":"884px"});
		});
	}catch(e){}
	//try{
//		jQuery('.xxgk_content_content table td').each(function(index, element) {
//			jQuery(this).css({'width':"0px","font-size":"12px"});
//		});
//	}catch(e){}
	try{
		 jQuery('.xxgk_content_content p a').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
	try{
		jQuery('.xxgk_content_content p').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
	try{
		jQuery('.xxgk_content_content span').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
		try{
		jQuery('.xxgk_content_content p a').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
	try{
		jQuery('.xxgk_content_content font').each(function(index, element) {
			jQuery(this).css({'line-height':"30px","font-size":"15px"});
		});
	}catch(e){}
	
}

try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="网站元素"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}

try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="右侧"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}

try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="中间"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}

try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="左侧"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}
try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="首页元素"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}

try{
	jQuery(".xxgk_content_top_infobar a").each(function(){
		if(jQuery.trim(jQuery(this).text())=="底部"){
			jQuery(this).remove();
			var arr = jQuery(".xxgk_content_top_infobar").html().replace("&gt;&gt;  &gt;&gt;",">>").replace("&gt;&gt;&nbsp;&nbsp;&gt;&gt;",">>");
			jQuery(".xxgk_content_top_infobar").html(arr);
		}

	})}
catch(e){}
})


	<!--foot hover	-->
jQuery(document).ready(function(){	
	jQuery('.foot_link_ul li,.footer_inner_link li').hover(function(){
		//alert("1111");
		var ft=jQuery(this).find('a').attr('name')
		jQuery(ft).show()
		},function(){
		var fg=jQuery(this).find('a').attr('name')
		jQuery(fg).hide()
			})
			
		jQuery('.footer_inner_link ul').hover(function(){
		jQuery(this).parent().show()
		},function(){
		jQuery(this).parent().hide()
			})
})
	<!--foot hover	-->	