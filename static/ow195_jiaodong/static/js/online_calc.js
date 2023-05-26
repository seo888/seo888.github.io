	var strFullUrl = window.location.href;
	var arrUrl = strFullUrl.split('?');
	var strUrl = arrUrl[0];
	var pattern = /^(http:\/\/){1}[a-zA-Z0-9\._\-\/]+\/system\/([\d]{4})\/([\d]{2})\/([\d]{2})\/([\d]{9})\.{1}([a-zA-Z]+)$/i;
	var flag = pattern.test(strUrl);
	//strUrl.match(pattern);
	if (flag == true) {

		//var arr = strUrl.match(pattern);
                  var arr = pattern.exec(strUrl);
		var year = arr[2];
		var month = arr[3];
		var day = arr[4];
		var s = year+"年"+month+"月"+day+"日";
		var newsDate = new Date(year,month-1,day);
		var clientDate = new Date();
		
		var MinMilli = 1000 * 60;
		var HrMilli = MinMilli * 60;
		var DayMilli = HrMilli * 24;
				
		var dayDiff = Math.floor((clientDate - newsDate)/DayMilli);

		if (dayDiff <= 10 ) {
			//if (clientDate.getSeconds()%5 == 0) {
                                document.write("<script src=http://tj.jiaodong.net/real_calc/CalcWriteServlet?newsId="+arr[5]+"><"+"/script>");
			//}
		} 
	} 
 