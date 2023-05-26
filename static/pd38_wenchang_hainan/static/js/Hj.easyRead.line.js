// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.line.js
/*文件版本：1.0
/*文件描述：辅助线line
/*
/************************************************************************/
Hj.easyRead.line=function(){
		return new Object();
};

Hj.easyRead.line.init=function(){
	//以下是参数设置
	Hj.easyRead.line.lineWidth=2;	   //线条宽度
	Hj.easyRead.line.lineColor="#F00"; //线条颜色
	Hj.easyRead.line.boxId="lineControl"; //开关ID-Box
	Hj.easyRead.line.textId="lineControlText"; //开关ID
	Hj.easyRead.line.closeText="开启辅助线"; //关闭状态提示
	Hj.easyRead.line.openText="关闭辅助线"; //开启状态提示
	Hj.easyRead.line.hotKeyOpen="Ctrl+L"; //快捷键
	Hj.easyRead.line.isOpened=false;
	
	$("#"+Hj.easyRead.line.boxId).css("display","block");
	//初始化按钮状态
	if(Hj.easyRead.line.isOpened){
		$("#"+Hj.easyRead.line.textId).click(function(e) {
			Hj.easyRead.line.stopListen();
		});
		$("#"+Hj.easyRead.line.textId).text(Hj.easyRead.line.openText);
		$("#"+Hj.easyRead.line.textId).attr("title",Hj.easyRead.line.openText);
	}else{
		$("#"+Hj.easyRead.line.textId).click(function(e) {
			Hj.easyRead.line.startListen();
		});
		$("#"+Hj.easyRead.line.textId).text(Hj.easyRead.line.closeText);
		$("#"+Hj.easyRead.line.textId).attr("title",Hj.easyRead.line.closeText);
	}
	
	//快捷键注册
	jQuery.hotkeys.add(Hj.easyRead.line.hotKeyOpen, function (){
		if(Hj.easyRead.line.isOpened){
			Hj.easyRead.line.stopListen();
		}else{
			Hj.easyRead.line.startListen();
		}
	});
}

Hj.easyRead.line.changeLine=function(e){
	$("#viewArrowH").css("top",(e.pageY/*-$("body").scrollTop()*/-Hj.easyRead.line.lineWidth-1)+"px");
	$("#viewArrowV").css("left",(e.pageX-$(document).scrollLeft()-Hj.easyRead.line.lineWidth-1)+"px");
	$("#viewArrowV").css("height",($(document).height())+"px");
}

Hj.easyRead.line.startListen=function(){
	//创建线条
	if(Hj.easyRead.line.isOpened){
		return;
	}
	//$("body").append('<div class="Hj-easyReadArrow"><div class="viewArrowBoxRel"><div id="viewArrowH"></div><div id="viewArrowV"></div></div></div>');
	//$(".Hj-easyReadArrow .viewArrowBoxRel div").css("background-color",Hj.easyRead.line.lineColor);
	//$(".Hj-easyReadArrow .viewArrowBoxRel #viewArrowH").css("height",Hj.easyRead.line.lineWidth);
	//$(".Hj-easyReadArrow .viewArrowBoxRel #viewArrowV").css("width",Hj.easyRead.line.lineWidth);
	
	$("body").append('<div id="viewArrowH"></div><div id="viewArrowV"></div>');
	$("#viewArrowH").css("height",Hj.easyRead.line.lineWidth);
	$("#viewArrowV").css("width",Hj.easyRead.line.lineWidth);
	$(document).bind("mousemove",Hj.easyRead.line.changeLine);
	$("#"+Hj.easyRead.line.textId).text(Hj.easyRead.line.openText);
	$("#"+Hj.easyRead.line.textId).attr("title",Hj.easyRead.line.openText);
	$("#"+Hj.easyRead.line.textId).unbind("click");
	$("#"+Hj.easyRead.line.textId).click(function(e) {
        Hj.easyRead.line.stopListen();
    });
	$("#"+Hj.easyRead.line.textId).removeClass().addClass("Hj_functionBg Hj_lineClicked");
	Hj.easyRead.line.isOpened=true;

	
	try{e =new MouseEvent();Hj.easyRead.line.changeLine(e);}catch(e){}
};
Hj.easyRead.line.stopListen=function(){
	$(".Hj-easyReadArrow").remove();
	$("#viewArrowH").remove();
	$("#viewArrowV").remove();
	$("body").unbind("mousemove",Hj.easyRead.line.changeLine);
	$("#"+Hj.easyRead.line.textId).text(Hj.easyRead.line.closeText);
	$("#"+Hj.easyRead.line.textId).attr("title",Hj.easyRead.line.closeText);
	$("#"+Hj.easyRead.line.textId).unbind("click");
	$("#"+Hj.easyRead.line.textId).click(function(e) {
        Hj.easyRead.line.startListen();
    });
	$("#"+Hj.easyRead.line.textId).removeClass("Hj_lineClicked");
	Hj.easyRead.line.isOpened=false;
};

//调用初始化， 可拿出来
$(document).ready(function(e) {
    Hj.easyRead.line.init();
});