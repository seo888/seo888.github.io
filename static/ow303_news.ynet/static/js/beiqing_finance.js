var autoPlay = {
 adClose:function(iBox) {
  $(iBox).click(function () {
  $(this).parent().css('display', 'none');
  });
  var winWidth=$(window).width()||$(document).width()||$(document.body).width();
  if(winWidth<1400){
  $(iBox).parent().css('display', 'none');
  }
  window.onresize = function() {
  var winWidth=$(window).width()||$(document).width()||$(document.body).width();
  if(winWidth && winWidth<1400){
   $(iBox).parent().css('display', 'none')
  }else{
   $(iBox).parent().css('display', 'block')
  }
  };
 },
 slideShow:function(iBox){//轮播图动画
  var oDiv = $(iBox);
  var arrImg = oDiv.find(".photoImg").attr("value").split(",");
  var arrP = oDiv.find(".photoTitle").attr("value").split(",");
  var arrLink = oDiv.find(".photoLink").attr("value").split(",");
  var arrIntro = oDiv.find(".photoIntro");
  var arrSource = oDiv.find(".photoSource");
  var arrTime = oDiv.find(".photoTime");
  var oScroll = oDiv.find(".scroll");
  var oList = oDiv.find(".scrollBut");
  var oTitle = oDiv.find(".scrollTitle");
  var oUl = $("<ul></ul>");
  var _height =arrImg.length;
  var _index = 2;
  var aLi,aWidth,timer;
  for(var i = 0; i < _height; i++){
  oUl.append('<li></li>');
  oScroll.append('<a href="' + arrLink[i] + '"><img src="'+ arrImg[i]+'"></a>');
  }
  for(var i = 0; i < _index; i++){
  oScroll.append('<a href="' + arrLink[i] + '"><img src="'+ arrImg[i]+'"></a>');
  }
  for(var i = _height-1; i > _height-3; i--){
  oScroll.prepend('<a href="' + arrLink[i] + '"><img src="'+ arrImg[i]+'"></a>');
  }
  oList.append(oUl);
  aLi = oDiv.find("ul li");
  aWidth = oScroll.find("img").outerWidth(true);
  move();
  //鼠标移入效果
  aLi.mouseover(function(){
  _index=$(this).index()+2;
  move();
  });
  //左边按钮
  oDiv.find(".prevButton").click(function(){
  _index--;
  if(_index<2){
   _index=_height+1;
   oScroll.css("left",-aWidth*(_height+2) + "px");
  }
  move();
  });
  //右边按钮
  oDiv.find(".nextButton").click(function(){
  auto();
  });
  function move(){
  oTitle.show();
  if(arrIntro.length > 0){
   var arrIntro_value = arrIntro.attr("value").split(",");
   var arrSource_value = arrSource.attr("value").split(",");
   var arrTime_value = arrTime.attr("value").split(",");
   oTitle.html('<p><a href="' + arrLink[_index-2] + '">'+ arrP[_index-2] +'</a></p><p class="photo_intro">'+ arrIntro_value[_index-2] +'</p><p class="photo_source"><span>'+ arrSource_value[_index-2] +'</span><span>'+ arrTime_value[_index-2] +'</span></p>');
  }else{
   oTitle.html('<p><a href="' + arrLink[_index-2] + '">'+ arrP[_index-2] +'</a></p>');
  }
  aLi.eq(_index-2).addClass('cur').siblings('li').removeClass('cur');
  oScroll.animate({left:-_index*aWidth},500);
  }
  function auto(){
  _index++;
  if(_index>_height+1){
   _index=2;
   oScroll.css("left",-aWidth + "px");
  }
  move();
  }
  timer = setInterval(auto, 3000);
  $(iBox).hover(function(){
  clearInterval(timer);
  },function(){
  timer = setInterval(auto, 3000);
  });
 },
 /*	
  gotoTop:function(){
  var winHeight = $(window).height();
  var gotoTophtml = '<a id="gotoTop"></a>';
  $("body").append(gotoTophtml);
  $("#gotoTop").click(function(){
   $('html,body').animate({scrollTop:0},700);
  });
  $(window).scroll(function(){
   var _scrollTop = $(window).scrollTop();
   if( _scrollTop > 600){
   $("#gotoTop").fadeIn(100);
   if(_scrollTop + winHeight >= $(".navBar").height() + $(".cul_box").height()+$(".navBar_height").height()){
   var distance=$('body').height()-( $(".navBar").height()+$(".cul_box").height()+21);
    $("#gotoTop").css("bottom",distance);
   }else{
    $("#gotoTop").css("bottom","0");
   }
   }else{
   $("#gotoTop").fadeOut(200);
   };
  });
  },
  gotoTop_index:function(){
  var winHeight = $(window).height();
  var gotoTophtml = '<a id="gotoTop"></a>';
  $("body").append(gotoTophtml);
  $("#gotoTop").click(function(){
   $('html,body').animate({scrollTop:0},700);
  });
  $(window).scroll(function(){
   var _scrollTop = $(window).scrollTop();
   if( _scrollTop > 600){
   $("#gotoTop").fadeIn(100);
   if(_scrollTop + winHeight >= $(".headerTop_127").height() + $(".bq_ad").height() + + $(".mainContent").height() + $(".cul_box").height()){ 
    var distance=$('body').height()-($(".headerTop_127").height() + $(".bq_ad").height() + + $(".mainContent").height() + $(".cul_box").height());
    $("#gotoTop").css("bottom",distance);
   }else{
    $("#gotoTop").css("bottom","0");
   }
   }else{
   $("#gotoTop").fadeOut(200);
   };
  });
  },
 */
//一键置顶
 gotoTop:function(){
  var winHeight = $(window).height();
  var gotoTophtml = '<a id="gotoTop"></a>';
  $("body").append(gotoTophtml);
  $("#gotoTop").click(function(){
  $('html,body').animate({scrollTop:0},700);
  });
  $(window).scroll(function(){
  var _scrollTop = $(window).scrollTop();
  var _footerTop = $(".bq_footer").outerHeight(true) + $(".bq_links").outerHeight(true);
  if( _scrollTop > 600){
   $("#gotoTop").fadeIn(100);
   if(_scrollTop + winHeight >= $(".headerTop_127").height() + $(".cul_header").height() + $(".cul_box").height()+ $(".bq_ad").height() + $(".mainContent").height()){
   $("#gotoTop").css("bottom",_footerTop + 55);
   }else{
   $("#gotoTop").css("bottom","0");
   }
  }else{
   $("#gotoTop").fadeOut(200);
  };
  });
 },
 headerTop:function(idBox){
  $(window).load(function(){
  var phbCon = $(idBox);
  var phbOffSetTop = phbCon.offset().top;
  $(window).scroll(function(){
   var scrollTop = $(window).scrollTop();
   if( scrollTop >= phbOffSetTop ){
   phbCon.css({"position": "fixed", "top": "0", "z-index": "1001"});
   }else{
   phbCon.css({"position": "static"});
   }
  });

  });
 },
 tab:function(iBox){//tab
  var aLi = $(iBox).find(".cul_title li");
  var aDiv = $(iBox).find(".cul_column");
  aDiv.css("display","none");
  aLi.eq(0).addClass("active");
  aLi.eq(aLi.length-1).css("borderRight","none");
  aDiv.eq(0).show();
  aLi.click(function(){
  $(this).addClass("active").siblings("li").removeClass("active");
  var index = aLi.index(this);
  aDiv.eq(index).show().siblings(".cul_column").hide();
  });
 },
 share:function(){
  var oWeiBo = $("#weiBo");
  var oKongJian = $("#kongJian");
  var oWeiXin = $(".fin_newsBox .shareBox a.weixin");
  var oClose = $(".shareBox .dialogBox .dialogClose");
  oWeiBo.attr('href','http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href + '?from=pc,weibo'));
  oKongJian.attr('href','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href + '?from=pc,qzone'));
  oWeiXin.click(function(){
  if (!$(".fin_newsBox .dialogBox em").html()) {
   $(".fin_newsBox .dialogBox em").qrcode(location.href);
  }
  $(".fin_newsBox .dialogBox h3").html("分享到微信朋友圈");
  $(".fin_newsBox .dialogBox p").html("使用“扫一扫”即可将网页分享到朋友圈");
  $(this).next(".dialogBox").show();
  $(this).addClass("wxHover");
  });
  oClose.click(function(){
  $(this).parent(".dialogBox").hide();
  oWeiXin.removeClass("wxHover");
  });
 },
 slideShow_zk:function(idBox){//高清幻灯片
  var oPrev = $(idBox).find(".prev");
  var oNext = $(idBox).find(".next");
  var oDiv = $(idBox).find(".fin_slideImg");
  var oSum = $(idBox).find(".fin_sum");
  var oTotal = $(idBox).find(".fin_total");
  var arrSrc = $(idBox).find(".photoImg").attr("value").split(",");
  var arrText = $(idBox).find(".photoText").attr("value").split(",");
  var arrLink = $(idBox).find(".photoLink").attr("value").split(",");
  var len = arrSrc.length,num = 9,step = _step = 0,len2 = Math.ceil(len/num),oDd;
  var oDl = $('<dl class="cfix"></dl>');
  for( var i = 0; i < len2; i++){
  oDl.append('<dd class="cfix"></dd>');
  oDd = oDl.find("dd");
  for(var j = step; j < num; j++){
   oDd.eq(i).append('<div class="fin_imgBox"><a href="'+ arrLink[j] +'"><img src="'+ arrSrc[j] +'"></a><div class="cul_tushuo"><p><span>'+ arrText[j] +'</span></p></div></div>');
  }
  if( len - num > 9 ){
   step = num;
   num = num + 9;
  }else{
   step = num;
   num = len;
  }
  }
  oDiv.append(oDl);
  function slideBox(){
  oSum.html(_step+1);
  oTotal.html(len2);
  oDl.animate({left:_step*-366},1000);
  }
  slideBox();
  oPrev.click(function(){
  _step--;
  if(_step == -1){
   _step=0;
  }
  slideBox();
  });
  oNext.click(function(){
  _step++;
  if(_step == oDd.length){
   _step=3;
  }
  slideBox();
  });
 },
 scrollTop:function(idBox){
  $(window).load(function(){
  var phbCon = $(idBox);
  var phbOffSetTop = phbCon.offset().top;
  $(window).scroll(function(){
   var scrollTop = $(window).scrollTop();
   if( scrollTop >= phbOffSetTop ){
   phbCon.css({"position": "fixed", "top": "0", "z-index": "1000"});
   }else{
   phbCon.css({"position": "static"});
   }
  });

  });
 },
 slideShowReview:function(idBox,num){//香车美图左右轮播图
  var oPrev = $(idBox).find(".prev");
  var oNext = $(idBox).find(".next");
  var oDiv = $(idBox).find(".reviewZT .ulBox");
  var arrSrc = $(idBox).find(".photoImg").attr("value").split(",");
  var arrText = $(idBox).find(".photoText").attr("value").split(",");
  var arrLink = $(idBox).find(".photoLink").attr("value").split(",");
  var len = arrSrc.length;
  var index = 0;
  var oUl = $("<ul></ul>");
  for(var i = 0; i < len; i++){
  oUl.append('<li><a href="'+arrLink[i]+'"><img src="'+arrSrc[i]+'"></a><span><a href="'+arrLink[i]+'">'+arrText[i]+'</a></span></li>');
  }
  if( len <= num ){
  oPrev.hide();
  oNext.hide();
  }
  for( var i = 0; i<num; i++){
  oUl.append('<li><a href="'+arrLink[i]+'"><img src="'+arrSrc[i]+'"></a><span><a href="'+arrLink[i]+'">'+arrText[i]+'</a></span></li>');
  }
  oDiv.append(oUl);
  var aLi = $(idBox).find("ul li");
  var liWidth = aLi.outerWidth(true);
  oUl.css("width",aLi.length*liWidth);
  oPrev.click(function() {
  index--;
  if(index == -1){
   oUl.css("left",-liWidth*len);
   index = len - 1;
  }
  oUl.stop().animate({"left":-liWidth*index},1000);
  });
  oNext.click(function() {
  index++;
  if( index == len + 1 ){
   oUl.css("left","0");
   index = 1;
  }
  oUl.stop().animate({"left":-liWidth*index},1000);
  });
 },
 isShow:function(idBox){
  var oLi = $(idBox).find("li");
  oLi.eq(0).find("div").css("display","block");
  oLi.hover(function(){
  $(this).siblings("li").find("div").hide();
  $(this).find("div").show();
  });
 },
 isHover:function(idBox){
  $(idBox).find("li.active").hover(function(){
  $(this).find("dl").stop().slideToggle(400);
  $(this).addClass("cur");
  },function(){
  $(this).find("dl").stop().slideToggle(400);
  $(this).removeClass("cur");
  });
 },
 moreAjax:function(idBox){//红人访加载更多more
  var data,title;
  if(window.location.href.indexOf("ent.") > 0) {
  data = 'live/wqhg.json';
  title = '往期回顾';

  }else{
  data = 'v/sdjj.json';
  title = '视点集锦';
  }

  var oConList = $("<ul class='hrf_video_List cfix'></ul>"),
  oSpan=$("<a href=' javascript:;' class='videoMore' target='_self'>加载更多</a>");
  videoList = $(idBox).prepend("<div class='cul_title'><h2>"+title+"</h2></div>").append(oConList).append(oSpan),
  num = 0,
  numLength = 8,
  aDataList_3 = [];

  $(".videoMore").click(function(){
  if( aDataList_3.length - numLength > 4 ){
   num = numLength;
   numLength = numLength + 4;
  }else{
   num = numLength;
   numLength = aDataList_3.length;
   $(this).hide();
  }
  getData();
  });

  function getData(){
  for(var i=num; i<numLength; i++){
   if( aDataList_3[i].title || aDataList_3[i].img ){
   var html='<li>'+
    '<a href='+ aDataList_3[i]['link'] +'>'+
    '<img src="http://res1.ynet.com/20/video_40x40.png" class="icon_video">'+
    '<img src='+ aDataList_3[i].imgs +'>'+
    '<h2>'+ aDataList_3[i].title +'</h2>'+
    '</a>'+
    '<span>第'+ aDataList_3[i]['number'] +'期 '+ aDataList_3[i]['date'] +'</span>'+
    '</li>';
   $(".hrf_video_List").append(html);
   }
  }
  }

  $.ajax({
  url : "http://res1.ynet.com/"+data,
  //http://rss.ynet.com/ynet/view/tjxw.json
  type : "get",
  dataType : "json",
  async : true,
  success : function(result){
   // result = result.replace(/\t/g,'').replace(/\r/g,'').replace(/\n/g,'').replace(/"/g,'\\"').replace(/'/g,'"');
   // aDataList_3 = eval("("+result+")");	
   aDataList_3 = result;
   if(aDataList_3.length <= numLength){
   $(".videoMore").hide();
   }
   getData();
  },
  error : function(data){
  }
  });
 },
 thumbShow:function () {
  var i = 0;

  // 鼠标移入切换
  $(".slt_wrap ul li").mouseover(function () {
  clearInterval(timer);
  i = $(this).index();
  $(".slt_slideShow .slt_banner ul li").eq(i).fadeIn(300).siblings().fadeOut(300);
  mask();
  })

  // mask缩略图切换
  function mask() {
  $(".slt_wrap ul li").eq(i).find(".mask").addClass("active").parents("li").siblings().find(".mask").removeClass("active");
  }
  mask();

  // 自动轮播
  function autoShow() {
  i++;
  i > 4? i = 0 : i;
  $(".slt_slideShow .slt_banner ul li").eq(i).fadeIn(300).siblings().fadeOut(300);
  mask();
  }

  var timer = setInterval(autoShow, 2000);

  $(".slt_wrap ul li").mouseout(function () {
  timer = setInterval(autoShow, 2000);
  })
 }
 }



 $("#subButton").click(function() {
  if( $("#bdcsMain").val() ){
  $("#form_1").submit();
  }
 });

 function window_down_app(){
  var wheight = $(window).height();
  var height = $("#down_app").height();
  $("#down_app").css({"top":wheight/2,"margin-top":-height/2});
  if(document.documentElement.clientWidth < 1200){
  $("#down_app").hide();
  }else{
  $("#down_app").show();
  }
 }

 window_down_app();

 window.onresize = function(){
  window_down_app();
 };

 $("#down_app_close").click(function(){
  $("#down_app").hide();
 })