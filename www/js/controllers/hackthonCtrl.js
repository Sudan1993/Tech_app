angular.module('starter.controllers.hackthonCtrl', [])

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


