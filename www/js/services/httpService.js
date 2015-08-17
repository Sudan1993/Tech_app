angular.module('starter.services.httpService', [])

.factory('httpService',function($q,$http,$ionicLoading,$ionicPopup,$state) {
	return {

	postCall: function(appendWithUrl,jsonToSend)
  {
        var deferred=$q.defer();
        var self=this;
        var showAlert = function()
        {
          var alertPopup = $ionicPopup.alert
          ({
             title: "<center>Service Unavailable.</center>",
             template: "<center>Please check your internet connection</center>"
          });
        };
        self.checkConnection().then(function(networkState){
            if(networkState=='No network connection') {
              showAlert();
              // if(window.localStorage.getItem("username")===null)
              //   $state.go('login');
              // else
              //   $state.go('menu.homeScreen');
            }
            else {
              self.showIndicator();
              $http.defaults.headers.post["Content-Type"]="application/json";
              var res = $http.post('http://techday.ocsethsc.net:8181/'+ appendWithUrl,jsonToSend);  

              res.success(function(data, status, headers, config) {
                self.hideIndicator();
                deferred.resolve({"data":data,"status":status,"headers":headers});
              });

              res.error(function(data, status, headers, config) {
                self.hideIndicator();
                if(status===0 || data===null )
                  showAlert();
                else
                  deferred.resolve({"data":data,"status":status,"headers":headers});

              });
            }
        });
  return deferred.promise;
  },
	getCall: function(appendWithUrl)
	{
      var deferred=$q.defer();
      var self=this;
      var showAlert = function() {
        var alertPopup = $ionicPopup.alert
        ({
           title: "<center>Service Unavailable.</center>",
           template: "<center>Please check your internet connection</center>"
        });
      };
			
      self.checkConnection().then(function(networkState){
          if(networkState=='No network connection') {
            showAlert();
          }
          else {
	            self.showIndicator();
	            $http.defaults.headers.post["Content-Type"]="application/json";
	            var res = $http.get('http://techday.ocsethsc.net:8181/'+appendWithUrl);  

	            res.success(function(data, status, headers, config) {
	              self.hideIndicator();
	              deferred.resolve({"data":data,"status":status,"headers":headers});
	            });

	            res.error(function(data, status, headers, config) {
	              self.hideIndicator();
	              if(status===0 || data===null )
	                showAlert();
	              else
	                deferred.resolve({"data":data,"status":status,"headers":headers});
	            });
          	}
      });
			
			return deferred.promise;
		},
        checkConnection: function() {
         var deferred = $q.defer();
         var networkState = navigator.connection.type;
         var states = {};
         states[Connection.UNKNOWN]  = 'No network connection';
         states[Connection.ETHERNET] = 'Ethernet connection';
         states[Connection.WIFI]     = 'WiFi connection';
         states[Connection.CELL_2G]  = 'Cell 2G connection';
         states[Connection.CELL_3G]  = 'Cell 3G connection';
         states[Connection.CELL_4G]  = 'Cell 4G connection';
         states[Connection.CELL]     = 'Cell generic connection';
         states[Connection.NONE]     = 'No network connection';
         deferred.resolve(states[networkState]);
         return deferred.promise;
         },
        showIndicator:function() {
            $ionicLoading.show({
               template: '<ion-spinner icon="ios" ></ion-spinner>',
               animation: 'fade-in',
               showBackdrop: true,
               maxWidth: 400,
               showDelay: 0
			});

        },
        hideIndicator:function() {
            $ionicLoading.hide();
        }
	};
		
});


