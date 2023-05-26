$('.tabclose-area').click(function() {
  $('.bj-fixed-area')
    .height($(window).height())
    .fadeOut();
});
$('.tab-share-btn').click(function() {
  $('.areaShareLoading').show();
  var tocanvasHtml = document.querySelector('.taplist-area');
  var __canvas = document.createElement('canvas');
  var __width = tocanvasHtml.offsetWidth;
  var __height = tocanvasHtml.offsetHeight;
  var __scale = 1;
  __canvas.width = __width * __scale;
  __canvas.height = __height * __scale;
  __canvas.getContext('2d').scale(__scale, __scale);

  var opts = {
    tainttest: true, //检测每张图片都已经加载完成
    scale: __scale, // 添加的scale 参数
    useCORS: true,
    canvas: __canvas, //自定义 canvas
    logging: true, //日志开关
    width: __width, //dom 原始宽度
    height: __height //dom 原始高度
  };
  html2canvas(document.querySelector('.taplist-area'), opts).then(function(canvas) {
    var areaStirng = canvas.toDataURL('image/jpeg');
    $('.previw-img-area').attr('src', areaStirng);
    $('.bj-fixed-area').fadeIn();
    $('.areaShareLoading').hide();
  });
});
