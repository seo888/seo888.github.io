document.writeln('<style>#m_copyright{width:100%; margin:0 auto; display:table;}#m_copyright ul{text-align:center; color:#000; font-size:12px; line-height:180%;}#m_copyright li a{color:#999;}</style>');
document.writeln('<div id="m_copyright"><ul class="sColor"><li>四川日报网络传媒发展有限公司版权所有<br>蜀ICP备12028253号-2<br>川公网安备51010402000072号<br>互联网新闻信息服务许可证51120170001</li></ul></div>');

document.write("<div style='display:none'>");

//微信分享
document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"><\/script>');

//这里需要先decodeURI解码一次，因为分享的链接在之前是编码过的
if (location.href.split('#')[0] != location.href.split('&')[0]) {
	window.location.href = decodeURI(location.href.split('&')[0]);
}

$(function(){
	//浏览器分享图片
	var fx_img="<img src='https://www.scol.com.cn/images/scol.jpg' style='width:0; height:0; position:absolute;'>";
	$('body').prepend(fx_img);
	
	getBgColor($('body').css('background-color'));
    wx_share();
});

//根据背景颜色调整字体颜色
function getBgColor(color){
    var rgb = color.substring(color.indexOf('(')+1,color.lastIndexOf(')')).split(',');
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);
    var gray = Math.floor(r*0.299+g*0.587+b*0.114);
    if(gray >= 128){
        $('.sColor').css('color','#000');
    }else{
        $('.sColor').css('color','#fff');
    }
}

//分享
function wx_share(){
	var url = location.href.split('#')[0];
	var ua = navigator.userAgent;
	var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (isiOS) {
		url = encodeURI(url);//iOS需要先encodeURI编码再传入后端进行签名(为了与分享链接link参数需要保证一致),而android不需要，反而编码后不能分享
	}

	var share_title = $('.m_title > h1').text() || $(document).attr("title"), //分享标题
		share_desc = $("*[name='description']").attr("content"), //分享描述
		share_link = url, //分享链接
		//share_image = url.substring(0,url.lastIndexOf('/')) + "/images/logo.jpg";//分享图标
		share_image = "https://www.scol.com.cn/images/scol.png"; //分享图标

	//console.log(share_title,share_desc,share_link,share_image);
	var requestURL = 'https://wxopen.scol.com.cn/OpenApi/weixin/GetJsSDK?';
	var appIdList = {
		'piyao': 'wx28b38180b1bb7e9b',
		'news': 'wx28b38180b1bb7e9b',
		'liangshan': 'wx4bf4208bc79d1e1e',
		'bazhong': 'wx3eccb095a2051bb2',
		'luzhou': 'wx533b9916fb8fd429',
		'gy': 'wx03ca0914b705abaa',
		'house': 'wx19d3014854087e2f'
	};
	for (var appIdKey in appIdList) {
		if (url.indexOf(appIdKey) !== -1) {
			requestURL += 'appId=' + appIdList[appIdKey] + '&url=' + url + '&r=' + Math.random();
			if (appIdKey === 'piyao') {
				share_image = 'https://piyao.scol.com.cn/images/pityao300X300.jpg';
			} break;
		}
	}
	if (requestURL === 'https://wxopen.scol.com.cn/OpenApi/weixin/GetJsSDK?') {
		requestURL = '/weixin/config?url=' + share_link + '&r=' + Math.random(); //默认
	}

	$.getJSON(requestURL,function(config){
		wx.config({
			debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: config.appId, //必填，公众号的唯一标识
			timestamp: config.timestamp, //必填，生成签名的时间戳
			nonceStr: config.nonceStr, //必填，生成签名的随机串
			signature: config.signature,//必填，签名，见附录1
			jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareQQ'] //必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function(){
			var shareData = {
				title: share_title,//分享标题
				desc: share_desc,//分享描述
				link: share_link,//分享链接
				imgUrl: share_image,//分享图标
				success: function () {//用户确认分享后执行
					//alert("分享成功");
				},
				cancel: function () {//用户取消分享后执行
					
				}
			};
			if(wx.onMenuShareAppMessage){//微信文档中提到这两个接口即将弃用，故判断
				wx.onMenuShareAppMessage(shareData);//1.0分享到朋友
				wx.onMenuShareTimeline(shareData);//1.0分享到朋友圈
			}else{
				wx.updateAppMessageShareData(shareData);//1.4分享到朋友
				wx.updateTimelineShareData(shareData);//1.4分享到朋友圈
			}
			wx.onMenuShareWeibo(shareData);
			wx.onMenuShareQZone(shareData);
			wx.onMenuShareQQ(shareData);
		});
	});
};

//百度统计
var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?3655798ef3e7d6f0b0ffacdc386fa14d";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();

document.write("</div>");