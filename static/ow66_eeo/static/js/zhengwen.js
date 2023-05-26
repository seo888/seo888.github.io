//大中小
function dzx(n,m){
var content=document.getElementById("text_content");
with(content){
	style.fontSize=n+"px";
	style.lineHeight=m+"px";
	}
var arr=content.document.getElementsByTagName("p");
	for(i=0;i<arr.length;i++){
		arr[i].style.fontSize=n+"px";
		arr[i].style.lineHeight=m+"px";
		}
}

function MSN(){
var headline=""
var MSN1="";
var mostpopular=1
var mostpopular2=1
var headline=""
var bodytext=""
var UserName=""
if (window.location.href.indexOf("source=MSN")>1) {
MSN1="推荐一篇eeo.com.cn的文章：" + headline + " （eeo.com.cn）\r\n" + window.location.href;
} else {
MSN1="推荐一篇eeo.com.cn的文章：" + headline + " （eeo.com.cn）\r\n" + window.location.href + "?source=MSN";
}
if (window.clipboardData) {
window.clipboardData.setData("Text",MSN1);
alert("成功复制标题及链接，您可以粘贴到MSN或邮件中发给好友了!");
} else {
document.getElementById("HeadURL").innerHTML="<textarea id=copyall rows=1 cols=66 style='font-size:12px;padding:8px 0px 0px 3px'>" + MSN1 + "</textarea>" + "<div style='color:990000;font-size:12px;margin-bottom:5px'>您可以复制上方文本框中的文字，并通过MSN或邮件发送给您的好友</div>";
document.getElementById("copyall").focus();
document.getElementById("copyall").select();
}
}
function ForwardEmail(topic,infourl) {
location.replace("/inc/mailto.html?topic="+topic+"&infourl="+window.location.href);
}
function WriteEditor(emailaddress) {
	window.location = 'mailto:'+emailaddress+'?subject=Reader Feedback&body=Dear Editor, %0D%0A%0D%0A';
}

function PrintArticle() {
var content_con = document.getElementById("text_content").innerHTML;
content_con = content_con.replace(/\r\n/g,"<br>");
var printtext='<br><center><h1 style="font-size: 14px;"><strong>'+document.title+'</strong></h1></center><br><table width="700" border="0" align="center"><tr><td valign="top">'+content_con+'</td></tr></table>';
document.body.innerHTML=printtext;
window.print();
}

function PrintArticleZhuanti() {
var content_con = document.getElementById("text_content").innerHTML;
content_con = content_con.replace(/\r\n/g,"<br>");
var printtext='<br><center><h1 style="font-size: 14px;"><strong>'+document.title+'</strong></h1></center><br><table width="700" border="0" align="center"><tr><td valign="top" align="left">'+content_con+'</td></tr></table>';
document.body.innerHTML=printtext;
window.print();
}

function addFavorite() {
	try
    {
        window.external.addFavorite(window.location, document.title);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(document.title, window.location, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
