$(document).ready(function(){
	$('#ipt1').keydown(function(e){
		if (e.keyCode === 13) {
			var urls =  'http://s.zjol.com.cn/cse/search?q='+$(this).val()+'&click=1&s=6048247431686495421&nsid=1'
			window.open(urls)
		}
	})
	
	$('.btn1').click(function(){
		var urls =  'http://s.zjol.com.cn/cse/search?q='+$('.ipt1').val()+'&click=1&s=6048247431686495421&nsid=1'
		window.open(urls)
	})
	
	
	for (var i = 0; i < $('.header_nav>li').length; i++) {
		$('.header_nav>li').eq(i).hover(function(){
			$(this).addClass('hv-active')
		},function(){
			$(this).removeClass('hv-active')
		})
	}
	
	//底部
	for (var i = 0; i < $('.down>li').length; i++) {
		$('.down>li').eq(i).hover(function(){
			var j = $(this).index()
			$('.up>li').eq(j).show().siblings().hide()
		})
	}

	var browser = $.browser;
	if (browser.msie && browser.version=='8.0') {
		$('#ipt1').val('站内搜索')
		$('#landipt').val('请输入相关地块名称或编号')
	}
	
})