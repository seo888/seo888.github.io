
function _addFavorite() {
	var title = document.title
	var url = document.location.href
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("msie 8") > -1) {
		external.AddToFavoritesBar(url, title, '');//IE8
	} else {
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");//firefox
			} catch (e) {
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	}
}
function _setHome(obj, url) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage(url);
	}
	catch (e) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage', url);
		}
	}
}
function isValidMail(_email) {
	if ("" == _email)
		return false;
	var re = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
	return (re.test(_email));
}
function getFormJsonData(id) {
	if (id == undefined)
		id = "FormObj";
	return $("[" + id + "]").serialize();
}
function ajaxRequest(url, jsondata, callback) {
	$.ajax({
		type: "POST", url: url, data: jsondata, dataType: 'json',
		success: function (res) {
			callback(res);
		}
	});
}