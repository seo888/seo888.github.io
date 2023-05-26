//20取10
function moreRandom(){
	var arr=[];
	for(var i=0;i<20;i++){
		arr.push(i);
	}
	arr.sort(function(){
		return Math.random()-0.5;
	})
	arr.length=10;
	//console.log(arr);
	for(var i=0;i<arr.length;i++){
		$("#commonList li").eq(arr[i]).show();
	}
}
moreRandom();