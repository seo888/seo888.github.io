  var nexturl=$("#nexturl").attr("data-url");
  var isloading = 0;
  $(".nextpageml").click(function() {
      if (isloading==1){return false;}
      if (nexturl==""){return false;}
      isloading = 1;
			$.ajax({
				type: "get",
				cache: false,
				url: nexturl,
				success: function(data) {
          //加载更多标语
          $(".result").html("loading...");
					var $result = $(data).find(".load-son");
          setTimeout(function(){
     					nexturl = $(data).find("#nexturl").attr("data-url");
              //nexturl=""; // 实际开发中，请把此句代码注释掉。
              //加载完毕，清空加载更多标语
              $(".result").html("加载更多");
              if (nexturl==""){
                $(".result").html("已经是全部了");
                $("#nexturl").removeClass("nextpageml");
            }
    					try{
                  $("#wp-load").append($result);
                  $("#gallery-wrapper").append($result);
                }catch(err){}
              isloading = 0;
          }, 300); //加入延时函数，增加美观，并不影响网络请求，是请求过了，只是加载等待
				}
			})//ajax end
});// sroll end