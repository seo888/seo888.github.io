var ifUrl = window.location.host;
var hostUrl = "cri";
if(ifUrl.indexOf("impplus")>0){
	hostUrl = "impplus";
}
$(function() {

    $(".head13_search3 input").click(function(e) {
        e.preventDefault();
        change();
    })
    
    
    $('.input_box').keydown(function(e){
        e.stopPropagation();
        if(e.keyCode == 13){
            e.preventDefault();
            change();
        }
    });


    $('.nav-li-add-4-1 .nav-title-1').click(function (e){
        // e.preventDefault();
        e.stopPropagation();
        
        if ($(this).parent().hasClass("nav-li-add-4-1-eff")) {
            return false;
        }
        else {
            $(this).parent().addClass("nav-li-add-4-1-eff");
        } 
        
    });


    $(document).click(function (e){
        
        e.stopPropagation();
        if (e.target.id == 'form2' || e.target.className == 'search-box' || e.target.className == 'head13_search' || e.target.className.indexOf('search-select-box') != -1  || e.target.className == 'input_box' || e.target.className == 'head13_search2' || e.target.className == 'left-btn' || e.target.className == 'right-btn') return false;

        $('.nav-li-add-4-1').removeClass("nav-li-add-4-1-eff");
        $('.nav-li-add-4-1').find('.search-select-box').css('overflow','hidden')
    });


    function change() {
        
        var searchText = document.getElementById("q1").value;
        var selectObj = document.getElementById("selectId");
        var value=selectObj.getAttribute('value');
    
        selectObj.setAttribute('value',value);
        
        switch(value) {
            //case "0":
                //document.forms["form2"].action="https://www.so.com/?src=free_cri2_cn";
                /*http://www.so.com/s?q="+encodeURIComponent(searchText)+"&ie=utf-8&src=zz_gb_cri_cn&site=cri.cn&rg=1*/
                //break;
				case "0":
				    var temp = "http://news."+ hostUrl +".cn/search?page=1&pageSize=25&type=0&qtext=" + encodeURIComponent(searchText) + "&lang=cn";
				    var win = window.open(temp);
				    win.focus();
				    return false;
				    break;
            case "1":
                var temp = "http://www.baidu.com/s?q1=" + searchText + "&q6=cri.cn";
                document.forms["form2"].action = "";
                var win = window.open(temp);
                win.focus();
                return false;
                break;
                case "2":
        var temp = "http://www.chinaso.com/search/pagesearch.htm?q=site%3Acri.cn+" + encodeURIComponent(searchText) + "&go=&qs=n&form=QBRE&pq=site%3Acri.cn+" + encodeURIComponent(searchText) + "&sc=0-0&sp=-1&sk=";
        document.forms["form2"].action = "";
        var win = window.open(temp);
        win.focus();
        return false;
        break;
    
            case "3":
                var temp = "http://www.bing.com/search?q=site%3Acri.cn+" + encodeURIComponent(searchText) + "&go=&qs=n&form=QBRE&pq=site%3Acri.cn+" + encodeURIComponent(searchText) + "&sc=0-0&sp=-1&sk=";
                document.forms["form2"].action = "";
                var win = window.open(temp);
                win.focus();
                return false;
                break;
        }
    }
        
})