/* 
 * 页面滤镜
 */
var nowTime = new Date().getTime();
var startTime = new Date("2022-11-30 12:13:00").getTime();
var endTime = new Date("2022-12-07 19:00:00").getTime();

if (nowTime >= startTime && nowTime <= endTime) {
	var head = document.getElementsByTagName("head")
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "html {-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);filter: grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);filter:gray;}";
	head[0].appendChild(style);
} 


