var intEgg_1_016 = 0;
var arrEgg_1_016 = new Array();
var timestamp = Date.parse(new Date());
var stringTime = "2021/05/27 23:59:59";
var timestamp2 = Date.parse(new Date(stringTime));

var stringTime_end = "2021/10/05 23:59:59";
var timestamp_end = Date.parse(new Date(stringTime_end));
if(timestamp<=timestamp_end){
    arrEgg_1_016.push('<a href="http://www.yzjinsong.com/" target="_blank"><img src="http://www.yongzhou.gov.cn/images/ad/jingsongwuye.gif" /></a>');
}
//if(timestamp<=timestamp2){
   // arrEgg_1_016.push('<a href="http://www.yzjinsong.com" target="_blank"><img src="/themes/default/images/ad/1.016_20200527_1.gif"/></a>');
//}

if(arrEgg_1_016.length >= 1) {
    document.write('<span id="egg_banner_1_016">' + arrEgg_1_016[0] + '</span>');
}
if(arrEgg_1_016.length >= 2) {
    setInterval("ChangeEGG_1_016()", 5000);
}
function ChangeEGG_1_016()
{
    intEgg_1_016++;
    if (intEgg_1_016 >= arrEgg_1_016.length)
    {
        intEgg_1_016 = 0;
    }
    if (arrEgg_1_016[intEgg_1_016] == "")
    {
        intEgg_1_016 = 0;
    }
    if (document.getElementById('egg_banner_1_016').innerHTML != arrEgg_1_016[intEgg_1_016])
    {
        document.getElementById('egg_banner_1_016').innerHTML = arrEgg_1_016[intEgg_1_016];
    }
}