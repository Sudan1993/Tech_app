angular.module('starter.controllers.AppCtrl', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http,$state,$rootScope,$timeout,ionicMaterialMotion,ionicMaterialInk,PopUpService,httpService) {
  	
  	$scope.user={};

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    
    $timeout(function() {
        //$scope.$parent.hideHeader();
    }, 0);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    //$scope.$parent.clearFabs();
  
  
      $scope.slideHasChanged = function(index) {
        
          $scope.items.push("{name:'John', age:25, gender:'boy'}");
      }

$scope.items = [
  {image:'http://san.capitalafrique.com/imatin.net/articles/images/lionel-messi.jpg'},
  {image:'http://www.africatopsports.com/wp-content/uploads/2014/07/Sofiane-feghouli-team-teaser100_v-original-1024x576.jpg'},
  {image:'http://www.footmercato.net/images/a/feghouli-a-fait-mal-au-barca_123563.jpg'},
  {image:'http://img.fifa.com/mm/photo/tournament/competition/02/38/72/29/2387229_full-lnd.jpg'},
  {image:'http://www.parisfans.fr/wp-content/uploads/2015/05/Mercato-Le-PSG-voudrait-Xavi-pour-une-saison.jpg'}
 
];

  
	$rootScope.goToHomeScreen = function() {
        $state.go('menu.home');
    };
    //$scope.user.tpxid="tz29";
    //$scope.user.empid="22905904";
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
            window.localStorage.setItem('tpxid',$scope.user.tpxid);
            window.localStorage.setItem('ownerId',data.id);
            window.localStorage.setItem('username',data.name);
            $rootScope.username=data.name;
          }
          else if(data.status==201) {
            PopUpService.showPopup('Alert','You have already registered with the app');
            window.localStorage.setItem('tpxid',$scope.user.tpxid);
            window.localStorage.setItem('ownerId',data.id);
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

    $scope.CallTel = function(tel) {
            window.location.href = 'tel:'+ tel;
        }

})

