$(function(){
	
	if( $(".newsheart").length>0 ) {
		
		var id = $('.newsheart').attr("dir");
		$.ajax({  
			type:"POST",  
			dataType:"text",
			url:"/service/zan.php",  
			data:{"id":id,"od":"load"},    
			success:function(data){ 
				$("#likeCount").html(data);    
			},
			error: function() {
				console.log('Request Error');
			}
		}); 
	}

	$('body').on("click",'.newsheart',function(){

		var C = parseInt($("#likeCount").html());
		var D = $(this).attr("rel");
		var id = $(this).attr("dir");
		$(this).css("background-position","");
		
		if(D === 'like') {

			$.ajax({  
				type:"POST",  
				dataType:"text",
				url:"/service/zan.php",  
				data:{"id":id,"od":"put"},  
				cache:false, //不缓存此页面  
				success:function(data){ 
					$("#likeCount").html(data);   
				},
				error: function() {
					console.log('Request Error');
				}  
			});  
			$(this).addClass("heartAnimation").attr("rel","unlike");
			$(this).addClass("disable");
		}
		
	});


});