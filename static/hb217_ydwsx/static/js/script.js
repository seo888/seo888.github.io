layui.use(['code','form'], function(){
  var $ = layui.$
  ,form = layui.form;

  $('.hiSlider1').hiSlider();
  $(".slideTxtBox").slide();
  $("#s1").xslider({
    unitdisplayed:6,
    movelength:1,
    unitlen:195,
    autoscroll:3000
  });

  $('ul.s-nav li.s-nav-item').hover(function(){
      $(this).children('div.subMenu').stop().slideToggle(600);
  });

  /*Copyright版权块*/
  $.get('/index/index/copy_footer.html',function(data){
    $('footer').html(data);
  });

  /******/
  // 获取图片真实高度
  function getImageWidth(url,callback) {
      var img = new Image();
      img.src = url;
      // 如果图片被缓存，则直接返回缓存数据
      if (img.complete) {
          callback(img.width, img.height);
      } else {
          img.onload = function () {
              callback(img.width, img.height);
          }
      }
  }
  $('.code_weixin_pic').click(function(){
    code_url = $(this).attr('code_url');
    getImageWidth(code_url,function(w,h){
      w=w>320?"320":w;
      h=h>440?"440":h;
      layer.open({
        title: false,
        offset: 'auto',
        area: [w+'px',h+'px'],
        type: 1,
        closeBtn: 0,
        shadeClose: true,
        content: '<img style="max-width: 320px;" src="'+code_url+'">' //这里content是一个普通的String
      });
    });
  });
  $('.code_alipay_pic').click(function(){
    code_url = $(this).attr('code_url');
    getImageWidth(code_url,function(w,h){
    w=w>320?"320":w;
    h=h>498?"498":h;
    layer.open({
      title: false,
      offset: 'auto',
      area: [w+'px',h+'px'],
      type: 1,
      closeBtn: 0,
      shadeClose: true,
      content: '<img style="max-width: 320px;" src="'+code_url+'">' //这里content是一个普通的String
    });
    });
  });
  layui.code({about: false,elem: 'pre',height: '600px'});
  /*
  // 阅读
  if(typeof id!='undefined'){
    $.get('/index/index/p_views.html',{'id':id},function(res){
      $('.pub_date em').text(res);
    });
  }
  */
  // 评论
  form.on('submit(comment)', function(data){
    var data = data.field;
    $.post('/index/index/comment_save.html',{'data':data},function(res){
      if (res.status==200) {
        parent.layer.msg(res.msg);
        $.get('/index/index/token.html',function(new_token){
          $('#token').val(new_token);
        });
        $('.reply_form').remove();
        window.location.reload();//刷新当前页面
      } else {
        parent.layer.msg(res.msg?res.msg:res);
      }
    });
    return false;
  });
  // 评论回复
  $('.reply').click(function(){
    var token = $('#token').val();
    var id = $(this).attr('id');
    // var uid = $(this).attr('uid');
    var aid = $(this).attr('aid');
    var form_html = '<div class="reply_form">'+
                    '<form class="layui-form" action="">'+
                    '  <input type="hidden" name="__token__" value="'+token+'">'+
                    '  <input type="hidden" name="pid" value="'+id+'">'+
                    // '  <input type="hidden" name="uid" value="'+uid+'">'+
                    '  <input type="hidden" name="aid" value="'+aid+'">'+
                    '  <div class="input">'+
                    '    <input type="text" name="comment" id="comment" required lay-verify="required" placeholder="写下你的评论……" autocomplete="off" class="layui-input">'+
                    '  </div>'+
                    '  <div class="button">'+
                    '      <button class="layui-btn layui-btn-radius layui-btn-sm" lay-submit lay-filter="comment">发表</button>'+
                    // '      <button type="reset" class="layui-btn layui-btn-radius layui-btn-sm layui-btn-primary">取消</button>'+
                    '      <a href="javascript:;" class="cancel">取消</a>'+
                    '  </div>'+
                    '</form></div>';
    $('.reply_form').remove();
    $(this).after(form_html);
  });
  $(document).on('click','.cancel',function(){
    $('.reply_form').remove();
  })
  // 详情中文章下方提示
  $.getJSON("/static/index/js/json.json", function (data){
    $('.article_tip').html(data.article_tip);
    $('.praise-reward-trample-t .r').text(data.reward);
  });
  $('.more_features').click(function(){
    var aid = $('article').attr('aid');
    layer.open({
      type: 2,
      title: '反馈信息',
      shade: false,
      area: ['320px','300px'],
      maxmin: false,
      shadeClose: true,
      content: ['/index/index/feedback.html?aid='+aid,'no']
    });
  });
  // 分享
  $('.share_a').click(function(){
    var data = $(this).attr('data');
    var url = $('meta[property="og:url"]').attr("content");
    var title = $('meta[property="og:title"]').attr("content");
    var description = $('meta[property="og:description"]').attr("content");
    var image = $('meta[property="og:image"]').attr("content");
    if (data=='bds_qzone') {
      window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+title+'&desc='+description+'&summary=&site=&pics='+image);
    } else if (data=='bds_tsina') {
      window.open('https://service.weibo.com/share/share.php?url='+url+'&title='+title+'&appkey=&pic='+image+'&searchPic=true');
    } else if (data=='bds_weixin') {
      $.get('/index/index/qrcode.html',{'data':url},function(res){
        layer.open({
          title: false,
          offset: 'auto',
          // area: [w+'px',h+'px'],
          type: 1,
          closeBtn: 0,
          shadeClose: true,
          content: res //这里content是一个普通的String
        });
      });
    } else if (data=='bds_sqq') {
      window.open('https://connect.qq.com/widget/shareqq/index.html?url='+url+'&title='+title+'&desc='+description+'&summary=&site=&pics='+image);
    } else if (data=='bds_tqf') {
      window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+url+'&title='+title+'&desc='+description+'&summary=&pics='+image);
    }
  });
  // 关注
  $(document).on('click','.focus_on',function(){
    var uid = $(this).attr('uid');
    $.get('/index/index/u_follow.html',{'uid':uid},function(res){
      if (res.status==200) {
        parent.layer.msg(res.msg);
      } else {
        parent.layer.msg(res.msg?res.msg:res);
      }
    });
  });




});