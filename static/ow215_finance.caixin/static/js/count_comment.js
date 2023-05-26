function getCCTailString(){
 var myDate = new Date();
 var mySecond = myDate.getSeconds();
 var myCY = myDate.getFullYear();
 var myCM = myDate.getMonth()+1;
 var myCD = myDate.getDate();
 var myCH = myDate.getHours();
 var myCN = myDate.getMinutes();
 var myCS = mySecond>10?(mySecond-mySecond%10):0;
 return (""+myCY)+(myCM<10?("0"+myCM):(""+myCM))+(myCD<10?("0"+myCD):(""+myCD))+(myCH<10?("0"+myCH):(""+myCH))+(myCN<10?("0"+myCN):(""+myCN))+(myCS<10?("0"+myCS):(""+myCS));
}
function updateCommentCount(aid,tids){
 if(tids && aid){

 	var _location = window.location.href;
  var url = _location;
  if(_location.indexOf('//m.')==0){
   url = 'https://c1.caixin.com/comment-api-caixin/comment/cc.do?app_id='+aid+'&ids='+encodeURIComponent(tids)+'&callback=?';
  }else{
   url = 'https://c2.caixin.com/comment-api-caixin/comment/cc.do?app_id='+aid+'&ids='+encodeURIComponent(tids)+'&callback=?';
  }
 	if(tids.indexOf(";")<0){
   try{
   
    var _tmpstr = (tids+"").substr(-3,3);
    var commLink = "//commentnum.caixin.com/comment-sync/js/"+aid+"/"+_tmpstr+"/"+tids+"_count.js?"+getCCTailString();
//      		console.log(commLink);
 	  var head= document.getElementsByTagName('head')[0];   
   	var script= document.createElement('script');   
    script.type= 'text/javascript';   
    script.src= commLink;   
    script.onerror = function(){
     jQuery.getJSON(url,function(data){					
      for(var i in data){
       var exps = 'em[aid='+aid+'][tid='+data[i].tid+']';
       jQuery(exps).each(function(){
        if(data[i].count>0 && (jQuery(this).html()=='0' || jQuery(this).html()==''))							
        jQuery(this).html(data[i].count+"");
       });
      }
     });
		}
		script.onload = script.onreadystatechange = function(){
     if(!this.readyState || this.readyState=="loaded" || this.readyState=="complete"){ 
      if(typeof(comment_count)=='undefined'){
       jQuery.getJSON(url,function(data){					
        for(var i in data){
         var exps = 'em[aid='+aid+'][tid='+data[i].tid+']';
         jQuery(exps).each(function(){
          if(data[i].count>0 && (jQuery(this).html()=='0' || jQuery(this).html()==''))							
           jQuery(this).html(data[i].count+"");
         });
        }
       });
      }else{
       var _comment_count = null;
       if(typeof(comment_count)=='object'){
        _comment_count = comment_count;
       }
       else if(typeof(comment_count)=='string'){
        try{_comment_count = eval("("+comment_count+")");}catch(e){}
       }
       if(_comment_count!=null){
        for(var i in _comment_count){
         var exps = 'em[aid='+aid+'][tid='+_comment_count[i].tid+']';
         jQuery(exps).each(function(){
          if(_comment_count[i].count>0 && (jQuery(this).html()=='0' || jQuery(this).html()==''))							
           jQuery(this).html(_comment_count[i].count+"");
         });
        }
       }
      }
      // Handle memory leak in IE 
      script.onload = script.onreadystatechange = null;  
     }
		};
		head.appendChild(script);
   }
   catch(e){
    jQuery.getJSON(url,function(data){					
     for(var i in data){
      var exps = 'em[aid='+aid+'][tid='+data[i].tid+']';
      jQuery(exps).each(function(){
       if(data[i].count>0 && (jQuery(this).html()=='0' || jQuery(this).html()==''))							
        jQuery(this).html(data[i].count+"");
      });
     }
    });
   }		
  }else{
   jQuery.getJSON(url,function(data){					
    for(var i in data){
     var exps = 'em[aid='+aid+'][tid='+data[i].tid+']';
     jQuery(exps).each(function(){
      if(data[i].count>0 && (jQuery(this).html()=='0' || jQuery(this).html()==''))							
       jQuery(this).html(data[i].count+"");
     });
    }
   });
  }  
 }
}
function countComment(){
 var apps = new Object();
 jQuery('em[aid][tid]').each(function(){
  var aid = jQuery(this).attr("aid");
  var tid = jQuery(this).attr("tid");
  var tids = "";
  if(aid=="1") aid = "100";
  if(aid in apps){
   var tids = apps[aid];
   if(tids==tid || tids.indexOf(";"+tid)>=0 || tids.indexOf(tid+";")>=0){
   }else{tids = tids+";"+tid;}
  }else{
   tids = tid;
  }
  apps[aid] = tids;
 });
 for(k in apps){
  updateCommentCount(k,apps[k]);
 }
}
if(typeof(jQuery)!="undefined")
 jQuery(function(){countComment();});

// "比较"栏目用app打开文章页是跳到app原生文章页
$(function(){
	 function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
	var appType = getCookie('appType');
//	try {
//        caixin.interceptUrl()
//   } catch (er) {
//        console.log(er)
//   }
	//判断是不是用app打开
	if(appType){
		$('.head').hide();
		$('.list dl').each(function(i,dl){
//		获取onclick属性的地址
		var str = dl.getAttribute('onclick');
		var link =''
		if(str && str.length){
//			判断地址是http还是https
      var matchRes = str.match(/(:\/\/.*)'$/);
			if((str.indexOf("http://") !== -1) && matchRes){
           // link = 'link'+str.slice(28,-1);
          link = 'link' + matchRes[1];
		  	}else{
		  		link = 'links' + matchRes[1];
		  	}
		}
		dl.onclick=function(e){	
			if (link) location.href = link;  
			}	
		})
	}
})