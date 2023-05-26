var searchStr="";
var iKeyNum=-1;
var iKeyCount=0,isIE= (document.all) ? true:false;
function searchSuggest(e)
{
	if(isIE)
	{
		key=event.keyCode;		
	}
	else
	{
		key=e.which;
	}
	if(key==38)
	{
		iKeyNum--;
		if(iKeyNum<0)
		{
			iKeyNum=iKeyCount-1;
		}
		$("#search_suggest div").removeClass("suggest_link_over");
		$("#search_suggest div").eq(iKeyNum).addClass("suggest_link_over");
		$("#txtSearch").val($("#search_suggest div").eq(iKeyNum).html());
		return;
	}
	if(key==40)
	{
		iKeyNum++;
		if(iKeyNum>=iKeyCount)
		{
			iKeyNum=0;
		}
		$("#search_suggest div").removeClass("suggest_link_over");
		$("#search_suggest div").eq(iKeyNum).addClass("suggest_link_over");
		$("#txtSearch").val($("#search_suggest div").eq(iKeyNum).html());
		return;
	}
	iKeyNum=-1;
	if ($("#txtSearch").val().length>0&&searchStr!=$("#txtSearch").val())
	{
		searchStr=$("#txtSearch").val();
		var str=escape(document.getElementById('txtSearch').value);
		$.get("/action/?s=kw&k="+str+ "&t=" +  new Date().getTime(),function(data,status){
		data=eval ("(" + data + ")");
		if(data.state=="true")
		{
			var ss=$("#search_suggest");		
			$("#search_suggest").html("");
			var keyword=data.keyword;	
			if (keyword.length>0)
			{
				iKeyCount=keyword.length;
				$("#search_suggest").show();
				for (i=0;i<keyword.length;i++ )
				{
					var suggest='<div onmouseover="javascript:suggestOver(this);" onmouseout="$(\'#search_suggest div\').removeClass(\'suggest_link_over\');" onclick="javascript:setSearch(this.innerHTML);" >'+keyword[i]+'</div>';
					$("#search_suggest").html($("#search_suggest").html()+suggest);
				}				
			}
			else
			{
				$("#search_suggest").html();
				$("#search_suggest").hide();
			}
		}
		else
		{
			$("#search_suggest").html();
			$("#search_suggest").hide();
		}
	});
	}
	else
	{
		$("#search_suggest").html();
		$("#search_suggest").hide();
	}
}

function suggestOver(div_value)
{
	iKeyNum=$("#search_suggest div").index(div_value);
	div_value.className='suggest_link_over';
}

function setSearch(div_value)
{
	if(div_value!="")
	{
   		$("#txtSearch").val(div_value);
   		document.seacrh.submit();
	}
   $("#search_suggest").html("");
   $("#search_suggest").hide();
}

function action_search()
{
    if(document.seacrh.w.value=="")
    {
        alert("请输入关键字！");
        return false;
    }
	return true;
}

function check_search()
{
	if(document.getElementById("searchCheck").style.display!="block")
	{
		document.getElementById("searchCheck").style.display="block";
	}
	else
	{
		document.getElementById("searchCheck").style.display="none";
	}
	var obj=document.getElementById("searchCheck").getElementsByTagName("li");
	for(var i=0;i<obj.length;i++)
	{
		obj[i].className="";
	}
}

function searchOverCheck(objs)
{
	var obj=document.getElementById("searchCheck").getElementsByTagName("li");
	for(var i=0;i<obj.length;i++)
	{
		obj[i].className="";
	}
	objs.className="over";
}

function searchCheckSort(s)
{
	if(s==1)
	{
		document.getElementById("searchSort").innerHTML="信息";
		document.getElementById("searchS").value="1"
	}
	if(s==2)
	{
		document.getElementById("searchSort").innerHTML="商家";
		document.getElementById("searchS").value="2"
	}
	if(s==3)
	{
		document.getElementById("searchSort").innerHTML="文章";
		document.getElementById("searchS").value="3"
	}
	if(s==4)
	{
		document.getElementById("searchSort").innerHTML="问答";
		document.getElementById("searchS").value="4"
	}
	document.getElementById("searchCheck").style.display="none";
}
