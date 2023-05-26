/**
 * ��ʼ�� Cookie
 */
function initCookie(){
	try{
		if(getCounterCookie('tmg_utma') == null){		// ��� UV ������
			addCookie('tmg_utma',getUID(),2*12*30*24*60);
		}
		if(getCounterCookie('tmg_utmb') != null){		// 30�����ڻ
			setCookieTime('tmg_utmb',30);
		}else{				  				// 30����ʧЧ��
			addCookie('tmg_utmb',getUID(),30); // ���� UID
		}
	}catch(error){}
}

/**
 *  ��������
 */
var isSended = '-1'; // �ж��Ƿ��Ѹ���
function sentParamter(AID,TYPE,parm1,parm2,parm3){
	if(!AID) AID = -1;
	if(!TYPE) TYPE = -1;
	if(!parm1) parm1 = -1;
	if(!parm2) parm2 = -1;
	if(!parm3) parm3 = -1;
	var editorid = editorid || "";
	if(isSended == '-1'){
		document.write("<img src='//counter.yesky.com/counter.shtml?UV="
			+ getCounterCookie("tmg_utma")+"&amp;VS="
			+ getCounterCookie("tmg_utmb")+"&amp;refer="
			+ encodeURIComponent(document.referrer)+"&amp;rand="
			+ new Date().getTime()+"&amp;cur="
			+ encodeURIComponent(document.URL)+"&amp;language="
			+ getSystemLanguage()+"&amp;system="
			+ getSystem()+"&amp;browser="
			+ getBrowser()+"&amp;flashVesion="
			+ getFlashVesion()+"&amp;resolution="
			+ getResolution()+"&amp;colorDepath="
			+ getColorDepth()+"&amp;AID="
			+ AID+"&amp;editorid="
			+ editorid + "&amp;TYPE="
			+ TYPE+"&amp;PARM1="
			+ parm1+"&amp;PARM2="
			+ parm2+"&amp;PARM3="
			+ parm3+"&amp;isAdd="
			+ getIsAdd()
			+ "' border='0' alt='' width='0' height='0'>");
	}
	isSended = '1';
}

// �ж��Ƿ��Ͷ
function getIsAdd(){
	if (getCounterCookie('tmg_counter') == 'tmg20100223' || document.referrer.indexOf('base_new') != -1) {
		return 1;
	}
	else if (getCounterCookie('tmg_counter') == 'tmg20100226') {
			return 2;
	}else {
			return -1;
	}
}

/**
 * �õ�Ψһ��ʶ�� UserID
 */
function getUID(){
	var chars = Math.random().toString().split('.')[1].split('');
	var randomId = '';
	while(chars.length != 19){
		if(chars.length < 19)
			chars[chars.length] = Math.round(Math.random());
		else if(chars.length > 19)
			chars[chars.length] = null;
	}
	for(var i = 0 ; i < 19 ; i++){
		randomId += chars[i];
	}
	var dateTemp = (new Date()).valueOf(); // ��� 13 λʱ���
	return dateTemp + randomId;
}

/**
 * ��ӡ��޸� Cookie 
 * @param {Object} key
 * @param {Object} value
 * @param {Object} time	 ����
 */
function addCookie(key,value,time){
    var exp = new Date();    // new Date("December 31, 9998");
    exp.setTime(exp.getTime() + time*60*1000);   // exp.getTime() �õ�����ʱ���
	// expires ָ����Чʱ�䣺�������α�׼ʱ�� (GMT)��document.cookie = 'key=xx'��û����ӣ���û���ҵ��� key ֱ�Ӿ��޸���ֵ
    document.cookie = key + "="+ escape (value) + ";expires=" + exp.toUTCString() + ";path=/"; // "05 Jan 1996 00:00:00 GMT"��
}

/**
 * ɾ�� Cookie
 * @param {Object} key
 */
function deleteCookie(key){
	var exp  = new Date();
    exp.setTime(exp.getTime());
    document.cookie = key + "="+''+ ";expires=" + exp.toUTCString();
}

/**
 * �õ� Cookie
 * @param {Object} key
 */
function getCounterCookie(key){
	var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)")); // ֱ�ӵõ� Cookie
	if(arr != null) 
		return unescape(arr[2]); 
	return null;
}

/**
 * ���� Cookie ��Чʱ��
 * @param {Object} time ����
 */
function setCookieTime(key,time){
	var exp  = new Date();
    exp.setTime(exp.getTime() + time*60*1000);
    document.cookie = key + "="+ escape (getCounterCookie(key)) + ";expires=" + exp.toUTCString() + ";path=/";
}


/**
 * ��ȡ��ǰ�������������
 */
function getBrowser(){
  	var sAgent = navigator.userAgent.toLowerCase();
	var browserName = '';
	if(sAgent.indexOf("msie")!=-1){
		browserName = 'IE';
		try{
			var sAgent = navigator.userAgent.toLowerCase();
			var a = sAgent.indexOf('msie');
			for(var i = 4 ; i < 8 ; i++){
				browserName += sAgent.charAt(a+i);
			}
		}catch(e){
			browserName = 'IE';
		}
	}else if(sAgent.indexOf("firefox")!=-1){
		browserName = 'firefox';
	}else if(sAgent.indexOf("chrome")!=-1){
		browserName = 'chrome';
	}else if(sAgent.indexOf("safari")!=-1){
		browserName = 'safari';
	}else if(sAgent.indexOf("opera")!=-1){
		browserName = 'opera';
	}else if(sAgent.indexOf("netscape")!=-1){
		browserName = 'netscape';
	}else if(sAgent.indexOf("maxthon")!=-1){
		browserName = 'maxthon';
	}else{
		browserName = 'other';
	}
	return browserName;
}

/**
 * �õ�ϵͳĬ������
 */
function getSystemLanguage(){
	var language = '';
	if(getBrowser().indexOf('IE') != '-1'){
		language = navigator.browserLanguage;
	}else if(getBrowser() == "firefox" || getBrowser() == "chrome"){
		var language = '';
		var sAgent = navigator.userAgent.toLowerCase();
		var sign = '';
		if(sAgent.indexOf('rv') != -1)
		sign = '; r';
		else 
		sign = ')';
		var a = sAgent.indexOf('nt');
		var b = sAgent.indexOf(sign);
		var sum = '';
		
		for(var i = 0;i < b - a + 2 && b - a > 0; i++){
			sum += sAgent.charAt(a + i);
		}
		var a_ = sum.indexOf('; ') + 2;
		var b_ = sum.length - 2;
		for(var n = 0;n < b_ - a_ && b_ - a_ > 0; n++){
			language += sum.charAt(a_ + n);
		}
	}else{
		language = "undefind```111";
	}
	return language;
}

/**
 * ��ȡ flash �汾
 */
function getFlashVesion() { 
	var f = "-", n = navigator; 
	if (n.plugins && n.plugins.length) {
	    for (var ii = 0; ii < n.plugins.length; ii++) {
	          if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) { 
	              f = n.plugins[ii].description.split('Shockwave Flash ')[1]; 
	              break; 
	         } 
	    } 
	} else if (window.ActiveXObject) { 
	     for (var ii = 10; ii >= 2; ii--) { 
	        try { 
	           var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');"); 
	           if (fl) { 
	               f = ii + '.0'; 
	              break; 
	           }
	        } catch (e) { 
	       } 
	   } 
	}
	return f; 
}

/**
 * ��ȡ��Ļ�ֱ���
 */
function getResolution(){
	return (screen.width + '*' + screen.height);
}

/**
 * ��ȡ��ɫλ��
 */
function getColorDepth(){
	return screen.colorDepth;
}

/**
 * ��ȡ����ϵͳ
 */
function getSystem(){
	var sys	= '';
	try{
		var sAgent = navigator.userAgent.toLowerCase();
		var a = sAgent.indexOf('windows');
		for(var i = 0 ; i < 14 ; i++){
			sys += sAgent.charAt(a+i);
		}
	}catch(e){
		sys = navigator.platform;
	}
	return sys;
}
/**
 * ����ͳ�ƴ���
 */
<!--Product Counter code-->
//if(productId && productId>9){ �޸�Ϊ�����ж�
if(typeof(productId)!="undefined"){
document.write('<img src=\"//pinterface.yesky.com/counter?rtype=2&rfid='+productId+'"  alt=\'\' border=\'0\' width=\'0\' height=\'0\'>');
}

