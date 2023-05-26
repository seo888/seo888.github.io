// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.Init.js
/*文件版本：1.0
/*文件描述：页面初始化Init
/*
/************************************************************************/
Hj.easyRead.Init=function(){
		return new Object();
};

Hj.easyRead.Init.init=function(){
	//以下是参数设置
	Hj.easyRead.Init.textIdBox="InitControl"; //开关ID-Box
	Hj.easyRead.Init.textId="InitControlText"; //开关ID
	Hj.easyRead.Init.Text="页面初始化"; //开启状态提示
	Hj.easyRead.Init.hotKeyOpen="Ctrl+I"; //快捷键
	Hj.easyRead.Init.isOpened=true;
	
	//初始化按钮状态
	if(Hj.easyRead.Init.isOpened){
		$("#"+Hj.easyRead.Init.textId).click(function(e) {
			Hj.easyRead.Init.Init();
		});
		$("#"+Hj.easyRead.Init.textIdBox).css("display","block");
		$("#"+Hj.easyRead.Init.textId).attr("title",Hj.easyRead.Init.Text);
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.Init.hotKeyOpen, function (){
		if(Hj.easyRead.Init.isOpened){
			Hj.easyRead.Init.Init();
		}
	});
}

Hj.easyRead.Init.Init=function(){
	if(Hj.easyRead.Init.isOpened){
		document.location.href=document.location.href;
	}
};

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.Init.init();
});