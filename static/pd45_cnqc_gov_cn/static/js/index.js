layui.use(['jquery','layer', 'form','element','carousel','laydate'], function(){
    var $ = layui.$
        ,layer = layui.layer
        ,form = layui.form
        ,element = layui.element
        ,carousel = layui.carousel
        ,laydate = layui.laydate
    ;

    carousel.render({
        elem: '#top-banner'
        ,width: '480' //设置容器宽度
        ,height: '70' //设置容器宽度
        ,arrow: 'none' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,indicator: 'none'
    });




    //雅安项目格式有规定, 需要手动加属性
    $('#picNews .qiehuan').attr('carousel-item','');
    carousel.render({
        elem: '#picNews'
        ,width: '100%' //设置容器宽度
        ,height: '450' //设置容器宽度
        ,arrow: 'hover' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,trigger: 'hover' //触发事件
    });

    carousel.render({
        elem: '#zhaoshang'
        ,width: '100%' //设置容器宽度
        ,height: '266' //设置容器宽度
        ,arrow: 'hover' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,trigger: 'hover' //触发事件
    });

    carousel.render({
        elem: '#toutiao'
        ,width: 'auto' //设置容器宽度
        ,height: '82' //设置容器宽度
        ,arrow: 'always' //始终显示箭头
        ,anim: 'updown' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,indicator: 'none'
        // ,trigger: 'hover' //触发事件
    });


    //雅安项目格式有规定, 需要手动加属性
    carousel.render({
        elem: '#hengfu'
        ,width: '100%' //设置容器宽度
        ,height: '100' //设置容器宽度
        ,arrow: 'hover' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,trigger: 'hover' //触发事件
    });

    carousel.render({
        elem: '#index-zt'
        ,width: '100%' //设置容器宽度
        ,height: '77' //设置容器宽度
        ,arrow: 'hover' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,interval: '3500' //切换时间间隔
        ,trigger: 'hover' //触发事件
        ,indicator: 'none'
    });


    lay('.date').each(function () {
        laydate.render({
            elem: this,
            // showBottom: false,
            // position: 'fixed',
            // trigger: 'click',
            type: 'date',
            /*change: function (value, date, endDate) {
                $(this.elem).val(value);
                $('.layui-laydate').remove();
            }*/
        });
    });





    //新闻详情
    $(function () {
        $('header').load('header.html')
        $('#printPage').click(function () {
            $.print('.msg');
        })


        //字体大小
        $('#f-lg').on('click', function () {
            $('.msg-content').css('font-size', '20px')
        });
        $('#f-md').on('click', function () {
            $('.msg-content').css('font-size', '16px')
        });
        $('#f-sm').on('click', function () {
            $('.msg-content').css('font-size', '14px')
        })


        //五公开切换
        $(".ysqgk-hd li").click(function(){
            var $i=$(this).index();
            $(this).addClass("layui-this").siblings().removeClass("layui-this");
            $(".ysqgk-td .layui-tab-item").eq($i).addClass("layui-show").siblings().removeClass("layui-show");
        });

        //公安局 图片左滚动
        // jQuery(".travel-pic").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,vis:5,trigger:"click"});
        //设置手机浏览,  这个要放在上面, 在轮播效果之前设置宽度
        function IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        if (!IsPC() && window.location.href.indexOf("#m") < 0) {
            // $('body').css('width','1170px');
        }


    });


});

/*导航条*/
$(function () {
   /* $('.my-nav').on('mouseover','.layui-nav-item',function () {
        $('.layui-nav-bar').css({"bottom":"10px","top":"auto","width":"40px !important"})

    })*/
})

