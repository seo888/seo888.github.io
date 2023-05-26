/*通栏 菜单*/
$(".navBar .dh").hover(function () {
	$(".tl-bar_box").show();
}, function () {
	$(".tl-bar_box").hide();
})


/*通栏 二维码*/
$(".tl-phone").hover(function () {
	$(".tl-bar-qrcode").show();
}, function () {
	$(".tl-bar-qrcode").hide();
})

/*收藏*/
$('.sc_bar').click(function() {
	AddFavorite(document.location.href, document.title);
});

function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加！");
		}
	}
}

// 背投
if(/\/zt\/\S|\/soft\/\S/i.test(location.pathname) || (/\/z\/\S/i.test(location.pathname) && $(".banner").length >0)){
	var _w = document.body.clientWidth;
	var itemWidth = 1100;
	var bg_img = 'bt_2560x1080';
	if(/\/zt\//i.test(location.pathname)){
		if($(".gg_content").length > 0){
			itemWidth=1130;
		}else{
			itemWidth=1200;
		}
	}
	/\/z\//i.test(location.pathname)?bg_img='bt_2560x1080_2':null;
	var _cw = (_w*1-itemWidth)/2; // soft 目录
	$("#tl-bar").before('<div id="all-bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 0;background: url(http://static.yxdown.com/cjimages/'+bg_img+'.png) center top no-repeat;"><a class="n-left-bg n-bg" target="_blank" href="http://doapi.prxxff.com/api/adl/4708855_wy-cq-996cqhzld-xzybt" style="position: absolute;left: 0;width:'+_cw+'px;height:100%; overflow: hidden;"></a><a class="n-right-bg n-bg" target="_blank" href="http://doapi.prxxff.com/api/adl/4708855_wy-cq-996cqhzld-xzybt" style="position: absolute; right: 0;width:'+_cw+'px;height:100%; overflow: hidden;"</a></div>');
	$(window).resize(function() {
	    var _nw =  ($(window).width()*1-itemWidth)/2;
	    $(".n-bg").width(_nw)
	});
}

// 该资源已删除判断
try{
	thepb2 = {
		s_regm: document.title.replace(/\s/g,""),
		// 48cid
		cid48:function(){
	    	if(window.pageConfig && window.pageConfig.cid){
				var cid = Number(window.pageConfig.cid);
				var rootwords = ['%E8%B4%A2','%E9%87%91%E8%9E%8D','%E9%92%B1','%E8%B4%B7','%E5%80%9F','%E8%BF%98','%E4%BF%A1%E7%94%A8','%E8%B4%A6%E6%9C%AC','%E8%82%A1','%E6%8A%95%E8%B5%84','%E5%88%86%E6%9C%9F','%E9%97%AA%E7%94%B5','%E9%93%B6%E8%A1%8C','%E7%99%BD%E6%9D%A1','%E8%AF%81%E5%88%B8','%E7%8E%B0%E9%87%91','%E6%9E%81%E9%80%9F','%E6%8E%8C%E6%9F%9C','%E8%8A%B1%E5%91%97','%E6%B1%87%E9%80%9A'];
				var cid48 = [49,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,149];
				if(cid48.indexOf(cid) > -1){
					for(var i= 0;i<rootwords.length;i++){
						if(this.s_regm.indexOf(decodeURI(rootwords[i])) > -1){
							// $("#down").hide();
							$('.downtab .hover').html('该资源已下架');
							$('.ad_l').html("<div class='noGame' id='noGameDiv'></div>");
							$(".m_down_info .down_text").html("该资源已下架").removeAttr('onclick');
							$(".ewm-cov,.goTop a.right_ewm").remove();
							$("#down").hide();
							$("#down h2").eq(0).hide();
							$(".m_down").css("background","#b5b5b5");
							$(".all_game_but .m_down .down_ico").css("background","#b5b5b5");
							$(".down_ma").remove();
							$(".down_text").css("width","100px");
							$(".game_label").hide();
						}
					}
				}
			}
		},
		// cid 
		qpxj: function() {
			var warr = ['%E5%BD%A9%E7%A5%A8','%E8%B4%B7','%E5%A4%A7%E4%B9%90%E9%80%8F','%E5%8F%8C%E8%89%B2%E7%90%83','%E4%BD%93%E5%BD%A9','%E7%A6%8F%E5%BD%A9','%E4%B8%83%E6%98%9F%E5%BD%A9','%E8%B6%B3%E5%BD%A9','%E7%AB%9E%E5%BD%A9','%E8%B4%AD%E5%BD%A9','%E5%BD%A9%E6%B0%91','%E6%8A%95%E6%B3%A8','%E5%BC%80%E5%A5%96','%E7%AF%AE%E5%BD%A9','%E4%B9%B0%E5%BD%A9','%E5%88%AE%E5%88%AE%E4%B9%90','%E5%BC%80%E5%BD%A9','%E5%88%A9%E6%81%AF','%E9%A2%9D%E5%BA%A6','%E5%BA%94%E6%80%A5','%E6%A3%8B%E7%89%8C','%E9%BA%BB%E5%B0%86','%E6%96%97%E5%9C%B0%E4%B8%BB','%E7%94%B5%E7%8E%A9%E5%9F%8E','%E5%A8%B1%E4%B9%90%E5%9F%8E','%E6%B8%B8%E6%88%8F%E5%A4%A7%E5%8E%85','%E4%B8%89%E6%89%93%E4%B8%80','%E8%B5%A2%E4%B8%89%E5%BC%A0','%E7%89%8C%E4%B9%9D','%E5%8D%81%E4%B8%89%E6%B0%B4','%E8%B7%91%E8%83%A1%E5%AD%90','%E7%82%B8%E7%BF%BB%E5%A4%A9','%E4%B8%89%E5%BC%A0%E7%89%8C'];
			var at = window.pageConfig.at;
			if(at == 'myxdownsy'){
				for(var i=0;i<warr.length;i++){
					if(this.s_regm.indexOf(decodeURI(warr[i])) > -1){
						$(".m_down_info .down_text").html("该资源已下架").removeAttr('onclick');
						$(".ewm-cov,.goTop a.right_ewm").remove();
						$("#down").hide();
						$("#down h2").eq(0).hide();
						$(".m_down").css("background","#b5b5b5");
						$(".all_game_but .m_down .down_ico").css("background","#b5b5b5");
						$(".down_ma").remove();
						$(".down_text").css("width","100px");
						$(".pc_down,#kind_game").hide();
						$(".game_info").addClass("over");
						$(".game_label").hide();
						if(/\/ios\//i.test(location.pathname)){
						  $("#down").hide();
						}
					}
				}	
			}	
		},
		// cid 猜你喜欢隐藏
		guess: function() {
	    	if(window.pageConfig && window.pageConfig.cid){
				var cid = Number(window.pageConfig.cid);
				var garr = [41,212,180,233,246,251,253,24,10,193,165];
				var garr2 = [24,10,193,165,118,250,212,180,246,41,233,252];
				if(garr.indexOf(cid) > -1){
					$("#like").hide();
				}
				if(garr2.indexOf(cid) > -1){
					$("#equal").hide();
				}
			}		
		},
		danji_yy:function(){
			// 上线时间start
			var oY = new Date().getFullYear()+1;
		    var dateA = [];
		    for(var i=1;i<13; i++){
		      	dateA.push(oY + '年' + i + '月');
		    }
		    var mathNumber = parseInt(Math.random()*11);
		    $(".infobox .gongju .text ul li:eq(3)").html('<span class="type">发布时间：</span><span>'+dateA[mathNumber]+'</span>')
		    // 上线时间end
			var pnum = Math.round(window.pageConfig.id/800);
			$('body').append('<div class="yAlert_bg"></div><div class="yAlert"><div class="yAlert_t cfix"><span class="yAlert_c">×</span>请输入预约的手机号码</div><div style="*clear:both;*width:420px;*margin:0 auto"><input type="text" id="yPhone" placeholder="输入手机号码" style="height:45px;*width:400px"></div><b>'+pnum+'人已预约此应用</b><div class="yAlert_b"><div class="yAlert_bs">确定</div><div class="yAlert_br">取消</div></div></div>');
			$(".yd .yd_left").html('<a href="javascript:;" class="yu_btn">立即预约</a>');
			$("#down>h2,#down #xx660,#down .tishi,#down .downleft,#down .ttright,#down .mention,.guide,.feedback").hide();
			var yueyue = true;
			var sid = window.pageConfig.id;
			var sname = $('.infocon h1').html();
			var rsource_url = window.location.href;
			var pdate = window.pageConfig.publishdate?window.pageConfig.publishdate.split(" ")[0]:'';
			$(".yu_btn").click(function(){
				if(yueyue){
					$(".yAlert_bg").show();
					$(".yAlert").show();
				}else{
					alert("您已经预约过了！");
				}
			})
			$(".yAlert_bg,.yAlert_c,.yAlert_br").click(function(){
				$(".yAlert_bg").hide();
				$(".yAlert").hide();
			});
			$(".yAlert_bs").click(function(){
				var phone = $("#yPhone").val();
				if(phone == ""){
					alert("手机号码不能为空！")
				}else if(/^1[3|4|5|7|8][0-9]{9}$/.test(phone)){
					var i = new Image(),i2 = new Image();
					i.src = 'http://m.yxdown.com/api/op.ashx/yuyuesoft?sid='+sid+'&callback=phonenumber&website=myxdownPC&sname='+sname+'&phone='+phone+'&rsource_url='+rsource_url+'&pdate=' + pdate;
					i2.src = "http://xz.tongji.yxdown.com/count.do?ch=pcyxdown&sid=" + sid + "&name=" + sname + "&stype=即将发布&ua=" + navigator.userAgent;
					alert("预约成功！");
					$(".yAlert_bg").hide();
					$(".yAlert").hide();
					yueyue = false;
					$(".yu_btn").html("预约成功");
				}else{
					alert("请输入正确的手机号码!");
				}
			})
		},
		danji:function(){
			var dj_next=true;
			if(/\/SoftView\/|\/buding\/|\/gongju\/|\/zhoubian\/|\/tvgame\//i.test(location.pathname) && dj_next){
				if($("title").html().indexOf("暂未上线")>-1){
	            	$(".yd .yd_left").html('<a href="javascript:;" class="up_btn">暂未上线</a>');
	            	$("#down>h2,#down #xx660,#down .tishi,#down .downleft,#down .ttright,#down .mention,.guide,.feedback,.pf").hide();
	            }else if($("title").html().indexOf("资源已暂时下架")>-1){
	            	$(".yd .yd_left").html('<a href="javascript:;" class="up_btn">游戏已下架</a>');
	            	$("#down>h2,#down #xx660,#down .tishi,#down .downleft,#down .ttright,#down .mention,.guide,.feedback,.pf").hide();
	            }else if($("title").html().indexOf("预约")>-1){
	            	thepb2.danji_yy();
	            }
			}
		},
		invoke:function(){
			this.cid48();
			this.qpxj();
			this.guess();
			this.danji();
		}
	};
	thepb2.invoke();
}catch(e){}



/*if(/\/(news|mnews|review|sygl|gonglue)\//ig.test(location.pathname)){
    if($("#comment").length > 0 && $("#commentsWrap").length ==0 && typeof(loadPinglun) == 'undefined'){
        $("#comment").html('<div id="commentsWrap" style="display:block;"></div><div id="ArticleInfosum" style="opacity:0.01;"></div>');
        document.write('<link rel="stylesheet" href="http://static.yxdown.com/pc/pinglun/css/zt_m_comment.css" />');
        document.write('<script src="https://static.yxdown.com/pc/js/pinglun.js"></script>');
        var loadPinglun = function () {
            if (window.Pinglun) {
                window.Pinglun.SetConfig({ "SID": window.pageConfig.id, "KEY": "news", "Encoding": "utf-8" });
                window.Pinglun.Init();
            } else {
                setTimeout(loadPinglun, 2000);
            }
        }
        loadPinglun();
    }else{
        $(".pinglun,#commentsWrap").show();
    }
}else if(/\/zt\//ig.test(location.pathname)){
    $(".pinglun,#commentsWrap").show();
    !window.Pinglun?conPl('zt'):null;
}

function conPl(a){
    if(typeof(loadPinglun) == 'undefined'){
        var sidpl = window.pageConfig.id;
        var softType = a;
        document.write('<script src="http://static.yxdown.com/pc/js/pinglun.js"></script>');
        var loadPinglun = function() {
            if (window.Pinglun) {
                window.Pinglun.SetConfig({ "SID": sidpl, "KEY": softType, "Encoding": "utf-8" });
                 $.ajax({
                    type: "GET",
                    async: false,
                     url: 'http://pinglun.yxdown.com/pb/api.ashx?sourceid=' + sidpl + '&type=' + softType + '',
                    success: function (data) {
                        if (data == "true") {
                            $(".pinglun,#commentsWrap").hide();
                        } else {
                            window.Pinglun.Init();
                        }
                    }
                });
            } else {
                setTimeout(loadPinglun, 2000);
            }
        }
        loadPinglun();
    }
}*/

if(location.pathname!='/'){
	/*document.write("<div class='r_b_fmt' style='position:fixed; right:0; bottom:0; z-index:9999;'><a href='http://www.yxdown.com/ads/307.html' target='_blank' style='width:300px;height:250px;display:block;position:absolute;z-index:99;background:#000;opacity:0;filter:alpha(opacity=0);'></a><b><embed src='http://static.yxdown.com/cjimages/swf/afmt_300x250.swf' width='300' height='250' wmode='transparent' quality='high' type='application/x-shockwave-flash' title='Adobe Flash Player'></b><div id='close_fmt' style='width:25px;height:13px;overflow:hidden;position:absolute;right:10px;top:10px;z-index:100;'><img src='http://static.yxdown.com/cjimages/close2.gif' style='vertical-align: top;'/></div></div>");*/
	// 下载页富媒体
	try{
		if(!pageTo404){
			if(/\/gonglue\/|\/news\//i.test(location.pathname)){
				document.write("<div class='r_b_fmt' style='position:fixed; right:0; bottom:0; z-index:9999;'><a href='http://doapi.prxxff.com/api/adl/4710313_steam8-fumeiti' target='_blank'><img style='width: 100%;display:block;' src='https://static.yxdown.com/cjimages/fmt_300x300.jpg'></a><div class='close_fmt' style='position: absolute;right: 0;top: 0px;cursor: pointer;z-index: 5;width:29px;height:16px;background:url(http://static.yxdown.com/pc/index/images/close_btn.png)'></div><em style='display: block;width: 29px;height: 16px;background: url(http://static.yxdown.com/pc/index/images/g_tip_l.png) no-repeat 0 0;position: absolute;bottom: 0;left: 0;z-index: 5;'></em></div>");
			}
			$(".close_fmt").click(function(){
				$(".r_b_fmt").hide();
			})
			/*if(/\/softview\/|\/buding\//i.test(location.pathname)){
				document.writeln("<script src='//203.vainews.cn/alikes.php?id=7327'></script>");
			}else{
				document.writeln('<script src="//203.vainews.cn/alikes.php?id=7327"></script>');
			}*/
		}
	}catch(e){console.log(e)}
}

document.writeln('<script type="text/javascript" src="https://doapi.prxxff.com/jsapi/800885.js"></script>');