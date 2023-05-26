function tongji(){
        var url;
        var Acont;
        var Pdate;
	var reg=new RegExp("(https?:\/\/)?(.*)(\/[a-z0-9A-Z]*)([_a-z0-9A-Z]*)(\.(shtml|html|htm))(.*)","gmi");
		url1 = window.location.host; 
                url1=url1.toLowerCase();

           //    if(url1.indexOf(".") != -1) return;
		url2= window.location.pathname; 

		url=url1+url2;
		url=url.toLowerCase();
		url=url.replace(reg,"$2$3$5");
     
       //Acont= $('#author').text();
        //Pdate=$('#startD').text();

        Acont= $('#author').html();
        Pdate=$('#startD').html();
		
	//	showsimple(url,Acont,Pdate);
		
         var URL={
			Address:url	
        };
       var Writer={
                        Author:Acont
         };
       var PDate={
                         Pubdate:Pdate
     };
		
	var dataarr = {
	    type : "POST",  
            url : "http://w.xiancity.cn/count.php",
	    timeout:65000, //ajax请求超时时间65秒 
            data : {
                "URL" : URL,
                "Writer":Writer,
               "PDate":PDate
            },
            success : function(result) {
                if(result){
               $("#countR").html(result);
                }else{
                  $.ajax(dataarr);
               }
            },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus == "timeout") {
            $.ajax(dataarr);
        }
    }
		};
	$.ajax(dataarr);

}
tongji();

