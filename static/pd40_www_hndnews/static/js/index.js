$(document).ready(function () {

    $(".sowing-map").slide({
        mainCell: ".bg ul",
        effect: "fold",
        autoPlay: true,
        delayTime: 200
    });


    $('.menu .more').mouseover(function () {
        $('.more-left').show();
        return false;
    })
    $('.menu>a').mouseover(function () {
        if ($(this).attr('class') != 'more') {
            $('.more-left').hide();
        }
    });
    $('.menu,.more-left').mouseleave(function () {
        $('.more-left').hide();
    });
    //
    $("#header").load("../../static/html/header.html");
    $("#bottom").load("../../static/html/bottom.html");
    $("#rightpart").load("../../static/html/right.html");
    // $("#search").load("../../static/html/search.html");
    // $(".search-big").load("../../static/html/search_big.html");
    $("#index_img").load("../../static/html/index_img.html");

    var str = $(".box").html();
    if (!str) {
        $(".box").css({"height":"30px"});
    }

    //修改日期格式
    $.each($(".bagae"), function (index,obj) {
        var text = $(obj).html();
        var regex =  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
        var regExp = new RegExp(regex);
        var times = $(obj).html().split(" ");
        if (times && times.length > 0) {
            $(obj).html(times[0]);
        }
        /*if (regExp.test(text)) {
            var times = $(obj).html().split(" ");
            if (times && times.length > 0) {
                $(obj).html(times[0]);
            }
        }*/
    });

    $('#handleCustomToPage').click( function () {
        var currentCid = $('#currentCid')[0].innerHTML
        var page = $('#customToPage').val()

        if (!(/(^[1-9]\d*$)/.test(page))) {
            alert('跳转页数只能是正整数');
            return false;
        }else {
            var host = window.location.host
            var protocol = window.location.protocol

            var url = protocol + '//' + host + '/' + currentCid + '/' + page + '.html'
            // console.log(url);
            var a = document.createElement('a')
            a.href = url
            document.body.append(a)
            a.click()
        }
    })

    $('.search-box form img').click( function () {
        var searchKey = $('#searchKey').val()
        if (searchKey.trim()){
            $('.search-box form').submit()
        }
    })
});
