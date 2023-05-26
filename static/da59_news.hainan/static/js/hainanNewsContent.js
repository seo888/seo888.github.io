TY(function($){
  var gW_focus = $(window).width();
  var gH_focus = $(window).height();
  if(gW_focus>800){init();}
  else{
    _resizebili();
  }
  var jishu=0;
  function addGuangGao(){
    var guanggao={};

    //文字链
    addObj({
      idStartNum:1,
      advStartNum:9,
      idText:'CL_text_',
      jieshuOBJ:guanggao,
      lianxuNum:6
    });
    
    addTo(guanggao)
  }
  function addObj(data){
    for(var i=0;i<data.lianxuNum;i++){
      data.jieshuOBJ[data.idText+data.idStartNum]={
        'tag':'#'+data.idText+data.idStartNum,
        'id':data.idText+data.idStartNum,
        'num':data.advStartNum<10?'0'+data.advStartNum:data.advStartNum
      };
      data.idStartNum+=1;
      data.advStartNum+=1;
    }
  }
  function addTo(obj){
    for(var can_name in obj){
      var can=obj[can_name];
      $(can.tag).attr({
        'id':can.id,
        'data-ads-order':can.num
      }).addClass('ads-loc-holder');
    }
  }
 
  function listShare(){
    $('.hn_online_friend').delegate('.fr_text_share a','click',function(){
      var config={
        "position":"center",
        "via":["weixin","tsina","qzone",],
        "title":$(this).attr('data-title').slice(0,40),
        "summary":$(this).attr('data-summary').slice(0,100),
        "url":$(this).attr('data-url'),
        "img":$(this).attr('data-img')
      }
      if(typeof(TY.m.shareV2)=="undefined"){//还未加载完
        loader(config,function(){
          TY.m.shareV2.showShare();
        })
      }else{
        // TY.m.shareV2.setConfig(config);
        shareBtnBind(config)
        TY.m.shareV2.showShare();
      }
    })
  }
  function shareBtnBind(config){
    $('#TY_plug_share').remove();
    $('.share_wx').remove();
    $('#TY_plug_share_cover').remove();
    TY.m.shareV2.init(config);
    $('#TY_plug_share').css({
      width:'1000',
      left:'50%',
      'margin-left':'-500px'
    })
  }
  function resizeByScale(arg){
    for(var cls in arg){
      if($('.'+cls).hasClass('f-onBiLi')){
        resize({
          'name':cls,
          'scale':arg[cls]
        })
      }
    }
    function resize(arg){
      var cls=arg.name,
        boxScale=arg.scale,
        img=$('.'+cls).find('img'),
        boxW=img.eq(0).width(),
        boxH=boxW/boxScale;
      img.each(function(){
        if($(this).attr('reScale')=='true'){return;}
        var newImg=new Image(),
          _this=$(this),
          src=_this.attr('data-original')||_this.attr('src');
        newImg.src=src;
        newImg.onload =function(){
          function imgAdjust(){
            var imgW=newImg.width,
              imgH=newImg.height,
              imgScale=imgW/imgH;
            if(boxScale>=imgScale){
              imgW=boxW;
              imgH=imgW/imgScale;
            }else{
              imgH=boxH;
              imgW=imgH*imgScale;
            }
            _this.parent().css("cssText","display:block;height:"+boxH+"px;width:"+boxW+"px;overflow:hidden;");
            _this.css('cssText','width:'+imgW+'px!important;height:'+imgH+'px!important;').attr('reScale','true');
          }
          imgAdjust();
          newImg=null;
        }
      })
    }
  }
  function _resizebili(){
    var arg={
      'friend_content':4/3
    }
    resizeByScale(arg);
  }
  function init(){
    addGuangGao();
    $('body').append('<script language="javascript" type="text/javascript" charset="UTF-8" src="http://static.tianyaui.com/qy/adsame/ads.js"></script>');
    loader();
    // listShare();
    
  }
})
var Zepto=TY;