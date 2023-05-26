$(function () {
    $.ajax({
        url: 'https://work.sj33.cn/api2/top_nav_user'
        , method: 'get'
        , xhrFields: {
            withCredentials: true
        }
        , crossDomain: true
        , success: function (liang_result) {
            $('.liang_user').html(liang_result);
            var backUrl = encodeURIComponent(location.href);
            $('.liang_js_button_login').prop('href', $('.liang_js_button_login').prop('href') + '?backUrl=' + backUrl);
            $('.liang_js_button_register').prop('href', $('.liang_js_button_register').prop('href') + '?backUrl=' + backUrl);
        }
    });
});
