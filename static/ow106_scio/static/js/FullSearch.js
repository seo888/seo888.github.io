// JScript 文件
//定义访问后台程序的脚本块
function JumpToFullSearch(SearchControlID,SiteIP,Port,VirPath,Target,SiteID,SearchMethod,CustomUrl)
{   
   var SearchURL;
   var SearchPrefix;

   if (VirPath != null && VirPath.length > 1) {
       SearchPrefix = "http://" + SiteIP + ":" + Port + "/" + VirPath ;
   }
   else {
       SearchPrefix = "http://" + SiteIP + ":" + Port;
   }
   
   
   if (SearchMethod == "1") { //基本搜索
        SearchURL = SearchPrefix + "/_Extend/DocumentSearch/BaseSearch.aspx";
   }
   else if (SearchMethod == "2") { //kbase搜索
        SearchURL = SearchPrefix + "/_Extend/FullSearch/FullSearch.aspx";
   }
   else if (SearchMethod == "3") { //自定义搜索
        if (CustomUrl.charAt(0) == '/') { //以“/”开始表示相对路径
            SearchURL = SearchPrefix + CustomUrl;
        }
       else {
            SearchURL = CustomUrl;
       }
   }   

   var Query="?siteid="+SiteID;

   
   try
   {
     var oKeyWord=document.getElementById(SearchControlID+"_Keyword");
     var oChannelID=document.getElementById(SearchControlID+"_ChannelID");
     
     if(oKeyWord!=null)
     {
       Query=Query+"&KeyWord="+escape(oKeyWord.value);
     }
     if(oChannelID!=null)
     {
       Query=Query+"&ChannelID="+oChannelID.value;
     }

      window.open(SearchURL+Query,Target);  
  }
  catch(e){}
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7cd4be5b075ad771f065c6fe4059883a";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();