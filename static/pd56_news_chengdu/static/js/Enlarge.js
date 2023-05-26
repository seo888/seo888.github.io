document.getElementById('enlarge').style.display='none';
let dm_box = document.getElementById('main');
if(dm_box!=null || dm_box!=undefined){
	 var dm = dm_box.querySelectorAll('.enlarge');
	 function mousePosition(e)
	  {
	      if(e.pageX && e.pageY)
	      {
	          return {
	              x : e.pageX,
	              y : e.pageY
	          };
	      }
	      var scrollElem = (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
	      return {
	          x: e.clientX + scrollElem.scrollLeft,
	          y: e.clientY + scrollElem.scrollTop
	      };
	  }
	  const enlarge = document.getElementById('enlarge');
	  const spread = document.getElementById('spread');
	  var boxWidth = 400; var boxHeight = 400;
	  function boost(that) {
	      enlarge.style.width = boxWidth + 'px';
	      enlarge.style.height = boxHeight +'px';
	     var x1 = mousePosition(event).x;
	      var y1 = mousePosition(event).y;
	      enlarge.style.left =  mousePosition(event).x + 5 + 'px';
	      enlarge.style.top =  mousePosition(event).y  + 5+'px';
	      spread.src = that.src;
	      var Left = (x1-that.offsetLeft)/ that.clientWidth * spread.clientWidth;
	      var Top = (y1- that.offsetTop )/that.clientHeight * spread.clientHeight;
	      if(Left <(spread.clientWidth - 400)){ spread.style.left = -(Left)+'px';}else{spread.style.left = -(spread.clientWidth - 400)+'px';}
	      if(Top < (spread.clientHeight - 400)){spread.style.top = -(Top)+'px';}else{spread.style.top = -(spread.clientHeight - 400)+'px';}
	  }
	 enlarge.onmouseover = function (event) {
	          this.style.display = 'none'
	 };
	  for(var i = 0;i<dm.length;i++){
	       dm[i].onmouseover = function (event) {
	           enlarge.style.display = 'block';
	           //获取图片原始大小
	           spread.style.width = this.naturalWidth + 'px';
	           spread.style.height = this.naturalHeight + 'px';
	           boost(this)
	       };
	      dm[i].onmousemove = function (event) {
	             boost(this);
	      };
	      dm[i].onmouseout = function () {
	          enlarge.style.display = 'none';
	      }
	  }
	 
}



 
// 稿子修改样式
/*let new_p = document.querySelectorAll('.con-p2');
if(new_p!=null || new_p!=undefined){

	let ly = new_p[0].querySelectorAll('img');
	if(ly.length>0){
		for(let i=0;i<ly.length;i++){
			console.log(ly[i].parentNode);
			var par = ly[i].parentNode;
			par.classList.add("img_title")
		}
	}
	//document.getElementById("id").classList.add("className")

}*/
