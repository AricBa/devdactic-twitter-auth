/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.services',[])
.factory('Tweets',function($twitterApi){


    var Tweets = {
      // Load your home timeline
      showHomeTimeline : function() {
        return $twitterApi.getHomeTimeline();
      },

      // Post a tweet
      submitTweet : function(tweetMessage) {
        return $twitterApi.postStatusUpdate(tweetMessage).then(function(result) {
          this.showHomeTimeline();
        });
      },

      // Pull-to-refresh
      doRefresh : function() {
        return function() {
          this.showHomeTimeline();
          $scope.$broadcast('scroll.refreshComplete');
        }
      },

      // Display the correct date from Twitter response
      correctTimestring : function(string) {
        return new Date(Date.parse(string));
      }
    };

    return Tweets;
});