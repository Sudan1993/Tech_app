angular.module('starter.controllers.AppCtrl', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,$rootScope,$timeout,ionicMaterialMotion,ionicMaterialInk,PopUpService,httpService) {
  	
  	$scope.user={};

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
  
	$rootScope.goToHomeScreen = function() {
        $state.go('menu.home');
    };
    $scope.user.tpxid="tz29";
    $scope.user.empid="22905904";
  	$scope.submit=function() {
   		
  		if(!$scope.user.tpxid|| !$scope.user.empid) {
  			PopUpService.showPopup('Alert','Please enter TPXiD or EMPid');
  		}

      else if($scope.user.tpxid!==null && $scope.user.empid!==null) {
        var appendWithUrl="EventRest/api/user/verify/" + $scope.user.tpxid + "/" + $scope.user.empid;
        httpService.getCall(appendWithUrl).then(function(respData){
          var data=respData.data[0];
          //alert(JSON.stringify(data[0].status));
          if(data.status==200) {
            PopUpService.showPopup('Alert','You have succesfully registered with the app');
            window.localStorage.setItem('username',data.name);
            $rootScope.username=data.name;
          }
          else if(data.status==201) {
            PopUpService.showPopup('Alert','You have already registered with the app');
            window.localStorage.setItem('username',data.name);
            $rootScope.username=data.name;
          }
          else if(data.status==400) {
            PopUpService.showPopup('Login Failed','TPXiD/EMPid not verified');
          }
          else {
            PopUpService.showPopup('Alert','Connectoin timed out');
          }
        })
      }
  		else {
  			//PopUpService.showPopup('Login Failed','TPXiD/EMPid not verified');
  		}

  	}

  	//on quit and relaunch fetch the username if already logged in
  	if(window.localStorage.getItem('username')!==null) {
  		$rootScope.username=window.localStorage.getItem('username');
  	}

  	$scope.cancel=function() {
  		$scope.user.tpxid="";
  		$scope.user.empid="";
  	}

})

