/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.services',[])
.factory('Tweets',function($twitterApi){


    var Tweets = {
      // Load your home timeline
      showHomeTimeline : function(param) {
        return $twitterApi.getHomeTimeline(param);
      },

      // Post a tweet
      submitTweet : function(tweetMessage) {
        return $twitterApi.postStatusUpdate(tweetMessage);
      },

      getUserTimeline : function(){
        return $twitterApi.getUserTimeline()
      }
    };

    return Tweets;
});