/**
 * Created by C5226508 on 9/21/2015.
 */
angular.module('starter.services',[])
.factory('Tweets',function($twitterApi,uploadMedia){


    var Tweets = {
      // Load your home timeline
      showHomeTimeline : function(param) {
        return $twitterApi.getHomeTimeline(param);
      },

      // Post a tweet
      submitTweet : function(tweetMessage,param) {
        return $twitterApi.postStatusUpdate(tweetMessage,param);
      },

      getUserTimeline : function(){
        return $twitterApi.getUserTimeline();
      },

      searchTweets : function(a,b){
          return $twitterApi.searchTweets(a,b);
      },

      postImage : function(param){
          return $twitterApi.postRequest(uploadMedia,param) ;
      }
    };

    return Tweets;
});
