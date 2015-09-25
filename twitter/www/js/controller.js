/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.controllers',[])
.controller('homeCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth, $ionicSideMenuDelegate,Tweets,$rootScope) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $rootScope.$watch('action', function (data) {
        if (data !== true) {
            return
        }
        Tweets.showHomeTimeline(param).then(function(data){
            $scope.home_timeline = data;
            alert(data.length);
        });
        Tweets.getUserTimeline().then(function(data){
          $rootScope.user = data;
        });
    });

    $scope.tweet = {};


    // Display the correct date from Twitter response
    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    }

    $scope.doRefresh = function(){
        Tweets.showHomeTimeline(param).then(function(data){
            $scope.home_timeline = data;
        });
        $scope.$broadcast('scroll.refreshComplete');
        $scope.tweet = {};
    };

    $scope.submitTweet = function(message){
        Tweets.submitTweet(message).then(function(result){
            Tweets.showHomeTimeline(param).then(function(data){
                $scope.home_timeline = data;
                $scope.tweet = {};
            });
        });
    };

    var pageSize = 15 ;

    var param = {
      "count" : pageSize
    }

    $scope.loadMore = function(){
      param.count = param.count + 15;
      $scope.doRefresh;
    };

    $scope.isMoreData = function(){

    };
})
.controller('settingCtrl',function($scope,$rootScope){
        $scope.loadImage = {text:"Load image only wifi", checked:true};
    })
.controller('LogoutCtrl',function($scope,$rootScope,$ionicActionSheet,$cordovaOauth,clientId, clientSecret,twitterKey,$twitterApi){
        $rootScope.$watch('action',function(data){
            if(data === false ){
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
                };
            }
        });

    $scope.tryLogout = function(){
        var destructiveText = 'Logout', cancelText = 'Cancel';
        $ionicActionSheet.show({
            destructiveText: destructiveText + ' <i class="icon ion-log-out">',
            cancelText: cancelText,
            cancel: function () {
                $rootScope.action = true;
            },

            destructiveButtonClicked: function () {
                $rootScope.myToken  = '';
                $rootScope.action = false;
            }
        });
    }

});
