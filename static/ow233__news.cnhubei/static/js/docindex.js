
    $(function(){
			resizewindow();
			$(window).bind("resize", resizewindow);		
			function resizewindow()
		{
			var $globle_link = $("#cjly_nav01");
			var w_width=$(window).width() - 1160; 
			if (w_width>0){$globle_link.css("left",($(window).width()-1200)/2 + 40);}
			if (w_width==0){$globle_link.css("left",0);}
			if (w_width<0){$globle_link.css("left",0);} 	
			
				
		};				

		 
	   $(window).scroll(scrolls)
	   scrolls()
	   function scrolls(){

		   var top_h01= $('#lmy h1').outerHeight();
		   var top_h011= $('#wzygg01').outerHeight();
		   var top_h012= $('#wzygg011').outerHeight();
		   var top_h013= $('#wzygg02').outerHeight();
		   var top_h02= top_h01+top_h011+top_h012+top_h013+103+50+21+15+30
		   
		   var sTop = $(window).scrollTop(); 
		    fl = $('#lmy').offset().top;
 		   			   
		   if(sTop>=fl){

			   $(".lmy_topnav01").css({"position":"fixed","top":"0","left":"0","z-index":"99"})
			 $("#cjly_nav01").css('top','110px')


        }
		   else{
			   $(".lmy_topnav01").css('position','static')
			   $('#cjly_nav01').css({top:(top_h02)+'px'})
			   }		
	     }			 

	})


$(window).mousewheel(function(event) {
   console.log(event.deltaX, event.deltaY, event.deltaFactor);
        		if(event.deltaY > 0){
        			$("#lmy_top_nav01").slideDown();
        		}else if(event.deltaY < 0){
        			$("#lmy_top_nav01").slideUp();
                
        		}	
		
				   
});

$(function(){
		   
	   

			 $("#weixin_share").click(function() {
				 $('.ma_box').show();

				}) ; 
			 $(".close").click(function() {

				$('.ma_box').hide();
				}) ; 			
	 
	})

