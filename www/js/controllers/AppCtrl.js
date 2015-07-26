angular.module('starter.controllers.AppCtrl', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,$rootScope,PopUpService) {
  	
  	$scope.user={};
  
	$rootScope.goToHomeScreen = function() {
        $state.go('menu.home');
    };

  	$scope.submit=function() {
   		
  		if(!$scope.user.tpxid|| !$scope.user.empid) {
  			PopUpService.showPopup('Alert','Please enter TPXiD or EMPid');
  		}

  		else if($scope.user.tpxid=='vm17' && $scope.user.empid=='22906590') {
  			window.localStorage.setItem('username','sudarshan');
  			$rootScope.username=window.localStorage.getItem('username');
  			$state.go('menu.home');
  		}
  		else {
  			PopUpService.showPopup('Login Failed','TPXiD/EMPid not verified');
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

