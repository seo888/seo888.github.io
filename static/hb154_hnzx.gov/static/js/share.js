/*
 * @Author: liuxuanxuan 
 * @Date: 2021-09-09 14:33:04 
 * @Last Modified by: liuxuanxuan
 * @Last Modified time: 2021-09-09 15:45:33
 * @Des：分享微信、微博、空间、豆瓣
 */

(function() {
    var title = encodeURIComponent(document.title);
    var url = window.location.href; //正式分享地址代码
    var list = {
        'dahe_weixin': 'https://uploads.dahe.cn/common/share/wxshare.html?url=' + url, //改成二维码页面最终地址
        'dahe_tsina': 'http://service.weibo.com/share/share.php?url=' + url + "&title=" + title,
        'dahe_qzone': 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + "&title=" + title,
        'dahe_douban': 'https://www.douban.com/share/service?appkey=3&sharesource=weibo&title=' + title + '&url=' + url
    };
  
    $('.share-btn').on('click', function(){
        var key = $(this).data('cmd');
        console.log(key);
          window.open(list[key]);
        return false
    })
  })();