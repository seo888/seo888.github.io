jQuery(document).ready(function($){ 
	$(document).delegate(".san-praise-sdk[sfa='click']","click",function(event) {
		var postid=$(this).attr("data-postid");
		var value=$(this).attr("data-value");
		var okfunction=$(this).attr("data-ok");
		var checkfunction=$(this).attr("data-check");
		var errorfunction=$(this).attr("data-error");
		$.ajax({
			type:'post',
			async:true,
			url:bloghost + "zb_users/plugin/san_praise_sdk/save.php?"+new Date(),
			data:{
				san_praise_value:value,
				postid:postid
			},
			dataType:'html',
			success:function(data){
				if(data=="ok"){
					try{
						var ob=$(".san-praise-sdk[data-postid='"+postid+"'][data-value='"+value+"'][sfa='num']");
						if(ob!=null){
							var sint=parseInt(ob.html(),10);
							sint++;
							ob.html(sint);
							$.tipsBox({
			                    obj: $(".san-praise-sdk[data-postid='"+postid+"'][data-value='"+value+"'][sfa='num']"),
			                    str: "+1",
			                    callback: function () {
			                    }
		                    });
		                    niceIn($(".san-praise-sdk[data-postid='"+postid+"'][data-value='"+value+"'][sfa='num']"));
						}
					}catch(E){}
					if(okfunction!=null && okfunction!=""){
						try{
							eval(okfunction+"("+postid+","+value+")");
						}catch(E){};
					}
				}else if(data=="check"){
					if(checkfunction!=null && checkfunction!=""){
						try{
							eval(checkfunction+"("+postid+","+value+")");
						}catch(E){};
					}else{
						alert(prompt);
					}
				}else{
					if(errorfunction!=null && errorfunction!=""){
						try{
							eval(errorfunction+"("+postid+","+value+")");
						}catch(E){};
					}
				}
			}
		});
	});
	$.extend({
		tipsBox: function (options) {
			options = $.extend({
				obj: null,  //jq对象，要在那个html标签上显示
				str: "+1",  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
				startSize: "12px",  //动画开始的文字大小
				endSize: "30px",    //动画结束的文字大小
				interval: 600,  //动画时间间隔
				color: "red",    //文字颜色
				callback: function () { }    //回调函数
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height();
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
				"color": options.color
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval, function () {
				box.remove();
				options.callback();
			});
		}
	});
});