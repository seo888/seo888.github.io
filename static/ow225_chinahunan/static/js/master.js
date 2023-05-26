//新的轮换广告
function bannerADturnNew(sta,aid){
	if(sta!=-1)eval('bannerADstat'+aid+' = '+sta);
	var CurrT = eval('bannerADstat'+aid);
	var curraid = eval("lun"+aid);
	
	document.getElementById('lundiv'+aid+'_'+CurrT).style.display="";	
	for (sta_other=0;sta_other<=curraid.length-1;sta_other++){
	
		if (sta_other != CurrT){
			document.getElementById('lundiv'+aid+'_'+sta_other).style.display="none";	
		}
	}

	if (eval('bannerADstat'+aid+' == lun'+aid+'.length-1')){
		eval('bannerADstat'+aid+' =0');
	}else{
		eval('bannerADstat'+aid+'++');
	}
	setTimeout(_bannerADturnNew(-1,aid),eval('luntime'+aid+'['+CurrT+']'));

}

function _bannerADturnNew(_sta,_aid){
	return function(){
	   bannerADturnNew(_sta,_aid);
	}
}

var browser ={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return{//移动终端浏览器版本信息 
			mobile:(!!u.match(/AppleWebKit.*Mobile.*/)|| !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/))
		};
	}(),
	language:(navigator.browserLanguage|| navigator.language).toLowerCase()
}

function getCokad(name){var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); if(arr != null) return unescape(arr[2]); return null;}
function setCokad(name,value)
{
	var Days = 1;
	var exp  = new Date();
	exp.setTime(exp.getTime() + 3600*1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

// 缩放字体
function changesize(size){
	document.getElementById('content').style.fontSize=size+'px';
}

//搜索框验证提交
function search_submit() {
	var KeyWords = document.s_form.s_key.value;
	var search_type = document.s_form.search_type.value;
	KeyWords = KeyWords.replace(/%/g, "").replace(/ /g, "").replace(/　/g, "");
	if (KeyWords == ""){
		alert("关键词必须填写！");
		document.s_form.s_key.focus();
		return false;
	} else {
		document.getElementById("s_key").name = 'q';
		document.s_form.method = "get";
		document.s_form.action = "http://search.voc.com.cn/search_news.php";
		document.s_form.submit();
	}
}

//领导集轮换
var slidint_b2;
function setfoc_b2(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="now";
			document.getElementById(f_sw+M_sw+'_div').style.display="";
		}else{
			document.getElementById(f_sw+i+'_a').className="";
			document.getElementById(f_sw+i+'_div').style.display="none";
		}
	}
	stopit_b2();
}
function playnext_b2(s){
	if(s==2){
		s = 1;
	}
	else{
		s++;
	};
	setfoc_b2(s,1,2);
	playit_b2(s);
}
function playit_b2(str){
	slidint_b2 = setTimeout(function(){playnext_b2(str);},5000); 
}
function stopit_b2(){
	clearTimeout(slidint_b2);
}

//新湖南切换
function next_cai(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus = start;
	}else{
		nowFocus ++;
	}
	changeStatus_cai(nowFocus,start);
	
}
function changeStatus_cai(str,start){
	$('.cai_div'+start).css('display','none');
	$('#cai_'+str).show();
}
function next_cai2(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus2 = start;
	}else{
		nowFocus2 ++;
	}
	changeStatus_cai(nowFocus2,start);
	
}
function next_cai3(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus3 = start;
	}else{
		nowFocus3 ++;
	}
	changeStatus_cai(nowFocus3,start);
	
}
function next_cai4(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus4 = start;
	}else{
		nowFocus4 ++;
	}
	changeStatus_cai(nowFocus4,start);
	
}
function next_cai5(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus5 = start;
	}else{
		nowFocus5 ++;
	}
	changeStatus_cai(nowFocus5,start);
	
}
function next_cai6(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus6 = start;
	}else{
		nowFocus6 ++;
	}
	changeStatus_cai(nowFocus6,start);
	
}


function changeMenu(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="now";
			document.getElementById(f_sw+M_sw+'_div').style.display="";
		}else{
			document.getElementById(f_sw+i+'_a').className="";
			document.getElementById(f_sw+i+'_div').style.display="none";
		}
	}
}

//2个切换
function prev_cai7(now,start,end,num){
	now --;
	if(now < start){
		nowFocus7 = end;
	}else{
		nowFocus7 --;	
	}
	changeStatus_cai7(nowFocus7);
}
function next_cai7(now,start,end,num){
	now ++;
	if(now > end){
		nowFocus7 = start;
	}else{
		nowFocus7 ++;
	}
	changeStatus_cai7(nowFocus7);
}
function changeStatus_cai7(str){
	$('.cai_div7').css('display','none');
	$('#cai_'+str).show();
}

//焦点图
var slidint_b;
function setfoc_b(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="now";
			document.getElementById(f_sw+M_sw+'_div').style.display="";
		}else{
			document.getElementById(f_sw+i+'_a').className="";
			document.getElementById(f_sw+i+'_div').style.display="none";
		}
	}
	stopit_b();
}
function playnext_b(s){
	if(s==87){
		s = 81;
	}
	else{
		s++;
	};
	setfoc_b(s,81,87);
	playit_b(s);
}
function playit_b(str){
	//slidint_b = setTimeout(playnext_b(5),5000);
	slidint_b = setTimeout(function(){playnext_b(str);},5000); 
}
function stopit_b(){
	clearTimeout(slidint_b);
}

function change_zbhn(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="zbhn_h now";
		}else{
			document.getElementById(f_sw+i+'_a').className="zbhn_h";
		}
	}
}