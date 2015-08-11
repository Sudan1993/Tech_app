angular.module('starter.controllers.MapCntrl', [])


.controller('MapCntrl', function($scope, $stateParams) {

 $scope.initialize=function(){
	var myLatlng = new google.maps.LatLng(12.974083, 77.728397);
   var mapOptions = {
     zoom: 16,
    center: myLatlng
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Tesco HSC'
  });
};
google.maps.event.addDomListener(window, 'load', $scope.initialize());
});
