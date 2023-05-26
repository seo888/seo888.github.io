$(function(){
	$(".drop_web").hover(function(){
		$(this).addClass("drop_web_cur")
	},function(){
		$(this).removeClass("drop_web_cur")
	})
	$(".drop_phone").hover(function(){
		$(this).addClass("drop_phone_cur")
	},function(){
		$(this).removeClass("drop_phone_cur")
	})
	$(".ht_itmes").hover(function(){
		$(this).addClass("cur")
	},function(){
		$(this).removeClass("cur")
	})

	var cur_index=1;
		var imgnum=$(".fouse_pic li").length;
		$(".fouse_btn ol").mouseover(function(){
		    var s_index=$(this).index();
		    $(this).addClass("cur").siblings().removeClass("cur");
		    $(".fouse_pic li").eq(s_index).fadeIn().siblings().hide();
		    cur_index=s_index+1;
		    if(cur_index>=imgnum) cur_index=0;
		});
		function autoImg(){
		    $(".fouse_btn ol").eq(cur_index).addClass("cur").siblings().removeClass("cur");
		    $(".fouse_pic li").eq(cur_index).fadeIn().siblings().hide();
		    cur_index++;
		    if(cur_index>=imgnum)  cur_index=0;
		}
		var timer=setInterval(autoImg,4000);
		$(".fouse_box").hover(function(){
		    clearInterval(timer);
		},function(){
		    timer=setInterval(autoImg,4000);
		});

		var cur_index=1;
		var imgnum=$(".mod_cont .tab_cont").length;
		$(".mod_title li").mouseover(function(){
		    var s_index=$(this).index();
		    $(this).addClass("cur").siblings().removeClass("cur");
		    $(this).parent().parent().parent().find(".mod_cont .tab_cont").eq(s_index).show().siblings().hide();
		    cur_index=s_index+1;
		    if(cur_index>=imgnum) cur_index=0;
		});

		// 房产

		// var cur_index=1;
		// var imgnum=$(".house_focuspic li").length;
		// $(".house_focusbtns ol").mouseover(function(){
		//     var s_index=$(this).index();
		//     $(this).addClass("cur").siblings().removeClass("cur");
		//     $(".house_focuspic li").eq(s_index).show().siblings().hide();
		//     cur_index=s_index+1;
		//     if(cur_index>=imgnum) cur_index=0;
		// });
		$(".prod_share").hover(function(){
			$(this).addClass("prod_share_cur")
		},function(){
			$(this).removeClass("prod_share_cur")
		})

		$(".prod_pj span").click(function(){
			$(this).addClass("cur");
			$(this).text
		})

		var cur_index=1;
		var imgnum=$(".tech_pic li").length;
		$(".focus_btns ol").mouseover(function(){
		    var s_index=$(this).index();
		    $(this).addClass("cur").siblings().removeClass("cur");
		    $(".tech_pic li").eq(s_index).show().siblings().hide();
		    cur_index=s_index+1;
		    if(cur_index>=imgnum) cur_index=0;
		});
// 内页评价 大字小字
		// function goToComment(){
		// 	alert("Sdf");
		// 	$("html,body").animate({scrollTop: $("#commend_div").offset().top},600)
		// }
		// $(".btn_review").click(function(){

		// 	$("html,body").animate({scrollTop: $("#commend_div").offset().top},600)
		// })



		$(".s_font").click(function(){
			$(".s_font2").removeClass("b_font");
			$(this).addClass("b_font");
			$(".xq_text").css("font-size","14px");
		})
		$(".s_font2").click(function(){
			$(".s_font").removeClass("b_font");
			$(this).addClass("b_font");
			$(".xq_text").css("font-size","12px");
		})

var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
setInterval(function(){
Stamp = new Date();  
$('.hd_time').html(Stamp.getFullYear() + "年"+(Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日"+ " "+Stamp.getHours()+ "时"+Stamp.getMinutes()+ "分"+Stamp.getSeconds()+"秒"+ " " + dayNames[Stamp.getDay()] );
},1000); 
Stamp = new Date();  
$('.hd_time').html(Stamp.getFullYear() + "年"+(Stamp.getMonth() + 1) +"月"+Stamp.getDate()+ "日"+ " "+Stamp.getHours()+ "时"+Stamp.getMinutes()+ "分"+Stamp.getSeconds()+"秒"+ " " + dayNames[Stamp.getDay()] );
});

// 设置为主页 
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        } else {
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
        }
    }
}
// 加入收藏 兼容360和IE6 
function shoucang(sTitle, sURL)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    } catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
