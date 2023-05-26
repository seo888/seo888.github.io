
//html内黏贴visitConfig并配置domain,fullUrl
//var visitConfig = {
//			api : {
//				test : '',
//				official  : '',
//				domain : '',
//				fullUrl: ''
//			}
//};
//在任意html中嵌入该js，会显示在id = visitConfig.showId 的节点中
function handler(json) {

	if(document.getElementById(visitConfig.api.showId) !== null)

		document.getElementById(visitConfig.api.showId).innerHTML += '&nbsp;&nbsp;&nbsp;访问量：' +  json.data.count;
		
	else if(window.parent !== window.self&&window.parent.document.getElementById(visitConfig.api.showId) !== null)
		window.parent.document.getElementById(visitConfig.api.showId).innerHTML +=  '&nbsp;&nbsp;&nbsp;访问量：' + json.data.count;
	/*else
		document.getElementById('bottom').innerHTML += '&nbsp;&nbsp;&nbsp;访问量：' +  json.data.count;*/

	//测试显示，正式环境全部注解以下
	//var newEl = document.createElement("h1");
	//newEl.innerHTML = 'title :  ' + json.data.title;
	//document.body.appendChild(newEl);
	//newEl = document.createElement("h2");
	//newEl.innerHTML = 'total count :' + json.data.count;
	//document.body.appendChild(newEl);
	//newEl = document.createElement("a");
	//newEl.href = json.data.url;
	//newEl.innerHTML = json.data.url;
	//document.body.appendChild(newEl);
}

!function () {
	//if(window.name!=""){
		
	
		initDate();
		var tmp = ''
			if(visitConfig.api.use == 'test')
				tmp = visitConfig.api.test;
			else
				tmp = visitConfig.api.official;
			if(visitConfig.url.indexOf(".shtml")>-1){
				$.ajax({
					url : tmp,//"/u/solicitation/ajaxToplist/"+code+"?ajax",
					type : "POST",
					data : {
						"url":visitConfig.url,
						"title":window.top.document.title,
						"browserType":navigator.appName,
						"clientType":navigator.userAgent,
						"websiteCode":visitConfig.websiteCode,
						"channelCode":visitConfig.channelCode,
						"manuscriptId":visitConfig.manuscriptId,
						"referrer":visitConfig.referrer
					},
				//	dataType : "json",
					dataType : "jsonp",
					jsonp : "callback",
					jsonpCallback : "handler",
					beforeSend: function(){
						
					},
					success : function(json) {
						if (!jQuery.isEmptyObject(json)){
							if(document.getElementById(visitConfig.api.showId) !== null)

								document.getElementById(visitConfig.api.showId).innerHTML += '&nbsp;&nbsp;&nbsp;访问量：' +  json.data.count;
								
							else if(window.parent !== window.self&&window.parent.document.getElementById(visitConfig.api.showId) !== null)
								window.parent.document.getElementById(visitConfig.api.showId).innerHTML +=  '&nbsp;&nbsp;&nbsp;访问量：' + json.data.count;
							
							if (document.getElementById(visitConfig.api.sitecount) !== null){
									document.getElementById(visitConfig.api.sitecount).innerHTML += '&nbsp;&nbsp;&nbsp;访问量：' +  json.sitecount;
								}else if(window.parent !== window.self&&window.parent.document.getElementById(visitConfig.api.sitecount) !== null){
									
									document.getElementById(visitConfig.api.sitecount).innerHTML += '&nbsp;&nbsp;&nbsp;访问量：' +  json.sitecount;
								}

						}
						
					}
					
				});
			}
		
	//}
}
();

function initDate(){
	
	visitConfig.websiteCode = '';
	visitConfig.channelCode = '';
	visitConfig.manuscriptId = '';
	visitConfig.referrer = '';
	if(window.parent !== window.self)
		visitConfig.referrer = window.parent.document.referrer;
	else 
		visitConfig.referrer = document.referrer;
		
	if(window.top.location.href.indexOf('?')!==-1)
		visitConfig.url = window.top.location.href.split('?')[0];
	else
		visitConfig.url = window.top.location.href;
	visitConfig.url = window.top.location.href;

	if(window.top.location.href == visitConfig.api.domain){
		visitConfig.url = visitConfig.api.fullUrl;
	}
	if(window.top.location.host==''){
		return;

	}
	var array = visitConfig.url.split('/');

	if(array.length>=5)
		visitConfig.websiteCode = array[3];
	if(array.length>=6)
		visitConfig.channelCode =  array[4];
	if(array.length>=7)
		visitConfig.manuscriptId = array[6].split('.')[0];
}
