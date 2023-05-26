function bdshare(size) {
	var size = size || "24";
	if ("16" == size)
		var bdshare_str = '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_more" data-cmd="more"></a>';
	else
		var bdshare_str = '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_more" data-cmd="more"></a>';
	with ($(".bdsharebuttonbox").html(bdshare_str), window._bd_share_config = {
			common : {
				bdSnsKey : {},
				bdText : "",
				bdPic : "",
				bdMini : "2",
				bdMiniList : !1,
				bdStyle : "1",
				bdSize : size,
				bdPopupOffsetLeft : 0
			},
			share : {}
		}, document)0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=86835285.js?cdnversion=" + ~(-new Date / 36e5)]
}

$(function () {
	var Local = {
		"RELEASE_TAG" : "",
		"BSJ_DOMAIN" : "benshouji.com",
		"BSJ_HOMEURL" : "http:\/\/m.benshouji.com",
		"BSJ_PCURL" : "http:\/\/www.benshouji.com",
		"BSJ_FILEURL" : "http:\/\/f1.benimg.com",
		"BSJ_UIURL" : "http:\/\/s1.benimg.com",
		"BSJ_UIURL_MOBILE" : "http:\/\/s1.benimg.com\/mobile",
		"BSJ_PASSPORTURL" : "http:\/\/u.benshouji.com",
		"BSJ_LIVEURL" : "http:\/\/live.benshouji.com",
		"BSJ_LOGINURL" : "http:\/\/u.benshouji.com\/login.php",
		"BSJ_VIDEO" : "http:\/\/v.benshouji.com",
		"BSJ_TUKU" : "http:\/\/tu.benshouji.com",
		"BSJ_FAHAO" : "http:\/\/fahao.benshouji.com",
		"BSJ_BBS" : "http:\/\/bbs.benshouji.com",
		"BSJ_TOP" : "http:\/\/top.benshouji.com"
	},
	str = ""; ;
	$('.siteNav').prepend(str);
	bdshare(16);
	var collectBtn = $('.bar-star'),
	navigationBtn = $('.bar-menu'),
	focusBtn = $('.bar-add'),
	navigationBox = $('.bsjTopbar-subMenuBox'),
	focusBox = $('.bsjTopbar-weixinQr');
	collectBtn.bind('click', favorites);
	navigationBtn.bind('mouseover', function () {
		focusBox.hide();
		var timer;
		navigationBox.show().hover(function () {
			clearTimeout(timer);
		}, function () {
			timer = setTimeout(function () {
					navigationBox.hide()
				}, 500);
		});
	});
	focusBtn.bind('mouseover', function () {
		navigationBox.hide();
		var timer;
		focusBox.show().hover(function () {
			clearTimeout(timer);
		}, function () {
			timer = setTimeout(function () {
					focusBox.hide()
				}, 500);
		});
	});
});
