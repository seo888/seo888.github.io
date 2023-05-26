$(document).ready(function() {	

	//Show Banner
	$(".examples_image .desc").show(); //Show Banner
	$(".examples_image .block").animate({ opacity: 0.85 }, 1 ); //Set Opacity
	
	//Click and Hover events for thumbnail list
	$(".mune_thumb ul li:first").addClass('active'); 
	$(".mune_thumb ul li").mouseover(function(){ 
		//Set Variables
		var imgAlt = $(this).find('img').attr("alt"); //Get Alt Tag of Image
		var imgTitle = $(this).find('a').attr("href"); //Get Main Image URL
		var imgDesc = $(this).find('.block').html(); 	//Get HTML of block
		var imgDescHeight = $(".examples_image").find('.block').height();	//Calculate height of block	
		
		if ($(this).is(".active")) {  //If it's already active, then...
			return false; // Don't mouseover through
		} else {
			//Animate			
			$(".examples_image .block").animate({ opacity: 0, marginBottom: -imgDescHeight }, 250 , function() {
			$(".examples_image .block").html(imgDesc).animate({ opacity: 0.85,	marginBottom: "0" }, 250 );
			$(".examples_image img").attr({ src: imgTitle , alt: imgAlt});
			});
		}
		
		$(".mune_thumb ul li").removeClass('active'); //Remove class of 'active' on all lists
		$(this).addClass('active');  //add class of 'active' on this list only
		return false;
		
	}) .hover(function(){
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
			
	//Toggle
	$("a.collapse").mouseover(function(){
		$(".examples_image .block").slideToggle();
		$("a.collapse").toggleClass("show");
	});
	iFocusChange();
	
});//Close Function





