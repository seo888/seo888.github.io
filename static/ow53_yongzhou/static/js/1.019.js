var intEgg_1_019 = 0;
var arrEgg_1_019 = new Array();
arrEgg_1_019.push('<a href="" target="_blank"><img src="http://www.yongzhou.gov.cn/images/ad/_20200924225055.jpg" /></a>');

if(arrEgg_1_019.length >= 1) {
	document.write('<span id="egg_banner_1_019">' + arrEgg_1_019[0] + '</span>');
}
	if(arrEgg_1_019.length >= 2) {
		setInterval("ChangeEGG_1_019()", 5000);
	}
function ChangeEGG_1_019()
{
    intEgg_1_019++;
    if (intEgg_1_019 >= arrEgg_1_019.length)
    {
        intEgg_1_019 = 0;
    }
    if (arrEgg_1_019[intEgg_1_019] == "")
    {
        intEgg_1_019 = 0;
    }
    if (document.getElementById('egg_banner_1_019').innerHTML != arrEgg_1_019[intEgg_1_019])
    {
        document.getElementById('egg_banner_1_019').innerHTML = arrEgg_1_019[intEgg_1_019];
    }
}