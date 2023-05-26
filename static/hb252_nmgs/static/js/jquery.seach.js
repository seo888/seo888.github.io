

function opensubmit() {
    var keys = document.getElementById('q').value;
    if (keys != "" && keys != '请输入您要搜索的内容...') {
        var ret = sendsearch(keys);
        if (ret == "1") {
            document.searchform.submit();
        } else {
            alert(ret);
            return false;
        }
    } else {
        $('#q').focus();
        return false;
    }

}

function sendsearch(keys) {
    var url = "/sendsearch/" + keys;
    url = encodeURI(encodeURI(url));
    obj = $.ajax({
        url: url,
        async: false
    });
    return obj.responseText;

}
