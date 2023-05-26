document.write('<script language="javascript" src="/js/clipboard.min.js"></script>');
document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>');
$(function(){
	var kfagent="";
	var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger"){
        //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器
        wx.miniProgram.getEnv(function(res){
 		if (res.miniprogram)
		{
			kfagent="mini";
        }
		else
		{
			kfagent="wechat";
        }
});
    }
	else
	{
		if(/Android|webOS|iPhone|iPod|BlackBerry|Windows CE|Windows Phone/i.test(navigator.userAgent))
		{
        	kfagent="phone";
		}
		else
		{
			kfagent="pc";
		}
    }
	if(kfagent=="mini")
						{
							$("#weixinsharecom").html('<p><img src="/images/sharepoint.png" />点击右上角<span>...</span>图标<br />将它转发给指定朋友或微信群<div class="close">点击关闭提示</div></p>');
						}
					else
						{
							if(kfagent!="pc")
								{
									
							$("#weixinsharecom").html('<p><img src="/images/sharepoint.png" />点击右上角<span>...</span>图标<br />将它发送给指定朋友<br />或分享到朋友圈<div class="close">点击关闭提示</div></p>');
								}
						}
	$(".shareBox li").on('click',function(){
		if(kfShareUrl==""){kfShareUrl=window.location.href;}
		if(kfShareTitle==""){kfShareTitle=document.title;}
		if($(this).attr('data-share')=='weixin')
			{
				if(kfagent=="phone")
				{
					var clipboard = new Clipboard('.weixincopy', {
    				text: function() {
        			return kfShareTitle+'\r\n'+kfShareUrl;
    			}
				});
					
					alert("分享内容已复制，打开微信粘贴发送给朋友或朋友圈。");
				}
				if(kfagent=="pc")
				{
					window.open("/s/weixin.aspx?url="+escape(kfShareUrl));
				}
				if(kfagent=="mini"||kfagent=="wechat")
					{if(kfShareState=="1")
				{
		 			window.location.href = kfShareUrl;
				}
				else
				{
					$("#weixinsharecom").show();
					
				}}
				
			}
			if($(this).attr('data-share')=='qq')
			{
				if(kfagent!="mini")
				{
					window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+escape(kfShareUrl)+"&title="+encodeURI(kfShareTitle));
				}
				else
				{
					alert("小程序中不支持QQ分享！");
				}
			}
			if($(this).attr('data-share')=='weibo')
			{
				if(kfagent!="mini")
				{
					window.open("http://service.weibo.com/share/share.php?url="+escape(kfShareUrl)+"&title="+encodeURI(kfShareTitle)+"&searchPic=ture");
				}
				else
				{
					alert("小程序中不支持微博分享！");
				}
			}
	});
});
document.write('<div class="weixinsharecom" onClick="$(this).hide()" id="weixinsharecom"></div>');
document.write('<div class="shareBox">');
document.write('<ul>');
document.write('<li class="titl"><i><img src="/images/share00.png" alt="分享" /></i><div class="nam">分享到</div></li>');
document.write('<li data-share="weixin"><button class="weixincopy"></button>');
document.write('<i><img src="/images/share01.png" alt="分享到微信" /></i>');
document.write('<div class="nam">微信</div></li>');
document.write('<li data-share="qq">');
document.write('<i><img src="/images/share02.png" alt="分享到QQ空间" /></i>');
document.write('<div class="nam">QQ空间</div></li>');
document.write('<li data-share="weibo">');
document.write('<i><img src="/images/share03.png" alt="分享到微博" /></i>');
document.write('<div class="nam">微博</div></li>');
document.write('</ul></div>');