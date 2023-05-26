var browserRedirectGamedog = function() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsAndroid) {
		issystem = "android"
	} else if (bIsIphoneOs || bIsIpad) {
		issystem = "ios"
	} else if (bIsWM) {
		issystem = "windows"
	} else {
		issystem = false
	}
	return issystem
};

function gdTgImgShow(gdPid, gdJsonList) {
	var type = typeof(gdJsonList);
	if (type == "object") {
		var num = Math.ceil(Math.random() * gdJsonList.length) - 1;
		imgurl = gdJsonList[num].imgurl;
		linkurl = gdJsonList[num].linkurl;
		tjurl = gdJsonList[num].tjurl;
		var str = "<div class=\"gds_c1\" ><span class=\"gd-close\">广告</span><a href=\"" + linkurl + "\" target=\"_blank\" onclick=\"setDownsMobileGamedog(\'" + tjurl + "\')\"><img src=\"" + imgurl + "\"/></a></div>";
		document.write("<style>.gds_c1 { margin:5px 0; text-align:center;}.gds_c1 a img{ width:100%;}.ads_cb { margin:5px 0;}.gds_c1 iframe { margin:0 auto !important; margin-bottom:5px;}.gds_c1 iframe { margin:0 auto !important;}.gd-close{ background:#000; opacity:0.5; color:#fff; text-align:center; font-size:12px; padding:2px 4px; border-radius:3px; position:absolute;}</style><div id='gdMobilesBander_" + gdPid + "'>" + str + "</div>")
	} else if (type == "string") {
		gdJsonList
	} else {
		var str = ""
	}
}
var setDownsMobileGamedog = function(url) {
	if (url) {
		$.getJSON(url, function(data) {
			return true
		})
	}
}