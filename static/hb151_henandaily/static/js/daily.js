var blackList = ["rushanhuanjian.com"];

if(blackList.indexOf(window.location.host) > -1){
    alert('该域名为盗链：rushanhuanjian.com，请访问正确域名')
    window.top.location.href = "https://www.baidu.com";
}else{

}


$(function() {
	$('.micromedia-tab li').click(function() {
		$('.micromedia-tab li').removeClass('current-tab');
		$(this).addClass('current-tab');
		if ($(this).hasClass('weibo')) {
			$('#wxContent').hide();
			$('#wbContent').show();
		} else {
			$('#wbContent').hide();
			$('#wxContent').show();
		}
	})
	$('.news-images-list li').click(function() {
		$('.news-images-list').find('a').addClass('news-images-hide');
		$('.news-images-list').find('h3').removeClass('expanded');
		$('.news-images-list').find('h3').addClass('toggled');
		$(this).find('a').removeClass('news-images-hide');
		$(this).find('h3').removeClass('toggled');
		$(this).find('h3').addClass('expanded');
	})
	$('.news-load-more').click(function() {
		var newsUrl = 'https://api.henandaily.cn/v2/content/getcategorylist?user_id=0&token=8de8af6f01e8a9b8b2a649a9';
		var catid = 'content_' + $(this).data('catid');
		var offset = $('.news-list').find('li').length;
		var getUrl = newsUrl + '&cat_id=' + catid + '&offset=' + offset + '&num=10&callback=?';
		$.getJSON(getUrl).done(function(res) {
			if (res.Status == 1) {
				$.each(res.Info, function(i, arr) {
					var obj = '<li class="news-item"><a href="' + arr.url +  '"><img src="' + arr.thumb + '" class="news-thumb" alt="' + arr.title + '" /></a><div class="news-info"><span class="news-col">' + arr.catname + '</span><span class="news-time">' + arr.created + '</span><div class="clear"></div></div><div class="news-item-content"><h3 class="news-title"><a href="' + arr.url + '">' + arr.title + '</a></h3>';
					obj += '<p class="news-desc">' + arr.brief + '</p></div></li>';
					$('.news-list').append(obj);
				});
			}
		})
	});
	$('.news-load-more-index').click(function() {
		var newsUrl = 'https://www.henandaily.cn/hnsjb/content/getallnews?user_id=0&token=8de8af6f01e8a9b8b2a649a9';
		var catid = 'content_' + $(this).data('catid');
		var offset = $('.news-list').find('li').length;
		var getUrl = newsUrl + '&cat_id=' + catid + '&offset=' + offset + '&num=10&callback=?';
        $.post('https://www.henandaily.cn/hnsjb/content/getallnews',{
            offset:offset,
            num:10,
            callback:'JQ1221'
        }).always(function(data) {
            var str = data.match(/^JQ1221\((.*)\)$/)[1]
            var res = JSON.parse(str);
            
            if (res.status == 1) {
                $.each(res.data, function(i, arr) {
                    var obj = '<li class="news-item"><a href="' + arr.url +  '"><img src="' + arr.thumb + '" class="news-thumb" alt="' + arr.title + '" /></a><div class="news-info"><span class="news-col">' + arr.catname + '</span><span class="news-time">' + arr.created + '</span><div class="clear"></div></div><div class="news-item-content"><h3 class="news-title"><a href="' + arr.url + '">' + arr.title + '</a></h3>';
                    obj += '<p class="news-desc">' + arr.brief + '</p></div></li>';
                    $('.news-list').append(obj);
                });
            }
        })
		// $.getJSON(getUrl).always(function(data) {
  //           console.log(data);
  //           if (data.status == 200 && data.readyState == 4) {
  //               var res = JSON.parse(data.responseText);
  //               if (res.status == 1) {
  //                   $.each(res.data, function(i, arr) {
  //                       var obj = '<li class="news-item"><a href="' + arr.url +  '"><img src="' + arr.thumb + '" class="news-thumb" alt="' + arr.title + '" /></a><div class="news-info"><span class="news-col">' + arr.catname + '</span><span class="news-time">' + arr.created + '</span><div class="clear"></div></div><div class="news-item-content"><h3 class="news-title"><a href="' + arr.url + '">' + arr.title + '</a></h3>';
  //                       obj += '<p class="news-desc">' + arr.brief + '</p></div></li>';
  //                       $('.news-list').append(obj);
  //                   });
  //               }
  //           }
	});


	// 李栋 20190402
	 $.fn.weixinAudio = function (options) {
        var $this = $(this);
        var defaultoptions = {
            autoplay: false,
            src: '',
        };

        function Plugin($context) {
            //dom
            this.$context = $context;

            this.$Audio = $context.children('#media');
            this.Audio = this.$Audio[0];
            this.$audio_area = $context.find('#audio_area');
            this.$audio_length = $context.find('#audio_length');
            this.$currentTime = $context.find('#currentTime');
            this.$audio_progress = $context.find('#audio_progress');
            this.$audio_progress_bar = $context.find('#touchBar');
            //属性
            this.currentState = 'pause';
            this.time = null;
            this.settings = $.extend(true, defaultoptions, options);
            this.dragging = false;
            this.percentage = '';
            this.rate = '';
            //执行初始化
            this.init();
        }

        Plugin.prototype = {
            init: function () {
                var self = this;
                self.updateTotalTime();
                self.events();
                // 设置src
                if (self.settings.src !== '') {
                    self.changeSrc(self.settings.src);
                }
                // 设置自动播放
                if (self.settings.autoplay) {
                    self.play();
                }
            },
            play: function () {
                var self = this;
                if (self.currentState === "play") {
                    self.pause();
                    return;
                }
                self.Audio.play();
                clearInterval(self.timer);
                self.timer = setInterval(self.run.bind(self), 10);
                self.currentState = "play";
                self.$audio_area.addClass('playing');
            },
            pause: function () {
                var self = this;

                self.Audio.pause();
                self.currentState = "pause";
                clearInterval(self.timer);
                self.$audio_area.removeClass('playing');
            },
            setTime() {
                this.Audio.currentTime = this.rate * this.Audio.duration
            },
            stop: function () {

            },
            events: function () {
                var self = this;
                var updateTime;
                self.$audio_area.on('click', function () {
                    self.play();
                    if (!updateTime) {
                        self.updateTotalTime();
                        updateTime = true;
                    }
                });
            },
            //正在播放
            run: function () {
                var self = this;
                self.animateProgressBarPosition();
                if (self.Audio.ended) {
                    self.pause();
                }
            },
            //进度条
            animateProgressBarPosition: function () {
                var self = this;
                self.percentage = (self.Audio.currentTime * 100 / self.Audio.duration) + '%';
                if (self.percentage == "NaN%") {
                    self.percentage = 0 + '%';
                }
                var styles = {
                    "width": self.percentage
                };
                self.$audio_progress.css(styles);

                var self = this,
                    time = self.Audio.currentTime,
                    minutes = self.getAudioMinutes(time),
                    seconds = self.getAudioSeconds(time),
                    audioTime = minutes + ":" + seconds;
                self.$currentTime.text(audioTime);


                if (!self.dragging) {
                    self.$audio_progress_bar.css({'left': self.percentage});
                }else {
                    self.setTime()
                }
            },
            //获取时间秒
            getAudioSeconds: function (string) {
                var self = this,
                    string = string % 60;
                string = self.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //获取时间分
            getAudioMinutes: function (string) {
                var self = this,
                    string = string / 60;
                string = self.addZero(Math.floor(string), 2);
                (string < 60) ? string = string : string = "00";
                return string;
            },
            //时间+0
            addZero: function (word, howManyZero) {
                var word = String(word);
                while (word.length < howManyZero) word = "0" + word;
                return word;
            },
            //更新总时间
            updateTotalTime: function () {
                var self = this,
                    time = self.Audio.duration,
                    minutes = self.getAudioMinutes(time),
                    seconds = self.getAudioSeconds(time),
                    audioTime = minutes + ":" + seconds;
                console.log(audioTime);
                self.$audio_length.text(audioTime);
            },
            //改变音频源
            changeSrc: function (src, callback) {
                console.log(callback);
                var self = this;
                self.pause();
                self.Audio.src = src;
                self.play();
                callback();
            },
        };
        var obj = {}
        // var instantiate = function() {
        // 	 new Plugin($(this));
        // }
        $this.each(function (index, element) {
            obj['weixinAudio' + index] = new Plugin($(this));
        }); //多个执行返回对象

        return obj
    };


	var wxAudio;
	setTimeout(function () {
	    wxAudio = $('.weixinAudio').weixinAudio();
	    // 获取节点
	    var block = document.getElementById("touchBar");
	    var oW;
        if (!block) {
            return
        }
	    // 绑定touchstart事件
	    block.addEventListener("mousedown", function (e) {
	    	e.preventDefault();
	        wxAudio.weixinAudio0.dragging = true;
	        wxAudio.weixinAudio0.pause();
	        var touches = e||window.event;
	        oW = touches.clientX - block.offsetLeft;
	    })

		block.addEventListener("mousemove", function (e) {
			e.preventDefault();
			if (wxAudio.weixinAudio0.dragging) {
				var touches = e||window.event;
		        var oLeft = touches.clientX - oW;
		        if (oLeft < 0) {
		            oLeft = 0;
		        } else if (oLeft > document.documentElement.clientWidth - block.offsetWidth) {
		            oLeft = (document.documentElement.clientWidth - block.offsetWidth);
		        }
		        block.style.left = oLeft + "px";


		        var percentage = e.currentTarget.offsetLeft / $('.progress_bar_container').width();
		        wxAudio.weixinAudio0.rate = percentage;
		    	wxAudio.weixinAudio0.animateProgressBarPosition();
		        
			}
		        
		});
	    

	    block.addEventListener("mouseup", function (e) {
	    	e.preventDefault();
	    	console.log('mouseup')
	        document.removeEventListener("mousemove",defaultEvent);
	        wxAudio.weixinAudio0.dragging = false;
		    // wxAudio.weixinAudio0.play();
	    });


	    function defaultEvent(e) {
	        e.preventDefault();

	    }

	}, 500);
	// 李栋 20190402
})




