angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
  });
  
  // Form data for the login modal
  $scope.loginData = { };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //alert(JSON.stringify($scope.loginData.tpxid));
    $http.get('http://172.29.53.121:8181/EventRest/api/user/verify/'+$scope.loginData.tpxid+'/'+$scope.loginData.empid)
    .success(function(data, status, headers, config)
    {
      alert('success');
      alert(JSON.stringify(data));
    })
    .error(function(data,status,headers,config)
    {
      alert('error'+status);
      alert(JSON.stringify(data));
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
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

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
