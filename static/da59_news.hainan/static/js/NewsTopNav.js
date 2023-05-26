$ = TY;

var gW = $(window).width();
var gH = $(window).height();

//浏览器判断
var gPc = false;
var gMob = false;

/*浏览器分辨率判断*/
if (gW < 800) {
	gMob = true;
	//频道切换
	var channel = $("body").attr("id");
	if (typeof(channel) != 'undefined') {
		var temp = $(".chanel ." + channel).text(); //获取该频道内容
		$(".mob_top_bar").find("h1").text(temp);
	}
} else {
	gPc = true;

}

TY("body").ready(function() {
	var url = location.href;
	if (url.indexOf("visualEditor") == -1 && url.indexOf("editorFragment") == -1) {
		//脚本	
		LoginInfo();
		searchEvent();
		//搜索文本框交互
		$("#searchInput").focus(function() {
			$("#searchLeabel").hide();
			$("#searchInput").addClass("inp_on");
		});
		$("#searchInput").blur(function() {
			$(this).val() == "" ? $("#searchLeabel").show() : $("#searchLeabel").hide();
			$("#searchInput").removeClass("inp_on");
		});

		//pc平台
		if (gPc) {
			//频道切换
			var channel = $("body").attr("id");
			if (typeof(channel) != 'undefined') {
				var temp = $(".chanel ." + channel).text(); //获取该频道内容
				var tempLink = $(".chanel ." + channel).attr("href"); //获取该频道内容
				$(".hn_logo h2 a").text(temp);
				$(".hn_logo h2 a").attr("href", tempLink);
				//$(".chanel ." + channel).remove();
				$(".xwzx").parent().show();
			}

		}
		//PC平台 end
		if (gMob) {
			//频道 和 新闻内容对换
			var tempNewsType = $("ul.newsType_list").html();
			var tempChannel = $("ul.chanel").html();
			var tempClassName = "tempClassName";
			$("ul.chanel").html(tempNewsType);
			$("ul.newsType_list").html(tempChannel);
			$("ul.chanel").attr("class", "tempClassName");
			$("ul.newsType_list").attr("class", "chanel");
			$("ul.tempClassName").attr("class", "newsType_list");
			
			//搜索模块位置
			var tempSearch=$(".newsType_search").html();
			$(".newsType_search").remove();
			$(".newsNav .fr").before("<div class='newsType_search'>"+tempSearch+"</div>");
			//文本框
			$("#searchInput").focus(function() {
				$("#searchLeabel").hide();
				$("#searchInput").addClass("inp_on");
			});
			$("#searchInput").blur(function() {
				$(this).val() == "" ? $("#searchLeabel").show() : $("#searchLeabel").hide();
				$("#searchInput").removeClass("inp_on");
			});
			
			
			

			//展开频道
			$("#btn_Logo").click(function() {
				if ($('ul.newsType_list .mob_fold').css("display") == "none") {
					$("#btn_Logo").find("i").addClass('on');
					$('ul.newsType_list .mob_fold').show(300);
				} else {
					$("#btn_Logo").find("i").removeClass('on');
					$('ul.newsType_list .mob_fold').hide();
				}
			})

			//展开社区
			$(".plate_title").click(function() {
				if ($('ul.plate .mob_fold').css("display") == "none") {
					$(this).find("i").addClass('on');
					$('ul.plate .mob_fold').slideDown(300);
				} else {
					$(this).find("i").removeClass('on');
					$('ul.plate .mob_fold').hide();
				}

			})
			
			//展开搜索
			$(".btnSerach_mob a").click(function() {
				if ($('.newsType_search').css("display") == "none") {
					$(this).addClass('on');
					$('.newsType_search').slideDown(200);
				} else {
					$(this).removeClass('on');
					$('.newsType_search').slideUp(200);
				}

			})
			

		}

		//脚本end
	}
});

//移动端弹出导航
var tempScrolltop;
function opSideNav() {
	$("#cms_head").after("<div class='mob_top_bar' id='MobTopBar2'></div>");
	$('#cms_head').addClass("ch_unfold hnf_mob_shadow"); //加阴影
	$('.ch_unfold').height(gH);

	$("#cms_head").after("<div class='hnf_mob_bg' onclick='cloSideNav()'></div>");
	$('.hnf_mob_bg').height(gH);

	tempScrolltop = $(document).scrollTop();
	$("body").css("overflow", "hidden");
	$("body").height(gH - 50);
	$("#cms_body").css("position", "fixed");
	$("#cms_body").css("top", 50 - tempScrolltop);
	$("#cms_foot").hide();

}
function cloSideNav() {
	$(".hnf_mob_bg,#MobTopBar2").remove();
	$('.ch_unfold').height("");
	$("#cms_head").removeClass("ch_unfold");
	
	

	$("body").css("overflow", "auto");
	$("body").height("auto");
	$("#cms_body").css("position", "");
	$(document).scrollTop(tempScrolltop);
	$("#cms_foot").show();

}

//获取登录信息
function LoginInfo() {
	var id = __global.getUserId() + "";
	div = $('#top_user_menu').children("ul");
	if (id == "" || id == undefined || id == "null") {
		div.html(" <li class='top-nav-menu-li  top-nav-menu-li-first'><a class='top-nav-user-menu' id='js_login' href='javascript:void(0);' rel='nofollow' _tystat='新版顶导航/登录'>登录</a></li><li class='top-nav-menu-li'><a class='top-nav-user-menu' href='http://passport.tianya.cn/register/default.jsp?sourceURL=file%3A%2F%2F%2FD%3A%2Ftianya%2Fnavbar%2Fnav.html' target='_blank' rel='nofollow' _tystat='新版顶导航/注册'>注册</a></li><li class='top-nav-menu-li top-nav-menu-li-phone'><a href='http://www.tianya.cn/mobile/' class='white top-nav-user-menu' _checklocation='1' appstr='mobile' _tystat='新版顶导航/手机'><i class='top-ico-user-phone'></i></a></li>");

	} else {
		div.html("<li class='top-nav-menu-li top-nav-menu-li-first top-nav-menu-li-first-login'><a class='top-nav-user-menu' href='http://www.tianya.cn/" + id + "' appstr='mypage' _checklocation='1' _tystat='新版顶导航/用户名'>" + __global.getUserName() + "</a></li><li class='top-nav-menu-li'><a href='http://www.tianya.cn/mobile/' class='white top-nav-user-menu' _checklocation='1' appstr='mobile' _tystat='新版顶导航/手机'><i class='top-ico-user-phone'></i></a></li><li class='top-nav-menu-li top-nav-menu-li-other'><div id='top_nav_set_view' class='more-view' ><ul class='link-list clearfix'><li><a href='http://www.tianya.cn/set/' _tystat='新版顶导航/设置'>设置</a></li><li><a href='http://www.tianya.cn/" + id + "/profile' _tystat='新版顶导航/个人主页'>个人主页</a></li><li><a href='http://www.tianya.cn/user/' _tystat='新版顶导航/关系中心'>关系中心</a></li><li><a id='js_relogin' href='javascript:void(0);' _tystat='新版顶导航/更换账号'>更换账号</a></li><li><a href='http://passport.tianya.cn/logout?returnURL=http%3A%2F%2Fwww.tianya.cn%2Fuser%2Flogout%3FreturnURl%3Dhttp%253A%252F%252Ffocus.tianya.cn%252F&amp;fowardFlag=y' _tystat='新版顶导航/退出'>退出</a></li></ul></div><span id='top_nav_set' class='top-nav-user-menu'><i class='top-ico-user-setting'></i></span></li>");
		if (gMob) {
			div.children("li").hide();
			div.children(".top-nav-menu-li-first-login").show();
		}
	}

	$("#js_login,#js_relogin").bind("click",
	function() {
		return location = "http://passport.tianya.cn/login.jsp?fowardURL=" + encodeURIComponent(window.location.href);
	})

}

// 新闻频道
function opSearch() {
	$("#ShowSearch").hide();
	$("#newsserachbuttom").show();
	$(".newsType_list").animate({
		width: "80%"
	});
	$(".newsType_search").animate({
		width: "20%"
	});
	$(".newsSearch").animate({
		width: "80%"
	});
	setTimeout("$('#searchLeabel').show();", 200);
	$(document).one("click",
	function() { //对document绑定一个影藏Div方法
		cloSearch();
	});
	event.stopPropagation(); //阻止事件向上冒泡
}

function searchEvent() {
	$(".newsType_search").click(function(event) {
		event.stopPropagation(); //阻止事件向上冒泡
	});
}

function cloSearch() {
	$(".newsSearch").val("");
	$("#searchLeabel").hide();
	$("#ShowSearch").show();
	$("#newsserachbuttom").hide();
	$(".newsType_list").animate({
		width: "96%"
	});
	$(".newsType_search").animate({
		width: "4%"
	});
	$(".newsSearch").animate({
		width: "10%"
	});
}