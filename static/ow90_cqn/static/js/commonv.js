function ShowCalendar() {
    today = new Date();
	var today_year = (today.getYear() < 1900) ? (1900 + today.getYear()) : today.getYear();
    function initArray() {
        this.length = initArray.arguments.length
        for (var i = 0; i < this.length; i++)
            this[i + 1] = initArray.arguments[i]
    }
    var d = new initArray(
    "<font color=red>星期日</font>",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "<font color=red>星期六</font>");
    document.write(
    "<font style='font-size:9pt;font-family:宋体'> ",
    today_year, "年",
    today.getMonth() + 1, "月",
    today.getDate(), "日 ",
    d[today.getDay() + 1],
    "</font>");
}
function ConfirmDel(Text) {
    if (confirm(Text)) {
        return true;
    }
    else {
        return false;
    }

}
function GoToUrl(Url, Target, Parms) {
    switch (Target) {
        case "_Self":
            location.href = Url;
            break;
        case "_Top":
            top.href = Url;
            break;
        case "_Parent":
            parent.href = Url;
            break;
        case "_Main":
            main.href = Url;
            break;
        case "_Blank":
            window.open(Url, "", Parms);
            break;
        default:
            location.href = Url;
            break;
    }
    return true;
}
function Equals(Value1, Value2, Text, Object) {
    if (Value1 == Value2) {
        if (typeof (Object) == "function") {
            Object;
            return true;
        }
        else {
            return true;
        }
    }
    else {
        alert(Text);
        return false;
    }
}
function DisplaySubDiv(objId) {
    //alert(objId);
    var objdiv;
    var objimg;
    objdiv = document.getElementById(objId + "_Sub");
    objimg = document.getElementById(objId + "_IMG");
    if (objdiv.style.display == '') {
        objdiv.style.display = 'none';
        objimg.src = '/images/dir_close.gif';
    }
    else {
        objdiv.style.display = '';
        objimg.src = '/images/dir_open.gif';
    }
    return true;
}
function GetValueByName(objname, classname, objId, objname2, classname2, objId2) {
    var objarrary;
    var values = "|";
    var values2 = "|";

    //    alert(objname+"|"+classname+"|"+objId);
    //    alert(objname2+"|"+classname2+"|"+objId2);
    objarrary = document.getElementsByName(objname);
    for (i = 0; i < objarrary.length; i++) {
        if (objarrary[i].checked) {
            values += objarrary[i].value.split('#')[0] + "|";
            values2 += objarrary[i].value.split('#')[1] + "|";
        }
    }
    if (objId == '' || typeof (window.opener.document.getElementById(objId)) == 'undefined' || window.opener.document.getElementById(classname) == 'undefined') {
        return values;
    }
    else {
        window.opener.document.getElementById(objId).value = values;
        window.opener.document.getElementById(classname).value = values2;
    }

    /*单选区间*/

    var values3 = "";
    var values4 = "";
    objarrary = document.getElementsByName(objname2);
    for (i = 0; i < objarrary.length; i++) {
        if (objarrary[i].checked) {
            values3 += objarrary[i].value.split('#')[0];
            values4 += objarrary[i].value.split('#')[1];
            break;
        }
    }
    if (objId2 == '' || typeof (window.opener.document.getElementById(objId2)) == 'undefined' || window.opener.document.getElementById(classname2) == 'undefined') {
        return values;
    }
    else {
        window.opener.document.getElementById(objId2).value = values3;
        window.opener.document.getElementById(classname2).value = values4;
    }

}
function InitValueByName(objname, classname, objId, objname2, classname2, objId2) {
    var iobjarrary;
    var ivalues = "";
    var ivalues2 = "";
    //    alert(objname+"|"+classname+"|"+objId);
    //    alert(objname2+"|"+classname2+"|"+objId2);
    if (objId == '' || typeof (window.opener.document.getElementById(objId)) == 'undefined' || window.opener.document.getElementById(classname) == 'undefined') {
        alert("在初始化类别多选区的过程中出现错误，错误信息：对象不存在！");
    }
    else {
        iobjarrary = document.getElementsByName(objname);
        ivaluearrary = window.opener.document.getElementById(objId).value.split("|");
        window.opener.document.getElementById(classname).value = "";
        for (i1 = 0; i1 < iobjarrary.length; i1++) {
            for (i2 = 0; i2 < ivaluearrary.length; i2++) {
                if (iobjarrary[i1].value.split("#")[0] == ivaluearrary[i2]) {
                    //                    if(i1<3)
                    //                    {
                    //                        alert("object:"+iobjarrary[i1].value.split("#")[0]+"values:"+ivaluearrary[i2]);
                    //                    }
                    iobjarrary[i1].checked = true;
                    window.opener.document.getElementById(classname).value += "|" + iobjarrary[i1].value.split("#")[1];
                    break;
                }
            }
        }

    }

    /*单选区间*/

    if (objId2 == '' || typeof (window.opener.document.getElementById(objId2)) == 'undefined' || window.opener.document.getElementById(classname2) == 'undefined') {
        alert("在初始化类别单选区的过程中出现错误，错误信息：对象不存在！");
    }
    else {
        objarrary = document.getElementsByName(objname2);
        valuearrary = window.opener.document.getElementById(objId2).value.split("|");
        window.opener.document.getElementById(classname2).value = "";
        for (i = 0; i < objarrary.length; i++) {
            for (ii = 0; ii < valuearrary.length; ii++) {
                if (objarrary[i].value.split("#")[0] == valuearrary[ii]) {
                    objarrary[i].checked = true;
                    window.opener.document.getElementById(classname2).value += "|" + objarrary[i].value.split("#")[1];
                    break;
                }
            }
        }
    }
}
function InitValueByName2(objname, classname, objId) {
    var iobjarrary;
    var ivalues = "";
    //var ivalues2="";
    //    alert(objname+"|"+classname+"|"+objId);
    //    alert(objname2+"|"+classname2+"|"+objId2);
    if (objId == '' || typeof (window.opener.document.getElementById(objId)) == 'undefined' || window.opener.document.getElementById(classname) == 'undefined') {
        alert("在初始化类别多选区的过程中出现错误，错误信息：对象不存在！");
    }
    else {
        iobjarrary = document.getElementsByName(objname);
        ivaluearrary = window.opener.document.getElementById(objId).value.split("|");
        window.opener.document.getElementById(classname).value = "";
        //alert(classname);
        for (i1 = 0; i1 < iobjarrary.length; i1++) {
            for (i2 = 0; i2 < ivaluearrary.length; i2++) {
                if (iobjarrary[i1].value.split("#")[0] == ivaluearrary[i2]) {
                    //                    if(i1<3)
                    //                    {
                    //                        alert("object:"+iobjarrary[i1].value.split("#")[0]+"values:"+ivaluearrary[i2]);
                    //                    }
                    iobjarrary[i1].checked = true;
                    window.opener.document.getElementById(classname).value += "|" + iobjarrary[i1].value.split("#")[1];
                    break;
                }
            }
        }

    }

    /*单选区间*/
    /*    
    if(objId2==''|| typeof(window.opener.document.getElementById(objId2))=='undefined'||window.opener.document.getElementById(classname2)=='undefined')
    {
    alert("在初始化类别单选区的过程中出现错误，错误信息：对象不存在！");
    }
    else
    {
    objarrary=document.getElementsByName(objname2);  
    valuearrary=window.opener.document.getElementById(objId2).value.split("|");
    for(i=0;i<objarrary.length;i++)
    {
    for (ii=0;ii<valuearrary.length;ii++)
    {
    if(objarrary[i].value.split("#")[0]==valuearrary[ii])
    {
    objarrary[i].checked=true;
    window.opener.document.getElementById(classname2).value+="|"+objarrary[i].value.split("#")[1];
    break;
    }
    }
    }          
    }   
    */
}
function ClearValueByName(objname) {
    var objarrary;
    objarrary = document.getElementsByName(objname);
    for (i = 0; i < objarrary.length; i++) {
        if (objarrary[i].checked) {
            objarrary[i].checked = false;
        }
    }
}
function OpenWindows(obj, page, title) {
    window.open(page, title);
    return true;

}
function getPosition(el) {
    for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly }
}
function getPos(el, sProp) {
    var iPos = 0
    while (el != null) {
        iPos += el["offset" + sProp];
        el = el.offsetParent;
    }
    return iPos;
}
function show(el, m) {
    if (m) {
        m.style.display = ' ';
        m.style.pixelLeft = getPos(el, "Left");
        m.style.pixelTop = getPos(el, "Top") + el.offsetHeight;
    }
    if ((m != cm) && (cm))
        cm.style.display = 'none';
    cm = m;
}

/*首页地方频道*/
function showdiv(obj1, obj2) {
    //alert('this is a mouseover!');
    if (obj1.style.visibility == 'hidden') {
        var mytop = obj2.offsetTop;
        var myleft = obj2.offsetLeft;
        while (obj2 = obj2.offsetParent) {
            myleft += obj2.offsetLeft;
            mytop += obj2.offsetTop;
        }
        obj1.style.left = myleft + 5;
        obj1.style.top = mytop + 15;
        obj1.style.visibility = 'visible';
    }
    else {
        obj1.style.visibility = 'hidden';
    }
}
function showdiv2(obj1) {
    if (obj1.style.visibility == 'hidden') {
        obj1.style.visibility = 'visible';
    }
    else {
        obj1.style.visibility = 'hidden';
    }
}
function ShowThis(obj, type) {
    if (type == '1') {
        obj.style.display = '';
    }
    else {
        obj.style.display = 'none';
    }
}
function CheckSearch() {
    var value1 = "";
    var obj;
    if (document.getElementById("tsearch")) {
        value1 = document.getElementById("tsearch").value;
        if ((value1.length <= 0) || value1 == "关键字") {
            alert('关键字不能为空！');
            return false;
        }
        else {
            window.open(ROOTURL + "Search/index.aspx?keyword=" + value1);
            return true;
        }
    }
    else {
        alert("对象不存在！");
        return false;
    }

}
function CheckFootSearch(classid, key) {
    var value1 = "";
    var value2 = "";
    var obj;
    if (document.getElementById(classid)) {
        value1 = document.getElementById(classid).value;
        if ((value1.length <= 0) || (value1 == "0")) {
            value1 = "";
        }
    }
    if (document.getElementById(key)) {
        value2 = document.getElementById(key).value;
        if ((value2.length <= 0) || value2 == "关键字") {
            alert('关键字不能为空！');
            return false;
        }
        else {
            //window.open("Search.aspx?keyword="+value1);
            window.open(ROOTURL + "Search.aspx?" + "classid=" + value1 + "&keyword=" + value2);
            //alert("Search.aspx?"+"classid="+value1+"&keyword="+value2);
            return true;
        }
    }
    else {
        alert("对象[" + key + "]不存在！");
        return false;
    }

}

/**/
function CheckAlls(obj, objname) {
    var checkboxs = document.getElementsByName(objname);
    for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = obj.checked;
    }
    return true;
}
function Master_Article_DelAll(submit_page) {
    if (confirm("确认要删除选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=delall";
        forms.submit();
    }
}
function Master_Article_UnDelAll(submit_page) {
    if (confirm("确认要删除选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=undelall";
        forms.submit();
    }
}
function Master_Article_RealDelAll(submit_page) {
    if (confirm("确认要彻底删除选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=realdelall";
        forms.submit();
    }
}
function Master_Article_AuditAll(submit_page) {
    if (confirm("确认要审核选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=auditall";
        forms.submit();
    }
}
function Master_Article_UnAuditAll(submit_page) {
    if (confirm("确认要取消审核选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=unauditall";
        forms.submit();
    }
}
function Master_Article_MoveAll(submit_page) {
    if (confirm("确认要移动选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=move";
        forms.submit();
    }
}
function Master_Article_QuoteAll(submit_page) {
    if (confirm("确认要引用选中的文章吗？")) {
        var forms = document.forms[0];
        forms.action = submit_page + "?act=quoteall";
        forms.submit();
    }
}
function showvote(index,one,two)
{
	var obj1=document.getElementById("voteid"+index);
	var obj2=document.getElementById("voteid"+one);
	var obj3=document.getElementById("voteid"+two);
	if(obj2)
	{
		obj2.style.display="none";
	}
	if(obj3)
	{
		obj3.style.display="none";
	}
	if(obj1)
	{
		obj1.style.display="block";
	}	
}

function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
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
                 }
        }
}