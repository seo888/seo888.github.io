/*
东南网 js 天气 2012-2018

调用代码：
<script type="text/javascript" src="http://www.fjsen.com/js/tq.js" city="auto" data="" imgstyle="" spanstyle=""></script>

city="auto" 会自动获取城市，不设置时默认城市为福州
data=展示模板，不设置时默认为 [tq.city] tq.weather0 tq.temp0
imgstyle=图片样式，不设置时默认为 width:18px; height:18px; vertical-align:middle;
spanstyle=图片样式，不设置时默认为 display:inline-block; padding:0px 4px; font-size:12px; height:18px; line-height:18px;


data 参数实例，pi01-sim11 等6个图片地址，是百度图片，可能有些时候会为空，调用时需自己判断，推荐使用 weatherimg0
all = [tq.city] 今天 tq.weatherimg0 tq.weather0 tq.temp0 tq.wind0 tq.pm25_span 明天 tq.weatherimg1 tq.weather1 tq.temp1 tq.wind1

tq.pi01        = http://s1.bdstatic.com/r/www/aladdin/img/new_weath/bigicon/5.png"
tq.pi11        = http://s1.bdstatic.com/r/www/aladdin/img/new_weath/icon/5.png"
tq.pic01       = http://s1.bdstatic.com/r/www/aladdin/img/new_weath/simpleico/5.png"
tq.pic11       =
tq.sim01       = http://s1.bdstatic.com/r/www/aladdin/img/new_weath/simpleico/5.png"
tq.sim11       =
tq.temp0       = 33～22℃	
tq.temp1       = 32～24℃
tq.weather0    = 晴	
tq.weather1    = 多云	
tq.weatherimg0 = <img src="http://www.fjsen.com/js/tq/a0.png" style="" title="晴" />
tq.weatherimg1 = <img src="http://www.fjsen.com/js/tq/a1.png" style="" title="晴" />
tq.wind0       = 东风3-4级	
tq.wind1       = 东南风3-4级
tq.pm25        = 37
tq.pm25_span   = <span style="background:Green; color:#fff;" title="今日空气质量指数(AQI)：37">优</span>
tq.city        = 福州

*/
(function(window, undefined){
	if(window.tq_index == undefined){
		window.tq_index = 0;
		window.tq_cache = [];
		window.tq_load = function(tq_index){
			var scripts = document.getElementsByTagName('script');
			var tq_i = 0;
			var tq_is = true;
			for(var i = 0; i < scripts.length; i++){
				var script = scripts[i];
				if(script && script.src && script.src.toString().indexOf('tq.js') > -1){		
					if(tq_i == tq_index){
						tq_is = false;
						var charset = script.getAttribute('charset');
						if(charset && charset == 'gb2312'){
							window.tq_js(script.src.replace('tq.js', 'tq_utf8.js'), function(){
								window.tq_get_city(script, tq_index);
							}, 1)
						}else{
							window.tq_get_city(script, tq_index);
						}
						break;
					}		
					tq_i++;
				}
			}
			if(tq_is){
				window.tq_call(tq_index);
			}
		}
		
		window.tq_get_city = function(script, tq_index){
			if(window.tq_def_city == undefined){
				window.tq_def_city = '福州';
			}
			if(window.tq_city_rep == undefined){
				window.tq_city_rep = /(^.*省|市.*$)/ig;
			}
			window.tq_cache[tq_index] = {
				city : window.tq_def_city
				, data : '[tq.city] tq.weather1 tq.temp1'
				, imgstyle : 'width:18px; height:18px; vertical-align:middle;'
				, spanstyle : 'display:inline-block; padding:0px 4px; height:18px; font-size:12px; line-height:18px;'
			};
			var data = script.getAttribute('data');
			if(data && data.match(/.+/)){
				if(data == 'all'){
					data = '[tq.city] 今天 tq.weatherimg0 tq.weather0 tq.temp0 tq.wind0 tq.pm25_span 明天 tq.weatherimg1 tq.weather1 tq.temp1 tq.wind1';
				}
				window.tq_cache[tq_index].data = data;
			}
			var imgstyle = script.getAttribute('imgstyle');
			if(imgstyle && imgstyle.match(/.+/)){
				window.tq_cache[tq_index].imgstyle = imgstyle;
			}
			var spanstyle = script.getAttribute('spanstyle');
			if(spanstyle && spanstyle.match(/.+/)){
				window.tq_cache[tq_index].spanstyle = spanstyle;
			}
			var city = script.getAttribute('city');
			if(city && city.match(/.+/)){
				if(city == 'auto'){
					var url = '//pv.sohu.com/cityjson?t=' + (new Date()).getTime();
					window.tq_js(url, function(tq_index){
						window.tq_cache[tq_index].city = window.returnCitySN.cname.replace(window.tq_city_rep, '');
						window.tq_call(tq_index);
					}, tq_index);
				}else{
					window.tq_cache[tq_index].city = city;
					window.tq_call(tq_index);
				}
			}else{
				window.tq_call(tq_index);
			}
		}
		
		window.tq_call = function(tq_index){
			var url = '//map.baidu.com/?qt=cur&wd=' + (window.tq_cache[tq_index].city) + '&callback=tq_callback_' + tq_index + '&t=' + (new Date()).getTime();
			window.tq_js(url);
		}
		
		window.tq_js = function(src, fun, fun_arg){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(typeof fun == 'function'){
				script.onreadystatechange = script.onload = function(){
					if(!script.readyState || (script.readyState == 'loaded' || script.readyState == 'complete')){
						fun(fun_arg);
					}				
				}				
			}
			script.src = src;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(script);
		}
		
		window.tq_is_night = (function(h){return (h > 18 || h < 6)})((new Date()).getHours());
		
		window.tq_weatherimg_arr = [
			['晴', '0'], ['多云', '1'], ['阴', '2'], ['阵雨', '33'], ['雷阵雨', '34'], ['雷阵雨伴有冰雹', '5'], ['雨夹雪', '6'], ['小雨', '7'], ['中雨', '8']
			, ['大雨', '9'], ['暴雨', '10'], ['大暴雨', '11'], ['特大暴雨', '12'], ['阵雪', '13'], ['小雪', '14'], ['中雪', '15'], ['大雪', '16'], ['暴雪', '17']
			, ['雾', '18'], ['冻雨', '19'], ['沙尘暴', '20'], ['小到中雨', '21'], ['中到大雨', '22'], ['大到暴雨', '23'], ['暴雨到大暴雨', '24'], ['大到特大暴雨', '25']
			, ['小到中雪', '26'], ['中到大雪', '27'], ['大到暴雪', '28'], ['浮尘', '29'], ['扬沙', '30'], ['强沙尘暴', '31'], ['霾', '32']
		];
		
		window.tq_weatherimg = function(weather, imgstyle){
			if(weather){
				var str = weather.replace(/\\\\u8f6c.*$/, '').replace(/转.*$/, '');
				var len = window.tq_weatherimg_arr.length;
				var sid = false;
				for(var i = 0; i < len; i++){
					var WI_name = window.tq_weatherimg_arr[i][0];
					var WI_sid = window.tq_weatherimg_arr[i][1];
					var WI_name_escape = escape(WI_name).toString().toLowerCase().replace(/%/g, '\\')
					if(WI_name == str || WI_name_escape == str){
						sid = WI_sid;
						break;
					}
				}
				if(sid){
					if(window.tq_is_night && (sid == '0' || sid == '1')){
						sid = sid + '_night.jpg';
					}else{
						sid = sid + '.png';
					}
					return '<img src="//www.fjsen.com/js/tq/a' + sid + '" style="' + imgstyle + '" title="' + weather + '" />';
				}
			}
			return '';		
		}
		
		window.tq_pm25_arr = [
			['优', 'Green', '#fff']
			, ['良', '#AFDB00', '#666']
			, ['轻度污染', 'Orange', '#fff']
			, ['中度污染', 'Red', '#fff']
			, ['重度污染', 'Violet', '#fff']
			, ['严重污染', '#600', '#fff']
		];
		
		window.tq_pm25_span = function(pm25, spanstyle){
			if(pm25){
				pm25num = parseFloat(pm25);
				var pm25_level = 0;
				if(pm25num > 300){
					pm25_level = 5;
				}else if(pm25num > 200){
					pm25_level = 4;
				}else if(pm25num > 150){
					pm25_level = 3;
				}else if(pm25num > 100){
					pm25_level = 2;
				}else if(pm25num > 50){
					pm25_level = 1;
				}
				var arr = window.tq_pm25_arr[pm25_level];
				return '<span style="background:' + arr[1] + '; color:' + arr[2] + '; ' + spanstyle + '" title="今日空气质量指数(AQI)：' + pm25 + '">' + arr[0] + '</span>';
			}
			return '';			
		}
		
		window.tq_callback = function(tq_index, json){
			if(json && json.weather){
				eval('tq_weather = ' + json.weather);
				if(tq_weather){
					tq_weather.city = window.tq_cache[tq_index].city;
					tq_weather.weatherimg0 = window.tq_weatherimg(tq_weather.weather0, window.tq_cache[tq_index].imgstyle);
					tq_weather.weatherimg1 = window.tq_weatherimg(tq_weather.weather1, window.tq_cache[tq_index].imgstyle);
					tq_weather.pm25_span   = window.tq_pm25_span(tq_weather.pm25, window.tq_cache[tq_index].spanstyle);
					var str = window.tq_cache[tq_index].data.replace(/tq\.(\w+)/ig, function(tq_form, tq_to){
						if(tq_weather[tq_to]){
							return tq_weather[tq_to];
						}
						return tq_form;
					})
					var toEle = document.getElementById('tq_id_' + tq_index);
					if(toEle){
						toEle.innerHTML = str;
					}
				}				
			}			
		}
	}else{
		window.tq_index++;
	}
	
	eval('window.tq_callback_' + window.tq_index + ' = function(json){var tq_index = ' + window.tq_index + '; window.tq_callback(tq_index, json);}')
			
	document.write('<span id="tq_id_' + window.tq_index + '"></span>');
	window.tq_load(window.tq_index);
})(window)