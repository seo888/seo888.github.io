//新闻详情 右上

var intEgg_1_014 = 0;
var arrEgg_1_014 = new Array();
//当前时间戳 毫秒
var timestamp = Date.parse(new Date());
var endTime = "2021/06/20 23:59:59"; 
var timestampend = Date.parse(new Date(endTime));

if(timestamp<=timestampend){
	arrEgg_1_014.push('<a href="http://www.hnsxdl.com/"  target="_blank"><img src="http://www.yongzhou.gov.cn/images/ad/sanxiangdianlan.gif"/></a>');
	//arrEgg_1_014.push('<a href="http://ybj.yzcity.gov.cn/"  target="_blank"><img src="/themes/default/images/ad/1.014_2020052002.jpg"/></a>');
	//arrEgg_1_014.push('<a href="http://ybj.yzcity.gov.cn/"  target="_blank"><img src="/themes/default/images/ad/1.014_2020052003.jpg"/></a>');
}

if( arrEgg_1_014.length >= 1) {
	document.write('<span id="egg_banner_1_014">' + arrEgg_1_014[0] + '</span>');
}
if(arrEgg_1_014.length >= 2) {
	setInterval("ChangeEGG_1_014()", 5000);
}
function ChangeEGG_1_014()
{
    intEgg_1_014++;
    if (intEgg_1_014 >= arrEgg_1_014.length)
    {
        intEgg_1_014 = 0;
    }
    if (arrEgg_1_014[intEgg_1_014] == "")
    {
        intEgg_1_014 = 0;
    }
    if (document.getElementById('egg_banner_1_014').innerHTML != arrEgg_1_014[intEgg_1_014])
    {
        document.getElementById('egg_banner_1_014').innerHTML = arrEgg_1_014[intEgg_1_014];
    }
}