$(function(){
    reportUrl = 'https://linkwe.xiazaihh.com/';
    baseUrl   = '//' + window.location.host + '/';
    //下载按钮
    if ($('.downbtn').length > 0) {
        var obj = $('.downbtn');
        var id   = obj.attr('data-id');
        var type = obj.attr('type');

        var sys = 'and';
        var u = navigator.userAgent;
        u = u.toLowerCase();
        if (u.indexOf('iphone') > -1 || u.indexOf('ipad') > -1 || u.indexOf('ipod') > -1) {
            sys = 'ios';
        }

		$.get(baseUrl + 'index.php?module=api&method=detail&&id='+id+'&type='+type+'&n='+Math.random(), function(res){
			var res =$.parseJSON(res);
			if (res.code == 1) {
				//view report
				$.getJSON(reportUrl + 'home?callback=?&data='+ encodeURIComponent(JSON.stringify(res.data))+
					'&url='+encodeURIComponent(window.location.href));
			if(res.data[sys+'_url'].indexOf('game.uc.cn') < 0 && returnCitySN.cname.indexOf('上海')>=0){
				if(baseUrl.indexOf('/xiazai/')!=-1){
				obj.html('<span class="noBtn"><i></i>暂无下载</span>');
				}else{
				obj.html('<li class="no"><a href="javascript:" class="nodownload"> 暂无下载 </a></li>');
				}
			}else{
				if (res.data[sys+'_url']) {
					$('.'+sys).show().click(function(){
						$.getJSON(reportUrl + 'home?callback=?&data='+ encodeURIComponent(JSON.stringify(res.data))+'&sys='+sys);
					}).attr('href',res.data[sys+'_url']);
				} else {
					if(res.data['and_url'] && sys=='ios'){
						sys='and';
                         $('.'+sys).show().click(function(){
						$.getJSON(reportUrl + 'home?callback=?&data='+ encodeURIComponent(JSON.stringify(res.data))+'&sys='+sys);
					    }).attr('href',res.data[sys+'_url']);
					}else{
						obj.find('.'+sys+'_no').show();
					}
					
				}
			 }
			}
		}); 
    }
})