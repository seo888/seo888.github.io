
$(document).ready(function (){
	//点击小图切换大图
	$("#thumbnail li a").mouseover(function(){
		$(".zoompic img").attr({ "src": $(this).find('img').attr("src"), "title": $("> img", this).attr("alt") });
	    $(".zoompic a").attr({ "href": $(this).attr("href")});
	    $(".zoompic a").attr({ "data-ad_id": $(this).attr("data-ad_id")});
	    $(".ad_Concent").html($("> img", this).attr("alt"))
	    $("#thumbnail li.current").removeClass("current");
	    $(this).parents("li").addClass("current");
	    return false;
	});
	$(".zoompic>img").load(function(){
		$(".zoompic>img:hidden").show();
	});
	
	//小图片左右滚动
	var $slider = $('.slider ul');
	var $slider_child_l = $('.slider ul li').length;
	var $slider_width = $('.slider ul li').width();
	$slider.width($slider_child_l * $slider_width);
	
	var slider_count = 0;
	
	if ($slider_child_l < 5) {
		$('#btn-right').css({cursor: 'auto'});
		$('#btn-right').removeClass("dasabled");
	}
	
	$('#btn-right').click(function() {
		if ($slider_child_l < 5 || slider_count >= $slider_child_l - 5) {
			return false;
		}
		
		slider_count++;
		$slider.animate({left: '-=' + $slider_width + 'px'}, 'fast');
		slider_pic();
	});
	
	$('#btn-left').click(function() {
		if (slider_count <= 0) {
			return false;
		}
		slider_count--;
		$slider.animate({left: '+=' + $slider_width + 'px'}, 'fast');
		slider_pic();
	});
	
	function slider_pic() {
		if (slider_count >= $slider_child_l - 5) {
			$('#btn-right').css({cursor: 'auto'});
			$('#btn-right').addClass("dasabled");
		}
		else if (slider_count > 0 && slider_count <= $slider_child_l - 5) {
			$('#btn-left').css({cursor: 'pointer'});
			$('#btn-left').removeClass("dasabled");
			$('#btn-right').css({cursor: 'pointer'});
			$('#btn-right').removeClass("dasabled");
		}
		else if (slider_count <= 0) {
			$('#btn-left').css({cursor: 'auto'});
			$('#btn-left').addClass("dasabled");
		}
	}
	
	//监听广告的点击事件
	$("li[name='ad'], .advertising_concent a").on('click',function(){
		var ad_id = $(this).data("ad_id");
		var name = $(this).data("name");
		if(typeof(name) != "undefined" && null != name && "" != name && "adBigImg" == name){
			ad_id = $("#thumbnail").find("li[class='current']").find("a").data("ad_id");
		}
		$.ajax({  
			url : 'ad/updateAdClick/'+ad_id,  
	        dataType : 'json',  
	        success : function(data){  
	        }  
		}); 
	}); 
});
//页面加载完成，
$(function() {
});