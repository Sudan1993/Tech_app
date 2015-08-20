angular.module('starter.controllers.hackthonCtrl', [])

.controller('hackthonCtrl',function($scope,$state,PopUpService,ionicMaterialInk,ionicMaterialMotion,$timeout,httpService,$rootScope,$ionicPopup){

  $timeout(function(){
    ionicMaterialInk.displayEffect();
      ionicMaterialMotion.ripple();
  },0);

  if(window.localStorage.getItem('username')===null) {
    PopUpService.showPopup('Alert','Please login yourself');
    $state.go('menu.login');
  }
  $scope.enableEdit="";
  $scope.goToHackPage = function() {
    httpService.getCall('EventRest/api/hackathon/verify/' + window.localStorage.getItem('tpxid')).then(function(respData){

      if(respData.data.status == 201) {
        $rootScope.new_user = true;
        $rootScope.canEdit = false;
        $rootScope.title = 'Register';
        $state.go('menu.hack_register');
      }

      else if(respData.data.status === 200) {
        //display the details came from the response and check for the owner condition
        $rootScope.new_user = false;
        $rootScope.title = 'Team Details';

        if(respData.data.ownerId == window.localStorage.getItem('ownerId')) {
          $rootScope.canEdit = true;
          $scope.enableEdit = false;
        }
        else {
          $rootScope.canEdit = false;
        }
        $rootScope.hackTeam = respData.data;
      //  $scope.person_count={value:$rootScope.hackTeam.size};
      //  $scope.person_count.value=$rootScope.hackTeam.size;
        $state.go('menu.hack_register');
      }

      else {

      }
    });
  }

  var empty_check = function(checkJson){
    var flag=true;
   angular.forEach(checkJson, function(member) {

            if (!member.tpxid || !member.empId || !member.mobile) {
              flag=false;
            }

            });
   return flag;
  };

  $scope.edit_submit = function() {

    var appendWithUrl = "EventRest/api/hackathon/update";
    //alert(JSON.stringify($scope.hackTeam));
   // $scope.hackTeam.size=$scope.person_count.value;
   if(empty_check($scope.hackTeam.members)==true)
   {
    httpService.postCall( appendWithUrl , $scope.hackTeam ).then(function(respData){
      if(respData.data.status == 200) {
        PopUpService.showPopup('Alert' , 'Updated successfully');
      }
      else if(respData.data.status == 400) {
        PopUpService.showPopup('Login Failed','TPXiD already registered');
      }
      else if(respData.data.status == 401) {
        PopUpService.showPopup('Login Failed','TPXiD is incorrect');
      }
      else {
        PopUpService.showPopup('Alert','Connection timed out');
      } 
                  $scope.enableEdit = false;
   
    }) 
  }
  else
  {
    PopUpService.showPopup('Alert','Please fill all the fields');
  }
  };

  $scope.enableEditFunc = function() {
    $scope.enableEdit = true;
  };  

  $scope.static_fields = {};
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
    },
    {
      display: "5",
      value: "5"
    }
  ];

  //By default select one
  // alert($scope.enableEdit);
  // if($scope.enableEdit!=true)
  $scope.person_count={ value:"1" };
  
  //watching person count variable
  $scope.$watch("person_count.value", function(newValue ,oldValue) {
      $scope.dynamicJSON(newValue);
  });
  $scope.dynamicJSON=function(value) {
      $scope.jsonObj=[];
      item = {};
      
      item ["tpxid"] = "";
      item ["empId"] = "";
      item ["mobile"] = "";

       //creating json dynamically 
      for(i=0; i< value ;i++) {
        $scope.jsonObj.push(angular.copy(item));
      }
  };

  $scope.register_submit=function() {
    if(!$scope.static_fields.Team_Name || empty_check($scope.jsonObj)==false) {
      PopUpService.showPopup('Alert','Please fill all the fields');
    }
    else {
      
      var appendWithUrl = "EventRest/api/hackathon/save";
      var jsonToSend = {};

     // jsonToSend ["cellName"] = $scope.static_fields.DDR_cell_Name;
      jsonToSend ["cellName"] = "Dummy";

      //jsonToSend ["cellNo"] = $scope.static_fields.DDR_cell_No;
      jsonToSend ["cellNo"] = "123";
      
      jsonToSend ["teamName"] = $scope.static_fields.Team_Name;
      jsonToSend ["size"] = $scope.jsonObj.length;
      jsonToSend ["ownerId"] = window.localStorage.getItem("ownerId");
      jsonToSend ["members"] = $scope.jsonObj;

      //alert(JSON.stringify(jsonToSend));

        httpService.postCall(appendWithUrl , jsonToSend).then(function(respData) {
          var data=respData.data;
          if(data.status == 200) {
            PopUpService.showPopup('Alert','You team has been successfully registered for Hackathon');
            $rootScope.goToHomeScreen();
          }
          else if(data.status == 400) {
            PopUpService.showPopup('Login Failed','TPXiD already registered');
          }
          else if(data.status == 401) {
            PopUpService.showPopup('Login Failed','TPXiD is incorrect');
          }
          else {
            PopUpService.showPopup('Alert','Connection timed out');
          }
        })
    }
  }
  $scope.cancel_click=function(index){
        $scope.hackTeam.members.splice(index, 1);
              $scope.hackTeam.size -= 1;

  }
  $scope.add_click=function(){

    if($scope.hackTeam.size<5)
    {
      item = {};
      
      item ["tpxid"] = "";
      item ["empId"] = "";
      item ["mobile"] = "";

       //creating json dynamically 
      $scope.hackTeam.members.push(angular.copy(item));
      $scope.hackTeam.size += 1;
      }    
    else
    {
      PopUpService.showPopup('Alert','Team size exceeded');
    }

  };
  $scope.delete_click = function() {
    var appendWithUrl = 'EventRest/api/hackathon/delete/' + $rootScope.hackTeam.teamId ;
    var deletePopup = $ionicPopup.confirm({
                title: "<b>Delete</b>",
                template: "<center> Are you sure you want to delete the entire Team? </center>"
            });
        deletePopup.then(function(res) {
            if(res) {
              // alert(appendWithUrl);
              httpService.getCall(appendWithUrl).then(function(respData) {
                var data=respData.data;
                // alert(JSON.stringify(data));
                if(data.status == 200) {
                  $scope.enableEdit = false;
                  PopUpService.showPopup('Alert','You team has been successfully deleted');
                  $rootScope.goToHomeScreen();
                }
                // else if(data.status == 400) {
                //   PopUpService.showPopup('Login Failed','TPXiD already registered');
                // }
                else if(data.status == 401) {
                  PopUpService.showPopup('Deletion Failed','TPXiD is incorrect');
                }
                else {
                  PopUpService.showPopup('Alert','Connectoin timed out');
                }
              })
                
            }
        });
  }
})


