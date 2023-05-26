$(document).ready(function () {
  // 微信分享二维码
  new QRCode(document.getElementById("wechat-drop"), {
    text: window.location.protocol + "//wap.bjd.com.cn/news" + window.location.pathname,
    width: 120,
    height: 120
  })
  new QRCode(document.getElementById("wechat-drop-1"), {
    text: window.location.protocol + "//wap.bjd.com.cn/news" + window.location.pathname,
    width: 120,
    height: 120
  })
  if (document.getElementById("phone-drop")) {
    new QRCode(document.getElementById("phone-drop"), {
      text: window.location.protocol + "//wap.bjd.com.cn/news" + window.location.pathname,
      width: 120,
      height: 120
    })
  }
  $(".tool-wx").hover(function () {
    $("#wechat-drop-1").show()
  }, function () {
    $("#wechat-drop-1").hide()
  })
  $(".wechat-drop").hover(function () {
    $("#wechat-drop").show()
  }, function () {
    $("#wechat-drop").hide()
  })


  //分享到新浪微博
  var ShareTip = function () { }
  ShareTip.prototype.sharetosina = function (title, url) {
    var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url;
    window.open(sharesinastring, "_blank");
  }
  $('.weibo').on('click', function () {
    var shareTitle = $('.article-title').text();
    var shareUrl = window.location.href;
    var share1 = new ShareTip();
    share1.sharetosina(shareTitle, shareUrl);
  })

  // 生成海报
  if (document.getElementById("h2c-qrcode")) {
    $("#h2c-qrcode").html('')
    new QRCode(document.getElementById("h2c-qrcode"), {
      text: window.location.href, // 生成二维码
      width: 76,
      height: 76
    })
  }
  $(".picture").click(function () {
    $.ajax({
      type: "GET",
      url: $(".h2c-banner").attr("src"),
      async: false,
      success: function () {
        $(".h2c-banner.normal").css("display", "block")
      },
      error: function () {
        $(".h2c-banner.copy").attr("src", "https://img.bjd.com.cn/p/2021/10/31/8be65b41042393350a6de265ff5d5385.jpg")
        $(".h2c-banner.copy").css("display", "block")
      }
    })
    html2canvas(document.querySelector(".h2c"), {
      useCORS: true
    }).then(res => {
      var base64 = res.toDataURL("image/jpg")
      var img = document.createElement('img')
      img.src = base64
      img.className = "h2c-img"
      $("body").css("overflow", "hidden")
      $(".model-fixed .h2c-img").remove()
      $("#h2c-img").append(img)
      $(".model-fixed").show()
      $(".login-mask").show()
      $("#copy-h2c").click(function () {
        downLoad(base64);
      })
    });
  })

  // 海报关闭
  $(".h2c-close").click(function () {
    $("body").css("overflow", "auto")
    $(".model-fixed").hide()
    $(".login-mask").hide()
  })

  $(".tool-wb").click(function () {
    shareToSinaWB();
  })
})

function downLoad(url) {
  var oA = document.createElement("a");
  oA.download = 'poster';
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();
  oA.remove();
}
