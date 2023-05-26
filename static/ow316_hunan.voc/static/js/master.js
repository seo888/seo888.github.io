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
	if(s==4){
		s = 1;
	}
	else{
		s++;
	};
	setfoc_b(s,1,4);
	playit_b(s);
}
function playit_b(str){
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

function getCokad(name){var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); if(arr != null) return unescape(arr[2]); return null;}
function setCokad(name,value)
{
	var Days = 1;
	var exp  = new Date();
	exp.setTime(exp.getTime() + 3600*1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function change_yzhn(M_sw,S_sw,E_sw){
	var f_sw = 'yzhn_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_pic').style.display="";
			document.getElementById(f_sw+M_sw+'_nopic').style.display="none";
		}else{
			document.getElementById(f_sw+i+'_pic').style.display="none";
			document.getElementById(f_sw+i+'_nopic').style.display="";
		}
	}
}

// 缩放字体
function changesize(size){
	document.getElementById('content').style.fontSize=size+'px';
}