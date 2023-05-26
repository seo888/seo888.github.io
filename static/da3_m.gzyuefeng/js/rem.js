window.onresize = function(){
    getRem(720,100)
	
};
window.onload = function(){
	
}
readAll()
getRem(720,100);
function getRem(pwidth,prem){
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
	if(oWidth > 400){
		oWidth = 400
	}
    html.style.fontSize = oWidth/pwidth*prem + "px";
}
getRem(720,100);


function readAll() {   
	console.log( $('#chuarc').height()) 
        var cheight = $('#chuarc').height();
        var firsth = Math.ceil($(window).height() * 1.6);
        var sheng = Math.ceil((cheight - $(window).height() * 1.6)/cheight *100);        
        //var loadbut = $('<div class="read-box"><div class="read_mask"></div><div class="read_mod"><a href="javascript:" class="read-button">展开剩余<em>'+sheng+'</em>%<img src="//i.zgjm.org/img/icon_read.png" alt="展开按钮" data-bd-imgshare-binded="1"></a></div></div>');        
		
		// 
		var loadbut = $('<div class="read-box"><div class="read_mask"></div><div class="read_mod"><a href="javascript:" class="read-button">展开剩余&nbsp;↓</a></div></div>'); 
        $('#chuarc').after(loadbut);         

        if(cheight <= $(window).height() * 1.6){
            $('.read-box').css('display','none');
            return;
        }else{            
            $('#chuarc').height(firsth);
        }        

        $('.read-box').click(function(){
			$('#chuarc').css('height','auto'); 
            $(this).css('display','none');           
        });
}

