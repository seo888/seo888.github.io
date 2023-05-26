$(document).ready(function(){
	// tab
	jQuery('.vxz-cm_tab-tit p.select a').tabPanelFun({
		tabContent:'.vxz-tab-group',
		tabItem:'.vxz-tab-item',
		pra:true,
		pradom:'.vxz-cm_tab-tit',
		cur:'cur'
	});
	// 轮播
	jQuery(".vxz-ban-img a").simpleSwitch({
		text:'.vxz-ban-text p',
		prev:'.vxz-ban-btn .left',
		next:'.vxz-ban-btn .right'
	});
	// 首页大图渐变
	jQuery(".vxz-bigban-img a").SwitchFade({
		num:'.vxz-bigban-num .item',
		playTime:5500,
		time:1000
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
	})
})