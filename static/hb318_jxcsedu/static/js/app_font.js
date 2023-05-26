(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>1080) clientWidth=1080;//这里限制最大的宽度尺寸，从而实现PC端的两边留白等
            var font_size = 10 * (clientWidth / 375);
            
            if(font_size < 12){
                docEl.style.fontSize = '12px';
            }else{
                docEl.style.fontSize = 10 * (clientWidth / 375) + 'px';
            }
            
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
