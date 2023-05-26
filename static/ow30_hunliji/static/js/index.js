$(function() {
  var optsHeader = {
    login: function() {
      var sessionData
      if (session && Object.prototype.toString.call(session) === '[object Function]') {
        var sessionData = new session()
      } else if (session && Object.prototype.toString.call(session) === '[object Object]') {
        var sessionData = session
      }

      var nick = sessionData.getCookie('nick')
      var user_id = sessionData.getCookie('user_id')
      if (user_id && nick) {
        $('#needLogin').hide()
        $('#user_nick').text(nick)
        $('#loginOut').show()
      } else {
        // $('#nologin').hide()
      }
      $('#loginOut').click(function() {
        sessionData.deleteCookie('bindPhone')
        sessionData.deleteCookie('nick')
        sessionData.deleteCookie('token')
        sessionData.deleteCookie('user')
        sessionData.deleteCookie('user_id')
        location.href = '//www.hunliji.com/Login/loginOut'
      })
    },
    scrollEvent: function() {
      // todo 节流 WEB-685-印象请帖浏览，去除该逻辑
      if ($(document).scrollTop() > 34) {
        $('#nav-bar')
          .addClass('nav-fixed')
          .removeClass('nav')
        // $('#selection-bar').hide()
        $('#top').addClass('bar-bottom-fixed')
        // $('#selection')
        //   .addClass('selection-fixed')
        //   .removeClass('selection')
        // $('#input-group')
        //   .addClass('input-group-langer')
        //   .removeClass('input-group')
      } else {
        $('#nav-bar')
          .addClass('nav')
          .removeClass('nav-fixed')
        // $('#selection-bar').show()
        $('#top').removeClass('bar-bottom-fixed')
        // $('#selection')
        //   .removeClass('selection-fixed')
        //   .addClass('selection')
        // // $('#input-group')
        //   .removeClass('input-group-langer')
        //   .addClass('input-group')
      }
    },
    inputEvent: function() {
      $('#search_keyword_new').focus(function() {
        $('#selection-bar').hide()
        $('#input-group')
          .addClass('input-group-langer')
          .removeClass('input-group')
      })
      $('#search_keyword_new').blur(function() {
        if ($(document).scrollTop()) {
          return
        }
        $('#input-group')
          .removeClass('input-group-langer')
          .addClass('input-group')
        $('#selection-bar').show()
      })
    },
    navEvent: function() {
      var pathname = window.location.pathname
      if ($('body').attr('data-index') == '1') {
        cb(0)
      } else {
        switch (pathname) {
          case '/theme_new':
            cb(1)
            break
          case '/hunpin':
            cb(6)
            break
          case '/bai_ke':
            cb(5)
            break
          case '/ask':
            cb(5)
            break
          case '/community':
            cb(5)
            break
          case '/meitu':
            cb(6)
            break
          case '/mv':
          case '/mv/':
            cb(6)
            break
          case '/video':
            cb(6)
            break
        }
      }
      function cb(index) {
        $('.selection-item')
          .eq(index)
          .css('border-bottom-color', '#f83244')
        if (index == 5 || index == 6) {
          $('.selection-item')
            .eq(index)
            .find('.selection-item-labeldown')
            .css('color', '#f83244')
            .addClass('selection-item-labeldown-click')
        } else if (index == 1) {
          $('.selection-item')
            .eq(index)
            .find('.selection-item-labeldown .selection-link')
            .css('color', '#f83244')
          $('.selection-item')
            .eq(index)
            .find('.selection-item-labeldown')
            .addClass('selection-item-labeldown-click')
        } else {
          $('.selection-item')
            .eq(index)
            .find('.selection-link')
            .css('color', '#f83244')
        }
      }
    },
    init: function() {
      // 滚动事件
      optsHeader.navEvent()
      optsHeader.scrollEvent()
      $(window).scroll(function() {
        optsHeader.scrollEvent()
      })
      // 输入框事件
      // optsHeader.inputEvent()
      optsHeader.login()
    }
  }
  optsHeader.init()
})
