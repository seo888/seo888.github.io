var videoHtml5 = function(){
	var o = this;
	o.run();
};
videoHtml5.prototype = {
	objects:{},
	run:function(){
		var o = this;
		
		if(o.userBrowser() != 'iphone' && o.userBrowser() !='android' && o.userBrowser() !='Safari'){
			return;
		}
		
		var src = '';
		var tempArr = null;
		//var id = '';
		//视频区域适配
		$('#nr_left').find('object').each(function(){
			src = $(this).attr('data');
			if(/v\.iqilu\.com/.test(src)){
				tempArr = src.split('/');
				tempArr = tempArr[tempArr.length - 1];
				var id = tempArr.split('.')[0];
				o.objects[id] = $(this);

				$.ajax({
					type : "GET",
					url : "http://asi.iqilu.com/video/getMediaUrl",
					data : {'id': id},
					dataType : "jsonp",
					jsonp : 'callback',
					success : function(data){
						if (data.code) {
							o.show(data.value.url, id,data.value.thumb);
						};
					}
				});
			};
		/*	$.get('http://asi.iqilu.com/video/getMediaUrl', {'id': id},
				function(data){
					o.show(data.value.url, id);
				},
				'jsonp'
			);*/
		});
		//视频区域适配
		$('#content-show').find('object').each(function(){
			src = $(this).attr('data');	
			if(/v\.iqilu\.com/.test(src)){
				tempArr = src.split('/');
				tempArr = tempArr[tempArr.length - 1];
				var id = tempArr.split('.')[0];
				o.objects[id] = $(this);

				$.ajax({
					type : "GET",
					url : "http://asi.iqilu.com/video/getMediaUrl",
					data : {'id': id},
					dataType : "jsonp",
					jsonp : 'callback',
					success : function(data){
						if (data.code) {
							o.show(data.value.url, id,data.value.thumb);
						};
					}
				});
			};
		/*	$.get('http://asi.iqilu.com/video/getMediaUrl', {'id': id},
				function(data){
					o.show(data.value.url, id);
				},
				'jsonp'
			);*/
		});
		//分站视频区域适配
		$('#city_nr_left_cnt').find('object').each(function(){
			src = $(this).attr('data');
			if(/v\.iqilu\.com/.test(src)){
				tempArr = src.split('/');
				tempArr = tempArr[tempArr.length - 1];
				var id = tempArr.split('.')[0];
				o.objects[id] = $(this);
				$.ajax({
					type : "GET",
					url : "http://asi.iqilu.com/video/getMediaUrl",
					data : {'id': id},
					dataType : "jsonp",
					jsonp : 'callback',
					success : function(data){
						if (data.code) {
							o.show(data.value.url, id,data.value.thumb);
						};
						//o.show(data.value.url, id);
					}
				});
			};
		});
		/*更新版embed*/
		$('#context').find('embed').each(function(){
			src = $(this).attr('src');
			//sp_width = $(this).attr('width');
			//sp_height = $(this).attr('height');
			if(/v\.iqilu\.com/.test(src)){
				tempArr = src.split('/');
				tempArr = tempArr[tempArr.length - 1];
				var id = tempArr.split('.')[0];
				o.objects[id] = $(this);

				$.ajax({
					type : "GET",
					url : "http://asi.iqilu.com/video/getMediaUrl",
					data : {'id': id},
					dataType : "jsonp",
					jsonp : 'callback',
					success : function(data){
						if (data.code) {

							o.show(data.value.url, id,data.value.thumb);
						};
					}
				});
			};		
		});
	},
	show:function(url, id,thumb){
		var thumb = thumb || "http://file.iqilu.com/custom/new/public/images/videoloadbg.jpg";
		var o = this;
		try{
			var pos = url.indexOf('vod');
			if((pos>=0) && !(/stream\.iqilu\.com/.test(url) )){
				url = 'http://stream.iqilu.com/' + url.substring(pos);	
			}
		}catch(e){
			
		}		
		var v_width =300;
		var v_height =245;
		try{
			v_width = (window.innerWidth || 320 ) - 30;
			v_height = Math.ceil(((v_width)/4)*3);
			v_height = ( v_height >  (window.innerHeight-60) ?  window.innerHeight-60 : v_height );
			
		}catch(e){
				
		}

		o.objects[id].replaceWith('<video poster="' + thumb + '" controls="controls" width="'+v_width+'" height="'+v_height+'" class="vdo"><source src="' + url + '" type="video/mp4"></video>')
	},
	userBrowser:function(){
		var browserName=navigator.userAgent.toLowerCase();
		if(/iphone|ipad|ipod/i.test(browserName)){
			return "iphone";
		}else if(/android/i.test(browserName)){
			return "android";		
		}else if(/msie/i.test(browserName) && !/opera/.test(browserName)){
			return "IE";
		}else if(/firefox/i.test(browserName)){
			return "Firefox";
		}else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
			return "Chrome";
		}else if(/opera/i.test(browserName)){
			return "Opera";
		}else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
			return "Safari";
		}else{
			return "unKnow";
		}
	}
}

$(document).ready(function(){
	new videoHtml5(); 
});