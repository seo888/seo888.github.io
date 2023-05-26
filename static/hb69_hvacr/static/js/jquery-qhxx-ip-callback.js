/*!
* jQuery JavaScript Plugin Library v1.0
* http://www.hvacr.cn/
*
* Copyright 2012, QHXX
*/
(function ($) {
    $.fn.QHXX_ObjectExtend = function (options) {
        alert(Math.random());
    };
    $.QHXX = {
        getIPInfo: function (callback) {
            var DefaultIPInfo = { "ProvinceName": "湖南", "ProvincePinYin": "hunan", "ProvinceNameGB": "%ba%fe%c4%cf", "ProvinceMarketUrl": "http://market.hvacr.cn/hunan_dq.html", "CityName": "怀化", "CityNameGB": "%bb%b3%bb%af", "CityMarketUrl": "http://market.hvacr.cn/huaihua_hvacr.html", "CountyName": "", "CountyNameGB": "", "CountyMarketUrl": "", "Operator": "联通", "IP": "42.48.85.61", "IPRange": "1", "Country": "湖南省怀化市" };
            try {
                $.ajax({
                    type: "get",
                    url: "//app.hvacr.cn/Tools/GetIpInfoHandler.ashx?rnd=" + Math.random(),
                    dataType: "jsonp", jsonp: 'callback',
                    data: {
                        'funsort': "getipinfo",
                        'ip': "",
                        'rsformat': "jsonp",
                        'browsertype':""
                    },
                    beforeSend: function (XMLHttpRequest) {
                    },
                    success: function (data) {                        
                        if (data.Success) {
                            DefaultIPInfo = $.parseJSON(data.ReturnString);
                        }
                        if (typeof (callback) == "function") {
                            callback(DefaultIPInfo);
                        }
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
            } catch (e) {
            }
        }
    };
})(jQuery)