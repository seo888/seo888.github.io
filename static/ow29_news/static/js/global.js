$(function () {
    var aurl = window.location.host
    var haurl = '//' + aurl
    $('.link a').attr('href', haurl).text(aurl)
    // console.log(aurl);
    var allurl = 'https://' + aurl
    $('.logo a').attr('href', allurl)
    if ($('#originAuthor').find('span').html() == '') {
        $('#originAuthor').remove()
    }
    $('.navMore-box').on('mouseover', function () {
        $(this).addClass('color-w')
        $(this).find('.nav-more img').attr('src', '//www.eol.cn/images/ad/2017_img/arrow-s.png').css('margin-top', '-5px')
        $('.nav-more-show').show()
    })

    $('.navMore-box').on('mouseout', function () {
        $(this).removeClass('color-w')
        $(this).find('.nav-more img').attr('src', 'https://www.eol.cn/images/ad/2017_img/arrow.png').css('margin-top', '0px')
        $('.nav-more-show').hide()
    })

    $('.nav-head-ri').on('mouseover', function () {
        $(this).addClass('color-w')
        $('.phone-show').show()
    })

    $('.nav-head-ri').on('mouseout', function () {
        $(this).removeClass('color-w')
        $('.phone-show').hide()
        $('.phone-lf a').css('font-weight', 'normal')
    })
    $('.phone-lf>div').on('mouseover', function () {
        $('.phone-lf a').css('font-weight', 'normal')
        $(this).find('a').css('font-weight', 'bold')

        $('.erweima').hide()
        $('.erweima').eq($(this).index()).show()
    })
    var is_weixin = (function () {
        return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    })()
    if (is_weixin) {
        $('.eol_jlink').each(function (index, el) {
            $(el).attr('href', $(el).attr('data-link'))
        })
    }
})

// media 组件，无图隐藏
var isShowMediaImage = function () {
    $('.mediaItem').each(function (index, item) {
        if (!$(this).find('img').attr('src')) {
            $(this).find('.mediaImage').hide()
        }
    })
}
