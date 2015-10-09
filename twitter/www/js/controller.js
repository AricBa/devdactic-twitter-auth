/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.controllers',['base64'])
.controller('homeCtrl', function($scope, $ionicPlatform, $twitterApi, $cordovaOauth,
                                 $ionicSideMenuDelegate,Tweets,$rootScope,$cordovaCamera,$http) {
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $rootScope.$watch('action', function (data) {
        if (data !== true) {
            return
        }
        Tweets.showHomeTimeline(param).then(function(data){
            $scope.home_timeline = data;
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
          $scope.$broadcast('scroll.refreshComplete');
          $scope.tweet = {};
        });
    };

    $scope.submitTweet = function(message){
        Tweets.submitTweet(message).then(function(result){
            Tweets.showHomeTimeline(param).then(function(data){
                $scope.home_timeline = data;
                $scope.tweet = {};
            });
        });
    };

    var tweetParam = {
      media_ids : ''
    }

    var pageSize = 5 ;
    //var maxId = 648735763463475200

    var param = {
      "count" : pageSize
        //,
      //"max_id" : maxId
    };

    $scope.loadMoreData = function(){
      param.count = param.count + 5;
      Tweets.showHomeTimeline(param).then(function(data){
        $scope.home_timeline = {};
        Array.prototype.push.apply($scope.home_timeline,data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.makePhoto = function(){
      $cordovaCamera.getPicture({ quality: 100, targetWidth: 300, targetHeight: 300,allowEdit: true, destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM }).then(function (imageData) {
        var image = document.getElementById('myImage');

        image.src =  imageData;



        //$http.get(imageData).success(function(data){
        //  alert(imageData);
        //  alert(data);
        //  //var fileReader = new FileReader();
        //
        //  //alert(fileReader.readAsBinaryString(data));
        //
          var imageParam = {
              media_data:''
            };

          Tweets.postImage(imageParam).then(function(result){
              alert("ok");
              //$scope.media_id = result.media_id ;
              //alert($scope.media_id);
            },function(err){
              alert("error" + err);
            });
        //})
        //.error(function(err){
        //
        //})
      }, function (err) {
        //error
      });
    }

    //$scope.photo = {};
    //$scope.file_changed = function(element) {
    //
    //  $scope.$apply(function(scope) {
    //    var photofile = element.files[0];
    //    //var reader = new FileReader();
    //
    //    //reader.readAsDataURL(photofile);
    //    //reader.onload = function(e){
    //    //reader.readAsBinaryString(photofile);
    //
    //  var imageParam = {
    //    media_data: $scope.photo
    //  };
    //
    //  Tweets.postImage(imageParam).then(function(result){
    //    alert("ok");
    //    //$scope.media_id = result.media_id ;
    //    //alert($scope.media_id);
    //  },function(err){
    //    alert("error" + err);
    //  });
    //
    //  });
    //};

})
.controller('settingCtrl',function($scope){
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

})
.controller('filterPopoverCtrl',function($scope,$ionicPopover){


    $ionicPopover.fromTemplateUrl('templates/popover.html',{
      scope:$scope
    }).then(function(popover){
      $scope.popover = popover;
    });

    $scope.openPopover = function($event){
      $scope.popover.show($event);
    };
    $scope.closePopover = function(){
      $scope.popover.hide();
    };
    $scope.$on('$destroy',function(){
      if(typeof $scope.popover !== "undefined"){
        $scope.popover.remove();
      }
    });
    $scope.$on('popover.hide',function(){

    });
    $scope.$on('popover.removed',function(){

    });
  })
.controller('detailCtrl',function($scope,searchKey,Tweets,$cordovaSocialSharing){
        var param = {
            "count" : 1,
            "max_id" : searchKey.key
        };

        // Display the correct date from Twitter response
        $scope.correctTimestring = function(string) {
            return new Date(Date.parse(string));
        };

        Tweets.showHomeTimeline(param).then(function(data){
            $scope.tweet = data;
        });

        $scope.share = function(){
            $cordovaSocialSharing.share($scope.tweet[0].text).then(function(result){
                //alert("share success");
            },function(err){

            })
        };

    })
.controller('infoCtrl',function($scope,$state){
    var startApp = function(){
      $state.go('home');

      window.localStorage['didTutorial'] = true;
    };

    if(window.localStorage['didTutorial'] === "true") {
      console.log('Skip intro');
      startApp();
    }
    else{
      //setTimeout(function () {
      //  navigator.splashscreen.hide();
      //}, 750);
    }

    // Move to the next slide
    $scope.next = function() {
      $scope.$broadcast('slideBox.nextSlide');
    };

    // Our initial right buttons
    var rightButtons = [
      {
        content: 'Next',
        type: 'button-positive button-clear',
        tap: function(e) {
          // Go to the next slide on tap
          $scope.next();
        }
      }
    ];

    // Our initial left buttons
    var leftButtons = [
      {
        content: 'Skip',
        type: 'button-positive button-clear',
        tap: function(e) {
          // Start the app on tap
          startApp();
        }
      }
    ];

    // Bind the left and right buttons to the scope
    $scope.leftButtons = leftButtons;
    $scope.rightButtons = rightButtons;


    // Called each time the slide changes
    $scope.slideChanged = function(index) {

      // Check if we should update the left buttons
      if(index > 0) {
        // If this is not the first slide, give it a back button
        $scope.leftButtons = [
          {
            content: 'Back',
            type: 'button-positive button-clear',
            tap: function(e) {
              // Move to the previous slide
              $scope.$broadcast('slideBox.prevSlide');
            }
          }
        ];
      } else {
        // This is the first slide, use the default left buttons
        $scope.leftButtons = leftButtons;
      }

      // If this is the last slide, set the right button to
      // move to the app
      if(index == 2) {
        $scope.rightButtons = [
          {
            content: 'Start using MyApp',
            type: 'button-positive button-clear',
            tap: function(e) {
              startApp();
            }
          }
        ];
      } else {
        // Otherwise, use the default buttons
        $scope.rightButtons = rightButtons;
      }
    };
  });
