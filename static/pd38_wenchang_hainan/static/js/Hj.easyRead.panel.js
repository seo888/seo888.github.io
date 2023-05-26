// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.panel.js
/*文件版本：1.0
/*文件描述：显示panel
/*
/************************************************************************/
Hj.easyRead.panel=function(){
		return new Object();
};

Hj.easyRead.panel.init=function(){
	//以下是参数设置
	Hj.easyRead.panel.boxId="panelControl"; //开关ID-Box
	Hj.easyRead.panel.textId="panelControlText"; //开关ID
	Hj.easyRead.panel.closeText="开启显示"; //关闭状态提示
	Hj.easyRead.panel.openText="关闭显示"; //开启状态提示
	Hj.easyRead.panel.hotKeyOpen="Alt+P"; //快捷键
	Hj.easyRead.panel.isOpened=false;
	
	$("#"+Hj.easyRead.panel.boxId).css("display","block");
	//初始化按钮状态
	if(Hj.easyRead.panel.isOpened){
		$("#"+Hj.easyRead.panel.textId).click(function(e) {
			Hj.easyRead.panel.stopListen();
		});
		$("#"+Hj.easyRead.panel.textId).text(Hj.easyRead.panel.openText);
		$("#"+Hj.easyRead.panel.textId).attr("title",Hj.easyRead.panel.openText);
	}else{
		$("#"+Hj.easyRead.panel.textId).click(function(e) {
			Hj.easyRead.panel.startListen();
		});
		$("#"+Hj.easyRead.panel.textId).text(Hj.easyRead.panel.closeText);
		$("#"+Hj.easyRead.panel.textId).attr("title",Hj.easyRead.panel.closeText);
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.panel.hotKeyOpen, function (){
		if(Hj.easyRead.panel.isOpened){
			Hj.easyRead.panel.stopListen();
		}else{
			Hj.easyRead.panel.startListen();
		}
	});
}

Hj.easyRead.panel.changepanel=function(e){
	$("#Hj-EasyRead-Pop-Title").css("top",($(window).height() + $(window).scrollTop()-106)+"px");
}

Hj.easyRead.panel.startListen=function(){
	//创建面板
	if(Hj.easyRead.panel.isOpened){
		return;
	}
	$("body").append('<div id="Hj-EasyRead-Pop-Title" style="position:absolute; bottom:0px; left:0px; width:100%; height:106px; background-color:#FFF; z-index:200; text-align:center; font-size:72px;"><div style="border:3px solid #C00; height:100px;"><span id="Hj-EasyRead-Pop-Title-t" style="line-height:100px;color:#000;"></span><span id="Hj-EasyRead-Pop-Title-c" style="line-height:100px;color:#000;">显示屏</span></div></div>');
	$(window).bind("scroll",Hj.easyRead.panel.changepanel);
	$("#"+Hj.easyRead.panel.textId).text(Hj.easyRead.panel.openText);
	$("#"+Hj.easyRead.panel.textId).attr("title",Hj.easyRead.panel.openText);
	$("#"+Hj.easyRead.panel.textId).unbind("click");
	$("#"+Hj.easyRead.panel.textId).click(function(e) {
        Hj.easyRead.panel.stopListen();
    });
	$("#"+Hj.easyRead.panel.textId).removeClass().addClass("Hj_functionBg").addClass("Hj_panelClicked");
	Hj.easyRead.panel.isOpened=true;
	$("#Hj-EasyRead-Pop-Title").css("top",($(window).height() + $(window).scrollTop()-106)+"px");
	
	try{e =new MouseEvent();Hj.easyRead.panel.changepanel(e);}catch(e){}
};
Hj.easyRead.panel.stopListen=function(){
	$("#Hj-EasyRead-Pop-Title").remove();
	$(window).unbind("scroll",Hj.easyRead.panel.changepanel);
	$("#"+Hj.easyRead.panel.textId).text(Hj.easyRead.panel.closeText);
	$("#"+Hj.easyRead.panel.textId).attr("title",Hj.easyRead.panel.closeText);
	$("#"+Hj.easyRead.panel.textId).unbind("click");
	$("#"+Hj.easyRead.panel.textId).click(function(e) {
        Hj.easyRead.panel.startListen();
    });
	$("#"+Hj.easyRead.panel.textId).removeClass("Hj_panelClicked").addClass("Hj_panel");
	Hj.easyRead.panel.isOpened=false;
};

//调用初始化， 可拿出来
/*
$(document).ready(function(e) {
    Hj.easyRead.panel.init();
});
*/