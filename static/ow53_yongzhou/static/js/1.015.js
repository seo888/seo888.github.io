//新闻详情 右下
var intEgg_1_015 = 0;
var arrEgg_1_015 = new Array();

var timestamp = Date.parse(new Date());
var stringTime = "2022/04/01 23:59:59";
var timestamp2 = Date.parse(new Date(stringTime));
//alert(timestamp+" "+timestamp2);
if(timestamp<=timestamp2){
	arrEgg_1_015.push('<a href="" target="_blank"><img src="http://www.yongzhou.gov.cn/images/ad/yongzhouxinwenwang.gif" /></a>');
}
//arrEgg_1_015.push('<a href="http://www.quanyou.com.cn/" target="_blank"><img src="http://www.yongzhou.gov.cn/images/ad/qyjj.jpg" /></a>');


if(arrEgg_1_015.length >= 1) {
    document.write('<span id="egg_banner_1_015">' + arrEgg_1_015[0] + '</span>');
}
if(arrEgg_1_015.length >= 2) {
    setInterval("ChangeEGG_1_015()", 5000);
}

function ChangeEGG_1_015()
{
    intEgg_1_015++;
    if (intEgg_1_015 >= arrEgg_1_015.length)
    {
        intEgg_1_015 = 0;
    }
    if (arrEgg_1_015[intEgg_1_015] == "")
    {
        intEgg_1_015 = 0;
    }
    if (document.getElementById('egg_banner_1_015').innerHTML != arrEgg_1_015[intEgg_1_015])
    {
        document.getElementById('egg_banner_1_015').innerHTML = arrEgg_1_015[intEgg_1_015];
    }
}