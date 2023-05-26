/*
 * @Author: jiaoll jiaoll@jerei.com
 * @Date: 2022-05-17 17:51:18
 * @LastEditors: jiaoll jiaoll@jerei.com
 * @LastEditTime: 2022-05-18 14:11:01
 * @FilePath: /resources/js/news_index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function(){
    // 视频图库直播
    var newsIndex01 = new Swiper('.news_index01 .swiper-container', {
        autoplay: true,
        loop:true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.news_index01 .swiper-next',
            prevEl: '.news_index01 .swiper-prev',
        }
    });
    
  
    //滚动监听
    // $(window).scroll(function scrollHandler(){
    //     var t = $(window).scrollTop(),//窗口已滚动（卷入）高度。
    //     h = win.height(),//窗口高度。
    //     t1 = $container.offset().top,//容器距离页面（body）顶部的高度。
    //     h1 = $container.outerHeight(true);//容器内容高度。
    //     //窗口底部与监听容器底部比较
    //     if(t+h>= t1+h1){
    //         $('.news_loading').removeClass('none');
    //         addItem();
    //     }
    // });

})
