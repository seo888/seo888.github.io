!function(){"use strict";const e=document.querySelectorAll.bind(document),t=window.jQuery;function o(){e(".arve p, .arve .video-wrap, .arve .fluid-width-video-wrapper, .arve .fluid-vids").forEach((e=>{r(e)})),e(".ast-oembed-container").forEach((e=>{e.querySelector(".arve")&&r(e)})),e(".arve br").forEach((e=>{e.remove()})),e(".arve-iframe, .arve-video").forEach((e=>{e.removeAttribute("width"),e.removeAttribute("height"),e.removeAttribute("style")})),e(".wp-block-embed").forEach((e=>{if(e.querySelector(".arve")){e.classList.remove("wp-embed-aspect-16-9","wp-has-aspect-ratio");const t=e.querySelector(".wp-block-embed__wrapper");t&&r(t)}}))}function r(e){const t=e.parentNode;if(t){for(;t&&e.firstChild;)t.insertBefore(e.firstChild,e);t.removeChild(e)}}"html"!==document.documentElement.id&&(document.documentElement.id?document.body.id||(document.body.id="html"):document.documentElement.id="html"),o(),document.addEventListener("DOMContentLoaded",(()=>{o()})),t&&void 0!==t.fn.fitVids&&t(document).ready((()=>{setTimeout((()=>{o()}),1)}))}();