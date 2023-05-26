 /*  点赞 */     
      function setCookie(c_name,value){
        var exdate=new Date()
         var newDate = new Date();
         newDate.setHours(newDate.getHours()+24);
         document.cookie=c_name+ "=" +value + ";expires="+newDate.toUTCString() +";path=/";
      }
     function getCookie(c_name) {
        if (document.cookie.length>0)
          {
          c_start=document.cookie.indexOf(c_name + "=")
          if (c_start!=-1)
            {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
            }
          }
          return ""
        }
    $(function(){
         $("[data='up']").click(function(){
         var article_id = $(this)[0].getAttribute("article-id");
         var num = parseInt($(this).find("[data='up_num']").html());
         if (article_id == undefined) {
            var reviewId  =  $(this).attr("review-id");
            if (getCookie(reviewId) !== ""){
               // alert("您已经赞过了");
               return false;
            }
            $(this).find("[data='up_num']").html(num + 1);
            $.ajax({
                type: 'POST',
                url: "/reviews/"+reviewId+"/support",
                success: function(data) {
                    // var num = parseInt($(".like span").text());
                    // $(".likess").parent().find("p").html(data.likes);
                    setCookie(reviewId, 'yes');
                }
            });
         }else {
             
             if (getCookie(article_id) !== ""){
                // alert("您已经赞过了");
                return false;
             }
             $(this).find("[data='up_num']").html(num + 1);
             $.ajax({
                type: 'POST',
                url: "/articles/"+ article_id +"/like",
                success: function(data) {
                    // var num = parseInt($(".like span").text());
                    // $(".likess").parent().find("p").html(data.likes);
                    setCookie(article_id, 'yes');
                }
            });
         };
        
       })
    })