function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt){
	if(_nPageCount == null || _nPageCount<=1){
	return;
	}
	var nCurrIndex = _nCurrIndex || 0;
	//--------头部------	
	if(nCurrIndex == 0)
	{
		
		//上一页
		//document.write('<TD class=pagnp><A  href="'+_sPageName+'.'+_sPageExt+'">上一页</A></TD>');
		document.write('<a target="_self" class="on" href="#">1</a>');
		
	}
	else
	{	
		
		if(nCurrIndex>1)//上一页
		{
		document.write('<A target="_self"  class="text"  href="'+_sPageName+'_'+(_nCurrIndex-1)+'.'+_sPageExt+'">上一页</A>');
		}
		else
		{
		document.write('<A target="_self" class="text" href="'+_sPageName+'.'+_sPageExt+'">上一页</A>');
		}
		//
		document.write('<A target="_self" href="'+_sPageName+'.'+_sPageExt+'">1</A>');
	
	}
		
	
	for(var i=1; i<_nPageCount; i++){
		if(i%10==0)
			document.write("");

		if(nCurrIndex==i)
			document.write('<a target="_self" href="javascript:void(0)" class="on">'+(i+1)+'</a>');
		else
			
			document.write("<a target=\"_self\"  href=\""+_sPageName+"_" + i + "."+_sPageExt+"\">"+(i+1)+"</a>");
	}
	//---------尾部-----
	if(_nPageCount>1)
	{	
		if(nCurrIndex==(_nPageCount-1))
		{
	//	document.write('<TD class=pagnp><A  href="'+_sPageName+'_'+(_nPageCount-1)+'.'+_sPageExt+'">下一页</A></TD>');
		}
		else
		{
		document.write('<A  target=\"_self\" class="text" href="'+_sPageName+'_'+(_nCurrIndex+1)+'.'+_sPageExt+'">下一页</A>');
		}		
		 
	}
	else
	{	document.write('<A  target=\"_self\" href="'+_sPageName+'.'+_sPageExt+'">下一页</A>');		
	}
	
	//------------------
}
//x_nextPage(${PAGE_COUNT}, ${PAGE_INDEX}, "${PAGE_NAME}", "${PAGE_EXT}",_text)
function x_nextPage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_text)
{
		if(_nCurrIndex==(_nPageCount-1)||_nPageCount==1)
		{
		document.write('<A  target=\"_self\" href="javascript:void(0)">'+_text+'</A>');
		}
		else
		{
		document.write('<A target=\"_self\"  href="'+_sPageName+'_'+(_nCurrIndex+1)+'.'+_sPageExt+'">'+_text+'</A>');
		}	
}
//x_beforePage(${PAGE_COUNT}, ${PAGE_INDEX}, "${PAGE_NAME}", "${PAGE_EXT}",_text)
function x_beforePage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_text)
{
	if(_nCurrIndex>1)//上一页
		{
		document.write('<A target=\"_self\"  href="'+_sPageName+'_'+(_nCurrIndex-1)+'.'+_sPageExt+'">'+_text+'</A>');
		}
		else
		{
		document.write('<A target=\"_self\"  href="'+_sPageName+'.'+_sPageExt+'">'+_text+'</A>');
		}
}

function nextpage(act) {
	if (NeedBack==0)
	{
		if(PAGE_COUNT == null || PAGE_COUNT<=1){
			//alert('本篇无分页');
			return;
		}
		PAGE_INDEX = PAGE_INDEX || 0;

		if(PAGE_COUNT ==PAGE_INDEX+1){
			alert('已是最末页.再次点击将回到第一页');
			NeedBack=1;
			return;
		}
		PAGE_INDEX=PAGE_INDEX+1;
		var url=_sPageName+"_" + PAGE_INDEX + "."+_sPageExt;
	}else{
		var url=_sPageName+"."+_sPageExt;
	}

	window.location.href=url;
}
function GoNextPage(doc)
{
	for(num; num<doc.images.length; num++)
	{	
		//alert(doc.images[num].OLDSRC);
		//if ((doc.images[num].OLDSRC!='' && typeof(doc.images[num].OLDSRC) != 'undefined')||(doc.images[num].oldsrc!='' && typeof(doc.images[num].oldsrc) != 'undefined'))
		if(doc.images[num].getAttribute("OLDSRC") )
		{
			var img = doc.images[num];	
			img.onclick  = function ()
			{
				nextpage();
			}
			img.onmouseover=function () 
			{
				img.style.cursor="pointer";
				img.alt="点击浏览下一张";
				img.title="点击浏览下一张";	
			}
		}//end if
	}
}

/**
 *视频播放 by ssq@qlwb.com.cn 20060919
 *参数说明
	u - 媒体URL
	w - 媒体宽度width
	h - 媒体高度height
	id- 播放器id
 */

//播放Mediaplayer格式的视频，包括.avi .mpg .mpeg .wmv .wma .asf .mid .mp3等
function pv_m(u, w, h , id){
	var pv='';
	pv += '<object width="'+w+'" height="'+h+'" id="'+id+'" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject">';
	pv += '<param name="url" value="'+u+'">';
	pv += '<param name="AutoStart" value="1">';
	pv += '<param name="AutoSize" value="1">';
	pv += '<param name="ShowControls" value="1">';
	pv += '<param name="ShowPositionControls" value="0">';
	pv += '<param name="ShowAudioControls" value="1">';
	pv += '<param name="ShowTracker" value="1">';
	pv += '<param name="ShowDisplay" value="0">';
	pv += '<param name="ShowStatusBar" value="1">';
	pv += '<param name="ShowGotoBar" value="0">';
	pv += '<param name="ShowCaptioning" value="0">';
	pv += '<param name="PlayCount" value="1">';
    pv += '<param name="EnableTracker" value="0">';
	pv += '<param name="AnimationAtStart" value="0">';
	pv += '<param name="TransparentAtStart" value="0">';
	pv += '<param name="AllowScan" value="0">';
	pv += '<param name="EnableContextMenu" value="0">';
	pv += '<param name="ClickToPlay" value="0">';
	pv += '<param name="InvokeURLs" value="1">';
	pv += '<param name="DefaultFrame" value="">';
	pv += '<embed src="'+u+'" width="'+w+'" height="'+h+'" type="application/x-mplayer2" pluginspage="http://www.microsoft.com/isapi/redir.dll?prd=windows&amp;sbp=mediaplayer&amp;ar=media&amp;sba=plugin&amp;" name="MediaPlayer" showcontrols="1" showpositioncontrols="0" showaudiocontrols="1" showtracker="1" showdisplay="0" showstatusbar="1" autosize="0" showgotobar="0" showcaptioning="0" autostart="1" autorewind="0" animationatstart="0" transparentatstart="0" allowscan="1" enablecontextmenu="1" clicktoplay="0" invokeurls="1" defaultframe=""></embed>';
	pv += '</object>';
	document.write(pv);
}

//播放Realplay格式的视频，包括.rm .ram .rmvb等
function pv_r(u, w, h , id){
	var pv='';
	pv += '<object width="'+w+'" height="'+h+'" id="'+id+'" classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA">';
	pv += '<param name="SRC" value="'+u+'">';
	pv += '<param name="AUTOSTART" value="1">';
	pv += '<param name="CONTROLS" value="Imagewindow,StatusBar,ControlPanel">';
	pv += '<param name="_ExtentX" value="18415">';
	pv += '<param name="_ExtentY" value="9102">';
	pv += '<param name="SHUFFLE" value="0">';
	pv += '<param name="PREFETCH" value="0">';
	pv += '<param name="NOLABELS" value="0">';
	pv += '<param name="CONSOLE" value="Clip1">';
	pv += '<param name="LOOP" value="1">';
	pv += '<param name="NUMLOOP" value="0">';
	pv += '<param name="CENTER" value="0">';
	pv += '<param name="MAINTAINASPECT" value="0">';
	pv += '<param name="BACKGROUNDCOLOR" value="#000000">';
	pv += '<embed src="'+u+'" width="'+w+'" height="'+h+'" type="audio/x-pn-realaudio-plugin" console="Clip1" controls="Imagewindow,StatusBar,ControlPanel" autostart="true">';
	pv += '</object>';
	document.write(pv);
	if (!RealplayerTest())
	{
		document.writeln("");
		document.write('<a href="http://cn.real.com/?mode=rp" target="_blank">您的系统中缺少real播放插件，请先下载并安装RealPlayer播放器。<img src="./W020131121569635570009.jpg" width="39" height="40" border="0" OLDSRC="W020131121569635570009.jpg" /></a>');


	}

}

//播放Quicktime格式的视频，包括.mov .amr .3gp等
function pv_q(u, w, h , id){
	var pv='';
	pv += '<object width="'+w+'" height="'+h+'" id="'+id+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab">';
	pv += '<param name="src" value="'+u+'">';
	pv += '<param name="controller" value="true">';
	pv += '<param name="type" value="video/quicktime">';
	pv += '<param name="autoplay" value="true">';
	pv += '<param name="target" value="myself">';
	pv += '<param name="bgcolor" value="black">';
	pv += '<param name="pluginspage" value="http://www.apple.com/quicktime/download/index.html">';
	pv += '<embed src="'+u+'" width="'+w+'" height="'+h+'" controller="true" align="middle" bgcolor="black" target="myself" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/index.html"></embed>';
	pv += '</object>';
	document.write(pv);
}

//播放flv格式的视频，包括.flv等
function pv_f_old(u, w, h , id){
	var pv='';
	pv += '<object style="width:'+w+'px; height:'+h+'px;" id="'+id+'" align="middle" type="application/x-shockwave-flash" data="/data/js/flvplayer.swf?videoUrl='+u+'&thumbnailUrl=/images/nopic.jpg&playerMode=embedded&autoPlay=true">';
	pv += '<param name="allowScriptAccess" value="sameDomain" /> ';
	pv += '<param name="movie" value="/data/js/flvplayer.swf?videoUrl='+u+'&thumbnailUrl=/images/nopic.jpg&playerMode=embedded&autoPlay=true"/> ';
	pv += '<param name="quality" value="best" /> ';
	pv += '<param name="bgcolor" value="#ffffff" /> ';
	pv += '<param name="scale" value="noScale" /> ';
	pv += '<param name="wmode" value="window" /> ';
	pv += '<param name="salign" value="TL" /> ';
	pv += '</object>';

	document.write(pv);
}


function pv_f(u, w, h , id){
	var pv='';
	pv += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'">';
	pv += '<param name="movie" value="http://www.dzwww.com/data/js/flvplayer2.swf">';
	pv += '<param name="quality" value="high">';
	pv += '<param name="allowFullScreen" value="true" />';
	pv += '<param name="FlashVars" value="vcastr_file='+u+'&IsAutoPlay=0&IsShowBar=1&LogoText=www.dzwww.com" />';
	pv += '<embed src="./W020131121569641039509.swf" allowFullScreen="true" FlashVars="vcastr_file='+u+'&IsAutoPlay=1&IsShowBar=1&LogoText=dzwww" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" OLDSRC="W020131121569641039509.swf"></embed>';
	pv += '</object>';

	document.write(pv);
}
function pv_flvad(u, w, h , id){
	
  document.write('<div id="flvimg"><a href="http://eshop.sd.189.cn" target=_blank><img src="./W020131121569638220149.gif" border=0 OLDSRC="W020131121569638220149.gif" /></a></div>'); 
  var str='';
	str += '<div id="flvmov" style="display:none"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'">';
	str += '<param name="movie" value="http://www.dzwww.com/data/js/flvplayer2.swf">';
	str += '<param name="quality" value="high">';
	str += '<param name="allowFullScreen" value="true" />';
	str += '<param name="FlashVars" value="vcastr_file='+u+'&IsAutoPlay=0&IsShowBar=1&LogoText=dzwww" />';
	str += '<embed src="./W020131121569641039509.swf" allowFullScreen="true" FlashVars="vcastr_file='+u+'&IsAutoPlay=1&IsShowBar=1&LogoText=dzwww" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" OLDSRC="W020131121569641039509.swf"></embed>';
	str += '</object></div>';
  document.write(str);
  setTimeout(function (){
     showmov();
  }, 7000);
	
}
function showmov(){    
   document.getElementById('flvimg').style.display='none';
   document.getElementById('flvmov').style.display='';
}
function pv_jpg(u, w, h , id){
  if (u=='start.jpg'){u='http://www.dzwww.com/sdstyle/js/start.jpg'}
  document.write('<img src="'+u+'" width="'+w+'" height="'+h+'" border=0 />'); 
}
function pv_j(u, w, h , id,i){
	var pv='';
	pv += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'">';
	pv += '<param name="movie" value="http://www.dzwww.com/data/js/player.swf">';
	pv += '<param name="quality" value="high">';
	pv += '<param name="allowFullScreen" value="true" />';
	pv += '<param name="FlashVars" value="file='+u+'&IsAutoPlay=1&IsShowBar=1&image='+i+'" />';
	pv += '<embed src="./W020131121569641819712.swf" allowFullScreen="true" FlashVars="file='+u+'&IsAutoPlay=1&IsShowBar=1&image='+i+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" OLDSRC="W020131121569641819712.swf"></embed>';
	pv += '</object>';
	document.write(pv);
}

//播放swf格式的视频，包括.swf等
function pv_s(u, w, h , id){
	var pv='';
	pv += '<object style="width:'+w+'px; height:'+h+'px;" id="'+id+'" align="middle" type="application/x-shockwave-flash" data="'+u+'">';
	pv += '<param name="allowScriptAccess" value="sameDomain" /> ';
	pv += '<param name="movie" value="'+u+'"/> ';
	pv += '<param name="quality" value="best" /> ';
	pv += '<param name="scale" value="noScale" /> ';
	pv += '<param name="wmode" value="window" /> ';
	pv += '</object>';

	document.write(pv);
}





function pv(u, w, h , id){
//by ssqczx@qlwb20070208
	var ext=getExtName(u).toLowerCase();

	switch (ext)
	{
		case "wmv":	
			pv_m(u, w, h , id);
			break;
		case "avi":	
			pv_m(u, w, h , id);
			break;
		case "asf":	
			pv_m(u, w, h, id);
			break;
		case "mpeg":	
			pv_m(u, w, h , id);
			break;
		case "mp3":	
			pv_m(u, 400, 100 , id);
			break;
		case "wma":	
			pv_m(u, 400, 100 , id);
			break;
		case "wmv":	
			pv_m(u, 400, 100 , id);
			break;
		case "rm": 
			pv_r(u, w, h , id);
			break;
		case "rmvb": 
			pv_r(u, w, h , id);
			break;
		case "swf":	
			pv_s(u, w, h , id);
			break
	    case "mp4":	
			pv_ck(u, w, h , id);
			break
		case "flv": 
			pv_f(u, w, h , id);
			break
		case "f4v": 
			pv_f(u, w, h , id);
			break
     case "flvad": 
			pv_flvad(u, 400, 326 , id);
			break
		case "jpg": 
			pv_jpg(u, 678, 542 , id);
			break
		case "ssq":	
				//自定义大小
			pv_m(u, 400, 326 , id);
			break;

		 default :
			if (!u)
			 {
			  break			 
			 }
			 else
			   if (u.substring(0,4)=="rtmp")
				 {
				   pv_ck(u, w, h , id);
				 }
	}
}

function getExtName(str) {	
	var reg=/([^\.]+)$/.exec(str);
	return RegExp.$1;
}
function RealplayerTest()
{
    /* 测试当前系统中是否支持RealPlayer播放
    // 返回值: true------支持RealPlayer
    // false-----不支持RealPlayer
    //*/
    var RealMode=0;
    var RealG2=0;
    var Real5=0;
    var Real4=0;
    if (navigator.userAgent.indexOf("MSIE")< 0 )
    { //对非IE的处理
        var numPlugins = navigator.plugins.length;
        for (var i = 0; i < numPlugins; i++)
        {
            plugin = navigator.plugins[i];
            if (plugin.name.substring(0,10)=="RealPlayer")
            {
                RealMode=1;
            }
        }
    }else{ //对IE内核浏览器的处理
        try {
            var realtmp=new ActiveXObject("rmocx.RealPlayer G2 Control");
            if (realtmp)
            {
                RealG2=1;
            }
        }catch(e){
            RealG2=0;
        }
        try {
            var realtmp=new ActiveXObject("RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)");
            if (realtmp)
            {
                Real5=1;
            }
        }catch(e){
            Real5=0;
        }
        try {
            var realtmp=new ActiveXObject("RealVideo.RealVideo(tm) ActiveX Control (32-bit)");
            if (realtmp)
            {
                Real4=1;
            }
        }catch(e){
            Real4=0;
        }
        if (RealG2|Real5|Real4)
        {
            RealMode=1;
        }
    }
    
    if ( RealMode )
    {
        return true;
    }else{
        return false;
    }
}


//dzplayer 封装js
document.write('<script type="text/javascript" src="http://www.dzwww.com/data/dzplayer/dzplayer.js" charset="utf-8"></script>');
function ck(Obj,ww,hh){
         //先输出一个容器来放播放器的代码
document.write('<div id="a1"></div>');
	//下面定义播放器默认设置下各项参数的值
var flashvars={
		f:'',//视频地址
		a:'',//调用时的参数，只有当s>0的时候有效
		s:'0',//调用方式，0=普通方法（f=视频地址），1=网址形式,2=xml形式，3=swf形式(s>0时f=网址，配合a来完成对地址的组装)
		c:'0',//是否读取文本配置,0不是，1是		
		i:'',//初始图片地址
		d:'',//暂停时播放的广告，swf/图片,多个用竖线隔开，图片要加链接地址，没有的时候留空就行
		u:'',//暂停时如果是图片的话，加个链接地址
		l:'',//前置广告，swf/图片/视频，多个用竖线隔开，图片和视频要加链接地址
		r:'',//前置广告的链接地址，多个用竖线隔开，没有的留空
		t:'',//视频开始前播放swf/图片时的时间，多个用竖线隔开
		y:'',//这里是使用网址形式调用广告地址时使用，前提是要设置l的值为空
		z:'',//缓冲广告，只能放一个，swf格式
		e:'2',//视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
		v:'80',//默认音量，0-100之间
		p:'0',//视频默认0是暂停，1是播放
		h:'0',//播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
		q:'',//视频流拖动时参考函数，默认是start
		m:'0',//默认是否采用点击播放按钮后再加载视频，0不是，1是,设置成1时不要有前置广告
		o:'',//当m=1时，可以设置视频的时间，单位，秒
		w:'',//当m=1时，可以设置视频的总字节数
		g:'',//视频直接g秒开始播放
		j:'',//视频提前j秒结束
		k:'',//提示点时间，如 30|60鼠标经过进度栏30秒，60秒会提示n指定的相应的文字
		n:'',//提示点文字，跟k配合使用，如 提示点1|提示点2
		b:'1',
		my_url:encodeURIComponent(window.location.href)
	};
    //定义默认参数的值结束
    //下面把接受到的Obj对像合并到默认的对像中去
    if(Obj){
    	for(var k in Obj){
        	flashvars[k]=Obj[k];
        }
    }
    //合并结束
	 CKobject.embedSWF('http://www.dzwww.com/data/dzplayer/dzplayer.swf','a1','ckplayer_a1',ww,hh,flashvars);
}
//播放rtmp,mp4等文件
  function pv_ck(u, w, h , id){

  ck({f:u},w,h);
}