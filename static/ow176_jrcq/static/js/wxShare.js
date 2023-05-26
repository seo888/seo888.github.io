//----------------------
var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
httpRequest.open('POST', 'https://wx.jrcq.cn/home/index/getShare', true); //第二步：打开连接
httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
httpRequest.send('puid=2&url='+self.location);//发送请求 将情头体写在send中
/**
 * 获取数据后的处理程序
 */
httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
		var json = JSON.parse(httpRequest.responseText);//获取到服务端返回的数据
		wx.config({
			debug: false,
			appId: json.appId,
			timestamp: json.timestamp,
			nonceStr: json.nonceStr,
			signature: json.signature,
			jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
		});
		wx.ready(function () {
		// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		 wx.onMenuShareAppMessage({
			 title:res.title, // 分享标题
			 desc: res.desc,
			 link: res.url,
			 imgUrl: res.img, // 分享图标
			 success: function () {
				 alert("分享成功！"+imgUrl);
			 },
			 error:function(){
				 console.log(res);
			 }
		 });
		// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
		 wx.onMenuShareTimeline({
			 title: res.title, // 分享标题
			 link: res.url,
			 imgUrl: res.img,  //分享图标
			 success: function () {
				 console.log("分享成功！"+imgUrl);
			 },
			 error:function(){
				 console.log(res);
			 }
		 });
	 });
	}
};
