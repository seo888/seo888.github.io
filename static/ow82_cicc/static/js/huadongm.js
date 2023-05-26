// JavaScript Document
//$(function(){
//	$("#KinSlideshow_gg").KinSlideshow({
//		intervalTime:3,
//		moveStyle:"right",
//		titleBar:{titleBar_height:25,titleBar_bgColor:"#000000",titleBar_alpha:0.5},
//		titleFont:{TitleFont_size:12,TitleFont_color:"#FFFFFF",TitleFont_weight:"normal"},
//		btn:{btn_bgColor:"#FFFFFF",btn_bgHoverColor:"#1072aa",btn_fontColor:"#000000",btn_fontHoverColor:"#FFFFFF",btn_borderColor:"#cccccc",btn_borderHoverColor:"#1188c0",btn_borderWidth:1}
//	});
//	$("#KinSlideshow_gg .KSS_btnBox").css("display","none");
//})
function tabChange(obj,id){
 var arrayli = obj.parentNode.getElementsByTagName("li"); //获取li数组
 var arrayul = document.getElementById(id).getElementsByTagName("ul"); //获取ul数组
 for(i=0;i<arrayul.length;i++){
  if(obj==arrayli[i]){
   arrayli[i].className = "cli";
   arrayul[i].className = "";
  }else{
   arrayli[i].className = "";
   arrayul[i].className = "hidden";
  }
 }
}