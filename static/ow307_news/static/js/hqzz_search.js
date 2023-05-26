//搜索
	$("#sw").focus(function(){
		var a = $(this).val();
		$(this).val("");
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("请输入检索关键词");
		}
	});

//搜索
function KeyDown()
{
	if (event.keyCode == 13)
	{   
		searchsearch();
	}
}
function searchsearch(){
	var searchword = document.getElementById("sw").value;
	if(searchword.replace(/\s/g)=="请输入检索关键词" ||searchword.replace(/\s/g)=="請輸入檢索關鍵詞" || searchword.replace(/\s/g)==""){
		alert("请输入检索词");
		return;
	}
	function LTrim(s)
	{
		for(var i=0;i<s.length;i++)
			if(s.charAt(i)!=' ')

			 return s.substring(i,s.length);
		 return "";
	}
	function RTrim(s)
	{
		for(var i=s.length-1;i>=0;i--)

			if(s.charAt(i)!=' ')

				return s.substring(0,i+1);

			return "";

	}
	function Trim(s)

	{

		return RTrim(LTrim(s));

	}

	searchword = Trim(searchword);

	searchword = searchword.replace(/\s{1,20}/," ");//只保留一個空格

	var swArray = searchword.split(" ");

	for(var i=0;i<swArray.length;i++)

	{

		if(i==0)
		{

			searchword = Trim(swArray[0]);
		}

		else

		{

			searchword = searchword + "*" + Trim(swArray[i]);
		}

	}
  if(searchword.indexOf("+")>=0){

document.getElementById("searchword").value = "'"+searchword+"'";
}else{
    var newSearchWord =searchword.replace(/\+/g, '\\');
document.getElementById("searchword").value = newSearchWord;
}
	
	document.getElementById("zlb").submit();
}