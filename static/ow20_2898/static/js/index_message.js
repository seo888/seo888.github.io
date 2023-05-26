app.controller("msg",function($scope,$http,$filter,$rootScope){
    $scope.data = {}
    $scope.data.pz =  10   //条数 
    $scope.data.px = 1  //页数
    $scope.allMsg = [] // 所有的消息
    $scope.scrollDisabled = false;
    $scope.max_page = ''

    $rootScope.checkAll = function(){
        $http.post("/member/Account/red_message",$scope.data).success(function(data){
             if(data.statusCode == 200){
                    $scope.allMsg = data.res

            }else{
                modal_alert(data.message)
            }
        })
    }
    if(message=='true'){
        $('.message_case').modal('show');
        $scope.checkAll();
    }
    
    $scope.msgTime = function(time){
        return $filter('date')((time * 1000),"yyyy-MM-dd")
    }
    $scope.getPage = function(mark){
    	if($scope.checked){
    		$scope.checked = !$scope.checked;
    	}
    	
		if(mark == 'prev' && $scope.data.px > 1){
			$scope.data.px -= 1;
			$scope.checkAll();
		} 
		if(mark == 'next' && $scope.data.px < $scope.max_page){
			$scope.data.px += 1;
			$scope.checkAll();	
		} 
	}
    
    
    $scope.getwhole = function(){
        window.location.href = memberUrl("/account/message_list");
    }
    $scope.checked = false;
    $scope.checkItem = function(index){
		if(index == 'all'){
			$scope.checked = !$scope.checked;
			for (var i = 0; i < $scope.allMsg.length; i++) {
				$scope.allMsg[i]['checked'] = $scope.checked;
				
			};
			return true;
		}
		$scope.allMsg[index]['checked'] = !$scope.allMsg[index]['checked'];
	}
//操作已读	 
	$scope.reads = function(){
		$scope.ids = '';
		for (var i = 0; i < $scope.allMsg.length; i++) {
			if($scope.allMsg[i].checked){
				$scope.ids += $scope.allMsg[i].id + ','
				
			}
		};
		if($scope.ids != ''){
			$scope.ids = $scope.ids.substring(0,$scope.ids.length - 1)
		}else{
			modal_alert('请勾选要操作的消息');
			return false;
		}
		$http.post("/member/Account/upmessage",{ids:$scope.ids}).success(function(data){
            if(data.statusCode == 200){
				for (var i = 0; i < $scope.allMsg.length; i++) {
					if($scope.allMsg[i].checked){
						$scope.allMsg[i].isread = 1
					}
				};
            }else{
                modal_alert(data.message)
            }
        })
	}
//操作删除	
	$scope.delmsg = function(){
		$scope.ids = '';
		$scope.allid = [];
		for (var i = 0; i < $scope.allMsg.length; i++) {
			if($scope.allMsg[i].checked){
				$scope.ids += $scope.allMsg[i].id + ','
				$scope.allid.push($scope.allMsg[i].id) 
			}
		};
		if($scope.ids != ''){
			$scope.ids = $scope.ids.substring(0,$scope.ids.length - 1)
		}else{
			modal_alert('请勾选要操作的消息');
			return false;
		}
		$http.post("/member/Account/delmessage",{ids:$scope.ids}).success(function(data){
            if(data.statusCode == 200){
				for (var i = 0; i < $scope.allMsg.length; i++) {
					for(var j = 0;j < $scope.allid.length;j++){
						if($scope.allMsg[i].id == $scope.allid[j]){
							$scope.allMsg.splice(i,1)
						}
					}
				};
				$scope.checkAll();
				$scope.checked = !$scope.checked;
            }else{
                modal_alert(data.message)
            }
        })
	}

})