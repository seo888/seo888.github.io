//生成二维码
var locationHref = window.location.href;
// var locationHref = "http://news.haiwainet.cn/n/2022/0216/c3543307-32342913.html";
$("#urlqr").qrcode({
  render: 'canvas',
  width: 101,
  height: 101,
  text: locationHref
});

//触屏版链接处理
if($('.phone .chuping').is("a")){
  var reg=/\d+/ig;
  var chuping_array = locationHref.match(reg);

  var chuping_url = 'https://m.haiwainet.cn/middle/';
  chuping_url+= chuping_array[2];
  chuping_url+= '/';
  chuping_url+= chuping_array[0];
  chuping_url+= '/';
  chuping_url+= chuping_array[1];
  chuping_url+= '/content_';
  chuping_url+= chuping_array[3];
  if(chuping_array[4]==null || chuping_array[4]==''){
    chuping_url+= '_1.html';
  }else{
    chuping_url+= '_';
    chuping_url+= chuping_array[4];
    chuping_url+= '.html';
  }

  $('.phone .chuping').attr('href',chuping_url);

}


//打开关闭腾讯弹窗
$('.tx').mouseover(function () {
  var top = $(this).offset().top+50;
  var left = $(this).offset().left-38;
  $('.share-popup').css({"top":top,"left":left});
  $('.share-popup').show();
});
$('.tx').mouseout(function () {
  $('.share-popup').hide();
});

/*内容中的视频样式功能替换*/
var videos=[];

$('.video-js').each(function (i) {
    if($(this).not($(".hwwvideo"))){
      var videoSrc = $(this).attr('src');
      var idName='contentVideoBlock'+i;
      var div=document.createElement('div');
      div.id=idName;
      div.style.width='760px';
      div.style.height='425px';
      div.style.marginTop='10px';
      // div.style.marginLeft='-2em';
      $(this).after(div);
      $(this).remove();
      if(videoSrc.indexOf('.mp3') > -1){
        var audio = document.createElement('audio');
        audio.className ="audio-js";
        console.log(videoSrc);
        audio.src = videoSrc;
        audio.controls = true;
        audio.preload="none"
        $(div).after(audio);
        $(div).remove();
        $(audio).parent().attr("style",'');
      }else {
        videos.push(videoObj(videoSrc,idName,''));
      }
      
    }


    
  // if($(this)[0].currentSrc.indexOf('xml') > -1){
  //   videos.push({
  //     el: idName,
  //     ev: "web",
  //     videoSrc: videoSrc,
  //     sourceType: "video/mp4",
  //     poster: "{$thumb}",
  //     type: "vms"
  //   })
  // }else if($(this)[0].currentSrc.indexOf('.mp4') > -1){
  //   videos.push({
  //     el: idName,
  //     ev: "web",
  //     videoSrc: videoSrc,
  //     sourceType: "video/mp4",
  //     poster: "{$thumb}",
  //     type: "mp4"
  //   })
  // }
});
if($("#videoBox").length > 0 ){
    var videoSrcS = $('#videoBox').attr('data-src');
    var videoBoxPaster = $('#videoBox').attr('data-poster')
    var videoAry=videoSrcS.split("|");
    var box=document.getElementById("videoBox");
    for(var i=0;i<videoAry.length;i++){
              var videoblockName='videoblock'+i;
              var div=document.createElement('div');
              div.id=videoblockName;
              div.style.width='760px';
              div.style.height='425px';
              div.style.marginTop='10px';
              box.appendChild(div);
              videos.push(videoObj(videoAry[i],videoblockName,videoBoxPaster));
    }
};
console.log(videos);
createVideo(videos);


function videoObj(url,idName,poster){
   if(url.indexOf('xml') > -1){
    return {
      el: idName,
      ev: "web",
      videoSrc: url,
      sourceType: "video/mp4",
      poster: poster,
      type: "vms"
    }
  }else if(url.indexOf('.mp4') > -1){
    return {
      el: idName,
      ev: "web",
      videoSrc: url,
      sourceType: "video/mp4",
      poster: poster,
      type: "mp4"
    }
  }
} 

/*浮动*/
var fixedShare = $('.share-box');
$(window).scroll(function() {
  var scrollH = $(window).scrollTop();
  if(scrollH>150){         //导航高度
    fixedShare.addClass('fixedShare');
    $("#floatIcon").show();
  }else{
    fixedShare.removeClass('fixedShare');
    $("#floatIcon").hide();
  }
});

/*内容加粗*/
// var P=$(".contentMain p");
// $(P).each(function(){
//   if($(this).text()!='' && $(this).find("strong").text()==$(this).text() ){
//     // $(this).addClass("indent0em");
//     $(this).css("text-indent","0");
//   }
// });

// logo 右侧下拉
$('.menu .download').hover(function(){
  $(this).addClass("on");
  $(this).find('div').slideDown('fast');
},function(){
  $(this).removeClass("on");
  $(this).find('div').hide();
})

//返回顶部
$("#floatIcon .gotop").click(function(){
  gotoTop();
})
function gotoTop(){
  var speed=document.body.offsetHeight/10/1000;
  var acceleration =  0.1;
  var stime =  10;
  var y1 = 0;
  var y2 = 0;
  var y3 = 0;
  if (document.documentElement) {
    y1 = document.documentElement.scrollTop || 0;
  }
  if (document.body) {
    y2 = document.body.scrollTop || 0;
  }

  var y3 = window.scrollY || 0;

  // 滚动条到页面顶部的垂直距离
  var y = Math.max(y1, Math.max(y2, y3));

  // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
  var speeding = 1 + acceleration;
  window.scrollTo(0, Math.floor(y / speeding));

  // 如果距离不为零, 继续调用函数
  if( y > 0) {
    var run = "gotoTop(" + speed+ ")";
0
    t=setTimeout(function(){
      gotoTop(speed)
    }, stime);
  }
}

//面包屑处理   >资讯 > 首页上线前测试 >
var catposAry = $(".catpos").html().split("&gt;");
var catposNew = catposAry.slice(0,1);
$(".catpos").html('>'+catposNew);
$(".catpos").show();
