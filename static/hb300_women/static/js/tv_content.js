window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"32"},"share":{}};

jQuery(function(){
	$('.fplayer').css({height:'480px'});
	$('.fx').css({height:'44px',padding:'16px 30px'}).html('<div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_xinhua" data-cmd="xinhua" title="分享到新华微博"></a><a href="#" class="bds_people" data-cmd="people" title="分享到人民微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tqf" data-cmd="tqf" title="分享到腾讯朋友"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_kaixin001" data-cmd="kaixin001" title="分享到开心网"></a><a href="#" class="bds_ty" data-cmd="ty" title="分享到天涯社区"></a><a href="#" class="bds_twi" data-cmd="twi" title="分享到Twitter"></a><a href="#" class="bds_fbook" data-cmd="fbook" title="分享到Facebook"></a><a href="#" class="bds_copy" data-cmd="copy" title="分享到复制网址"></a></div>');
	$.getScript('http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5));
	
	if($('#fplaylist').length > 0){
		// 初始化播放列表
		var fplayer_list_div, fplayer_id, fplayer_list_this, fplayer_list_prev, fplayer_list_this_num;
		fplayer_list_div = jQuery('#fplaylist');
		fplayer_list = jQuery('.fplist', fplayer_list_div);
		fplayer_url = self.location.href.toString();
		fplayer_id = fplayer_url.replace(/^.*?content_(\d+)[^d].*?$/, '$1');
		fplayer_list_this = false;
		fplayer_list_prev = false;
		fplayer_list_this_num = 0;
		fplayer_list.each(function(i){
			var fplayer_item_url, fplayer_item_id;
			fplayer_item_url = jQuery(this).find('a').attr('href');	
			if(i == 0){
				fplayer_next_url = fplayer_item_url;
			}
			if(fplayer_list_this){
				fplayer_next_url = fplayer_item_url;
				fplayer_list_this = false;
			}
			fplayer_item_id = fplayer_item_url.replace(/^.*?content_(\d+)[^d].*?$/, '$1');
			if(fplayer_item_id == fplayer_id){
				jQuery(this).css('background-color', '#060606');
				fplayer_list_this = true;
				fplayer_list_prev = true;
				fplayer_list_this_num = i;
			}
			
			if(!fplayer_list_prev){
				fplayer_prev_url = fplayer_item_url;
			}	
		})
		
		if(fplayer_list.length > 1){
			fplayer_stop_goto = true;
		}
		
		if(fplayer_list_this_num > 2){
			fplayer_list_div.scrollTop((fplayer_list_this_num - 2) * 96);
		}
	}
	
	if($('#isplaylist').length > 0){
		fplayer_is_list = $('#isplaylist');		
		function set_fplayer_is(){
			if(fplayer_is == 1){
				fplayer_is_list.removeClass('isplaylist');
				fplayer_is_list.attr('title', '现在是顺序播放，点击单曲循环。');
			}else{
				fplayer_is_list.addClass('isplaylist');
				fplayer_is_list.attr('title', '现在是单曲循环，点击顺序播放。');
			}
		}
		var fplayer_is_cookie = fpcookie('fp_is');
		fplayer_is = (fplayer_is_cookie == 2) ? fplayer_is_cookie : 1;
		set_fplayer_is();
		fplayer_is_list.click(function(){
			fplayer_is = (fplayer_is == 2) ? 1 : 2;
			set_fplayer_is();
			fpcookie('fp_is', fplayer_is);
		})
	}
	
	
	if(__$contentid){
		$('.tvinfo').eq(0).prev().prepend('<span class="hot avote bvote" vote="1" title="这个视频很不错">0</span>')
		$.getScript('http://app.fj01.cn/vote/vote_js.php?vid='+__$contentid, function(){
			
		})
	}
})


function fpcookie(name, value){
	if(typeof name == 'string' && name.length > 0){
		name = fptrim(name);		
		if(typeof value == 'undefined'){
			value = '';
			var search, start, end;
			search = name + '=';
			if(document.cookie.length > 0){
				start = document.cookie.indexOf(search);
				if (start != -1){
					start += search.length;
					end = document.cookie.indexOf(';', start);
					if (end == -1){
						end = document.cookie.length;
					}
					value = unescape(document.cookie.substring(start, end));
				}
			}
			return value;
		}else{
			var expdate = new Date();
			expdate.setTime(expdate.getTime() + (30 * 24 * 3600 * 1000));
			document.cookie = name + '=' + escape(value) + ';expires=' + expdate.toGMTString() + ';domain=fjsen.com; path=/; ';
		}
	}
}