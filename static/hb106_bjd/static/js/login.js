document.write('<script src="//img.takefoto.cn/web/skin/static/js/register.js"></script>');
document.write('<script src="//img.takefoto.cn/web/skin/static/js/md5.min.js"></script>');
document.write('<script src="//img.takefoto.cn/web/skin/static/js/wxLogin.js"></script>');


var userInfo = {}
$(document).ready(function () {
  // 判断是否登录
  if ($.cookie('isLogin') == '1') {
    //setStatus()
    getUserInfo()
  }

  $(".go-reg").click(function () {
    $(".reg-wrap").show()
    $(".login-wrap").hide()
  })
  $(".go-sign").click(function () {
    $(".login-wrap").show()
    $(".reg-wrap").hide()
  })

  $(".verify img").attr('src', baseUrlApi + "login/verify")

  var normal = '账号登录'
  $(".login-tabs .item").click(function () {
    var text = $(this).text()
    if (text == normal) {
      return
    }
    normal = text
    $(this).addClass("selected")
    $(this).siblings().removeClass("selected")
    if (text == '账号登录') {
      $("#verifyCheckLogin .login-pw").css('display', 'flex')
      $("#verifyCheckLogin .login-code").hide()
      // $("#login-verify").show()
    }
    if (text == '短信登录') {
      $("#verifyCheckLogin .login-pw").hide()
      $("#verifyCheckLogin .login-code").css('display', 'flex')
      // $("#login-verify").hide()
    }
  })

  // $(".wechat-login").click(function () {
  //   wxlogins()
  // })

  // 登录
  $(".sign-btn").click(function () {
    if (!verifyCheck._click("verifyCheckLogin")) return;
    layer.load(0, { shade: [0.5, '#fff'] });
    var params = {
      username: $("#verifyCheckLogin input[name='phone']").val(),
      captcha: $("#verifyCheckLogin input[name='verify']").val(),
    }
    if (normal == '账号登录') {
      params['type'] = 1
      params['password'] = $("#verifyCheckLogin input[name='password']").val()
    }
    if (normal == '短信登录') {
      params['type'] = 2
      params['msg_code'] = $("#verifyCheckLogin input[name='code']").val()
    }
    // if ($("#agreementSign").prop('checked')) {
    //   params['exp'] = 1
    // }
    ajax({
      type: "POST",
      url: baseUrlClient + "login/create",
      data: params,
      success: function (res) {
        if (res.code === 200) {
          $(".login-model").fadeOut(100)
          $(".login-mask").fadeOut(100)
          //setStatus()
          getUserInfo()
        } else {
          layer.msg(res.msg);
          refresh()
        }
      },
      error: function (res) {
        layer.msg('网络错误，请稍后再试');
        refresh()
      },
      complete: function () {
        layer.closeAll('loading');
      }
    })
  })

  // 注册
  $(".reg-btn").click(function () {
    if (!verifyCheck._click("verifyCheckReg")) return;
    if (!$("#agreementReg").prop('checked')) {
      layer.msg('请阅读并勾选《用户使用协议》');
      return
    }
    layer.load(0, { shade: [0.5, '#fff'] });
    ajax({
      type: "POST",
      url: baseUrlClient + "login/register",
      data: {
        username: $("#verifyCheckReg input[name='phone']").val(),
        password: $("#verifyCheckReg input[name='password']").val(),
        vcode: $("#verifyCheckReg input[name='code']").val(),
      },
      success: function (res) {
        if (res.code === 200) {
          $(".login-wrap").show()
          $(".reg-wrap").hide()
          $("#verifyCheckReg input[name='phone']").val("")
          $("#verifyCheckReg input[name='code']").val("")
          $("#verifyCheckReg input[name='password']").val("")
          $("#verifyCheckReg input[name='reptPassword']").val("")
        } else {
          layer.msg(res.msg);
          // refresh()
        }
      },
      error: function (res) {
        layer.msg('网络错误，请稍后再试');
      },
      complete: function () {
        layer.closeAll('loading');
      }
    })
  })

  // 发送验证码
  sendCode($("#verifyCheckLogin .send"), 1)
  sendCode($("#verifyCheckReg .send"), 0)
})

// 退出登录
$(".user-logout").click(function () {
  ajax({
    type: "POST",
    url: baseUrlClient + "login/out",
    success: function (res) {
      if (res.code === 200) {
        $.removeCookie('isLogin', { path: '/' });
      }
    },
    complete:function () {
      window.location.href = "/"
    }
  })
})

function refresh() {
  $(".verify img").attr('src', baseUrlApi + 'login/verify?random=' + Math.random())
}

// 获取个人信息
function getUserInfo() {
  ajax({
    type: "GET",
    url: baseUrlApi + "my/info",
    hideLoading: true,
    success: function (res) {
      if (res.code === 200) {
        userInfo = res.data
        if (res.data.userpic) {
          $(".comment .user-avatar img").attr("src", res.data.userpic)
          $(".user-account .user-info-avatar img").attr("src", res.data.userpic)
          $(".user-account .user-avatar img").attr("src", res.data.userpic)
        }
        if (res.data.username) {
          let firstName = res.data.username.slice(0, 1)
          $(".login-btn").html('<p>' + firstName + '</p>')
          $(".comment .user-avatar p").text(res.data.username)
          $("#nickname").val(res.data.username)
          $(".user-account .user-name h6").text(res.data.username)
        }
        if (res.data.phone) {
          $(".phone-num").text(res.data.phone)
          $(".change-phone").show()
          $(".forget").show()
        }
        if (res.data.setpasswd === 0) {
          $(".oldPw").css("display", "none")
        }
      }
      //  else {
      //   layer.msg(res.msg, { icon: 7, shade: 0.3, time: 1500 });
      // }
    },
    error: function () { },
    // complete: function () {
    //   layer.closeAll('loading');
    // },
  })
}
// 微信登录
function wxlogins() {
  layer.open({
    title: "微信登录",
    type: 1,
    area: ["400px", "500px"],
    skin: 'layui-layer-demo',
    closeBtn: 0,
    shadeClose: true,
    content: '<div id="login_container" style="padding:30px 50px 0"></div>',
    success: function (layero, index) {
      var loginObj = {
        id: "login_container",
        appid: "wx6cd70e5dc4060719",
        scope: "snsapi_login",
        state: md5(Math.ceil(new Date().getTime() / 1000)),
        redirect_uri: encodeURIComponent(window.location.origin + '/api/pclogin/wxcode')
      }
      var wxObj = new WxLogin(loginObj);
    }
  });
}


var codeCount = 60;
var clickSpan = true
function sendCode(dom, type) {
  dom.click(function () {
    if (clickSpan) {
      var _this = $(this)
      var codeUrl = ""
      var params = {}
      if (type === 2) { // 找回密码
        codeUrl = "login/forget-mobile"
      }
      if (type === 1) { // 登录
        if (!verifyCheck._click("login-user-sign")) return;
        if (!verifyCheck._click("login-verify")) return;
        codeUrl = "login/code"
        params["username"] = $("#verifyCheckLogin input[name='phone']").val()
        params["captcha"] = $("#login-verify input[name='verify']").val()
      }
      if (type === 0) { // 注册
        if (!verifyCheck._click("login-user-reg")) return;
        if (!verifyCheck._click("reg-verify")) return;
        codeUrl = "login/vcode"
        params["username"] = $("#verifyCheckReg input[name='phone']").val()
        params["captcha"] = $("#reg-verify input[name='verify']").val()
      }
      layer.load(0, { shade: [0.5, '#fff'] });
      ajax({
        url: baseUrlClient + codeUrl,
        type: "POST",
        data: params,
        success: function (res) {
          if (res.code === 200) {
            settime(_this)
          } else {
            layer.msg(res.msg);
          }
        },
        error: function (res) {
          layer.msg('网络错误，请稍后再试');
        },
        complete: function () {
          layer.closeAll('loading');
        },
      })
    }
  })
}

function settime(obj) {
  if (codeCount == 0) {
    clickSpan = true
    // obj.attr('disabled', false);
    obj.attr('disabled', false);
    // obj.css('color', '#ee0808');
    obj.css('color', '#ee0808');
    obj.text("重新发送验证码");
    codeCount = 60;
    return;
  } else {
    clickSpan = false
    // obj.attr('disabled', true);
    obj.attr('disabled', true);
    // obj.css('color', '#999');
    obj.css('color', '#999');
    obj.text("(" + codeCount + ")秒后重新获取");
    codeCount--;
  }
  setTimeout(function () { settime(obj) }, 1000)
}

function setStatus() {
  $(".article-tools .collection").show()
  $(".comment .btn .login").hide()
  $(".comment textarea").attr("disabled", false)
  $(".comment textarea").attr("placeholder", "请输入评论内容～")
  $(".comment .btn .add").show()
}
