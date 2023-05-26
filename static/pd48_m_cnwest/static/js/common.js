$(document).ready(function(){
	$("#menuCnwest div a").each(function(i,item){
		if($(this).text() == menuName){
			$(this).addClass("current")
		}
	});
	navScrollEnt("menuCnwest");
	mainMenuEvt();
	goTopEvent();
});
