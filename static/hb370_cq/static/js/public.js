$(function(){
  /*tab切换 滚动效果 初始化*/
  tabInit();
  /*搜索初始化*/
  searchInit();

  // 兼容性ie提示
  $('.i-ckxq').click(function(){
    $('.ie-tip-box').show();
  });

  $('.i-close').click(function(){
    $('.ie-tip-box').hide();
  });


  /*登录注册*/
  if(getCookie("loginStatus")){
    getUserInfo();
  }

  var curURL = encodeURIComponent(window.location.href);
  $("#login").click(function(){
    window.location.href=loginURL+curURL;
  });
  $("#register").click(function(){
    window.location.href=registerURL+curURL;
  });
  /*注销*/
  $("#logout").click(function(){
    document.getElementById('logoutIframe').contentWindow.location.href=logout;
    document.getElementById('logoutIframe').onload = document.getElementById('logoutIframe').onreadystatechange = function() {
      $(".i-top-login").show();
      $(".i-top-logined").hide();
      $(".head-login").show();
      $(".head-logined").hide();
    }
    setTimeout(function(){
      document.getElementById('logoutIframe').contentWindow.location.href = window.location.origin + '/IGI/nbhd/langcaoLogin.do?method=logout'
    },500)

  });

  /*PC端 菜单的选中效果*/
  var curUrl = window.location.pathname;
  $(".nav li").each(function() {
    $(this).find("a").removeClass("cur");
  });
  if( curUrl.indexOf("/ywdt/") >= 0 ) { // 要闻动态
    $(".nav li").eq(1).find("a").addClass('cur');
  } else if ( curUrl.indexOf("/zwgk/") >= 0 ) { // 政务公开
    $(".nav li").eq(2).find("a").addClass('cur');
  } else if ( curUrl.indexOf("/zwfw/") >= 0 ) { // 政务服务
    $(".nav li").eq(3).find("a").addClass('cur');
  } else if ( curUrl.indexOf("/hdjl/") >= 0 ) { // 互动交流
    $(".nav li").eq(4).find("a").addClass('cur');
  } else if ( curUrl.indexOf("/zjcq/") >= 0 ) { // 走进重庆
    $(".nav li").eq(5).find("a").addClass('cur');
  } else {
    $(".nav li").eq(0).find("a").addClass('cur');
  }
  /*wap端 菜单的选中效果*/
  var curUrl = window.location.pathname;

  $("#head-wap .head-nav a").each(function() {
    $(this).removeClass("cur");
  });
  if( curUrl.indexOf("/ywdt/") >= 0 ) { // 要闻动态
    $("#head-wap .head-nav a").eq(1).addClass('cur');
  } else if ( curUrl.indexOf("/zwgk/") >= 0 ) { // 政务公开
    $("#head-wap .head-nav a").eq(2).addClass('cur');
  } else if ( curUrl.indexOf("/zwfw/") >= 0 ) { // 政务服务
    $("#head-wap .head-nav a").eq(3).addClass('cur');
  } else if ( curUrl.indexOf("/hdjl/") >= 0 ) { // 互动交流
    $("#head-wap .head-nav a").eq(4).addClass('cur');
  } else if ( curUrl.indexOf("/zjcq/") >= 0 ) { // 走进重庆
    $("#head-wap .head-nav a").eq(5).addClass('cur');
  } else {
    $("#head-wap .head-nav a").eq(0).addClass('cur');
  }
})

/*登录*/
var loginURL = "https://auth.cq.gov.cn:81/sso/login?utype=0&client_id=I34U4QF4D&goto=";
var registerURL = "https://auth.cq.gov.cn:81/sso/register?utype=0&client_id=I34U4QF4D&goto=";
var logout = "https://auth.cq.gov.cn:81/sso/logout?utype=0&client_id=I34U4QF4D&goto="+window.location.origin+"/IGI/nbhd/langcaoLogin.do?method=logout";
function getUserInfo(){
  var getLoginUer = "/IGI/nbhd/langcaoLogin.do?method=getLoginUer&v="+new Date().getTime();
  $.ajax({
    url:getLoginUer,
    type:"get",
    data:{},
    timeout:3000,
    dataType:"json",
    success:function(data){
      if(data.statusCode == 200){
        //用户已经登录
        var username= "**" + data.datas.TRUENAME.substring(data.datas.TRUENAME.length-1,data.datas.TRUENAME.length);
        var userinfoUrl = 'http://zwykb.cq.gov.cn/cbl/grzx/'
        $("#loginusername").html(username).attr("href",userinfoUrl)


        $(".i-top-login").hide();
        $(".i-top-logined").show();
        $(".head-login").hide();
        $(".head-logined").show();

        setCookie('loginStatus','1')
      }else{
        //没有登录
        $(".i-top-login").show();
        $(".i-top-logined").hide();
        $(".head-login").show();
        $(".head-logined").hide();

        delCookie("loginStatus")
      }
    },
    error:function(data){
      //没有登录
      $(".i-top-login").show();
      $(".i-top-logined").hide();
      $(".head-login").show();
      $(".head-logined").hide();
      delCookie("loginStatus")
    }
  });

}
/*tab切换 滚动效果 初始化*/
function tabInit(){
  /**
   * [第一张tab切换]
   * @type {String}
   */
  jQuery(".tab-list a").tabPanelFun({
    cur:'cur',
    tabContent:'.tab-group',
    tabItem:'.tab-item',
    evnets:'click'

  });
  /**
   * [第二种切换]
   * @type {String}
   */
  jQuery(".tab-list-bool li").tabPanelFun({
    cur:'cur',
    tabContent:'.tab-group',
    tabItem:'.tab-item',
    pra:true,
    pradom:'.tab-parent'
  });
  /**
   * [text 改滚动只能像下面设置这几个配置项]
   * [type默认就可以，也可以设置为top，其他不好再配置了]
   * @type {String}
   */
  jQuery(".banner-img>a").simpleSwitch({
    text:'.banner-txt a',
    prev:'.banner-left',
    next:'.banner-right',
    num:'.banner-num span',
    className:'cur',
    playTime:5000,
    indy:'.ban-dy',
    lendy:'.ban-len',
    type:'left',
    // direction:'left',
  });
  /**
   * [text 改滚动只能像下面设置这几个配置项]
   * 新闻头条上下轮播
   * @type {String}
   */
  jQuery(".news-cont a").simpleSwitch({
    prev:'.news-btnt',
    next:'.news-btnb',
    playTime:2000,
    type:'top',
  });
  // 新闻头条滚动
  jQuery(".roll-news-cont a").simpleRoll({
    type:'top',
    // type:'left',
    prev:'.roll-news-btnt',
    next:'.roll-news-btnb'
  });
  /**
   * [text 改滚动只能像下面设置这几个配置项]
   * [type默认就可以，也可以设置为top，其他不好再配置了]
   * @type {String}
   */
  jQuery(".fade-img a").SwitchFade({
    text:'.fade-txt a',
    prev:'.fade-left',
    next:'.fade-right',
    num:'.fade-num span',
    // className:'cur',
    playTime:3000,
    lendy:'.dy-lens',
    indy:'.dy-index'
  });
  /**
   * 每次轮播多张中的一张
   * @type {Number}
   */
  jQuery(".ban-more-img").bannerRollLR({
    len:4,
    type:'right',
    moveTime:3000,
    prev:'.ban-more-left',
    next:'.ban-more-right'
  });
  // 滚动
  jQuery(".roll-items").simpleRoll({
    space:-100,
    type:'left',
    prev:'.ban-roll-left',
    next:'.ban-roll-right'
  });
  // 滚动
  jQuery(".roll-images").rollImages({
    type:'left',
    space:10,
    prev:'.roll-left',
    next:'.roll-right',
    time:50,
    direction:'prev'
  });
  // 底部模拟下拉
  jQuery(".drop-down .tag").dropDownFun({
    tagSiblings:'.drop-lists',
    optionItem:'.drop-down li',
    // optionItem:'.drop-down li a',
    optionBool:true,
    // optionBool:false,
    cur:'cur',
  });
}


function generateUUID(){ //获取sign
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}


function searchInit(){
  /*PC端 点击跳转搜索页*/
  $('#toSearch').on('click', function (e) {
    e.preventDefault()
    var params='';
    var result = $("#searchWord").val();
    result = $.trim(result);
    //var reg = /[`~!@#$%^&*_+()-<>{}\/'[\]]/im;
    var reg = /[`~!@#$%^&*_+<>{}\/'[\]]/im
    /*if (reg.test(result)) {
        window.wxc.xcConfirm('您输入的信息包含非法字符!', window.wxc.xcConfirm.typeEnum.info);
        return false;
    }*/
    if (result == "搜索您想了解的政策/资讯/服务" || result == "请输入关键词" || result == "" || result == null) {
      window.wxc.xcConfirm('请输入搜索内容！', window.wxc.xcConfirm.typeEnum.info)
      return false;
    } else {
      // result = result.replace("-", "\-");
      // result = result.replace("(", "\(");
      // result = result.replace(")", "\)");
      params="?searchWord="+ encodeURIComponent(result) + "&tenantId=7&configTenantId=7&dataTypeId=7&sign="+generateUUID();
    }
    // window.open('/cq/index.html'+params);
    if(self == top){
      // window.open('/qqc/searchResultPCCQ.html' + params);
      window.open('/cqgovsearch/search.html' + params);
    }else{
      // window.parent.open('/qqc/searchResultPCCQ.html' + params)
      window.parent.open('/cqgovsearch/search.html' + params)
    }

  })

  $("#searchWord").keypress(function(event){
    if(event.which === 13) {
      $('#toSearch').click();
    }
  });

  /*wap端 点击跳转搜索页*/
  $('#toSearchWap').on('click', function (e) {
    e.preventDefault()
    var params='';
    var result = $("#searchWordWap").val();
    result = $.trim(result);
    //var reg = /[`~!@#$%^&*_+()-<>{}\/'[\]]/im;
    var reg = /[`~!@#$%^&*_+<>{}\/'[\]]/im
    /*if (reg.test(result)) {
        new TipBox({type:'error',str:'您输入的信息包含非法字符!', hasBtn:true});
        return false;
    }*/
    if (result == "搜索您想了解的政策/资讯/服务" || result == "请输入关键词" || result == "" || result == null) {
      new TipBox({type:'error',str:'请输入搜索内容！', hasBtn:true});
      return false;
    } else {
      // result = result.replace("-", "\-");
      // result = result.replace("(", "\(");
      // result = result.replace(")", "\)");
      params="?searchWord="+ encodeURIComponent(result) + "&tenantId=7&configTenantId=7&dataTypeId=7&sign="+generateUUID();
    }
    // window.open('/cq/index.html'+params);
    window.open('/cqgovsearch/search.html' + params);
  })

  $("#searchWordWap").keypress(function(event){
    if(event.which === 13) {
      $('#toSearchWap').click();
    }
  });
}
// 获取路径中的参数  variable:路径中参数名
function getParmeter(variable){
  var query = window.location.href.split('?')[1];
  if(!query){
    return ""
  }
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if(pair[0] === variable){
      return pair[1];
    }
  }
  return '';
}

/*
*cookie相关方法
*/
function getCookie(name){
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
function delCookie(name){
  var exp = new Date();
  exp.setTime(-1000);
  document.cookie= name + "='';expires="+exp.toGMTString()+';domain=.'+document.domain.split('.').slice(-3).join('.')+';path=/';;
}
function setCookie(name,value){
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";domain=."+document.domain.split('.').slice(-3).join('.')+";path=/";
}

/**
 * 判断ie浏览器版本
 * */
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if(isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    console.log('ie版本：', fIEVersion);
    if(fIEVersion == 7) {
      return 7;
    } else if(fIEVersion == 8) {
      return 8;
    } else if(fIEVersion == 9) {
      return 9;
    } else if(fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if(isEdge) {
    console.log('isEdge!');
    return 12;//edge
  } else if(isIE11) {
    console.log('isIE11!');
    return 11; //IE11
  }else{
    return 13;//不是ie浏览器
  }
}

/***
 * 获取当前浏览器类型
 */
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) { //判断是否Opera浏览器
    return "Opera"
  }
  ;
  if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
    return "FF";
  }
  ;
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  ;
  if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
    return "Safari";
  }
  ;
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
    return "IE";
  }
  ;
}

/*格式化日期*/
function dateformat(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

//时间戳转换
function getMyDate(str) {
  if(typeof str == "undefined" || str == null || str == "" || str == "0"){
    return "";
  }
  var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear + '-' + dateformat(oMonth) + '-' + dateformat(oDay);//最后拼接时间
  //oTime = oYear +'-'+ dateformat(oMonth) +'-'+ dateformat(oDay) +' '+ dateformat(oHour) +':'+ dateformat(oMin) +':'+dateformat(oSen);//最后拼接时间
  return oTime;
}

function getMyDate1(str) {
  if(typeof str == "undefined" || str == null || str == "" || str == "0"){
    return "";
  }
  var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      // oTime = oYear + '-' + dateformat(oMonth) + '-' + dateformat(oDay);//最后拼接时间
      oTime = oYear +'-'+ dateformat(oMonth) +'-'+ dateformat(oDay) +' '+ dateformat(oHour) +':'+ dateformat(oMin);//最后拼接时间
  return oTime;
}
