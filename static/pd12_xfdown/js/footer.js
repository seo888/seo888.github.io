
if(typeof census_word=="undefined" && $("body#list-page").length>0)document.write('<script src="https://www.anfensi.com/statics/js/nodomain.js"></scri' + 'pt>');
function ischkwords(){
	if (typeof census_word == "undefined") return false;
	for(i=0;i<census_word.length;i++){
		if(document.title.indexOf(census_word[i]) !=-1)return true;
	}
	return false;
}

$(".soBox").click(function(){return window.location.href="/search/hotsearch.html",!1});
$("footer.bottom p a:last").after('|<a href="/feedback.html?tit=' + document.title + '">举报反馈</a></a>');
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

(function(){
var el = document.createElement("script");
el.src = "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?d556c8e7c723658538ba95242402fe9d6008be35d3aa4b8fc28d959eee7f7b82c112ff4abe50733e0ff1e1071a0fdc024b166ea2a296840a50a5288f35e2ca42";
el.id = "ttzz";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(el, s);
})(window);

$(function () {
//m.xfdown.com
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7c80d2a2db92cf0f39fcc51978f05360";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
/*2016-07-13 add*/
    if ( typeof _webInfo != "undefined")
    {
		var userstat=true;
		if (typeof _pageinfo != "undefined"){
			if(_pageinfo.softname.indexOf("暂未上线")!=-1 || _pageinfo.softlicence=="下架")userstat=false;
		}
		if(ischkwords()||$("body#alist").length>0)userstat=false;

        //add tongji for everyBJ
        var bjname=_webInfo.Username;
        var hm = document.createElement("script");
        if(bjname!=''&&userstat){
            
            switch (bjname){
                case 'downcc':
					var curtime=_webInfo.DateTime;
					var date1 = new Date("2015/11/31");
					var date2 = new Date(curtime);
					if(date1.getTime() < date2.getTime()){
						hm.src="https://hm.baidu.com/hm.js?";
					}   
					break;
                case 'mayue':
                    hm.src="https://hm.baidu.com/hm.js?9076308fbba0fb848a2aa9f0f0860c35";
                    break;
                case 'fanxiang':
                    hm.src="https://hm.baidu.com/hm.js?6ee79b9126e90b8a666ab9d14720e902";
                    break;
                case 'zhangjinsheng':
                    hm.src="https://hm.baidu.com/hm.js?07df54334e22ff7f53de92b4b805ff9d";
                    break;
                case 'zhangjuan':
                    hm.src="https://hm.baidu.com/hm.js?a5ea6deadd8098e43147faa0c71abb73";
                    break;
                case 'guohao':
                    hm.src="https://hm.baidu.com/hm.js?76652133a4569d123c5f7f51809f47d5";
                    break;
                case 'liuming':
                    hm.src="https://hm.baidu.com/hm.js?06e6924544899241a4dd6e6a1b3a5e11";
                    break;
                case 'yanghaibo':
                    hm.src="https://hm.baidu.com/hm.js?9e5da0ffb8220a109c63fedae105d664";
                    break;

                case 'ronghuan':
                    hm.src="https://hm.baidu.com/hm.js?d7bde32853e5d0d05196d5cf329a0c49";
                    break;
                case 'yangpei':
                    hm.src="https://hm.baidu.com/hm.js?4326c0bb9552f0eace896c54211fbdb4";
                    break;
                case 'zhaojin':
                    hm.src="https://hm.baidu.com/hm.js?f29eacedb2d4fc3704f66bb315172f50";
                    break;
                case 'qiukun':
                    hm.src="https://hm.baidu.com/hm.js?de89f777fab6ea006b27179cf6e6a4a5";
                    break;
                case 'chenhonggui':
                    hm.src="https://hm.baidu.com/hm.js?99ec13485c36ac0cc995b60c43f167a8";
                    break;

            }
            if(hm.src!=''){
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            }
        }
   }

	var chkw=(typeof ischkwords === "function" ? ischkwords() : false);
	if(chkw||(typeof nodownurl!="undefined" && nodownurl)||$("body#alist").length>0){
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?56785ecd594afa8bd55a98669cc7db60";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	}


 
});



$(function(){
	if ($("#CommentTpye")&&$("#app-id")){
		var id=$("#app-id").val();
		var cmshit=sessionStorage['cmshit'+id]?sessionStorage['cmshit'+id]:"";
		if($("#CommentTpye").val()=="1"&&cmshit==""){
			$.get("/ajax.asp?action=4&id="+id, function(msg){sessionStorage['cmshit'+id]="1";});
		}
	}

	addFoot();//返回顶部
	addsou();
	$(".m-nav-btn").click(function(){
		var n = $(this).attr("data-num");
		if(n==0){
			$(this).next().next("div").show();
			$(this).attr("data-num",1);
		}else{
			$(this).next().next("div").hide();
			$(this).attr("data-num",0);
		}
	})
	var a = 1;
    $(".menu").click(function(){
	    if(a==1){
			$(this).addClass("open").removeClass("close");
			a = 2;
		}else{
			$(this).addClass("close").removeClass("open");
			a = 1;
		}
   })
	$(".plist").each(function(i){//横向多个滑动
		var idStr = $(this).attr("id");
	 	var parent_class =  $(this).attr("class");
		var child_class =  $("."+parent_class).children(i).children(0).attr("class");
		createIScroll(idStr,"g-ppt-btn");
	});
	var openUrl = "";	
	$(".bdcs-search-form-input").keyup(function(){
		 if(event.keyCode == 13){
			event.preventDefault();
			keywordCont();
		 }
	})
	$('.bdcs-search-form-input').bind({ 
       focus:function(){ 
         if (this.value == this.defaultValue){ 
           this.value=""; 
         } 
       }, 
       blur:function(){ 
         if (this.value == ""){ 
            this.value = this.defaultValue; 
         } 
       }  
    }); 
	$(".bdcs-search-form-submit").click(function(){
		event.preventDefault();
		keywordCont()
	})	
	
	function keywordCont(){
		var falseWords = ["_","+","破解","注册机"];
		var keyFont = $(".bdcs-search-form-input").val();
		if(keyFont != ""){
			for(i=0;i<falseWords.length;i++){
				if(keyFont.indexOf(falseWords[i]) != -1){
					alert("不允许有非法字符");
					return false;
				}	
			}	
			if (browser.versions.android) {	
				openUrl = "http://s.xfdown.com/search/m/"+keyFont+"_android_rank.html";
			}else{
				openUrl = "http://s.xfdown.com/search/m/"+keyFont+"_ios_rank.html";
			}		
			//window.location.href = openUrl;	
			window.location.href ="http://s.xfdown.com/m/?k="+encodeURIComponent(keyFont);
		}else{
			window.location.href="http://s.xfdown.com";
		}
	}
});
function addsou(){
	var arr = ["映客直播","爱奇艺","阴阳师","倩女幽魂","影音先锋","王者荣耀","陌陌","猎魂觉醒","我叫mt","大天使之剑","恋与制作人","极品芝麻官","我的世界","火影战记","决战平安京","天使纪元","拳皇","口袋妖怪","火柴人联盟","三国志","时空猎人","大话西游","梦幻西游"]; 
		var index = Math.floor((Math.random()*arr.length)); 
	$(".bdcs-search-form-input").attr("value",arr[index])

}


function addFoot(){
	$(window).scroll(function(){
		if($(window).scrollTop()>300){
			$("#goTop").fadeIn("fast");
		}else{
			$("#goTop").fadeOut("fast");
		}
	});
	$("#goTop").click(function(){
		$("html,body").animate({scrollTop:0},200)
	});
}