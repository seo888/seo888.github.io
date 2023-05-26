var intEgg_1_018 = 0;
var arrEgg_1_018 = new Array();


var timestamp = Date.parse(new Date());
var stringTime = "2021/06/15 23:59:59";   //万达广场
var timestamp2 = Date.parse(new Date(stringTime));
if(timestamp<=timestamp2){
	 arrEgg_1_018.push("<a href='https://mp.weixin.qq.com/s/UAHB5_LIqh7wR_NuJ7hCgA'  target='_blank'><img src='http://img.plus.yongzhou.gov.cn/202104262275e5d4f71ce8241a7c9cb1227bde0c.jpg' /></a>");
	 arrEgg_1_018.push("<a href='https://mp.weixin.qq.com/s/UAHB5_LIqh7wR_NuJ7hCgA'  target='_blank'><img src='http://img.plus.yongzhou.gov.cn/20210426bf014041d5dfd4843a2ff93dbcb457d1.jpg' ></a>");
}
else{
// arrEgg_1_018.push("<a href='https://click.gridsumdissector.com/track.ashx?gsadid=gad_139_2xs1xnz8' data='2' target='_blank'><img src='http://www.yongzhou.gov.cn/images/ad/dzad/dz610_2019021802.jpg' ><img style='display: none;' src='https://impression.gridsumdissector.com/gs.gif?gscmd=impress&gsadid=gad_139_st72nojb'  /></a>");
}


if(arrEgg_1_018.length >= 1) {
	document.write('<span id="egg_banner_1_018">' + arrEgg_1_018[0] + '</span>');
}
if(arrEgg_1_018.length >= 2) {
	setInterval("ChangeEGG_1_018()", 3000);
}

function ChangeEGG_1_018() {
	intEgg_1_018++;
	if(intEgg_1_018 >= arrEgg_1_018.length) {
		intEgg_1_018 = 0;
	}
	if(arrEgg_1_018[intEgg_1_018] == "") {
		intEgg_1_018 = 0;
	}
	if(document.getElementById('egg_banner_1_018').innerHTML != arrEgg_1_018[intEgg_1_018]) {
		document.getElementById('egg_banner_1_018').innerHTML = arrEgg_1_018[intEgg_1_018];
	}
}