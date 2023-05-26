$(function(){
	//头条新闻
	var mySwiper1 = new Swiper ('#swiper-1', {
    loop: true,
    autoplay: {
    	delay: 5000,
    	disableOnInteraction: false
    },
    pagination: {
	    el: '.swiper-pagination',
	    type: 'fraction',
	  },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    }
  });
  
  //专题报道
  var mySwiper2 = new Swiper ('#swiper-2', {
    loop: true,
    effect: 'fade',
    autoplay: {
    	delay: 5000,
    	disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    }
  });
	
	//工商导报
	$(".news_paper").on("mouseover", ".list .item", function(){
		var url = $(this).attr('data-url');
		$(".news_paper .picture").css("background-image", "url("+ url + ")");
	});
	
	//徽商名人
	var mySwiper3 = new Swiper ('#hui_famous', {
    loop: true,
    autoplay: {
    	delay: 5000,
    	disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev'
    }
  });
	
	
/* 
 * 2020年4月4日 全国哀悼日
 */
var nowTime = new Date().getTime();
var startTime = new Date("2020-04-04 00:00:00").getTime();
var endTime = new Date("2020-04-06 00:00:00").getTime();

if (nowTime >= startTime && nowTime <= endTime) {
	var head = document.getElementsByTagName("head")
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "html {-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);filter: grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);filter:gray;}";
	head[0].appendChild(style);
}
	
	
	
	
	
	
	
	
	
	
});
