// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic','ionic-material','starter.controllers.AppCtrl','starter.controllers.AgendaCtrl','starter.controllers.hackthonCtrl','starter.controllers.PlaylistsCtrl','starter.services.popup','starter.services.httpService'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('menu.hack_register', {
    url: "/hackthon_register",
    views: {
      'menuContent':{
        templateUrl: "templates/hack_register.html",
         controller: 'hackthonCtrl'
       }
    }
  })

  .state('menu.hackathon', {
    url: "/hackathon",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/hackathon.html",
         controller: 'hackthonCtrl'
      }
    }
  })
 .state('menu.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
         controller: 'AppCtrl'
      }
    }
  })
  .state('menu.stalls', {
    url: "/stalls",
    views: {
      'menuContent': {
        templateUrl: "templates/stalls.html"
      }
    }
  })
    .state('menu.agenda', {
      url: "/agenda",
      views: {
        'menuContent': {
          templateUrl: "templates/agenda.html",
          controller: 'AgendaCtrl'
        }
      }
    })
    
  .state('menu.login', {
    url: "/login",
    views: {
    'menuContent' :{       
        templateUrl: "templates/login.html",
        controller: 'AppCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
});
