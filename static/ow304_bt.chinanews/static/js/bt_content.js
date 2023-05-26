//搜索

function quickQueryCust(evt) {
      evt = (evt) ? evt : ((window.event) ? window.event : "") //兼容IE和Firefox获得keyBoardEvent对象
      var key = evt.keyCode ? evt.keyCode : evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
      if (key == 13) { //判断是否是回车事件。
            submitFun();
       }
}
function submitFun() {
      var hotword = document.getElementsByName('q')[0].value;
      if (hotword == '') {
            alert('请输入关键字!');
            return false;
      } else {
            window.open("http://search.news.chinanews.com/search.do?dbtype=bt&q=" + encodeURIComponent(hotword));
      }
}
var twotitle = function() {
      var stback = $(document).scrollTop(), winh1 = $(window).height();
      (stback>275)? $("#second-title").css('display','block'): $("#second-title").css('display','none');   
  }; 
  
  $(document).ready(function() {
  //    $(window).bind("scroll", twotitle);
      /*是否显示固定标题start*/
      //twotitle();
      /*是否显示固定标题end*/

$("#wbwx").mouseover(function() { $('#wbwxshow_div').css('display', 'block'); });
$("#wbwx").mouseout(function() { $('#wbwxshow_div').css('display', 'none'); });
$('#txt_x').click(function(){
						$('.left_zw').css('font-size','16px');  
						$('#txt_z').removeClass("on");
						$('#txt_d').removeClass("on");
						$('#txt_x').addClass("on");

						  });
$('#txt_z').click(function(){
						$('.left_zw').css('font-size','20px');  
						$('#txt_x').removeClass("on");
						$('#txt_d').removeClass("on");
						$('#txt_z').addClass("on");

						  });
$('#txt_d').click(function(){
						$('.left_zw').css('font-size','24px');  
						$('#txt_z').removeClass("on");
						$('#txt_x').removeClass("on");
						$('#txt_d').addClass("on");

						  });
    function reachBottom() {
        var isIE = !!window.ActiveXObject;  
        var isIE6 = isIE && !window.XMLHttpRequest;
        var btmHeight = "350";// 这里配置元素距页面底部的距离
        var scrollTop = 0;
        var clientHeight = 0;
        var scrollHeight = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        } else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
        }
        scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

        if (scrollTop>=btmHeight) {
            if(isIE6){
                  document.getElementById("second-title").style.top=(scrollTop)+"px";
            }else{
                  document.getElementById("second-title").style.top="50px";
            }
            return true;
        } else {
            if(isIE6){
                      document.getElementById("second-title").style.top=btmHeight+"px";
            }else{
                       document.getElementById("second-title").style.top=(btmHeight-scrollTop)+"px";
            }
           return false;
        }
    }
    window.onscroll = function(){
        if(reachBottom() == true){
            document.getElementById("second-title").className = "secondBtm";
        }else{
            document.getElementById("second-title").className = "secondTop";
    }
    } 
    
      /*返回顶部start*/
      $(window).scroll(function() {
          if ($(window).scrollTop() > 500) {
              $('#backtop div').fadeIn(800);
          } else {
              $('#backtop div').fadeOut(800);
          }
      });	
      $("#top").click(function() {
          $('body,html').animate({
            scrollTop: 0
          },
          500);
          return false;
      });
      /*返回顶部end*/
})
      /*share js start*/
      $('#share-2').share({sites: ['weibo','wechat', 'qzone']});
      $('#share-3').share({sites: ['weibo','wechat', 'qzone']});
      //$('#share-4').share({sites: ['weibo','wechat', 'qzone']});
      /*share js end*/