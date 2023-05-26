document.writeln();	
var strUrl = document.location;
	//var strUrl = "http://www3.enorth.com.cn/test/system/2003/12/24/000701783.shtml";
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
		var s = year+"年"+month+"月"+day+"日";
		var newsDate = new Date(year,month-1,day);
		var clientDate = new Date();
		
		var MinMilli = 1000 * 60;
		var HrMilli = MinMilli * 60;
		var DayMilli = HrMilli * 24;
				
		var dayDiff = Math.floor((clientDate - newsDate)/DayMilli);

		if (dayDiff <= 10 ) {
			if (clientDate.getSeconds()%5 == 0) {
				document.write("<script src=http://pinglun.gog.cn/m_online_calc/online_calc?news_id="+arr[5]+"><"+"/script>");
			}
		} 
	} 

document.write("<script type='text/javascript' src='http://www.gog.cn/sys/real_calc.js?click=true'></script>");

<!--耕云探针-->
    var _wapaq = _wapaq || [];
    _wapaq.push(['trackPageView']);
    (function() {
        var u = "http://webprobe.octodata.com.cn/";
        _wapaq.push(['setTrackerUrl', u + 'tracker']);
        _wapaq.push(['setSiteId', 100]);
        _wapaq.push(['setDiscardUrlParams', true]);
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.defer = true;
        g.src = 'http://bazhuawangluo.oss-cn-hangzhou.aliyuncs.com/ds2.js?v=' + new Date().getUTCDay();
        s.parentNode.insertBefore(g, s);
    })();
<!--耕云探针end-->