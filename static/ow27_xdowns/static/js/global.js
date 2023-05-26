
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6ba1d7e96e4a89e677329abd849364d4";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();



(function () {
	if(!(/\?[0-9a-zA-Z]/g).test(location.href)) {
	    var bp = document.createElement('script');
	    var curProtocol = window.location.protocol.split(':')[0];
	    if (curProtocol === 'https') {
	        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	    }
	    else {
	        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	    }
	    var s = document.getElementsByTagName("script")[0];
	    s.parentNode.insertBefore(bp, s);
   }
})();

 if (self.frameElement && self.frameElement.tagName == "IFRAME") {
    top.location.href=self.location.href;
 }
 if (window.frames.length != parent.frames.length) {
    top.location.href=self.location.href;
 }
 if (self != top) {  
    top.location.href=self.location.href;
 }

$('#nav li').hover(function () {
    $(this).children('div').stop(true, false).slideDown();
    $(this).addClass('on');
}, function () {
    $(this).children('div').stop(true, false).slideUp();
    $(this).removeClass('on');
});


if(location.pathname != "/"){
	//$(".nav").after('<div class="ad_box" style="width: 1200px;margin:10px auto;position: relative;z-index: 999;"><a href="http://sqtrd.xdowns.com/api/adl/4656886_xdowns-pcggw-xx" style="display: block;width:100%;"><img src="http://i-1.xdowns.com/2022/1/10/9ec1534f-2d11-4f0e-9952-db9fb2f5572e.jpg?width=1200&height=100" style="width: 100%;vertical-align: top;" /><a><span style="display:block;position:absolute;bottom:0;right:0;padding:0 5px;font-size:12px;background:#000;color:#ccc;opacity:.7">广告</span><span class="close_btn" style="display:block;position:absolute;top: -1px;right: -6px;width:30px;height:30px;font-size: 30px;transform:rotate(45deg);color:#fff;cursor: pointer;">+</span></div>');
	$(".close_btn").click(function(){
		$(".ad_box").hide();
	});
}


 function btn_down_link(id,tags,name="") {
            window.downlink_address = function (data) {
                if (data!=null && data.downlink!="" && data.downlink!= "#" && data.downlink!= "sc") {
						
					var i = new Image();
					i.src = "http://xz.tongji.xdowns.com/count.do?ch=pcxdowns&sid=" + id + "&name=" + name;
					var ulhref = data.downlink;
					if(ulhref.indexOf("?") >= 0)
				    {
						var keys = GetQueryString("xs", ulhref.split("?")[1]);
						if (keys) {
							var b = new Image();
							b.src = "http://tongji.tt.xdowns.com/sys/count.do?sc=" + keys;
						}
					}
                    window.location.href = data.downlink;
                }
            }
			
            $.getScript("http://m.xdowns.com/api/GetSoftDownLinkNewtb/120?sid=" + id + "&callback=downlink_address");
        }
		
		function GetQueryString(name, url) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = url.match(reg);
			if (r != null) return r[2]; return null;
		}