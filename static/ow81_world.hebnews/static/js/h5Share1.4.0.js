//微信分享配置
$.wxShareInit=function(shareConfig){
    var para = {
        "appid": "",
        "timestamp": "",
        "noncestr": "",
        "signature": ""
    };
    var url = location.href.split('#')[0];
        $.ajax({
            type: "GET",
            //url:"https://apps.hebnews.cn/hudong/index.php?mod=share&con=wx&act=getJsonpWxShare",
            url:"https://vo.wes2.com/share/getJsonpWxShare?appID=wx24281b1290fe01a1",
            data: {
                "url": url
            },
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
		para = data;
		wx.config({
		    debug: false,
		    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: para.appId,
		    // 必填，公众号的唯一标识
		    timestamp: para.timestamp,
		    // 必填，生成签名的时间戳
		    nonceStr: para.noncestr,
		    // 必填，生成签名的随机串
		    signature: para.signature,
		    // 必填，签名，见附录1
		    jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData',  'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function() {
		            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		           //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
		           wx.updateAppMessageShareData({ 
				    title: shareConfig.title, // 分享标题
				    desc: shareConfig.desc, // 分享描述
				    link:window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl: shareConfig.img, // 分享图标
				    success: function () {
				      // 设置成功
				    }
				})
			    //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
				  wx.updateTimelineShareData({ 
				    title: shareConfig.title, // 分享标题
				    link:window.location.href,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				    imgUrl:  shareConfig.img,  // 分享图标
				    success: function () {
				      // 设置成功
				    }
				  })
		      	//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
		            wx.onMenuShareWeibo({
		                title: shareConfig.title,
		                // 分享标题
		                desc: shareConfig.desc,
		                // 分享描述
		                link: window.location.href,
		                // 分享链接
		                imgUrl: shareConfig.img,
		                // 分享图标
		                success: function() {
		                    // 用户确认分享后执行的回调函数
		                },

		                cancel: function() {
		                    // 用户取消分享后执行的回调函数
		                }
		            });
		           
		        });
		wx.error(function(res) {
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
		 //开启分享按钮
                try{
		      WeixinJSBridge.call('showToolbar');
            	 	WeixinJSBridge.call('showOptionMenu');
		  }catch(e){
			console.log(e.message);
		  }
            }
        });
}
//获取浏览器类型
$.getNavi=function(){
	var UA = navigator.appVersion;
	var isWeixin = false;
	var isQQ=false;
	//判断是不是微信
	this.is_weixin = function () {
	    var a = UA.toLowerCase();
	    if (a.match(/MicroMessenger/i) == "micromessenger") {
	        return true
	    } else {
	        return false
	    }
	};
	//判断是不是qq浏览器
	this.is_qq=function(){
		var a=UA.toLowerCase();
		//20180518改动
		//if (a.match(/Mobile MQQBrowser/i) == "mobile mqqbrowser") {
		if (!a.match(/QQ\/([\d.]+)/i)){
	        return false;
	    } else {
	        return true;
	    }
	};
	

	isQQ=this.is_qq();
	isWeixin = this.is_weixin();
	if(isQQ){
		return "qq";
	}else if(isWeixin){
		return "wx";
	}else{
		return "others";
	}		
}
//qq分享配置
//qq分享图片地址必须与分享网址同一域名，否则不生效	
$.qqShareInit=function(shareConfig){
	setShareInfo({
                title  : shareConfig.title,
                summary: shareConfig.desc,
                pic    : shareConfig.img,
                url    : shareConfig.url
    });
};
//设置自定义分享
$.shareConfig=function(){
	//分享内容确定在content元素内
	var article=$("#content");
	var imgs=article.find("img");
	var img="";
	var title="";
	var desc="";
	var img_title="";
	var from="";
	
	//获取title和desc
	title=$.trim($("#shareTitle").text());
	desc=$.trim($("#shareDesc").text());
	//判断是否有文章
	if(article.length>0){
		
		//desc为空就截取第一段内容
		if(desc==""){
			var firstP=article.find("p")[0];
			desc=$(firstP).text();
			if(desc==""){
				desc=article.text().substr(0,100);
			}
		}
	}
	if(title==""){
		title="河北新闻网";
	}
	if(desc==""){
		desc="河北新闻网";
	}
	//判断文章内是否包含图片且图片位于本域名内
	if(imgs.length>0){
		
		img=$(imgs[0]).attr("src");
		if(img==null||img==""){
			img='https://hebei.hebnews.cn/img_fix.png';
		}
		/*		
		if(img.indexOf("http")!=-1){

		}else{
			img='http://hebei.hebnews.cn/img_fix.png';
			
		}
		*/
	}else{
		img='https://hebei.hebnews.cn/img_fix.png';

	}
	//分享图片统一用新闻网logo
	//img='http://hebei.hebnews.cn/img_fix.png';
	var url=location.href.split('#')[0];
	var config={			
		  url:url,
		  title:title,
		  desc:desc,// 描述
		  img:img,// 图片
		  img_title:'图片标题',// 图片标题
		  from:'来源' // 来源
	}
	return  config;
}
//微信qq分享config
$.nativeShare = function (shareConfig) {
    config = shareConfig || {};
    this.url = config.url || document.location.href || '';
    this.title = config.title || document.title || '';
    this.desc = config.desc || document.title || '';
    this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
    this.img_title = config.img_title || document.title || '';
    this.from = config.from || window.location.host || '';

    this.init = function () {
        var navi=$.getNavi();
        if(navi=="qq"||navi=="wx"){	
			if(navi=="qq"){
				$.qqShareInit(config);
			}
			if(navi=="wx"){
				$.wxShareInit(config);
			}
		}else{
		}
    };
    this.init();
}
//执行
$(document).ready(function(){
	var navi=$.getNavi();
	if(navi=="qq"||navi=="wx"){	
		//微信QQ采取指示右上角的方式
		var shareConfig=$.shareConfig();
		var t=setTimeout("$.nativeShare($.shareConfig())",1000)
		$(".navBar").removeAttr("onClick");
		$(".navBar").bind("click",function(){
			$("#shareit").show();
		});
		$("#shareit").on("click", function(){
			$("#shareit").hide(); 
	    });
	    
	}else{
	}
});

