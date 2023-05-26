var click_gms = [
                {'name':'忍者必须死3','url':'http://www.3h3.com/az/100815.html','pic':'http://pic.3h3.com/up/2019-10/201910168297_296.png','num':'714831'},
                {'name':'海贼王启航飞升版','url':'http://www.3h3.com/az/150495.html','pic':'http://pic.3h3.com/up/2019-9/201991214471_594.png','num':'653246'},
                {'name':'梦道星耀版','url':'http://www.3h3.com/az/156427.html','pic':'http://pic.3h3.com/up/2019-11/201911614435_261.jpg','num':'346659'},
                {'name':'玄元剑仙','url':'http://www.3h3.com/az/136454.html','pic':'http://pic.3h3.com/up/2019-5/2019517111350_573.png','num':'247712'},
                {'name':'问道','url':'http://www.3h3.com/az/96650.html','pic':'http://pic.3h3.com/up/2018-4/2018426135416_303.jpg','num':'1845243'},
                {'name':'去吧皮卡丘','url':'http://www.3h3.com/az/62648.html','pic':'http://pic.3h3.com/up/2019-4/201949143446_983.jpg','num':'137966'}
                ];
var sb="<div id='open' class='opendown' style='display:none;'>";
 sb=sb+"    <div class='hd ffw'>";
 sb=sb+"      <strong>"+$('.m-downaddr .addr h2').text()+"</strong>";
 sb=sb+"      <i></i>";
 sb=sb+"      <span>正在下载中，请稍后...</span>";
 sb=sb+"      <a href='javascript:;' class='close'></a>";
 sb=sb+"    </div>";
 sb=sb+"    <div class='bd'>";
 sb=sb+"      <ul class='ul-appbig fix'>";
 for(var ci = 0;ci < click_gms.length;ci++){
     var obj = click_gms[ci];
      sb=sb+"<li><div class='pic'><a href='"+obj.url+"?azdclick' target='_blank'><img src='"+obj.pic+"' alt='' width='100' height='100' ></a></div><div class='txt'><h3><a href='"+obj.url+"?azdclick' target='_blank'>"+obj.name+"</a></h3><p><b class='fco'>"+obj.num+"</b>人在玩</p><p><a href='"+obj.url+"?azdclick' target='_blank' class='abtn-g'>抢先体验</a></p></div></li>";
 }
 
 sb=sb+"      </ul>";
 sb=sb+"    </div>";
 sb=sb+"</div>";

document.write(sb);

var down_love = "";
$('.tab-love-con .ul-applove li').each(function(index){
	if(index<=5){
		var url = $(this).find('.pic a').attr('href');
		var title = $(this).find('.txt .tit').text();
		var img = $(this).find('.pic a img').attr('src');
		
		down_love += "<li><div class='pic'><a href='"+url+"' target='_blank'><img src='"+img+"' alt='"+title+"'></a></div><div class='txt'><h3><a href='"+url+"' target='_blank'>"+title+"</a></h3><p><b class='fco'>"+Math.round(Math.random()*100000)+"</b>人在玩</p><p><a href='"+url+"' target='_blank' class='abtn-g'>马上体验</a></p></div></li>";
	}
});

//setTimeout("if($.trim(down_love)!=''){$('#open .ul-appbig').html(down_love);}",500);