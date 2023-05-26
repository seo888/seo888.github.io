function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(typeof(callback) != "undefined"){
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}

//根据广告位显示广告内容
function pyad(position) {
    var script = jQuery('script:last');
    jQuery.getJSON('http://ad.bandao.cn/ad/?adp='+position+'&callback=?',function (res) {
        script.replaceWith(res.code);
    });
}

if (typeof jQuery == 'undefined') {
    loadScript("http://ad.bandao.cn/static/ad/jquery.min.js");
}




