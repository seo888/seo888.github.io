app.directive("phoneNum", function () {
    return {
        restrict: "AE",
        replace: false,
        link: function (scope, element, attr) {
            element.bind("blur", function (event) {
                scope.checkPhone()
            })
        }
    }
})

// app.directive("chName", function () {
//     return {
//         restrict: "AE",
//         replace: false,
//         link: function (scope, element, attr) {
//             element.bind("blur", function (event) {
//                 scope.changeUserName()
//             })
//         }
//     }
// })

app.directive('ngBlur', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngBlur']);
        element.bind('blur', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    }
}]);

app.directive('ngFocus', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngFocus']);
        element.bind('focus', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    }
}]);
app.directive('ngKeyup', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngKeyup']);
        element.bind('keyup', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    }
}]);


app.directive("user", function () {
    return {
        restrict: "AE",
        replace: false,
        require: "^chName",
        template: "昵称：<span ng-bind = 'userName' id= 'usSpan'>用户名</span><input id='usInput' class='modalsp3 none'    ng-model = 'cName'>"
    }
})



