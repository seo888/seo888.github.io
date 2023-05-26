// doZoom
function doZoom(size)
{
	var f14 =document.getElementById('font14');
	var f16 =document.getElementById('font16');
	document.getElementById('text').style.fontSize=size+'px';
	var op=document.getElementById('text').getElementsByTagName("p");
	if(size==14){
		f14.className="cur";
		f16.className="";
	}else if(size==16){
		f14.className="";
		f16.className="cur";
	}
	for(var i=0;i<op.length;i++){
		op[i].style.fontSize=size+'px';
	}
}

$(function(){
	$('.ArrowRight').click(function(){
		if(parseInt($('.ul-roll').css('left'))%138 ==0 && parseInt($('.ul-roll').css('left')) > -($('.ul-roll').find('li').length * 138 - 552)){
			$('.ul-roll').animate({left: parseInt($('.ul-roll').css('left')) - 138 + 'px'}, 300);
		}else{
			$('.ul-roll').animate({left: '0px'}, 500);
		}
	});
	$('.ArrowLeft').click(function(){
		if(parseInt($('.ul-roll').css('left'))%138 ==0 && parseInt($('.ul-roll').css('left')) < 0){
			$('.ul-roll').animate({left: parseInt($('.ul-roll').css('left')) + 138 + 'px'}, 300);
		}else{
			$('.ul-roll').animate({left: -($('.ul-roll').find('li').length * 138 - 552) + 'px'}, 500);
		}
	});
	/*
    var href = window.location.href;
    var reChanel = /auto|mil|ent|world/;
    if(!reChanel.test(href)){
        $('body').append('<div id="yaan" style="position:fixed;right:0;bottom:0;_position:absolute;_top:expression(eval(document.documentElement.scrollTop+(document.documentElement.clientHeight-320)));">\
        <div id="yaanBanner" style="background:url(http://himg2.huanqiu.com/statics/images/holiday/yaanXunren.jpg);width:336px;height:40px;position:relative;"><span title="关闭" onclick="document.getElementById(\'yaan\').style.display=\'none\'" style="color:#fff;position:absolute;right:10px;top:13px;font-size:14px;font-weight:bold;cursor:pointer;">X</span></div>\
        <iframe src="http://tieba.baidu.com/findpeople/list?type=3333&rn=30&source=union" scrolling="no" frameborder="0" marginheight="0" marginwidth="0" hspace="0" vspace="0" height="280" style="width:336px;"></iframe>\
        </div>');
    }
	*/
})

// favorite
function addBookmark(url)
{
	if (window.sidebar)
	{
		window.sidebar.addPanel('环球网', url ,"");
	}
	else if( document.all )
	{
		window.external.AddFavorite( url, '环球网');
		
	}
	else if( window.opera && window.print ) {
		return true;
	}
}
function GoTop() 
{
    window.scrollTo(0,0);
} 

// print
function doPrint() { 
bdhtml=window.document.body.innerHTML; 
sprnstr="<!--startprint-->"; 
eprnstr="<!--endprint-->"; 
prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 

var logolink = (jQuery)?$(".location a:eq(1)").attr("href"):"#";
var prnhead = $('.top').html();


prnhead="<div class=\"top\">"+prnhead+"</div>";
prnfoot="</div><div class=\"copyMain\" style=\"width:635px; border-top:1px solid grey;\"><em>© 环球网</em><a href=\"#\" target=\"_blank\">版权所有</a></div>";
prnhtml=prnhead.concat(prnhtml,prnfoot);

window.document.body.innerHTML=prnhtml; 
window.document.body.style.width = "635px";
window.document.body.style.margin = "0 auto";
$('.topLeft').hide();
$('.printBtnBox').show();
if(jQuery){$(".ad300x250").hide();}
window.print();
}

function goPrint(){
	window.print();
}

function goBack(){
	location.href = location.href;
}