function decodeXhtml(arr) {
	var text = "";
	var textarr = arr.split(';');
	for (var item in textarr)
		text += String.fromCharCode(textarr[item].replace("&#", ""));
	return text;
}

var nametext = "",tags = "",pbtex = "";
var objRegExp= /^&#\d+.*\;$/;
var tgname = pageConfig.name + pageConfig.tags;
if(objRegExp.test(pageConfig.name)){
	nametext = decodeXhtml(pageConfig.name);
	pbtex = decodeXhtml(tgname);
	tags = decodeXhtml(pageConfig.tags)
}else{
	nametext = pageConfig.name;
	pbtex = tgname;
	tags = pageConfig.tags;
}


window.yuyueFun = function() {
	$("body").append('<div class="yuyuemengban" style="display: none;"></div><div class="yuyuewrap" style="display: none;"><div class="closebtn"> × </div><div class="yuyue_con"><input type="text" class="phone" name="phone" value="" placeholder="请输入手机号"><div class="tips">' + Math.round(Math.random() * 1000) + '人已预约此应用</div><input type="hidden" name="type" value="az"><div class="yuyuebtn_bs" name="submit">确定</div><div class="yuyuebtn_br">取消</div></div></div>');
	$('.yuyuemengban,.yuyuewrap .closebtn,.yuyuewrap .yuyuebtn_br').click(function() {
		$('.yuyuemengban,.yuyuewrap').hide();
	});
	$(".yuyue").click(function(){
		$('.yuyuemengban,.yuyuewrap').show();
	});
	$(".yuyuebtn_bs").click(function() {
		var reg = /^1[3|4|5|7|8][0-9]{9}$/;
		var phoneNum = $(".yuyue_con .phone").val();
		var flag = reg.test(phoneNum);
		var type = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? "ios" : "az"
		if(flag) {
			//var i = new Image();
			//i.src = "http://m.17wanjia.com/api/yuyue/?id=" + $("#entityid").val() + "&client=pc&phone=" + phoneNum;
			alert("预约成功");
			$('.yuyuemengban,.yuyuewrap').hide();
		} else {
			alert("您输入的手机号有误");
		}
	});
}


var aztag = false,pbFlag = true;
var azTgflag = false,iosTgflag = false,pcTgflag = false;

function getAzDownlink(data){
	if(data.downurl == "#") {
		$(".d_l_bendi").hide();
		//$(".d_l_bendi a").attr("href", "javascript:").find("span").html("资源已下架").show().attr("target","_self");	
		aztag = true;
	} else if (data.downurl == "xj") {
		pbFlag = false;
        $(".d_l_bendi").hide();
        $(".pc_btn").hide();
        $(".d_l_liji").attr("href", "javascript:").attr("target","_self").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("暂未上线").show();
    } else if(data.downurl == "sc") {
		$(".d_l_bendi").attr("href", "javascript:").attr("target","_self").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("暂未上线").show();	
	} else {
		$(".d_l_bendi").attr("href", data.downurl);
		if(data.ants){
			$(".d_l_bendi").css("line-height","31px");
			$(".d_l_bendi").append('<i style="display: block;font-size: 12px;">'+ data.ants +'</i>');
		}
		azTgflag = true;
	}
	if(pbFlag){
		$.getScript("//m.17wanjia.com/api/GetSoftDownLinkNew/120?sid="+ pageConfig.id +"&callback=getIosDownlink&ua=ios&ants=ants");
	}
}

function getIosDownlink(data){
	if(data.downurl == "#") {
		if(aztag){
			$(".d_l_liji").attr("href", "javascript:").attr("target","_self").addClass("yuyue").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("立即预约");	
			yuyueFun();
		}else{
			$(".d_l_liji").hide();
		}
		
	} else if (data.downurl == "xj") {
        $(".d_l_bendi").hide();
        $(".pc_btn").hide();
        $(".d_l_liji").attr("href", "javascript:").attr("target","_self").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("暂未上线").show();
    } else {
		$(".d_l_liji").attr("href", data.downurl);
		if(data.ants){
			$(".d_l_liji").css("line-height","31px");
			$(".d_l_liji").append('<i style="display: block;font-size: 12px;">'+ data.ants +'</i>');
		}
		iosTgflag = true;
	}
	if(azTgflag || iosTgflag || pcTgflag){
		//downFun();
	}	
}
function getPcDownlink(data){
	if(data.downurl == "#") {
		$(".pc_btn").hide();
		$.getScript("//m.17wanjia.com/api/GetSoftDownLinkNew/120?sid="+ pageConfig.id +"&callback=getAzDownlink&ua=android&ants=ants");
	} else if (data.downurl == "xj") {
        $(".d_l_bendi").hide();
        $(".pc_btn").hide();
        $(".d_l_liji").attr("href", "javascript:").attr("target","_self").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("暂未上线").show();
    } else {
		$(".pc_btn").attr("href", data.downurl)
		$(".d_l_bendi").hide();
		$(".d_l_liji").hide();
		if(data.ants){
			$(".pc_btn").css("line-height","31px");
			$(".pc_btn").append('<i style="display: block;font-size: 12px;">'+ data.ants +'</i>');
		}
		pcTgflag = true;
	}
}

if(window.downpage){
	$(".d_l_bendi").hide();
	$(".pc_btn").hide();
	$(".d_l_liji").attr("href", "javascript:").attr("target","_self").css({"background":"#ccc","border-color":"#ccc"}).find("span").html("暂未上线");	
}else{
	$.getScript("//m.17wanjia.com/api/GetSoftDownLinkNew/120?sid="+ pageConfig.id +"&callback=getPcDownlink&ua=pc&ants=ants");

}

function downFun(){
	if(!/传奇/g.test(tags)){
		var soft_url = "http://imag7.17wanjia.com/api/adl/4698092_mnq-ldmnq-43730";
		var html = '<a class="cq_btn" style="position: relative;text-indent: 0;" href="'+ soft_url +'"><img src="/SkinNew/images/yxhz.png"><i style="position: absolute;bottom: -28px;left: 1px;line-height: 20px;font-size: 14px;color: #dbdbdb;"><marquee><b style="font-size: 14px;color: #666;font-weight: normal;text-indent: 0;">用电脑畅玩手游，绿色，无捆绑</b></marquee></i></a>';
		$(".pc_btn").after(html);
	}
}

if(/传奇/g.test(tags)){
 	var html = '<a href="http://doapi.prxxff.com/api/adl/4711993_wy-cq-bszq-hp" style="background: none;text-indent: 0px;"><img src="http://www.17wanjia.com/SkinNew/images/chuanqi.png"><i style="position: absolute;bottom: -28px;left: 0;line-height: 20px;font-size: 14px;color: #dbdbdb;font-style: normal;"><marquee><b style="font-size: 14px;color: #858585;font-weight: normal;">下载pc三端互通版，每日新服，极速体验，全服称霸！</b></marquee></i></a>';
 	$(".d_l_liji").after(html)
}



function GetQueryString(name, url) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = url.match(reg);
	if (r != null) return r[2];
	return null;
}

$(".d_l_bendi,.d_l_liji").click(function() {
	if ($(this).text().indexOf("资源") < 0 && $(this).text().indexOf("预约") < 0 && $(this).text().indexOf("暂") < 0) {
		var  pkeypara="";
		var ulhref = $(this).attr("href");
		if(ulhref.indexOf("?") >= 0){
			var keys = GetQueryString("ak", ulhref.split("?")[1]);
				if (keys) {
					var b = new Image();
					b.src = "http://tongji.tt.17wanjia.com/sys/count.do?sc=" + keys;
				}
		//  参数前面加一个p， 如原来tk，现在为ptk  判断ptk   增加参数 pkey
				var pkeys = GetQueryString("pak",ulhref.split("?")[1]);
				if(pkeys)
				{
					  pkeypara="&pkey="+pkeys;
				}
			}
		var i = new Image();
		i.src = "//xztongji.17wanjia.com/count.do?ch=pc17wanjia&sid=" + pageConfig.id  + pkeypara+ "&name=" + escape(nametext)+ "&source="+location.href;
			
	}
});

$(".con_r_tab_hot a").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".b-r-con ul").eq(index).show().siblings().hide();
});

$(".hj-ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(".hj-tab .hj-item").eq(index).show().siblings().hide();
});

/*滚动*/
$(window).load(function(){
	$("#rjjt").slide({
		mainCell: "ul",
		vis: 3,
		prevCell: ".sPrev",
		nextCell: ".sNext",
		effect: "leftLoop"
	});
});
var temp = 1;
if ($("#rjjs").height() >= 480) {
	$("#rjjs").css({
		height: "480px",
		overflow: "hidden"
	});
	$('#expand span').click(function() {
		if ($("#rjjs").height() == 480) {
			$("#rjjs").css({
				height: "auto"
			});
			$(this).html('收起内容');
		} else {
			$("#rjjs").css({
				height: "480px"
			});
			$(this).html('展开全部');
		}
	});
}


$(".hd ul li").click(function() {
	$("div.hd ul li").removeClass("on");
	$(this).addClass("on");
	$("div.bd .contm-tabbox").hide();
	$("div.bd .contm-tabbox").eq($(this).index()).show();
})




//本类排行
$('.rw .s').hover(function() {
	var openType = $(this).attr('open-type');
	if (openType != 'first') {
		$(this).parent().find('.s').attr('open-type', 'one');
		$(this).parent().find('.s .first').hide();
		$(this).parent().find('.s .one').show();
		$(this).find('.first').show();
		$(this).find('.one').hide();
		$(this).attr('open-type', 'first');
	}
});
$('.rank .s').hover(function() {
	var openType = $(this).attr('open-type');
	if (openType != 'first') {
		$(this).parent().find('.s').attr('open-type', 'one');
		$(this).parent().find('.s .first').hide();
		$(this).parent().find('.s .one').show();
		$(this).find('.first').show();
		$(this).find('.one').hide();
		$(this).attr('open-type', 'first');
	}
});

var rck = 0;
$('.rem-box .pull-right a').click(function(e) {
	e.preventDefault();
	if (rck < 1) {
		return (function() {
			rck += 1;
			$('.rem-box .content').hide();
			$('.rem-box .content').eq(rck).fadeIn('fast');
			console.log(rck)
		})()
	}
	rck = 0;
	$('.rem-box .content').hide();
	$('.rem-box .content').eq(rck).fadeIn('fast');
});



if ($("#soft_text_tab").length > 0) {
	$(window).scroll(function() {
		var scrolls = $(document).scrollTop();
		if (scrolls > 555) {
			$(".cts-mtab").addClass("cts-mtab-fix");
		} else {
			$(".cts-mtab").removeClass("cts-mtab-fix");
		}
	})
	$(".head-tab li").click(function() {
		if ($(this)[0].innerHTML.indexOf('#rjjt') > -1) {
			if ($("#rjjs").height() == 480) {
				$("#rjjs").css({
					height: "auto"
				});
				$("#expand span").html('收起内容');
			}
		}
		$(this).siblings().removeClass("hover");
		$(this).addClass("hover");
	})
}

//$(".brednav").after('<div class="ad_box" style="width: 1200px;margin:10px auto;position: relative;"><a href="http://imag7.17wanjia.com/api/adl/4657065_pc-banner" style="display: block;width:100%;"><img src="http://src.i-1-92sucai.52tup.com/2021/12/16/77a37e69-f9c8-424d-a478-599e4cc67ef0.jpg?imag" style="width: 100%;vertical-align: top;" /><a><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span><span class="close_btn" style="display:block;position:absolute;top: -1px;right: -6px;width:30px;height:30px;font-size: 30px;transform:rotate(45deg);color:#fff;cursor: pointer;">+</span></div>');
$(".close_btn").click(function(){
	$(".ad_box").hide();
});