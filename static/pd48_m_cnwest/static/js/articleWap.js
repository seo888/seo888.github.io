var $conCon = $(".conCon");
var videoBox = $(".videoBox");
var audioBox = $(".audioBox");

function videoEvt(){
	if(videoBox.length>0){
		$(".conCon,.videoCon").find('.videoBox').each(function(){
			if($(this).css('display') === 'none'){
				var videoInfo = '';
				videoInfo = JSON.parse($(this).html())
				
				if(videoInfo != ""){
					var Video = {
						src : videoInfo["data-src"],
						thumb : videoInfo["data-thumb"]
					};
					
					$(this).html('<video controls preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true&quot;" playsinline="true" src="'+Video.src+'" poster="'+Video.thumb+'" type="video/mp4"></video>').show();
				}
			}else{
				var Video = {
					src : $(this).attr("data-src"),
					thumb : $(this).attr("data-thumb")
				};
				//目前针对视频格式为mp4和flash,出现其他格式时视情况再更改代码
				if(Video.src.indexOf("mp4") != -1){
					$(this).html('<video controls preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="true" webkit-playsinline="true&quot;" playsinline="true" src="'+Video.src+'" poster="'+Video.thumb+'" type="video/mp4"></video>');
				}
				else{
					$(this).html('<iframe style="position: absolute;z-index: 1;top: 0;left: 0;" src="'+Video.src+'" frameborder="0" width="100%" height="100%" allowfullscreen=""></iframe>');
				}
			}
		});
	}
}

function audioEvt(){
	if(audioBox.length>0){
		$conCon.find('.audioBox').each(function(){
			var Audio = {
				src : $(this).attr("data-src"),
				time : $(this).attr("data-time"),
				title : $(this).attr("data-title"),
				pauseBg: "http://toutiao.cnwest.com/static/images/iv_pause.png",
				palyeBg: "http://toutiao.cnwest.com/static/images/iv_play.png"
			};
			
			if(Audio.title.indexOf('.')>-1){
				Audio.title = Audio.title.substring(0,Audio.title.indexOf("."));
			}
			
			$(this).html('<span class="icon"><img class="audioBtn" src="http://toutiao.cnwest.com/static/images/iv_pause.png"><audio src="'+Audio.src+'"></audio><time>'+formatSeconds(Audio.time)+'</time></span><span class="title">'+Audio.title+'</span>');
			
			document.getElementById("conCon").onclick = function(ev){
				var ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				
				if(/*target.nodeName.toLowerCase() == "img" && */target.className == "audioBtn"){
					var A = target.nextSibling;
					if(A.paused){
						A.play();
						target.src = Audio.palyeBg;
						return
					}
					else{
						A.pause()
						target.src = Audio.pauseBg;
						return
					}
				}
			}
		});
	}
}

function GetAjaxData(url,callback)
{
	var arg_2 = arguments[2];//alert(arg_2)
	$.ajax({
		type: 'GET',
		async: false,
		url: url,
		dataType : "jsonp",
		jsonp: "callback",
		success: function(data){
			if(typeof callback == 'function'){
				if(!arg_2)
				{callback(data);}
				else
				{callback(data,arg_2);}
			}
		},
		error:function(data){console.log('ajax error');}  
	});
}

function getTextBox(data,id){
	var node = "";
	var html_data = [];
	for(var i=0;i<data.data.length;i++){
		var imghtml = data.data[i].thumb;
		if(imghtml != ""){
			node += '<a href="' + data.data[i].url + '"><i style="background:url(' + imghtml + ') no-repeat center;background-size:cover;"></i><div><p>' + data.data[i].title + '</p></div><em>' + geMyTime(data.data[i].published,4) + '</em></a>';
		}
	}
	if(node == ""){$("#"+id).parent(".navScroll").parent(".commonList").prev().hide();}
	else{$("#"+id).append(node);}
}

$(document).ready(function() {	
	/*if($(".conCon").children().hasClass("paging"))
	{
		if($(".paging").children().hasClass("prev")){$(".prev").html('<i class="fa fa-angle-double-left"></i>')}
		if($(".paging").children().hasClass("next")){$(".next").html('<i class="fa fa-angle-double-right"></i>')}
	}*/
	
	$(".conShadow").click(function(){
		$conCon.html(allPage);
		
		videoEvt();
		audioEvt();
	});
	
	videoEvt();
	audioEvt();
	ImageEvt();
	
	//48小时新闻排行
	GetAjaxData("http://a.dev.cnwest.com/rollnews?p=0&pagesize=10",getTextBox,'linkList');
})