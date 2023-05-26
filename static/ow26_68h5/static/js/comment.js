TJSite = '//tj.68h5.com/';
var data = {
	add:{"type":"get","tip":"1","url":TJSite+"ajax_comment/?s=save&jsoncallback=?"},
	get:{"type":"get","tip":"0","url":TJSite+"ajax_comment/?s=commentlist&type={type}&id={id}&page={page}&jsoncallback=?"},
	dig:{"type":"get","tip":"1","url":TJSite+"ajax_comment/?s=dig&id={sid}&jsoncallback=?"},
	bad:{"type":"get","tip":"1","url":TJSite+"ajax_comment/?s=bad&id={sid}&jsoncallback=?"},
	val:{"id":"#objID","pid":"#glPID","type":"#objType","user":"#userName","text":"#cmtMsg"},
	res:{"show":".reping","upval":".reping #glPID"},
	obj:{"list":"#comment-list","listre":"#relist","more":"#loadmore","morestr":"正在加载..","arr":"items","rearr":"Re"},
	set:{"txt":"#cmtMsg","btn":"#subCmt"},
	hta:"<div class='item' id='Q{ID}'><p class='st1'><em>{Index}楼</em><span>{User}</span><i>{Time}</i></p><p class='st2 itembt'><a href='javascript:;' class='s' data-click='Qdig' data-var='{ID}'>支持({Good})</a><a href='javascript:;' class='a' data-click='Qbad' data-var='{ID}'>反对({Bad})</a><a href='javascript:;' class='glBtn' data-click='Qres' data-var='{Index}' data-vars='{ID}'>回复</a></p><div class='clear'></div><p class='st3'><span>{Content}</span></p><div id='relist'>$ReData$</div></div>",
	htr:"<div class='st4'><i></i><p>{Type}回复：<br>{Content}</p><u>回复者：{User}&nbsp;&nbsp;{Time}</u></div>",
	nta:"<div class='item' id='Qtop'><p class='st1'><em>顶楼</em><span>{User}</span><i>{Time}</i></p><div class='clear'></div><p class='st3'><span>{Content}</span></p></div>",
	ntr:"<div class='st4'><i></i><p>回复：<br>{Content}</p><u>{Time}</u></div>"
},errMsg = {
	r100: '获取配置json失败',
	r101: '配置json格式错误',
	r102: '获取配置json.val错误',
	d100: '{name}格式不正确',
	g100: '提交请求出错',
	g101: '获取请求出错',
	g102: 'dig请求出错',
	g103: 'bad请求出错'
};
obj = $('#comment');
data.id = $('#objID').val();
data.type = $('#objType').val();
getJsonData();
setHtmlAjax();
setHtmlClick();
if($('.newplun').length > 0){
	var pltop = $('#comment').offset().top;
	$('.newplun').click(function(){
		$('body,html').animate({scrollTop:pltop},300);
	});
}

function setHtmlAjax() {
	if (typeof (data.set) === 'undefined') {
		return false;
	}
	obj.find(data.set.btn).click(function () {
		getHtmlVal();
		return false;
	});
}

function getHtmlVal() {
	if (typeof (data.val) === 'undefined') {
		qAlert(errMsg.r102);
		return false;
	}
	var valArr = {};
	for (var mycars in data.val) {
		if (data.val.hasOwnProperty(mycars)) {
			var vData = obj.find(data.val[mycars]);
			var vValAlt = vData.attr('val-alt') || '';
			var vMinLen = vData.attr('min-len') || 0;
			var vMaxLen = vData.attr('max-len') || 0;
			var vMsgStr = vValAlt !== '' ? vValAlt : errMsg.d100.replace('{name}', mycars);
			if (vMinLen === '*' && vData.val().length === 0) {
				qAlert(vMsgStr);
				return false;
			}
			if (vMinLen !== 0 && vData.val().length < vMinLen) {
				qAlert(vMsgStr);
				return false;
			}
			if (vMaxLen !== 0 && vData.val().length > vMaxLen) {
				qAlert(vMsgStr);
				return false;
			}
			valArr[mycars] = escape(vData.val());
		}
	}
	getHtmlAjax(valArr);
}

function getHtmlAjax(valArr) {
	var getUrl = data.add.url;
	var theBtn = obj.find(data.set.btn);
	if (getUrl !== '') {
		getUrl = getUrl.replace('{sid}', data.id);
		$.ajax({
			url: getUrl,
			type: 'get',
			dataType: 'jsonp',
			data: valArr,
			beforeSend: function () {
				theBtn.attr('disabled', 'disabled');
			},
			error: function () {
				if (data.add.tip === '1') {
					qAlert(errMsg.g100);
				}
				theBtn.removeAttr('disabled');
			},
			success: function (jsondb) {
				if (jsondb.success === 'err') {
					qAlert(jsondb.msg);
				}
				else {
					var dataTmp = typeof (data.tmp) !== 'undefined' ? 1 : 0;
					var dataNta = data.nta;
					var dataNtr = data.ntr;
					var isretext = obj.find(data.res.upval).val();
					obj.find(data.val.text).val('');
					if (jsondb.msg !== '') {
						qAlert(jsondb.msg);
					}
					if (isretext === '0') {
						var newData = tempView(dataNta, jsondb);
						obj.find(data.obj.list).prepend(newData);
						var addElem = obj.find(data.obj.list).find('#Qtop');
						$('html,body').animate({scrollTop:addElem.offset().top-50},400);
					}
					else {
						var addData = tempView(dataNtr, jsondb);
						var addElem = obj.find(data.obj.list).find('#Q' + isretext);
						addElem.find(data.obj.listre).append(addData);
						$('html,body').animate({scrollTop:addElem.offset().top},400);
					}
				}
				theBtn.removeAttr('disabled');
			}
		});
	}
}

function getJsonData(page){
	page = page || 1;
	var getUrl = data.get.url;
	var iMore = obj.find(data.obj.more);
	if (getUrl !== '') {
		getUrl = getUrl.replace('{id}', data.id).replace('{page}', page).replace('{type}', data.type);
        iMore.attr('more-txt', iMore.html()).html(data.obj.morestr);
		$.ajax({
			url: getUrl,
			type: 'get',
			dataType: 'jsonp',
			error: function () {
				if (data.get.tip === '1') {
					qAlert(errMsg.g101);
				}
				iMore.html('获取失败');
			},
			success: function (jsondb) {
				if (jsondb.state === 'err') {
					qAlert(jsondb.msg);
				}
				else {
					if (typeof (jsondb[data.obj.arr]) !== 'undefined') {
						var arrData = jsondb[data.obj.arr];
						var arrLength = arrData.length;
						if (arrLength > 0) {
							var dataTmp = typeof (data.tmp) !== 'undefined' ? 1 : 0;
							var dataHta = data.hta;
							var dataHtr = data.htr;
							var dataList = '';
							if (typeof (data.obj.arrs) !== 'undefined') {
								arrData = randomArray(arrData);
							}
							if (!isNaN(data.obj.arrn)) {
								arrLength = data.obj.arrn >= arrLength ? arrLength : data.obj.arrn;
							}
							for (var i = 0; i < arrLength; i++) {
								var thisdata = tempView(dataHta, arrData[i]);
								if (thisdata.indexOf('$ReData$') > 0 && data.obj.rearr !== '') {
									var redata = '';
									var rearrLen = arrData[i][data.obj.rearr].length;
									if (typeof (data.obj.rearrs) !== 'undefined') {
										arrData[i][data.obj.rearr] = randomArray(arrData[i][data.obj.rearr]);
									}
									if (!isNaN(data.obj.rearrn)) {
										rearrLen = data.obj.rearrn >= rearrLen ? rearrLen : data.obj.rearrn;
									}
									for (var ir = 0; ir < rearrLen; ir++) {
										redata += tempView(dataHtr, arrData[i][data.obj.rearr][ir]);
									}
									thisdata = thisdata.replace('$ReData$', redata);
								}
								dataList += thisdata;
							}
							if(page == 1){
								obj.find(data.obj.list).html(dataList);
								if($('.g-info-tab').length > 0){
									$('.g-info-tab li').last().find('strong').append('<em>(<font color=red>'+jsondb.count+'</font>)</em>');
								}
							}else{
								obj.find(data.obj.list).append(dataList);
							}
						}
					}
					if (typeof (jsondb.size) !== 'undefined'
					&& typeof (jsondb.page) !== 'undefined'
					&& data.obj.more !== '') {
						var iText = iMore.attr('more-txt') || '';
						var iSize = jsondb.size;
						var iPage = jsondb.page;
						if (iSize > iPage) {
							if (iText !== '') {
								iMore.html(iText);
							}
							iMore.show();
							iMore.attr('onclick', 'getJsonData(' + (iPage + 1) + ');');
						}
						else {
							iMore.remove();
						}
					}
					else {
						iMore.remove();
					}
				}
			}
		});
	}
}

function setHtmlClick() {
	obj.on('click','[data-click=Qres]',function(){
		var str = $(this).attr('data-var');
		var strs = $(this).attr('data-vars');
		obj.find(data.res.show).show().find('em').text(str);
		obj.find(data.res.upval).val(strs);
		$('html,body').animate({scrollTop:obj.find(data.set.txt).offset().top},400);
		var QresOut = setTimeout(function () {
			obj.find(data.set.txt).focus();
			clearTimeout(QresOut);
		}, 200);
	});
	$('.reping i').click(function(){
		obj.find(data.res.show).hide().find('em').text(0);
		obj.find(data.res.upval).val(0);
		var QrehOut = setTimeout(function () {
			obj.find(data.set.txt).blur();
			clearTimeout(QrehOut);
		}, 200);
	});
	obj.on('click','[data-click=Qdig]',function(){
		var the = $(this);
		var str = the.attr('data-var');
		var getUrl = data.dig.url;
		if (getUrl !== '') {
			getUrl = getUrl.replace('{sid}', str);
			$.ajax({
				url: getUrl,
				type: 'get',
				dataType: 'jsonp',
				error: function () {
					if (data.dig.tip === '1') {
						qAlert(errMsg.g102);
					}
				},
				success: function (jsondb) {
					if (jsondb.success === 'err') {
						if (data.dig.tip === '1') {
							qAlert(jsondb.msg);
						}
					}
					else {
						if (data.dig.tip === '1') {
							the.prepend('<span class="ding">+1</span');
							the.find(".ding").animate({right:'-12px',top:'-22px',opacity:0,display:'none'},800, function () {
								$(this).remove();
							});
							the.find('em').text(jsondb.dig);
						}
					}
					the.removeAttr('data-click');
				}
			});
		}
	});
	obj.on('click','[data-click=Qbad]',function(){
		var the = $(this);
		var str = the.attr('data-var');
		var getUrl = data.bad.url;
		if (getUrl !== '') {
			getUrl = getUrl.replace('{sid}', str);
			$.ajax({
				url: getUrl,
				type: 'get',
				dataType: 'jsonp',
				error: function () {
					if (data.bad.tip === '1') {
						qAlert(errMsg.g103);
					}
				},
				success: function (jsondb) {
					if (jsondb.success === 'err') {
						if (data.bad.tip === '1') {
							qAlert(jsondb.msg);
						}
					}
					else {
						if (data.bad.tip === '1') {
							the.prepend('<span class="cai">+1</span>');
							the.find(".cai").animate({right:'-12px',top:'-22px',opacity:0,display:'none'},800, function () {
								$(this).remove();
							});
							the.find('em').text(jsondb.bad);
						}
					}
					the.removeAttr('data-click');
				}
			});
		}
	});
}

function qAlert(msg, ms) {
	ms = ms || 1600;
	if ($('.alert').length > 0) {
		$('.alert').remove();
	}
	$('body').append('<div class="alert">' + msg + '</div>');
	var msgOut = setTimeout(function () {
		$('.alert').fadeOut(100, function () {
			$(this).remove();
		});
		clearTimeout(msgOut);
	}, ms);
}

function tempView(str, arr) {
	var sArr = str.match(/{\w+}/gi);
	if (sArr) {
		for (var i = 0; i < sArr.length; i++) {
			var sQrr = sArr[i].match(/{(\w+)}/i);
			str = str.replace(sArr[i], arr[sQrr[1]]);
		}
	}
	return str;
}