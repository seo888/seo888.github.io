(function(){
  var s_3721 = document.createElement("script");
  var refs_3721 = document.referrer;
  var parts = null;
  s_3721.type = "text/javascript";
  s_3721.async = true;
  if( refs_3721.indexOf("http") != -1){
  parts = refs_3721.split("?");
  if( parts != null && parts.length > 1 ){ refs_3721 = parts[0]; }
  }
  s_3721.src = "//trace.ynet.com/tj_tool.js?ref="+refs_3721+"&title="+encodeURI(document.title);
  var x_3721 = document.getElementsByTagName("script")[0];
  x_3721.parentNode.insertBefore(s_3721, x_3721); })();