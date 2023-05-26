//*** redirect to m.zjol.com.cn ***
//*** 支站移动化跳转
//*** xub 2016-05-12 ***
var u = "http://m2.zjol.com.cn/msite/";
//var ch = {"www":3000000, "zjnews":3000000, "china":7000000, "opinion":4000000, "photo":31000000, "zzhz":50000000, "biz":41000000, "town":19000000, "gotrip":33000000, "edu":14000000, "health":5000000, "ent":23000000, "yq":24000000};
var ch = {"zzhz":50000000, "biz":41000000, "town":19000000, "gotrip":33000000, "edu":14000000, "health":5000000, "yq":24000000};
var h = window.location.host;
var a = window.location.href;
var domain = h.substring(0,h.indexOf("."));
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)){
	uaredirect();
}

function uaredirect() {
    //*** url中带m2pc或pub的不跳转
	var re = "";
	var tu = "";
	if (h.match("csnews")) {
		tu = "_cs";
	};
	if (!a.match("m2pc") && !h.match("pub|csnews.zjol.com.cn|dhnews.zjol.com.cn|dynews.zjol.com.cn|zjsjw|khnews.zjol.com.cn|cx.zjol.com.cn|xcnews.zjol.com.cn|txnews.zjol.com.cn|^yhnews.zjol.com.cn|sznews.zjol.com.cn") ){ 
		if (a.match("system")) { 
			//var newsid = a.substr(a.lastIndexOf("/")+1,9);
			var newsid = a.substring(a.lastIndexOf("/")+1,a.indexOf(".shtml"));
			if (newsid.length == 9){
				re = u + "details"+tu+".html?newsid="+ newsid + "&ref=" +a;
			}else{
				re = null
			}
			
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
