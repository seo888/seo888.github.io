document.writeln('<div id=\"xinqing\"><table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"mood_top\" colspan=\"15\">您看到此篇文章时的感受<span>（已有 <b>0</b> 人表态）</span></td></tr><tr><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"欠扁\" src=\"http://www.ipo123.cn/images/emot/bq1.gif\" border=\"0\"><br>欠扁<br><input type=\"radio\" onclick=\"MoodPosition(0);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"同意\" src=\"http://www.ipo123.cn/images/emot/bq2.gif\" border=\"0\"><br>同意<br><input type=\"radio\" onclick=\"MoodPosition(1);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"很好\" src=\"http://www.ipo123.cn/images/emot/bq3.gif\" border=\"0\"><br>很好<br><input type=\"radio\" onclick=\"MoodPosition(2);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"胡扯\" src=\"http://www.ipo123.cn/images/emot/bq4.gif\" border=\"0\"><br>胡扯<br><input type=\"radio\" onclick=\"MoodPosition(3);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"搞笑\" src=\"http://www.ipo123.cn/images/emot/bq5.gif\" border=\"0\"><br>搞笑<br><input type=\"radio\" onclick=\"MoodPosition(4);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"软文\" src=\"http://www.ipo123.cn/images/emot/bq6.gif\" border=\"0\"><br>软文<br><input type=\"radio\" onclick=\"MoodPosition(5);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"糊涂\" src=\"http://www.ipo123.cn/images/emot/bq7.gif\" border=\"0\"><br>糊涂<br><input type=\"radio\" onclick=\"MoodPosition(6);\" name=\"votebutton\"></td><td valign=\"bottom\"  style=\"text-align:center\"><br><img alt=\"0%\" src=\"http://www.ipo123.cn/images/default/post.gif\" height=\"0\" width=\"20\"><br><img alt=\"惊讶\" src=\"http://www.ipo123.cn/images/emot/bq8.gif\" border=\"0\"><br>惊讶<br><input type=\"radio\" onclick=\"MoodPosition(7);\" name=\"votebutton\"></td></tr></table></div>');

CreateMoodAjax=function(){
	if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	} else if(window.ActiveXObject){
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
	throw new Error("XMLHttp object could be created.");
}
ajaxReadText=function(file,fun){
	var xmlObj = CreateMoodAjax();
	
	xmlObj.onreadystatechange = function(){
		if(xmlObj.readyState == 4){
			if (xmlObj.status ==200){
				obj = xmlObj.responseText;
				eval(fun);
			}
			else{
				alert("读取文件出错,错误号为 [" + xmlObj.status  + "]");
			}
		}
	}
	try{
	xmlObj.open ('GET', file, true);
	xmlObj.send (null);
	}
	catch(e){
		var head = document.getElementsByTagName("head")[0];        
		var js = document.createElement("script"); 
		js.src = file+"&printout=js"; 
		head.appendChild(js);   
	}
}
MoodPosition=function(itemid){
ajaxReadText('http://www.ipo123.cn/plus/Mood.asp?action=hits&itemid='+itemid+'&id=6&m_ID=1&c_id=161729','MoodPositionBack(obj)');
}
MoodPositionBack=function(obj){
 switch(obj){
  case "nologin":
   alert('对不起,您还没登录不能表态!');
   break;
  case "standoff":
   alert('您已表态过了, 不能重复表态!');
   break;
  case "lock":
   alert('心情指数已关闭!');
   break;
  case "errstartdate":
   alert('未到表态时间!');
   break;
  case "errexpireddate":
   alert('表态时间已过!');
   break;
  case "errgroupid":
   alert('您没有表态的权限!');
   break;
  case "noinfo":
   alert('找不到您要表态的信息!');
   break;
  default:
   alert('恭喜,您已成功表态!');
   document.getElementById('xinqing').innerHTML=obj;
   break;
 }
}
