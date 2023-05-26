layui.use(['form', 'layer', 'jquery'], function () {
    var loaddingLayer;
    window.loadding = function (message) {
        message = typeof message !== 'undefined' ? message : '加载中...';
        loaddingLayer = layer.msg(message, {
            icon: 16,
            shade: [0.7, '#fff'], //0.1透明度的白色背景
            time: 0
        });
    };

    window.loaddingClose = function () {
        layer.close(loaddingLayer);
    };
});