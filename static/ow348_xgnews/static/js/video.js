$(function () {
    "use strict";

    var playerContainer = $('.player-container');
    if (!playerContainer.length) return;

    /**
     * 切换专辑展示状态
     */
    var toggleExtendState = function () {
        var method = playerContainer.hasClass('extend') ? 'removeClass' : 'addClass';
        playerContainer[method]('extend');
    }

    playerContainer
        .on('click', '.arrow', toggleExtendState);

    playerContainer.find('.list').niceScroll({
        cursorwidth: 8,
        cursoropacitymax: 0.6,
        cursorborder: '1px solid #333',
        background: 'none',
        scrollspeed: 10,
        horizrailenabled: false,
        opacity: 0.3,
        zindex: 10
    });
});