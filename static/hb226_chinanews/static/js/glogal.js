// JavaScript Document
/*搜索*/
function submitFun(){
	var date=new Date();
	var hotword=document.getElementsByName('q')[0].value;
	if (hotword==''||hotword=='请输入关键字'){
		alert('请输入关键字!');
		return false;
	}else{
		if(document.getElementsByName('s0')[0].value=='cns'){ 
			window.open("http://search.news.chinanews.com/search.do?q="+encodeURIComponent(hotword))+'&dbtype=gx';
        }else if(document.getElementsByName('s0')[0].value=='baidu'){
			window.open("http://www.baidu.com/s?ie=utf-8&bs=%E4%B8+%9B%BD&sr=&z=&cl=3&f=8&wd="+encodeURIComponent(hotword)+"&ct=0");
        }}
}
function search_select(){}
   
$(document).ready(function(){
	setInterval(showTime, 1000);                                
    function timer(obj,txt){
        obj.text(txt);
    }        
    function showTime(){                                
        var today = new Date();
        var weekday=new Array(7)
        weekday[0]="星期日"
        weekday[1]="星期一"
        weekday[2]="星期二"
        weekday[3]="星期三"
        weekday[4]="星期四"
        weekday[5]="星期五"
        weekday[6]="星期六"                                        
        var y=today.getFullYear()+"年";
        var month=today.getMonth()+1+"月";
        var td=today.getDate()+"日";
        var d=weekday[today.getDay()];
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();        
        timer($("#Y"),y);
        timer($("#MH"),month);        
        timer($("#TD"),td);        
        timer($("#D"),d);
     }
})
