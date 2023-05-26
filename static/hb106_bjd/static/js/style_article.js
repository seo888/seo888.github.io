$(function() {
    $(".nav-more-ctdianzi").popover({
        placement: 'bottom',
        html: true,
        trigger: 'click',
        content: $("div.nav-more-ctdianzi").html(),
    });

    $('.bjd-header-menu ul li').on('mouseover', function() {
        $('.bjd-header-menu ul li').eq(0).removeClass('active');
    });
    $('.bjd-header-menu ul li').on('mouseout', function() {
        $('.bjd-header-menu ul li').eq(0).addClass('active');
    });
})

//share
$(function() {
    $('.share-btn').on('click', function() {
        if ($(this).index() == 0) {
            shareToSinaWB();
        } else {
            // $('#output').qrcode(window.location.href);
        }
    });
});

//weibo share
function shareToSinaWB() {
    var _shareUrl = 'http://service.weibo.com/share/share.php?&appkey=982179086';
    _shareUrl += '&url=' + encodeURIComponent(document.location);
    _shareUrl += '&title=' + encodeURIComponent(document.title);
    _shareUrl += '&source=' + encodeURIComponent('京报网');
    _shareUrl += '&sourceUrl=' + encodeURIComponent('https://www.bjd.com.cn');
    _shareUrl += '&content=' + 'utf-8';
    window.open(_shareUrl, '_blank');
}

(function() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();