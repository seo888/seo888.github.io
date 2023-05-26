$(function() {
	
	ajaxfrm();		
	 //$("#content-show img").lazyload();
   $("#content-show p>img").click(function(){ var t=$(this);location.href=t.attr('src'); });
		$('#morebtn,.morebtn').each(function() {
      var btn=$(this),page=parseInt(btn.attr('page'))||2,
			template=btn.attr('template')||'tpl-row',container=btn.attr('container')||'morebox',container=$('#'+container);
       var sList=new ScrollList({
            url: btn.attr('url')||window.document.location.href,
            trigger: btn,
            container: container,
            template: $('#'+template).html(),
            page:page,
            pagesize:btn.attr('pagesize')||10,
            //ajaxOptions: {inslider: '0'},
            //sorttime: container.children().first().attr('data-sorttime') || 0
        });
				btn.data['ScrollList']=sList;
				if(page==1)btn.click();
    });
		
$('.tab').each(function(i) {//.parent().parent(),
  var t=$(this),p=t.closest('.ui-catgory'),pc=p.next().children();
	
	//pc.wrapAll("<div class='tabwrap'></div>");
	t.find('a').bind('mouseenter0 click', function(){var t=$(this);
		p.find('a').removeClass('on');pc.hide();pc.eq(t.index()).fadeIn('100'); t.addClass('on'); return false;})
});


/*$(".js-index-slider").swipeSlide({
			autoPlay:3,
			bulletNavigation: !1,
			bulletChangeNum: !0
});*/



	aboxinit();
		
$('.ui-cate-list li').bind('mousedown',function(){ $(this).addClass('on');});	


});

function aboxinit(){
  $('.js-index-slider,.a-box').each(function() {	
	var p=$(this);
	p.height(p.find('img').height());
	p.data('count',p.find('li').length);
  if(p.data('count')<2)return;p.data('n',0);
	function abox_autoPlay(){
		var t=p.data('n');
		t=t>=p.data('count')?0:t;
		p.data('n',t)
		p.find('li').css('z-index',1);p.find('li').eq(t++).css('z-index',10);
		p.data('n',t);
	} 
	p.data('abtime',setInterval(abox_autoPlay,4000));
	abox_autoPlay();
})
}




function ajaxfrm(){ 
$('.postform').each(function() {
	var p=$(this);
	var bt=$('#submitBt');
	p.submit(function(){return false;})
	bt.click(function(){
	if(p.attr('ispost')==1){showMsg("已经提交，请等待。"); return;}	
	var r=check_form(this); if(!r)return;
	if(!ckTxtEmpty('seccode'))return ;
	
	tipMsg('正在提交数据，请稍候...');
	bt.attr('disabled','disabled');
	p.attr('ispost','1');
	var url=p.attr('action')||window.document.location.href,data=p.serialize();
	url+='&ajax=1';
	$.ajax({type:'POST',url:url,data:data,dataType:'text',
	 success:function(s){
		 	if(s=='验证码不正确'){txtFocus('seccode','验证码不正确，请重新输入！');return;}
			if(s.indexOf('成功')>-1){  
				var gotourl=p.attr('gotourl'),fun=p.attr('callback');
				if(fun)window[fun](p,s);
				if(gotourl){
					s=s+'<br/>点击关闭，页面将进行转跳。'; var f=function(){ window.location.href=gotourl;}; showMsg(s,f);		
				}
			}
			else showMsg(s);	
		},
	 complete:function () { bt.removeAttr('disabled');p.attr('ispost','0'); },
	 error:function () { showMsg("提交失败。"); }
	 }) 
	}) 
}) 
}

function postifrm(p){ 
$('.postform').attr('target','postifrm').each(function() {
var p=$(this);	
var frm=$("<iframe style='display:none;' id='postifrm' name='postifrm'></iframe>").appendTo(p)
frm[0].onload=function(){
	if(!p.attr('ispost'))return;
	s=this.contentWindow.document.body.innerText||'错误未知。';
	if(s.indexOf('成功')>-1){s=s+'<br/>点击关闭，页面将进行转跳。'; var f=function(){ window.location.href=p.attr('gotourl');}; showMsg(s,f);		}
	else showMsg(s);	
	$('#submitBt').removeAttr('disabled');p.attr('ispost','0');
} 
p.submit(
	function(){
		var r=check_form(this); if(!r)return r;
		tipMsg('正在提交数据，请稍候...');$('#submitBt').attr('disabled','disabled');
		p.attr('ispost','1');
		return r;
	}
)
 
});

}

function setDivCenter(p){ 
try{p.style.top = (Math.max(document.body.scrollTop+document.documentElement.scrollTop)+ (window.innerHeight - p.offsetHeight) / 2) + "px";
      p.style.left = (document.body.scrollLeft + (document.body.clientWidth - p.offsetWidth) / 2) + "px";
}catch(e){}
}
  
function showMsg(s,f){
	var p=$("#msgBox"),m=$('#mask');
	p.find('.msg_content').html(s);
	p.find('.msg_btok_box').show();
	var bt=p.find('.msg_btok');
	bt.focus().unbind().bind('click',function(){p.fadeOut();m.fadeOut();if(f)f(); clearTimeout(p.data['timer']);});
	p.data['timer']=setTimeout(function(){bt.click();},5000 );
	if(m.is(':hidden'))m.fadeIn().css({opacity: 0.3});
	if(p.is(':hidden'))p.fadeIn().css({opacity: 0.9});
	$(window).unbind('lj').bind('scroll.lj',function(){setDivCenter(p[0])});
	setDivCenter(p[0]);
}

function tipMsg(s){
	var p=$("#msgBox"),m=$('#mask');
	if(s==''){p.fadeOut();m.fadeOut();return;}
	p.find('.msg_content').html(s);
	p.find('.msg_btok_box').hide();
	m.fadeIn().css({opacity: 0.3});
	p.fadeIn().css({opacity: 0.9});
	$(window).unbind('lj').bind('scroll.lj',function(){setDivCenter(p[0])});
	setDivCenter(p[0]);
}

function txtFocus(name,s){
	var p=$('[name='+name+']');
	if(p.length==0)return;
	var s=s||p.attr('tip');
	var fun=function(){p.focus().select(); }
	showMsg(s,fun);
}

function ckTxtEmpty(name){
	var p=$('[name='+name+']');if(p.length==0)return true;
	var s=p.attr('tip');if(p.val()!='')	return true;
	txtFocus(name,s);
	return false;
}

function moreListQuery(){
	$('#morebox').empty(); var bt=$('#morebtn');bt.data['ScrollList'].page=1;bt.show().click();
}

$.getScript = function (url, success) {
        var script = document.createElement("script"),
         $script = $(script);
        script.src = url;
        $("head").append(script);
        if(success)$script.bind('load', success);
		$script.remove();
}


$.getScript("http://img.xtol.cn/js/sharewechat.js");

window.onload=function(){
try{
	$('#moreMenuBt').click(function(){$('>div',this).toggle();
	$('body').bind('mousemove',function(e){
		var t=$(e.target).closest('#moreMenuBt');
	if(t.length==0){$('#moreMenuBt>div').hide();$('body').unbind('mousemove');}});
	});
	
   
		
    if(/Macintosh|Mac_PowerPC|Windows NT|Windows XP|Linux/i.test(navigator.userAgent)){
        console.log("pc")
        // pcSite();
    }else if (/Android|webOS|iPhone|Windows Phone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
        console.log("X Phone");
    }else{
       console.log("Phone")
       //browser.jump();
    }
}catch(e){};

    

}