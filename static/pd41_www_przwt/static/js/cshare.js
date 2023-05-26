/************************************
 封装分享相关的方法
 *************************************/
var _vShare = (function() {
    return {
        //分享到新浪微博
        sharetoSina: function(title, url, picurl) {
            var sharesinastring = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&type=button&ralateUid=&language=zh_cn&appkey=&title=' + encodeURIComponent(title) + '&pic=' + picurl + '&searchPic=true&style=simple';
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
        },
        //分享到QQ空间
        sharetoQQzone: function(title, url, picurl) {
            var shareqqzonestring = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + title + '&desc=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
        },
        //分享到微信朋友圈
        sharetoWeixin: function(title, url, picurl) {
            $('#bdshare_weixin_qrcode_dialog #bdshare_weixin_qrcode_dialog_qr').html('').qrcode(url);
            $(".bd_weixin_popup").css({
                "display": "block"
            });
        },
		//分享到Ins
        sharetoLinkedin: function(title, url) {
           var sharelinkedinstring = '//www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&url=' + url;
           window.open(sharelinkedinstring, 'newwindow', 'height=400,width=400,top=100,left=100');
        }
    }
}
)();

/****** 点击分享ICON调用封装方法 ******/
$(".cshare").on('click', '.share-weibo,.share-qq,.share-wechat,.share-linkedin', function(event) {
    /****** 判断当前属于哪个元素 ******/
    var _this = $(event.target);
    var _cname = _this.attr("class");
    var _title = _this.parents(".cshare").eq(0).attr("stitle");
    var _ahref = _this.parents(".cshare").eq(0).attr("slink");
    var _image = _this.parents(".cshare").eq(0).attr("simg");
    var _links = (_ahref.indexOf("//") == 0) ? 'https:' + _ahref : _ahref;
    var _pic = (_image.indexOf("//") == 0) ? 'https:' + _image : _image;

    console.log(_cname)

    if (_cname.indexOf("weibo") > -1) {
        _vShare.sharetoSina(_title, _links, _image);
    }
    if (_cname.indexOf("qq") > -1) {
        _vShare.sharetoQQzone(_title, _links, _image);
    }
    if (_cname.indexOf("wechat") > -1) {
        _vShare.sharetoWeixin(_title, _links, _image);
    }
	if (_cname.indexOf("linkedin") > -1) {
        _vShare.sharetoLinkedin(_title, _links);
    }
})

/************************************
 关闭微信分享的二维码
 *************************************/
$(".bd_weixin_popup a").click(function() {
    $(".bd_weixin_popup").css({
        "display": "none"
    })
})
