document.write('<script src=\"http://www.sdchina.com/js/ajaxLogin.js\" type=\"text/javascript\"></script>');

document.write('<script src=\"http://www.sdchina.com/js/ajaxNewsClick.js\" type=\"text/javascript\"></script>');
document.write('<script src=\"http://www.sdchina.com/js/wordlink.js\" charset=\"utf-8\" type=\"text/javascript\"></script>');
var win_w = $('body').width();
if(win_w<=670)
{
$('.zleftf img').removeAttr('width').removeAttr('height');
}


var selectListShow = 0;
$(function() {
$("#type,.searchselectbtn").click(function() {
$("#divselect ul").slideUp("fast"); ;
        if (selectListShow) {
            $("#selectTypeList").slideUp("fast");
            selectListShow = 0;
        } else {
            $("#selectTypeList").slideDown("fast");
            selectListShow = 1;
        }
        return false;
    });
    $("body").click(function() {
        if (selectListShow) {
            $("#selectTypeList").slideUp("fast");
            selectListShow = 0;
        }
    });
    $(".searchselect li").click(function() {
        $("#type").text($(this).text());
        $("#type").attr("typename", $(this).attr("typename"));
        $(this).parent().hide();
    });

});

jQuery.divselect = function(divselectid, inputselectid) {
    var inputselect = $(inputselectid);
    var ul = $(divselectid + " ul");
    $(divselectid + " cite").click(function() {
        if (ul.css("display") == "none") {
            ul.slideDown("fast");
        } else {
            ul.slideUp("fast");
        }
    });
    $('#textfieldaaa').click(function() {
        if ($('#textfieldaaa').val() == '') {
            if (ul.css("display") == "none") {
                ul.slideDown("fast");
            } else {
                ul.slideUp("fast");
            }
        }
    });
    $(document).click(function() {
        ul.hide();
    });
};
function ff(ul) {
    if (ul.css("display") == "none") {
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
}

$(function() {
    //$.divselect("#divselect", "#inputselect");
});




$(function() {
	if($('.zleftb').length > 0) {
		$('.zleftb img').removeAttr("width").removeAttr("height");
	}
    $('#bt_search').click(function() {
        var keyword = $("#textfieldaaa").val();
        var news_type = $("#type").attr("typename");
        if (keyword != "") {
            if (news_type == "auto") {
                window.open("http://auto.sdchina.com/search.aspx?keywords=" + escape(keyword));
            } else if (news_type == "") {
                window.open("http://search.sdchina.com/do.aspx?keyword=" + escape(keyword));
            }
            else {
                window.open("http://search.sdchina.com/do.aspx?NewsCatogry=" + escape(news_type) + "&keyword=" + escape(keyword));
            }
        }
        else {
            alert("请输入关键词");
            return false;
        }
    });
});
