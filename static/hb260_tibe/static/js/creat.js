function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt){
	var PageStart;
	var PageEnd;
	if(_nPageCount == null || _nPageCount<=1){
		return;
	}
	var nCurrIndex = _nCurrIndex || 0;
	if(nCurrIndex == 0)
	{
		document.write("<font color='gray'>首页</font>&nbsp;");
		document.write("<font color='gray'>上一页</font>&nbsp;");
		document.write("<font color='gray'>1</font>&nbsp;");
	}
	else
	{
		document.write("<a href=\""+_sPageName+"."+_sPageExt+"\">首页</a>&nbsp;");
		if(nCurrIndex==1)
		{
			document.write("<a href=\""+_sPageName+"."+_sPageExt+"\">上一页</a>&nbsp;");
		}
		else
		{
			document.write("<a href=\""+_sPageName+"_"+(nCurrIndex-1)+"."+_sPageExt+"\">上一页</a>&nbsp;");
		}
		if(_nPageCount>9&&nCurrIndex>4)
		{								
		}
		else
		{
			document.write("<a href=\""+_sPageName+"."+_sPageExt+"\">1</a>&nbsp;");
		}
	}
	if(_nPageCount>9)
	{
		PageStart = nCurrIndex-4;
		if((nCurrIndex-4)<1)PageStart = 1;
		if((nCurrIndex+5)>_nPageCount) PageStart = _nPageCount-9;
		PageEnd = PageStart +9;
	}
	else
	{
		PageStart = 1;
		PageEnd = _nPageCount;
	}
	for(var i=PageStart; i<PageEnd; i++){
		if(nCurrIndex == i)
		document.write("<font color='gray'>"+(i+1) + "</font>&nbsp;");
		else
		document.write("<a href=\""+_sPageName+"_" + i + "."+_sPageExt+"\">"+(i+1)+"</a>&nbsp;");
	}
	if(nCurrIndex<_nPageCount-1)
	{
		document.write("<a href=\""+_sPageName+"_"+(nCurrIndex+1)+"."+_sPageExt+"\">下一页</a>&nbsp;");
		document.write("<a href=\""+_sPageName+"_"+(_nPageCount-1)+"."+_sPageExt+"\">尾页</a>&nbsp;");
	}
	else
	{
		document.write("<font color='gray'>下一页</font>&nbsp;");
		document.write("<fonc color='gray'>尾页</font>");
	}
}