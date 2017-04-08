angular.module('starter.controllers',
    ['cinemagharhdServices',
    'facebookModule',
    'ratingModule',
    'pushNotificationModule',
    'vimeoEmbed'
    ])
  .controller('AppCtrl', function($ionicSlideBoxDelegate, $ionicLoading, $injector, $ionicPopup, $ionicPlatform, $scope, $ionicModal, $timeout, $location, movieFactory, ratingService, facebookServices, pushNotificationService) {
    $scope.$on('$ionicView.enter', function(e) {
     $ionicSlideBoxDelegate.start();
    })

    $ionicLoading.show();

    $scope.$on('loadingDone', function(){
      $ionicLoading.hide();
    })

    $scope.loading = true;
    movieFactory.getAllMovies()
      .then(function(success){
        $scope.allMovies = success.data;
        console.log("all movies movies fetched in AppCtrl");
      },function(error){
        console.log(error);
    });

    $scope.slideHasChanged = function($index){
      if ($index + 1 == $ionicSlideBoxDelegate.slidesCount()){
        $timeout(function(){
          $ionicSlideBoxDelegate.slide(0);
        }, 3000)
      }
    }

    movieFactory.getSliderImages()
    .then(function (success){
       $scope.sliderImages = success.data;
       $timeout(function(){
        $scope.loading = false;
        $scope.$broadcast('loadingDone');
        $ionicSlideBoxDelegate.update();
      }, 1000);
     }, function(failure){
        console.log('fetching slider images failed ' + failure);
      });

    movieFactory.getCatagoryImages()
      .then(function(success){
        console.log(success.data);
        $scope.catagoryBannerImages = success.data;
      }, function(failure){
        console.log(failure);
      })

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $ionicModal.fromTemplateUrl('templates/searchModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.searchModal = modal;
    });

    $scope.createContact = function(u) {
      $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      $scope.searchModal.hide();
    };

    $scope.showDisclaimerModal = function (){
      $ionicPopup.show({
        title:'Disclaimer',
        templateUrl: 'templates/disclaimerModal.html',
        buttons:[{
          text:'ok'
        }]
      });
    };

    /*, {
      scope: $scope
    }).then(function(modal){
      $scope.disclaimerModal = modal;
    })*/

    $scope.data=["JavaScript","Java","Ruby","Python"];

    $scope.latestItem = function(catagory){
  	  $location.path('/itemList/'+catagory);
    };

  	$scope.ui = {};
  	$scope.ui.tabview = 'templates/tab-movie.html';
  })
  .controller('itemListCtrl', function($scope, $ionicLoading, $ionicPlatform, $stateParams,$location, movieFactory){
        var catagory = $stateParams.catagory;
        $ionicLoading.show();

        $scope.catagory = $stateParams.catagory;
        $scope.loading = true;
          var movies = movieFactory.getCachedMovies.array;
          $scope.allMovies = [];
          for(i = 0; i < movies.length; i++){
            var catagories = movies[i].catagory.split(',');
            for(j = 0; j < catagories.length; j ++){
              if(catagories[j] == catagory){
                $scope.allMovies.push(movies[i]);
              }
            }
             $scope.loading = false;
             $ionicLoading.hide();
          }

        $scope.homePage = function() {
          $location.path('/homePage');
        };
    })
  .controller('exclusiveItemListCtrl', function($scope, $ionicLoading, $ionicPlatform, $stateParams,$location, movieFactory){
      console.log("This is exclusive item ctlr");
        var catagory = "exclusive";
        $ionicLoading.show();
        $scope.allMovies = [];
        $scope.catagory = $stateParams.catagory;
        $scope.loading = true;
          var movies = movieFactory.getExclusiveMovies()
                          .then(function(success){
                            $scope.allMovies = success.data;
                            $scope.loading = false;
                            $ionicLoading.hide();
                          },function(){
                            console.log('error fetching exclusive movies');
                          })

          /*for(i = 0; i < movies.length; i++){
            var catagories = movies[i].catagory.split(',');
            for(j = 0; j < catagories.length; j ++){
              if(catagories[j] == catagory){
                $scope.allMovies.push(movies[i]);
              }
            }
             $scope.loading = false;
             $ionicLoading.hide();
          }*/

        $scope.homePage = function() {
          $location.path('/homePage');
        };
    })
  .controller('playerCtrl',function($scope, $ionicLoading, $ionicModal, $stateParams, movieFactory, ratingService, $sce, $ionicHistory, $ionicPopup){
      console.log('inPlayerCtrl');
        $scope.loading = true;
        $ionicLoading.show();
        $scope.myGoBack = function(play, movie) {
          if(play.value == true){
              console.log("backbutton tapped");
              ratingService.ratingDiag.show($scope, movie).then(function(success){
                $ionicHistory.goBack();
              }, function(error){
                $ionicHistory.goBack();
              });
            }else{
            //if the rating has not been done this triggers without
            //ratingDiag being shown
            $ionicHistory.goBack();
          }
        };

        $scope.playerExclusiveMovie = function(){
          console.log($scope.movie.embeddedLink);
          YoutubeVideoPlayer.openVideo($scope.movie.embeddedLink);
        }

        $scope.play = {};

        $scope.trailer  = function(){
          $scope.moviePlayer = {pause:true};
            $ionicModal.fromTemplateUrl('templates/youtubeModal.html',{
            scope : $scope
          }).then(function(modal){
            $scope.playVideo = {pause:false};
            modal.show();

            $scope.$on('modal.hidden', function(){
              // Execute action
              if(typeof player.pauseVideo != undefined){
                $scope.playVideo.pause = true
              }
            });


            $scope.closeButtonClicked = function(e){
              e.preventDefault();
              modal.hide();
            }
        })
      }

        movieFactory.getAllMovies()
          .then(function(success){
            var movies = success.data;
            var id = $stateParams.movieId;
            for(i=0;i<movies.length; i++){
              if (movies[i].id == id){
                var originalLink = movies[i].video_link;
                movies[i].video_link = $sce.trustAsResourceUrl(movies[i].video_link);
                movies[i].trailer_link = $sce.trustAsResourceUrl(movies[i].trailer_link);
                $scope.movie = movies[i];
                $scope.movie.embeddedLink = originalLink;
                $ionicLoading.hide();
              }
            }
          },function(error){
            console.log(error);
        });
  })
  .controller('exclusivePlayerCtrl',function($scope, $ionicLoading, $ionicModal, $stateParams, movieFactory, ratingService, $sce, $ionicHistory, $ionicPopup){
  /**
    This controller is associated to the exclusive movie player page as of 2017:03
    Uses Vimeo player api https://github.com/vincenzomerolla/angular-vimeo-embed/blob/master/src/angular-vimeo-embed.js
  */
        $scope.loading = true;
        $ionicLoading.show();
        $scope.myGoBack = function(movie) {
          console.log("backbutton tapped");
          ratingService.ratingDiag.show($scope, movie).then(function(success){
            $ionicHistory.goBack();
          }, function(error){
            $ionicHistory.goBack();
          });

        };

        /*$scope.playExclusiveMovie = function(){
          console.log($scope.movie.embeddedLink);
          YoutubeVideoPlayer.openVideo($scope.movie.embeddedLink);

        }*/

        $scope.play = {};

        $scope.trailer  = function(){
          $scope.moviePlayer = {pause:true};
            $ionicModal.fromTemplateUrl('templates/youtubeModal.html',{
            scope : $scope
          }).then(function(modal){
            $scope.playVideo = {pause:false};
            modal.show();

            $scope.$on('modal.hidden', function(){
              // Execute action
              if(typeof player.pauseVideo != undefined){
                $scope.playVideo.pause = true
              }
            });


            $scope.closeButtonClicked = function(e){
              e.preventDefault();
              modal.hide();
            };
        })
      }

        movieFactory.getExclusiveMovies()
          .then(function(success){
            var movies = success.data;
            var id = $stateParams.movieId;
            for(i=0;i<movies.length; i++){
              if (movies[i].id == id){
                var originalLink = movies[i].video_link;
                movies[i].video_link = $sce.trustAsResourceUrl(movies[i].video_link);
                movies[i].trailer_link = $sce.trustAsResourceUrl(movies[i].trailer_link);
                $scope.movie = movies[i];
                $scope.movie.embeddedLink = originalLink;
                $ionicLoading.hide();
              }
            }
          },function(error){
            console.log(error);
        });
      })
