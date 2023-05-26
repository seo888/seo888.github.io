$(function(){
	tabs("#hzhbhd", "active", "#hzhbbd");
	$("#toubu_nav").click(function(){
		$("#xianshi_nav").fadeToggle("slow");
	});
})
function tabs(tabTit,on,tabCon){
	$(tabCon).each(function(){
	  	$(this).children().eq(0).show();
	 });
	 $(tabTit).each(function(){
	  	$(this).children().eq(0).addClass(on);
	});
	$(tabTit).children().hover(function(){
	    $(this).addClass(on).siblings().removeClass(on);
	    var index = $(tabTit).children().index(this);
	    $(tabCon).children().eq(index).show().siblings().hide();
	});
 }