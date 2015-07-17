angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,$rootScope) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  });
     $rootScope.goToHomeScreen = function() {
                $state.go('menu.home');
            };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Register', id: 1 },
    { title: 'Notifications', id: 2 },
    { title: 'Feedback', id: 3 }
  ];
})
.controller('hackthonCtrl',function($scope,$state){
  //declaring the max no of participants 
  $scope.options = 
  [
    {
      display: "1",
      value: "1"
    },
    {
      display: "2",
      value: "2"
    },
    {
      display: "3",
      value: "3"
    },
    {
      display: "4",
      value: "4"
    }
  ];
  //By default select one
  $scope.person_count={ value:"1" };
  //$scope.employees = [];
  //watching person count variable
  $scope.$watch("person_count.value", function(newValue ,oldValue)
    {
      $scope.dynamicJSON(newValue);
    });

    $scope.dynamicJSON=function(value)
    {
        $scope.jsonObj=[];
        item = {};
        
          item ["DDR_cell_No"] = "";
          item ["DDR_cell_Name"] = "";
          item ["Email_id"] = "";
          item ["Team_Name"] = "";
          item ["Mobile_No"] = "";

         //creating json dynamically 
        for(i=0; i< value ;i++)
        {
          item["count"]=i;
          $scope.jsonObj.push(angular.copy(item));
        }

        //alert(JSON.stringify($scope.jsonObj));
    };
    $scope.register_submit=function()
    {
      //alert("register_submit");
      alert(JSON.stringify($scope.jsonObj));
    }
})

.controller('AgendaCtrl', function($scope, $stateParams) {
});
