/*
* @Author: ntnyq
* @Date:   2018-03-29 10:58:37
*/
;(function () {

  window._shareWidget = {

    shareTitle: document.title,
    shareLink: window.location.href,
    shareImage: '',
    btns: [{
      title: '新浪微博',
      className: 'weibo',
      url: 'http://service.weibo.com/share/share.php?url=[$shareLink]&title=[$shareTitle]&ralateUid=&source=海南州新闻网&sourceUrl=http%3A%2F%2Fhttp://www.hnznews.com/%2F&content=gb2312&pic=[$shareImage]',
      width: 650,
      height: 500
    }, {
      title: '微信',
      className: 'weixin',
      url: '',
      width: 612,
      height: 350
    }, {
      title: 'QQ空间',
      className: 'qzone',
      url: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=[$shareLink]&title=[$shareTitle]&pics=[$shareImage]&quality=100&summary=[$shareTitle]&desc=[$shareTitle]',
      width: 612,
      height: 500
    }, {
      title: '复制地址',
      className: 'copy',
      url: '',
      width: 612,
      height: 500
    }],
    share: function (name) {

      var imagesGroup = document.images;

      for (var i = 0, len = imagesGroup.length; i < len; i++) {

        if (imagesGroup[i].width >= 300 && imagesGroup[i].height >= 300) {

          this.shareImage = imagesGroup[i].src;
          break;
        }
      }

      for (var j = 0; j < this.btns.length; j++) {

        if (this.btns[j].className == name) {

          switch (j) {

            case 1:

                $('#wechat_qr_code').empty().qrcode({
                  width: 200,
                  height: 200,
                  text: this.shareLink
                }).show();
              break;
            case 3:
                window.prompt('复制链接: Ctrl+C, 并点击确认或按下Enter键', this.shareLink);
              break;
            default:

                var url = this.btns[j].url;

                url = url.replace(/\[\$shareTitle\]/g, encodeURIComponent(this.shareTitle));
                url = url.replace(/\[\$shareImage\]/g, encodeURIComponent(this.shareImage));

                if (j === 0) {
                  url = url.replace(/\[\$shareLink\]/g, encodeURIComponent(this.shareLink));
                } else {
                  url = url.replace(/\[\$shareLink\]/g, this.shareLink);
                }

                window.open(url, 'opsShare', 'toolbar=0, status=0,resizable=1, width=' + this.btns[j].width +
                    ',height=' + this.btns[j].height + ',left=' + Math.round(screen.width / 2 - this.btns[j].width /
                    2) + ',top=' + Math.round(screen.height / 2 - this.btns[j].height / 2));
                break
          }
        }
      }
    }
  };

  // 点击隐藏二维码
  $(document).click(function(e) {

    $('#wechat_qr_code').hide();
  });
})();