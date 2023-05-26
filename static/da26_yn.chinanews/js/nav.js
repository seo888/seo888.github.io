// navigation js by smartless 20110408
function navInit(){
	var Ts = $("#nav h1");
	for(var i = 0; i < Ts.length; i++){
		if (i == _onum) {
			$("#nav h1").eq(i).attr("class","current");
			$("#nav .nav_area").eq(i).css("display","block");
		}else{
			$("#nav h1").eq(i).attr("class","normal");
			$("#nav .nav_area").eq(i).css("display","none");
		}
		$("#nav h1").mouseover(function() {
			claerL();
			$(this).attr("class","current");
			$(this).next().css("display","block");
		});
		$("#nav").mouseleave(function() {
			claerL();
			$("#nav h1").eq(_onum).attr("class","current");
			$("#nav .nav_area").eq(_onum).css("display","block");
		});
	};
	function claerL()
	{
		$("#nav h1").attr("class","normal");
		$("#nav .nav_area").css("display","none");
	}
}

function scrollNews(selector, time, StartIndex) {
}
/*
function scrollNews(selector, time, StartIndex) {
	$.getJSON(
	  "/pub/index.php",
	  { m: "dbsource", c: "call", a: "get", id: "1" },
	  function(json){
		$.each(json, function(i, item){
			$(selector + " ul").append("<li><a href=" + item.url + ">"+item.title+"</a></li>");
		});
	  }
	);
	var sw = StartIndex;
    showIndex(StartIndex);
    for (var j = 0; j < 5; j++){
		$(selector + " ol").append("<li><a href='javascript:onclick=showIndex(" + j + ");'></a></li>");
		//$(selector + " ol").append(j);
	}
    $(selector + " ol li a").eq(StartIndex).addClass("active");
	
	$(selector + " ol li a").mouseover(function(){
		sw = $("ol li a").index(this);
		showIndex(sw);
	});
	function showIndex(i){
		sw++;
		if(sw==5){sw=0;}
		$(selector + " ul li").hide();
		$(selector + " ul li").eq(i).slideDown();
		$(selector + " ol li a").removeClass("active");
		$(selector + " ol li a").eq(i).addClass("active");
	}
	$(selector).hover(function(){
		if(myTime){
		   clearInterval(myTime);
		}
	},function(){
		myTime = setInterval(function(){
		  showIndex(sw)		  
		} , time);
	});
	var myTime = setInterval(function(){
	   showIndex(sw)
	} , time);
}*/
<!--[932,3,34] published at 2022-09-02 11:20:29 from #10 by ÕÔÇ« -->  