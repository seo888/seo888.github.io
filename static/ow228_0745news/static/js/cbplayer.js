
/*window.onload=function(){
	var test  = document.getElementById('contentid').innerHTML
	var  ck_p =/\[cbplayer\](.[^<>]*)\[\/cbplayer]/gi;
   var  res =  test.match(ck_p);
  // var m=ck_p.exec(test);
   //console.log(test.match(ck_p));
   //document.write(test.match(ck_p)); 
    //console.log(res[0]);
    var cb_data = str_cut(res[0]);
	 cb_arr=cb_data.split("_cubo_");
	 console.log(cb_arr);
	 mp4_url =cb_arr[1];
	 img_url =cb_arr[0];
	var video_html = '<div style="text-align:center;"><video id="cbplayer_video_"controls="controls" autoplay="autoplay" width="100%" height="300" poster="http://'+img_url+'">'+'<source src="http://'+mp4_url+'" type="video/mp4"></video></div>';
	var test_rulst =  test.replace(ck_p,video_html)
	 document.getElementById('contentid').innerHTML=test_rulst;
}
function  str_cut(str){
	 return str.slice(10,-11);
	
}*/

window.onload=function(){
	var test  =document.getElementsByClassName("cbvideo");
    //console.log(test);
	for(var i=0;i<test.length;i++){
		var  videoflg =test[i].childNodes;
		    var  tag = videoflg[0];
			var  tag_name = videoflg[0].nodeName;
			if(tag_name=="IMG"||tag_name=="img"){
				console.log(tag_name+"_dddd");
				var cb_data =tag.getAttribute("data-cb");
						 cb_arr=cb_data.split("_cubo_");
						 console.log(cb_arr);
						 mp4_url =cb_arr[1];
						 img_url =cb_arr[0];
						var video_html = '<div style="text-align:center;"><video id="cbplayer_video_"controls="controls" autoplay="autoplay" width="100%" height="300" poster="http://'+img_url+'">'+'<source src="http://'+mp4_url+'" type="video/mp4"></video></div>';
						document.getElementsByClassName("cbvideo")[i].innerHTML=video_html;
			}
			
		
		
		
	   /*var cb_data =test[i].getAttribute("data-video");
		 cb_arr=cb_data.split("_cubo_");
		 console.log(cb_arr);
		 mp4_url =cb_arr[1];
		 img_url =cb_arr[0];
		var video_html = '<div style="text-align:center;"><video id="cbplayer_video_"controls="controls" autoplay="autoplay" width="100%" height="300" poster="http://'+img_url+'">'+'<source src="http://'+mp4_url+'" type="video/mp4"></video></div>';
		//var test_rulst =  test.replace(ck_p,video_html)
		document.getElementsByClassName("cbvideo")[i].innerHTML=video_html;*/
	}
   
}

