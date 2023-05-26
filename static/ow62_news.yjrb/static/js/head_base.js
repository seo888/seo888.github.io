// 放头部的公共js
var idConvertPath = function (id, separate) {
  if (!separate) {
    separate = "/";
  }
  if (!id) {
    return id;
  }
  id = id + "";
  while (id.length < 9) {
    id = "0" + id;
  }
  var part1 = id.substring(0, id.length - 6);
  var part2 = id.substring(id.length - 6, id.length - 3);
  var part3 = id.substring(id.length - 3, id.length);
  var path1 = parseInt(part1) % 255;
  var path2 = parseInt(part2) % 255;
  var path3 = parseInt(part3) % 255;

  return separate + path1 + separate + path2 + separate + path3 + separate;
};
$(function (){
  // 顶上二维码
  $('.quick-link a:first-child').hover(function(){
    $('.qr-box',this).stop().slideDown('fast');
  },function(){
    var $self = $('.qr-box',this);
    $self.stop().slideUp('fast');
  })
  $('#nav_wx').hover(function(){
    $('#qr_list',this).stop().slideDown('fast');
  },function(){
    var $self = $('#qr_list',this);
    $self.stop().slideUp('fast');
  });

  $('#qr_list p').hover(function(){
    var index = $('#qr_list p').index($(this));
    var img = $('#wx_qrs img');
    var src = img.attr('src');
    var arr = src.split('/');
    arr[arr.length-1] = 'gzh_qr'+index+".png";
    src = arr.join('/');
    img.attr('src',src);
    $('#wx_qrs').show();
  },function(){
    $('#wx_qrs').hide();
  })
//  点击搜索
  $('#search_btn').click(function () {
    var val = $('#search').val();
      search(val);
  });
  $('#mb_searchbtn').click(function(){
    var val = $('#mb_search').val();
      search(val);
  });
  $('#search').keydown(function (e) {
    var val = $(this).val();
    if(e.keyCode == 13){
        search(val);
    }
  });
  function search(val){
      if(val){
          window.open(tycom.htmlUrl.search+'?text='+val);
      }else{
          window.open(tycom.htmlUrl.search)
      }
  }

  //  左上角时间
  var Now_Date = new Date();
  var year = Now_Date.getFullYear();
  $('#year').text(year+'年');
  var month = DateFormat(Now_Date.getMonth()+1);
  var date = DateFormat(Now_Date.getDate());
  var week = Now_Date.getDay();
  var week_str = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  $('#date').text(month+'月'+date+'日')
  var timeStr = year+'年'+(Now_Date.getMonth()+1)+'月'+Now_Date.getDate()+'日  '+week_str[week];
  $('#full_date').text(timeStr);
  //  详情页时间
  $("#c_time").text(timeStr)
  function DateFormat(n) {
    if(n<10){
      return '0'+n;
    }else{
      return n;
    }
  }
})
