// JavaScript Document
function bobo_show(id_num,num){
	for(var i = 0;i <= 9;i++){
		if(GetObj("bobo_Menu_" + id_num + i)){GetObj("bobo_Menu_" + id_num + i).className = '';}
		if(GetObj("bobo_box_" + id_num + i)){GetObj("bobo_box_" + id_num + i).style.display = 'none';}
	}
	if(GetObj("bobo_Menu_" + id_num + num)){GetObj("bobo_Menu_" + id_num + num).className = 'active';}
	if(GetObj("bobo_box_" + id_num + num)){GetObj("bobo_box_" + id_num + num).style.display = 'block';}
}
function GetObj(objName){
	if(document.getElementById){
		return eval('document.getElementById("' + objName + '")');
	}else{
		return eval('document.all.' + objName);
	}
}