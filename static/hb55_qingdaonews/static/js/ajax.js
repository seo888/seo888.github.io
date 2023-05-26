/*音频*/
var audio, time;
$(".audio").each(function() {
	var that = $(this);
	var myID = 'v' + $(this).find(".main_audio").attr("videoid").replace(/,/g, "");
	$(this).find(".main_audio").attr("videoid",myID);
	var audioId = $(this).find(".main_audio").attr("videoid");
	if(!$(this).find(".main_audio").data("tit")){
		var dateTit = ""
	}else{
		if($(this).find(".main_audio").data("tit") == ""){
			var dateTit = ""
		}else{
			var dateTit = $(this).find(".main_audio").data("tit")
		};
	};
	var str = '<div class="audioplay js_play flex" id="' + myID + '"><span class="playBtn"><div class="loadImg"></div></span><p class="flex1 playTit">' + dateTit + '</p><span class="playTime"></span></div>';
	that.after(str);
	audio = $("audio[videoid=" + audioId + "]")[0];
	if ($("audio[videoid=" + audioId + "]")[0].duration) {
	  $("#" + audioId).find(".playTime").text(timeToMinute($("audio[videoid=" + audioId + "]")[0].duration));
	};
	playFuc();
});

function playFuc() {
	$(".js_play").unbind("click").bind("click", function() {
	  var that = $(this);
	  var time,playStatus = true;
	  var _btn = $(this).find(".playBtn");
	  var audioId = $(this).attr("id");
	  $("audio").each(function () {
		$(this)[0].pause();
	  })
	  if(that.siblings().find(".playBtn").hasClass("paused")){
		that.siblings().find(".playBtn").removeClass("paused").addClass("playing");
	  };
	  if (_btn.hasClass("playing")) {
		$("audio[videoid=" + audioId + "]")[0].play();
		_btn.removeClass("playing").addClass("paused")
	  } else if (_btn.hasClass("paused")) {
		console.log('22');
		_btn.removeClass("paused").addClass("playing");
		$("audio[videoid=" + audioId + "]")[0].pause();
	  } else {
		_btn.addClass('loading');
		$("#" + audioId).find(".playTime").text('00:00');
		$("audio[videoid=" + audioId + "]")[0].play();
		time = setInterval(function() {
			if ($("audio[videoid=" + audioId + "]")[0].currentTime > 0 && playStatus) {
				_btn.removeClass("loading").addClass("paused");
				$("#" + audioId).find(".playTime").text(timeToMinute($("audio[videoid=" + audioId + "]")[0].currentTime));
				playStatus = false;
			} else if ($("audio[videoid=" + audioId + "]")[0].currentTime > 0 && !playStatus) {
				$("#" + audioId).find(".playTime").text(timeToMinute($("audio[videoid=" + audioId + "]")[0].currentTime));
			}
		}, 500)};
	});
};

function timeToMinute(times) {
	var t;
	if (times > -1) {
	  var min = Math.floor(times/60)%60;
	  var sec = times%60;
	  if (min < 10) {
		t = '0' + min + ":";
	  } else {
		t = min + ":";
	  };
	  if (sec < 10) {
		t += "0";
	  };
	  t += sec.toFixed(2);
	};
	t = t.substring(0, t.length - 3);
	return t;
};

/*投票
var openid = "";

if(isWeixin()){
   myAjax()
};
function myAjax(){
	$.ajax({
		 url:"//weiqing01.qingdaonews.com/app/index.php?i=124&c=entry&do=userinfo&logout=1&aid=2&m=gqc_api_userinfo",
		 dataType: "jsonp",
		 data:{'scope_type':'snsapi_base'},
		 type:"post",
		 success:function (res){
			if (res.code == -1) {
				window.location.href = res.url;
			} else if (res.code == 1) {
				console.log(res.userinfo);
			} else if (res.code == 0) {
				openid = res.userinfo.openid
				
			};
		 },
		 fail:function(er){
		   console.log(er);
		 }
	});
}
setTimeout(function(){
	$.ajax({
	 url:"//appnews.qingdaonews.com/xy/xyvote/xiangyuvote?aid="+ addID +"&openid=" + openid + "",
	 dataType: "jsonp",
	 type:"get",
	 jsonp: "callback",
	 jsonpCallback:"tp",
	 success:function (res){
		if(res.error_code == 0){
		   var obj = res.result.xiangyu_wap;
		   $("#voteBox").append(obj);
		   $("#voteBox").show();
		   var id = "";
		   var tpid = $("input[type='hidden']").val();
		   
		   if(isWeixin()){
			   if($(".voteResult").length > 0){
				   
			   }else{
				   
				   $(".voteLi").each(function(){
					   $(this).on("click",function(){
						   id = $(this).attr("data-id");
						   $(this).addClass("voteOn").siblings().removeClass("voteOn");
						   $(this).find("img").attr("src","//appnews.qingdaonews.com/assets/xy/news/img/radio_on.png");
						   $(this).siblings().find("img").attr("src","//appnews.qingdaonews.com/assets/xy/news/img/radio_off.png");
						   $(".voteBtn").addClass("voteOn")
					   })
				   })
				   
				   $(".voteBtn").on("click",function(){
					   if( id != ""){
							$.ajax({
								 url:"//appnews.qingdaonews.com/xy/xyvote/addxiangyuvote?voteid=" + tpid + "&voteitem=" + id + "&openid=" + openid + "",
								 dataType: "jsonp",
								 type:"get",
								 jsonp: "callback",
								 jsonpCallback:"tj",
								 success:function (res){
									 if(res.error_code == 0){
										 $("#voteBox").html("");
										 $("#voteBox").append(res.result.xiangyu_wap)
									 }else if(res.error_code == 4){
										 alert('您已经投过票了，无法重复投票');
										 $("#voteBox").html("");
										 $("#voteBox").append(res.result.xiangyu_wap)
									 }else{
										 alert(res.reason)
									 };
								 },
								 fail:function(er){
								   console.log(er);
								 }
							});
					  }
				  })
					
			   }
		   }else{
			   $(".voteBtn").css("width","3.6rem");
			   $(".voteBtn").text("进入客户端投票");
			   $(".voteBtn").addClass("js_appnewsDownBtn");
			   getInfo()
			};
		}else if(res.error_code == 5){
			var obj = res.result.xiangyu_wap;
		    $("#voteBox").append(obj);
			$("#voteBox").show();
		};
	 },
	 fail:function(er){;
	   console.log(er);
	 }
  });
}, 1000); */
