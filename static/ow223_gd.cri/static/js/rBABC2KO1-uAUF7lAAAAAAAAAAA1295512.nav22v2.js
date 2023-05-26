// 20221111

// 	if( $(".nav-li-index").css("display")=="block" || $("title").attr("id")=="城市远洋" || $("title").attr("id")=="企业出海" || $("title").attr("id")=="文娱体育" ){
// 		$(".nav-19-box").addClass("nav-19-box-nologo")
// 	}else{
// 		if( window.location.host.indexOf("www.cri.cn")>=0 || window.location.host.indexOf("www.impplus.cn")>=0 || window.location.host.indexOf("news.cri.cn")>=0 || window.location.host.indexOf("news.impplus.cn")>=0 ){
// 			$(".nav-19-box").addClass("nav-19-box-logo")
// 		}else{
// 			$(".nav-19-box").addClass("nav-19-box-nologo")
// 		}
// 	}
	
// 	big5Fn()
	
// $(function(){

// 	if( window.location.host.indexOf("city.cri.cn")>=0 || window.location.host.indexOf("city.impplus.cn")>=0 ){
// 		if( $(".nav-li-index").css("display")=="none" ){
// 			$(".nav-19-box-nologo").addClass("nav-19-box-logo")
// 			$(".nav-19-box-nologo").removeClass("nav-19-box-nologo")
// 		}
// 	}
// 	if( window.location.host.indexOf("talk.cri.cn")>=0 || window.location.host.indexOf("talk.impplus.cn")>=0 ){
// 		if( $(".nav-li-index").css("display")=="none" ){
// 			$(".nav-19-box-nologo").addClass("nav-19-box-logo")
// 			$(".nav-19-box-nologo").removeClass("nav-19-box-nologo")
// 		}
// 	}
	
// 	big5Fn()

// })

// function big5Fn(){
// 	if( window.location.host.indexOf("big5.cri.cn")>=0 ){
// 		if( window.location.href.indexOf("www.cri.cn")>=0 || window.location.href.indexOf("news.cri.cn")>=0 ){
// 			$(".nav-19-box-nologo").addClass("nav-19-box-logo")
// 			$(".nav-19-box-nologo").removeClass("nav-19-box-nologo")
// 		}
		
// 		if( $(".nav-19-box").find(".logo").css("display")=="none" ){
// 			$(".nav-19-box").removeClass("nav-19-box-logo")
// 			$(".nav-19-box").addClass("nav-19-box-nologo")
// 		}else if( $(".nav-19-box").find(".logo").css("display")=="block" ){
// 			$(".nav-19-box").removeClass("nav-19-box-nologo")
// 			$(".nav-19-box").addClass("nav-19-box-logo")
// 		}
// 	}
// }
effLogoFn()
function effLogoFn(){
	if( $(".nav-19-box").find(".logo").css("display")=="none" ){
		$(".nav-19-box").removeClass("nav-19-box-logo")
		$(".nav-19-box").addClass("nav-19-box-nologo")
	}else if( $(".nav-19-box").find(".logo").css("display")=="block" ){
		$(".nav-19-box").removeClass("nav-19-box-nologo")
		$(".nav-19-box").addClass("nav-19-box-logo")
	}
}
$(function(){
	effLogoFn()
})