(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				// 总条数
				if(args.showTotal){
					obj.append('<span class="text">总共'+args.total+'条  </span>');
				}
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
				}
				// 跳转
				if(args.showInput){
					obj.append('<span class="text"> 跳转到： </span> <input type="text" /> <span class="text"> 页 </span> <a class="go">确定</a>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			obj.off('click');
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					args.current = current;
					ms.fillHtml(obj,args);
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
					if($.fn.pageScrollTop){
						$($.fn.pageScrollTop).scrollTop(0)
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					args.current = current-1;
					ms.fillHtml(obj,args);
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
					if($.fn.pageScrollTop){
						$($.fn.pageScrollTop).scrollTop(0)
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					args.current = current+1;
					ms.fillHtml(obj,args);
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
					if($.fn.pageScrollTop){
						$($.fn.pageScrollTop).scrollTop(0)
					}
				});
				//跳转页
				obj.on("click","a.go",function(){
					var current = parseInt(obj.children("input").val());
					if(!current || isNaN(current) || current<=0 || current > args.pageCount){ return false; }
					args.current = current;
					ms.fillHtml(obj,args);
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
					if($.fn.pageScrollTop){
						$($.fn.pageScrollTop).scrollTop(0)
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			total : 100,
			showTotal : true,
			showInput : true,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
	$.fn.pageScrollTop=false;
})(jQuery);