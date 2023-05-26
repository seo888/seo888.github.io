/**
 * @author	jiangyannian
 * @version	1.0
 * @time	2016-12-22
 * @update	2017-03-16 15:40
 * @description	新华网2017新版细览页
 */

$(function(){
	var $body = $("body");
	var Module = function(){
		var metaArr = $("meta[name='pageid']").attr("content").split(".");
		var siteIdXml = metaArr[0];
		var nodeId = metaArr[4];
		var releaseDate = $(".h-time").html();
		var fileUUID = metaArr[11];		//稿件id
		//var newsHref = 'http://m.news.cn/politics/2017-01/02/c_1120230321.htm';//window.location.href; //当前文章地址
		var newsHref = window.location.href; //当前文章地址
		var channelName = newsHref.split("/")[3];
		//var channelName = "politics";
		
		var recommendArr = [	//推荐新闻相关数组
				{"name":"推荐","nid":"11138933"},
				{"name":"新闻","nid":"113352"},
				{"name":"财经","nid":"11145721"},
				{"name":"国际","nid":"11145724"},
				{"name":"网评","nid":"11145723"},
				{"name":"图片","nid":"11145722"},
				{"name":"社会","nid":"113321"},
				{"name":"法治","nid":"11145718"}
			];
		this.dateDiff = function (hisTime, nowTime) {
	        hisTime = new Date( hisTime.replace(/-/g,"/") ).getTime();
	        var now = nowTime ? nowTime : new Date().getTime(),
	            diffValue = now - hisTime,
	            result = '',
	            minute = 1000 * 60,
	            hour = minute * 60,
	            day = hour * 24,
	            halfamonth = day * 15,
	            month = day * 30,
	            year = month * 12,
	            _year = diffValue / year,
	            _month = diffValue / month,
	            _week = diffValue / (7 * day),
	            _day = diffValue / day,
	            _hour = diffValue / hour,
	            _min = diffValue / minute;
	        if (_year >= 1) result = parseInt(_year) + "年前";
	        else if (_month >= 1) result = parseInt(_month) + "个月前";
	        else if (_week >= 1) result = parseInt(_week) + "周前";
	        else if (_day >= 1) result = parseInt(_day) + "天前";
	        else if (_hour >= 1) result = parseInt(_hour) + "个小时前";
	        else if (_min >= 5) result = parseInt(_min) + "分钟前";
	        else result = "刚刚";
	        return result;
	    }

		/*无缝滚动*/
		//globalTrainModel
		this.gotrain = function(){
			var _wfgd = this;		//无缝滚动
			_wfgd.$obj = null;		//gotrain jquery模型对象
			_wfgd.$i = null;		//_wfgd.$obj.find(".gotrain-wap");
			_wfgd.listWidth = 0;	
			_wfgd.runner = null;	//存放循环对象
			_wfgd.run = function(){
				_wfgd.runner = setInterval(function(){ 
					if( +_wfgd.$i.css("left").split("px")[0] + 2*_wfgd.listWidth - _wfgd.$obj.parent().width() <= 0 ){
						_wfgd.$i.css("left",-_wfgd.listWidth+ _wfgd.$obj.parent().width()+"px")
					}else{
						_wfgd.$i.css("left",+_wfgd.$i.css("left").split("px")[0] -1+"px"  )
					}
				},16)
			}
			_wfgd.suspend = function(){
				clearInterval( _wfgd.runner );
			} 
			_wfgd.init = function( obj ){
				if(!$(obj).length){console.log("gotrain在页面中找不到初始化选择器",obj) ; return false;}
				_wfgd.$obj = $(obj);
				var $objChildren = _wfgd.$obj.children();
				_wfgd.$obj.css({"width":"100%","height":"100%","overflow":"hidden"});
				$objChildren.css({"display":"inline-block","float":"left"});
				var lists = _wfgd.$obj.html();
				$objChildren.each(function(i,v){
					_wfgd.listWidth += $(v).width() ;
				})
				_wfgd.$obj.html('<div class="gotrain-wap" style="position:absolute;left:0;width:'+2*_wfgd.listWidth+'px;height:100%;">'+ lists +lists +'</div>');
					_wfgd.$obj.find(".gotrain-wap").on("mouseover",function(){
						 _wfgd.suspend();
					}).on("mouseleave",function(){
						_wfgd.run();
					});
				_wfgd.$i = _wfgd.$obj.find(".gotrain-wap");
				_wfgd.run();
			}
		};
		/*header 关联块滞留*/
		this.roedeer = function(){
			var _rd = this;
			_rd.init = function( arr ){
				//$(".roedeer-links-container > div").css("display","none");
				$(arr).each(function(i,v){
					var cName = "roedeer-active"+i;
					$(v).on("mouseover",function(){
						$(v).addClass( cName+" active");
					}).on("mouseleave",function(){
						$(v).removeClass( cName+" active" );
					});
				});
			}
		};
		/*新闻评论*/
		this.comment = function(newsId,callback){
			var url = "http://comment.home.news.cn/a/newsComm.do?newsId="+newsId;
			$.ajax({
	             type : "get",
	             async:false,
	             url : url,
	             dataType : "jsonp",
	             jsonp: "callback",
	             success : function(json){
	                 callback(json);
	             },
	             error:function(e){
	                  console.log(e)
	             }
	         });
		}
		/*当前新闻栏目位置*/
		this.newsLocation = function(channelName){
			//型如http://cx.news.cn/2017-03/15/c_136129371.htm 根据域名判断栏目位置的栏目
			//兼容 news 、 xinhuanet
			var domainNameArr = [
				{"name":"http://cx.","sKey":"cx"},
				{"name":"http://education.","sKey":"edu"},
				{"name":"http://uav.","sKey":"uav"},
				{"name":"http://m.xinhuanet.com","sKey":"sjb"},
				{"name":"http://us.","sKey":"us"},
				{"name":"http://www.zj.","sKey":"zj"},
				{"name":"http://zj.","sKey":"zj"}
			];

			$(domainNameArr).each(function(i,v){
				if (newsHref.indexOf(v.name)>=0) channelName = v.sKey;
			});

			var arrChannel = [{sKey:"test",sValue:"时政新闻",sUrl:"http://www.news.cn/politics/index.htm"},
								{sKey:"politics",sValue:"时政",sUrl:"http://www.news.cn/politics/index.htm"},
								{sKey:"comments",sValue:"网评",sUrl:"http://www.news.cn/comments/index.htm"},
								{sKey:"newscenter",sValue:"新闻中心",sUrl:"http://www.xinhuanet.com/newscenter/index.htm"},
								{sKey:"renshi",sValue:"人事",sUrl:"http://www.news.cn/renshi/index.htm"},
								{sKey:"hr",sValue:"人才",sUrl:"http://www.news.cn/hr/index.htm"},
								{sKey:"ziliao",sValue:"资料",sUrl:"http://www.news.cn/ziliao/index.htm"},
								{sKey:"legal",sValue:"法治",sUrl:"http://www.news.cn/legal/index.htm"},
								{sKey:"local",sValue:"地方",sUrl:"http://www.news.cn/local/index.htm"},
								{sKey:"book",sValue:"悦读",sUrl:"http://www.news.cn/book/index.htm"},
								{sKey:"lianzheng",sValue:"廉政",sUrl:"http://www.news.cn/lianzheng/index.htm"},
								{sKey:"world",sValue:"国际",sUrl:"http://www.news.cn/world/"},
								{sKey:"overseas",sValue:"海外华人",sUrl:"http://www.news.cn/overseas/"},
								{sKey:"gangao",sValue:"港澳",sUrl:"http://www.news.cn/gangao/index.htm"},
								{sKey:"tw",sValue:"台湾",sUrl:"http://www.news.cn/tw/index.htm"},
								{sKey:"mil",sValue:"军事",sUrl:"http://www.xinhuanet.com/mil/index.htm"},
								{sKey:"culture",sValue:"文化",sUrl:"http://www.news.cn/culture/"},
								{sKey:"fortune",sValue:"财经",sUrl:"http://www.news.cn/fortune/index.htm"},
								{sKey:"money",sValue:"金融",sUrl:"http://www.news.cn/money"},
								{sKey:"caipiao",sValue:"彩票",sUrl:"http://www.xinhuanet.com/caipiao/index.htm"},
								{sKey:"jiaju",sValue:"家居",sUrl:"http://www.news.cn/jiaju/index.htm"},
								{sKey:"gongyi",sValue:"公益",sUrl:"http://www.news.cn/gongyi/index.htm"},
								{sKey:"futures",sValue:"期货",sUrl:"http://www.news.cn/futures/index.htm"},
								{sKey:"finance",sValue:"证券",sUrl:"http://www.news.cn/finance/index.htm"},
								{sKey:"auto",sValue:"汽车",sUrl:"http://www.news.cn/auto/index.htm"},
								{sKey:"edu",sValue:"教育",sUrl:"http://education.news.cn/"},
								{sKey:"abroad",sValue:"出国",sUrl:"http://www.news.cn/abroad/index.htm"},
								{sKey:"food",sValue:"食品",sUrl:"http://www.news.cn/food/index.htm"},
								{sKey:"tea",sValue:"茶叶",sUrl:"http://www.news.cn/tea/index.htm"},
								{sKey:"air",sValue:"民航",sUrl:"http://www.news.cn/air/index.htm"},
								{sKey:"tech",sValue:"科技",sUrl:"http://www.news.cn/tech/index.htm"},
								{sKey:"jiadian",sValue:"家电",sUrl:"http://www.news.cn/jiadian/index.htm"},
								{sKey:"health",sValue:"健康",sUrl:"http://www.news.cn/health/index.htm"},
								{sKey:"environment",sValue:"环保",sUrl:"http://www.news.cn/environment/index.htm"},
								{sKey:"coal",sValue:"煤炭",sUrl:"http://www.news.cn/coal/index.htm"},
								{sKey:"power",sValue:"电力",sUrl:"http://www.news.cn/power/"},
								{sKey:"energy",sValue:"能源",sUrl:"http://www.news.cn/energy/index.htm"},
								{sKey:"shuhua",sValue:"书画",sUrl:"http://www.news.cn/shuhua/index.htm"},
								{sKey:"collection",sValue:"收藏",sUrl:"http://www.news.cn/collection/index.htm"},
								{sKey:"travel",sValue:"旅游",sUrl:"http://travel.news.cn/"},
								{sKey:"fashion",sValue:"时尚",sUrl:"http://www.news.cn/fashion/index.htm"},
								{sKey:"city",sValue:"城市",sUrl:"http://www.news.cn/city/index.htm"},
								{sKey:"sports",sValue:"体育",sUrl:"http://sports.news.cn/"},
								{sKey:"insurance",sValue:"保险",sUrl:"http://www.xinhuanet.com/insurance/"},
								{sKey:"expo",sValue:"会展",sUrl:"http://www.xinhuanet.com/expo/"},
								{sKey:"xiangtu",sValue:"新闻中心",sUrl:"http://www.xinhuanet.com/xiangtu/"},
								{sKey:"info",sValue:"信息化",sUrl:"http://www.xinhuanet.com/info/index.htm"},
								{sKey:"zhcs",sValue:"智慧城市",sUrl:"http://www.xinhuanet.com/zhcs/index.htm"},
								{sKey:"ent",sValue:"娱乐",sUrl:"http://ent.news.cn/"},
								{sKey:"yuqing",sValue:"舆情",sUrl:"http://www.news.cn/yuqing/index.htm"},
								{sKey:"newmedia",sValue:"传媒",sUrl:"http://www.xinhuanet.com/newmedia/index.htm"},
								{sKey:"video",sValue:"视频",sUrl:"http://www.news.cn/video/index.htm"},
								{sKey:"foto",sValue:"摄影",sUrl:"http://www.xinhuanet.com/foto/index.htm"},
								{sKey:"house",sValue:"房产",sUrl:"http://www.xinhuanet.com/house/"},
								{sKey:"forum",sValue:"论坛",sUrl:"http://forum.home.news.cn/list/50-0-0-1.html"},
								{sKey:"yzyd/politics",sValue:"时政",sUrl:"http://www.news.cn/politics/index.htm"},
								{sKey:"yzyd/comments",sValue:"网评",sUrl:"http://www.news.cn/comments/index.htm"},
								{sKey:"yzyd/newscenter",sValue:"新闻中心",sUrl:"http://www.xinhuanet.com/newscenter/index.htm"},
								{sKey:"yzyd/legal",sValue:"法治",sUrl:"http://www.news.cn/legal/index.htm"},
								{sKey:"yzyd/local",sValue:"地方",sUrl:"http://www.news.cn/local/index.htm"},
								{sKey:"yzyd/book",sValue:"悦读",sUrl:"http://www.news.cn/book/index.htm"},
								{sKey:"yzyd/world",sValue:"国际",sUrl:"http://www.news.cn/world/"},
								{sKey:"yzyd/overseas",sValue:"海外华人",sUrl:"http://www.news.cn/overseas/"},
								{sKey:"yzyd/gangao",sValue:"港澳",sUrl:"http://www.news.cn/gangao/index.htm"},
								{sKey:"yzyd/tw",sValue:"台湾",sUrl:"http://www.news.cn/tw/index.htm"},
								{sKey:"yzyd/mil",sValue:"军事",sUrl:"http://www.xinhuanet.com/mil/index.htm"},
								{sKey:"yzyd/fortune",sValue:"财经",sUrl:"http://www.news.cn/fortune/index.htm"},
								{sKey:"yzyd/jiaju",sValue:"家居",sUrl:"http://www.news.cn/jiaju/index.htm"},
								{sKey:"yzyd/finance",sValue:"金融",sUrl:"http://www.news.cn/finance/index.htm"},
								{sKey:"yzyd/auto",sValue:"汽车",sUrl:"http://www.news.cn/auto/index.htm"},
								{sKey:"yzyd/edu",sValue:"教育",sUrl:"http://education.news.cn"},
								{sKey:"yzyd/food",sValue:"食品",sUrl:"http://www.news.cn/food/index.htm"},
								{sKey:"yzyd/tech",sValue:"科技",sUrl:"http://www.news.cn/tech/index.htm"},
								{sKey:"yzyd/jiadian",sValue:"家电",sUrl:"http://www.news.cn/jiadian/index.htm"},
								{sKey:"yzyd/health",sValue:"健康",sUrl:"http://www.news.cn/health/index.htm"},
								{sKey:"yzyd/energy",sValue:"能源",sUrl:"http://www.news.cn/energy/index.htm"},
								{sKey:"yzyd/travel",sValue:"旅游",sUrl:"http://travel.news.cn"},
								{sKey:"yzyd/fashion",sValue:"时尚",sUrl:"http://www.news.cn/fashion/index.htm"},
								{sKey:"yzyd/ent",sValue:"娱乐",sUrl:"http://ent.news.cn/"},
								{sKey:"yzyd/foto",sValue:"摄影",sUrl:"http://www.xinhuanet.com/foto/index.htm"},
								{sKey:"yzyd/house",sValue:"房产",sUrl:"http://www.xinhuanet.com/house/"},
								{sKey:"japan",sValue:"日本频道",sUrl:"http://japan.xinhuanet.com/"},
								{sKey:"koreas",sValue:"韩国频道",sUrl:"http://korea.news.cn/"},
								{sKey:"drone",sValue:"无人机",sUrl:"http://www.news.cn/drone/"},
								{sKey:"vr",sValue:"VR/AR",sUrl:"http://www.news.cn/vr/"},
								{sKey:"photo",sValue:"图片",sUrl:"http://www.news.cn/photo/index.htm"},
								{sKey:"cx",sValue: "双创",sUrl: "http://cx.news.cn/"},
								{sKey:"zgly",sValue:"中国旅游新闻",sUrl:"http://zgly.xinhuanet.com/"},
								{sKey:"talking",sValue:"新华访谈",sUrl:"http://www.news.cn/talking/"},
								{sKey:"uav",sValue:"无人机",sUrl:"http://uav.news.cn/"},
								{sKey:"sjb",sValue:"",sUrl:""},
								{sKey:"us",sValue:"美国频道",sUrl:"http://us.xinhuanet.com/index.htm"},
							    {sKey:"zj",sValue:"浙江频道",sUrl:"http://www.zj.xinhuanet.com/"}
							 ];
			var obj = {
                name: null,
                url: null,
                sKey: null
            };

			$(arrChannel).each(function(i,v){
				if(v.sKey==channelName){
					obj = {
						name: v.sValue,
						url: v.sUrl,
						sKey: v.sKey
					}
				}
			});
			return obj;
		};
		/*页面视频处理*/
		this.video = function(){
			$("#p-detail img").each(function(i,v){
				var $img = $(v);
				var videoUrl = $img.attr("title");
				var iclass = "video-iframe-"+i;
				if(videoUrl && videoUrl.match("vod.html")){
					$img.css({"cursor":"pointer"});
					var h =
					'<div class="video-wap '+iclass+'">'+
						'<iframe src="'+ videoUrl +'"></iframe>'+
					'</div>';
					$img.on("click",function(){
						$img.after(h);
						$img.remove();
					})
				}
			})
		}
		/*页面视频处理*/
		this.mVideo = function(){
			$(".m-detail img").each(function(i,v){
				var $img = $(v);
				var videoUrl = $img.attr("title");
				var iclass = "video-iframe-"+i;

				if(videoUrl && videoUrl.match("vod.html")){
					$img.css({"cursor":"pointer"})
					var h =
					'<div class="video-wap '+iclass+'">'+
						'<iframe src="'+ videoUrl +'"></iframe>'+
					'</div>';
					$img.addClass("m-video")
					$('body').on("click","img",function(){
						$img.after(h);
						$img.remove();
					})
				}
			})
		}
		/*标准轮播*/
		this.lb = function(){
			var _this = this;
			if(!$("#hdbreak").length){
				$(".lb").remove();
				return false;
			}
			//获取数据
			var script= document.createElement('script'); 
			script.type= 'text/javascript'; 
			script.src= $("#hdbreak").html(); 
			$("#hdbreak").append(script);
			var length = hdArticle.piclist.length;
			var temp = "";
			//标准尺寸690*430
			var s = 2.2;   //690/430
			var standerWidth = 690;
			var standerHeight = 430;
			$(hdArticle.piclist).each(function(i,v){
				littlePici = (i === (length-1)) ? 0 : i+1; 
				var littlePic = hdArticle.piclist[littlePici].bigJpgUrl;
				var picClass = "lb-img"+i;
				//var imgTag ;
				/*
				_this.loadImage(v.bigJpgUrl,function(e){
					var w = e.width;
					var h = e.height;
					if( w/h > s  ){	//比标准图宽
						var sw = w/standerWidth*h;	//拉伸后的高度
						var top = (430-sw)/2;
						$('.'+picClass).css({"width":"690px","margin-top": top +'px'});
						//imgTag = '<img src="'+v.bigJpgUrl+'"style="width:100%;margin-top:'+ top +'px">';
					}else{
						var sh = h/standerHeight*w;	//拉伸后的高度
						var left = (690-sh)/2;
						$('.'+picClass).css({"height":"430px","margin-left": left +'px'});
						//imgTag = '<img src="'+v.bigJpgUrl+'"style="height:100%;margin-left:'+ left +'px">';
					}
				});
				*/
				temp += 
					'<div class="swiper-slide">'+//imgTag+
						'<img src="'+v.bigJpgUrl+'" class="'+picClass+'">'+
						'<div class="swiper-bottom">'+
							'<div class="img-num">'+
								'<span class="mun1">'+(i+1)+'</span>'+
								'<span class="mun2">'+length+'</span>'+
							'</div>	'+
							'<div class="lb-info">'+
								'<div class="lb-title ellipsis">'+hdArticle.htmTitle+'</div>'+
								'<div class="lb-des">'+v.alt+'</div>'+
							'</div>'+
							'<div class="more"></div>'+
							'<div class="lb-next-img">'+
								'<img src="'+littlePic+'">'+
							'</div>'+
						'</div>'+
					'</div>'
			})
			$(".swiper-wrapper").html(temp);
			var mySwiper2 = new Swiper ('.swiper-container2', {
			    	direction: 'vertical',
				    paginationClickable: true,
				    loop: true,
				    // 如果需要分页器
				    pagination: '.swiper-container2 .swiper-pagination',
				    // 如果需要前进后退按钮
				    nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev',
				    // 如果需要滚动条
				    scrollbar: '.swiper-container2 .swiper-scrollbar'
			  	});
			$('.s_arrow_left').on('click', function(e){
				e.preventDefault()
				mySwiper2.swipePrev()
			});
			$('.s_arrow_right').on('click', function(e){
				e.preventDefault()
				mySwiper2.swipeNext()
			});
			//显示摘要
			$(".swiper-bottom .more").on("click",function(){
				var $this = $(this);
				var $tp = $this.parent(".swiper-bottom");
				if(!$this.hasClass("up")){
					var height = $tp.find(".lb-title").height() + $tp.find(".lb-des").innerHeight();
					$tp.find(".lb-info").animate({"height":height+"px"});
					$this.addClass("up");
				}else{
					$tp.find(".lb-info").animate({"height":"52px"});
					$this.removeClass("up");
				}
			});
			$(".swiper-bottom").each(function(i,v){
				var $v = $(v);
				if( $v.find(".lb-title").height() + $v.find(".lb-des").innerHeight() <= 56){
					$v.find(".more").remove();
				}
			})

			$(".origin").on("click",function(){
				window.open( $(".swiper-slide-active img").attr("src") );
			});
		};
		//加载图片
		this.loadImage = function(url, callback) { 
			var img = new Image(); 
			img.src = url; 
			img.onload = function(){  
				callback(img); 
			}; 
		}; 
		/*下一篇新闻*/
		this.nextNews = function(){
			var url = 'http://so.news.cn/inter/getNextNews?siteIdXml='+siteIdXml+'&nodeId='+nodeId+'&fileUUID='+fileUUID+'&releaseDate='+releaseDate;
			$.ajax({
	             type : "get",
	             async:false,
	             url : url,
	             dataType : "jsonp",
	             jsonp: "callback",
	             success : function(json){
	                 $(".next-news-name").html(json.content.result.title);
	                 $(".next-news").attr("href",json.content.result.originUrl[0]);
	             },
	             error:function(e){
	                  console.log(e)
	             }
	         });
		};
		//pc推荐新闻模块模板
		this.temp = function(obj){
			var _this = this;
			var lis = "";
			$(obj).each(function(i,v){
				var kw = "";
				if(v.keyword){
					$(v.keyword.split(";")).each(function(i,v){
						kw += "<span class='search-kw'>"+ v +"</span>"
					});	
				}
				if(!v.imgarray.length){//无多图
					var pic = v.PicLinks ? ('<a href="'+v.LinkUrl+'" target="_blank"><img src="'+v.PicLinks+'" alt="" class="item-pic"></a>') : "";
					lis +=
					'<li class="list-item clearfix">'+pic+
		              '<div class="item-container">'+
		                '<a href="'+v.LinkUrl+'" class="item-title" target="_blank">'+v.Title+'</a>'+
		                '<div class="item-time">'+
		                	kw+'<span>'+ _this.dateDiff(v.PubTime.replace(","," ")) +'</span> '+ 
		                	//'<span class="right">'+ v.Editor +'</span>'+
		                '</div>'+
		              '</div>'+
		            '</li>';
				}else{
					var itemHref = v.LinkUrl;
					var images = '<a href="'+itemHref+'"><img src="'+v.PicLinks+'" alt="" class="item-pic" target="_blank"></a>';
					$(v.imgarray).each(function(i,v){
						if (i > 2) return false;
						images +=	'<a href="'+itemHref+'" target="_blank"><img src="'+v+'" alt="" class="item-pic"></a>';
					});
					lis +=
					'<li class="list-item clearfix">'+
		              '<div class="item-container">'+
		                '<a href="'+v.LinkUrl+'" class="item-title" target="_blank">'+v.Title+'</a>'+
		                '<div class="clearfix pic-s">'+
			                '<div>'+images+'</div>'+
		                '</div>'+
		                '<div class="item-time">'+
		                	kw+'<span>'+ v.PubTime.split(" ")[0] +'</span> '+ 
		                	//'<span class="right">'+ v.Editor +'</span>'+
		                '</div>'+
		              '</div>'+
		            '</li>'
				}
			})
			return lis;
		}
		/*第二块导航新闻 加载更多 及右侧跟随部分*/
		this.part2News = function(){
			var _this = this;
			/*生成part2左侧nav part2右侧 列表容器*/
			var ul = "";
			var wappers = "";
			$(recommendArr).each(function(i,v){
				ul += '<li> <a href="#locat" class="" nid="'+ v.nid +'" page="0">'+ v.name +'</a> </li>'
				wappers += '<ul id="w'+v.nid+'"></ul>'
			});		
			$("#p2-nav ul").html(ul);
			$("#part2-list").prepend(wappers);

			//第二部分左侧导航 加载更多 及右侧跟随部分
			$("#p2-nav a").on("click",function(){
				var $this = $(this);
				$("#p2-nav a").removeClass("active");
				$this.addClass("active");
				var nid = $("#p2-nav a.active").attr("nid");
				var page = +$("#p2-nav a.active").attr("page");
				$("#part2-list ul").hide();
				$("#w"+nid).show();
				if($this.hasClass("no-more-data")){
					$(".more-2").html("没有更多数据！");
				}else{
					$(".more-2").html("加载更多");
				}
				var renderData = function(){
					$.ajax({
			             type : "get",
			             async:false,
			             url : 'http://qc.wa.news.cn/nodeart/list?nid='+ nid +'&pgnum='+ (page+1) +'&cnt=10&attr=63&tp=1&orderby=1&fullPath=1',
			             dataType : "jsonp",
			             jsonp: "callback",
			             success : function(json){
			                 $("#part2-list ul#w"+nid).append(_this.temp(json.data.list));
			                 $this.attr("page",page+1);
			                 $(".p2-nav-wap").height($("#part2-list").height()+"px");
			             },
			             error:function(e){
			                  console.log(e)
			             }
			         });
				}
				renderData();
			});
			$(".more-2").on("click",function(){
				var $this = $(this);
				var nid = $("#p2-nav a.active").attr("nid");
				var page = +$("#p2-nav a.active").attr("page");
				$.ajax({
		             type : "get",
		             async:false,
		             url : 'http://qc.wa.news.cn/nodeart/list?nid='+ nid +'&pgnum='+ (page+1) +'&cnt=10&attr=63&tp=1&orderby=1&fullPath=1',
		             dataType : "jsonp",
		             jsonp: "callback",
		             success : function(json){
		             	if(json.status ==-1){
		             		$("#p2-nav a.active").addClass("no-more-data");
		             		$this.html("没有更多数据！");
		             		return false;
		             	}
		                 $("#part2-list ul#w"+nid).append(_this.temp(json.data.list));
		                 $("#p2-nav a.active").attr("page",page+1);
		                 _this.reScroll();
		             },
		             error:function(e){
		                  console.log(e)
		             }
		         });
			});
			$("#p2-nav a").eq(0).trigger("click");
			//导航滚动跟随
			var $header = $(".header");
			var headerHeight = $header.height();
			var headerTop = +$header.css("margin-top").split("px")[0];
			var headerBottom = +$header.css("margin-bottom").split("px")[0] ;
			var headerTotalHeight = headerHeight+headerTop+headerBottom;
			var middleHeight = (function(){
				if($('.bg6').length){
					return parseInt($('.bg6').height()+$('.bg6').css("margin-bottom").split("px")[0] );
				}
			})()
			var f1Height = $("#fllow1").height();
			var f2Height = $("#p2-nav").height();
			
			var rightAdHeight = null;
			
			$(document).ready(function(){
				$("#fllow3 .ad").each(function(i,v){
					var $v = $(v), 
					url = $(v).find("img").attr("src");
					_this.loadImage(url,function(){
						var h = $(v).height();
						$v.attr("ad-height",h);
						rightAdHeight += h;
					});
				}); 
			});

			$(window).scroll( function() { 
				var windowHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var heightP1 = $(".part1").height();	 //第一部分高
				var heightTop = $('.bg6').position().top; //header及p1高
				var heightP2 = $(".part2").height();	 //第一部分高
				$(".fllow1-wap").height(heightP1+"px");
				$(".p2-nav-wap").height(heightP2+"px");

				//左侧广告1
				if( scrollTop>=headerHeight ){
					$('#fllow1').removeClass("hold").addClass("fixed");
					//80 是fllow1距离part1底部的空白间距
					if(headerTotalHeight + heightP1 - f1Height -headerBottom -80< scrollTop){
						$("#fllow1").addClass("hold").removeClass("fixed");
					}
				}else{
					$("#fllow1").removeClass("fixed hold");
					//fllow-right
					if($("#fllow3").hasClass("no-ad")){
						$("#fllow3").removeClass("fixed hold no-ad");
						$("#fllow3 .ad").each(function(i,v){
							$(v).animate({ 
								width: "100%",
								height: $(v).attr("ad-height")+"px"
							}, 400 ,function(){
								$(".xuanshi").css("margin-bottom","30px")
							});
						})
					}
				}
				//左侧广告2
				if( headerTotalHeight + heightP1 -40< scrollTop ){
					$('#p2-nav').removeClass("hold").addClass("fixed");
					if( headerTotalHeight + heightP1 + heightP2 - f2Height -102 - 40< scrollTop ){
						//fllow-right
						$("#p2-nav,#fllow3").addClass("hold").removeClass("fixed");
						$("#p2-nav").addClass("hold").removeClass("fixed");
					}
				}else{
					$('#p2-nav').removeClass("fixed hold");
				}

				//右侧广告
				//fllow-right
				
				var f3Height = $("#fllow3").height();
				if( scrollTop+windowHeight-f3Height-120>=headerHeight ){
					$('#fllow3').removeClass("hold").addClass("fixed");
					if( scrollTop + windowHeight - headerTotalHeight - heightP1 -heightP2 > 0 ){
						$('#fllow3').removeClass("fixed").addClass("hold");
					}else{
						$('#fllow3').removeClass("hold").addClass("fixed");
						if(!$("#fllow3").hasClass("no-ad")){
							$("#fllow3").addClass("no-ad")
							setTimeout(function(){
								if(!$("#fllow3").hasClass("no-ad")){
									return false;
								}
								$("#fllow3 .ad").animate({ 
									width: "100%",
									height: "0"
								}, 800,function(){
									$(".xuanshi").css("margin-bottom","-30px")
								} );
							},1000);
						}
					}
				}
			} );
		};
		/*右侧炫图 视频切换*/
		this.xs = function(){
			var $s = $(".xuanshi .name span");
			$s.on("click",function(){
				var $this = $(this);
				$s.removeClass("active");
				$this.addClass("active");
				$(".xuanshi ul").hide();
				$("."+$this.attr("name")).show();
			});
		}
		/*分享*/
		this.share = function(){
			var href = window.location.href;
			//var href = 'http://m.news.cn/politics/2017-01/02/c_1120230321.htm';
			var title = $(".h-title").html();
			$(".share-wb").on("click",function(){
				window.open('http://service.weibo.com/share/share.php?url='+href+"&title="+title)
			});
			$(".share-q").on("click",function(){
				window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+href+"&title="+title)
			})
			$(".share-wx-item").on("mouseover",function(){
				$(".wx-ewm").stop(true,true).slideDown();
			}).on("mouseleave",function(){
				$(".wx-ewm").stop(true,true).slideUp();
			});
			
			var _src = href.replace("c_","ewm_").replace(".htm","1n.jpg");
			$(".wx-ewm img").attr("src",_src);
		};
		/*检索*/
		this.search = function( kw ){
			if(!kw){
				kw = $("#kw").val();
			}
			if( kw ){
				window.open("http://so.news.cn/#search/0/"+kw+"/1/");
			}
		}
		//浮窗新闻
		/*this.fuchuang = function(){
			var fcHtml = '<div class="Xfuchaung"><iframe marginheight="0" marginwidth="0" frameborder="0" width="336" height="300" scrolling="no"  src="http://embed.xinhuanet.com/main/s?user=AllyesNetwork|TppAd|WzPc226t280&db=xinhuanet&border=0&local=yes"></iframe></div>';
			$("body").append(fcHtml);
		};*/
		this.jiucuo = function(){
			(function() {
			var _hexCHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			var _hexTBL = {'0':0, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9,'A':10, 'B':11, 'C':12, 'D':13, 'E':14, 'F':15, 'G':16, 'H':17, 'I':18, 'J':19,'K':20, 'L':21, 'M':22, 'N':23, 'O':24, 'P':25, 'Q':26, 'R':27, 'S':28, 'T':29,'U':30, 'V':31, 'W':32, 'X':33, 'Y':34, 'Z':35, 'a':36, 'b':37, 'c':38, 'd':39,'e':40, 'f':41, 'g':42, 'h':43, 'i':44, 'j':45, 'k':46, 'l':47, 'm':48, 'n':49,'o':50, 'p':51, 'q':52, 'r':53, 's':54, 't':55, 'u':56, 'v':57, 'w':58, 'x':59,'y':60, 'z':61};
			var key = [61,37,44,31,34,7,24,6,43,12,27,3,25,29,60,33,35,41,58,2,51,49,9,5,59,11,42,32,22,40,4,57,50,38,8,56,21,19,52,53,16,28,1,26,47,17,54,46,10,23,55,13,14,20,15,36,18];
			Hr = function(){if (key.length < 57){throw new Error('the key is too short.');}
				this._sz = _hexCHS.charCodeAt(key[15]) % (key.length-20) + 10;this._ks = key.slice(-this._sz);
				for (var _i=0; _i<this._sz; ++_i) {this._ks[_i] = _hexCHS.charCodeAt(this._ks[_i]%62);}
				this._k16 = [], this._k41 = [];this._t16 = {}, this._t41 = {};
				for (var _i=0; _i<16; ++_i) {this._k16[_i] = _hexCHS.charAt(key[_i]);this._t16[this._k16[_i]] = _i;}
				for (var _i=0; _i<41; ++_i) {this._k41[_i] = _hexCHS.charAt(key[_i+16]);this._t41[this._k41[_i]] = _i;}};  
			Hr.prototype.ca = function( s ){var _k16 = this._k16,_k41 = this._k41,_ks  = this._ks,_sz  = this._sz,_cnt = 0;return  s.replace(/[^\s\n\r]/g, function( ch ) {var _n = ch.charCodeAt(0);return  (_n <= 0xff)? _k16[parseInt(_n/16)] + _k16[_n%16]: _k41[parseInt(_n/1681)] + _k41[parseInt(_n%1681/41)] + _k41[_n%41]}).replace(/[0-9A-Za-z]/g, function( ch ) {return  _hexCHS.charAt((_hexTBL[ch] + _ks[_cnt++%_sz]) % 62);});};})(); 
			/*
			$(".tiyi1").toggle(
				function(){$('#jc_link1').attr("src",jc_link);$("#advisebox01").show();},
				function(){$("#advisebox01").hide();}
			);
			$(".advise").toggle(
				function(){$('.jc_link23').attr("src",jc_link);$("#advisebox02").show();},
				function(){$("#advisebox02").hide();}
			);
			*/	
			$(".tiyi1").click(function(){
				$('#jc_link1').attr("src",jc_link);
				$("#advisebox01").show();
			});	
			$("#jc_close1").click(function(){
				event.stopPropagation();
				$("#advisebox01").hide();
			});
				
			$("#jc_close1").click(function(){$("#advisebox01").hide();});
			$("#jc_close2").click(function(){$("#advisebox02").hide();});
			//获取责编id，稿件url，稿件id，稿件标题  
			var ele_pageid = $("meta[name=pageid]").attr("content");
			var ele_ids=ele_pageid.split(".");
			var bId = ele_ids[ele_ids.length-2];
			var _code = new Hr();//code
			var cId = _code.ca(ele_ids[ele_ids.length-1]);
			var cTitle = $("title").html().split("_")[0];
		    if(cTitle !=""){ cTitle = encodeURI(encodeURI(cTitle));}
			var cUrl = window.location.href;
			var jc_link='http://ck.wa.news.cn/XHWCIFB/Confirm.do?bId='+bId+"&cUrl="+cUrl+"&cId="+cId+"&cTitle="+cTitle;
			/****** end *******/
		};
		//触发窗口卷边多1像素 用于兼容页面因高度变化引起的scrolltop事件未触发
		this.reScroll = function(){
			$(window).scrollTop(1+$(window).scrollTop());
		};
		//副题视频新闻
		this.videoNews = function(){
			var $vf = $(".video-frame");
			if( $vf.length && $.trim( $vf.attr("src") ) && $vf.attr("src").match("vod")){
				$vf.css({"width":"690px","height":"520px","display":"block","margin":"0 auto"});
			}else{
				$vf.hide();
			}
		};

		//时间格式处理
		this.turnTime = function(cont){
			var _this = this;
			$(cont).each(function(i,v){
				var $v = $(v);
				$v.html( _this.dateDiff($v.html()) );
			})
		}
		//文章点赞
		this.dianZan = function(){
			var $zan = $(".zan");
			$zan.on("click",function(){
				$(".zan-i").css("z-index","2").animate({ top: "-48px" }, 600).fadeOut();
				$zan.fadeOut();
				$(this).addClass("v");
				$.ajax({
		             type : "get",
		             async:false,
		             url : 'http://dz.news.cn/ai?id='+fileUUID+'&a=g&v=1&t=0',
		             dataType : "jsonp",
		             jsonp: "callback",
		             success : function(json){
		                 $(".zan-v span").html(json.g)
		             },
		             error:function(e){
		                  console.log(e)
		             }
		         });
			});
		}
		//关键词检索
		this.searchKW = function(){
			var _this = this;
			$(".search").on("click",function(){	
				_this.search()			
			});
			$("#kw").on('keydown', function(e) {
				var e = e || window.event || event ||  arguments.callee.caller.arguments[0];
				if(e && e.keyCode==13){
					_this.search();
				}
			});
			var k = "";
			$($('meta[name="keywords"]').attr("content").split(",")).each(function(i,v){
				k += '<a href="javascript:void(0);">'+v+'</a>'
			});
			$(".p-kwap").html(k);
			$(".p-kwap a").on("click",function(){
				_this.search( $(this).html() );	
			});

			_this.comment(('1-'+fileUUID),function(data){
				var num = data.contentAll.length;
				$(".s-num").html(num);
			});

			$body.on("click",".search-kw",function(e){
				_this.search( $(this).html() );
			})
		}
		//左侧跟随块 分享鼠标移入时添加hover
		this.fxHover = function(){
			$(".s-item").on("mouseenter",function(){
				$(this).addClass("hover");
			}).on("mouseleave",function(){
				$(this).removeClass("hover");
			})
		};
		//渲染右侧模块样式
		this.renderRight = function(){
			$(".right-wap .name").each(function(i,v){
				var $v = $(v);
				$v.css("margin-left",('-'+$v.innerWidth()/2 +"px") );
			});
		}
		//二维码
		this.ewmFun = function(){
			var $f = $(".c-wx");
			$f.html('<img src="http://www.newsimg.cn/xl2017/images/wx.png" style="width:100%;height:100%;">')
			$(".f-wx").on("mouseover",function(){
				$(".c-wx").fadeIn();
			}).on("mouseout",function(){
				$(".c-wx").fadeOut();
			})
		};
		//根据分类显示不同广告
		this.showTypeAd = function(){
			//时政类：时政,地方,法治,人事,网评,阅读
			//财经类：财经,证券,访谈
			//国际类：
			var sz = ["politics","local","legal","renshi","comments","book"];
			var cj = ["fortune","finance","talking","money"];
			var gj = ["world","gangao","tw"];

			var showAd = false;
			//显示头部iframe广告
			$(sz).each(function(i,v){
				if(v==channelName){
					$(".h-p2 iframe").eq(0).show();
					//showAd = true;
					return;
				}
			});
			
			$(cj).each(function(i,v){
				if(v==channelName){
					$(".h-p2 iframe").eq(1).show();
					return;
				}
			});

			$(gj).each(function(i,v){
				if(v==channelName){
					$(".h-p2 iframe").eq(2).show();
					return;
				}
			});
            
            //默认显示广告2
            /*
			if(!showAd){
				$(".h-p2 iframe").eq(1).show();
			}
			*/
		}
		//当前新闻位置
		this.newsPosition = function(){
			var _this = this;
			var c = _this.newsLocation(channelName);
			//添加class 修复safari中bug
			$(".news-position a").eq(1).attr({"href":c.url,"target":"_blank"}).html(c.name).addClass("news-location");
			$(".news-position a").append("<span class='location-i'>></span>");
		}
		//导航滚动跟随
		this.streamlineFollow = function(){
			var $header = $(".header");
			var headerHeight = $header.height();
			var headerTop = +$header.css("margin-top").split("px")[0];
			var headerBottom = +$header.css("margin-bottom").split("px")[0] ;
			var headerTotalHeight = headerHeight+headerTop+headerBottom;
			var f1Height = $("#fllow1").height();
			var rightAdHeight = null;
			$(window).scroll( function() { 
				var windowHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var heightP1 = $(".part1").height();	 //第一部分高
				$(".fllow1-wap").height(heightP1+"px");
				//左侧广告1
				if( scrollTop>=headerHeight ){
					$('#fllow1').removeClass("hold").addClass("fixed");
					//80 是fllow1距离part1底部的空白间距
					if(headerTotalHeight + heightP1 - f1Height -headerBottom -80< scrollTop){
						$("#fllow1").addClass("hold").removeClass("fixed");
					}
				}else{
					$("#fllow1").removeClass("fixed hold");
				}
			});
		}
		this.pcInit = function(){
			var _this = this;
			var gt = new _this.gotrain();
			gt.init(".nav-ul");
			var rd = new _this.roedeer();
			rd.init([".nav-khd",".nav-ss",".nav-pd"]);
			_this.video();
			//_this.lb();
//			_this.nextNews();
			_this.part2News();
			_this.share();
			_this.xs();							/*右侧炫图 视频切换*/
			_this.videoNews();					//副题视频新闻
			_this.turnTime(".publish-time");	//时间格式处理
			_this.dianZan();					//点赞
			//_this.renderRight();				//渲染右侧模块样式
			_this.searchKW(); 					//关键词检索
			_this.fxHover();					//左侧跟随块 分享鼠标移入时添加hover
			_this.ewmFun();						//二维码
			_this.showTypeAd();					//根据分类显示不同广告
			//_this.newsPosition();				//当前新闻位置
			_this.jiucuo();						//纠错 
			//_this.fuchuang();					//浮窗新闻
		};

		//简版执行脚本 
		this.streamlineInit = function(){
			$(".h-p2-ad3,.s-bottom").hide();	//隐藏头部广告,隐藏左侧跟随块下的评论
			var _this = this;
			var gt = new _this.gotrain();
			gt.init(".nav-ul");
			var rd = new _this.roedeer();
			rd.init([".nav-khd",".nav-ss",".nav-pd"]);
			_this.video();
			//_this.lb();
//			_this.nextNews();
			//_this.part2News();				//第二块导航新闻 加载更多 及右侧跟随部分
			_this.share();
			//_this.xs();							/*右侧炫图 视频切换*/
			_this.videoNews();					//副题视频新闻
			_this.turnTime(".publish-time");	//时间格式处理
			_this.dianZan();					//点赞
			_this.renderRight();				//渲染右侧模块样式
			_this.searchKW(); 					//关键词检索
			_this.fxHover();					//左侧跟随块 分享鼠标移入时添加hover
			_this.ewmFun();						//二维码
			_this.showTypeAd();					//根据分类显示不同广告
			//_this.newsPosition();				//当前新闻位置
			_this.jiucuo();						//纠错 
			//_this.fuchuang();					//浮窗新闻
			_this.streamlineFollow();			//导航滚动跟随

		}

		//移动端初始化
		this.mobileInit = function(){
			var _this = this;
			$(".fllow3-wap, .nav, .part2, .bottom, .fllow1-wap, .lb,.r-des,.r-in,.zan-wap, .p-tags").remove();
			var temp = 	"<div class='m-page'>"+
							"<header class='m-header'>"+
								'<a href="http://m.xinhuanet.com/hlj.htm" class="m-logo"></a>'+
								'<div class="m-nav"></div>'+
							"</header>"+
						   	"<div class='m-title'>" + $(".h-title").html() +" </div>"+
						   	"<div class='m-info'>" + $(".h-info").html() +" </div>"+
						   	"<div class='m-detail'>" + $("#p-detail").html() +" </div>"+
							
							
							"<section class='m-qr-code'>"+
								"<div class='img-full'><img src='http://www.xinhuanet.com/m/img/weixinQRcode.png'></div>"+
								"<p class='txt'>微信扫描二维码，关注新华网</p>"+
							"</section>";
						   	/*
						   	'<div class="news-com-wap">'+
								'<script type="text/javascript">'+
								'xhnc_commentOption={style:\'new\',site:$("meta[name=\'pageid\']").attr("content").split(".")[11]};'+
								'</script>'+
								'<div>'+
								'<script type="text/javascript" src="http://tmisc.home.news.cn/nc/jxhremote-min.js?v=1"></script>'+
								'</div>'+
							'</div>';
							*/
			$body.prepend(temp).show().addClass("mobile");
			
			//副题视频新闻
			(function(){
				var $vf = $(".video-frame");
				if( $vf.length && $.trim( $vf.attr("src") ) && $vf.attr("src").match("vod")){
					$vf.css({"width":"100%","height":"240px","display":"block"});
				}else{
					$vf.hide();
				}
			})();
			
			//时间
			$(".h-time").html( 	(function(){ 
				var $hTmie = $(".h-time").html();
				var hTmieArr = $hTmie.split(" ");
				var length = hTmieArr.length;
				for (var i = 0; i < length; i++) {
					if(hTmieArr[i]){
						return hTmieArr[i];
					}
				};
			})());

			//只留评论
			$(".header,.l-ad-1,.bg6,#news-com-name,#p-detail,.column-name").remove();

			temp = "";
			if($(".relate-news-wap").html()){
				temp +=
					"<div class='m-column'>相关链接</div>"+
			   		"<ul class='m-relative m-ul'>" + $(".relate-news-wap").html() +" </ul>";
			}
		   	temp +=
		   	"<div class='m-hot-wap'>"+
				   	"<div class='m-column'>热点推荐</div>"+
				   	"<ul class='m-hot m-ul thumb pack'></ul>"+
			   	"</div>"+
			   	"<div class='m-footer'><div>"+
		   	"</div>";
		   	$(".m-page").append(temp)
			
			//推荐新闻
			$.ajax({
		             type : "get",
		             async:false,
		             url : 'http://qc.wa.news.cn/nodeart/list?nid='+ 11162564 +'&pgnum=1&cnt=5&attr=63&tp=1&orderby=1&fullPath=1',
		             dataType : "jsonp",
		             jsonp: "callback",
		             success : function(json){
		             	if(json.status ==-1){
		             		$("m-hot-wap").remove();
		             	}else{
		             		var dom = "";
		             		$( json.data.list ).each(function(i,v){
		             			dom += '<li class="thumb-item">'+
											'<a href="'+ v.LinkUrl +'" class="thumb-img" target="_blank">'+
												'<img src="'+ v.PicLinks +'">'+
											'</a>'+
											'<div class="thumb-info">'+
												'<h3 class="thumb-tit">'+
													'<a href="'+ v.LinkUrl +'" target="_blank">'+ v.Title +'</a>'+
												'</h3>'+
												'<div class="thumb-extra">'+
													//'<span class="keyword">微信</span>'+
													
												'</div>'+
											'</div>'+
										'</li>'
		             		});
		             		$(".thumb").append(dom);
		             	}
		             },
		             error:function(e){
		                  console.log(e)
		             }
		         });
			//相关新闻
			$(".relate-news-wap").remove();
			$(".m-footer").append( $(".c-bq") );
			$(".footer").remove();
			//当前新闻位置
			(function(){
				var c = _this.newsLocation(channelName);
				$(".m-logo").after();
			})();

			//弹出层链接
			(function(){
				var netMap = '<div class="m-container"><div class="nav-more-content show"><div class="m-close"></div>' +
                    '<div class="nav-list-head"><div class="nav-close ico-add"></div></div>' +
                    '<div class="nav-list-wrapper"><h2>网站地图</h2>' +
                    '<ul class="channel-list">' +
                    '<li><a href="http://m.news.cn/politics/index.htm">新闻</a></li>' +
                    '<li><a href="http://m.news.cn/fortune/index.htm">财经</a></li>' +
                    '<li><a href="http://m.news.cn/world/index.htm">国际</a></li>' +
                    '<li><a href="http://m.news.cn/ent/index.htm">娱乐</a></li>' +
                    '<li><a href="http://m.news.cn/photo/index.htm">图片</a></li>' +
                    '<li><a href="http://m.news.cn/forum/index.htm">社区</a></li>' +
                    '<li><a href="http://m.news.cn/mil/index.htm">军事</a></li>' +
                    '<li><a href="http://m.news.cn/sports/index.htm">体育</a></li>' +
                    '<li><a href="http://m.news.cn/tech/index.htm">前沿</a></li>' +
                    '<li><a href="http://m.news.cn/edu/index.htm">教育</a></li>' +
                    '<li><a href="http://m.news.cn/comments/index.htm">网评</a></li>' +
                    '<li><a href="http://m.news.cn/gangao/index.htm">港澳台</a></li>' +
                    '<li><a href="http://m.news.cn/legal/index.htm">法治</a></li>' +
                    '<li><a href="http://m.news.cn/society/index.htm">社会</a></li>' +
                    '<li><a href="http://m.news.cn/culture/index.htm">文化</a></li>' +
                    '<li><a href="http://m.news.cn/fashion/index.htm">时尚</a></li>' +
                    '<li><a href="http://m.news.cn/travel/index.htm">旅游</a></li>' +
                    '<li><a href="http://m.news.cn/health/index.htm">健康</a></li>' +
                    '<li><a href="http://m.news.cn/auto/index.htm">汽车</a></li>' +
                    '<li><a href="http://m.news.cn/house/index.htm">房产</a></li>' +
                    '<li><a href="http://m.news.cn/food/index.htm">美食</a></li>' +
                    '<li><a href="http://m.news.cn/book/index.htm">悦读</a></li>' +
                    '<li><a href="http://m.news.cn/video/index.htm">视频</a></li>' +
                    '<li><a href="http://www.xinhuanet.com/video/xinhuaradio/mobile.htm">广播</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/science/index.htm">科普</a></li>'+
                    '</ul>' +
                    '<h2>品牌栏目</h2><ul class="topic-list">' +
                    '<li><a href="http://m.news.cn/xxjxs/index.htm">学习进行时</a></li>' +
                    '<li><a href="http://www.xinhuanet.com/politics/rs.htm">人事任免</a></li>' +
                    '<li><a href="http://sike.xinhuanet.com/static/index.html">思客</a></li>' +
                    '<li><a href="http://www.xinhuanet.com/datanews/web.htm">数据新闻</a></li>' +
                    '<li><a href="http://uav.xinhuanet.com/">无人机</a></li></ul>' +
                    '<h2>地方频道</h2><ul class="location-list">' +
                    '<li><a href="http://m.xinhuanet.com/bj.htm">北京</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/tj.htm">天津</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/hb.htm">河北</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/sx.htm">山西</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/ln.htm">辽宁</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/jl.htm">吉林</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/sh.htm">上海</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/js.htm">江苏</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/zj.htm">浙江</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/ah.htm">安徽</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/fj.htm">福建</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/jx.htm">江西</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/sd.htm">山东</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/hn.htm">河南</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/hb.htm">湖北</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/hn.htm">湖南</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/gd.htm">广东</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/gx.htm">广西</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/hq.htm">海南</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/cq.htm">重庆</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/sc.htm">四川</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/gz.htm">贵州</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/yn.htm">云南</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/xz.htm">西藏</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/sx.htm">陕西</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/gs.htm">甘肃</a></li>' +
                    //'<li><a href="http://m.xinhuanet.com/qh.htm">青海</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/nx.htm">宁夏</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/xj.htm">新疆</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/nmg.htm">内蒙古</a></li>' +
                    '<li><a href="http://m.xinhuanet.com/hlj.htm">黑龙江</a></li></ul>' +
                    '<h2>多语种频道</h2><ul class="language-list">' +
                    '<li><a href="http://xinhuanet.com/english/mobile/index.htm">ENGLISH</a></li>' +
                    '<li><a href="http://spanish.xinhuanet.com/mobile/index.htm">Español</a></li>' +
                    '<li><a href="http://french.xinhuanet.com/mobile/index.htm">Français</a></li>' +
                    '<li><a href="http://jp.xinhuanet.com/m/index.htm">日本語</a></li>' +
                    '<li><a href="http://kr.xinhuanet.com/m/index.htm">한국어</a></li>' +
                    '<li><a href="http://german.xinhuanet.com/dwpdsjb/index.htm">Deutsch</a></li>' +
                    '<li><a href="http://portuguese.xinhuanet.com/mobile/index.htm">Português</a></li>' +
                    '<li><a href="http://arabic.news.cn/mobile/index.htm">عربى</a></li>' +
                    '<li><a href="http://russian.xinhuanet.com/mobile/index.htm">Русский язык</a></li></ul></div></div></div>';
				$body.append(netMap);
				var $mContainer = $(".m-container");
				$mContainer.hide();
				$(".m-close").on("click",function(){
					$mContainer.fadeOut();
				});
				$(".m-nav").on("click",function(){
					$mContainer.fadeIn();
				});
			})();

			_this.mVideo();
			$("body").append($(".m-footer"));
			//简版移动端页面 隐藏热点推荐模块
			$(".streamline-page .m-hot-wap").hide();
		}
	}
	var m = new Module();
	var isMobile = (/iPad|iPhone|Android|Windows Phone|Nokia/).test(navigator.userAgent);	  //当前访问设备为移动端
	if(isMobile){
		m.mobileInit();
	}else{
		if($(".streamline-page").length){
			m.streamlineInit();
		}else{
			m.pcInit();
		}
	}	
});