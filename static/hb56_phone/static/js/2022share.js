/************************************
 ��װ������صķ���
 *************************************/
var _vShare = (function() {
    return {
        //��������΢��
        sharetoSina: function(title, url, picurl) {
            // var sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
            var sharesinastring = 'https://service.weibo.com/share/share.php?title=' + title + '&url=' + url + '&content=utf-8&sourceUrl=' + url + '&pic=' + picurl;
            window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
        },
        //����QQ�ռ�
        sharetoQQzone: function(title, url, picurl) {
            var shareqqzonestring = '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + title + '&desc=' + title + '&url=' + url + '&pics=' + picurl;
            window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
        },
        //����΢������Ȧ
        sharetoWeixin: function(title, url, picurl) {
            $('#bdshare_weixin_qrcode_dialog>#bdshare_weixin_qrcode_dialog_qr').html('').qrcode(url);
            $(".bd_weixin_popup").css({
                "display": "block"
            });
        }
    }
}
)();

/****** �������ICON���÷�װ���� ******/
$(".info_share").on('click', '.weibo,.qzone,.weixin', function(event) {
    /****** �жϵ�ǰ�����ĸ�Ԫ�� ******/
    var _this = $(event.target);
    var _cname = _this.attr("class");
    var _title = _this.parents(".info_share").eq(0).attr("stitle");
    var _ahref = _this.parents(".info_share").eq(0).attr("slink");
    var _image = _this.parents(".info_share").eq(0).attr("simg");
    var _links = (_ahref.indexOf("//") == 0) ? 'http:' + _ahref : _ahref;
    var _pic = (_image.indexOf("//") == 0) ? 'http:' + _image : _image;

    console.log(_cname)

    if (_cname.indexOf("weibo") > -1) {
        _vShare.sharetoSina(_title, _links, _image);
    }
    if (_cname.indexOf("qzone") > -1) {
        _vShare.sharetoQQzone(_title, _links, _image);
    }
    if (_cname.indexOf("weixin") > -1) {
        _vShare.sharetoWeixin(_title, _links, _image);
    }
})

/************************************
 �ر�΢�ŷ���Ķ�ά��
 *************************************/
$(".bd_weixin_popup a").click(function() {
    $(".bd_weixin_popup").css({
        "display": "none"
    })
})

/************************************
 �ر��ղص����ɲ�
 *************************************/
$(".collection .close,.mask").click(function() {
    $(".collection,.mask").hide();
})
