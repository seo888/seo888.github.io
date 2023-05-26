 // JavaScript Document
//var data ="[{'href':'https://www.baidu.com/','img':'images/topic1.jpg'},{'href':'https://www.baidu.com/','img':'images/topic1.jpg'},{'href':'https://www.baidu.com/','img':'images/topic1.jpg'},{'href':'https://www.baidu.com/','img':'images/topic1.jpg'},{'href':'https://www.baidu.com/','img':'images/topic1.jpg'}]"
$.getJSON("/common/ztrd1.json",function(obj){ 
	//data = eval("("+data+")");
	//$(".topicList02 .slides").empty();
	 
		$.each(obj.data,function(e,entry){
			var html = "";
			//debugger
	        html = "<li><a class='imgResponsive' href='"+entry['url']+"'><img src='"+entry['picUrl']+"'></a><h3><i>"+entry['title']+"</i></h3></li>";
	       var slider = $('#slider').data('flexslider');
	       slider.addSlide(html); 
	    })
 })

