(function($) {
  $.fn.Affix = function(options){
    var dtf = {
       fixedTop: 10,
       fixedLeft:120,
       absoluteTop_affix: 20,//触发
       elem:"affix"
    }
    var  ops = $.extend(dtf,options);
    var  affix_elem = $("."+ops.elem);
    var mTop = affix_elem.offset().top;
    $(window).scroll( function() { 
      var sTop = $("body").scrollTop();
      var result = mTop - sTop;
      if (result < ops.absoluteTop_affix) {
        affix_elem.css({
          "position" : "fixed",
          "top" : ops.fixedTop + "px",
          "left" : ops.fixedLeft + "px"
        })

      }else{
        affix_elem.removeAttr("style");
      };
    } );  
  }
})(jQuery);