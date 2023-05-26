var strArr = [];
var cur = 0;
var count;
var youdao_aurl = "https://tts.youdao.com/fanyivoice?le=zh&keyfrom=speaker-target&word=";
var sougou_aurl = "https://fanyi.sogou.com/reventondc/synthesis?speed=0.9&lang=zh-CHS&from=translateweb&speaker=5&text="; //max:6

var url = sougou_aurl;
var ttsBtn = document.getElementById('ops_ttsbtn');
var begin = true;
var timecur;

$(ttsBtn).click(function(){
	event.stopPropagation();
	var auName = $(this).attr('value');

	if(auName=="播报"){
		
		$(this).attr('value','暂停');
		if(begin) { //从头开始
		    //console.log('这是从头开始');
			doTTS();
		}else { //继续播
		    //console.log('这是暂停后开始');
			ttsAudio,currentTime = timecur;
			ttsAudio.play();
		}
	}
	
	if(auName=="暂停"){
		$(this).attr('value','播报');
		ttsAudio.pause();
		begin = false;
	}
	//console.log("==="+begin+"===")
});

function doTTS() {

	var ttsText = document.getElementById('custom').innerText;
	strArr.splice(0,strArr.length); 
	var n = 500; 
    	l = ttsText.length;
	
	for (var i = 0,  l = ttsText.length; i < l/n;  i++) 
	{
		 var a = ttsText.slice(n*i, n*(i+1)); 
		 strArr.push(a); 
	} 
	count = strArr.length;
	//console.log(strArr); 
	//console.log(count); 
	ttsPlay(cur,count,url);
}

function ttsPlay(cts,mts,turl) {
	
	var cur;
	if( cts<=mts ) {
		cur = cts;
	}
	else{
		cur = 0;
	}
	
	var ttsDiv = document.getElementById('bdtts_div_id');
	ttsDiv.removeChild(ttsDiv.childNodes[0]);

	var au1 = '<audio id="tts_autio_id">';
	var sss = '<source id="tts_source_id" src="'+ turl + encodeURI(strArr[cur]) +'" type="audio/mpeg">';
	var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
	var au2 = '</audio>';
	ttsDiv.innerHTML = au1 + sss + eee + au2;

	ttsAudio = document.getElementById('tts_autio_id');
	var audio_src = $("#tts_source_id").attr("src");
	
		if(audio_src){
			ttsAudio.load(); //load()方法重新加载音频/视频
			
			//$(ttsBtn).addClass('playing');
			//$(ttsBtn).attr('disabled','true');
			ttsAudio.play();
		}	
		
	    /**
		//监听音频准备好后
		ttsAudio.oncanplay = function () {
			//console.log( transTime(ttsAudio.duration) );
		}
		**/
		
		//监听音频播放时间并更新进度条
		ttsAudio.addEventListener("timeupdate",function(){
			updateProgress(ttsAudio);
		},false);

		//监听段落播放结束后
		ttsAudio.addEventListener("ended",function(){
			console.log(cur);
			cur++;
			if( cur>=count ) {
				cur = 0;
				ttsAudio.pause();
				$(ttsBtn).removeClass('playing');
				$(ttsBtn).attr('disabled','false');
				//$(ttsBtn).removeAttr("disabled");
				
				$(ttsBtn).attr('value','播报');
				$("#progress").css('width','0%');
			}else
			{
				console.log(cur);
				ttsPlay(cur,count,turl);
			}
		});
		
		/**
		ttsAudio.addEventListener("play", function(){//设置播放
			
		});
		**/
		
		ttsAudio.addEventListener("pause", function(){//设置暂停
			timecur = ttsAudio.currentTime;
		});
		
		//转换音频时长 以”分+秒“显示
		function transTime(time) {
			
			var duration = parseInt(time);
			var min = parseInt(duration/60);
			var sec = duration%60+'';
			
			var isMO = ':';
			
			if(min==0) {
				min = '00';
			}else if(min<10) {
				min = '0'+min;
			}
			
			if(sec.length==1) {
				sec = '0'+sec;
			}
			
			return min+isMO+sec;
			
		}

		//更新进度条
		function updateProgress(audio) {
			var val = Math.round( Math.floor(audio.currentTime) / Math.floor(audio.duration) * 100 );
			$("#progress").css('width',val+'%');
			//$(ttsBtn).val(transTime(audio.currentTime));
		}

}



