/**import from `/static/js/common/loginModal.js` **/
/*
 ** 登录注册弹窗
 ** 依赖插件： md5.js、jsencrypt.js (用于加密密码)
 ** auth:pw
 ** time:2016.9.21
 */
//弹窗结构

// api接口切换
var apiDomain = '//www.yyrb.cn',
webRoot = 'https://www.yyrb.cn';
if (App.config.domainStr == "yyrb.cn") {
    apiDomain = '//www.yyrb.cn';
    webRoot = 'https://www.yyrb.cn';
}
// 用户中心接口切换
var apiUser = "//xbapp.yyrb.cn";
if (App.config.domainStr == "yyrb.cn") {
    apiUser = "//xbapp.yyrb.cn";
}
/* 频道页信息流的初始数据, 在 channel_cms.html 中定义的时候，$article_list|json_encode, 在 channel.html 中为 $data|json_encode */
 (function(e) {
    function i(t) {
        function o() {
            var e = document.documentElement.clientHeight || document.body.clientHeight,
            t = document.documentElement.clientWidth || document.body.clientWidth;
            i.css({
                width: t
            }),
            r.css({
                "margin-top": -(r.height() / 2),
                "margin-left": -(r.width() / 2)
            })
        }
        var n = {};
        e.extend(n, t);
        var r = e(".frame-mod"),
        i = e(".full-bg");
        r.addClass("bounce-in");
        var s = e(".login-from .core-code");
        s.length && s.remove();
        if (!e(".frame-mod").is(":hidden")) return ! 1;
        e(".frame-mod,.full-bg").css("display", "block"),
        o(),
        n.type == 1 ? (r.find(".log-btn").addClass("current").siblings("span").removeClass("current"), r.find(".login-box").addClass("current").siblings("li").removeClass("current")) : n.type == 2 && (r.find(".log-btn").removeClass("current").siblings("span").addClass("current"), r.find(".login-box").removeClass("current").siblings("li").addClass("current"), r.find(".yz-img img").length == 0 && r.find(".yz-img").append('<img src="' + apiUser + '/?app=system&controller=seccode&action=image&" alt="">')),
        r.find(".login-title span").on("click",
        function() {
            e(this).addClass("current").siblings("span").removeClass("current"),
            r.find(".BTVlogin-main li").eq(e(this).index()).addClass("current").siblings("li").removeClass("current"),
            e(this).hasClass("reg-btn") && r.find(".yz-img img").length == 0 && r.find(".yz-img").append('<img src="' + apiUser + '/?app=system&controller=seccode&action=image&" alt="">')
        }),
        r.find(".rem-la").off("click").on("click",
        function() {
            var t = e(this);
            t.hasClass("la-uncheck") ? t.removeClass("la-uncheck").addClass("la-checked") : t.removeClass("la-checked").addClass("la-uncheck")
        }),
        r.find(".btn-close").on("click",
        function() {
            loginMod.closeFrame()
        });
        var u = new BtvLoginModal({
            beforSend: function() {},
            sendDone: function() {
                n.logSuccess()
            }
        }),
        a = new BtvRegisterModal({
            beforSend: function() {},
            sendDone: function() {
                n.regSuccess()
            }
        })
    }
    function s() {
        var t = e(".frame-mod"),
        n = e(".full-bg");
        t.hide(),
        n.hide()
    }
    var t = '<div id="loginModal" class="frame-mod" style="display: none"><div class="fr-wrap">   <a target="_self" href="javascript:;" class="btn-close"></a>   <h4 class="login-title">     <span class="current tab-btn log-btn">登录<i></i></span>     <span class="tab-btn reg-btn">注册<i></i></span>   </h4>   <ul class="BTVlogin-main">     <li class="com-con current login-box">         <form action="" class="loginForm" id="loginForm" autocomplete="off">           <div class="login-form">             <div class="core">               <input type="text" id="loginPho" class="log_ipt ipt user_name bjs-input-test" name="username" placeholder="帐号" reqmsg="登录帐号" data-vaildmsg="请输入登录帐号" maxlength="100" datatypestatus="false">             </div>             <div class="core">               <input type="password" datatype="text" class="log_ipt ipt ipt_passward bjs-input-test" placeholder="密码" id="ipt_passward" data-vaildmsg="请填写密码">               <input type="hidden" name="password" class="hid_PassWd">             </div>             <div>               <input type="hidden" name="timestamp"><input type="hidden" name="jump" value="">               <button type="button" class="login-btn" id="login-btn">立即登录</button>             </div>             <div class="default-li">               <div class="fl momentHid">                 <input id="check-login" type="checkbox" name="remember" class="rem-lo">                 <label for="check-login" class="rem-la la-uncheck">下次自动登录</label>               </div>               <a class="fr for-word" href="http://xbapp.yyrb.cn/?app=member&controller=index&action=getpassword">忘记密码？</a>' + "             </div>" + "           </div>" + '           <div class="other-login">' + "             <h5>使用第三方账号登录</h5>" + '           <p class="other-wb"><a href="javascript:;" onclick="loginThirdParty(this,"sina_weibo")" target="_self"></a></p>' + '           <p class="other-wx"><a href="javascript:;" onclick="loginThirdParty(this,"tencent_weibo")" target="_self"></a></p>' + '           <p class="other-qq"><a href="javascript:;" onclick="loginThirdParty(this,"qzone")" target="_self"></a></p>' + '           <p class="other-qihoo"><a href="' + apiUser + '/thirdLogin?type=qihoo" target="_self"></a></p>' + "           </div>" + "         </form>" + "     </li>" + '     <li class="com-con reg-box">' + '       <form action="" id="regForm" autocomplete="off">' + '       <div class="reg-form">' + '         <div class="core">' + '           <input type="text" datatype="mobile" name="username" class="ipt reg-ipt" id="phone-nb" placeholder="用户名" data-vaildmsg="请填写登录名称" datatypestatus="false">' + "         </div>" + '         <div class="core coremin core-code">' + '           <input type="text" datatype="text" class="ipt checkcode_ipt reg-ipt" name="seccode" id="reg-code" placeholder="验证码"  maxlength="4" data-vaildmsg="请填写验证码" datatypestatus="false" data-action="' + apiUser + '/checkImageCaptcha">' + '           <span class="yz-img" href="' + apiUser + '/?app=system&controller=seccode&action=image&"><img src="' + apiUser + '/?app=system&controller=seccode&action=image&" /></span>' + "         </div>" + '         <div class="core">' + '           <input type="text" datatype="text" class="ipt reg-ipt" name="email" id="email" placeholder="电子邮箱" data-vaildmsg="请填写电子邮箱" datatypestatus="false">' + "         </div>" + '         <div class="core">' + '           <input type="password" class="ipt reg-ipt" id="reg-password" placeholder="密码" data-vaildmsg="请填写用户密码" maxlength="20" datatypestatus="false"><input type="hidden" name="password" class="hid_PassWd"><input type="hidden" name="password_check" class="password_check">' + "         </div>" + '         <div class="default-li">' + '           <div class="fl">' + '             <input type="checkbox" name="" checked="checked" id="rem-lo" class="rem-lo">' + '             <label for="rem-lo" class="rem-la la-checked">我已阅读并同意</label>' + "           </div>" + '           <a class="fl for-deal" href="//www.yyrb.cn/btime_agreement.html" target="_blank">注册协议</a>' + "         </div>" + '         <div><input type="hidden" name="purpose" value="register"><button type="submit" class="login-btn" id="reg-btn">注册</button></div>' + "       </div>" + "       </form>" + "     </li>" + "   </ul>" + ' </div></div><div class="full-bg"></div>';
    e("body").append(t),
    e("#ipt_passward").on("focus",
    function() {
        e(this).attr("type", "password")
    });
    var n = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDarKnIQrARGnTHhbxqLQ1ZID6lXRdTseCW2tYwDaq5TGejVPKOy4HQ3cUBHhMPFTByvIw+P6quHQrrtzmPnL+ifpOaEyre9/n3RLhxMb7fsctGlXFhiA8+Pf2EJmbvl5R52i5Izsoi4Fk7VC1qjavl1uIjrU17qrVWfJPYfgR9iwIDAQAB",
    r = {
        msgAlertBox: function(t, n, r) {
            var i = e(".msg-box");
            i && i.remove();
            var t = t || "";
            if (!n || !(n instanceof jQuery)) return;
            r === 0 ? i = e('<div class="msg-box icon-success"><span>' + t + "</span></div>") : i = e('<div class="msg-box icon-error"><span>' + t + "</span></div>"),
            i.appendTo("body");
            var s = i.innerHeight() + 3,
            o = i.innerWidth() + 2,
            u = n.offset().top,
            a = n.offset().left,
            f = n.innerWidth() / 2 - o / 2;
            i.css({
                top: u,
                left: a + f,
                opacity: 0
            }),
            i.show(),
            i.animate({
                top: u - s,
                opacity: 1
            },
            500, "swing"),
            setTimeout(function() {
                i.remove()
            },
            1500)
        },
        validForm: function(e, t) {
            var n = e;
            if (!n || !t) return;
            return n.find("em.error-tips").length == 0 && n.find("input").blur(),
            n.find("em.error-tips").length ? (r.msgAlertBox("表单错误，请修改错误项", t), !1) : !0
        },
        msgShowBox: function(t, n, r, i) {
            var s, t = e(t),
            o = !0,
            u = "",
            a = n || "请输入内容",
            f = r || null,
            l = t.parent(),
            c = t.val(),
            h = i || "输入错误";
            return t ? (/^\s*$/g.test(c) ? u = a: f && !f.test(c) && (u = h), u ? (l.find("em").remove(), s = '<em class="error-tips">' + u + "</em>", l.append(s), o = !1) : l.find("em").remove(), o) : !1
        },
        passwordEvent: function(t, i) {
            function o() {
                var i = e(t),
                s = i.val(),
                o = hex_md5(s);
                i.siblings(".hid_PassWd").val(o),
                i.siblings(".password_check").val(o)
            }
            var s = e("body");
            e(document).on("change blur keyup", t,
            function() {
                o()
            }),
            e(document).on("change blur keyup", i,
            function() {
                o()
            })
        },
        encryptPassword: function(t, n) {
            if (!t) return;
            if (!n) return t;
            if (JSEncrypt === undefined) throw new Error("Please introduce [JSEncrypt] package");
            var r = decodeURIComponent(e.trim(n)),
            i = new JSEncrypt;
            return i.setPublicKey(r),
            i.encrypt(e.trim(t))
        }
    };
    window.BtvLoginModal = function(e, t) {
        function u(e) {
            t.extend(s, e),
            a.init(e)
        }
        var n = t("body"),
        i = {
            form: "#loginForm",
            pwdIpt: "#ipt_passward"
        },
        s = {
//            url: apiUser + "/loging"
  url: "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxlogin"
        },
        a = {};
        return a.validInput = function() {
            var e = this,
            s = {
                phoneId: "#loginPho",
                logPassword: "#ipt_passward"
            },
            o = /^(1[34578]\d{9})$|^[A-Za-z0-9_\-]+(\.[_A-Za-z0-9\-]+)*@([_A-Za-z0-9\-]+\.)+([a-z]{1,5})$/,
            u = new RegExp(o),
            a = /^\S{6,20}$/,
            f = [s.logPassword],
            l = [a],
            c = ["密码错误"];
            n.off("focus", i.form + " input.log_ipt").on("focus", i.form + " input.log_ipt",
            function() {
                t(this).siblings("em").remove()
            });
            for (var h = 0; h < f.length; h++)(function(e) {
                n.off("change blur", f[e]).on("change blur", f[e],
                function() {
                    var n = t(this).attr("name");
                    n == "user_name" && t(this).val(t.trim(t(this).val())),
                    r.msgShowBox(t(this), t(this).data("vaildmsg"), l[e], c[e])
                })
            })(h)
        },
        a.submitForm = function(e, i) {
            function u() {
                var n, u = t("#login-btn"),
                a = t("#loginForm"),
                f = r.validForm(a, u),
                l = t("#check-login").prop("checked"),
                c = encodeURIComponent(window.location.href);
                if (!f) return;
                a.find('input[name="timestamp"]').val( + (new Date)),
                a.find('input[name="jump"]').val() == "" && a.find('input[name="jump"]').val(c),
                u.prop("disabled", !0),
                n = a.serialize(),
                e && e(n),
                t.ajax({
                    type: "POST",
                    url: s.url,
                    dataType: "jsonp",
                    data: n
                }).done(function(e) {
                    if (e.errno == 0) r.msgAlertBox("登录成功", u, 0),
                    i && i(e),
                    setTimeout(function() {
                        loginMod.closeFrame();
                        $('#login_status').show();
                    },
                    1500);
                    else {
                        r.msgAlertBox(e.errmsg, u),
                        t("#log-code").length == 0 && o.appendLoginCode();
                        if (t("#log-code").length == 1) {
                            var n = a.find(".yz-img");
                            o.refreshCode(n)
                        }
                    }
                    u.prop("disabled", !1)
                })
            }
            n.off("click", "#login-btn").on("click", "#login-btn",
            function(e) {
                e.preventDefault();
                var n = t(this);
                t("#log-code").length == 0 && u();
                var r = n.parents(".com-con").find(".core-code");
                o.checkCode(r,
                function() {
                    u()
                })
            })
        },
        a.init = function(e) {
            r.passwordEvent("#ipt_passward", "#loginPho"),
            a.validInput(),
            a.submitForm(e && e.beforSend, e && e.sendDone)
        },
        u
    } (window, jQuery),
    window.BtvRegisterModal = function(e, t) {
        function o(e) {
            t.extend(s, e),
            u.init(e)
        }
        var n = t("body"),
        i = {
            form: "#regForm"
        },
        s = {
            url:  "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxregister"
        },
        u = {};
        return u.validInput = function() {
            var e = this,
            s = {
                phoneId: "#phone-nb",
                regCode: "#reg-code",
                newsCode: "#news-code",
                regPassword: "#reg-password",
                surePassword: "#sure-password"
            },
            o = /^1[34578]\d{9}$/,
            u = /^\S{6,20}$/,
            a = /^\S{4}$/,
            f = /^\S{6}$/,
            l = new RegExp("^" + t("#reg-password").val() + "$"),
            c = [s.regPassword, s.regCode],
            h = [u,a],
            p = ["密码应为6至20位数字或字母", "验证码错误"];
            n.off("focus", i.form + " input.reg-ipt").on("focus", i.form + " input.reg-ipt",
            function() {
                t(this).siblings("em").remove()
            });
            for (var d = 0; d < c.length; d++)(function(e) {
                n.off("change blur", c[e]).on("change blur", c[e],
                function() {
                    var n = t(this).attr("name");
                    n == "mobile" && t(this).val(t.trim(t(this).val())),
                    h[4] = new RegExp("^" + t("#reg-password").val() + "$"),
                    r.msgShowBox(t(this), t(this).data("vaildmsg"), h[e], p[e])
                })
            })(d);
            t("#reg-password").on("blur",
            function() {
                t("#sure-password").val() && t("#sure-password").blur()
            })
        },
        u.submitForm = function(e, i) {
            n.off("click", "#reg-btn").on("click", "#reg-btn",
            function(n) {
                n.preventDefault();
                var o, u = t(this),
                a = t("#regForm"),
                f = r.validForm(a, u),
                l = t("#rem-lo").prop("checked");
                if (!f) return;
                if (!l) {
                    r.msgAlertBox("请阅读并勾选注册协议", u);
                    return
                }
                u.prop("disabled", !0),
                o = a.serialize(),
                e && e(o),
                t.ajax({
                    type: "POST",
                    url: s.url,
                    dataType: "jsonp",
                    data: o
                }).done(function(e) {
                    i && i(e),
                    e.errno == 0 ? (i && i(e), r.msgAlertBox("注册成功", u, 0), setTimeout(function() {
                        loginMod.closeFrame()
                    },
                    1500)) : r.msgAlertBox(e.errmsg, u),
                    u.prop("disabled", !1)
                }).fail(function() {
                    u.prop("disabled", !1)
                })
            })
        },
        u.smsVerify = function() {
            function s(e) {
                return e.attr(n, n).addClass(n)
            }
            function o(e) {
                return e.removeClass(n).removeAttr(n)
            }
            function u(e) {
                var t = e.data("freq") || 60,
                n = null,
                r = "s后重新获取";
                e.data("orgtxt", e.text()).text("验证码已发送"),
                s(e).blur(),
                setTimeout(function() {
                    n = setInterval(function() {
                        t--,
                        e.text(t + r),
                        t <= -1 && (o(e).text(e.data("orgtxt")), clearInterval(n), n = null)
                    },
                    1e3)
                },
                500)
            }
            var e = ".yz-sms",
            n = "disabled",
            i = !1;
            t(e).each(function() {
                var e = t(this),
                n = t(e.data("phone")),
                r = e.data("phonecode"),
                i = /^(?:13|14|15|16|17|18|19)[\d]{9}$/;
                r && i.test(r) ? o(e) : s(e),
                n.length && n.on("input blur keyup",
                function() {
                    var n = t(this).val();
                    i.test(n) ? (o(e), e.data("phonecode", n)) : (s(e), e.data("phonecode", 0))
                })
            }).on("click",
            function() {
                var e = t(this),
                n = e.data("api"),
                a = e.data("phonecode"),
                f = (new Date).getTime(),
                l = t('input[name="purpose"]').val(),
                c = t('input[name="seccode"]'),
                h = c.val(),
                p = {
                    mobile: a,
                    timestamp: f,
                    purpose: l,
                    seccode: h
                };
                if (!a) return ! 1;
                s(e),
                t.ajax({
                    type: "POST",
                    url: n,
                    dataType: "jsonp",
                    data: p
                }).done(function(t) {
                    t.errno != 0 ? (o(e), r.msgAlertBox(t.errmsg, e)) : u(e)
                }).fail(function() {
                    o(e)
                }),
                i = !0
            })
        },
        u.init = function(e) {
            r.passwordEvent("#reg-password", "#news-code"),
            u.validInput(),
            u.smsVerify(),
            u.submitForm(e && e.beforSend, e && e.sendDone)
        },
        o
    } (window, jQuery),
    e.loginFrame = function() {
        this.loginInit = i,
        this.closeFrame = s
    },
    window.loginMod = new e.loginFrame;
    var o = function() {
        var t = {
//            checkCodeApi: apiUser + "/checkImageCaptcha",
//            getCodeApi: apiUser + "/getImageCaptcha"
	checkCodeApi: "http://xbapp.yyrb.cn/?app=member&controller=index&action=validate&do=seccode&",
   getCodeApi: "http://xbapp.yyrb.cn/?app=system&controller=seccode&action=image&"
        },
        n = '<div class="core coremin core-code"><input type="text" datatype="text" class="log_ipt checkcode_ipt ipt" name="seccode" id="log-code" placeholder="验证码"  maxlength="4" data-vaildmsg="请填写验证码" datatypestatus="false" data-action="' + apiUser + '/checkImageCaptcha">' + '<span class="yz-img" href="' + apiUser + '/?app=system&controller=seccode&action=image&"><img src="' + apiUser + '/?app=system&controller=seccode&action=image&" /></span>' + "</div>";
        return {
            refreshCode: function(e) {
                var n = e.attr("href") + "?=" + (new Date).getTime(),
                r = t.getCodeApi + "?=" + (new Date).getTime();
                e.html('<img src="' + r + '" />')
            },
            checkCode: function(n, r, i) {
                var s = n.find("input"),
                u = s.val();
                e.ajax({
                    type: "POST",
                    url: t.checkCodeApi,
                    dataType: "jsonp",
                    data: {
                        seccode: u
                    }
                }).done(function(e) {
                    n.find("em").remove(),
                    e.errno != 0 ? (n.append('<em class="error-tips">验证码错误</em>'), o.refreshCode(n.find(".yz-img")), i && i()) : r && r()
                }).fail(function() {
                    i && i()
                })
            },
            appendLoginCode: function() {
                var t = e("#ipt_passward").parents(".core");
                t.after(n)
            }
        }
    } (),
    u = function() {
        return {
            bindLoginRegTab: function() {
                e(".login-title .tab-btn").on("click",
                function() {
                    var t = e(this).index(),
                    n = e(".BTVlogin-main .com-con").eq(t).find(".yz-img");
                    o.refreshCode(n)
                })
            },
            bindRefreshCode: function() {
                e("#loginModal").on("click", ".yz-img",
                function() {
                    o.refreshCode(e(this))
                })
            }
        }
    } ();
    e(function() {
        u.bindLoginRegTab(),
        u.bindRefreshCode()
    })
})(jQuery),
function(e) {
    function o(e, t) {
        this.i = 0,
        this.do(e, t)
    }
    function u() {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: s.getUserInfo,
            success: function(r) {
                i.resolve(r);
                var u = r.data.token,
                a = r.data.user_id;
                e.userInfo.token = u,
                e.userInfo.user_id = a;
                var f;
                if (r.code == 0) {
                    e.isLogin = !0,
                    location.pathname === "/live" && new o(e, "reLoginCallback");
                    if (e.config && (e.config.pid === "item-live" || e.config.pid === "item-liveTw")) {
                        e.page = e.page || {};
                        var l = e.page.live = e.page.live || {};
                        l.g_user = r.data,
                        new o(l, "_login")
                    }
                    f = "http://p1.cdn.btime.com/d/inn/7f69123b/_user_photo.png",
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: s.getMessageStatus,
                        xhrFields: {
                            withCredentials: !0
                        },
                        crossDomain: !0,
                        success: function(e) {
                            if (e.code == 0 && e.data.unread > 0) {
                                if (window.location.pathname.toLowerCase() == "/message" && window.location.host.toLowerCase() == "http://xbapp.yyrb.cn/?app=contribution&controller=panel&action=index" || window.location.pathname.toLowerCase() == "/usercenter/message" && window.location.host.toLowerCase() == "brtn.cn") return;
                                t.find(".user-info-cycle").show(),
                                t.find(".unread-time").text(e.data.unread).addClass("has-unread-time")
                            }
                        },
                        error: function() {},
                        complete: function() {
                            t.show(),
                            n.hide()
                        }
                    }),
                    t.find(".user-info-pic").attr("src", f),
                    t.find(".username").text(r.data.nick_name);
 //                   if (r.data.auth.status == "1") switch (r.data.auth.type) {
 //                   case "1":
 //                       t.find(".user-type").attr("src", "/static/img/common/user-type-person.png").show();
 //                       break;
//                    case "6":
//                        t.find(".user-type").attr("src", "/static/img/common/user-type-reporter.png").show();
 //                       break;
 //                   default:
 //                       t.find(".user-type").attr("src", "/static/img/common/user-type-other.png").show()
            //    }
                } else t.hide(),
                n.show()
            },
            error: function() {
                t.hide(),
                n.show(),
                window.loginMod && loginMod.closeFrame()
            }
        })
    }
    var t = $(".login-after"),
    n = $(".login-before"),
    r = qboot.cookie,
    i = $.Deferred(),
    s = {
 //       userLogin: apiUser + "/loging",
userLogin: "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxlogin",
getUserInfo: "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxIsLogin",
//        getUserInfo: apiUser + "/getUserInfo",
        userLogout: "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxlogout",
        UserRegister: "http://xbapp.yyrb.cn/?app=member&controller=index&action=ajaxregister",
        getMessageStatus: ""
    };
   e.userInfo = function(e) {
       i.done(function(t) {
            e(t)
        })
    },
    o.prototype.do = function(e, t) {
        var n = this;
        n.s = setInterval(function() {
            n.i > 30 && clearInterval(n.s),
            e[t] && (clearInterval(n.s), e[t]()),
            n.i++
        },
        100)
    },
    r.get("lf") == "1" ? u() : (t.hide(), n.show()),
    $(".login-after").hover(function() {
        $(this).addClass("login-after-hover")
    },
    function() {
        $(this).removeClass("login-after-hover")
    }),
    $("body").on("click", ".user-info-unread",
    function(e) {
        var n = $(this);
        n.data("hasMessage") == "1" && (t.find(".user-info-cycle").hide(), n.find(".unread-time").text("0").removeClass("has-unread-time"), n.data("hasMessage", "0"))
    }),
    $("body").on("click", ".j-user-login",
    function(t, n) {
        t.preventDefault(),
        window.loginMod && loginMod.loginInit({
            type: 1,
            logSuccess: function(t) {
                u(),
                window.QHPass && e.config && e.config.pid !== "item-live" && e.config.pid !== "item-liveTw" && location.reload(),
                $.isFunction(n) && n()
            }
        })
    }),
    $("body").on("click", ".j-user-register",
    function(t) {
        t.preventDefault(),
        window.loginMod && loginMod.loginInit({
            type: 2,
            regSuccess: function() {
                u(),
                window.QHPass && e.config && e.config.pid !== "item-live" && e.config.pid !== "item-liveTw" && location.reload()
            }
        })
    }),
    $("body").on("click", ".j-user-logout",
    function(r) {
        r.preventDefault(),
        $.ajax({
            type: "post",
            url: s.userLogout,
            dataType: "jsonp",
            success: function(r) {
                if (r.errno == 0) {
                    e.isLogin = !1;
                    if (e.config && e.config.pid === "item-live") {
                        var i = e.ns && e.ns("App.page.live");
                        i.isLogin = !1,
                        i._loginOut && i._loginOut()
                    }
                    t.hide(),
                    n.show(),
                    $('#login_status').hide();
                    window.QHPass && e.config && e.config.pid !== "item-live" && location.reload(),
                    window.location.host.toLowerCase() == "www.yyrb.cn" ? window.location.href = "http://www.yyrb.cn": window.location.host.toLowerCase() == "brtn.cn" && (window.location.href = "http://www.yyrb.cn")
                } else alert("退出失败！")
            },
            error: function(e) {
                alert("链接失败")
            }
        })
    })
} (window.App = window.App || {}),
window.App = window.App || {},
function() {
    window.console || (window.console = {});
    var e = window.console,
    t = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"];
    for (var n = 0,
    r = t.length; n < r; n++) {
        var i = t[n];
        e[i] || (e[i] = function() {})
    }
    e.memory || (e.memory = {})
} (),
App.formatAurl = function(e) {
    var t = App.config.from;
    return t && !/\?.*from=/.test(e) && (e += (e.indexOf("?") > -1 ? "&": "?") + "from=" + t),
    e
},
App.resetAurl = function() {
    var e = $("a");
    for (var t = 0; t < e.length; t++) {
        var n = e.eq(t).attr("href");
        e.eq(t).attr("href", App.formatAurl(n + ""))
    }
},
$(document).on("click", "a",
function(e) {
    if (App.config.from == "") return;
    if (($(this).attr("href") + "").indexOf("btime.com") == -1 && ($(this).attr("href") + "").indexOf("brtn.cn") == -1) return;
    if ($(this).attr("data-unique") != 1) if ($(this).parent().parent()[0] == $(".nav-btv")[0] || $(this).parent().parent()[0] == $(".nav-province")[0]) return;
    e.preventDefault();
    var t = $(this).attr("href") + "";
    t.indexOf("?") > -1 ? t.indexOf("from=") > -1 && t.indexOf("from=") > t.indexOf("?") || (t += "&from=" + App.config.from) : t += "?from=" + App.config.from,
    $(this).attr("target") == "_self" || ($(this).parent().parent().attr("class") + "").indexOf("nav") > -1 ? location.href = t: window.open(t)
}),

function(e) {
    e.fn.extend({
        setCur: function(t, n, r) {
            return this.each(function(i, s) {
                var o = e(s);
                t || (t = "cur"),
                e.type(t) == "boolean" && (r = t, t = "cur"),
                e.type(n) == "boolean" && (r = n, n = ""),
                r ? o.removeClass(t).siblings(n).addClass(t) : o.siblings(n).removeClass(t).end().addClass(t)
            })
        },
        hasChild: function(t) {
            var n = e.type(t) == "string" ? t: "";
            return e(this[0]).children(n).length > 0
        }
    })
} (window.jQuery),
function(e) {
    function r(t) {
        var n = e.location,
        r = n.protocol + "//",
        i = n.hostname,
        s = n.pathname,
        o = n.search,
        u = n.hash,
        a = i.split(".")[0],
        f = ["www", "item", "record", "user"];
        return f.indexOf(a) == -1 ? i = a + "." + "www.btime.com": f.indexOf(a) > 0 && (i = "www.btime.com"),
        t !== "/" && (t += "/"),
        r + i + t + o + u
    }
    function u() {
        qload({
            path: n.local,
            type: "js",
            name: "chinaAreaMap"
        },
        function() {
            i = {
  //              source: city_Data,
                province: {}
            };
            var e;
  //          for (var t = 0; t < i.source.length; t++) e = i.source[t],
  //          e.upper = e.id.slice(0, 2),
  //          e.cities.length <= 1 && (e.unique = "1", e.id = e.cities[0].id, e.title = e.cities[0].title),
  //          i.province[e.id] = e;
        })
    }
    function a() {
        $.ajax({
            method: "get",
            url: n.btv,
            dataType: "jsonp"
        }).done(function(e, t, n) {
            if (e.errno == 0 && e.data) {
                s = {};
                var r = null,
                i, o;
                for (var u in e.data) {
                    s[u] = {},
                    s[u].children = r = e.data[u],
                    r.length <= 1 && (s[u].unique = !0),
                    s[u].url = r[0].url,
                    s[u].cname = r[0].cname,
                    s[u].upper = u.split("_")[0];
                    for (var a = 0,
                    i = r.length; a < i; a++) o = r[a].url.split("/"),
                    o.length && (r[a].cindex = o[o.length - 1])
                }
            }
        })
    }

    e.App = e.App || {};
    if (e.App.config.pageType == "light-seo") return;
    var t = e.location.search.indexOf("debug") > -1,
    n = {
        local: "",
        btv: "",
        getUserInfo: ""
    };
    $(".j-navbar").scrollToFixed({
        zIndex: 300
    }),
    t && $("body").on("click", ".j-nav-channel a",
    function(t) {
        t.preventDefault();
        var n = $(this).attr("href");
        if (!n) return;
        e.location.href = App.formatAurl(n + "?debug=1")
    }),
    $(".nav-item-more").on("click",
    function(e) {
        e.preventDefault(),
        $(".navbar").hasClass("navbar-open") ? $(".nav-hide").slideUp("400",
        function() {
            $(".navbar").removeClass("navbar-open")
        }) : ($(".navbar").addClass("navbar-open"), $(".nav-hide").slideDown())
    });
    var i = null,
    s = null,
    o = {
        province: template.compile($("#j-tpl-province").html()),
        city: template.compile($("#j-tpl-city").html()),
        btv_first: template.compile($("#j-tpl-btv-first").html()),
        btv_next: template.compile($("#j-tpl-btv-next").html())
    };
    u(),
    a(),
    $(".nav-tab").on("click", "a",
    function(e) {
        e.preventDefault();
        var t = $(this),
        n = t.data("target");
        t.parent("li").setCur("active"),
        $(n).setCur("btime-hide", "", !0)
    }),
    $(".tab-content").on("click", "a",
    function(n) {
        n.preventDefault();
        var r = $(this),
        u = r.data("type"),
        a = r.data("unique"),
        f = r.data("id"),
        l = r.data("url"),
        c = r.data("key"),
        h = "";
        u == "province" ? a ? location.href = r.attr("href") : ($("#local-wrap").find(".nav-province").hide().end().find(".nav-city").hide(), $("#local-wrap").hasChild("ul[data-province=" + f + "]") ? $("#local-wrap").find("ul[data-province=" + f + "]").show() : (h = o.city({
            list: i.province[f].cities,
            province_code: f,
            province_name: r.text(),
            active: App.router.city_code || ""
        }), $("#local-wrap").append(h))) : u == "city" ? location.href = r.attr("href") : u == "btv" ? a ? t ? e.location.href = App.formatAurl(l + "?debug=1") : e.location.href = App.formatAurl(l) : ($("#btv-wrap").find(".nav-btv").hide().end().find(".nav-btv-next").hide(), $("#btv-wrap").hasChild("ul[data-btv=" + c + "]") ? $("#btv-wrap").find("ul[data-btv=" + c + "]").show() : (h = o.btv_next({
            list: s[c].children,
            active: App.router.sub_channel
        }), $("#btv-wrap").append(h))) : u == "btv-next" ? t ? e.location.href = App.formatAurl(l + "?debug=1") : e.location.href = App.formatAurl(l) : u == "back" && (r.data("wrap") == "local" ? $("#local-wrap").find(".nav-city").hide().end().find(".nav-province").show() : $("#btv-wrap").find(".nav-btv-next").hide().end().find(".nav-btv").show())
    }),
    function() {
        function t(e) {
            document.all ? (document.body.style.behavior = "url(#default#homepage)", document.body.setHomePage(e)) : alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!")
        }
        var e = $(".j-set-home");
        if (!e.size()) return;
        e.click(function(e) {
            e.preventDefault(),
            t(webRoot)
        })
    } ()
} (window),
window.qSuggest = window.qSuggest || {},
function() {
    function t(e) {
        return !! e && e.nodeType == 1
    }
    var e = function() {
        var e = function(e) {
            window.console && console.log
        };
        return function() {
            return
        }
    } (),
    n = qboot.createEvents,
    r = $.extend,
    i = document.body,
    s = function(e) {
        return this._config = {
            recAllTimeout: 150
        },
        r(!0, this._config, e),
        this._handler = {},
        this._recAllStarted = !1,
        this._recAllTimer = null,
        this._recData = {},
        this._init()
    };
    s.prototype = {},
    s.prototype._init = function() {
        var e = this;
        return n(e),
        !0
    },
    s.prototype.setOne = function(e, t, n) {
        var r = this;
        t = t.toLowerCase(),
        r._recData[t] || (r._recData[t] = {}),
        r._recData[t][e] = n
    },
    s.prototype.setAll = function(e, t) {
        e = e.toLowerCase(),
        this._recData[e] = t
    },
    s.prototype.getAll = function(e) {
        var t = this;
        return e = e.toLowerCase(),
        this._requestAll(e)
    },
    s.prototype.getOne = function(e, t) {
        var n = this;
        return t = t.toLowerCase(),
        n._recData[t] && n._recData[t][e] ? (n.trigger("receiveOne", {
            name: e,
            query: t,
            data: n._recData[t][e]
        }), !0) : this._requestOne(e, t)
    },
    s.prototype.bindGroupHandler = function(e, t) {
        this._handler[e] = t
    },
    s.prototype._requestAll = function(e) {
        var t = this;
        e = e.toLowerCase(),
        t._recAllStarted && (t._recAllStarted = !1, clearTimeout(t._recAllTimer)),
        t._recData[e] || (t._recData[e] = {});
        var n;
        for (n in t._handler) t._handler[n].request &&
        function(n) {
            t._recData[e] && t._recData[e][n] ? (t._recAllStarted || (t._recAllStarted = !0, t._recAllTimer = setTimeout(function() {
                t.trigger("receiveAll", {
                    query: e,
                    data: t._recData[e]
                })
            },
            t._config.recAllTimeout)), t._receiveOne(n, t._recData[e][n])) : t._handler[n].request(e,
            function(r) {
                t._recAllStarted || (t._recAllStarted = !0, t._recAllTimer = setTimeout(function() {
                    t.trigger("receiveAll", {
                        query: e,
                        data: t._recData[e]
                    })
                },
                t._config.recAllTimeout)),
                t._receiveOne(n, r)
            })
        } (n);
        return ! 0
    },
    s.prototype._requestOne = function(e, t) {
        var n = this;
        return t = t.toLowerCase(),
        n._recData[t] || (n._recData[t] = {}),
        n._handler[e] && n._handler[e].request &&
        function(e) {
            n._handler[e].request(t,
            function(t) {
                n._receiveOne(e, t)
            })
        } (e),
        !0
    },
    s.prototype._receiveOne = function(e, t) {
        var n = this,
        r;
        return n._handler[e] && n._handler[e].receive && (r = n._handler[e].receive(t), r && r.query && (r.query = r.query.toLowerCase(), n._recData[r.query] || (n._recData[r.query] = {})), r && r.query && r.data && (n._recData[r.query][e] = r.data, n.trigger("receiveOne", {
            name: e,
            query: r.query,
            data: r.data
        }))),
        !0
    };
    var o = function(e) {
        e.style.display = ""
    },
    u = function(e) {
        e.style.display = "none"
    },
    a = {
        DOWN: 40,
        UP: 38,
        ESC: 27,
        ENTER: 13,
        BACKSPACE: 8
    },
    f = [40, 39, 38, 37, 27, 13, 18, 17, 16],
    l = function(e, t) {
        return this._config = {
            uiReferElem: null,
            uiContainerElem: null,
            posAdjust: {},
            autoPosition: !0
        },
        r(!0, this._config, t),
        this.container = null,
        this.searchForm = null,
        this.isWatching = !1,
        this._groupHandlerNames = [],
        this._groupHandler = {},
        this._groupTotal = {},
        this._focusedItemIndex = {},
        this._focusedGroupIndex = -1,
        this.textInput = null,
        this.query = "",
        this.lastInputVal = "",
        this._init(e)
    };
    l.prototype = {
        config: function() {
            var e = [].slice.call(arguments);
            if (e.length === 1) return this._config[e[0]] || null;
            if (e.length === 2) return this._config[e[0]] = e[1],
            e[1]
        }
    },
    l.prototype._init = function(r) {
        n(this);
        var i = this,
        s = i.setupTextInput(r);
        return s ? i.config("uiReferElem") && !t(i.config("uiReferElem")) ? (e.error("uiReferElem is not exist"), !1) : (i.config("uiReferElem") || i.config("uiReferElem", r), i.config("uiContainerElem") && !t(i.config("uiContainerElem")) ? (e.error("uiContainerElem is not exist"), !1) : i.config("uiWrapElem") && !t(i.config("uiWrapElem")) ? (e.error("uiWrapElem is not exist"), !1) : (i.config("uiWrapElem") || i.config("uiWrapElem", i.config("uiContainerElem")), i.searchForm = $(r.form), i.wrap = $(i.config("uiWrapElem")), i.container = $(i.config("uiContainerElem")), this._initSuggest())) : (e.error("setup textInput[" + r + "] error"), !1)
    },
    l.prototype.setupTextInput = function(n) {
        return ! n || !t(n) ? (e.error("textInput[" + n + "] is not exist"), !1) : (this.textInput = $(n), this.query = "", this.lastInputVal = "", this.container && this.fillContent(), $(n).attr("qsugInited") == 1 ? !0 : this._initTextInput() && this.textInput.attr("qsugInited", 1))
    },
    l.prototype.focusTextInput = function() {
        var e = this;
        setTimeout(function() {
            e.textInput.focus(),
            e.trigger("focus")
        },
        0)
    },
    l.prototype.setTextInputVal = function(e) {
        this.textInput.val(e || "")
    },
    l.prototype.getTextInputVal = function() {
        return this.textInput.val() || ""
    },
    l.prototype.resetTextInput = function() {
        this.query = "",
        this.lastInputVal = "",
        this.container && this.fillContent()
    },
    l.prototype._initTextInput = function() {
        var t = this,
        n, r = function() {
            var e = t.getTextInputVal(),
            n = e.trim();
            if (e === t.lastInputVal) return;
            t.lastInputVal = e,
            t.query = n,
            n || (t.fillContent(""), t.hide()),
            t.trigger("change", {
                query: t.query
            })
        },
        i = function() {
            if (t.isWatching) return;
            n = setTimeout(function() {
                r(),
                n = setTimeout(arguments.callee, 200)
            },
            100),
            t.isWatching = !0
        },
        s = function() {
            n && clearTimeout(n),
            t.isWatching = !1
        };
        return t.textInput.attr("autocomplete", "off").on("focus",
        function() {
            t.trigger("focus")
        }).on("blur",
        function() {
            t.trigger("stopWatch"),
            t.trigger("blur")
        }).on("paste input",
        function(e) {
            t.trigger("startWatch")
        }).on("keydown",
        function(e) {
            t.keyEventHandler(e)
        }),
        t.on("startWatch", i),
        t.on("stopWatch", s),
        t.on("restoreQuery",
        function(e) {
            t.setTextInputVal(t.query)
        }),
        e("initTextInput finished"),
        !0
    },
    l.prototype.keyEventHandler = function() {
        var e = function(e) {
            return f.indexOf(e) === -1
        };
        return function(t) {
            var n = this,
            r = "",
            i = {
                trigger: "keyboard"
            };
            switch (t.keyCode) {
            case a.UP:
                r = "up",
                n.isVisible() && n.previous(),
                t.preventDefault && t.preventDefault(),
                n.trigger("stopWatch");
                break;
            case a.DOWN:
                r = "down",
                n.isVisible() ? n.next() : n.displayContainer(),
                t.preventDefault && t.preventDefault(),
                n.trigger("stopWatch");
                break;
            case a.ESC:
                r = "esc",
                n.hide(),
                n.trigger("stopWatch");
                break;
            case a.BACKSPACE:
                r = "backspace",
                n.trigger("startWatch");
                break;
            case a.ENTER:
                n.isVisible() && (r = "itemSelect", i.group = n.getFocusedGroup(), i.index = n._focusedItemIndex[i.group]),
                n.trigger("stopWatch");
                break;
            default:
                e(t.keyCode) && n.trigger("startWatch")
            }
            r != "" && n.trigger(r, i)
        }
    } (),
    l.prototype._initSuggest = function() {
        var t = this;
        return t.fillContent(),
        t.on("enter",
        function(n) {
            t.trigger("stopWatch");
            if (n.trigger == "mouse" || n.trigger == "touch") {
                var r = t.searchForm[0],
                i = !0,
                s = window.document;
                if (!r) return;
                if (s.createEvent) {
                    var o = s.createEvent("MouseEvents");
                    o.initEvent("submit", !0, !0),
                    i = r.dispatchEvent(o)
                } else s.createEventObject && (i = r.fireEvent("onsubmit"));
                i && r.submit()
            }
            e("enter with:" + t.getTextInputVal())
        }),
        t.on("itemFocus",
        function() {
            var e = "";
            return function(n) {
                if (n.group != e) {
                    var r = t._groupHandlerNames;
                    for (var i = r.length - 1; i >= 0; i--) r[i] != n.group && t.restoreGroup(r[i]);
                    e = n.group
                }
            }
        } ()),
        $(window).on("resize",
        function() {
            setTimeout(function() {
                t.setContainerRegion()
            })
        }),
        t.container.on("mousedown",
        function(e) {
            var n = t.textInput[0];
            n.onbeforedeactivate = function(e) {
                return window.event.returnValue = !1,
                n.onbeforedeactivate = null,
                !1
            }
        }),
        e("initEvent finished"),
        !0
    },
    l.prototype.setFocusedGroup = function(e) {
        this._focusedGroupIndex = this._groupHandlerNames.indexOf(e || "")
    },
    l.prototype.getFocusedGroup = function() {
        return this._groupHandlerNames[this._focusedGroupIndex] || null
    },
    l.prototype.bindGroupHandler = function(e, t) {
        var n = this;
        n._groupHandlerNames.push(e),
        n._groupHandler[e] = t,
        n._focusedItemIndex[e] = -1,
        t.init && t.init()
    },
    l.prototype.restoreGroup = function(e) {
        var t = this;
        t.trigger("itemBlur", {
            group: e,
            index: t._focusedItemIndex[e]
        }),
        t._focusedItemIndex[e] = -1,
        t._groupHandlerNames[t._focusedGroupIndex] && (t._focusedGroupIndex = -1)
    },
    l.prototype.initGroupUserBehavior = function(e, t) {
        var n = this,
        r = "mouse";
        n.container.delegate(t, "mouseover",
        function(r) {
            var i = $(this).attr("data-index"),
            s = i === undefined ? $(t, n.container).index(this) : i,
            o = n._groupHandlerNames;
            for (var u = o.length - 1; u >= 0; u--) n.trigger("itemBlur", {
                group: o[u],
                index: n._focusedItemIndex[o[u]],
                trigger: "mouse"
            });
            n.trigger("itemFocus", {
                group: e,
                index: s,
                trigger: "mouse"
            }),
            n.setFocusedGroup(e, s),
            n._focusedItemIndex[e] = s
        }),
        n.container.delegate(t, "touchstart",
        function(i) {
            var s = $(this).attr("data-index"),
            o = s === undefined ? $(t, n.container).core.indexOf(this) : s,
            u = n._groupHandlerNames;
            for (var a = u.length - 1; a >= 0; a--) n.trigger("itemBlur", {
                group: u[a],
                index: n._focusedItemIndex[u[a]],
                trigger: "touch"
            });
            n.trigger("itemFocus", {
                group: e,
                index: o,
                trigger: "touch"
            }),
            n.setFocusedGroup(e, o),
            n._focusedItemIndex[e] = o,
            r = "touch"
        }),
        n.container.delegate(t, "touchend",
        function(r) {
            var i = $(this).attr("data-index"),
            s = i === undefined ? $(t, n.container).core.indexOf(this) : i;
            n.trigger("itemBlur", {
                group: e,
                index: s,
                trigger: "touch"
            })
        }),
        n.container.delegate(t, "click",
        function(i) {
            var s = $(this).attr("data-index"),
            o = s === undefined ? $(t, n.container).index(this) : s;
            n.trigger("itemSelect", {
                group: e,
                index: o,
                trigger: r
            })
        })
    },
    l.prototype.render = function(t) {
        var n = this,
        r, i, s = [],
        o,
        u;
        t = t || {};
        for (o = 0, u = n._groupHandlerNames.length; o < u; o++) r = n._groupHandlerNames[o],
        i = n._groupHandler[r],
        i && i.render && (i.render.setup && (i.render.setup(), n.setGroupTotal(r, 0), n.restoreGroup(r), e("Render setup [" + r + "]")), i.render.build && (s.push(i.render.build(t[r])), e("Render buildui [" + r + "]:", t[r])));
        n.fillContent(s.join(""));
        for (o = 0, u = n._groupHandlerNames.length; o < u; o++) r = n._groupHandlerNames[o],
        i = n._groupHandler[r],
        i && i.render && i.render.teardown && (i.render.teardown(), e("Render teardown [" + r + "]"))
    },
    l.prototype.setGroupTotal = function(e, t) {
        this._groupTotal[e] = t
    },
    l.prototype.groupPrevious = function(e) {
        var t = this,
        n = t._groupTotal[e],
        r = t._focusedItemIndex[e],
        i = -1;
        return n > 0 && (r <= -1 ? r = n - 1 : r >= 0 && (i = r, r--)),
        t.trigger("itemBlur", {
            group: e,
            index: i,
            trigger: "keyboard"
        }),
        t.trigger("itemFocus", {
            group: e,
            index: r,
            trigger: "keyboard"
        }),
        t._focusedItemIndex[e] = r,
        r
    },
    l.prototype.groupNext = function(e) {
        var t = this,
        n = t._groupTotal[e],
        r = t._focusedItemIndex[e],
        i = -1;
        return n > 0 && (r <= -1 ? r = 0 : r < n && (i = r, r++), r >= n && (r = -1)),
        t.trigger("itemBlur", {
            group: e,
            index: i,
            trigger: "keyboard"
        }),
        t.trigger("itemFocus", {
            group: e,
            index: r,
            trigger: "keyboard"
        }),
        t._focusedItemIndex[e] = r,
        r
    },
    l.prototype.displayContainer = function() {
        var e = this;
        e.container.html().trim() ? e.show() : e.hide()
    },
    l.prototype.fillContent = function(t) {
        var n = this;
        n.container.html(t || ""),
        n.displayContainer(),
        n.isVisible(),
        e("fillContent :" + t)
    },
    l.prototype.setContainerRegion = function() {
        var e = this;
        if (!e.config("autoPosition")) return ! 1;
        var t = e.config("uiReferElem"),
        n = $(e.config("uiReferElem")).offset(),
        r = e.config("posAdjust"),
        i = e.wrap.attr("width") ? parseInt(e.wrap.attr("width"), 10) : t.offsetWidth;
        n.bottom = n.top + t.offsetHeight,
        e.wrap.css({
            position: "absolute",
            top: (r.top ? r.top + n.bottom: n.bottom) + "px",
            left: (r.left ? r.left + n.left: n.left) + "px",
            width: (r.width ? r.width + i: i) + "px",
            "z-index": r["z-index"] ? r["z-index"] : 99
        },
        1)
    },
    l.prototype.isVisible = function() {
        return this.wrap.css("display") != "none"
    },
    l.prototype.show = function() {
        var e = this;
        e.trigger("show");
        if (e.isVisible()) return;
        e.setContainerRegion(),
        o(e.wrap[0])
    },
    l.prototype.hide = function() {
        var e = this;
        e.trigger("hide");
        if (!e.isVisible()) return;
        u(e.wrap[0])
    },
    l.prototype.previous = function() {
        var t = this,
        n = t._focusedGroupIndex,
        r = t._groupHandlerNames[n],
        i = t._groupHandlerNames.length,
        s = -1;
        n <= -1 && (n = i - 1, r = t._groupHandlerNames[n]);
        while (s === -1 && n > -1) t._groupHandler[r] && (s = t.groupPrevious(r)),
        s === -1 && (n > 0 ? (n--, r = t._groupHandlerNames[n]) : (n = -1, r = ""), e("changeGroup", n));
        n === -1 && s === -1 && t.trigger("restoreQuery"),
        t._focusedGroupIndex = n,
        e(r + " previous:" + s)
    },
    l.prototype.next = function() {
        var t = this,
        n = t._focusedGroupIndex,
        r = t._groupHandlerNames[n],
        i = t._groupHandlerNames.length,
        s = -1;
        n >= i && (n = -1),
        n <= -1 && (n = 0, r = t._groupHandlerNames[n]);
        while (s === -1 && n < i) t._groupHandler[r] && (s = t.groupNext(r)),
        s === -1 && (n < i ? (n++, r = t._groupHandlerNames[n]) : (n = -1, r = ""), e("changeGroup", n));
        n === i && s === -1 && t.trigger("restoreQuery"),
        t._focusedGroupIndex = n,
        e(r + " next:" + s)
    };
    var c = function(e, t) {
        var n = this;
        if (! (n instanceof c)) return new c(e, t);
        n._config = {
            ui: null,
            data: null
        },
        r(!0, n._config, t),
        n.query = "",
        n.renderQuery = "",
        n.ui = null,
        n.data = null,
        n._init(e, t)
    };
    c.prototype = {
        config: function() {
            var e = [].slice.call(arguments);
            if (e.length === 1) return this._config[e[0]] || null;
            if (e.length === 2) return this._config[e[0]] = e[1],
            e[1]
        }
    },
    c.prototype._init = function(t, r) {
        var i = this;
        return i.isWatching = !1,
        i.ui = i.config("ui") || i.config("ui", new l(t, r)),
        i.ui ? (i.data = i.config("data") || i.config("data", new s(r)), i.data ? (n(i), i._initEvent()) : (e.error("init data error"), !1)) : (e.error("init ui error"), !1)
    },
    c.prototype._initEvent = function() {
        var t = this,
        n = t.data,
        r = t.ui;
        return r.on("change",
        function(r) {
            var i = t.query = r.query.toLowerCase();
            i && (n.getAll(i), e("input query:" + i))
        }),
        n.on("receiveAll",
        function(e) {
            e.query.toLowerCase() === t.query && (t.renderQuery = e.query.toLowerCase(), r.render(e.data))
        }),
        !0
    },
    window.qSuggest = c,
    window.qSuggest.log = e,
    window.qSuggest.log.error = e
} (),
function(e) {
    document.getElementById("suggest-container") || $("#search-block .search-suggest").prepend('<div id="suggest-container" style="display:none" class="suggest"><div class="suggest-bd"></div><div class="suggest-ft"><div class="declare"></div></div></div>');
    var t = qboot.jsonp,
    n = "suggest-container",
    r = "haosou-input",
    i = "search-block";
    if (!$("#" + r)[0]) return;
    var s = $("#" + r)[0],
    o = $("#" + i)[0],
    u = $("#" + n)[0],
    a = $("#" + n + " .suggest-bd")[0],
    f = s.form,
    l = new qSuggest(s, {
        autoPosition: !1,
        uiReferElem: o,
        uiWrapElem: u,
        uiContainerElem: a,
        recAllTimeout: 120
    });
    window._suggest = l,
    function() {
        var e = qSuggest.log,
        n = l,
        r = n.ui,
        i = n.data,
        s = "reci",
        o = "direct",
        u = "common",
        a = "on",
        f = {},
        c = {},
        h = function(e) {
            return String(e).replace(/[^\x00-\xff]/g, "abc").replace(/[\d]/g, "abc").length
        },
        p = "",
        d = !1;
        f[u] = [1, 50],
        f[o] = [6, 50],
        c[u] = [],
        c[o] = [],
        c[s] = [],
        r.searchForm.on("submit",
        function(e) {
            var t = r.getFocusedGroup();
            if (t == o) {
                var n = $("#suggest-direct>a." + a);
                n[0] && d && (window.open(n.attr("href")), e.preventDefault && e.preventDefault(), d = !1)
            } else {
                var n = $("#suggest-reci>a." + a);
                t == s && n[0] && n.attr("href") && d && (window.open(n.attr("href")), e.preventDefault && e.preventDefault(), d = !1)
            }
            p = r.getTextInputVal()
        }),
        function() {
            i.bindGroupHandler(u, {
                request: function(e, n) {
                    if (!n || !e) return;
                    var r = h(e);
                    r >= f[u][0] && r <= f[u][1] && t("//sug.so.360.cn/suggest?word=" + encodeURIComponent(e) + "&encodein=utf-8&encodeout=utf-8&pq=" + encodeURIComponent(p),
                    function(e, t) {
                        n(e)
                    },
                    {
                        jsonp: "callback"
                    })
                },
                receive: function(e) {
                    return e && e.q && e.s && e.s.length > 0 ? {
                        query: e.q,
                        data: e.s
                    }: null
                }
            }),
            r.bindGroupHandler(u, {
                render: {
                    setup: function() {
                        c[u] = []
                    },
                    build: function() {
                        var e = 0;
                        return function(t) {
                            if (!t) return "";
                            var i = "",
                            s, o = n.query.length,
                            a = 0;
                            r.setGroupTotal(u, t.length);
                            for (var f = 0,
                            l = t.length; f < l; f++) {
                                t[f] = t[f].trim(),
                                s = t[f].toLowerCase();
                                if (s === n.query) continue;
                                s.indexOf(n.query) === 0 && (s = "<b>" + n.query + "</b>" + s.substring(o)),
                                i += '<a data-text="' + t[f] + '" data-index="' + a + '"  class="suggest-item">' + s + "</a>",
                                a++
                            }
                            return i = i ? '<div id="suggest-common" class="suggest-list">' + i + "</div>": "",
                            e != l && (e = l, $(".suggest-ft .declare").css("position", "relative").css("position", "absolute")),
                            i
                        }
                    } (),
                    teardown: function() {
                        c[u] = $("#suggest-common>a")
                    }
                },
                init: function() {
                    r.initGroupUserBehavior(u, "#suggest-common>a"),
                    r.container.delegate("#suggest-common>a", "click",
                    function(e) {
                        e.preventDefault()
                    }),
                    r.on("itemSelect",
                    function(t) {
                        if (t.group !== u) return;
                        if (t.index > -1 && c[u][t.index]) {
                            var n = c[u].eq(t.index);
                            t.trigger != "keyboard" && r.setTextInputVal(n.attr("data-text")),
                            r.trigger("enter", {
                                trigger: t.trigger
                            }),
                            e("itemSelect[COMMON] index:" + t.index)
                        }
                    }),
                    r.on("itemFocus",
                    function(e) {
                        if (e.group !== u) return;
                        if (e.index > -1 && c[u][e.index]) {
                            var t = c[u].eq(e.index);
                            t.addClass(a),
                            e.trigger == "keyboard" && r.setTextInputVal(t.attr("data-text"))
                        }
                    }),
                    r.on("itemBlur",
                    function(e) {
                        if (e.group !== u) return;
                        e.index > -1 && c[u][e.index] && c[u].eq(e.index).removeClass(a)
                    })
                }
            })
        } (),
        r.on("itemSelect",
        function(e) {
            setTimeout(function() {
                r.hide()
            },
            300)
        }),
        r.on("change",
        function(e) {}),
        $("#search-block").hover(function() {
            $(this).find(".search-input").addClass("input-hover")
        },
        function() {
            $(this).find(".search-input").removeClass("input-hover")
        }),
        $(window).on("blur",
        function() {
            r.hide()
        })
    } ()
} ();