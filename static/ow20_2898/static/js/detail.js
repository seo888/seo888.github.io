app.controller('articleControl', function ($scope, $http, public, common, $rootScope,geetest) {
    geetest.init();
    $rootScope.common = common;
    $rootScope.common.getCart();  // 1友链  2图文
    $scope.data = res;

    $scope.commentdata = "";
    $scope.commentcount = 0;
    $scope.listGive = $.cookie("give" + $scope.data.id);
    $scope.listunGive = $.cookie("ungive" + $scope.data.id);
	var cook = $.cookie('token');
    $scope.commentList = function () {
        $http.post("/index/webdetails/getComment", {
            acid: $scope.data.id,
            type: 1
        }).success(function (data) {
            if (data.statusCode == 200) {
                $scope.commentIS = true;
                $scope.commentdata = data.data;
                $scope.commentcount = data.list;
            } else {
                modal_alert(data.message)
            }
        })
    }
    $scope.commentList();

    //评论点赞
    $scope.like = function (item, index) {
        var give = $.cookie("commentGive" + item.id);
        if (!give) {
            $http.post("/index/Autochain/give", {
                id: item.id,
                type: 1
            }).success(function (data) {
                if (data.statusCode == 200) {
                    $.cookie("commentGive" + item.id, 1)
                    $scope.commentdata[index].comgive = 1;
                    $scope.commentdata[index].like = data.data
                } else {
                    modal_alert(data.message)
                }
            })
        } else {
            /* alert("已操作")*/
            modal_alert('您已经点赞了噢！');
            return false;
        }
    }

    //评论差评
    $scope.unlike = function (item, index) {
        var give = $.cookie("commentunGive" + item.id);
        if (!give) {
            $http.post("/index/Autochain/give", {
                id: item.id,
                type: 2
            }).success(function (data) {
                if (data.statusCode == 200) {
                    $.cookie("commentunGive" + item.id, 1)
                    $scope.commentdata[index].comungive = 1;
                    $scope.commentdata[index].unlike = data.data
                } else {
                    modal_alert(data.message)
                }
            })
        } else {
            modal_alert('您已经差评噢！');
            return false;
        }
    }
    //删除评论
    $scope.delComment = function (id) {
        $http.post("/member/Account/deleteCom", {
            id: id
        }).success(function (data) {
            if (data.statusCode == 200) {
                $scope.commentList()
                modal_alert(data.message);
            } else {
                modal_alert(data.message)
            }
        })
    }


    $scope.NumberCount = 0;
    $scope.countContent = function () {
        $scope.NumberCount = $scope.getStrLeng($scope.content)
    }

    //评论文章 //评论需登录
    $scope.addComment = function () {
        if (!cook) {
            modal_confirm('您还没有登录，登录才能评论！', function () {
                window.location.href = '/member/user/login.htm';
            }, function () {
  
            }, {yes: '去登录', no: 'hide'});
            return false;
        }
        var id = $scope.data.id;
        if (!$scope.content) {
            modal_alert("请输入评论内容！")
            return false;
        }
        var isstr = $scope.getStrLeng($scope.content)
        if (isstr > 300) {
            modal_alert("您的评论内容过长，请输入300字以内的内容，谢谢！")
            return false;
        }
        geetest.callback = function(geetestData){
            $http.post("/index/index/commentUser", {
                content: $scope.content,
                type: 1,
                acid: id,
                geetest_challenge:geetestData.geetest_challenge,
                geetest_validate:geetestData.geetest_validate,
                geetest_seccode:geetestData.geetest_seccode,
            }).success(function (data) {
                if (data.statusCode == 200) {
                    $scope.commentList()
                    $scope.content = ""
                    modal_alert(data.message);
                } else {
                    modal_alert(data.message)
                }
            })
        }
        geetest.start();
    }
    // UTF8字符集实际长度计算
    $scope.getStrLeng = function (str) {
        var realLength = 0;
        var len = str.length;
        var charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                // 如果是中文则长度加1
                realLength += 1;
            }
        }
        return realLength;
    }

    //右侧内容大于左侧内容时隐藏不显示

    $scope.l_height = document.getElementById('left').offsetHeight
    $scope.r_height = document.getElementById('right').offsetHeight
    if($scope.l_height<$scope.r_height){
        $('.x_zyright').css({'width':'auto'});
    }


    $(function () {
        $(document).on('click', '.tougao', function () {
            if (cook == null) {
                modal_confirm('您还没有登录，登录才能投稿！', function () {
                    window.location.href = '/member/user/login.htm';
                }, function () {

                }, {yes: '去登录', no: 'hide'});
            }
        })
    })
    $scope.isBig=false;
    $('.n_con img').removeAttr('onclick');
    var bigImgObj = $('#bigImgObj');
    $('.n_con').on('click','img',function(e){
        e.preventDefault();
        var _this = $(this);
        var src=_this.attr('src');

        console.log(_this.width())
        var width = _this.width();
        var height = _this.height();

        if(height > width){
            bigImgObj.css({height:'70%',width:'auto'})
        }else{
            bigImgObj.css({height:'auto',width:'50%'})
        }



        $scope.bigSrc=src;   
        $scope.isBig=true;
        $scope.$apply();
    })

});

	
