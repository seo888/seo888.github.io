var loading = $(".loading");
var listMore = $(".listMore");
var curP = "2";//页面已存在2页(初始化20条只随机显示10条)
var pagesize = "10";
var getUrl;

var commonList = $("#commonList");
var mycateid = commonList.attr("date-mycateid");
var mytype = commonList.attr("date-mytype");

var noScroll = false;

$(window).scroll(function(){
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();

	if(noScroll) return;
	
	if (scrollTop + windowHeight > scrollHeight - 130) {
		noScroll = true;
		
		listMore.hide();
		loading.show();
		curP++;
		
		if(mytype == "list")
		{getUrl = domainUrl + "/ajax/content/?page="+curP+"&pagesize="+pagesize+"&channel=wap&webmenuid="+mycateid;}
		if(mytype == "cate")
		{getUrl = domainUrl + "/ajax/list/?page="+curP+"&pagesize="+pagesize+"&id="+mycateid;}//+"&attribute=0"

		$.ajax({
			type : "GET", 
			async:false,
			url : getUrl,
			dataType : "jsonp",
			jsonp: "callback",
			success : function(data){ 
					var node = "";
					var pagenum = data.total / pagesize;//总页数
					
					if(curP < pagenum)
					{listMore.show();}
					else{
						listMore.hide();
						noScroll = true;
					}
		
					for(var i=0;i<data.data.length;i++){
						if(data.data[i].thumbs.length == "3"){
							node += '<li class="picThree"><a href="'+data.data[i].wapurl+'"><p>'+data.data[i].waptitle+'</p><div><div style="background: url('+data.data[i].thumbs[0].url+') no-repeat center; background-size: cover;"></div><div style="background: url('+data.data[i].thumbs[1].url+') no-repeat center; background-size: cover;"></div><div style="background: url('+data.data[i].thumbs[2].url+') no-repeat center; background-size: cover;"></div></div><span>'+geMyTime(data.data[i].published,4)+'</span></a></li>';
						}
						if(data.data[i].thumbs.length == "1"){
							if(data.data[i].thumb_ratio == "1"){
								node += '<li class="picOne"><a href="'+data.data[i].wapurl+'"><div class="right" style="background: url('+data.data[i].thumbs[0].url+') no-repeat center; background-size: cover;"></div><div class="left"><p>'+data.data[i].waptitle+'</p><span>'+geMyTime(data.data[i].published,4)+'</span></div></a></li>';
							}
							else if(data.data[i].thumb_ratio == "2"){
								node += '<li class="picOneBig"><a href="'+data.data[i].wapurl+'"><p>'+data.data[i].waptitle+'</p><div style="background: url('+data.data[i].thumbs[0].url+') no-repeat center; background-size: cover;"></div><span>'+geMyTime(data.data[i].published,4)+'</span></a></li>'
							}
						}
						else{
							node += '<li class="picNo"><a href="'+data.data[i].wapurl+'"><p>'+data.data[i].waptitle+'</p><span>'+geMyTime(data.data[i].published,4)+'</span></a></li>';
						}
					}
					commonList.append(node);
					loading.hide();
					noScroll = false;
			},
			 error: function(){
				 console.log('ajax error');
			 }
		});
	}
});