// 通栏
document.write('<script src="http://static.yxdown.com/pc/news/js/tl_720x70.js"></script>\r\n');
if (location.pathname != "/") {
	var beitou = {
		link : 'http://doapi.prxxff.com/api/adl/4658025_yxdown-pc-hongjingbeitou',
		link2 : 'http://doapi.prxxff.com/api/adl/4658025_yxdown-pc-hongjingbeitou',
		_lad : null,
		_rad : null,
		_setAd : function () {
			var doc_h = document.documentElement.clientHeight;
			var doc_w = document.documentElement.clientWidth;
			var body_w = 1120;
			var ad_w = parseInt((doc_w - body_w) / 2);
			if (ad_w > 0) {
				var ladleft = 0;
				var radleft = ad_w + body_w;
				var lstyle = beitou._lad.style,
				rstyle = beitou._rad.style;
				lstyle.left = ladleft + "px";
				rstyle.left = radleft + "px";
				lstyle.height = doc_h + "px";
				rstyle.height = doc_h + "px";
				lstyle.width = ad_w + "px";
				rstyle.width = ad_w + "px";
				var top = 0;
				lstyle.top = top + "px";
				rstyle.top = top + "px";
				lstyle.position = "fixed";
				rstyle.position = "fixed";
				lstyle.display = "block";
				rstyle.display = "block";
			} else {
				beitou._lad.style.display = "none";
				beitou._rad.style.display = "none";
			}
		},
		init : function () {
			var lad = beitou._lad = document.createElement("a");
			var rad = beitou._rad = document.createElement("a");
			lad.href = beitou.link;
			rad.href = beitou.link2;
			lad.target = rad.target = '_blank';
			lad.style.background = "url(http://static.yxdown.com/cjimages/bt_l.png) no-repeat right top";
			rad.style.background = "url(http://static.yxdown.com/cjimages/bt_r.png) no-repeat left top";
			lad.id="l-bei";
			rad.id="r-bei";
			lad.style.backgroundSize = "auto 100%";
			rad.style.backgroundSize = "auto 100%";
			document.body.appendChild(lad);
			document.body.appendChild(rad);
			this._setAd();
		}
	}
	var beitou2 = {
		link : 'https://doapi.prxxff.com/api/adl/4658126_yxdown-pc-beitou-steam',
		link2 : 'https://doapi.prxxff.com/api/adl/4658126_yxdown-pc-beitou-steam',
		_lad : null,
		_rad : null,
		_setAd : function () {
			var doc_h = document.documentElement.clientHeight;
			var doc_w = document.documentElement.clientWidth;
			var body_w = 1120;
			var ad_w = parseInt((doc_w - body_w) / 2);
			if (ad_w > 0) {
				var ladleft = 0;
				var radleft = ad_w + body_w;
				var lstyle = beitou._lad.style,
				rstyle = beitou._rad.style;
				lstyle.left = ladleft + "px";
				rstyle.left = radleft + "px";
				lstyle.height = doc_h + "px";
				rstyle.height = doc_h + "px";
				lstyle.width = ad_w + "px";
				rstyle.width = ad_w + "px";
				var top = 0;
				lstyle.top = top + "px";
				rstyle.top = top + "px";
				lstyle.position = "fixed";
				rstyle.position = "fixed";
				lstyle.display = "block";
				rstyle.display = "block";
			} else {
				beitou._lad.style.display = "none";
				beitou._rad.style.display = "none";
			}
		},
		init : function () {
			var lad = beitou._lad = document.createElement("a");
			var rad = beitou._rad = document.createElement("a");
			lad.innerHTML='<em style="display:block;width:29px;height:16px;background:url(http://static.yxdown.com/pc/index/images/g_tip_l.png) no-repeat;position: absolute;left: 0;bottom:0;"></em><i class="close_item" style="display: block;width: 30px;height: 16px;background: rgba(0,0,0,.5);position: absolute;right: 0;top: 0;font-size: 12px;color: #ddd;text-align: center;line-height: 16px;font-weight: bold;font-style: normal;cursor: pointer;">关闭</i>';
			rad.innerHTML='<em style="display:block;width:29px;height:16px;background:url(http://static.yxdown.com/pc/index/images/g_tip_l.png) no-repeat;position: absolute;left: 0;bottom:0;"></em><i class="close_item" style="display: block;width: 30px;height: 16px;background: rgba(0,0,0,.5);position: absolute;right: 0;top: 0;font-size: 12px;color: #ddd;text-align: center;line-height: 16px;font-weight: bold;font-style: normal;cursor: pointer;">关闭</i>';
			lad.href = 'javascript:void(0)';
			rad.href = 'javascript:void(0)';
			lad.target = rad.target = '_self';
			lad.style.background = "url(http://static.yxdown.com/cjimages/new_bt_l.jpg) no-repeat right top";
			rad.style.background = "url(http://static.yxdown.com/cjimages/new_bt_r.jpg) no-repeat left top";
			lad.id="l-bei";
			rad.id="r-bei";
			lad.style.backgroundSize = "auto 100%";
			rad.style.backgroundSize = "auto 100%";
			document.body.appendChild(lad);
			document.body.appendChild(rad);
			this._setAd();
		}
	}
	/*if(/\/news\//i.test(location.pathname)){
		beitou2.init();
		$(window).resize(function(){
		    beitou2._setAd();
		});
		$("#l-bei,#r-bei").on('click',function(){
			window.open('https://doapi.prxxff.com/api/adl/4658126_yxdown-pc-beitou-steam');
		})
		$(".close_item").on('click',function(e){
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			$(this).parent().remove();
		})
	}else{
		var pageTit=$("title").html();
		if(pageTit.indexOf("红警")>-1||pageTit.indexOf("红色警戒")>-1){
			beitou.init();
			$(window).resize(function(){
			   beitou._setAd();
			});
		}else{
			// 对联广告
			document.write('<script src="http://static.yxdown.com/cj/duilian.js"></script>\r\n');
		}
	}*/
}

//隐藏评论
var softType = "";
var sidpl = window.pageConfig.id;
if(/\/news\//i.test(location.pathname)){
	softType = "news";
	// document.write('<script src="http://pinglun.yxdown.com/pinglun.js"></script>');
};
if(/\/olnews\//i.test(location.pathname)){
	softType = "olnews";
};
if(/\/olgl\//i.test(location.pathname)){
	softType = "olnews";
};
if(/\/gonglue\//i.test(location.pathname)){
	// document.write('<script src="http://pinglun.yxdown.com/pinglun.js"></script>');
	softType = "news";
};
if(/\/hardware\//i.test(location.pathname)){
	softType = "olnews";
};

// var loadPinglun = function() {
//     if (window.Pinglun) {
//         window.Pinglun.SetConfig({ "SID": sidpl, "KEY": softType, "Encoding": "utf-8" });
//         if(!/\/news\/|\/gonglue\//i.test(location.pathname)){
// 	        $.ajax({
// 	            async: false,
// 	            type: "GET",
// 	             url: 'http://pinglun.yxdown.com/pb/api.ashx?sourceid=' + sidpl + '&type=' + softType + '',
// 	            success: function (data) {
// 	            	console.log(data);
// 	                if (data == "true") {
// 	                	$(".pinglun").hide();
// 	                	$(".read").css("margin-bottom","30px");
// 	                } else {
// 	                	if(/olnews|olgl|hardware/i.test(location.pathname)){
							
// 						}else{
// 	                    	window.Pinglun.Init();
// 						}
// 	                }
// 	            }
// 	        });
//         }
//     } else {
//         setTimeout(loadPinglun, 2000);
//     }
// }
// loadPinglun();
// 轮播
if($("#sbox").length>0){
	document.writeln("<script src='http://static.yxdown.com/pc/js/idx.im.gslidejs.js'></script>");
	var setimgslid=function(){
		jq('#sbox').banqh({
			box:"#sbox",//总框架
			pic:"#simg",//大图框架
			pnum:"#simg_s",//小图框架
			//prev_btn:"#prev_btn1",//小图左箭头
			//next_btn:"#next_btn1",//小图右箭头
			//pop_prev:"#prev2",//弹出框左箭头
			//pop_next:"#next2",//弹出框右箭头
			prev:"#prev1",//大图左箭头
			next:"#next1",//大图右箭头
			//pop_div:"#demo2",//弹出框框架
			//pop_pic:"#ban_pic2",//弹出框图片框架
			//pop_xx:".pop_up_xx",//关闭弹出框按钮
			//mhc:".mhc",//朦灰层
			autoplay:true,//是否自动播放
			interTime:3000,//图片自动切换间隔
			delayTime:300,//切换一张图片时间
			//pop_delayTime:400,//弹出框切换一张图片时间
			order:0,//当前显示的图片（从0开始）
			picdire:true,//大图滚动方向（true为水平方向滚动）
			mindire:true,//小图滚动方向（true为水平方向滚动）
			min_picnum:4,//小图显示数量
			pop_up:false//大图是否有弹出框
		})
	}


	$.getScript("http://static.yxdown.com/js/imagesloaded.pkgd.min.js",function(){
		var container = document.querySelector('#simg_s');
		imagesLoaded(container, function() {
			setimgslid();
		}); 
	})

	//点击大图
	document.writeln("<script src='http://static.yxdown.com/js/lightbox.js'></script>");

	$(function(){

	        $('#simg a').lightBox({
	        fixedNavigation: true,
	        imageLoading: 'http://static.yxdown.com/images/lightbox-ico-loading.gif',
	        imageBtnClose: 'http://static.yxdown.com/images/lightbox-btn-close.gif',
	        imageBtnPrev: 'http://static.yxdown.com/images/lightbox-btn-prev.gif',
	        imageBtnNext: 'http://static.yxdown.com/images/lightbox-btn-next.gif'
	    });

	    $("p:empty").remove();
	    $("#simg_s ul li a").removeAttr("href");
	})

}
// 分享功能
with (document) {
    var object = 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
}
document.write("<div class='shar_box'><div class='bdsharebuttonbox bdshare-button-style0-16' data-bd-bind='1504167374698'><a href='javascript:;' class='bds_weixin' data-cmd='weixin' title='分享到微信'></a><a href='javascript:;' class='bds_tsina' data-cmd='qzone' title='分享到QQ空间'></a><a href='javascript:;' class='bds_qzone' data-cmd='tsina' title='分享到新浪微博'></a><a href='javascript:;' class='bds_sqq' title='发表评论'></a><a href='javascript:;' class='bds_top' title='回到顶部'></a></div></div>");
$(window).scroll(function (e) {
    if ($(window).scrollTop() > 200)
        $(".shar_box").fadeIn(300);
    else
        $(".shar_box").fadeOut(300);
});
$(function(){
	$(".bds_top").click(function(e) {
		$('body,html').animate({scrollTop:0},300);
	});
	$(".bds_sqq").click(function(){
		$("html,body").animate({scrollTop: $("#commentsWrap").offset().top}, 500);
	});
	$(".intro a").click(function(){
		$("html,body").animate({scrollTop: $("#commentsWrap").offset().top}, 500);
	});
});

$('#dl_left .dl_close').click(function(){
	$('#dl_left').hide();
})
$('#dl_right .dl_close').click(function(){
	$('#dl_right').hide();
})

//后台统计
function dostats(type, sid) {
	var s = document.createElement('script');
	s.src = 'http://dy.www.yxdown.com/open/op.ashx?action=/stats/count.do&type=' + type + '&sid=' + sid;
	// document.body.appendChild(s);
	document.getElementsByTagName('head')[0].appendChild(s);
}

//顶踩
var html = '';
function msg(json) {
for (var i = 0; i < json.data.length; i++) {
	if (json.data[i].cover != null && json.data[i].cover != "null" && json.data[i].cover != "") {
		/*if(window.pageConfig.type == 'news' && Number(i)%3==0){
			html+="<div class='tjcon_list clearfix' id='div_"+json.page + i + "'><script>NEWS_FEED({w: 760,showid: 'INgYD2',placeholderId: 'div_"+json.page+i+"',fId: 'div_"+json.page + i +"',inject: 'cads' });<\/script></div>";
		};*/
		html += '<div class="tjcon">';
		html += '<h3>';
		html += '<a href="' + json.data[i].URL + '" target="_blank">' + json.data[i].title + '</a>';
		html += '</h3>';
		html += '<a href="' + json.data[i].URL + '" class="tjimg" target="_blank"><img src="' + json.data[i].cover + '" alt="' + json.data[i].title + '"></a>';
		html += ' <div class="tj">';
		html += '<p>' + json.data[i].Descript + '</p>';
		html += '<div class="tj_info">';
		html += '<span><i class="clock"></i>' + json.data[i].Adddate.substring(0, 10) + '</span><em>|</em>';
		html += '<a href="' + json.data[i].URL + '" target="_blank"><i class="pinglun"></i>评论<font>(' + json.data[i].ComNum + ')</font></a><em>|</em>';
		html += '<span>' + parseInt(json.data[i].Hits)*8 + '阅读</span>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
	} else {
		if(window.pageConfig.type == 'news' && Number(i)%3==0){
			html+="<div class='tjcon_list clearfix' id='div_"+json.page + i + "'><script>NEWS_FEED({w: 760,showid: 'INgYD2',placeholderId: 'div_"+json.page+i+"',fId: 'div_"+json.page + i +"',inject: 'cads' });<\/script></div>";
		};
		html += '<div class="tjcon">';
		html += '<h3>';
		html += '<a href="' + json.data[i].URL + '" target="_blank">' + json.data[i].title + '</a>';
		html += '</h3>';
		html += ' <div class="tj">';
		html += '<p>' + json.data[i].Descript + '</p>';
		html += '<div class="tj_info">';
		html += '<span><i class="clock"></i>' + json.data[i].Adddate.substring(0, 10) + '</span><em>|</em>';
		html += '<a href="' + json.data[i].URL + '" target="_blank"><i class="pinglun"></i>评论<font>(' + json.data[i].ComNum + ')</font></a><em>|</em>';
		html += '<span>' + parseInt(json.data[i].Hits)*8 + '阅读</span>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
	}
}
$("#recread").append(html);
html="";
}

function getArticleVotesCallback(data) {
var $id = function(id) {
return document.getElementById(id);
}
$id("percent5").innerHTML = data.V5 + "人";
}

function artcileHits(sid) {
var s = document.createElement('script');
s.src = 'http://dy.www.yxdown.com/open/op.ashx?action=/article/view.do&sid=' + sid;
document.body.appendChild(s);
}
function commentArticleLine(sid) {
var s = document.createElement('script');
s.src = 'http://dy.www.yxdown.com/open/op.ashx?action=/article/votes/data.json&sid=' + sid + '&callback=getArticleVotesCallback';
document.body.appendChild(s);
artcileHits(sid);
}

function CommentArticle(tid, sid) {
var s = document.createElement('script');
s.src = 'http://dy.www.yxdown.com/open/op.ashx?action=/article/votes/vote.do&type=v' + tid + '&sid=' + sid;
document.body.appendChild(s);
setTimeout(function() {
commentArticleLine(sid);
}, 200);
}

/* 
功能：保存cookies函数  
参数：name，cookie名字；value，值 
*/  
function SetCookie(name,value){  
    var Days = 1;   //cookie 将被保存一天
    var exp  = new Date();  //获得当前时间  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}   
/* 
功能：获取cookies函数  
参数：name，cookie名字 
*/  
function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
     return unescape(arr[2]);   
    }else{  
     return null;  
    }  
}   

/*tab切换*/
function tab_down(tab_k, tab_con, tab_dz) {
	var $div_li = $(tab_k);
	var timeout
	if (tab_dz == "click") {
		$div_li.click(function() {
			$(this).addClass("hover").siblings().removeClass("hover");
			var index = $div_li.index(this);
			$(tab_con).eq(index).show().siblings().hide();
		})
	} else if (tab_dz == "mouseover") {
		$div_li.hover(function() {
			var ts = $(this)
			timeout = setTimeout(function() {
				ts.addClass("hover").siblings().removeClass("hover");
				var index = ts.index();
				$(tab_con).eq(index).show().siblings().hide();
			}, 200)
		}, function() {
			clearTimeout(timeout);
		})
	}

}
tab_down(".tab >em", ".readbox >ul", "mouseover");
