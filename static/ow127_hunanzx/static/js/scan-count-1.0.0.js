/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || "POST";
    opt.url = opt.url || "";
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {
    };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var params = [];
    for (var key in opt.data) {
        params.push(key + "=" + opt.data[key]);
    }
    var postData = params.join("&");
    if (opt.method.toUpperCase() === "POST") {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        xmlHttp.send(postData);
    } else if (opt.method.toUpperCase() === "GET") {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);//如果不是json数据可以去掉json转换
        }
    };
}

var wxShareHref = window.location.href;
var loc = wxShareHref.substring(0, wxShareHref.indexOf("#") < 0 ? undefined : wxShareHref.indexOf("#"));
//http://192.168.1.184:8300/ucap/api/znld/visits/saveOrGetVisits?url=http://gxt.hunan.gov.cn/gxt/xxgk_71033/gzdt/rdjj/202005/t20200529_12222779.html&appType=1
// var str = "http://192.168.1.184:8300/ucap/api/znld/visits/saveOrGetVisits?url=" + loc + "&appType=" + type;
// var res = loc.replace("//", "/");
// var res2 = res.replace(":/", "://");
// console.log(res2);
var ishttps = "https:" == document.location.protocol ? true : false;
var host = "http://api.hunan.gov.cn:8090";
if (ishttps) {
    host = "https://api.hunan.gov.cn";
}
var str = host + "/trans-api/api/frraAdmin/saveOrGetVisits?appType=1&url=" + loc;

ajax({
    method: "GET",
    url: str,
    success: function (OriginalFromActivity) {
        //在这里对获取的数据经常操作
        console.log("访问量请求成功");
    }
});
