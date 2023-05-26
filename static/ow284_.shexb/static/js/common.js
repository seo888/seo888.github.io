

jQuery(document).ready(function() {


	//gotop
$(function () {$(window).scroll(function(){if ($(window).scrollTop()>100){$("#gotop").fadeIn(300);}else{$("#gotop").fadeOut(300);}});});
$('#gotop .got').click(function(){
        $('body,html').animate({scrollTop: '0px'}, 500);
});
	
	
});

document.writeln("<div id=\"gotop\"><a href=\"javascript:;\" class=\"got\">返回顶部<\/a><\/div>")



//加入收藏
        function AddFavorite() {
			var sURL=window.location;
			var sTitle=document.title;
            sURL = encodeURI(sURL); 
        try{   
            window.external.addFavorite(sURL, sTitle);   
        }catch(e) {   
            try{   
 
                window.sidebar.addPanel(sTitle, sURL, "");   
 
            }catch (e) {   
 
                alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
 
            }   
 
        }
 
    }
    //设为首页
 
    function SetHome(){
 
        if (document.all) {
 
            document.body.style.behavior='url(#default#homepage)';
 
               document.body.setHomePage('http://www.bashan.com');
 
        }else{
 
            alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
 
        }
 
    }
	
	function saveCode(obj) { 
var winname = window.open('', '_blank', 'top=10000'); 
winname.document.open('text/html', 'replace'); 
winname.document.write(obj.value); 
winname.document.execCommand('saveas','','code.htm'); 
winname.close(); 
} 


