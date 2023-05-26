"use strict";

$(document).ready(function() {

    var event = 'click';
    var clientWidth = document.body.clientWidth;
    positionRightFloat();
    $('.lxz-home-body').height($(window).height());
    setSpace();
    // var initpart1 = '.lxz-home-logo',
    //     initpart2 = '.lxz-home-wp',
    //     initpart3 = '.lxz-home',
    //     initpart4 = '.lxz-home-footer',
    //     initcmt1 = parseInt($(initpart1).css('marginTop')),
    //     initcmt2 = parseInt($(initpart2).css('marginTop')),
    //     initcmt3 = parseInt($(initpart3).css('marginTop')),
    //     initcmt4 = parseInt($(initpart4).css('marginTop'));
    $(window).resize(function() {
        $('.lxz-home-body').height($(window).height());
        clientWidth = document.body.clientWidth;
        positionRightFloat();
        setSpace();
    });

    setBothHeight(['.ns-overview>.slide', '.ns-overview>.cont']);

    dropDown($('.gkml-title .lable'));

    $('.ns-xxgk-pie2>.ml').each(function(index, item) {
        $(item).children('.a').on(event, function() {
            if ($(this).siblings('.gkml-item').css('display') == 'block') {
                $('.ns-overview>.slide').css({ 'height': 'auto' });
                $('.ns-overview>.cont').css({ 'height': 'auto' });
                $(this).siblings('.gkml-item').hide();
                setBothHeight(['.ns-overview>.slide', '.ns-overview>.cont']);
                return;
            } else {
                $('.ns-overview>.slide').css({ 'height': 'auto' });
                $('.ns-overview>.cont').css({ 'height': 'auto' });
                $(this).siblings('.gkml-item').show();
                setBothHeight(['.ns-overview>.slide', '.ns-overview>.cont']);
                return;
            }
        });
    });

    dropDownImgText({
        cont: '.ns-select-option',
        tag: '.select',
        text: '.tt',
        arrow: '.arrow',
        drop: '.dropdown-menu',
        label: '.a',
        select: '.ns-select'
    });

    function setSpace() {
        var part1 = '.lxz-home-logo',
            part2 = '.lxz-home-wp',
            part3 = '.lxz-home',
            part4 = '.lxz-home-footer',
            body = '.lxz-home-body',
            spaces = $(body).height() - $(part1).height() - $(part2).height() - $(part3).height() - $(part4).height(),
            cmt1 = parseInt($(part1).css('marginTop')),
            cmt2 = parseInt($(part2).css('marginTop')),
            cmt3 = parseInt($(part3).css('marginTop')),
            cmt4 = parseInt($(part4).css('marginTop')),
            cont = cmt1 + cmt2 + cmt3 + cmt4,
            space = spaces / cont;
        if (spaces > 0) {
            $(part1).css({
                'marginTop': space * cmt1 + 'px'
            });
            $(part2).css({
                'marginTop': space * cmt2 + 'px'
            });
            $(part3).css({
                'marginTop': space * cmt3 + 'px'
            });
            $(part4).css({
                'marginTop': space * cmt4 + 'px'
            });
            $(body).css({
                'overflowY': 'hidden'
            });
        } else {
            $(body).css({
                'overflowY': 'auto'
            });
            $(body).height('auto');
            // $(part1).css({
            //     'marginTop': initcmt1 + 'px'
            // });
            // $(part2).css({
            //     'marginTop': initcmt2 + 'px'
            // });
            // $(part3).css({
            //     'marginTop': initcmt3 + 'px'
            // });
            // $(part4).css({
            //     'marginTop': initcmt4 + 'px'
            // });
        }
    }

    /**
     * 定位右侧悬浮块
     */
    function positionRightFloat() {
        var right = (clientWidth - 1200) / 2 - 90;
        if (right > 0) {
            $('.lxz-float').css('right', right + 'px');
            $('.lxz-float .a .tt').css('font-size', '14px');
        } else {
            $('.lxz-float').css('right', '15px');
            $('.lxz-float .a .tt').css('font-size', '0');
            for (var i = 0; i < $('.lxz-float').children().length; i++) {
                $('.lxz-float').children()[i].title = $('.lxz-float').children()[i].innerText
            }
        }
    }

    // 背景图轮播
    bgSwitch($('.m_lb_bg .img'));

    tabItem({
        tab: '.m-tab',
        tabHead: '.btn',
        tabCont: '.item'
    });

    // 下拉
    dropDownImgText({
        cont: '.m-drop-select',
        tag: '.select',
        text: '.tt',
        arrow: '.arrow',
        drop: '.dropdown-menu',
        label: '.a',
        select: '.m-select'
    });

    // 上下轮播
    jQuery(".vvx-news-lk a").simpleSwitch({
        next: '.vvx-news-btn .left',
        prev: '.vvx-news-btn .right',
        type: 'top'
    });
    // 轮播
    jQuery(".vvx-ban-img a").simpleSwitch({
        text: '.vvx-ban-text a',
        num: '.vvx-ban-num span'
    });
    // 切换
    jQuery(".vvx-mtb-btn .mtbs  a").tabPanelFun({
        tabContent: '.vvx-mtb-list',
        tabItem: '.vvx-mtb-item',
        pra: true,
        pradom: '.vvx-mtb-btn',
        cur: 'cur'
    });

    // window.onresize = setSpace;
    // window.addEventListener("resize", setSpace, false);

});