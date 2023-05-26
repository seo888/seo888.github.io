// JavaScript Document

function trim(str){ //删除左右两端'/'
	return str.replace(/(^\/)|(\/$)/g, "");
}
try {
	var urlhash = window.location.hash;
	if (!urlhash.match("fromapp"))
	{
		if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)))
		{
			var fafa_idxr = location.href.lastIndexOf('/')+1;
			var fafa_last = location.href.substr(fafa_idxr);
			if(fafa_last == ''){
				//栏目页
				fafa_idxr = location.href.indexOf('/',10);
				fafa_last = trim(location.href.substr(fafa_idxr));
				if(fafa_last == ''){
					//首页
					window.location.href = '/e/wap';
				}else{
					window.location.href = '/e/wap/list.php?path='+fafa_last;
				}
			}else{
				//文章页
				var fafa_id = fafa_last.replace('.html','');
				if(fafa_id == 'index'){
					//首页
					window.location.href = '/e/wap';
				}else{
					window.location.href = '/e/wap/show.php?id='+fafa_id;
				}
			}
		}
	}
}
catch(err)
{
}


