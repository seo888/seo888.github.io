$(document).ready(function(){
	// 2-1新闻中心.html专题滚动切换
	$('.vvx-zt-roll .tab a').mouseenter(function(){
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur')
		$(this).parent().siblings('.vvx-zt-list').children('.vvx-zt-group').eq(index).css({
			height:66+'px'
		}).siblings('.vvx-zt-group').css({
			height:0
		})
	});
	// 2-1新闻中心.html专题滚动
	jQuery(".vvx-zt-group .vvx-zt-item").simpleRoll({
		space:10,
		prev:'.vvx-zt-roll .btn .lb',
		next:'.vvx-zt-roll .btn .rb'
	})


	// 信息公开细缆改变背景色
	$(".vw-inp-sub .cls .color").click(function(){
		var index = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur')
		var color = $(this).css('background-color');
		$(".vw-inp-tabls").css({
			backgroundColor:color
		})
	})
	// 信息公开细缆文字修改大小
	$(".vw-inp-sub .fsize .f-sel").click(function(){
		$(this).addClass('cur').siblings('span').removeClass('cur');
		var t = $(this).text();
		if(t == '小'){
			$(".vw-art-list .item").css({
				fontSize:12
			})
		}else if(t=='中'){
			$(".vw-art-list .item").css({
				fontSize:14
			})
		}else if(t=='大'){
			$(".vw-art-list .item").css({
				fontSize:18
			})
		}
	});




	var index = 0;
	var add = 0;
	var clearTime  = null;
	var len = 0;
	setTime();
	clearTime = setInterval(setTime,3000)
	$(".vvx-rs-btn .mtbs a").mouseenter(function(){

		$(this).addClass('cur').siblings().removeClass('cur');
		var index = $(this).index();
		$(this).parents(".vvx-rs-btn").siblings(".vvx-rs-list").children(".vvx-rs-item").eq(index).addClass('active').siblings(".vvx-rs-item").removeClass("active");
		
		
		clearInterval(clearTime)
		add = 0;
		setTime();

		clearTime = setInterval(setTime,3000)
	})
	
	
	function setTime(){
		len = $(".vvx-kbimg-itmes.active .vvx-know-bimg a").length-1;
		if(add>len) add = 0;
		if($(".vvx-kbimg-itmes").hasClass('active')){
			$(".vvx-kbimg-itmes.active").find(".vvx-know-bimg a").eq(add).fadeIn(500).siblings().fadeOut(100);
			$(".vvx-kbimg-itmes.active").find(".vvx-art-item").eq(add).show().siblings().hide();
			$(".vvx-kbimg-itmes.active").find(".vvx-know-btn p a").eq(add).addClass('cur').siblings().removeClass('cur');
		}
		add++;
	}
	$(document).on('mouseenter','.vvx-kbimg-itmes.active .vvx-know-btn p a',function(){
		add = $(this).index();
		clearInterval(clearTime)
		setTime();
		clearTime = setInterval(setTime,3000)
	})
	$(document).on('click',".vvx-kbimg-itmes.active .vvx-news-btn span.left",function(){
		clearInterval(clearTime)
		add = add - 2;
		if(add<0) add=len;
		setTime();
		clearTime = setInterval(setTime,3000)
	})
	$(document).on('click',".vvx-kbimg-itmes.active .vvx-news-btn span.right",function(){
		clearInterval(clearTime)
		// add++;
		if(add>len) add=0;
		setTime();
		clearTime = setInterval(setTime,3000)
	})
})