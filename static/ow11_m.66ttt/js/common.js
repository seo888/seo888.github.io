$(function () {
    $("img.lazy").delayLoading({
        defaultImg: "/images/public/loading.gif",
        errorImg: "",
        imgSrcAttr: "originalSrc",
        beforehand: 0,
        event: "scroll",
        duration: "normal",
        container: window,
        success: function (imgObj) {
            $(imgObj[0]).addClass('qwer');
        },
        error: function (imgObj) {
        } 
    });
});