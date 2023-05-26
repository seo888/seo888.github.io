// var _PAGE_COUNT = "8";
// var _PAGE_INDEX = "1";
// var _PAGE_NAME = "t20180717_1617477";
// var _PAGE_EXT = "shtml";
var currentPage = parseInt(_PAGE_INDEX) + 1;
var prevPage = parseInt(currentPage) - 2;
var nextPage = currentPage;
var countPage = _PAGE_COUNT;
if (countPage == 1) {
    $('#perpage')[0].style.display = 'none';
}
if (countPage > 1 && currentPage != 1 && currentPage != 2) {
    document.write("<a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\"><span><<</span></a> <a href=\"" + _PAGE_NAME + "_" + prevPage + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\"><</a> ");
} else if (countPage > 1 && currentPage != 1 && currentPage == 2) {
    document.write("<a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\"><span><<</span></a> <a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\"><</a> ");
} else {
    document.write("");
}
//循环
if (currentPage <= 3 || countPage <= 7) {
    for (var i = 1; i <= 7 && i <= countPage; i++) {
        if (currentPage == i) {
            document.write("<a href=\"javascript:void(0);\" target=\"_top\" class=\"cur\">" + i + "</a> ");
        } else if (i == 1) {
            document.write("<a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        } else {
            document.write("<a href=\"" + _PAGE_NAME + "_" + (i - 1) + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        }
    }
} else if (currentPage >= countPage - 3) {
    for (var i = countPage - 6; i <= countPage; i++) {
        if (currentPage == i) {
            document.write("<a href=\"javascript:void(0);\" target=\"_top\" class=\"cur\">" + i + "</a> ");
        } else if (i == 1) {
            document.write("<a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        } else {
            document.write("<a href=\"" + _PAGE_NAME + "_" + (i - 1) + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        }
    }
} else {
    for (var i = currentPage - 3; i < currentPage + 4; i++) {
        if (currentPage == i) {
            document.write("<a href=\"javascript:void(0);\" target=\"_top\" class=\"cur\">" + i + "</a> ");
        } else if (i == 1) {
            document.write("<a href=\"" + _PAGE_NAME + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        } else {
            document.write("<a href=\"" + _PAGE_NAME + "_" + (i - 1) + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">" + i + "</a> ");
        }
    }
}
//设置下一页代码
if (countPage > 1 && currentPage != countPage) {
    document.write("<a href=\"" + _PAGE_NAME + "_" + nextPage + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\">></a> <a href=\"" + _PAGE_NAME + "_" + (countPage - 1) + "." + _PAGE_EXT + "\" target=\"_top\" class=\"pl\"><span>>><span></a> ");
} else {
    document.write("");
}
//设置下一页代码
document.write("<span>共 " + countPage + " 页</span>");
