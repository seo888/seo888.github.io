var beffOff = false;
if(typeof beff!=="undefined"){
	beffOff = true
}else{
	beffOff = false
}

if($(".li-box-wrap").length>=1){
	$(".li-box-wrap").each(function(){
		$(this).attr("th",$(this).outerHeight(true))
	})
}

$(".nav-li").hover(function(){
	$(this).addClass("active").siblings(".nav-li").removeClass("active")
//	$(this).find(".li-box-wrap").height($(this).find(".li-box-wrap").attr("th"))
//	$(this).find(".li-box-wrap").stop(true).animate({"height":$(this).find(".li-box-wrap").attr("th")},200)
	if(beffOff){
		$(this).find(".li-box-wrap").show()
	}else{
		$(this).find(".li-box-wrap").slideDown("fast")
	}
},function(){
	$(this).removeClass("active").siblings(".nav-li").removeClass("active")
	if(beffOff){
		$(".li-box-wrap").hide()
	}else{
		$(".li-box-wrap").stop(true,true).hide()
	}
})

if($(".languageLine").length>=1){
//	alert($(".languageLine").parent().html())
	$(".languageLine-clone").html($(".languageLine").parent().html()).height($(".languageLine").eq(0).parents(".li-box-wrap").height()).width($(".languageLine").eq(0).parents(".li-box-wrap").width())
//$(".languageLine-clone").height($(".languageLine").eq(0).parents(".li-box-wrap").height())
}

$(function(){
    //lee dong
    var isHong = true; 
    //leedong
	if($("title").attr("id")==undefined || $("title").attr("id")==""){
	//				var liPo = $(".nav li:eq(0)").position().left;
	//				var liW = $(".nav li:eq(0)").width();
    //				navLightFn(liPo,liW,0)
    console.log($("title").attr("id"))
	}else{
		var navEffOpen = true;
        var titleId = $("title").attr("id");
		$(".nav-19-box .nav .nav-li").each(function(){
			var _this = $(this);
			var navT = $(this).find(".nav-title");
            var navId = $(this).find(".nav-title").text();
			if(titleId==navId && navT.length>=1){
				_this.addClass("nav-eff-this")
			
				var navEffThisLeft = $(".nav-eff-this").position().left;
				var navEffThisWidth = $(".nav-eff-this").outerWidth();
				var navEffThisMarginLeft = $(".nav-eff-this").css("margin-left");
				var navEffBgpaddingLeft = $(".nav-eff-bg").css("padding-left");
				$(".nav-19-box .nav-eff-bg").css({
					"width":navEffThisWidth,
					"left":navEffThisLeft+parseInt(navEffThisMarginLeft)-parseInt(navEffBgpaddingLeft)
				}).fadeIn("fast")
				
                navEffOpen = false;
                isHong = false; //lee
				return false;
			}else{
                isHong = true;//lee
            }
        })
        if(isHong){
            $(".nav-li-add-5").addClass("navMoreActive")
        }
		if($(".nav-19-box .nav-eff-this").length>1){
			$(".nav-19-box .nav-eff-this").last().removeClass("nav-eff-this")
		}

//		-parseInt(navEffThisMarginLeft)
	//	if($("title").attr("id").indexOf("标签列表")>=0){
	//		alert($("title").attr("id"))
	//	}
	}
})