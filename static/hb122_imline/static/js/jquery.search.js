
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }

function opensubmit() {
    var keys = document.getElementById('q').value;
	keys = keys.trim();
	
    if (keys != "" && keys != '请输入您要搜索的内容...') {
        var ret = sendsearch(keys);
        if (ret == "1") {
            document.searchform.submit();
        } else {
            alert(ret);
            return false;
        }
    } else {
        $('#q').focus();
        return false;
    }

}

function checkForm() {
	
	var form = document.getElementByName('searchform');
    document.getElementById('q').value = document.getElementById('q').value.trim();
    return true;
}

function sendsearch(keys) {

    var url = "/sendsearch/";
    url = encodeURI(encodeURI(url));
    obj = $.ajax({
		type: 'post',
        url: url,
		data: {'keys':keys},
        async: false
    });
    return obj.responseText;
}


$(function () {
    var date = getCurrentDateTime();
    var calendar = showCal();
    $("#currentDate").text(date + " " + calendar);

   if ($(".adclose").length>0) {
  	 $('.adclose').on('click',function(){
		$(this).parent().slideUp(1000);
  	 });
   }

    if ($("#oClose").length>0) { 
	
	$("#oClose").attr("title","关闭侧栏");
	var sbwidth = $('.newsth').width();
	$('#oClose').toggle(
		function(){ 
			$('.newswz_nav').css({'width':'100%'});
			$('.newsright_nav01,.news_wntj').hide();
			$('.news_statement').css({'width':(sbwidth-42)+'px'});
			$(this).css({"background":"url('/images/open_fullscreen.png')"});
			$(this).attr("title","展开侧栏");
		},
		function(){
			$('.newswz_nav').css({'width':''});
			$('.news_statement').css({'width':''});
			$('.newsright_nav01,.news_wntj').show();
			$(this).css({"background":"url('/images/exit_fullscreen.png')"});
			$(this).attr("title","关闭侧栏");
	});	 
    } 


    if ($("#ops_light").length>0) { 
	
	$('#ops_light').click(function(){
		if($(this).text() == "关灯") {
				$('.bj_head,.bjmenu02,.newsth>.newsthleft').hide();
				$('body,.newsdbt,#m_header,.bottom,#content_s,#content_s,p').css({"backgroundColor":'#000',"color":"#666"});
				$('.newsdbt').css("margin-top","30px");
				$(".newsrq").css({"background-color":"#000","border-bottom-color":"#666"});
				$(".news_wntj").css({"border-top-color":"#666"});
				$(".news_wntj>h2").css({"color":"#666"});
				$(".newswz03,. newswz04>span").css({"color":"#666"});
				$(".newswz04 span").css({"color":"#666"});
				$('.news_statement').css({'background':'#000','color':'#666','border-color': '#333'});
				$(".newsth a").css({"color":"#666"});
				$(".ops_shareLayer .ops_icons a").css({"backgroundColor":"#666"});
				$("#ops_fontsize>ul>li").css({"backgroundColor":"#666"});
				$(".newsright_rdpb h2").css({"color":"#666"});
				$(".linenum>li>em").css({"backgroundColor":"#666"});
				$(".appBtnStyle").css({"backgroundColor":"#666"});
				$(".foot_ad a,.foot_3 a").css({"color":"#666"});
				$(this).text("开灯")

				
				
		} else if ($(this).text() == "开灯") {
				$('.bj_head,.bjmenu02,.newsth>.newsthleft').show();
				$('body,.newsdbt,#m_header,.bottom,#content_s,#content_s,p').css({"backgroundColor":'',"color":""});
				$('.newsdbt').css("margin-top","0px");
				$(".newsrq").css({"background-color":"#fff","border-bottom-color":"#d7d7d7"});
				$(".news_wntj").css({"border-top-color":"#ccc"});
				$(".news_wntj>h2").css({"color":"#000"});
				$(".newswz03,. newswz04>span").css({"color":"#000"});
				$(".newswz04 span").css({"color":"#000"});
				$('.news_statement').css({'background':'','color':'','border-color': ''});
				$(".newsth a").css({"color":""});
				$(".ops_shareLayer .ops_icons a").css({"backgroundColor":""});
				$("#ops_fontsize>ul>li").css({"backgroundColor":""});
				$(".linenum>li>em").css({"backgroundColor":""});
				$(".newsright_rdpb h2").css({"color":""});
				$(".appBtnStyle").css({"backgroundColor":""});
				$(".foot_ad a,.foot_3 a").css({"color":""});
				$(this).text("关灯")
		}	
	});	
    } 

    if($("#ops_fontsize").length>0) {
	
	 $("#ops_fontsize>ul>li").click(function(){

		var cssFontSize = $("custom").css("font-size");
		var fontSize = parseFloat(cssFontSize);
		var fontunit = cssFontSize.slice(-2);
		
		var cssPlineH = $("custom").find("p").css("line-height");
		var lineHeight = parseFloat(cssPlineH);
		var linehunit = cssPlineH.slice(-2);

		var className = $(this).attr("class");

		if ("opbig" == className) {						
			if (fontSize <= 23) {
							
				fontSize += 1;

				lineHeight +=1;						
			}
					
		}else if ("opsmall" == className) {						
			if (fontSize >= 15) {
							
				fontSize -= 1;
	
				lineHeight -=1;					
			}

		}
		$("custom").css({"font-size":fontSize + fontunit});
		$("custom").find("p").css({"line-height":lineHeight + linehunit});

	});

	
	    //var navH = $(".newsrq").offset().top;
	    var scroll=0;
	    var meq0 = $('.newsrqleft>span').eq(0);
	    var meq1 = $('.newsrqleft>span').eq(1);
                    var i0 = $('.newsrqleft>i').eq(0);
	    var meq0source = meq0.text();
                    var meq1source = meq1.text();
	    var mtitles = $('.newsdbt').text();
            
	    $(window).scroll( function() {
			if(document.body.clientWidth>768)
	        {
		
				if( $('#ops_light').text() == "开灯" ) navH = 50;
				if( $('#ops_light').text() == "关灯" ) navH = 295;
				//console.log(navH);

				//var scroHeight = $(this).scrollTop(); //滚动条滚动的高度
				//var wTop=$(window).scrollTop(); //滚动条距离顶部高度
		
				var bdcolor = $('.newsrq').css("background-color");

				$(".newsrq").css({"background-color":bdcolor});

				if( $(document).scrollTop()>navH && scroll==0)
				{
					$(".newsrq").css({"z-index":"99"});
					$(".newsrq").addClass("fixed");
					meq0.hide();
					i0.hide();
					meq1.text(mtitles).addClass("tmdcss").attr("title",mtitles);
					scroll=1;

				}else if( $(document).scrollTop()<=navH && scroll==1)
				{
					$(".newsrq").css({"z-index":"0"});
					$(".newsrq").removeClass("fixed");
					meq0.show().text(meq0source);
					i0.show();
					meq1.text(meq1source).removeClass("tmdcss").attr("title","");
					scroll=0;
				}

			}else {
				$(".newsrq").css({"z-index":"0"});
				$(".newsrq").removeClass("fixed");
			}

	    });
	
    }

});

function trims(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}


function getCurrentDateTime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var week = d.getDay();
    /*时分秒*/
    /*var hours = d.getHours(); 
    var minutes = d.getMinutes(); 
    var seconds = d.getSeconds(); 
    var ms = d.getMilliseconds();*/
    var curDateTime = year;
    if (month > 9) curDateTime = curDateTime + "年" + month;
    else curDateTime = curDateTime + "年0" + month;
    if (date > 9) curDateTime = curDateTime + "月" + date + "日";
    else curDateTime = curDateTime + "月0" + date + "日";
    /*if (hours > 9) 
curDateTime = curDateTime + " " + hours; 
else 
curDateTime = curDateTime + " 0" + hours; 
if (minutes > 9) 
curDateTime = curDateTime + ":" + minutes; 
else 
curDateTime = curDateTime + ":0" + minutes; 
if (seconds > 9) 
curDateTime = curDateTime + ":" + seconds; 
else 
curDateTime = curDateTime + ":0" + seconds;*/
    var weekday = "";
    if (week == 0) weekday = "星期日";
    else if (week == 1) weekday = "星期一";
    else if (week == 2) weekday = "星期二";
    else if (week == 3) weekday = "星期三";
    else if (week == 4) weekday = "星期四";
    else if (week == 5) weekday = "星期五";
    else if (week == 6) weekday = "星期六";
    curDateTime = curDateTime + " " + weekday;
    return curDateTime;
}


/*获取当前农历*/
function showCal() {
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    return GetLunarDay(yy, mm, dd);
}

//定义全局变量 
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5,
    0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D,
    0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA,
    0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D,
    0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6,
    0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A,
    0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B,
    0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
    return (m >> n) & 1;
}
//农历转换 
function e2c() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true;
                break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}

function GetcDateString() {
    var tmp = "";
    /*显示农历年：（ 如：甲午(马)年 ）*/
    
    tmp+=tgString.charAt((cYear-4)%10); 
    tmp+=dzString.charAt((cYear-4)%12); 
    tmp+="("; 
    tmp+=sx.charAt((cYear-4)%12); 
    tmp+=")年 ";
    
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear; 
    if (solarYear < 1921 || solarYear > 2020) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }
}