//在页面增加一个放置图标的区块
if(!document.getElementById('_span_jiucuo'))
	document.write("<span id='_span_jiucuo'></span>");

//获取放置图标的区块
var span_msg = document.getElementById("_span_jiucuo");

//获取站点标识码
var sitecode = document.getElementById("_jiucuo_").attributes["sitecode"].value;
//生成纠错图标及点击链接
span_msg.innerHTML = "<img onclick=\"Link('" + sitecode + "')\" style='margin:0;border:0;cursor: pointer;' src='https://zfwzgl.www.gov.cn/exposure/images/jiucuo.png?v="+sitecode+"'/>";

//点击图标
function Link(site_code) {
	//获取该站点需要纠错页面的url地址

	var url = getCurrUrl();
	url = decodeURIComponent(url);
	url = decodeURIComponent(url);
	url = decodeURIComponent(url);
	url = encodeURIComponent(url).replace(/%257B/g, '%7B');
	url = url.replace(/%257D/g, '%7D');	
	// var arr = url.split('?');
	// var origin = encodeURIComponent(arr[0] + '?');
	// url = arr.length > 1 ? origin + arr[1] : origin;
	//跳转至纠错系统填写页面 
	window.open("https://zfwzgl.www.gov.cn/exposure/jiucuo.html?site_code=" + site_code + "&url=" + url);
}
//获取该站点需要纠错页面的url地址
function getCurrUrl() {
	var url = "";
	if (parent !== window) {
		try {
			url = window.top.location.href;
		} catch (e) {
			url = window.top.document.referrer;
		}
	}
	if (url.length == 0)
		url = document.location.href;

	return url;
}
