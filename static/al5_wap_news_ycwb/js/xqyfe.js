// function GetDescription() {
//     var metas = document.getElementsByTagName("meta");
//     var description = '';
//     var strTemp;
//     for (var i = 0; i < metas.length; i++) {
//         if (metas[i].name == 'description') {
//             description = metas[i].content;
//         }
//     }
//     return description;
// }
// function removeHTMLTag(str) {
//     str = str.toLowerCase();
//     if( str.match(/<\/a>/)){
//         str = "";	
//     }
//     str = str.replace(/_金羊网[\s\w\u4E00-\u9FA5]+/, '');
//     str = str.replace(/<\/?[^>]*>/g, '');
//     str = str.replace(/[ | ]*\n/g, '\n'); 
//     str = str.replace(/<a href[^>]*>/, '');
//     str = str.replace("</a>", '');
//     str = str.replace("[", '');
//     str = str.replace("]", '');
//     str = str.replace(/ /ig, '');
    
//     return str;
// }
// window._bd_share_config={
//     "common":{
//         "bdSnsKey":{"tsina":"769558403","tqq":"100455029"},
//         "bdText":"【" + removeHTMLTag(document.title) + "】 " + removeHTMLTag(GetDescription()),
//         "bdMini":"2",
//         "bdMiniList":false,"bdPic":"",
//         "bdStyle":"0","bdSize":"16"},"share":{},"image":{"viewList":["tsina","weixin","qzone","sqq","tqq","ty","tieba","renren","tsohu"],"viewText":"分享到","viewSize":"16"}
//     };
//     with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
