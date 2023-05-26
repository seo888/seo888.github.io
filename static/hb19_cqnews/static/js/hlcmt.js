!function(){
  var allReadys = (function() {
      var funcs = [];
      var ready = false;
      
      function handler(e) {
          if(ready) return;
          if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
              return;
          }
          for(var i=0; i<funcs.length; i++) {
              funcs[i].call(document);
          }
          ready = true;
          funcs = null;
      }
      
      if(document.addEventListener) {
          document.addEventListener('DOMContentLoaded', handler, false);
          document.addEventListener('readystatechange', handler, false);
          window.addEventListener('load', handler, false);
      }else if(document.attachEvent) {
          document.attachEvent('onreadystatechange', handler);
          window.attachEvent('onload', handler);
      }
      
      return function allReadys(fn) {
          if(ready) { fn.call(document); }
          else { funcs.push(fn); }
      }
  })();
  
  function loading(url,type,callback){
    var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
    if(type === 'css'){
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      head.appendChild(link);
      callback();
    }
    if(type === 'js'){
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = script.onreadystatechange = function(){
           if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
                script.onload = script.onreadystatechange = null;
                if(callback){callback();}
           }
        }
      head.appendChild(script);
    }
  } 
  
  var ua = window.navigator.userAgent;
  if (ua.indexOf("CQ_XHL") > 0) {
      //在重庆APP内打开
  } else {
      //不是在重庆APP内打开
      function loads(){
        var hl = document.getElementById('hualong');
      if(hl && hl.getAttribute('sid')){
        loading(window.location.protocol + '//p.wts.xinwen.cn/dot-wts/spm.js','js');
        
        loading(window.location.protocol + '//cmt.cqnews.net/template/css/cmt.css','css',function(){
          if(!window.jQuery){
            loading(window.location.protocol + '//cmt.cqnews.net/template/js/template.jq.js','js',function(){
              loading('js/cmt.min.js','js');
            });
          }else{
            loading(window.location.protocol + '//cmt.cqnews.net/template/js/template.js','js',function(){
              loading(window.location.protocol + '//cmt.cqnews.net/template/js/cmt.min.js','js');
            });
          }
        });
      }else{
        if(window.console){console.log('未发现评论或未填写sid')}
      }
      }

      if(window.common && document.getElementById('_h5_box') && ua.match(/(iPhone|iPod|Android|ios|iPad)/i)){
        loads();
      }else{
        allReadys(loads);
      }   
  }
}()
