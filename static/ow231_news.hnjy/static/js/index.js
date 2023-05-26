$(document).ready(function(){
	var linkListItem = $(".link-list li");
    linkListItem.each(function () {
        $(this).hover(function () {
            $(".link-child-list", $(this)).show();
        }, function () {
            $(".link-child-list", $(this)).hide();
        })
    });

	/* 栏目tab切换 */
	$('.focus-news-head').find('span').delegate('','mouseenter',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass("active");

		var index = $(this).index();

		var bigDiv = $(this).parent().parent().parent();
		$(bigDiv).find('ul').hide();
		$($(bigDiv).find('ul')[index]).show();
		
	})



});




		/*** 排行 ***/
		function renderRankingChannelLists(siteId,channelId,pageSize,queryType, showId){
            var html="";
            var htmlimg="";
			$.ajax({
					type: "get",
					url: 'https://front-web.rednet.cn/content/sortList?siteId='+siteId+'&queryType='+queryType+'&pageSize='+pageSize+'&channelId='+channelId,
					dataType: "json",
					success: function(Result) {
                        var resLen = Result.length;
                           $.each(Result.data,function(i,item){

                                if(item.imgUrl43!=""){
                                htmlimg = item.imgUrl43;
                                }else if(item.imgUrl23!=""){
                                htmlimg = item.imgUrl23;

                                }else if(item.imgUrl34!=""){
                                htmlimg = item.imgUrl34;

                                }else if(item.imgUrl69!=""){
                                htmlimg = item.imgUrl69;
                                }
                                if(htmlimg=="" || htmlimg==undefined){
                                htmlimg = 'https://qx-img.rednet.cn/hnjy/images/logo.jpg';
                                }
                              html += '<li><a class="flex list_a" href="'+item.url+'" target="_parent" title="'+item.title+'">	<div class="left flex"><div class="title">';
                            if(i<3){
                            html += '<img src="/images/icon_ph_'+(i+1)+'.png">';
                            }else{
                            html +=i;
                            }
                            html += item.title+'</div></div><div class="right"><img src="'+htmlimg+'" class="" alt="'+item.title+'" lazy="loaded" style="opacity: 1;"></div></a></li>';
})
                        $("#"+showId+"").html(html);

					}
			});

		}




		/*** pc排行 ***/
		function renderRankingChannelLists_pc(siteId,channelId,pageSize,queryType, showId){
            var html="";
            var htmlimg="";
			$.ajax({
					type: "get",
					url: 'https://front-web.rednet.cn/content/sortList?siteId='+siteId+'&queryType='+queryType+'&pageSize='+pageSize+'&channelId='+channelId,
					dataType: "json",
					success: function(Result) {
                        var resLen = Result.length;
                           $.each(Result.data,function(i,item){

                                if(item.imgUrl43!=""){
                                htmlimg = item.imgUrl43;
                                }else if(item.imgUrl23!=""){
                                htmlimg = item.imgUrl23;

                                }else if(item.imgUrl34!=""){
                                htmlimg = item.imgUrl34;

                                }else if(item.imgUrl69!=""){
                                htmlimg = item.imgUrl69;
                                }
                                if(htmlimg=="" || htmlimg==undefined){
                                htmlimg = 'https://qx-img.rednet.cn/hnjy/images/logo.jpg';
                                }
                              html += '<li class="flex-middle"><a class="pic" href="'+item.url+'" target="_blank" title="'+item.title+'">';
                              html += '<span class="icon">'+(i+1)+'</span><img src="'+htmlimg+'" alt="'+item.title+'"></a>';
							  html += '<a class="title" href="'+item.url+'" target="_blank" title="'+item.title+'">'+item.title+'</a></li>';
})
                        $("#"+showId+"").html(html);

					}
			});

		}
