//神策统计
var SensorsEvent;
(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
      return false;
  }
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }
})({
  sdk_url: 'https://statics.haiwainet.cn/js/sa-sdk-javascript/sensorsdata.min.js',
  heatmap_url: 'https://statics.haiwainet.cn/js/sa-sdk-javascript/heatmap.min.js',
  name: 'sensors',
  server_url: 'https://tj.haiwainet.cn/sa?project=hwwPCWap',
  heatmap: {
         //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
         clickmap:'not_collect',
         //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
         scroll_notice_map:'not_collect'
      }
});
(function(){
  try{
    var re=/\d+/gi;
    var urls=window.location.href.match(re); 
    if(typeof sensorsConData!="undefined"){
        if(sensorsConData.templateType=="4"){
          var objbox={
             platform:"web",
             content_id:sensorsConData["event"].content_id,
             content_name:sensorsConData["event"].content_name,
             channel_id:sensorsConData["event"].channel_id,
             channel_name:sensorsConData["event"].channel_name
          }
          var k=0
          for (var i=0;i<6;i++){
              if(typeof sensorsConData["event"]['channel_arrparentId_'+i]!="undefined"){
                k++;
                objbox['channel_arrparentId_'+i] = sensorsConData["event"]['channel_arrparentId_'+i];
                objbox['channel_arrparentName_'+i] = sensorsConData["event"]['channel_arrparentName_'+i];
              }
          }
          if(k>0){
            objbox['channel_arrparentId_'+k] = sensorsConData["event"].channel_id[0];
            objbox['channel_arrparentName_'+k] = sensorsConData["event"].channel_name[0];
            sensorsConData["event"]['channel_arrparentId_'+k] = sensorsConData["event"].channel_id[0];
            sensorsConData["event"]['channel_arrparentName_'+k] = sensorsConData["event"].channel_name[0];
          }
          
          
          if(typeof sensorsConData["event"].channel_arrparentId_0=="undefined"){
            getCcategory(urls[2],objbox);
          }else{
            
            sensors.quick('autoTrack',objbox);
          }
        }else if(sensorsConData.templateType=="2"){
          var objbox={
            platform:"web",
            channel_id:sensorsConData["event"].channel_id,
            channel_name:sensorsConData["event"].channel_name
          }
          var k=0;
          for (var i=0;i<6;i++){
              if(typeof sensorsConData["event"]['channel_arrparentId_'+i]!="undefined"){
                k++;
                objbox['channel_arrparentId_'+i] = sensorsConData["event"]['channel_arrparentId_'+i];
                objbox['channel_arrparentName_'+i] = sensorsConData["event"]['channel_arrparentName_'+i];
              }
          }
          
            objbox['channel_arrparentId_'+k] = sensorsConData["event"].channel_id[0];
            objbox['channel_arrparentName_'+k] = sensorsConData["event"].channel_name[0];
            sensorsConData["event"]['channel_arrparentId_'+k] = sensorsConData["event"].channel_id[0];
            sensorsConData["event"]['channel_arrparentName_'+k] = sensorsConData["event"].channel_name[0];
          
          sensors.quick('autoTrack',objbox);
          
        }else if(sensorsConData.templateType=="s"){
            sensors.quick('autoTrack', {
                 platform:"web",
                 channel_id:sensorsConData["event"].channel_id,
                 channel_name:sensorsConData["event"].channel_name
            });
            
        }
    }else{
      sensors.quick('autoTrack',{platform:"web"});
    }
  }catch(err){
    sensors.quick('autoTrack',{platform:"web"});
    console.log(err);
  }
  //获取栏目
  function getCcategory(catid,objbox){
    var catInfo={};
    $.ajax({
        url: "//opa.haiwainet.cn/index.php?s=apis/category/getcateinfo&catid="+catid,
        dataType:"jsonp",
        jsonpCallback:"catagoryData",
        success: function(data){
          catInfo=data.result;
          if(typeof objbox.channel_id=="undefined"){
            objbox.channel_id=[catInfo.catid];
            objbox.channel_name=[catInfo.catname];
          }
          if(typeof catInfo.parent_category_ids!="undefined" && catInfo.parent_category_ids.length>0){
            for(var i in catInfo.parent_category_ids){
                    if(i<4){
                      eval("objbox['channel_arrparentId_" + i + "']='" + catInfo.parent_category_ids[i]+"'");
                      eval("objbox['channel_arrparentName_" + i + "']='" + catInfo.parent_category_names[i]+"'");
                      eval("sensorsConData['event']['channel_arrparentId_" + i + "']='" + catInfo.parent_category_ids[i]+"'");
                      eval("sensorsConData['event']['channel_arrparentName_" + i + "']='" + catInfo.parent_category_names[i]+"'");
                    }
                  }
                  if(catInfo.cat_level<6){
                    objbox['channel_arrparentId_'+(catInfo.cat_level-1)]= catInfo.catid ;
                    objbox['channel_arrparentName_'+(catInfo.cat_level-1)]=catInfo.catname;
                    sensorsConData['event']['channel_arrparentId_'+(catInfo.cat_level-1)]= catInfo.catid;
                    sensorsConData['event']['channel_arrparentName_'+(catInfo.cat_level-1)]= catInfo.catname;
                  }
          }
          sensors.quick('autoTrack',objbox);
          
        }
    });
  }
})();


(function () {
   var ie = !!(window.attachEvent && !window.opera);
   var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
   var fn = [];
   var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
   var d = document;
   d.readyhww = function (f) {
      if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
      if (fn.push(f) > 1) return;
      if (ie)
         (function () {
            try { d.documentElement.doScroll('left'); run(); }
            catch (err) { setTimeout(arguments.callee, 0); }
         })();
      else if (wk)
      var t = setInterval(function () {
         if (/^(loaded|complete)$/.test(d.readyState))
         clearInterval(t), run();
      }, 0);
   };
})();
/** 获取Dom元素的选择器
 *** el:元素对象
**/
function makeSelector(el) {
  var tag, index, stack = [];

  for (; el.parentNode; el = el.parentNode) {
    tag = el.tagName;
    if (tag != "HTML") {
        index = $(el).prevAll().length + 1;
        if (tag == "BODY"){
          stack.unshift(tag);
        }else{
          stack.unshift(tag + ':nth-child(' + index + ')');                      
        }
    }
  }            
  return stack.join(' > ');
}
/** 神策统计
 *** data:内容页基本属性
 *** t:根据不同需求在方法中自行定义
**/
function hwwSensors(data,t){
      this.templateType =data.templateType;
      this.other=t;
      (function(tem){
        //都有搜索和特殊元素点击
        hwwSensors.prototype.searchColumClick=new searchColumClick();
        hwwSensors.prototype.clickSpecialElement=function(obj){
          return clickSpecialElement.call(this, data['event'], obj);
        }
        switch(tem){
          case "4": 
               hwwSensors.prototype.viewAppNewsDetail=new viewAppNewsDetail(data['event']);
               hwwSensors.prototype.like=function(type){
                 return like.call(this, data['event'], type);
               }
               hwwSensors.prototype.shareClick=new shareClick(data['event']);
               hwwSensors.prototype.shareMethod=function(type){
                 return shareMethod.call(this, data['event'],type);
               }
               
          break;
          case "2":
              sensors.track("ListPageVeiw",data.event);
          break;
          case "s":
             hwwSensors.prototype.viewAppNewsDetail=new viewAppNewsDetail(data['event']);
             hwwSensors.prototype.shareClick=new shareClick(data['event']);
             hwwSensors.prototype.shareMethod=function(type){
                 return shareMethod.call(this, data['event'],type);
                }
          break;

        }
      }(this.templateType));
      //底层页浏览事件
      function  viewAppNewsDetail(d){
         sensors.track("viewAppNewsDetail",d);
      }
      
      //搜索事件
      function searchColumClick(){
        $(".wWSS a").click(function(){
           
          var newEvent={
	           	key_word:"海外网"
	           }
           sensors.track("searchColumClick");
           sensors.track("sendSearchRequest",newEvent);
        })
        $('.wWSS input[type="submit"]').click(function(){
        	var newEvent={
		           	key_word:$('.wWSS input[name="q"]').val()
		           }
           sensors.track("searchColumClick");
           sensors.track("sendSearchRequest",newEvent);
        })
      }
      //底层点赞
      function  like(d,type){
         try{
            var newEvent={
              platform: d.platform,
              content_id:d.content_id,
              content_name:d.content_name,
              content_category:d.content_category,
              content_show_type:d.content_show_type,
              channel_id:d.channel_id,
              content_tag:d.content_tag,
              operationType:type
            };
          sensors.track("like",newEvent);
          // console.log(newEvent,type);
          }catch(err){
           console.log(err);
          }
      }
      /** 底层分享 shareClick ,shareMethod
      *** d:内容页基本属性
      *** o:分享事件的属性
      **/
      function shareClick(d){
       try{
           var newEvent={
              platform: d.platform,
              content_id:d.content_id,
              content_name:d.content_name,
              content_category:d.content_category,
              content_show_type:d.content_show_type,
              channel_id:d.channel_id,
              content_tag:d.content_tag,
            };
          $(".bdsharebuttonbox").hover(function(){
            // console.log(newEvent);
            sensors.track("shareClick",newEvent); 
          })
          
          }catch(err){
           console.log(err);
          }
      }
      function shareMethod(d,type){
       try{
           var newEvent={
              platform: d.platform,
              content_id:d.content_id,
              content_name:d.content_name,
              content_category:d.content_category,
              content_show_type:d.content_show_type,
              channel_id:d.channel_id,
              content_tag:d.content_tag,
              share_method:type
            };
          sensors.track("shareMethod",newEvent); 
          // console.log(newEvent);
          }catch(err){
           console.log(err);
          }
      }
      /** 特殊元素点击统计 clickSpecialElement
      *** d:内容页基本属性
      *** o:被点击元素对象
      **/
     function clickSpecialElement(d,o){
      try{
          var oP={
            $element_id:$(o).attr("id"),
            $element_content:$(o).attr("alt"),
            $element_name:$(o).attr("name"),
            $element_class_name:$(o).attr("class"),
            $element_type:$(o)[0].tagName,
            $element_selector:makeSelector($(o)[0])
          }
          if(oP.element_type=="A"){
            oP.$element_target_url=$(o).attr("href");
          }
          jQuery.extend(oP,d);
          // console.log(d);
           sensors.track("clickSpecialElement",oP); 
         }catch(err){
          console.log(err);
         }
     }
}
document.readyhww(function(){
    try{
       if(typeof sensorsConData!="undefined"){
          SensorsEvent=new hwwSensors(sensorsConData);
       }else{
         console.log("no sensorsConData");
       }
      }catch(err){
        console.log(err);
  }
});

//cnzz
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1000309738'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "w.cnzz.com/q_stat.php%3Fid%3D1000309738%26l%3D3' type='text/javascript'%3E%3C/script%3E"));
var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="//hm.baidu.com/hm.js?2bf4f38b490f24381d47902a0e93a50e";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s)})();

function run(){obj.readyState=="complete"?wd_paramtracker("_wdxid=000000000000000000000000000000000000000000"):window.setTimeout(run,50)}document.write(unescape("%3Cscript id='tr_statobj' src='http://cl2.webterren.com/webdig.js?z=15' type='text/javascript'%3E%3C/script%3E"));var obj=document.getElementById("tr_statobj");window.ActiveXObject?run():document.write(unescape("%3Cscript type='text/javascript'%3E wd_paramtracker('_wdxid=000000000000000000000000000000000000000000');%3C/script%3E"));

var _czc=[];
_czc.push(['_setAccount' ,'1000309738']);
var h = document.head || document.getElementsByTagName('head')[0];
var hs = h.childNodes, a;
for (var i = 0, l = hs && hs.length; i < l; i++) {
    var c = hs[i];
    if(c.nodeName && c.nodeName.toLowerCase() === 'meta'){
        if(c.name && c.name.toLowerCase() === 'author'){
            a = c.content;
            break;
        }

    }
}
_czc.push(["_trackEvent"," author",a,""]);


//新cnzz
(function(w, d, s, q, i) {
   w[q] = w[q] || [];
   var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
   j.async = true;
   j.id = 'beacon-aplus';
   j.src = 'https://d.alicdn.com/alilog/mlog/aplus/' + i + '.js';
   f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'aplus_queue', '203467608');

//集成应用的appKey
    aplus_queue.push({
      action: 'aplus.setMetaInfo',
      arguments: ['appKey', '6142e079314602341a154748']
    });

document.write(unescape("%3Cspan id='cnzz_stat_icon_1280330837'%3E%3C/span%3E%3Cscript src='https://w.cnzz.com/c.php%3Fid%3D1280330837' type='text/javascript'%3E%3C/script%3E"));