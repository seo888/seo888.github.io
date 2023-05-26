// 防抖和节流
Function.prototype.debounce = function(milliseconds, context) {
	var baseFunction = this,
		timer = null,
		wait = milliseconds;

	return function() {
		var self = context || this,
			args = arguments;

		function complete() {
			baseFunction.apply(self, args);
			timer = null;
		}

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(complete, wait);
	};
};

Function.prototype.throttle = function(milliseconds, context) {
	var baseFunction = this,
		lastEventTimestamp = null,
		limit = milliseconds;

	return function() {
		var self = context || this,
			args = arguments,
			now = Date.now();

		if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
			lastEventTimestamp = now;
			baseFunction.apply(self, args);
		}
	};
};

/* 幻灯 */
$(function() {
	// 顶部幻灯和新疆幻灯
	var tophd1 = new Swiper('.tophd1 .swiper-container', {
		
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
	 fadeEffect: {
		 crossFade: true,
	   },
		touchRatio: 2,
		autoplay: {
			delay: 6000
		},
		navigation: {
			nextEl: '.tophd1 .swiper-button-next',
			prevEl: '.tophd1 .swiper-button-prev',
		},
		pagination: {
			el: '.tophd1 .swiper-pagination',
			clickable: true,
		}
	});
	// 全宽专题banner1 
	// var important1 = new Swiper('.important1 .swiper-container', {
	// 	//direction: 'vertical',
	// 	effect: 'fade',
	// 	slidesPerView: 1,
	// 	loop: true,
	// 	touchRatio: 2,
	// 	autoplay: {
	// 		delay: 6000
	// 	},
	// 	pagination: {
	// 		el: '.important1 .swiper-pagination',
	// 		clickable: true,
	// 	}
	// });
	var important1 = new Swiper('.important1 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		touchRatio: 2,
		// autoplay: {
		// 	delay: 6500
		// },
		pagination: {
			el: '.important1 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important1 .swiper-button-next',
			prevEl: '.important1 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,

			},
			576: {
				slidesPerView: 2,
				spaceBetween: 6,

			},
			768: {
				slidesPerView: 2,
				spaceBetween: 6,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,

			},
			1260: {
				slidesPerView: 4,
				spaceBetween: 30,
				loop: true,
			}
		}
	});
	//一行多个专题banner2
	var important2 = new Swiper('.important2 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 6500
		},
		pagination: {
			el: '.important2 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important2 .swiper-button-next',
			prevEl: '.important2 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 1,
				// slidesPerColumnFill: 'row',
				// loop: false,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 6,
				slidesPerColumn: 2,
				slidesPerColumnFill: 'row',
				loop: false,
				slidesPerGroup: 2,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 6,
				slidesPerColumn: 2,
				slidesPerColumnFill: 'row',
				loop: false,
				slidesPerGroup: 2,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 30,

			},
			1260: {
				slidesPerView: 5,
				spaceBetween: 30,

			},
		}
	});
	//一行多个专题banner4
	var important4 = new Swiper('.important4 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 5000
		},
		pagination: {
			el: '.important4 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important4 .swiper-button-next',
			prevEl: '.important4 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				// loop: false,
			},
			576: {
				slidesPerView: 1,
				spaceBetween: 15,
				slidesPerColumn: 4,
				slidesPerColumnFill: 'row',
				loop: false,
				slidesPerGroup: 2,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 15,
				slidesPerColumn: 4,
				slidesPerColumnFill: 'row',
				loop: false,
				slidesPerGroup: 2,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 30,

			},
			1260: {
				slidesPerView: 5,
				spaceBetween: 30,

			},
		}
	});
	//一行多个专题banner5
	var important5 = new Swiper('.important5 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 5300
		},
		pagination: {
			el: '.important5 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important5 .swiper-button-next',
			prevEl: '.important5 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				loop: true,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				// loop: false,
				// slidesPerGroup: 2,
				loop: true,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				// loop: false,
				// slidesPerGroup: 2,
				loop: true,
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 20,
				loop: true,
			},
			1260: {
				slidesPerView: 5,
				spaceBetween: 30,
				loop: true,
			},
			1460: {
				slidesPerView: 6,
				spaceBetween: 30,
				loop: true,
			},
		}
	});
	//一行多个竖图海报banner3
	var important3 = new Swiper('.important3 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 2,
		spaceBetween: 10,
		loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 7300
		},
		pagination: {
			el: '.important3 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important3 .swiper-button-next',
			prevEl: '.important3 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 3,
			},
			576: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 0,

			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 10,

			},
			1260: {
				slidesPerView: 2,
				spaceBetween: 10,

			},
		}
	});
	// 视频幻灯2层
	var swipervideohd1 = new Swiper('.videohd1 .swiper-container', {
		slidesPerView: 2,
		slidesPerColumn: 2,
		slidesPerColumnFill: 'row',
		spaceBetween: 10,
		// loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 7000
		},
		navigation: {
			nextEl: '.videohd1 .tsicon-right-circle',
			prevEl: '.videohd1 .tsicon-left-circle',
		},
		pagination: {
			el: '.videohd1 .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			576: {
				slidesPerView: 1,
				spaceBetween: 6,
				slidesPerColumn: 1,
				loop: true,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 6,
				slidesPerColumn: 2,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesPerColumn: 2,
			},
		},
		on: {
			init: function() {
				var videoBor = $(".videohd1 .swiper-slide"); //video的swiper对象数组
				var videolist = videoBor.find("video"); //video对象数组
				videoBor.on("click", function() {
					swipervideohd1.autoplay.stop();
					var $video = $(this).find("video")[0];
					if ($video.paused) {
						var videoPoster = $(this).find(".card-img-overlay"); //当前封面对象
						videoPoster.hide();
						$video.play();

					}
				});

				videolist.on("pause", function() {
					/*所有封面浮层show&所有视频hide*/
					videoBor.find(".card-img-overlay").show();
					//videoBor.find("video").hide();
					for (var k = 0; k < videolist.length; k++) {
						videolist[k].pause();
					}
				});

				videolist.on("play", function() {
					/*当前视频show*/
					$(this).show();
					//for(var k = 0 ;k<videolist.length;k++){
					// videolist[k].addEventListener('play',function(){
					// 	for(var j=0;j<videolist.length;j++){
					// 			if(k!=j){
					// 				videolist[j].pause();
					// 			}  
					// 	  }
					// })
					// };
					if ($(this)[0].play) {
						swipervideohd1.autoplay.stop();
					}
				});
			},

			slideChange: function() {
				var videolist = $(".videohd1 .swiper-slide").find("video"); //video对象数组
				for (var k = 0; k < videolist.length; k++) {
					videolist[k].pause();
				}
			}
		}

	});
	// 读报
	var newpaper1 = new Swiper('.newpaper1 .swiper-container', {
		slidesPerView: 1,
		loop: true,
		//effect : 'fade',
		touchRatio: 2,
		// autoplay: {
		// 	delay: 7500
		// },
		navigation: {
			nextEl: '.newpaper1 .tsicon-right-circle',
			prevEl: '.newpaper1 .tsicon-left-circle',
		},
		pagination: {
			el: '.newpaper1 .swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 6,
			},
			768: {
				slidesPerView: 1,
			},
			1024: {
				slidesPerView: 1,
			},
		}
	});
	//快速直达栏目navlinks
	var navlinks = new Swiper('.navlinks .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 5,
		spaceBetween: 10,
		slidesPerColumn: 2,
		slidesPerColumnFill: 'row',
		loop: false,
		touchRatio: 2,
		autoplay: {
			delay: 8000
		},
		pagination: {
			el: '.navlinks .swiper-pagination',
			clickable: true,
		}
	});
	/* 3d幻灯*/
	var certifySwiper = new Swiper('.certify .swiper-container', {
		effect: 'coverflow',
		slidesPerView: 2,
		centeredSlides: true,
		loop: true,
		autoplay: true,
		navigation: {
			nextEl: '.certify .tsicon-right-circle',
			prevEl: '.certify .tsicon-left-circle',
		},
		pagination: {
			el: '.certify .swiper-pagination',
			clickable: true,
		},
		coverflowEffect: {
			rotate: 0,
			stretch: 150,
			depth: 160,
			modifier: 1,
			slideShadows: true
		},
		breakpoints: {
			576: {
				effect: 'slide',
				slidesPerView: 1,
				// spaceBetween: 6,
				// slidesPerColumn: 1,
				// loop: true,
			},
			768: {
				effect: 'slide',
				slidesPerView: 1,
				// spaceBetween: 6,
				// slidesPerColumn: 2,
			},
			1024: {
				effect: 'coverflow',
				slidesPerView: 2,
			}
		}

	});
	/* 3d幻灯*/
	var certify2Swiper = new Swiper('.certify2 .swiper-container', {
		breakpoints: {
			1024: {
				effect: 'coverflow',
				slidesPerView: 2,
			},
			576: {
				effect: 'slide',
				slidesPerView: 1,
			},
			768: {
				effect: 'slide',
				slidesPerView: 1,
			}
		},
		coverflowEffect: {
			rotate: 0,
			stretch: 80,
			depth: 100,
			modifier: 2,
			slideShadows: true
		},
		effect: 'coverflow',
		//slidesPerView: 2,
		centeredSlides: true,
		observer:true,
		loop: true,
		autoplay: {
			delay: 4000
		},
		navigation: {
			nextEl: '.certify2 .tsicon-right-circle',
			prevEl: '.certify2 .tsicon-left-circle',
		},
		pagination: {
			el: '.certify2 .swiper-pagination',
			clickable: true,
		}
	});

	//liandonghd3 右边文字左边幻灯2 春节通栏2023
	var liandonghd3 = new Swiper('.liandonghd3', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		autoplay: false,
		loop: true,
		hashNavigation: {
			watchState: true,
		},
		pagination: {
			el: '.swiper-pagination',
		},
		on: {
			slideNextTransitionEnd: function () {
				change2(this.realIndex)
			}
		}
	});

	function change2(index) {
		$('.cj2023_btn1').eq(index).addClass('on').siblings().removeClass('on')
	}
	$('.cj2023_btn1').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on')
		liandonghd3.slideTo($(this).index() + 1, 1000, false)
	});

	//一行3个图片banner6
	var important6 = new Swiper('.important6 .swiper-container', {
		//direction: 'vertical',
		//effect : 'fade',
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		touchRatio: 2,
		autoplay: {
			delay: 5300
		},
		pagination: {
			el: '.important6 .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.important6 .swiper-button-next',
			prevEl: '.important6 .swiper-button-prev',
		},
		breakpoints: {
			220: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				loop: true,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				// loop: false,
				// slidesPerGroup: 2,
				loop: true,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 6,
				// slidesPerColumn: 2,
				// slidesPerColumnFill: 'row',
				// loop: false,
				// slidesPerGroup: 2,
				loop: true,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
				loop: true,
			},
			1260: {
				slidesPerView: 3,
				spaceBetween: 30,
				loop: true,
			},
			1460: {
				slidesPerView: 3,
				spaceBetween: 30,
				loop: true,
			},
		}
	});
});

/* 多个视频，播放停止其他视频播放 */
$(function() {
	var videoobjs = document.getElementsByTagName('video');
	var videoobjlength = videoobjs.length;

	if (videoobjlength > 0) {
		var _loop = function _loop(i) {
			videoobjs[i].addEventListener('play', function() {
				for (var j = 0; j < videoobjlength; j++) {
					if (i != j) {
						videoobjs[j].pause();
					}
				}
			});
		};

		for (var i = 0; i < videoobjlength; i++) {
			_loop(i);
		}
	}
});
// 回顶部
$('.tstop-btn').on('click', function() {
	$('html').animate({
		scrollTop: 0
	}, 1000);
});

$(window).on('scroll', function() {
	var $scroll = $(this).scrollTop();

	if ($scroll > 300) {
		$('.tstop-btn').addClass('show');
	} else {
		$('.tstop-btn').removeClass('show');
	}
});
// 集团旗下提示文字
$(function() {
	$('#jtqx_tooltip a').tooltip({
		placement: 'bottom'
	})
})
// $('#guoranAffix').affix({
//   offset: {
//     top: 1150,
//     bottom: function () {
//       return (this.bottom = $('.footer_bgred').outerHeight(true))
//     }
//   }
// })





// $(function () {
//  var a1 = navigator.userAgent;
//  var yesIE = a1.search(/Trident/i);
//  if (yesIE>0) {
//  	alert('当前浏览器是IE且版本介于8/9/10/11之间，文档模式是：' + document.documentMode);
//  }
// });
//火狐浏览器自定义滚动条
if (navigator.userAgent.indexOf('Firefox') >= 0) {
		$(".card-body").niceScroll({
		cursorwidth: "4px",
		cursorborderradius: "5px",
		cursorcolor: "#FFE8C6",
		horizrailenabled: false,
		oneaxismousemode: "false"
	});
	$(".card-body2").niceScroll({
		cursorwidth: "4px",
		cursorborderradius: "5px",
		cursorcolor: "#FFE8C6",
		horizrailenabled: false,
		oneaxismousemode: "false"
	});
	}

function isIE() {
	if (window.showModalDialog) {
		//alert('当前浏览器是IE且版本介于8/9/10/11之间，文档模式是：' + document.documentMode);
		//$('body').addClass("ie11");
		function appendJQCDN() {
			var head = document.head || document.getElementsByTagName('head')[0];
			var srcList_gr = ["jquery-1.12.4.min.js", "js/idangerous.swiper.min.js",
				"js/jquery.nicescroll-3.7.6.min.js"];
			for (var i = 0; i < srcList_gr.length; i++) {
				var script = document.createElement('script');
				script.setAttribute("src", srcList_gr[i]);
				head.appendChild(script);
			}
			var link = document.createElement('link');
			link.setAttribute("href", "css/idangerous.swiper.css");
			head.appendChild(link);



		}
		appendJQCDN();
		$('body').attr('id', 'ie11');
		//IE浏览器自定义滚动条
		$(".card-body").niceScroll({
			cursorwidth: "6px",
			cursorborderradius: "6px",
			cursorcolor: "#FFE8C6",
			horizrailenabled: false,
			oneaxismousemode: "false"
		});
		$(".card-body2").niceScroll({
			cursorwidth: "6px",
			cursorborderradius: "6px",
			cursorcolor: "#FFE8C6",
			horizrailenabled: false,
			oneaxismousemode: "false"
		});
		var tophd1 = new Swiper('#ie11hd1 .swiper-container', {
			pagination: '#ie11hd1 .swiper-pagination',
			loop: true,
			grabCursor: true,
			paginationClickable: true
		})
		$('#ie11hd1 .swiper-button-prev').on('click', function(e) {
			e.preventDefault()
			mySwiper.swipePrev()
		})
		$('#ie11hd1 .swiper-button-next').on('click', function(e) {
			e.preventDefault()
			mySwiper.swipeNext()
		})


	}
	return false;
}
isIE();
