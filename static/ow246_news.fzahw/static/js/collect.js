var url = window.location.href;
var userAgent = navigator.userAgent;
var referer = document.referrer;
var time = new Date().getTime();

$.ajax({
    url: "/collect",
    type: "POST",
    async: true,
    contentType: "application/json",
    data: JSON.stringify({
        "time": time,
        "referer": referer,
        "userAgent": userAgent,
        "type": 1,
        "url": url,
        "siteId": siteId
    }),
    success: function (data){}
});
