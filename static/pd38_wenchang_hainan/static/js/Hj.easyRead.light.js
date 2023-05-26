// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.light.js
/*文件版本：1.0
/*文件描述：高对比度light
/*
/************************************************************************/
Hj.easyRead.light=function(){
		return new Object();
};

Hj.easyRead.light.init=function(){
	//以下是参数设置
	Hj.easyRead.light.frontColor="#FFF"; //文字颜色
	Hj.easyRead.light.lightColor="#000"; //背景颜色
	Hj.easyRead.light.textId="lightControl"; //开关ID
	Hj.easyRead.light.closeText="高对比度"; //关闭状态提示
	Hj.easyRead.light.openText="还原对比"; //开启状态提示
	Hj.easyRead.light.hotKeyOpen="Ctrl+H"; //快捷键
	Hj.easyRead.light.isOpened=false;
	
	//初始化按钮状态
	if(Hj.easyRead.light.isOpened){
		$("#"+Hj.easyRead.light.textId).click(function(e) {
			Hj.easyRead.light.closeLight();
		});
		$("#"+Hj.easyRead.light.textId).text(Hj.easyRead.light.openText);
		$("#"+Hj.easyRead.light.textId).attr("title",Hj.easyRead.light.openText);
		//$("#"+Hj.easyRead.light.textId).css("background-position","-95px -36px");
	}else{
		$("#"+Hj.easyRead.light.textId).click(function(e) {
			Hj.easyRead.light.openLight();
		});
		$("#"+Hj.easyRead.light.textId).text(Hj.easyRead.light.closeText);
		$("#"+Hj.easyRead.light.textId).attr("title",Hj.easyRead.light.closeText);
		//$("#"+Hj.easyRead.light.textId).css("background-position","-30px -36px");
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.light.hotKeyOpen, function (){
		if(Hj.easyRead.light.isOpened){
			Hj.easyRead.light.closeLight();
		}else{
			Hj.easyRead.light.openLight();
		}
	});
}

Hj.easyRead.light.openLight=function(){
	//创建线条
	if(Hj.easyRead.light.isOpened){
		return;
	}
	
	//高亮页面
	$("#"+Hj.easyRead.controlBox+" *").each(function(index, element) {
        $(this).css("background-color",Hj.easyRead.light.lightColor);
        $(this).css("color",Hj.easyRead.light.frontColor);
    });
	$("#"+Hj.easyRead.controlBox).each(function(index, element) {
        $(this).css("background-color",Hj.easyRead.light.lightColor);
        $(this).css("color",Hj.easyRead.light.frontColor);
    });
	
	$("#"+Hj.easyRead.light.textId).text(Hj.easyRead.light.openText);
	$("#"+Hj.easyRead.light.textId).attr("title",Hj.easyRead.light.openText);
	$("#"+Hj.easyRead.light.textId).unbind("click");
	$("#"+Hj.easyRead.light.textId).click(function(e) {
        Hj.easyRead.light.closeLight();
    });
	Hj.easyRead.light.isOpened=true;
	$("#"+Hj.easyRead.light.textId).removeClass().addClass("Hj_functionBg Hj_lightClicked");
};
Hj.easyRead.light.closeLight=function(){	
	//高亮还原
	$("#"+Hj.easyRead.controlBox+" *").each(function(index, element) {
        $(this).css("background-color","");
        $(this).css("color","");
    });
	$("#"+Hj.easyRead.controlBox).each(function(index, element) {
        $(this).css("background-color","");
        $(this).css("color","");
    });
	
	$("#"+Hj.easyRead.light.textId).text(Hj.easyRead.light.closeText);
	$("#"+Hj.easyRead.light.textId).attr("title",Hj.easyRead.light.closeText);
	$("#"+Hj.easyRead.light.textId).unbind("click");
	$("#"+Hj.easyRead.light.textId).click(function(e) {
        Hj.easyRead.light.openLight();
    });
	Hj.easyRead.light.isOpened=false;
	$("#"+Hj.easyRead.light.textId).removeClass("Hj_lightClicked");
};

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.light.init();
});