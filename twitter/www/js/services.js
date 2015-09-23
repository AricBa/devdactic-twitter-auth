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
        return $twitterApi.postStatusUpdate(tweetMessage);
      }

    };

    return Tweets;
});