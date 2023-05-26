/*
	[DESTOON B2B System] Copyright (c) 2008-2020 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
function Print(i) {if(isIE) {window.print();} else {var i = i ? i : 'content'; var w = window.open('','',''); w.opener = null; w.document.write('<div style="width:630px;">'+Dd(i).innerHTML+'</div>'); w.window.print();}}
function addFav(t) {document.write('<a href="'+window.location.href+'" title="'+document.title.replace(/<|>|'|"|&/g, '')+'" rel="sidebar" onclick="if(UA.indexOf(\'chrome\') != -1){alert(\''+L['chrome_fav_tip']+'\');return false;}window.external.addFavorite(this.href, this.title);return false;">'+t+'</a>');}
function Dfavor(mid, itemid) {
	if($('.favorite').html() == L['favorited']) return;
	$.post(AJPath, 'action=favorite&mid='+mid+'&itemid='+itemid, function(data) {
		if(data) {
			if(data == 'ok') {
				$('.favorite').html(L['favorited']);
			} else {
				Dtoast(data);
			}
		}
	});
}
function Dreport(mid, tid, rid, c) {
	var c = c ? c : ($('#title').length > 0 ? $('#title').html() : document.title)+'\n'+window.location.href;
	var htm = '<form method="post" action="'+DTPath+'api/report.php" id="dreport">';
	htm += '<input type="hidden" name="forward" value="'+window.location.href+'"/>';
	htm += '<input type="hidden" name="mid" value="'+mid+'"/>';
	htm += '<input type="hidden" name="itemid" value="'+tid+'"/>';
	htm += '<input type="hidden" name="rid" value="'+rid+'"/>';
	htm += '<textarea style="display:none;" name="content">'+c+'</textarea>';
	htm += '</form>';
	$('#destoon_space').html(htm);
	Dd('dreport').submit();
}
function Dlike(mid, tid, rid) {
	$.post(AJPath, 'action=like&mid='+mid+'&itemid='+tid+'&rid='+rid, function(data) {
		if(data) {
			if(data == 'ok') {
				var num = parseInt($('#like-'+mid+'-'+tid+'-'+rid).html());
				$('#like-'+mid+'-'+tid+'-'+rid).html(++num);
			} else {
				Dtoast(data);
			}
		}
	});
}
function Dhate(mid, tid, rid) {
	$.post(AJPath, 'action=like&job=hate&mid='+mid+'&itemid='+tid+'&rid='+rid, function(data) {
		if(data) {
			if(data == 'ok') {
				var num = parseInt($('#hate-'+mid+'-'+tid+'-'+rid).html());
				$('#hate-'+mid+'-'+tid+'-'+rid).html(++num);
			} else {
				Dtoast(data);
			}
		}
	});
}
function Dsearch(i) {
	if(Dd('destoon_kw').value.length < 1 || Dd('destoon_kw').value == L['keyword_message']) {
		Dd('destoon_kw').value = '';window.setTimeout(function(){Dd('destoon_kw').value = L['keyword_message'];}, 500);
		return false;
	}
	if(i && Dd('destoon_search').action.indexOf('/api/') == -1) {$('#destoon_moduleid').remove();$('#destoon_spread').remove();}
	return true;
}
function Dtoast(msg, fid, time) {
	var time = time ? time : 2;
	var fid = fid ? fid : '';
	if($('.ui-toast').length) {
		$('.ui-toast').html(msg);
	} else {
		$('body').append('<div class="ui-toast">'+msg+'</div>');
	}
	var w = $('.ui-toast').width();
	if(w < 14) w = msg.length*14;
	$('.ui-toast').css('left', $(document).scrollLeft()+(document.body.clientWidth-w)/2 - 16);
	$('.ui-toast').fadeIn('fast', function() {
		setTimeout(function() {
			$('.ui-toast').fadeOut('slow', function() {
				if(fid) $('#'+fid).focus();
			});
		}, time*1000);
	});
}
function Dsearch_adv() {Go(Dd('destoon_search').action.indexOf('/api/') != -1 ? DTPath+'api/search.php?moduleid='+Dd('destoon_moduleid').value : Dd('destoon_search').action);}
function Dsearch_top() {if(Dsearch(0)){Dd('destoon_search').action = DTPath+'api/search.php';Dd('destoon_spread').value=1;Dd('destoon_search').submit();}}
function View(s) {window.open(DTPath+'api/view.php?img='+s);}
function setModule(i, n) {Dd('destoon_search').action = DTPath+'api/search.php';Dd('destoon_moduleid').value = i;searchid = i;Dd('destoon_select').value = n;$('#search_module').fadeOut('fast');Dd('destoon_kw').focus();}
function setTip(w) {Dh('search_tips'); Dd('destoon_kw').value = w; Dd('destoon_search').submit();}
var tip_word = '';
function STip(w) {
	if(w.length < 2) {Dd('search_tips').innerHTML = ''; Dh('search_tips'); return;}
	if(w == tip_word) {return;} else {tip_word = w;}
	$.post(AJPath, 'action=tipword&mid='+searchid+'&word='+w, function(data) {
		if(data) {
			Ds('search_tips'); Dd('search_tips').innerHTML = data + '<label onclick="Dh(\'search_tips\');">'+L['search_tips_close']+'&nbsp;&nbsp;</label>';
		} else {
			Dd('search_tips').innerHTML = ''; Dh('search_tips');
		}
	});
}
function SCTip(k) {
	var o = Dd('search_tips');
	if(o.style.display == 'none') {
		if(o.innerHTML != '') Ds('search_tips');
	} else {
		if(k == 13) {Dd('destoon_search').submit(); return;}
		Dd('destoon_kw').blur();
		var d = o.getElementsByTagName('div'); var l = d.length; var n, p; var c = w = -2;
		for(var i=0; i<l; i++) {if(d[i].className == 'search_t_div_2') c = i;}
		if(c == -2) {
			n = 0; p = l-1;
		} else if(c == 0) {
			n = 1; p = -1;
		} else if(c == l-1) {
			n = -1; p = l-2; 
		} else {
			n = c+1; p = c-1;
		}
		w = k == 38 ? p : n;
		if(c >= 0) d[c].className = 'search_t_div_1';
		if(w >= 0) d[w].className = 'search_t_div_2';
		if(w >= 0) {var r = d[w].innerHTML.split('>'); Dd('destoon_kw').value = r[2];} else {Dd('destoon_kw').value = tip_word;}
	}
}
function user_login() {
	if(Dd('user_name').value.length < 2) {Dd('user_name').focus(); return false;}
	if(Dd('user_pass').value == 'password' || Dd('user_pass').value.length < 6) {Dd('user_pass').focus(); return false;}
}
function show_answer(u, i) {document.write('<iframe src="'+u+'answer.php?itemid='+i+'" name="destoon_answer" id="des'+'toon_answer" style="width:100%;height:0px;" scrolling="no" frameborder="0"></iframe>');}
function Dtask(p, s) {$.getScript(DTPath+'api/task.js.php?'+p+(s ? '&screenw='+window.screen.width+'&screenh='+window.screen.height+'&refer='+encodeURIComponent(document.referrer) : '')+'&refresh='+Math.random()+'.js');}
var sell_n = 0;
function sell_tip(o, i) {
	if(o.checked) {sell_n++; Dd('item_'+i).style.backgroundColor='#F1F6FC';} else {Dd('item_'+i).style.backgroundColor='#FFFFFF'; sell_n--;}
	if(sell_n < 0) sell_n = 0;
	if(sell_n > 1) {
		var aTag = o; var leftpos = toppos = 0;
		do {aTag = aTag.offsetParent; leftpos	+= aTag.offsetLeft; toppos += aTag.offsetTop;
		} while(aTag.offsetParent != null);
		var X = o.offsetLeft + leftpos - 10;
		var Y = o.offsetTop + toppos - 70;
		Dd('sell_tip').style.left = X + 'px';
		Dd('sell_tip').style.top = Y + 'px';
		o.checked ? Ds('sell_tip') : Dh('sell_tip');
	} else {
		Dh('sell_tip');
	}
}
function img_tip(o, i) {
	if(i) {
		if(i.indexOf('nopic.gif') == -1) {
			if(i.indexOf('.thumb.') != -1) {var t = i.split('.thumb.');var s = t[0];} else {var s = i;}
			var aTag = o; var leftpos = toppos = 0;
			do {aTag = aTag.offsetParent; leftpos	+= aTag.offsetLeft; toppos += aTag.offsetTop;
			} while(aTag.offsetParent != null);
			var X = o.offsetLeft + leftpos + 90;
			var Y = o.offsetTop + toppos - 20;
			Dd('img_tip').style.left = X + 'px';
			Dd('img_tip').style.top = Y + 'px';
			Ds('img_tip');
			Inner('img_tip', '<img src="'+s+'" onload="if(this.width<200) {Dh(\'img_tip\');}else if(this.width>300){this.width=300;}Dd(\'img_tip\').style.width=this.width+\'px\';"/>')
		}
	} else {
		Dh('img_tip');
	}
}
function Dqrcode() {
	var url = $('meta[http-equiv=mobile-agent]').attr('content');
	url = url ? url.substr(17) : window.location.href;
	if($('#destoon_qrcode').length > 0) {
		if($('#destoon_qrcode').html().length < 10) {
			$('#destoon_qrcode').css({'position':'fixed','z-index':'99999','left':'50%','top':'0','margin-left':'-130px','width':'260px','background':'#FFFFFF','text-align':'center'});
			$('#destoon_qrcode').html('<div style="text-align:right;color:#555555;font-size:16px;font-family:Verdana;font-weight:100;padding-right:6px;cursor:pointer;">x</div><img src="'+DTPath+'api/qrcode.png.php?auth='+encodeURIComponent(url)+'" width="140" height="140"/><div style="padding:10px 0;font-size:14px;font-weight:bold;color:#555555;">'+L['scan_open']+'</div><div style="padding-bottom:20px;color:#999999;">'+L['scan_tool']+'</div>');
			$('#destoon_qrcode').click(function(){$('#destoon_qrcode').fadeOut('fast');});
		}
		$('#destoon_qrcode').fadeIn('fast');
	}
}
function Dmobile() {
	var url = $('meta[http-equiv=mobile-agent]').attr('content');
	Go(DTPath+'api/mobile.php'+(url ? '?uri='+encodeURIComponent(url.substr(17)) : ''));
}
function oauth_logout() {
	set_cookie('oauth_site', '');
	set_cookie('oauth_user', '');
	window.location.reload();
}