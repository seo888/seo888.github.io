/**
 * ������л�ͳ��js
 * 
 * ˵����
 * 	������ֻ�����ֹ���
 * 	1.clickͳ��
 * 		clickͳ��Ĭ�������js����Զ�����
 * 		�����Ҫ�ֹ����룬ֱ�ӵ���CNMOPVSITE.pvLog(event)���ɣ�һ��Ϊð�ݱ���ֹ��������õ�
 * 	2.��ǩ�л�ͳ��
 * 		��ͳ�Ʊ����ֹ����룬ֱ�ӵ���CNMOPVSITE.pvLog(event, 'switch');����
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
    //��ǰ�ڵ�
    var element 	= node.parentNode.childNodes;
    //���ڵ�
    var parent 		= node.parentNode;
    //�ڵ�������
    var elementName = node.nodeName;
    var isTrue 	= false;
    var isImg 	= 0;
    var isA		= 0;
    var id 		= '';
    var isOnclick = 0;
    var isBtn	= 0;
    //��ID�����
    if ( node.id ) {
    	for (var i in CNMOPVSITE.config.id) {
    		if (CNMOPVSITE.config.id[i] == node.id) {
    	        isTrue = true;
    	        id     = node.id;
    	        break;
    		}
    	}

    }
    //ͼƬ�����
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
    //click�¼�
    if (node.onclick) {
    	isTrue 		= true;
    	isOnclick   = 1;
    }
    //��ť
    if (node.type=='button'){
        isTrue = true;
        isBtn  = true;
    }

    if(!isTrue && act == 'click'){
        return '';
    }
    // �����ͼƬ ���Ҹ��ڵ��� a��ǩ
    if(isImg && parent.nodeName == 'A'){
        id = parent.id?parent.id:id;
 
    }

    str = !isImg ? nodePoint(element, node) : '';
    while(parent.nodeName != 'BODY'){
        str = str ? (nodePoint(parent.childNodes, parent) + '^' + str) : nodePoint(parent.childNodes, parent);
        parent = parent.parentNode;
    }
    
    new Image().src='//pvsite.cnmo.com/images/ph001.gif?type='+act+'&a='+isA+'&id='+id+'&oc='+isOnclick+'&btn='+isBtn+'&img='+isImg+'&path='+str+'&r='+Math.random();
 
    // element ÿһ��Ľڵ��б�
    // node ��ǰҪ���ҵĽڵ�
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
 
    // ���˿հ׽ڵ�
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
 

