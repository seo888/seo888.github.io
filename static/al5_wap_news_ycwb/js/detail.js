
var navc = " ";
		navc +='<a href="http://m.ycwb.com/?nodeid=121909"><span class="active">精彩推荐</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121873"><span>广州</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121874"><span>广东</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121972"><span>大湾区</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121875"><span>中国</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121876"><span>国际</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121879"><span>娱乐</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121869&sonid=121880"><span>体育</span></a>';

		navc +='<a href="http://m.ycwb.com/?nodeid=121870&sonid=121884"><span>视频</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121870&sonid=121883"><span>热图</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121870&sonid=121885"><span>音享</span></a>';
		/**/
		navc +='<a href="http://m.ycwb.com/?nodeid=121871&sonid=121887"><span>老广虎年</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121871&sonid=121888"><span>岭南乡情</span></a>';
		//navc +='<a href="http://m.ycwb.com/?nodeid=121871&sonid=121890"><span>粤菜新味</span></a>';

		navc +='<a href="http://m.ycwb.com/?nodeid=121872&sonid=122039"><span>金羊早晚报</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121872&sonid=121898"><span>珠江评论</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121872&sonid=121899"><span>岭南名医</span></a>';
		navc +='<a href="http://m.ycwb.com/?nodeid=121872&sonid=121901"><span>创客广东</span></a>';
	$('nav').html(navc);
	$("meta[name='renderer']").attr("content","webkit");
	$('header .szb').html('羊城晚报数字报');
var _sum = 26; //点赞数+26
function IsPC(){    
   var userAgentInfo = navigator.userAgent;    
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
   var flag = true;    
   for (var v = 0; v < Agents.length; v++) {    
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
   }    
   return flag;    
}  
//daohang
function fixedNav(){
   var _top = $("header").height();;
   var _window_top = $(window).scrollTop();
   if(_window_top > _top){
   	  // nav dixed
   	  $("header").addClass('fixed');
      $(".hm-t-go-top").css('opacity',0);
   	  $(".backToTop").animate({opacity:1},500,'swing');
   }else{
   	  $("header").removeClass('fixed');
      $(".hm-t-go-top").css('opacity',0);
   	  $(".backToTop").animate({opacity:0},500,'swing');
   }
}
$(window).bind('scroll',fixedNav);
//点赞
// var loc=window.location.href;
// var mc = loc.match(/([0-9]+)\.htm/);
function dzlist(){
	// 回到顶部
    $(".backToTop").on('tap click',function(){
    	$(window).scrollTop('0',800);
    });
	// $.ajax({
	// 	url         : 'https://zt.ycwb.com.cn/own/comment/enjoy_number.php',
	// 	type        : 'POST',   // 请求方式
	// 	data: {
	// 	  articleid : mc[1]
	// 	},
	// 	dataType    : 'jsonp',  // 预期服务器返回的数据类型
	// 	jsonp       : 'callback',
	// 	success     : function(response, istatus){                          // 请求成功后回调函数
	// 	  // alert(response.number);
	// 	 var _dzSum =  response.number+_sum;
	// 	  //console.log(_dzSum)
	// 	  $('.dianzhan').html('<img src="http://www.ycwb.com/template/2013/images/x2.png"  class="x3"><span>'+_dzSum+'</span>');
	// 	},
	// 	complete    : function(XMLHttpRequest, textStatus){                 // 请求完成后回调函数
	// 	  // 完成
	// 	},
	// 	error       : function(XMLHttpRequest, textStatus, errorThrown){    // 请求失败时将调用此方法
	// 	  // 出错了
	// 	}
	// }); // END ajax提交
 //    $('.dianzhan').click(function(){
	// 	$.ajax({
	// 		url         : 'https://zt.ycwb.com.cn/own/comment/enjoy.php',
	// 		// url:'http://z.cn/own/comment/enjoy.php',
	// 		type        : 'POST',   // 请求方式
	// 		data: {
	// 		  articleid : mc[1]
	// 		},
	// 		dataType    : 'jsonp',  // 预期服务器返回的数据类型
	// 		jsonp       : 'callback',
	// 		success     : function(response, istatus){                          // 请求成功后回调函数
	// 		  // alert(response.number);
	// 		 var _dzSum =  response.number+_sum;
	// 		  $('.dianzhan').html('<img src="http://www.ycwb.com/template/2013/images/x3.png"  class="x3"><span>'+_dzSum+'</span>');
	// 		},
	// 		complete    : function(XMLHttpRequest, textStatus){                 // 请求完成后回调函数
	// 		  // 完成
	// 		},
	// 		error       : function(XMLHttpRequest, textStatus, errorThrown){    // 请求失败时将调用此方法
	// 		  // 出错了
	// 		}
	// 	}); // END ajax提交
	// }); 
}
//判断是否有名字
var c=$('#author_baidu').html() ;
if(c=="作者："){
	$('#author_baidu,#author').hide();
}else{
	$('#author_baidu,#author').show();
}

var cd=$('#editor_baidu').html();
if(cd=="编辑："){
	$('#editor_baidu').hide();
}else{
	$('#editor_baidu').show();
}
//分页判断样式功能
$('#displaypagenum span').each(function(){
	var obj = $(this).text();
	if (obj.length>0) {
		if(obj =="..."){
			$(this).addClass('ondsd');
		}else{
			$(this).addClass('ond');
		}
	} else {
		
	}
});


//pc判断 
if(IsPC()){
	$(".tabhover li").mouseover(function(){
		$(".tabhover li").removeClass("on");
		$(this).addClass("on");
		var n=$(this).index();
		$('.ullist').hide();
		$('.ullist').eq(n).show();
	});
	
	$(window).scroll(function() {
		if($(document).scrollTop()>100){
			$('.backToTop').show();
		}else{
			$('.backToTop').hide();
		}
	});
	$('.ullist ul').eq(1).css({'border-bottom':'0 none','padding-bottom':'0'});
	$(".backToTop").click(function(){
		$("body,html").animate({
			scrollTop:0
		},400)
	});
	//panduan                                                                                                 
	$('.yelist a').each(function(){
		var obj = $(this).find('img');
		if (obj.length >0) {
			//console.log(1)
		} else {	
			$(this).find('.spn').addClass('listbg');
		}
	});	
	var desci = $("meta[name='description']").attr("content");
	//console.log(desci);
	var desic=desci.replace(/"/g, '/"')
	$("meta[name='description']").attr("content",desic);
	//guanggao
	$('.adv-banner').html('<script charset="utf-8" type="text/javascript" src="https://www.ycwb.com/outfile/js/content/news_2017.js"></script>')
	var scriptc = document.createElement("script");
    scriptc.src = "https://www.ycwb.com/Template/2020/conntent/js/xqyfe.js";
	var sc = document.getElementsByTagName("script")[3];
	sc.parentNode.insertBefore(scriptc, sc);
	//$('.rbcs iframe').attr('src','http://news.ycwb.com/node_100386.html');
	//除去原本的iframe
	$('.rbcs iframe').remove();
	function dyajx(){
	    $.ajax({
	        url : "https://api.ycwb.com/app_if/jy/getArticles?jsoncallback=?&nodeid=22&pagesize=10",
	        dataType:'jsonp',
	        success:function(response){
	            var row;
	            var dom = "";
	            var attsdoc = ['<div class="ranks"> <ul id="tt">'];
	            for(var x in response.artiles){
	                row = response.artiles[x];
	                attsdoc.push(' <li><a href="'+row.PUBURL+'" target="_blank"><span>'+row.TITLE+'</span></a></li>');
	            }
	             attsdoc.push('</ul></div>');
	              $('.rbcs.news').append(attsdoc.join('\n'));
	              for (var k=0;k<$('.ranks li').length;k++){
	                    if(k<=2){
	                        $('.ranks li').eq(k).find('a').prepend('<i class="red sort-icon">'+(k+1)+'</i>');
	                    }else{  
	                        $('.ranks li').eq(k).find('a').prepend('<i class="sort-icon">'+(k+1)+'</i>');       
	                    }   
	                }

	        }
	    })
	}
	dyajx()
	$('.g1').html('<script src="https://www.ycwb.com/outfile/js/content/g1.js"></script>');
	$('.g3').html('<script src="https://www.ycwb.com/outfile/js/content/g3.js"></script>');
	$('.g4').html('<script src="https://www.ycwb.com/outfile/js/content/g4.js"></script>');

	// $('.footerap').html('<iframe name="foundercms" allowtransparency="true" src="http://www.ycwb.com/Template/2017/foot.html" frameborder="0" width="100%" height="155" scrolling="no" style="min-width:1200px;"></iframe>')
}else{
	//$('img').lazyload({ threshold : 200 });   
	//20210304添加艺术频道的链接
	
	//20210304修改


	// 回到顶部

	$(".backToTop").on('tap click',function(){
		$(window).scrollTop('0',800);
	});
	//导航
	$('.list-icon').click(function(){
		$("nav").hasClass('show')?$("nav").fadeOut().removeClass('show'):$("nav").fadeIn().addClass('show');
    	$(window).scrollTop('0',800);
	});
	$('.pc').remove();
	//panghaib
	// $('.ranksph').html('<iframe name="foundercms" allowtransparency="true" src="https://news.ycwb.com/node_100410.html" frameborder="0" width="100%" height="350px" scrolling="no" style="width:100%; height: 370px;"></iframe>');
	 $('.picli').html('<iframe name="foundercms" allowtransparency="true" src="https://wap.ycwb.com/node_121716.html?t=125555" frameborder="0" width="100%" height="800px" scrolling="no" style="width:100%; height: 800px;"></iframe>');
	dzlist();
	$('.ranksph').parent().hide()
	// 点击刷新
	 $(".refresh-icon").on('tap click',function(){
	    window.history.go(-1);
	});
	 //20.11.23添加摘要没有的情况判断
     if($(".ngabstract").text().replace(/^\s*/g,"")==""){
        $(".article-abstract ").hide();
      }else{
        $(".article-abstract ").show();
      }
    // 点击显示二维码
    $(".wechat-code").on('tap click',function(){
        var code = $(".jyw-code");
        code.hasClass('show')?code.hide().removeClass('show'):code.show().addClass('show');
    });


}

$('.bdsharebuttonbox').html('<ol><li class="row"><div class="social-share" data-sites="weibo,qq,wechat,qzone"></div></li></ol>')

// $('.wxshare').html('<link rel="stylesheet" href="https://www.ycwb.com/Template/2020/conntent/css/share.min.css"><script src="https://www.ycwb.com/Template/2020/conntent/js/jquery.share.min.js"></script>');

function loadjscssfile(filename, filetype){
if (filetype=="js"){ //判定文件类型
var fileref=document.createElement('script')//创建标签
fileref.setAttribute("type","text/javascript")//定义属性type的值为text/javascript
fileref.setAttribute("src", filename)//文件的地址
}
else if (filetype=="css"){ //判定文件类型
var fileref=document.createElement("link")
fileref.setAttribute("rel", "stylesheet")
fileref.setAttribute("type", "text/css")
fileref.setAttribute("href", filename)
}
if (typeof fileref!="undefined")
document.getElementsByTagName("head")[0].appendChild(fileref)
}
 loadjscssfile("https://www.ycwb.com/Template/2020/conntent/css/share.min.css?t=20220228", "css");
 loadjscssfile("https://www.ycwb.com/Template/2020/conntent/js/jquery.share.min.js", "js") 

 /*20230113 */
 setTimeout(function () {
	// 处理新图说
	var picture = document.querySelectorAll('.picture-illustrating');
	var originalTitleElement = '';
	for (var i = 0; i < picture.length; i++) {
	  var originalTitle = picture[i].getAttribute("data-original-title");
	  if (originalTitle) {
		picture[i].style.marginBottom = '';
		originalTitleElement = document.createElement("span");
		originalTitleElement.className = 'picture-illustrating-content';
		// originalTitleElement.style.width = picture[i].width + 'px';
		var eleParent = picture[i].parentNode;
		 if (eleParent.tagName != 'P') eleParent = eleParent.parentNode;
		// if (eleParent.querySelectorAll('.picture-illustrating-content').length) break;
		// if (eleParent.style.textAlign == 'center') {
		//   originalTitleElement.style.margin = '0 auto';
		// } else {
		//   eleParent.style.position = 'relative';
		// //   originalTitleElement.style.marginLeft = eleParent.offsetLeft + 'px';
		// }
		originalTitleElement.innerHTML = originalTitle;
		eleParent.appendChild(originalTitleElement);
	  }
	}
  }, 300);
