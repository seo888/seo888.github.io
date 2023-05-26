function rans(len) {
  if (localStorage.getItem('rans')) {
    return localStorage.getItem('rans')
  } else {
    len = len || 32
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = $chars.length
    var pwd = ''
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    localStorage.setItem('rans', pwd)
    return pwd
  }
}

// 异步获取visitorId方法
async function getFingerprint() {
  // 修复visitorID逻辑，这块暂时不用fingerPrint,会出现相同机型生成的id相同的情况
  // let visitorId = localStorage.getItem('visitorId')
  // if (visitorId) {
  //   return visitorId
  // } else {
  //   const fpPromise = await FingerprintJS.load()
  //   const result = await fpPromise.get()
  //   localStorage.setItem('visitorId', result.visitorId)
  //   return result.visitorId
  //   // Get the visitor identifier when you need it.
  // }
  return rans(32)
}

function Statistic() {}

Statistic.prototype = {
  sdkData: async function (appName, params, _met, _error, header = {}) {
    // 如果存在visitorId,对rand_id进行替换
    let visitorId = await getFingerprint()
    if (visitorId) {
      if (params) {
        if (params.element_data) {
          if (params.element_data.ext) {
            if (params.element_data.ext.rand_id) {
              params.element_data.ext.rand_id = visitorId
            }
          }
        }
      }
    }
    var data = '{"events":[' + JSON.stringify(params) + ']}'
    $.ajax({
      url: (function () {
        return /(m|www|admin|hotel).hunliji.com/i.test(window.location.hostname)
          ? '//logs.hunliji.com/v2/api/app/tracker/batch.json'
          : 'https://log7.hunliji.com/v2/api/app/tracker/batch.json'
      })(),
      type: 'post',
      data: data,
      headers: { appName: appName, ...header, 'content-type': 'text/plain; charset=utf-8' },
      success: function () {
        _met && _met()
      },
      error: function () {
        _error && _error()
      },
    })
  },
  rans: function (len) {
    if (localStorage.getItem('rans')) {
      return localStorage.getItem('rans')
    } else {
      len = len || 32
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = $chars.length
      var pwd = ''
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      localStorage.setItem('rans', pwd)
      return pwd
    }
  },
  sdk: function (appName, _pageName, _action, _element_tag, _userId, _data_id, _data_type, ext) {
    var $this = this
    var url = window.location.href

    $.ajax({
      url: 'https://www.hunliji.com/sms/ip',
      type: 'get',
      success: function (result) {
        var params = {
          page_name: _pageName,
          event_type: _action == 'view' ? 'element_view' : _action == 'hit' ? 'element_hit' : _action,
          element_parent_tag: '',
          user_city: result,
          user_id: _userId,
          element_tag: _element_tag,
          element_data: {
            data_id: _data_id || $this.rans(32),
            data_type: _data_type,
            cpm_source: '',
            cpm_flag: '',
          },
        }

        if (ext) {
          params.element_data.ext = ext
        }

        $this.sdkData(appName, params)
      },
    })
  },
}

var STATIC = new Statistic()
