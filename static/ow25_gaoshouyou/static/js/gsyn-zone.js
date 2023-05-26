(function ($) {
	$(document).ready(function () {

		if($(".zone-index-slider").length>0 && $(".zone-index-slider div").length>1){
			 $(".zone-index-slider").slidesjs({
				width: 400,
				height: 240,
				play: {
					active: false,　
					auto:true,　//开始自动播放功能；默认值true
					effect: "fade",　　//切换方式，跟上面两个切换方式不冲突；默认值slide
					interval: 5000,　　　//在每一个幻灯片上花费的时间；默认值5000
					swap: false,　　　　　　//显示或隐藏 自动播放和停止按钮；默认值true
					pauseOnHover: true,　　//鼠标移入是否暂停；默认值false
					restartDelay: 2500　　//重启延迟；默认值2500
				  },
				navigation: {
					active: false,
					effect: "fade"
				},
				pagination: {
					active: false,
					effect: "fade"
				},
				effect: {
					fade: {
						speed: 400,
						crossfade: true
					}
				}
			});
		}


		if ($(".zone-text-show-box").length > 0 && $(".zone-text-show-flex").length>0) {
			
			$(".zone-text-show-flex").append('<div class="zone-text-show-bg"><strong class="ts1"><a href="#ts"><i class="icf i-zixun"></i> 正文</a></strong><div class="zone-text-show-fb"></div><strong class="ts2"><a href="#tag"><i class="icf i-tag"></i> 标签阅读</a></strong><strong class="ts3"><a href="#comment"><i class="icf i-edit"></i> 评论</a></strong>');


			$(".zone-text-show-flex strong a").click(function () {
				var href = $(this).attr("href");
				var th = $(".top-nav").height();
				var pos = $(href).offset().top - th;
				$("html,body").animate({
					scrollTop: pos
				}, 200);
				return false;
			});

			if ($(".zone-text-show-body").children("h2").length >= 0) {

				$(".zone-text-show-fb").append('<ol class="zone-text-show-nav"></ol>');

				$(".zone-text-show-body").children("h2").each(function () {
					var htid = $(".zone-text-show-body").children("h2").index(this);
					$(this).attr("id", "to" + htid);
					var hid = $(this).attr("id");
					if ($(this).hasClass("pzh")) {
						$(".zone-text-show-nav").append('<li class="nh2"><a href="#' + hid + '">' + $(this).text() + '</a></li>');
					} else {
						$(".zone-text-show-nav").append('<li class="nh2"><a href="#' + hid + '">' + $(this).text() + '</a></li>');
					};
					if ($(this).nextUntil("h2", "h3").length >= 1) {
						$("[href='#" + hid + "']").after('<ol class="zone-text-show-nav-' + $(this).attr("id") + '"></ol>');
					};
				});

				$(".zone-text-show-body").children("h3").each(function () {
					var h3tid = $(".zone-text-show-body").children("h3").index(this);
					$(this).attr("id", $(this).prevAll("h2").attr("id") + "-" + h3tid);
					var h3id = $(this).attr("id");
					$('<li class="nh3"><a href="#' + h3id + '">' + $(this).text() + '</a></li>').appendTo('.zone-text-show-nav-' + $(this).prevAll("h2").attr("id"));
				});

				//设置导航的位置
				var w = $(window);
				var $this = $(".zone-text-show-flex");
				var allEle = $(".zone-text-show-body").children("h2,h3");
				var headLen = $(".zone-text-show-body").children("h2,h3").length;
				var toph = $(".top-nav").height();
				w.bind("scroll", _top);

				function _top() {
					var wt = w.scrollTop(),
						ct = $this.height(),
						top = $this.parent(".zone-text-show-count").offset().top - toph - 20,
						left = $this.parent(".zone-text-show-count").offset().left;
					if (wt > top && wt <= $this.parent(".zone-text-show-count").offset().top + $this.parent(".zone-text-show-count").height() - ct - toph - 20) {
						$this.css({
							"position": "fixed",
							"bottom": "auto",
							"top": toph + 20,
							"left": left,
							"z-index": "3"
						});
					} else if (wt > $this.parent(".zone-text-show-count").offset().top + $this.parent(".zone-text-show-count").height() - ct - toph - 20) {
						$this.css({
							"position": "absolute",
							"bottom": "0",
							"top": "auto",
							"left": "0",
							"z-index": "3"
						});
					} else {
						$this.removeAttr('style');
					}
					for (var i = headLen - 1; i >= 0; i--) {
						if (wt >= allEle.eq(i).offset().top - toph - 10) {
							var index = i;
							$(".zone-text-show-nav li").removeClass('active').eq(index).addClass('active');
							scrollSlide($(".zone-text-show-nav li").eq(index), index);
							return false;
						} else {
							$(".zone-text-show-nav li").removeClass('active');
						}
					};

				}

				if ($(".zone-text-show-nav li").length > 3) {
					$(".zone-text-show-fb").append("<div class='zone-text-show-btn'><a class='up'><span></span></a><a class='down'><span></span></a></div>");
					$(".zone-text-show-btn .up span").addClass("false");
					var intop = $(".zone-text-show-nav").height();
					var enableTop = intop - $(".zone-text-show-fb").height();
					var step = 74;
					//点击向下的按钮
					$('.zone-text-show-btn .down').bind('click', function () {
						if ($(this).find("span").hasClass('')) {
							if ((enableTop - Math.abs(parseInt($(".zone-text-show-nav").css('top')))) > step) {
								$(".zone-text-show-nav").stop().animate({
									'top': '-=' + step
								}, 'fast');
								$('.zone-text-show-btn .up span').removeClass('false');
							} else {
								$('.zone-text-show-nav').stop().animate({
									'top': -enableTop
								}, 'fast');
								$(this).find("span").addClass('false');
								$('.zone-text-show-btn .up span').removeClass('false');
							}
						} else {
							return false;
						}
					});
					//点击向上的按钮
					$('.zone-text-show-btn .up').bind('click', function () {
						if ($(this).find("span").hasClass('')) {
							if (Math.abs(parseInt($(".zone-text-show-nav").css('top'))) > step) {
								$(".zone-text-show-nav").stop().animate({
									'top': '+=' + step
								}, 'fast');
								$('.zone-text-show-btn .down span').removeClass("false");
							} else {
								$('.zone-text-show-nav').stop().animate({
									'top': '0'
								}, 'fast');
								$(this).find("span").addClass('false');
								$('.zone-text-show-btn .down span').removeClass('false');
							}
						} else {
							return false;
						}
					});
				}

				//点击导航中的各个目录
				$('.zone-text-show-nav').delegate('li', 'click', function () {
					var index = $('.zone-text-show-nav li').index($(this));
					scrollSlide($(this), index);
					var ddIndex = $(this).find('a').stop().attr('href').replace("#", "");
					var windowTop = $("[id='" + ddIndex + "']").offset().top;
					$('body,html').animate({
						scrollTop: windowTop - toph
					}, 'fast');
					return false;
				});

				//导航的滚动，以及向上，向下按钮的显示隐藏
				function scrollSlide(that, index) {
					if (index < 3) {
						$('.zone-text-show-nav').stop().animate({
							'top': '0'
						}, 'fast');
						$('.zone-text-show-btn .down span').removeClass('false');
						$('.zone-text-show-btn .up span').addClass('false');
					} else if (index > headLen - 3) {
						$('.zone-text-show-nav').stop().animate({
							'top': -enableTop
						}, 'fast');
						$('.zone-text-show-btn .down span').addClass('false');
						$('.zone-text-show-btn .up span').removeClass('false');
					} else {
						var navTop = parseInt($('.zone-text-show-nav').css('top')) + $('.zone-text-show-fb').height() / 2 - (that.offset().top - $('.zone-text-show-fb').offset().top + 10);
						$('.zone-text-show-nav').stop().animate({
							'top': navTop
						}, 'fast');
						$('.zone-text-show-btn .down span').removeClass('false');
						$('.zone-text-show-btn .up span').removeClass('false');
					}
				};


			}
        }

        if ($(".zone-sider-fixed").length > 0 && $(window).width() >= 1200) {
            var fixedT = $(".zone-sider-fixed"),
                fixedTh = fixedT.height(),
                fixedTw = fixedT.width(),
                fixedTtop = fixedT.offset().top,
                toph = $(".top-nav").height(),
                mainh = $(".zone-main").height(),
                mainT = $(".zone-main").offset().top,
                flinkT = $(".zone-friend-links").height();
            if (flinkT) {
                flinkT = flinkT + 40;
            } else {
                flinkT = flinkT + 20;
            }
            if (mainh>$(".zone-sub").height()) {
                $(window).scroll(function () {
                    if ($(window).scrollTop() > fixedTtop -toph && $(window).scrollTop()<=mainh+mainT-fixedTh-toph) {
                        fixedT.css({
                            "position": "fixed",
                            "top": toph,
                            "z-index": "9999",
                            "width": fixedTw,
                            "right": "auto",
                            "bottom":"auto"
                        }).addClass("isfixed");
                        if (fixedT.siblings(".sider-fixed-mod").length < 1) {
                            fixedT.parent(".zone-sub").append("<div style='height:" + fixedTh + "px' class='sider-fixed-mod' />");
                        }
                    } else if ($(window).scrollTop()>mainh+mainT-fixedTh-toph) { 
                        fixedT.css({"position":"absolute","top":"auto","bottom":flinkT,"right":"20px","z-index":"9999"});
                    }else {
                        fixedT.removeClass("isfixed").removeAttr("style").siblings(".sider-fixed-mod").remove();
                    }
                });
            }
			
		}
        
        //tab切换
        if ($(".games-tabs-swiper").length > 0) {
            var tabs = new Swiper('.games-tabs-swiper', {
                spaceBetween: 0,
                effect: 'fade',
                // grabCursor: true,
                preventClicks : false,
                initialSlide: 0,
                autoHeight: true,
                allowTouchMove: false,
                // centeredSlides : true,
                // centeredSlidesBounds: true,
                // centerInsufficientSlides: true,
                normalizeSlideIndex: false,
                // iOSEdgeSwipeDetection: true,
                // touchReleaseOnEdges: true,
                // touchMoveStopPropagation: true,
                pagination: {
                    el: '.zone-tabs-title',
                    type: 'custom',
                    bulletElement: 'li',
                    clickable: true,
                    bulletClass : 'tabs-item',
                    bulletActiveClass: 'active',
                    renderCustom: function (swiper, current, total) {
                        var paginationHtml = "";
                        for(var i= 0; i< total; i++) {
                        // 判断是不是激活焦点，是的话添加active类，不是就只添加基本样式类
                        if(i === (current -1)){
                            paginationHtml += '<li class="tabs-item active">'+swiper.slides.eq(i).data("title")+'</li>';
                            }else{
                            paginationHtml += '<li class="tabs-item">'+swiper.slides.eq(i).data("title")+'</li>';
                            }
                        }
                        return paginationHtml;
                    }
                },
            });
        }

        if ($(".zone-indexapp,.zone-game-show").length >0) {
            $(".indexapp-download a").on('mouseenter', function () {
                var that = $(this);
                var sys = that.data('sys')?that.data('sys')+'<br>':'';
                var ver = that.data('ver')?that.data('ver')+'<br>':'';
                var size = that.data('size')?that.data('size'):'';
                var msg = sys+ver+size;
                if(msg){
                    layer.tips(msg,that,{
                        tips:  [1, '#666'],
                        time:0
                      });
                }
            });
            $(".indexapp-download a").on('mouseleave', function(){
                layer.closeAll('tips');
            });
    
            $(".indexapp-download .tips,.zone-game-show-down .tips").on('click', function(){
                var that = $(this);
                var msg = that.data('msg'),
                    title = that.data('title'),
                    code = that.data('code');
                layer.open({
                    type: 1,
                    area: '320px',
                    title:title,
                    shadeClose:true,
                    content: '<p style="padding:15px;text-align:center;" class="fc-red">'+msg+'<img src="'+code+'" width="200" height="200" style="display:block;margin:10px auto;"><p>'
                  });
            });
        }

        //app截图
        if($(".games-img .swiper-slide").length>1){
            var gamesImg = new Swiper('.games-img', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                freeMode : true,
                scrollbar: {
                  el: '.swiper-scrollbar',
                  hide: false,
                  draggable:true
                },
            });
            layer.photos({
                photos: '.games-img'
                ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
              });
            gamesImg.scrollbar.$el.css('height','10px');
        }

	});
})(window.jQuery);

//手机号判断
function checkPhone(n){ 
    var phone = n;
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
        return false; 
    } else {
        return true; 
    }
}

window.onload = function () {




};
