function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_sChnlid,_sDocChnl,_sChnlDesc)
{
	var PageStart;
	var PageEnd;
	if(_nPageCount == null || _nPageCount<=1){
		return;
	}
	var nCurrIndex = _nCurrIndex || 0;
	document.write("<div class='bwdd_yy'><div class='hc bwdd'><div class='vc'><span class='fb'>");//
	if(nCurrIndex == 0)
	{
		document.write("��ҳ&nbsp;");
		document.write("��һҳ&nbsp;");
		document.write("<font  class='fonttype'>1</font>");
	}
	else
	{
		document.write("<a class='o obg' href=\""+_sPageName+"."+_sPageExt+"\">��ҳ</a>");
		if(nCurrIndex==1)
		{
			document.write("<a class='o obg' href=\""+_sPageName+"."+_sPageExt+"\">��һҳ</a>");
		}
		else
		{
			document.write("<a class='o obg' href=\""+_sPageName+"_"+(nCurrIndex-1)+"."+_sPageExt+"\">��һҳ</a>");
		}
		if(_nPageCount>9&&nCurrIndex>4)
		{								
		}
		else
		{
			document.write("<a class='o obg' href=\""+_sPageName+"."+_sPageExt+"\">1</a>");
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
		document.write("<font  class='fonttype'>"+(i+1) + "</font>");
		else
		document.write("<a class='o obg' href=\""+_sPageName+"_" + i + "."+_sPageExt+"\">"+(i+1)+"</a>");
	}
	if(nCurrIndex<_nPageCount-1)
	{
		document.write("<a class='o obg' href=\""+_sPageName+"_"+(nCurrIndex+1)+"."+_sPageExt+"\">��һҳ</a>");
		document.write("<a class='o obg' href=\""+_sPageName+"_"+(_nPageCount-1)+"."+_sPageExt+"\">βҳ</a>");
	}
	else
	{
		document.write("��һҳ&nbsp;");
		document.write("βҳ&nbsp;");
	}

	document.write("</span></div></div></div>");
}