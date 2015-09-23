// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['starter.controllers','starter.services','ionic', 'ngCordova', 'ngTwitter',])

  .run(function($ionicPlatform, $rootScope,twitterKey,$cordovaOauth,clientId,clientSecret,$twitterApi) {
    $ionicPlatform.ready(function() {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      $rootScope.myToken = '';
      $rootScope.action = false ;

      //$rootScope.myToken = JSON.parse(window.localStorage.getItem(twitterKey));
      if ($rootScope.myToken === '' || $rootScope.myToken === null) {
        $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
          $rootScope.myToken = succ;
          $twitterApi.configure(clientId, clientSecret, $rootScope.myToken);
          $rootScope.action = true;
        }, function(error) {
          console.log(error);
        });
      } else {
        $twitterApi.configure(clientId, clientSecret, $rootScope.myToken);
        $rootScope.action = true;
      }
    });
  })
    .run(function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.goBack = function () {
        // function to go back
        window.history.back();
      };

      $rootScope.$on('$stateChangeSuccess', function () {
        if ($state.$current === 'home' || $state.$current === 'setting') {
          $rootScope.showCustomBack = false;
        } else {
          $rootScope.showCustomBack = true;
        }
      });
    })
    .constant('twitterKey','STORAGE.TWITTER.KEY')
    .constant('clientId','2aG7aEmM2358Dac0dQMbZnptI')
    .constant('clientSecret','GdqNP5fR2FM17SOXUGRz69l1u4i2XYrgSfgsW5AvhPYGUFYCkr')
    .config(function($urlRouterProvider, $stateProvider){
      $stateProvider
          .state('home',{
            url:'/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          })
          .state('setting',{
            url: '/setting',
            templateUrl: 'templates/setting.html',
            controller: 'settingCtrl',
            resolve: {

            }
          });
      $urlRouterProvider.otherwise('/home');
    });

