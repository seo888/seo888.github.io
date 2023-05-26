$(function () {
    $.get("http://www.qpzxw.com/zapi/get_city?ip=" + "", function (data, status) {
        console.log(data)
        if (data.pb == '1') {
            $("body").html('<img style="display:block; width: 100%; margin: 0 auto;" src="http://static.qpzxw.com/image/pc_404.jpg"  >');
            $('html').show();
        } else {
            $('html').show();
        }

    })
})