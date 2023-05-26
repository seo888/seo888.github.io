$(function(){
    

    window.toSearchPage = function(){
        var kw=$('#keywords').val();
        if(kw!=''){
            window.open("http://news.21-sun.com/search/n_"+kw+"_1.htm");  
        }
    }

    //搜索
    $('#searchBtn').on('click', function() {
        toSearchPage()
    });
})
