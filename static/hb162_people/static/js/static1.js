$(document).ready(function() {	
	$('.pic1 li:nth-child(3n+1)').css("margin-left",0);
	$(".rm_relevant dl").eq($(".rm_relevant dl").length-1).css("border","none");
	$('.rm_download li:nth-child(8n+1)').css("margin-left",0);
	$(".rm_ranking_list").each(function() {
		$(this).find("li").slice(0,3).addClass("ranking_key");
	})
	if($(".rm_txt .col-1 h3.pre").text().length < 1){
		$(".rm_txt .col-1 h3.pre").hide()
	}
	if($(".rm_txt .col-1 h4.sub").text().length < 1){
		$(".rm_txt .col-1 h4.sub").hide()
	}
	if($(".rm_txt .col-1 div.author").text().length < 1){
		$(".rm_txt .col-1 div.author").hide()
	}
	$(".lately li").click(function(){
		$(".lately li").attr("class","");
		$(".rm_ranking_list").hide();
		  
		$(this).attr("class","active");
		$(".rm_ranking_list").eq($(this).index()).show();
	});
	$(".rm_type").click(function(event){
		event.preventDefault();
		$(".rm_txt_con p").toggleClass("FontSize20");
		if($(".rm_type i").text().indexOf("大字号") >= 0){
			$(".rm_type i").text("小字号")
		}else{
			$(".rm_type i").text("大字号")
		}
	})

	$(".txt_float_r").css("width","37px");
	$(".txt_float_r li").hover(function(){
		$(this).addClass("share_active");
		$(".txt_float_r").css("width","194px");
	},function(){
		$(this).removeClass("share_active");
		$(".txt_float_r").css("width","37px");
	});

	$(".btn_follow div.share_con i strong").click(function(){
		$(".btn_follow div.share_con i strong").attr("class","");
		$(".btn_follow div.share_con div").hide();
		  
		$(this).attr("class","active");
		$(".btn_follow div.share_con div").eq($(this).index()).css('display',"block");
	});

	$(".rm_txt_con p img").removeAttr("style");
	$(".rm_txt_con p img").attr("style","");
	$(window).on("load", function () {
		picbig();//小图恢复原有宽度
	});
	function picbig(){	
	if($(window).width() < 415){
		  if($(".sub").text().length == 0){
			$(".sub").css("padding-top","0px")
		  }
		  if($(".author").text().length == 0){
			$(".author").css("padding-top","0px")
		  }
		  $(".rm_txt_con p").each(function(index, element) {
			/*if ($(this).is(':has(img)')) {*/
			if ($(this).find('img').length > 0) {
				//console.log( $(".box_con p").index(this))
				$(".rm_txt_con p").eq($(".rm_txt_con p").index(this)).css("text-align","center");
			}
		  });
		  $(".rm_txt_con p img").each(function(index, element) {
			  var img = new Image();
			  img.src=$(this).attr("src");
			  	console.log(img.width)
			    if(img.width < $(".rm_txt .col-1").width() && img.width > 0 ){						
				 $(this).css("width","auto")
			    }			  
		  });  
	  }	
	}
});

