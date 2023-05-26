/**
 * 微信分享，专题中使用
 * 参考：https://weixin.zjol.com.cn/weixin/resource/script/WeixinApi.js?v=1.7
 * 
 * .html文件内引用：
 * <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
 * 再引用本.js文件(不需要 WeixinApi.js)
 * 
 * @version 2.1
 */

!function (window) {
  var document = window.document

  // 需要分享的数据
  var wxData = window.wxData || {
    //微信分享标题(23字以内)：必填
    title: document.title,

    //微信分享摘要（35字以内）：必填
    desc: document.querySelector('meta[name=shareText]') && document.querySelector('meta[name=shareText]').content || document.querySelector('meta[name=description]') && document.querySelector('meta[name=description]').content,

    // 获取本页面地址作为分享指向链接(重要!!!!)
    link: window.location.href,

    // 微信导读图取body内第一张图片，<img src="http://singrr.com/wm/img/logo.jpg" style="display:block;visibility:hidden;height:0;width:0;" />
    imgUrl: document.querySelector('img.share') && document.querySelector('img.share').src || document.querySelector('meta[name=shareImage]') && document.querySelector('meta[name=shareImage]').content || '//zzhz.zjol.com.cn/material/public-resource/img/share-logo.png',

    //对应频道的id：必填
    appid: ''
  }
  if (wxData.imgUrl && wxData.imgUrl.indexOf('http') < 0) {
    wxData.imgUrl = window.location.protocol + wxData.imgUrl
  }

  var _wxShare = function () {
    // 以下内容不需要编辑
    function shareFriend() {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid": wxData.appid,
        "img_url": wxData.imgUrl,
        "img_width": "300",
        "img_height": "300",
        "link": wxData.link,
        "desc": wxData.desc,
        "title": wxData.title
      }, function (res) {
        _report('send_msg', res.err_msg);
      })
    }
    function shareTimeline() {
      WeixinJSBridge.invoke('shareTimeline', {
        "img_url": wxData.imgUrl,
        "img_width": "300",
        "img_height": "300",
        "link": wxData.link,
        "desc": wxData.desc,
        "title": wxData.title
      }, function (res) {
        _report('timeline', res.err_msg);
      });
    }
    function shareWeibo() {
      WeixinJSBridge.invoke('shareWeibo', {
        "content": wxData.desc,
        "url": wxData.link,
      }, function (res) {
        _report('weibo', res.err_msg);
      });
    }
    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      // 发送给好友
      WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        shareFriend();
      });
      // 分享到朋友圈
      WeixinJSBridge.on('menu:share:timeline', function (argv) {
        shareTimeline();
      });
      // 分享到微博
      WeixinJSBridge.on('menu:share:weibo', function (argv) {
        shareWeibo();
      });
    }, false);
  }

  function initWxShare() {
    wx.config({
      debug: false,
      appId: sign_params.appId,
      timestamp: sign_params.timestamp,
      nonceStr: sign_params.nonceStr,
      signature: sign_params.signature,
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
    });
    wx.ready(function () {
      wx.updateAppMessageShareData({
        title: wxData.title,
        desc: wxData.desc,
        link: wxData.link,
        imgUrl: wxData.imgUrl,
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
          wxCallbacks.cancel()
        }
      });
      wx.updateTimelineShareData({
        title: wxData.title,
        link: wxData.link,
        imgUrl: wxData.imgUrl,
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
          wxCallbacks.cancel()
        }
      });

      wx.onMenuShareTimeline({
        title: wxData.title,
        link: wxData.link,
        imgUrl: wxData.imgUrl,
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
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
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
          wxCallbacks.cancel()
        }
      });
      wx.onMenuShareQQ({
        title: wxData.title,
        desc: wxData.desc,
        link: wxData.link,
        imgUrl: wxData.imgUrl,
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
          wxCallbacks.cancel()
        }
      });
      wx.onMenuShareWeibo({
        title: wxData.title,
        desc: wxData.desc,
        link: wxData.link,
        imgUrl: wxData.imgUrl,
        success: function () {
          wxCallbacks.success()
        },
        cancel: function () {
          wxCallbacks.cancel()
        }
      });
    })
  }

  $(document).ready(function () {
    $.ajax({
      url: 'https://weixin.zjol.com.cn/weixin/wxapi/share_sign.do?refererUrl=' + window.location.href,
      type: 'get',
      dataType: 'script',
      success: function () {
        initWxShare()
        _wxShare()
      }
    })

    if (typeof wx == 'object' && wx.miniProgram) {
      wx.miniProgram.postMessage({
        data: {
          title: window.wxData && window.wxData.title || $('title').text().trim()
        }
      })
    }
  })

}(window);