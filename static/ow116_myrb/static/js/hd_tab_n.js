
function qztj_init() {
	$(".qztj_btn li").mouseover(function(e) {
		$(this).siblings("li.qztj1").removeClass("qztj1");
		$(this).addClass("qztj1");
		var $i=$(this).index();
		$(".qztj_pan div").hide();
		$(".qztj_pan div").eq($i).show();
	});
	var qztj_init=Math.floor(Math.random()*5);
	$(".qztj_btn li").eq(qztj_init).mouseover();
}

function loadjs(url,callback){
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.onload = script.onreadystatechange = script.onerror = function (){
		if (script && script.readyState && /^(?!(?:loaded|complete)$)/.test(script.readyState)) return;
		script.onload = script.onreadystatechange = script.onerror = null;
		script.src = '';
		script.parentNode.removeChild(script);
		script = null;
		callback();
	}
	script.src = url;
	try {
		head.appendChild(script);
	} catch (exp) {}
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {  
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(function(){
	if (typeof(jQuery)=="undefined")
		loadjs("/js/jquery-1.8.2.min.js",qztj_init);
	else
		qztj_init();
});
