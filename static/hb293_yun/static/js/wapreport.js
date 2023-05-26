/*
 * @Description: 
 * @Author: FreeDoM_BaT
 * @Date: 2022-10-09 15:21:57
 * @LastEditTime: 2022-11-07 15:03:10
 */
(function () {
  function httpGet(theUrl, callback) {
    var script = document.createElement("script");
    script.src = theUrl;
    document.getElementsByTagName("head")[0].appendChild(script);

    window.__wapReportSuccess = function (result) {
      if (callback) callback(result);
    };
  }

  window.wapReport = function (appId, contentId, callback) {
    httpGet(
      "https://analysis.jxtvcn.com.cn:2346/api/v1/userdata/wap?appId=" +
        encodeURIComponent(appId) +
        "&contentId=" +
        encodeURIComponent(contentId),
      callback
    );
  };
})();
