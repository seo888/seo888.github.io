// JavaScript Document

$(function(){
	
	$("#login").hover(function(e) {
        $(".login").show();
    } , function() {
		
	}); 
	
	$("#close").click(function(e) {
        $(".login").hide();
    });
	
	tick();
	
});

/*时间显示函数*/
function showLocale(objD)
{
	var str,colorhead,colorfoot;
	var yy = objD.getYear();
	if(yy<1900) yy = yy+1900;
	var MM = objD.getMonth()+1;
	if(MM<10) MM = '0' + MM;
	var dd = objD.getDate();
	if(dd<10) dd = '0' + dd;
	var hh = objD.getHours();
	if(hh<10) hh = '0' + hh;
	var mm = objD.getMinutes();
	if(mm<10) mm = '0' + mm;
	var ss = objD.getSeconds();
	if(ss<10) ss = '0' + ss;
	var ww = objD.getDay();
	if  ( ww==0 )  colorhead="<span color=\"#FFF\">";
	if  ( ww > 0 && ww < 6 )  colorhead="<span color=\"#FFF\">";
	if  ( ww==6 )  colorhead="<span color=\"#FFF\">";
	if  (ww==0)  ww="&#x661F;&#x671F;&#x65E5;";
	if  (ww==1)  ww="&#x661F;&#x671F;&#x4E00;";
	if  (ww==2)  ww="&#x661F;&#x671F;&#x4E8C;";
	if  (ww==3)  ww="&#x661F;&#x671F;&#x4E09;";
	if  (ww==4)  ww="&#x661F;&#x671F;&#x56DB;";
	if  (ww==5)  ww="&#x661F;&#x671F;&#x4E94;";
	if  (ww==6)  ww="&#x661F;&#x671F;&#x516D;";
	colorfoot="</span>"
	str = colorhead + yy + "&#x5E74;" + MM + "&#x6708;" + dd + "&#x65E5;" + hh + ":" + mm + ":" + ss + "  " + ww + colorfoot;
	return(str);
}
function tick()
{
	var today;
	today = new Date();
	document.getElementById("qxw_localtime").innerHTML = showLocale(today);
	window.setTimeout("tick()", 1000);
}  