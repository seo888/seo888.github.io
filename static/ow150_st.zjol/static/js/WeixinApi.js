var _getScript = function(url, callback) {
         var head = document.getElementsByTagName('head')[0],
             js = document.createElement('script');
 
         js.setAttribute('type', 'text/javascript'); 
         js.setAttribute('src', url); 
 
         head.appendChild(js);
 
         //执行回调
         var callbackFn = function(){
                 if(typeof callback === 'function'){
                     callback();
                 }
             };
 
         if (document.all) { //IE
             js.onreadystatechange = function() {
                 if (js.readyState == 'loaded' || js.readyState == 'complete') {
                     callbackFn();
                 }
            }
        } else {
             js.onload = function() {
                 callbackFn();
             }
        }
     }
var located=-1,inarea=false;
function checkLocation(){
	if(typeof(locs) != "undefined"){
	if(located!=1||!inarea){
		event.stopPropagation();
		event.preventDefault();
	}
	if(located==0){
		alert("正在进行地理位置定位，请稍后再试");
		return false;
	}
	if(located==-1){
		alert("请您打开地址理置定位，否则无法参与活动");
		return false;
	}
	if(!inarea){
    	alert("很抱歉！根据定位，您的地理位置不在活动有效范围，请关注活动详情了解活动参与规则");
    	return false;
    }
	}
	return true;
}
$(document).ready(function() {
	_getScript("https://weixin.zjol.com.cn/weixin/wxapi/share_sign.js", function() {
		wx.config({
            debug: false,
            appId: sign_params.appId,
            timestamp: sign_params.timestamp,
            nonceStr: sign_params.nonceStr,
            signature: sign_params.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
        });
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: wxData.title,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                success: function() {
                    wxCallbacks.success()
                },
                cancel: function() {
                    wxCallbacks.cancel()
                }
            });
            wx.onMenuShareAppMessage({
                title: wxData.title,
                desc: wxData.desc,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                type: "",
                dataUrl: "",
                success: function() {
                    wxCallbacks.success()
                },
                cancel: function() {
                    wxCallbacks.cancel()
                }
            });
            wx.onMenuShareQQ({
                title: wxData.title,
                desc: wxData.desc,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                success: function() {
                    wxCallbacks.success()
                },
                cancel: function() {
                    wxCallbacks.cancel()
                }
            });
            wx.onMenuShareWeibo({
                title: wxData.title,
                desc: wxData.desc,
                link: wxData.link,
                imgUrl: wxData.imgUrl,
                success: function() {
                    wxCallbacks.success()
                },
                cancel: function() {
                    wxCallbacks.cancel()
                }
            });
            if(typeof(locs) != "undefined"){
            	located=0;
            wx.getLocation({
			    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			    success: function (res) {
			        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			        var speed = res.speed; // 速度，以米/每秒计
			        var accuracy = res.accuracy; // 位置精度
			        located=1;
			        for(var i in locs){
			        item=locs[i];
			        if(GetDistance(latitude,longitude,Number(item.lat),Number(item.lng))<=Number(item.radius)){
			        	inarea=true;
			        	break;
			        }
			        }
			    }
			});
            }
        })
	});
    $(".wx_image_preview_area").delegate(".wx_image_preview","click",function(){
		 var srcList = [];
		 $(".wx_image_preview").each(function(){
			 srcList.push(this.src);
		 });
        imagePreview(this.src,srcList);
	});
});
function imagePreview(curSrc, srcList) {
    if (!curSrc || !srcList || srcList.length == 0) {
        return
    }
    WeixinJSBridge.invoke("imagePreview", {
        "current": curSrc,
        "urls": srcList
    })
}
function closeWindow() {
    WeixinJSBridge.call("closeWindow")
}
function toast(msg,icon,callback){
	var html='<div id="toast" class="mytoast">';
    html+='<div class="weui_mask_transparent"></div>';
    html+='<div class="weui_toast">';
    if(icon!=null){
    html+='<i class="weui_icon_toast_error"></i>';
    }else{
    html+='<i class="weui_icon_toast"></i>';
    }
    html+='<p class="weui_toast_content">'+msg+'</p>';
    html+='</div>';
    html+='</div>';
    $("body").append(html);
    setTimeout(function () {
        $(".mytoast").fadeOut(function(){
        	$(this).remove();
        	if(callback!=null){
        		callback();
        	}
        });
    }, 1500);
}
function loadingToast(msg){
	var html='<div id="loadingToast" class="weui_loading_toast">';
		html+='<div class="weui_mask_transparent"></div>';
		html+='<div class="weui_toast">';
		html+='<div class="weui_loading">';
		html+='<div class="weui_loading_leaf weui_loading_leaf_0"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_1"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_2"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_3"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_4"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_5"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_6"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_7"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_8"></div>';
		html+=' <div class="weui_loading_leaf weui_loading_leaf_9"></div>';
		html+=' <div class="weui_loading_leaf weui_loading_leaf_10"></div>';
		html+='<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
		html+='</div>';
		html+='<p class="weui_toast_content">'+msg+'</p>';
		html+='</div>';
		html+='</div>';
		$("body").append(html);
}
function closeLoadingToast(){
	$("#loadingToast").remove();
}
function loadpage() {
    var html = $("<div id='loading' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='width:58px;height:10px;position: fixed;left:" + ($("body").width() / 2 - 22) + "px;top:200px;z-index:20001;' src='" + src_perfix + "image/loading.gif?v=1.1'></div>");
    $("body").append(html);
    $(document).on("touchmove",
    function(e) {
        e.preventDefault()
    })
}
function closeload() {
    $("#loading").remove();
    $(document).off("touchmove")
}
function guanzhu(t, wid, d) {
    var html;
    if (wid == null && d == null) {
        html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='position: absolute;right: 18px;top:5px;z-index:20001;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_a.png'><img style='position: fixed;right: 18px;top:120px;z-index:20001;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_b.png'><div style='text-decoration:underline;padding:20px;font-size:25px;color:#fff;position: fixed;top:250px;z-index:20001;'>" + t + "</div></div>")
    } else {
        if (t != null && wid != null && d == null) {
            html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='display:block;margin:30px auto;z-index:20001;width:70%;height:auto;' src='" + src_perfix + "images/wechats/qrcode" + wid + ".jpg'><div style='padding:30px 20px 20px 20px;font-size:18px;color:#fff;z-index:20001;'>1、长按二维码，点击“识别二维码”按钮，关注我们<br/><br/>" + (t == "" ? "": "2、回复关键字“<font style='font-size:22px;color:#e51400'>" + t + "</font>”参与当前活动<br/><font style='font-size:14px'>（若您已关注仍弹出此页面，则必须要到当前公众号下回复上述关键字获取活动链接）</font>") + "</div></div>")
        } else {
            if (t != null && wid != null && d != null) {
                html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='display:block;margin:30px auto;z-index:20001;width:70%;height:auto;' src='" + src_perfix + "images/wechats/qrcode" + wid + ".jpg'><div style='padding:30px 20px 20px 20px;font-size:18px;color:#fff;z-index:20001;'>1、长按二维码，点击“识别二维码”按钮，关注我们<br/><br/>" + (t == "" ? "": "2、回复关键字“<font style='font-size:22px;color:#e51400'>" + t + "</font>”参与当前活动<br/><font style='font-size:14px'>（若您已关注仍弹出此页面，则必须要到当前公众号下回复上述关键字获取活动链接）</font>") + d + "</div></div>")
            }
        }
    }
    $("body").append(html);
    $("#scover").click(function() {
        $(this).remove()
    })
}
function fenxiang(t) {
    var html = $("<div id='scover' style='position: fixed;	top:0;	left:0;	width:100%;	height:100%;background:rgba(0, 0, 0, 0.7);	display:none;z-index:20000;display: block;'><img style='position: fixed;left:0px;top:0px;z-index:20001;width:100%;' src='" + src_perfix + "mobile/website/zjolwebsite/images/guanzhu_a.png'></div>");
    $("body").append(html);
    $("#scover").click(function() {
        $(this).remove()
    })
}
function checkReg(wechatId, fn) {
    if (wechatId == null) {
        alert("no wechatId");
        return
    }
    $.ajax({
        url: "pages/ZjolFans/checkReg.do",
        data: {
            wechatId: "41"
        },
        success: function(d) {
            if (d.trim() != "0") {
                alert("你的注册信息不全，请到‘我->个人中心’完善个人信息后再回来领取")
            } else {
                if (fn) {
                    fn()
                }
            }
        }
    })
}
//进行经纬度转换为距离的计算

function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1,lng1,lat2,lng2){

   var radLat1 = Rad(lat1);
   var radLat2 = Rad(lat2);
   var a = radLat1 - radLat2;
   var  b = Rad(lng1) - Rad(lng2);
   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
   Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
   s = s *6378.137 ;// EARTH_RADIUS;
   s = Math.round(s * 10) / 10; //输出为公里
   return s*1000;
}