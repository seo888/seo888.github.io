//返回顶部
$(function() {
$(window).scroll(function() {
if ($(window).scrollTop() > 500)
$('div.go-top').show();
else
$('div.go-top').hide();
});
$('div.go-top').click(function() {
$('html, body').animate({scrollTop: 0}, 500);
});
});

//百度主动推送
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

//今日头条提交
(function(){
var el = document.createElement("script");
el.src = "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?99e5931149c28cc5b67555d64e42b669ab2035aecfd9cbda124e29b270cb09fabc434964556b7d7129e9b750ed197d397efd7b0c6c715c1701396e1af40cec962b8d7c8c6655c9b00211740aa8a98e2e";
el.id = "ttzz";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(el, s);
})(window)

//百度分享
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"32"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://www.zaiyulin.com/skin/zyl/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];


//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?cd374916dd516d300e44a0926eb204a1";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//360主动推送
(function(e){function t(e){var t=location.href,n=t.split("").reverse(),r=e.split(""),i=[];for(var s=0,o=16;s<o;s++)i.push(r[s]+(n[s]||""));return i.join("")}var n=/([http|https]:\/\/[a-zA-Z0-9\_\.]+\.so\.com)/gi,r=e.location.href;if(r&&!n.test(r)&&window.navigator.appName){var i="//s.360.cn/so/zz.gif",o="d182b3f28525f2db83acfaaf6e696dba",u=t(o),a=new Image;r&&(i+="?url="+encodeURIComponent(r)),o&&(i+="&sid="+o),u&&(i+="&token="+u),o&&(a.src=i)}})(window);

//百度联盟广告
//相关阅读下
(window.slotbydup = window.slotbydup || []).push({
	id: "u6834468",
	container: "_hqa0rm9lak8",
	async: true
});
//文章内容下m_a
(window.slotbydup = window.slotbydup || []).push({
	id: "u6833551",
	container: "_lyc41ttq1a",
	async: true
});
//文章内容下pc_a
(window.slotbydup = window.slotbydup || []).push({
    id: "u6855553",
    container: "_1lmc90is5fn",
    async: true
});
//右侧1m_a
(window.slotbydup = window.slotbydup || []).push({
	id: "u6833552",
	container: "_rt9co0ro7z",
	async: true
});
//右侧1pc_a
(window.slotbydup = window.slotbydup || []).push({
    id: "u6855554",
    container: "_338u9zjjty2",
    async: true
});
//右侧2
(window.slotbydup = window.slotbydup || []).push({
	id: "u6833553",
	container: "_83zbebw8v7d",
	async: true
});
(window.slotbydup = window.slotbydup || []).push({
    id: "u6833554",
    container: "_70tgdel5cp7",
    async: true
});
//右侧3
(window.slotbydup = window.slotbydup || []).push({
	id: "u6556594",
	container: "_g2poly8g3qw",
	async: true
});



//禁止鼠标右键
//$(document).ready(function() {
//  $(document).bind("contextmenu", function(e) {
//    return false;
//  });
//});

//图片悬停
var documentHeight = 10;
var topPadding = 15;
$(function() {
	var offset = $("#adsbox").offset();
	documentHeight = $(document).height();
	$(window).scroll(function() {
		var sideBarHeight = $("#adsbox").height();
		if ($(window).scrollTop() > offset.top) {
			var newPosition = ($(window).scrollTop() - offset.top) + topPadding;
			var maxPosition = documentHeight - (sideBarHeight + 300);
			if (newPosition > maxPosition) {
				newPosition = maxPosition
			}
			$("#adsbox").stop().animate({
				marginTop: newPosition
			})
		} else {
			$("#adsbox").stop().animate({
				marginTop: 10
			})
		}
	})
});

//图集
$(document).ready(function(){                          
    var index=0;
    var length=$("#img .img").length;
    var i=1;
    
    //关键函数：通过控制i ，来显示图片
    function showImg(i){
        $("#img .img")
            .eq(i).stop(true,true).fadeIn(800)
            .siblings(".img").hide();
         $("#cbtn li")
            .eq(i).addClass("hov")
            .siblings().removeClass("hov");
    }
    
    function slideNext(){
        if(index >= 0 && index < length-1) {
             ++index;
             showImg(index);
        }else{
			if(confirm("已经是最后一张,点击确定重新浏览！")){
				showImg(0);
				index=0;
				aniPx=(length-4)*142+'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
				$("#cSlideUl ul").animate({ "left": "+="+aniPx },200);
				i=1;
			}
            return false;
        }
        if(i<0 || i>length-5) {return false;}						  
               $("#cSlideUl ul").animate({ "left": "-=142px" },200)
               i++;
    }
     
    function slideFront(){
       if(index >= 1 ) {
             --index;
             showImg(index);
        }
        if(i<2 || i>length+5) {return false;}
               $("#cSlideUl ul").animate({ "left": "+=142px" },200)
               i--;
    }	
        $("#img .img").eq(0).show();
        $("#cbtn li").eq(0).addClass("hov");
        $("#img tt").each(function(e){
            var str=(e+1)+"/"+length;
            $(this).html(str)
        })
    
        $(".picSildeRight,#next").click(function(){
               slideNext();
           })
        $(".picSildeLeft,#front").click(function(){
               slideFront();
           })
        $("#cbtn li").click(function(){
            index  =  $("#cbtn li").index(this);
            showImg(index);
        });	
		$("#next,#front").hover(function(){
			$(this).children("a").fadeIn();
		},function(){
			$(this).children("a").fadeOut();
		})
    })	