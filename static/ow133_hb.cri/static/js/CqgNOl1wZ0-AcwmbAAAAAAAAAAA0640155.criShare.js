if (!window.criObjShare) {
    var criObjShare = {};
    criObjShare.criShareTitle = document.title;
    criObjShare.criShareUrl = document.location.href;
    criObjShare.desc = "";
    criObjShare.pic = "";
    criObjShare.summary = "";
} else {
    criObjShare = window.criObjShare;
}
if (!criObjShare.criShareTitle || criObjShare.criShareTitle == "") {
    criObjShare.criShareTitle = document.title
}
if (!criObjShare.criShareUrl || criObjShare.criShareUrl == "") {
    criObjShare.criShareUrl = document.location.href;
}
if (!criObjShare.pic) {
    criObjShare.pic = "";
}
if (!criObjShare.desc || typeof criObjShare.desc == "undefined") {
    criObjShare.desc = "";
}
if (!criObjShare.summary) {
    criObjShare.summary = "";
}
var ldClick = "click" || "touchstart";
var shareToWbBtn = $("[data-fx='wb-btn']");
shareToWbBtn.on(ldClick,
    function () {
        var u = "//service.weibo.com/share/share.php?appkey=2887206363&title=" + criObjShare.criShareTitle + "&url=" + encodeURIComponent(criObjShare.criShareUrl) + "&pic=" + criObjShare.pic + "&searchPic=false&style=simple";
        window.open(u)
    });
var shareToQQBtn = $("[data-fx='qq-btn']");
shareToQQBtn.on(ldClick,
    function () {
        if (!criObjShare.desc || typeof criObjShare.desc == "undefined") {
            criObjShare.desc = "";
        }
        var u = "//connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(criObjShare.criShareUrl) + "&summary=" + criObjShare.summary + "&title=" + encodeURIComponent(criObjShare.criShareTitle) + "&pics=" + criObjShare.pic + "&desc=" + criObjShare.desc;
        window.open(u)
    });
var shareWxBtn = $("[data-fx='wx-btn']");
shareWxBtn.on(ldClick,
    function () {
        requireQrcode("https://f2.cri.cn/M00/4F/D3/CqgNOl0-aB2AZ27lAAAAAAAAAAA5883992.jq-qrcode.js", "wx-btn")
    });
function requireQrcode(url, data) {
    if ($("#codeqr").length > 1) {
        $("#codeqr").show()
    } else {
        if ($("#shareqrjs").length > 0) {
            createTableCode(data)
        } else {
            var d = document.createElement("script");
            d.setAttribute("charset", "utf-8");
            d.type = "text/javascript";
            d.language = "javascript";
            d.id = "shareqrjs";
            d.src = url;
            document.getElementsByTagName("body")[0].appendChild(d);
            if (d.readyState) {
                d.onreadystatechange = function () {
                    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                        createTableCode(data)
                    }
                }
            } else {
                d.onload = function () {
                    createTableCode(data)
                }
            }
        }
    }
    function createTableCode(data) {
        $(".criShare_weixin").remove();
        var tagertArea = "";
        if (data == "fd-btn") {
            tagertArea = "朋友圈"
        }
        if (data == "wx-btn") {
            tagertArea = "好友"
        }
        var ss = '<div id="criShare_weixin" class="criShare_weixin">';
        ss += '<div class="criShare_head">';
        ss += "<span style='display:block;width:100%'>分享到微信" + tagertArea + "</span>";
        ss += '<a href="#" onclick="return false;" style="display:block" class="criShare_close">&times;</a>';
        ss += "</div>";
        ss += '<div id="codeqr" class="codeqr">';
        ss += "</div>";
        ss += '<div class="criShare_headfoot">打开微信，点击底部的“发现”，<br />使用“扫一扫”即可将网页分享至' + tagertArea + "。</div>";
        ss += "</div> ";
        ss += "<style>.bshare-text{position:relative;}.criShare_weixin{position:absolute;background:#fff;width:240px;height:340px;padding:0;margin:0;z-index:11000;border:1px solid #999;top:28px;left:50%;margin-left:-130px;margin-top:0;text-align:center}.criShare_head{font-size:12px;font-weight:700;text-align:left;line-height:16px;height:16px;position:relative;color:#000;text-indent:10px;padding-top:10px}.criShare_close{width:16px;height:16px;position:absolute;right:10px;top:5px;color:#999;text-decoration:none;font-size:16px}.criShare_close:hover{text-decoration:none}.codeqr{padding:15px 15px;min-height:210px}.criShare_headfoot{font-size:12px;text-align:left;line-height:22px;color:#666;padding-left:10px}</style>";
        $(".bshare-text").append(ss);
        var ua = "canvas";
        if (navigator.userAgent.indexOf("MSIE") > -1) {
            ua = "table"
        }
        jQuery("#codeqr").qrcode({
            render: ua,
            foreground: "#000",
            background: "#FFF",
            width: 210,
            height: 210,
            text: criObjShare.criShareUrl
        });
        $(".criShare_close").on(ldClick,
            function () {
                $(".criShare_weixin").remove()
            })
    }
}
