//banner
$(function() {
	var sWidth = $(".indexbanner").width(); //获取焦点图的宽度（显示面积）
	var sHeight = $(".indexbanner").height();
	var len = $(".indexbanner ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	$('.prenuxtnumall').html(len);
	var btn = "<div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div>";
	$(".indexbanner").append(btn);
	$(".indexbanner .btnBg").css("opacity",1);

	$(".indexbanner .btn span").css("opacity",1).mouseenter(function() {
		index = $(".indexbanner .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	$(".indexbanner").hover(function() {
		$(this).find(".preNext").stop(true,false).animate({"opacity":"1"},300);
	},function() {
		$(this).find(".preNext").stop(true,false).animate({"opacity":"1"},300);
	});

	$(".indexbanner .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});

	$(".indexbanner .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});

	$(".indexbanner ul").css("width",sWidth * (len));
	
	$(".indexbanner").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000);
	}).trigger("mouseleave");
	
	function showPics(index) { 
		var nowLeft = -index*sWidth; 
		//alert(index+1);
		$('.prenuxtnumon').html(index+1);
		$(".indexbanner ul").stop(true,false).animate({"left":nowLeft},300); 
		/*var nowLeft = -index*sHeight; 
		$(".indexbanner ul").stop(true,false).animate({"top":nowLeft},300); */
		$(".indexbanner .btn span").stop(true,false).animate({"opacity":"1"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); 
	}
});
 

//选项卡
;(function($){
	$.fn.extend({
		Tabs:function(options){
			// 处理参数
			options = $.extend({
				event : 'mouseover',
				timeout : 0,
				auto : 0,
				callback : null
			}, options);
			
			var self = $(this),
				tabBox = self.children( 'div.tab_box' ).children( 'div' ),
				menu = self.children( 'ul.tab_menu' ),
				items = menu.find( 'li' ),
				timer;
				
			var tabHandle = function( elem ){
					elem.siblings( 'li' )
						.removeClass( 'current' )
						.end()
						.addClass( 'current' );
						
					tabBox.siblings( 'div' )
						.addClass( 'hide' )
						.end()
						.eq( elem.index() )
						.removeClass( 'hide' );
				},
					
				delay = function( elem, time ){
					time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
				},
				
				start = function(){
					if( !options.auto ) return;
					timer = setInterval( autoRun, options.auto );
				},
				
				autoRun = function(){
					var current = menu.find( 'li.current' ),
						firstItem = items.eq(0),
						len = items.length,
						index = current.index() + 1,
						item = index === len ? firstItem : current.next( 'li' ),
						i = index === len ? 0 : index;
					
					current.removeClass( 'current' );
					item.addClass( 'current' );
					
					tabBox.siblings( 'div' )
						.addClass( 'hide' )
						.end()
						.eq(i)
						.removeClass( 'hide' );
				};
							
			items.bind( options.event, function(){
				delay( $(this), options.timeout );
				if( options.callback ){
					options.callback( self );
				}
			});
			
			if( options.auto ){
				start();
				self.hover(function(){
					clearInterval( timer );
					timer = undefined;
				},function(){
					start();
				});
			}
			
			return this;
		}
	});
})(jQuery);

$(document).ready(function(){
	$('.tab_01').Tabs({
		auto:3000
	});
	$('.tab_02').Tabs();
	$('.tab_03').Tabs();
	$('.tab_04').Tabs();
	$('.tab_100').Tabs({
		event:'click'
	});	
});	


/*placeholder*/
$(document).ready(function(){
    var doc=document,inputs=doc.getElementsByTagName('input'),supportPlaceholder='placeholder'in doc.createElement('input'),placeholder=function(input){var text=input.getAttribute('placeholder'),defaultValue=input.defaultValue;
    if(defaultValue==''){
        input.value=text}
        input.onfocus=function(){
            if(input.value===text){this.value=''}};
            input.onblur=function(){if(input.value===''){this.value=text}}};
            if(!supportPlaceholder){
                for(var i=0,len=inputs.length;i<len;i++){var input=inputs[i],text=input.getAttribute('placeholder');
                if(input.type==='text'&&text){placeholder(input)}}}
});




//menu
(function(a){
	a.fn.hoverClass=function(b){
		var a=this;
		a.each(function(c){
			a.eq(c).hover(function(){
				$(this).addClass(b)
			},function(){
				$(this).removeClass(b)
			})
		});
		return a
	};
})(jQuery);

$(function(){
	$(".JS_share").hoverClass("current");
});



//加入收藏
        function AddFavorite() {
			var sURL=window.location;
			var sTitle=document.title;
            sURL = encodeURI(sURL); 
        try{   
            window.external.addFavorite(sURL, sTitle);   
        }catch(e) {   
            try{   
 
                window.sidebar.addPanel(sTitle, sURL, "");   
 
            }catch (e) {   
 
                alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
 
            }   
 
        }
 
    }
    //设为首页
 
    function SetHome(){
 
        if (document.all) {
 
            document.body.style.behavior='url(#default#homepage)';
 
               document.body.setHomePage('http://www.bashan.com');
 
        }else{
 
            alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
 
        }
 
    }
	
	function saveCode(obj) { 
var winname = window.open('', '_blank', 'top=10000'); 
winname.document.open('text/html', 'replace'); 
winname.document.write(obj.value); 
winname.document.execCommand('saveas','','code.htm'); 
winname.close(); 
} 

