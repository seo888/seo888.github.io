// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.refresh.js
/*文件版本：1.0
/*文件描述：页面刷新refresh
/*
/************************************************************************/
Hj.easyRead.refresh=function(){
		return new Object();
};

Hj.easyRead.refresh.init=function(){
	//以下是参数设置
	Hj.easyRead.refresh.textIdBox="refreshControl"; //开关ID-Box
	Hj.easyRead.refresh.textId="refreshControlText"; //开关ID
	Hj.easyRead.refresh.Text="刷新页面"; //开启状态提示
	Hj.easyRead.refresh.hotKeyOpen="Ctrl+R"; //快捷键
	Hj.easyRead.refresh.isOpened=true;
	
	//初始化按钮状态
	if(Hj.easyRead.refresh.isOpened){
		$("#"+Hj.easyRead.refresh.textId).click(function(e) {
			Hj.easyRead.refresh.refresh();
		});
		$("#"+Hj.easyRead.refresh.textIdBox).css("display","block");
		$("#"+Hj.easyRead.refresh.textId).attr("title",Hj.easyRead.refresh.Text);
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.refresh.hotKeyOpen, function (){
		if(Hj.easyRead.refresh.isOpened){
			Hj.easyRead.refresh.refresh();
		}
	});
}

Hj.easyRead.refresh.refresh=function(){
	if(Hj.easyRead.refresh.isOpened){
		document.location.href=document.location.href;
	}
};

//重置无障碍功能
Hj.easyRead.refresh.reset=function(){
	//显示屏
	if(Hj.easyRead.panel.isOpened){
		Hj.easyRead.panel.stopListen();
	}
	//辅助线
	if(Hj.easyRead.line.isOpened){
		Hj.easyRead.line.stopListen();
	}
	//高对比度
	if(Hj.easyRead.light.isOpened){
		Hj.easyRead.light.closeLight();
	}
	//指读
	if(Hj.easyRead.load.pointRead){
		Hj.easyRead.load.changePoint();
	}
	//连读
	if(Hj.easyRead.load.crossRead){
		Hj.easyRead.load.changeCross();
	}
	//字号大小
	if(Hj.easyRead.ui.currentText!=0){
		Hj.easyRead.ui.changeText(0-Hj.easyRead.ui.currentText);
	}
	//页面
	if(Hj.easyRead.ui.currentWindow!=1){
		Hj.easyRead.ui.changeWindow(1-Hj.easyRead.ui.currentWindow);
	}
};

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.refresh.init();
});