
//获取下载地址
var yuyue_flag = true;
window.yuyueFun = function() {
	if (yuyue_flag) {
		$("body").append(
			'<div class="yuyuemengban" style="display: none;"></div><div class="yuyuewrap" style="display: none;"><div class="closebtn"> × </div><div class="yuyue_con"><input type="text" class="phone" name="phone" value="" placeholder="请输入手机号"><div class="tips">' +
			Math.round(Math.random() * 1000) +
			'人已预约此应用</div><input type="hidden" name="type" value="az"><div class="yuyuebtn_bs" name="submit">确定</div><div class="yuyuebtn_br">取消</div></div></div>'
		);
		$('.yuyuemengban,.yuyuewrap .closebtn,.yuyuewrap .yuyuebtn_br').click(function() {
			$('.yuyuemengban,.yuyuewrap').hide();
		})
		$(".yuyuebtn_bs").click(function() {
			var reg = /^1[3|4|5|7|8][0-9]{9}$/;
			var phoneNum = $(".yuyue_con .phone").val();
			var flag = reg.test(phoneNum);
			var type = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? "ios" : "az"
			if (flag) {
				var i = new Image();
				i.src = "http://m.xdowns.com/api/yuyue/?id=" + $("#EntityID").val() + "&client=pc&phone=" + phoneNum;
				alert("预约成功");
				$('.yuyuemengban,.yuyuewrap').hide();
			} else {
				alert("您输入的手机号有误");
			}
		});
		yuyue_flag = false;
	}
	$(".yuyue").click(function() {
		$('.yuyuemengban,.yuyuewrap').show();
	});
}


var azYueyue = false,pbFlag = true;
var tgflag = true,
	tgflag2 = true;

window.getAzDownlink = function(data) {
	if (data.downurl == "#") {
		azYueyue = true;
		tgflag = false;
	} else if (data.downurl == "xj") {
		tgflag = false;
		pbFlag = false;
		$(".downtab").html("<li style='line-height:40px;font-size:18px;margin-left: 10px'>"+(typeof pageConfig != 'undefined' && pageConfig.tags.indexOf("棋牌") > -1 ? "资源已下架" : "暂未上线")+"</li>")
		$("#down .ad_l").html('<img class="nodownlink" src="http://www.xdowns.com/SkinNew/images/zwsx.jpg" style="width:300px;margin-bottom:60px">');
	} else if (data.downurl == "sc") {
		$(".downandroid").html('<img src="http://www.chuzhaobiao.com/SkinNew/images/nodown.gif" />');
		tgflag = false;
	} else {
		$(".downandroid li a").attr("href", data.downurl);
		if(data.ants){
			$(".downandroid li a").text(data.ants);
		}
	}
	if(pbFlag){
		$.getScript("http://m.xdowns.com/api/GetSoftDownLinkNew/120?sid=" + pageConfig.id + "&callback=getIosDownlink&ua=ios&ants=ants&v=" + Math.floor(Math.random() * 10000));
	}
}

window.getIosDownlink = function(data) {
	if (data.downurl == "#") {
		if (azYueyue) {
			$(".down_text").text("立即预约");
			$(".downandroid").html(
				'<li class="noappdownlink"><span style="display:block;height: 35px;background: #369efd;color: #fff;font-size: 18px;text-align: center;line-height: 30px;border-radius: 5px;cursor: pointer;" class="yuyue">立即预约</span></li>'
			);
			$(".downtab li").eq(1).hide();
			yuyueFun();
		} else {
			$(".downtab li").eq(1).hide();
		}
		tgflag2 = false;
	} else if (data.downurl == "xj") {
		tgflag2 = false;
		$(".downtab").html("<li style='line-height:40px;font-size:18px;margin-left: 10px'>"+(typeof pageConfig != 'undefined' && pageConfig.tags.indexOf("棋牌") > -1 ? "资源已下架" : "暂未上线")+"</li>")
		$("#down .ad_l").html('<img class="nodownlink" src="http://www.xdowns.com/SkinNew/images/zwsx.jpg" style="width:300px;margin-bottom:60px">');
	} else {
		if (azYueyue) {
			$(".downtab li").eq(0).hide();
			$(".type-android").hide();
			$(".type-ios").show();
		}
		$(".downios li a").attr("href", data.downurl);
		if(data.ants){
			$(".downios li a").text(data.ants);
		}
	}
	if (tgflag || tgflag2) {
		downFun();
	}
}

if (window.downpage) {
	$(".downtab").html("<li style='line-height:40px;font-size:18px;margin-left: 10px'>"+(typeof pageConfig != 'undefined' && pageConfig.tags.indexOf("棋牌") > -1 ? "资源已下架" : "暂未上线")+"</li>"); //资源已下架
	$("#down .ad_l").html(
		'<img class="nodownlink" src="http://www.xdowns.com/SkinNew/images/zwsx.jpg" style="width:300px;margin-bottom:60px">'  //http://www.chuzhaobiao.com/SkinNew/images/nodown.jpg
	);
} else {
	$.getScript("http://m.xdowns.com/api/GetSoftDownLinkNew/120?sid=" + pageConfig.id + "&callback=getAzDownlink&ua=android&ants=ants&v=" + Math.floor(Math.random() * 10000));
}

var steamId = ",101890,102634,103063,103237,103272,105097,105681,118317,118386,118402,118696,118979,119054,119067,119111,119379,119730,120305,120399,120843,120997,121525,121625,122488,123082,124043,124858,126471,126525,126709,128338,130416,131068,132270,134059,135331,135569,136029,136631,137063,137395,137634,137648,139106,141812,142911,142923,143277,143283,144304,144384,144550,144562,145002,146195,148437,148773,149106,149330,149738,149854,151742,152571,153208,153539,156131,156307,156828,157316,159089,159425,160711,16197,162105,162137,16360,16447,16564,169657,171471,172775,174735,175980,176049,176175,176420,177229,182704,182709,184794,188738,189173,189705,194119,198491,198540,199411,199446,199475,200408,200935,201247,201631,201654,20314,204560,204584,204716,204909,204958,205594,205820,205964,205980,206814,206821,207123,207278,207597,207811,207845,208107,208123,208675,208697,208716,208721,208747,209602,211089,211238,211261,211616,211640,211982,212080,212088,212102,212306,212424,212459,212471,212497,212716,212730,213155,213728,213796,213823,213896,21429,214806,214832,215255,216229,216273,216875,216880,216881,216939,217941,218063,218088,218453,218463,218498,218517,218693,218721,218754,218775,219669,219742,219847,220024,220040,220047,220050,220057,220061,220107,220255,222836,223846,223934,224994,225013,225456,229781,229845,230015,230035,230049,230062,230088,230111,230138,230162,230187,230382,230413,230434,230459,230930,232955,232976,233010,233023,233041,233072,233109,233819,233823,235587,235712,235746,235782,235829,235910,236045,236075,236109,236111,236134,236137,236166,236169,236500,236520,236572,236593,236618,236639,236985,238764,239660,239680,239707,240492,240522,240549,240611,242882,242897,243258,243402,243426,243451,243459,243481,244238,244290,244319,244328,244427,244505,244578,247608,247640,247656,247673,247737,249036,249060,249099,249411,250605,253968,262066,262272,263207,263395,263436,263486,263487,263523,263546,263585,263600,263612,263624,264202,264222,264238,264286,265930,266112,266131,266169,266227,266369,268012,268282,268473,269183,269208,269229,269676,270174,271186,271213,271252,271449,271462,271473,271481,271617,272462,273139,273294,273402,273613,273688,274303,27471,274837,275095,275319,276764,277184,277782,28036,281043,281785,281805,282150,28256,28271,283181,283230,283250,283514,283694,283706,285925,286806,287078,291355,291552,294797,29536,29805,298877,301738,301987,302396,303164,309378,311070,31123,312162,312209,313662,313668,313674,313776,313807,314172,314249,314305,314324,314371,314385,314616,314641,314661,314689,314719,314780,314864,315245,315281,315325,315361,315751,315821,316212,317169,317227,317624,317656,321141,321174,322757,322788,322809,328165,333561,333626,337011,340899,340906,340910,340913,340955,340958,340966,340974,340986,341063,341072,341077,341089,341094,341479,341485,341499,341989,342001,342009,342027,342036,342046,342052,342062,342072,36468,37186,37842,381938,381960,381978,381999,382051,382082,382119,382152,382177,38620,38671,386959,386977,38903,39297,39560,39793,39948,40010,40800,41018,41509,41763,426410,43475,44779,45430,49221,49299,4975,57610,57753,58106,61228,63913,64096,64249,65020,65913,6736,68948,68974,72812,73215,73506,73832,87979,92143,95597,96090,96311,96487,97781,98060,98680,99372,104478,122489,127379,131920,141347,141815,143073,145197,149894,169690,171011,177633,185989,186391,204113,204131,204153,204167,211848,220585,230898,231604,231633,231670,232629,232921,232940,232948,233122,233139,233166,233177,233320,233543,233566,233597,233630,235408,235479,235495,238006,242219,242236,242253,242265,242275,242874,242918,242973,247897,248357,248390,248451,262168,263836,264432,28402,284889,286766,289765,289874,293379,295577,295596,295664,295675,296585,298414,298739,303020,303449,312332,313903,31465,35541,37196,385446,38578,39293,394911,394945,394970,39555,410200,428923,77732,85996,86467,86846,92555,98163,143739,145172,20394,213507,220164,251318,275207,393657,426383,66593,68391,71953,120380,124007,131992,133369,133710,136042,137448,162715,41409,61220,141368,193500,141401,142912,221832,222719,327624,347674,347685,347705,347716,357782,415889,167073,167174,167203,196471,207226,208212,216975,349181,349205,349497,349650,136323,181819,235364,253155,253175,27188,408462,4811,49451,53465,65297,68634,68646,68652,68656,68658,68663,68692,68709,68728,69834,73307,81994,";

if(steamId.indexOf("," + pageConfig.id + ",") >= 0){
	$(".down_bd").after('<li><a href="http://doapi.prxxff.com/api/adl/4674427_pc-steam-cpc" style="display:block; width: 186px;height: 53px;background: url(https://static.gamehome.tv/pc/images/steam1.png); background-size: 100% 100%;" class="steam"></a></li>');
}

function GetQueryString(name,url)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = url.match(reg);
     if(r!=null)return  r[2]; return null;
}

$(".dtab_c li a").click(function() {
	var ulhref =  $(this).attr("href");
	var  pkeypara="";
	if(ulhref.indexOf("?") > -1){
		var pkeys = GetQueryString("ptk",ulhref.split("?")[1]);
		if(pkeys){
			pkeypara="&pkey="+pkeys;
		}
	}
	var i = new Image();
	i.src = i.src = "http://xz.tongji.xdowns.com/count.do?ch=pcxdowns&sid=" + pageConfig.id + "&name=" + pageConfig.name + pkeypara;
	var keys = GetQueryString("xs",ulhref.split("?")[1]);
	if(keys){
		var b = new Image();
		b.src = "http://tongji.tt.xdowns.com/sys/count.do?sc=" + keys;
	}
});

if(pageConfig.tags && pageConfig.tags.indexOf("传奇") >= 0){
	//$("body").append('<div class="adtg" style="width: 208px;display:block;overflow:hidden;position: fixed;top: 252px;right: 50%;margin-right: 620px;"><a href="http://dps.xdowns.com/tls024772ec/013953"  target="_blank" style="display:block;"><img src="http://i-1.xdowns.com/2021/8/31/c551e7da-955d-4bbc-b3bb-2c5c83485fd7.gif" style="width: 100%;vertical-align: top;"></a><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span> <span class="close_btn_ad" style="display:block;position:absolute;top:0;right:0;width:30px;height:30px;font-size:45px;transform:rotate(45deg);color:#fff;cursor: pointer;">+</span></div>');
	$(".close_btn_ad").click(function(){
		$(".adtg").hide();
	});
}

//$(".ad_r").after('<a class="adtg" href="http://doapi.prxxff.com/api/adl/4658020_xdowns-pc-310*320" style="display:block;width: 300px;margin: 8px auto;overflow:hidden;position: relative;"><img src="http://i-1.xdowns.com/2022/1/10/22451f81-6aa0-49b3-a288-0a85aa66da01.gif?width=310&height=320" style="width: 100%;vertical-align: top;"><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span> <span class="close_btn_ad" style="display:block;position:absolute;top:0;right:0;width:30px;height:30px;font-size:32px;transform:rotate(45deg);color:#fff;text-align: center;line-height: 30px;">+</span></a>');
$(".close_btn_ad").click(function(){
	$(".adtg").hide();
	return false;
});

function downFun() {
	// var downurl = "http://p97t.oss-cn-shanghai.aliyuncs.com/download/"+ pageConfig.name +"_352"+ pageConfig.id +".exe";

	//if(steamId.indexOf("," + pageConfig.id + ",") < 0){
		//$(".down_bd").after('<li><a href="http://doapi.prxxff.com/api/adl/4674502_ydwz-ldmnq" style="display:block; width: 186px;height: 53px;background: url(http://i-1.xdowns.com/2022/4/29/ff8a20b5-34fc-4685-af2a-3e9ee522578f.png); background-size: 100% 100%;" class="steam"></a><span style="position: absolute;bottom: -28px;left: 1px;line-height: 20px;font-size: 14px;color: #dbdbdb;"><marquee><b style="font-size: 14px;color: #858585;font-weight: normal;">新一代手游神器，极高兼容不卡顿，超高帧率畅玩千款手游！</b></marquee></span></li>');
	//}
	//$(".dtab_c .gname").after('<strong class="gname">普通下载地址：</strong>');
	$(".gaosuxz").click(function() {
		var i = new Image();
		i.src = "http://tongji.tt.xdowns.com/sys/count.do?sc=a2V5cz10cGwwMDIyMTM="
	});
	$(".down-jisu a,.topli a").click(function() {
		var i = new Image();
		i.src = "http://tongji.tt.xdowns.com/sys/count.do?sc=a2V5cz10cDEwMDIyMzQ="
	});
}

    $('#SpecialTab b').mouseover(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#cnxh').find('.guess').hide().eq($(this).index()).show();
    });
$(".c_soft_same dt").hover(function(){
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".c_soft_same .list").eq(index).show().siblings(".list").hide();
});
if($("#mtab").length > 0) {
	var html = $("#mtab").prop("outerHTML");
	$("body").append('<div class="wap"><div class="wap-box">' + html + '</div></div>');
	var mainBoxTop = $(".main_box").offset().top;
	var scroll = $(document).scrollTop();
	if(scroll > mainBoxTop) {
		$(".wap").css("display", "block");
	}
	$(window).scroll(function() {
		var scrolls = $(document).scrollTop();
		if(scrolls > mainBoxTop) {
			$(".wap").css("display", "block");
		} else {
			$(".wap").css("display", "none");
		}
	});
	$(".wap-box ul li").click(function() {
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	var num1 = $("#rate1val").text();
	$(".rate1").click(function() {
		num1++;
		$("#rate1val").text(num1);
	});
	var num2 = $("#rate2val").text();
	$(".rate2").click(function() {
		num2++;
		$("#rate2val").text(num2);
	});
}



$(function () {

	var qzyhtml = `<div id="overlay"  style="display: none"></div><div class="wrap_feedback" style="">
				<div class="head">  <span>游戏反馈</span> <i href="javascript:;" hidefocus="none" class="pop_close-qzy e_pop_close">+</i>
			 </div>
				<div class="feedback">
					<span>资源求助</span>
					<div class="info">
						<div class="checkbox"> <input type="radio" value="求更新" name="radios" class="radios"> <label for="checkbox1">求更新</label> </div>
						<div class="checkbox"> <input type="radio" value="求汉化" name="radios" class="radios"> <label for="checkbox2">求汉化</label> </div>
						<div class="checkbox"> <input type="radio" value="求破解" name="radios" class="radios"> <label for="checkbox3">求破解</label> </div>
					</div>
					<span>补充信息</span>
					<textarea style="resize:none;" class="remake" name="remake" placeholder="请输入补充说明"></textarea>
				</div>
				<div class="telbox"> <span>联系方式</span> <input type="tel" class="tel" name="tel" placeholder="请输入手机号码、QQ号码"> </div>
				<div class="code2"><span>验证码</span><input type="text" name="txtCode" id="qzyalidateCode" class="text code"><img src="/jbapi/fbcode" id="imgCode1" class="codeimg"></div>
				<div class="sub"> <input type="button" onclick="qzySumbit()" class="submit qzysubmit" name="submit" value="提交反馈"> </div>
			</div>`;
	$("body").append(qzyhtml);
	$(".downbtn ul").after('<div class="qzy" id="qiuzy"><span>求资源</span><em><i>'+ Math.floor(Math.random() * 100) +'</i>人</em></div>');
	
	$("#qiuzy span").click(function(){
		var num = $("#qiuzy em i").text(); 
		num++;
		$("#qiuzy em i").text(num);
		$('#overlay').show();
		$(".wrap_feedback").show();
	});


    $('.pop_close,.pop_close-qzy').click(function () {
        hidepop();
    });
    $('#overlay').click(function () {
        hidepop();
    });

    function hidepop() {
        $('#overlay').hide();
        $('#popjubao').hide();
		$(".wrap_feedback").hide();
        return false;
    }

	$("#imgCode1").click(function () {
	    $("#imgCode1").attr("src", $("#imgCode1").attr("src") + "?ran=" + Math.random());
	});
});
var getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


function qzySumbit() {
    var radios = $('input:radio[name="radios"]:checked').val();
    if (!radios) {
        alert("请选择求助原因!");
        return;
    }

    var remake = $(".remake").val();
    if (remake.length > 200) {
        alert("原因内容请控制在200字以内!");
        return;
    }
	var telephone = $(".tel").val();
	if (!telephone) {
		alert("请输入联系方式！");
		return;
	}
    var code = $("#qzyalidateCode").val();
    var cookie = getCookie("fbCode");

    if (code == cookie) {
        $('.qzysubmit').unbind("click");
        $.ajax({
            type: "get",
            url: "http://www.xdowns.com/jbapi/feedback/",
            data: {
                yuanyin: radios,
                spec: remake,
                code: code,
                sid: pageConfig.id,
                type: "topic",
				ua: "m",
				contact: telephone,
                ran: Math.random()
            },
            success: function (data) {
                if (data == "CodeError") {
                    alert("验证码出错");
                    $("#imgCode1").attr("src", $("#imgCode1").attr("src") + "?ran=" + Math.random());
                } else if (data == "Error") {
                    alert("录入有误");
                } else {
                    alert("反馈成功");
                    $("input:text").val("");
					$("input:tel").val("");
                    $(".remake").val("");
                    $("#overlay").hide();
                    $(".wrap_feedback").hide();
                    $("#imgCode1").attr("src", $("#imgCode1").attr("src") + "?ran=" + Math.random());
                }
                $(".qzysubmit").attr("onclick", "qzySumbit()")
            }
        });

    } else {
        alert("您输入的验证码有误");
    }

}