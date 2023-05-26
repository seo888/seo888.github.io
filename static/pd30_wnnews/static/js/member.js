/**
 * member js
 * Created by Administrator on 2015/7/31 0031.
 */

/* 选项卡切换 */
$(function(){

    var oauth = Oauth(oauthConfig);

    /*
    用户中心页面
    if (cat == 'comment') {
        $('#content section').eq(0).addClass('hide');
        $('#tabs li').eq(0).removeClass('on');
        $('#content section').eq(1).removeClass('hide');
        $('#tabs li').eq(1).addClass('on');
    }


    $('#tabs li').click(function(){
        $(this).addClass("on").siblings().removeClass();
        $("#content > section").hide().eq($('#tabs li').index(this)).show();
    });
    */

    var api = {
        "loginUrl" : "/index/login/cloud",
        "checkloginUrl" : "/index/login/checklogin",
        "logoutUrl" : "/index/login/logout",
        "captchaUrl" : '/index/login/captcha',
        "checkCaptchaUrl" : "/index/login/checkcaptcha"
    };

    // 用户登录
    var objLoginBtn = $(".login-btn"),
        objLoginDialog = $('#login-box'),
        objSubmitBtn = $("#submit"),
        domLoadingBox = $('#login-loading'),
        domLoginBox = $('#login-box-ipt'),
        domQuickLoginBox = $('#login-quick-box'),
        domMemberLogin = $('#member-login'),
        domMemberUser = $('#member-user');

    var quickLoginData = {},
        noticeUrl = '',
        isCaptchaShow = false,
        isCaptchaRight = false,
        isFirstCaptcha = true;

    var loginDialog = dialog ({
        padding : 0,
        content : objLoginDialog
    });

    (function () {

    })();

    // 初始化登录框样式
    function initBoxStyle()
    {
        var objStyle = {
            'opacity' : 0,
            'left' : '370px',
            'top' : 0,
            'display' : 'none'
        };
        domLoadingBox.css({
            'opacity' : 1,
            'left' : 0,
            'top' : 0,
            'display' : 'block'
        });
        domLoginBox.css(objStyle);
        domQuickLoginBox.css(objStyle);
        $('#loading').css({'display' : 'none'});
        $('#submit').css({'display' : 'block'});

        // 清空值
        $('#account').val('');
        $('#password').val('');
        isCaptchaShow && initCaptcha();

        // 模拟失去焦点
        $('#account').trigger('blur');
        $('#password').trigger('blur');
    }

    /**
     * 初始化验证码
     */
    function initCaptcha ()
    {
        isCaptchaRight = false;
        $('#captcha').val('');
        $('#captcha').trigger('blur');
        $('#captcha-result').attr('class', 'captcha-result');
        $('#captcha-image').trigger('click');
    }

    function openLoginBox ()
    {
        // 显示弹出框
        loginDialog.showModal();
        // 初始化样式
        initBoxStyle();

        if (oauthConfig.mode != "public") {
            showBox(domLoginBox);
            isCaptchaShow && showCaptcha();     // 显示验证码
            return;
        }

        // 模板状态
        oauth.check(function (noticeurl, isCaptcha, res) {
            // login success
            quickLoginData = res;
            noticeUrl = noticeurl;
            isCaptchaShow = isCaptcha;

            // 数据为空时显示登录面板
            if (!quickLoginData) {
                domQuickLoginBox.hide();
                showBox(domLoginBox);
                return;
            }

            if (quickLoginData.thumb) {
                $('#quick-image').attr('src', quickLoginData.thumb);
            }

            $('#quick-nickname').html(quickLoginData.nickname);

            showBox(domQuickLoginBox);
        }, function (noticeUrl, isCaptcha) {
            isCaptchaShow = isCaptcha;
            showBox(domLoginBox);

            isCaptcha && showCaptcha();
        });

        // 显示box
        function showBox(dom)
        {
            domLoginBox.css({'left' : '370px', 'opacity' : 0});
            domLoadingBox.fadeOut(100);
            dom.show().animate({
                'left' : 0,
                'opacity' : 1
            }, 300);
        }

        // 用户名获取焦点
        $('#account').focus();
    }

    // 打开登录对话框
    objLoginBtn.on('click', function () {
        openLoginBox();
    });

    // 切换账号
    $('#switch-account').on('click', function () {
        domQuickLoginBox.fadeOut(300);
        domLoginBox.show().animate({
            'left' : 0,
            'opacity' : 1
        });
        isCaptchaShow && showCaptcha();
    });

    // 快速登录
    $('#quick-image').on('click', function () {
        if (!quickLoginData || !noticeUrl) {
            return;
        }
        // 通过后端，用户登录，记录session
        noticeLogin(noticeUrl, quickLoginData.thumb);
    });

    /**
     * 通知服务端用户登录
     */
    function noticeLogin (url, thumbUrl)
    {
        $.post(url, function (res) {
            if (res.state) {
                // 关闭 Dialog
                loginDialog.close();
                domMemberLogin.hide();

                var thumb = !thumbUrl ? '/assets/images/member/default.png' : thumbUrl;
                domMemberUser.css({display : 'block'}).find('img.user-thumb').attr('src', thumb);

                isLogined = true;
                window.noticeLoginUrl = url;
            } else {
                var error = res.error ? res.error : '登录失败';
                Modal.error(error, function () {
                    $('#loading').css({'display' : 'none'});
                    $('#submit').css({'display' : 'block'});
                });
            }

            // 停止加载图标
            showLoginLoading(false);
        });
    }

    // 判断是否登录
    var loginData = {
      data:"",
      ele:{
        loading:$("#member-loading"),
        login:domMemberLogin,
        user:domMemberUser
      },
      change:function(name){
        this.ele[name].show().siblings().hide();
      },
      init:function(params){
        var _this = this;
        $.get('/ajax/user',function(res){
          if(res && res.state && res.user){
            var thumb = res.user.thumb ? thumb : '/assets/images/member/default.png';
            _this.ele.user.find('img.user-thumb').attr('src', thumb);
            _this.change('user');
          }else{
            _this.change('login');
          }
        }).error(function(res){
            // 错误显示登录
            _this.change('login');
        });
      }
    };
    loginData.init();

    var expEmail = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
    var expPhone = new RegExp(/^1[34578]\d{9}$/);

    objSubmitBtn.on('click', function () {
        login();
    });

    $(document).on('keypress', function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode != 13) {
            return;
        }

        var valAccount = $('#account').val();
        var valPassword = $('#password').val();

        if (isCaptchaShow) {
            var valCaptcha = $('#captcha').val();
        }

        if (valAccount && (expEmail.test(valAccount) || expPhone.test(valAccount)) && valPassword && valPassword.length >= 6) {
            if (!isCaptchaShow || (isCaptchaShow && isCaptchaRight)) {
                login();
            }
        }
    });

    // 提交登录
    function login() {
        var valAccount = $('#account').val();
        var valPassword = $('#password').val();
        var valCaptcha = $('#captcha').val();
        var valRemember = $('#remember').is(":checked") ? 1 : 0;
        var accountType = '';       // email | mobile
        var data = {};

        if (!valAccount) {
            Modal.alert('请输入账号'); return;
        }

        if (!valPassword) {
            Modal.alert('请输入密码'); return;
        }

        if (isCaptchaShow && !valCaptcha) {
            Modal.alert('请输入验证码'); return;
        }


        // 验证邮箱或验证手机号
        if (expEmail.test(valAccount)) {
            accountType = 'email';
        } else if (expPhone.test(valAccount)) {
            accountType = 'mobile';
        } else {
            Modal.error('账号格式错误'); return;
        }

        // 验证密码合法性
        if (valPassword.length < 6) {
            Modal.error('密码不能小于6位'); return;
        }

        if (isCaptchaShow && !isCaptchaRight) {
            Modal.error('验证码错误'); return;
        }

        if (isCaptchaShow && isCaptchaRight) {
            data = {'captcha' : valCaptcha};
        }

        showLoginLoading(true);

        data = $.extend(data, {
            'account' : valAccount,
            'password' : cloudPasswordEncrypt(key, iv, valPassword),
            'pubkey': key,
            'iv': iv,
            'remember' : valRemember,
            'type' : accountType,
            '_' : new Date().getTime()
        });

        $.post(api.loginUrl, data, function (res) {
            if (res.state) {
                oauth.login(res.data, function (data) {
                    // 登录成功，通知本地后端登录
                    noticeLogin(data.noticeurl, data.thumb);
                }, function (is_captcha, code, error) {
                    if (is_captcha && isFirstCaptcha && !isCaptchaShow) {
                        var error = '帐号异常，请输入验证码';
                        isFirstCaptcha = false;
                        isCaptchaShow = is_captcha;
                    } else {
                        var error = error ? error : '登录失败';
                    }

                    Modal.error(error, function () {
                        $('#loading').css({'display' : 'none'});
                        $('#submit').css({'display' : 'block'});
                        $('#password').val('');
                        is_captcha && showCaptcha();
                        is_captcha && initCaptcha();
                    });
                });
            } else {
                // error
                var error = res.error ? res.error : '登录失败';
                Modal.error(error, function () {
                    $('#loading').css({'display' : 'none'});
                    $('#submit').css({'display' : 'block'});
                    is_captcha && initCaptcha();
                });
            }
        });
    }

    // 显示关闭loading
    function showLoginLoading(flag)
    {
        if (flag) {
            $('#loading').css({'display' : 'block'});
            $('#submit').css({'display' : 'none'});
        } else {
            $('#loading').css({'display' : 'none'});
            $('#submit').css({'display' : 'block'});
        }
    }

    // 关闭登录框
    var objCloseBtn = $("#close-login-dialog");
    objCloseBtn.on('click', function () {
        loginDialog.close();
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++
    // 退出
    $('#logout-btn').on('click', function () {

        function logoutSuccess ()
        {
            Modal.success('退出成功', function () {
                domMemberLogin.css({display : "block"});
                domMemberUser.hide();

                isLogined = false;

                if (typeof pageFlag !== 'undefined' && homePage && pageFlag == 'member') {
                    window.location.href = homePage;
                }
            });
        }

        $.get(api.logoutUrl, function (res) {
            if (oauthConfig.mode && oauthConfig.mode == 'private') {
                // 私有云方案登录，通知app同时退出
                oauth.logout(res.data, function (data) {
                    logoutSuccess();
                }, function (code, message) {
                    var message = message ? message : '退出失败';
                    Modal.error('message');
                });
            } else {
                logoutSuccess();
            }
        });

    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++
    // auto check status
    (function () {
        if (oauthConfig.mode == 'private') {
            oauth.autocheck(function (noticeUrl, isCaptcha, data) {
                isCaptchaShow = isCaptcha;
                if (isLogined == false) {
                    // 仅仅当站点下不在登录状态时，通知后端登录
                    noticeLogin(noticeUrl, data.thumb);
                }
            }, function (noticeUrl, isCaptcha, code, message) {
                isCaptchaShow = isCaptcha;
                if (isLogined == true) {
                    // 仅仅当站点在登录状态时，退出站点
                    $.get(noticeUrl, function (res) {
                        Modal.alert('账号已退出', function () {
                            domMemberLogin.css({display : "block"});
                            domMemberUser.hide();
                        });
                    });
                }
            });
        }
    })();


    // +++++++++++++++++++++++++++++++++++++++++++++++++
    // 显示验证码框
    function showCaptcha ()
    {
        var domCaptchaBox = $('#captcha-box');
        var domCaptchaHr = $('#captcha-box-hr');
        domCaptchaBox.css({'display' : 'block'});
        domCaptchaHr.css({'display' : 'block'});
        loginDialog.height(510);
        $('#login-box').height(510);
        $('#login-loading').height(440);
        $('#login-box-ipt').height(440);
        $('#login-box-ipt').find('.form-area').height(350);
    }


    // +++++++++++++++++++++++++++++++++++++++++++++++++
    // 验证码
    (function () {

        // 刷新
        var objImg = $('#captcha-image');
        var objCaptchaBox = $('#captcha');
        var objCaptchaResult = $('#captcha-result');

        objImg.on('click', function () {
            var url = api.captchaUrl + '?_=' + new Date().getTime();
            $(this).attr('src', url);
        });

        // 检测
        var regExp = new RegExp(/^[a-zA-Z0-9]{4}$/);
        var timer = null;

        objCaptchaBox.on('keyup', function (event) {

            var keycode = event.keyCode ? event.keyCode : event.which;
            if (keycode == 13) {
                return;
            }

            var valCaptcha = $(this).val();

            var val = valCaptcha.replace(/[^\w\.\/]/, '');
            $(this).val(val)

            if (valCaptcha.length > 4) {
                $(this).val(valCaptcha.substr(0, 4));
            }

            if (valCaptcha.length != 4) {
                return ;
            }

            if (!regExp.test(valCaptcha)) {
                return ;
            }

            isCaptchaRight = false;

            clearTimeout(timer);
            timer = setTimeout(function () {
                $.post(api.checkCaptchaUrl, {
                    captcha : valCaptcha
                }, function (res) {
                    if (res.state) {
                        isCaptchaRight = true;
                        objCaptchaResult.attr('class', 'captcha-result success');
                    } else {
                        isCaptchaRight = false;
                        objCaptchaResult.attr('class', 'captcha-result failed');
                    }
                });
            }, 200);
        });
    })();
});

// 用户登录后
$(function () {
    var timer = null;
    $('div.thumb-area').mouseenter(function () {
        clearTimeout(timer);
        $('.toggle-menu.logined').show();
    });

    $('div.thumb-area').mouseleave(function () {
        timer = setTimeout(function () {
            $('.toggle-menu.logined').hide();
        }, 300);
    });

    $('.toggle-menu.logined').mouseenter(function () {
        clearTimeout(timer);
    });

    $('.toggle-menu.logined').mouseleave(function () {
        timer = setTimeout(function () {
            $('.toggle-menu.logined').hide();
        }, 300);
    });
});