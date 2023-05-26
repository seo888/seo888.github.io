function views(id, tid, aid){
    var reffer = document.referrer;
    $.ajax({
        type:"get",
        url:"/see.html",
        data:{id:id,reffer:reffer,tid:tid,aid:aid},
        success:function(data) {
        }
    });
}