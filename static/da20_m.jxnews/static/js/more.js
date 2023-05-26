$(document).ready(function(){
	var ppp = $('.Content').find('p');
	var len = Math.round(ppp.length/2);
	var len_hav = Math.round(ppp.length/4);
	var theight = 0;
	if($("#news_more_page_div_id").length <= 0){
		if(ppp){
		if(ppp.length>6 && ppp.length<30){
			ppp.each(function(i,item){
				if(i>len){
					$(ppp[i]).hide();
				}
		    });
			$(ppp[len]).after('<div align="center"><input type="button" class="btn" value="加载更多"></div>');	
		}else if(ppp.length>=30){
			ppp.each(function(i,item){
				if(i>len_hav){
					$(ppp[i]).hide();
				}
		    });
			$(ppp[len]).after('<div align="center"><div class="btn"><input type="button" class="btn" value="加载更多"></div></div>');
		}
		

		$('.btn').click(function(){
				$('.btn').remove();
				 ppp.each(function(i,item){
					$(item).show();
				});
			});	
		}
	}
	
});
