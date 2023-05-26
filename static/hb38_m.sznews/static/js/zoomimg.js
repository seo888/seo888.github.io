
$(document).ready(function(e) {
    
	zoomImg(false);
});

function zoomImg(galleryreload=true) {
    if(galleryreload){
        $('.artical-con').data('lightGallery').destroy(true);
    }
    
    $(".artical-con img").each(function(index, element) {
        var keyurl=window.location.href.split('.htm')[0];
        var img_a=$(this).parent("a");
        console.log(img_a);
        if(img_a!=null && img_a!=undefined && img_a.length>0){
            console.log('check a href');    
            var img_a_href=img_a.attr('href');
            console.log('a href is '+img_a_href);
            if(img_a_href.indexOf(keyurl)>=0){
                console.log("a is true");
                $(this).addClass('galleryimg');
                var src=$(this).attr("src");
                $(this).attr("data-src",src);
            }else{
                //非下一页或外链，不放大图片
                console.log("a is false");
            }

        }else{
            $(this).addClass('galleryimg');
            var src=$(this).attr("src");
            $(this).attr("data-src",src);
        }
        if(index==($(".artical-con img").length-1)){
            // zoomImg();
            console.log($(".artical-con p").find('.galleryimg').length);
    console.log("zoomImg begin");
    // $(".artical-con a").click(function(){
    //   if($(this).find('img')!=null&&$(this).find('img').length!=0){
    //       return false;
    //   }
    // });
    
    $(".artical-con").lightGallery({
        selector: '.galleryimg',
        loop: true,
        fourceAutoply: false,
        autoplay: false,
        download: false,
        thumbnail: false,
        pager: $(window).width() >= 768 ? true : false,
        speed: 300,
        scale: 1,
        /*dynamic : true,
        dynamicEl : arr, */
        controls: false,
        showAfterLoad: false,
        keypress: true
    });
        }
        
        //console.log(src);
    });


    
} // JavaScript Document

	