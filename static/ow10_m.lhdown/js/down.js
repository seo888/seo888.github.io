if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	var t = "iphone";
} else{
	var t = "az";
}
var yuyue = 0;
if(mid==12){
	
	if(Number(azdown.substr(0,4))>=2018){	
		azdown = 'http://'+azdown.substr(0,4)+'.cbbxz.com'+azdown.substr(4);
	}
	if(down_status==0){//无下载地址
		document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源已下架</a></p>');
	}else if(down_status==2){//未上线
		document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
		yuyue = 1;
	}else{
		if(ad_url!=0){
			ad_url = domain+'lhdown/' + bid + '/' + t + '/';
			if(t=='iphone'){
				document.write('<p class="down-android"><a href="'+ad_url+'" rel="nofollow" id="down-btn-new"><i class="ios-icon"></i>苹果下载</a></p><p class="warning-btn">需跳转至iTunes或官网</p>');
			}else{
				document.write('<p class="down-android"><a href="'+ad_url+'" rel="nofollow" id="down-btn-new">立即下载</a></p>');
			}
			
		}else if(t=='iphone'){
			if(iosdown){
				document.write('<p class="down-android"><a href="/down/shouji/'+id+'/" rel="nofollow" id="down-btn-new"><i class="ios-icon"></i>苹果下载</a></p><p class="warning-btn">需跳转至iTunes或官网</p>');
			}else if(azdown){
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源为安卓版，暂无苹果版</a></p>');
			}else{
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
				yuyue = 1;
			}
		}else{
			if(azdown){
				if(azdown.indexOf('https://pan.baidu')!=-1){
					document.write('<p class="down-android"><a href="/down/shouji/'+id+'/" rel="nofollow" id="down-btn-new">网盘下载</a></p>');
				}else{
					document.write('<p class="down-android"><a href="/down/shouji/'+id+'/" rel="nofollow" id="down-btn-new">立即下载</a></p>');
				}
				
			}else if(iosdown){
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源为苹果版，暂无安卓版</a></p>');
			}else{
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
				yuyue = 1;
			}
		}
	}
}else if(mid==2){
	if(down_status==0){//无下载地址
		document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源已下架</a></p>');
	}else if(down_status==2){//无下载地址
		document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
		yuyue = 1;
	}else{
		if(ad_url!=0){
			ad_url = domain+'lhdown/' + bid + '/' + t + '/';
			if(t=='iphone'){
				document.write('<p class="down-android"><a href="'+ad_url+'" rel="nofollow" id="down-btn-new">苹果下载</a></p><p class="warning-btn">需跳转至iTunes或官网</p>');
			}else{
				document.write('<p class="down-android"><a href="'+ad_url+'" rel="nofollow" id="down-btn-new">立即下载</a></p>');
			}			
		}else if(downfiles[0] || downfile){
			if(t=='iphone'){
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源为电脑版，暂无苹果版</a></p>');
			}else{
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">该资源为电脑版，暂无安卓版</a></p>');
			}			
		}else{
			if(t=='iphone'){
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
			}else{
				document.write('<p class="down-android"><a href="javascript:;" class="xiajia_icon" rel="nofollow">暂未上线</a></p>');
			}
			yuyue = 1;
		}
		
	}
}

if (yuyue == 1) {
	var yuyue_body = document.createElement("div");
	yuyue_body.setAttribute("id", "yuyue-body");
	document.body.appendChild(yuyue_body);
	document.getElementById('yuyue-body').innerHTML =
		'<div id="yuyue-bg"></div><div id="yuyue-box"><div class="yuyue-title"><a href="javascript:void(0)" class="yuyue-close">关闭</a>请输入预约的手机号码</div><div class="yuyue-bd"><input class="yuyue-input" type="" name="" placeholder="输入手机号码"><p class="yuyue-tips"></p><p class="yuyue-btn"><a href="javascript:void(0)" class="yuyue-ok">确定</a><a href="javascript:void(0)" class="yuyue-cancel">取消</a></p></div></div><style type="text/css">#yuyue-bg{width:100%;height:100%;background:#000;opacity:.5;filter:alpha(opacity:50);position:fixed;left:0;top:0;z-index:999999;display:none}#yuyue-box{font:14px "Microsoft YaHei";width:calc(100% - 20px);border-radius:5px;position:fixed;z-index:9999999;top:200px;margin:0 10px;background:#0dad51;overflow:hidden;display:none}.yuyue-title{color:#fff;font-size:18px;padding:0 15px;line-height:56px;border-bottom:1px solid #e5e5e5}.yuyue-close{width:16px;height:16px;background:url(/statics/images/yuyue_btn.png) no-repeat 0 -37px;margin-top:20px;text-indent:-9999px;float:right}.yuyue-bd{height:235px;padding-top:50px;background:#fff;position:relative}.yuyue-input{width:278px;line-height:36px;padding:0 10px;border:1px solid #ccc;display:block;margin:0 auto;}.yuyue-btn{text-align:center;margin-top:50px;border-top:1px solid #e5e5e5}.yuyue-btn a{display:block;margin:20px auto 0;border-radius:2px}.yuyue-ok{color:#fff;width:300px;line-height:38px;background:#0dad51}.yuyue-cancel{color:#0dad51;width:298px;line-height:36px;background:#fff;border:1px solid #0dad51}.yuyue-tips{color:#f00;top:99px;position:absolute;left:0!important;right:0!important;width:300px!important;margin:auto!important;}.yuyue-error-text{color:#f00}.yuyue-error{border-color:#f00}</style>';
}
//预约
require(['jquery'],function($){
	$('.yuyue').click(function() {
		if ($(this).text().indexOf("该资源已下架") == -1) {
			$('#yuyue-bg,#yuyue-box').show();
			$('.yuyue-input').removeClass('yuyue-error');
			$('.yuyue-tips').text('');
			$(".down-show").hide();
		}
	});
	$('#yuyue-bg,.yuyue-close,.yuyue-cancel').click(function() {
		$('#yuyue-bg,#yuyue-box').hide()
	});
	$('.yuyue-cancel').click(function() {
		$('.yuyue-input').val('');
		$('.yuyue-tips').text('');
	});
	$('.yuyue-ok').click(function() {
		if ($.trim($('.yuyue-input').val()) == '') {
			$('.yuyue-tips').text('手机号码不能为空');
			$('.yuyue-input').addClass('yuyue-error');
		} else {
			alert('提交成功');
			$('#yuyue-bg,#yuyue-box').hide();
		};
	});
	$('.yuyue-input').keyup(function() {
		$(this).removeClass('yuyue-error');
		$('.yuyue-tips').text('');
	});
	$('.yuyue-input').blur(function() {
		if (!(/^1[34578]\d{9}$/.test($(this).val()))) {
			$('.yuyue-tips').removeClass('yuyue-pass').text('手机号码格式不正确');
			$('.yuyue-input').removeClass('yuyue-pass').addClass('yuyue-error');
			return false;
		} else {
			$('.yuyue-input').removeClass('yuyue-error').addClass('yuyue-pass');
			$('.yuyue-tips').addClass('yuyue-pass')
		}
	})
});
