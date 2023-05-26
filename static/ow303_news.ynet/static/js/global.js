function is_mobile(){
 return /.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent));
}
if(typeof($) == 'function'){
	$(function(){
		var url_param = location.href.split('?')[1];
		if (!!url_param) {
			$('.pageBox a,.scrollLeft,#ff a,.img_content a').each(function(){
				$(this).attr('href',$(this).attr('href').split('?')[0]?$(this).attr('href').split('?')[0]+'?'+url_param:$(this).attr('href')+'?'+url_param);
			});
			$('#tuijian_yet a,.touTiaoNews .cfix a,.tagConList a,.ywPaiHang a,.zbTuiJian a').each(function(){
				$(this).attr('href',$(this).attr('href').split('?')[0]?$(this).attr('href').split('?')[0]+'?'+url_param:$(this).attr('href')+'?'+url_param);
			});
		}
		
		$("#subButton").click(function() {
	
			if( $("#bdcsMain").val() ){
	
				$("#form_1").submit();
	
			}		
		});
	});
}
try{
	if(is_mobile()){
		_.ready(function(){
			_('.ynet_video').each(function(){
				//console.log(_(this).width())
				_(this).height(((_(this).width()*9/16)+46)+'px');
			});
		});
	}
}catch(err){
	//console.log(err)
}