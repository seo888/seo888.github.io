(function () {
	if($("#swiper1").length>0){
	var mySwiper1 = new Swiper('#swiper1', {
		pagination: '.swiper-pagination-1',
		paginationClickable: true,
		loop: true
	});
	
	$(function () {
		$('.swiper1-button-next').click(function () {
			mySwiper1.swipeNext();
		});
		$('.swiper1-button-prev').click(function () {
			mySwiper1.swipePrev();
		});

		setInterval(function () {
			mySwiper1.swipeNext && mySwiper1.swipeNext()
		}, 2000);
		
		if($('.side-nav').length>0){//加个id判断是否存在，存在则执行
			$('.side-nav li').on('mouseover', function () {
				$('.side-nav li').removeClass('active');
				$(this).addClass('active');
				var index = $(this).index();
				$(".news-list").hide();
				if ($('#div_currNewsListByChannelList_' + (index - 1)).length > 0) {
					$('#div_currNewsListByChannelList_' + (index - 1)).show();
				} else {
					getChannelDataById($(this).attr("channelid"), index - 1)
				}

			})
			getChannelDataById($('.side-nav li').eq(0).attr("channelid"))
		}
	});
	}

	function getChannelDataById(id, index) {
		$("ul.recommend-nav .loading").show();
		$.ajax({
			type: "get",
			contentType: 'text/plain',
			url: APIURL + "/content/list/channel?channelId=" + id + "&pageSize=10",
			dataType: 'text',
			success: function (resp) {
				$("ul.recommend-nav .loading").hide();
				var data = $.parseJSON(resp)
				var html = ['<div id="div_currNewsListByChannelList_' + index + '" class="news-list">']
				for (var i = 0, n = data.length; i < n; i++) {
					var covers = data[i].contentCovers;
					if (covers && covers.length > 0) {
						var flag = false;
						for (var j = 0, k = covers.length; j < k; j++) {
							if (covers[j].ratio == '3:2') {
								flag = true;
								html.push('<li><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank">');
								if(covers[j].urlCloud.indexOf("https://img.rednet.cn") > -1){
									html.push('<img border="0" src="' + covers[j].urlCloud + '/220" alt="' + data[i].title + '"></a>');
								}else{
									html.push('<img border="0" src="' + covers[j].urlCloud + '" alt="' + data[i].title + '"></a>');
								}
								
								html.push('<h3><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank">' + data[i].title + '</a></h3>');
								html.push('<p><span class="source">' + siteName + '</span>' + data[i].publishTimeStr + '</p>');
								break;
							}
						}
						if(!flag){
								html.push('<li class="noPic"><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank"></a>')
								html.push('<h3><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank">' + data[i].title + '</a></h3>');
								html.push('<p><span class="source">' + siteName + '</span>' + data[i].publishTimeStr + '</p>');
						}
					} else {
						html.push('<li  class="noPic"><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank"></a>')
						html.push('<h3><a href="' + data[i].contentUrl + '" title="' + data[i].title + '" target="_blank">' + data[i].title + '</a></h3>');
						html.push('<p><span class="source">' + siteName + '</span>' + data[i].publishTimeStr + '</p>');
					}
				}
				html.push('</div>');
				$("#div_newsListBychannel").append(html.join(""));
			}
		});
	}

var APIURL = (window.location.href.indexOf("172.16.6.2") > 0 ? "//172.16.6.49:8080" : "https://front-web.rednet.cn");

	function visitLog() {
		$.ajax({
			type: "post",
			contentType: "application/json; charset=utf-8",
			url: APIURL + "/content/visit/",
			data: JSON.stringify({
				contentId: contentId,
				channelId: channelId,
				siteId: siteId,
				terminal: '1',
				url: window.location.href
			}),
			dataType: 'json',
			success: function (resp) {

			}
		});
	}

	visitLog();
})();