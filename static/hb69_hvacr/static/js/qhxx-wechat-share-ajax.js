
//从服务端获取签名信息再JSSDK注册
function getSignatureAndWxConfig() {
    var url = window.location.href.split('#')[0];
    try {
        $.ajax({ url: "//app.hvacr.cn/Tools/WeChatJSSDKHandler.ashx?callback=?&rnd=" + Math.random(),
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                token: Math.random(),
                rsformat: 'jsonp',
                funsort: "getwechatjssdksignature",
                url: url,
                WeChatMPType: WeChatMPType
            },
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (data, textStatus) {
                if (data.Success) {
                    var json = data.Tag;
                    //alert(JSON.stringify(data));
                    wx.config({
                        debug: false,
                        appId: json.appId,
                        timestamp: json.timestamp,
                        nonceStr: json.nonceStr,
                        signature: json.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getLocation', 'openLocation', 'previewImage'],
                        openTagList: ['wx-open-launch-weapp','wx-open-launch-app'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
                    });
                }
                else {
                    //alert(data.ReturnString);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (data) {
                //alert("error");
            }
        });
    } catch (e) {
    }
}

getSignatureAndWxConfig();

// 分享接口
// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
wx.ready(function () {
    var url = window.location.href.split('#')[0];

    var share_title = document.title;
    if ($("#share_title").length > 0) {
        share_title = $.trim($("#share_title").val());
    }
    var share_desc = share_title;
    if ($("#share_desc").length > 0) {
        share_desc = $.trim($("#share_desc").val());
    }
    var share_imgurl = "";
    if ($("#share_imgurl").length > 0) {
        share_imgurl = $.trim($("#share_imgurl").val());
    }
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('用户点击发送给朋友');
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            //alert("shibai," + JSON.stringify(res));
        }
    });

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接
    wx.onMenuShareTimeline({
        title: share_title,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });


    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

    wx.onMenuShareQQ({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('用户点击分享到QQ');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('用户点击分享到微博');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });
});

wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，
    //具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

var getLocation = {
    //微信JS-SDK获取经纬度方法
    weichatLatAndLon: function (callback, error) {
        var that = this;

        //参见微信JS SDK文档：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        wx.ready(function () {

            wx.getLocation({
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    localStorage.setItem("latitude", latitude);
                    localStorage.setItem("longitude", longitude);
                    var data = {
                        latitude: latitude,
                        longitude: longitude
                    };
                    if (typeof callback == "function") {
                        callback(data);
                    }
                },
                cancel: function () {
                    //这个地方是用户拒绝获取地理位置
                    if (typeof error == "function") {
                        error();
                    }
                },
                fail: function (err) {
                    //这个地方是微信定位错误，比如getlocation timeout
                    if (typeof error == "function") {
                        error();
                    }
                }
            });

        });
        wx.error(function (res) {
            if (typeof error == "function") {
                error();
            }
        });
    },
    //将经纬度转换成城市名和街道地址，参见百度地图接口文档：http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
    cityname: function (latitude, longitude, callback) {
        $.ajax({
            url: '//api.map.baidu.com/geocoder/v2/?ak=VwGLrfNkfsxrAx1mBU8giCoUKrP4umpD&callback=renderReverse&location=' + latitude + ',' + longitude + '&output=json&pois=1',
            type: "get",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                console.log(data);
                var province = data.result.addressComponent.province;
                var cityname = (data.result.addressComponent.city);
                var district = data.result.addressComponent.district;
                var street = data.result.addressComponent.street;
                var street_number = data.result.addressComponent.street_number;
                var formatted_address = data.result.formatted_address;
//                localStorage.setItem("province", province);
//                localStorage.setItem("cityname", cityname);
//                localStorage.setItem("district", district);
//                localStorage.setItem("street", street);
//                localStorage.setItem("street_number", street_number);
//                localStorage.setItem("formatted_address", formatted_address);
                var data = {
                    latitude: latitude,
                    longitude: longitude,
                    province: province,
                    cityname: cityname,
                    district: district,
                    street: street,
                    street_number: street_number,
                    formatted_address:formatted_address
                };
                if (typeof callback == "function") {
                    callback(data);
                }

            }
        });
    },
    //设置默认城市
    setDefaultCity: function (callback) {
        //默认经纬度
        var data = {
            latitude: "31.337882",
            longitude: "120.616634",
            province: "江苏省",
            cityname: "苏州市",
            district: "虎丘区",
            street: "珠江路",
            street_number: "88号",
            formatted_address: "江苏省苏州市虎丘区珠江路88号"
        };
        if (typeof callback == "function") {
            callback(data);
        }
    }
};
//封装微信预览图片方法
function wxPreviewImage(selector) {
    var arrImgs = new Array();
    var allImgs = $(selector);
    for (var i = 0; i < allImgs.length; i++) {
        var src = $(allImgs[i]).attr("data-original");
        if (src == undefined || $.trim(src) == "")
            src = allImgs[i].src;
        arrImgs.push(src);
    }
    for (var i = 0; i < allImgs.length; i++) {
        allImgs[i].onclick = function () {
            var src = $(this).attr("data-original");
            if (src == undefined || $.trim(src) == "")
                src = this.src;
            //console.log(src);
            wx.previewImage({
                current: src, // 当前显示图片的http链接
                urls: arrImgs // 需要预览的图片http链接列表
            });
        }
    }
}