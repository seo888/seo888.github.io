$(function () {
  // 分站详情页广告
  let data = "";
  var ua = window.navigator.userAgent;
  if (/Mobile|iP(hone|ad)|Android|BlackBerry|IEMobile/.test(ua)) {
    //   ad('https://misc.eol.cn/js/target/move/sjdzgjyzx/sjdEOLsy/406.json', true)
  } else {
    ad("https://misc.eol.cn/js/target/pc/zgjyzx/dffzwzy/320.json");
  }

  function ad(url, isMobile) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function (res) {
        // console.log(res)
        data = res.data;
        console.log(data);

        if (isMobile) {
        } else {
          ad1("10543", data);
          ad2("10544", data);
        }
      },
    });
  }
});

function ad1(adid, data) {
  console.log(adid, data);
  var template = "";
  if (!data[adid]) return false;

  data[adid].forEach(function (item) {
    // console.log(item)
    if (!item) return false;

    template +=
      '<a href="' +
      item.href +
      '" data-publish ="' +
      item.publish_id +
      '"><img src="' +
      item.img +
      '"></a>';
  });

  $("#ad1").html(template);
}

function ad2(adid, data) {
  var template = "";
  if (!data[adid]) return false;

  data[adid].forEach(function (item) {
    // console.log(item)
    if (!item) return false;

    template +=
      '<a href="' +
      item.href +
      '" data-publish ="' +
      item.publish_id +
      '"><img src="' +
      item.img +
      '"></a>';
  });

  $("#ad2").html(template);
}
