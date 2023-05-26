$(document).ready(function(){
	//加载通栏广告
	var tlAdvUrl = 'http://zzhz.zjol.com.cn/material/public-resource/adv/advertise.js?v='+Math.random();
	$.getScript(tlAdvUrl,function(){
		addAdv(advertising)
	})
	function addAdv(data){
		$.each(data, function(key) {
			switch (key){
				case "fullpage":
					insertAdv('.fullpage_adv',data[key])
					hightAdv('.fullpage_adv')
					aotuHideAdv('.fullpage_adv')
					break;
				case "top":
					insertAdv('.top_adv',data[key])
					break;
				case "nav":
					insertAdv('.nav_adv',data[key])
					break;
				case "first":
					insertAdv('.first_adv',data[key])
					break;
				case "second":
					insertAdv('.second_adv',data[key])
					break;
				case "third":
					insertAdv('.third_adv',data[key])
					break;
				case "forth":
					insertAdv('.forth_adv',data[key])
					break;
				case "couplet":
					insertDoubbleAdv(data[key])
					break;
				case "news":
					insertNewsAdv(data[key])
					break;
				case "article":
					insertAdv('.article_adv',data[key])
					break;
				case "A_right":
					insertRAdv(data[key])
					break;	
				default:
					break;
			}
		});
	}
	
	function insertAdv(k,arr){
		var str = '';
		if(arr.length == 0){
			$(k).hide()
		}else{
			for (var i = 0; i < arr.length; i++) {
				str += '<div class="adv"><a href="'
				+ arr[i].links +'" target="_blank"><img src="'
				+arr[i].img +'"></a><i class="icon icon-close"></i><i class="icon icon-watermark"></i></div>'
			}
			$(k).html(str)
		}
		for (var i = 0; i < $(k).find('.adv').length; i++) {
			$(k).find('.icon-close').eq(i).on('click',function(e){
				e.preventDefault()
				$(this).parent().hide()
			})
		}
	}
		
	function insertDoubbleAdv(arr){
		var str = '';
		if (arr.length == 0) {
			return
		}else if($('.mian-content')){
			return
		} else{
			for (var i = 0; i < arr.length; i++) {
				str += '<div class="advl"><a href="'
				+ arr[i].links +'" target="_blank"><img src="'
				+arr[i].img +'"></a><i class="icon icon-close"></i><i class="icon icon-watermark"></i></div>'
			}
			$('<div class="duilianL"></div>').html(str).appendTo($('body'))
			$('<div class="duilianR"></div>').html(str).appendTo($('body'))
		}
		for (var i = 0; i < $('.advl').length; i++) {
			$('.advl').eq(i).on('click',function(){
				$('.duilianL,.duilianR').hide()
			})
		}
	}
	
	function insertNewsAdv(arr){
		if (arr.length == 0) {
			return
		}else{
			for (var i = 0; i < 2; i++) {
        if (arr[i] === undefined) continue;
				var str = '<div class="advs"><a href="'
				+ arr[i].links +'" target="_blank"><img src="'
				+arr[i].img +'"></a><i class="icon icon-close"></i><i class="icon icon-watermark"></i></div>'
				$('.sm-adv').eq(i).html(str)
			}
		}
		for (var i = 0; i < 2; i++) {
      if (arr[i] === undefined) continue;
			$('.advs').eq(i).find('.icon-close').on('click',function(){
				$(this).parent().hide()
			})
		}
	}
	
	function insertRAdv(arr){
		var str = ''
		if (arr.length == 0) {
			$('.r_adv').hide()
			return
		} else{
			for (var i = 0; i < arr.length; i++) {
				str += '<div class="advr"><a href="'
				+ arr[i].links +'" target="_blank"><img src="'
				+arr[i].img +'"></a><i class="icon icon-close"></i><i class="icon icon-watermark"></i></div>'
			}
			$('.r_adv').html(str)
		}
		for (var i = 0; i < $('.advr').length; i++) {
			$('.advr').eq(i).find('.icon-close').on('click',function(e){
				e.preventDefault()
				$(this).parent().hide()
			})
		}
	}
	
	function aotuHideAdv(ele){
		setTimeout(function(){
			$(ele).slideUp(600)
		},5000)
	}
	
	function hightAdv(ele){
		$(ele).find('.adv>a>img').css('max-height','500px')
	}
})