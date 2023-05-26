function lazyloadFun(obj,scrollCallback) {
  var cla = obj.cla || 'img';
  var defa = obj.defa || 'lazy-load';
  var container = obj.container || 'body';
  var n = 0;
  $(container + ' .m-ct img').each(function(){
    $(this).attr({
      "data-original": $(this).attr("src")
    });
    $(this).addClass(defa);
  })
  var imgNum = $(container + ' ' + cla).length,
      img = $(container + ' ' + cla),
      imgDivs = [];
  $(container + ' ' + cla).each(function() {
    if ($(this).css("opacity") == '0' || $(this)[0].tagName != "IMG") {
      return
    } else {
      if (!$(this).attr("data-original")) {
        $(this).attr({
          "data-original": $(this).attr("src")
        });
      }
      $(this).addClass(defa);
      var _this = $("<div />");
      _this.attr("data-original", $(this).attr("data-original"));
      _this.attr("class", $(this).attr("class"));
      _this.css("width", $(this).css("width"));
      _this.css("height", $(this).css("height"));
      _this.css("position", $(this).css("position"));
      _this.css("display", $(this).css("display"));
      _this.css("float", $(this).css("float"));
      _this.css("margin", $(this).css("margin"));
      _this.css("top", $(this).css("top"));
      _this.css("left", $(this).css("left"));
      if($(this).parents(".m-ct")[0]){
        _this.css("margin", "0 auto");
      }
      $(this).after(_this);
      imgDivs.push(_this);
      $(this).css({
        "display": 'none'
      });
    }

  })
  // 简单的节流函数
  //fun 要执行的函数
  //delay 延迟
  //time  在time时间内必须执行一次
  function throttle(fun, delay, time) {
    var timeout,
      startTime = new Date();
    return function() {
      var context = this,
        args = arguments,
        curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= time) {
        fun.apply(context, args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(fun, delay);
      }
    };
  };
  // 采用了节流函数
  // window.addEventListener('scroll', throttle(lazyload, 500, 1000));
  // $(window).bind("scroll",throttle(lazyload, 500, 1000));
  addListener(window, "scroll", throttle(lazyload, 500, 1000));
  // window.addEventListener('scroll',lazyload);
  $(window).resize(lazyload);
  // lazyload();
  $(document).ready(function(){
    lazyload();
  });
  function lazyload(event) {
    for (var i = 0; i < imgNum; i++) {
      if ($(imgDivs[i])[0] && $(imgDivs[i]).offset().top <= parseInt($(window).height()) + $(window).scrollTop()) {
        if ($(imgDivs[i]).hasClass(defa)) {
          var _img = img.eq(i);
          var src = _img.attr("data-original");
          _img.attr("src", src).css({"opacity":'0'}).show();
          _img.css({"opacity":'1'});
          // _img.removeClass(defa);
          _img.next("div.lazy-load").remove();
        }
      }
    }
    scrollCallback();
  }
}
