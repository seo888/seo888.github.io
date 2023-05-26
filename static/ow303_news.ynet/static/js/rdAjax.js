(function(){
var m=new Date().getMonth()+1;
var time=new Date().getFullYear().toString()+(m<10?'0' +m:m)+new Date().getDate()+parseInt(new Date().getHours()/4);
 /*$.ajax({
 type: 'GET',
 url: ($('#static_url').attr('content')?$('#static_url').attr('content'):'http://res.ynet.com/')+"blqk/rdzj.json?_="+time, <!--修改-->
 dataType: 'json',
 success: function(data) {
 var msg='';
 var total=data.length<20?data.length:20;

 for (var i = 0; i < total; i++) {
 msg += '<li>' +
 '<a href=' + data[i].link + ' class="fLeft">' +
 '<img src=' + data[i].imgs + ' alt=""/>' +
 '</a> ' +
 '<h2> ' +
 '<a href=' + data[i].link + '>' + data[i].title + '</a> ' +
 '<p>' + data[i].dis + '</p> ' +
 '</h2></li>'
 }
 $("#wrap_recommend").append(msg);

 },
 error: function(xhr, type) {
 console.log("error");
 }
 });*/
 $.ajax({
 type: 'GET',
 url: ($('#static_url').attr('content')?$('#static_url').attr('content'):'http://res.ynet.com/')+"blqk/jcjj.json?_="+time, <!--修改-->
 dataType: 'json',
 success: function(data) {
  var msg='';
  var total=data.length<20?data.length:20;

  for (var j = 0;j < total; j++) {
  msg+= '<dd>' +
  '<a href=' + data[j].link + '>' +
  '<img src=' + data[j].imgs + ' alt=""/>' +'<h5>' + data[j].title + '</h5>'+
  '</a></dd>'
  }
  $("#jrtj_recommend").append(msg);

 },
 error: function(xhr, type) {
  console.log("error");
 }
 });

})();