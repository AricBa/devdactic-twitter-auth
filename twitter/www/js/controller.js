/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.controllers',[])
.controller('homeCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth, $ionicSideMenuDelegate,Tweets) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    Tweets.showHomeTimeline().then(function(data){
      $scope.home_timeline = data;
    });

    $scope.tweet = {};

    $scope.submitTweet = function(message){
        Tweets.submitTweet(message);
    };
})
.controller('settingCtrl',function($scope){

})
.controller('LogoutCtrl',function($scope,$rootScope,$ionicActionSheet){
    $scope.tryLogin = function(){
        var destructiveText = 'Logout', cancelText = 'Cancel';
        $ionicActionSheet.show({
            destructiveText: destructiveText + ' <i class="icon ion-log-out">',
            cancelText: cancelText,
            cancel: function () {
                $scope.action = false;
            },

            destructiveButtonClicked: function () {
                $rootScope.myToken  = '';
            }
        });
    }

});
