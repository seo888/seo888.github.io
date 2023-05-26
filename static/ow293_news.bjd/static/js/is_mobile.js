//二级栏目页footer统一js
function isMobile() {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) return true;
  return false;
}
if (isMobile()) {
  var currUrl = window.location.href
  var url = ""
  if (currUrl.indexOf("bjd.com.cn/jbw") != -1) { // 列表页
    url = currUrl.replace("www", "wap")
  } else if (currUrl.indexOf("news.bjd.com.cn") != -1) {
    url = currUrl.replace("news.bjd.com.cn", "h5news.bjd.com.cn")
  } else {
    url = window.location.protocol + "//wap.bjd.com.cn"
  }
  window.location.href = url;
}
