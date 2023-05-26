
function getHtml5VideoData(){}
 
$(function(){
	if('is_TV_Install' in window){
		return ;
	}
	window.is_TV_Install = 0;
	$.cachedScript = function(a, b){
		b = $.extend(b || {}, {dataType: "script", cache: true, url: a});
		return $.ajax(b);
	};
	
		
	function installFjsenPlayer(fun){
		if(window.is_TV_Install){
			if(window.is_TV_Install == 2){
				fun();
			}else{
				setTimeout(function(){
					installFjsenPlayer(fun);
				}, 200);
			}
		}else{
			window.is_TV_Install = 1;
			$.cachedScript('//cdn.media.fjsen.com/fjsenPlayer/FjsenPlayer.min.js').done(function(){
				window.is_TV_Install = 2;
				fun();
			})
		}
	}
	if('fjsenPlayerSeeting' in window){

	}else{
		window.fjsenPlayerSeeting = {
			path : '//cdn.media.fjsen.com/fjsenPlayer/'
		};
	}
		
		
		var not_html = function(str){
			if(!str) return '';
			return str.replace(/<[^>]+?>/ig,'').replace(/(^\s+|\s+$)/ig,'');
		}
		var load_player = function(t, flv, img){
			if(!flv) return ;
			try{
				console.log(flv);
			}catch(e){}
			if(!flv.match(/(^\w{32}|\.flv|\.mp4|^http|\/\/)/i)) return ;
			var opt = {
				src : flv
			};
			if(flv.length > 32 && flv.match(/^\w{32},\d+,\d+$/)){
				var arr = flv.split(',');
				opt = {
					src : arr[0]
					,width : arr[1]
					,height : arr[2]
					,scale : 0
				};
			}
			if(img) opt.poster = img;
			
			var d = $('<div></div>');
			t.after(d);
			t.remove();
			installFjsenPlayer(function(){
				fjsenPlayer(d, opt);
			});
		}
		
		var flv = '', t = $('#fplayer');
		if(t.length > 0){
			flv = not_html(t.attr('flv'));
			if(flv == '') flv = not_html(t.html());
			var fc = t.parent();
			if(flv.match(/^\w{32}$/i) && fc.is('.fplayer')){
				flv = flv + ',' + fc.width() + ',' + fc.height()
			}
			load_player(t, flv);
		}else{
			$('.fplayer').each(function(){
				t = $(this);
				flv = not_html(t.attr('flv'));
				if(flv == '') flv = not_html(t.html());
				load_player(t, flv);
			})
		}
						
		$('.video-img').each(function(){
			t = $(this);
			flv = not_html(t.attr('video-data') || t.attr('data') || t.attr('video'));
			var img = t.attr('src');
			load_player(t, flv, img);
		})
		
		$('embed').each(function(){
			var t = $(this);
			if(t.attr('src').indexOf('cntv.cn') > -1){
				var id = '';
				t.attr('flashvars').toString().replace(/videoCenterId=(\w{32})/, function(a, b){
					id = b;
				})
				if(id){
					$.cachedScript('//vdn.apps.cntv.cn/api/getIpadVideoInfo.do?pid='+id).done(function(){
						if(html5VideoData){
							var img = '';
							var hls = '';
							html5VideoData.replace(/"hls_url"\:"([^"]*?)"/, function(a, b){
								hls = b;
							})
							html5VideoData.replace(/"image"\:"([^"]*?)"/, function(a, b){
								img = b;
							})
							if(hls){
								load_player(t, hls, img);
							}
						}
						
					})
				}
			}
			if(t.attr('src').indexOf('chinanews.com') > -1){
				var hls = '',img = '';
				t.attr('flashvars').toString().replace(/vInfo=([^&]+)/, function(a, b){
					hls = b;
				}).replace(/vsimg=([^&]+)/, function(a, b){
					img = b;
				})
				if(hls){
					load_player(t, hls, img);
				}
				
			}
			
		})
		
		$('img').each(function(){
			var t = $(this), s = t.attr('title');
			if(s && s.match(/^fjsenPlayer\|/)){
				var a = s.split('|'), b = a[1], c = a[2], d = '';
				if(b == 'imgSize'){
					var w = t.width(), h = t.height();
					d = t.attr('src');
					if(w && h) c = c + ',' + w + ',' + h;
				}
				load_player(t, c, d);
			}
		})
	
		$('a').each(function(){
			var t = $(this), s = t.attr('href');
			if(s && s.match(/\.(mp4|flv|m3u8)($|\?)/)){
				var a = t.find('img'), d = '';
				if(a.length > 0){
					d = a.eq(0).attr('src');
				}
				load_player(t, s, d);
			}
		})
})
