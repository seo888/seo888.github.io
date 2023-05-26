$(document).ready(function () {

    //24hours
    {
        let ul = $("#p2-nav ul");
        ul.text("");
        $.ajax({
            url: "/api/article/ahnews.do?columnCode=24hours",
            dataType: "json",
            success: function(data){
                for(let i in data.data){
                    let html = "<li><a href=\"" + data.data[i].url + "\" target=\"_blank\">" + data.data[i].title.substr(0, 15) + "</a></li>";
                    ul.append($(html));
                }
            }
        });
    }
    {
        let ul = $(".right-wap.xs");
        ul.text("");
        let vlist = $(".vlist");
        vlist.text("");
        $.ajax({
            url: "/api/article/ahnews.do?columnCode=ycsp",
            dataType: "json",
            success: function(data){
                for(let i = 0; i < 4; i++){
                    let html = "<li>\n" +
                        "                    <a href=\"" + data.data[i].url + "\" target=\"_blank\"><img src=\"" + data.data[i].image + "\">\n" +
                        "                        <div>" + data.data[i].title.substr(0, 6) + "</div></a>\n" +
                        "                </li>";
                    ul.append($(html));
                }

                for(i = 4; i < 7; i++){
                    let html = "<li>\n" +
                        "                    <a href=\"" + data.data[i].url + "\" target=\"_blank\">" + data.data[i].title.substr(0, 17) + "</a>\n" +
                        "                </li>";
                    vlist.append($(html));
                }
            }
        });
    }
    {
        let ul = $(".right-wap.zt");
        ul.text("");
        $.ajax({
            url: "/api/article/ahnews.do?columnCode=zttj",
            dataType: "json",
            success: function(data){
                for(let i in data.data){
                    let html = "<li>\n" +
                        "                    <a href=\"" + data.data[i].url + "\" target=\"_blank\"><img src=\"" + data.data[i].image + "\">\n" +
                        "                        <div>" + data.data[i].title.substr(0, 10) + "</div></a>\n" +
                        "                </li>";
                    ul.append($(html));
                }
            }
        });
    }

});