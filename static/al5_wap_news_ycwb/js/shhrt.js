var tco= $('head title').text()
var ttcccc=tco.trim();

var desci = $("meta[name='description']").attr("content");
var imgUrl ="https://www.ycwb.com/images/jyw_QQWeChat_transmit.jpg";
var urlc =window.location.href;
var timesta="",
nonce="",
signa="";
var timestca=""
	var noncec="";
	var signac="";
$(function(){

$.ajax({
		url			: "https://project.ycwb.com.cn/api/wx_share",
		type		: 'POST',
		data		: {
			"curl":urlc,
			 "tt":ttcccc,
			"desci":desci,
			"imgUrl":imgUrl
		},
		  async:false, 
		dataType	: 'json',
		success: function(response, textStatus, jqXHR){
			console.dir(response);
			timesta=response.time;
			nonce=response.nonceStr;
			signa=response.signature;
			console.log(timesta,nonce,signa);
			$('body').append('<input type="hidden"  name="by1" value="'+timesta+'" readonly/><input type="hidden"  name="by2" value="'+nonce+'"readonly/><input type="hidden"  name="by3" value="'+signa+'" readonly/>')
			
		},// ENDED :: success
		complete: function(response){
			
			//window.location.href="https://project.ycwb.com.cn/api/wx_share"
		},	// ENDED :: complete
		error: function(response){

		}	// ENDED :: error
	});	// ENDED :: ajax
	timestca=$("input[name='by1']").val();
	noncec=$("input[name='by2']").val();
	signac=$("input[name='by3']").val();
	console.log(timestca,noncec,signac);
	console.log(ttcccc,desci,imgUrl,urlc);
	wx.config({ 
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: 'wx3ce85fbc1deb96dc', // 必填，公众号的唯一标识
	    timestamp:timestca, // 必填，生成签名的时间戳
	    nonceStr:noncec, // 必填，生成签名的随机串
	    signature:  signac,// 必填，签名
	    jsApiList: ['onMenuShareAppMessage','updateTimelineShareData','updateAppMessageShareData'] // 必填，需要使用的JS接口列表
	});
	wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
	    wx.updateAppMessageShareData({
	        title: ttcccc, // 分享标题
	        desc: desci, // 分享描述
	        link: urlc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	        imgUrl: imgUrl, // 分享图标
	        success: function () {
	            // 设置成功

	        }
	    });
	     wx.updateTimelineShareData({
	        title: ttcccc, // 分享标题
	        desc: desci, // 分享描述
	        link: urlc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	        imgUrl: imgUrl, // 分享图标
	        success: function () {
	            // 设置成功

	        }  	
	    })
	    wx.onMenuShareAppMessage({
		   title: ttcccc, // 分享标题
		    desc: desci, // 分享描述
		    link: urlc, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: imgUrl, // 分享图标
		    success: function () {
		        // 设置成功

		    }
		});
	});
	// wx.checkJsApi({
	//     jsApiList: ['updateTimelineShareData','updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	//     success: function(res) {
	//         // 以键值对的形式返回，可用的api值true，不可用为false
	//         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	//     }
	// });
	//
	//微信分享设置

})






