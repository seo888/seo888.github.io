$(function () {

$("title").html("辽宁省人民政府")

            // 导航切换
            $('.sy_nav dl').mouseover(function () {
                $(this).find('dt>a').addClass('on');
                var navdtNum = $(this).index();
                $('.sy_nav dl dd').hide();
                var navddNum = $(".sy_nav dl dd").get(navdtNum);
                $(navddNum).show();
            }).mouseout(function () {
                $(this).find('dt>a').removeClass('on');
                $('.sy_nav dl dd').hide();
            });
        });


$(function(){
    var startUrl = window.location.pathname;
            var startPram = location.search;
            $("#cniil_wza").attr("href", "/AiWza/index.html#" + startUrl + startPram);
    setTimeout(function () {
            var startUrl = window.location.pathname;
            var startPram = location.search;
            $("#cniil_wza").attr("href", "/AiWza/index.html#" + startUrl + startPram);
        }, 1000);
})

       
        $(function () {
            //qs_xt("tab1","_x","tab_y","tab_n","tab_x_y","tab_x_n",1,1,4);  //点击
          // qs_xt("tab1", "_x", "tab_y", "tab_z", "tab_n", "tab_x_y", "tab_x_z", "tab_x_n", 2, 1, 4); //经过

        });


        $(function () {
$.each($(".mbxNav span a"),function(){
    if($(this).html()!=""){
        $(this).attr("target","_blank")
    }
   })
  });

        $(function () {
$.each($(".zf_now span a"),function(){
    if($(this).html()!=""){
        $(this).attr("target","_blank")
    }
   })
  });