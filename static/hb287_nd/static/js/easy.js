
/**
 * 未定义变量
 */
function _U(s){
	return typeof(s) == 'undefined' ? true : false;
}

/**
 * 非空字符串
 */
function _S(s){
	return (typeof(s) == 'string' && s != '') ? true : false;
}

/**
 * 非0数字
 */
function _N(s){
	return (typeof(s) == 'number' && s != 0) ? true : false;
}

/**
 * 简易切换插件
 */
var easytabindex, easytabtiout, easytabautoi;
easytabindex = 0;
easytabtiout = new Array();
easytabautoi = new Array();

$.fn.easytab = function(p){
	var dp, ls, j, jattr, jindex, lc, lcl;
	jindex = easytabindex;
	easytabindex++;
	dp = {
		event : 'mouseover',
		onclass : 'on',
		unclass : '',
		easychildren : '',
		lt : '',
		gt : '',
		auto : 0
	};
	j = $(this);
	p = (p || {});
	jattr = ['event', 'onclass', 'unclass', 'auto', 'easychildren', 'lt', 'gt'];
	for(var i in jattr){
		if(_U(p[jattr[i]]) && _S(j.attr(jattr[i])))
			p[jattr[i]] = j.attr(jattr[i]);
	}
	
	dp = $.extend(dp, (p || {}));
	dp.auto = Math.round(parseInt(dp.auto, 10));
	if(_S(dp.easychildren)){
		ls = j.children();
		lc = $(dp.easychildren);
		lcl = lc.length;
		if(lcl > 0){
			lc.each(function(i, v){
				$(this).children().each(function(ii, vv){
					$(this).attr('id', 'easytab-children-id-' + jindex + '-' + i + '-' + ii)
				})
			})
		
			ls.each(function(i, v){
				var t, ids;
				t = $(this);
				ids = new Array();
				for(var ii = 0; ii < lcl; ii++){
					ids.push('#easytab-children-id-' + jindex + '-' + ii + '-' + i);
				}
				ids.join(',');
				t.attr('easytab', ids);
			})
		}
	}
	ls = j.children('[easytab]');
	easytabautoi[jindex] = 0;
	ls.bind(dp.event, function(){
		var q;
		q = $(this);
		ls.each(function(i, v){
			var e;
			e = $(this);
			if(e.attr('easytab') == q.attr('easytab')){
				e.addClass(dp.onclass);	
				if(_S(dp.unclass))
					e.removeClass(dp.unclass);	
				$(e.attr('easytab')).each(function(){
					var r, s, f;
					r = $(this);
					s = r.attr('slow');
					f = 0;
					if(_S(s)){
						if(s == 'fadeIn'){
							f = 1;
						}
					}else{
						if($('img', r).length == 1){
							f = 1
						}
					}
					s = '' + s;
					r.attr('f', s);
					if(f == 1)
						r.fadeIn('slow');
					else
						r.show();
						
					if(_S(e.attr('showcallback'))){
						try{
							eval(e.attr('showcallback'));
						}catch(ex){}
					}
				})
				easytabautoi[jindex] = i;
				if(_N(dp.auto))
					installautoeasytab(jindex, ls, i, dp);
			}else{
				e.removeClass(dp.onclass);					
				if(_S(dp.unclass))
					e.addClass(dp.unclass);	
				$(e.attr('easytab')).hide();
				if(_S(e.attr('hidecallback'))){
					try{
						eval(e.attr('hidecallback'));
					}catch(ex){}
				}
			}
		})
	});
	if(_N(dp.auto))
		installautoeasytab(jindex, ls, 0, dp);
	if(_S(dp.lt)){
		$(dp.lt).bind('click', function(){
			var i;
			i = easytabautoi[jindex] - 1;
			if(i < 0)
				i = ls.length - 1;
			try{
				clearTimeout(easytabtiout[jindex]);
			}catch(e){}
			ls.eq(i).trigger(dp.event);
		});
	}
	if(_S(dp.gt)){
		$(dp.gt).bind('click', function(){
			var i;
			i = easytabautoi[jindex] + 1;
			if(i >= ls.length)
				i = 0;
			try{
				clearTimeout(easytabtiout[jindex]);
			}catch(e){}
			ls.eq(i).trigger(dp.event);
		});
	}
}

function installautoeasytab(jindex, ls, i, dp){
	i++;
	if(i >= ls.length)
		i = 0;
	try{
		clearTimeout(easytabtiout[jindex]);
	}catch(e){}
	easytabtiout[jindex] = setTimeout(function(){
		ls.eq(i).trigger(dp.event);
	}, dp.auto);
}


/**
 * 简易滚动插件
 */
var easygdindex, easygdtiout;
easygdindex = 0;
easygdtiout = new Array();

$.fn.easygd = function(p){
	var jindex, dp, j, jattr, jc;
	jindex = easygdindex;
	easygdindex++;
	dp = {
		time : 3000,
		gd_fx : 'up',
		gd_csskey : 'scroll-top',
		gd_jskey : 'scrollTop',
		gd_add : '+',
		gd_qz : 0,
		gd_item : 0,
		gd_wh : 0,
		gd_max : 0,
		gd_height : 0,
		gd_width : 0
	};
	j = $(this);
	p = (p || {});
	jattr = ['time', 'gd_height', 'gd_width', 'gd_item', 'gd_fx', 'gd_qz', 'lt', 'gt'];
	for(var i in jattr){
		if(_U(p[jattr[i]]) && _S(j.attr(jattr[i])))
			p[jattr[i]] = j.attr(jattr[i]);
	}
	dp = $.extend(dp, (p || {}));
	dp.time = Math.round(parseInt(dp.time, 10));
	dp.gd_qz = Math.round(parseInt(dp.gd_qz, 10));
	dp.gd_height = Math.round(parseInt(dp.gd_height, 10));
	dp.gd_width = Math.round(parseInt(dp.gd_width, 10));
	dp.gd_item = Math.round(parseInt(dp.gd_item, 10));
	if(dp.gd_height == 0)
		dp.gd_height = j.height();
	if(dp.gd_width == 0)
		dp.gd_width = j.width();
	$('script', j).remove();
	jc = j.children();
	if(jc.length > 1 || dp.gd_qz == 1){
		j.css({overflow:'hidden'});
		jc.css({height:dp.gd_height, width:dp.gd_width, overflow:'hidden'});
		if(dp.gd_fx == 'up' || dp.gd_fx == 'down'){
			jc.css({display:'block'});
			dp.gd_wh = dp.gd_height;
			if(dp.gd_item == 0)
				dp.gd_item = dp.gd_height;
		}else{
			j.css({'white-space':'nowrap'});
			jc.css({display:'inline-block'});
			dp.gd_csskey = 'scroll-left';
			dp.gd_jskey = 'scrollLeft';
			dp.gd_wh = dp.gd_width;
			if(dp.gd_item == 0)
				dp.gd_item = dp.gd_width;
		}
		if(dp.gd_fx == 'down' || dp.gd_fx == 'right')
			dp.gd_add = '-';
		dp.gd_max = dp.gd_wh * (jc.length + 1);
		j.append(jc.first().clone(true));
		j.bind('mouseout', function(){
			bindstoeasygd(j, dp, jindex);
		}).bind('mouseover', function(){
			try{
				clearTimeout(easygdtiout[jindex]);
			}catch(e){}
		}).trigger('mouseout');
		if(_S(dp.lt)){
			$(dp.lt).bind('click', function(){
				var tmp_add;
				tmp_add = dp.gd_add;
				dp.gd_add = '-';
				runeasygd(j, dp, jindex);
				dp.gd_add = tmp_add;
			});
		}
		if(_S(dp.gt)){
			$(dp.gt).bind('click', function(){
				var tmp_add;
				tmp_add = dp.gd_add;
				dp.gd_add = '+';
				runeasygd(j, dp, jindex);
				dp.gd_add = tmp_add;
			});
		}
	}
}

function bindstoeasygd(j, dp, jindex){
	try{
		clearTimeout(easygdtiout[jindex]);
	}catch(e){}
	easygdtiout[jindex] = setTimeout(function(){
		runeasygd(j, dp, jindex);
	}, dp.time);
}

function runeasygd(j, dp, jindex){
	var to;
	to = {};
	if(dp.gd_add == '+'){
		if((dp.gd_item + j[dp.gd_jskey]()) >= dp.gd_max)
			j[dp.gd_jskey](0);
		to[dp.gd_jskey] = j[dp.gd_jskey]() + dp.gd_item;
	}else{
		if(j[dp.gd_jskey]() == 0)
			j[dp.gd_jskey](dp.gd_max);
		to[dp.gd_jskey] = j[dp.gd_jskey]() - dp.gd_item;
	}	
	j.animate(to, function(){
		bindstoeasygd(j, dp, jindex);
	});
}
// 滚动插件结束

var easyinstall = (typeof easyinstall != 'undefined' && easyinstall == 1) ? 1 : 0;

$(function(){
	if(easyinstall == 1) return ;
	easyinstall = 1;
	/**
	 * 切换自动绑定
	 */	
	$('.easytab').each(function(){
		$(this).easytab();
	});
	
	/**
	 * 滚动自动绑定
	 */	
	$('.easygd').each(function(){
		$(this).easygd();
	});	   
})