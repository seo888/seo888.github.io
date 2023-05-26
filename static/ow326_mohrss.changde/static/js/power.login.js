$(function () {
    var idType = $("#login-select li").eq(0).attr("id");
    if (idType == "pwd_registered") {
        showPwdRegistered();
    } else if (idType == "phonepwd_registered") {
        showPhonepwdRegistered();
    } else if (idType == "phone_registered") {
        showPhoneRegistered();
    } else {
        showWeixinRegistered();
    }

    $("#login-select").on("click",
        "li",
        function () {
            $(".registered").removeClass("on");
            $(this).addClass("on");
            var registered = $(this)[0].id;
            switch (registered) {
                case "phone_registered":
                    showPhoneRegistered();
                    break;
                case "pwd_registered":
                    showPwdRegistered();
                    break;
                case "phonepwd_registered":
                    showPhonepwdRegistered();
                    break;
                case "weixin_registered":
                    showWeixinRegistered();
                    break;
            }
        });

    function removeError() {
        for (var i = 0; i < $(".field-validation-error").length; i++) {
            $(".field-validation-error").eq(i).children().remove();
        }
    }

    function showValidcodedl() {
        if ($(".enabledvalidcode input[name=ValidateCode]").attr("disabled") != "disabled") {
            $(".enabledvalidcode").css("display", "block");
        } else {
            $(".enabledvalidcode").css("display", "none");
        }
    }

    function showPhoneRegistered() {
        $('.container .form-horizontal').attr('action', $("input[name=userloginurl]").data().phonelogin);
        $(".hiddenfield").hide().attr("disabled", "disabled");
        $(".phone-field").show().removeAttr("disabled");
        $(".phone-field input[name=PhoneMessageValidateCode]").removeAttr("disabled");
        $(".loginBtn").show();
        $(".weixinlogin").hide();
        $(".errormessage").text("");
        $("input[name=LoginWayType]").val("PhoneLogin");
        $("#login-btn button[type=submit]").show();
        removeError();
        showValidcodedl();
    }

    function showPwdRegistered() {
        $('.container .form-horizontal').attr('action', $("input[name=userloginurl]").data().login);
        $(".hiddenfield").hide().attr("disabled", "disabled");
        $(".password-field").show().removeAttr("disabled");
        $(".phone-field input[name=PhoneMessageValidateCode]").attr("disabled", "disabled");
        $(".loginBtn").show();
        $(".weixinlogin").hide();
        $(".errormessage").text("");
        $("input[name=LoginWayType]").val("PasswordLogin");
        $("#login-btn button[type=submit]").show();
        removeError();
        showValidcodedl();
    }

    function showPhonepwdRegistered() {
        $('.container .form-horizontal').attr('action', $("input[name=userloginurl]").data().login);
        $(".hiddenfield").hide().attr("disabled", "disabled");
        $(".phonepassword-field").show().removeAttr("disabled");
        $(".phone-field input[name=PhoneMessageValidateCode]").attr("disabled", "disabled");
        $(".loginBtn").show();
        $(".weixinlogin").hide();
        $(".errormessage").text("");
        $("input[name=LoginWayType]").val("PhonePasswordLogin");
        $("#login-btn button[type=submit]").show();
        removeError();
        showValidcodedl();
    }

    function showWeixinRegistered() {
        $.ajax({
            url: '/Ajax/AjaxPartial',
            type: 'get',
            data: { partialViewName: "微信二维码", parameters: "{siteId:" + $("#logincurrentsiteId").val() + "}" },
            success: function (response) {
                $(".weixinlogin").html(response.html);
                var obj = new WxLogin({
                    self_redirect: false,
                    id: "login_container",
                    appid: $("#weixinappid").val(),
                    scope: "snsapi_login",
                    redirect_uri: $("#weixinredirecturi").val(),
                    state: $("#weixinstate").val(),
                    style: "black",
                    href: ""
                });
            },
            error: function (response) { alert("请求微信二维码失败！"); }
        });

        $(".hiddenfield").hide();
        $(".weixinlogin").show();
        $(".loginBtn").hide();
        $(".errormessage").text("");
        $("#login-btn button[type=submit]").hide();
    }

    var userlogin = $(".userlogincomment");
    if (userlogin.length > 0) {
        var currentUserNameUrl = $('[data-currentusernameurl ="currentusernameurl"]').val();
        $.postPreventCSRF(currentUserNameUrl,
            {},
            function (data) {
                if (data.nickname !== "") {
                    $(".loggedin").show();
                    $(".nickname").html(data.nickname);
                    ShowSigninArticleNum();
                } else {
                    $(".notlogged").show();
                }

                showValidateCode(data.valcodevisible, false);
            },
            "json");
    }
    $("#UserName,#Password").on('click',
        function (event) {
            if ($(".errormessage").text().indexOf("密码不正确") != -1) {
                $(".errormessage").text("");
            }
        });
    //关闭登录窗口
    $(".closecomment").on("click",
        function () {
            $("[data-userlogin=userLoginDialog]").css("display", "none");
            $("[data-userlogindialog=userLoginDialog]").css("display", "none");
        });

    //登录
    $("[data-userlogindialog=userLoginDialog] .login").click(function () {
        var userInfo = {};
        var getSessionUrl = $(".getSession").val();
        // 获取编码后的用户名密码和验证码。
        $.ajaxPreventCSRF({
            type: 'post',
            url: getSessionUrl,
            async: false,
            success: function (data) {
                userInfo.username = data.username;
                userInfo.password = data.password;
                userInfo.validatecode = data.validatecode;
                userInfo.phonemessagevalidatecode = data.phonemessagevalidatecode;
                userInfo.phonenumber = data.phonenumber;
                $.refreshCsrf();
            }
        });

        var code = $(".userloginmodal input[name='ValidateCode']");
        if ($(".enabledvalidcode").css("display") == "none") {
            code.attr("disabled", "disabled");
        } else {
            code.removeAttr("disabled");
        }
        $(".errormessage").text("");
        if (!$("#validateForm").valid()) {
            return false;
        }

        $(".loginBtn").text("登录中…").attr("disabled", "disabled").addClass("disabled");
        var validateCode = $(this).parent().prev().find("input[name=ValidateCode]").first().val();
        var userName = $(this).parent().prev().find("input[name=UserName]").first().val();
        var password = $(this).parent().prev().find("input[name=Password]").first().val();
        var phonemessagevalidatecode =
            $(this).parent().prev().find("input[name=PhoneMessageValidateCode]").first().val();
        var phonenumber = $(this).parent().prev().find("input[name=PhoneNumber]").first().val();
        var loginWayType = $(this).parent().prev().find("input[name=LoginWayType]").first().val();
        var loginUrl = $("#loginUrl").val();
        if (loginWayType == "PhoneLogin") {
            loginUrl = $("#loginPhoneUrl").val();
        }

        GetRsaEncrypt();
        userName = rsaEncrypt(userName);
        password = rsaEncrypt(password);
        phonemessagevalidatecode = rsaEncrypt(phonemessagevalidatecode);
        validateCode = rsaEncrypt(validateCode);
        phonenumber = rsaEncrypt(phonenumber);
        var data = {};
        data[userInfo.username] = userName;
        data[userInfo.password] = password;
        data[userInfo.validatecode] = validateCode;
        data[userInfo.phonenumber] = phonenumber;
        data[userInfo.phonemessagevalidatecode] = phonemessagevalidatecode;
        data["LoginWayType"] = loginWayType;
        var siteUrl = $("input[name=siteUrl]").val();
        $.ajaxPreventCSRF({
            type: 'post',
            url: loginUrl,
            data: data,
            async: false,
            success: function (value) {
                $(".loginBtn").text("登录").removeAttr("disabled").removeClass("disabled");
                if (value.status === 0) {
                    $("[data-userlogin=userLoginDialog]").css("display", "none");
                    $("[data-userlogindialog=userLoginDialog]").css("display", "none");
                    $(".notlogged").hide();
                    $(".loggedin").show();
                    $(".nickname").html(value.NickName);
                    $.removeCookie("Power::Article::SigninArticleTime");//清除前一个用户的签收数
                    $.removeCookie("Power:: Article:: SigninArticle");//清除前一个用户的签收数
                    ShowSigninArticleNum();
                    if (!value.isstrongpassword) {

                        window.location.href = siteUrl + "/user";
                        return false;
                    }
                }

                if (loginWayType == "PhoneLogin") {
                    $("#PhoneMessageValidateCode-error").remove();
                    window.clearInterval(window.timerObj); // 停止计时器
                    $("#PhoneMessageValidateCode_btn").removeAttr('disabled').val('获取验证码'); // 启用按钮
                }

                if (value.status != 0) {
                    $(".errormessage").text(value.message);
                } else {
                    var refreshPage = $("input[name=RefreshPage]");
                    if (refreshPage.length > 0) {
                        location.reload();
                    }
                }
                $.refreshCsrf();
                showValidateCode(value.valcodevisible, true);
            }
        });
    });

    //退出
    $(".exitlogin").click(function () {
        var url = $(".logurls").val();
        $.postPreventCSRF(url,
            {},
            function (data) {
                $(".loggedin").hide();
                $(".notlogged").show();
                $.refreshCsrf();
            });
    });

    function showValidateCode(valcodevisible, isRefresh) {
        if (!valcodevisible) {
            $(".enabledvalidcode").css("display", "none");
            $(".enabledvalidcode input[name='ValidateCode']").attr("disabled", "disabled");
        } else {
            $(".enabledvalidcode").css("display", "block");
            $(".enabledvalidcode input[name='ValidateCode']").removeAttr("disabled");
            if (isRefresh) {
                refreshValidateCode();
            }
        }
    }

    var mathRandom = "";

    //刷新验证码
    function refreshValidateCode() {
        $('[data-type=userlogincaptcha]')
            .each(function () {
                var $captchaImage = $('<img>'),
                    self = $(this);
                if (mathRandom === "") {
                    mathRandom = Math.random();
                }

                $captchaImage.attr('title', '看不清？换一张');
                $captchaImage.attr('src', '/captcha/generatecaptcha' + '?code=' + mathRandom);
                $captchaImage.click(function () {
                    $(".validationcode img").attr('src', '/captcha/generatecaptcha' + '?code=' + Math.random());
                });
                self.empty();
                self.html($captchaImage);
            });

        mathRandom = "";
    }

    function ShowSigninArticleNum() {
        var url = $('#signinArticleNumUrl').val();
        $.get(url, function (data) {
            if (parseInt(data) != 0) {
                var name = $('.nickname').html();
                var enableSignin = $("#enableSignin").val();
                if (enableSignin == "True") {
                    $(".nickname").html(name + '，您好！');
                    var value = '待签文章：' + data + ' 篇';
                    $(".signinSum").html(value);
                }
            }
        });
    }
});