/**
 * 点击及切换统计js
 * 
 * 说明：
 * 	本程序只有两种功能
 * 	1.click统计
 * 		click统计默认引入该js后会自动计算
 * 		如果需要手工引入，直接调用CNMOPVSITE.pvLog(event)即可，一般为冒泡被阻止的情况会用到
 * 	2.标签切换统计
 * 		该统计必须手工引入，直接调用CNMOPVSITE.pvLog(event, 'switch');即可
 */
if (typeof CNMOPVSITE == 'undefined') {
	var CNMOPVSITE = {};
}
CNMOPVSITE.config = {
	id : ['picr-btRight','deng']
};
CNMOPVSITE.pvLog = function(e, act){
    e = e || window.event;
    var act = typeof act == 'undefined' ? 'click' : act;
    var actLimit = ['click', 'switch'];
    var findIt   = false;
    for (var i in actLimit) {
    	if (actLimit[i] == act) {
    		findIt = true;
    		break;
    	}
    }
    
    if (findIt == false) {
    	return '';
    }
    var num = 0;
    var str = '', str2 = '', id='';
    var node = e.srcElement || e.target;
    //当前节点
    var element 	= node.parentNode.childNodes;
    //父节点
    var parent 		= node.parentNode;
    //节点类型名
    var elementName = node.nodeName;
    var isTrue 	= false;
    var isImg 	= 0;
    var isA		= 0;
    var id 		= '';
    var isOnclick = 0;
    var isBtn	= 0;
    //有ID的情况
    if ( node.id ) {
    	for (var i in CNMOPVSITE.config.id) {
    		if (CNMOPVSITE.config.id[i] == node.id) {
    	        isTrue = true;
    	        id     = node.id;
    	        break;
    		}
    	}

    }
    //图片的情况
    if(parent.nodeName=='A'){
    	isTrue = true;
    	isA	   = 1;
    	if (elementName=='IMG') {
        	isImg  = 1;
    	}
    } else if (elementName == "A") {
    	isTrue = true;
    	isA    = 1;
    }
    //click事件
    if (node.onclick) {
    	isTrue 		= true;
    	isOnclick   = 1;
    }
    //按钮
    if (node.type=='button'){
        isTrue = true;
        isBtn  = true;
    }

    if(!isTrue && act == 'click'){
        return '';
    }
    // 如果是图片 并且父节点是 a标签
    if(isImg && parent.nodeName == 'A'){
        id = parent.id?parent.id:id;
 
    }

    str = !isImg ? nodePoint(element, node) : '';
    while(parent.nodeName != 'BODY'){
        str = str ? (nodePoint(parent.childNodes, parent) + '^' + str) : nodePoint(parent.childNodes, parent);
        parent = parent.parentNode;
    }
    
    new Image().src='//pvsite.cnmo.com/images/ph001.gif?type='+act+'&a='+isA+'&id='+id+'&oc='+isOnclick+'&btn='+isBtn+'&img='+isImg+'&path='+str+'&r='+Math.random();
 
    // element 每一层的节点列表
    // node 当前要查找的节点
    function nodePoint(element, node){
        var str = '';
        var element = c(node.parentNode.childNodes);
        var leng = element.length;
        for(var i=0; i<leng; i++){
            if(element[i] == node){
                str = node.nodeName + ':' + i;
                break;
            }
        }
        return str;
    }
 
    // 过滤空白节点
    function c(e){
        for(var i=0; i<e.length; i++){
            var node = e[i];
            if(node.nodeType == 3 && !/\S/.test(node.nodeValue)){
                node.parentNode.removeChild(node);
            }
        }
        return e;
    }
 

};


if ( window.attachEvent ) {
    document.attachEvent('onclick', CNMOPVSITE.pvLog);
} else {
    document.addEventListener('click', CNMOPVSITE.pvLog, false);
}
 

