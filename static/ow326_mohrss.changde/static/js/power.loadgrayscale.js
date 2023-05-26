(function () {
    'use strict';
    var grayscaleMainStyle = '<style>' +
		'#content, ' +
        '.headerTool, ' +
		'.sideFixed, ' +
        '.topNav, ' +
		'.nav, ' + 
		'.s-form, ' +
		'.headerimg, ' +
		'.zqdhList, ' + 
        '.siteSearchBar, ' + 
        '#footer{' +
        '  -webkit-filter: grayscale(100%);' +
        '  -moz-filter: grayscale(100%)!important;' +
        '  -ms-filter: grayscale(100%);' +
        '  -o-filter: grayscale(100%)!important;' +
        '  filter: grayscale(100%);' +
        '  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale = 1) \\9;' +
        '  filter: gray !important;' +
        '} ' + 
		'.wrap { background-image: url(/content/main/base/img/bodyBg-gray.jpg); }' +
        '.header-bg #logo a { display: block; width: 40%; margin: 0 auto; height: 100px; background: url(/content.phone/main/base/img/logo-gray.png) no-repeat center 0; background-size: contain; }' +
		'.headerTop #logo a { display: block; width: 270px; height: 84px; background: url(/content/main/base/img/logo-gray.png) no-repeat 0 0; }' +
		'#logo img {display: none;}' +
        '</style >';
	var grayscaleTyjrswjStyle = '<style>' +
		'#content, ' +
        '.headerTool, ' +
		'.sideFixed, ' +
        '.topNav, ' +
		'.nav, ' + 
		'.s-form, ' +
		'.headerimg, ' +
		'.path, ' +
		'.zqdhList, ' + 
        '.siteSearchBar, ' + 
		'.siteWidth #logo, ' + 
        '#footer{' +
        '  -webkit-filter: grayscale(100%);' +
        '  -moz-filter: grayscale(100%)!important;' +
        '  -ms-filter: grayscale(100%);' +
        '  -o-filter: grayscale(100%)!important;' +
        '  filter: grayscale(100%);' +
        '  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale = 1) \\9;' +
        '  filter: gray !important;' +
        '} ' + 
		'#header { background-image: url(/content/main/contentmanage/special/liangxueyizuo/img/header-gray.jpg); }' +
		'#logoSite a { display: block; width: 270px; height: 84px; background: url(/content/main/base/img/logo-gray.png) no-repeat 0 0; }' +
		'#logoSite img {display: none;}' +
        '</style >';
	var grayscaleStyle = '<style>' +
		'html{' +
        '  -webkit-filter: grayscale(100%);' +
        '  -moz-filter: grayscale(100%)!important;' +
        '  -ms-filter: grayscale(100%);' +
        '  -o-filter: grayscale(100%)!important;' +
        '  filter: grayscale(100%);' +
        '  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale = 1) \\9;' +
        '  filter: gray !important;' +
        '}';

    var grayscaleConfig = window.POWER_GRAYSCALE_CONFIG;
    var startDateTime = new Date(grayscaleConfig.StartDateTime);
    var endDateTime = new Date(grayscaleConfig.EndDateTime);
    var nowDate = new Date();
    if (($("meta[name=ColumnName]").attr("content") == "网站首页" || $("meta[name=ColumnName]").attr("content") == "常德市退役军人事务局") && grayscaleConfig.Enabled &&
        nowDate.getTime() >= startDateTime.getTime() &&
        nowDate.getTime() <= endDateTime.getTime()) {
        var navStr = navigator.userAgent.toLowerCase();
        if (navStr.indexOf("msie 10.0") == -1 || navStr.indexOf("rv:11.0") == -1) {
			if ($("meta[name=SiteId]").attr("content") == 1) {
				if ($("meta[name=ColumnName]").attr("content") == "常德市退役军人事务局") {
					$("head").append(grayscaleTyjrswjStyle)
				} else {
					$("head").append(grayscaleMainStyle);
				}
			} else {
				$("head").append(grayscaleStyle);
			}
        }
    }
}())