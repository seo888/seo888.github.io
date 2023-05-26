var status0='';
        var numFont=16;
        var numLine=34;
        function turnsmall(ele){
            if(numFont>14){
                numFont = numFont-2;
                numLine = numLine-2;
                ele.style.fontSize=numFont+'px';
                ele.style.lineHeight=numLine+'px';
            }
        }
        function turnbig(ele){
            if(numFont<18){
                numFont = numFont+2;
                numLine = numLine+2;
                ele.style.fontSize=numFont+'px';
                ele.style.lineHeight=numLine+'px';
            }
        }

        function AddFavorite(title, url) {
        try {
            window.external.addFavorite(url, title);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            }
            catch (e) {
                alert("抱歉，您所使用的浏览器无法完成此操作。加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }



         var i=0; //图片标识
    var img_num=$(".img_ul").children("li").length; //图片个数
    $(".img_ul li").hide(); //初始化图片
    if(img_num > 0){
        play();
    }
    $(function(){

        var modifynum = parseInt($("#modifynum").text());
        if(modifynum >= 3){
            $(".modifynum").each(function(){
                $(this).text(modifynum-2);
            });
        }

        $(".img_hd ul").css("width",($(".img_hd ul li").outerWidth(true))*img_num); //设置ul的长度
        $(".img_hd .img_a").find("img").on("load",imgs_load(this));

        $(".bottom_a").css("opacity",0.7);  //初始化底部a透明度
        //$("#play").css("height",$("#play .img_ul").height());
        if (!window.XMLHttpRequest) {//对ie6设置a的位置
            $(".change_a").css("height",$(".change_a").parent().height());
        }

        $(".change_a").focus(function(){
            this.blur();
        });
        $(".bottom_a").hover(function(){//底部a经过事件
            $(this).css("opacity",1);
        },function(){
            $(this).css("opacity",0.7);
        });

        $(".change_a").hover(function(){//箭头显示事件
            $(this).children("span").show();
        },function(){
            $(this).children("span").hide();
        });

        $(".img_hd ul li").click(function(){
            i=$(this).index();
            play();
        });

        $(".prev_a").click(function(){
            //i+=img_num;
            i--;
            //i=i%img_num;
            i=(i<0?0:i);
            play();
        });
        $(".next_a").click(function(){
            i++;
            //i=i%img_num;
            i=(i>(img_num-1)?(img_num-1):i);
            play();
        });
        if($(".img_ul").children().length > 0){
            $(".play").show();
            $(".img_hd").show();
        }
    });

    function play(){//动画移动
        var img=new Image(); //图片预加载
        img.onload=function(){
            img_load(img,$(".img_ul").children("li").eq(i).find("img"));
            //$(".change_a").css("height",$(".img_ul .img_a img").height());
            $(".change_a").css("height",$(".img_ul").children("li").eq(i).find('img').height());
        };
        img.src=$(".img_ul").children("li").eq(i).find("img").attr("src");
        //$(".img_ul").children("li").eq(i).find("img").(img_load($(".img_ul").children("li").eq(i).find("img")));
        $(".img_hd ul").children("li").eq(i).addClass("on").siblings().removeClass("on");
        if(img_num>7){//大于7个的时候进行移动
            if(i<img_num-3){ //前3个
                $(".img_hd ul").animate({"marginLeft":(-($(".img_hd ul li").outerWidth()+4)*(i-3<0?0:(i-3)))});
            }else if(i>=img_num-3){//后3个
                $(".img_hd ul").animate({"marginLeft":(-($(".img_hd ul li").outerWidth()+4)*(img_num-7))});
            }
        }
        if(!window.XMLHttpRequest){//对ie6设置a的位置
            $(".change_a").css("height",$(".change_a").parent().height());
        }
    }

    function img_load(img_id,now_imgid){//大图片加载设置 （img_id 新建的img,now_imgid当前图片）
        if(img_id.width/img_id.height>1){
            if(img_id.width >=$("#play").width())
                $(now_imgid).width($("#play").width());
        }else{
            if(img_id.height>=500) $(now_imgid).height(500);
        }
        $(".img_ul").children("li").eq(i).show().siblings("li").hide(); //大小确定后进行显示
    }

    function imgs_load(img_id){//小图片加载设置
        if(img_id.width >=$(".img_hd ul li").width()){img_id.width = 80};
        //if(img_id.height>=$(".img_hd ul li").height()) {img_id.height=$(".img_hd ul li").height();}
    }

    $(window).load(function(){
        function share_bottom(){
            var shareRight_top = $("#share_right").offset().top + 45;
            var text_height = $("#text_content").height();
            if($(window).scrollTop() > shareRight_top){
                $("#share_bottom").fadeIn("slow");
            }

            if(($(window).height()+$(window).scrollTop())>(text_height+shareRight_top)){
                $("#share_bottom").removeClass("fixed");
            }else if(($(window).height()+$(window).scrollTop())<(text_height+shareRight_top)){
                $("#share_bottom").addClass("fixed");
            }
        }
        $(window).on("scroll",share_bottom);
        share_bottom();
        $("#slideTxtBox3").slide({});
    })