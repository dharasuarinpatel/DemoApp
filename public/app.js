//"https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js"

var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope','$http','$log', function($scope, $http, $log) {

$scope.locations=["CYCLE","SILVER SNEAKERS","All Classes","Class3"];
$scope.selectedLocation="";
 $scope.students=[];
    $scope.onSelectedLocation = function(l) {
       $scope.selectedLocation=l;
        console.log(l,$scope.selectedLocation);
         if(l == "All Classes")
       {
           $scope.filteredData=false;
           $scope.allData=true;
           $scope.totalCount=true;
           $scope.filterCount=false;
       }
       else{
           $scope.filteredData=true;
           $scope.allData=false;
           $scope.filterCount=true;
           $scope.totalCount=false;
       }
         $http({
            method : 'GET',
            headers: {'X-Parse-Application-Id':'LTOTE2KzdaQcrKO0bhanuRROLHxjjxzy8URFzL4U'},
            url : 'https://web.alariscloud.com/parse/classes/Dashboard'
            }) 
        .then(function (response) {
            $scope.students = response.data.results;
            $log.log($scope.students);
            $scope.displayCount=true;  
            $scope.count=$scope.students.length; 
            },function(err){
                $scope.error = err.statusText || "Request Failed!";
                alert("Error" + err.status + err.statusText + $scope.error);
                alert(err);
            });
    };
     $scope.isActive = function(l) {
        return $scope.selectedLocation === l;
 };
   
}]);


