$(document).ready(function () {

    var title = $('h1.content-title')[0].innerHTML
    var href = window.location.href
    var start = href.lastIndexOf('/')
    var end = href.lastIndexOf('.')
    var id = href.substring(start + 1,end)
    $.ajax({
        url: 'https://www.hndnews.com/UrlSataController/getHeaderSave?type=1&title=' + title + '&id=' + id,
        type: 'get'
    });


    var deviceType = 1; // 1:pc 0:phone
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        deviceType = 0;
    }

    if (deviceType === 0) {
      /*  var endIndex = window.location.href.indexOf('.html');
        var id = null;
        if (endIndex > -1) {
            var id = window.location.href.substring(window.location.href.indexOf('/p')+3, endIndex)
        } else {
            var id = window.location.href.substring(window.location.href.indexOf('/p')+3)
        }*/
        if(window.location.href.includes('/v/')){
            window.location.href = '//newscdn.hndnews.com/hb/html/video/'+ id + '.html';
        } else {
            window.location.href = '//newscdn.hndnews.com/hb/html/mobile/'+ id + '.html';
        }

    }

    //修改日期格式
    /*$.each($(".desc"), function (index,obj) {
        var text = $(obj).html();
        /!*var regex =  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        var regExp = new RegExp(regex);*!/
        var times = $(obj).html().split(" ");
        if (times && times.length > 0) {
            $(obj).html(times[0]);
        }
    });*/

    //修改访问量
    var url = window.location.href;
    var regex = new RegExp(/.*\/*\/([0-9]*$)/g);
    var array = url.split("/");
    var type = array[array.length - 2];
    var id = array[array.length - 1].substr(0, array[array.length - 1].indexOf(".html"));
    $.ajax({
        url: '/updateAccessNum',
        type: 'post',
        data: {type: type, id: id},
        dataType: 'json',
        success: function (res, opt) {
            console.info(res);
        }
    });

});
