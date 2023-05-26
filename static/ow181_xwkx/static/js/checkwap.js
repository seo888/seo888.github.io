// JavaScript Document

function trim(str){ //删除左右两端'/'
	return str.replace(/(^\/)|(\/$)/g, "");
}
try {
	var urlhash = window.location.hash;
	console.log(urlhash)
	if (!urlhash.match("fromapp"))
	{
		if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))){
		    console.log(window.location)
		    var href = window.location.pathname;
		    var pathname = window.location.pathname;
		    var origin =  window.location.origin;
		    
		    if( pathname == "" || pathname =="/" ){
		        window.location.href = '/e/wap';
		    }
		    
		    var pathList = pathname.split("/");
		    var urlName = pathList.filter(function (s) {
                return s && s.trim();
            });
            var pname = urlName[urlName.length-1];
            if ( pname.indexOf(".html") != -1  ) {
                window.location.href = '/e/wap/show.php?id='+pname.replace(".html","");
            }else{
                if ( pname > 300 ) {
                   window.location.href = '/e/wap/show.php?id='+pname; 
                }else{
                     //栏目页
                    console.log(urlName)
                    var path = urlName[0];
                    if( urlName.length > 1 ){
                        path = path +"/"+ pname;
                    }
		
                    window.location.href = '/e/wap/list.php?path=' + path;
                }
                
               
            }

		    
// 			var fafa_idxr = location.href.lastIndexOf('/')+1;
// 			var fafa_last = location.href.substr(fafa_idxr);
// 			console.log(fafa_last);
			
// 			if(fafa_last == ''){
// 				//栏目页
// 				fafa_idxr = location.href.indexOf('/',10);
// 				fafa_last = trim(location.href.substr(fafa_idxr));
				
// 				if ( fafa_last.indexOf("/")== -1) {
// 				    if(fafa_last == ''){
// 					//首页
//     					window.location.href = '/e/wap';
//     				}else{
//     					window.location.href = '/e/wap/list.php?path='+fafa_last;
//     				}
// 				}else{
// 				    window.location.href = '/e/wap/show.php?id='+fafa_last.split("/")[2];
// 				}
		
			
// 			}else{
// // 				//文章页
// 				var fafa_id = fafa_last.replace('.html','');
// 				if(fafa_id == 'index'){
// 					//首页
// 					window.location.href = '/e/wap';
// 				}else{
// 					window.location.href = '/e/wap/show.php?id='+fafa_id;
// 				}
// 			}
		}
	}
}
catch(err)
{
}


