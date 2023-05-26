//*** redirect to m.zjol.com.cn ***
//*** xub 2014-12-12 ***
var u = "http://m.zjol.com.cn/mzjol/";
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
	if (a.indexOf("m2pc") > 0){ 
		console.log("不跳转");
	}else {
		window.location.replace(phoneurl);
	}

}