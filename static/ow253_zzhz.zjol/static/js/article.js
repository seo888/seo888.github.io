(function () {
  var query = {}
  window.location.search.substr(1).split('&').forEach(value => {
    var tempArray = value.split('=')
    query[tempArray[0]] = tempArray[1]
  })

  if (query.from === 'miniZZHZ') {
    var tabList = [
      {
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-1-1.png",
        "selectedIconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-1-2.png"
      },
      {
        "pagePath": "/pages/buying_tools/buying-tools",
        "text": "买房工具",
        "iconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-3-1.png",
        "selectedIconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-3-2.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息列表",
        "iconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-4-1.png",
        "selectedIconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-4-2.png"
      },
      {
        "pagePath": "/pages/user/user",
        "text": "我的",
        "iconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-5-1.png",
        "selectedIconPath": "//zzhz.zjol.com.cn/material/public-resource/wx_miniprogram/zzhz/assets/tabbar-5-2.png"
      }
    ]
    $('.tab_nav').addClass('tab_nav_zzhz').children('ul').html(function () {
      var html = ''
      tabList.forEach(item => {
        html += `
          <li>
            <div data-url="${item.pagePath}">
              <img class="icon-tab" src="${item.iconPath}" />
              <span>${item.text}</span>
            </div>
          </li>
        `
      })
      return html
    }).children().map(function () {
      $(this).children('div:first-child').click(function () {
        var url = $(this).data('url')
        wx.miniProgram.switchTab({
          url: url
        })
      })

      $(this).children('div:first-child').on('touchstart', function () {
        var url = $(this).data('url')
        var curTab = tabList.find(item => {
          return item.pagePath === url
        })
        $(this).addClass('active')
        $(this).children('.icon-tab').attr('src', curTab.selectedIconPath)
      })
      
      $(this).children('div:first-child').on('touchend', function () {
        var url = $(this).data('url')
        var curTab = tabList.find(item => {
          return item.pagePath === url
        })
        $(this).removeClass('active')
        $(this).children('.icon-tab').attr('src', curTab.iconPath)
      })
    })
  }
})();

$(document).ready(function () {
  //top_three
  for (var i = 0; i < $('.video_list>li').length; i++) {
    $('.video_list>li').eq(i).find('span').text(i + 1);
    if (i < 3) {
      $('.video_list>li').eq(i).find('span').addClass('top_three')
    }
  }

  $('.icon-share').on('click', function () {
    $('.share_bg').show()
    $('body').css('overflow-y', 'hidden')
    $('.bdsharebuttonbox').css('bottom', 0)
  })
  $('.share_bg').on('click', function () {
    $(this).hide()
    $('body').removeAttr('style')
    $('.bdsharebuttonbox').css('bottom', '-58px')
  })

  var on = false
  $('.mores').click(function () {
    if (!on) {
      $(this).addClass('mores-active')
      $('.more-list').slideDown(300)
      on = !on
    } else {
      $(this).removeClass('mores-active')
      $('.more-list').slideUp()
      on = !on
    }
  })

  if ($('body').width() <= 768) {
    for (var i = 0; i < $('.atricle_inner').find('img').length; i++) {
      $('.atricle_inner').find('img').eq(i).removeAttr('height')
      $('.atricle_inner').find('img').eq(i).removeAttr('style')
    }
  }

  //微信分享导读图url(300px以内正方形)：必填
  var imgUrl = 'http://zzhz.zjol.com.cn/material/public-resource/img/share-logo.png';
  //获取本页面地址作为分享指向链接(重要!!!!)
  var lineLink = window.location.href;
  //微信分享摘要（35字以内）：必填
  var descContent = $('.abstract-word').text().trim();
  //微信分享标题(23字以内)：必填
  var shareTitle = $('.atricle_title').text().trim();
  //对应频道的id：必填
  var appid = '';
  //以下内容不需要编辑
  function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
      "appid": appid,
      "img_url": imgUrl,
      "img_width": "120",
      "img_height": "120",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function (res) {
      _report('send_msg', res.err_msg);
    })
  }
  function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
      "img_url": imgUrl,
      "img_width": "120",
      "img_height": "120",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function (res) {
      _report('timeline', res.err_msg);
    });
  }
  function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {

      "content": descContent,
      "url": lineLink,
    }, function (res) {
      _report('weibo', res.err_msg);
    });
  }
  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
      shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
      shareWeibo();
    });
  }, false);
})