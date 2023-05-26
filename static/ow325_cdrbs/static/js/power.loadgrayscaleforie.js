$(function () {
    'use strict';

    var grayscaleConfig = window.POWER_GRAYSCALE_CONFIG;
    var startDateTime = new Date(grayscaleConfig.StartDateTime);
    var endDateTime = new Date(grayscaleConfig.EndDateTime);
    var nowDate = new Date();

    if (grayscaleConfig.Enabled &
        nowDate.getTime() >= startDateTime.getTime() &
        nowDate.getTime() <= endDateTime.getTime()) {
        var navStr = navigator.userAgent.toLowerCase();
        if (navStr.indexOf("msie 10.0") !== -1 || navStr.indexOf("rv:11.0") !== -1) {
            $.when($.ajax()).then(function () {
                grayscale($("html"));
            });

            $('.mainNav li a').hover(
                function () {
                    $(this).css("background", "#545454");
                },
                function () {
                    $(this).css("background", "#585858");
                });

            subMenuFixed = true;
            var subMenuTop = $(".topNav").offset().top;
            $(window)
                .scroll(function () {
                    if (subMenuFixed) {
                        if ($(window).scrollTop() >= subMenuTop) {
                            $(".topNav").addClass("topNav-fixed");
                            $(".topNav").css("background", "#585858");
                        } else {
                            $(".topNav").removeClass("topNav-fixed");
                            $(".topNav").css("background", "");
                        }
                    }
                });
        }
    }
})