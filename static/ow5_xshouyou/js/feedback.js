$(document).ready(function(){
	var width = $(window).width();
	width>1400?$("#J_Feedback").css("right",(width-1200)/2-91.5):$("#J_Feedback").css("right","10px");

	$(window).resize(function() {
		var width = $(this).width();
	    width>1400?$("#J_Feedback").css("right",(width-1200)/2-91.5):$("#J_Feedback").css("right","10px");
	});

    $(window).scroll( function() {            
        var top = $(document).scrollTop(),     
            height = $(window).height(); 
        
        if(top > 100){
            $("#J_GoTop").show();
        }else{
        	$("#J_GoTop").hide();
        }
    });
    $('#J_GoTop').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
    $(".feedback").after("<style>.suggest {display: block;right: 1%;position: absolute;top: 85%;width: 90px;height:90px;z-index: 200;position:fixed;_position: absolute;_top: expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}.suggestmsg {z-index:9999;display: none;left: 34%;position: absolute;top: 25%;width: 500px;z-index: 2000000;position:fixed;background:#eee;_position: absolute;_top: expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));} .colse {background: none repeat scroll 0 0 #222222;font-size: 15px;font-weight: bold;height:47px;padding: 0 12px;}.colse p {float:left;color:#FFF;font-size:16px;line-height: 47px;}.colse a {background: url(\"http://www.xshouyou.com/v4/images/close_icon.gif\") no-repeat 0 0 ;cursor: pointer;display: block;float: right;height: 17px;margin-top: 15px;text-indent: -9999px;width: 18px;}.lay_card {font-size: 14px;padding:14px 12px;clear: both;z-index: 99999;}.lay_card p {line-height:38px;color:#a8a8a8;}.lay_card2 {display: none;font-size: 14px;height:209px;line-height: 24px;padding: 10px 30px;clear: both;z-index: 99999;}.lay_card2 h4{width:100%;height:50px;line-height:50px;font-size:30px;color:#ce2029;}.lay_card2 p {font-size: 15px;padding-top: 20px;text-indent: 2em;width: 100%;}.card_inpbtn{ cursor:pointer;width:82px; height:34px; background:#ce2029; border:none; color:#FFF; font-size:16px;font-family:\"微软雅黑\";margin-left: 148px;}.card_inpbtn2{cursor:pointer;width:82px; height:34px; background:#a8a8a8; border:none; color:#FFF; font-size:16px;font-family:\"微软雅黑\";}.yourQQ {margin-bottom:10px;height:30px;line-height:30px;padding:0 3px;border: 1px solid #e1e1e1;color: #bbb;font-family:'微软雅黑';width: 468px;}.subcover {position: absolute; top: 0px; left: 0px;display:none; background-color: rgb(0, 0, 0); opacity: 0.5;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);z-index:9999;}.feedback{position: fixed;_position: absolute;right: 10px;bottom: 75px; z-index:10;}.feedback .btn{display: block; width: 80px; height: 80px; margin-bottom: 1px; background: url(http://www.xshouyou.com/v4/images/backtop.png) no-repeat; -webkit-transition: all 0.2s; -moz-transition: all 0.2s; -o-transition: all 0.2s; transition: all 0.2;}.feedback .go-top{background-position: 0 0;}.feedback .go-top:hover{background-position: -80px 0;}.feedback .feedback-btn{background-position: 0 -80px;}.feedback .feedback-btn:hover{background-position: -80px -80px;}.feedback-fix-ie6 a{bottom:10px}.icongotob{background:url(http://www.xshouyou.com/v4/images/j_feedback.png);}.bdshare-slide-button-box {z-index: 111}</style>");
    $(".feedback").after("<div class=\"suggestmsg\"><div class=\"colse\"><p>意见反馈</p><a href=\"javascript:hidewindow()\">关闭</a></div><div class=\"lay_card\"><p></p><form id=\"sugform\"><textarea class=\"sugcontent\" style=\"width: 97.5%; border: 1px solid #e1e1e1;color: #bbb;font-size:12px;padding:5px 5px;margin-bottom:10px;font-family:\'微软雅黑\';\" rows=\"8\" onblur=\"if($(this).html()==\'\'){$(this).html(\'点击填写您的联系方式，如：QQ、邮箱、手机号码等。\')}\" onclick=\"$(this).html(\'\')\" name=\"sugcontent\">如果你有什么好的想法或者意见,请留下你想说的话,谢谢您的支持。</textarea><br><input type=\"text\" name=\"qqnum\" onblur=\"if($(this).val()==\'\'){$(this).val(\'点击填写您的联系方式，如：QQ、邮箱、手机号码等。\')}\" onfocus=\"if($(this).val()==\'点击填写您的联系方式，如：QQ、邮箱、手机号码等。\')$(this).val(\'\')\" class=\"yourQQ\" value=\"点击填写您的联系方式，如：QQ、邮箱、手机号码等。\"><br><input type=\"button\" class=\"card_inpbtn\" value=\"确定\" onclick=\"suggestion();\">&nbsp;&nbsp;&nbsp;<input type=\"button\" class=\"card_inpbtn2\" value=\"取消\"></form><p></p></div><div class=\"lay_card2\"><h4>提交成功！</h4><p>感谢你的参与，新手游将在你们的建议中越来越完善，打造一个只属于你们的手机游戏平台。</p><p style=\"text-align:center;text-indent:0px;margin-top:30px;\"><input type=\"button\" class=\"card_inpbtn2\" value=\"确定\" style=\"width:90px;height:30px;cursor:pointer;\"></p></div></div>");
});

/*-------意见反馈--------开始-----------*/
$(function(){
    $('#J_FeedbackBtn').click(function(){$(".subcover").css({'width':$(document).width()+'px','height':$(document).height()+'px'});$(".subcover").show();$('.suggestmsg').show(300);});
    $('.colse a,.card_inpbtn2').click(function(){$('.suggestmsg').hide();$(".subcover").hide();$('.lay_card').show();$('.lay_card2').hide();$('.suggestmsg').css({'top': '25%','left': '34%'});});
    $('.sugcontent').click(function(){
        if($(this).val()=='如果你有什么好的想法或者意见,请留下你想说的话,谢谢您的支持。'){$(this).val('');}
    });
});
function getCookie(objName){
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(decodeURI(temp[1]));
    }
}
function suggestion(){
    if($(".sugcontent").val()==''||$(".sugcontent").val()=='如果你有什么好的想法或者意见,请留下你想说的话,谢谢您的支持。'||$('.yourQQ').val()==''||$(".yourQQ").val()=='点击填写您的联系方式，如：QQ、邮箱、手机号码等。'){
        alert('提交内容不完整。');
        return false;
    }
    $.ajax({
            type:'get',
            data:$('#sugform').serialize(),
            url:'/index.php?tn=ajax&ac=suggest',
            cache:false,
            dataType:'html',
            headers: {
                "Origin":"http://xshouyou.com"
            },
            error:function(){
                
            },
            success:function(data){
                if(data!='ok'){
                    alert(data);
                }else{
                    $('.lay_card').hide();
                    $('.lay_card2').show(); 
                }       
            }
        });
}
//意见反馈拖动效果
$(document).ready(function(){
        var mouseX=0,mouseY=0;
        var divLeft,divTop;
        $('.colses').mousedown(function(e){
            mouseX=e.pageX;
            mouseY=e.pageY;
            var offset=$('.suggestmsg').offset();
            divLeft=parseInt(offset.left,10);
            divTop=parseInt(offset.top,10);
            $('.colses').bind('mousemove',dragElement);
        });
        function dragElement(event){
            var left=divLeft+(event.pageX-mouseX);
            var top=divTop+(event.pageY-mouseY);
            $('.suggestmsgs').css({'top': top+'px','left': left+'px'});
        }
        $(document).mouseup(function(){
            $('.colses').unbind('mousemove');
        });
     });
/*-------意见反馈--------结束-----------*/