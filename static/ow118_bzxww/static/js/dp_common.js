$(function () {
    $('.login').on('click', function () {
        $('.dialog').show();
        $('.login_box').show();
    })

    $('.login_box .close').on('click', function () {
        $('.dialog').hide();
        $('.login_box').hide();
    })
})

$(function () {

    $('.web_nav .menu').on('click',function () {
        $('.dialog').show();
        $('.web_nav_list').fadeIn();
    })

    $('.web_nav_list .close').on('click',function () {
        $('.dialog').hide();
        $('.web_nav_list').fadeOut();
    })
})
