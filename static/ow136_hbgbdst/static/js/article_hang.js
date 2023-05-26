/**
 * Created by 文韬 on 2016/12/14.
 */
$(function(){

    //投票挂件
    var ids = [];//选中的投票选项id
    var hang = $(".vote-hang-data").data("hang");//挂件对象
    var articleId = $(".vote-hang-data").data("articleid");//文章id
    var hangId = $(".vote-hang-data").data("hangid");//挂件id

    //多选
    $(".vote-multi-item").off().on("click", function(e){
        var $target = $(e.currentTarget),
            id = $target.data("id"),
            $input = $target.find("input");

        if($input.hasClass("checked")){
            $input.removeClass("checked");
        }else{
            $input.addClass("checked");
            ids.push(id);
        }
    });

    //单选
    $(".vote-radio-item").off().on("click", function(e){
        var $target = $(e.currentTarget),
            id = $target.data("id"),
            $input = $target.find("input");

        if($input.hasClass("checked")){
            $input.removeClass("checked");
        }else{
            $target.parent(".vote-hang-list").find("input").removeClass("checked");
            $input.addClass("checked");
            ids[0] = id;
        }
    });

    var submitting = false;
    var voteSubmit = function(e){
        var $target = $(e.currentTarget),
            hangDomain = $(".vote-hang-data").data("domain"),
            type = $target.data("type"),
            url = hangDomain + "/wap/article/vote",
            req = {
                contentid: $(".vote-hang-data").data("articleid"),
                itemid: []
            };

        if(submitting) return;
        if(type == "compare"){
            var id = $target.data("id");
            req.itemid[0] = id;
            if(vote.getState() == "finish"){
                showAlert("已投票");
                return;
            }
        }else{
            req.itemid = ids;
        }

        if(!req.itemid.length) return;
        submitting = true;
        $.post(url, req, function(res){
            if(res){
                var data = res.data;
                //投票成功
                if(data) $(".vote-result-pre").each(function(i, v){
                    var id = $(this).data("id");
                    this.style.width = data[id] + "%";
                    $("#hang_" + id).html(data[id] + "%");
                    if(type == "compare" && data[id] == 100){
                        $(this).addClass("border-radius");
                    }else{
                        $(this).removeClass("border-radius");
                    }
                });
                if(hang){
                    var hangItem = hang;
                    hangItem.timestamp = new Date().getTime();
                    if(hangItem.model == 3){
                        $.each(hangItem.items, function(key, value){
                            if(req.itemid[0] == value.id){
                                hangItem.items[key].checked = true;
                            }else{
                                hangItem.items[key].checked = false;
                            };
                        });
                    };
                    vote.setState(hangItem);
                    if(hangItem && hangItem.id && hangItem.model == 3) setCompareState();
                };
                showAlert("投票成功");
            }
            submitting = false;
        });

        function showAlert(html) {
            $(".vote-hang-alert").html(html).show();
            var timeoutid = setTimeout(function(){
                clearTimeout(timeoutid);
                $(".vote-hang-alert").hide();
                setVoteResultState();
            }, 500);
        }
    };

    //投票事件
    $(".hang-submit-button").off().on("click", voteSubmit);

    var vote = {
        setState: function(hang){
            var vote = this.getVoteList();
            vote[articleId] = hang;
            this.setVoteList(vote);
        },
        getState: function(){
            var vote = this.getVoteList(),
                hang = vote[articleId] || {},
                nowTimestamp = new Date().getTime(),
                diff = (nowTimestamp - hang.timestamp) || 10000000000,
                state = "vote";
            if(hang && (hang.id == hangId) && (diff < 12 * 60 * 60 * 1000)) state = "finish";
            return state;
        },
        getVoteList: function(){
            var vote = {};
            if(localStorage.vote){
                vote = JSON.parse(localStorage.vote)
            };
            return vote;
        },
        setVoteList: function(vote){
            localStorage.vote = JSON.stringify(vote);
        }
    };

    //处理投票、结果逻辑
    var setVoteResultState = function(){
        var $vote = $(".vote-multi-radio"),
            $result = $(".vote-multi-radio-result");
        if(vote.getState() == "vote"){
            $vote.show();
            $result.hide();
        }else{
            $vote.hide();
            $result.show();
        }
    }
    setVoteResultState();

    //添加关联视频
    var addRelateVideo = function(){
        var $dom = $(".video-link-player"),
            iframe = $dom.data("iframe");

        $dom.html(iframe);
    };
    addRelateVideo();


    var setCompareState = function() {
        var $compare = $(".vote-hang-compare-button>div"),
            hangItem = vote.getVoteList()[articleId];

        if (vote.getState() == "vote") {
            $compare.find(".vote").show();
        } else {
            $.each(hangItem.items, function(k, v) {
                if (v.checked) {
                    $.each($compare, function(key, value) {
                        var id = $(value).data("id");
                        if (v.id == id) {
                            $(value).find(".voted").show();
                            $(value).find(".vote").hide();
                            if (key == 0) $(value).find("div").addClass("vote-blue");
                            else $(value).find("div").addClass("vote-yellow");
                        } else {
                            $(value).find(".vote").show();
                            $(value).find(".voted").hide();
                            if (key == 0) $(value).find("div").removeClass("vote-blue");
                            else $(value).find("div").removeClass("vote-yellow");
                        };
                    });
                };
            });
        };
    };
    if(hang && hang.id && hang.model == 3) setCompareState();

});