$(function() {

    /* 二维码 */
    (function() {
        $('.icon_cnt_dtl').find('a').each(function() {
            var _this = $(this);
            _this.hover(function() {
                _this.children().show();
            }, function() {
                _this.children().hide();
            });
        });
    })();
    /* 导航栏[更多]功能实现 */
    (function() {
        $('#J_more').hover(function() {
            $(this).addClass('active');
            $(this).children('.J-more-link').show();
        }, function() {
            $(this).removeClass('active');
            $(this).children('.J-more-link').hide();
        });
    })();
   

});

