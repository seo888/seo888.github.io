// JavaScript Document
		
		
	 $(document).ready(function(){
	  function milismall(){
	   var _show = null;
	  var _hideTimer = null;
	  var planItems = $('div.chartlet_box ul li');
		planItems.each(function(index) {
	
			var li = $(this);
			var div = li.find('div.layerbox');
			div.css("display","none");
			li.bind('mouseenter',function() {
				if (_show != null) {
					clearTimeout(_show);
				}
				_show = setTimeout(function() {
					$('ul._commuity_nav li div.conbox').hide();
					
					div.show('fast');
					
				}, 200);
				});
			  li.bind('mouseleave', function() {
					if (_show != null) {
					clearTimeout(_show);
				}
				_hideTimer = setTimeout(function() {
					div.hide('fast');
					
				}, 200);
				});
			});
	  };
	  milismall();
	  
	  var _show = null;
	  var _hideTimer = null;
	  var planItems = $('ul.chartlet_big li');
		planItems.each(function(index) {
	
			var li = $(this);
			var div = li.find('div.layerbox');
			div.css("display","none");
			li.bind('mouseenter',function() {
				if (_show != null) {
					clearTimeout(_show);
				}
				_show = setTimeout(function() {
					$('ul._commuity_nav li div.conbox').hide();
					
					div.show('fast');
					
				}, 200);
				});
			  li.bind('mouseleave', function() {
					if (_show != null) {
					clearTimeout(_show);
				}
				_hideTimer = setTimeout(function() {
					div.hide('fast');
					
				}, 200);
				});
			});
	 
});

$(document).ready(function(){
function topnav2(){
	 
	  var planItems = $('ul.nav_navcon li');
		planItems.each(function(index) {
		var li = $(this);
		var div= $('li.sel1 a');
			li.mouseover(function() {
				$('ul.nav_navcon li').addClass('');
					li.addClass('sel');
					div.css('border-bottom','none');
					
				});
			  li.mouseout(function() {
					li.removeClass('sel');
					div.css('border-bottom','3px solid #B21112');
				});
			});
	  };
	  topnav2();
	  
	  function topnav1(){
	
	 var _show = null;
	  var _hideTimer = null;
	  var planItems = $('ul.c-fl-ul li.division');
		planItems.each(function(index) {
	       
			var li = $(this);
			
			var div = li.find('div.navshow_div');
			div.css("display","none");
			li.bind('mouseenter',function() {
				if (_show != null) {
					clearTimeout(_show);
				}
				_show = setTimeout(function() {
					$('ul.nav_navcon li').addClass('');
					
					li.addClass('topnav_sel');
					
					
				}, 200);
				});
			  li.bind('mouseleave', function() {
					if (_show != null) {
					clearTimeout(_show);
				}
				_hideTimer = setTimeout(function() {
					li.removeClass('topnav_sel');
					
				}, 200);
				});
			});
	  };
	  topnav1();
	  
	  
	});






function didi(id) {
     document.getElementById("id").className="di"+id;
  }
  
function did(id) {
     document.getElementById("id1").className="dii"+id;
  }

function did1(id) {
     document.getElementById("id2").className="dii1"+id;
  }
  function did2(id) {
     document.getElementById("id3").className="dii2"+id;
  }
   function did3(id) {
     document.getElementById("id4").className="dii3"+id;
   }
     function did4(id) {
     document.getElementById("id5").className="dii4"+id;
  }
     function did5(id) {
     document.getElementById("id6").className="dii5"+id;
  }
   function search_select(id) {
     document.getElementById("id7").className="dii7"+id;
  }
     function weibo(id) {
     document.getElementById("id8").className="dii8"+id;
  }

	
		 	
//tab
function nTabs(thisObj,Num){
if(thisObj.className == "active")return;
var tabObj = thisObj.parentNode.id;
var tabList = document.getElementById(tabObj).getElementsByTagName("li");
for(i=0; i <tabList.length; i++)
{
  if (i == Num)
  {
   thisObj.className = "active"; 
      document.getElementById(tabObj+"_Content"+i).style.display = "block";
  }else{
   tabList[i].className = "normal"; 
   document.getElementById(tabObj+"_Content"+i).style.display = "none";
  }
} 
}


/*lunhuan*/

function focusBox(o){
	if(!o) return;
	var w=320, $o=$('#'+o),i=0,l=0;arr= [],t= null,
		$infoLi = $o.find('.banner_info li'), len= $infoLi.length*2,
		$ul=$o.find('.banner_pic>ul');
	$ul.append($ul.html()).css({'width':len*w, 'left': -len*w/2});
	$infoLi.eq(0).addClass('current');
	//add banner_pages element
	arr.push('<div class="banner_pages"><ul>');
	$infoLi.each(function(i){
		if(i==0){
			arr.push('<li class="current"><span>'+ (i+1) +'</span></li>');
		}else{
			arr.push('<li><span>'+ (i+1) +'</span></li>');
		}
	});
	arr.push('</ul></div>');
	$o.append(arr.join(''));
	var $pagesLi = $o.find('.banner_pages li');
	//mouse
	$pagesLi.children('span').click(function(){
		var p = $pagesLi.index($o.find('.banner_pages li.current'));
		i = $pagesLi.children('span').index($(this));
		if(i==p) return;
		l = parseInt($ul.css('left')) + w*(p-i);
		addCurrent(i,l);
		return false;
	})
	$o.children('a.btn_prev').click(function(){
		i = $pagesLi.index($o.find('.banner_pages li.current'));
		(i==0)? i=(len/2-1):i--;
		l = parseInt($ul.css('left')) + w;
		addCurrent(i,l);
		return false;
	})
	$o.children('a.btn_next').click(function(){
		i = ($pagesLi.index($o.find('.banner_pages li.current'))+1)%(len/2);
		l = parseInt($ul.css('left')) - w;
		addCurrent(i,l);
		return false;
	})
	//auto focus
	t = setInterval(init,8000);
	$o.hover(function(){
		clearInterval(t);
	}, function(){
		t = setInterval(init,8000);
	});
	function init(){
		$o.children('a.btn_next').trigger('click');
	}
	//add focus
	function addCurrent(i,l){
		if($ul.is(':animated')) return;
		$ul.animate({'left':l},500,function(){
			$o.children('.banner_count').text(i+1);
			$infoLi.not($infoLi.eq(i).addClass('current')).removeClass('current');
			$pagesLi.not($pagesLi.eq(i).addClass('current')).removeClass('current');
			if(l== (1-len)*w){
				$ul.css({'left': (1-len/2)*w});
			}else if(l== 0){
				$ul.css({'left': -len*w/2});
			}
		});
	}
}

$(function(){
	focusBox('kakaFocus');
})


/*shouye*/

function setHomePage(obj){
    var aUrls=document.URL.split("/");
    var vDomainName="http://"+aUrls[2]+"/";
    try{//IE
        obj.style.behavior="url(#default#homepage)";
        obj.setHomePage(vDomainName);
    }catch(e){//other
        if(window.netscape) {//ff
            try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
            } 
            catch (e) { 
                    alert("此操作被浏览器拒绝！请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'"); 
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vDomainName);
         }
    }
    if(window.netscape)alert("ff");
}