/// <reference path="tkp.js" />
/// <reference path="jquery-1.10.2.min.js" />
!function () {
    var jsd = $("#adjs");
    var reg = new RegExp("(^|&)id=([^&]*)(&|$)", "i");
    var r = jsd.attr('src').split('?')[1].match(reg);
    if (r == null) return;
    var id = unescape(r[2]);
	var jsonUrl = "http://gg.takungpao.com/ad/"+id+"/ad.json?rnd="+Math.random();
    $.getJSON(jsonUrl)
        .done(function (d) {
        	$('.ad-wrapper').each(function(i){
        		var j = i+1;
        		var adBox = $('#ad'+j).find('a');
        		if(d[i].img==""){
        			adBox.empty();
        			adBox.parent().hide();
        		}else{
        			adBox.empty().append("<img src=''/>");
        			adBox.attr('href',d[i].url);
					$('#ad'+j).find('img').attr({'src':d[i].img,'alt':d[i].alt});
        		}
    			
        	});
        });
}();