
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c38c509dd522b0173aac6be1ecc5b95a";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

window.onload = function(){

   /* var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 18,
        centeredSlides: true,
        loop:true,
    });
    let tab = document.getElementsByClassName('tab'),
        tabList = document.getElementsByClassName('tabList');

    let width = 0;    
    // 异步确保dom元素完全构建出来
    setTimeout(function(){
        // 设置外层父元素的宽度 
        for (let i = 0; i < tab.length; i++) {
            width += tab[i].offsetWidth + 30;
        }
        // document.getElementsByClassName('tabFather')[0].style.width = width - 25 + 'px';

    },0)*/

    var swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 1000,
        autoplay: {
            disableOnInteraction: false
        },

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        observer:true,
        observeParents:true,
    });

    let tabIndex = 0; // 记录选项卡选中的索引


    let searchInput = document.getElementById('search'),
        searchList = document.getElementById('searchList'),
        tabYe = document.getElementById('tabYe'),
        footer = document.getElementById('footer');




    // 右侧弹出层
    let fenlei = document.getElementById('fenlei'),
        map = document.getElementById('map'),
        mapHeader = document.getElementById('mapHeader');
    
    fenlei.addEventListener('click',()=>{
        map.style.right = '0';
    });

    mapHeader.addEventListener('click',()=>{
        map.style.right = '-100%';
    });

    //底部信息版权   
    var myDate = new Date();
    var yaer=myDate.getFullYear();
    var site_name=SETTINGS.siteName != undefined ? SETTINGS.siteName:"多看范文";
    // 底部版权信息用JS获取时间
    $("#footer_icon").html(''+yaer+' '+site_name+'版权所有. 湘ICP备19018744号-1');

    $("#img_url").click(function () {
        window.location.href='/';
    })

}

function search_box(){
    var hostname=window.location.hostname;
    var url =hostname.replace('www.','');
    // input有内容才搜索
    if ($('#input_search').val() != "") {
        window.open( 'http://www.baidu.com/s?wd=' + $('#input_search').val() + ' site:'+url+'','_blank');
    } else {
        $('#input_search').attr('placeholder','请输入搜索内容');
    }
}



function getdate() {
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8)
}

function GetDateDiff(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates
}
if (SETTINGS.template === 'tag' && (window.location.href.indexOf('update') != -1 || GetDateDiff(getdate(), SETTINGS.lastUpdated) >= 30)) {
    $.ajax({
        type: "POST",
        url: "https://i."+SETTINGS.domain+"/t",
        data: {
            site_id: SETTINGS.template_id,
            tagID: SETTINGS.tagID
        },
        dataType: "json",
        success: function(msg) {
            console.log(msg)
        }
    })
}

if (SETTINGS.template === 'content' && (window.location.href.indexOf('update') != -1 || GetDateDiff(getdate(), SETTINGS.lastUpdated) >= 182)) {
    $.ajax({
        type: "POST",
        url: "https://i."+SETTINGS.domain+"/c",
        data: {
            site_id: SETTINGS.template_id,
            articleID: SETTINGS.articleID
        },
        dataType: "json",
        success: function(msg) {
            console.log(msg)
        }
    })
}