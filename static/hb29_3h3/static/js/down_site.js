var down_address_site = {"d0":{"name":"","down_urls":""}, "d1":{"name":"小于100M游戏1","down_urls":"http://do1.3h3.com/,http://do1.3h3.com/,http://do1.3h3.com/,http://do1.3h3.com/,http://do1.3h3.com/,http://do1.3h3.com/,http://do1.3h3.com/"}, "d2":{"name":"100M到500M游戏1","down_urls":"http://of1.3h3.com/,http://of1.3h3.com/,http://of1.3h3.com/,http://of1.3h3.com/,http://of1.3h3.com/,http://of1.3h3.com/,http://of1.3h3.com/"}, "d3":{"name":"500M到2G游戏1","down_urls":"http://ft1.3h3.com/,http://ft1.3h3.com/,http://ft1.3h3.com/,http://ft1.3h3.com/,http://ft1.3h3.com/,http://ft1.3h3.com/,http://ft1.3h3.com/"}, "d4":{"name":"大于2G游戏1","down_urls":"http://dt1.3h3.com/,http://dt1.3h3.com/,http://dt1.3h3.com/,http://dt1.3h3.com/,http://dt1.3h3.com/,http://dt1.3h3.com/,http://dt1.3h3.com/"}, "d5":{"name":"BT种子1","down_urls":"http://pb1.3h3.com/,http://pb1.3h3.com/,http://pb1.3h3.com/,http://pb1.3h3.com/,http://pb1.3h3.com/,http://pb1.3h3.com/,http://pb1.3h3.com/"}, "d10":{"name":"补丁工具1","down_urls":"http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/,http://th1.3h3.com/"}, "d11":{"name":"热门游戏1","down_urls":"http://h1.3h3.com/,http://h1.3h3.com/,http://h1.3h3.com/,http://h1.3h3.com/,http://h1.3h3.com/,http://h1.3h3.com/,http://h1.3h3.com/"}, "d12":{"name":"大于2G游戏-2","down_urls":"http://dt2.3h3.com/,http://dt2.3h3.com/,http://dt2.3h3.com/,http://dt2.3h3.com/,http://dt2.3h3.com/,http://dt2.3h3.com/,http://dt2.3h3.com/"}, "d13":{"name":"500M到2G游戏2","down_urls":"http://ft2.3h3.com/,http://ft2.3h3.com/,http://ft2.3h3.com/,http://ft2.3h3.com/,http://ft2.3h3.com/,http://ft2.3h3.com/,http://ft2.3h3.com/"}, "d15":{"name":"100M到500M游戏2","down_urls":"http://of2.3h3.com/,http://of2.3h3.com/,http://of2.3h3.com/,http://of2.3h3.com/,http://of2.3h3.com/,http://of2.3h3.com/,http://of2.3h3.com/"}, "d16":{"name":"夜神模拟器公共包下载","down_urls":"http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,http://tui.yeshen.com/file/download/,"}, "d17":{"name":"大于2G游戏3","down_urls":"http://dt3.3h3.com/,http://dt3.3h3.com/,http://dt3.3h3.com/,http://dt3.3h3.com/,http://dt3.3h3.com/,http://dt3.3h3.com/,http://dt3.3h3.com/"}, "d18":{"name":"远程地址","down_urls":""}, "d19":{"name":"安卓游戏1","down_urls":"http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/,http://ay1.3h3.com/apk/"}, "d24":{"name":"500M到2G游戏3","down_urls":"http://ft3.3h3.com/,http://ft3.3h3.com/,http://ft3.3h3.com/,http://ft3.3h3.com/,http://ft3.3h3.com/,http://ft3.3h3.com/,http://ft3.3h3.com/"}, "d25":{"name":"H5","down_urls":""}, "d26":{"name":"安卓软件1","down_urls":"http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/,http://ay1.3h3.com/apkrj/"}, "d28":{"name":"电脑软件1","down_urls":"http://soft1.3h3.com/,http://soft1.3h3.com/,http://soft1.3h3.com/,http://soft1.3h3.com/,http://soft1.3h3.com/,http://soft1.3h3.com/"}, "d29":{"name":"500M到2G游戏4","down_urls":"http://ft4.3h3.com/,http://ft4.3h3.com/,http://ft4.3h3.com/,http://ft4.3h3.com/,http://ft4.3h3.com/,http://ft4.3h3.com/,http://ft4.3h3.com/"}};
function getSiteUrl($other_down){
    if($.trim($other_down.html()) != ''){
        $other_down.find('li a').each(function(index){
            $down_urls_str = $.trim(eval('down_address_site.d'+$other_down.attr('siteid')+'.down_urls'));
            $down_urls = eval('down_address_site.d'+$other_down.attr('siteid')+'.down_urls').split(',');
            $durl = $(this).attr('uri');
            if($.trim($down_urls_str) != '' && $durl.indexOf('http')<0) {
				if($(this).attr('hosid')){
					$durl = $(this).attr('hosid')+$(this).attr('uri');
				}else{
					$durl = $down_urls[index]+$(this).attr('uri');
				}
			}
			var dates={
				//获取日期
				FunGetDateStr: function (p_count) {
					var dd = new Date();
					dd.setDate(dd.getDate() + p_count);//获取p_count天后的日期
					var y = dd.getFullYear();
					var m = dd.getMonth() + 1;//获取当前月份的日期
					var d = dd.getDate();
					if(m<10)m = "0"+m;
					if(d<10)d = "0"+d;
					return y + "-" + m + "-" + d;
				},
				//获取当前时间
				FunGetDate: function () {
					var date = new Date(); //日期对象
					var now = "";
					now = date.getFullYear() + "-";
					now = now + (date.getMonth() + 1) + "-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
					now = now + date.getDate() + " ";
					now = now + date.getHours() + ":";
					now = now + date.getMinutes() + ":";
					now = now + date.getSeconds() + "";
					return now;
				},
			}
			var input_time = $('#download').attr('input_time');
			if($('#xzdz').length > 0)input_time = $('#xzdz').attr('input_time');
			if(input_time != ''){
			var today = dates.FunGetDateStr(0);
			var yesday = dates.FunGetDateStr(-1);
			if(today == input_time || yesday == input_time){}else{
				$(this).attr('href',$durl);
			}
			}else{$(this).attr('href',$durl);}
        });              
    }
}
if($('.gaosu_down').length>0){
    $('.m-downaddr .addr .other_down').each(function(){
        getSiteUrl($(this));
    });
	if($('.other_down li:eq(0) a').attr('href').indexOf('pan.baidu.com') > -1){
		$('.gaosu_down').hide();
		$('.gaosu_down').prev().hide();
	}else{
		setTimeout(function(){
		$('.gaosu_down').each(function(){
			$this = $(this);
			$other_url = $this.next().next().find('li a').attr('href');
			$other_click = $this.next().next().find('li a').attr('onclick');
			$gaosu_html  = '<li><a rel="nofollow" href="'+$other_url+'" target="_blank" onclick="'+$other_click+'">\u7535\u4fe1\u9ad8\u901f\u4e0b\u8f7d</a></li>';
			$gaosu_html += '<li><a rel="nofollow" href="'+$other_url+'" target="_blank" onclick="'+$other_click+'">\u8054\u901a\u9ad8\u901f\u4e0b\u8f7d</a></li>';
			$gaosu_html += '<li><a rel="nofollow" href="'+$other_url+'" target="_blank" onclick="'+$other_click+'">\u7535\u4fe1\u9ad8\u901f\u4e0b\u8f7d</a></li>';
			$gaosu_html += '<li><a rel="nofollow" href="'+$other_url+'" target="_blank" onclick="'+$other_click+'">\u8054\u901a\u9ad8\u901f\u4e0b\u8f7d</a></li>';
			$this.html($gaosu_html);
		});
		},100);
    }
}
if($('.soft_other_down').length>0){
    $('.soft_other_down').each(function(){
        getSiteUrl($(this));
    });
}