
    function shareTo(type,tle) {
      var a = "height=540,width=720, top = " + (window.screen.height - 540) / 2 + ", left = " + (window.screen.width - 720) / 2 + ", toolbar=no,menubar=no,resizable=yes,location=yes,status=no",
      url = encodeURIComponent(window.location.href),
      shareImg = "https://j.rednet.cn/images/RC-cs.png";
      title = encodeURIComponent(tle);
      if(type == 'WB'){
        var i = "http://service.weibo.com/share/share.php?url=" + url + "&appkey=&title=" + title + "&pic="+shareImg+"&ralateUid=&language=&searchPic=" + !1;
        window.open(i, "shareWB", a);
      }else if(type == 'QQ'){
        var n = "http://connect.qq.com/widget/shareqq/index.html?url=" + url + "&showcount=0&desc=" + title + "&summary=&title=" + title + "&pics="+shareImg+"&style=203&width=19&height=22";
        window.open(n, "shareQQ", a)
      }
  }

  function loginTo(){
    window.location.href = "http://passport.rednet.cn/passport/login?client_id=1f9523a2fb6f4223b2d69dc264e991d4&redirect_uri=" + window.location.href;
  }
  
  function registerTo(){
    window.location.href = "http://passport.rednet.cn/passport/register/toRegister?client_id=68cc976532594c4b81e4c5b2bddd8132&redirect_uri=" + window.location.href;
  }

  //写cookies
  function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString();
  }

  //读取cookies
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }