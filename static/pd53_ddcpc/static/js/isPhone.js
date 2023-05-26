//终端判断
function getQueryStringRegExp(name) {
	var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
};
if (/Android|webOS|iPhone|iPod|BlackBerry|opera mini|opera mobile/i.test(navigator.userAgent) && getQueryStringRegExp('path') != 'www') {
	window.location = 'http://www.ddcpc.cn/wap/views/detail.html?sourceurl=' + window.location.href;
}