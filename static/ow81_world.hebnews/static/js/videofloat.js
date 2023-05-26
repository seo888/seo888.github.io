var ha = ( $('#videofloat').offset().top + $('#videofloat').height() );

$(window).scroll(function(){  

	if ( $(window).scrollTop() > ha + 500 ) { 
    $('#videofloat').css('bottom','0'); 
	} else if ( $(window).scrollTop() < ha + 200) {  
    $('#videofloat').removeClass('out').addClass('in');     
	} else {       
  	$('#videofloat').removeClass('in').addClass('out');   
    $('#videofloat').css('bottom','0');             
  };  

});