$(window).load(function() {	
	//分享start
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
	//分享stop

	//广告位之间的间距
	(function(){
		$(".banner-box02 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
		$(".banner-box04 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
		$(".banner-box05 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
		$(".banner-box05 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
		$(".banner-box07 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
		$(".banner-box08 li:eq(1)").css({"margin-right":'7px','margin-left':'7px'});
	}());
	
	//专题访谈
	$(".ztft ul li:eq(0)").css("margin-right",'10px');
	$(".ztft ul li:eq(2)").css("margin-right",'10px');


	//	设置内容页图片缩放
	$('.article-box .abody p img').each(
		function(){
			var bWidth = $('.article-box').width();
			var maxwidth = bWidth;
			if($(this).width()>maxwidth){
				$(this).width(maxwidth);
			}
		}
	);
	
	$(".scs .tab-main .tab-con1 ul li:eq(2)").css({"border-bottom":'none'});
	$(".scs .tab-main .tab-con2 ul li:eq(2)").css({"border-bottom":'none'});
	$(".scs .tab-main .tab-con3 ul li:eq(2)").css({"border-bottom":'none'});
	$(".jwm .tab-main .tab-con1 ul li:eq(2)").css({"border-bottom":'none'});
	$(".jwm .tab-main .tab-con2 ul li:eq(2)").css({"border-bottom":'none'});
	$(".jwm .tab-main .tab-con3 ul li:eq(2)").css({"border-bottom":'none'});
	
	
	$(".qdxf ul li:eq(4)").css({"margin-right":'0'});
	
	//友情链接新页打开
	$('.yqlj-content ul a').attr('target','_blank');	

	//导航栏目新页打开
	$('.headtopWrap .nav p a').attr('target','_blank');		
	
});                                                                                               