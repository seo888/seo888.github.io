// JavaScript Document
function readCookie(name){
  var cookieValue = "";
  var search_s = name + "=";
  if(document.cookie.length > 0)
  {
    offset = document.cookie.indexOf(search_s);
    if (offset != -1)
    {
          offset += search_s.length;
          end = document.cookie.indexOf(";", offset);
          if (end == -1) end = document.cookie.length;
          cookieValue = decodeURI(document.cookie.substring(offset, end))
          //edit 2016-4-26 by sun.chi 吃力空格转义
          var cvalue = document.cookie.substring(offset, end);
          cookieValue = decodeURIComponent(cvalue.replace(/\+/g, ' '));
    }
  }
  return cookieValue;
}
function setCookie(name, value){
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expDay = (argc > 0) ? argv[2] : 30;
	try{
		expDay=parseInt(expDay);
		if(expDay<0)expDay=0;
	}catch(e){
		expDay=30;
	}
	var expDate = new Date();
	// The expDate is the date when the cookie should expire, we will keep it for a month
	expDate.setTime( expDate.getTime() + (expDay * 24 * 60 * 60 * 1000) ); 
	setCookieVal( name, value, expDate,'/','.fengniao.com'); 	
}
function setCookieVal(name, value){
	var argv = setCookieVal.arguments;
	var argc = setCookieVal.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}

//判断是否是数字
function IsNum(s)
{
    if (s!=null && s!="")
    {
        return !isNaN(s);
    }
    return false;
}
function removeDuplicate(ids_str,id){
    ids_str = ids_str.replace(/%2C/g,',');
	tmp_arr = ids_str.split(',');
	tmp_arr = tmp_arr.slice(0,10);
	idstring = id;
	for(var i=0;i<tmp_arr.length;i++){
		if(tmp_arr[i] != id){
			idstring+=',';
			idstring+=tmp_arr[i];
		}
	}
    return idstring;
}
$(document).ready(function(){
	var url= window.location.href;
	//var host = ['comment.fengniao.com','qicai.fengniao.com','image.fengniao.com','academy.fengniao.com','travel.fengniao.com','auto.fengniao.com','qsy.fengniao.com','jjb.fengniao.com','sai.fengniao.com'];
	var host = 'comment.fengniao.com,qicai.fengniao.com,image.fengniao.com,academy.fengniao.com,travel.fengniao.com,auto.fengniao.com,qsy.fengniao.com,jjb.fengniao.com,sai.fengniao.com';

	host_channel = {'qicai.fengniao.com':296,
			'image.fengniao.com': 192, 
			'academy.fengniao.com':190,
			'travel.fengniao.com': 278,
			'auto.fengniao.com':305,
			'qsy.fengniao.com':340,
			'jjb.fengniao.com':347,
			'sai.fengniao.com':346,
            'comment.fengniao.com':0
	};
	url_array= url.split("/");
	count = url_array.length;
	if(host.indexOf(location.host)>-1){//是资讯的
		if(!(url.search(/topic/i)>0) && (url.search(/.html/i)>0) && !(url.search(/list_/i)>0) && !(url.search(/list.html/i)>0)){ //排除专题
		    //获取频道
			c_id = host_channel[location.host];
			if(c_id == 0){
			    c_id = $CONFIG['class_id'];
				d_id = $CONFIG['document_id'];
			}else{
				if(c_id){
					if(url.search(/slide/i)>0){//组图
						sub_url = url_array[count-1];
						doc_str = sub_url.split('.');
						doc_ids = doc_str[0];
						doc_d = doc_ids.split('_');
						d_id = doc_d[0];
					}else{
						d_id = document.getElementById('article_rootid').value;
					}
				}
			}
			idstring = readCookie('fn_document_class_doc_id');
			if(IsNum(d_id)){
			    id_str = c_id+'-'+d_id;
				if(idstring){
				    id_str = removeDuplicate(idstring,id_str);
				}
				setCookie('fn_document_class_doc_id',id_str,7);
			}
		}
	}else if(location.host =='bbs.fengniao.com'){//论坛页面
	    if(url.search(/.html/i)>0 && !(url.search(/pic/i)>0)){
		    if(url.search(/_/i)>0){//论坛版块按钮 排除查看图片页面
			    sub_url = url_array[count-1];
				doc_str = sub_url.split('.');
				doc_ids = doc_str[0];
				forum_ids = doc_ids.split('_');
				forum_id  = forum_ids[1];
			}else{//论坛帖子页面
			    forum_id = $CONFIG['fid'];
				bbs_id = $CONFIG['tid'];//帖子id
				if(IsNum(bbs_id)){
				    t_id = readCookie('fn_thread_id');
					if(t_id){
					    bbs_id = removeDuplicate(t_id,bbs_id);
					}
					setCookie('fn_thread_id',bbs_id,7);
				}
			}
			if(IsNum(forum_id)){
			    fids_str = readCookie('fn_forum_id');
				if(fids_str){
				    forum_id = removeDuplicate(fids_str,forum_id);
				}
				setCookie('fn_forum_id',forum_id,7);
			}
		}
	}
});