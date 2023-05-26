/*
jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
	$(tab_conbox).find("ul").hide();
	$(tabtit).find("li:first").addClass("hover").show(); 
	$(tab_conbox).find("ul:first").show();

	$(tabtit).find("li").bind(shijian,function(){
	  $(this).addClass("hover").siblings("li").removeClass("hover"); 
		var activeindex = $(tabtit).find("li").index(this);
		$(tab_conbox).children().eq(activeindex).show().siblings().hide();
		return false;
	});

};
*/

jQuery.jqtab = function (tabtit,tab_conbox,on,shijian){
	$(tab_conbox).each(function(){
		$(this).children().hide();
		$(this).children().eq(0).show();
	});
	$(tabtit).each(function(){
		$(this).children().eq(0).addClass(on);
	});
	$(tabtit).children().bind(shijian,function(){
		$(this).addClass(on).siblings().removeClass(on);
		var index = $(tabtit).children().index(this);
		$(tab_conbox).children().eq(index).show().siblings().hide();
	});
}

$(function(){
	//焦点图
	$('#focus').slidesjs({
		width: 280,
		height: 203,
		navigation: false,
		pagination: {
          effect: "fade"
        },
		effect: {
          fade: {
            speed: 200
          }
        },
        play: {
          auto: true,
          interval: 4000
        }
	});
	
	$.jqtab(".tbox01 .tab",".tbox01 .body","hover","mouseenter");
	$.jqtab(".tbox02 .tab",".tbox02 .tab_con","hover","mouseenter");
	$.jqtab(".tbox03 .tab",".tbox03 .body","hover","mouseenter");
	
	$.jqtab(".tblock01 .tab",".tblock01 .tab_con","hover","mouseenter");
	$.jqtab(".tblock02 .tab",".tblock02 .tab_con","hover","mouseenter");
	$.jqtab(".tblock03 .tab",".tblock03 .tab_con","hover","mouseenter");
	$.jqtab(".tblock04 .tab",".tblock04 .tab_con","hover","mouseenter");
	$.jqtab(".tblock05 .tab",".tblock05 .tab_con","hover","mouseenter");
	$.jqtab(".tblock06 .tab",".tblock06 .tab_con","hover","mouseenter");
	$.jqtab(".tblock07 .tab",".tblock07 .tab_con","hover","mouseenter");
});