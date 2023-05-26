//回复颜色
$(function () {
    var _this = $(".response textarea");
    var _that = $(".response2 textarea");
    _this.focus(function(){
        _this.css("color","#333");
    });
    _this.blur(function(){
        _this.css("color","#999999");
    });
    _that.focus(function(){
        _that.css("color","#333");
    });
    _that.blur(function(){
        _that.css("color","#999999");
    });
});

//登录/退出
$(function() {
    $(".p_admin").unbind("click").click(function() {
        $(".per_list").slideToggle();
    })
})


//留言
$(function () {
    var _this =$(".response2");
    // var _that =$(".information_list ul li");
    $(".hf").click(function () {
        $(this).parents(".in_list").next(_this).addClass("active4");
        // _that.addClass("bn")
    });
    $(".reset2").click(function () {
        $(this).parents(_this).removeClass("active4");
        // _that.removeClass("bn")
    });
    $(".submit2").click(function () {
        $(this).parents(_this).removeClass("active4");
        // _that.removeClass("bn")
    })
});

//添加颜色
$(function () {
    $(".set0 ul li").find(".edit").click(function () {
        // $(this).addClass("at1").siblings().removeClass("at1");
        var i = $(this).parent().index();
        // console.log(i);
        _data = $(".data");
        _data.eq(i).find(".data_n").addClass("data_bg").siblings().removeClass("data_bg");
        _data.eq(i).attr("id","test");
    });
    $(".p_reset").click(function () {
        // $(this).parents(".data_n").removeClass("data_bg");
        $(this).parents(".data_n").hide();
    });
});

//修改用户名
$(".user_btn1").on("click", function () {
    if (!$(".y_name").val()) {
        layer.msg("请输入用户名！")
        return false;
    }
    var account1 = {
        user_name: $(".y_name").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=update_user_name",
        data:account1,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg(msg.msg);
                window.location.reload();
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});

// 监听用户输入框
$(".y_name").on("input propertychange", function () {
    if (!$(".y_name").val()){
        $(".y_name").next().css({
            "display": "none"
        });
    } else {
        $(".y_name").next().css({
            "display": "block"
        });
    }
});

// 更换手机，新手机认证
$(".data_n .confirm .user_btn3").on("click", function () {
    if (!$(".y_phone").val()) {
        layui.use('layer',function(){
            layer.msg("请输入手机号！")
        })
        return false;
    }
    var reg = /(1[3-9]\d{9}$)/;
    if (!reg.test($(".y_phone").val()))
    {
        layui.use('layer',function(){
            layer.msg("手机号格式不正确！");
        })
        return false;
    }
    if (!$(".yanzheng").val()) {
        layer.msg("请输入验证码！")
        return false;
    }
    var quick1 = {
        phone: $(".y_phone").val(),
        code: $(".yanzheng").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=update_user_tel",
        data:quick1,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg(msg.msg);
                window.location.reload();
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});

// 更换手机，获取新手机验证码
$(".data_n .da .send_code").on("click", function () {
    var send = $(this);
    if (!$(".y_phone").val()) {
        layui.use('layer',function(){
            layer.msg("请输入手机号！")
        })
        return false;
    }
    var reg = /(1[3-9]\d{9}$)/;
    if (!reg.test($(".y_phone").val()))
    {
        layui.use('layer',function(){
            layer.msg("手机号格式不正确！")
        })
        return false;
    }


    var quick1 = {
        tel: $(".y_phone").val(),
        types: 4
    };

    $.ajax({
        type: "POST",
        url: "send_sms_sdk/api_demo/SmsDemo.php",
        data:quick1,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg("验证码已发送，请注意查收");
                var i = 60;
                send.val(i + "s");
                getCode = setInterval(function () {
                    i--;
                    send.val(i + "s");
                    if (i == 0) {
                        clearInterval(getCode);
                        send.val("发送验证码");
                    }
                }, 1000)
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});

// 监听手机号
$(".y_phone").on("input propertychange", function () {
    if (!$(".y_phone").val()){
        $(".y_phone").next().css({
            "display": "none"
        });
    } else {
        $(".y_phone").next().css({
            "display": "block"
        });
    }
});



// 修改登录密码
$(".user_btn4").on("click", function () {
    if (!$(".y_code1").val()) {
        layer.msg("请输入原密码！");
        return false;
    }
    if (!$(".y_code2").val()) {
        layer.msg("请输入密码！");
        return false;
    }
    if (!$(".y_code3").val()) {
        layer.msg("请再次输入密码！");
        return false;
    }
    if ($(".y_code2").val() !== $(".y_code3").val()) {
        layer.msg("两次输入的密码不相同！");
        return false;
    }

    var account1 = {
        old_password: $(".y_code1").val(),
        password: $(".y_code2").val(),
        password2: $(".y_code3").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=update_user_password",
        data:account1,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg(msg.msg);
                window.location.reload();
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});

// 监听密码
$(".y_code1").on("input propertychange", function () {
    if (!$(".y_code1").val()){
        $(".y_code1").next().css({
            "display": "none"
        });
    } else {
        $(".y_code1").next().css({
            "display": "block"
        });
    }
});
$(".y_code2").on("input propertychange", function () {
    if (!$(".y_code2").val()){
        $(".y_code2").next().css({
            "display": "none"
        });
    } else {
        $(".y_code2").next().css({
            "display": "block"
        });
    }
});
$(".y_code3").on("input propertychange", function () {
    if ($(".y_code3").val() !== $(".y_code2").val()){
        $(".y_code3").next().css({
            "display": "none"
        });
    } else {
        $(".y_code3").next().css({
            "display": "block"
        });
    }
});