/*  */
//导航更多
$('.zthe-001uad    .mornav').mouseenter(function () {
    $(this).addClass('on')
    $('.mornav_-001uwrap').slideDown()
    })
    $('.zthe-001uad').mouseleave(function () {
    $('.mornav_-001uwrap').slideUp()
    $('.zthe-001uad    .mornav').removeClass('on')
    })
    
    // img
    if($('.lazy').size()>=0){
    $('img.lazy').lazyload({
    //	 placeholder : "images/loading.gif",
    effect : 'fadeIn',
    threshold : 700
    });
    }
    
    $('#data_box ul li').mousemove(function (e) {
    var name = $(this).attr('data-zb');
    $('.poppup-item').show();
    $(".poppup-item .lis[data-name="+ name +"]").show()
    var downx=e.pageX;
    var downy=e.pageY;
    $('.poppup-item').css({'left':downx,'top':downy})
    })
    $('#data_box ul li').mouseleave(function () {
    $('.poppup-item,.poppup-item .lis').hide();
    })
    
    //左右 滚动
    function HomeScroll(a,b){function g(){var g=$(window).scrollLeft(),h=$(window).scrollTop(),i=$(document).height(),j=$(window).height(),k=c.height(),l=d.height(),m=k>l?f:e,n=k>l?d:c,o=k>l?c.offset().left+c.outerWidth(!0)-g:d.offset().left-c.outerWidth(!0)-g,p=k>l?l:k,q=k>l?k:l,r=parseInt(q-j)-parseInt(p-j);$(a+","+b).removeAttr('style'),j>i||p>q||m>h||p-j+m>=h?n.removeAttr('style'):j>p&&h-m>=r||p>j&&h-m>=q-j?n.attr('style',"margin-top:"+r+"px;"):n.attr('style',"_margin-top:"+(h-m)+"px;position:fixed;left:"+o+"px;"+(j>p?'top':'bottom')+":0;")}if($(a).length>0&&$(b).length>0){var c=$(a),d=$(b),e=c.offset().top,f=d.offset().top;$(window).resize(g).scroll(g).trigger('resize')}}
    $(function(){
    HomeScroll('.cont-001u_L','.cont-001u_R');
    })
    
    //微信展示
    $('.search_-001uwrap    a.wx').mouseenter(function () {
    $('.search_-001uwrap    .ewmwr-001uap').stop().slideDown();
    }).mouseleave(function () {
    $('.search_-001uwrap    .ewmwr-001uap').stop().slideUp();
    })
    $('.search_-001uwrap    a.qq').mouseenter(function () {
    $('.search_-001uwrap    a.wx').css('width','35px')
    }).mouseleave(function () {
    $('.search_-001uwrap    a.wx').css('width','120px')
    })
    
    // TAB
    function  tab_mouser(e,f) {
    e.mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    if(f){f.hide().eq($(this).index()).show();}
    })
    }
    // TAB2
    function  tab_mouser2(a,b) {
    a.mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $(this).parent('div').next('div').find(b).eq($(this).index()).show().siblings().hide();
    })
    }
    
    tab_mouser($('.head_-001utj    .tj_it-001uem    .ite-001um'));//周免 爆料 技巧切换
    tab_mouser($('.downl_-001ubox    .btn_-001ur    a'),$('.downl_-001ubox    .img    img'));//弹窗二维码切换
    tab_mouser($('.Gx_item    .Gx_tab    p'),$('.Gx_item    .item_list    .list'));//更新切换
    tab_mouser($('.new_item    .new_tab    p'),$('.new_item    .list    ul'));//新闻
    tab_mouser($('.bl_item    .bl_tab    p'),$('.bl_item    .ite-001um'));//右侧爆料
    tab_mouser($('.Min2_cont    .SJ_tab    span'),$('.JS_item    .ite-001um'));//赛季
    tab_mouser($('.Min_3    .tab_l-001uis    a'),$('.Min3_cont    .cont_list'));//Min3 tab
    
    tab_mouser($('.Ritem-001u_4    .r_ta-001ub    p'),$('.Ritem-001u_4    .lis'));//右侧排行
    tab_mouser($('.tggl    .tab_l-001uis    a'),$('.tggl_cont    .lis'));//通关攻略
    tab_mouser($('.chuzhuang    .lis    a'),$('.chuzhuang    .ite-001um    .lis'));//英雄出装
    tab_mouser($('.guanxi    .lis    a'),$('.guanxi    .ite-001um    .lis'));//英雄关系
    tab_mouser($('.jn_item    ul    li'),$('.jn_item    .ite-001um    .lis'));//更新
    tab_mouser($('.Ritem-001u_e    .r_ta-001ub    p'),$('.Ritem-001u_e    .war-001up    ul'));//最热攻略
    tab_mouser($('.Ritem-001u_e    .war-001up    ul    li'));//最热攻略
    tab_mouser($('.Ritem-001u_b    .tit-001ue    .data-001u_a'),$('.Ritem-001u_b    .ite-001um    .inf-001uo'));//最热攻略
    
    
    // tab_mouser2($('.JS_item    .ite-001um    .day_tab    span'),$('.list'));// 赛季日期切换
    tab_mouser2($('.Min3_L    .yx_tab    p'),$('.ite-001um'));// 压制英雄切换
    tab_mouser2($('.Min6_tab    span'),$('.ite-001um'));// 攻略切换
    tab_mouser2($('.tggl_tab    span'),$('.ite-001um'));// 通关攻略
    tab_mouser2($('.gx_hreotab    .img'),$('p'));// 游戏礼包
    
    //index
    $('.tab_wrap    .tab_l-001uis    a').mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    $(this).parents('.tab_wrap').find('.tab_item').find('.lis').eq($(this).index()).show().siblings().hide();
    })
    
    // 技巧
    function  tab_mouser3(a,b) {
    a.mouseenter(function () {
    $('.blit-001uem    .ite-001um').eq(b).show().siblings().hide();
    $('.blit-001uem    .ite-001um').eq(b).find('.lis').eq($(this).index()).show().siblings().hide();
    $('.blit-001uem').slideDown(function () {
    $('.blit-001uem').stop()
    });
    })
    }
    tab_mouser3($('.head_-001utj    .jiqiao    a'),0)
    tab_mouser3($('.head_-001utj    .zhoumian    a'),1)
    
    
    $('.bl_li-001ust').mouseenter(function () {
    $('.blit-001uem').slideUp();
    $('.blit-001uem    .ite-001um').hide()
    })
    $('.head_-001utj    .tj_it-001uem    .ite-001um').eq(0).mouseenter(function () {
    $('.blit-001uem').slideUp();
    $('.blit-001uem    .ite-001um').hide()
    })
    $('.blit-001uem').mouseleave(function () {
    $('.blit-001uem').slideUp();
    $('.blit-001uem    .ite-001um').hide()
    })
    
    //弹窗下载
    $('#downl_btn').click(function () {
    $('.Gm_do-001uwnl').fadeIn();
    })
    $('.Gm_do-001uwnl    .mengb-001uan').click(function () {
    $('.Gm_do-001uwnl').fadeOut();
    })
    
    // 弹窗居中
    function  position_() {
    $('.downl_-001ubox').css({'left':$(window).width()/2 - 240,'top':$(window).height()/2 - 200});
    var r_ = $(window).width()/2 - 700;
    if(r_<0){r_=0}
    $('.ztfix_nav').css({'right':r_})
    }
    position_();
    $(window).resize(function () {
    position_()
    })
    
    // 幻灯
    if($('#hdsilid').size()>=1){
    var hdlis =	$('#hdsilid .bd ul li').size();
    for(i=0;i<hdlis;i++){
    $('#hdsilid .hd ul').append('<li></li>');
    }
    $('#hdsilid .hd ul li').css('width',390/hdlis)
    jQuery("#hdsilid").slide({
    mainCell: '.bd    ul',
    effect:'leftLoop',
    autoPlay: true,
    trigger: 'mouseover',
    easing: 'swing',
    delayTime: '500',
    mouseOverStop: 'true',
    pnLoop: 'true'
    });
    }
    
    // 标签
    $('.hover-001u_bq    a').mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    if($(this).hasClass('li_1')){
    $('.li_-001u1').css({'left':'0','top':'0'})
    $('.li_-001u2').css({'left':'131px','top':'0'})
    $('.li_-001u3').css({'left':'262px','top':'0'})
    $('.li_-001u4').css({'left':'131px','top':'39px'})
    $('.li_-001u5').css({'left':'262px','top':'39px'})
    }else if($(this).hasClass('li_2')){
    $('.li_-001u1').css({'left':'0','top':'0'})
    $('.li_-001u2').css({'left':'131px','top':'0'})
    $('.li_-001u3').css({'left':'262px','top':'0'})
    $('.li_-001u4').css({'left':'0','top':'39px'})
    $('.li_-001u5').css({'left':'262px','top':'39px'})
    }else if($(this).hasClass('li_3')){
    $('.li_-001u1').css({'left':'0','top':'0'})
    $('.li_-001u2').css({'left':'131px','top':'0'})
    $('.li_-001u3').css({'left':'262px','top':'0'})
    $('.li_-001u4').css({'left':'0','top':'39px'})
    $('.li_-001u5').css({'left':'131px','top':'39px'})
    }else if($(this).hasClass('li_4')){
    $('.li_-001u1').css({'left':'0','top':'39px'})
    $('.li_-001u2').css({'left':'0','top':'0'})
    $('.li_-001u3').css({'left':'262px','top':'0'})
    $('.li_-001u4').css({'left':'131px','top':'0'})
    $('.li_-001u5').css({'left':'262px','top':'39px'})
    }else if($(this).hasClass('li_5')){
    $('.li_-001u1').css({'left':'0','top':'0'})
    $('.li_-001u2').css({'left':'0','top':'39px'})
    $('.li_-001u3').css({'left':'131px','top':'0'})
    $('.li_-001u4').css({'left':'131px','top':'39px'})
    $('.li_-001u5').css({'left':'262px','top':'0'})
    }
    })
    
    
    // 赛程轮播
    if($('.day_item    .list    .slidwrap').size()>=1){
    var myDate = new Date();
    var Month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var show_item = 0;
    var day_all =[]
    // console.log("月:"+ Month + '_' +"日:" +day)
    $('#sc_item li').each(function () {
    var month_ = $(this).attr('data-month');
    if(month_==Month){
    $(this).addClass('onmonth');
    day_all.push($(this).attr('data-day'))
    }
    })
    day_all.sort(function(a,b){
    return Math.abs(a-day)-Math.abs(b-day);
    })
    // console.log(day_all[0])
    for(i=0;i<$("#sc_item li").size();i++){
    if($("#sc_item li").eq(i).attr('data-day')==day_all[0] && $("#sc_item li").eq(i).hasClass('onmonth')){
    show_item=i-1;
    }
    }
    if($("#sc_item .onmonth").size()<=1){
    show_item = $('#sc_item li').size()-3;
    }
    // console.log(show_item)
    jQuery('.day_item    .list    .slidwrap').slide({titCell:'.hd    ul',mainCell:'.bd    ul',autoPage:true,effect:'left',vis:3,'defaultIndex':show_item ,'pnLoop':false});
    }
    // 其他游戏
    if($('.Min7_cont    .slidwrap_tl').size()>=1){
    jQuery('.slidwrap_tl').slide({titCell:'.hd    ul',mainCell:'.bd    ul',autoPage:true,effect:'leftLoop',vis:8});
    }
    
    //标签
    $('.bq-item    .ite-001um').each(function () {
    if($(this).height()>61){
    $(this).css('max-height','60px')
    $(this).find('.lis').next('.mor_list').show();
    }
    })
    $('.bq-item    .ite-001um    .mor_list').click(function () {
    if($(this).hasClass('on')){
    $(this).removeClass('on')
    $(this).parents('.ite-001um' ).css('max-height','60px')
    $(this).html('展开')
    }else{
    $(this).addClass('on');
    $(this).html('收起')
    $(this).parents('.ite-001um').css('max-height','initial')
    }
    })
    
    //英雄筛选
    $('#hero_tab li').mouseenter(function () {
    $(this).addClass('on').siblings().removeClass('on');
    var data_yx = $(this).attr('data-yx');
    if(data_yx=='所有'){
    $('#hero_lis .lis').show();
    }else{
    $('#hero_lis .lis').hide();
    $('#hero_lis .lis[data-yxlis='+data_yx+']').show();
    }
    })
    function getname() {
    var data_name = $('#key').val();
    $('#hero_lis .lis').hide()
    $('#hero_lis .lis[data-name='+data_name+']').show();
    }
    $("#key").bind('input    porpertychange',function(){
    getname();
    });
    
    $('.search_box    .btn').click(function () {
    getname();
    })
    $('#yx_btn').click(function () {
    $('.yx_search').slideDown();
    })
    
    $('.yx_wrap    .lis').click(function () {
    $('.yx_search').slideUp();
    })
    $(document).bind('click',function(e){
    var target = $(e.target);
    if(target.closest('.search_yx').length == 0){
    $('.yx_search').slideUp()
    }
    })
    //英雄信息
    $('.pf-tab    .lis').mouseenter(function () {
    var url = $(this).attr('data-url');
    var name_ = $(this).find('span').html();
    $('.hreo_bg').css('background','url("'+url+'")')
    $('.name_box    .nam-001ue    i').html(name_)
    $('.btn_lis    .btn_2').attr('data-txtb',name_);
    })
    //英雄故事 台词弹窗
    $('.btn_lis    span').click(function () {
    $('.txtwrap').css('height',$(document).height())
    var name = $(this).html();
    $('.hero-story    .story_top').html(name);
    $('.txt_list    div').hide();
    if($(this).hasClass('btn_1')){
    $('.txt_list    div.story_txt').show();
    }else{
    $('.txt_list    .txt').show();
    }
    
    $('.txtwrap').fadeIn()
    var w_h = $(window).height();
    var box_ = $('.hero-story').height();
    $("body,html").animate({scrollTop:0},300);
    if(box_<w_h){
    $('.txtwrap    .hero-story').css('margin-top',(w_h - box_)/2)
    }else{
    $('.txtwrap    .hero-story').css('margin-top','100px')
    }
    })
    
    $('.hero-story    .clos_btn').click(function () {
    $('.txtwrap').hide();
    })
    
    $('#comments_btn').click(function () {
    var top = $('.comments-001u_wrap').offset().top;
    $("body,html").animate({scrollTop:top},500);
    })
    
    //视频切换
    $('.video_-001urit    .net    ul    li').click(function () {
    var url = $(this).attr('data-url');
    if(url){
    $('.vide-001uo').html('<embed src="'+url+'" allowFullScreen="true" quality="high" width="800" height="555" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>')
    }
    
    })
    
    
    
    
    
    
    //悬浮导航
    if($('.index')){
    $(window).scroll(function() {
    var scroll_len = $(window).scrollTop();
    if(scroll_len<1000){
    $('.ztfix_nav').fadeOut();
    }else {
    $('.ztfix_nav').fadeIn();
    }
    var wrapnm = $('.index    .post').size();
    for(i=0;i<wrapnm;i++){
    var top_ = $('.index    .post').eq(i).offset().top;
    var top2_ = $('.index    .post').eq(wrapnm-2).offset().top;
    if(scroll_len>top_ && scroll_len<top2_){
    $('.ztfix_nav    span').removeClass('on');
    $('.ztfix_nav    span').eq(i+1).addClass('on')
    }else if(scroll_len>top2_){
    $('.ztfix_nav    span').removeClass('on');
    $('.ztfix_nav    span').eq(6).addClass('on')
    }
    if(scroll_len<1250){
    $('.ztfix_nav    span').removeClass('on');
    $('.ztfix_nav    span').eq(0).addClass('on')
    }
    
    }
    });
    }
    $('.ztfix_nav    span').click(function(){
    var nm_ = $(this).index();
    var anm_ =  $('.index    .post').eq(nm_).offset().top;
    $("body,html").animate({scrollTop:anm_ - 300},300);
    if(nm_!=6){
    $('.ztfix_nav    span').removeClass('on');
    $(this).addClass('on');
    }else{
    console.log('111')
    $('.ztfix_nav    span').removeClass('on');
    $('.ztfix_nav    span').eq(6).addClass('on')
    }
    })
    $('.ztfix_nav    p').click(function () {
    $("body,html").animate({scrollTop:0},300);
    })
    
    $('.Ritem-001u_3    .downl').mouseenter(function () {
    $this = $(this).find('span')
    if($this.html() != '进入'){
    var txt = $(this).html();
    $this.html('下载');
    $(this).mouseleave(function () {
    $(this).find('span').html(txt)
    })
    }
    })
    
    