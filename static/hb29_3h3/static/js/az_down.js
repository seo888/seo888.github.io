$.ajaxSetup({cache:true});//jquery缓存设置true ($.getScript 方法就不会带时间戳)
//ip区域下载限制
if (typeof (_pageinfo) != "undefined" && typeof (_pageinfo.no_down_ips) != "undefined" && _pageinfo.no_down_ips != "" && _pageinfo.no_down_ips != ",") {

    $.getJSON('/index.php?m=content&c=content_ajax&a=isNoDownIp&id=' + _pageinfo.id + '&no_down_ips=' + _pageinfo.no_down_ips, function (data) {
        if (data == 1) {
            $('.addr').before('<div class="keyText" style="margin: 0 10px 10px;"><span style="font-size:16px;"><strong>当前游戏下载地址已经删除。</strong></span></div>');
            $('.addr').hide();
        }
    });
}
//二维码
if(typeof(id)!="undefined"){
	var qrcode = new QRCode(document.getElementById("qrcode"), {width : 102,height : 102});
	qrcode.makeCode("http://m.3h3.com/az/"+id+".html");
}
if($('.downaddress_info').length >0){
	if($('.downaddress_info ul li').length == 0)$('.downaddress_info').parent().hide();
}
var xgyd_isnull = true;
$('.m-likeinfo').each(function(i){//相关阅读空的时候，删除相关阅读
	$(this).find('dd .slidetxt .bd .txtlist').each(function(k){
		if($.trim($(this).html())==''){$('.m-likeinfo:eq('+k+')').addClass('dn');}else{xgyd_isnull=false;}
	});
});
if(xgyd_isnull==true){
	$('.qbox .bigtit .m-hottag').parent().parent().html('');$('.art-tab ul li:eq(5)').html('');
	$('.catalog-list .catalog-title').each(function(){if($.trim($(this).text())=='相关阅读'){$(this).html('');}})
}
/*$('.inp').next().attr('type','button');
$('.so .so-ff form').prop("outerHTML", $('.so .so-ff form').html());
$('.so .so-ff .inp').bind('keypress',function(event){
    if(event.keyCode == "13"){
		$(".so-ff .btn").click();
    }
});
$('.so-ff .btn').click(function(){
	location.href="/search.php?m=search&c=index&a=init&typeid=0&sort=updatetime&q="+$('.inp').val();
});*/

var cnxh_isnull = true;
var IsFirstZj = false;
$('.tab-love-con').each(function(i){
	//if(i>0){$(this).addClass('dn');}
	if($.trim($(this).find('.m-youlove').html())==''){console.log('猜你喜欢'+i);$(this).addClass('dn');$('.qbox .bigtit .ul-art-tag li:eq('+i+')').addClass('dn');}else{cnxh_isnull = false;}
    if($.trim($(this).html())!='' && !IsFirstZj){$(this).attr('style','display="block"');IsFirstZj = true;$('.ul-art-tag li:eq('+i+')').addClass('on');}
});
if(cnxh_isnull == true){//猜你喜欢全部空时
	console.log('猜你喜欢全部空');
	$('.qbox .bigtit .ul-art-tag').parent().parent().html('');$('.art-tab ul li:eq(2)').hide();
	//把相关标签替换成特征
	/*$('.art-appinfo .info .m-hottag a').each(function(i){
		if($(this).hasClass('dn')){
			$(this).show();
		}else{
			$(this).hide();
		}
	});*/
}

var cai_temp = "<dd class='catalog-title level2'><span class='text'><a href='javascript:;' class='title-link qxh cai_dd' val='{val}'>{title}</a></span></dd>";
var cai_html = "";

$('.ul-art-tag li').each(function(i){//如果哪个猜你喜欢没有隐藏，则显示
	if($(this).hasClass('dn')==false){
		$('.tab-love-con:eq('+i+')').show();
		cai_html += cai_temp.replace("{title}",$(this).text()).replace("{val}",i);
	}
});

$('.tab-love-con').each(function(i){//把不是第一个的都隐藏了
	if(i>0){
		$(this).hide();
	}
});

if(cnxh_isnull==false){$('.cai_dt').after(cai_html);}else{$('.cai_dt').addClass('dn');}
$('.art-tab ul li').each(function(){
    if($.trim($(this).text())=='玩家评论'){$(this).remove();}
});
$('.downaddress_info_qbox').removeClass('qbox');//游戏信息去掉该class防止点击序号取错
if($.trim($('.qbox .ul-oapp').html())==''){$('.qbox .ul-oapp').parent().html('');$('.art-tab ul li:eq(3)').remove();$('.art-tab ul li').each(function(){if($.trim($(this).text())=='其他版本'){$(this).remove();}});$('.catalog-list .catalog-title').each(function(){if($.trim($(this).text())=='游戏其他版本'){$(this).remove();}})}//游戏其他版本空的时候
if($.trim($('.col-r .downright .ul-pictxt').html())==''){$('.col-r .downright .ul-pictxt').prev().addClass('dn');$('.col-r .downright .ul-pictxt').addClass('dn');}//相关游戏是否空


	var content_h4 = "游戏介绍,游戏背景,游戏特点,游戏评测,游戏视频,更新内容,使用说明,汉化说明,修改说明".split(",");
	var html = "";
	var temp = "<dt class='catalog-title level2' id='Qijs'><em class='pointer'></em><span class='text'><a href='javascript:;' class='content_title_a'>{title}</a></span></dt>";
	$('.main .wp .qbox .art-body h4').each(function(i){
		$this = $(this);
		for (i=0;i<content_h4.length;i++){
			if($this.text().indexOf(content_h4[i])>-1){
				html += temp.replace("{title}",content_h4[i]);
			}
		}
		if($(this).text().indexOf("")){$(this).addClass('dn');}
	});
	$('.catalog-list .catalog-title:eq(0)').after(html);
	$('.content_title_a').click(function(){
		if($.trim($('.art-openz1 a').text())=='展开'){$('.art-openz1 a').click();}
		$this_text = $(this).text();
		$('.main .wp .qbox .art-body h4').each(function(i){
			if($(this).text().indexOf($this_text)>-1){
				$('html, body').animate({
                    scrollTop: $(this).offset().top-50
                }, 500);
			}
		});
	});

	$('.tag').each(function(i){
		$(this).addClass('c'+(i+1));
	    $(this).click(function(){
			tzxh(i);
		});
	});
	$('.cai_dd').each(function(i){$(this).click(function(){tzxh($(this).attr('val'));});});//右边导航猜你喜欢里的点击关联

	if($('.qbox .ul-oapp li').length==0){$('.qbox .ul-oapp').parent().addClass('dn');}


$('.btn-ping').click(function(){

     var ss = $('#ping').offset().top;
      $('html,body').animate({scrollTop:ss},600);
      return false;
});
// 下载地址触发弹出事件
/*$('.ul-addr a').click(function () {//.ul-addr a实际为这个，先隐藏

    layer.open({
      type: 1,
      title: false,
      shade:0.6,
      closeBtn: 0,
      area: ['988px', '335px'],
      shadeClose: true,
      skin: 'open-down',
      content: $('#open')
    });
    //return false;//不注释下载不了

});*/

$('.close').click(function(){
  layer.closeAll();
});
var ss = 0;
    if($('#q8').length>0){//距离多少时右边导航隐藏
        ss = $('#q8').offset().top-0;
    }else{
        if($('#xgxz_div').length > 0)ss = $('#xgxz_div').offset().top-0;
    }
    io = 0;
  $(window).scroll(function(){
    var s = $(window).scrollTop();
    if(s > 300 && s<ss){
      $("#goTop").css("visibility","visible");
      $('.side-catalog').show();
      ch = $('.catalog-scroller').height()+50;
      $('.side-bar,.side-catalog').height(ch);
    }else{
       $("#goTop").css("visibility","hidden");
      $('.side-catalog').hide();
    };
	if(s > 100 && s<1600){
      $("#s_goTop").css("visibility","visible");
    }else{
       $("#s_goTop").css("visibility","hidden");
    };


    io = $('.art-tab li.on').index('.art-tab li');

    if(io < 4) {
            if(s>500){
                $('.art-tab').addClass('art-tab-fix');
                $('#artfix').height(60);
            }
            else
            {
                $('.art-tab').removeClass('art-tab-fix');
                $('#artfix').height(0);
            }

            ss2 = $('#q5').offset().top-50;

            if(s > ss2) {
                 $('.art-tab').fadeOut(200);
            }
            else
            {
                 $('.art-tab').fadeIn(200);
            }
    }
    else
    {
        $('.art-tab').removeClass('art-tab-fix');
        $('#artfix').height(0);
    }


  });
  
  $('.art-tab li').click(function(){
        
       x = $(this).index('.art-tab li');
       $('.art-tab li').removeClass('on');
       $(this).addClass('on');
       $('.qbox').css('display','block');
       if(cnxh_isnull == true && x > 2)x=x-1;//防止猜你喜欢为空出现点击错误
       if(x>0){$('.downaddress_info_qbox').hide()}else{$('.downaddress_info_qbox').show()}
       $('.qbox:lt('+ x +')').css('display','none');
       sq = $('.art-tab').hasClass('art-tab-fix');
       if(sq) {
        $('html,body').animate({scrollTop:500},600);
       }

  });


  function tzxh(x){
	$('.tab-love-con').css("display","none");
    var ss = $('#q3').offset().top-50;
    $('html,body').animate({scrollTop:ss},600);
    $('.ul-art-tag li').eq(x).addClass('on').siblings('li').removeClass('on');
    $('.tab-love-con').eq(x).show().siblings('.tab-love-con').addClass('dn');
  }

  /* 使用js分组，每6个li放到一个ul里面 */
//jQuery(".slidetxt .bd li").each(function(i){ jQuery(".slidetxt .bd li").slice(i*6,i*6+6).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");});
jQuery(".slidetxt .bd").each(function(i){
	$(this).find('li').slice(0,6).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(6,12).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(12,18).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
	$(this).find('li').slice(18,24).wrapAll("<ul class='ul-txt li-ico-1 fix'></ul>");
});
/* 调用SuperSlide，每次滚动一个ul，相当于每次滚动6个li */
jQuery(".slidetxt").slide({titCell:".hd ul",mainCell:".bd .txtlist",autoPage:true,effect:"leftLoop",autoPlay:true});

/**下载页面分数**/
function getDownFen(num){
	$.ajax({
		type:"get",
		url:"/index.php?m=content&c=content_ajax&a=getzan",
		data:"ruo=1&modelid=2&id="+id,
        dataType:'json',
		success:function(result){
            if(result){
                var dataObj=result.datas;
                console.log(result);
                $('.zan .good span b').text(dataObj['fen']['good']+'%');
                $('.zan .bad span b').text(dataObj['fen']['bad']+'%');
                var fen = (dataObj['fen']['good']/10).toFixed(0);
                if(dataObj['zancount']==1 && dataObj['ruocount']==1){fen=5;}
                $('.gfen b').text(fen);
                if(fen<=5){$('.gfen').addClass('gfen-tong');}
                if(fen>5&&fen<8){$('.gfen').addClass('gfen-yin');}
                if(fen>=8){$('.gfen').addClass('gfen-jin');}
            }
		}
	});
}
getDownFen(0);
$('.zan .good').click(function(){if(getCookie("zan_"+id)==null||getCookie("zan_"+id)==false){getDownFen(1);setCookie("zan_"+id,1);}else{alert('对不起，您投票过了！');}});
$('.zan .bad').click(function(){if(getCookie("zan_"+id)==null||getCookie("zan_"+id)==false){getDownFen(2);setCookie("zan_"+id,1);}else{alert('对不起，您投票过了！');}});

$az_index = 0;
$('.bd .ul-appbig li a').each(function(){
	$(this).attr('class','az_download_a');
	$(this).attr('id','az_download_a'+$az_index);

	$az_index++;
});


if(typeof (_pageinfo) != "undefined" && typeof(_pageinfo.no_legal_gm)!='undefined' && _pageinfo.no_legal_gm=='1' && $('.qbox .m-downaddr').attr('is_subscribe') != 1){//非法游戏
	$('.col-l .btn .a_down').parent().addClass('no_down_btn');
	$('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/close_down.jpg">');
	//$('.qbox .m-downaddr .addr').html('<div class="keyText" style="color: #Fc6e0c;">重要提示！！！<br>由于本游戏违反国家相关规定，本站将不提供资源下载！</div>');
}
if($.trim($('.qbox .m-downaddr .addr').html())=="" && $('.qbox .m-downaddr').attr('is_subscribe') != 1){//没有下载地址
    $('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/close_down.jpg">');
    $('.art-appinfo .btn').addClass('no_down_btn');
    $('.art-appinfo .btn').removeClass('btn');
}
//停止运营
if($('.qbox .m-downaddr').attr('is_stop_gm') == 1){
    $('.art-appinfo .a_down').parent().addClass('stop_down_btn');
    $('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/close_down.jpg">');
    //$('.qbox .m-downaddr .other_down').html('<li><a rel="nofollow" href="javascript:;">停止运营</a></li>');
}
//预约
if($('.qbox .m-downaddr').attr('is_subscribe') == 1){
    $('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/stop_gm.jpg">');
    $('.art-appinfo .btn').addClass('yuyue');
    $('.art-appinfo .btn a').addClass('btn_yuyue').attr('href','#yuyue_div').attr('rel','').removeClass('a_down');
    $('body').append('<div id="yuyue_div" class="dn">');
    var yuyue_html = '<a href="javascript:void(0);" class="modal_close"></a><h3>请输入预约的手机号码</h3><div class="con"><div class="box_val"><input name="" id="yuyue_mobile" placeholder="输入手机号码" maxlength="11"/></div><div class="box_btn"><span class="btn_q">确定</span><span class="btn_c">取消</span></div>';
    $('#yuyue_div').html(yuyue_html);
    $.getScript("/statics/js/android/jquery.leanModal.min.js",function(){
        $(".btn_yuyue").leanModal({top: 300,closeButton: ".modal_close" });
    });
    $('.box_btn .btn_q').bind('click',function(){
        var sTel = $('#yuyue_mobile').val();
        var zTel = /^1[34578]\d{9}$/.test(sTel);
        if(!zTel){
            alert('请填写正确的手机号！');
            $('#yuyue_mobile').focus();
            return false;
        }
        alert('预约成功！');
        $('#lean_overlay').click();
    });
    $('.box_btn .btn_c').bind('click',function(){
        $('#lean_overlay').click();
    });
    $('.qbox .m-downaddr .addr').html('<img src="../statics/images/android/no_address.jpg">');
}
//报错反馈
if($('.qbox #q5').length > 0){
    $('body').append('<div id="wrong" class="dn" style="font-size:12px">');
    var wrong = '<a href="javascript:void(0);" class="modal_close"></a><h3>报错反馈</h3><div class="con"><p>请描述您所遇到的错误，我们将尽快予以修正，谢谢！</p><form action=""> <input type="radio" name="err_type" value="nodown" checked>无法下载&nbsp;<input type="radio" name="err_type" value="no_install">无法安装&nbsp;<input type="radio" name="err_type" value="ver_old">版本过旧&nbsp;<input type="radio" name="err_type" value="malice_deduction">恶意扣费&nbsp;<input type="radio" name="err_type" value="soft_virus">软件报毒&nbsp;<input type="radio" name="err_type" value="other">其他问题<br> <textarea name="" id="fankuiTx"></textarea><div class="h"></div>  <input type="button" name="" id="subBt" class="sub" value="提交反馈" />&nbsp;<input type="reset" name="" id="resetBt" class="reset" value="取消"/></form></div>';
     $('#wrong').append(wrong);
     $('#resetBt').click(function(){$('.modal_close').click();});
    $('.qbox #q5').append('<a style="line-height: 65px;font-size: 14px;float:right;color: #97c03d;cursor: pointer;" rel="nofollow leanModal" name="test" href="#wrong" class="btn-open">举报反馈</a>');
     $.getScript("/statics/js/android/jquery.leanModal.min.js",function(){
        $(".btn-open").leanModal({top: 300,closeButton: ".modal_close" });
    });
    $('#subBt').click(function(){
        var fankui = $('#fankuiTx').val();
		if(fankui==''){alert('请输入反馈内容！');return false;}
		if(fankui.length<10 || fankui.length>200){alert('对不起，反馈内容不能少于10个字符大于200个字符！');return false;}
        var err_type = $('input[name="err_type"]:checked').val();
		$.post("/index.php?m=content&c=content_ajax&a=fankui",{id:_pageinfo.id,error_type:err_type,gamename:$('.info .ffw').text(),gameurl:location.href,error_content:fankui},function(result){
			alert('您的反馈已经提交成功！');
			$('.modal_close').click();
		});
    });
}
if($('#permission').length>0){
	$('.qbox #q5').append('<a style="line-height: 65px;font-size: 14px;float:right;color: #97c03d;cursor: pointer;margin-right: 10px;" rel="nofollow leanModal" name="test" href="#permission" class="btn-open">权限</a>');
	$.getScript("/statics/js/android/jquery.leanModal.min.js",function(){
	$(".permission-open").leanModal({top: 200,closeButton: ".modal_close" });
	});
}
    
		

getDownLoadUrl();
//下载地址组合
function getDownLoadUrl(){
    var dates={
        //获取日期
        FunGetDateStr: function (p_count) {
            var dd = new Date();
            dd.setDate(dd.getDate() + p_count);//获取p_count天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            var d = dd.getDate();
            if(m<10)m = "0"+m;
            if(d<10)d = "0"+d;
            return y + "-" + m + "-" + d;
        },
        //获取当前时间
        FunGetDate: function () {
            var date = new Date(); //日期对象
            var now = "";
            now = date.getFullYear() + "-";
            now = now + (date.getMonth() + 1) + "-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
            now = now + date.getDate() + " ";
            now = now + date.getHours() + ":";
            now = now + date.getMinutes() + ":";
            now = now + date.getSeconds() + "";
            return now;
        },
    }
    var input_time = $('#download').attr('input_time');
    if(input_time != ''){
        var today = dates.FunGetDateStr(0);
        var yesday = dates.FunGetDateStr(-1);
        if(today == input_time || yesday == input_time){
            $('.dxDownAddress').removeAttr('target');
            setTimeout(function(){$('.gaosu_down li a').removeAttr('target').removeAttr('onclick');},100);
            $('.dxDownAddress').on('click',function(){
                if(!$(this).attr('durl')){
                    $download_url = $(this).attr('hosid')+$(this).attr('uri');
					if($(this).attr('uri').indexOf('http:')>-1 || $(this).attr('uri').indexOf('https:')>-1)$download_url = $(this).attr('uri');
                    //if($download_url.indexOf('3h3.com')>-1)$download_url += '?key='+getVifKey();
                    console.log($download_url.indexOf('3h3.com')+$download_url);
                    window.open($download_url);
                }
            });
			$('.gaosu_down').removeAttr('target');
			$('.gaosu_down').on('click','li a',function(){
				$('.dxDownAddress:eq(0)').click();
			});
        }else{
            $('.dxDownAddress').each(function(){
                if($(this).attr('uri').indexOf('http:')>-1 || $(this).attr('uri').indexOf('https:')>-1){
                    $(this).attr('href',$(this).attr('uri'));
                }else{
                    $(this).attr('href',$(this).attr('hosid')+$(this).attr('uri'));
                }
            });
        }
    }else{
        $('.dxDownAddress').each(function(){
            $(this).attr('href',$(this).attr('hosid')+$(this).attr('uri'));
        });
    }
}