/*
 * @Author: libing 
 * @Date: 2018-10-08 15:33:33 
 * @Last Modified by: libing
 * @Last Modified time: 2019-12-30 21:23:56
 */

//debug
(function() {
  if (localStorage.lzdebug && localStorage.lzdebug == 1) {
    var hm = document.createElement("script");
    hm.src = "https://static.jstv.com/ui/common/file/vconsole.min.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  }
})();

//百度统计代码
var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?0887eca0f2b20577c39d04671f83ed53";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();


(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
      return false;
  }
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    w[n].para = para;
    y.parentNode.insertBefore(x, y);
  }
})({
  sdk_url: 'https://static.jstv.com/ui/common/file/sensorsdata.min.js',
  heatmap_url: 'https://static.jstv.com/ui/common/file/heatmap.min.js',
  name: 'sensors',
  server_url: 'https://importdata.jstv.com/sa?project=production',
  heatmap:{}
});

var metaKeyWords =document.getElementsByTagName('meta'), metaKeyWordsContent='';
for (var i = 0; i < metaKeyWords.length; i++){
	if (metaKeyWords[i].name == 'keywords') {
		metaKeyWordsContent = metaKeyWords[i].content;
	}
}

window.onload = function () {
  var _menu = '';
  if(typeof(_gsChannel)!='undefined'){_menu=_gsChannel}
  sensors.quick('autoTrack', {
    key_words: metaKeyWordsContent,
    menu: _menu
  });
}