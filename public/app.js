//"https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js"

var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope','$http','$log', function($scope, $http, $log) {

$scope.locations=["CYCLE","SILVER SNEAKERS","ALL CLASSES"];
$scope.selectedLocation="";
$scope.count=0;

    $scope.onSelectedLocation = function(l) {
        $scope.students=[];
        $scope.result=[];
        $scope.selectedLocation=l;

         $http({
             method : 'GET',
             headers: {'X-Parse-Application-Id':'LTOTE2KzdaQcrKO0bhanuRROLHxjjxzy8URFzL4U'},
             url : 'https://web.alariscloud.com/parse/classes/Dashboard'
         })
        .then(function (response) {
             $scope.result = response.data.results;
             if ($scope.selectedLocation == "ALL CLASSES"){
                    $scope.students=$scope.result;
                    $scope.count=$scope.students.length;
                    $log.log($scope.students);
                }
             else{
                    var i,j = 0;
                    for(i = 0; i < $scope.result.length; i++){
                    if ($scope.result[i].program.name == $scope.selectedLocation)
                        {
                            $scope.students[j] = $scope.result[i];
                            $log.log($scope.students[j]);
                            j++;
                        }
                    }
                    $scope.count=$scope.students.length;
                }
        $scope.displayCount=true; 
        },function(err){
                $scope.error = err.statusText || "Request Failed!";
                alert("Error" + err.status + err.statusText + $scope.error);
                alert(err);
        });

    };


}]);

app.directive('noImage', function () {

    var setDefaultImage = function (el) {
        el.attr('src', "/images/photo_not_available.png");
    };

    return {
        restrict: 'A',
        link: function (scope, el, attr) {
            scope.$watch(function() {
                return attr.ngSrc;
            }, function () {
                var src = attr.ngSrc;

                if (!src) {
                    setDefaultImage(el);
                }
            });

            el.bind('error', function() { setDefaultImage(el); });
        }
    };
});

       
