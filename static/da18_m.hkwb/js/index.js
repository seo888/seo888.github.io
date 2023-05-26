/*
* 
* Credits to http://css-tricks.com/long-dropdowns-solution/
*
*/

var maxHeight = 400;

$(function(){

    $(".dropdown > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item    
        $list
            .show()
            .css({
                paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
        if (multiplier > 1) {
            $container
                .css({
                    height: maxHeight,
                    overflow: "hidden"
                })
                .mousemove(function(e) {
                    var offset = $container.offset();
                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
                    if (relativeY > $container.data("origHeight")) {
                        $list.css("top", -relativeY + $container.data("origHeight"));
                    };
                });
        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });  
    
});


//滑动门效果
$.fn.myTabs = function(options) {  
	var defaults = {
		selected: 0,
		action:'mouseenter',
		effect:'normal',
		speed:1000,
		tabsTitle:'.title span',
		tabsContents:'.content',
		current:'on'
	};
	var opt = $.extend(defaults, options);  
	var _this = this;

	//默认选择
	_this.find(opt.tabsTitle).eq(opt.selected).addClass(opt.current).siblings(opt.tabsTitle).removeClass(opt.current);
	_this.find(opt.tabsContents).eq(opt.selected).show().siblings(opt.tabsContents).hide();

	_this.find(opt.tabsTitle).bind(opt.action,function(){
			var index  = $(this).index();
			$(this).addClass(opt.current).siblings(opt.tabsTitle).removeClass(opt.current);
			switch(opt.effect){
				case 'fade':	
					_this.find(opt.tabsContents).eq(index).stop(true,true).fadeIn(opt.speed).siblings(opt.tabsContents).hide();
				break;
				case 'slide':	
					_this.find(opt.tabsContents).eq(index).stop(true,true).slideDown(opt.speed).siblings(opt.tabsContents).stop(true,true).slideUp(opt.spped);
				break;
				default:	
					_this.find(opt.tabsContents).eq(index).show().siblings(opt.tabsContents).hide();
				break;
			}
			
	})
}; 