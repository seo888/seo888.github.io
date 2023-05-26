//列高度统一
function heightFix(column, column2, sign, offset){
	var oCol = jQuery(column);
	var oCol2 = jQuery(column2);
	if(sign == undefined)offset = "+";
	if(offset == undefined)offset = 0;
	if(oCol.height() > oCol2.height()){
		if ( sign=="+" ) { oCol2.height(oCol.height() + offset); }else{ oCol2.height(oCol.height() - offset);  }
	}
}

//获得日期
function RunGLNL(obj){
	var today = new Date();
	var d = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var DDDD = (today.getFullYear()<100 ? today.getFullYear()+1900:today.getFullYear())+"年"+(today.getMonth()+1)+"月"+today.getDate()+"日";
	DDDD = DDDD + " " + d[today.getDay()];
	jQuery(obj).text(DDDD);
}


// 加入收藏代码 Start -->
function AddFavorite( sURL, sTitle ){
    if (document.all){
        try{
            window.external.addFavorite(sURL,sTitle);
        }catch(e){
            alert( "加入收藏失败，请使用Ctrl+D进行添加" );
        }
        
    }else if (window.sidebar){
        window.sidebar.addPanel(sTitle, sURL, "");
     }else{
        alert( "加入收藏失败，请使用Ctrl+D进行添加" );
    }
}

// 设为首页代码 Start -->

function SetHome(pageURL) {
    if (document.all){
        document.body.style.behavior='url(#default#homepage)';
          document.body.setHomePage(pageURL);
    }else if (window.sidebar){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch (e){
                alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',pageURL);
    }else{
        alert('您的浏览器不支持自动自动设置首页, 请使用浏览器菜单手动设置!');
    }
}

//针对ie6增加悬停样式
function hover(obj, className){
		var className = !className ? "hover" : className;
		jQuery(obj).hover(function(){ jQuery(this).addClass(className); },function(){ jQuery(this).removeClass(className); });
}
