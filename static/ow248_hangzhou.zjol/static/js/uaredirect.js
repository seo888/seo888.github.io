//*** redirect to m2.zjol.com.cn ***
//*** xub 2014-12-12 ***
var u = "http://m2.zjol.com.cn/mzjol/";
//var ch = {"www":3000000, "zjnews":3000000, "china":7000000, "opinion":4000000, "photo":31000000, "zzhz":50000000, "biz":41000000, "town":19000000, "gotrip":33000000, "edu":14000000, "health":5000000, "ent":23000000, "yq":24000000};
var ch = {"zzhz":50000000, "biz":41000000, "town":19000000, "gotrip":33000000, "edu":14000000, "health":5000000, "yq":24000000};
var h = window.location.host;
var a = window.location.href;
var domain = h.substring(0,h.indexOf("."));
/* closed 20200821
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)){
	uaredirect();
}
*/

function uaredirect() {
    //*** urlÖ´ø»òµĲ»Ìת
	var re = "";
	var tu = "";
	if (h.match("zzhz")) {
		tu = "_zzhz";
	};
	if (!a.match("m2pc") && !h.match("pub")){ 
		if (a.match("system")) { 
			//var newsid = a.substring(a.lastIndexOf("/")+1,a.indexOf(".shtml"));
			var newsid = a.substr(a.lastIndexOf("/")+1,9);
			re = u + "details"+tu+".html?newsid="+ newsid;
		}else if (ch[domain]){                               
			re = u + "?channel=" + ch[domain];
		}else{
			re = null;
		}

	}
	if(re){
		location.replace(re);
	}

}
