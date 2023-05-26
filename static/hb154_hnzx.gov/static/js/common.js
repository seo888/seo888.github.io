// 获取地址栏参数
UrlParm = function () { // url参数    
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) { // p | p=    
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c | =    
                        data[0] = [p[1]];
                    } else if (typeof (index[p[0]]) == 'undefined') { // c=aaa    
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else { // c=aaa    
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()    
        parm: function (o) { // o: 参数名或者参数次序    
            try {
                return (typeof (o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) { }
        },
        //获得参数组, 类似request.getParameterValues()    
        parmValues: function (o) { //  o: 参数名或者参数次序    
            try {
                return (typeof (o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) { }
        },
        //是否含有parmName参数    
        hasParm: function (parmName) {
            return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined' : false;
        },
        // 获得参数Map ,类似request.getParameterMap()    
        parmMap: function () {
            var map = {};
            try {
                for (var p in index) {
                    map[p] = data[index[p]];
                }
            } catch (e) { }
            return map;
        }
    }
}();

// 判断IE版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}
// 获取父页面地址
function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    if (isInIframe) {
        parentUrl = document.referrer;
    }

    return parentUrl;
}

// 是否安装了flashplayer
function uploadFlash() {
    var swf;
    if (IEVersion() === 11) {
        try {
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            return true;
        } catch (e) {
            console.log('未安装flash播放器');
            // if(IEVersion() === 11) {
                var res = confirm("您的浏览器未安装flash播放器，无法播放视频，是否现在安装？")
                console.log(res);
                if(res === true) {
                    window.open("https://flash.2144.com/?activex");
                } else {
                    retrun;
                }
            // }
            return false;
        }
    }
    if (navigator.userAgent.indexOf('Firefox') > 0) {
        swf = navigator.plugins['Shockwave Flash'];
        if (swf) {
            return true
        } else {
            return false;
        }
    }
    return true;
}
// 判断屏幕类型
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
        }
    }
    return flag;
};
// 判断是否为Safari浏览器
function isSafari() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}
