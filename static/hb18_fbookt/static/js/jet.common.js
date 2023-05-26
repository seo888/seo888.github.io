function rand4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (rand4() + rand4() + "-" + rand4() + "-" + rand4() + "-" + rand4() + "-" + rand4() + rand4() + rand4());
}

function stopPropagation(e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
}


function post(url, info, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: info,
        beforeSend: function (xmlHttpRequest) { },
        success: callback,
        complete: function (xmlHttpRequest, textStatus) { },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            alert("服务器错误:" + xmlHttpRequest.status);
        }
    });
}

//Request.QueryString("name")
Request = {
    QueryString: function (item) {
        var value = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        var ret = value ? value[1] : value;

        if (ret == null) return "";
        return ret;
    }
}

$("body").on("click", ".js-href", function () {
    var url = $(this).attr("data-url");
    location.href = url;
});

//onkeydown="countChar('previewSection', 'word-count');" onkeyup="countChar('previewSection', 'word-count');"
function countChar(textareaId, spanName) {
    document.getElementById(spanName).innerHTML = document.getElementById(textareaId).value.length;
}