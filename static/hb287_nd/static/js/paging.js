
function parse_page(){
	
	var autopage = document.getElementById('autopage');
	if(!autopage || autopage.length == 0) return ;
	autopage.id = 'displaypagenum';
	var center = autopage.getElementsByTagName('center');
	if(!center || center.length == 0) return ;
	center = center[0];
	var thispage = center.getElementsByTagName('span');
	if(!thispage || thispage.length == 0) return ;
	var thisnum = parseInt(thispage[0].innerHTML);
	var allpage = center.getElementsByTagName('a');
	if(!allpage || allpage.length == 0) return ;
	var lastnum = parseInt(allpage[allpage.length-1].innerHTML);
	var maxpage = Math.max(lastnum, thisnum);
	var baseurl = location.href
	if(baseurl.indexOf('?') > -1){
		if(!baseurl.match(/\.html?\?/)){
			return false;
		}
	}
	baseurl = baseurl.replace(/[\?\#][\S\s]*?$/ig, '');
	var is_content = baseurl.match(/content_/) ? true : false;
	function create_page(page, name){
		var url = baseurl.replace((thisnum == 1 ? '' : '_' + thisnum) + '.htm', (page == 1 ? '' : '_' + page) + '.htm');
		return '<a href="'+url+'" class="fenye_01 fenye_02">'+name+'</a> ';
	}
	var str = '';
	if(thisnum > 1){
		str += create_page(1, '首页');
		str += create_page(thisnum-1, '上一页');
	}
	var prev = false;
	var next = false;
	
	for(var i = 1; i <= maxpage; i++){
		if(i == thisnum){
			str += '<span>['+i+']</span> ';
		}else if(i == 1 || i == maxpage || (i >= thisnum - 2 && i <= thisnum + 2)){
			str += create_page(i, '['+i+']');
		}else if(!prev && i < thisnum - 2){
			prev = true;
			str += '<span class="fenye_01 fenye_02">[...]</span> ';
		}else if(!next && i > thisnum + 2){
			next = true;
			str += '<span class="fenye_01 fenye_02">[...]</span> ';
		}
	}
	if(thisnum < maxpage){
		str += create_page(thisnum+1, '下一页');
		str += create_page(maxpage, '尾页');
	}
	if(is_content){
		str += create_page(0, '显示全文');
	}
	center.innerHTML = str;
}
function fileTypeImages(){
	if('jQuery' in window){
		var $ = window.jQuery;
		$('#new_message_id').find('img').each(function(){
			var that = $(this), src = that.prop('src');
			if(src.indexOf('/xy/ueditor/dialogs/attachment/fileTypeImages/') > -1){
				src = src.replace(/^.*\//, 'https://www.fjsen.com/fileTypeImages/');
				that.prop('src', src);
			}
		}) 
	}
}
function remove_ad(){
	var a = document.getElementById('feedAv');
	if(a) a.remove()
	setTimeout(remove_ad, 1000);	
}

function paging_init(){
	parse_page();
	remove_ad();
	fileTypeImages();
}

if('jQuery' in window){
	window.jQuery(paging_init)	
}else{
	setTimeout(paging_init, 500);
}


if(typeof _hmt == 'undefined'){
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?7e80268b0a1d4928123e36ba0db82f77";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
	
}
