var url_param = location.href.split('?')[1];
 if (!!url_param) {
 	if($('.scrollRight').attr('href')){
 	  $('.pageBox a,.scrollLeft,.scrollRight').each(function () {
 	  $(this).attr('href',$(this).attr('href').split('?')[0]?$(this).attr('href').split('?')[0]+'?'+url_param:$(this).attr('href')+'?'+url_param);
 	  });
 	}
 }