$(function () {
    /**导航选中**/
    var GetCookie = function (sName) {
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
        }
        return null;
    }
    var oid = GetCookie("oid");//导航栏选中
    var sid = GetCookie("sid");//侧边栏选中
    var sanji = GetCookie("sanji");//三级选中
    var xuanzhong = GetCookie("xuanzhong");//排行榜选中
    if (oid != undefined) {
        $("#yiji li").each(function () {
            var $this = $(this);
            if ($this.attr(oid) != undefined) {
                $(this).addClass("on");
            }
        })
    }
    ///三级
    if (sanji != undefined) {
        $("div.c_tab a").each(function () {
            var $this = $(this);
            if ($this.attr(sanji) != undefined) {
                $this.addClass("on");
            }
        })
    }
    //下拉选中
    if (sid != undefined) {
        $(".c_sunfei>a").each(function () {
            var $this = $(this);
            if ($this.attr(sid) != undefined) {
                $this.addClass("on");
            }
        })
    }
   ///侧边栏选中
    if (sid != undefined) {
        $(".c_pageleft li").each(function () {
            var $this = $(this);
            if ($this.attr(sid) != undefined) {
                $this.addClass("on");
            }
        })
    }
    if (xuanzhong != undefined) {
        $(".NewRight_gll li").each(function () {
            var $this = $(this);
            if ($this.attr(xuanzhong) != undefined) {
                $this.addClass("on");
            }
        })
    }
});
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
$(function () {
    $("#SearchButton").click(function () {
        var str = $("#textfield").val();
        if (str == "请输入您要搜索的关键词" || str == "" || str == "标题关键词搜索") {
            layer.msg('请输入您要搜索的关键词', { icon: 5 });
            return;
        }
        else {
            var url = RootPath + "/search/";
            $.cookie('ss_cookie', str, { path: '/' });
            window.open(url);
        }
    });

});
