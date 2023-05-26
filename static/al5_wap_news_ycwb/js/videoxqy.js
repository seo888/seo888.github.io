$('.main_article img').parent().find('br').remove();
$('.main_article p').each(function(i, dom){var doc = $(this).html().replace(/^[　\s]+/, '');$(this).html(doc);});
//20201209升级后边video输出
if($('video').length>0){
	var script = document.createElement("script");
    script.src = "https://ycpai.ycwb.com/ycppad/resource/templateRes/202011/11/15657/15657/html5media/html5media.js";
	var s = document.getElementsByTagName("script")[3];
	s.parentNode.insertBefore(script, s);
	if(IsPC()){
		$('video').eq(0).attr('id','video1')
		var myVideo=document.getElementById("video1");
		var ieVersion = navigator.appVersion.split(";")[1].replace(/[ ]/g,"")
		function playVid(){
			 if(ieVersion =="MSIE6.0" || ieVersion =="MSIE7.0" || ieVersion =="MSIE8.0") {
		        //如果是ie6,7,8,9,就加载
		       	var srcvideo=$('video:eq(0)').attr('src');
				$('video:eq(0)').parent().append('<iframe style="OVERFLOW: hidden; HEIGHT:439px; WIDTH: 782px" height="439" src="https://zt.ycwb.com.cn/2016/vd/?src='+srcvideo+'&amp;autoplay=autoplay&amp;w=782px&amp;h=439px&amp;t=xxx" frameborder="0" width="782" scrolling="no">x</iframe>');
				$('video:eq(0)').remove();
		    }else{
		    	myVideo.play();
		    }
		} 
		function pauseVid(){
			if(ieVersion =="MSIE6.0" || ieVersion =="MSIE7.0" || ieVersion =="MSIE8.0") {
		        //如果是ie6,7,8,9,就加载
		       	var srcvideo=$('video:eq(0)').attr('src');
				$('video:eq(0)').parent().append('<iframe style="OVERFLOW: hidden; HEIGHT:439px; WIDTH: 782px" height="439" src="https://zt.ycwb.com.cn/2016/vd/?src='+srcvideo+'&amp;autoplay=false&amp;w=782px&amp;h=439px&amp;t=xxx" frameborder="0" width="782" scrolling="no">x</iframe>');
				$('video:eq(0)').remove();
		    }else{
		    	myVideo.pause();
		    }
		}
		$('video').eq(0).click(function(){
		    	playVid()
		});

		$('video').eq(0).trigger('click');
		$('video').attr("preload","auto");
		// $('video').each(function(){
		// 	var i=$(this).index();
		// 	var urlpicpath=$('video').eq(i).attr('picpath');
		// 		var patt1 = new RegExp("http");
		// 		var result = patt1.test(urlpicpath); 
		// 		//http://news.ycwb.com/pic/2021-05/12/bc033681-fda4-457b-884c-fa14c94abe79.jpg
		// 		//urlpicpath.startsWith('http')
		// 		console.log(result)
		// 		if(urlpicpath!=undefined && result){ 
		// 			$('video').eq(i).attr("poster",urlpicpath)
		// 		}else{
		// 			//var urlpicpath=$('oucshfg').attr('src')
		// 			$('video').attr("poster","http://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
		// 		}
		// })
		$('video').attr("poster","https://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
	}else{
		//修改位置视频已有封面图
		$('video').attr("poster","https://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
		
		//setTimeout(function(){

			var urlpicpath=$('video').eq(0).attr('picpath');
			var patt1 = new RegExp("http");
			var result = patt1.test(urlpicpath); 
			//http://news.ycwb.com/pic/2021-05/12/bc033681-fda4-457b-884c-fa14c94abe79.jpg
			//urlpicpath.startsWith('http')
			//console.log(urlpicpath)
			if(urlpicpath!=undefined && result){ 
				console.log(2)
				$('video').eq(0).attr("poster",urlpicpath)
			}else{
				//var urlpicpath=$('oucshfg').attr('src')
				console.log(1)
				//$('video').attr("poster","http://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
			}
			var urlpicpathc=$('video').eq(1).attr('picpath');
			var patt2 = new RegExp("http");
			var result1 = patt2.test(urlpicpathc); 
			//http://news.ycwb.com/pic/2021-05/12/bc033681-fda4-457b-884c-fa14c94abe79.jpg
			//urlpicpath.startsWith('http')
			//console.log(urlpicpathc)
			if(urlpicpathc!=undefined && result1){ 
				console.log(2)
				$('video').eq(1).attr("poster",urlpicpathc)
			}else{
				//var urlpicpath=$('oucshfg').attr('src')
				
			}
			// var urlpicpathcc=$('video').eq(2).attr('picpath');
			// var patt3= new RegExp("http");
			// var result2 = patt3.test(urlpicpathcc); 
			// //http://news.ycwb.com/pic/2021-05/12/bc033681-fda4-457b-884c-fa14c94abe79.jpg
			// //urlpicpath.startsWith('http')
			// //console.log(urlpicpathcc)
			// if(urlpicpathcc!=undefined && result2){ 
			// 	$('video').eq(2).attr("poster",urlpicpathcc)
			// }else{
			// 	//var urlpicpath=$('oucshfg').attr('src')
			// 	$('video').attr("poster","http://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
			// }
		//},1000)
		



		// //明天再说
		if($('#oucshfg')!=undefined){
			var urlpicpath=$('#oucshfg').attr('src')
			

			$('video').attr("poster",urlpicpath)
		}else{
			
			
		}
		//视频处理循环 ，待续
		// $('video').each(function(){
		// 	var i=$(this).index();
		// 	var urlpicpath=$('video').eq(i).attr('picpath');
		// 	var patt1 = new RegExp("http");
		// 	var result = patt1.test(urlpicpath); 
		// 	//http://news.ycwb.com/pic/2021-05/12/bc033681-fda4-457b-884c-fa14c94abe79.jpg
		// 	//urlpicpath.startsWith('http')
		// 	console.log(result)
		// 	if(urlpicpath!=undefined && result){ 
		// 		$('video').eq(i).attr("poster",urlpicpath)
		// 	}else{
		// 		//var urlpicpath=$('oucshfg').attr('src')
		// 		$('video').attr("poster","http://www.ycwb.com/Template/2017/conntent/newjs/vedio.jpg");
		// 	}
		// 	$(this).attr('id','video'+i);
		// 	//elevideo.play()
		// 	var elevideo = document.getElementById("video"+i);
		//     elevideo.addEventListener("canplay",function(){
		//     	//console.log(elevideo.duration);
		//  	})
		// });
		//
		// $("video")[0].play()
		// $("video")[0].pause();
		
		// setTimeout(function(){
		// console.log(transTime($("video")[0].duration));},1000)
		
		// function transTime(time) {
	    //     var duration = parseInt(time);
	    //     var minute = parseInt(duration/60);
	    //     var sec = duration%60+'';
	    //     var isM0 = ':';
	    //     if(minute == 0){
	    //         minute = '00';
	    //     }else if(minute < 10 ){
	    //         minute = '0'+minute;
	    //     }
	    //     if(sec.length == 1){
	    //         sec = '0'+sec;
	    //     }
	    //     return minute+isM0+sec;
    	// }
    	// for (var i = 0; i<=$("video").length;i++) {
    	// 	$("video:eq("+i+")").click(
    	// 		(function(i){
		//     		return  function(){
		// 	    		if($(this).paused){
		// 	    			$("video")[i].play();
		// 	    		}else{
		// 					$("video")[i].pause();
		// 	    		}
		//     		}
    	// 		})(i)
    	// 	)
    	// };
    		
	}
}else{
}
//uc
var itemprop = $("meta[itemprop='image']").attr("content");
var urllc=window.location.href; 
if($('.main_article img').size()>0 && $('.main_article img').eq(0).attr('src')!=undefined){
		itemprop = $('.main_article img').eq(0).attr('src');
		if(itemprop.startsWith('../../')){
			urlc = urllc.replace(/\w+\.htm.*$/, '')
			itemprop =urlc+$('.main_article img').eq(0).attr('src');
			$("meta[itemprop='image']").attr("content",itemprop);
		}else{
			itemprop = $('.main_article img').eq(0).attr('src');
			$("meta[itemprop='image']").attr("content",itemprop);
		}
	 
}else{
	itemprop = "https://www.ycwb.com/images/jyw_QQWeChat_transmit.jpg";
	$("meta[itemprop='image']").attr("content",itemprop);
} 