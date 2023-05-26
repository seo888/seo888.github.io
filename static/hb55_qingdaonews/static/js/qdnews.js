
if (window.screen.width > 640) {
  //当前页二维码显示
  $("body").append('<div id="code" class="code"></div>');
  $("#code").show();
}
$(window).resize(function() {
  if (window.screen.width > 640) {
    //当前页二维码显示
    $("body").append('<div id="code" class="code"></div>');
    $("#code").show();
  }
});

function setImg() {
    $(".article img").each(function () {
        // $(this).hide();
        if(this.naturalWidth >= 375){
            $(this).css({"width":"100%","height":"auto"});
        }
        // $(this).show();
        $(this).css({"display":"block"});
    });
}

/*图片点击放大*/
function bindPreview() {
    if(!isWeixin()) return;
    $('.article').find('img').unbind("click").bind("click",function(e){
        if($(this).parent().attr("href")) return;
        e.preventDefault();
        var imgPaths = [];
        var $images = $(this).parents('.article').find("img");
        $images.each(function(){
            imgPaths.push($(this).attr("data-original"));
        });
        wx.previewImage({
            current: $(this).attr("data-original"),
            urls: imgPaths
        });
    });
}
//判断是否是微信
function isWeixin() {
   return /MicroMessenger/gi.test(navigator.userAgent);
}


/*二维码格式转换*/
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
        } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

$(function(){ 
	//回到顶部
	$("#gotop").bind("click", function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
	
	$("#code").qrcode({
		 render: "canvas", //table方式
		 width: 100, //宽度
		 height:100, //高度
		 text: utf16to8(window.location.href), //任意内容
	});

  //替换标签
  $(".article").find("img").each(function(i) {
	  $(this).attr("data-original", $(this).attr("src"));
	  $(this).removeAttr("src");
  });

  $(".article").find("img").lazyload({
	  placeholder: 'http://www.qingdaonews.com/public/templateRes/201807/03/90450/90450/holder.png',
	  /* 占位图 */
	  threshold: 400,
	  skip_invisible : false,
	  /* 距离图片多少的位置处开始加载载 */
	  effect: "fadeIn", /* 图片加载方式 fadeIn(淡入) */
	  load: function () {
		  $(this).load(function() {
			  var that = $(this)[0];
			  
			  //图片点击放大
			  bindPreview();  
		  });
		  
	  }
  });
  
  //weex链接替换
  $(".hot_li").each(function(){
	 if($(this).attr("href").indexOf("//weex.") != -1){
		 var weexID = $(this).attr("href").replace(/[^0-9]/ig,"")
		 $(this).attr("href","https://appnews.qingdaonews.com/operate/article/club?id="+weexID)
		}
  })
  
  $("#text").find("a").each(function(){
	  var thisLink = "//weex.qingdaonews.com";
	if($(this).attr("href").indexOf(thisLink) != -1){
		$(this).attr("href","https://appnews.qingdaonews.com/assets/tips/tips.html")
	}
  })	

})  

//分享
var wshare = document.createElement('script');
wshare.src = 'http://city.qingdaonews.com/api/share/index?rand= '+Math.random();
wshare.referrerPolicy = "no-referrer-when-downgrade";
document.body.appendChild(wshare);

//app推广
$(".appTit").text("青岛新闻APP");
$(".appSub").text("");
$(".appImg").attr("src","https://appnews.qingdaonews.com/assets/default/share.png");

/*百度推送*/
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

//视频
if($('.main_video')){
	$('.main_video').each(function(){
		var videoSrc = $(this).attr('url');
		$(this).attr('src',videoSrc)
	})	
}
