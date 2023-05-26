// JavaScript Document
/*************************************************************************/
/*文件名称：Hj.easyRead.main.js
/*文件版本：1.0
/*文件描述：无障碍浏览基类
/*
/************************************************************************/
window.Hj=window["Hj"]=function(){
	if(window["Hj"]){
		return window["Hj"];
	}else{
		return new Object();
	}
};

Hj.easyRead=Hj["easyRead"]=function(){
	return new Object();
};

//参数设置
Hj.easyRead.controlBox="CBody";	//控制区域
Hj.easyRead.hoverHavor=false;	//划过效果
Hj.easyRead.hoverLight="#FC0";	//划过背景
Hj.easyRead.hoverFront="#FFF";	//划过颜色
Hj.easyRead.createHTML=false;

//页面初始化
Hj.easyRead.init=function(){
	if(Hj.easyRead.createHTML) $("body").append('<div id="Hj-EasyRead-Sider"><div id="Hj-EasyRead-Sider-Arrow"><a href="javascript:;">无障碍面板</a></div><div id="Hj-EasyRead-Sider-Btns"><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Init" id="InitControl"><a href="javascript:;" id="InitControlText">初始化</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Text"><a href="javascript:;">纯文本</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Back" id="historyBackControl"><a href="javascript:;" id="historyBackControlText">后退</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Forward" id="historyForwardControl"><a href="javascript:;" id="historyForwardControlText">前进</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Toghter"><a href="javascript:;">连读</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Refresh" id="refreshControl"><a href="javascript:;" id="refreshControlText">刷新</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Voice"><a href="javascript:;">打开语音</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Display"><a href="javascript:;">显示屏</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Color"><a href="javascript:;">配色</a></div><div id="lineControl" class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Line"><a href="javascript:;" id="lineControlText">辅助线</a></div><div id="windowDownControl" class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-WScaleL"><a href="javascript:;" id="windowDownControlText">页面缩小</a></div><div id="windowUpControl" class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-WScaleP"><a href="javascript:;" id="windowUpControlText">页面放大</a></div><div class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-Pointer"><a href="javascript:;">指读</a></div><div id="textDownControl" class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-TScaleL"><a href="javascript:;" id="textDownControlText">文字缩小</a></div><div id="textUpControl" class="Hj-EasyRead-Sider-Btns-Item Hj-EasyRead-Sider-Btns-TScaleP"><a href="javascript:;" id="textUpControlText">文字放大</a></div></div></div> ');
	$("#"+Hj.easyRead.controlBox+" *").each(function(index, element) {
		content='';
		var contentArr=$(this).html().split(/，|。|；/);
		//for(var i=0;i<contentArr.length;i++){
		//	if(contentArr[i].replace(" ","")!="")
		//	$(this).html($(this).html().replace(contentArr[i].replace(/<[^>].*?>/g,""),'<label class=Hj-easyRead-label>'+(contentArr[i].replace(/<[^>].*?>/g,""))+'</label>'));
		//}
		//$(this).html(content);
    });
	
	if(Hj.easyRead.hoverHavor){
		$("voice.Hj-EasyRead-Pointer-Label").each(function(index, element) {
            $(this).hover(function(e){
				$(this).css("background-color",Hj.easyRead.hoverLight);
				$(this).css("color",Hj.easyRead.hoverFront);
			},
			function(e){
				$(this).css("background-color","");
				$(this).css("color","");
			}
			);
        });
	}
}

//alert("aaa");
//$(document).ready(function(e) {
//    Hj.easyRead.init();
//});

