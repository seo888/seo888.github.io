/*<!doctype html><html> <head><title>test wx title</title><meta charset="utf-8">
<meta name="description" content="12345"><meta name="shareImg" content="12345">
<meta name="showWxErr" content="分享失败时弹出alert。仅供测试使用，否则请删除改行">
<script src="http://127.0.0.1:8920/wxshare/wxshare/js/jsonp.js"></script>
</head><body></body></html>*/
function loadJs(sid, jsurl, callback) {
	var nodeHead = document.getElementsByTagName('head')[0], nodeScript = null;
	if (document.getElementById(sid) == null) {
		nodeScript = document.createElement('script');
		nodeScript.setAttribute('type', 'text/javascript');
		nodeScript.setAttribute('src', jsurl);
		nodeScript.setAttribute('id', sid);
		if (callback != null) {
			nodeScript.onload = nodeScript.onreadystatechange = function() {
				if (nodeScript.ready) {
					return false;
				}
				if (!nodeScript.readyState || nodeScript.readyState == "loaded"
						|| nodeScript.readyState == 'complete') {
					nodeScript.ready = true;
					callback();
				}
			};
		}
		nodeHead.appendChild(nodeScript);
	} else {
		if (callback != null) {
			callback();
		}
	}
}
function wxinit(data) {
	if (data && data.appid) {
		var url = location.href, title = document.title || '', metaDsc = document.querySelector('meta[name="description"]'),
	    description = metaDsc ? (metaDsc.content || '') : '', shareImg = document.querySelector('meta[name="shareImg"]'),
	    shareImgUrl = shareImg ? (shareImg.content || '') : '',
	    showWxErr = document.querySelector('meta[name="showWxErr"]');
	    
		wx.config({
			debug     : false,
			appId     : data.appid,
			timestamp : data.timestamp,
			nonceStr  : data.noncestr,
			signature : data.sign,
			jsApiList : [ 'onMenuShareTimeline','onMenuShareAppMessage' ]
		});
		wx.ready(function() {
			wx.onMenuShareTimeline({
				title : title,
				link : url,
				imgUrl : shareImgUrl
			});
			var data = {
					title : title,
					desc : description,
					link : url,
					imgUrl : shareImgUrl
			};
			wx.onMenuShareAppMessage(data);
		});
		wx.error(function(res){showWxErr && alert("微信验证失败!"+res);})
	}
}
function weixinInit() {
	if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
//		loadJs("weixin-jsonp", 'http://share.cdurl.cn/wxshare/api/wxinit?callback=wxinit&url='+ location.href);
//		loadJs("weixin-jsonp", '/wxshare/api/wxinit?callback=wxinit&url='+ location.href);
		//2022.07.29 根据杜冰的要求. 优化分享过程中404的问题     eg:  enapp.chinadaily.com.cn/wxshare/api/wxinit?callback=wxinit&url  404 not found
		loadJs("weixin-jsonp", 'https://share.chinadaily.com.cn/wxshare/api/wxinit?callback=wxinit&url='+ location.href);
	}
}
loadJs("weixin-init", "https://res.wx.qq.com/open/js/jweixin-1.0.0.js", weixinInit);

