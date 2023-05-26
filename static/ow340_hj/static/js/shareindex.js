(function() {
    if (!window.shareObj) {
        var shareObj = {};
        shareObj.shareTitle = document.title;
        shareObj.shareUrl = document.location.href;
        shareObj.desc = "";
        shareObj.pic = "";
		shareObj.summary = "";

    } else {
        var shareObj = window.shareObj;
    }

    if (!shareObj.shareTitle || shareObj.shareTitle == "") {
        shareObj.shareTitle = document.title
    }
    if (!shareObj.shareUrl || shareObj.shareUrl == "") {
        shareObj.shareUrl = document.location.href;
    }
    if (!shareObj.pic) {
        shareObj.pic = "";
    }
    if (!shareObj.desc) {
        shareObj.desc = "";
    }
	if (!shareObj.summary) {
        shareObj.summary = "";
    }
    var shareToTwBtn = $("[data-fx='tw-btn']");
    // shareToTwBtn.on("click",
    $(document).on("click","[data-fx='tw-btn']",
    function() {

        var u = "http://twitter.com/home/?status=".concat(encodeURIComponent(shareObj.shareTitle)).concat(" ").concat(encodeURIComponent(shareObj.shareUrl));
        window.open(u)
    });
    var shareToFbBtn = $("[data-fx='fb-btn']");
    // shareToFbBtn.on("click",
    $(document).on("click","[data-fx='fb-btn']",
    function() {
        var u = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(shareObj.shareUrl) + "&t=" + encodeURIComponent(shareObj.shareTitle);
        window.open(u)
    });
    var shareToWbBtn = $("[data-fx='wb-btn']");
    // shareToWbBtn.on("click",
    $(document).on("click","[data-fx='wb-btn']",
    function() {
      
        var u = "http://service.weibo.com/share/share.php?appkey=2612146692&title=" + shareObj.shareTitle + "&url=" + encodeURIComponent(shareObj.shareUrl) + "&pic=" + shareObj.pic + "&searchPic=false&style=simple";
        window.open(u)
    });
    var shareToQzBtn = $("[data-fx='qz-btn']");
    // shareToQzBtn.on("click",
    $(document).on("click","[data-fx='qz-btn']",
    function() {
      console.log(encodeURIComponent(shareObj.shareTitle));
        var u = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(shareObj.shareUrl) + "&summary="+shareObj.summary+"&title=" + encodeURIComponent(shareObj.shareTitle) + "&pics=" + shareObj.pic + "&desc=" + shareObj.desc;
        window.open(u)
    });
    var shareToQQBtn = $("[data-fx='qq-btn']");
    // shareToQQBtn.on("click",
    $(document).on("click","[data-fx='qq-btn']",
    function() {
        var u = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(shareObj.shareUrl) + "&summary="+shareObj.summary+"&title=" + encodeURIComponent(shareObj.shareTitle) + "&pics=" + shareObj.pic + "&desc=" + shareObj.desc;
        window.open(u)
    });
    var shareFdBtn = $("[data-fx='fd-btn']");
    // shareFdBtn.on("click",
    $(document).on("click","[data-fx='fd-btn']",
    function() {
        requireQrcode("../resource/js/jquery.qrcode.min.js", "fd-btn")
    });
    var shareWxBtn = $("[data-fx='wx-btn']");
    // shareWxBtn.on("click",
    $(document).on("click","[data-fx='wx-btn']",
    function() {
        requireQrcode("../resource/js/jquery.qrcode.min.js", "wx-btn")
    });
    var copyLinkBtn = $("[data-fx='copy-btn']");
    // copyLinkBtn.on("click",
    $(document).on("click","[data-fx='copy-btn']",
    function() {
        var clipBoardContent = shareObj.shareUrl;
        try {
            window.clipboardData.setData("Text", clipBoardContent);
            alert("复制成功!")
        } catch(e) {
            var _input = document.createElement("input");
            _input.setAttribute("type", "text");
            _input.setAttribute("id", "copy");
            _input.style.height = "0px";
            _input.value = shareObj.shareUrl;
            document.body.appendChild(_input);
            var obj = document.getElementById("copy");
            obj.select();
            document.execCommand("Copy");
            alert("复制成功");
            document.body.removeChild(_input)
        }
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
                    d.onreadystatechange = function() {
                        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                            createTableCode(data)
                        }
                    }
                } else {
                    d.onload = function() {
                        createTableCode(data)
                    }
                }
            }
        }
        function createTableCode(data) {
            $(".lsrbshare_weixin").remove();
            var tagertArea = "";
            if (data == "fd-btn") {
                tagertArea = "朋友圈"
            }
            if (data == "wx-btn") {
                tagertArea = "好友"
            }
            var ss = '<div id="lsrbshare_weixin" class="lsrbshare_weixin">';
            ss += '<div class="cntvshare_head">';
            ss += "<span>分享到微信" + tagertArea + "</span>";
            ss += '<a href="#" onclick="return false;" class="lsrbshare_close">&times;</a>';
            ss += "</div>";
            ss += '<div id="codeqr" class="codeqr">';
            ss += "</div>";
            ss += '<div class="cntvshare_headfoot">打开微信，点击底部的“发现”，<br />使用“扫一扫”即可将网页分享至' + tagertArea + "。</div>";
            ss += "</div> ";
            ss += "<style>.lsrbshare_weixin{position:fixed;background:#fff;width:240px;height:340px;padding:0;margin:0;z-index:11000;border:1px solid #999;top:50%;left:50%;margin-left:-130px;margin-top:-160px;text-align:center}.cntvshare_head{font-size:12px;font-weight:700;text-align:left;line-height:16px;height:16px;position:relative;color:#000;text-indent:10px;padding-top:10px}.lsrbshare_close{width:16px;height:16px;position:absolute;right:10px;top:5px;color:#999;text-decoration:none;font-size:16px}.lsrbshare_close:hover{text-decoration:none}.codeqr{padding:15px 15px;min-height:210px}.cntvshare_headfoot{font-size:12px;text-align:left;line-height:22px;color:#666;padding-left:10px}</style>";
            $(document.body).append(ss);
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
                text: shareObj.shareUrl
            });
            $(".lsrbshare_close").on("click",
            function() {
                $(".lsrbshare_weixin").remove()
            })
        }
    }

})();