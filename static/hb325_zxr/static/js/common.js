{
    $(document).ready(function(){
        var topButton = $(".top");
        setInterval(function(){
            if(window.pageYOffset >= 500){
                topButton.show();
            }else{
                topButton.hide();
            }
        }, 100);
        topButton.on("click", function(e){
            document.body.scrollIntoView()
        });

        $(".search-button").on("click", function(){
            let title = $("input[name='search']").val();
            window.open("/article/search.do?siteId=24&title=" + title);
        });
    });
}