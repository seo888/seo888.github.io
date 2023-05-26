$(function () {
    var $printArea = $("[data-power-area='content']"),
        $articleContent = $("[data-power-defaultFontSize]"),
        $curFontSize = $articleContent.css("fontSize"),
        fontSize = $curFontSize != null
            ? parseInt($curFontSize.substr(0, $curFontSize.indexOf('px')))
            : $articleContent.attr("data-power-defaultFontSize"),
        $title = $("[data-power-area='title']").text(),
        maxFontSize = 40,
        minFontSize = 12,
        defaultLineHeight = $articleContent.attr("data-power-defaultLineHeight"),
        imgMaxWidth = $articleContent.attr("data-power-imgMaxWidth");

    $('[data-power-command]')
        .on('click',
            function () {
                var printType = $(this).data().powerCommand;
                switch (printType) {
                    //放大字体
                    case 'enlargefont':
                        if (fontSize < maxFontSize) {
                            fontSize = fontSize + 2;
                            $articleContent.find("*")
                                .css("fontSize", "medium")
                                .css({ "fontSize": fontSize, "lineHeight": defaultLineHeight });
                        }
                        break;
                    //减小字体
                    case 'reducefont':
                        if (fontSize > minFontSize) {
                            fontSize = fontSize - 2;
                            $articleContent.find("*")
                                .css("fontSize", "medium")
                                .css({ "fontSize": fontSize, "lineHeight": defaultLineHeight });
                        }
                        break;
                    //打印区域
                    case 'printarea':
                        $printArea.printArea({
                            mode: "popup",
                            popClose: true,
                            popWd: 1000,
                            popTitle: $title,
                            extraCss: '/statics/pc/css/print.css'
                        });
                        break;
                    //打印页面
                    case 'printpage':
                        var $typeList = $(this).parents('ul').hide();
                        $typeList.prev()
                            .one('mouseover',
                                function () {
                                    $typeList.removeAttr('style');
                                });
                        window.print();
                        break;
                    default:
                        break;
                }
            });

    //图片处理
    $("[data-power-area='content'] img")
        .each(function () {
            var img = $(this);
            img.hide();
            var imgInt = setInterval(function () {
                    if (img.width() > 0) {
                        clearInterval(imgInt);
                        if (img.width() > imgMaxWidth) {
                            img.width(imgMaxWidth)
                                .css({ cursor: "pointer", height: "auto" })
                                .click(function () { window.open(img.attr('src'), "_blank") });
                        }
                        img.show();
                    }
                },
                50);
        });

    // 编辑器“背景”按钮，修复编辑器背景不显示问题
    var cbg = $("#content p[data-background]:hidden");
    if (cbg.length > 0) {
        $("#content").attr("style", cbg.attr("data-background"));
    }
});