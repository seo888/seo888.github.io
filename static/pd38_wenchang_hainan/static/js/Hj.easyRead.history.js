// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.history.js
/*文件版本：1.0
/*文件描述：页面后退history
/*
/************************************************************************/
Hj.easyRead.history=function(){
		return new Object();
};

Hj.easyRead.history.init=function(){
	//以下是参数设置
	Hj.easyRead.history.textBackIdBox="historyBackControl"; //开关ID-Box
	Hj.easyRead.history.textBackId="historyBackControlText"; //开关ID
	Hj.easyRead.history.textForwarkIdBox="historyForwardControl"; //开关ID-Box
	Hj.easyRead.history.textForwardId="historyForwardControlText"; //开关ID
	Hj.easyRead.history.BackText="页面后退"; //开启状态提示
	Hj.easyRead.history.ForwardText="页面前进"; //开启状态提示
	Hj.easyRead.history.hotKeyBack="Ctrl+Z"; //快捷键
	Hj.easyRead.history.hotKeyForward="Ctrl+Y"; //快捷键
	Hj.easyRead.history.isOpened=true;
	
	//初始化按钮状态
	if(Hj.easyRead.history.isOpened){
		$("#"+Hj.easyRead.history.textBackId).click(function(e) {
			Hj.easyRead.history.back();
		});
		$("#"+Hj.easyRead.history.textForwardId).click(function(e) {
			Hj.easyRead.history.forward();
		});
		$("#"+Hj.easyRead.history.textBackIdBox).css("display","block");
		$("#"+Hj.easyRead.history.textForwarkIdBox).css("display","block");
		$("#"+Hj.easyRead.history.textBackId).attr("title",Hj.easyRead.history.BackText);
		$("#"+Hj.easyRead.history.textForwardId).attr("title",Hj.easyRead.history.ForwardText);
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.history.hotKeyBack, function (){
		if(Hj.easyRead.history.isOpened){
			Hj.easyRead.history.back();
		}
	});
	jQuery.hotkeys.add(Hj.easyRead.history.hotKeyForward, function (){
		if(Hj.easyRead.history.isOpened){
			Hj.easyRead.history.forward();
		}
	});
}

Hj.easyRead.history.back=function(){
	if(Hj.easyRead.history.isOpened){
		history.back();
	}
};

Hj.easyRead.history.forward=function(){
	if(Hj.easyRead.history.isOpened){
		history.forward();
	}
};

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.history.init();
});