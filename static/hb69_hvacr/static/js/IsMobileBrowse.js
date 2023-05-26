//检测浏览器对象
var IsMobileBrowse = {
    WeiXin: function () {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? true : false;
    },
    WeiXinPC: function () {
        if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            if (navigator.userAgent.toLowerCase().match(/WindowsWechat/i) == "windowswechat")
                return true;
            return false;
        } else {
            return false;
        }
    },
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    _IsMobile: function () {
        return ((IsMobileBrowse.WeiXin() && !IsMobileBrowse.WeiXinPC()) || IsMobileBrowse.Android() || IsMobileBrowse.iOS() || IsMobileBrowse.BlackBerry() || IsMobileBrowse.Windows());
    }
};

//打开53客服
function open53KF() {
    //alert(IsMobileBrowse.WeiXinPC());
    if (IsMobileBrowse._IsMobile()) {
        var _53 = $53.createApi();
        _53.push('cmd', 'mtalk');
        _53.query();
    } else {
        var api = $53.createApi();
        api.push('cmd', 'kfclient');
        api.push('type', 'popup');
        //api.push('group_id', '11，22');
        //api.push('worker_id', '178b2b');
        api.query();
    }
}

//获取用户联系方式Ajax请求
function getUserContactInfoAjax(shopuserid, callback) {
    try {
        $.ajax({
            type: "get",
            url: "//m.hvacr.cn/Tools/DatasHandler.ashx?rnd=" + Math.random(),
            dataType: "jsonp", jsonp: 'callback',
            data: {
                'funsort': "getusercontactinfo",
                'rsformat': "jsonp",
                'shopuserid': shopuserid
            },
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (ir) {
                if (typeof (callback) == "function") {
                    callback(ir);
                }
                else {
                    console.log(ir);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    } catch (e) {
        console.log(e);
    }
}