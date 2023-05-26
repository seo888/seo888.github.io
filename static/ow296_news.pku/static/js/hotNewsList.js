$.getJSON("/common/hotNews6.json",function(obj){ 
    $("#list03").empty();
    // var html = "<ul class='list03'>";
    // $.each(obj.data,function(e,entry){
    //     if(e <5){
    //         var getPicUrl = entry['picUrl'];
    //         if(typeof(getPicUrl) == "undefined"){
    //             html += '<li class="noImg"><a href="'+entry['url']+'" alt="'+entry['viewCount']+'""><div class="list-txt03"><h3>'+entry['title']+'</h3><p><span>'+entry['publishDate']+'</span></p></div></a></li>';
    //         }else{
    //            html += '<li><a href="'+entry['url']+'" alt="'+entry['viewCount']+'"><div class="list-img03"><span class="imgResponsive"><img src="'+getPicUrl+'"></span></div><div class="list-txt03"><h3>'+entry['title']+'</h3><p><span>'+entry['publishDate']+'</span></p></div></a></li>';
    //        }}
    //    })
    // html += "</ul>";
    // $("#list03").append(html)
})
