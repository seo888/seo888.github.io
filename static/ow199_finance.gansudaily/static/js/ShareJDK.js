var wxShareHref = window.location.href;

if (/\?from=/ig.test(wxShareHref)) {
    var noJump = /nojump/ig.test(wxShareHref);
    if (noJump == false) {
        window.location.href = wxShareHref.split('?from=')[0];
    }
}

var link = location.href.split('?')[0];
if (link !== window.location.href) {
  window.location.href = link;
}

    $.when(
      $.ajax({
          url: "http://djtj.gansudaily.com.cn/ShareJdk.aspx",
          data: "link=" + encodeURIComponent(link),
          type: "GET",
          dataType:"json",
          success: function (data) {
             wx.config({
                debug: false, 
                appId: data.appId, 
                timestamp: data.timestamp, 
                nonceStr: data.nonceStr, 
                signature: data.signature,
                jsApiList: [
                    "updateAppMessageShareData",
                    "updateTimelineShareData", 
                    "onMenuShareAppMessage", 
                    "onMenuShareTimeline",
                    "onMenuShareWeibo"
                ]
            });
        },
      })
    ).done(function () {
        wx.ready(function () {
            wx.updateAppMessageShareData({
                title: shareTitle, 
                link:  wxShareHref, 
                desc: shareDesc,
                imgUrl: shareImgUrl, 
            }, function (res) {
                    alert('分享完成');
            });
            wx.updateTimelineShareData({
                title: shareTitle, 
                link:  wxShareHref, 
                imgUrl: shareImgUrl,
            }, function (res) {
                    alert('分享完成');
            });
            wx.onMenuShareWeibo({
                title: shareTitle,
                link:  wxShareHref, 
                desc: shareDesc,
                imgUrl: shareImgUrl, 
                success: function () {
                    alert('分享完成');
                },
                cancel: function () {
                    alert('你取消分享');
                }
            });
        });
    })