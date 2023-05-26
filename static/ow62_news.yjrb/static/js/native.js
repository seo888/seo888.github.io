(function (exports) {
    var isIos = (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
    var isAndroid = (/(Android)/i.test(navigator.userAgent));

    var _token;
    var _tokenCallback;
    var _shareCallback;

    function callMobileAPI(api_name) {
        if (window[api_name]) {
            return window[api_name];
        } else if (window.java && window.java[api_name]) {
            return window.java[api_name];
        } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[api_name]) {
            return window.webkit.messageHandlers[api_name].postMessage;
        }
    }

    exports.isIos = function(){
        return isIos;
    };

    exports.isAndroid = function(){
        return isAndroid;
    };

    exports.isNative = function(){
        //alert("isNative21");
        if (window.java && window.java.getToken){
            //alert("isNative2");
            return true;
        }else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getToken) {
            //alert("isNative3");
            return true;
        }
        //alert("isNative4");
        return false;
    };

    exports.getToken = function(callback){
        //alert("getToken1");
        if (_token){
            //alert("getToken2");
            if (callback){
                return callback(_token);
            }else{
                return _token;
            }
        }
        //alert("getToken3");
        _tokenCallback = callback;
        if (window.java && window.java.getToken){
            //alert("getToken4");
            window.java.getToken();
        }else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getToken) {
            //alert("getToken5");
            window.webkit.messageHandlers.getToken.postMessage({});
        }
        //alert("getToken6");
        // var func = callMobileAPI("getToken");
        // if (func){
        //     alert(4);
        //     return func();
        // }
        // alert(5);
    };

    exports.openLogin = function(callback){
        _tokenCallback = callback;
        //alert("openLogin0");
        if (window.java && window.java.openLogin){
            //alert("openLogin1");
            window.java.openLogin();
        }else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.openLogin) {
            //alert("openLogin2");
            window.webkit.messageHandlers.openLogin.postMessage({});
        }
        //alert("openLogin4");
        // var func = callMobileAPI("openLogin");
        // if (func){
        //     return func();
        // }
    };
    exports.isNativeShare = function(){
        //alert("isNativeShare1");
        if (window.java && window.java.share){
            //alert("isNativeShare2");
            return true;
        }else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.share) {
            //alert("isNativeShare3");
            return true;
        }
        //alert("isNativeShare4");
        return false;
    };
    /**
     *
     * @param params  {title:'测试标题',content:'测试分享内容',imageUrl:'http://www.baidu.com',linkUrl:'http://www.qq.com'}
     * @param callback
     */
    exports.share = function(params, callback){
        _shareCallback = callback;
        //alert("openLogin0");
        if (window.java && window.java.share){
            //alert("openLogin1");
            //安卓要接收字符串
            params = params || {};
            var str = JSON.stringify(params);
            window.java.share(str);
        }else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.share) {
            //alert("openLogin2");
            window.webkit.messageHandlers.share.postMessage(params);
        }
        //alert("openLogin4");
        // var func = callMobileAPI("openLogin");
        // if (func){
        //     return func();
        // }
    };

    exports.getTokenCallback = function(token){
        //alert("getTokenCallback1="+ token);
        _token = token;
        if (_tokenCallback){
            //alert("getTokenCallback2"+" token="+token );
            _tokenCallback(token);
            _tokenCallback = undefined;
        }
        //alert("getTokenCallback3");
    };
    exports.shareCallback = function(){
        if (_shareCallback){
            _shareCallback();
            _shareCallback = undefined;
        }
    };
})((function () {
    if (typeof exports === 'undefined') {
        if (typeof window.tycom === 'undefined')
            window.tycom = {};

        if (typeof window.tycom.native === 'undefined')
            window.tycom.native = {};
        return window.tycom.native;
    }
    else {
        return exports;
    }
})());
