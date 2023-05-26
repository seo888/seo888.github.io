
// if(location.href.indexOf("17wanjia.com/qijimu/xkdqjsffbw/") >=0){
// 	$("body").append('<div class="couplet_ad" id="ad_left"><a target="_blank" href="http://dps.17wanjia.com/tls28a69b3d/1473"><img src="https://www.17wanjia.com/SkinNew/images/dleft.jpg"></a><a class="close_btn close_left" onclick="ad_left();"></a></div><div class="couplet_ad" id="ad_right"><a target="_blank" href="http://dps.17wanjia.com/tls28a69b3d/1473"><img src="https://www.17wanjia.com/SkinNew/images/dright.jpg"></a><a class="close_btn close_right" onclick="ad_right();"></a></div>');
// }

function ad_left(){
document.getElementById('ad_left').style.display="none";
}
function ad_right(){
document.getElementById('ad_right').style.display="none";
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?3bc446be5954627e8de3e6d0ba0fd4a4";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();



if(pageConfig.tags && pageConfig.tags.indexOf("传奇") >= 0){
	//$("body").append('<div id="HMcoupletDivleft" style="margin: 0px;padding: 0px;height: 0px;position: fixed;right: 50%;margin-right: 610px;top: 0;overflow: visible;width: 360px;z-index: 9999;"><a href="http://imag7.17wanjia.com/api/adl/4657066_beitou" class="jjjjasdasd" target="_blank" style="display:block;float:none;text-align:right;opacity:1;"><img id="HMimageleft" style="border:0px;display:inline-block;width:auto;max-height:none;" src="http://i-1.17wanjia.com/2021/8/31/fd0a8508-a224-455a-9a94-61fc44f15004.gif"><img id="HMcoupletIconleft" src="https://www.17wanjia.com/SkinNew/images/gficon.png" style="border:0px;display:inline-block;position:absolute;top: 880px;right:0px;z-index:999999;width:auto;"></a><span id="HMCloseImageleft" style="font-size:14px;color:#0F0F0F;border:0px;display:block;position:absolute;top:0px;right:0px;z-index:999999;vertical-align:baseline;max-width:none;"><img src="https://www.17wanjia.com/SkinNew/images/close_btn.png"></span></div><div id="HMcoupletDivright" style="margin: 0px;padding: 0px;height: 0px;position: fixed;left: 50%;margin-left: 610px;top: 0px;overflow: visible;width: 360px;z-index: 9999;"><a href="http://imag7.17wanjia.com/api/adl/4657066_beitou" class="jjjjasdasd" target="_blank" style="display:block;float:none;text-align:left;opacity:1;"><img id="HMimageright" style="border:0px;display:inline-block;width:auto;max-height:none;" src="http://i-1-17wanjia.wh7d.net/2021/8/31/9c2de3f6-ee43-47f2-b035-8ce8b248bb08.gif"><img id="HMcoupletIconright" src="https://www.17wanjia.com/SkinNew/images/gficon.png" style="border:0px;display:inline-block;position:absolute;top: 880px;left:0px;z-index:999999;width:auto;"></a><span id="HMCloseImageright" style="font-size:14px;color:#0F0F0F;border:0px;display:block;position:absolute;top:0px;left:0px;z-index:999999;vertical-align:baseline;max-width:none;"><img src="https://www.17wanjia.com/SkinNew/images/close_btn.png"></span></div>');
	
	$("#HMCloseImageleft").click(function(){
		$("#HMcoupletDivleft").hide();
		return false;
	});
	$("#HMCloseImageright").click(function(){
		$("#HMcoupletDivright").hide();
		return false;
	});
}

 function GetQueryString(name, url) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.match(reg);
            if (r != null) return r[2]; return null;
        }

function btn_down_link(id, tags,name) {
    window.downlink_appaddress = function (data) {
        if (data != "" && data != "sc" && data != "#" && data != "xj" ) {
          
            if (tags.indexOf("传奇") >= 0) {
                var i = new Image();
                i.src = "http://tongji.tt.17wanjia.com/sys/count.do?sc=a2V5cz16dF9rX2NodWFucWlfcTM=";
            }
			
			var  pkeypara="";
			 var ulhref = data;
			 if(ulhref.indexOf("?")>-1)
			 {
                    var keys = GetQueryString("nak", ulhref.split("?")[1]);
                    if (keys) {
                        ysa.track('fbcate', "ttp2-zt-yz");
                    }
                    else {
                        var xskeys = GetQueryString("ak", ulhref.split("?")[1]);
                        if (xskeys) {
                            var b = new Image();
                           b.src = "http://tongji.tt.17wanjia.com/sys/count.do?sc="+ xskeys;

                        }
                    }
					
						//  参数前面加一个p， 如原来tk，现在为ptk  判断ptk   增加参数 pkey
				var pkeys = GetQueryString("pak",ulhref.split("?")[1]);
				if(pkeys)
				{
					  pkeypara="&pkey="+pkeys;
				}
			}
			
			 var i = new Image();
            i.src = "//xztongji.17wanjia.com/count.do?ch=newm17wanjia&sid=" + id  + pkeypara+ "&name=" + encodeURIComponent(encodeURIComponent(name))+ $(".down_infor_top h1").text()+ "&source="+location.href;

			
            window.location.href = data;


        }
        else {
          
            $.getScript("https://m.17wanjia.com/api/GetSoftDownLinkNew/120?sid=" + id + "&ua=android&callback=downlink_address");
        }
    }

    window.downlink_address = function (data) {
        if (data != "" && data != "sc" && data != "#" && data != "xj") {

            if (tags.indexOf("传奇") >= 0) {
                var i = new Image();
                i.src = "http://tongji.tt.17wanjia.com/sys/count.do?sc=a2V5cz16dF9rX2NodWFucWlfcTM=";
            }
			
			var  pkeypara="";
			 var ulhref = data;
			  if(ulhref.indexOf("?")>-1)
			 {
				 var keys = GetQueryString("nak", ulhref.split("?")[1]);
				 if (keys) {
					   ysa.track('fbcate', "ttp2-zt-yz");
				 }
				  else {
                        var xskeys = GetQueryString("ak", ulhref.split("?")[1]);
                        if (xskeys) {
                            var b = new Image();
                           b.src = "http://tongji.tt.17wanjia.com/sys/count.do?sc="+ xskeys;

                        }
                    }
					
						//  参数前面加一个p， 如原来tk，现在为ptk  判断ptk   增加参数 pkey
				var pkeys = GetQueryString("pak",ulhref.split("?")[1]);
				if(pkeys)
				{
					  pkeypara="&pkey="+pkeys;
				}
			} 
			var i = new Image();
            i.src = "//xztongji.17wanjia.com/count.do?ch=newm17wanjia&sid=" + id + "&name="+ encodeURIComponent(encodeURIComponent(name))+ $(".down_infor_top h1").text()+ "&source="+location.href+ pkeypara;

            window.location.href = data;

        }
    }

    $.getScript("https://m.17wanjia.com/api/GetAppDownLink/?sid=" + id + "&ua=android&callback=downlink_appaddress" );
}

if(location.pathname != "/"){
	//$("body").append('<a class="adtg" href="http://dps.17wanjia.com/tlsf9a8108e/010362" style="width: 300px;position: fixed;overflow:hidden;bottom: 0;right: 0;"><img src="http://i-1-img.edowning.net/2021/12/16/973b29f0-e328-4328-b867-2641a8a72d03.gif" style="width: 100%;vertical-align: top;"><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span> <span class="close_btn_ad" style="display:block;position:absolute;top:0;right:0;width:30px;height:30px;font-size:32px;transform:rotate(45deg);color:#fff;text-align: center;line-height: 30px;">+</span></a>');
	$(".close_btn_ad").click(function(){
		$(".adtg").hide();
		return false;
	});
}

if(location.href != "/"){
	//$(".brednav").after('<div class="ad_box" style="width: 1200px;margin:10px auto;position: relative;"><a href="http://imag7.17wanjia.com/api/adl/4708898_wy-cq-996cqhzP" style="display: block;width:100%;"><img src="https://i-1.okemu.com/2022/9/16/4a60ac44-d9c7-4248-b11c-f3eabc1dfbd4.png" style="width: 100%;vertical-align: top;" /><a><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span><span class="close_btn" style="display:block;position:absolute;top: -1px;right: -6px;width:30px;height:30px;font-size: 30px;transform:rotate(45deg);color:#fff;cursor: pointer;">+</span></div>');
	$(".close_btn").click(function(){
		$(".ad_box").hide();
	});
}