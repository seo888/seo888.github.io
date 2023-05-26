
var _fnsearch = {
	notload : false,
	keyWord: null,
	load_url:null,
	last_id:null,
	//下拉加载更多
	_loadmore: function(type) {
		if(_fnsearch.notload)return;
		_fnsearch.notload = true;
		$('.top_loading').show();
		if(_fnsearch.load_url == null)
			_fnsearch.load_url = '/load/search';
		$.get(_fnsearch.load_url, {
			type: type,
			keyWord: _fnsearch.keyWord,
			last_id: _fnsearch.last_id
			
		}, function(result) {
			var new_list = result.list;
			if(null == new_list ||
					new_list.length == 0){
				_fnsearch.notload = true;
				$('.qbnr').show();
				$('.top_loading').hide();
			}else{
				_fnsearch.notload = false;
				_fnsearch.last_id = result.data;
			}
			var str = '';
			for (var j = 0; j < new_list.length; j++) {
				var item = new_list[j];
				var comments = item.comments;
				var taghtml = '';
				var title = item.title;
				var author_img = item.author_img;
				var creatorid = item.creatorid;
				var author_name = item.author_name;
				var publictime = item.publictime_str;
				
				if(item.tag_list != null && item.tag_list.length > 0){
					for (var z = 0; z < item.tag_list.length; z++) {
						taghtml += '<a href="/search?keyWord='+item.tag_list[z].name+'" target="_blank" class="label-link"><span class="action-dislike">' + item.tag_list[z].name + '&nbsp;</span></a>';
					}
				}
				
				if(item.type == 1 && item.img_list != null && item.img_list.length > 0 && item.img_list.length < 3){
					var img = item.title_img;
					img = item.img_list[0];
					if(img != ''){
						str += '<li>';
						str	+=		'<div class="bui-box single-mode">';
						str	+=			'<div class="bui-left single-mode-lbox">';
						str	+=				'<a href="/item/'+item.id+'" target="_blank" class="img-wrap">';
						str	+=					'<img class="lazy-load-img" src="'+img+'" lazy="loaded" onerror="this.src=\'/static/img/default_image.jpg\'">';
						str	+=				'</a>';
						str	+=			'</div>';
						str	+=			'<div class="single-mode-rbox">';
						str	+=				'<div class="single-mode-rbox-inner">';
						str	+=					'<div class="title-box">';
						str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
						str	+=					'</div>';
						str	+=					'<div class="bui-box footer-bar" style="margin-top:20px">';
						str	+=						'<div class="bui-left footer-bar-left">';
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width:28px;height:28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + author_img + '"/></a>';
						}
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">' + author_name + '</a>';
						}
						if(null != publictime && '' != publictime){
							str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link"><span class="footer-bar-action search_fabu_time">' + publictime + '</span>';
						}
						if(null != comments && comments > 0){
							str	+=						'<span class="footer-bar-action search_fabu_commnet" style="margin-left: 25px;">&nbsp;';
							str	+=							'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
							str	+=							 comments;
							str	+=						'</span></a>';
						}
						str	+=						'</div>';
						str	+=					    '<div class="search_bui-right_load simple_graph_tag">';
						str	+=						     taghtml;
						str	+=					    '</div>';
						str	+=					'</div>';
						str	+=				'</div>';
						str	+=			'</div>';
						str	+=		'</div>';
						str	+=	'</li>';
					}else{
						str += '<li>';
						str	+=		'<div class="bui-box  single-mode_noimg" style="margin-top:10px;">';
						str	+=			'<div class="single-mode-rbox">';
						str	+=				'<div class="single-mode-rbox-inner" style="width:100%">';
						str	+=					'<div class="title-box">';
						str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
						str	+=					'</div>';
						str	+=					'<div class="bui-box footer-bar" style="style="margin-top:15px;position: relative;">';
						str	+=						'<div class="bui-left footer-bar-left">';
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width:28px;height:28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + author_img + '"/></a>';
						}
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">' + author_name + '</a>';
						}
						if(null != publictime && '' != publictime){
							str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link"><span class="footer-bar-action search_fabu_time">' + publictime + '</span>';
						}
						if(null != comments && comments > 0){
							str	+=						'<span class="footer-bar-action search_fabu_commnet" style="margin-left: 25px;">&nbsp;';
							str	+=							'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
							str	+=							 comments;
							str	+=						'</span></a>';
						}
						str	+=					        '<div class="search_bui-right_load">';
						str	+=						        taghtml;
						str	+=					        '</div>';
						str	+=						'</div>';
						str	+=					'</div>';
						str	+=				'</div>';
						str	+=			'</div>';
						str	+=		'</div>';
						str	+=	'</li>';
					}
				} else if(item.type == 1 && item.img_list == null || item.img_list.length == 0){
					str += '<li>';
					str	+=		'<div class="bui-box  single-mode_noimg" style="margin-top:10px;">';
					str	+=			'<div class="single-mode-rbox">';
					str	+=				'<div class="single-mode-rbox-inner" style="width:100%">';
					str	+=					'<div class="title-box">';
					str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
					str	+=					'</div>';
					str	+=					'<div class="bui-box footer-bar" style="margin-top:15px;position: relative;">';
					str	+=						'<div class="bui-left footer-bar-left">';
					if(null != creatorid && '' != creatorid){
						str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width:28px;height:28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + author_img + '"/></a>';
					}
					if(null != creatorid && '' != creatorid){
						str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">' + author_name + '</a>';
					}
					if(null != publictime && '' != publictime){
						str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link"><span class="footer-bar-action search_fabu_time">' + publictime + '</span>';
					}
					if(null != comments && comments > 0){
						str	+=						'<span class="footer-bar-action search_fabu_commnet" style="margin-left: 25px;">&nbsp;';
						str	+=							'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
						str	+=							 comments;
						str	+=						'</span></a>';
					}
					str	+=					        '<div class="search_bui-right_load">';
					str	+=						        taghtml;
					str	+=					        '</div>';
					str	+=						'</div>';
					str	+=					'</div>';
					str	+=				'</div>';
					str	+=			'</div>';
					str	+=		'</div>';
					str	+=	'</li>';
				} else if(item.type == 2 || (item.type == 1 && item.img_list != null && item.img_list.length > 0 && item.img_list.length >= 3)){
					var img_list_html = '';
					for (var i = 0; i < item.img_list.length; i++) {
						if(i < 4){
							var img = item.img_list[i];
							img_list_html += '<a href="/item/'+item.id+'" target="_blank" class="img-wrap img-item">';
							img_list_html +=	'<img class="lazy"  src="'+img+'" onerror="this.src=\'/static/img/default_image.jpg\'">';
							img_list_html += '</a>';
							if(i == 2 &&
									item.img_list.length == 3){
								img_list_html += '<a href="/item/'+item.id+'" target="_blank" class="img-wrap img-item">'
								img_list_html +=	'<span class="more-info">查看详情&nbsp;<i class="bui-icon icon-nextpagetool" style="font-size: 12px; color: rgb(64, 101, 153);"></i></span>'
								img_list_html += '</a>';
							}
						}
					}
					
					str += '<li>';
					str +=		'<div class="more-mode">';
					str +=			'<div class="title-box">';
					str +=				'<a href="/item/'+item.id+'" target="_blank" class="link">'+title+'</a>';
					str +=			'</div>';
					str +=			'<div class="bui-box img-list">';
					str +=				img_list_html;
					str +=			'</div>';
					str +=			'<div class="bui-box footer-bar" style="margin-top:5px;position: relative;">';
					str +=				'<div class="bui-left footer-bar-left">';
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar">';
						str +=					'<img style="width:28px;height:28px;" class="lazy" onerror="this.src=\'/static/img/user_img.png\'" src="'+author_img+'" >';
						str +=				'</a>';
					}
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">'+author_name+'</a>';
					}
					if(null != publictime && '' != publictime){
						str +=				'<a href="/item/'+item.id+'" target="_blank" class="link"><span class="footer-bar-action ">'+publictime+'</span>';
					}
					if(null != comments && comments > 0){
						str +=				'<span class="footer-bar-action search_fabu_commnet" style="margin-left: 25px;">';
						str +=					'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon">&nbsp;';
						str +=					comments;
						str +=				'</span></a>';
					}
					str +=				    '<div class="search_bui-right_load">';
					str +=					    taghtml;
					str +=				    '</div>';
					str +=				'</div>';
					str +=			'</div>';
					str +=		'</div>';
					str +=	'</li>';
					
				}else if(item.type == 3){
					str +=	'<li>';
					str +=		'<div class="bui-box video-mode">';
					str +=			'<div class="bui-left video-mode-lbox">';
					str +=				'<div  class="player mini-btn-visible transitionable" style="width:270px; height:200px;">';
					str +=					'<div class="before" data-id="'+item.id+'" data-src="'+item.video_url+'">';
					str +=						'<img alt="'+item.title+'" src="'+item.title_img+'" onerror="this.src=\'/static/img/default_image.jpg\'" style="width:100%;height:100%">';
					str +=						'<span class="play-btn">';
					str +=							'<img src="/static/img/video/play.png" style="width:100%;height:100%"/>';
					str +=						'</span>';
					str +=						'<span class="duration">';
					str +=							'<img src="/static/img/video/play_small.png" style="width:15px;height:15px;margin-bottom: 4px;margin-right: 5px;"/><em>'+item.video_length_str+'</em>';
					str +=						'</span>';
					str +=					'</div>';
					str +=					'<div calss="videoInner"></div>';
					str +=				'</div>';
					str +=			'</div>';
					str +=			'<div class="video-mode-rbox">';
					str +=				'<div class="title-box">';
					str +=					'<a href="/item/'+item.id+'" target="_blank" class="link">';
					str +=						title;
					str +=					'</a>';
					str +=				'</div>';
					str +=				'<div class="bui-box footer-bar" style="margin-top:5px;position: relative;">';
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar">';
						str +=					'<img style="width: 28px;height:28px;" alt="'+author_name+'" onerror="this.src=\'/static/img/user_img.png\'" src="'+author_img+'"/>';
						str +=				'</a>';
					}
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">'+author_name+'</a>';
					}
					str +=					'<span class="footer-bar-action"></span>';
					str +=				'</div>';
					str +=				taghtml;
					str +=			'</div>';
					str +=		'</div>';
					str +=	'</li>';
				}
				//加载广告内容
				if(null != item.ad_id && "" != item.ad_id){
					str += '<li data-ad_id="'+item.ad_id+'" name="ad"> ';
					if(item.ad_type == 0){
						str += '<div class="bui-box single-mode">';
						str += '	<div class="bui-left single-mode-lbox">';
						str += '		<a href="'+item.ad_url+'" target="_blank" class="img-wrap">';
						str += '			<img class="lazy-load-img" src="'+item.ad_image+'">';
						str += '		</a>';
						str += '	</div>';
						str += '	<div class="single-mode-rbox">';
						str += '		<div class="single-mode-rbox-inner">';
						str += '			<div class="title-box">';
						str += '				<a href="'+item.ad_url+'" target="_blank" class="link">'+item.ad_title+'</a>';
						str += '			</div>';
						str += '			<div class="bui-box footer-bar" style="margin-top: 20px;">';
						str += '				<div class="bui-left footer-bar-left">';
						str += '					<a href="/search?keyWord='+item.ad_keywords+'" class="footer-bar-action media-avatar avatar-style-1">'+item.ad_keywords.substring(0,1)+'</a>';
				     	str += '					<a href="/search?keyWord='+item.ad_keywords+'" target="_blank" class="footer-bar-action source">&nbsp;'+item.ad_keywords+'&nbsp;⋅</a>';
				     	str += '					<span class="footer-bar-action">&nbsp;'+item.ad_time+'</span>';
				     	str += '					<a target="_blank" href="javascript:void(0);" class="footer-bar-action ad">广告</a>';
				     	str += '				</div>';
				     	str += '			</div>';
				     	str += '		</div>';
				     	str += '	</div>';
				     	str += '</div>';
					}else{
						str += '<div class="more-mode">';
						str += '	<div class="title-box">';
						str += '		<a href="'+item.ad_url+'" target="_blank" class="link">'+item.ad_title+'</a>';
						str += '	</div>';
						str += '	<div  class="bui-box img-list">';
						var adImage = item.ad_image.split(";");
						for(var i = 0; i < adImage.length; i++){
							str += '		<a href="${item.ad_url}" target="_blank" class="img-wrap img-item">';
							str += '			<img class="lazy-load-img" src="'+adImage[i]+'">';
							str += '		</a>';
							if(i == 2 && adImage.length == 3){
								str += '	<a href="${item.ad_url}" target="_blank" class="img-wrap img-item">';
								str += '		<span class="more-info">查看详情&nbsp;';
								str += '			<i class="bui-icon icon-nextpagetool" style="font-size: 12px; color: rgb(64, 101, 153);"></i>';
								str += '		</span>';
								str += '	</a>';
							}
						}
				     	str += '	</div>';
				     	str += '	<div class="bui-box footer-bar" style="margin-top: 20px;">';
				     	str += '		<div class="bui-left footer-bar-left">';
				     	str += '			<a href="/search?keyWord='+item.ad_keywords+'" class="footer-bar-action media-avatar avatar-style-2">'+item.ad_keywords.substring(0,1)+'</a>';
				     	str += '			<a href="/search?keyWord='+item.ad_keywords+'" target="_blank" class="footer-bar-action source">&nbsp;'+item.ad_keywords+'&nbsp;⋅</a> ';
				     	str += '			<span class="footer-bar-action">&nbsp;'+item.ad_time+'</span>';
				     	str += '			<a target="_blank" href="javascript:void(0);" class="footer-bar-action ad">广告</a>';
				     	str += '		</div>';
				     	str += '	</div>';
				     	str += '</div>';
					}
					str += '</li>';
				}
			}
			$('#news_list_left').append(str);
		})
	}
};

function goTop() {
    var speed=1000;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;
};
