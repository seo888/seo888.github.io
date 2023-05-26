$(document).ready(function(){
  //下载海报按钮
  var image=$("#poster .posterImg >img");
  var posterUrl=image[0].src;
  var posterH5Url=posterUrl.replace('http://haikenews.static.haiwainet.cn', '');
  // posterH5Url="https://m.haiwainet.cn/middle/index/posterweixin/?id="+sensorsConData["event"].content_id+"&img="+posterH5Url;
  posterH5Url="https://m.haiwainet.cn/middle/index/posterweixin?img="+posterH5Url;


  //打开关闭海报显示
  $(".posterOpen").click(function(){
    $("#poster").fadeToggle("fast","linear");
    $(document.body).css({
      "overflow-x":"hidden",
      "overflow-y":"hidden"
    });
  });
  $("#poster").click(function(event){
    if( $(event.target)[0]===this) {
      $("#poster").fadeToggle("fast","linear");
      $(document.body).css({
        "overflow-x":"auto",
        "overflow-y":"auto"
      });
    }
  })
  //分享到新浪微博
  var ShareTip = function(){}
  ShareTip.prototype.sharetosina=function(title,url,imgUrl)
  {
    var sharesinastring='https://service.weibo.com/share/share.php?title='+title+'&pic='+imgUrl+'&url='+url+'&content=utf-8&sourceUrl='+url;
//            var sharesinastring='http://v.t.sina.com.cn/share/share.php?&appkey='+appkey+'&title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='picurl;
    window.open(sharesinastring,'resizable=no');
  }

  $('.weibo').on('click', function () {
    var shareTitle = $('.showpage h1').text();
    var shareContent = $("meta[name='description']").text();
    var shareUrl = window.location.href;
    var share1 = new ShareTip();
    if($(this).has('hb')){
      console.log(1111)
      console.log(posterUrl)
      share1.sharetosina(shareTitle + "  " + shareContent,shareUrl,posterUrl);
    }else{
      share1.sharetosina(shareTitle + "  " + shareContent,shareUrl,$('.contentMain img'));
    }

  })
  // 分享到微信
  $('#poster span.weixin,#poster span.weixinFridend').click(function () {

    if($('.wx-box').length){

    }else{
      // console.log(sensorsConData);
      $('#poster .posterblock .posterButton').append('<div class="wx-box" ><div class="weixintit">分享到微信</div><div id="wxCode"></div><p>1、使用“扫一扫”，将海报下载到手机相册</p><p>2、将下载的海报分享给微信好友或朋友圈</p><div class="wx-box-close"></div></div>');
      //生成二维码

      //   var posterH5Url="http://m.haiwainet.cn/middle/index/posterweixin/?id=31737188&img=/poster_v6/2020/0308/52a77ead-0951-4d03-9d72-e62a77700a19.jpg"

      console.log(posterH5Url);
      $("#wxCode").qrcode({
        render: 'canvas',
        width: 116,
        height: 116,
        text: posterH5Url //任意内容
      });
      $('.wx-box-close').on('click', function () {
        $('.wx-box').hide();
      })
    }
    $('.wx-box').show();

  })



})

function  dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}
