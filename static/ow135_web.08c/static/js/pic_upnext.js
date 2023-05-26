function upNext(bigimg){
	var Pic_imgurl		= Pic_righturl;
	var Pic_width	= bigimg.width;
	var Pic_height	= bigimg.height;
	bigimg.onmousemove=function(){
		if(event.offsetX<Pic_width/2){
			if (Pic_lefturl==""){
				if(Pic_righturl!=""){bigimg.style.cursor = 'url(/webadmin/images/arr_right.cur),auto';bigimg.title = '下一页>>';Pic_imgurl=Pic_righturl;}
			}else{
				bigimg.style.cursor = 'url(/webadmin/images/arr_left.cur),auto';bigimg.title = '上一页>>';Pic_imgurl=Pic_lefturl;}
		
		}else{
			if (Pic_righturl==""){
				if(Pic_lefturl!=""){bigimg.style.cursor	= 'url(/webadmin/images/arr_left.cur),auto';bigimg.title = '上一页>>';Pic_imgurl=Pic_lefturl;}
			}else{
				bigimg.style.cursor = 'url(/webadmin/images/arr_right.cur),auto';bigimg.title = '下一页>>';Pic_imgurl=Pic_righturl;}
		}
	}
	bigimg.onmouseup=function(){if(Pic_imgurl!=""){location=Pic_imgurl;}}
}