  // onclick="SetHome(this,window.location)"  
  function SetHome(obj,vrl){   
    try{   
    obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);   
    }   
    catch(e){   
      if(window.netscape) {   
        try {   
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");   
        }   
        catch (e) {   
          alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");   
        }   
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);   
        prefs.setCharPref('browser.startup.homepage',vrl);   
        }else{   
          alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");   
        }   
      }   
  } 
  //onclick="AddFavorite('我的网站',location.href)"
	function AddFavorite(title, url) {
		try {window.external.addFavorite(url, title);
		}catch (e) {
			try {window.sidebar.addPanel(title, url, "");
			}catch (e) {alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");}
		}
	}