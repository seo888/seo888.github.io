/**
 * Created by Administrator on 2018/5/4.
 */
$(function () {
    //分享的标题，摘要，缩略图
    var wx_h = {}, wx_q = {};
    function upDateShareInfo(shareObj) {
        if(typeof shareObj != 'object'){
            shareObj = {};
        }

       /* var href = location.href;
        var reg = /\/([^\/]+)?$/gi;
        var imgPre = href.replace(reg, '');*/

        if(shareObj.title == undefined){
            shareObj.title = $(".tb_article_title").text().trim() || document.title;
        }

        if(shareObj.description == undefined){
            shareObj.description = $(".wx_description").text().trim() || '';
        }

        //分享使用固定的logo
        var imgUrl = tycom.utils.gen_http_url(tycom.config.public_root,'img/ico.png');

       /* if(shareObj.img == undefined){
            imgUrl = $(".wx_logo").find("img").attr("src");
        }*/

       if(!/^http/.test(imgUrl)){
           imgUrl = location.protocol + imgUrl;
       }

        shareObj.img = imgUrl;
        console.log("wx_shareContent.js imgUrl=" + shareObj.img);

        wx_q = {
            title: shareObj.title,
            link: window.location.href,
            imgUrl: shareObj.img,
            success: function () {
                console.log('111');
            }
        };
        wx_h = {
            title: shareObj.title,
            desc: shareObj.description,
            link: window.location.href,
            imgUrl: shareObj.img,
            type: '',
            dataUrl: '',
            success: function () {

            },
            cancel: function () {

            }
        };
    }

    upDateShareInfo();

    var wx_f = {
        serverUrl: "",
        shareLink: window.location.href,
        getShareTimelineParams: function () {
            return wx_q;
        },
        getShareAppMessageParams: function () {
            return wx_h;
        },
        onError: function (err) {
            console.log(err);
        }
    };
    tycom.wx_share(wx_f);

    (function (exports) {
        exports.wx_share_setting = {
            //更新分享信息
            upDateShareInfo: function (shareObj) {
                upDateShareInfo(shareObj);
            }
        }
    })((function () {
        if (typeof exports === 'undefined') {
            if (typeof window.tycom === 'undefined') {
                window.tycom = {};
            }
            return window.tycom;
        } else {
            return exports;
        }
    })());
})
