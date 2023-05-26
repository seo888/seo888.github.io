(function () {
    'use strict';
    var grayscaleStyle = '<style>' +
        'html{' +
        '  -webkit-filter: grayscale(100%);' +
        '  -moz-filter: grayscale(100%)!important;' +
        '  -ms-filter: grayscale(100%);' +
        '  -o-filter: grayscale(100%)!important;' +
        '  filter: grayscale(100%);' +
        '  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale = 1) \\9;' +
        '  filter: gray !important;' +
        '}' +
        '</style >';

    var grayscaleConfig = window.POWER_GRAYSCALE_CONFIG;
    var startDateTime = new Date(grayscaleConfig.StartDateTime);
    var endDateTime = new Date(grayscaleConfig.EndDateTime);
    var nowDate = new Date();
    if ($("meta[name=ColumnName]").attr("content") == "网站首页" & grayscaleConfig.Enabled &
        nowDate.getTime() >= startDateTime.getTime() &
        nowDate.getTime() <= endDateTime.getTime()) {
        var navStr = navigator.userAgent.toLowerCase();
        if (navStr.indexOf("msie 10.0") == -1 || navStr.indexOf("rv:11.0") == -1) {
            $("head").append(grayscaleStyle);
        }
    }
}())