//解析url地址
function parseURL(url) {
	var a =  document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':',''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function(){
			var ret = {},
				seg = a.search.replace(/^\?/,'').split('&'),
				len = seg.length, i = 0, s;
			for (;i<len;i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		hash: a.hash.replace('#',''),
		path: a.pathname.replace(/^([^\/])/,'/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		segments: a.pathname.replace(/^\//,'').split('/')
	};
}
	
function cateMore(){
	var listLoad = $("#listLoad");
	var curP;//当前页数
	var cataArr = {"647":{"num":"2","name":"娱乐"},//娱乐热点
				   "1411":{"num":"2","name":"忒色"},//忒色热点
				   "576":{"num":"2","name":"体育"},//全运动态
				   "747":{"num":"2","name":"财经"},//财经资讯
				   "737":{"num":"2","name":"文化"},//文化产业发展
				   "653":{"num":"2","name":"三农"},//三农-新闻
				   "637":{"num":"2","name":"旅游"},//旅游资讯
				   "522":{"num":"2","name":"美食"},//美食厨房
				   "578":{"num":"2","name":"健康"},//健康生活
				   "556":{"num":"2","name":"教育"},//教育新闻
				   "542":{"num":"2","name":"硬科技"},//硬科技在陕西
				   "739":{"num":"2","name":"房产"},//房产-头图
				   "420":{"num":"2","name":"汽车"}};//汽车资讯
	$(".cateList").click(function(){
		$(this).hide();
		listLoad.show();  
	
		var cataid = $(this).attr("data-id");
		var cataNode = $("#cate"+cataid);
		var pagesize = "6";
		cataArr[cataid].num++;
		curP = cataArr[cataid].num;//从第三页开始得ajax

		var getUrl = "http://website.cnwest.com/ajax/list/?page="+curP+"&pagesize="+pagesize+"&id="+cataid+"&attribute=0";
		$.ajax({
			type : "GET", 
			async:false,
			url : getUrl,
			dataType : "jsonp",
			jsonp: "callback",
			success : function(data){ 
				//if(data.status == "0"){
					var node = "";
					var pagenum = data.total / pagesize;//总页数
					//if(parseInt(data.p)+1 < data.pagenum)
					if(curP < pagenum)
					{cataNode.siblings(".cateList").show();}
					else{cataNode.siblings(".cateList").hide();}
		
					for(var i=0;i<data.data.length;i++){
						if(data.data[i].thumb == "")
						{
							node += '<li class="warp-tw"><div class="warp-tw-nr warp-tw-nr-nopic"><h3><a href="'+data.data[i].url+'" target="_blank">'+data.data[i].title+'</a></h3><p><em>'+cataArr[cataid].name+'</em>'+data.data[i].description+'</p><span>'+GLOBAL.Lang.geMyTime(data.data[i].published,3)+'</span></div></li>';
						}
						else{
							node += '<li class="warp-tw"><div class="warp-tw-pic"><a href="'+data.data[i].url+'" target="_blank"><img src="'+data.data[i].thumb.url+'"></a></div><div class="warp-tw-nr"><h3><a href="'+data.data[i].url+'" target="_blank">'+data.data[i].title+'</a></h3><p><em>'+cataArr[cataid].name+'</em>'+data.data[i].description+'<span>'+GLOBAL.Lang.geMyTime(data.data[i].published,3)+'</span></p></div></li>';
						}
					}
					cataNode.append(node);
					listLoad.hide();
				//}
				//else{alert(data.msg)}
			},
			 error: function(){
				 console.log('error');
			 }
		});
	});
}
	
/*share*/
function shareEvent(){
	var shareTitle = $("#shareTitle").html();
	var shareNote = $("#shareNote").html();
	var shareImg = $("#shareImg").attr("src");
	var shareUrl = window.location.href;
	var safeUrl= mywapurl.substring(7);
	var weiboUrl = "http://service.weibo.com/share/share.php?url="+shareUrl+"&title=【"+shareTitle+"】（来自:西部网 www.cnwest.com）&pic="+shareImg+"&searchPic=true";
	var qzoneUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+shareUrl+"&title=【"+shareTitle+"】（来自:西部网）&desc=&summary="+shareNote+"...&site=&pics="+shareImg;
	
	$("#qqkj,#qqkjB").attr("href",qzoneUrl);
	$("#wb,#wbB").attr("href",weiboUrl)
	
	$(".weixin").click(function(){
		$(this).parent("ul").siblings(".listEwm").show()
		
		var codeDiv = $(this).parent("ul").siblings(".listEwm").children(".code");
		if(codeDiv.html()==""){
			codeDiv.html('<img src="http://app3.cnwest.com/api/cnwest/qrcode/?url='+safeUrl+'" width="200" height="200"/>');
		}
	});
	$(".closed").click(function(){
		$(this).parent("p").parent(".listEwm").hide();
	});
}

//图片延迟加载
function src_load(node)
{
	node.find("img.lazy").each(function(){ 
		var original = $(this).attr("data-original");//alert(original);
		var special_str = original.substring(0,5);
		var common_url = original.substring(5);
		if(special_str == "/data")
		{
			original = "http://image.cnwest.com" + common_url;
		}
		
		$(this).attr("src",original); 
		//$(this).removeAttr("data-original");
		$(this).removeClass("lazy");
	 });
}
/*公用代码库*/
GLOBAL.lazyLoad = {
	filter_str: "lazy",
	flag_start: 1,
	flag_node: 1,
	load: function() {
		var a = this;
		a.start();
		$(window).scroll(function() {
			a.start()
		})
	},
	start: function() {
		var a = this;
		if (!a.flag_start) {
			return
		}
		a.flag_start = 0;
		var b = window.location.href.indexOf("cnwest.com") > -1 ? true: false;
		$("img." + a.filter_str).each(function() {
			var e = $(this).attr("data-original");
			if (a.isVisible($(this))) {
				var d = e.substring(0, 5);
				var c = e.substring(5);
				if (d == "/data") {
					e = b ? "http://image.cnwest.com" + c: "http://172.16.14.25:7001/data" + c
				}
				$(this).attr("src", e).removeClass(a.filter_str)
			}
		});
		a.flag_start = 1
	},
	isVisible: function(c) {
		var b = c.offset().top;
		if (b >= $(window).scrollTop() && b < ($(window).scrollTop() + $(window).height()) && !c.is(":hidden")) {
			return true
		}
		return false
	},
	isVisibleForSlide: function(c) {
		var b = c.offset().top;
		if (b >= $(window).scrollTop() && b < ($(window).scrollTop() + $(window).height())) {
			return true
		}
		return false
	},
	loadByNode: function(c) {
		var a = this;
		if (!a.flag_start) {
			return
		}
		a.flag_node = 0;
		var b = window.location.href.indexOf("cnwest.com") > -1 ? true: false;
		c.find("img." + a.filter_str).each(function() {
			var f = $(this).attr("data-original");
			if (a.isVisibleForSlide($(this))) {
				var e = f.substring(0, 5);
				var d = f.substring(5);
				if (e == "/data") {
					f = b ? "http://image.cnwest.com" + d: "http://172.16.14.25:7001/data" + d
				}
				$(this).attr("src", f).removeClass(a.filter_str)
			}
		});
		a.flag_node = 1
	}
};
	
function huaDongMen(){
	$("#menu-h li").hover(function(){
		var mIndex = $(this).attr("id").substring(1);
		$(this).siblings("li").removeClass("on");
		$(this).addClass("on")
		
		var contentH = $("#content-h");
		contentH.children("div").hide();
		contentH.children("div").eq(parseInt(mIndex)-1).show();
		//src_load(contentH.children("div").eq(parseInt(mIndex)-1));
		//GLOBAL.lazyLoad.loadByNode(contentH.children("div").eq(parseInt(mIndex)-1));
	})
}

//图集
function setSize(){
	var obj = $(".show").children("img");
	obj.attr("src",obj.attr("data-img"));
	
	setTimeout(function(){
		var imgH = obj.height();
		$(".clickBtn").css("height",imgH)
	},300);
}

function bigPicEnt(){
	if($(".picBox").length > 0 ){
		var BigPic = {
			$picItem : $(".picItem"),
			$picPre : $(".picPre"),
			$picNext : $(".picNext"),
			$infoCon : $(".infoCon"),
			$nowPageNum : $("#nowPageNum"),
			$curUrl : window.location.href.split('#')[0],
			clickNum : 0
		};
		
		//通过url锚点值显示对应图片
		var hash = parseInt(window.location.hash.substring(1),10)
		if(!(/^[0-9]+$/.test(hash) && (hash>0)) || hash > totalNum) hash = 0
		
		BigPic.clickNum = hash;
		BigPic.$picItem.eq(BigPic.clickNum).addClass("show");
		BigPic.$infoCon.html(BigPic.$picItem.eq(BigPic.clickNum).children("img").attr("data-caption"));
		BigPic.$nowPageNum.html(BigPic.clickNum+1);
		
		setTimeout(setSize,700);
		
		BigPic.$picNext.click(function(){
			BigPic.clickNum++;
			if(BigPic.clickNum < BigPic.$picItem.length){
				BigPic.$picItem.removeClass("show");
				
				BigPic.$picItem.eq(BigPic.clickNum).addClass("show");
				BigPic.$infoCon.html(BigPic.$picItem.eq(BigPic.clickNum).children("img").attr("data-caption"));
				BigPic.$nowPageNum.html(BigPic.clickNum+1);
				
				window.location.href = BigPic.$curUrl+"#"+BigPic.clickNum;
				setSize();
			}
			else{
				window.history.replaceState({}, document.title, BigPic.$curUrl);
				$(".picBox").hide();
				$(".moreBox").show();
			}
		});
		BigPic.$picPre.click(function(){
			if(BigPic.clickNum >= "1"){
				BigPic.clickNum--;
				BigPic.$picItem.removeClass("show");
				
				BigPic.$picItem.eq(BigPic.clickNum).addClass("show");
				BigPic.$infoCon.html(BigPic.$picItem.eq(BigPic.clickNum).children("img").attr("data-caption"));
				BigPic.$nowPageNum.html(BigPic.clickNum+1);
				
				if(BigPic.clickNum) window.location.href = BigPic.$curUrl+"#"+BigPic.clickNum;
				else window.history.replaceState({}, document.title, BigPic.$curUrl);
				setSize()
			}
		});
		
		BigPic.$picPre.hover(function(){
　　　　	if(BigPic.clickNum <= "0"){
				$(this).css("opacity","0");
			}
			else{$(this).css("opacity","0.5");}
		}, function(){
		　　$(this).css("opacity","0");
		});
		
		$(".thisImg").click(function(){
			$(".picBox").show();
			$(".moreBox").hide();
			
			BigPic.clickNum = 0;
			BigPic.$picItem.removeClass("show");
			
			BigPic.$picItem.eq(BigPic.clickNum).addClass("show");
			BigPic.$infoCon.html(BigPic.$picItem.eq(BigPic.clickNum).children("img").attr("data-caption"));
			BigPic.$nowPageNum.html(BigPic.clickNum+1);
			
			setSize();
		});
	}
}

function albumEvent() {	
	var playerContainer = $('.album-container');
	var $scrollbar = $("#albumlist");
    if (!playerContainer.length) return;
	
    /*切换专辑展示状态*/
    var toggleExtendState = function () {
        var method = playerContainer.hasClass('extend') ? 'removeClass' : 'addClass';
        playerContainer[method]('extend');
    }

    playerContainer.on('click', '.arrow', toggleExtendState);
	$scrollbar.tinyscrollbar();
	
	var albumTime = $(".albumTime");
	albumTime.each(function(){
		$(this).html(formatSeconds($(this).attr("date-time")));
	});
}

$(document).ready(function() {
	//GLOBAL.lazyLoad.load();
	huaDongMen()
	shareEvent();
	//cateMore();
	bigPicEnt();//大图
	//albumEvent();//视频专辑
	
	var $conCon = $("#conCon");
	
	$("#conCon,.videoCon").find('.videoBox').each(function(){
		//写入思拓系统的数据,由于标签过滤，信息通过p.html()传递
		if($(this).css('display') === 'none'){
			var videoInfo = '';
			videoInfo = JSON.parse($(this).html())
			
			if(videoInfo != ""){
				var Video = {
					src : videoInfo["data-src"],
					thumb : videoInfo["data-thumb"]
				};
				
				$(this).html('<video controls controlslist="nodownload" oncontextmenu="return false" x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true&quot;" playsinline="true" src="'+Video.src+'" poster="'+Video.thumb+'" type="video/mp4"></video>').show();
			}
		}else{
			var Video = {
				src : $(this).attr("data-src"),
				thumb : $(this).attr("data-thumb")
			};
			//目前针对视频格式为mp4和flash,出现其他格式时视情况再更改代码
			if(Video.src.indexOf("mp4") != -1){
				$(this).html('<video controls controlslist="nodownload" oncontextmenu="return false" x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true&quot;" playsinline="true" src="'+Video.src+'" poster="'+Video.thumb+'" type="video/mp4"></video>');
			}
			else{
				$(this).html('<iframe src="'+Video.src+'" frameborder="0" width="840" height="472" allowfullscreen=""></iframe>');
			}
		}
	});
	
	$conCon.find('.audioBox').each(function(){
		var Audio = {
			src : $(this).attr("data-src"),
			time : $(this).attr("data-time"),
			title : $(this).attr("data-title"),
			pauseBg: " http://toutiao.cnwest.com/static/images/iv_pause.png",
			palyeBg: "http://toutiao.cnwest.com/static/images/iv_play.png"
		};
		if(Audio.title.indexOf('.')>-1){
			Audio.title = Audio.title.substring(0,Audio.title.indexOf("."));
		}
		$(this).html('<span class="icon"><img class="audioBtn" src=" http://toutiao.cnwest.com/static/images/iv_pause.png " title="点击 播放/暂停 音频"><audio src="'+Audio.src+'"></audio><time>'+formatSeconds(Audio.time)+'</time></span><span class="title">'+Audio.title+'</span>');
		
		document.getElementById("conCon").onclick = function(ev){
			var ev = ev || window.event;
			var target = ev.target || ev.srcElement;
			
			if(/*target.nodeName.toLowerCase() == "img" && */target.className == "audioBtn"){
				var A = target.nextSibling;
				if(A.paused){
					A.play();
					target.src = Audio.palyeBg;
					return
				}
				else{
					A.pause()
					target.src = Audio.pauseBg;
					return
				}
			}
		}
	});
})

/*$(window).scroll(function(){
	var $menuH = $("#menu-h");
	var $contentH = $("#content-h");
	if($(window).scrollTop() > $contentH.offset().top){
		$menuH.addClass("position");
		$contentH.css("margin-left","141px");
	}
	else{
		$menuH.removeClass("position");
		$contentH.css("margin-left","20px");
	}	
});*/