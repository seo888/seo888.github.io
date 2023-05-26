//移动适配
mobileRedirect();
function mobileRedirect(){
  if(navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)){
    var href = location.href,mUrl="https://m.nbegame.com";
    var siteName = window.location.pathname;
    window.location.href = mUrl + siteName;
  }
}