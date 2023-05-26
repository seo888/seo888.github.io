if(/micromessenger/ig.test(navigator.userAgent)){
      console.log('Is weixin, add share.');

      var script = document.createElement("script");
      script.setAttribute("src","http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
      document.getElementsByTagName("head")[0].appendChild(script);

      var script = document.createElement("script");
      script.setAttribute("id",'wx-share-data');
      script.setAttribute("data-title",$('title').text());
      script.setAttribute("data-desc",$('[name="description"]').attr('content') ||'m.china.com.cn');
      script.setAttribute("data-img",'http://download.china.cn/ch/chongqing/shareF.png');
      script.setAttribute("src","http://m.china.com.cn/scripts/wxshare.js");
      document.getElementsByTagName("head")[0].appendChild(script);
    }