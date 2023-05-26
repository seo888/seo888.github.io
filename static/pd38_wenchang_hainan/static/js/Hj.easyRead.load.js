// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.load.js
/*文件版本：1.2
/*文件描述：语音Load
/*普通XMLHttp类也加入到此
/************************************************************************/
function creat(){
	if(typeof XMLHttpRequest !="undefined"){
		var oXHR=new XMLHttpRequest();
		return oXHR;
		}else if(window.ActiveXObject){
			var aversions=["MSXML2.XMLHttp.8.0","MSXML2.XMLHttp.7.0","MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0"];
			for(i=0;i<aversions.length;i++){
			try{
				var oXHR=new ActiveXObject(aversions[i]);
				return oXHR;
			}catch(oError){}
	   }
	}
}

function getClientHeight()
{
    //可见高
    var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
    return clientHeight;
}

//获得网页内容高度
function getContentHeight()
{
    //可见高
    var ContentHeight=document.body.scrollHeight;//其它浏览器默认值

    if(navigator.userAgent.indexOf("Chrome")!=-1)
    {
        ContentHeight= document.body.clientHeight;
    }

    if(navigator.userAgent.indexOf("Firefox")!=-1)
    {
        ContentHeight=document.body.offsetHeight;
    }
    return ContentHeight;
}

Hj.easyRead.load=function(){
		return new Object();
};

//Hj.easyRead.load.request="http://translate.google.com/translate_Hj.easyRead.load?tl={lang}&q={text}";
//Hj.easyRead.load.request="http://act.hunan.gov.cn/voice.php?tl={lang}&t={text}&s={speed}";//000 
Hj.easyRead.load.request="http://voice.huuji.com/?tl={lang}&t={text}&s={speed}";//000 
Hj.easyRead.load.engine="Hj.YY";
Hj.easyRead.load.lang="zh";
Hj.easyRead.load.playBox="Hj.easyRead.load_Player_Box";
Hj.easyRead.load.currentLoad=0;
Hj.easyRead.load.currentPlay=0;
Hj.easyRead.load.speed=0;
Hj.easyRead.load.sound=80;
Hj.easyRead.load.playable=true;
Hj.easyRead.load.playBarBox="Hj-EasyRead-SpeakerProcesser-Position-Action";
Hj.easyRead.load.playBar="Hj-EasyRead-SpeakerProcesser-Position-Action-Icon";
Hj.easyRead.load.hasBar=false;
Hj.easyRead.load.playBarWidth=$("#"+Hj.easyRead.load.playBarBox).width();
Hj.easyRead.load.playBarDat=14;
//Hj.easyRead.load.loadType="JSONP";//URL
Hj.easyRead.load.loadType="JSONP";
Hj.easyRead.load.popLabel="Hj-EasyRead-Pop-Title";
Hj.easyRead.load.popLabel1="Hj-EasyRead-Pop-Title-t";
Hj.easyRead.load.popLabel2="Hj-EasyRead-Pop-Title-c";
//Hj.easyRead.load.standByBox="#MainContent";
//Hj.easyRead.load.standByBox=".i-main-footer-zt";
Hj.easyRead.load.tempTID=0;
Hj.easyRead.load.curPoint=null;
Hj.easyRead.load.pointboxId="pointControl"; //开关ID-Box
Hj.easyRead.load.pointtextId="pointControlText"; //开关ID
Hj.easyRead.load.pointcloseText="开启指读"; //关闭状态提示
Hj.easyRead.load.pointopenText="关闭指读"; //开启状态提示
Hj.easyRead.load.pointRead=false;
Hj.easyRead.load.imagePath="http://daohang.hunan.gov.cn/HJFront/"; //图片路径
Hj.easyRead.load.helpPath="http://www.hunan.gov.cn/fzlm/wza/201506/t20150612_4831824.html";  //帮助路径
Hj.easyRead.load.btnControl="Hj-easyRead-Smooth"; //控制开关ID

Hj.easyRead.load.crossboxId="crossControl"; //开关ID-Box
Hj.easyRead.load.crosstextId="crossControlText"; //开关ID
Hj.easyRead.load.crosscloseText="开启连读"; //关闭状态提示
Hj.easyRead.load.crossopenText="关闭连读"; //开启状态提示
Hj.easyRead.load.crossRead=false;
Hj.easyRead.load.isExpanded=false;
Hj.easyRead.load.bottomOffset=155;
Hj.easyRead.load.bottomPix=30;


Hj.easyRead.load.init=function(){
	$("#"+Hj.easyRead.load.pointboxId).css("display","block");
	$("#"+Hj.easyRead.load.crossboxId).css("display","block");
	//初始化按钮状态
	$("#"+Hj.easyRead.load.pointtextId).text(Hj.easyRead.load.pointcloseText);
	$("#"+Hj.easyRead.load.pointtextId).attr("title",Hj.easyRead.load.pointcloseText);
	
	$("#"+Hj.easyRead.load.crosstextId).text(Hj.easyRead.load.crosscloseText);
	$("#"+Hj.easyRead.load.crosstextId).attr("title",Hj.easyRead.load.crosscloseText);
	
	$("#"+Hj.easyRead.load.pointtextId).live('click',function(e) {
		Hj.easyRead.load.changePoint();
	});
	$("#"+Hj.easyRead.load.crosstextId).live('click',function(e) {
		Hj.easyRead.load.changeCross();
	});
	$("#Hj-easyRead-WeChat").live("click",function(e){
		$("#WeChat-Code").toggle('slow');
	});
	$("a").each(function(index, element) {
        if($(this).attr("title")==null){
			//$(this).attr("title",$(this).text());
		}
    });
	Hj.easyRead.load.splitHTML();
	Hj.easyRead.load.STYLE.create.simple("#div_voiceArea");
	
	//常德*交通厅 body加ID
	$("body").attr("id","CBody");
	//$(".smooth").css("width","auto");
	//$(".smooth-box").css("width","auto");

	if($(window).scrollTop()>0){
		$(".ReturnToTop-Btn").css("display","");
	}else{
		$(".ReturnToTop-Btn").css("display","none");	
	}
		//$(".Hj-EasyRead-Container").css("left",(($(window).width()>$(document).width()?$(window).width():$(document).width())/2+($(window).width()>$(document).width()?530:520))+"px");
		//$(".Hj-EasyRead-Container").css("left",($(Hj.easyRead.load.standByBox).offset().left+$(Hj.easyRead.load.standByBox).width()+20)+"px");
		//$(".Hj-EasyRead-Container").css("top",($(this).scrollTop()+$(window).height()-$(".Hj-EasyRead-Container").height()-20-($(".Hj-EasyRead-Icons").css("display")=="none"?-250:0))+"px");
		//$(".Hj-EasyRead-Container").animate().stop(true).animate({"bottom":(20-$(window).scrollTop())+"px"});
    /*$(window).scroll(function(e) {
        if($(this).scrollTop()>0){
			$(".ReturnToTop-Btn").css("display","");
		}else{
			$(".ReturnToTop-Btn").css("display","none");	
		}
		//$(".Hj-EasyRead-Container").css("left",(($(window).width()>$(document).width()?$(window).width():$(document).width())/2+($(window).width()>$(document).width()?530:520))+"px");
		//$(".Hj-EasyRead-Container").css("left",($(Hj.easyRead.load.standByBox).offset().left+$(Hj.easyRead.load.standByBox).width()+20)+"px");
		//$(".Hj-EasyRead-Container").css("left",($(window).width()-120)+"px").css("bottom","50px");
		//$(".Hj-EasyRead-Container").animate().stop(true).animate({"bottom":(20-$(window).scrollTop())+"px"});
		//$(".Hj-EasyRead-Container").css("bottom",(20-$(window).scrollTop())+"px");
	    Hj.easyRead.load.timer();
    });
    $(window).resize(function(e) {
        if($(this).scrollTop()>0){
			$(".ReturnToTop-Btn").css("display","");
		}else{
			$(".ReturnToTop-Btn").css("display","none");	
		}
		//$(".Hj-EasyRead-Container").css("left",($(window).width()-120)+"px").css("bottom","50px");
		//$(".Hj-EasyRead-Container").css("left",(($(window).width()>$(document).width()?$(window).width():$(document).width())/2+($(window).width()>$(document).width()?530:520))+"px");
		//$(".Hj-EasyRead-Container").css("left",($(Hj.easyRead.load.standByBox).offset().left+$(Hj.easyRead.load.standByBox).width()+20)+"px");
	    Hj.easyRead.load.timer();
		//$(".Hj-EasyRead-Container").animate({"top":($(this).scrollTop()+$(window).height()-$(".Hj-EasyRead-Icons").height()-20-($(".Hj-EasyRead-Icons").css("display")=="none"?-250:0))+"px"});
		//$(".Hj-EasyRead-Container").animate().stop(true,false).animate({"bottom":(20-$(window).scrollTop())+"px"});
    });
	*/
    $(".ReturnToTop-Btn").click(function(e){
			$(window).scrollTop(0);
    });
		
	Hj.easyRead.load.timer();
};

Hj.easyRead.load.timer = function(){
	//定时执行函数。
	var cHeight = getClientHeight();	//可见高度
	var dHeight = getContentHeight(); //内容高度
	var topPix = $(window).scrollTop() + cHeight - Hj.easyRead.load.bottomPix - $(".Hj-EasyRead-Container").height();
	if(topPix > dHeight- Hj.easyRead.load.bottomOffset - $(".Hj-EasyRead-Container").height()){
		topPix = dHeight- Hj.easyRead.load.bottomOffset - $(".Hj-EasyRead-Container").height();
		$(".Hj-EasyRead-Container").css("bottom",(Hj.easyRead.load.bottomOffset+Hj.easyRead.load.bottomPix)+"px");
	}else{
	    $(".Hj-EasyRead-Container").css("bottom","");
	}
	if($(window).scrollTop()>0){
		$(".ReturnToTop-Btn").css("display","");
	}else{
		$(".ReturnToTop-Btn").css("display","none");	
	}
	//$(".Hj-EasyRead-Container").css("top",topPix+"px");
	window.setTimeout(function(){return function(){Hj.easyRead.load.timer()}}(),100);
}


Hj.easyRead.load.changePoint=function(){
	if(Hj.easyRead.load.crossRead){
		Hj.easyRead.load.changeCross();
		$("#"+Hj.easyRead.load.crosstextId).removeClass("Hj_crossClicked");
	}
	if(Hj.easyRead.load.pointRead){
		Hj.easyRead.load.pointRead=false;
		$("#"+Hj.easyRead.load.pointtextId).text(Hj.easyRead.load.pointcloseText);
		$("#"+Hj.easyRead.load.pointtextId).attr("title",Hj.easyRead.load.pointcloseText);
		$("#"+Hj.easyRead.load.pointtextId).removeClass("Hj_pointClicked");
		if(Hj.easyRead.load.curPoint!=null){
			Hj.easyRead.load.curPoint.css("color","");
			Hj.easyRead.load.curPoint.css("background-color","");
		}
	}else{
		Hj.easyRead.load.pointRead=true;
		$("#"+Hj.easyRead.load.pointtextId).text(Hj.easyRead.load.pointopenText);
		$("#"+Hj.easyRead.load.pointtextId).attr("title",Hj.easyRead.load.pointopenText);
		$("#"+Hj.easyRead.load.pointtextId).removeClass().addClass("Hj_functionBg Hj_pointClicked");
	}
}

Hj.easyRead.load.changeCross=function(){
	if(Hj.easyRead.load.pointRead){
			Hj.easyRead.load.changePoint();
			$("#"+Hj.easyRead.load.pointtextId).removeClass("Hj_pointClicked");
		}
	if(Hj.easyRead.load.crossRead){
		Hj.easyRead.load.crossRead=false;
		$("#"+Hj.easyRead.load.crosstextId).text(Hj.easyRead.load.crosscloseText);
		$("#"+Hj.easyRead.load.crosstextId).attr("title",Hj.easyRead.load.crosscloseText);
		$("#"+Hj.easyRead.load.crosstextId).removeClass("Hj_crossClicked");
		if(Hj.easyRead.load.curPoint!=null){
			Hj.easyRead.load.curPoint.css("color","");
			Hj.easyRead.load.curPoint.css("background-color","");
		}
		
	}else{
		Hj.easyRead.load.crossRead=true;
		$("#"+Hj.easyRead.load.crosstextId).text(Hj.easyRead.load.crossopenText);
		$("#"+Hj.easyRead.load.crosstextId).attr("title",Hj.easyRead.load.crossopenText);
		$("#"+Hj.easyRead.load.crosstextId).removeClass().addClass("Hj_functionBg Hj_crossClicked");
		
	}
}

Hj.easyRead.load.string=new Array();
Hj.easyRead.load.voice=new Array();

Hj.easyRead.load.resume=function(){
	Hj.easyRead.load.playable=true;
	Hj.easyRead.load.playNext();
}
Hj.easyRead.load.pause=function(){
	Hj.easyRead.load.playable=false;
}

Hj.easyRead.load.splitPa=function(targetID){
	Hj.easyRead.load.string=new Array();
	Hj.easyRead.load.voice=new Array();
	$("#"+targetID+" voice.Hj-EasyRead-Pointer-Label").each(function(index, element) {
        Hj.easyRead.load.string.push($(this).text().replace(/\s/gim,""));
    });
}

Hj.easyRead.load.playNext=function(){
	//Hj.easyRead.load.currentPlay++;
	//alert(Hj.easyRead.load.voice[Hj.easyRead.load.currentPlay]);
	//document.getElementById(Hj.easyRead.load.playBox).innerHTML=string;
	//Hjplay(Hj.easyRead.load.voice[Hj.easyRead.load.currentPlay]);
		if(Hj.easyRead.load.hasBar){
			$("#"+Hj.easyRead.load.playBar).css("width",(parseFloat(Hj.easyRead.load.currentPlay)/parseFloat(Hj.easyRead.load.string.length)*($("#"+Hj.easyRead.load.playBarBox).width()-Hj.easyRead.load.playBarDat)+Hj.easyRead.load.playBarDat)+"px");
		}
		if(Hj.easyRead.load.currentPlay>Hj.easyRead.load.voice.length){
			//alert("播放结束！");
		}else{
			if(!Hj.easyRead.load.playable){
				return;
			}
			var HjeasyReadVoice=soundManager.createSound({
				id: 'Hj-easyRead-Voice-'+Hj.easyRead.load.currentPlay,
				url: Hj.easyRead.load.voice[Hj.easyRead.load.currentPlay++],
				autoLoad: true,
				autoPlay: false,
				onload: function() {
				  //alert('The sound '+this.id+' loaded!');
				  this.play();
				},
				onfinish:function(){
					Hj.easyRead.load.playNext();
				},
				ontimeout:function(){
					Hj.easyRead.load.playNext();
				},
				volume: Hj.easyRead.load.sound
			});
		}
}

Hj.easyRead.load.playFirst=function(){
		if(Hj.easyRead.load.currentPlay>Hj.easyRead.load.voice.length){
			//alert("播放结束！");
		}else{
			if(!Hj.easyRead.load.playable){
				return;
			}
			soundManager.stopAll();
			var HjeasyReadVoice=soundManager.createSound({
				id: 'Hj-easyRead-Voice-'+Math.random(),
				url: Hj.easyRead.load.voice[0],
				autoLoad: true,
				autoPlay: false,
				onload: function() {
				  //alert('The sound '+this.id+' loaded!');
				  this.play();
				},
				volume: Hj.easyRead.load.sound
			});
		}
}

Hj.easyRead.load.getVoice=function(text){
	var url=Hj.easyRead.load.request.replace("{lang}",Hj.easyRead.load.lang);
	if(text==""){
			Hj.easyRead.load.loadNext();
	}
	if(checkMonthDay(text)){
		text=text.replace("-","月");
		text=text+"日";
	}
	url=url.replace("{text}",text);
	url=url.replace("{speed}",Hj.easyRead.load.speed);
	url=encodeURI(url);
	//Hj.easyRead.load.voice.push(url);
	if(Hj.easyRead.load.loadType=="JSONP"){
			//$.getJSON(url,function(data){Hj.easyRead.load.jsonCallBack(data)});
			 $.ajax({
             url:url,
             dataType:"jsonp",
             jsonp:"callback",
             success:function(data){
                 Hj.easyRead.load.jsonCallBack(data);
             }
        });
	}else{
			var r=creat();
			r.open("GET",url,true);
			r.onreadystatechange=function(){
				if(r.readyState==4&&(r.status==200||r.status==302)){
					eval("var rest="+r.responseText+";");
					if(rest.url!="jjerror"){
						Hj.easyRead.load.voice.push(rest.url);
						//var pre_V=new Image();
						//pre_V.src=rest.url;
						if(Hj.easyRead.load.currentPlay==0){
							Hj.easyRead.load.playNext();
						}
					}
					Hj.easyRead.load.loadNext();
				}else if(r.readyState==4){
					Hj.easyRead.load.loadNext();
				}
			};
			r.send(null);
	}
}


Hj.easyRead.load.readText=function(text){
	var url=Hj.easyRead.load.request.replace("{lang}",Hj.easyRead.load.lang);
	if(text==""){
			return;
			//Hj.easyRead.load.loadNext();
	}
	Hj.easyRead.load.currentPlay=0;
	Hj.easyRead.load.voice=new Array();
	Hj.easyRead.load.string=new Array();
	if(checkMonthDay(text)){
		text=text.replace("-","月");
		text=text+"日";
	}
	url=url.replace("{text}",text);
	url=url.replace("{speed}",Hj.easyRead.load.speed);
	url=encodeURI(url);
	//Hj.easyRead.load.voice.push(url);
	if(Hj.easyRead.load.loadType=="JSONP"){
			//$.getJSON(url,function(data){Hj.easyRead.load.jsonCallBack(data)});
			 $.ajax({
             url:url,
             dataType:"jsonp",
             jsonp:"callback",
             success:function(data){
                 Hj.easyRead.load.jsonCallBackHover(data);
             }
        });
	}else{
			var r=creat();
			r.open("GET",url,true);
			r.onreadystatechange=function(){
				if(r.readyState==4&&(r.status==200||r.status==302)){
					eval("var rest="+r.responseText+";");
					if(rest.url!="jjerror"){
						Hj.easyRead.load.voice.push(rest.url);
						//var pre_V=new Image();
						//pre_V.src=rest.url;
						if(Hj.easyRead.load.currentPlay==0){
							Hj.easyRead.load.playFirst();
						}
					}
				}
			};
			r.send(null);
	}
}

Hj.easyRead.load.jsonCallBack=function(data){
			var rest=data;
			if(rest.url!="jjerror"){
				Hj.easyRead.load.voice.push(rest.url);
				//var pre_V=new Image();
				//pre_V.src=rest.url;
				if(Hj.easyRead.load.currentPlay==0){
					Hj.easyRead.load.playNext();
				}
			}
			Hj.easyRead.load.loadNext();
}

Hj.easyRead.load.jsonCallBackHover=function(data){
			var rest=data;
			if(rest.url!="jjerror"){
				Hj.easyRead.load.voice.push(rest.url);
				//var pre_V=new Image();
				//pre_V.src=rest.url;
				if(Hj.easyRead.load.currentPlay==0){
					Hj.easyRead.load.playFirst();
				}
			}
}

Hj.easyRead.load.loadNext=function(){
	if(Hj.easyRead.load.currentLoad<Hj.easyRead.load.string.length)
	Hj.easyRead.load.getVoice(Hj.easyRead.load.string[Hj.easyRead.load.currentLoad++]);
}

Hj.easyRead.load.read=function(targetID){
	Hj.easyRead.load.hasBar=false;
	Hj.easyRead.load.splitPa(targetID);
	Hj.easyRead.load.loadNext();
}

Hj.easyRead.load.readWithBar=function(targetID){
	Hj.easyRead.load.hasBar=true;
	Hj.easyRead.load.currentLoad=0;
	Hj.easyRead.load.currentPlay=0;
	Hj.easyRead.load.splitPa(targetID);
	Hj.easyRead.load.loadNext();
}

Hj.easyRead.load.createReadBox=function(targetID,style){
	Hj.easyRead.load.splitPa(targetID);
	Hj.easyRead.load.currentLoad=0;
	Hj.easyRead.load.currentPlay=0;
	Hj.easyRead.load.STYLE.create[style];
	Hj.easyRead.load.STYLE.listen[style];
}

Hj.easyRead.load.STYLE={
	create:{
	simple:function(targetID){
				var outString = '';
				outString += ("<style type=\"text\/css\">");
				outString += ("#Hj-EasyRead-SpeakerBox { height: 28px; width: 470px; \/*background-color: #f2f9ff; padding-top:9px;*\/ font-size:0px; line-height:200; overflow:hidden; margin:10px auto; \/*background:url("+Hj.easyRead.load.imagePath+"simple.Hj.EasyReadBox.Bg.jpg) no-repeat center center;*\/ }");
				outString += ("#Hj-EasyRead-SpeakerBox span { display:inline-block; \/*margin-left:15px; width:33px;*\/ height:28px; vertical-align:top; background-position:center center; background-repeat:no-repeat; }");
				outString += ("#Hj-EasyRead-SpeakerBox span.Hj-EasyRead-Process-Bg { }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Position { width:433px; height:28px; background:url("+Hj.easyRead.load.imagePath+"simple.Hj.easyRead.Box.Bg.gif) no-repeat right center; margin-top:0px; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Position-Action { height:28px; margin-left:0px; width:366px; position:relative; }");
				outString += ("#Hj-EasyRead-SpeakerBox span.Hj-EasyRead-SpeakerProcesser-Position-Action-Icon { height:28px; width:14px; position:absolute; top:0px; left:0px; background:url("+Hj.easyRead.load.imagePath+"simple.Hj.easyRead.Played.Bg.gif) no-repeat right center transparent; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerAction-Start { background-image:url("+Hj.easyRead.load.imagePath+"simple.Hj.easyRead.play.gif); cursor:pointer; margin-top:0px; width:35px; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerAction-Stop { background-image:url("+Hj.easyRead.load.imagePath+"simple.Hj-EasyRead-SpeakerAction-Stop.jpg); cursor:pointer; display:none; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerAction-Volumn-Icon { background-image:url("+Hj.easyRead.load.imagePath+"Hj-EasyRead-SpeakerAction-Volumn-Icon.jpg); margin-left:20px; display:none; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Volume { margin-left:0px; margin-top:0px; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Volume-Action { height:28px; margin-left:0px; width:31px; background:url("+Hj.easyRead.load.imagePath+"simple.Hj.easyRead.Volumn.Off.gif) no-repeat center center; position:relative; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Volume-Action a#Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn { position: absolute; right:0px; top:0px; width:31px; height:28px; }");
				outString += ("#Hj-EasyRead-SpeakerBox span#Hj-EasyRead-SpeakerProcesser-Volume-Action a#Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn2 { position: absolute; left:0px; top:0px; width:23px; height:28px; background:url("+Hj.easyRead.load.imagePath+"simple.Hj.easyRead.Volumn.On.gif) no-repeat left center; }");
				outString += ("<\/style>");
				outString += ("     <div id=\"Hj-EasyRead-SpeakerBox\">");
				outString += ("    	<span id=\"Hj-EasyRead-SpeakerAction-Start\"><\/span>");
				outString += ("    	<span id=\"Hj-EasyRead-SpeakerAction-Stop\"><\/span>");
				outString += ("    	<span id=\"Hj-EasyRead-SpeakerProcesser-Position\" class=\"Hj-EasyRead-Process-Bg\">");
				outString += ("        	<span id=\"Hj-EasyRead-SpeakerProcesser-Position-Action\" class=\"Hj-EasyRead-Process-bar\">");
				outString += ("            	<span class=\"Hj-EasyRead-SpeakerProcesser-Position-Action-Icon\" id=\"Hj-EasyRead-SpeakerProcesser-Position-Action-Icon\"><\/span>");
				outString += ("          <\/span>");
				outString += ("          <span id=\"Hj-EasyRead-SpeakerProcesser-Volume\" class=\"Hj-EasyRead-Process-Bg\">");
				outString += ("            <span id=\"Hj-EasyRead-SpeakerProcesser-Volume-Action\" class=\"Hj-EasyRead-Process-bar\">");
				outString += ("                <a href=\"javascript:;\" id=\"Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn2\"><\/a>");
				outString += ("                <a href=\"javascript:;\" id=\"Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn\"><\/a>");
				outString += ("              <\/span>");
				outString += ("          <\/span>");
				outString += ("        <\/span>");
				outString += ("    <\/div>");
				$(targetID).html(outString);
				Hj.easyRead.load.STYLE.listen.simple("div_content");
			}
	},
			listen:{
				simple:function(ContentBox){					
						var bool=false;
						var offsetX=0;
						var offsetY=0;
						var played=false;     //已开始播放
						var playing=false;    //正在播放
						//var This = this;
						//alert(This);
						$("#Hj-EasyRead-SpeakerAction-Start").hover(function(e) {
							$(this).css("background-image",$(this).css("background-image").replace(/\.gif/gi,"\.Hover\.gif"));
						},function(e) {
							$(this).css("background-image",$(this).css("background-image").replace(/\.Hover\.gif/gi,"\.gif"));
						});
						$("#Hj-EasyRead-SpeakerAction-Start").live('click',function(e) {
							if(played&&!playing){
								$(this).css("background-image",$(this).css("background-image").replace(/play\./gi,"pause\."));
								//played=true;
								playing=true;
								Hj.easyRead.load.resume();
							}else if(!played&&!playing){
								$(this).css("background-image",$(this).css("background-image").replace(/play\./gi,"pause\."));
								played=true;
								playing=true;
								Hj.easyRead.load.readWithBar(ContentBox);
							}else{
								$(this).css("background-image",$(this).css("background-image").replace(/pause\./gi,"play\."));
								//played=false;
								playing=false;
								Hj.easyRead.load.pause();
							}
						});
						$("#Hj-EasyRead-SpeakerAction-Stop").live('click',function(e) {
								Hj.easyRead.load.pause();
								played=false;
								playing=false;
						});
						$("#Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn").focus(function(e) {
								$(this).blur();
						});
						$("#Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn").live('click',function(e){
							var position = event.x;
							if(position<8) position=8;
							if(position<13&&position>8) position=13;
							if(position<18&&position>13) position=18;
							if(position>18&&position<23) position=23;
							if(position>23) position=28;
							x=position*2;
							$("#Hj-EasyRead-SpeakerProcesser-Volume-Action-Btn2").css("width", position+"px");
							Hj.easyRead.load.sound=x*2;
            			});
					}
			}
	};
	
Hj.easyRead.load.getTitle=function(tag){
		switch(tag.toLowerCase()){
				case "a":
						return "链接至";
						break;
				case "img":
						return "图片";
						break;
				case "embed":
						return "媒体";
						break;
				default:
						return "文本";
						break;
		}
}

Hj.easyRead.load.getContent=function(obj){
		switch(obj.get(0).tagName.toLowerCase()){
				case "a":
						return (null==obj.attr("title")||obj.attr("title")=="")?obj.text():obj.attr("title");
						break;
				case "img":
						return (null!=obj.attr("alt")&&obj.attr("alt")!="")?obj.attr("alt"):(null!=obj.attr("title")&&obj.attr("title")!="")?obj.attr("title"):"";
						break;
				case "embed":
						return "";
						break;
				default:
						return (null==obj.attr("title")||obj.attr("title")=="")?obj.text():obj.attr("title");
						break;
		}
}

Hj.easyRead.load.popTitle=function(obj){
		//$("#"+Hj.easyRead.load.popLabel1).text(Hj.easyRead.load.getTitle(obj.get(0).tagName));
		$("#"+Hj.easyRead.load.popLabel2).text(Hj.easyRead.load.getContent(obj));
		if($("#"+Hj.easyRead.load.popLabel).text().length<13){
				$("#"+Hj.easyRead.load.popLabel).css("font-size","72px");
		}else if($("#"+Hj.easyRead.load.popLabel).text().length>22){
				$("#"+Hj.easyRead.load.popLabel).css("font-size","36px");
		}else if($("#"+Hj.easyRead.load.popLabel).text().length>30){
				$("#"+Hj.easyRead.load.popLabel).css("font-size","30px");
		}
}

Hj.easyRead.load.CHTML=new Array();
Hj.easyRead.load.nodeText=function(obj){
	//if(obj.nodeType==3) return;
	if(obj.nodeName.toLowerCase()=="script"||obj.nodeName.toLowerCase()=="style"||obj.nodeName.toLowerCase()=="input"||obj.nodeName.toLowerCase()=="textarea"){return;}
	for(var i=0;i<obj.childNodes.length;i++){
		try{
		
		if(obj.childNodes[i].hasChildNodes()){
			Hj.easyRead.load.nodeText(obj.childNodes[i]);
		}
		if(obj.childNodes[i].nodeType==3&&!/^\s+$/.test(obj.childNodes[i].nodeValue)){
			//obj.childNodes[i].innerHTML="<voice class='Hj-EasyRead-Pointer-Label'>"+obj.childNodes[i].nodeValue+"</voice>";
			var tempHTML=document.createElement("voice");
			tempHTML.className="Hj-EasyRead-Pointer-Label";
			tempHTML.innerHTML=obj.childNodes[i].nodeValue;
			obj.replaceChild(tempHTML,obj.childNodes[i]);
		}
		}catch(o){}
	}
}
Hj.easyRead.load.splitHTML=function(){
	
	//加载样式
	 var HjeasyReadStyle = document.createElement("link");
	 HjeasyReadStyle.rel = "stylesheet";
	 HjeasyReadStyle.type = "text/css";
	 HjeasyReadStyle.href = Hj.easyRead.load.imagePath+"Hj.easyRead.css";
	 var HjeasyReadStylehead = document.getElementsByTagName("head")[0];
	 HjeasyReadStylehead.appendChild(HjeasyReadStyle);
	//加载控件按钮
	var easyReadBtn=document.createElement("div");
	easyReadBtn.className='Hj-EasyRead-Container';
	//easyReadBtn.id='Hj-easyRead-smoothTips';
	//easyReadBtn.style.display='none';
	easyReadBtn.innerHTML='\
    <div class="Hj-EasyRead-Icons" id="Hj-easyRead-smoothTips" style="display:none;">\
        <a title="无障碍操作说明" id="helpControl" href="'+Hj.easyRead.load.helpPath+'" target="_blank">无障碍操作说明</a>\
        <a title="开启显示屏" id="panelControlText" href="javascript:;" target="_self">开启显示屏</a>\
        <a title="开启辅助线" id="lineControlText" href="javascript:;" target="_self">开启辅助线</a>\
        <a title="高对比度" id="lightControl" href="javascript:;" target="_self">高对比度</a>\
        <a title="开启指读" id="pointControlText" href="javascript:;" target="_self">开启指读</a>\
        <a title="开启连读" id="crossControlText" href="javascript:;" target="_self">开启连读</a>\
    	<a title="文字放大" id="textUpControlText" href="javascript:;" target="_self">字体放大</a>\
        <a title="文字已经缩小到最小" disabled="disabled" id="textDownControlText" href="javascript:;" target="_self">字体缩小</a>\
        <a title="页面放大" id="windowUpControlText" href="javascript:;" target="_self">页面放大</a>\
        <a title="页面已经缩小到最小" disabled="disabled" id="windowDownControlText" href="javascript:;" target="_self">页面缩小</a><div class="clear" ></div>\
    </div>\
    <a class="TipsControl-Btn" id="Hj-easyRead-Smooth" title="开启无障碍">\
    	开启无障碍\
    </a>\
    <a class="ReturnToTop-Btn" title="返回顶部">\
    	返回顶部\
    </a>';
	//if($(Hj.easyRead.load.standByBox).length>0)document.getElementsByTagName("body")[0].insertBefore(easyReadBtn,document.getElementsByTagName("body")[0].childNodes[0]);
	document.getElementsByTagName("body")[0].insertBefore(easyReadBtn,document.getElementsByTagName("body")[0].childNodes[0]);
	$('#'+Hj.easyRead.load.btnControl).live("click",
		function(){
			$('#Hj-easyRead-smoothTips').slideToggle(500,function(){Hj.easyRead.load.timer();});
			if(Hj.easyRead.load.isExpanded){
				$('#'+Hj.easyRead.load.btnControl).attr("title","开启无障碍");
				Hj.easyRead.refresh.reset();
				Hj.easyRead.load.isExpanded=false;
			}else{
				$('#'+Hj.easyRead.load.btnControl).attr("title","关闭无障碍");
				Hj.easyRead.load.isExpanded=true;
			}
		}
	);
	
	var ROOT=document.getElementsByTagName("body")[0];
	for(var i=0;i<ROOT.childNodes.length;i++){
		//document.title=(i+"aaa");
		try{
		Hj.easyRead.load.nodeText(ROOT.childNodes[i]);
		}catch(o){}
	}
	try{
		//段落内的文本加上Label
		$("voice.Hj-EasyRead-Pointer-Label").each(function(index,ele){
			$(this).get(0).outerHTML=($(this).get(0).outerHTML.replace(
				/([^，；。]+)([，；。])([^，；。]+)/gim,
				"$1</voice>$2<voice class='Hj-EasyRead-Pointer-Label'>$3"
			)
			);
		}
		);
	}catch(o){}
	
	$("voice.Hj-EasyRead-Pointer-Label,img,embed").each(function(index, element) {
      Hj.easyRead.load.CHTML.push($(this));
			$(this).mouseenter(function(e){
				if(Hj.easyRead.load.pointRead&&!Hj.easyRead.load.crossRead){
						if(Hj.easyRead.load.curPoint!=null){
							Hj.easyRead.load.curPoint.css("color","");
							Hj.easyRead.load.curPoint.css("background-color","");
						}
						Hj.easyRead.load.curPoint=$(this);
						$(this).css("color","#FFF");
						$(this).css("background-color","#000");
						if($(this).text().replace(/\s/gi,"")!=""){
							Hj.easyRead.load.popTitle($(this));
							clearTimeout(Hj.easyRead.load.tempTID);
							Hj.easyRead.load.tempTID=setTimeout('Hj.easyRead.load.readText(\''+($(this).text().toString().replace(/\s/gi,""))+'\')',500);
						}
				}else if(Hj.easyRead.load.crossRead){
							clearTimeout(Hj.easyRead.load.tempTID);
						if(Hj.easyRead.load.pointRead){
							Hj.easyRead.load.changePoint();
						}
						Hj.easyRead.load.popTitle($(this));
						Hj.easyRead.load.tempTID=setTimeout('Hj.easyRead.load.crossPlay('+index+')',500);
				}else{
						Hj.easyRead.load.popTitle($(this));
				}});
    });
}

Hj.easyRead.load.crossPlay=function(index){
	if(!Hj.easyRead.load.crossRead){
		return;
	}
	soundManager.stopAll();
	if(Hj.easyRead.load.curPoint!=null){
		Hj.easyRead.load.curPoint.css("color","");
		Hj.easyRead.load.curPoint.css("background-color","");
	}
	var current=Hj.easyRead.load.curPoint=Hj.easyRead.load.CHTML[index];
	current.css("color","#FFF");
	current.css("background-color","#000");
	if(current.text().replace(/\s/gi,"")!=""){
		Hj.easyRead.load.popTitle(current);
		clearTimeout(Hj.easyRead.load.tempTID);
		
		text=current.text().toString().replace(/\s/gi,"");		
		var url=Hj.easyRead.load.request.replace("{lang}",Hj.easyRead.load.lang);
		if(text==""){
				Hj.easyRead.load.crossPlay(++index);
				//Hj.easyRead.load.loadNext();
		}
		Hj.easyRead.load.currentPlay=0;
		Hj.easyRead.load.voice=new Array();
		Hj.easyRead.load.string=new Array();
		if(checkMonthDay(text)){
			text=text.replace("-","月");
			text=text+"日";
		}
		url=url.replace("{text}",text);
		url=url.replace("{speed}",Hj.easyRead.load.speed);
		url=encodeURI(url);
		//Hj.easyRead.load.voice.push(url);
		if(Hj.easyRead.load.loadType=="JSONP"){
				//$.getJSON(url,function(data){Hj.easyRead.load.jsonCallBack(data)});
				 $.ajax({
							 url:url,
							 dataType:"jsonp",
							 jsonp:"callback",
							 success:function(data){
										var rest=data;
										if(rest.url!="jjerror"){
											var HjeasyReadVoice=soundManager.createSound({
												id: 'Hj-easyRead-Voice-'+Math.random(),
												url: rest.url,
												autoLoad: true,
												autoPlay: false,
												onfinish:function(){
													Hj.easyRead.load.crossPlay(++index);
												},
												onload: function() {
													soundManager.stopAll();
													//alert('The sound '+this.id+' loaded!');
													this.play();
												},
												volume: Hj.easyRead.load.sound
											});
										}
									 //Hj.easyRead.load.crossPlay(++index);
							 }
					});
		}else{
				var r=creat();
				r.open("GET",url,true);
				r.onreadystatechange=function(){
					if(r.readyState==4&&(r.status==200||r.status==302)){
						eval("var rest="+r.responseText+";");
						if(rest.url!="jjerror"){
							soundManager.stopAll();
							var HjeasyReadVoice=soundManager.createSound({
								id: 'Hj-easyRead-Voice-'+Math.random(),
								url: rest.url,
								autoLoad: true,
								autoPlay: false,
								onfinish:function(){
									Hj.easyRead.load.crossPlay(++index);
								},
								onload: function() {
									//alert('The sound '+this.id+' loaded!');
									this.play();
								},
								volume: Hj.easyRead.load.sound
							});
						}
					}
				};
				r.send(null);
		}
	}else{
			Hj.easyRead.load.crossPlay(++index);
	}
}

/*Hj.easyRead.load.read=function(targetID){
	Hj.easyRead.load.splitPa(targetID);
	Hj.easyRead.load.loadNext();
}*/

var checkMonthDay = function(str){
	if(str.match(/^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) { 
		return true;
	} else { 
		return false;
	}
}
