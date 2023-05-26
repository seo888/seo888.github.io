

$(function(){
	document.oncontextmenu = function(){ 
		return false 
	};

	
	//学院风光
	jQuery(".picScroll-left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,vis:4});
	

});