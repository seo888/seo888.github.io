(function(){
  $(document).ready(function(e) {
    try {
      var $_header_area = $('.header-area');
      var $_area_select = $('.area-select');
      
      $_header_area.click(function(e) {
        e.preventDefault();
        
        if(!$(this).hasClass('header-area-current')) {
          $_header_area.addClass('header-area-current');
        } else {
          $_header_area.removeClass('header-area-current');
        }
        
        var ev = e || window.event;
        if(ev.stopPropagation) {
          ev.stopPropagation();
        } else if(window.event) {
          window.event.cancelBubble = true;//兼容IE
        }
      });
          
      $_area_select.click(function(e){
        $_header_area.removeClass('header-area-current');
        
        var ev = e || window.event;
        if(ev.stopPropagation) {
          ev.stopPropagation();
        }
        else if(window.event) {
          window.event.cancelBubble = true;//兼容IE
        }
      });
      
      $(document).click(function(e) {
        $_header_area.removeClass('header-area-current');
      });
    } catch(e) {
      
    }
  });
})();