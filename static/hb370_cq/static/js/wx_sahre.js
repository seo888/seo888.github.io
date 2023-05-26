$(function () {
  setTimeout(function () {
    if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
      wxInit();
    }
  },2000);
//微信分享
  function wxInit () {
    var shareData={
      title:document.title,
      desc:document.title,
      link:window.location.href,
      imgUrl:"http://www.cq.gov.cn/images/share_logo.png"
    }
    console.log(shareData,'shareData');
    $.ajax({
      url: 'https://ccbweb.cqliving.com/we/json.html',
      dataType: "json",
      type:"post",
      data:{url:window.location.href},
      async:"true",
      success: function (data) {
        console.log(data)
        if(data.code != 0){
          return;
        }else{
          var result=JSON.parse(data.data)
          wx.config({
            appId: result.appId, // 必填，公众号的唯一标识
            timestamp:result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.nonceStr, // 必填，生成签名的随机串
            signature: result.signature,// 必填，签名
            jsApiList: result.jsApiList// 必填，需要使用的JS接口列表
          });
          wx.ready(function(){
            wx.updateAppMessageShareData({
              title: shareData.title, // 分享标题
              desc: shareData.desc, // 分享描述
              link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareData.imgUrl, // 分享图标
              success: function (res) {
// 设置成功
                console.log(res,'success')
              },
              fail:function (err) {
                console.log(err,'err')
              }
            })
            wx.updateTimelineShareData({
              title: shareData.title, // 分享标题
              link: shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: shareData.imgUrl, // 分享图标
              success: function (res) {
// 设置成功
                console.log(res,'success')
              },
              fail:function (err) {
                console.log(err,'err')
              }
            })

          });
        }
      },error:function(data){
        console.info(data);
      }
    })
  }
})

