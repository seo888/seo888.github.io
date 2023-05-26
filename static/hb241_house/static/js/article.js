//设置心情
function setMoods(){
	var moodid=$('#setmoods input[name=moodid]').attr('value');
	var setid='';
	resetAttitude(moodid);
	$('#setmoods input').click(function(){
		setid=$(this).attr('value');
		updateAttitude(moodid,setid);

	});
}
//手机阅读二维码
function showCode(){
	$('#article-mobile').toggle(function(){
		$('#article-mobile-code').show();
	},function(){
		$('#article-mobile-code').hide();
	})
}
//语音
function sound(soundid){
	$('#'+soundid).click(function(){
		gxnewsFun.yuyin();
	});
}
$(document).ready(function(e) {
	//显示日期
	$('#datenow').text(datefun.showdate());
	//显示星期农历
	$('#weekdate').text(datefun.showweek()+"  "+datefun.showlunar());
	//设为首页
	$('#home').click(function(e) {
        common.setHome(this,'http://www.gxnews.com.cn');
    });
	//加入收藏
    $('#favorite').click(function(e) {
        common.addFavorite('http://www.gxnews.com.cn','广西新闻网');
    });
    //更多导航
    gxnewsFun.morenav('head-nav','ul');
    //语音
    sound('soundid');

    showCode();
    //设置心情
    setMoods();
		
});


$('#qrcode').qrcode({
    render : "canvas",
    text: window.location.href.split('#')[0],
    width: 160,//二维码宽度
    height:160//二维码高度
});
//var canvas = $("#qrcode canvas")[0];
//var qrimg_href = canvas.toDataURL("image/png");
//$("#qrcode").html('<img src="'+qrimg_href+'"/>');
