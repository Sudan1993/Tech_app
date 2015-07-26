angular.module('starter.controllers.hackthonCtrl', [])

.controller('hackthonCtrl',function($scope,$state,PopUpService){

  if(window.localStorage.getItem('username')===null) {
    PopUpService.showPopup('Alert','Please login yourself');
    $state.go('menu.login');
  }

  $scope.static_fields={};
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
  
  //watching person count variable
  $scope.$watch("person_count.value", function(newValue ,oldValue) {
      $scope.dynamicJSON(newValue);
  });
  $scope.dynamicJSON=function(value) {
      $scope.jsonObj=[];
      item = {};
      
      item ["Tpxid"] = "";
      item ["Empid"] = "";
      item ["Mobile_No"] = "";

       //creating json dynamically 
      for(i=0; i< value ;i++)
      {
        item["count"]=i;
        $scope.jsonObj.push(angular.copy(item));
      }

  };
  $scope.register_submit=function() {
    if(!$scope.static_fields.DDR_cell_No || !$scope.static_fields.DDR_cell_Name || !$scope.static_fields.Team_Name ) {
      PopUpService.showPopup('Alert','Please fill all the fields');
    }
    alert(JSON.stringify($scope.jsonObj));
  }
})


