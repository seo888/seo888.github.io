
var iszg = false;

/*if (typeof pageConfig != 'undefined' && pageConfig.type != "soft") {
try {
    $('html').hide();
    $.ajax({
        type: "get",
        async: false,
        url: "http://m.xdowns.com/api/getArea",
        data: {},
        success: function (data) {
            if (data.indexOf('江苏') > -1) {
                iszg = true;
                $(function () {
                    $("body").html(`<img style="display:block; margin: 10% auto; max-width: 100%;" src="//m.xdowns.com/skinnew/images/zg.png">`);
                    $("title").html("网站整改中");
                    $("html").show();
                })
            } else {
                $('html').show();

            }
        },
        error: function () {
            $('html').show();
        }
    });
}
catch (err) {
    $('html').show();
}
}*/

function decodeXhtml(arr) {
    var text = "";
    var textarr = arr.split(';');
    for (var item in textarr)
        text += String.fromCharCode(textarr[item].replace("&#", ""));
    return text;
}
var objRegExp = /^&#\d+.*\;$/;
window.w404 = null;
if (!iszg) {
    try {
        $('html').hide();
        $.ajax({
            type: "GET",
            async: false,
            url: "/api/getspecialidnew",
            data: {
                id: pageConfig.id,
                type: pageConfig.type,
                cid: pageConfig.cid,
                name: objRegExp.test(pageConfig.name) ? decodeXhtml(pageConfig.name) : pageConfig.name,
                tags: objRegExp.test(pageConfig.tags) ? decodeXhtml(pageConfig.tags) : pageConfig.tags,
                keywords: objRegExp.test(pageConfig.keywords) ? decodeXhtml(pageConfig.keywords) : pageConfig.keywords,
                device: "pc",
                url: location.href
            },
            dataType: "json",
            success: function (data) {

                if (data.nnn == "1") {
                    window.location.href = "/404.html";
                    return;
                }

                if (data.w404 == true) {
                    window.w404 = true;
                    $(function () {
                        $("body").html('<img style="display:block; margin: 10% auto;" src="http://www.xdowns.com/SkinNew/images/404.png" >').css("background", "none");
                        $('html').show().css("background-color", "#fff");
                    })
                } else {
                    $('html').show();
                    window.downpage = data.pbbtn;
                }
            },
            error: function () {
                $('html').show();
            }
        });
    } catch (err) {
        $('html').show();
    }
}