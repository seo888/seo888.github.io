
var _fn = {
	page : 2,
	notload : false,
	sign: null,
	laod_url:null,
	last_id: null,
	//下拉加载更多
	_loadmore: function(type) {
		if(_fn.notload){
			return;
		}
		_fn.notload = true;
		$('.top_loading').show();
		
		if(!type){
			_fn.laod_url = '/load/recommend/news';
		}
		
		if(_fn.laod_url == null)
			_fn.laod_url = '/load/news';
		
		$.get(_fn.laod_url, {
			page: _fn.page,
			type: type,
			sign: _fn.sign,
			last_id: _fn.last_id
			
		}, function(result) {
			_fn.page = _fn.page + 1; 
			var new_list = result.list;
			
			if(null == new_list ||
					new_list.length == 0 ||
					null == result.data){
				$('.more-btn').fadeOut();
				_fn.notload = true;
				$('.qbnr').show();
				$('.top_loading').hide();
			}else{
				_fn.notload = false;
				_fn.last_id = result.data;
			}
			var str = '';
			for (var j = 0; j < new_list.length; j++) {
				var item = new_list[j];
				if($('#list-item-'+item.id).size() > 0){continue;}
				var comments = item.comments;
				var taghtml = '';
				var title = item.title;
				var author_img = item.author_img;
				var creatorid = item.creatorid;
				var author_name = item.author_name;
				var publictime = item.publictime;
				var onerror='onerror="this.src=\'/static/img/default_image.jpg\'"';
				if(item.tag_list != null && item.tag_list.length > 0){
					for (var z = 0; z < item.tag_list.length; z++) {
						taghtml += '<span class="article_tags">' + item.tag_list[z].name + '</span>';
					}
				}
				if(item.type == 1 && item.img_list != null && item.img_list.length > 0 && item.img_list.length < 3){
					var img = item.title_img;
					img = item.img_list[0];
					if(img != ''){
						str += '<li id="list-item-'+item.id+'">';
						str	+=		'<div class="bui-box single-mode">';
						str	+=			'<div class="bui-left single-mode-lbox">';
						str	+=				'<a href="/item/'+item.id+'" target="_blank" class="img-wrap">';
						str	+=					'<img class="lazy-load-img" src="'+img.replace('res/','').replace(/\.(png|jpg)/,'_193x-.$1')+'" lazy="loaded" '+ onerror +'>';
						str	+=				'</a>';
						str	+=			'</div>';
						str	+=			'<div class="single-mode-rbox">';
						str	+=				'';
						str	+=					'<div class="title-box" title=" '+ title +' ">';
						str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
						str	+=					'</div>';
						str +=                  '<div class="desc-box format_title" pcnum="60" mobilenum="40">' + item.desc+'</div>';
						str	+=					'<div class="bui-box footer-bar">';
						str	+=						'<div class="bui-left footer-bar-left">';
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width: 28px;height: 28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + (author_img ? author_img : '/static/img/user_img.png') + '"/></a>';
						}
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target= "_blank" class="footer-bar-action source">&nbsp;' + author_name + '</a>';
						}
						if(null != item.publictime_str && '' != item.publictime_str){
							str +=                          '<span class="footer-bar-action">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + item.publictime_str + '</span>';
						}
						if(null != comments && comments > 0){
							str	+=						'<a href="/item/'+item.id+'#comment" target="_blank" class="link">';
							str	+=						'<span class="footer-bar-action comment_section">&nbsp;';
							str	+=							'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
							str	+=							 comments;
							str	+=						'</span></a>';
						}
						str	+=						'</div>';
						str	+=					'</div>';
						str	+=					'<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+':00</div>';
						str	+=				'';
						str	+=			'</div>';
						str	+=		'</div>';
						str	+=	'</li>';
					} else {
						str += '<li>';
						str	+=		'<div class="bui-box single-mode_noimg">';
						str	+=			'<div class="single-mode-rbox">';
						str	+=				'';
						str	+=					'<div class="title-box" title=" '+ title +' ">';
						str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
						str	+=					'</div>';
						str +=                  '<div class="desc-box format_title" pcnum="60" mobilenum="40">' + item.desc+'</div>';
						str	+=					'<div class="bui-box footer-bar">';
						str	+=						'<div class="bui-left footer-bar-left">';
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width: 28px;height: 28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + (author_img ? author_img : '/static/img/user_img.png') + '"/></a>';
						}
						if(null != creatorid && '' != creatorid){
							str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">&nbsp;' + author_name + '</a>';
						}
						if(null != item.publictime_str && '' != item.publictime_str){
							str +=                          '<span class="footer-bar-action">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + item.publictime_str + '</span>';
						}
						if(null != comments && comments > 0){
							str	+=						'<a href="/item/'+item.id+'#comment" target="_blank" class="link">';
							str	+=						'<span class="footer-bar-action comment_section">&nbsp;';
							str	+=							'<img src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
							str	+=							 comments;
							str	+=						'</span></a>';
						}
						str	+=						'</div>';
						str	+=					     '<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+':00</div>';
						str	+=					'</div>';
						str	+=				'';
						str	+=			'</div>';
						str	+=		'</div>';
						str	+=	'</li>';
					}
				} else if(item.type == 1 && item.img_list == null || item.img_list.length == 0) {
					str += '<li>';
					str	+=		'<div class="bui-box single-mode_noimg">';
					str	+=			'<div class="single-mode-rbox">';
					str	+=				'';
					str	+=					'<div class="title-box" title=" '+ title +' ">';
					str	+=						'<a href="/item/'+item.id+'" target="_blank" class="link">' + title + '</a>';
					str	+=					'</div>';
					str +=                  '<div class="desc-box format_title" pcnum="60" mobilenum="40">' + item.desc+'</div>';
					str	+=					'<div class="bui-box footer-bar">';
					str	+=						'<div class="bui-left footer-bar-left">';
					if(null != creatorid && '' != creatorid){
						str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar avatar-style-5"><img style="width: 28px;height: 28px;" onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="' + (author_img ? author_img : '/static/img/user_img.png') + '"/></a>';
					}
					if(null != creatorid && '' != creatorid){
						str	+=						'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">&nbsp;' + author_name + '</a>';
					}
					if(null != item.publictime_str && '' != item.publictime_str){
						str +=                          '<span class="footer-bar-action">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + item.publictime_str + '</span>';
					}
					if(null != comments && comments > 0){
						str	+=						'<a href="/item/'+item.id+'#comment" target="_blank" class="link">';
						str	+=						'<span class="footer-bar-action comment_section">&nbsp;';
						str	+=							'<img src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
						str	+=							 comments;
						str	+=						'</span></a>';
					}
					str	+=						'</div>';
					str	+=					     '<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+':00</div>';
					str	+=					'</div>';
					str	+=				'';
					str	+=			'</div>';
					str	+=		'</div>';
					str	+=	'</li>';
				} else if(item.type == 2 || (item.type == 1 && item.img_list != null && item.img_list.length > 0 && item.img_list.length >= 3)){
					var img_list_html = '';
					for (var i = 0; i < item.img_list.length; i++) {
						if(i < 4){
							var img = item.img_list[i];
							img_list_html += '<a href="/item/'+item.id+'" target="_blank" class="img-wrap img-item">';
							img_list_html +=	'<img class="lazy" src="'+img+'" '+ onerror +'>';
							img_list_html += '</a>';
							if(i == 2 &&
									item.img_list.length == 3){
								img_list_html += '<a href="/item/'+item.id+'" target="_blank" class="img-wrap img-item">'
								img_list_html +=	'<span class="more-info">查看更多&nbsp;<i class="bui-icon icon-nextpagetool" style="font-size: 12px; color: rgb(64, 101, 153);"></i></span>'
								img_list_html += '</a>';
							}
						}
					}
					
					str += '<li>';
					str +=		'<div class="more-mode">';
					str +=			'<div class="title-box" title=" '+ title +' ">';
					str +=				'<a href="/item/'+item.id+'" target="_blank"  class="link">'+title+'</a>';
					str +=			'</div>';
					str +=			'<div class="bui-box img-list">';
					str +=				img_list_html;
					str +=			'</div>';str +=			'<div class="bui-box footer-bar" style="position:relative;">';
					str +=				'<div class="bui-left footer-bar-left">';
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar">';
						str +=					'<img style="width:28px;height:28px;" class="lazy" onerror="this.src=\'/static/img/user_img.png\'" src="'+(author_img ? author_img : '/static/img/user_img.png')+'" >';
						str +=				'</a>';
					}
					if(null != creatorid && '' != creatorid){
						str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">&nbsp;'+author_name+'</a>';
					}
					if(null != item.publictime_str && '' != item.publictime_str){
						str +=                  '<span class="footer-bar-action">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.publictime_str+'</span>';
					}
					if(null != comments && comments > 0){
						str +=				'<a href="/item/'+item.id+'#comment" target="_blank"  class="link">';
						str +=				'<span class="footer-bar-action comment_section">&nbsp;';
						str +=					'<img  src="/static/img/share/pinglun_icon.png" class="pinglun_icon" >&nbsp;';
						str +=					comments;
						str +=				'</span></a>';
					}
					str +=				'</div>';
					str +=				'<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+':00</div>';
					str +=			'</div>';
					str +=		'</div>';
					str +=	'</li>';
					
				}else if(item.type == 3){
					if(_fn.sign == 'video'){
						str +=	'<li class="item">';
						str +=		'<div class="item-inner y-box">';
						str +=			'<div class="normal rbox ">';
						str +=				'<div class="rbox-inner">';
						str +=					'<div class="title-box" title=" '+ title +' ">';
						str +=						'<a class="link title" target="_blank" href="/item/'+item.id+'" title=" '+ item.title +' ">';
						str +=							item.title ;
						str +=						'</a>';
						str +=					'</div>';
						str +=					'<div class="y-box footer">';
						str +=						'<div class="y-left">';
						str +=							'<div class="y-left">';
						if(null != creatorid && '' != creatorid){
							str +=							'<a class="lbtn media-avatar" target="_blank" href="/item/'+item.id+'">'; 
							str +=								'<img onerror="this.src=\'/static/img/user_img.png\'" alt="'+author_name+'" src="'+(author_img ? author_img : '/static/img/user_img.png')+'">';
							str +=							'</a> ';
						}
						if(null != creatorid && '' != creatorid){
							str +=							'<span class="lbtn source">&nbsp;'+author_name+'</span>';
						}
						str +=							'</div>';
						if(null != item.publictime_str && '' != item.publictime_str){
							str +=							'<span class="lbtn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.publictime_str+'</span>';
						}
						str +=							'<span class="lbtn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0</span>';
						str +=							'<span class="lbtn">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10</span>';
						str +=						'</div>';
						str +=					'</div>';
						str +=					'<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+':00</div>';
						str +=				'</div>';
						str +=			'</div>';
						str +=			'<div class="lbox">';
						str +=				'<a class="img-wrap" target="_blank" href="/item/'+item.id+'">';
						str +=					'<img alt="'+item.title+'" src="'+item.title_img+'" style="height: 100%; width: 100%"> ';
						str +=					'<i class="ftype video">';
						str +=						'<span>'+item.video_length_str+'</span>';
						str +=					'</i>';
						str +=				'</a>';
						str +=			'</div>';
						str +=			'<div style="clear: both;"></div>';
						str +=		'</div>';
						str +=	'</li>';
					}else{
						str +=	'<li>';
						str +=		'<div class="bui-box video-mode">';
						str +=			'<div class="bui-left video-mode-lbox">';
						str +=				'<div  class="player mini-btn-visible transitionable" style="width:270px; height:200px;">';
						str +=					'<div class="before" data-id="'+item.id+'" data-src="'+item.video_url+'">';
						str +=						'<img alt="'+item.title+'" src="'+item.title_img+'" style="width:100%;height:100%">';
						str +=						'<span class="play-btn">';
						str +=							'<img src="/static/img/video/play.png" style="width:100%;height:100%"/>';
						str +=						'</span>';
						str +=						'<span class="duration" style="bottom:13px;">';
						str +=							'<img src="/static/img/video/play_small.png" style="width:15px;height:15px;margin-bottom: 4px;margin-right: 5px;"/><em>'+item.video_length_str+'</em>';
						str +=						'</span>';
						str +=					'</div>';
						str +=					'<div calss="videoInner"></div>';
						str +=				'</div>';
						str +=			'</div>';
						str +=			'<div class="video-mode-rbox">';
						str +=				'<div class="title-box" title=" '+ title +' ">';
						str +=					'<a href="/item/'+item.id+'" target="_blank" class="link">';
						str +=						title;
						str +=					'</a>';
						str +=				'</div>';
						str +=				'<div class="bui-box footer-bar">';
						if(null != creatorid && '' != creatorid){
							str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action media-avatar">';
							str +=					'<img style="width: 28px;height: 28px;" alt="'+author_name+'" onerror="this.src=\'/static/img/user_img.png\'" src="'+(author_img ? author_img : '/static/img/user_img.png')+'"/>';
							str +=				'</a>';
						}
						if(null != creatorid && '' != creatorid){
							str +=				'<a href="/zhuanlan/'+item.creatorid+'" target="_blank" class="footer-bar-action source">'+author_name+'</a>';
						}
						str +=					'<span class="footer-bar-action"></span>';
						str +=				'</div>';
						str +=				'<div class="article_time format_time" timestring="'+item.publictime+':00">'+item.publictime+'</div>';
						str +=			'</div>';
						str +=		'</div>';
						str +=	'</li>';
					}
				}else if(item.type == 4){
					//加载广告内容
					str += '<li data-ad_id="'+item._id+'" name="ad"> ';
					if(item.img_list.length == 1){
						str += '<div class="bui-box single-mode">';
						str += '	<div class="bui-left single-mode-lbox">';
						str += '		<a href="'+item.ad_url+'" target="_blank" class="img-wrap">';
						str += '			<img class="lazy-load-img" src="'+item.img_list[0]+'">';
						str += '		</a>';
						str += '	</div>';
						str += '	<div class="single-mode-rbox">';
						str += '		<div class="single-mode-rbox-inner">';
						str += '			<div class="title-box">';
						str += '				<a href="'+item.ad_url+'" target="_blank" class="link">'+item.title+'</a>';
						str += '			</div>';
						str += '			<div class="bui-box footer-bar">';
						str += '				<div class="bui-left footer-bar-left add_new_list">';
						var astyle = "";
						if(j % 4 == 0){
							astyle = "ad-style-0";
						}else if(j % 4 == 1){
							astyle = "ad-style-1";
						}else if(j % 4 == 2){
							astyle = "ad-style-2";
						}else if(j % 4 == 3){
							astyle = "ad-style-3";
						}
						str += '					<a href="/search?keyWord='+item.author_name+'" class="footer-bar-action media-avatar '+astyle+'">'+item.author_name.substring(0,1)+'</a>';
				     	str += '					<a href="/search?keyWord='+item.author_name+'" target="_blank" class="footer-bar-action source">'+item.author_name+'</a>';
				     	//str += '					<span class="footer-bar-action adv_left">'+item.publictime_str+'</span>';
				     	str += '					<a target="_blank" href="javascript:void(0);" class="footer-bar-action ad adv_left">广告</a>';
				     	str += '				</div>';
				     	str += '			</div>';
				     	str += '		</div>';
				     	str += '	</div>';
				     	str += '</div>';
					}else{
						str += '<div class="more-mode">';
						str += '	<div class="title-box">';
						str += '		<a href="'+item.ad_url+'" target="_blank" class="link">'+item.title+'</a>';
						str += '	</div>';
						str += '	<div  class="bui-box img-list">';
						for(var i = 0; i <  item.img_list.length; i++){
							str += '		<a href="'+item.ad_url+'" target="_blank" class="img-wrap img-item">';
							str += '			<img class="lazy-load-img" src="'+ item.img_list[i]+'">';
							str += '		</a>';
							if(i == 2 && item.img_list.length.length == 3){
								str += '	<a href="'+item.ad_url+'" target="_blank" class="img-wrap img-item">';
								str += '		<span class="more-info">查看更多&nbsp;';
								str += '			<i class="bui-icon icon-nextpagetool" style="font-size: 12px; color: rgb(64, 101, 153);"></i>';
								str += '		</span>';
								str += '	</a>';
							}
						}
				     	str += '	</div>';
				     	str += '	<div class="bui-box footer-bar">';
				     	str += '		<div class="bui-left footer-bar-left">';
				     	var astyle = "";
						if(j % 4 == 0){
							astyle = "ad-style-0";
						}else if(j % 4 == 1){
							astyle = "ad-style-1";
						}else if(j % 4 == 2){
							astyle = "ad-style-2";
						}else if(j % 4 == 3){
							astyle = "ad-style-3";
						}
				     	str += '			<a href="/search?keyWord='+item.author_name+'" class="footer-bar-action media-avatar '+astyle+'">'+item.author_name.substring(0,1)+'</a>';
				     	str += '			<a href="/search?keyWord='+item.author_name+'" target="_blank" class="footer-bar-action source">'+item.author_name+'</a> ';
//				     	str += '			<span class="footer-bar-action adv_left">'+item.publictime_str+'</span>';
				     	str += '			<a target="_blank" href="javascript:void(0);" class="footer-bar-action ad adv_left">广告</a>';
				     	str += '		</div>';
				     	str += '	</div>';
				     	str += '</div>';
					}
					str += '</li>';
				}
				
			}
			//console.log(str)
			$('#news_list_left').append(str);
			$('.format_title').each(function(){
				if($(window).width() > 768){
					var word_num = $(this).attr('pcnum');
				}else{
					var word_num = $(this).attr('mobilenum');
				}
				var txt_length = $(this).text().length;
				$(this).text($(this).text().replace(/^[\s]+/,'').replace(/[\s]+$/,'').substring(0,word_num)+(txt_length > word_num ?'...':''));
			});
			$('.format_time').each(function(){
				if($(this).attr('timestring')){
					$(this).html(time_format($(this).attr('timestring')));
				}
			})
			$('.simple_graph_tag').each(function(){
				if($(this).find('.article_tags').size() == 0){
					$(this).find('.tag_img3').remove();
				}
			});
			$('.simple_graph_tag .article_tags').each(function(){
				$(this).text($(this).text().substring(0,4));
			});
		})
	}
};

function goTop() {
    var speed=1000;//滑动的速度
    $('body,html').animate({ scrollTop: 0 }, speed);
    return false;
};
