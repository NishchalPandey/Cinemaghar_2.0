var myDirectives = angular.module('cinemaghar_directives',['ionic'])
.directive('ratingDiv', function(){
  return {
    scope:{
      rating: '='
    },
    link: function($scope, tElement, tAttrs){
     $scope.$watch('rating',function(newValue, oldValue){
        if(newValue != ''){
          if( typeof($scope.rating) != "undefined"){
          var rating = $scope.rating;
          var numDin = rating.split("/");
          var finalRating = numDin[0]/numDin[1];
          rating = Math.ceil(finalRating * 5);

          var fullStar = '<i class="icon ion-ios-star"></i>';
          var outlineStar = '<i class="icon ion-ios-star-outline"></i>';
          var stars='';

          for ( var i = 0; i < 5; i++){
            if(i < rating){
              stars += fullStar;
            }else{
              stars += outlineStar;
            }
          }
          tElement.append(stars);
          }
        }
      })
    }
  }
})
.directive('youTube', function($window, $ionicLoading, ratingService, YouTubeLoader, $ionicPlatform){
  return{
    restrict: 'E',
    transclude: true,
    scope:
    {
      videoLink :"@",
      play: "=",
      spinner: "=",
      trailer:'@',
      movieName:'@',
      playPause:'=',
      description:'@'
    },
    template: '<div id="player"></div>',
    link: function(tScope, tElement, tAttrs){
      YouTubeLoader
      .load
      .then(function(success){
        $ionicLoading.show();
        tScope.$watch('videoLink', function(newValue,oldValue){

          if(typeof(newValue) !="undefined" && newValue != ''){
            console.log("playing success");
            var preValue = 0;

            var player = new YT.Player(tElement.children()[0], {
              height: '300',
              width: '100%',
              videoId: newValue,
              events: {
                'onReady': function(event){
                      console.log('youtube player ready');
                      tScope.$apply(function(){
                      tScope.spinner = false;
                      $ionicLoading.hide();
                    })
                  },
                'onStateChange': function(event){
                    console.log('code ' + event.data);
                        if (event.data == YT.PlayerState.PLAYING && !done && tScope.trailer != 'true') {
                        console.log("playing success");
                          tScope.$apply(function(){
                            tScope.play.value = true;

                          });
                        }
                        if(event.data == YT.PlayerState.UNSTARTED && preValue == YT.PlayerState.BUFFERING){
                           window.open('http://www.cinemagharhd.com/pages/player.php?videoId='+newValue + '&movieName='+tScope.movieName+'&description='+tScope.description,'_system');
                        }
                    preValue = event.data;
                }
              }
            });

            var done = false;

            var pauseVideo = function(player) {
              return function(){
            	  player.pauseVideo();
              }
            }
            $ionicPlatform.on("pause", pauseVideo(player));
            (function(player){
            tScope.$watch('playPause.pause', function(newVal){
              if(newVal == true){
                player.pauseVideo();
              }
            })})(player);
          }
        })

    },
    function(failure){
      console.log("Youtube api loading failed "+ failure);
    });
    }
  }
})
