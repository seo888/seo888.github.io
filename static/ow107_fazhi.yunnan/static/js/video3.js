function understands_video() {return !!document.createElement('video').canPlayType;}
function playVideo(videoSrc, videoPlace){
  if(videoSrc.substring(0,2) == '//'){
    videoSrc = window.location.protocol + videoSrc;
  }
  if (document.getElementById(videoPlace)) {
    if(videoSrc.indexOf('http') == -1){
      videoSrc = 'https:' + videoSrc;
    }
    var poster = document.getElementById('vidpic').value;
    if(poster != ''){
      if(poster.indexOf('http') == -1){
        poster = 'https:' + poster;
      }
    }else{
      poster = 'https://commondata.yunnan.cn/video/ynsp.jpg';
    }
    document.getElementById(videoPlace).innerHTML = '<video width="640" height="360" controls="controls" preload="metadata" poster="'+poster+'"><source src="'+videoSrc+'" type="video/mp4" ></video>';
  }
}<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2023-02-28 11:33:34" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->