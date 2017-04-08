// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('templates',[]);

angular.module('starter', [
  'ionic',
  'starter.controllers',
  'cinemaghar_directives',
  'filterModule','templates'])

.run(function($ionicPlatform, $ionicHistory, $state, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
  });

  $ionicPlatform.registerBackButtonAction(function(e) {
	  if($state.is('player')){
		e.preventDefault();
		return false;
	  }else{
		$ionicHistory.goBack();
	  }
  }, 101);

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      //controller: 'AppCtrl'
    })
    .state('homePage', {
      url: '/homePage',
  	  templateUrl: 'templates/home.html',
  	  controller: 'AppCtrl'

    })
    .state('exclusiveItemList', {
      url: '/itemList/exclusive',
  	  templateUrl: 'templates/exclusive-list.html',
  	  controller: 'exclusiveItemListCtrl'
    })
    .state('itemList', {
      url: '/itemList/:catagory',
  	  templateUrl: 'templates/item-list.html',
  	  controller: 'itemListCtrl'
    })
    .state('exclusivePlayer', {
      url: '/player/exclusive/:movieId',
  	  templateUrl: 'templates/exclusivePlayer.html',
  	  controller : 'exclusivePlayerCtrl'
    })
    .state('player', {
      url: '/player/:movieId',
  	  templateUrl: 'templates/player.html',
  	  controller : 'playerCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/homePage');
});
