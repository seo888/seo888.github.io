 // JavaScript Document
$.getJSON("/common/zxxw5.json",function(obj){ 
    $("#list02").empty();
    //var data2 = eval("("+data+")")
    var html = "<ul class='list02'>";
    	$.each(obj.data,function(e,entry){
          //var str = entry['publishDate'];
         var str = obj.data[e].publishDate;
          // 创建日期对象
          var date = new Date(str);
        if (isNaN(date)) {
          date =new Date(Date.parse(str.replace("-","/").replace("-","/")));
        }
      // 加一天
      date.setDate(date.getDate());
      var CurrentDay = ""; 
      var CurrentMonth = ""; 
      var day = date.getDate();
      var month = (parseInt(date.getMonth()) + 1);
      //debugger
      //alert(typeof())
      if (day >= 10 ){
        CurrentDay += day;
       }else{
        CurrentDay += "0" + day;
       } 
      if (month >= 10 ){
        CurrentMonth += month;
       }else{
        CurrentMonth += "0" + month;
       } 
      var yearMonth =date.getFullYear() + "." + CurrentMonth;
      html += "<li><span class='list-date'><strong>"+CurrentDay+"</strong><i>"+yearMonth+"</i></span><a href='"+entry['url']+"'>"+entry['title']+"</a></li>"
    })

    html += "</ul>";
    $("#list02").append(html)
})