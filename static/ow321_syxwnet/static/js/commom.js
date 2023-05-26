if(!window.console){ // IE9不支持consol方法，故需判断
    window.console={
        log:function () {}
    }
}

// logo处搜索
$('.logo-search select').on({
    change: function () {
        var val = $(this).val();
        var txt = '全部';
        if(val){
            txt = $(this).find('option[value='+val+']').text();
        }
        $('.logo-search .select').find('.name').html(txt)
    }
})

