//判断浏览器类型
var userAgent;
var isOpera;

function myBrowser(){
	userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	isOpera = userAgent.indexOf("Opera") > -1;

	if (isOpera){return "Opera"}; //判断是否Opera浏览器 
	if (userAgent.indexOf("Firefox") > -1){return "FF";} //判断是否Firefox浏览器 
	if (userAgent.indexOf("Safari") > -1){return "Safari";} //判断是否Safari浏览器 
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera){return "IE";} ; //判断是否IE浏览器
}

if(myBrowser()=="IE"){var news = "news.php";}else{var news = "news_xa.php";}

var news_title = document.getElementsByName("title")[0].value;
var domain = "//comment.hsw.cn/";

var url = window.location.href;
url = url.replace("#pic","");
var nsid = document.getElementsByName("nsid")[0].value;
var inputtime = document.getElementsByName("inputtime");
if(inputtime.length>0) 
	inputtime = inputtime[0].value;
else
	inputtime = '';
news_title = news_title.replace("#","");
news_title = news_title.replace('"','“');
news_title = news_title.replace('"','“');
news_title = RemoveHTML(news_title);

//屏蔽评论
if(height!=0){
	switch(type){
		//case "新闻" : var height=0; break;
		//case "娱乐" : var height=0; break;
		//case "体育" : var height=0; break;	
		default:var height='185'; break;
	}
}

if(url.indexOf('.hsw.cn')!=-1){
	document.write("<iframe id='pppp' allowTransparency='true' src='"+domain+news+"?news_title="
  	+encodeURI(news_title)+"&type="+encodeURI(type)+"&url="+url+"&nsid="+nsid+"&inputtime="+inputtime+"'  marginwidth='0' marginheight='0' frameborder='0' scrolling='no' width='100%' height='"+height+"' ></iframe>");
}


function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s <arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
} 

function RemoveHTML( strText ){
	strText = removeJS(strText);
    var regEx = /<[^>]*>/g;
	var regEx2 = /<!--[^-]*-->/g;
	return strText.replace(regEx2,"").replace(regEx,"");
}
  
function removeJS(strText) {
    
	var str = strText;
	while(str.indexOf("<script")!=-1){
		var start = str.indexOf("<script");
	    var end = str.indexOf("/script>")+8;
	    str = str.substring(0,start)+str.substring(end,str.length);
	};
	return str;
}