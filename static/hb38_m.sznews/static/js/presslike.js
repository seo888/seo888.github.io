//该js文件用于文章页实现点赞按钮功能
/*判断是否为ie,并且ie版本小于9*/
function judge_ie(){
    var isIE=!!window.ActiveXObject;
    if (isIE)
    {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(navigator.userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7 || fIEVersion == 8 || fIEVersion == 9)
            less_ie10=true;
    }
}

//JSONP的回调函数
function change_press_like_num(num,status){
    if(num === -1){//点赞
        if(status ==="success"){
            current_count++;
        }
    }else if(num >= 0){//获取点赞数
        current_count=num;
        if(!has_get_json)has_get_json=true;
    }
    set_elem_txt();//刷新页面点赞数
    jQuery(".pressLike").remove();
}
//调用JSONP接口
function op_like_count(is_add){
    var add_count_url="//countpage2.sznews.com/2022/stat/web.php?s=zan/stat/addZan";//点赞接口
    var get_count_url="//countpage2.sznews.com/2022/stat/web.php?s=zan/stat/getZan";//获取点赞数接口
    var random_r=Math.round(Math.random()*10000000);//防止后台缓存的随机参数
    if(less_ie10)random_r+="&&less_ie10=1";
    if(is_add)
        jQuery_head.append("<script class='pressLike' type='text/javascript' src='"+add_count_url+"&content_id="+article_id+"'/>");
    else
        jQuery_head.append("<script class='pressLike' type='text/javascript' src='"+get_count_url+"&content_id="+article_id+"'/>");
}
//设置对应ID的元素内文本
function set_elem_txt(){
    function set_once_elem_txt(bind_id){
        var jQuery_like_btn_p=jQuery(bind_id);
        var jQuery_tt=jQuery_like_btn_p.find("span");
        if(jQuery_tt.length != 0){
            jQuery_tt.text(current_count);
            return;
        }
        jQuery_like_btn_p.text(current_count);
    }
    for(var i=0;i<dianzan_html_class_arr.length;i++){
        set_once_elem_txt(dianzan_html_class_arr[i]);
    }
}

var dianzan_handle_repeat_count=0;//重试次数
//绑定按钮点赞后处理函数
function bind_handle(){
    function bind_once_handle(bind_id){
        var jQuery_like_btn_p=jQuery(bind_id);
        dianzan_handle_repeat_count++;
        if(jQuery_like_btn_p.length == 0){//当前需绑定的元素未完全加载到页面
            var bind_id_copy=bind_id+"";
            if(dianzan_handle_repeat_count < 5)
                setTimeout(function(){
                    bind_once_handle(bind_id_copy);
                    if(!has_get_json)
                        op_like_count(false);//获取点赞数
                    else
                        set_elem_txt();//刷新页面点赞数
                },dianzan_handle_repeat_count*300+100);
            return;
        }
        jQuery_like_btn_p.unbind("click");
        jQuery_like_btn_p.click(function () {
            if(has_get_json) {
                op_like_count(true);
            }
        });
    }
    for(var i=0;i<dianzan_html_class_arr.length;i++){
        bind_once_handle(dianzan_html_class_arr[i]);
    }
}
jQuery(function () {
    //读取文章ID
    reg = new RegExp("/content_[^/]+.htm");
    href=window.location.href;
    r = href.match(reg);
    tt=r[0];
    article_id=tt.substring(9,tt.length-4);
    var temp2=article_id.indexOf('_');
    if(temp2 != -1)article_id=article_id.substring(0,temp2);
    // article_http_or_https=href.substring(0,href.indexOf(":"));
    has_get_json=false;//是否读取到ajax点赞数据
    less_ie10=false; //是否是IE7-9
    current_count=0;//当前点赞数
    jQuery_head=jQuery("head");
    dianzan_html_class_arr=[".like-btn",".like-btn.like-btn-page-bottom"];//需要实现点赞的html标签class数组
    judge_ie();//检测ie版本
    bind_handle();//绑定点击事件
    op_like_count(false);//获取点赞数
});

//处理模板错误使用方法影响begin
function iFrameHeight() {
}
//处理模板错误使用方法影响end