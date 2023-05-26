// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.ui.js
/*文件版本：1.0
/*文件描述：界面类
/*
/************************************************************************/
Hj.easyRead.ui=function(){
		return new Object();
};

Hj.easyRead.ui.init=function(){
	//以下是参数设置
	Hj.easyRead.ui.textUpIdBox="textUpControl";         //文字放大ID-Box
	Hj.easyRead.ui.textDownIdBox="textDownControl";     //文字缩小ID-Box
	Hj.easyRead.ui.textUpId="textUpControlText";         //文字放大ID
	Hj.easyRead.ui.textDownId="textDownControlText";     //文字缩小ID
	Hj.easyRead.ui.windowUpIdBox="windowUpControl";     //窗口放大ID-Box
	Hj.easyRead.ui.windowDownIdBox="windowDownControl"; //窗口缩小ID-Box
	Hj.easyRead.ui.windowUpId="windowUpControlText";     //窗口放大ID
	Hj.easyRead.ui.windowDownId="windowDownControlText"; //窗口缩小ID
	Hj.easyRead.ui.textDownText="字号缩小"; //缩小状态提示
	Hj.easyRead.ui.textUpText="字号放大"; //放大状态提示
	Hj.easyRead.ui.windowDownText="页面缩小"; //缩小状态提示
	Hj.easyRead.ui.windowUpText="页面放大"; //放大状态提示
	Hj.easyRead.ui.textMax=10;    //文字最大级别
	Hj.easyRead.ui.windowMax=2;   //界面最大级别
	Hj.easyRead.ui.textMin=0;    //文字最小级别
	Hj.easyRead.ui.windowMin=1;   //界面最小级别
	Hj.easyRead.ui.textDat=1;     //文字增量
	Hj.easyRead.ui.windowDat=0.2; //界面增量
	Hj.easyRead.ui.currentText=0; //当前级别
	Hj.easyRead.ui.currentWindow=1;
	Hj.easyRead.ui.hotKeyTextUp="Ctrl+up"; //快捷键
	Hj.easyRead.ui.hotKeyTextDown="Ctrl+down"; //快捷键
	Hj.easyRead.ui.hotKeyWindowUp="Alt+up"; //快捷键
	Hj.easyRead.ui.hotKeyWindowDown="Alt+down"; //快捷键
	
	$("#"+Hj.easyRead.ui.textUpIdBox).css("display","block");
	$("#"+Hj.easyRead.ui.textDownIdBox).css("display","block");
	$("#"+Hj.easyRead.ui.windowUpIdBox).css("display","block");
	$("#"+Hj.easyRead.ui.windowDownIdBox).css("display","block");
	//初始化按钮状态
	$("#"+Hj.easyRead.ui.windowUpId).text(Hj.easyRead.ui.windowUpText);
	$("#"+Hj.easyRead.ui.windowDownId).text(Hj.easyRead.ui.windowDownText);
	$("#"+Hj.easyRead.ui.textUpId).text(Hj.easyRead.ui.textUpText);
	$("#"+Hj.easyRead.ui.textDownId).text(Hj.easyRead.ui.textDownText);
	$("#"+Hj.easyRead.ui.windowUpId).click(function(e) {
		Hj.easyRead.ui.changeWindow(Hj.easyRead.ui.windowDat);
	});
	$("#"+Hj.easyRead.ui.windowDownId).click(function(e) {
		Hj.easyRead.ui.changeWindow(- Hj.easyRead.ui.windowDat);
	});
	$("#"+Hj.easyRead.ui.textUpId).click(function(e) {
		Hj.easyRead.ui.changeText(Hj.easyRead.ui.textDat);
	});
	$("#"+Hj.easyRead.ui.textDownId).click(function(e) {
		Hj.easyRead.ui.changeText(- Hj.easyRead.ui.textDat);
	});
	
	if(Hj.easyRead.ui.textMax<=Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textUpId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.textUpId).attr("title","文字已经放大到最大");
	}else{
		$("#"+Hj.easyRead.ui.textUpId).attr("title","文字放大");
	}
	if(Hj.easyRead.ui.textMin>=Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textDownId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.textDownId).attr("title","文字已经缩小到最小");

	}else{
		$("#"+Hj.easyRead.ui.textDownId).attr("title","文字缩小");
	}
	if(Hj.easyRead.ui.windowMax<=Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowUpId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.windowUpId).attr("title","页面已经放大到最大");
	}else{
		$("#"+Hj.easyRead.ui.windowUpId).attr("title","页面放大");
	}
	if(Hj.easyRead.ui.windowMin>=Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowDownId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.windowDownId).attr("title","页面已经缩小到最小");
		
	}else{
		$("#"+Hj.easyRead.ui.windowDownId).attr("title","页面缩小");
		
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.ui.hotKeyTextUp, function (){
		Hj.easyRead.ui.changeText(Hj.easyRead.ui.textDat);
	});
	jQuery.hotkeys.add(Hj.easyRead.ui.hotKeyTextDown, function (){
		Hj.easyRead.ui.changeText(-Hj.easyRead.ui.textDat);
	});
	jQuery.hotkeys.add(Hj.easyRead.ui.hotKeyWindowUp, function (){
		Hj.easyRead.ui.changeWindow(Hj.easyRead.ui.windowDat);
	});
	jQuery.hotkeys.add(Hj.easyRead.ui.hotKeyWindowDown, function (){
		Hj.easyRead.ui.changeWindow(-Hj.easyRead.ui.windowDat);
	});
}

//文字放大缩小
Hj.easyRead.ui.changeText=function(d){
	//前判断
	if(Hj.easyRead.ui.textMax<Hj.easyRead.ui.currentText&&d>0){
		return;
	}
	if(Hj.easyRead.ui.textMin>=Hj.easyRead.ui.currentText&&d<0){
		//开始缩放
		$("#"+Hj.easyRead.controlBox+" *").each(function(index, element) {
			$(this).css("font-size","");
		});
		return;
	}
	
	//开始缩放
	if(Hj.easyRead.ui.currentText+d>Hj.easyRead.ui.textMax){
		Hj.easyRead.ui.currentText=Hj.easyRead.ui.textMax;
	}else if(Hj.easyRead.ui.currentText+d<Hj.easyRead.ui.textMin){
		Hj.easyRead.ui.currentText=Hj.easyRead.ui.textMin;
	}else{
		Hj.easyRead.ui.currentText+=d;
	}
	$("#"+Hj.easyRead.controlBox+" *").each(function(index, element) {
        //$(this).css("font-size",parseFloat($(this).css("font-size"))+d+"px");
		//加入原始字号大小判断 by zzl 
		$thisDOM = $(this);
		//var domCurFontSize = $thisDOM.css("font-size").match(/[1-9][0-9]*/g)[0];
		//domCurFontSize=domCurFontSize==0||domCurFontSize==""?12:domCurFontSize;
        //$thisDOM.css("font-size",(parseInt(domCurFontSize)+Hj.easyRead.ui.currentText)+"px");
		$thisDOM.css("font-size",(12+Hj.easyRead.ui.currentText)+"px");
    });
	//单击修改字号后更改相应的图标样式
	if(d<0){
			$("#"+Hj.easyRead.ui.textDownId).addClass("Hj_functionBg Hj_textDownClicked");
			$("#"+Hj.easyRead.ui.textUpId).removeClass("Hj_textUpClicked Hj_textUpMax");
		}else{
			$("#"+Hj.easyRead.ui.textUpId).addClass("Hj_functionBg Hj_textUpClicked");
			$("#"+Hj.easyRead.ui.textDownId).removeClass("Hj_textDownClicked Hj_textDownMax");		
		}
	
	//后判断
	if(Hj.easyRead.ui.textMax<=Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textUpId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.textUpId).attr("title","文字已经放大到最大");
		$("#"+Hj.easyRead.ui.textDownId).removeClass("Hj_textDowClicked");
		$("#"+Hj.easyRead.ui.textUpId).addClass("Hj_functionBg Hj_textUpMax");
	}
	if(Hj.easyRead.ui.textMax>Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textUpId).removeAttr("disabled");
		$("#"+Hj.easyRead.ui.textUpId).attr("title","文字放大");
		
	}
	if(Hj.easyRead.ui.textMin>=Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textDownId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.textDownId).attr("title","文字已经缩小到最小");
		$("#"+Hj.easyRead.ui.textUpId).removeClass("Hj_textUpClicked");
		$("#"+Hj.easyRead.ui.textDownId).addClass("Hj_functionBg Hj_textDownMax");
	}
	if(Hj.easyRead.ui.textMin<Hj.easyRead.ui.currentText){
		$("#"+Hj.easyRead.ui.textDownId).removeAttr("disabled");
		$("#"+Hj.easyRead.ui.textDownId).attr("title","文字缩小");
	}
}

//页面放大缩小
Hj.easyRead.ui.changeWindow=function(d){
	//前判断
	if(Hj.easyRead.ui.windowMax<Hj.easyRead.ui.currentWindow&&d>0){
		return;
	}
	if(Hj.easyRead.ui.windowMin>=Hj.easyRead.ui.currentWindow&&d<0){
		return;
	}
	$(".Hj-EasyRead-Container").css("left","10px");
	if(d>0){
		$("#"+Hj.easyRead.ui.windowUpId).addClass("Hj_functionBg Hj_windowUpClicked");
		$("#"+Hj.easyRead.ui.windowDownId).removeClass("Hj_windowDownClicked Hj_windowDownMax");
		
	}else{
		$("#"+Hj.easyRead.ui.windowUpId).removeClass("Hj_windowUpClicked Hj_windowUpMax");
		$("#"+Hj.easyRead.ui.windowDownId).removeClass("Hj_windowDownClicked").addClass("Hj_functionBg Hj_windowDownClicked");
	}
	
	//开始缩放
	$("#"+Hj.easyRead.controlBox).css("zoom",Hj.easyRead.ui.currentWindow+=d);
	$("#"+Hj.easyRead.controlBox).css("-moz-transform","scale("+(Hj.easyRead.ui.currentWindow)+")");
	$("#"+Hj.easyRead.controlBox).css("-webkit-transform","scale("+(Hj.easyRead.ui.currentWindow)+")");
	$("#"+Hj.easyRead.controlBox).css("-o-transform","scale("+(Hj.easyRead.ui.currentWindow)+")");
	
	//后判断
	if(Hj.easyRead.ui.windowMax<=Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowUpId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.windowUpId).attr("title","页面已经放大到最大");
		$("#"+Hj.easyRead.ui.windowDownId).removeClass();
		$("#"+Hj.easyRead.ui.windowUpId).addClass("Hj_functionBg Hj_windowUpMax");
	}
	if(Hj.easyRead.ui.windowMax>Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowUpId).removeAttr("disabled");
		$("#"+Hj.easyRead.ui.windowUpId).attr("title","页面放大");		
	}
	if(Hj.easyRead.ui.windowMin>=Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowDownId).attr("disabled","disabled");
		$("#"+Hj.easyRead.ui.windowDownId).attr("title","页面已经缩小到最小");
		$("#"+Hj.easyRead.ui.windowUpId).removeClass();
		$("#"+Hj.easyRead.ui.windowDownId).addClass("Hj_functionBg Hj_windowDownMax");
		$(".Hj-EasyRead-Container").css("left",(($(window).width()>$(document).width()?$(window).width():$(document).width())/2+($(window).width()>$(document).width()?530:520))+"px");
	}
	if(Hj.easyRead.ui.windowMin<Hj.easyRead.ui.currentWindow){
		$("#"+Hj.easyRead.ui.windowDownId).removeAttr("disabled");
		$("#"+Hj.easyRead.ui.windowDownId).attr("title","页面缩小");		
	}
	window.scrollTo((document.body.scrollWidth-document.body.offsetWidth)/2,0);
	$("#"+Hj.easyRead.controlBox).css("-moz-transform-origin","top center");
	$("#"+Hj.easyRead.controlBox).css("-webkit-transform-origin","top center");
	$("#"+Hj.easyRead.controlBox).css("-o-transform-origin","top center");
}

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.ui.init();
});