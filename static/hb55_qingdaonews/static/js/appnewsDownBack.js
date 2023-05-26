var u = navigator.userAgent;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
function isWeixin() {
  return /MicroMessenger/gi.test(navigator.userAgent);
}
 getInfo();
isWeex();
 function isWeex() {
   var link = document.getElementsByTagName('a');
   for(var i = 0;i<link.length;i++){
     if(link[i].href.indexOf("weex.qingdaonews.com") > -1 || link[i].href.indexOf("appnews.qingdaonews.com/assets/tips/tips.html") > -1){
       link[i].href = 'javascript:;';
       link[i].classList.add("js_appnewsDownBtn");
     }
   }
 }
//获取屏幕的宽和高
function getInfo() {
  var url = window.location.href;
  var url = url;
  if(url.indexOf("qingdaonews.com") < 0) {
    return false;
  }
  var width = window.innerWidth;
  var height = window.innerHeight;
  var data = {
    'link': url,
    'screen': '' + height + '-' + width + '',
  };
  ajax({
    url: 'https://appnews.qingdaonews.com/operate/open/newwap', // 请求地址
    jsonp: 'jsonpCallback', // 采用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串
    data:data,// 传输数据
    success: function(res) { // 请求成功的回调函数
      if(getQueryString("backtype") == '1'){
		  var loadDateTime = new Date();
			timer = window.setTimeout(function() {
			  var timeOutDateTime = new Date();
			  var t = timeOutDateTime - loadDateTime;
			  if (t < 5000) {
				//跳转的APP下载链接
				window.location.href = 'http://app.qingdaonews.com/d/wap/index.html';
			  } else {
				window.close();
			  }
			}, 2000);
			window.location.href = res.result.urlsheme;
			//window.location.href = res.result.urlsheme;
			bindClick(res.result);
      } else if(getQueryString("wxbacktype") == '1'){
        if(isWeixin()){
          if(res.result.client == 'iphone'){
            addFc();
          }
          if(res.result.client == 'android'){
              window.location.href = res.result.androidb;
          }
        } else {
          if(res.result.client == 'iphone'){
            window.location.href = res.result.ulink;
          }
          if(res.result.client == 'android'){
              window.location.href = res.result.urlsheme;
          }
        }
        bindClick(res.result);
      } else {
        bindClick(res.result);
      }
    },
    error: function(error) {} // 请求失败的回调函数
  });
}
//获取URL参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function bindClick(data) {
  var adom = document.getElementsByClassName('js_appnewsDownBtn');
    // var url = window.location.href;
    for (var i = 0; i < adom.length; i++) {
      adom[i].addEventListener('click', function() {
        // alert("请在浏览器中打开");
          if(isWeixin()){
            if (data.client == 'iphone'){
              if(getQueryString("backtype") == '1' || getQueryString("wxbacktype") == '1'){
                addFc();
              }else {
                window.location.href = data.ulink;
              }
            }
            if(data.client == 'android'){
                window.location.href = data.androidb;
            }
          } else {
            if(data.client == 'iphone'){
              if(getQueryString("backtype") == '1'){
                var loadDateTime = new Date();
                timer = window.setTimeout(function() {
                  var timeOutDateTime = new Date();
                  var t = timeOutDateTime - loadDateTime;
                  if (t < 5000) {
                    //跳转的APP下载链接
                    window.location.href = 'http://app.qingdaonews.com/d/wap/index.html';
                  } else {
                    window.close();
                  }
                }, 2000);
                window.location.href = data.urlsheme;
              } else {
                window.location.href = data.ulink;
              }
			}else if (data.client == 'android'){
			//} else {
              var loadDateTime = new Date();
              timer = window.setTimeout(function() {
                var timeOutDateTime = new Date();
                var t = timeOutDateTime - loadDateTime;
                if (t < 5000) {
                  //跳转的APP下载链接
                  window.location.href = 'http://app.qingdaonews.com/d/wap/index.html';
                } else {
                  window.close();
                }
              }, 2000);
              window.location.href = data.urlsheme;
            }else{
			  var loadDateTime = new Date();
              timer = window.setTimeout(function() {
                var timeOutDateTime = new Date();
                var t = timeOutDateTime - loadDateTime;
                if (t < 5000) {
                  //跳转的APP下载链接
                  window.location.href = 'http://app.qingdaonews.com/d/wap/index.html';
                } else {
                  window.close();
                }
              }, 2000);
              if (data.urlsheme) {
                window.location.href = data.urlsheme;
              }
			}
          }
      });
    }
}
function ajax(params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : json(params);
  // jsonp请求
  function jsonp(params) {
    //创建script标签并加入到页面中
    var callbackName = params.jsonp;
    var head = document.getElementsByTagName('head')[0];
    // 设置传递给后台的回调参数名
    params.data['callback'] = callbackName;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);
    //创建jsonp回调函数
    window[callbackName] = function(json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };
    //发送请求
    script.src = params.url + '?' + data;
    //为了得知此次请求是否成功，设置超时处理
    if (params.time) {
      script.timer = setTimeout(function() {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: '超时'
        });
      }, time);
    }
  };
  //格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    };

    // 添加一个随机数，防止缓存
    arr.push('v=' + random());
    return arr.join('&');
  }

  // 获取随机数
  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}
//提示浮层
function addFc() {
  if (document.getElementsByClassName('fcBox').length <= 0) {
      var div = document.createElement("div");
      div.innerHTML = '<div class="fcBox" style="position: fixed;top:0px;left:0px;right:0px;bottom:0px;background-color:rgba(0,0,0,0);z-index:9999 !important;">\
                      <img src="http://appnews.qingdaonews.com/assets/tips/img/backFc.png" alt="" class="js_backclose" style="display:block;position:absolute;top:0px;width:100%;right:0px;height:auto;">\
                      </div>';
      document.body.appendChild(div);
      backclose();
  }
}
// 关闭浮层
function backclose() {
  var adom = document.getElementsByClassName('js_backclose');
  var fcDemo  = document.getElementsByClassName('fcBox');
  adom[0].addEventListener('click', function() {
      fcDemo[0].remove();
  });
}

// 修改url参数不刷新页面(暂时不用)
function replaceParamVal(paramName,replaceWith) {
    var oUrl = this.location.href.toString();
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    history.pushState({status: 0},'',nUrl);
    // alert(window.location.href);
      // alert('222');
      // window.location.hash = '#/test1';
      // window.onhashchange = function(e){
      // 	alert(window.location.href);
      // }
}
