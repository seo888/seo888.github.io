function initFingerprintJS() {
  // Initialize an agent at application startup.
  const fpPromise = FingerprintJS.load()

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => {
      // 获取visitorId
      var visitorId = result.visitorId
      // 此处输出ok
    })
}

async function requestHeader(type, url, data) {
  var fp = await FingerprintJS.load()
  var result = await fp.get()
  var visitorId = result.visitorId
  // 此处输出ok
  var phoneToken = visitorId
  const clientId = "Bq1ariox4QMSzHLZIjpDPNl2RUWkwfbt"
  const timestamp = Date.parse(new Date()).toString() // 时间戳精确到秒
  let str =
    type +
    url +
    (type === "GET" ? constgetparam(data) : JSON.stringify(data)) +
    clientId + //clientId
    timestamp //时间戳
  const sha1Str = sha1(str)
  return {
    signature: sha1Str, // sha1签名
    timestamp: timestamp, // 时间戳
    phoneToken: phoneToken,
    "Content-type": "application/json",
  }
}
// 处理请求参数方法
function constgetparam(obj) {
  let str = "?"
  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] == null || obj[key] == undefined || obj[key] === "")
    ) {
    } else {
      str += key + "=" + obj[key] + "&"
    }
  }
  str = str.substr(0, str.length - 1)
  // get请求中文对验签生成的会有影响，做一次转码
  return encodeURI(str)
}
