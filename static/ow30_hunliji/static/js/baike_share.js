$('.baike_share').mouseover(function(){
    $('.kongkong').show()
}).mouseout(function(){
    $('.kongkong').hide()
})
window._bd_share_config = {
    common : {
        bdText : $("title").text(),
        bdDesc : $(".desc-meta").attr("content"),
        bdUrl : window.location.href,
        bdPic : "http://qnm.hunliji.com/o_1cc5g071f1i1asmn1uaq1d4c1lre7.png",
        /*bdSnsKey :{'tsina':'979193193','tqq':'1101054614','sqq':'1101054614'}*///m9y239A6rdeQcZKH//de96f5a138afb9a5664740b6ee990568//1101054614
    },
    share : [{
        "tag" : "shares",
        "bdSize" : 24
    }]
}
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='/p/wedding/Tpl/Web/default/js/shareApi/js/share.js?cdnversion='+~(-new Date()/36e5)];

function AddFavorite(sURL, sTitle)
{
    try{window.external.addFavorite(sURL, sTitle);}
    catch (e)
    {
        try{window.sidebar.addPanel(sTitle, sURL, "");}
        catch (e){alert("加入收藏失败，请使用Ctrl+D进行添加");}
    }
}