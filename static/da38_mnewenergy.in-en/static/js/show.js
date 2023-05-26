/**
 * Created by Administrator on 2019/9/2.
 */
$(function(){
    function fun(tab1,tab2){
        tab1.mouseenter(function () {
            tab2.stop().slideDown("slow");
        }).mouseleave(function () {
            tab2.stop().slideUp("slow");
        });
    }
    fun($(".nav-more"),$(".sub-nav"));
    fun($(".otherLink"),$(".sub-fastnav"));
    //获取焦点，取消焦点
    $('.searchBox1').bind({
        focus: function () {
            if (this.value == this.defaultValue) {
                this.value = "";
            }
        },
        blur: function () {
            if (this.value == "") {
                this.value = this.defaultValue;
            }
        }
    })
    //    固定导航
    $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        //console.log(scrollPos);
        if(scrollPos>30){
            $(".header").addClass('fixed');
            $(".curLocation").addClass('marTop90');
        }else{
            $(".header").removeClass('fixed');
            $(".curLocation").removeClass('marTop90');
        }
        //    固定左侧时间
        if(scrollPos>200){
            $(".LeftTool").css({"position":"fixed","top":'100px'})
        }else{
            $(".LeftTool").css({"position":"static"});
        }
    })
//    找出文章中的空标签并隐藏
    var tt;
    $("#article *").not('img').each(function(){
        tt = $(this).text();
//        console.log(tt);
        if(tt==null||tt=="　　"||tt=="&nbsp;"){
            $(this).css({"display":"none"});
        }
    })
//    $('#article div').html($.trim($('#article div').html()))
});