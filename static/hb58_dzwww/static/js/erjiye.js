$(function(){
	    // 顶部按钮 start
			$('#search-btn').click(function(event){	
				event.stopPropagation();
				$(this).addClass('open');		
			});
	
			$('#phone').click(function(event){	
				event.stopPropagation();
                 $(this).addClass('open');
			});

			$(document).click(function(event){
				event.stopPropagation();
				$('#phone').removeClass('open');
        $('#search-btn').removeClass('open');
			});
			// 顶部按钮 end

/*换一换开始*/
    var side=$('#right-side .side-list');
    var num=$('#right-side .side-list').length;
    var i=0;
	 $('#next').click(function(event){
	 event.stopPropagation();
    
	if(i==num-1)
	 { i=0;}
	else
	{ i++;}
	
	$('#right-side .content').html(side[i]);
	$('#right-side .content .side-list').css('display','block');
	
     });
/*换一换结束*/

/*加载更多新闻开始*/
   var num1=$('.news-list ul').length;
   var j=1;

     $('#load').click(function(){
       if(j<=num1){
       $('.news-list').children().eq(j).css('display','block');
	   ++j;
	   }
	   else{
		  
        $('#load').removeClass('loading');
		$('#load span').html('没有更多新闻');
	   }
	 num1--;
		
   });

  /*加载更多新闻结束*/   

	});