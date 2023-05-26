//vv��Ƶͳ����������������ж�
var VVBrowser={
	versions:function(){            
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
		   //�ƶ��ն�������汾��Ϣ                 
		   trident: u.indexOf('Trident') > -1, //IE�ں�                 
		   presto: u.indexOf('Presto') > -1, //opera�ں�                 
		   webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�                 
		   gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�                 
		   mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //�Ƿ�Ϊ�ƶ��ն�                 
		   ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�                 
		   android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����                 
		   iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����                 
		   iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad                 
		   webApp: u.indexOf('Safari') == -1, //�Ƿ�webӦ�ó���û��ͷ����ײ�
		   isMobile:u.toLowerCase().indexOf("mobile")>-1             
		};          
	}(),          
	language:(navigator.browserLanguage || navigator.language).toLowerCase() 
}
//��ȡcookie
function getCookie(a) {
	var b = null, c = document.cookie, d = c.indexOf(a);
	if (d != -1) {
		d += a.length + 1;
		a = c.indexOf(";", d);
		if (a == -1)
			a = c.length;
		b = c.substring(d, a)
	}
	
	return b
}
//ajax���ʽӿ�
function Statusvedio(data){
	jQuery.ajax({
		  type:"get",
		  dataType:"json",
		  url:'http://webd.home.news.cn/2.js',
		  //crossDomain: true,
		  data:data,
		  //process:false,
		  success:function(res){
			   
		  },
		  error: function(er) { 
			  console.log(er); 
		  } 
	});
}

//������һ��ע�⣬��ǰ�ɰ汾��Ϊflash��iframe�video��ǩ��iframe�⡣���ڿ��ǽ����кϲ���һ�׽���ʹ�á�
var Media_Time ;
var TIME_time;
var Hrear_time;
window.Vtime = 0;
window.FullScreen = 0;//ȫ������
window.Pause = 0;//��ͣ����
window.FORWARD = 0;//�������
window.REWIND = 0;//���˴���
window.Residue = 0//ʱ���
window.WDCI;//����url
window.StartStatus = true;//����״̬
window.DAC = "01002005055";//Ƶ��id

if($("#fwl").length>0){
	window.DAC = $.trim($("#fwl").html()).substring(0,11);
}else{
	window.DAC = "01002005055";
}
if($("#sp").length>0){
	window.currentvideoId = escape($.trim($("#sp").html()).split(";")[0]);
}else{
	window.currentvideoId = window.WDCI;
}
if(VVBrowser.versions.isMobile){
	//��������
	if(!window.Startdata){
		window.Startdata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0&_wdt=311&_wdci='+window.WDCI,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"st",
			r:getCookie("wdcid")
		}
	}
	if(!window.Heartdata){
		window.Heartdata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0_wdt=311&_wdci='+window.WDCI,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"hb",
			r:getCookie("wdcid")
		}
	}
	if(!window.Enddata){
		window.Enddata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0&_wdci='+window.WDCI,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"sp",
			r:getCookie("wdcid")
		}
	}
	//��������
}else{
	//PC������
	if(!window.PCStartdata){
		window.PCStartdata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0&_wdt=311&_wdci='+window.currentvideoId,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"st",
			r:getCookie("wdcid")
		}
	}
	if(!window.PCHeartdata){
		window.PCHeartdata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0&_wdt=311&_wdci='+window.currentvideoId,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"hb",
			r:getCookie("wdcid")
		}
	}
	if(!window.PCEnddata){
		window.PCEnddata={
			z:1,
			b:document.title,
			B:"utf-8",
			c:window.location.href+'?_wdxid=000000000000000000000000000000000000000000&_wdc='+window.DAC+'&_wda=0&_wdt=311&_wdci='+window.currentvideoId,
			d:$.trim($("#sp").html()).split(";")[0],
			j:"1",
			n:"sp",
			r:getCookie("wdcid")
		}
	}
}
$(function(){
	if($("#fwl").length>0){
		window.DAC = $.trim($("#fwl").html()).substring(0,11);
	}else{
		window.DAC = "01002005055";
	}
});

