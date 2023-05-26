//焦点图切换效果 
/*
imgsCon  //运动元素的id或class
iconsCon  //包含按钮的元素的id或class
prevIcon  //向前按钮的元素的id或class
nextIcon   //向后按钮的元素的id或class
chooseIcon   //按钮被选择时增加或删除的class  默认是on     
focusNum  //包含显示当前第几页的元素的id或class
moveTime  //动画运动时间  默认800毫秒
delayTime  //动画延迟时间  默认5000毫秒
isAuto  //是否自动轮换  默认不自动
isCycle  //是否运动到头继续循环  默认不循环
isSingleImg // 是单图刷的轮换还是多图刷刷刷的轮换 默认是刷刷刷的轮换
direction //运动方向 默认是水平运动
step //每次轮的步数 默认是1
cannotClickClass //左右不能点击时加的class 默认加end
beginPos //适用于起始位置不是left 0 的运动 默认是0
callback //回调函数 function (index) {} 其中对外有当前动画的index
*/
function autoMove(options) {
	var $imgs_c = $(options.imgsCon),
		$icons_c = $(options.imgsCon).parent().parent().find(options.iconsCon),
		$imgs = $imgs_c.children(),
		$icons = $icons_c.children(),
		iconsTagName = $icons.eq(0).get(0) ? $icons.eq(0).get(0).tagName.toLowerCase() : 'li',
		$prevIcon = $(options.imgsCon).parent().parent().find(options.prevIcon),
		$nextIcon = $(options.imgsCon).parent().parent().find(options.nextIcon),
		chooseIcon = options.chooseIcon || 'on',
		step = options.step || 1,
		cannotClickClass = options.cannotClickClass || 'end',
		moveTime = options.moveTime || 800,
		delayTime = options.delayTime || 5000,
		isSingleImg = options.isSingleImg || false, //是否是单图刷的轮换，默认是刷刷刷的轮换
		isAuto = options.isAuto || false,
		isCycle = options.isCycle || false,
		directionData = {},
		direction = options.direction || 'left',
		moveDistance = direction === 'left' ? $imgs.eq(0).outerWidth(true) : $imgs.eq(0).outerHeight(true),
		beginPos = options.beginPos || 0,
		page = 0,
		moveTimer = null,
		showImgLen = $imgs.length,
		move;

	if(showImgLen <= step) {
		$prevIcon.addClass(cannotClickClass);
		$nextIcon.addClass(cannotClickClass);
		return;
	} else if(step == 1 && isCycle && !isSingleImg) {
		$imgs_c.append($imgs.eq(0).clone(true));
		if(direction === 'left') {
			$imgs_c.width(moveDistance * (showImgLen + 1));
		}
	} else if(!isSingleImg) {
		if(direction === 'left') {
			$imgs_c.width(moveDistance * showImgLen);
		}
	} else if(isSingleImg) {
		$imgs.eq(0).css(direction, '0px');
	}

	if(options.iconsCon && $icons_c.children().get(0) && $imgs_c.children().length != 1) {
		var iconclone = $icons_c.children().eq(0),
			iconclass = iconclone.attr('class'),
			tag = iconclone.get(0).tagName.toLowerCase(),
			shtml = '';
		for(var i = 0; i < showImgLen; i++) {
			(i == 0) ? shtml += '<' + tag + ' class="' + chooseIcon + '"' + '></' + tag + '>': shtml += '<' + tag + '></' + tag + '>';
		}
		$icons_c.html(shtml);
	}

	move = function() {
		window.clearTimeout(moveTimer);
		if(!$imgs_c.is(':animated') && !isSingleImg) {
			page++;
			if(page === Math.ceil(showImgLen / step) && isCycle) {
				$imgs_c.next().children().eq(0).addClass(chooseIcon).siblings().removeClass(chooseIcon);
				directionData[direction] = beginPos - moveDistance * step * page;
				$imgs_c.stop().animate(directionData, moveTime, function() {
					$imgs_c.css(direction, beginPos + 'px');
					page = 0;
					if(options.callback) {
						options.callback(page);
					}
					if(isAuto) {
						moveTimer = window.setTimeout(move, delayTime);
					}
				});
			} else if(page === Math.ceil(showImgLen / step) && !isCycle) {
				page--;
				return;
			} else {
				directionData[direction] = beginPos - moveDistance * step * page;
				$imgs_c.stop().animate(directionData, moveTime, function() {
					if(options.callback) {
						options.callback(page);
					}
					if(page + 1 === Math.ceil(showImgLen / step) && !isCycle) {
						$nextIcon.addClass(cannotClickClass);
					}
				});
				$imgs_c.next().children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
				if(isAuto) {
					moveTimer = window.setTimeout(move, delayTime);
				}
			}
		} else if(!$imgs.eq(page).is(':animated') && isSingleImg) {
			page++;
			if(page === showImgLen) {
				page = 0;
				directionData[direction] = beginPos - moveDistance;
				$imgs.eq(showImgLen - 1).stop().animate(directionData, moveTime);
			} else {
				directionData[direction] = beginPos - moveDistance;
				$imgs.eq(page - 1).stop().animate(directionData, moveTime);
			}
			directionData[direction] = beginPos;
			$imgs.eq(page).css(direction, moveDistance).stop().animate(directionData, moveTime, function() {
				if(options.callback) {
					options.callback(page);
				}
			});
			$imgs_c.next().children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
			if(isAuto) {
				moveTimer = window.setTimeout(move, delayTime);
			}
		}
	};

	if(isAuto) {
		moveTimer = window.setTimeout(move, delayTime);
	}

	$imgs_c.delegate($(this).children(), 'mouseover', function(e) {
		window.clearTimeout(moveTimer);
	});

	$imgs_c.delegate($(this).children(), 'mouseout', function(e) {
		if(isAuto) {
			moveTimer = window.setTimeout(move, delayTime);
		}
	});

	$icons_c.delegate(iconsTagName, 'mouseover', function(e) {
		window.clearTimeout(moveTimer);
		if(!isSingleImg) {
			page = $(e.target).index();
			directionData[direction] = beginPos - moveDistance * step * page;
			$imgs_c.stop().animate(directionData, moveTime, function() {
				if(options.callback) {
					options.callback(page);
				}
			});
			$(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
		} else if(isSingleImg && $(e.target).index() !== page) {
			if(page > $(e.target).index()) { //点顺序小于当前的按钮
				$imgs.eq($(e.target).index()).css(direction, beginPos - moveDistance);
				directionData[direction] = moveDistance - beginPos;
				$imgs.eq(page).stop(false, true).animate(directionData, moveTime);
				page = $(e.target).index();
				directionData[direction] = beginPos;
				$imgs.eq(page).stop().animate(directionData, moveTime, function() {
					if(options.callback) {
						options.callback(page);
					}
				});
				$(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
			} else {
				directionData[direction] = beginPos - moveDistance;
				$imgs.eq(page).stop(false, true).animate(directionData, moveTime);
				page = $(e.target).index();
				directionData[direction] = beginPos;
				$imgs.eq(page).css(direction, moveDistance).stop().animate(directionData, moveTime, function() {
					if(options.callback) {
						options.callback(page);
					}
				});
				$(e.target).addClass(chooseIcon).siblings().removeClass(chooseIcon);
			}
		}
	});

	$icons_c.delegate(iconsTagName, 'mouseout', function(e) {
		if(isAuto) {
			moveTimer = window.setTimeout(move, delayTime);
		}
	});

	$prevIcon.click(function() {
		$(this).next().removeClass(cannotClickClass); //$nextIcon
		if(page === 0 && !isCycle && !isSingleImg) {
			return;
		} else {
			window.clearTimeout(moveTimer);
			if(!$imgs_c.is(':animated') && !isSingleImg) {
				page--;
				if(page === -1) {
					$imgs_c.css(direction, beginPos - moveDistance * step * showImgLen + 'px');
					page = showImgLen - 1;
				}
				directionData[direction] = beginPos - moveDistance * step * page;
				$imgs_c.stop().animate(directionData, moveTime, function() {
					if(options.callback) {
						options.callback(page);
					}
					if(page === 0 && !isCycle) {
						$prevIcon.addClass(cannotClickClass);
					}
				});
				$imgs_c.next().children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
				if(isAuto) {
					moveTimer = window.setTimeout(move, delayTime);
				}
			} else if(!$imgs.eq(page).is(':animated') && isSingleImg) {
				page--;
				if(page === -1) {
					page = showImgLen - 1;
					$imgs.eq(page).css(direction, beginPos - moveDistance);
					directionData[direction] = moveDistance - beginPos;
					$imgs.eq(0).stop(false, true).animate(directionData, moveTime);
				} else {
					$imgs.eq(page).css(direction, beginPos - moveDistance);
					directionData[direction] = moveDistance - beginPos;
					$imgs.eq(page + 1).stop(false, true).animate(directionData, moveTime);
				}
				directionData[direction] = beginPos;
				$imgs.eq(page).stop().animate(directionData, moveTime, function() {
					if(options.callback) {
						options.callback(page);
					}
				});
				$imgs_c.next().children().eq(page).addClass(chooseIcon).siblings().removeClass(chooseIcon);
				if(isAuto) {
					moveTimer = window.setTimeout(move, delayTime);
				}
			}
		}
	});

	$nextIcon.click(function() {
		$(this).prev().removeClass(cannotClickClass); //$prevIcon
		if(page === showImgLen - 1 && !isCycle && !isSingleImg) {
			return;
		} else {
			move();
		}
	});
}
autoMove({
	'imgsCon': '#slide-list',
	'iconsCon': '#slide-index',
	'prevIcon': '#prev',
	'nextIcon': '#next',
	'chouse_icon': 'active',
	'isAuto': true,
	'isCycle': true,
	'callback': function(index) {
		$('#imgs_cont1').find('.ft').css('height', 0).eq(index).animate({
			'height': '100px'
		}, 300);
	}
});
autoMove({
	'imgsCon': '#imgs_cont1',
	'iconsCon': '#icons_cont1',
	'prevIcon': '#prevIcon1',
	'nextIcon': '#nextIcon1',
	'chouse_icon': 'on',
	'isAuto': true,
	'isCycle': true,
	'callback': function(index) {
		$('#imgs_cont1').find('.ft').css('height', 0).eq(index).animate({
			'height': '100px'
		}, 300);
	}
});
$('#imgs_cont1').find('.ft').eq(0).css('height', 100);

autoMove({
	'imgsCon': '#actintro_ftimgs',
	'prevIcon': '#actintro_ftprev',
	'nextIcon': '#actintro_ftnext',
	'isCycle': true,
	'moveTime': 300
});
$('#actintro_ftimgs').append($('#actintro_ftimgs').children('li').eq(1).clone(true));
$('#actintro_ftimgs').append($('#actintro_ftimgs').children('li').eq(2).clone(true));
$('#actintro_ftimgs').css('width', $('#actintro_ftimgs li').length * $('#actintro_ftimgs').children('li').eq(0).outerWidth(true));

//标签切换模块 tab    
function handle(elem) {
	elem.mouseover(function() {
		var index = $(this).index();
		if(!$(elem).eq(index).hasClass('on')) {
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent().next().children().hide().eq(index).fadeIn(300);
		}
	});
}
handle($('.actintro .acttitle li'));
// index

(function() {
	// nav
	var topBar = $('.J-top-bar');
	var navBar = $('.J-nav');
	var navFuc = function(obj) {
		for(var i = 0; i < obj.length; i++) {
			$(obj[i]).hover(function() {
				$(this).addClass('on');
				$(this).find('.layer').stop(true, true).slideDown(100);
			}, function() {
				$(this).removeClass('on');
				$(this).find('.layer').stop(true, true).slideUp(100);
			})
		}
	}
	navFuc([topBar.find('li'), '.J-nav .J-tv', '.menu-layer .more'])

	//sub nav
	//    var navMain = $('#navMain'),
	//     navSub = $('#navSub');
	// navMain.find('li').on('mouseover',function(){
	//    var index = $(this).index();
	//    if(!$(this).hasClass('tv')){
	//         $(this).addClass('on').siblings().removeClass('on');
	//         navSub.find('.item').eq(index).show().siblings().hide();
	//    }
	// })
	// navBar.on('mouseleave',function(){
	//    var curIndex=navMain.find('.cur').index();
	//    navMain.find('li').eq(curIndex).addClass('on').siblings().removeClass('on');
	//     navSub.find('.item').eq(curIndex).show().siblings().hide();
	// })
	// side nav
	var navSide = $('.J-nav-side');
	var navSideCon = $('.J-side-con');
	var navSideClose = navSide.find('.close');
	var navReturn = navSide.find('.return');
	var closeFlag = false;
	var navSideIndex = 0;
	navSideClose.on('click', function() {
		closeFlag = true;
		navSide.hide();
	})

	function sideInit() {
		navSide.css('height', 0);
		// $('#menuList .show-list').height($(window).height()-210);
		navSideCon.find('.con').each(function(idx, node) {
			if($(this).hasClass('menu-layer')) {
				$(this).find('.show-list').height($(window).height() - 210);
				$('#menuList .show-list').perfectScrollbar();
				return;
			} else {
				var conHeight = $(window).height() - 60;
				$(this).height(conHeight);
				var liHeight = $(this).find('.item').height();
				var len = $(this).find('.item').length;
				if(conHeight < liHeight * len) {
					$(this).perfectScrollbar();
				}
				// console.log("--------"+conHeight+"----------"+liHeight*len+"----------"+liHeight);

			}

		})
	}
	sideInit();
	$(window).on('scroll', function() {
		if(closeFlag) {
			return;
		}
		if($(this).scrollTop() > 250) {
			navSide.show();
			navSide.css({
				'height': $(window).height()
			});

		} else {
			navSide.hide();
			navSide.css({
				'height': 0
			})
		}

	})
	navReturn.on('click', function() {
		$("body,html").animate({
			"scrollTop": 0
		}, 800);
	})
	// if($('#menuList').length){
	//     $('#menuList .show-list').perfectScrollbar();
	// }
	navSide.find('.menu li').on('mouseover', function() {
		var index = $(this).index();
		navSideIndex = index;
		if($(this).hasClass('none')) {
			return;
		}
		navSideCon.show();
		$(this).addClass('on').siblings('').removeClass('on');
		navSideCon.children().eq(index).show(100).siblings('').hide()
	})
	navSide.on('mouseout', function() {
		// navSideCon.children().hide();
		navSideCon.hide();
		$(this).find('.menu li').removeClass('on');
	})
	navSideCon.on('mouseover', function() {
		navSide.find('.menu li').eq(navSideIndex).addClass('on');
		$(this).show();
	})
	navSideCon.on('mouseout', function() {
		$(this).hide();
	})
	var tabFuc = function(haddle, node) {
		haddle.on('click', function(e) {
			e.preventDefault()
			var index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			node.children().eq(index).show(100).siblings('').hide();
		})
	}
	// tabFuc(navSide.find('.menu li'),navSideCon);
	tabFuc($('.menu-layer .hd .item'), $('.menu-layer .bd'));
	// search
	var searchWrap = $('.search');
	var searchInp = searchWrap.find('input'); // 此处已改动
	var searchBtn = searchWrap.find('.btn');
	searchInp.on('focus', function(e) {
		$(this).parent().addClass('hover');
	})
	searchInp.on('blur', function() {
		$(this).parent().removeClass('hover');
	})
	searchInp.on('keyup click', function(e) {
		e.stopPropagation();
		if($(this).val() != '') {
			$(this).parent().removeClass('hover').addClass('active');
			$(this).siblings('.layer').show();
		} else {
			$(this).parent().addClass('hover').removeClass('active');
			$(this).siblings('.layer').hide();
		}
	})
	searchBtn.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();

		if(searchInp.val() != '') {
			window.open("http://so.jstv.com/?keyword=" + encodeURIComponent(searchInp.val()));
		} else {
			window.open("http://so.jstv.com")
		}
	})
	document.onkeydown = function(e) {
		var e = e || window.e || arguments.callee.caller.arguments[0];

		if(e && e.keyCode == 13) {
			if($('.content_login') && $('.content_login').css('display') == 'block') {
				$('.login')[0].click()
				return
			}
			if(searchInp.val() != '') {
				window.open("/search.shtml?keyword=" + encodeURIComponent(searchInp.val()));
			} else {
				// window.open("http://so.jstv.com")
			}
		}
	};
	$('html').on('click', function(e) {
		searchWrap.find('.layer').hide();
	})
})()
//给导航增加当前样式
function set_class(li, cur, text) { //选择器,加的样式 、文本
	var name = li;
	text = jQuery.trim(text);
	jQuery(name).each(function() {
		var li_text = jQuery.trim(jQuery(this).text() + "");
		if(li_text == text) {
			jQuery(this).addClass(cur);
		}
	});
}
//给导航增加当前样式
function set_class2(li, cur, text) { //选择器,加的样式 、文本
	var name = li;
	text = jQuery.trim(text);
	jQuery(name).each(function() {
		var li_text = jQuery.trim(jQuery(this).children("div").text() + "");
		if(li_text == text) {
			jQuery(this).addClass(cur);
		}
	});
}

$(function() {
	$(".media-array li:last-of-type").css("margin-right", "0"); //设置广电新媒体矩阵

});
/*搜索栏的提示信息*/
function hideholder() {
	$(".pholder").addClass("dpnone");
	$(".search").find("input").focus();
}

function showholder() {
	var txt = $(".search").find("input").val();
	if(txt.length == 0) {
		$(".pholder").removeClass("dpnone");
	}
}

/*视听黄山栏目下的导航栏*/
$(".hl-nav li").mousemove(function() {
	var index = $(this).index();
	$(this).addClass("color-change");
	$(this).siblings().removeClass("color-change");
	$(".hl-imglist li.hotlist").eq(index).removeClass("dpnone");
	$(".hl-imglist li.hotlist").eq(index).siblings().addClass("dpnone");
});
/* 点击搜索框的放大镜进行搜索 */
$('.search').children('a').click(function() {
	var searchInp = $('.search').children('input')
	if(searchInp.val() != '') {
		window.open("/search.shtml?keyword=" + encodeURIComponent(searchInp.val()));
	}
})

function set_class(li, cur, text) { //选择器,加的样式 、文本
	var name = li;
	text = jQuery.trim(text);
	jQuery(name).each(function() {
		var li_text = jQuery.trim(jQuery(this).text() + "");
		if(li_text == text) {
			jQuery(this).addClass(cur);
		}
	});
}

function tabs(id, cur, s) {
	var content = "_main_";
	if(jQuery("#" + id).length) {
		function closeContent(id, length) {
			for(var i = 1; i <= length; i++) {
				jQuery("#" + id + content + i).hide();
			}
		}
		var length = jQuery("#" + id + "  " + s).length;
		jQuery("#" + id + "  " + s).each(function(i) {
			jQuery(this).hover(function() {
				jQuery("#" + id + "  " + s).removeClass(cur);
				closeContent(id, length);
				jQuery(this).addClass(cur);
				jQuery("#" + id + content + (i + 1)).show();
			}, function() {});
		});
	} //end length
}

function goto() {
	var page = parseInt($('input[name="page"]').val());
	if(page > 0 && page <= totalpage) {
		if(page == 1)
			location.href = "list.shtml";
		else
			location.href = "list_" + page + ".shtml";
	}
}