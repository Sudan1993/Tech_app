angular.module('starter.services.popup', [])

.factory('PopUpService',function($q,$ionicPopup) {
	return {

		showPopup:function(title,template) {
			
			var alertPopup = $ionicPopup.alert ({
           		title: '<center>'+title+'</center>',
           		template: '<center>'+template+'</center>'
        	}); 
		}
	}
		
});


