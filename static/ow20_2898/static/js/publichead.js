app.controller('countControl',function($scope,$http) {
	$scope.count = {};
	//统计
	$scope.list = function(){
		$http.post('/index/Index/ranking_list_count').success(function(data){
			//console.log(data)
			$scope.count = data;
		})
		
	}
	
	$scope.list()
	

});	