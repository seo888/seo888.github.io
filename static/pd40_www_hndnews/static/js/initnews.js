$(document).ready(function () {
    var NEWSTYPE = 'newsType'
    var TYPELIST = 'typeList'
    var TYPEMASONRY = 'typeMasonry'

    // 获取右侧广告栏
    $.ajax({
        url: '/getAdList?sort=6',
        dataType: 'json',
        success: function (res, opt) {
            if (res.code === 0) {
                var data = res.data
                try {
                    var adContainer = $('#adContainer')
                    for (var i=0; i< data.length; i++) {
                        var item = data[i]
                        var ad = '<a href="' + (item.contentUrl || '') + '" target="_blank" style="margin-bottom: 10px">\n' +
                            '         <img width="240" src="' + (item.picUrl || '') + '">\n' +
                            '     </a>'

                        adContainer.append(ad)
                    }
                }catch (e) {}
            }
        }
    })


    $('.news-list-types div').click(function (){
        var $self = $(this)
        if ($self.is('.active')) return false
        $self.addClass('active')
        var elmId = $self.attr('id')
        if (elmId === 'newsTypeMasonryBtn') {
            $('#newsTypeListBtn').removeClass('active')
            $('#newsTypeMasonry').show()
            $('#newsTypeList').hide()
            window.localStorage.setItem(NEWSTYPE + currentCid, TYPEMASONRY)
        }else {
            $('#newsTypeMasonryBtn').removeClass('active')
            $('#newsTypeList').show()
            $('#newsTypeMasonry').hide()
            window.localStorage.setItem(NEWSTYPE + currentCid, TYPELIST)
        }
    })

    // 显示卡片
    function showNewsMasonry() {
        // 取消列表按钮选中跟隐藏列表
        $('#newsTypeListBtn').removeClass('active')
        $('#newsTypeList').hide()

        // 选中卡片按钮选中跟显示卡片
        $('#newsTypeMasonryBtn').addClass('active')
        $('#newsTypeMasonry').show()
    }

    function initNewsTypeShow() {
        try {
            // 判断用户是否设置过新闻模式
            var newsType = window.localStorage.getItem(NEWSTYPE + currentCid)
            if (newsType) {
                if (newsType == TYPEMASONRY){
                    showNewsMasonry()
                }
            }else {
                // 判断栏目岛事/直播/视频/图集/专题页面
                if ([2, 15, 68, 43, 47, 44, 83, 85, 86, 87, 42, 50, 39, 12, 40, 39, 5, 55, 79, 88, 89, 90].indexOf(parseFloat(currentCid)) > -1) {
                    showNewsMasonry()
                }
            }
        }catch (e){}
    }

    initNewsTypeShow();
});
