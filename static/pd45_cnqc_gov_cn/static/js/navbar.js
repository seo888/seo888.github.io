//重置状态
function CzNav() {
    if (document.getElementById("yhfw_button1").innerHTML == "图文结合") {
        yhfw_img_value = false;
        yhfw_hide_img(document.getElementById("yhfw_button1"));
    }
    if (document.getElementById("yhfw_button2").innerHTML == "原对比度") {
        iChangeBack = 2;
        changeBack(document.getElementById("yhfw_button2"));
    }
    bDecision = false;
    oDownLine(arguments[0]);
    ZoomCountTeam = 1;
    changeZoom('small');
    iFontSize = 16;
    changeFontSmall();
}

//文本模式
var yhfw_img_value = true;
function yhfw_hide_img(newBack) {
    if (yhfw_img_value) {
        $('img').each(function () {
            $(this).hide();
        });
        $('body').each(function () {
            var backgroundsrc = $(this).attr('background');
            $(this).attr('oldbackgroundsrc', backgroundsrc);
            $(this).attr("background", '');
        });
        $('td').each(function () {
            var backgroundsrc = $(this).attr('background');
            $(this).attr('oldbackgroundsrc', backgroundsrc);
            $(this).attr("background", '');
        });
        $('div').each(function () {
            var backgroundsrc = $(this).attr('background');
            $(this).attr('oldbackgroundsrc', backgroundsrc);
            $(this).attr("background", '');
        });
        $('object').each(function () {
            $(this).hide();
        });
        yhfw_img_value = false;
        newBack.innerHTML = "图文结合";
    }
    else {
        $('img').each(function () {
            $(this).show();
        });
        $('body').each(function () {
            var backgroundsrc = $(this).attr('oldbackgroundsrc');
            $(this).attr("background", backgroundsrc);
        });
        $('td').each(function () {
            var backgroundsrc = $(this).attr('oldbackgroundsrc');
            $(this).attr("background", backgroundsrc);
        });
        $('div').each(function () {
            var backgroundsrc = $(this).attr('oldbackgroundsrc');
            $(this).attr('background', backgroundsrc);
        });
        $('object').each(function () {
            $(this).show();
        });
        yhfw_img_value = true;
        newBack.innerHTML = "文本模式";
    }
}

//高对比度
var iChangeBack = 1;
function changeBack(newBack) {
    var aAllElement = document.getElementById("container").getElementsByTagName("*")
    if (iChangeBack == 1) {
        document.getElementById("container").style.backgroundColor = "#000";
        document.getElementById("container").style.color = "#FFF";
        for (i = 0; i < aAllElement.length; i++) {
            aAllElement[i].style.backgroundColor = "#000";
            aAllElement[i].style.color = "#FFF"
            newBack.innerHTML = "原对比度";
            iChangeBack = 2;
        }
    } else if (iChangeBack == 2) {
        document.getElementById("container").style.backgroundColor = "";
        document.getElementById("container").style.color = "";
        for (i = 0; i < aAllElement.length; i++) {
            aAllElement[i].style.backgroundColor = "";
            aAllElement[i].style.color = ""
            newBack.innerHTML = "高对比度";
            iChangeBack = 1;
        }
    }
}

//辅助线
var bDecision = true;
function oDownLine(e) {
    e = window.event ? window.event : e;
    if (bDecision) {
        document.getElementById('lineX').style.display = 'block'
        document.getElementById('lineY').style.display = 'block'
        if (typeof (ifindex) == "undefined")
            document.onmousemove = oMoveLine;
        else
            document.onmousemove = oMoveLine1;
        bDecision = false;
    }
    else {
        document.getElementById('lineX').style.display = 'none'
        document.getElementById('lineY').style.display = 'none'
        document.onmousemove = "";
        bDecision = true;
    }
}
function oMoveLine(e) {
    e = window.event ? window.event : e;

    var scrollLeft_v = 0;
    var scrollTop_v = 0;
    var scrollHeight_v = 0;
    if (window.ActiveXObject) {
        scrollLeft_v = (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) + 5 + "px";
        scrollTop_v = (e.clientY + document.documentElement.scrollTop || document.body.scrollTop) + 5 + "px";
        scrollHeight_v = (document.documentElement.scrollHeight || document.body.scrollHeight + document.documentElement.scrollTop || document.body.scrollTop) + 5 + "px";
    }
    else {
        scrollLeft_v = e.pageX + 5 + "px";
        scrollTop_v = e.pageY + 5 + "px";
        scrollHeight_v = document.body.scrollHeight + 5 + "px";
    }

    document.getElementById("lineY").style.left = scrollLeft_v;
    document.getElementById("lineX").style.top = scrollTop_v;
    document.getElementById("lineY").style.height = scrollHeight_v;
}
function oMoveLine1(e) {
    e = window.event ? window.event : e;
    var scrollLeft_v = 0;
    var scrollTop_v = 0;
    var scrollHeight_v = 0;
    if (window.ActiveXObject) {
        scrollLeft_v = (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) + 5 + "px";
        scrollTop_v = (e.clientY) + 5 + "px";
        scrollHeight_v = "900px";
    }
    else {
        scrollLeft_v = e.pageX + 5 + "px";
        scrollTop_v = e.pageY + 5 + "px";
        scrollHeight_v = "900px";
    }
    document.getElementById("lineY").style.left = scrollLeft_v;
    document.getElementById("lineX").style.top = scrollTop_v;
    document.getElementById("lineY").style.height = scrollHeight_v;
}

//页面放大缩小
var ZoomCountTeam = 1;
function changeZoom(ZoomText) {
    if (ZoomText == "small") {
        ZoomCountTeam = ZoomCountTeam - 0.5;
        if (ZoomCountTeam <= 1) { ZoomCountTeam = 1 }
        document.getElementById("container").style.zoom = ZoomCountTeam;
    } else {
        ZoomCountTeam = ZoomCountTeam + 0.5;
        if (ZoomCountTeam <= 1) { ZoomCountTeam = 1 }
        document.getElementById("container").style.zoom = ZoomCountTeam;
    }
}

//字体大小
var iFontSize = 12;
function changeFontSize() {
    var aAllElement = document.getElementById("container").getElementsByTagName("*");
    var aAllLi = document.getElementById("container").getElementsByTagName("li");
    if (iFontSize <= 36) {
        iFontSize = iFontSize + 4;
    }
    for (i = 0; i < aAllElement.length; i++) {
        if (iFontSize <= 36) {
            aAllElement[i].style.fontSize = iFontSize + "px";
            aAllElement[i].style.lineHeight = iFontSize + 2 + "px";
        }
    }
}
function changeFontSmall() {
    var aAllElement = document.getElementById("container").getElementsByTagName("*");
    var aAllLi = document.getElementById("container").getElementsByTagName("li");
    if (iFontSize > 14) {
        iFontSize = iFontSize - 4;
    }
    for (i = 0; i < aAllElement.length; i++) {
        if (iFontSize > 14) {
            aAllElement[i].style.fontSize = iFontSize + "px";
            aAllElement[i].style.lineHeight = iFontSize + 2 + "px";
        }
        if (iFontSize == 14) {
            aAllElement[i].style.fontSize = "";
            aAllElement[i].style.lineHeight = "";
        }
    }
}