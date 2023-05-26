/**
 * base64编码
 */
function xcode(str) {
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var i = 0,
    len = str.length,
    strin = '';
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
      strin += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      strin += base64EncodeChars.charAt(c1 >> 2);
      strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
      strin += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    strin += base64EncodeChars.charAt(c1 >> 2);
    strin += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    strin += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    strin += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return strin;
}

/**
 * redirect.js 根据userAgent判断设备，用于pc站与m站的跳转
 * 例如 https://pmi.caixin.com/2021-02-03/101659585.html 跳转m站为 https://m.pmi.caixin.com/m/2021-02-03/101659585.html
 */

/**
 * 暂时没有用的，可能在别的代码中会用到的变量，这里不做改动
 */
var vjp = false;

(function () {
  /**
   * url问号(?)后面的参数（包括问号）
   * 等价于locaiton.search里的参数
   */
  var params = location.search;

  /**
   * 当前的URL
   */
  var currentURL = location.href;

  //如果URL中有//mob.则替换为//m.
  if (currentURL.indexOf("//mob.") > 0) { vjp = true; location = currentURL.replace("//mob.", "//m."); }

  //如果URL中有/ipad/则替换为/pad/
  // if (currentURL.indexOf("/ipad/") > 0) { vjp = true; location = currentURL.replace("/ipad/", "/pad/"); }

  //如果两者都没有则进行m端的替换添加m
  if ((currentURL.indexOf("NOJP") < 0) && (currentURL.indexOf("utm_campaign=Hezuo") < 0)) {

    /**
     * 转小写后的userAgent
     * @returns { string }
     */
    var currentUserAgent = navigator.userAgent.toLowerCase();

    /**
     * 判断是否是平板(经产品确认废弃 20210811)
     * @returns { boolean }
     */
    // var isPad = (currentUserAgent.indexOf("ipad;") > 0) || (currentUserAgent.indexOf("mi-pad") > 0) || (currentUserAgent.indexOf("huaweimediapad") > 0);

    /**
     * 判断是否是移动端
     * @returns { boolean }
     */
    var isMobile = (currentUserAgent.indexOf("newsarticle") > 0) || (currentUserAgent.indexOf("iphone") > 0) || (currentUserAgent.indexOf("midp") > 0) || (currentUserAgent.indexOf("rv:1.2.3.4") > 0) || (currentUserAgent.indexOf("ucweb") > 0) || ((currentUserAgent.indexOf("android") > 0) && (currentUserAgent.indexOf("mi-pad") < 0) && (currentUserAgent.indexOf("huaweimediapad") < 0)) || (currentUserAgent.indexOf("windows ce") > 0) || (currentUserAgent.indexOf("windows mobile") > 0) || (currentUserAgent.indexOf("iemobile") > 0) || (currentUserAgent.indexOf("wpdesktop") > 0);

    // 如果是m端且没有添加m到情况下
    if (isMobile && currentURL.indexOf("/m/") < 0) {
      /**
       * 从location中获取到hostname
       * 例如 "pmi.caixin.com/2021-02-03/101659585.html" 得到到是 "pmi.caixin.com"
       */
      var hostName = location.hostname
      //如果域名中存在www. 则把www.给去掉
      if (hostName.indexOf("www.") == 0) {
        hostName = hostName.substr(4);
        //如果params不为空，在params后加上需要的参数
        if (params != "") { params += "&cx_referer=" + encodeURIComponent(currentURL.substr(0, currentURL.indexOf("?"))); }
        else {
          //如果params为空，并且当前URL中后面有参数，把原来的参数添加到新的URL上面去
          if (currentURL.indexOf("?") > 0) { params = "&cx_referer=" + encodeURIComponent(currentURL.substr(0, currentURL.indexOf("?"))); }
          else { params = "?cx_referer=" + encodeURIComponent(currentURL); }
        }
      }

      /**
       * 从location中获取到到pathname
       * 例如 "pmi.caixin.com/2021-02-03/101659585.html" 得到到是 "/2021-02-03/101659585.html"
       */
      var currentPathName = location.pathname
      currentPathName = currentPathName.replace(/(\d{4}-\d{2}-\d{2}\/\d{9})_\d+\.html/,'$1.html')

      vjp = true;
      // www.caixin.com情况下，给url前面加上m.和在路径中加上/m后跳转
      var hash = location.hash
      if(location.hostname == "www.caixin.com"){
        location = location.protocol + "//m." + hostName + "/m" + currentPathName + params + hash;
      }else{
        location = location.protocol + "//" + hostName + "/m" + currentPathName + params + hash;
      }
    }
  }
})();

