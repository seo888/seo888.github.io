function fulltext(){
	//阅读全文
	var full = function() {
		$('#content-show').html(context);
        $('#readmore').hide();
		$(".more-arr").hide();
	}
	if(context ==''){
		$.getJSON(APP_URL+'?app=article&controller=article&action=fulltext&jsoncallback=?&contentid='+contentid, function(data){
			context = data.content;
			full();
		});
	}else{

	}
}