
function decodeXhtml(arr){
	var text="";
    var textarr = arr.split(';');
	for(var item in textarr)
    text += String.fromCharCode(textarr[item].replace("&#",""));
    return text;
}
var objRegExp= /^&#\d+.*\;$/;
// var pbtext = "";
// if(objRegExp.test(pageConfig.name)){
// 	pbtext = decodeXhtml(pageConfig.keywords) + decodeXhtml(pageConfig.tags) + decodeXhtml(pageConfig.name);
// }else{
// 	pbtext = pageConfig.keywords + pageConfig.tags + pageConfig.name;
// }
// window.gettimePlace = function(data){
// 	if(data.indexOf("北京") >= 0){
// 		location.href = "/404/";
// 	}
// }

try {
	$('html').hide();
	$.ajax({
		type: "GET",
		async: false,
		url: "https://www.55g.cc/api/getspecialidnew",
		data: {
			id: pageConfig.id,
			type: pageConfig.type,
			cid: pageConfig.cid,
			name: objRegExp.test(pageConfig.name) ? decodeXhtml(pageConfig.name) : pageConfig.name,
			tags: objRegExp.test(pageConfig.tags) ? decodeXhtml(pageConfig.tags) : pageConfig.tags,
			keywords: objRegExp.test(pageConfig.keywords) ? decodeXhtml(pageConfig.keywords) : pageConfig.keywords,
			device: "pc",
			url: location.href
		},
		dataType: "json",
		success: function(data) {
			if (data.w404 == true) {
				$(function() {
					$("body").html('<img style="display:block; margin: 10% auto;" src="//www.55g.cc/SkinNew/images/404-5.png" >');
					$('html').show();
				})
			} else {
				window.downpage = data.pbbtn;
				$('html').show();
			}
		},
		error: function() {
			$('html').show();
		}
	});
} catch (err) {
	$('html').show();
}