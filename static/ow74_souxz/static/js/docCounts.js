$(document).ready(function () {
        var type = "docpv";
		$.ajax({
	         	  type: "get",
	         	  data: {docid:docId,siteid:siteId,type:type},
	         	  traditional:true,
                  async:false,
	         	  url: "http://www.souxz.cn/ubas/getcounts",
	         	  dataType: "jsonp",
                  jsonp: "callback",
	        	  success: function (data) {
	        	        $("#monitor_"+docId).text(data["DOCPV"]);
                    },
	        	  error: function (XMLHttpRequest, textStatus, errorThrown) {

	                }
	            });
});