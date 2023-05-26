$(function () {

   var title = $("h1").text().replace(/^\s+|\s+$/g,"");
   var nodeID = $(".globalid").text().replace(/^\s+|\s+$/g,"");
   var url = window.location.href;
   var createdDate = $(".a_time").text().replace(/^\s+|\s+$/g,"");
   var token;
   console.log(typeof nodeID);

   function getPureDate (x) {
       return x.slice(1,11);
   }

   var time = getPureDate(createdDate);

    $.ajax({
        url: 'http://hd5.jstv.com/writerInt/auth/user/login?account=writer&password=123jsbc456',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data.data.accessToken);
            const token = data.data.accessToken;
            window.localStorage.setItem('token', token)
        }
    });

    var postData = {
         "nodeID": nodeID,
         "url": url,
         "title": title,
         "createDate": time,
         "pageType":"图文"
    }
   console.log(postData);

   $.ajax({  
     url: `http://hd5.jstv.com/writerInt/writer/pages/access?nodeID=${nodeID}&url=${url}&title=${title}&createDate=${time}&pageType=图文`,
     type: "POST",
     dataType: 'json',
     contentType: 'application/json',
     beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
      },
     //headers: { Authorization: $`Bearer ${localStorage.getItem("token")}` },
    // data: JSON.stringify(postData),
     success: function (data) {
         console.log(data.Message);
    }

});

});
