/**
 * 2022.06.12
 * 文章页新增浮窗广告
 *
 */

// 防止重新生成
if (!requestOrigin) {
    var eolOriginVar = window.location.origin
    var ua = window.navigator.userAgent
    if (/Mobile|iP(hone|ad)|Android|BlackBerry|IEMobile/.test(ua)) {
        // H5访问的合作方配置连接
        var originObject = {
            'https://www.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/1_1.json',
            'https://gaokao.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/1_2.json',
            'https://daxue.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/1_3.json',
        }
        var requestOrigin = originObject[eolOriginVar] || 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/1_4.json'
    } else {
        // PC访问的合作方配置连接
        var originObject = {
            'https://www.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/2_1.json',
            'https://gaokao.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/2_2.json',
            'https://daxue.eol.cn': 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/2_3.json',
        }
        var requestOrigin = originObject[eolOriginVar] || 'https://static-gkcx.gaokao.cn/www/2.0/json/coop/2_4.json'
    }
}

$.ajax({
    type: 'GET',
    url: requestOrigin,
    crossDomain: true,
    dataType: 'json',
    success: function (res) {
        $('body').append('<div class="right_bar"></div>')
        if (res.data[49] && res.data[49]['default'] && res.data[49]['default']['status']) {
            var tzy_enter = res.data[49]['default'].link
            var img = res.data[49]['default'].img_url
            $('.right_bar').append(
                '<a target="_blank" href="' + tzy_enter + '"><img src="' + img + '" class="img_item" /></a>'
            )
        }
        if (res.data[99] && res.data[99]['default'] && res.data[99]['default']['status']) {
            var tzy_enter = res.data[99]['default'].link
            var img = res.data[99]['default'].img_url
            $('.right_bar').append(
                '<a target="_blank" href="' + tzy_enter + '"><img src="' + img + '" class="img_item" /></a>'
            )
        }
    },
})
