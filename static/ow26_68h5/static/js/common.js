var Qb = {
	uab: function(str){
		var b = 'other';
		var u = navigator.userAgent.toLowerCase();
		var r = ['msie','firefox','360','2345','chrome','uc','wechat','qq','miuibrowser','sogou','opera','baidu','safari'];
		for(var i=0;i<r.length;i++){
			if(u.indexOf(r[i]) > -1){
				b = r[i];
				break;
			}
		}
		return str == b;
	},
	ver: function () {
		var u = navigator.userAgent.toLowerCase();
		return {
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('android') > -1 || u.indexOf('linux') > -1 || u.indexOf('harmony') > -1,
			iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1,
			iPad: u.indexOf('ipad') > -1,
			qq: u.indexOf('mqqbrowser') > -1,
			baidu: u.indexOf('bidubrowser') > -1,
			bdapp: u.indexOf('baiduboxapp') > -1,
			sf: u.indexOf('safari') > -1,
			uc: u.indexOf('ucbrowser') > -1,
			u3: u.indexOf('360') > -1
		};
	} (),
	lang: (navigator.browserLanguage || navigator.language).toLowerCase()
},Qi = {
    ua:navigator.userAgent.toLowerCase(),
	wlh:window.location.href,
	ref:function(){var ref='';if(document.referrer.length>0){ref=document.referrer;}try{if(ref.length==0&&opener.location.href.length>0){ref=opener.location.href;}}catch(e){}return ref;},
	android:function(){return this.ua.indexOf('android') > -1 || this.ua.indexOf('linux') > -1 || this.ua.indexOf('harmony') > -1;},
	ios:function(){return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);},
	ortime:function(dy,xy){var Gsisj = new Date(),Gsiho = Gsisj.getHours();return Gsiho>=dy || Gsiho<=xy;}
},
Qd = {
	ck:1,
	sr:function(Qsr,Qlx){var Qlx=Qlx||0,Qstr=new Array(),Qspl=Qsr.split(",");this.ck++;for(i=0;i<Qspl.length;i++){Qstr[i]=this.th(Qspl[i]);}if(Qlx=="0"){Qret=this.ar(Qstr)[0];}else{Qckm=Qspl[0].replace(/(\/|\{|\}|\:|\.|\?|\=|\&|\;)/ig,"")+this.ck;Cook=Qk.get(Qckm);if(!Cook){Qcok=0;Qk.set(Qckm,Qcok);}else{if(Cook>=(Qspl.length-1)){Qcok=0;Qk.set(Qckm,Qcok);}else{Qcok=Cook*1+1;Qk.set(Qckm,Qcok);}}Qret=Qstr[Qcok];}return Qret;},
	th:function(Qsr){var imgReg=/{(A|B|S):([0-9]+)}/gi;var arr=Qsr.match(imgReg);if(arr){for(var i=0;i<arr.length;i++){qrr=arr[i].match(/{(A|B|S):([0-9]+)}/i);Qtype=qrr[1].toLowerCase();if(Qtype=="a"){Qlksr=this.sj(0,qrr[2]);}else if(Qtype=="b"){Qlksr=this.sj(2,qrr[2]);}else if(Qtype=="s"){Qlksr=this.sj(1,qrr[2]);}Qsr=Qsr.replace(arr[i],Qlksr);}}return Qsr;},
	sj:function(s,n){var Qsjs = ['0','1','2','3','4','5','6','7','8','9'];var Qsja = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];var Qsjb = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];if(s=="1"){jsstr=Qsjs;jsnum=9;}else if(s=="2"){jsstr=Qsja;jsnum=25;}else{jsstr=Qsjb;jsnum=35;}var Qsrr="";for(var i=0;i<n;i++){var id = Math.ceil(Math.random()*jsnum);Qsrr += jsstr[id];}return Qsrr.toLowerCase();},
	ar:function(arr){var temp_array = new Array();for(var index in arr){temp_array.push(arr[index]);}var return_array = new Array();for(var i = 0; i<arr.length; i++){if(temp_array.length>0){var arrIndex = Math.floor(Math.random()*temp_array.length);return_array[i] = temp_array[arrIndex];temp_array.splice(arrIndex, 1);}else{break;}}return return_array;},
	so:function(lx){var lx = lx || 0,ss = ['google.','baidu.','soso.','so.','360.','yahoo.','youdao.','sogou.','gougou.','sm.','yisou.','bing.','www.upan.cc'];if(lx==2){ss = ['google.','soso.','so.','360.','yahoo.','youdao.','sogou.','gougou.','sm.','yisou.','bing.','www.upan.cc'];}if(lx==3){ss = ['baidu.'];}var ref = document.referrer,ref = ref.toLowerCase(),sostr = ss,isso = false;for(var ii=0;ii<sostr.length;ii++){if(ref.indexOf(sostr[ii])>0){isso=true;break;}}return isso;},
	isstr:function(arr,str){var iArr=arr,iStr=str;if(typeof iArr == 'string'){iArr = iArr.split(',');}if(typeof iStr == 'string'){iStr = iStr.split(',');}for(var ia=0;ia<iArr.length;ia++){for(var is=0;is<iStr.length;is++){if(iStr[is].toLowerCase().indexOf(iArr[ia].toLowerCase())>=0){return true;}}}return false;},
	dth:function(str){str = str.toLowerCase();var res=[];for(var i=0;i < str.length;i++){res[i]=('00'+str.charCodeAt(i).toString(16)).slice(-4);}return '\\u'+res.join('\\u');},
	htd:function(str){str=str.replace(/\\/g,'%');return unescape(str);}
},
Qk = {
    get:function(name){var value = '',matchs;if (matchs = document.cookie.match("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)")) value = matchs[1] ? unescape(matchs[1]) : "";return value},
    set:function(name,value,expire,domain){expire = expire || 24 * 3600 * 1000;var date = new Date(),cookie = "";date.setTime(date.getTime() + expire);cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString() + ";path=/;";domain && (cookie += "domain=" + domain + ";");document.cookie = cookie},
    del:function(name,domain){Cookie.set(name, '', -1, domain)}
}

if($('.tab1').length > 0){
	Qtab('.tab1','.hd ul li','dd','on');
}
if($('.tab2').length > 0){
	Qtab('.tab2','.hd ul li','dd','on');
}
if($('.tab3').length > 0){
	Qtab('.tab3','.hd ul li','dd','on');
}
function toptab(c) {
$('#test_' + c + '>li').mouseover(function () {
$(this).siblings().removeClass('last').end().addClass('last');
	var i = $(this).index() + 1;
	$('.' + c).addClass('hide');
	$('.' + c + '_' + i).removeClass('hide');
	});
}
function Qtab(Qa,Qb,Qc,Qv){
var Qv = Qv || 'cur';
$(Qa).find(Qb).mouseover(function(){
$(Qa).find(Qb).removeClass(Qv); $(this).addClass(Qv); 
$(Qa).find(Qc).hide(); $(Qa).find(Qc).eq($(this).index()).show(); 
}); 
}
function Qtabck(Qa,Qb,Qc){
var Qv = Qv || 'cur';
$(Qa).find(Qb).click(function(){
$(Qa).find(Qb).removeClass(Qv); $(this).addClass(Qv); 
$(Qa).find(Qc).hide(); $(Qa).find(Qc).eq($(this).index()).show(); 
}); 
}
function colorTags(id){
	var BLACK = 0,
	COLOR = '#f77abe,#71cdca,#4fbc82,#3ab8ce,#fdbc3e,#ad68d3,#a7dd9f,#d086df',
	cp = [],
	colors = [],
	current = '',
	tags = document.getElementById(id).getElementsByTagName('a'),
	length = tags.length,
	black_count = 0,
	black_total = 0;	
	for(var i = 0 ; i < length; i++){
		cp[i] =  i > black_total ? 	'color' :  'color';
	}		
	cp.sort(function(a,b){
		return Math.random()>.5 ? -1 : 1;				  
	});
	for(var i = 0 ; i < length; i++){
		if( cp[i] == 'color'){
			colors  = COLOR.replace( new RegExp(current + ',?'),'').split(',');
			current = colors[ Math.floor(Math.random()*(colors.length-1))];
			tags[i].style.backgroundColor = current;
		} else {
			current = '#000';	
		}
	}	
}
function getReferrer(){
var ref = '';  
 if (document.referrer.length > 0) {  
  ref = document.referrer;  
 }  
 try {  
  if (ref.length == 0 && opener.location.href.length > 0) {  
   ref = opener.location.href;  
  }  
 } catch (e) {} 
 return ref
}
function isday(ADate) {   
	var dd = new Date();  
	var str = ADate.replace(/-/g,"/"), date = new Date(str); 
	var y = date.getYear(), m = date.getMonth()+1, d = date.getDate(),h = date.getHours(),n = date.getMinutes(); 
	var y1 = dd.getYear(), m1 = dd.getMonth()+1, d1 = dd.getDate()
	if(y==y1 && m==m1 && d==d1){
	var newDate = true;
	}else{
	var newDate = false;
	}
	return newDate;   
}
function downClick(el){
	var sSrc = '';
	if($(el).attr("src")){sSrc = '&src='+$(el).attr("src");}
	$.ajax({
		url: '//tjhz.68h5.com/ajax_hztj.asp',
		type: 'GET',
		dataType: 'json',
		data: 'url='+$(el).attr("href").replace(/&/g,"%26")+'&surl='+window.location.href+sSrc+'&jsoncallback=?',
		error: function(){},
		success: function(data){}
	});
	var HZSoftID = $("#objID").val();
	$.ajax({
		url: 'https://tj.68h5.com/hitsHZTJ.asp',
		type: 'GET',
		dataType: 'json',
		data: 'softid='+HZSoftID+'&url='+$(el).attr("href").replace(/&/g,"%26")+'&jsoncallback=?',
		error: function(){
		},
		success: function(data){		
		}
	});
}


/*
document.onselectstart = function() {
    return false;
}
document.onkeydown = function (){
				var e = window.event || arguments[0];
				
				if(e.keyCode == 123){
					return false;
				
				}else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
					return false;
				
				}else if((e.shiftKey) && (e.keyCode == 121)){
					return false;
				
				}else if((e.ctrlKey) && (e.keyCode == 85)){
					return false;
				}
			};
		
document.oncontextmenu = function (){
				return false;
			}
*/