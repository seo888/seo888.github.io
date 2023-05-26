    //滚动头条
    //滚动效果
    var header_demo = document.getElementById("header_demo");
    var header_demo1 = document.getElementById("header_demo1");
    var header_demo2 = document.getElementById("header_demo2");
    var speed=40;    //数值越大滚动速度越慢
    header_demo2.innerHTML = header_demo1.innerHTML;

    //header_demo2.offsetWidth 总宽度 
    //alert(header_demo2.offsetWidth +"-"+header_demo.scrollLeft);

    function Marquee(){
    if(header_demo2.offsetWidth-header_demo.scrollLeft<=0)
    header_demo.scrollLeft-=header_demo1.offsetWidth
    else{
    header_demo.scrollLeft++
    }
    }
    var MyMar = setInterval(Marquee,speed);
    header_demo.onmouseover = function(){clearInterval(MyMar)}
    header_demo.onmouseout = function(){MyMar = setInterval(Marquee,speed)}