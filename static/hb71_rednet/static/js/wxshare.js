/*
  微信分享接口公共js库
*/
var wxerr_times = 0; // 统计微信接口调用错误的次数
var wxshare_url = window.location.href.split('#')[0];
var qqapi = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152";
var ua = navigator.userAgent;
var isWX = ua.match(/MicroMessenger\/([\d\.]+)/),isQQ = ua.match(/QQ\/([\d\.]+)/);
var shareTitle = (typeof WXSHARE_TITLE == "undefined") ? document.title :WXSHARE_TITLE,
shareDesc = (typeof WXSHARE_DESC == "undefined") ? document.title : WXSHARE_DESC,
shareUrl = (typeof WXSHARE_LINK == "undefined") ? wxshare_url : WXSHARE_LINK,
sharePic =  (typeof WXSHARE_LOGO == "undefined" || WXSHARE_LOGO == '') ? "https://moment.rednet.cn/test/logo-300.png" : WXSHARE_LOGO ;

isQQ && _initQQ({ title:shareTitle,summary:shareDesc,pic:sharePic,url:shareUrl});
isWX && init_wxshare(wxshare_url,0);


// 加载js
function loadScript(url, callback){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){ //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                if (typeof callback == "function") callback();
            }
        };
    } else { //Others
        script.onload = function(){
        if (typeof callback == "function") callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
function _initQQ(data) {
    var info = {title:data.title, desc:data.summary, share_url:data.url, image_url:data.pic};
    function doQQShare() {
      try {
        if (data.callback) {
          window.mqq.ui.setOnShareHandler(function(type) {
            if (type == 3 && (data.swapTitle || data.WXconfig && data.WXconfig.swapTitleInWX)) {
              info.title = data.summary;
            } else {
              info.title = data.title;
            }
            info.share_type = type;
            info.back = true;
            window.mqq.ui.shareMessage(info, function(result) {
              if (result.retCode === 0) {
                data.callback && data.callback.call(this, result);
              }
            });
          });
        } else {
          window.mqq.data.setShareInfo(info);
        }
      } catch (e) {
      }
    }
    if (window.mqq) {
      doQQShare();
    } else {
        loadScript(qqapi, function() {
            doQQShare();
        });
    }
}
  
function init_wxshare(url,refresh){
    $.ajax({
        type: "get",
        //async: false,
        url: "https://weixin.rednet.cn/app/index.php?i=20&c=entry&do=getjssdk&m=redoauth&jsurl=" + encodeURIComponent(url),
        dataType: "json",
        success: function(json) {
            wx.config({
                appId: json.appId,
                timestamp: json.timestamp,
                nonceStr: json.nonceStr,
                signature: json.signature,
                jsApiList: [
                    'checkJsApi',   
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });
           
            wx.ready(function () {
                var shareData = {
                    title: shareTitle,
                    desc: shareDesc,
                    link: shareUrl,
                    imgUrl: sharePic
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.onMenuShareQZone(shareData);
            });

            wx.error(function(res){
                if (++wxerr_times <= 2) { // 连续两次失败刷新ticket
                    init_wxshare(wxshare_url,1);
                }else{
                   // $.post("//weixin.rednet.cn/redpack/log.php", { url: url, code:200, res: res, appId: json.appId, timestamp: json.timestamp, nonceStr: json.nonceStr, signature: json.signature, } );
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
                if (++wxerr_times <= 2) { // 连续两次失败重新获取jssdk配置参数
                    init_wxshare(wxshare_url,0);
                }else{
                  //  $.post("//weixin.rednet.cn/redpack/log.php", { url: url, code: XMLHttpRequest, res: textStatus } );
                }
            
        }
    });
}
