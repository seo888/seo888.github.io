$(function () {
var userinfo = window.localStorage.userinfo ? JSON.parse(window.localStorage.userinfo) : null
if (userinfo && userinfo.status == 1) {
    $('#login').attr('id', 'exit').find('span').html('退出')
    $('#button').attr('id', 'success_uername').find('span').html('欢迎您 ' + userinfo.result.username)
} else {
    $('#login').attr('id', 'login').find('span').html('登录')
    $('#button').attr('id', 'button').find('span').html('注册')
}
// 退出登录
function exit() {
    window.localStorage.removeItem('userinfo')
    window.location.href = window.location.href
}
document.getElementById('exit') ? document.getElementById('exit').onclick = exit : null
var time = 60;
// 打开注册弹出层
function open(ev) {
    $('html').css('overflow', 'hidden')
    if (this.getAttribute('id') === 'button' || this.getAttribute('id') === 'login_register') {
        $('.content_login').css('display', 'none')
        $('.content_change_psd').css('display', 'none')
        $('.content').css('display', 'block')
    } else if (this.getAttribute('id') === 'login') {
        $('.content_login').css('display', 'block')
        $('.content').css('display', 'none')
        $('.content_change_psd').css('display', 'none')
    } else if (this.getAttribute('id') === 'forget_psd') {
        $('.content_login').css('display', 'none')
        $('.content').css('display', 'none')
        $('.content_change_psd').css('display', 'block')
    }
    document.getElementById('container_box').style.display = 'block'
    clearInterval(timer)
    var timer = setInterval(function () {
        var dom = Number(document.getElementById('container_box').style.opacity) || 0
        if (dom >= 1) {
            document.getElementById('container_box').style.opacity = 1
            clearInterval(timer)
        } else {
            document.getElementById('container_box').style.opacity = dom + 0.1
        }
    },20)
}
document.getElementById('button') ? document.getElementById('button').onclick = open : null
document.getElementById('login') ? document.getElementById('login').onclick = open : null
document.getElementById('login_register').onclick = open
document.getElementById('forget_psd').onclick = open
// 关闭弹出层
function close() {
    $('html').css('overflow', 'auto')
    $('#container_box').css({display: 'none', opacity: 0})
    $('.content_login').css('display', 'none')
    $('.content').css('display', 'none')
    // 验证用户名
    $('.username').css({'border': '1px solid darkblue'}).val('')
    // 验证手机号
    $('.phone').css({'border': '1px solid darkblue'}).val('')
    // 验证码
    $('.validate_input').css({'border': '1px solid darkblue'}).val('')
    // 密码
    $('.password').css({'border': '1px solid darkblue'}).val('')
    // 再次输入密码
    $('.doupassword').css({'border': '1px solid darkblue'}).val('')
    // 登录
    $('.login_phone').val('')
    $('.login_password').val('')
    // 修改密码
    $('.content_change_psd_phone').css({'border': '1px solid darkblue'}).val('')
    $('.content_change_psd_input').css({'border': '1px solid darkblue'}).val('')
    $('.content_change_psd_password').css({'border': '1px solid darkblue'}).val('')
}
// $('.contnet_close').on('click', close)
// $('.content_login_close').on('click', close)
// $('.content_change_psd_close').on('click', close)
$('.contnet_close').click(close)
$('.content_login_close').click(close)
$('.content_change_psd_close').click(close)
// 验证用户名
function validateUsername() {
    if($.trim($('.username').val())) {
        $('.username').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.username').css({'border': '1px solid red'})
        return false
    }
}
$('.username').on('input blur', validateUsername)
// 验证手机号
function validatePhone() {
    console.log($('.phone').val())
    var phone_for_reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
    var phone_number = $.trim($('.phone').val());
    if(phone_for_reg.test(phone_number) && phone_number) {
        $('.phone').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.phone').css({'border': '1px solid red'})
        return false
    }
}
$('.phone').on('input blur', validatePhone)
function changeValidatePhone() {
    console.log($('.content_change_psd_phone').val())
    var phone_for_reg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
    var phone_number = $.trim($('.content_change_psd_phone').val());
    if(phone_for_reg.test(phone_number) && phone_number) {
        $('.content_change_psd_phone').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.content_change_psd_phone').css({'border': '1px solid red'})
        return false
    }
}
$('.content_change_psd_phone').on('input blur', changeValidatePhone)
// 验证码
function validateInput() {
    var phone_for_reg = /^\d+$/;
    var phone_number = $.trim($('.validate_input').val());
    if(phone_for_reg.test(phone_number) && phone_number) {
        $('.validate_input').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.validate_input').css({'border': '1px solid red'})
        return false
    }
}
$('.validate_input').on('input blur', validateInput)

function changeValidateInput() {
    var phone_for_reg = /^\d+$/;
    var phone_number = $.trim($('.content_change_psd_input').val());
    if(phone_for_reg.test(phone_number) && phone_number) {
        $('.content_change_psd_input').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.content_change_psd_input').css({'border': '1px solid red'})
        return false
    }
}
$('.content_change_psd_input').on('input blur', changeValidateInput)
// 发送验证码
function ajax(val,dom) {
    $.ajax({
        url: 'http://info.hsnewsnet.com/apiv3.1/code.php?phone=' + val,
        type: 'post',
        dataType: "jsonp",
        jsonpCallback: "fun",
        // data: {
        //     phone: $.trim($('.phone').val())
        // },
        success: function (res) {
            if (res.status === 1) {
                time -= 1
                dom.html(time + ' s')
                var dataTimer = setInterval(function () {
                    time -= 1
                    if (time <= 0) {
                        dom.html('重新发送验证码')
                        time = 60
                        clearInterval(dataTimer)
                    } else {
                        dom.html(time + ' s')
                    }
                }, 1000)
            } else {
                alert(res.message)
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}
function messageValidate() {
    if (validatePhone()) {
        if (time === 60) {
            ajax($.trim($('.phone').val()), $('.message_validate'))
        }
    } else {
        alert('请检查手机是否正确！')
    }
}
function changeMessageValidate() {
    if (changeValidatePhone()) {
        if (time === 60) {
            ajax($.trim($('.content_change_psd_phone').val()), $('.content_change_psd_message'))
        }
    } else {
        alert('请检查手机是否正确！')
    }
}
$('.message_validate').on('click', messageValidate)
$('.content_change_psd_message').on('click', changeMessageValidate)
// 密码
function validatePassWord() {
    console.log($('.password').val())
    var password_for_reg = /^^[a-zA-Z]([_a-zA-Z0-9]{5,19})$/;
    var password = $('.password').val();
    if (password && password_for_reg.test(password)){
        $('.password').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.password').css({'border': '1px solid red'})
        return false
    }
}
$('.password').on('input blur', validatePassWord)

function changeValidatePassWord() {
    console.log($('.content_change_psd_password').val())
    var password_for_reg = /^^[a-zA-Z]([_a-zA-Z0-9]{5,19})$/;
    var password = $('.content_change_psd_password').val();
    if (password && password_for_reg.test(password)){
        $('.content_change_psd_password').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.content_change_psd_password').css({'border': '1px solid red'})
        return false
    }
}
$('.content_change_psd_password').on('input blur', changeValidatePassWord)
// 再次输入密码
function validateDoupassword() {
    var passwd = $('.password').val();
    if (passwd === $('.doupassword').val()){
        $('.doupassword').css({'border': '1px solid darkblue'})
        return true
    } else {
        $('.doupassword').css({'border': '1px solid red'})
        return false
    }
}
$('.doupassword').on('change blur', validateDoupassword)
// 提交注册
$('.submit').on('click', function () {
    if (validateUsername() && validatePhone() && validateInput() && validatePassWord() && validateDoupassword()) {
        $.ajax({
            url: 'http://info.hsnewsnet.com/apiv3.1/register.php?nicename=' + $.trim($('.username').val()) + '&password=' + $('.password').val() + '&re_password=' + $('.doupassword').val() + '&phone=' + Number($('.phone').val()) + '&yzm=' + Number($('.validate_input').val()) + '&site=26',
            type: 'get',
            dataType: "jsonp",
            jsonpCallback: "fun",
            // data: {
            //     username: $.trim($('.username').val()),
            //     password: $('.password').val(),
            //     re_password: $('.doupassword').val(),
            //     phone: Number($('.phone').val()),
            //     yzm:  Number($('.validate_input').val()) // 验证码
            // },
            success: function (res) {
                if (res.status == 1) {
                    /*$('#container_box').css({
                        display: 'none',
                        opacity: 0
                    })
                    $('.content_login').css({display:'none'});
                    $('.content').css({display: 'none'}); */
                    close()
                    alert(res.message)
                    window.location.href = window.location.href
                } else {
                    alert(res.message)
                }
            },
            error: function (err) {
                alert(err)
            }
        })
    }else {
        alert('您输入的内容有误，请重新输入！')
    }
})
/* 修改密码 */
$('.content_change_psd_submit').on('click', function () {
    if (changeValidatePhone() && changeValidateInput() && changeValidatePassWord()) {
        $.ajax({
            url: 'http://info.hsnewsnet.com/apiv3.1/user_update.php?phone=' + $.trim($('.content_change_psd_phone').val()) + '&password=' + $.trim($('.content_change_psd_password').val()) + '&yzm=' + $.trim($('.content_change_psd_input').val()) + '&site=26' ,
            type: 'get',
            dataType:"jsonp",
            jsonpCallback:"fun",
            // data: {
            //     password: $.trim($('.login_phone').val()),
            //     username: $.trim($('.login_password').val())
            // },
            success: function (res) {
                if (res.status == 1) {
                    close()
                    window.location.href = window.location.href
                    alert('修改成功！')
                } else {
                    alert(res.message)
                }
            },
            error: function () {
                alert('登录失败，请重试！')
            }
        })
    } else {
        alert('信息填写有误，请检查！')
    }
})
/* 登录 */
$('.login').on('click', function () {
    if ($.trim($('.login_phone').val()) && $.trim($('.login_password').val())) {
       $.ajax({
           url: 'http://info.hsnewsnet.com/apiv3.1/login.php?username=' + $.trim($('.login_phone').val()) + '&password=' + $.trim($('.login_password').val()) + '&site=26',
           type: 'get',
           dataType:"jsonp",
           jsonpCallback:"fun",
           // data: {
           //     password: $.trim($('.login_phone').val()),
           //     username: $.trim($('.login_password').val())
           // },
           success: function (res) {
               if (res.status == 1) {
                   window.localStorage.userinfo = JSON.stringify(res)
                   close()
                   window.location.href = window.location.href
               } else {
                   alert(res.message)
               }
           },
           error: function () {
               alert('登录失败，请重试！')
           }
       })
    } else {
        alert('用户名或密码填写错误！')
    }
})
// 我要爆料
/*$('.callme').on('click', function () {
  if (window.localStorage.userinfo && JSON.parse(window.localStorage.userinfo).status == 1 && JSON.parse(window.localStorage.userinfo).result && JSON.parse(window.localStorage.userinfo).result.sessionid) {
    console.log('123')
  } else {
     alert('您还没有登录，请先登录！')
  }
})*/
})
