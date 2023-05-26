window.onload=function(){
	var btn = document.getElementById("search-button");
	btn.onclick = function() {
		var form_submit = document.getElementById('search_form');
		form_submit.submit();
	}
};