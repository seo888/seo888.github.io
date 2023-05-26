function getDate() {
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = myDate.getMonth() + 1; //获取当前月
  var date = myDate.getDate(); //获取当前日
  var week = myDate.getDay();
  var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  //判断是否在前面加0
  function getNow(s) {
    return s < 10 ? '0' + s : s;
  }
  var now = year + '-' + getNow(mon) + "-" + getNow(date) + " ";
  $(".header-time").html('<span>' + year + '年' + mon + '月' + date + '日</span>' + '<span>' + weeks[week] + '</span>');
}
$(function() {
  getDate()
})

//  插入广告方法 ---  三种方法
function ggimg(sr, url, wih, hei, zwid, alt, c) {
  var imggg = '<div><a href="' + url + '" target="_blank" class="' + c + '" ><img src="' + sr + '" width="' + wih + '" height="' + hei + '"  alt="' + alt + '" border="0" /></a></div>';
  var ganggaoid = document.getElementById(zwid);
  if (ganggaoid) {
    ganggaoid.innerHTML = imggg;
  }
}

function ggimgv2(sr, url, wih, hei, zwid, alt, c) {
  var imggg = '<span><a href="' + url + '" target="_blank" class="' + c + '" ><img src="' + sr + '" width="' + wih + '" height="' + hei + '"  alt="' + alt + '" border="0" /></a></span>';
  var ganggaoid = document.getElementById(zwid);
  if (ganggaoid) {
    ganggaoid.innerHTML = imggg;
  }
}

function ggimgv3(sr, zwid) {
  var imggg = '<span>' + sr + '</span>';
  var ganggaoid = document.getElementById(zwid);
  if (ganggaoid) {
    ganggaoid.innerHTML = imggg;
  }
}
// 插入广告方法结束
// ggimg("http://f2.zj.chinanews.com/skin/zj/images/life.png", "", "1160", "120", "ind_b06", "广告1", 'adsense');
// ggimgv3("·<A href ='http://www.zj.chinanews.com/qt/zxjzkqt/2019-09-23/detail-ifzpehen1609476.shtml'><span style='color:#FFFFFF'>（广告位）浙江青田“稻鱼之恋”谱写富农富民交响曲</span><a/>· <A href ='http://www.zj.chinanews.com/qt/zxjzkqt/2019-09-23/detail-ifzpehen1609465.shtml'><span style='color:#FFFFFF'>“醉浓青田”2019咖啡音乐节火热举行</span></a>·<A href ='http://www.zj.chinanews.com/qt/zxjzkqt/2019-09-18/detail-ifznxzrc9382545.shtml'><span style='color:#FFFFFF'>五洲同乐过中秋 侨乡青田举行乡村华侨风情节</span></a>", "ind_c01");
// ggimgv2("http://f2.zj.chinanews.com/skin/zj/images/footerr.png", "http://www.zt.zj.com/cns/2013zxszjfsjj/", "475", "85", "ind_a11", "广告4-3", 'footerr');