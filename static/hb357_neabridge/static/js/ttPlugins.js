var viewUrl = 'http://zs.cnjiwang.com/tt/req.do'; //调取中间件
var scheduleUrl = "http://10.1.240.13:40013"; //预览+排期路径
/**
* 获取地址栏参数
*/
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/**
* AJAX获取预览tt信息
*/
function getAdvertismentInfo(viewElementId,_ad_adv,_ad_ads){
	var url = scheduleUrl+"/web/adv/getAdvertisement.do";
	var data = {
			advPosId:_ad_adv
		};
	$.ajax({
		url: url, 
	    type: "GET", 
	    dataType: 'jsonp', 
		jsonp: 'jsoncallback', 
	    data:data, 
	    success: function (data) {
	    	if(data){
	    		//alert($("#hidden_value").val());
	    		//alert("获取成功成功=="+data.result);
				var _result = utf8to16(base64decode(data.result));
				_result = eval(_result);
	    		if(_result){
					if(_result.length==1){
						if(_result[0].type == 1 && _result[0].advcode == '500'){ //背景
							if(_result[0].adv){
								$(viewElementId).css("background",_result[0].abody);
								$(viewElementId).prepend(_result[0].adv);
								$(".background_menu_body_tl").width(_result[0].awidth);
								$(".background_menu_body_tl").css("margin","0 auto");
								$(".background_menu_body_first_adv").css("margin-top","20px");
							}
						}else if(_result[0].type == 1){ //固定
							if(_result[0].adv){
								advertismentReflush1(viewElementId,_result[0].adv);
							}
						}else if(_result[0].type == 2){ //轮询
							if(_result[0].adv){
								advertismentReflushPoll1(viewElementId,_result);
							}
						}
					}else if(_result.length==2 && _result[0].type == 3){ //拉幕
						if(_result[0].adv){
							advertismentToPad1(viewElementId,_result);
						}
					}
				}	
	    	}
	    }
	});
}
/**
* 样式设置
*/
function setAdCss(viewElementId){
	//$(viewElementId).css("border-style","solid");
	//$(viewElementId).css("border-width","1px");
	//$(viewElementId).css("border-color","red");
	$(viewElementId).css("outline","2px solid #ff0000");
}
/**
* 预览固定tt
*/
function advertismentReflush1(viewElementId,result){
	$(viewElementId).empty();
	$(viewElementId).append(result);
	setAdCss(viewElementId);
	$(viewElementId).show();
}




/**
* 预览轮询tt
*/
function advertismentReflushPoll1(viewElementId,_result){
	$(viewElementId).empty();
	$(viewElementId).append('<ul style="margin:0px; padding:0px;"></ul>');
	var _$ul = $(viewElementId).find("ul");
	for(var i=0;i<_result.length;i++){ //update by wl 修改参数
		var temp = '<li>' + _result[i].adv +'</li>';
		_$ul.append(temp);
	} 		
	jQuery(viewElementId).slide({ mainCell:" ul",effect:"topLoop",autoPlay:true,interTime:3000,delayTime:500});
	//$(viewElementId).show();
	setAdCss(viewElementId);
	//$.dy_scroll_plugins(
	//	{wraper:viewElementId,
	//		prevButton:null,
	//		nextButton:null,
	//		img_ul:viewElementId,
	//		autoFlag:true,
	//		spead:3,
	//		scroll_width:$(viewElementId).width()}
	//);
}
/**
* 预览拉幕tt
*/
function advertismentToPad1(viewElementId,_result){
	$(viewElementId).empty();
	$(viewElementId).css('height', '');
	var bigDiv = '<div id="'
				+viewElementId.substr(1,viewElementId.length-1)
				+'_big">'
				+ _result[0].adv
				+'</div>';
	$(viewElementId).append(bigDiv);
	var smallDiv = '<div id="'
				+viewElementId.substr(1,viewElementId.length-1)
				+'_small">'
				+ _result[1].adv
				+'</div>';
	$(viewElementId).append(smallDiv);
	setAdCss(viewElementId);
	$(""+viewElementId+"_small").hide();
	setTimeout('$.topad_plugins("'+viewElementId+'_big","'+viewElementId+'_small",2000,1000);',2000); //update by wl 将viewElementId 写活
}

/**
* tt对象
*/

function AdvertisingPosition(parameters){
	this.url = viewUrl;
	this.advPosId = parameters['advPosId'];
	this.viewElementId = '#' + parameters['viewElementId'];
	this.defaultImg = parameters['defaultImg'];
}
/**
* tt加载
*/
AdvertisingPosition.prototype.reflush= function(){
	jQuery.getAdvertisment(this.url,this.advPosId,this.viewElementId,this.defaultImg);
}; 
/**
* tt异步加载处理逻辑
*/
(function(jQuery){
	var $ = jQuery;
	var _ad_para = GetQueryString("para");
	var _ad_ads = GetQueryString("ad");
	var _ad_adv = GetQueryString("adv");

	$.extend({		
		getAdvertisment:function(url,advPosId,viewElementId,defaultImg){
			realGetAdvertisment(url,advPosId,viewElementId,defaultImg);
		}
		
	});

	function realGetAdvertisment(url,advPosId,viewElementId,defaultImg){
		if(_ad_para !=null && _ad_para.toString().length>0 && _ad_para == "2"){
			initAdvNameById(advPosId,viewElementId);
		}else if(_ad_para !=null && _ad_para.toString().length>0 && _ad_para == "1" && _ad_ads == (advPosId+"")){
			//alert(advPosId+"||"+viewElementId);
			//alert(_ad_para +"||"+ _ad_ads +"||"+ _ad_adv);
			getAdvertismentInfo(viewElementId,_ad_adv,_ad_ads);
			//jsonp(url,advPosId,viewElementId,defaultImg);
		}else{
			jsonp(url,advPosId,viewElementId,defaultImg);
		}
	}
	
	/**
	 * 初始化获取tt名称信息 - tt排期使用
	 */
	function initAdvNameById(advId,viewElementId){
		var advName="";
		var url = scheduleUrl+"/web/adv/findAdsenseNameById.do";
		var data = { 
				adsenseRid:advId
			};
		$.ajax({
			url: url, 
		    type: "GET", 
		    dataType: 'jsonp', 
			jsonp: 'jsoncallback', 
		    data:data, 
		    success: function (data) {
		    	if(data){
					var _result = utf8to16(base64decode(data.result));
					
					_result = jQuery.parseJSON(_result);
					var _width = "";
					var _height = "";
					var _client_type;
					if(_result){
						advName = _result.name;
						_width = _result.width;
						_height = _result.height;
						_client_type = _result.clinet_type;
					}
					
//		    		if(_result.indexOf("\"")>=0){
//		    			advName =  _result.substr(1,(_result.length-2));
//		    		}
		    		showAdvOuter(advId,advName,viewElementId,_width,_height,_client_type);
		    	}
		    }
		});
	}
	
	/**
	 * 设置tt位外框样式及点击方法 - tt排期使用
	 */
	function showAdvOuter(advId,advName,viewElementId,_width,_height,_client_type){
		var outerLabel = $(viewElementId);
		var height=outerLabel.height();
		var width = outerLabel.width();
		var borderView = '<div showModal= "'+advId+'"  style="text-align:center;outline: 3px blue dashed;outline-offset: -5px;z-index: 1000;width:'+_width+';height:'+_height+'">';
		borderView+='<span style="font-size:xx-large;line-height:'+_height+'px;">'+advName+'</span>';
		borderView+='</div>';
		//背景tt的处理
		if(_client_type == 20){
			outerLabel.prepend(borderView);
		}else{
			outerLabel.html(borderView);
		}
		$('[showModal="'+advId+'"]').bind("click",function(){
			advName = encodeURI(encodeURI(advName));
			var advInfo = {"advId":advId,"advName":advName};
			advInfo = JSON.stringify(advInfo);
			if(typeof(exec_obj)=='undefined'){  
		        exec_obj = document.createElement('iframe');  
		        exec_obj.name = 'tmp_frame';  
		        exec_obj.src = scheduleUrl+'/web/adv/schedule/exec.html?advInfo='+advInfo;  
		        exec_obj.style.display = 'none';  
		        document.body.appendChild(exec_obj);  
		    }else{  
		        exec_obj.src = scheduleUrl+'/web/adv/schedule/exec.html?' + Math.random()+"&advInfo="+advInfo;  
		    }
		});
	}
	
	//固定tt
	function advertismentReflush(viewElementId,result){
		
		$(viewElementId).empty();
		$(viewElementId).append(result);
		$(viewElementId).show();
	}
	//轮询tt
	function advertismentReflushPoll(viewElementId,_result){
		$(viewElementId).empty();
		$(viewElementId).append('<ul style="margin:0px; padding:0px;"></ul>');
		var _$ul = $(viewElementId).find("ul");
		for(var i=0;i<_result.length;i++){ //update by wl 修改参数
			var temp = '<li>' + _result[i].adv +'</li>';
			_$ul.append(temp);
		} 	
		jQuery(viewElementId).slide({ mainCell:" ul",effect:"topLoop",autoPlay:true,interTime:3000,delayTime:500});		
		//$(viewElementId).show();
		//$.dy_scroll_plugins(
		//	{wraper:viewElementId,
		//		prevButton:null,
		//		nextButton:null,
		//		img_ul:viewElementId,
		//		autoFlag:true,
		//		spead:3,
		//		scroll_width:$(viewElementId).width()}
		//);
	}
	//拉幕tt
	function advertismentToPad(viewElementId,_result){
		$(viewElementId).empty();
		$(viewElementId).css('height', '');
		var bigDiv = '<div id="'
					+viewElementId.substr(1,viewElementId.length-1)
					+'_big">'
					+ _result[0].adv
					+'</div>';
		$(viewElementId).append(bigDiv);
		var smallDiv = '<div id="'
					+viewElementId.substr(1,viewElementId.length-1)
					+'_small">'
					+ _result[1].adv
					+'</div>';
		$(viewElementId).append(smallDiv);
		$(""+viewElementId+"_small").hide();
		setTimeout('$.topad_plugins("'+viewElementId+'_big","'+viewElementId+'_small",2000,1000);',5000); //update by wl 将viewElementId 写活
	//	$.topad_plugins("#"+viewElementId+"_big","#"+viewElementId+"_small",1000,1000);
	}
	function jsonp(url,advPosId,viewElementId,defaultImg){
		var data = {advPosId:advPosId};
		$.ajax({
		    url: url, 
		    type: "GET", 
		    dataType: 'jsonp', 
		    jsonp: 'jsoncallback', 
		    data: data, 
		    success: function (json) {
				 if(json){
					if(json.code == '500'){
						//背景tt
						var _result = utf8to16(base64decode(json.result));
						_result = eval(_result);
						if(_result){
							if(_result.length==1){
								//advertismentReflush(viewElementId,_result[0].adv);
								$(viewElementId).css("background",_result[0].abody);
								$(viewElementId).prepend(_result[0].adv);
								$(".background_menu_body_tl").width(_result[0].awidth);
								$(".background_menu_body_tl").css("margin","0 auto");
								$(".background_menu_body_first_adv").css("margin-top","20px");
							}
						}	
					}else if(json.code == '200'){
						//固定tt
						var _result = utf8to16(base64decode(json.result));
						_result = eval(_result);
						if(_result){
							if(_result.length==1){
								advertismentReflush(viewElementId,_result[0].adv);
							}
						}	
					}else if(json.code == '300'){
						//轮询tt
						var _result = utf8to16(base64decode(json.result));
						_result = eval(_result);
						if(_result){
							if(_result.length>0){								
								advertismentReflushPoll(viewElementId,_result);
							}
						}	
						
					}else if(json.code == '400'){
						//拉幕tt
						var _result = utf8to16(base64decode(json.result));
						_result = eval(_result);
						if(_result){
							if(_result.length>1){
								advertismentToPad(viewElementId,_result);
							}
						}							
					}
				 }
		    }
		});
	}

})(jQuery);







//base64
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);  
    /** 
     * base64编码 
     * @param {Object} str 
     */  
    function base64encode(str){  
        var out, i, len;  
        var c1, c2, c3;  
        len = str.length;  
        i = 0;  
        out = "";  
        while (i < len) {  
            c1 = str.charCodeAt(i++) & 0xff;  
            if (i == len) {  
                out += base64EncodeChars.charAt(c1 >> 2);  
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
                out += "==";  
                break;  
            }  
            c2 = str.charCodeAt(i++);  
            if (i == len) {  
                out += base64EncodeChars.charAt(c1 >> 2);  
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
                out += "=";  
                break;  
            }  
            c3 = str.charCodeAt(i++);  
            out += base64EncodeChars.charAt(c1 >> 2);  
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
            out += base64EncodeChars.charAt(c3 & 0x3F);  
        }  
        return out;  
    }  
    /** 
     * base64解码 
     * @param {Object} str 
     */  
    function base64decode(str){  
        var c1, c2, c3, c4;  
        var i, len, out;  
        len = str.length;  
        i = 0;  
        out = "";  
        while (i < len) {  
            /* c1 */  
            do {  
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
            }  
            while (i < len && c1 == -1);  
            if (c1 == -1)   
                break;  
            /* c2 */  
            do {  
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
            }  
            while (i < len && c2 == -1);  
            if (c2 == -1)   
                break;  
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
            /* c3 */  
            do {  
                c3 = str.charCodeAt(i++) & 0xff;  
                if (c3 == 61)   
                    return out;  
                c3 = base64DecodeChars[c3];  
            }  
            while (i < len && c3 == -1);  
            if (c3 == -1)   
                break;  
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
            /* c4 */  
            do {  
                c4 = str.charCodeAt(i++) & 0xff;  
                if (c4 == 61)   
                    return out;  
                c4 = base64DecodeChars[c4];  
            }  
            while (i < len && c4 == -1);  
            if (c4 == -1)   
                break;  
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
        }  
        return out;  
    }  
    /** 
     * utf16转utf8 
     * @param {Object} str 
     */  
    function utf16to8(str){  
        var out, i, len, c;  
        out = "";  
        len = str.length;  
        for (i = 0; i < len; i++) {  
            c = str.charCodeAt(i);  
            if ((c >= 0x0001) && (c <= 0x007F)) {  
                out += str.charAt(i);  
            }  
            else   
                if (c > 0x07FF) {  
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
                }  
                else {  
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
                }  
        }  
        return out;  
    }  
    /** 
     * utf8转utf16 
     * @param {Object} str 
     */  
    function utf8to16(str){  
        var out, i, len, c;  
        var char2, char3;  
        out = "";  
        len = str.length;  
        i = 0;  
        while (i < len) {  
            c = str.charCodeAt(i++);  
            switch (c >> 4) {  
                case 0:  
                case 1:  
                case 2:  
                case 3:  
                case 4:  
                case 5:  
                case 6:  
                case 7:  
                    // 0xxxxxxx  
                    out += str.charAt(i - 1);  
                    break;  
                case 12:  
                case 13:  
                    // 110x xxxx 10xx xxxx  
                    char2 = str.charCodeAt(i++);  
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
                    break;  
                case 14:  
                    // 1110 xxxx10xx xxxx10xx xxxx  
                    char2 = str.charCodeAt(i++);  
                    char3 = str.charCodeAt(i++);  
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));  
                    break;  
            }  
        }  
        return out;  
    }  
    //demo  
    //function doit(){  
    //    var f = document.f;  
    //    f.output.value = base64encode(utf16to8(f.source.value));  
    //    f.decode.value = utf8to16(base64decode(f.output.value));  
    //}  





//  拉幕 
//topad_plugins(bigDom,smallDom,upSpeed,downSpeed)
;(function(jQuery){
	var $ = jQuery;
	$.extend({		
		topad_plugins:function(bigDom,smallDom,upSpeed,downSpeed){
			topad_plugins_real(bigDom,smallDom,upSpeed,downSpeed);
		}
	});
	
})(jQuery);

//update by wl 将topad_plugins_real单独封装为方法
function topad_plugins_real(bigDom,smallDom,upSpeed,downSpeed){
		$(bigDom).slideUp(upSpeed,function(){$(smallDom).slideDown(downSpeed);});
	}


//jQuery(function(){
//	jQuery.dy_scroll_plugins(
//		{wraper:'#hl_main5_content',
//			prevButton:null,
//		nextButton:null,
//		img_ul:'#hl_main5_content1',
//		autoFlag:true,
//		spead:3,
//		scroll_width:200});
//}); -->


/**
*  tt定时轮询
*		$.dy_scroll_plugins({wraper:,prevButton:null,nextButton:null,img_ul:img_ul,autoFlag:true,spead:3});
*
*/
/**
*  tt定时轮询
*		$.dy_scroll_plugins({wraper:,prevButton:null,nextButton:null,img_ul:img_ul,autoFlag:true,spead:3});
*
*/
;(function(jQuery){
	var $ = jQuery;
	var _dy_scroll_plugins_flag = 'left';
	var $wraper = null;
	var $img = null;
	var _or = null;
	var _spead = null;
	var _scroll_width = null;
	var _show_number = 0;
	var _show_img_length = 1;
	$.extend({		
		dy_scroll_plugins:function(params){
			//init(params);
			dy_scroll_plugins_real(init(params));
		}
	});
	//插件初始化
	function init(params){
		var paramArr = new Array();
		if(params.wraper){
			//$wraper = $(params.wraper);
			paramArr[0] = $(params.wraper);
		}else{
			paramArr[0] = null;
		}			
		if(params.img_ul){
			//$img = $(params.img_ul);
			paramArr[1] = $(params.img_ul);
		}else{
			paramArr[1] = null;
		}
		if(params.autoFlag){
			//_or = params.autoFlag;
			paramArr[2] = params.autoFlag;
		}else{
			paramArr[2] = null;
		}
		if(params.spead){
			//_spead = params.spead;
			paramArr[3] = params.spead;
		}else{
			paramArr[3] = null;
		}
		if(params.scroll_width){
			//_scroll_width = params.scroll_width;
			paramArr[4] = params.scroll_width;
		}else{
			paramArr[4] = null;
		}
		return paramArr;
	}
	function dy_scroll_plugins_real(paramArr){
			dy_scroll(paramArr);			
					
	}	
	//轮询不带权重的滚动
	function dy_scroll(paramArr){
		var wraper = paramArr[0]; //$wraper;		
		var img = paramArr[1].find('li'); //$img.find('li');
		if(paramArr[1].find('li')){
			_show_img_length = paramArr[1].find('li').length;
		}			
		var s = paramArr[3];	//_spead;	
		var or = paramArr[2]; //_or;
		if (or == true){
			ad = setInterval(
				function() { _dy_scroll_plugins_flag == "left" ? left_scroll(paramArr) : right_scroll()},
				s*1000);
			wraper.hover(
				function(){clearInterval(ad);},
				function(){ad = setInterval(function() {_dy_scroll_plugins_flag == "left" ? left_scroll(paramArr) : right_scroll()},
				s*1000);});
		}
	}
	
	function right_scroll(){
		
	}
	function left_scroll(paramArr){
		var _$img = paramArr[1].find('li');
		var _$ul = paramArr[1].find('ul');
		var w = _$img.outerWidth(true);
		_$ul.animate({'margin-left':-w},
			function(){
				_$img.eq(0).appendTo(_$ul);
				_$ul.css({'margin-left':0});
		});		
	}

})(jQuery);

