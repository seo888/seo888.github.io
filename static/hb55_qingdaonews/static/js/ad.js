var newsAdvertisement = {
	wapindex1:{
		'name':'触屏首页顶部 W-H-01',
		'array':[
			{
				'url':'http://vote1.qingdaonews.com/branch/house/202011/zpAcross/wap1First.php?src=gg',
				'src':'http://vip.qingdaonews.com/news/adv/images/20201103.jpg',
				'startTime':new Date('2020/11/04 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/11/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	wapindex2:{
		'name':'触屏首页社区上 W-H-02',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/W-H-0220200930.jpg',
				'startTime':new Date('2020/10/01 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/08 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	wapindex3:{
		'name':'触屏首页房产上 W-H-03',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/W-H-0320200930.jpg',
				'startTime':new Date('2020/09/30 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	wapindex4:{
		'name':'触屏首页底部 W-H-04',
		'array':[
			{
				'url':'javascript:;',
				'src':'',
				'startTime':new Date().getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date().getTime(),
			},
		],
		'tag':'广告',
	},
	wapdetail1:{
		'name':'触屏文章页顶部 W-B-01',
		'array':[
			{
				'url':'http://vote1.qingdaonews.com/branch/house/202011/zpAcross/wap1First.php?src=gg',
				'src':'http://vip.qingdaonews.com/news/adv/images/20201103.jpg',
				'startTime':new Date('2020/11/04 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/11/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	wapdetail2:{
		'name':'触屏文章页正文下1 W-B-02',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/W-B-0220200930.jpg',
				'startTime':new Date('2020/09/30 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	wapdetail3:{
		'name':'触屏文章页正文下2 W-B-03',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/W-B-0320200930.jpg',
				'startTime':new Date('2020/09/30 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	clubindex1:{
		'name':'社区触屏版首页顶部 C-H-01',
		'array':[
			{
				'url':'http://vote1.qingdaonews.com/branch/house/202011/zpAcross/wap1First.php?src=gg',
				'src':'http://vip.qingdaonews.com/news/adv/images/20201103.jpg',
				'startTime':new Date('2020/11/04 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/11/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	clubdetail1:{
		'name':'社区触屏版详情页顶部 C-B-01',
		'array':[
			{
				'url':'http://vote1.qingdaonews.com/branch/house/202011/zpAcross/wap1First.php?src=gg',
				'src':'http://vip.qingdaonews.com/news/adv/images/20201103.jpg',
				'startTime':new Date('2020/11/04 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/11/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	clubdetail2:{
		'name':'社区触屏版详情页正文下1 C-B-02',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/C-B-0220200930.jpg',
				'startTime':new Date('2020/09/30 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
	clubdetail3:{
		'name':'社区触屏版详情页正文下2 C-B-03',
		'array':[
			{
				'url':'',
				'src':'http://vip.qingdaonews.com/news/adv/images/C-B-0320200930.jpg',
				'startTime':new Date('2020/09/30 00:00:00').getTime(), //格式 yyyy/mm/dd hh:mm:ss
				'endTime':new Date('2020/10/12 00:00:00').getTime(),
			},
		],
		'tag':'广告',
	},
}

var indexUrl = window.location.href
var myDataTime = new Date().getTime()

/* 触屏首页 */
if(indexUrl.indexOf("wap.qingdaonews.com") != -1 && indexUrl.indexOf("/content_") == -1){
	for (var i = 0; i < newsAdvertisement['wapindex1']['array'].length; i++) {
		if(newsAdvertisement['wapindex1']['array'][i]['src'] != '' && newsAdvertisement['wapindex1']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapindex1']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad1" href="'+ newsAdvertisement['wapindex1']['array'][i]['url'] +'" style="width:100%;display:block;position: relative;margin:0 auto"><span style="width:36px;display:block;height:20px;line-height:20px;text-align:center;font-size:10px;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapindex1']['tag'] +'</span><img src="'+ newsAdvertisement['wapindex1']['array'][i]['src'] +'" width="100%"></a>'
			$("#div_main").before(newsAdDiv)
		}
	}
	for (var i = 0; i < newsAdvertisement['wapindex2']['array'].length; i++) {
		if(newsAdvertisement['wapindex2']['array'][i]['src'] != '' && newsAdvertisement['wapindex2']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapindex2']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad2" href="'+ newsAdvertisement['wapindex2']['array'][i]['url'] +'" style="width:100%;display:block;position: relative;margin:0 auto"><span style="width:36px;display:block;height:20px;line-height:20px;text-align:center;font-size:10px;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapindex2']['tag'] +'</span><img src="'+ newsAdvertisement['wapindex2']['array'][i]['src'] +'" width="100%"></a>'
			$("#div_club").before(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['wapindex3']['array'].length; i++) {
		if(newsAdvertisement['wapindex3']['array'][i]['src'] != '' && newsAdvertisement['wapindex3']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapindex3']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad3" href="'+ newsAdvertisement['wapindex3']['array'][i]['url'] +'" style="width:100%;display:block;position: relative;margin:0 auto"><span style="width:36px;display:block;height:20px;line-height:20px;text-align:center;font-size:10px;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapindex3']['tag'] +'</span><img src="'+ newsAdvertisement['wapindex3']['array'][i]['src'] +'" width="100%"></a>'
			$("#div_house").before(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['wapindex4']['array'].length; i++) {
		if(newsAdvertisement['wapindex4']['array'][i]['src'] != '' && newsAdvertisement['wapindex4']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapindex4']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad4" href="'+ newsAdvertisement['wapindex4']['array'][i]['url'] +'" style="width:100%;display:block;position: relative;margin:0 auto"><span style="width:36px;display:block;height:20px;line-height:20px;text-align:center;font-size:10px;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapindex4']['tag'] +'</span><img src="'+ newsAdvertisement['wapindex4']['array'][i]['src'] +'" width="100%"></a>'
			$("#div_dazhe").after(newsAdDiv)
		}
	}
}

/* 文章详情页 */
if(indexUrl.indexOf("/content_") != -1){
	for (var i = 0; i < newsAdvertisement['wapdetail1']['array'].length; i++) {
		if(newsAdvertisement['wapdetail1']['array'][i]['src'] != '' && newsAdvertisement['wapdetail1']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapdetail1']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad1" href="'+ newsAdvertisement['wapdetail1']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapdetail1']['tag'] +'</span><img src="'+ newsAdvertisement['wapdetail1']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".download:first").before(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['wapdetail2']['array'].length; i++) {
		if(newsAdvertisement['wapdetail2']['array'][i]['src'] != '' && newsAdvertisement['wapdetail2']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapdetail2']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad2" href="'+ newsAdvertisement['wapdetail2']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0.12rem auto 0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapdetail2']['tag'] +'</span><img src="'+ newsAdvertisement['wapdetail2']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".content:first").after(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['wapdetail3']['array'].length; i++) {
		if(newsAdvertisement['wapdetail3']['array'][i]['src'] != '' && newsAdvertisement['wapdetail3']['array'][i]['endTime'] > myDataTime && newsAdvertisement['wapdetail3']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a id="ad3" href="'+ newsAdvertisement['wapdetail3']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0.12rem auto 0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['wapdetail3']['tag'] +'</span><img src="'+ newsAdvertisement['wapdetail3']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".content_head:first").before(newsAdDiv)
		}
	}
}

/* 社区首页 */
if(indexUrl.indexOf("club.qingdaonews.com/touch/list") != -1){
	for (var i = 0; i < newsAdvertisement['clubindex1']['array'].length; i++) {
		if(newsAdvertisement['clubindex1']['array'][i]['src'] != '' && newsAdvertisement['clubindex1']['array'][i]['endTime'] > myDataTime && newsAdvertisement['clubindex1']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a href="'+ newsAdvertisement['clubindex1']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['clubindex1']['tag'] +'</span><img src="'+ newsAdvertisement['clubindex1']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".header").before(newsAdDiv)
		}
	}
}

/* 社区详情页 */
if(indexUrl.indexOf("club.qingdaonews.com/touch/show") != -1){
	for (var i = 0; i < newsAdvertisement['clubdetail1']['array'].length; i++) {
		if(newsAdvertisement['clubdetail1']['array'][i]['src'] != '' && newsAdvertisement['clubdetail1']['array'][i]['endTime'] > myDataTime && newsAdvertisement['clubdetail1']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a href="'+ newsAdvertisement['wapdetail1']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['clubdetail1']['tag'] +'</span><img src="'+ newsAdvertisement['clubdetail1']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".header").before(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['clubdetail2']['array'].length; i++) {
		if(newsAdvertisement['clubdetail2']['array'][i]['src'] != '' && newsAdvertisement['clubdetail2']['array'][i]['endTime'] > myDataTime && newsAdvertisement['clubdetail2']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a href="'+ newsAdvertisement['clubdetail2']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0.28rem auto 0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['clubdetail2']['tag'] +'</span><img src="'+ newsAdvertisement['clubdetail2']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".main").after(newsAdDiv)
		}
	}

	for (var i = 0; i < newsAdvertisement['clubdetail3']['array'].length; i++) {
		if(newsAdvertisement['clubdetail3']['array'][i]['src'] != '' && newsAdvertisement['clubdetail3']['array'][i]['endTime'] > myDataTime && newsAdvertisement['clubdetail3']['array'][i]['startTime'] < myDataTime){
			var newsAdDiv = '<a href="'+ newsAdvertisement['clubdetail3']['array'][i]['url'] +'" style="width:100%;display:block;position:relative;margin:0.28rem auto 0 auto"><span style="width:0.8rem;display:block;height:0.4rem;line-height:0.4rem;text-align:center;font-size:0.22rem;color:#fff;background:rgba(0,0,0,0.2);position:absolute;bottom:0;left:0">'+ newsAdvertisement['clubdetail3']['tag'] +'</span><img src="'+ newsAdvertisement['clubdetail3']['array'][i]['src'] +'" style="width:100%;height:auto;display:block"></a>'
			$(".replyList").before(newsAdDiv)
		}
	}
}
