/* settings block start */
 


/* browser selection */
var ie8 = ($.browser.msie && $.browser.version == '8.0') ? true : false;

/* mobile */
var isMobile = false;
function isMobile_f() {
    var array_mobileIds = new Array('iphone', 'android', 'ipad', 'ipod');
    var uAgent = navigator.userAgent.toLowerCase();
	
    for (var i=0; i<array_mobileIds.length; i++) {
		if(uAgent.search(array_mobileIds[i]) > -1) {
			isMobile = true;
		}
    }
}
isMobile_f();

function init_menu() {
	var timer = new Array();
	$('.big_dropdown').hover(
		function() {
			var content = $(this).attr('data-content');
			clearTimeout(timer[$('.main_menu li').index(this)]);
			$(this).addClass('hover');
			$('.block_big_dropdown[data-menu=' + content + ']').show();
		},
		function() {
			var content = $(this).attr('data-content');
			var _this = this;
			timer[$('.main_menu li').index(this)] = setTimeout(function() {
				$(_this).removeClass('hover');
				$('.block_big_dropdown[data-menu=' + content + ']').hide();
			}, 10);
		}
	);
	$('#app').hover(
		function() {
			$('#app2').show();
		},
		function() {
			$('#app2').hide();
		}
	);
	
	$('.block_big_dropdown').hover(
		function() {
			var menu = $(this).attr('data-menu');
			var num = $('.main_menu li').index($('.main_menu li[data-content=' + menu + ']'));
			clearTimeout(timer[num]);
			$(this).show();
			$('.main_menu li[data-content=' + menu + ']').addClass('hover');
		},
		function() {
			var menu = $(this).attr('data-menu');
			var num = $('.main_menu li').index($('.main_menu li[data-content=' + menu + ']'));
			var _this = this;
			timer[num] = setTimeout(function() {
				$('.main_menu li[data-content=' + menu + ']').removeClass('hover');
				$(_this).hide();
			}, 10);
		}
	);
	
	if(isMobile) {
		$('.main_menu .big_dropdown > a').click(function(e) {
			if(!$(this).hasClass('a_hover')) e.preventDefault();
			
			var content = $(this).parent().attr('data-content');
			$('.main_menu .big_dropdown > a').removeClass('a_hover');
			$(this).addClass('a_hover');
			$('.block_big_dropdown[data-menu=' + content + ']').show();
		});
	}
	
	build_responsive_menu();
}

function build_responsive_menu() {
	var full_nav = $('header .main_menu').html();
	if(full_nav != null) {
		$('header .section_main_menu .inner').append('<div id="responsive_navigation" class="responsive_navigation"><div class="button_menu">Navigate...</div><div class="r_menu"></div></div>');
		$('#responsive_navigation .r_menu').html(full_nav);
		
		$('#responsive_navigation .button_menu').click(function() {
			$('#responsive_navigation > .r_menu').slideToggle();
		});
	}
	
	var full_secondary_menu = $('header .secondary_menu').html();
	if(full_secondary_menu != null) {
		$('header .section_secondary_menu .inner').append('<div id="responsive_secondary_menu" class="responsive_secondary_menu"><a href="#" class="left"></a><a href="#" class="right"></a><div class="r_menu"></div></div>');
		
		$('#responsive_secondary_menu .r_menu').html(full_secondary_menu);
		
		var viewport = $('#responsive_secondary_menu .r_menu').width();
		var full_width = 0;
		$('#responsive_secondary_menu .r_menu li').each(function() {
			full_width += $(this).outerWidth();
		});
		$('#responsive_secondary_menu ul').css({'width' : full_width + 'px', 'left' : '0px'});
		
		$(window).resize(function() {
			viewport = $('#responsive_secondary_menu .r_menu').width();
		});
		
		$('#responsive_secondary_menu .left').click(function(e) {
			var old_position = parseInt($('#responsive_secondary_menu ul').css('left'));
			var new_position = old_position + 150;
			if(new_position >= 0) new_position = 0;
			
			$('#responsive_secondary_menu ul').animate({
				left : new_position
			}, 100);
			
			e.preventDefault();
		});
		
		$('#responsive_secondary_menu .right').click(function(e) {
			var old_position = parseInt($('#responsive_secondary_menu ul').css('left'));
			var new_position = old_position - 150;
			if(new_position <= (viewport - full_width)) new_position = viewport - full_width;
			
			$('#responsive_secondary_menu ul').animate({
				left : new_position
			}, 300);
			
			e.preventDefault();
		});
	}
}

function init_sticky_footer() {
//	if($('.wrapper').hasClass('sticky_footer')) $('#content > .inner').css('padding-bottom', $('footer').outerHeight() + 'px');
}

function init_r_corner() {
	$('.r_corner').each(function() {
		var path = $(this).find('img').attr('src');
		$(this).css('background-image', 'url(' + path + ')');
	});
}

function init_iframe_size() {
	var max_width = false;
	if($('.wrapper').outerWidth() >= 768) {
		var max_width = 612;
	}
	if($('.wrapper').outerWidth() < 950 && $('.wrapper').outerWidth() >= 768) {
		var max_width = 472;
	}
	if($('.wrapper').outerWidth() < 768 && $('.wrapper').outerWidth() >= 480) {
		var max_width = 412;
	}
	if($('.wrapper').outerWidth() < 480) {
		var max_width = 292;
	}
	
	$('.block_video iframe').each(function() {
		if(max_width) {
			var iframe_width = $(this).attr('width');
			var iframe_height = $(this).attr('height');
			
			iframe_height = parseInt((max_width * iframe_height) / iframe_width);
			
			$(this).attr('width', max_width);
			$(this).attr('height', iframe_height);
		}
	});
}

function init_fields() {
	$('.w_def_text').each(function() {
		var text = $(this).attr('title');
		
		if($(this).val() == '') {
			$(this).val(text);
		}
	});
	
	$('.w_def_text').live('click', function() {
		var text = $(this).attr('title');
		
		if($(this).val() == text) {
			$(this).val('');
		}
		
		$(this).focus();
	});
	
	$('.w_def_text').live('blur', function() {
		var text = $(this).attr('title');
		
		if($(this).val() == '') {
			$(this).val(text);
		}
	});
	
	$('.custom_select').each(function() {
		$(this).css('opacity', '0');
		$(this).parent().append('<span />');
		var text = $(this).find('option:selected').html();
		$(this).parent().find('span').html(text);
	});
	
	$('.custom_select').live('change', function() {
		var text = $(this).find('option:selected').html();
		$(this).parent().find('span').html(text);
	});
}

function init_validation(target) {
	function validate(target) {
		var valid = true;
		$(target).find('.req').each(function() {
			if($(this).val() == '') {
				valid = false;
				$(this).parent().addClass('errored');
			}
			else {
				$(this).parent().removeClass('errored');
			}
		});
		return valid;
	}
	
	$('form.w_validation').live('submit', function(e) {
		var valid = validate(this);
		if(!valid) e.preventDefault();
	});
	
	if(target) {return validate(target);}
}

function init_pretty_photo() {
	if(!isMobile) {
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			deeplinking : false,
			keyboard_shortcuts : false
		});
	}
}

function add_zero(num) {
	return (num < 10) ? '0' + num : num;
}

function init_time_n_date() {
	var timer;
	window.clearTimeout(timer);
	var now = new Date();
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	var months_short = [
		'Jan',
		'Feb',
		'Mar',
		'Aprl',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]
	
	var minute = add_zero(now.getMinutes());
	var hour = add_zero(now.getHours());
	var day = add_zero(now.getDate());
	var day_week = now.getDay();
	var month = now.getMonth();
	var year = now.getFullYear();
	
	$('#num_top').html(day);
	
	if($('.wrapper').outerWidth() < 480) {
		$('#month_top').html(months_short[month]);
	}
	else {
		$('#month_top').html(months[month]);
	}
	$('#year_top').html(year);
	$('#day_top').html(days[day_week]);
	$('#time').html(hour + ':' + minute);
	
	timer = window.setTimeout(init_time_n_date, 1000);
}

function init_popup() {
	$('.open_popup').click(function(e) {
		var target = $(this).attr('href');
		$('#overlay').show();
		$(target).show(500);
		
		e.preventDefault();
	});
	
	$('.block_popup .close').click(function(e) {
		var target = $(this).attr('href');
		$('.block_popup').hide(500, function() {
			$('#overlay').hide();
		});
		
		e.preventDefault();
	});
}

function init_pic_hover() {
	$('.general_pic_hover').each(function() {
		if(!$(this).hasClass('initialized')) {
			$(this).append('<span class="hover"><span class="icon"></span></span>');
			$(this).addClass('initialized');
		}
		
		var no_fx = $(this).hasClass('no_fx');
		
		$(this).bind('mouseenter',function(e){
			var icon = $(this).find('.icon');
			var overlay = $(this).find('.hover');
			
			if(no_fx) {
				if(!ie8) {
					overlay.show().css('opacity', '0');
					overlay.stop(true).delay(100).animate(
						{
							opacity : 1
						}, 200
					);
				}
				else {
					overlay.css('display', 'block');
				}
			}
			else {
				overlay.show();
				
				var w = $(this).width();
				var h = $(this).height();
				var x = (e.pageX - $(this).offset().left - (w/2)) * ( w > h ? (h/w) : 1 );
				var y = (e.pageY - $(this).offset().top  - (h/2)) * ( h > w ? (w/h) : 1 );
				var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180 ) / 90 ) + 3 )  % 4;
				
				
				/** do your animations here **/ 
				switch(direction) {
					case 0:
						/** animations from the TOP **/
						icon.css({
							'left' : '0px',
							'top' : '-100%',
							'right' : 'auto',
							'bottom' : 'auto'
						});
						icon.stop(true).delay(300).animate({
							top : 0
						}, 300);
					break;
					case 1:
						/** animations from the RIGHT **/
						icon.css({
							'left' : '100%',
							'top' : '0',
							'right' : 'auto',
							'bottom' : 'auto'
						});
						icon.stop(true).delay(300).animate({
							left : 0
						}, 300);
					break;
					case 2:
						/** animations from the BOTTOM **/
						icon.css({
							'left' : '0px',
							'top' : 'auto',
							'right' : 'auto',
							'bottom' : '-100%'
						});
						icon.stop(true).delay(300).animate({
							bottom : 0
						}, 300);
					break;
					case 3:
						/** animations from the LEFT **/
						icon.css({
							'left' : 'auto',
							'top' : '0',
							'right' : '100%',
							'bottom' : 'auto'
						});
						icon.stop(true).delay(300).animate({
							right : 0
						}, 300);
					break;
				}
			}
		});
		
		$(this).bind('mouseleave',function(e){
			var icon = $(this).find('.icon');
			var overlay = $(this).find('.hover');
			
			if(no_fx) {
				if(!ie8) {
					overlay.stop(true).animate(
						{
							opacity : 0
						}, 200
					);
				}
				else {
					overlay.css('display', 'none');
				}
			}
			else {
				var w = $(this).width();
				var h = $(this).height();
				var x = (e.pageX - $(this).offset().left - (w/2)) * ( w > h ? (h/w) : 1 );
				var y = (e.pageY - $(this).offset().top  - (h/2)) * ( h > w ? (w/h) : 1 );
				var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180 ) / 90 ) + 3 )  % 4;
				
				
				/** do your animations here **/ 
				switch(direction) {
					case 0:
						/** animations from the TOP **/
						icon.css({
							'left' : '0px',
							'top' : '0px',
							'right' : 'auto',
							'bottom' : 'auto'
						});
						icon.stop(true).animate({
							top : -h
						}, 300, function () {overlay.hide()});
					break;
					case 1:
						/** animations from the RIGHT **/
						icon.css({
							'left' : 'auto',
							'top' : '0px',
							'right' : '0px',
							'bottom' : 'auto'
						});
						icon.stop(true).animate({
							right : -w
						}, 300, function () {overlay.hide()});
					break;
					case 2:
						/** animations from the BOTTOM **/
						icon.css({
							'left' : '0px',
							'top' : 'auto',
							'right' : 'auto',
							'bottom' : '0px'
						});
						icon.stop(true).animate({
							bottom : -h
						}, 300, function () {overlay.hide()});
					break;
					case 3:
						/** animations from the LEFT **/
						icon.css({
							'left' : '0px',
							'top' : '0px',
							'right' : 'auto',
							'bottom' : 'auto'
						});
						icon.stop(true).animate({
							left : -w
						}, 300, function () {overlay.hide()});
					break;
				}
			}
		});

	});
}

function init_message_boxes() {
	$('.general_info_box .close').live('click', function() {
		$(this).parent().fadeOut(300);
	});
}

function init_pricing_table() {
	$('.block_pricing_table_1').each(function() {
		var table = $(this);
		table.find('.column.category .cell p').each(function() {
			var name = '<span class="alt_text">' + $(this).html() + '</span> ';
			var num = $('.column.category .cell p').index(this);
			
			table.find('.column:not(.category)').each(function() {
				$(this).find('.cell p').eq(num).prepend(name);
			});
		});
	});
}


$(document).ready(function() {
	init_sticky_footer();
	init_iframe_size();
	init_fields();
	init_r_corner();
	init_time_n_date();
	init_popup();
	init_pic_hover();
	init_validation();
	init_message_boxes();
	init_pricing_table();
	
	$('.block_to_top a').click(function(e) {
		$.scrollTo(0, 500);
		
		e.preventDefault();
	});
	
	$('audio, video').mediaelementplayer();
});

// 加入收藏 < a onclick="AddFavorite(window.location,document.title)" >加入收藏< /a>

function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页 < a onclick="SetHome(this,window.location)" > 设为首页 < /a>
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        }
                        catch (e) {
                                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}


$(window).resize(function() {
	init_sticky_footer();
	init_iframe_size();
	init_time_n_date();
});

$(function() {
	init_menu();
	init_pretty_photo();
});