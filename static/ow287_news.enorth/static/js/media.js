function mediaW(){
	var devW=$(window).width();
	
	if((devW>768)&&($("head").find("#css768").size()>0)){
		$("#css768").remove();
	}else if((devW<768)&&($("html").find("#css768").size()==0)){
		$("html head").append("<link rel='stylesheet' href='http://www.enorth.com.cn/index/cms_template/102/000/493/css/cssmin768.css' id='css768' />");
		//获取高度，放置logo
		
	}else if(devW<769){
		//ipad 竖屏
		$("#header .navbar-right,#header .search,.floatblock,.ad-top-right,#title h2 span").hide();
	}else if(devW>768){
		$("#header .navbar-right").show();
		$("#header .search,#title h2 span").show();
	}
	if(devW<1025){
		$(".ad-left,.ad-right div:eq(0),.ad-top-right").hide();
	}else{
		$(".ad-left,.ad-right div:eq(0),.ad-top-right").show();		
	}
	if(devW<993){
		$("#article .content center img").width("90%");
	}else{
		$("#article .content center img").width("");
	}
	if(devW<1183){
		$("#title h2 span").hide();
	}else{
		$("#title h2 span").show();
	}

}
mediaW();

$(function(){
	mediaW();
});

$(window).resize(function(){
	mediaW();
	$(".ad-s object+span").css('bottom',(35-$("#col-l").width()/24)+'px');
});
//添加flash定位
$(function(){
	$(".ad-s object+span").css('bottom',(35-$("#col-l").width()/24)+'px');
});