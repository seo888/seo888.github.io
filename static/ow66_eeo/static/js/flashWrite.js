<!--

function flashWrite(url,w,h,id,bg,vars){

	
	var flashStr=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='wmode' value='opaque' />"+
	"<param name='bgcolor' value='"+bg+"' />"+	
	"<embed src='"+url+"' FlashVars='"+vars+"' wmode='opaque' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";

	
	document.write(flashStr);

}
function flashWriteW(url,w,h,id,bg,vars){

	
	var flashStr=
	"<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
	"<param name='allowScriptAccess' value='always' />"+
	"<param name='movie' value='"+url+"' />"+
	"<param name='FlashVars' value='"+vars+"' />"+
	"<param name='menu' value='false' />"+
	"<param name='quality' value='high' />"+
	"<param name='bgcolor' value='"+bg+"' />"+
	"<param name='wmode' value='transparent' />"+
	"<embed src='"+url+"' FlashVars='"+vars+"' menu='false' quality='high' bgcolor='"+bg+"' width='"+w+"' height='"+h+"' name='"+id+"' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
	"</object>";

	
	document.write(flashStr);

}


function gourl(){
	var url="http://www.eeo.com.cn//eobserve/industry/small_med_firms/2008/07/17/107247.html"
	window.open(url);
	}
	

function bookmark(){
		var title="经济观察网"
		//var url=document.location.href;
		var url="http://www.eeo.com.cn"
		window.external.AddFavorite(url,title);
	}


-->