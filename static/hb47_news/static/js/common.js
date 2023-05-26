// JavaScript Document
$(function () {

	var pageShare = $(".pageShare"),
		metaArr = $("meta[name='pageid']").attr("content").split("."),
		siteIdXml = metaArr[0],
		nodeId = metaArr[4],
		fileUUID = metaArr[11]; //稿件id
	var newsHref = window.location.href; //当前文章地址

	var detail = {
		init: function () {
			var isMobile = (/iPad|iPhone|Android|Windows Phone|Nokia/).test(navigator.userAgent); //当前访问设备为移动端

			
			if (newsHref.indexOf(".htm") > 0) { // 正式web地址加载
					this.purPosition(); //当前位置
					this.fontshare(); //文字大小和分享
					this.xcxEwm(); //小程序二维码
					this.audioPlay(); //播放音频
					this.nowyear();//当前年份
					this.currpage();//分页本窗口打开
			}


		},
		/*栏目*/
		purPosition:function(){

			link = newsHref.split('fj.news.cn/');

			if(link[1] && link[1] != ''){

				larr = link[1].split('/');

				var cur = larr[0];

				var  column = {
					'toutiao1' : '头条',
					'fjxwb' : '福建新闻榜',
					'xhskfj' : '新华社记者看福建',
					'ldzq' : '热点专区',
					'xhzbd' : '交互式报道',
					'xhft' : '新华访谈',
					'rsp' : '融视频',
					'fyxfj' : '飞阅新福建',
					'xhyzb' : '新华云直播',
					'ycbd' : '原创报道',
					'rsxw' : '人事新闻',
					'hxla' : '海峡两岸',
					'zksk' : '思客智库',
					'lzxw' : '廉政新闻',
					'hzfj' : '法治福建',
					'xhyzx' : '新华云上学',
					'jhbd' : '聚合报道',
					'zwfw' : '政务服务',
					'rhcx' : '融合创新',
					'jdt' : '焦点图',
					'jujiao' : '聚焦'
				}

				if(column[cur] === undefined){
				}else{
					$('#column').html('<a href="http://fj.news.cn/'+cur+'">'+column[cur]+'</a>');
				}

			}
		},

		//字体大小
		fontshare:function(){

			$("#fontSmall").click(function () {
				$(this).addClass("active").siblings().removeClass("active");
				$("#detail").css({
					"font-size": "16px"
				})
			})
			$("#fontNormal").click(function () {
				$(this).addClass("active").siblings().removeClass("active");
				$("#detail").css({
					"font-size": "18px"
				})
			})
			$("#fontBig").click(function () {
				$(this).addClass("active").siblings().removeClass("active");
				$("#detail").css({
					"font-size": "20px"
				})
			})

			//分享
			var title = $("#title").html();
			//var src = "http://news.cn/";
			var wbSrc = 'http://service.weibo.com/share/share.php?url=' + newsHref + '&title=' + title;
			//var kjSrc = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + newsHref + '&title=' + title;
			var _src = newsHref.replace("c_", "ewm_").replace(".htm", "1n.jpg");
			//console.log(_src)
			$(".wx-ewm img").attr("src", _src);
			$(".fxd-wx-ewm img").attr("src", _src);
			$(".share .wb").attr("href", wbSrc).attr("target", "_blank");
			$(".fxd .fxd-wb").attr("href", wbSrc).attr("target", "_blank");
			//$(".share .kj").attr("href", kjSrc).attr("target", "_blank");
			$(".pageShare").on("mouseover", ".wx", function () {
				$(".pageShare .wx-ewm").stop(true, true).slideDown();
			})
			$(".pageShare").on("mouseleave", ".wx", function () {
				$(".pageShare .wx-ewm").stop(true, true).slideUp();
			})
			$(".pageShare").on("mouseover", ".khd", function () {
				$(".pageShare .khd-ewm").stop(true, true).slideDown();
			})
			$(".pageShare").on("mouseleave", ".khd", function () {
				$(".pageShare .khd-ewm").stop(true, true).slideUp();
			})
			$(".pageShare").on("mouseover", ".xcx", function () {
				$(".pageShare .xcx-ewm").stop(true, true).slideDown();
			})
			$(".pageShare").on("mouseleave", ".xcx", function () {
				$(".pageShare .xcx-ewm").stop(true, true).slideUp();
			})
			$(".fix-ewm").on("mouseover", ".fxd-wx", function () {
				$(".fxd-wx-ewm").stop(true, true).slideDown();
			})
			$(".fix-ewm").on("mouseleave", ".fxd-wx", function () {
				$(".fxd-wx-ewm").stop(true, true).slideUp();
			})
			$(".fix-ewm").on("mouseover", ".fxd-khd", function () {
				$(".fxd-khd-ewm").stop(true, true).slideDown();
			})
			$(".fix-ewm").on("mouseleave", ".fxd-khd", function () {
				$(".fxd-khd-ewm").stop(true, true).slideUp();
			})
			$(".fix-ewm").on("mouseover", ".fxd-xcx", function () {
				$(".fxd-xcx-ewm").stop(true, true).slideDown();
			})
			$(".fix-ewm").on("mouseleave", ".fxd-xcx", function () {
				$(".fxd-xcx-ewm").stop(true, true).slideUp();
			})
			$(".ewm").on("mouseover", function () {
				$(".ewmpic").stop(true, true).fadeIn();
			})
			$(".ewm").on("mouseleave", function () {
				$(".ewmpic").stop(true, true).fadeOut();
			})

		},

		//小程序二维码
		xcxEwm:function(){

			$.ajax({
				url: "https://qrapi.news.cn/code/getQRCode",
				type: "post",
				data: {
					type: 'pages/detail/detailText/detailText',
					articleid: fileUUID,
					origin: 'xinhuawang'
				},
				success: function success(res) {
					//console.log("小程序二维码地址：", res.data)
					if (res.code == '200') {
						//console.log(res.code, res.data)
						//callback && callback(res.data, dom);
						$(".xcx-ewm img").attr("src", res.data)
					}
				}
			});

		},

		audioPlay: function () {
			//音频
			
			var articleid = newsHref.match(/c_(\S*).htm/)[1];
			var time = newsHref.match(/(\S*)c_/)[1];
			time = time.replace(/\//ig, '').replace(/-/ig, '').match(/.*(.{8})/)[1];
			var audioSrc = 'http://vodpub1.v.news.cn/audio/' + time + '/' + articleid + '_title_content.mp3';
			console.log('true-audioSrc:', audioSrc)
			$(".btn-audio").click(function () {
				if ($(this).hasClass("btn-audio-play")) {
					$(this).removeClass("btn-audio-play");
					$("#audioDom")[0].pause();
				} else {
					console.log(audioSrc)
					$.ajax({
						type: "post",
						url: 'http://contentapi.news.cn/ossUrlExist/',
						data: {
							url: audioSrc
						},
						success: function (data) {
							console.log(data)
							if (data) {
								//console.log(data)
								// $(this).addClass("isoundplay")
								$(this).addClass("btn-audio-play");
								$("#audioDom").attr("src", audioSrc);
								$("#audioDom")[0].play();
								$(".btn-audio").addClass("btn-audio-play");
							} else {
								alert("音频正在合成中，请稍后")
							}

						},
						error: function () {
							alert("音频正在合成中，请稍后")
						}
					});

				}
			})
		},
		nowyear:function(){
				//年份
			var myDate = new Date();
			var ny = myDate.getFullYear();
			$('#ny').html(ny);
		},
		currpage:function(){
			$('#div_currpage').find('a').attr('target','_self');
		}
	}

	detail.init();
});