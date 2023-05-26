//获取URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
//开始搜索
function GoSearch() {
    if ($.trim($('#kw').val()).length > 0) {
        $("input[name='kw']").val($('#kw').val());
        if ($("#SearchCentent").length > 0) {
            $("#PageIndex").val("1");
            GetDataList();
        } else {
            window.open('/isearch.html' + '?q=' + encodeURI($("#kw").val()));
        }
    } else {
        $('#kw').val('');
        $('#kw').focus();
    }
    return false;
}
//页面加载
$(function () {
    //自完成框
    $('#kw').autocomplete({
        serviceUrl: '/WebAPI.ashx?action=SearchAutoComplete',
        dataType: 'json',
        paramName: 'kw',
        width: '273px',
        fixContentPostion: function (styles) {
            styles = { 'top': styles.top - 1, 'left': styles.left };
            return styles;
        },
        maxHeight: 1000,
        orientation: 'bottom',
        triggerSelectOnValidInput: false,
        formatResult: function (suggestion, currentValue) {
            return suggestion.value;
        },
        onAdjustScroll: function (value) {
            console.info(value);
            var tmp = $('<div/>').append(value);
            return tmp.text();
        },
        onSelect: function (suggestion) {
            var tmp = $('<div/>').append(suggestion.value);
            $("input[name='kw']").val(tmp.text());
            GoSearch();
            return;
        }
    });
    //回车提交
    $('#kw').keydown(function (event) {
        if (event.keyCode == 13) {
            GoSearch();
            $('#kw').autocomplete().hide();
        }
        return;
    });
    //当前为搜索页面
    if ($("#SearchCentent").length > 0) {
        //下来菜单效果
        $("#jq_topmenu li").hover(function () {
            $(this).find(".jq_hidebox").show();
        }, function () {
            $(this).find(".jq_hidebox").hide();
        });
        $(".menu li").click(function () {
            $("#PageIndex").val("1");
            var obj = $(this);
            if (obj.attr("class") == "sort") {
                $("#SortDesc").val(obj.attr("data"));
            }
            else if (obj.attr("class") == "date") {
                $("#DateType").val(obj.attr("data"));
            } else if (obj.attr("class") == "dept") {
                $("#GroupId").val(obj.attr("data"));
                $("#DeptId").val(obj.attr("dept"));
            }
            obj.parent().parent().parent().find("a").eq(0).html(obj.find("a").text() + "<i></i>");
            $(".jq_hidebox").hide();
            GetDataList();
        });
        //初始加载
        //LoadDepartmentList();  加载缓慢调试模式暂时关闭
        var keyword = GetQueryString("kw");
        if (keyword != 'null' && $.trim(keyword).length > 0) {
            var type = unescape(GetQueryString("NewsType"));
            if (type != 'null' && $.trim(type).length > 0) {
                $("#NewsType").val(type);
            }
            $("#PageIndex").val("1");           
            $("input[name='kw']").val(keyword);
            GetDataList();
        }
    }
    //图片加载失败
    //$('img').error(function () {
    //    $(this).attr('src', '/Images/errorImg.jpg');
    //});
    //导航切换效果
    var timer = null;
    $('.id_head_nav_ul').find('a').mouseover(function () {
        clearTimeout(timer);
        $('.id_head_nav_ul').find('a').removeClass('zhuya');
        $(this).addClass('zhuya');
        $('.id_fj').hide().eq($(this).index('.id_head_nav_ul a')).show()
    });
    $('.id_head_nav_ul').find('a').mouseout(function () {
        tss()
    });
    $('.id_end_fy').mouseover(function () {
        clearTimeout(timer);
    });
    $('.id_end_fy').mouseout(function () {
        tss()
    });
    function tss() {
        timer = setTimeout(function () {
            $('.id_head_nav_ul').find('a').removeClass('zhuya');
            $('.id_fj').hide();
        }, 200)
    }
});
//加载部门列表
function LoadDepartmentList() {
    $.ajax({
        url: "/WebAPI.ashx?action=GetDeptList",
        type: "post",
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (data) {
            var str = "";
            if (data.Result && data.Data != null) {
                $.each(data.Data, function (i, item) {
                    str += '<li class="dept" dept="' + item.DeptId + '" data="' + item.GroupID + '"><a style="width:200px;" href="javascript:;">' + item.GroupName + '</a></li>';
                });
            }
            $("#depList").append(str);
            $(".menu li").unbind("click");
            $(".menu li").click(function () {
                $("#PageIndex").val("1");
                var obj = $(this);
                if (obj.attr("class") == "sort") {
                    $("#SortDesc").val(obj.attr("data"));
                }
                else if (obj.attr("class") == "date") {
                    $("#DateType").val(obj.attr("data"));
                } else if (obj.attr("class") == "dept") {
                    $("#GroupId").val(obj.attr("data"));
                    $("#DeptId").val(obj.attr("dept"));
                }
                obj.parent().parent().parent().find("a").eq(0).html(obj.find("a").text() + "<i></i>");
                $(".jq_hidebox").hide();
                GetDataList();
            });
        }
    });
}
function GetDataList() {
    if ($.trim($("#kw").val()).length == 0) {
        $('#kw').val('');
        $('#kw').focus();
        return false;
    }
    $("#divResult").html('<ul><li><p style="font-size: 16px;">数据检索中，请稍后...</p></li></ul>');
    var formData = $('#formSearch').serialize();
    $.ajax({
        url: "/WebAPI.ashx?action=Query",
        type: "post",
        data: formData,
        dataType: 'json',
        success: function (data) {
            if (data.Success && data.Data != null) {
                var str = '';
                $("#bsfwRecommend").html("");
                //加载最新信息
                var newsList = data.Data.NewList;
                if (newsList != null && newsList.length > 0) {
                    str += "<div class='most-new'>";
                    str += "<p class='title'><a href='javascritp:;'>" + data.Message + "</a>的最新信息</p>";
                    
                    $.each(newsList, function (i, item) {
                        if (i == 0) {
                            str += "<div class='most-new-content'>";
                            if (item.Images.length > 0) {
                                str += "<div class='img'>";
                                str += "<a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "'>";
                                str += "<img src='" + item.Images.replace("/pub/",":8088/pub/") + "' width='126' height='129' alt='" + item.Title.replace(/<\/?.+?>/g, "") + "'></a>";
                                str += "</div>";
                                str += "<div style='padding-left: 14px;width: 650px;' class='text'>";
                            } else {
                                str += "<div style='padding-left: 14px;' class='text'>";
                            }
                            str += "<p class='text-title'>";
                            str += "<a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "'>" + item.Title + "</a></p>";
                            str += "<p class='text-centent'><a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "'>" + item.Description + "</a></p>";
                            str += "<p class='href'><a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "'>www.cnqc.gov.cn</a></p>";
                            str += "</div>";
                            str += "</div>";
                        } else {
                            str += i == 1 ? "<div class='most-new-list'>" : "";
                            str += "<p>";
                            str += "<a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "'>" + item.Title + "</a>";
                            str += "<span> - " + (item.CreateTime).substring(0, 10) + "</span>";
                            str += "</p>";
                            str += i == newsList.length ? "</div>" : "";
                        }
                    });
                    str += '</div>';
                }
                //------------------加载推荐信息开始------------------
                //政策文件推荐信息
                var fileList = data.Data.FileList;
                if (fileList.length > 0) {
                    var fileStr = "<p class='title-one'><a href=\"javascript:;\">政策文件</a></p>";
                    fileStr += "<ul class='one'>";
                    $.each(fileList, function (i, item) {
                        fileStr += "<li><a target='_blank' href='/PublicDetail.aspx?Id=" + item.Id + "' target='_blank'>" + item.Title + "</a></li>";
                    });
                    fileStr += "</ul>";
                    $("#zcwjRecommend").html(fileStr);
                } else {
                    $("#zcwjRecommend").html("");
                }
                //办事服务推荐信息
                var serviceList = data.Data.ServiceList;
                if (serviceList.length > 0) {
                    var serviceStr = "<p class='title-one'><a href=\"javascript:;\">办事服务</a></p>";
                    serviceStr += "<ul class='one'>";
                    $.each(serviceList, function (i, item) {
                        serviceStr += "<li><a target='_blank' href='/NewDetail.aspx?Id=" + item.Id + "' target='_blank'>" + item.Title + "</a></li>";
                    });
                    serviceStr += "</ul>";
                    $("#bsfwRecommend").html(serviceStr);
                } else {
                    $("#bsfwRecommend").html("");
                }
                if (fileList.length == 0 && serviceList.length == 0) {
                    $('#Recommend').html("暂无推荐");
                } else {
                    $('#Recommend').html("智能推荐");
                }
                //------------------加载推荐信息结束------------------
                //匹配信息列表
                var dataList = data.Data.DataList;
                if (dataList != null && dataList.Items.length > 0) {
                    $("#TotalCount").text(dataList.TotalItems);
                    $.each(dataList.Items, function (i, item) {
                        str += "<div class='related-one'>";
                        str += "<p class='source'>";
                        str += "<b>发布机构：</b>";
                        str += "<span>" + (item.Source == undefined ? "青川县人民政府" : item.Source) + "&nbsp;&nbsp;</span>";
                        str += "<b>发布日期：</b>";
                        str += "<span>" + (item.CreateTime).substring(0, 10) + "</span>";
                        str += "</p>";
                        str += "<p class='related-title'>";
                        str += "<span>" + (item.NewsType == 1 ? "政务信息" : "信息公开") + "<i class='lf'><img src='/Images/img/search(1)_07.png' /></i>";
                        str += "<i class='rt'><img src='/Images/img/search(1)_09.png' /></i>";
                        str += "</span>";
                        str += "<a target='_blank' href='/" + (item.NewsType == 1 ? "NewDetail" : "PublicDetail") + ".aspx?Id=" + item.Id + "'>" + item.Title + "</a>";
                        str += "</p>";
                        str += "<div class='related-centent'>";
                        if (item.Images != null && item.Images != "") {
                            str += "<div class='img'>";
                            str += "<img width='100' height='70' src='" + item.Images.replace("/pub/", ":8088/pub/") + "' alt='" + item.Title.replace(/<\/?.+?>/g, "") + "' />";
                            str += "</div>";
                            str += "<div style='float: right;width: 710px;' class='text'>";
                            str += "<b>摘要</b>：" + (item.Description == "" ? "无" : item.Description);
                            str += "</div>";
                        }
                        else {
                            str += "<div class='text'>";
                            str += "<b>摘要</b>：" + (item.Description == "" ? "无" : item.Description);
                            str += "</div>";
                        }
                        str += "</div>";
                        str += "<p class='href'>";
                        str += "<a target='_blank' href='/" + (item.NewsType == 1 ? "NewDetail" : "/PublicDetail") + ".aspx?Id=" + item.Id + "'>青川县人民政府 - /" + (item.NewsType == 1 ? "Detail" : "PublicDetail") + ".aspx?Id=" + item.Id;
                        str += "</a>";
                        str += "</p>";
                        str += "</div>";
                    });
                    str += "<div id=\"PagingHtml\" class=\"page\"></div>";
                    str += "</div>";
                    $("#divResult").html(str);
console.log(1)
                    if (dataList.Items.length > 0) {
                        //设置分页
                        $("#PagingHtml").createPage({
                            //pageCount: dataList.TotalPages,
                            pageCount: Math.ceil(dataList.TotalItems/20),
                            current: parseInt($("#PageIndex").val()),
                            backFn: function (p) {
                                $("#PageIndex").val(p);
                                GetDataList();
                            }
                        });
                    }
                } else {
                    $("#TotalCount").text("0");
                    $("#divResult").html('<div><div class="point"><p class="fd">很抱歉，没有找到“<a href="javascript:;">' + data.Message + '</a>”相关的信息。</p><h3>温馨提示：</h3><ul><li><i></i>请检查您的输入是否正确</li><li><i></i>或者更换一种说法。</a></li></ul></div></div>');
                }
            } else {
                $("#divResult").html('<div><div class="point"><p class="fd">很抱歉，没有找到“<a href="javascript:;">' + data.Message + '</a>”相关的信息。</p><h3>温馨提示：</h3><ul><li><i></i>请检查您的输入是否正确</li><li><i></i>或者更换一种说法。</a></li></ul></div></div>');
            }
            //$('img').error(function () {
            //    //$(this).attr('src', '/Images/errorImg.jpg');
            //});
        }, error: function () {
            $("#divResult").html('<ul><li><p style="font-size: 18px;">加载数据失败，请稍后再试！</p></li></ul>');
        }
    });
}