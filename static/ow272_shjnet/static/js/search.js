document.domain="shjnet.cn";

//过滤
function filterhtml(str)
{
	return str.replace(/<[^>]*>/g,"");
}

//删除左右两端的空格
function trim(str)
{  
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//删除左边的空格
function ltrim(str)
{  
	return str.replace(/(^\s*)/g,"");
}

//删除右边的空格
function rtrim(str)
{  
	return str.replace(/(\s*$)/g,"");
}

function showNull(str)
{
	if(str == undefined || str == "" || str == "null")
		return "&nbsp;";
	else
		return str
}

function validSearch(form)
{
	var keyword = trim(filterhtml(form.keyword.value));
	if(keyword == "")
	{
		alert("请输入搜索词！");
		return false;
	}

	if(form.searchfield != null)
	{
		var searchfield = form.searchfield.value;
		if(searchfield == "all")
			keyword = "doctitle,doccontent+='" + keyword + "'"
		else
			keyword = searchfield + "='" + keyword + "'";
	}

	form.searchword.value = keyword;
}

function validComment(form)
{
	if(form.userName != null && form.userName.value == "")
	{
		alert("请输入用户名！");
		form.userName.focus();
		return false;
	}
	else if(form.password != null && form.password.value == "")
	{
		alert("请输入密码！");
		form.password.focus();
		return false;
	}
	else if(form.password != null && form.password.value == "")
	{
		alert("请输入密码！");
		form.password.focus();
		return false;
	}
	else if(form.nickname != null && form.nickname.value == "")
	{
		alert("请先登录！");
		window.iframLogin.document.frmLogin.userName.focus();
		return false;
	}
	else if(form.content != null && form.content.value == "")
	{
		alert("请输入评论内容！");
		form.content.focus();
		return false;
	}
	else if(form.CheckingCode != null && form.CheckingCode.value == "")
	{
		alert("请输入验证码！");
		form.CheckingCode.focus();
		return false;
	}
	else
	{
		return true;
	}
}

function reloadImg(imgid)
{
	var objImg = document.getElementById(imgid);
	if(objImg != null)
	{
		objImg.setAttribute("src", "http://ids.shjnet.cn/comment/cn/randCodeGen.jsp?randid=" + Math.random());
	}
}