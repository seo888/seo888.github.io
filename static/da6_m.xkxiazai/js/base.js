/* kaifamei原创源码，唯一官网：www.kaifamei.com */
 // 12JavaScript Document
// 加动画样式
/*
(function(){
    var html= document.getElementsByTagName('html')[0];
    if(html.classList){
        html.classList.add("page-onload");
        window.onload = function(){
            html.classList.remove("page-onload");
        }
    }
})();
*/


var js_dir = '';



// layer
var layer={
    config: {
        type: 0,
        icon: "",
        url: "",
        end: null
    },
    alert: function(msg,time,end){
        var that = this;

        if(typeof msg === "object"){
            that.config.type = 0;
            that.config = $.extend({}, that.config, msg);
        }
        else{
            if(typeof time === "function"){
                end = time;                    
            }
            if(typeof time !== "number"){
                time = 1200;                    
            }
            var conf = {
                type: 0,
                msg: msg,
                time: time,
                end: end ? end : null
            }
            that.config = $.extend({},that.config,conf);
        }
        
        that.creatLayer(that.config);
    },
    confirm: function(options, yes, no){
        var type = typeof options === 'object';
        if (type) {
            options.type = 1;
        }
        var that = this,
            conf = {
                type: 1,
                msg: options, 
                btn: ['确认', '取消'],                       
                yes: yes ? yes : null,
                no: no ? no : null,
            }
        that.config = $.extend({},that.config,type ? options : conf);
        that.creatLayer();
    },
    creatLayer: function(){
        var that = this,
            config = that.config,
            layerDom;


        $('.layer').remove();
        switch(config.type){
            case 0 :
                layerDom = $('<div class="layer layer-alert">'+
                        '<div class="layer-body">'+
                        '<div class="layer-inner"><i class="'+ config.icon +'"></i><p>'+ config.msg +'</p></div></div></div>');
                layerDom.appendTo('body');

                if(config.time){
                    setTimeout(function () {
                        layerDom.addClass('closing');
                    }, config.time - 400);
                    setTimeout(function () {
                        if( typeof config.end === 'function' ){
                            config.end();
                        }                  
                    }, config.time);
                }

                break;

            case 1 :
                layerDom = $('<div class="layer layer-confirm">'+
                        '<div class="layer-overlay"></div>'+
                        '<div class="layer-body">'+
                        '<div class="layer-inner">'+
                        '<div class="layer-cont">'+config.msg+'</div>'+
                        '<div class="layer-btns">'+
                        '<span class="layer-btn layer-btn-no">'+config.btn[1]+'</span>'+
                        '<span class="layer-btn layer-btn-yes">'+config.btn[0]+'</span>'+
                        '</div></div></div></div>');
                layerDom.appendTo('body');
                layerDom.find('.layer-btn-yes').on('click', function(){
                    if( typeof config.yes === 'function' ){
                        config.yes();
                    }  
                    that.layerClose();
                })
                layerDom.find('.layer-btn-no').on('click', function(){
                    if( typeof config.no === 'function' ){
                        config.no();
                    }  
                    that.layerClose();
                })
                break;
        }

        // 动画完成后回调
        $('.layer').off('webkitAnimationEnd').on("webkitAnimationEnd", function(){
            $(this).hasClass('closing') && $(this).remove();
        }); 
    },
    layerClose: function(){
        $('.layer').addClass('closing');
    }
}




// 判断浏览器类型
;(function ($) {
    "use strict";
    var device = {};
    var ua = navigator.userAgent;

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
        var osVersionArr = device.osVersion.split('.');
        device.minimalUi = !device.webView &&
            (ipod || iphone) &&
            (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
            $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
    }

    // Check for status bar and fullscreen app mode
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    device.statusBar = false;
    if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
        device.statusBar = true;
    }
    else {
        device.statusBar = false;
    }

    // Classes
    var classNames = [];

    // Pixel Ratio
    // device.pixelRatio = window.devicePixelRatio || 1;
    // classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
    // if (device.pixelRatio >= 2) {
    //     classNames.push('retina');
    // }

    // OS classes
    if (device.os) {
        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
        // if (device.os === 'ios') { MjA4MTE1MzY1
        //     var major = parseInt(device.osVersion.split('.')[0], 10);
        //     for (var i = major - 1; i >= 6; i--) {
        //         classNames.push('ios-gt-' + i);
        //     }
        // }
        window.device = device.os;
    }
    
    // ucBrowser    
    // if(ua.split("UCBrowser/").length > 1){
    //     classNames.push('ucBrowser');
    // }

    // Status bar classes
    if (device.statusBar) {
        classNames.push('with-statusbar-overlay');
    }
    else {
        $('html').removeClass('with-statusbar-overlay');
    }

    // Add html classes
    if (classNames.length > 0) $('html').addClass(classNames.join(' '));

    // $('title').html(classNames.join(' '));

    // keng..
    device.isWeixin = /MicroMessenger/i.test(ua);

    window.device = device;
    $.device = device;
    // 判断设备修改导航游戏链接
    $(function(){
        var baseUrl = window.MURL || '';
        if(device.ios) {
           $('#service').attr('href', baseUrl +"/ios/");
           $('.headerlanmu1').attr('href', baseUrl +"/ios/jsby/");
           $('.headerlanmu2').attr('href', baseUrl +"/ios/xxyz/");
           $('.headerlanmu3').attr('href', baseUrl +"/ios/fxsj/");
           $('.headerlanmu4').attr('href', baseUrl +"/ios/dzmx/");
           $('.headerlanmu5').attr('href', baseUrl +"/ios/yyyx/");
           $('.headerlanmu6').attr('href', baseUrl +"/ios/clqp/");
           $('.headerlanmu7').attr('href', baseUrl +"/ios/mnjy/");
           $('.headerlanmu8').attr('href', baseUrl +"/ios/scjs/");
           $('.headerlanmu9').attr('href', baseUrl +"/ios/tyyx/");

        }else{
           $('#service').attr('href', baseUrl +"/android/");
           $('.headerlanmu1').attr('href', baseUrl +"/android/jsby/");
           $('.headerlanmu2').attr('href', baseUrl +"/android/xxyz/");
           $('.headerlanmu3').attr('href', baseUrl +"/android/fxsj/");
           $('.headerlanmu4').attr('href', baseUrl +"/android/dzmx/");
           $('.headerlanmu5').attr('href', baseUrl +"/android/yyyx/");
           $('.headerlanmu6').attr('href', baseUrl +"/android/clqp/");
           $('.headerlanmu7').attr('href', baseUrl +"/android/mnjy/");
           $('.headerlanmu8').attr('href', baseUrl +"/android/scjs/");
           $('.headerlanmu9').attr('href', baseUrl +"/android/tyyx/");
        }
    })
})(jQuery);

