
//�ӷ���˻�ȡǩ����Ϣ��JSSDKע��
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
                        openTagList: ['wx-open-launch-weapp','wx-open-launch-app'] // ��ѡ����Ҫʹ�õĿ��ű�ǩ�б�����['wx-open-launch-app']
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

// ����ӿ�
// 2.1 ��������������ѡ�����ť������Զ���������ݼ��������ӿ�
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
    // 2.1 ��������������ѡ�����ť������Զ���������ݼ��������ӿ�
    wx.onMenuShareAppMessage({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('�û�������͸�����');
        },
        success: function (res) {
            //alert('�ѷ���');
        },
        cancel: function (res) {
            //alert('��ȡ��');
        },
        fail: function (res) {
            //alert("shibai," + JSON.stringify(res));
        }
    });

    // 2.2 ��������������Ȧ����ť������Զ���������ݼ���������
    wx.onMenuShareTimeline({
        title: share_title,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('�û������������Ȧ');
        },
        success: function (res) {
            //alert('�ѷ���');
        },
        cancel: function (res) {
            //alert('��ȡ��');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });


    // 2.3 ����������QQ����ť������Զ���������ݼ��������ӿ�

    wx.onMenuShareQQ({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('�û��������QQ');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('�ѷ���');
        },
        cancel: function (res) {
            //alert('��ȡ��');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });

    // 2.4 ����������΢������ť������Զ���������ݼ��������ӿ�
    wx.onMenuShareWeibo({
        title: share_title,
        desc: share_desc,
        link: url,
        imgUrl: share_imgurl,
        trigger: function (res) {
            //alert('�û��������΢��');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('�ѷ���');
        },
        cancel: function (res) {
            //alert('��ȡ��');
        },
        fail: function (res) {
            //alert(JSON.stringify(res));
        }
    });
});

wx.error(function (res) {
    // config��Ϣ��֤ʧ�ܻ�ִ��error��������ǩ�����ڵ�����֤ʧ�ܣ�
    //���������Ϣ���Դ�config��debugģʽ�鿴��Ҳ�����ڷ��ص�res�����в鿴������SPA�������������ǩ����
});

var getLocation = {
    //΢��JS-SDK��ȡ��γ�ȷ���
    weichatLatAndLon: function (callback, error) {
        var that = this;

        //�μ�΢��JS SDK�ĵ���http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
        wx.ready(function () {

            wx.getLocation({
                success: function (res) {
                    var latitude = res.latitude; // γ�ȣ�����������ΧΪ90 ~ -90
                    var longitude = res.longitude; // ���ȣ�����������ΧΪ180 ~ -180��
                    var speed = res.speed; // �ٶȣ�����/ÿ���
                    var accuracy = res.accuracy; // λ�þ���
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
                    //����ط����û��ܾ���ȡ����λ��
                    if (typeof error == "function") {
                        error();
                    }
                },
                fail: function (err) {
                    //����ط���΢�Ŷ�λ���󣬱���getlocation timeout
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
    //����γ��ת���ɳ������ͽֵ���ַ���μ��ٶȵ�ͼ�ӿ��ĵ���http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
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
    //����Ĭ�ϳ���
    setDefaultCity: function (callback) {
        //Ĭ�Ͼ�γ��
        var data = {
            latitude: "31.337882",
            longitude: "120.616634",
            province: "����ʡ",
            cityname: "������",
            district: "������",
            street: "�齭·",
            street_number: "88��",
            formatted_address: "����ʡ�����л������齭·88��"
        };
        if (typeof callback == "function") {
            callback(data);
        }
    }
};
//��װ΢��Ԥ��ͼƬ����
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
                current: src, // ��ǰ��ʾͼƬ��http����
                urls: arrImgs // ��ҪԤ����ͼƬhttp�����б�
            });
        }
    }
}