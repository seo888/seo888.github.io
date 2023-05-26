/**
 * Created by xuzhihan on 2017/11/29.
 */
function sensitiveserver(res){
    if(res.error == 'sensitive' && res.data  && res.data.length) {
        var word = [];
        var htmlArr = [];
        $.each(res.data, function(i, item) {
            if((res.setting.serious == 3 && item.level == 1) ||
                (res.setting.normal == 3 && item.level == 0)){
                return;
            }
            var isRepeat = false;
            var curWord =  "";
            if( item && item.word && item.word.length >=1){
                curWord = item.word[1];
            }
            // 验证是否重复
            $.each(word, function(ii, bean){
                if(bean == curWord){
                    isRepeat = true;
                    return false;
                }
            });
            if(!isRepeat){
                var html = '<span class="word-block">'+curWord+'</span>';
                htmlArr.push(html);
                word.push(curWord);
            }
        });
        wxc.xcConfirm('包含以下敏感词,请修改后重试:<span class="word-box">'+htmlArr.join('')+'</span>', 'error');
        $('.js_comment_submit').html('发布').removeClass('disable');
        return false;
    }
    return true;

}