/*南海网视频点播直播JS统一调用接口
 *
 * @copyright			(C) 2017
 * @lastmodify			2017-01-05  陈日东
 */
(function($) {
    $.fn.extend({
    	  /*HiVideo播放接口实例
    	   *@param Channel 直播通道:1老播放器 2经纬中天 3厚建 4趣看
    	   *@param Type 播放类型：0为点播 1为直播 2为点播(返回视频播放代码) 默认为0
    	   *@param LiveId 直播通道ID（type为0时有效） 默认为6
    	   *@param LiveName 直播通道名称（type为0时有效） 默认hdzb
    	   *@param Width 播放器宽度 默认为485
    	   *@param Height 播放器高度 默认为395
    	   *@param VideoId 点播视频ID
    	   *@param Videoimg 
    	   *@param VideoType 0椰视频 1厚建 2趣看 默认为0
    	   */
        HiVideo: function(options) {
            var defaults = {
                Type: 0,
            	Channel:3,
                LiveId:6,
                LiveName: 'hdzb',
                Width: 485,
                Height: 395,
                VideoId:0,
                AutoPlay: 0,
                Videoimg: 'http://www.hinews.cn/pic/003/019/152/00301915282_59d49101.png', /*https://v.hinews.cn/player/images/logo.png*/
                VideoType: 0
            };
            options = $.extend(defaults, options);
			if(options.LiveId == 13){
				options.LiveName = 'hinews';
			}
            if (options.Type == 0) {
            	Player(this);
            } else if(options.Type == 2) {
				//Player(this);
            	GetVideoCode_jsonp(this);
            } else {
            	Live(this);
            }
            
            /**
	           * 手机端检测方法
	           * @return true/false
	           */
            function CheckWap() {
                var sUserAgent = navigator.userAgent;
                var mobileAgents = ['Windows CE', 'iPod', 'Symbian', 'iPhone', 'BlackBerry', 'Android', 'Windows Phone'];
                if (sUserAgent.indexOf('Android') > -1 && (sUserAgent.indexOf('ERD79') > -1 || sUserAgent.indexOf('MZ60') > -1 || sUserAgent.indexOf('GT-P7') > -1 || sUserAgent.indexOf('SCH-P7') > -1)) {
                    return true;
                } else {
                    if (location.href.indexOf('pc') == -1) {
                        var k = 0;
                        for (var i = 0; i < mobileAgents.length; i++) {
                            if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
                                k++;
                                break;
                            }
                        }
                        if (k > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                }
            }
            
            /**
	           * 直播接口方法
	           * 功能描述：
	           * @param e
	           * @return 绑定直播播放对象
	           */
            
            function Live(e) {
                var html = "";
                //rtmp://rtmpdist-w11.quklive.com/live/1600847931529948
                //http://hlsv2.quklive.com/live/1600847931529948/index.m3u8
                //var playUrl="http://hls-w.quklive.com/live/w" + options.LiveId + "/playlist.m3u8";
                //var playUrl="http://hlsv2.quklive.com/live/" + options.LiveId + "/index.m3u8";
                var playUrl="https://play-a2.quklive.com/live/" + options.LiveId + ".m3u8";
                if (CheckWap()) {
                	if(options.LiveId.length > 10){
                		//playUrl="http://hlsv2.quklive.com/live/" + options.LiveId + "/index.m3u8";
                		playUrl="https://play-a2.quklive.com/live/" + options.LiveId + ".m3u8";
                	}else{
                		playUrl="https://stream.hinews.cn/" + options.LiveName + "/sd/live.m3u8";
                	}
                	html = '<div style="width:100%;height:100%;overflow:hidden; margin:0 auto; padding-top:0px;">';
                    html += '<video id="video1" preload="load" autoplay src="' + playUrl + '" controls style="width:100%;height:100%"  poster="' + options.Videoimg + '"></video></div>';
                } else {
                    html = '<div style="width:' + options.Width + 'px;' + options.Height + 'px;overflow:hidden; margin:0 auto; padding-top:0px;">';
                    html += '<iframe src="https://v.hinews.cn/getlive.php?width=' + options.Width + '&height=' + options.Height + '&liveid=' + options.LiveId + '&autoplay=' + options.AutoPlay + '" width="' + options.Width + '" height="' + options.Height + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';
                }
                $(e).html(html);
            }
            
            /**
	           * 点播接口方法
	           * @param e
	           * @return 绑定点播播放对象
	           */
            function Player(e) {
                var html = "";
                var playerid = "";
                var strId = '';
                if (CheckWap()) {
                	if(options.VideoId==0){
                    $.each(e,function() {
                    	var channel =  '';
                    	if($(this).attr("id").length>10){
                    		html = '<div style="width:100%;height:100%;overflow:hidden; margin:0 auto; padding-top:0px;">';
                            if(options.AutoPlay==1){
								html += '<video id="video1" preload="load" autoplay="' + options.AutoPlay + '" src="http://recordcdn.quklive.com:80/broadcast/activity/' + $(this).attr("id") + '/record.m3u8" controls style="width:100%;height:100%" poster=' + options.Videoimg + '></video></div>';
                            }else{
								html += '<video id="video1" preload="load"  src="http://recordcdn.quklive.com:80/broadcast/activity/' + $(this).attr("id") + '/record.m3u8" controls style="width:100%;height:100%" poster=' + options.Videoimg + '></video></div>';                           
							}
							$(this).html(html);
                    	}else{
                    		if($(this).attr("channel")) channel = $(this).attr("channel");
                    		else channel = 3;
                        	$.ajax({
                        		type: 'get',
                        		url: 'https://v.hinews.cn/getplayer_mobile.php?playerid=' + $(this).attr("id") + '&channel=' + channel,
                        		dataType: 'jsonp',
                        		jsonp: "jsoncallback",
                        		success: function(data) {
                            		for (var i = 0; i < data.result.length; i++) {
                                		html = '<div style="width:100%;height:100%;overflow:hidden; margin:0 auto; padding-top:0px;">';
                                		if(options.AutoPlay==1){
											html += '<video id="video1" preload="load" autoplay="' + options.AutoPlay + '" src="' + data.result[i].videourl + '" controls style="width:100%;height:100%" poster=' + data.result[i].videoimg + '></video></div>';
                                		}else{
											html += '<video id="video1" preload="load"  src="' + data.result[i].videourl + '" controls style="width:100%;height:100%" poster=' + data.result[i].videoimg + '></video></div>';
										}
										$('#' + data.result[i].playerid).html(html);
                            		}
                        		},
                        		error: function() {
                        		}
                    		});
                    	}
                    });
                	}else{
                		playerid = options.VideoId;
                		if(playerid.length>10){
                    		html = '<div style="width:100%;height:100%;overflow:hidden; margin:0 auto; padding-top:0px;">';
                            if(options.AutoPlay==1){
								html += '<video id="video1" preload="load" autoplay="' + options.AutoPlay + '" src="http://recordcdn.quklive.com:80/broadcast/activity/' + playerid + '/record.m3u8" controls style="width:100%;height:100%" poster=' + options.Videoimg + '></video></div>';
                            }else{
								html += '<video id="video1" preload="load"  src="http://recordcdn.quklive.com:80/broadcast/activity/' + playerid + '/record.m3u8" controls style="width:100%;height:100%" poster=' + options.Videoimg + '></video></div>';                           
							}
							$(this).html(html);
                    	}else{
                    		if($(this).attr("channel")) channel = $(this).attr("channel");
                    		else channel = 3;
                        	$.ajax({
                        		type: 'get',
                        		url: 'https://v.hinews.cn/getplayer_mobile.php?playerid=' + playerid + '&channel=' + channel,
                        		dataType: 'jsonp',
                        		jsonp: "jsoncallback",
                        		success: function(data) {
                            		for (var i = 0; i < data.result.length; i++) {
                                		html = '<div style="width:100%;height:100%;overflow:hidden; margin:0 auto; padding-top:0px;">';
                                		if(options.AutoPlay==1){
											html += '<video id="video1" preload="load" autoplay="' + options.AutoPlay + '" src="' + data.result[i].videourl + '" controls style="width:100%;height:100%" poster=' + data.result[i].videoimg + '></video></div>';
                                		}else{
											html += '<video id="video1" preload="load"  src="' + data.result[i].videourl + '" controls style="width:100%;height:100%" poster=' + data.result[i].videoimg + '></video></div>';
										}
                            		}
                            		e.html(html);
                        		},
                        		error: function() {
                        		}
                    		});
                    	}
                	}
                } else {
					console.log(options.VideoId);
                	if(options.VideoId==0){
                    	$.each(e,function() {
                    		var channel =  '';
                    		if($(this).attr("id").length>10){
                    			html = '<div style="width:' + options.Width + 'px;' + options.Height + 'px;overflow:hidden; margin:0 auto; padding-top:0px;">';
                        		html += '<iframe scrolling="no" src="http://cloud.quklive.com/cloud/a/embed/' + $(this).attr("id") + '?autoPlay=false&recordFast=true" frameborder="0" marginheight="0" marginwidth="0" width="' + options.Width + '"height="' + options.Height + '"></iframe></div>';
                        		$(this).html(html);
                    		}else{
                    			if($(this).attr("channel")) channel = $(this).attr("channel");
                    			else channel = 3;
                        		playerid = $(this).attr("id");
                        		html = '<div style="width:' + options.Width + 'px;' + options.Height + 'px;overflow:hidden; margin:0 auto; padding-top:0px;">';
                        		html += '<iframe scrolling="no" src="https://v.hinews.cn/getplayer.php?playerid=' + playerid + '&width=' + options.Width + '&height=' + options.Height + '&autoplay=' + options.AutoPlay + '&channel=' + channel + '" frameborder="0" marginheight="0" marginwidth="0" width="' + options.Width + '"height="' + options.Height + '"></iframe></div>';
                        		$(this).html(html);
                        	}
                    	});
                	}else{
                        playerid = options.VideoId;
                        if(e.attr("channel")) channel = e.attr("channel");
                        else channel = 3;
                        if(playerid.length>10){
                        	html = '<div style="width:' + options.Width + 'px;' + options.Height + 'px;overflow:hidden; margin:0 auto; padding-top:0px;">';
                        	html += '<iframe scrolling="no" src="http://cloud.quklive.com/cloud/a/embed/' + playerid + '?autoPlay=' + options.AutoPlay + '&recordFast=true" frameborder="0" marginheight="0" marginwidth="0" width="' + options.Width + '"height="' + options.Height + '"></iframe></div>';
                        	e.html(html);
                        }else{
                        	html = '<div style="width:' + options.Width + 'px;' + options.Height + 'px;overflow:hidden; margin:0 auto; padding-top:0px;">';
                        	html += '<iframe scrolling="no" src="https://v.hinews.cn/getplayer.php?playerid=' + playerid + '&width=' + options.Width + '&height=' + options.Height + '&autoplay=' + options.AutoPlay + '&channel=' + channel + '&videotype=' + options.VideoType + '" frameborder="0" marginheight="0" marginwidth="0"></iframe></div>';
                        	e.html(html);
                    	}
                	}
                }
            }
            /**
	           * 点播接口方法	备份20200220
	           * @param e
	           * @return 视频播放代码
	           */
            function GetVideoCode(e) {
                var id = "";
				var isWap = 0;				
				//id = $(this).attr("id").value;
				if(CheckWap()){
					isWap = 1;
				}				
				$.each(e,function() {
					$.ajax({
						type: 'get',
						url: 'https://v.hinews.cn/getVideoCode.php?id=' + $(this).attr("id") + '&m=' + isWap + '&width=' + options.Width + '&height=' + options.Height + '&AutoPlay=' + options.AutoPlay,//20191010修改，增加自动播放参数
						dataType: 'json',
						success: function(data) {
							if(data.code == 0){
								$('#' + data.id).html(data.result);
							}
						},
						error: function() {
						}
					});
                });
            }
			
            /**
	           * 点播接口方法（解决跨域）  修改20200220
	           * @param e
	           * @return 视频播放代码
	           */
            function GetVideoCode_jsonp(e) {
                var id = "";
				var isWap = 0;				
				//id = $(this).attr("id").value;
				if(CheckWap()){
					isWap = 1;
				}				
				$.each(e,function() {
					$.ajax({
						type: 'get',
						url: 'https://v.hinews.cn/getVideoCode_jsonp.php?id=' + $(this).attr("id") + '&m=' + isWap + '&width=' + options.Width + '&height=' + options.Height + '&AutoPlay=' + options.AutoPlay,//20191010修改，增加自动播放参数
						dataType : "jsonp",  
						//jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)  
						//jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名  
						success: function(data) {
							if(data.code == 0){
								$('#' + data.id).html(data.result);
							}
						},
						error: function() {
						}
					});
                });
            }			
        }
    });
})(jQuery);