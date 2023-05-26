var mainMenu = document.getElementById("mainMenu"),
	slMenuSpan = mainMenu.getElementsByTagName("span"),
	menuBox = $(".menuBox"),
	article = $("article"),
	shadow = $(".shadow");
		
		/*
 *定位当前菜单
 */
function navScrollEnt(ID){
	var t=document.getElementById(ID);
	if(t){
		for(var e=t.getElementsByTagName("a"),i=0,n=0,o=e.length;n<o;n++){
			var a=e[n];
			if(a.className.indexOf("current")>=0){
				var s=a.getBoundingClientRect();//rectObject.left：元素左边到视窗左边的距离;
				i=s.left-.5*window.innerWidth+.5*s.width;//rectObject.width：是元素自身的宽
				break
			}
		}
		t.scrollLeft=i
	}
}

/*
 *gotop
 */
function goTopEvent()
{
	var goTop = $("#goTop");
	$(window).scroll(function(){
		if($(window).scrollTop() > $(window).height()){goTop.show()}
		else{goTop.hide()}
	});
	goTop.click(function(){$(window).scrollTop(0)});
}

/*
*下拉菜单动画
*/
function mainMenuEvt(){
	mainMenu.addEventListener('click', function() {
		if (this.clientHeight == 17) {
			this.style.height = 16 + "px";
			slMenuSpan[0].style.webkitTransform = "rotate(45deg) translate(5px,5px)";
			slMenuSpan[1].style.opacity = 0;
			slMenuSpan[2].style.webkitTransform = "rotate(-45deg) translate(5px,-5px)";
			menuBox.show();
			article.addClass("blur");
			shadow.show();
			
			//电视直播videoBox = $("#videoBox")//视频详情videoBox = $(".videoBox")
			if(typeof(videoBox) != "undefined" && videoBox.length>0){videoBox.hide()}
		} else {
			mainMenuHideEvt();
		}
	}, false);
	
	shadow.click(function(){
		mainMenuHideEvt();
	});
}

function mainMenuHideEvt(){
	mainMenu.style.height = 17 + "px";
	slMenuSpan[0].style.webkitTransform = "rotate(0deg) translate(0px,0px)";
	slMenuSpan[1].style.opacity = 1;
	slMenuSpan[2].style.webkitTransform = "rotate(0deg) translate(0px,0px)";
	menuBox.hide();
	article.removeClass("blur");
	shadow.hide();
	
	$(".videoBox").show();//视频详情
	if(typeof(playBtn) != "undefined" && playBtn.hasClass("playing")){
		videoBox.show()//电视直播
	}
}

/*时间格式化*/
function formatSeconds(value) {
	var secondTime = parseInt(value);// 秒
	var minuteTime = 0;// 分
	var hourTime = 0;// 小时
	if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if(minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	if(secondTime<10) secondTime='0'+secondTime;
	if(minuteTime<10) minuteTime='0'+minuteTime;
	
	var result =  minuteTime +":"+ secondTime;
	if(hourTime > 0) {
		result = hourTime+":"+ minuteTime +":"+ secondTime;
	}
	return result;
}

/*微信预览图片*/
function ImageEvt(){
	var imgList = [];
	$(".conCon p img").each(function(){
		if(!($(this).hasClass('audioBtn') || $(this).hasClass('videoBtn') )){
			var imgs = $(this).attr("src");
			if(!imgList.includes(imgs)){
				imgList.push(imgs);
			}
		}
	})
	
	var UA = navigator.userAgent.toLowerCase(),isWeixin = UA.match(/micromessenger/ig);
	if(isWeixin){
		$(".conCon").on('click',"img",function(e){
			e.stopPropagation();
			var isLinkImg = $(this).parent().is('a');//带链接图片
			if(!($(this).is('.audioBtn,.videoBtn')||isLinkImg) ){
				var nowImgUrl= $(this).attr('src');
				WeixinJSBridge.invoke("imagePreview",{
					"urls":imgList,     // 需要预览的图片http链接列表
					"current":nowImgUrl // 当前显示图片的http链接
				});
			}
		});
	}
}
