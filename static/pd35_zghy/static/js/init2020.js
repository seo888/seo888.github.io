function time_format(timestring){
	if(timestring.length < 19){return '';}
	if(timestring.length == 16){timestring += ':00'}
	var byTime = [365*24*60*60*1000,24*60*60*1000,60*60*1000,60*1000,1000];
	var unit = ["年","天","小时","分钟","秒钟"];
	var atime = new Date(timestring.replace(/-/g, '/'));
	var ct = new Date().getTime()-atime.getTime();
	if(ct < 0 || ct > byTime[1]){
		return timestring.substring(5,timestring.length - 9);
	}
	if(ct < byTime[3]){
		return '刚刚';
	}
	var sb = [];
	for(var i=0;i<byTime.length;i++){
		if(ct<byTime[i]){
			continue;
		}
		var temp = Math.floor(ct/byTime[i]);
		ct = ct % byTime[i];
		if(temp > 0){
			sb.push(temp+unit[i]);
		}

		if(sb.length>=1){
			break;
		}
	}
	return sb.join("")+"前";
}
function format_title(){
	$('.format_title').each(function(){
		if($(window).width() > 768){
			var word_num = parseInt($(this).attr('pcnum'));
		}else{
			var word_num = parseInt($(this).attr('mobilenum'));
		}
		var txt_length = parseInt($(this).text().length);
		$(this).text($(this).text().replace(/^[\s]+/,'').replace(/[\s]+$/,'').substring(0,word_num)+(txt_length > word_num ? '...' : ''));
	});
}
$().ready(function(){
	if ($('.article_main_content').size() > 0) {
		if ($('.article_main_content p').size() == 0 && $('.article_main_content').html().length > 0) {
			var article_content = '<p>'+$('.article_main_content').html()+'</p>';
			article_content = article_content.replace(/(<img\s[^>]+?>)/g,"</p><p>$1</p><p>");
			$('.article_main_content').html(article_content);
		}		
	}
	$('.simple_graph_tag .article_tags').each(function(){
		$(this).text($(this).text().substring(0,4));
	});
	$('.goto').click(function(){
		if($(this).attr('url')){
			location.href = $(this).attr('url');
		}
	});
	$('.simple_graph_tag').each(function(){
		if($(this).find('.article_tags').size() == 0){
			$(this).find('.tag_img3').remove();
		}
	});
	$('.share-section .wechat_share').click(function(){
		if($('.page_qrcode').hasClass('open')){
			$('.page_qrcode').removeClass('open');
		}else{
			$('.page_qrcode').addClass('open');
		}
	});
	if(location.href.indexOf('ch/') != -1){
		var tmp_url = location.href.match(/ch\/(.+)/);
		$('.menu-item').each(function(){
			if($(this).attr('for') == tmp_url[1]){
				$(this).addClass('curr');
			}
		});		
	}

	if ($(window).scrollTop() >= 50) { $('.backtotop').fadeIn(); } else { $('.backtotop').fadeOut(); }
	$('.source_format').each(function(){
		if(!$(this).html()){
			$(this).html('中国科技新闻网');
		}
	})
	$('.format_time').each(function(){
		if($(this).attr('timestring')){
			$(this).html(time_format($(this).attr('timestring')));
		}
	})
		$('.backtotop').click(function(){
			$('html,body').animate({ scrollTop: 0 }, 500);
		})
		$('.stock label').click(function(){
			if ($(this).attr('for')) {
				$('#stock_img').attr('src','http://image.sinajs.cn/newchart/daily/n/'+$(this).attr('for')+'.gif');
			}else{
				alert('即将推出,敬请期待');
			}
		});
		setInterval(function(){
			var now = new Date(),time_str = '';
			if(now.getHours() > 12){
				time_str += '下午';
			}else{
				time_str += '上午';
			}
			time_str += (now.getHours() >= 10 ? now.getHours() : '0'+now.getHours() )+':'+(now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes());
			$('.current-time .time').html(now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 '+time_str);
		},2000);
		
		$('.js-menu-toggle').click(function(){
			if($(this).hasClass('menu-open')){
				$(this).removeClass('menu-open');
				$('.site-header').removeClass('nav-open');
			}else{
				$(this).addClass('menu-open');
				$('.site-header').addClass('nav-open');
			}
		});
		if ($(window).width() <= 480) {
			$('.has-load-more .js-load-more').removeClass('hide');
			$('.has-load-more').each(function(){
				$(this).find('article').each(function(index){
					if (index > 2) {
						$(this).addClass('hide');
					}
				});
			});
			$('.has-load-more').each(function(){
				var _this = this;
				$(this).find('.js-load-more').click(function(){
					$(_this).find('article.hide').each(function(index){
						if(index < 3){
							$(this).removeClass('hide');
						}
					});
					if ($(_this).find('article.hide').size() == 0) {
						$(this).addClass('hide');
					}
				});
			});
		}
		$('.top_search').on('submit',function(event){
			if (!$('.top_search .resp_site_search').val()) {
				event.preventDefault();
			}
		});
		format_title();
		if($(window).width() >= 1264){
			$('.backtotop').css({'right':(($(window).width() - 1200)/2 - 74)+'px'});
		}
		$('.article-content p').each(function(){
			if($(this).find('img').size() > 0 || $(this).find('iframe').size() > 0){
				$(this).css({'text-indent':'0'});
			}
		});
		if ($('.init_vote').size() > 0) {
			var script = document.createElement('script');
			$(script).attr({'src':'https://res.zghy.org.cn/res/js/init_vote.js'});
			$('head').append(script);
		}
	});
	function auto_fix(){
		if($(window).width() < 768){return ;}
		$('.sidebar-primary').css({'min-height':'12px'});
		if($('.main-content').size() == 0 || $('.sidebar-primary').size() == 0 || $('.sidebar-secondary').size() == 0 ){return ;}
		if (!$('.main-content').attr('height') || $('.main-content').height() > parseInt($('.main-content').attr('height'))) {
			$('.main-content').attr({'height':$('.main-content').height()});
		}
		if (!$('.sidebar-primary').attr('height') || $('.sidebar-primary').height() > parseInt($('.sidebar-primary').attr('height'))) {
			$('.sidebar-primary').attr({'height':$('.sidebar-primary').height()});
		}
		if (!$('.sidebar-secondary').attr('height') || $('.sidebar-secondary').height() > parseInt($('.sidebar-secondary').attr('height'))) {
			$('.sidebar-secondary').attr({'height':$('.sidebar-secondary').height()});
		}
		var section_item = '.main-content',section_item_mid = '.sidebar-secondary';
		if (parseInt($('.sidebar-secondary').attr('height')) > parseInt($('.main-content').attr('height'))) {
			section_item = '.sidebar-secondary';
			section_item_mid = '.main-content';
		}

		$('.sticky-columns').height(parseInt($(section_item).attr('height'))+'px');

		if($(window).width() >= 768){

			if ($(window).scrollTop() + $(window).height() >= $('.page-content').position().top + parseInt($('.sidebar-primary').attr('height'))){
				if ($(window).scrollTop() + $(window).height() >= $('.page-content').position().top + parseInt($(section_item).attr('height'))){
					$('.sidebar-primary .sticky-region').removeClass('sticky-bottom').addClass('limit');
				}else{
					$('.sidebar-primary .sticky-region').removeClass('limit').addClass('sticky-bottom');
				}
			}else{
				$('.sidebar-primary .sticky-region').removeClass('sticky-bottom').removeClass('limit');
			}

			if ($(window).scrollTop() + $(window).height() >= $('.page-content').position().top + parseInt($(section_item_mid).attr('height'))){
				if ($(window).scrollTop() + $(window).height() >= $('.page-content').position().top + parseInt($(section_item).attr('height'))){
					$(section_item_mid + ' .sticky-region').removeClass('sticky-bottom').addClass('limit');
				}else{
					$(section_item_mid + ' .sticky-region').removeClass('limit').addClass('sticky-bottom');
				}
			}else{
				$(section_item_mid + ' .sticky-region').removeClass('limit').removeClass('sticky-bottom');
			}

			if ($(window).scrollTop() + $(window).height() >= $('.page-content').position().top + parseInt($(section_item).attr('height'))){
				$(section_item+' .sticky-region').addClass('limit');
			}else{
				$(section_item + ' .sticky-region').removeClass('limit');
			}

		}else{
			$('.main-content .sticky-region').removeClass('limit').removeClass('sticky-bottom');
			$('.sidebar-secondary .sticky-region').removeClass('limit').removeClass('sticky-bottom');
			$('.sidebar-primary .sticky-region').removeClass('limit').removeClass('sticky-bottom');
		}
	}
	$(window).load(function(){
			auto_fix();
			$(window).scroll(function(){ 
				if ($(window).scrollTop() >= 50) { $('.backtotop').fadeIn(); } else { $('.backtotop').fadeOut(); }
				auto_fix();
				if ($('.share-container').size() > 0) {
					if ($(window).scrollTop() >= $('.related_article_list').position().top || $(window).width() <= 768) { 
					$('.share-container').fadeOut(); } else { $('.share-container').fadeIn(); }	
				}
			});
	});
	if (location.href.indexOf('392349607155171328') == -1) {
		(function(){
		    var bp = document.createElement('script');
		    var curProtocol = window.location.protocol.split(':')[0];
		    if (curProtocol === 'https'){
		   bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
		  }
		  else{
		  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
		  }
		    var s = document.getElementsByTagName("script")[0];
		    s.parentNode.insertBefore(bp, s);
		})();		
	}