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
              height: 'auto',
              width: '100%',
              videoId: newValue,
              playerVars: {
                     'autoplay': 0,
                     'modestbranding': 1,
                     'controls': 1,
                     'rel' : 0,
                     'showinfo':0
              },
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
.directive('tabMenu',[function(){
      return {
        restrict:'A',
        require: 'ngModel',
        scope: { modelValue: '=ngModel' },  // modelValue for $watch
        link:function(scope, element, attr, ngModel){

            // Links collection
            var links=element.find('a');

            // Add click listeners
            links.on('click',function(e){
                e.preventDefault();
                ngModel.$setViewValue( angular.element(this).attr('href') );
                scope.$apply();
            })

            // State handling (set active) on model change
            scope.$watch('modelValue',function(){
              for(var i=0,l=links.length;i<l;++i){
                var link = angular.element(links[i]);
                link.attr('href') === scope.modelValue ?
                link.addClass('active') : link.removeClass('active')
              }
            })
        }
      }
}])
/*.directive('',function(){
  return {
    scope:{
      "catagory ":"="
    },
    template: '<a class="col thumb" href="#/itemList/foreign">'+
      '<div class="thumbContant">'+
        '<div class="imagesThumb"> <img src="http://cinemagharhd.com/catagoryImages/{{catagoryBannerImages.Foreign}}" alt=""> </div>'+
        '<div class="titleThumb">Foreign <span class="arrow"><i class="icon ion-ios-arrow-forward"></i></span></div>'+
      '</div>'+
    '</a>',
    link: function(tScope, tElement, tAttrs){

    }
  }
})
  TODO: creating a directive for catagory cards in home page latest, comedy action
*/
