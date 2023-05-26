window.addEventListener("load", function () {
    function imghandler(e) {
        e.stopPropagation()
        e.preventDefault()
        return false
    }

    var imgs = document.querySelectorAll("img")
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("dragstart", imghandler, false)
        imgs[i].addEventListener("contextmenu", imghandler, false)
    }

    var videos = document.querySelectorAll("video")

    for (var i = 0; i < videos.length; i++) {
        videos[i]['controls'] = true;
        videos[i]['disablePictureInPicture'] = true;
        videos[i].setAttribute("controlslist", "nodownload nofullscreen noremoteplayback")
        videos[i].addEventListener("contextmenu", imghandler, false)
    }

})