/*
 * @Author: ln 
 * @Date: 2018-07-09 16:20:30 
 * @Last Modified by: ln
 * @Last Modified time: 2018-12-06 19:18:55
 */
"use strict";

$(document).ready(function () {
    var event = 'click';

    // 背景图轮播
    bgSwitch($('.m_lb_bg .img'));

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

    tabItem({
        tab: '.m-tab',
        tabHead: '.btn',
        tabCont: '.item'
    });

    dropDown($('.gkml-title .lable'));

    $('.nmz-xxgk-pie>.ml').each(function(index, item) {
        $(item).children('.a').on(event, function () {
            if($(this).siblings('.gkml-item').css('display')=='block') {
                $(this).siblings('.gkml-item').hide();
                return;
            } else {
                $(this).siblings('.gkml-item').show();
                return; 
            }
        });
    });

    jQuery(".nmz-lb-tt .lb-tt-item").simpleSwitch({
		prev:'.nmz-lb-tt .lb-tt-btn .lfBtn',
		next:'.nmz-lb-tt .lb-tt-btn .rtBtn',
		playTime:2000,
		type:'top',
    });

    // 图片轮播
    jQuery(".nmz-lb-img .lbItems .a").simpleSwitch({
        prev: '.nmz-lb-img .lbBtns .lfBtn',
        next: '.nmz-lb-img .lbBtns .rtBtn',
        num: '.nmz-lb-img .lbNums span',
        text: '.nmz-lb-img .lbIists .a',
		playTime:3000,
    });


  jQuery(".banner-img1 a").simpleSwitch({
    num: '.banner-num1 span',
    className: 'cur',
    playTime: 3500,
    type: 'top',
    indy: '.ban-dy',
    lendy: '.ban-len',
    // direction:'left',
  });

  jQuery('.ban-more-img1').bannerRollLR({
    len: 5,
    type: 'right',
    moveTime: 3000,
    prev: '.ban-more-left',
    next: '.ban-more-right'
  })

    // setBothHeight(['.nxz-slide-pie', '.nxz-overview>.cont']);

    radioSwitch({
        items: '.nxz-leader-form .group .box',
        label: '.nxz-radio',
        box: '.cricle',
        inp: '.nxz-hide'
    });

    if($("#startTime").size()) {
        laydate({
            elem: '#startTime',
            event: 'click'
        });
    }
    if($("#endTime").size()) {
        laydate({
            elem: '#endTime',
            event: 'click'
        });
    }
    
    // 互动交流
    setBothHeight(['.vxz-cheight_l', '.vxz-zxft-box']);
    // 领导介绍--个人简历
    setBothHeight(['.vxzjlpic_h', '.vxzjle_if']);
});
