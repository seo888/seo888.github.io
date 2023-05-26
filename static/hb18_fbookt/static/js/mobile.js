function register() {
    var loginName = $("#loginName").val();
    var loginPass = $("#loginPass").val();
    var loginPass2 = $("#loginPass2").val();
    var captcha = $("#captcha").val();
    var email = $("#email").val();

    if (loginName === "" || loginPass === "") {
        alert("用户名或密码为空");
        return;
    }
    if (loginPass !== loginPass2) {
        alert("两次输入的密码不匹配");
        return;
    }
    if (captcha === "") {
        alert("请输入验证码");
        return;
    }

    var info = {};
    info.loginName = loginName;
    info.loginPass = loginPass;
    info.email = email;
    info.captcha = captcha;

    post("/Member/Register", info, function (resp) {
        if (resp.Code === 0) {
            alert("注册成功");
            location.href = "/Member/Login?q=" + Request.QueryString("q");
        } else {
            alert(resp.Message);
        }

    });
}

function login() {
    var loginName = $("#loginName").val();
    var loginPass = $("#loginPass").val();
    var captcha = $("#captcha").val();
    var returnUrl = $("#returnUrl").val();

    if (loginName === "" || loginPass === "") {
        alert("用户名或密码为空");
        return;
    }
    if (captcha === "") {
        alert("请输入验证码");
        return;
    }

    var info = {};
    info.loginName = loginName;
    info.loginPass = loginPass;
    info.captcha = captcha;

    post("/Member/Login",
        info,
        function (resp) {
            if (resp.Code === 0) {
                alert("登录成功");
                if (returnUrl !== "") {
                    location.href = returnUrl;
                } else {
                    location.href = "/?q=" + Request.QueryString("q");
                }
            } else {
                alert(resp.Message);
            }
        });
}

function memberSign() {
    var info = "";
    post("/Home/MemberSignIn", info, function (resp) {
        if (resp.Code === 0) {
            //alert("签到成功！");
            alert(resp.Data);
            //location.href = '/?q=' + Request.QueryString("q");
        } else {
            alert(resp.Message);
        }
    });
}

function subscribeSendCoin() {
    var info = "";
    post("/Member/SubscribeSendCoin", info, function (resp) {
        if (resp.Code === 0) {
            alert("领取成功！");
            location.href = "/Member/Info?q=" + Request.QueryString("q");
        } else {
            alert(resp.Message);
        }
    });
}

function couponSendCoin() {
    var coupon = $("#coupon").val();

    if (coupon === "") {
        alert("请输入优惠卷码！");
        return;
    }

    var info = {};
    info.coupon = coupon;

    post("/My/CouponSendCoin", info, function (resp) {
        if (resp.Code === 0) {
            alert("领取成功！");
            location.href = "/Member/Info?q=" + Request.QueryString("q");
        } else {
            alert(resp.Message);
        }
    });
}

function favorite(contentId, sectionId) {
    var info = {};
    info.contentId = contentId;
    info.sectionId = sectionId;

    post("/Content/Favorite", info, function (resp) {
        if (resp.Code === 0) {
            alert("已收藏到书架");
        } else {
            alert(resp.Message);
        }
    });
}

function showLoading() {
    document.getElementById('show-loading').style.display = 'block';
}
function hideLoading() {
    document.getElementById('show-loading').style.display = 'none';
}

function showCommentForm(commentId) {
    document.getElementById('comment-form' + commentId).style.display = 'block';
}

function commentAdd(contentId, commentId) {
    var text = $("#comment-text" + commentId).val();
    //var commentId = $("#commentId").val();
    //var contentId = $("#contentId").val();

    var info = {};
    info.text = text;
    info.commentId = commentId;
    info.contentId = contentId;

    //alert("抱歉，评论功能暂停！");
    //return;

    post("/Comment/Add",
        info,
        function (resp) {
            if (resp.Code === 0) {
                alert("评论成功");
                location.reload();
            } else {
                alert(resp.Message);
            }
        });
}

function contentCommentGood(commentId) {
    var info = {};
    info.commentId = commentId;

    post("/Comment/ContentCommentGood", info, function (resp) {
        if (resp.Code === 0) {
            alert("点赞成功");
            location.reload();
        } else {
            alert(resp.Message);
        }
    });
}

function deleteFavorite(id) {
    var info = {};
    info.id = id;

    post("/Content/DeleteFavorite", info, function (resp) {
        if (resp.Code === 0) {
            alert("删除成功");
            location.href = '/My?type=favorite&q=' + Request.QueryString("q");
        } else {
            alert(resp.Message);
        }
    });
}

$("#js-submit-login")
    .click(function () {
        login();
    });


$("#js-submit-register").click(function () {
    register();
});

var enterPayment = false;

function wxPay(productId) {
    if (enterPayment) {
        return;
    }
    enterPayment = true;
//    $("#pay-tip").html("请稍候...");
    showLoading();
    var info = {};
    info.productId = productId;
    info.m = Request.QueryString("m");
    info.app = Request.QueryString("app");
    info.channelCode = Request.QueryString("q");
    info.channelCodeCookie = Request.QueryString("cq");
    info.promotionCode = Request.QueryString("pr");
    info.promotionCodeCookie = Request.QueryString("cpr");
    info.contentId = Request.QueryString("contentId");

    post("/Payment/CreateWxPayPara", info, function (resp) {
        //$("#pay-tip").html("作者写书很辛苦");
        if (resp.Code == "0") {

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: resp.Data.AppId, // 必填，公众号的唯一标识
                timestamp: resp.Data.TimeStamp, // 必填，生成签名的时间戳
                nonceStr: resp.Data.NonceStr, // 必填，生成签名的随机串
                signature: resp.Data.PaySign,// 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
                hideLoading();
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.chooseWXPay({
                    timestamp: resp.Data.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: resp.Data.NonceStr, // 支付签名随机串，不长于 32 位
                    package: resp.Data.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: resp.Data.PaySign, // 支付签名
                    complete: function (res) {
                        //alert(res.errMsg);
                        enterPayment = false;
                    },
                    fail: function (res) {
                    },
                    success: function (res) {
                    },
                    cancel: function (res) {
                    }
                });
            });
        } else {
            hideLoading();
            alert(resp.Message);
            enterPayment = false;
        }
    });
}

function setMemberIsTest(memberId, isTestState) {
    var info = {};
    info.memberId = memberId;
    info.isTestState = isTestState;

    post("/Content/SetMemberIsTest", info, function (resp) {
        if (resp.Code === 0) {
            alert("设置成功");
            location.reload();
        } else {
            alert(resp.Message);
        }
    });
}

function change_payPro(proCount, proNumber, productId) {
    for (var i = 1; i <= proCount; i++) {
        if (i == proNumber) {
            $("#payPro" + i).removeClass("money_list");
            $("#payPro" + i).addClass("money_list_on");
        }
        else {
            $("#payPro" + i).addClass("money_list");
            $("#payPro" + i).removeClass("money_list_on");
        }
    }
    $("#productId").val(productId);
}

function submitPayForm() {
    var productId = $("#productId").val();
    //var contentId = $("#contentId").val();
    //var channelCode = $("#channelCode").val();
    //var memberId = $("#memberId").val();
    if (productId === "") {
        alert("请选择充值的额度！");
        return;
    }

    $("#payform").submit();
}



$("body")
    .on("click",
        "#js-add-comment",
        function(event) {
            event.stopPropagation();

            var text = $(".data-comment-text").val();
            var commentId = $("#commentId").val();
            var contentId = $("#contentId").val();

            var info = {};
            info.text = text;
            info.commentId = commentId;
            info.contentId = contentId;

            //alert("抱歉，评论功能暂停！");
            //return;

            post("/Comment/Add",
                info,
                function(resp) {
                    if (resp.Code === 0) {
                        alert("评论成功");
                        location.reload();
                    } else {
                        alert(resp.Message);
                    }
                });
        });

$("body")
    .on("click",
        "#js-update-pwd",
        function(event) {
            var oldpass = $("#oldpass").val();
            var newpass = $("#newpass").val();
            var repass = $("#repass").val();

            var info = {};
            info.oldpass = oldpass;
            info.newpass = newpass;
            info.repass = repass;

            post("/Member/UpdatePwd",
                info,
                function(resp) {
                    if (resp.Code === 0) {
                        alert("修改成功！");
                        location.reload();
                    } else {
                        alert(resp.Message);
                    }
                });
        });