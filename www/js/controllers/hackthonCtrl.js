angular.module('starter.controllers.hackthonCtrl', [])

.controller('hackthonCtrl',function($scope,$state,PopUpService,ionicMaterialInk,ionicMaterialMotion,$timeout){

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);
  
    // $scope.registered=null; // Use this to toggle between Register/Details form
    // $scope.hackTeam=[];

  // if(window.localStorage.getItem('username')===null) {
  //   PopUpService.showPopup('Alert','Please login yourself');
  //   $state.go('menu.login');
  // }
   // else
   // {
   //  $scope.hackCall();
   // }
   //$scope.edit=null;
   //$scope.owner=null;
   $scope.enableEdit=function(){
    $scope.edit=true;
   }
  $scope.hackCall=function(){
   
          var appendWithUrl="EventRest/api/hackathon/verify/" + window.localStorage.getItem('username') ;
          httpService.getCall(appendWithUrl).then(function(respData){
          var data=respData.data[0];
          // if(owner)
          //   $scope.owner=true;
          // else
          //   $scope.owner=false;
          if(data.status==200) {
                $scope.registered=true;
                $scope.hackTeam=data;
          }
          else if(data.status==201) {
                $scope.registered=false;
          }
          else {
            PopUpService.showPopup('Alert','Connectoin timed out');
          }
        }) 
 

  };
 
// $scope.registered=true;
 $scope.hackTeam={
    "cellName": "Finance IT",
    "cellNo": 25,
    "teamName": "MassHack",
    "size": 3,
    "teamId": 26,
    "ownerId": 5844,
    "status": 200,
    "members": [
        {
            "tpxid": "tz29",
            "empId": 22905904,
            "mobile": 9986157779
        },
        {
            "tpxid": "wx83",
            "empId": 22905900,
            "mobile": 9986155679
        },
        {
            "tpxid": "wc87",
            "empId": 22907141,
            "mobile": 9986155676
        }
    ]
};

  if($scope.registered==true)
    $scope.title="Team Details";
  else
    $scope.title="Register";


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


