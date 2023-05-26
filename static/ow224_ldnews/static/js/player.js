
window.onload=function(){
    var test  =document.querySelector("video");
    test.controls=1;
  //  test.getAttributeNode("style").value="position: relative; max-width: 100%; min-width: 100%; height: auto;";
  //  test.controls=controls;
    //console.log(test.controls);
   // var img_url='http://img.ldnews.cn/logo.png';
    //var video_html = '<p style="text-align:center;"><video id="player_video_"controls="controls" autoplay="autoplay" width="100%" height="400" poster="'+img_url+'">'+'<source src="'+test.src+'" type="video/mp4"></video></div>';
  //  console.log(video_html);
    
   // test.innerHTML=video_html;
     
   test.style.width="90%";
   test.style.height="auto";
   test.poster="http://upload.ldnews.cn/2021/1014/1634202792290.jpg";

    
   
}

