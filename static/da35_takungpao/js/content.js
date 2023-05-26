$(function(){
	window.onscroll = function(){ 
		var t = document.documentElement.scrollTop || document.body.scrollTop;      
		if( t > 700 ) {
			$('#tipback').show();		
		} else { 
			$('#tipback').hide();	
		}
	}
	$('#tipback').click(function(){
		$('html, body').animate({scrollTop: 0}, 300);
	});
	
	$('.tkp_content img').each(function(){
        var t=$(this);
        var imgw = t.width(),imgh=t.height();
		if(imgw/imgh<9/16) {t.css({"width":"100%","max-width":"550px","height":"auto"});return;}
        imgh<=imgw?imgw>300&&t.css({"width":"100%","max-width":"550px","height":"auto"})
        :imgw > 300*imgw/imgh && t.css({"width": (100*imgw/imgh)+"%","max-width":(600*imgw/imgh)+"px","height":"auto"});
    });
	
	//字号
	$('.tkp_con_fontsize dt').on('mouseover',function(){
		$(this).hide();
		$('.tkp_con_fontsize dd').show();
	});
	$('.tkp_con_fontsize').on('mouseleave',function(){
		$('.tkp_con_fontsize dd').hide();
		$('.tkp_con_fontsize dt').show();
	});
	
	//var str = '<div class="number" style="position:absolute; top:5px; right:20px; z-index:9; font-size:12px; color:#fff;">在线人数：<span id="number">1000</span></div>';
	//$('.tkp_content').prepend(str);
	
	try{
		if($('#number').length > 0){
			update_number();
			setInterval(update_number, 5000);
		}
	}catch(e){
		console.log(e);
	};
	
	//点击排行
	$('.paihang .list li').slice(0,3).addClass('black');
	
	//评论
	$('#tkpcomment') && $('#tkpcomment').load("http://r2d2.takungpao.com/cn/lib/comment/comment.html");
	
	shareToWeixin();
});

function online_number(value) {
	var num = $("#number");
	num.animate({count: value}, {
		duration: 500,
		step: function() {
			num.text(parseInt(this.count));
		}
	});
	$.post('http://pingxuan.takungpao.com/h5/number/count.php',{'onlineCount': value});
};

function update_number() {
	$.getJSON("http://pingxuan.takungpao.com/h5/number/number.php?jsonp=?", function(data) {
		$.get('http://pingxuan.takungpao.com/h5/number/fmh.php',function(d){
			online_number(parseInt(data.n) + parseInt(d));
		});
	});
};

function shareToWeixin(){
	var shareTitle = document.title.replace('_大公网','');
	var lineLink = location.href.split('?')[0];
	var imgUrl = 'http://r2d2.takungpao.com/cn/common/images/ico_share.jpg';
	var imgUrlHouse = 'http://r2d2.takungpao.com/cn/house/images/icon_share.jpg';
	var descContent = $('meta[name="Description"]').attr('content');
	var imgLiu = lineLink.indexOf('house') < 0 ? imgUrl : imgUrlHouse;
	console.log(imgLiu);
	$.getJSON('http://s.takungpao.com/jssdk/weixin.php?jpc=?',{'url':encodeURIComponent(location.href.split('#')[0])}).done(function(data){
		wx.config({
			debug: false, 
			appId: data.appId, 
			timestamp: data.timestamp, 
			nonceStr: data.nonceStr, 
			signature: data.signature,
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
		});
	});
		
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title: shareTitle,
			link: lineLink,
			imgUrl: imgLiu
		});	
		wx.onMenuShareAppMessage({
			title: shareTitle,
			desc: descContent,
			link: lineLink,
			imgUrl: imgLiu,
			type: 'link'
		});
	});
}