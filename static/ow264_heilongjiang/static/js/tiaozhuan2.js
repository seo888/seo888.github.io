   var u = navigator.userAgent, app = navigator.appVersion;
        var arr = ["finance.dbw.cn", "house.dbw.cn", "legal.dbw.cn", "internal.dbw.cn", "international.dbw.cn", "story.dbw.cn", "heilongjiang.dbw.cn", "edu.dbw.cn", "health.dbw.cn", "tour.dbw.cn", "ms.dbw.cn", "society.dbw.cn", "sports.dbw.cn", "entertainment.dbw.cn","tv.dbw.cn","yichun.dbw.cn"];
        var tihuan = ["m.dbw.cn/caijing", "m.dbw.cn/fangchan", "m.dbw.cn/fazhi", "m.dbw.cn/guonei", "m.dbw.cn/guoji", "m.dbw.cn/harbin", "m.dbw.cn/heilongjiang", "m.dbw.cn/jiaoyu", "m.dbw.cn/jiankang", "m.dbw.cn/lvyou", "m.dbw.cn/minsheng", "m.dbw.cn/shehui", "m.dbw.cn/tiyu", "m.dbw.cn/yule","m.dbw.cn/sppd", "m.dbw.cn/difang"];
        if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1 || u.indexOf('iPad') > -1 || u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            var url = document.URL;
            var host = window.location.host;
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                if (arr[i] == host) {
                    var uu =  url.replace(host, tihuan[i]);
                    NetPing(uu);
                    window.location.href = url.replace(host, tihuan[i]);
                }
            }
        }
  function NetPing(myUrl) {
        var mm = myUrl;
	  $.ajax({
                type:'get',
                cache:false,
		url: myUrl,
                dataType : 'jsonp',
                processData:false,
                timeout:1000,
		complete: function(response) {
			if(response.status == 200) {
				window.location.href = mm;
			} 
		}
	});
}