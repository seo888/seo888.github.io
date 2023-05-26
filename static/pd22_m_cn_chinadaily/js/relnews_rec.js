/**相关内容推荐--文章页*/
$(document).ready(function(){
	/**获取当前文章的url*/
	var CurUrl = window.location.href;
	/**当前稿件的ID*/
    var StartLetter = CurUrl.indexOf('content_') + 8;
    var EndLetter = CurUrl.indexOf('.htm');
    var news_id = CurUrl.substring(StartLetter,EndLetter);
	var appname = "chinese";
	var init = true;
	var size = 30;            
	var sIndex = 0;
	var eIndex = 10;
	/**等待加载样式*/
	var loadingSpinners = '<img src="https://www.chinadaily.com.cn/image_c/2017/loading.gif" style="margin-left: 185px; margin: 0px auto; display: block;"/>';
	var errorHTML="<div class='busBox1'>[编辑正在为您精心推荐中，请稍后刷新]</div>";
	/**获取稿件标题和URL*/
	var titleStr = $('title').text(); 
	var title = titleStr.substr(0, titleStr.indexOf('-'));
	var arr = new Array();
	
	/**处理url翻页下划线情况*/
	if(CurUrl.indexOf(news_id+'_') !=-1) {
		CurUrl = CurUrl.substr(0, CurUrl.indexOf('content_')+8)+news_id+'.htm';
	}
	
	changeData();
	
	function newsList(startIndex, endIndex){
		$("#newsList").html(loadingSpinners);
		var params = {};
		params.title = title;
		params.url = CurUrl;
		/**请求url 拼接标题和稿件URL*/
		var url = "https://usercenter.chinadaily.com.cn/api/relnews?news_id="+news_id+"&appname="+appname+"&size="+size;
		/**解决URL传中文乱码问题*/
		url=encodeURI(url); 
		url=encodeURI(url); 
		
		$.ajax({
			type: "POST",
			dataType : "jsonp",
			data: params,
			url: url,
			error: function() {
				/**请求错误或无数据加载样式*/
				var errorHTML="<div class='busBox1'>[编辑正在为您精心推荐中，请稍后刷新]</div>";
				$('#newsList').html(errorHTML);
				$('#changeData').hide();
			}, 
			success: function(data) {
				if(data == null) {
					$("#newsList").html(errorHTML);
					$('#changeData').hide();
				} else {
					data = eval(data);
					arr = data.result;
					getNewsTop10(startIndex, endIndex);
				}
			}
		});
	}
	
	 /**初始化方法*/
	 function changeData() {
		if(init==true) {
			init = false;
			newsList(parseInt(sIndex), parseInt(eIndex));
		} 
	 }
		 
	 /**点击换一批按钮*/
 	$('#changeData').click(function() {
 		var sIndex = $('input#saveStartIndex').val();
 		var eIndex = $('#saveMaxIndex').val();
 		getNewsTop10(parseInt(sIndex), parseInt(eIndex));
 	});
	 
 	/**遍历剩余数据*/
 	function getNewsTop10(startIndex, endIndex) {
 		var html="";
 		var html1="";
 		$("#newsList").html(loadingSpinners);
 		
 		if(arr.length ==0) {
 			$('#newsList').html(errorHTML);
 			$('#changeData').hide();
 			return;
 		}
 		if(arr.length!=endIndex && (arr.length-endIndex)>=10) {
			startIndex=endIndex;
			endIndex+=10;
		} else {
			startIndex=0;
			endIndex=10;
		}
		if(endIndex>arr.length) {
			endIndex = arr.length;
		}
		
		for(var i=startIndex; i<endIndex; i++) {
			var img = null;
			if(arr[i].img_url!="") {
				img = arr[i].img_url;
			}
			var id = arr[i].news_id;
			var summary = arr[i].summary;
			
			if(typeof(summary)=="undefined" || summary == null) {
				summary = "";
			}
			if(img !=null) {
				html += "<div class='busBox1' id='new_pic'><div>"
					 +"<div class='mr10'>"
					 +"<a href="+arr[i].url+" target='_blank'>"
					 +"<img src="+img+" border='0'>"
					 +"</a></div><div><h3>"
					 +"<a href="+arr[i].url+" target='_blank'>"
					 +""+arr[i].title+""
					 +"</a></h3>"
					 +"<p>"+summary+"</p>"
					 +"</div></div></div>";
					
				} else {
					html +="<div class='busBox1'><div>"
						  +"<div class='mr10'>"
						  +"<a href="+arr[i].url+" target='_blank'></a>"
						  +"</div><div><h3>"
						  +"<a href="+arr[i].url+" target='_blank'>"
						  +""+arr[i].title+""
						  +"</a></h3>"
						  +"<p>"+summary+"</p>"
						  +"</div></div></div>";
				}
			}
		$("#newsList").html("");
		$("#newsList").html(html);
		/**$("#newsList").append(html1);*/
		$('#saveStartIndex').val(startIndex);
		$('#saveMaxIndex').val(endIndex);
 	}
});