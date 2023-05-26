//搜索框下拉隐藏
$('#selectItem').mouseleave(function(){
    $('#selectItem').hide()
})
//导航下拉
/*$(document).ready(function(){
    $(".nav ul li.dad").hover(function(){
        $(this).find(".sons").stop(true, false).slideToggle(500);
    })
});*/
// 网站地图
$(".top_nav").removeClass("top_nb");
$(document).ready(function(){
    $(".top .pc").click(function(){
        // $(this).parents(".top").toggleClass("top_nb")
        $(".top_nav").toggleClass("top_nb")
    });
    $(".top .top_nav").click(function(){
        $(".top_nav").toggleClass("top_nb")
    });
});
// 手机站
$("#qrcode").removeClass("top_nb");
$(document).ready(function(){
    $(".top .mobile").hover(function(){
        $("#qrcode").toggleClass("top_nb")
    });
    $(".top #qrcode").hover(function(){
        $("#qrcode").toggleClass("top_nb")
    });
});

$(".sons").removeClass("nav_active")
$(document).ready(function(){
    $(".nav ul li").hover(function () {
        $(this).find(".sons").addClass("nav_active")
    },function () {
        $(this).find(".sons").removeClass("nav_active")
    });

    // $(".nav ul li .son").mouseover(function () {
    //     $(this).toggleClass("nav_active");
    // });
    /*var _this = $(".nav ul li.dad")
    // $(".nav ul li.dad").hover(function(){
    //     $(this).find(".sons").stop(true, false).slideToggle();
    // })
    _this.mouseover(function () {
        $(this).find(".sons").addClass("nav_active")
    })
    _this.mouseout(function () {
        $(this).find(".sons").removeClass("nav_active")
    });*/
});
//导航切换
/*$(function () {
    $(".nav_l .nav_tab").hover(function () {
        var _this = $(this);
        // _this.toggleClass("at1");
        _this.addClass("at1").siblings().removeClass("at1");
        var i = _this.index();
        $(".nav_z .nav_block").eq(i).addClass("at2").siblings().removeClass("at2");
        if(_this.hasClass('at1')){
            _this.parents(".banner_all1").addClass("at2")
            $(".nav_r").addClass("at2")
        } else {
            _this.parents(".banner_all1").removeClass("at2")
            $(".nav_r").removeClass("at2")
        }
    })
});*/
$(function () {
    $(".nav_l .nav_tab").hover(function () {
        var _this = $(this);
        // _this.toggleClass("at1");
        _this.addClass("at1").siblings().removeClass("at1");
        var i = _this.index();
        $(".nav_z .nav_block").eq(i).addClass("at2").siblings().removeClass("at2");

    })
    $(".sons_block").hover(function () {
        var _this = $(this).find(".nav_l .nav_tab");
        _this.parents(".banner_all1").addClass("at2")
        $(".nav_r").addClass("at2")
    })
    $(".sons_block").hover(function(){},function () {
        var _this = $(this).find(".nav_l .nav_tab");
        _this.parents(".banner_all1").removeClass("at2")
        $(".nav_r").removeClass("at2")
    });
    $('.banner_all1').hover(function(){},function(){
        $('.nav_l .nav_tab').removeClass('at1')
    })
});

//关闭客服
$(".s_close").click(function(){
    $(".slider").fadeOut(500)
});

//弹窗1
$(".satisfaction1").click(function(){
    $(".tan_1").fadeIn(500);
    $('body').css('overflow-y','hidden');//浮层出现时窗口不能滚动设置
});
$(".tan_close1").click(function(){
    $(".tan_1").fadeOut(500);
    $('body').css('overflow-y','auto');// 浮层关闭时滚动设置
});
//弹窗2
$(".grade1").click(function(){
    $(".tan_2").fadeIn(500);
    $('body').css('overflow-y','hidden');
});
$(".tan_close2").click(function(){
    $(".tan_2").fadeOut(500);
    $('body').css('overflow-y','auto');
});

//select
$(function () {
    //下来点击
    /*$(".selects_other").children("a").click(function () {
        $(this).parents('.selects').find(".selected").text($(this).attr("title"));
        $(".selects_other").hide();
        $(this).parents('.selects').find(".selects_head img").attr("src", "images/select1.png");
    })
    //头部点击 显示或隐藏下拉，并切换箭头图片
    $(".selects_head").click(function () {
        if ($(this).parent().children(".selects_other").css("display") == 'none') {
            $(this).parent().children(".selects_other").show();
            $(this).find("img").attr("src", "images/select2.png");
        } else {
            $(this).parent().children(".selects_other").hide();
            $(this).find("img").attr("src", "images/select1.png");
        }
    })*/
});
/*function myHandler(event) {
    $(".selects_other").children("a").click(function () {
        $(this).parents('.selects').find(".selected").text($(this).attr("title"));
        $(".selects_other").hide();
        $(this).parents('.selects').find(".selects_head img").attr("src", "images/select1.png");
    })
    //头部点击 显示或隐藏下拉，并切换箭头图片
    $(".selects_head").click(function () {
        if ($(this).parent().children(".selects_other").css("display") == 'none') {
            $(this).parent().children(".selects_other").show();
            $(this).find("img").attr("src", "images/select2.png");
        } else {
            $(this).parent().children(".selects_other").hide();
            $(this).find("img").attr("src", "images/select1.png");
        }
    })
}
$(".selects").on("click", myHandler);*/

$(".selects").on("click", function () {
    event.stopPropagation();  //屏蔽父事件
    $(this).find(".selects_other").children("a").click(function () {
        $(this).parents('.selects').find(".selected").text($(this).attr("title"));
        $(this).find(".selects_other").hide();
        $(this).parents('.selects').find(".selects_head img").attr("src", "images/select1.png");
    })
    //头部点击 显示或隐藏下拉，并切换箭头图片
    // $(".selects_head").click(function () {
    if($(this).find(".selects_head").parent().children(".selects_other").css("display") == 'none') {
        $(".selects_other").hide();
        $(this).find(".selects_other").show();
        $(this).find("img").attr("src", "images/select2.png");
    }else {
        $(this).find(".selects_other").hide();
        $(this).find("img").attr("src", "images/select1.png");
    }
    // })
});

//点击展开更多
$(function () {
    $(".look_more").on("click", function () {
        if ($(".content").hasClass("hei")) {
            $(".content").removeClass("hei");
            $(this).html("查看更多 <img src=\"./images/offc.png\" alt=\"\">");
        } else {
            $(".content").addClass("hei");
            $(this).html("收起 <img src=\"./images/openc.png\" alt=\"\">");
        }
    });
    $('body').click(function () {  //body的点击事件
        $(".selects").find(".selects_other").hide();
        $(".selects").find("img").attr("src", "images/select1.png");
    });
});




// 点击快捷登录
$("#login .login .nav1 span:first-child").on("click", function () {
    $("#login .login .nav1 span").removeClass("active5");
    $(this).addClass("active5");
    $("#login .login .quick").show();
    $("#login .login .account").hide();
});
// 点击账号登录
$("#login .login .nav1 span:last-child").on("click", function () {
    $("#login .login .nav1 span").removeClass("active5");
    $(this).addClass("active5");
    $("#login .login .quick").hide();
    $("#login .login .account").show();
});
// 检测快捷登录页面输入框
/*$("#login .login .quick input").on("input propertychange", function () {
    if ($("#login .login .quick .phone").val() && $("#login .login .quick .num").val()) {
        $("#login .login .quick .button-box .signin").css({
            "color": "#fff",
            "background": "#ec0315"
        })
    } else {
        $("#login .login .quick .button-box .signin").css({
            "color": "#ec0315",
            "background": "#fff",
            "border": "1px solid #ec0315"
        })
    }
});*/
//检测账号登录页面输入框
/*$("#login .login .account input").on("input propertychange", function () {
    if ($("#login .login .account .user").val() && $("#login .login .account .pass").val()) {
        $("#login .login .account .button-box .signin").css({
            "color": "#fff",
            "background": "#ec0315"
        })
    } else {
        $("#login .login .account .button-box .signin").css({
            "color": "#ec0315",
            "background": "#fff",
            "border": "1px solid #ec0315"
        })
    }
});*/
// 快捷登录页面点击登录
$("#login .login .quick .button-box .signin").on("click", function () {
    if (!$("#login .login .quick .phone").val()) {
        layui.use('layer',function(){
            layer.msg("请输入手机号！")
        })
        return false;
    }
    // if(!(/^1[3456789]\d{9}$/.test($("#login .login .quick .phone").val()))){
    //     layer.msg("请输入正确的手机号！");
    //     return false;
    // }

    // if (!$("#login .login .quick .num").val()) {
    //     layer.msg("请输入验证码！")
    //     return false;
    // }
    var quick = {
        phone: $("#login .login .quick .phone").val(),
        code: $("#login .login .quick .num").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=quick_login",
        data:quick,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
				layer.msg(msg.msg,{time:1000},function(){
                    location.reload()
                    // location.href = "/user.html";
				});
                //layer.msg(msg.msg);
				//location.href = "/user.html";
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});
//账号登录页面点击登录
$("#login .login .account .button-box .signin").on("click", function () {
    if (!$("#login .login .account .user").val()) {
        layer.msg("请输入用户名！")
        return false;
    }
    if (!$("#login .login .account .pass").val()) {
        layer.msg("请输入密码！")
        return false;
    }
    var account = {
        user_name: $("#login .login .account .user").val(),
        password: $("#login .login .account .pass").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=act_login",
        data:account,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
				layer.msg(msg.msg,{time:1000},function(){
                    location.reload();
                    // location.href = "/user.html";
				});
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});
//点击账号登陆页面忘记密码
$("#login .login .account a.forget").on("click", function () {
    $("#login .login").hide();
    $("#login .forgetpass").css("display", "flex");
});
//监听注册页面输入框
/*$(
    "#login .enroll .phone,#login .enroll .code input,#login .enroll .pass,#login .enroll .repass,#login .enroll .agreement input"
).on("input propertychange", function () {
    if ($("#login .enroll .phone").val() && $("#login .enroll .code input").val() && $(
        "#login .enroll .pass").val() && $("#login .enroll .repass").val() && $(
        "#login .enroll .agreement input").prop("checked")) {
        $("#login .enroll .button").css({
            "background": "#ec0315",
            "color": "#fff"
        });
    } else {
        $("#login .enroll .button").css({
            // "background": "#fff",
            // "color": "#ec0315",
            // "border": "1px solid #ec0315"
        });
    }
});*/
// 监听找回密码输入框
/*$(
    "#login .forgetpass .phone,#login .forgetpass .code input,#login .forgetpass .pass,#login .forgetpass .repass"
).on("input propertychange", function () {
    if ($("#login .forgetpass .phone").val() && $("#login .forgetpass .code input").val() && $(
        "#login .forgetpass .pass").val() && $("#login .forgetpass .repass").val()) {
        $("#login .forgetpass .button").css({
            "background": "#ec0315",
            "color": "#fff"
        });
    } else {
        $("#login .forgetpass .button").css({
            "background": "#fff",
            "color": "#ec0315",
            "border": "1px solid #ec0315"
        });
    }
});*/
// 点击注册账号弹出注册框
$("#login .login .button-box .register").on("click", function () {
    $("#login .login").hide();
    $("#login .enroll").css("display", "flex");
});
// 点击马上登录返回登录页面
$("#login .enroll .sign a").on("click", function () {
    $("#login .login").show();
    $("#login .login .nav1 span").removeClass("active5");
    $("#login .login .nav1 span:last-child").addClass("active5");
    $("#login .login .quick").hide();
    $("#login .login .account").show();
    $("#login .enroll").css("display", "none");
    $("#login .enroll input").val("");
    $("#login .enroll .button").css({
        "background": "#fff",
        "color": "#ec0315",
        "border": "1px solid #ec0315"
    })
});
//点击注册按钮
$("#login .enroll .button").on("click", function () {
    if (!$("#login .enroll .phone").val()) {
        layer.msg("请输入手机号！");
        return false;
    }
    var yzm = $("#yzm").val();
	if(yzm !='1'){
		layer.msg("请先通过图形验证码");
		return false;
	}
    // if(!(/^1[3456789]\d{9}$/.test($("#login .enroll .phone").val()))){
    //     layer.msg("请输入正确的手机号！");
    //     return false;
    // }
    // if (!$("#login .enroll .code input").val()) {
    //     layer.msg("请输入验证码！");
    //     return false;
    // }
    if (!$("#login .enroll .pass").val()) {
        layer.msg("请输入密码！");
        return false;
    }
    if (!$("#login .enroll .repass").val()) {
        layer.msg("请再次输入密码！");
        return false;
    }
    if ($("#login .enroll .pass").val().length < 6) {
        layer.msg("密码不能小于6位！");
        return false;
    }
    if ($("#login .enroll .pass").val() !== $("#login .enroll .repass").val()) {
        layer.msg("两次输入的密码不相同！");
        return false;
    }
    if (!$("#login .enroll .agreement input").prop("checked")) {
        layer.msg("请勾选同意《协议》");
        return false;
    }
    var register = {
        phone: $("#login .enroll .phone").val(),
        code: $("#login .enroll .code input").val(),
        password: $("#login .enroll .pass").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=act_register",
        data:register,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg(msg.msg);
                // location.href = "/user.html";
                location.reload()
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});
//找回密码页面点击确定按钮
$("#login .forgetpass .button").on("click", function () {
    if (!$("#login .forgetpass .phone").val()) {
        layer.msg("请输入手机号！");
        return false;
    }
    // if(!(/^1[3456789]\d{9}$/.test($("#login .forgetpass .phone").val()))){
    //     layer.msg("请输入正确的手机号！");
    //     return false;
    // }
    // if (!$("#login .forgetpass .code input").val()) {
    //     layer.msg("请输入验证码！");
    //     return false;
    // }
    if (!$("#login .forgetpass .pass").val()) {
        layer.msg("请输入密码！");
        return false;
    }
    if (!$("#login .forgetpass .repass").val()) {
        layer.msg("请再次输入密码！");
        return false;
    }
    if ($("#login .forgetpass .pass").val().length < 6) {
        layer.msg("密码不能小于6位！");
        return false;
    }
    if ($("#login .forgetpass .pass").val() !== $("#login .forgetpass .repass").val()) {
        layer.msg("两次输入的密码不相同！");
        return false;
    }
    var forgetpass = {
        phone: $("#login .forgetpass .phone").val(),
        code: $("#login .forgetpass .code input").val(),
        pass: $("#login .forgetpass .pass").val()
    };

    $.ajax({
        type: "POST",
        url: "ajaxclass.php?act=act_forget",
        data:forgetpass,
        dataType:'json',
        success: function(msg){
            if (msg.success == 1) {
                layer.msg(msg.msg);
                // location.href = "/user.html";
                location.reload()
            } else {
                layer.msg(msg.msg);
            }
        }
    });
});
//找回密码页面点击返回登录按钮
$("#login .forgetpass a").on("click", function () {
    $("#login .login").show();
    $("#login .login .nav1 span").removeClass("active5");
    $("#login .login .nav1 span:last-child").addClass("active5");
    $("#login .login .quick").hide();
    $("#login .login .account").show();
    $("#login .forgetpass").css("display", "none");
    $("#login .forgetpass input").val("");
    $("#login .forgetpass .button").css({
        "background": "#fff",
        "color": "#ec0315",
        "border": "1px solid #ec0315"
    })
});
//点击协议弹出框
$("#login .enroll .agreement a").on("click", function () {
    var protocol = $(".protocol").html();
    layer.open({
        type: 1,
        skin: 'agree', //自定义样式
        area: ['800px', '660px'], //宽高
        title: "",
        content: protocol,
        btn: "同意并确认",
        end: function () {
            $("#login .enroll .agreement input").prop("checked", true)
        }
    });
});
//快捷登录页面点击获取验证码
$("#login .login .code span.send").on("click", function () {
    var send = $(this);
	// var yzm = $("#yzm").val();
	var yzm1 = $("#yzm1").val();
	if(yzm1 =='2'){
		layer.msg("请先通过图形验证码");
		return false;
	}
    if ($(this).text() == "发送验证码") {
        if ($("#login .login .phone").val()) {
            var account = {
                tel: $("#login .login .phone").val(),
                types: 1
            };
            $.ajax({
                type: "POST",
                url: "send_sms_sdk/api_demo/SmsDemo.php",
                data:account,
                dataType:'json',
                success: function(msg){
                    if (msg.success == 1) {
                        layer.msg("验证码已发送，请注意查收");
                        var i = 60;
                        send.css("font-size", "24px");
                        send.text(i + "s");
                        getCode = setInterval(function () {
                            i--;
                            send.text(i + "s");
                            if (i == 0) {
                                clearInterval(getCode);
                                send.text("发送验证码");
                                send.css("font-size", "12px");
                            }
                        }, 1000)
                    } else {
                        layer.msg(msg.msg);
                    }
                }
            });
        } else {
            layer.msg("请先输入手机号！");
            return false;
        }
    } else {
        return false;
    }
});
//找回密码页面点击获取验证码
$("#login .forgetpass .code span.send").on("click", function () {
    var send = $(this);
    if ($(this).text() == "发送验证码") {
        if ($("#login .forgetpass .phone").val()) {
            var register = {
                tel: $("#login .forgetpass .phone").val(),
                types: 3
            };
            $.ajax({
                type: "POST",
                url: "send_sms_sdk/api_demo/SmsDemo.php",
                data:register,
                dataType:'json',
                success: function(msg){
                    if (msg.success == 1) {
                        layer.msg("验证码已发送，请注意查收");
                        var i = 60;
                        send.css("font-size", "24px");
                        send.text(i + "s");
                        getCode = setInterval(function () {
                            i--;
                            send.text(i + "s");
                            if (i == 0) {
                                clearInterval(getCode);
                                send.text("发送验证码");
                                send.css("font-size", "12px");
                            }
                        }, 1000)
                    } else {
                        layer.msg(msg.msg);
                    }
                }
            });
        } else {
            layer.msg("请先输入手机号！");
            return false;
        }
    } else {
        return false;
    }
});
// 注册页面点击获取验证码
$("#login .enroll .code span.send").on("click", function () {
    var send = $(this);
    var yzm = $("#yzm").val();
	if(yzm !='1'){
		layer.msg("请先通过图形验证码");
		return false;
	}
    if ($(this).text() == "发送验证码") {
        if ($("#login .enroll .phone").val()) {
            var register = {
                tel: $("#login .enroll .phone").val(),
                types: 2
            };
            $.ajax({
                type: "POST",
                url: "send_sms_sdk/api_demo/SmsDemo.php",
                data:register,
                dataType:'json',
                success: function(msg){
                    if (msg.success == 1) {
                        layer.msg("验证码已发送，请注意查收");
                        var i = 60;
                        send.css("font-size", "24px");
                        send.text(i + "s");
                        getCode = setInterval(function () {
                            i--;
                            send.text(i + "s");
                            if (i == 0) {
                                clearInterval(getCode);
                                send.text("发送验证码");
                                send.css("font-size", "12px");
                            }
                        }, 1000)
                    } else {
                        layer.msg(msg.msg);
                    }
                }
            });
        } else {
            layer.msg("请先输入手机号！");
            return false;
        }
    } else {
        return false;
    }
});
// 点击叉号关闭登录注册弹窗
$("#login .off1").on("click", function () {
    off1();
});

$("#register").on("click", function () {
    register();
});
$(".login_in").on("click", function () {
    login();
});
function off1(){
    $("#login").css("display", "none");
    $('body').css('overflow-y','auto');// 浮层关闭时滚动设置
}
function register(){
    $("#login").css("display", "block");
    $("#login .enroll").css("display", "block");
    $('body').css('overflow-y','hidden');//浮层出现时窗口不能滚动设置
}
function login(){
    $("#login").css("display", "block");
    $('body').css('overflow-y','hidden');//浮层出现时窗口不能滚动设置

    $("#login .login").show();
    $("#login .login .nav1 span").removeClass("active5");
    $("#login .login .nav1 span:last-child").addClass("active5");
    $("#login .login .quick").hide();
    $("#login .login .account").show();
    $("#login .enroll").css("display", "none");
    $("#login .enroll input").val("");
    $("#login .enroll .button").css({
        "background": "#fff",
        "color": "#ec0315",
        "border": "1px solid #ec0315"
    })
}