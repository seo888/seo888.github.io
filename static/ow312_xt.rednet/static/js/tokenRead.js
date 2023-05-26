var __DEFUALTAPIHOST = ((window.location.href.indexOf("172.16.6.2") > 0 || window.location.href.indexOf("127.0.0.1") > 0) ? "http://172.16.6.49:8080" :	"//front-web.rednet.cn");
var defaultNewsTitlePic = pcltLogo = pcltRemark = pcrtLogo = pcrtRemark = pcbLogo = pcbRemark = pccLogo = pccRemark =
	wapLogo = wapLogoRemark = defLogo = defLogoRemark = shareLogo = shareRemark = coverLogo = coverRemark = theme = gzhId =
	wapCi = pcCi = pvShow = wapJumpFlag = dlShare = siteConfig = null;

/**
 * 往json对象添加新建的key和value，key，value是动态的方法
 * @param {Object} json ：json对象
 * @param {Object} prop ：属性（Key）
 * @param {Object} val ： 值
 */
// 参数：json =  ，prop = 属性，val = 值
function checkSiteConfigJson(json) {
	if (!json) return null;
	var keys = ["pcltLogo", "pcltRemark", "pcrtLogo", "pcrtRemark", "pcbLogo", "pcbRemark", "pccLogo", "pccRemark",
		"wapLogo", "wapLogoRemark", "defLogo", "defLogoRemark", "shareLogo", "shareRemark", "coverLogo", "coverRemark",
		"theme", "gzhId", "wapCi", "pcCi", "pvShow", "wapJumpFlag", "dlShare"
	];
	for (var i = 0; i < keys.length; i++) {
		// console.log("keys[i] == "+ keys[i] + " === "+ json[keys[i]])
		if (!json.hasOwnProperty(keys[i]) || json[keys[i]] == '') {
			// console.log(json.hasOwnProperty(keys[i]));
			json[keys[i].toString()] = null;
		}
	}
	return json;
}

/**
 * 初始化站点信息
 */
function initSite() {
	var json = getApi("siteConfig");
	if (json) {

		var newJson = checkSiteConfigJson(json);
		pcltLogo = newJson.pcltLogo;
		pcltRemark = newJson.pcltRemark;
		pcrtLogo = newJson.pcrtLogo;
		pcrtRemark = newJson.pcrtRemark;
		pcbLogo = newJson.pcbLogo;
		pcbRemark = newJson.pcbRemark;
		pccLogo = newJson.pccLogo;
		pccRemark = newJson.pccRemark;
		wapLogo = newJson.wapLogo;
		wapLogoRemark = newJson.wapLogoRemark;
		defLogo = defaultNewsTitlePic = newJson.defLogo;
		defLogoRemark = newJson.defLogoRemark;
		shareLogo = newJson.shareLogo;
		shareRemark = newJson.shareRemark;
		coverLogo = newJson.coverLogo;
		coverRemark = newJson.coverRemark;
		theme = newJson.theme;
		gzhId = newJson.gzhId;
		wapCi = newJson.wapCi;
		pcCi = newJson.pcCi;
		pvShow = newJson.pvShow;
		wapJumpFlag = newJson.wapJumpFlag;
		dlShare = newJson.dlShare;


		return newJson;
	} else {
		return null;
	}
}


/**
 * 从接口拿数据
 */
function getApi(s) {
	console.log('getApi - ' + s);
	var json = null;
	switch (s) {
		case "siteConfig":
			if (siteId) {
				$.ajax({
					type: "get",
					url: __DEFUALTAPIHOST+"/site/config/" + siteId,
					async: false,
					success: function(result) {
						json = result;
						siteConfig = json;
					}
				});
			}
			break;
		case "newsPvNum":
			// 阅读量显示
			if (typeof contentId != "undefined" && siteId) {
			$.ajax({
				type: "get",
				url: __DEFUALTAPIHOST+"/content/clicks/" + siteId + "/" + contentId,
				async: false,
				success: function(result) {
					// json = result;
					$("#numpv").html("阅读：" + result);
				}
			});
			}
			break;

		default:
			break;
	}
	return json;
}


initSite();

/*
* 显示阅读量标签，在相应的位置调用
* @param [Object] contentId

*/
function showClicks() {
	if(pvShow==1){
		getApi("newsPvNum");
	}
}
showClicks();
///////////阅读量临时增加，待PC端模板重构，此处重新规划////////////////////////////////