// JavaScript Document
///导航
function g(o){return document.getElementById(o);}
function HoverLi(n){
for(var i=1;i<=9;i++){g('tb_'+i).className='nav_n';g('tbc_'+i).className='undis';}g('tbc_'+n).className='dis';g('tb_'+n).className='nav_h';
}


function d(o){return document.getElementById(o);}
function dLi(n){
for(var i=1;i<=3;i++){d('db_'+i).className='dmt_n';d('dbc_0'+i).className='undis';}d('dbc_0'+n).className='dis';d('db_'+n).className='dmt_h';
}




////// 排行榜
  function pl_change(num){
		  for(var i=1;i<3;i++){
		  var menu=document.getElementById("pl_menu_"+i);
		  var content=document.getElementById("pl_content_"+i);
		  if(content==null){
			return;
		  }
		  if(num==i){
		  	content.className="pl_content_show";
			menu.className="pl_menu_show";
		  }else{
		  	content.className="pl_content_hidden";
			menu.className="pl_menu_hidden";
		  }
		  }
	  }
	  var j=1;
	  function changePl(){
	  j+=1;
	  if(j>2){
	  j=1;
	  }
	  pl_change(j);
		//window.status=j.toString();
		cid=window.setTimeout(changePl,5000);
	  }
	 cid=window.setTimeout(changePl,5000);




////// 热点
function initFeatureSlide(strId) {
    var domRoot = document.getElementById('feature-slide-block');
    if (!domRoot) return;
    domRoot.list = [];
    var children = domRoot.childNodes;
    var offset = 0;
    for (var i in children) {
        var domItem = children[i];
        if (domItem && domItem.className == 'feature-slide-preview') {
            domRoot.list.push(domItem);
            domItem.offset = offset;
            offset++;
        }
    }
    var domList = document.getElementById('feature-slide-list-items');
    if (!domList) return;
    domList.innerHTML = '';
    domList.items = [];
    for (var i = 0; i < domRoot.list.length; i++) {
        var temp = domRoot.list[i];
        var domItem = document.createElement('a');
        domList.appendChild(domItem);
        domItem.href = '#';
        domItem.onclick = function(){
            return false;
        }
        domList.items.push(domItem);
        domItem.offset = i;
    }
    var domPreviousBtn = document.getElementById('feature-slide-list-previous');
    var domNextBtn = document.getElementById('feature-slide-list-next');
    domPreviousBtn.onclick = function(evt) {
        evt = evt || window.event;
        var target = evt.target || evt.srcElement;
        var offset = domList.current.offset;
        offset--;
        if (offset >= domList.items.length || offset < 0)
            offset = domList.items.length - 1;
        target.blur();
        doSlide(offset);
        return false;
    }
    domNextBtn.onclick = function(evt) {
        evt = evt || window.event;
        var target = evt.target || evt.srcElement;
        var offset = domList.current.offset;
        offset++;
        if (offset >= domList.items.length || offset < 0)
            offset = 0;
        target.blur();
        doSlide(offset);
        return false;
    }
    domRoot.current = domRoot.list[0];
    domList.current = domList.items[0];
    domRoot.current.style.display = 'block';
    domList.current.className = 'current';
    function doSlide(offset, timeStamp) {
        if (
            timeStamp &&
            (
                domRoot.boolHover ||
                timeStamp != domRoot.timeStamp
                )
                ) return;

        if (typeof(offset) != 'number') {
            offset = domList.current.offset - (-1);
            if (offset >= domList.items.length || offset < 0)
                offset = 0;
        }
        domRoot.current.style.display = 'none';
        domList.current.className = '';
        domRoot.current = domRoot.list[offset];
        domList.current = domList.items[offset];
        domRoot.current.style.display = 'block';
        domList.current.className = 'current';
        if (domRoot.boolHover) return;
        var now = new Date();
        domRoot.timeStamp = now.valueOf();
        window.setTimeout(function() {
            doSlide(null, now.valueOf());
        }, 12000);
    }
    domList.onmouseover = domList.onclick = function (evt) {
        evt = evt || window.event;
        var target = evt.target || evt.srcElement;
        while (target && target != domList) {
            if (target.tagName.toLowerCase() == 'a') {
                target.blur();
                doSlide(target.offset);
                return false;
            }
            target = target.parentNode;
        }
    }
    domRoot.onmouseover = domRoot.onmousemove = function() {
        domRoot.boolHover = true;
    }
    domRoot.onmouseout = function(evt) {
        domRoot.boolHover = false;
        var now = new Date();
        domRoot.timeStamp = now.valueOf();
        window.setTimeout(function() {
            doSlide(null, now.valueOf());
        }, 12000);
    }
    var now = new Date();
    domRoot.timeStamp = now.valueOf();
    window.setTimeout(function() {
        doSlide(null, now.valueOf());
    }, 12000);
}	 



function q(o){return document.getElementById(o);}
function qLi(n){
for(var i=1;i<=10;i++){q('qb_'+i).className='kl_l_cbg_n';q('qbc_'+i).className='undis';}q('qbc_'+n).className='dis';q('qb_'+n).className='kl_l_cbg_h';
}


