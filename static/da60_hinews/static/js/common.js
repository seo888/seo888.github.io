var news = {};
(function(){
          var bp = document.createElement('script');
          var curProtocol = window.location.protocol.split(':')[0];
          if (curProtocol === 'https'){
	          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	      }
	      else{
	          bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	      }
		  var s = document.getElementsByTagName("script")[0];
		      s.parentNode.insertBefore(bp, s);
	  })();
news = {

  navigation: function() {
  //导航条切换样式
      $(".navone").click(function(){
      $(".navone").removeClass("curr");
      $(this).addClass("curr");
    });
    
  //导航条下拉显示
    $(".xl").hover(function(){
        $(".account-panel").hide();
        $(this).find(".account-panel").show();
    },function(){
        $(this).find(".account-panel").hide();
    });
    $(".xl_szb").hover(function(){
     
      $(this).find(".account-panel_szb").show();
  },function(){
      $(this).find(".account-panel_szb").hide();
  });
    $(".xl_sx_box").hover(function(){
      $(".account-panel").hide();
      $(this).find(".account-panel").show();
  },function(){
      $(this).find(".account-panel").hide();
  });
    $(".xl_m").click(function(){
      $(".account-panel_b").toggle();
    
    })
  },
  //浮层框
  pop:function(){
    $(".d_tips").hover(function(){
      $(this).next(".popdiv").show();
    },function(){
      $(this).next(".popdiv").hide();
    })
  },
  // 首页轮播图
  slider: function() {
    $('.flexslider').on('mouseenter',function(event){

      $('.p_n').show();
      event.stopPropagation();
     });
    
     $('.flexslider').on('mouseleave',function(event){
    
      $('.p_n').css('display','none');
      event.stopPropagation();
     });
  }  ,
  //栏目页轮播图
  slider_l: function() {
 
    $('.flexslider_l').on('mouseenter',function(event){

    $('.p_n').show();
      event.stopPropagation();
    });
  
  $('.flexslider_l').on('mouseleave',function(event){
  
      $('.p_n').css('display','none');
      event.stopPropagation();
    });

  }  ,

　clock:function(){
    var a=["0 1 2 4 5 6","2 5","0 2 3 4 6","0 2 3 5 6","1 2 3 5","0 1 3 5 6","0 1 3 4 5 6","0 2 5","0 1 2 3 4 5 6","0 1 2 3 5 6"];
    var b=["星期天","星期一","星期二","星期三","星期四","星期五"];
    window.onload=function () {
        showTime();
      setInterval(function(){
          showTime();
      },1000);
    }
    function showTime()
    {
      var time=new Date;
      var y=time.getFullYear();
      var M=time.getMonth();
      var d=time.getDate();
      var h=time.getHours();
      var m=time.getMinutes();
      var s=time.getSeconds();
      M=M+1;
      var str=y.toString()+"年"
      if(M<10)
        str=str+"0"+M.toString()+"月";
      else
        str=str+M.toString()+"月";
      if(d<10)
        str=str+"0"+d.toString()+"日";
      else
        str=str+d.toString()+"日";

      modiflyNum(1,parseInt(h/10));
      modiflyNum(2,h%10);
      modiflyNum(3,parseInt(m/10));
      modiflyNum(4,m%10);
      modiflyNum(5,parseInt(s/10));
      modiflyNum(6,s%10);
    }
    function modiflyNum(id,value)
    {	
      var elm=document.getElementById('time'+id.toString()).getElementsByTagName('li');
      var str=a[value];
      var cc=str.split(' ');
      for(var i=0;i<7;i++)
      {
        elm[i].getElementsByTagName('img')[0].src="2018index/img/back.png";
      }
      for(var i=0;i<cc.length;i++)
      {
        elm[parseInt(cc[i])].getElementsByTagName('img')[0].src="2018index/img/front.png";
      }
    }
  },
  //跑马灯
  ScrollText:function(){
    function ScrollText(content, btnPrevious, btnNext, autoStart) {
        this.Delay = 10;
        this.LineHeight = 20;
        this.Amount = 1; //注意:LineHeight一定要能整除Amount.
        this.Direction = "up";
        this.Timeout = 2500;
        this.ScrollContent = this.$(content);
        this.ScrollContent.innerHTML += this.ScrollContent.innerHTML;
        //this.ScrollContent.scrollTop = 0;
        if (btnNext) {
        this.NextButton = this.$(btnNext);
        this.NextButton.onclick = this.GetFunction(this, "Next");
        this.NextButton.onmouseover = this.GetFunction(this, "Stop");
        this.NextButton.onmouseout = this.GetFunction(this, "Start");
        }
        if (btnPrevious) {
        this.PreviousButton = this.$(btnPrevious);
        this.PreviousButton.onclick = this.GetFunction(this, "Previous");
        this.PreviousButton.onmouseover = this.GetFunction(this, "Stop");
        this.PreviousButton.onmouseout = this.GetFunction(this, "Start");
        }
        this.ScrollContent.onmouseover = this.GetFunction(this, "Stop");
        this.ScrollContent.onmouseout = this.GetFunction(this, "Start");
        if (autoStart) {
        this.Start();
        }
      }
      
      ScrollText.prototype.$ = function(element) {
        return document.getElementById(element);
      }
      
      ScrollText.prototype.Previous = function() {
        clearTimeout(this.AutoScrollTimer);
        clearTimeout(this.ScrollTimer);
        this.Scroll("up");
      }
      
      ScrollText.prototype.Next = function() {
        clearTimeout(this.AutoScrollTimer);
        clearTimeout(this.ScrollTimer);
        this.Scroll("down");
      }
      
      ScrollText.prototype.Start = function() {
        clearTimeout(this.AutoScrollTimer);
        this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Timeout);
      }
      
      ScrollText.prototype.Stop = function() {
        clearTimeout(this.ScrollTimer);
        clearTimeout(this.AutoScrollTimer);
      }
      
      ScrollText.prototype.AutoScroll = function() {
        if (this.Direction == "up") {
        if (parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2) {
          this.ScrollContent.scrollTop = 0;
        }
        this.ScrollContent.scrollTop += this.Amount;
        } else {
        if (parseInt(this.ScrollContent.scrollTop) <= 0) {
          this.ScrollContent.scrollTop = parseInt(this.ScrollContent.scrollHeight) / 2;
        }
        this.ScrollContent.scrollTop -= this.Amount;
        }
        if (parseInt(this.ScrollContent.scrollTop) % this.LineHeight != 0) {
        this.ScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Delay);
        } else {
        this.AutoScrollTimer = setTimeout(this.GetFunction(this, "AutoScroll"), this.Timeout);
        }
      }
      
      ScrollText.prototype.Scroll = function(direction) {
        if (direction == "up") {
        if (this.ScrollContent.scrollTop == 0) {
          this.ScrollContent.scrollTop = parseInt(this.ScrollContent.scrollHeight) / 2;
        }
        this.ScrollContent.scrollTop -= this.Amount;
        } else {
        this.ScrollContent.scrollTop += this.Amount;
        }
        if (parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2) {
        this.ScrollContent.scrollTop = 0;
        }
        if (parseInt(this.ScrollContent.scrollTop) % this.LineHeight != 0) {
        this.ScrollTimer = setTimeout(this.GetFunction(this, "Scroll", direction), this.Delay);
        }
      }
      
      ScrollText.prototype.GetFunction = function(variable, method, param) {
        return function() {
        variable[method](param);
        }
    }
      if(document.getElementById("jsfoot02")){
          var scrollup = new ScrollText("jsfoot02");
          scrollup.LineHeight = 100;        //单排文字滚动的高度
          scrollup.Amount = 1;            //注意:子模块(LineHeight)一定要能整除Amount.
          scrollup.Delay = 50;           //延时
          scrollup.Start();             //文字自动滚动
          scrollup.Direction = "up";   //默认设置为文字向上滚动
        }
      
  },

  Tabs:function(){
    //选项卡
    $(document).ready(function() {
      jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
        $(tab_conbox).find("li").hide();
        $(tabtit).find("li:first").addClass("thistab").show(); 
        $(tab_conbox).find("li:first").show();
      
        $(tabtit).find("li").bind(shijian,function(){
          $(this).addClass("thistab").siblings("li").removeClass("thistab"); 
          var activeindex = $(tabtit).find("li").index(this);
          $(tab_conbox).children().eq(activeindex).show().siblings().hide();
          return false;
        });
      
      };
      /*调用方法如下：*/
      $.jqtab("#tabs","#tab_conbox","mouseenter");
      $.jqtab("#tabs2","#tab_conbox2","mouseenter");
      $.jqtab("#tabs3","#tab_conbox3","mouseenter");
      $.jqtab("#tabs4","#tab_conbox4","mouseenter");
      $.jqtab("#tabs5","#tab_conbox5","mouseenter");
      $.jqtab("#tabs6","#tab_conbox6","mouseenter");
      $.jqtab("#tabs7","#tab_conbox7","mouseenter");
      $.jqtab("#tabs8","#tab_conbox8","mouseenter");
      $.jqtab("#tabs9","#tab_conbox9","mouseenter");
      $.jqtab("#tabs10","#tab_conbox10","mouseenter");
    });
  },
  lazyLoad:function(){
    //部分区域图片延迟加载
    function lazyloadForPart(container) {
     
      container.find('img').each(function () {
          var original = $(this).attr("data-src");
          if (original) {
              $(this).attr('src', original).removeAttr('original');
          }
      });
    }

    var API = {  
      /**
        * 兼容Mozilla(attachEvent)和IE(addEventListener)的on事件
        * @param {String} element DOM对象 例如：window，li等
        * @param {String} type on事件类型，例如：onclick，onscroll等
        * @param {Function} handler 回调事件
        */
      on: function(element, type, handler) {
          return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent('on' + type, handler)
      },  
      /**
        * 为对象绑定事件
        * @param {Object} object 对象
        * @param {Function} handler 回调事件
        */
      bind: function(object, handler) {
          return function() {
              return handler.apply(object, arguments)
          }
      },  
      /**
        * 元素在页面中X轴的位置
        * @param {String} element DOM对象 例如：window，li等
        */
      pageX: function(El) {
          var left = 0;
           do {
              left += El.offsetLeft;

          } while(El.offsetParent && (El = El.offsetParent).nodeName.toUpperCase() != 'BODY');
          return left;

      },  
      /**
        * 元素在页面中Y轴的位置
        * @param {String} element DOM对象 例如：window，li等
        */
      pageY: function(El) {
          var top = 0;
           do {
              top += El.offsetTop;

          } while(El.offsetParent && (El = El.offsetParent).nodeName.toUpperCase() != 'BODY');
          return top;

      },  
      /**
        * 判断图片是否已加载
        * @param {String} element DOM对象 例如：window，li等
        * @param {String} className 样式名称
        * @return {Boolean} 布尔值
        */
      hasClass: function(element, className) {
          return new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className)
      },  
      /**
        * 获取或者设置当前元素的属性值
        * @param {String} element DOM对象 例如：window，li等
        * @param {String} attr 属性
        * @param {String} (value) 属性的值，此参数如果没有那么就是获取属性值，此参数如果存在那么就是设置属性值
        */
      attr: function(element, attr, value) {
           if (arguments.length == 2) {
              return element.attributes[attr] ? element.attributes[attr].nodeValue : undefined
          }
          else if (arguments.length == 3) {
              element.setAttribute(attr, value)
          }
      }
  };

  /**
    * 按需加载
    * @param {String} obj 图片区域元素ID
    */
  function lazyload(obj) {
      this.lazy = typeof obj === 'string' ? document.getElementById(obj) : document.getElementsByTagName('body')[0];
      this.aImg = this.lazy.getElementsByTagName('img');
      this.fnLoad = API.bind(this, this.load);
      this.load();
      API.on(window, 'scroll', this.fnLoad);
      API.on(window, 'resize', this.fnLoad);

  }
  lazyload.prototype = {

      /**
        * 执行按需加载图片，并将已加载的图片标记为已加载
        * @return 无
        */
      load: function() {
          var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // 屏幕上边缘
          var iClientHeight = document.documentElement.clientHeight + iScrollTop;
          // 屏幕下边缘
          var i = 0;
          var aParent = [];
          var oParent = null;
          var iTop = 0;
          var iBottom = 0;
          var aNotLoaded = this.loaded(0);
          
           if (this.loaded(1).length != this.aImg.length) {
            lazyloadForPart($("li.con_lista"));
            lazyloadForPart($("div.tab_con"));
           
              var notLoadedLen = aNotLoaded.length;
               for (i = 0; i < notLoadedLen; i++) {
                  iTop = API.pageY(aNotLoaded[i]) - 200;
                  iBottom = API.pageY(aNotLoaded[i]) + aNotLoaded[i].offsetHeight + 200;
                  var isTopArea = (iTop > iScrollTop && iTop < iClientHeight) ? true : false;
                  var isBottomArea = (iBottom > iScrollTop && iBottom < iClientHeight) ? true : false;
                   
                   if (isTopArea || isBottomArea) {                  
                      // 把预存在自定义属性中的真实图片地址赋给src
                      aNotLoaded[i].src = API.attr(aNotLoaded[i], 'data-src') || aNotLoaded[i].src;
                       if (!API.hasClass(aNotLoaded[i], 'loaded')) {
                           if ('' != aNotLoaded[i].className) {
                              aNotLoaded[i].className = aNotLoaded[i].className.concat(" loaded");

                          }
                          else {
                              aNotLoaded[i].className = 'loaded';

                          }
                      }
                  }
              }
          }
      },

      /**
        * 已加载或者未加载的图片数组
        * @param {Number} status 图片是否已加载的状态，0代表未加载，1代表已加载
        * @return Array 返回已加载或者未加载的图片数组
        */
      loaded: function(status) {
          var array = [];
          var i = 0;
           for (i = 0; i < this.aImg.length; i++) {
              var hasClass = API.hasClass(this.aImg[i], 'loaded');
               if (!status) {
                  if (!hasClass)
                      array.push(this.aImg[i])
              }
              if (status) {
                  if (hasClass)
                      array.push(this.aImg[i])
              }
          }
          return array;      
      }
  };
  // 按需加载初始化
  API.on(window, 'load', function () {new lazyload()});
  },
  ad_has:function(){
    var Has_ad = $(".ad_b").has("img").length;
    if(Has_ad==0){
      $(".ad_b").hide();
    }
  },
  zh_bug:function(){
   
    $(".l_list").children("ul").children("li").each(function(){
     
      if($(this).find("img").length==0){
     
        $(this).find(".l_list_r").css("width","100%"); 
        $(this).find(".p_list_r").css("width","100%"); 
      }
     })
    
  },
  ie8_index:function(){
    
    if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
      if(navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)){ //判断是否是IE8
      $('.st1:nth-child(4n)').css('margin-right','0');
      $('.st:nth-child(3n)').css('margin-right','0');
        $('.e_Li li:last-child').css('margin-right','0');
        $('.rczp ul li a:last-child').css('margin-right','0');
        $('.flexslider_ad li>div:nth-child(4n)').css('margin-right','0');
        $('.bdjh li:last-child').css('margin-bottom','0');
        $('.cus li:last-child').css('margin-bottom','0');
        $('.m_n01 li:last-child').css('margin-bottom','0');
        $('.hd_list:nth-child(3n)').css('margin-right','25px');
        $('.con_listc-c .amb44:last-child a').css('margin-bottom','0');
        $('.tab_con:last-child').css('margin-bottom','0');
        $('.con_lista li:last-child').css('margin-bottom','0');
        $('.con_lista>a:last-child').css('margin-bottom','0');
        $('.con_list>a:last-child').css('margin-bottom','0');
        
        $('.con_list li:last-child').css('margin-bottom','0');
        $(' .rczp:last-child').css('margin-bottom','0');
        $('.phb li:last-child').css('margin-bottom','0');
        $('.img_con.left:last-child').css('margin-bottom','0');
        
        $('.eng_Box01 li:last-child').css('margin-bottom','0');
        $('.st:nth-child(3n)').css('margin-right','0');
        $('.fp_List:nth-child(3n)').css('margin-right','0');
        $('.fp_div_list ul li:nth-child(3n)').css('margin-right','0');
        $('.gdzw_div ul li:nth-child(3n)').css('margin-right','0');
        $('.hd_list:nth-child(3n)').css('margin-right','25px');
        $('.hd_list:nth-child(4n)').css('margin-right','0');
        
        
      }}
  },
  ie8_list:function(){
    if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
      if(navigator.userAgent.match(/Trident/i) && navigator.userAgent.match(/MSIE 8.0/i)){ //判断是否是IE8
         $('.list_f_Box>.list_con:nth-child(3n)').css('margin-right','0');
         $('.st1:nth-child(4n)').css('margin-right','0');
         $('.st:nth-child(3n)').css('margin-right','0');
         $('.ewm_box ul li:nth-child(2n)').css('width','56%');
         $('.page_list_con:nth-child(4n)').css('margin-right','0');
        
        
       }}
  },
  list:function(){
    news.ie8_list();
    news.zh_bug();
    news.slider_l();
    news.ad_has();
    news.navigation();
  
    $(document).ready(function(){
      $('.flexslider_l').flexslider({
        directionNav: true,
        controlNav: true,  
        pauseOnAction: true,         
        pauseOnHover: true,          
        manualControls:'',   
        manualControlEvent: "hover",  
        animationLoop: true,
        slideshowSpeed: 3000,
  

      });
    });
  },

  index:function(){
    news.ie8_index();
    news.slider();
    news.lazyLoad();
    news.navigation();
    news.pop();
    news.ad_has();
    news.clock();
    news.ScrollText();
    news.Tabs();


    $(document).ready(function(){
      $('.flexslider').flexslider({
        directionNav: true,
        controlNav: true,  
        pauseOnAction: true,         
        pauseOnHover: true,          
        manualControls:'',   
        manualControlEvent: "hover",  
        animationLoop: true,
        slideshowSpeed: 3000
        

      });
    });

    
 
  }
  
          

}
<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2019-02-20 10:02:46" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->