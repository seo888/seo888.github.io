function copyToClipBoard(){
   var clipBoardContent=''; 
   clipBoardContent+=document.title;
   clipBoardContent+=window.location;
   window.clipboardData.setData("Text",clipBoardContent);
   alert("CTRL+V 粘贴到QQ或MSN分享给您的好友~！")
}


document.write(" <a href=\"javascript:copyToClipBoard()\"><img src='/images/moban20/txt.gif' alt='复制网址和标题' border='0'>复制网址</a> ");

document.write(" <a href=\"javascript:window.open('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=450,height=400');void(0)\"><img src='/images/moban20/12.jpg' alt='添加到新浪微博' border='0'>新浪微博</a> ");

document.write(" <a href=\"javascript:window.open('http://www.kaixin001.com/repaste/share.php?rtitle='+encodeURIComponent(document.title)+'&rurl='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=700,height=600');void(0)\"><img src='/images/moban20/14.jpg' alt='添加到开心网' border='0'>开心网</a> ");

document.write(" <a href=\"javascript:window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=700,height=600');void(0)\"><img src='/images/moban20/13.jpg' alt='添加到QQ空间' border='0'>QQ空间</a> ");

document.write(" <a href=\"javascript:window.open('http://apps.hi.baidu.com/share/?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=700,height=600');void(0)\"><img src='/images/moban20/baidu.ico' alt='添加到百度空间' border='0'>百度空间</a> ");

document.write(" <a href=\"javascript:window.open('http://t.sohu.com/third/post.jsp?&content=utf-8&title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=700,height=600');void(0)\"><img src='/images/moban20/sohu.ico' alt='添加到搜弧微博' border='0'>搜弧微博</a> ");

document.write(" <a href=\"javascript:window.open('http://v.t.qq.com/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=700,height=500');void(0)\"><img src='/images/moban20/qq.ico' alt='添加到腾讯微博' border='0'>腾讯微博</a> ");