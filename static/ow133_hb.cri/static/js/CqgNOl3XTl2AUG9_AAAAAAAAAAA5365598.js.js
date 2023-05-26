$(".secondIndex-banner").each(function(){
	var num = 1;
	var timer = null;
	var _this = $(this);
	var _thisW = $(this).width();
	var _thisH = $(this).height();
	var speed = 3000;
	var runSpeed = 500;
	var auto = $(this).attr("auto");
	var thisType = $(this).attr("type");
	var objLength = _this.find(".banner-img li").length;
	
	var typeDirectionCss = "";
	var typeDirectionWH = "";
	if(thisType=="vertical"){
		typeDirectionCss = "margin-top";
		typeDirectionWH = "height";
	}else{
		typeDirectionCss = "margin-left";
		typeDirectionWH = "width";
	}
	
	$(this).find(".banner-num span").text(num)
	$(this).find(".banner-num strong").text(objLength)
	
	_this.find(".banner-img li").each(function(){
		var _thisLi = $(this);
		$(this).parents(".banner-img").siblings(".banner-nav").find("ul").append("<li></li>")
		if($(this).index()==0){
			$(this).parent().append($(this).clone());
			$(this).parents(".banner-img").siblings(".banner-nav").find("li").eq(0).addClass("active")
			$(this).parents(".banner-img").siblings(".banner-text").find("a").attr("href",$(this).find("a").attr("href"))
			$(this).parents(".banner-img").siblings(".banner-text").find("a span").text($(this).find("img").attr("etitle"))
		}
		
		if($(this).index()==($(this).parent().find("li").length-2)){
			$(this).parent().prepend($(this).clone()).css(typeDirectionCss,-_this.css(typeDirectionWH));
		}
	})
	
	if(thisType=="vertical"){
		$(this).find(".banner-img ul").height(_thisH*_this.find(".banner-img li").length)
//		$(this).find(".banner-img li").css("float","none")
	}else{
		$(this).find(".banner-img ul").width(_thisW*_this.find(".banner-img li").length)
	}
	
	if(objLength!=1){
		if(thisType=="vertical"){
			_this.find(".banner-img").find("ul").css({
				"margin-top":-num*(parseInt(_this.css(typeDirectionWH)))
			})	
		}else{
			_this.find(".banner-img").find("ul").css({
				"margin-left":-num*(parseInt(_this.css(typeDirectionWH)))
			})	
		}
		
		timer = setInterval(function(){
			if(auto=="true"){
				runFn()
			}
		},speed);
		
		$(this).hover(function(){
			clearInterval(timer);
		},function(){
			if(auto=="true"){
				timer = setInterval(runFn,speed);
			}
		})
		
		$(this).find(".banner-nav").find("li").hover(function(){
			num = $(this).index()+1;
			runAniFn()
			runEff();
		})
		
		$(this).find(".banner-list").find("li").click(function(){
			num = $(this).index()+1;
			runAniFn()
			runEff();
		})
		
		$(this).find(".btnLeft").click(function(){
			runLeft();
			runEff();
		})
		
		$(this).find(".btnRight").click(function(){
			runRight();
			runEff();
		})
	}
	
	function runFn(){
		runRight();
		runEff();
	}
	
	function runEff(){
		_this.find(".banner-nav").find("li").removeClass("active")
		_this.find(".banner-nav").find("li").eq(num-1).addClass("active")
		_this.find(".banner-text").find("a").attr("href",_this.find(".banner-img").find("li").eq(num).find("a").attr("href"))
		_this.find(".banner-text").find("a span").text(_this.find(".banner-img").find("li").eq(num).find("img").attr("etitle"))
		
		_this.find(".banner-num span").text(num)
		_this.find(".banner-num strong").text(objLength)
		
//		listCenter();
	}
	
	
	function runRight(){
		num++;
		if(num==_this.find(".banner-img").find("li").length-1){
			_this.find(".banner-img").find("ul").css(typeDirectionCss,0)
			num=1;
		}
		runAniFn()
	}
	
	function runLeft(){
		num--;
		if(num==0){
			console.log(num)
			_this.find(".banner-img").find("ul").css(typeDirectionCss,-(_this.find(".banner-img").find("li").length-1)*(parseInt(_this.find(".banner-img").find("li").css(typeDirectionWH))))
			num=_this.find(".banner-img").find("li").length-2;
		}
		runAniFn()
	}
	function runAniFn(){
		if(thisType=="vertical"){
			_this.find(".banner-img").find("ul").stop().animate({
				"marginTop":-num*(parseInt(_this.css(typeDirectionWH)))
			},runSpeed)	
		}else{
			_this.find(".banner-img").find("ul").stop().animate({
				"marginLeft":-num*(parseInt(_this.css(typeDirectionWH)))
			},runSpeed)	
		}
	}
});
//焦点图a 交互结束

//Tab切换 交互开始
$(".js-tabWrap").each(function(){
	var _this = $(this);
	var _thisNav = _this.find(".js-tabMenu");
	var _thisNavBtn = _thisNav.find(".js-tabBtn");
	var _thisBox = _this.find(".js-tabBox");
	var _thisCard = _this.find(".js-tabCrad");
	
	_thisCard.first().show()
	_thisNavBtn.first().addClass("active")
	
	_thisNavBtn.hover(function(){
		_thisNavBtn.removeClass("active")
		$(this).addClass("active")
		_thisCard.hide();
		_thisCard.eq($(this).index()).show()
	})
})
//Tab切换 交互结束

$("video").each(function(i,e){
	$(this).attr("videoIndex",i)
})
$('.js-video-1 .js-video-time').each(function() {
	var mmss = $(this).text();
	var _mmss = mmss.replace(/^(00)\:/img, '');
	// var _mmss = mmss.substring(3,8)
	$(this).html(_mmss);
});
var videoTitleSetTime = null;
$(".js-video-1").hover(function(){
	$(this).find(".list-pic").hide();
	$(this).find(".list-video").show();
//	var video = $(this).siblings(".list-video").find("video");
	var video = $(this).find(".list-video");
	var videoIndex = Number(video.attr("videoIndex"));
//	var videoBox = videoWrap.find("video");
//	document.getElementsByTagName("video")[videoIndex].play()
//	$("video").get(videoIndex).play()
	var videoUrl = video.attr("videourl");
	var videoTitle = video.attr("videotitle");
	var videoSrc = video.attr("videosrc");
	var videoImg = video.attr("videoimg");
	var videoWidth = video.attr("videowidth");
	var videoHeight = video.attr("videoheight");

	video.html("")
	var videoHtml=""
		videoHtml+="<a href='"+videoUrl+"' target='_blank' class='aImg'>";
		videoHtml+="<video width='"+videoWidth+"' height='"+videoHeight+"' src='"+videoSrc+"' title='"+videoTitle+"' autoplay='autoplay' muted controlslist='nodownload' poster='"+videoImg+"' videoindex='0'>";
    	videoHtml+="<object style='' width='"+videoWidth+"' height='"+videoHeight+"' type='application/x-shockwave-flash' data='/media-player/flashme.swf'>";
        videoHtml+="<param name='movie' value='/media-player/flashme.swf'>";
        videoHtml+="<param name='flashvars' value='controls=true&amp;file="+videoSrc+"&amp;isvideo=true&amp;'>";
        videoHtml+="<param name='allowScriptAccess' value='sameDomain'>";
        videoHtml+="<param name='play' value='true'>";
        videoHtml+="<param name='menu' value='true'>";
        videoHtml+="<param name='allowFullScreen' value='true'>";
        videoHtml+="</object>";
    	videoHtml+="</video>";
    	videoHtml+="</a>";
    	
    video.append(videoHtml)
    clearTimeout(videoTitleSetTime)
    videoTitleSetTime = setTimeout(function(){
    	video.find("video").removeAttr("title")
    },3000)
    
    videoPlayFn()
},function(){
	$(this).find(".list-video").hide().html("");
	$(this).find(".list-pic").show();
})
videoPlayFn()
function videoPlayFn(){
	$('video').on('play', function() {
		var current = this;
		$('video').each(function() {
			if(this != current) {
				this.pause();
			}
		});
	});
}

function copyText() {
	$(".oInput").remove()
	var Url2 = $("title").html()+window.location.href
	var oInput = document.createElement('input');
	oInput.value = Url2;
	document.body.appendChild(oInput);
	oInput.select();
	document.execCommand("Copy"); 
	oInput.className = 'oInput';
	oInput.style.display = 'none';
	alert('复制成功');
}

function copyText() {
  var thisTitle = $("title").html() + " \n";
  var thisUrl = window.location.href;
  var content = thisTitle.concat(thisUrl);
 
    // 使用textarea支持换行，使用input不支持换行
  	var textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
 
    textarea.select();
    if (document.execCommand('copy')) {
    	document.execCommand('copy');
//  	alert(content);
		alert("复制成功");
  	}
	document.body.removeChild(textarea);
}

$(".lt9 .secondIndex-wrap .list-abody").each(function(){
	var thisW = $(this).width();
	$(this).find("video").each(function(){
		if($(this).width()>thisW){
			$(this).width(thisW)
			$(this).height($(this).height()*($(this).width()/thisW))
		}
	})
	$(this).find("object").each(function(){
		if($(this).width()>thisW){
			$(this).width(thisW)
			$(this).height($(this).height()*($(this).width()/thisW))
		}
	})
})
