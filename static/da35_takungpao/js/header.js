var tkpHeader = {
	parm:{
		url: window.location.href,
		title: document.title,
		w: $(window).width(),
		h: $(window).height(),
		langue: $('.setWebLangue')
	},
	isMobile:function(){
		return this.parm.w < 768 ? true : false;
	},
	isHK:function(){
		return this.parm.url.split('?')[0].indexOf('.hk') > -1 ? true : false;
	},
	setLangue:function(){
		if(this.isHK()){
			this.parm.langue.html('<a href="http://www.takungpao.com/" target="_blank" class="fanti" title="简体">简体</a>')
		}else{
			this.parm.langue.html('<a href="http://www.takungpao.com.hk/" target="_blank" class="fanti" title="香港站">香港站</a>')
		}
	},
	setSearch:function(){
		$('#tkp_search_txt').on('focus',function(){
			var val = $('#tkp_search_txt').val();
			$('#tkp_search_txt').css('color','#000');
			if(val=='输入搜索内容'){
				$('#tkp_search_txt').val('')
			}
		}).on('blur',function(){
			var val=$('#tkp_search_txt').val();
			$('#tkp_search_txt').css('color','#bdbdbd');
			if(val==''){
				$('#tkp_search_txt').val('输入搜索内容')
			}
		});
	},
	nav:function(){ //二级导航
		$('.nav_wrap .item').on('mouseover',function(){
			$(this).find('.subnav').show();
			$(this).find('.link').addClass('cur');
		});
		$('.nav_wrap .item').on('mouseleave',function(){
			$(this).find('.subnav').hide();
			$(this).find('.link').removeClass('cur');
		});
	},
	navInit:function(){
		var that = this;
		$('.nav_list .item .link').each(function(){
			if( that.parm.url.split('?')[0].indexOf( $(this).attr('href').replace('index.html','') ) > -1 ){ $(this).addClass('on');}
		});
		$('.ico_facebook').attr('href', "http://www.facebook.com/sharer.php?u=" + this.parm.url + "&t=" + this.parm.title);
		$('.ico_twitter').attr('href', "https://twitter.com/home/?status=" + this.parm.url + " " + this.parm.title);
	},
	navMobile:function(){ //移动端导航更多
		$('.mobile_more').on('click',function(){
			$('.nav_list').addClass('slidedown');
			$(this).hide();
			$('.mobile_slideup').show();
		});
		$('.mobile_slideup').on('click',function(){
			$('.nav_list').removeClass('slidedown');
			$(this).hide();
			$('.mobile_more').show();
		});
	},
	menu:function(){ //汉堡菜单
		var that = this;
		$('.btn_open_menu').on('click',function(){
			$('.header_wrap').addClass('fixed').css({'height':that.parm.h});
			$('.nav_wrap').css('height',that.parm.h-60);
			$('html,body').css({'overflow':'hidden','height':that.parm.h});
			$('.mobile_more,.mobile_slideup').hide();
		});	
		$('.btn_close_menu').on('click',function(){
			$('.header_wrap').removeClass('fixed').css('height','auto');
			$('.nav_wrap').css('height','auto');
			$('html,body').css({'overflow':'visible','height':'auto'});
			$('.nav_list').removeClass('slidedown');
			//$('.mobile_more').show();
		});
	},
	init:function(){
		this.setLangue();
		//this.setSearch();
		this.nav();
		this.navInit();
		//this.navMobile();
		this.menu();
	}
}

$(function(){
	tkpHeader.init();	
});