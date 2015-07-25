angular.module('starter.controllers.PlaylistsCtrl', [])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Register', id: 1 },
    { title: 'Notifications', id: 2 },
    { title: 'Feedback', id: 3 }
  ];
})
