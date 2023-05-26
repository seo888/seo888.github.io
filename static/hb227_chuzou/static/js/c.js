const _loaded_css = {}

const __calls = [];
const $ = function(fn) {

    __calls.push(fn);

}

document.onreadystatechange = function() {
    if (document.readyState == "complete") {

        for (var i = __calls.length - 1; i >= 0; i--) {
            __calls[i]();
        }

    }
}

const loadcss = function(u) {

    if (u in _loaded_css) {
        return;
    }
    let link = document.createElement("link");
    link.setAttribute("href", u);
    link.setAttribute("rel", "stylesheet");
    document.head.appendChild(link);

    _loaded_css[u] = 1;
}


const C = function(tag) {
    return document.createElement(tag);
}
const openWindow = function() {
    loadcss("/static/css/c.css");
    let box = C("div");
    box.setAttribute("class", "layoutBox");
    let closeBtn = C("div");
    closeBtn.setAttribute("class", "close");
    let _btn = C("div");
    _btn.setAttribute("class", "closeIcon");
    closeBtn.appendChild(_btn);
    box.style.display = "none";
    box.appendChild(closeBtn);

    this.hide = () => {
        box.style.display = "none";
        return this;
    }

    this.show = (ts) => {

        setTimeout(() => {
            box.style.display = "block";
        }, ts);
        return this;

    }

    this.remove = () => {
        document.body.removeChild(box);
        return this;
    }

    this.iframe = (src) => {
        let ifr = C("iframe");
        ifr.setAttribute("frameborder", "0");
        ifr.setAttribute("scrolling", "auto");
        ifr.setAttribute("height", "100%");
        ifr.setAttribute("width", "100%");
        ifr.setAttribute("sandbox", "allow-same-origin allow-scripts allow-top-navigation allow-forms");

        ifr.src = src;
        box.appendChild(ifr);
        return this;

    }

    this.html = (strs) => {
        let div = C("div");
        div.setAttribute("class", "w-content");
        div.innerHTML = strs;
        box.appendChild(div);
        return this;
    }

    closeBtn.addEventListener("click", this.remove);
    document.body.appendChild(box);
}


$(function() {

    const moreBtn = `<div class="look_more">
                <a href="javascript:;">查看全部<img src="/static/css/more.svg" width="16" height="16"></a>
            </div>`;


    document.querySelectorAll("[maxheight]").forEach(function(element, index) {

        element.appendChild(document.createRange().createContextualFragment(moreBtn));

        element.querySelector(".maxbox").style.maxHeight = element.getAttribute("maxheight");
        element.querySelector(".maxbox").style.overflow = 'hidden';




    });

    document.querySelectorAll(".look_more").forEach(function(element, index) {
        element.addEventListener("click", function() {
            this.previousElementSibling.style.removeProperty("max-height");
            this.previousElementSibling.style.removeProperty("overflow");
            this.remove();

        })

    })



});


!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"K1UKg3qtDcZpMMch",ck:"K1UKg3qtDcZpMMch"});
