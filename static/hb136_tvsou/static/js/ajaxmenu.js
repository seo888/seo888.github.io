$(function () {
    var url = "/login/ajaxIsLogin";
    $.ajax({
        type: "POST",
        data: {},
        url: url,
        dataType: "json",
        success: function (data) {
            if (data.status == "1") {
                isLogin = true;
                userid = data.data.userid;
                var html = '<div class="r class-header">';

                if (data.data.notice.length > 0) {
                    html += '<label class="color-6">消息</label>';
                    html += '<em class="text-c border-2 white vel">' + data.data.notice.length + '</em>';
                }
                html += '<a href="/user/' + data.data.userid + '" class="header as">';
                html += '<img src="//file.tvsou.com/f/' + data.data.photo + '/zm44-44" width="40" height="40" class="border-radius vel" alt=""></a></div>';

                html += '<div class="header-list absolute hide" style="display: none;"><ol class="font-12">';
                html += '<li><a rel="nofollow" href="/user/' + data.data.userid + '" class="class-icon icon-01 color-6"><span>我的主页</span></a></li>';
                html += '<li><a href="/my" class="class-icon icon-03 color-6"><span>设置</span></a></li>';
                html += '<li><a href="/login/exit" class="class-icon icon-04 color-6"><span>退出登录</span></a></li>';
                html += '</ol></div>';
                $(".login-div").remove();
                $(".search-bg-h").show();
                $(".search-bg-h").before(html);
                var _order_timeout;
                $(".class-header").hover(function () {
                    clearTimeout(_order_timeout);
                    $(".header-list").show()
                }, function () {
                    _order_timeout = setTimeout(function () {
                        $(".header-list").hide()
                    }, 500)
                });
                $(".header-list").hover(function () {
                    clearTimeout(_order_timeout);
                    $(".header-list").show()
                }, function () {
                    _order_timeout = setTimeout(function () {
                        $(".header-list").hide()
                    }, 500)
                });
                var noticeTimeout;
                $("body").delegate(".menu-notice-btn", "click", function () {
                    $(".menu-notice-list").show()
                });
                $("body").delegate(".menu-notice-btn", "mouseout", function () {
                    noticeTimeout = setTimeout(function () {
                        $(".menu-notice-list").hide()
                    }, 500)
                });
                $(".menu-notice-list").hover(function () {
                    clearTimeout(noticeTimeout);
                    $(".menu-notice-list").show()
                }, function () {
                    noticeTimeout = setTimeout(function () {
                        $(".menu-notice-list").hide()
                    }, 500)
                });
                $("body").delegate(".menu-notice-read", "click", function () {
                    var url = "/tvsou/user/ajaxDoNotice";
                    $.ajax({
                        type: "POST",
                        data: {
                            "id": $(this).attr("data-id")
                        },
                        url: url,
                        dataType: "json",
                        success: function (data) {}
                    })
                })
            } else {
                $(".search-bg-h").show();
                $(".login-div").show()
            }
        }
    });
    $("#keywords").bind({
        focus: function () {
            $(this).addClass("color-3")
        },
        blur: function () {
            $(this).removeClass("color-3")
        },
        keypress: function (event) {
            if (event.keyCode == "13") {
                if ($("#keywords").val() != "") {
                    var base = new Base64();
                    var keyword = base.encode($("#keywords").val());
                    window.location.href = "/search/" + keyword
                } else {
                    $("#keywords").attr("placeholder", "搜索节目、明星、频道")
                }
            }
        }
    });
    $(".search-top-btn").click(function () {
        if ($("#keywords").val() != "") {
            var base = new Base64();
            var keyword = base.encode($("#keywords").val());
            window.location.href = "/search/" + keyword
        } else {
            $("#keywords").attr("placeholder", "搜索节目、明星、频道")
        }
    })

    function Base64() {
        // private property 
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        // public method for encoding 
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }
        // public method for decoding 
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        // private method for UTF-8 decoding 
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }

});