var intEgg_B0_2 = 0;
var arrEgg_B0_2 = new Array();

//当前时间戳 毫秒
var timestamp = Date.parse(new Date());
var stringTime = "2021/10/24 23:59:59"; //阳光美城  计划半年 A  http://img.plus.yongzhou.gov.cn/2021071563c13d2ae3d0d88ddd44ad2b2eca5f2c.jpg
var timestamp2 = Date.parse(new Date(stringTime));


if (timestamp <= timestamp2) {
	 arrEgg_B0_2.push('<a href="https://mp.weixin.qq.com/s/S1Ry3okg_vTvhjEVvjhNNQ" target="_blank"><img src="http://img.plus.yongzhou.gov.cn/20210827bf4c2640d2b18c7debe52c619c831253.jpg" /></a>');
	 arrEgg_B0_2.push('<a href="https://mp.weixin.qq.com/s/S1Ry3okg_vTvhjEVvjhNNQ" target="_blank"><img src="http://img.plus.yongzhou.gov.cn/202108275b41d2a197cee9991388e4d77e8a7e24.jpg" /></a>');
	 arrEgg_B0_2.push('<a href="https://mp.weixin.qq.com/s/S1Ry3okg_vTvhjEVvjhNNQ" target="_blank"><img src="http://img.plus.yongzhou.gov.cn/20210827279511e4808f6216222549f036ceeea3.jpg" /></a>');
}


if (arrEgg_B0_2.length >= 1) {
	document.write('<span id="egg_banner_B0_2">' + arrEgg_B0_2[0] + '</span>');
}
if (arrEgg_B0_2.length >= 2) {
	setInterval("ChangeEGG_B0_2()", 5000);
}

function ChangeEGG_B0_2() {
	intEgg_B0_2++;
	if (intEgg_B0_2 >= arrEgg_B0_2.length) {
		intEgg_B0_2 = 0;
	}
	if (arrEgg_B0_2[intEgg_B0_2] == "") {
		intEgg_B0_2 = 0;
	}
	if (document.getElementById('egg_banner_B0_2').innerHTML != arrEgg_B0_2[intEgg_B0_2]) {
		document.getElementById('egg_banner_B0_2').innerHTML = arrEgg_B0_2[intEgg_B0_2];
	}
}