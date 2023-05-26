
    function EnterPress(e) { //传入 event
        var e = e || window.event;
        if (e.keyCode == 13) {
            $("[submit]").trigger("click");
        }
    }

    function change() {
        var $t = $("#lf");
        var src = $t.attr("src");
        if (!$t.data("src"))
            $t.data("src", src)
        $t.attr("src", $t.data("src") + "&d=" + new Date().getTime());
    }


$(function () {
    var kaiguan = false;
    $("[submit]").click(function () {
        if ($("[valid]").validForm()) {
            if (kaiguan) { return false }
            kaiguan = true;
            var data = $("[field]").loadData({ name: 'field', data: data });
           // data["Info.ID"] = infoID;
            $.ajax({
                type: 'Post',
                url: QRootPathURL,
                dataType: 'json',
                cache: false,
                data: data,
                success: function (data) {
                    switch (data.Result) {
                        case 0:
                            $("#lf").trigger("click");
                            $("[field=code]").val("");
                            layer.open({
                                content: "提交成功！",
                                btn: '确定',
                                shadeClose: false,
                                yes: function (index, layero) {
                                    location.href = location.href;
                                    layer.close(index);
                                }
                            });
                            break;
                        case 1:
                            layer.msg("验证码错误，请重新输入！");
                            $("#lf").trigger("click");
                            $("[field=code]").val("");
                            break;
                        case 2:
                            layer.msg("您已经注册过了！");
                            $("#lf").trigger("click");
                            $(".subbox input,textarea").val("").blur();
                            break;
                        default: layer.msg("服务器繁忙，请稍后再试！"); break;
                    }
                },
                complete: function () {
                    kaiguan = false;
                },
                error: function () {
                    layer.msg("服务器繁忙，请稍后再试！");
                }
            });
        }
    });
    $("[reset]").on("click", function () {
        $(".subbox input,textarea").val("").blur();
        $("#lf").trigger("click");
    });
});