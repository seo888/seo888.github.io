/**
 * 主要为了实现文章收藏
 * add by hjgu
 */
var defaults;
(function($) {
    $.fn.dateTimeFun = function(options) {
        defaults = {
            dateTimeFormat: 'dddd YYYY年MM月DD日 HH:mm:ss',
            lang: 'zh-cn' //中文
        }, $this = $(this);

        var options = $.extend(defaults, options);
        this.each(function() {
            dateTimeTick();
        });
    };
})(jQuery);
/**
 * 日期时间
 * @returns {undefined}
 */
function dateTimeTick() {
    moment.locale(defaults.lang);//语言设置
     // console.log(moment.locale());
    var weekDateTime = moment().format(defaults.dateTimeFormat);//格式化
    $($this.selector).html(weekDateTime);
    window.setTimeout("dateTimeTick()", 1000);
}

