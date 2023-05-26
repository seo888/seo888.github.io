function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//��ȡ����ͼƬ����
scripts = document.getElementsByTagName('script');
currentScript = scripts[scripts.length - 1];
imgurl = currentScript.getAttribute('imgurl');
link = currentScript.getAttribute('link');
desc = currentScript.getAttribute('desc');
title = currentScript.getAttribute('title');

//����΢��js-sdk
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        if (typeof $ != "function") {
            //alert("is function");
            $ = jQuery;
        }
        setTimeout(share(), 300);
        // Handle memory leak in IE 
        script.onload = script.onreadystatechange = null;
    }
};
script.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
if (isWeiXin()) {
    head.appendChild(script);
}




//��������Ȧ��΢�ŷ���
function share() {
    var url = window.location.href;
    if (url.indexOf('#') > -1) {
        url = url.split('#')[0];
    }
    var sharetitle = $('title').text().replace("\n", "");
    var sharelink = url;
    var shareimgUrl = "http://news.sznews.com/123781.files/fx20170331.jpg";

    if (title != null) {
        sharetitle = title;
    }
    if (imgurl != null) {
        shareimgUrl = imgurl;
    }
    if (link != null) {
        sharelink = link;
    }
    var sharedesc = $('title').text().replace("\n", "");;
    if (desc != null) {
        sharedesc = desc;
    }
    var shareTimeline = $('title').text().replace("\n", "");
    sharedesc = sharedesc.replace(/[\r\n]/g, "");
    //console.log(shareimgUrl);
    $.ajax({
        url: 'https://v2.sznews.com/weitest/index.php?s=Wxshare/getwx.html',
        type: 'post',
        data: {
            url: url.replace(/&/g, "@")
        },
        success: function (msg) {

            msg = JSON.parse(msg);
            // console.log(msg);
            wx.config({
                debug: false,//ֵΪtrueʱ����debugģʽ�����Դ��״ֵ̬
                appId: msg.appId,
                timestamp: msg.timestamp,
                nonceStr: msg.nonceStr,
                signature: msg.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'
                    // ����Ҫ���õ� API ��Ҫ�ӵ�����б���
                ]
            });
            wx.ready(function () {
                //alert(123);
                wx.checkJsApi({
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // ��Ҫ����JS�ӿ��б�������JS�ӿ��б�����¼2,
                    success: function (res) {
                        // �Լ�ֵ�Ե���ʽ���أ����õ�apiֵtrue��������Ϊfalse
                        // console.log("api success");
                        //console.log(res);

                    }
                });

                wx.error(function (res) {
                })
                //��ȡ������������Ȧ����ť���״̬���Զ���������ݽӿ�
                wx.onMenuShareTimeline({
                    title: sharetitle, // ��������
                    link: sharelink, // ��������
                    imgUrl: shareimgUrl, // ����ͼ��
                    success: function () {
                        // �û�ȷ�Ϸ�����ִ�еĻص�����

                        // console.log("share1 success");
                    },
                    cancel: function () {
                        // �û�ȡ��������ִ�еĻص�����
                    },
                    fail: function () {
                        //alert("share1 fail");
                    }
                });
                //��ȡ�����������ѡ���ť���״̬���Զ���������ݽӿ�
                wx.onMenuShareAppMessage({
                    title: sharetitle, // ��������
                    desc: sharedesc, // ��������
                    link: sharelink, // ��������
                    imgUrl: shareimgUrl, // ����ͼ��
                    type: 'link', // ��������,music��video��link������Ĭ��Ϊlink
                    dataUrl: '', // ���type��music��video����Ҫ�ṩ�������ӣ�Ĭ��Ϊ��
                    success: function () {
                        // �û�ȷ�Ϸ�����ִ�еĻص�����

                        // console.log("share2 success");
                    },
                    cancel: function () {
                        // �û�ȡ��������ִ�еĻص�����
                    },
                    fail: function () {
                        //alert("share2 fail");
                    }
                });
            });
        }
    });
}
