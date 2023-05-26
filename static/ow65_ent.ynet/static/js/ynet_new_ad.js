if(window.location.href.indexOf('sohu')!==-1) {
 var SrcN = 'http://res1.ynet.com/40/ynet_new_sohu.js';
 }else if(window.location.href.indexOf('wps')!==-1) {
 var SrcN = 'http://res1.ynet.com/40/ynet_new_wps.js';
 }else if(window.location.href.indexOf('ruixing')!==-1) {
 var SrcN = 'http://res1.ynet.com/40/ynet_new_ruixing.js';
 }else if(window.location.href.indexOf('buben')!==-1) {
 var SrcN = 'http://res1.ynet.com/40/ynet_new_buben.js';
 }else{
 switch(window.location.host){
  case 'hot.ynet.com':
  var SrcN = 'http://res1.ynet.com/40/ynet_new_hot.js';
  break;
  case 'china.ynet.com':
  var SrcN = 'http://res1.ynet.com/40/ynet_new_china.js';
  break;
  case 'yule.ynet.com':
  var SrcN = 'http://res1.ynet.com/40/ynet_new_yule.js';
  break;
  default:
  var SrcN = 'http://res1.ynet.com/40/ynet_new_ym.js';
 }
 }
 document.write('<script src="'+SrcN+'"></script>');