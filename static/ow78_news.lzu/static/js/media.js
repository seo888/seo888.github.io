//2017-09-23 www.feihuang.net
// 媒体播放修改
//尽量不用flash，兼容类型浏览器。低端IE用windows播放器插件，其它尽量用HTML5
//HTML5不支持flv、wmv等视频格式

//音频
function h5Audio(m){
  if(m=='' || m=='NULL')return false;

  m='http://news.lzu.edu.cn'+m;
  $('#cont iframe').remove();
	str='<audio src="'+m+'" style="width:100%" preload="auto" autoplay="autoplay" controls="controls"></audio>';
	$('#mp3').html(str);
  //MP3JS='<s'+'cript src="/public/audiojs/audio.min.js"></scri'+'pt>';
  //document.write(MP3JS);
  // audiojs.events.ready(function() {
  //   var as = audiojs.createAll();
  // });
}
function a2mp3(){
  $('article a').each(function(){
    u=$(this).attr('href');
    if(u.indexOf('.mp3')>0){
      $(this).after('<audio src="http://news.lzu.edu.cn'+u+'"  controls="controls"></audio>').remove();
    }
  });
}
function lowIEmp3(m){
  	if(m=='' || m=='NULL')return false;
	str='<object classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" id="WindowsMediaPlayer1" width="328" height="64">\
  <param name="URL" value="'+m+'">\
  <param name="rate" value="1">\
  <param name="balance" value="0">\
  <param name="currentPosition" value="0">\
  <param name="defaultFrame" value>\
  <param name="playCount" value="1">\
  <param name="autoStart" value="-1">\
  <param name="currentMarker" value="0">\
  <param name="invokeURLs" value="-1">\
  <param name="volume" value="100">\
  <param name="mute" value="0">\
  <param name="uiMode" value="full">\
  <param name="stretchToFit" value="0">\
  <param name="windowlessVideo" value="-1">\
  <param name="enabled" value="-1">\
  <param name="enableContextMenu" value="0">\
  <param name="fullScreen" value="0">\
  <param name="SAMIStyle" value>\
  <param name="SAMILang" value>\
  <param name="SAMIFilename" value>\
  <param name="captioningID" value>\
  <param name="enableErrorDialogs" value="0">\
</object>';
	$('#mp3').html(str);
}

//视频处理
function h5Video(m,p){
  	if(m=='' || m=='NULL')return false;
  	s=m.toLowerCase();
  	ext=s.slice(s.length-4);
  	switch(ext){
  		case '.flv':
  			h5Player(m);
  			flvjsPlayer(m);
  			break;
  		case '.mp4':
  			h5Player(m);
  			break;
      case '.m4v':
        h5Player(m);
        break;
  		default:
  			str='<h4>您的浏览器不支持当前视频格式</h4><h5>视频下载地址：<a href="'+m+'">'+m+'</a></h5>';
  			$('#flvnews').html(str);
  	}
}


function lowIEvideo(m,p){
  	if(m=='' || m=='NULL')return false;
  	s=m.toLowerCase();
  	ext=s.slice(s.length-4);
  	switch(ext){
  		case '.flv':
  			swfPlayer(m,p);
  			break;
          case '.mp4':
             swfPlayer(m,p);
             break;
  		default:
  			objPlayer(m);
  	}
}

function seniorIEvideo(m,p){
  	if(m=='' || m=='NULL')return false;
  	s=m.toLowerCase();
  	ext=s.slice(s.length-4);
  	switch(ext){
  		case '.flv':
  			h5Player(m);
  			flvjsPlayer(m);
  			break;
  		case '.mp4':
  			h5Player(m);
  			break;
  		default:
  			objPlayer(m);
  	}
}

//------播放器
function h5Player(m){
	str='<video width="100%" height="auto" controls="controls" autoplay="autoplay" id="hplayer">\
		<source src="'+m+'" type="video/mp4" />\
		您的浏览器不支持HTML5视频格式，需更换浏览器</video>';
    $('#flvnews').html(str);

	playerEnd();
}

function objPlayer(m){
str='<div><object id="MediaPlayer" classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="680" height="480" standby="Loading Windows Media Player components…" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,7,1112">\
<param name="FileName" value="'+m+'">\
<param name="AutoStart" value="true">\
<param name="ShowControls" value="true">\
<param name="BufferingTime" value="2">\
<param name="ShowStatusBar" value="true">\
<param name="AutoSize" value="true">\
<param name="InvokeURLs" value="false">\
<param name="AnimationatStart" value="1">\
<param name="TransparentatStart" value="1">\
<param name="Loop" value="1"></object></div>';
  	$('#flvnews').html(str);
}

function swfPlayer(m,p){
var so = new SWFObject("/public/cu/player.swf","myCuPlayer","100%","450","9","#000000");
so.addParam("allowfullscreen","true");
so.addParam("allowscriptaccess","always");
so.addParam("wmode","opaque");
so.addParam("quality","high");
so.addParam("salign","lt");
//播放器配置文件-----------------------------
so.addVariable("JcScpFile","/public/cu/set.xml"); //配置文件地址
//视频文件及略缩图--------------------------
so.addVariable("JcScpVideoPath",m); //视频地址
if(p.length<5) so.addVariable("JcScpImg","/public/cu/xiexian.png");
else so.addVariable("JcScpImg",p);//视频图片
so.addVariable("JcScpAutoPlay","yes"); //是否自动播放
so.addVariable("JcScpStarTime","0"); //起始时间点(暂未启用)
so.addVariable("JcScpEndTime","0"); //结束时间点
so.addVariable("JcScpCuePointInfo",""); //提示点信息
so.addVariable("JcScpCuePointTime",""); //提示点秒数值
so.addVariable("ShowJcScpAFront","no");
so.addVariable("ShowJcScpAVideo","no");
so.addVariable("ShowJcScpAPause","no");
so.addVariable("ShowJcScpACorner","no");
so.addVariable("ShowJcScpAEnd","no");
so.addVariable("ShowJcScpAMoveText","no");
so.addVariable("JcScpSharetitle",""); //视频标题信息
so.write("flvnews");

document.write ('<sc'+'ript type="text/javascript" src="/public/cu/action.js"></scr'+'ipt>');

	playerEnd();
}

function flvjsPlayer(m){
       var player = document.getElementById('hplayer');
        if (flvjs.isSupported()) {
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: m
            });
            flvPlayer.attachMediaElement(hplayer);
            flvPlayer.load(); //加载
        }
	playerEnd();
}

function playerEnd(){
  $('#flvnews').css("padding","10px 0");
  $("video").bind("contextmenu",function(){
    return false;
  });
}