function SimplePubSub(){var e={};return{on:function(t,o){return t.split(" ").forEach(function(t){e[t]||(e[t]=[]),e[t].push(o)}),this},trigger:function(t,o){return angular.forEach(e[t],function(e){e.call(null,o)}),this}}}angular.module("templates",[]),angular.module("starter",["ionic","starter.controllers","cinemaghar_directives","filterModule","templates"]).run(function(e,t,o,n){e.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.disableScroll(!0),window.StatusBar&&StatusBar.styleDefault(),window.Connection&&navigator.connection.type==Connection.NONE&&n.confirm({title:"No Internet Connection",content:"Sorry, no Internet connectivity detected. Please reconnect and try again."}).then(function(e){e&&ionic.Platform.exitApp()})}),e.registerBackButtonAction(function(e){return o.is("player")?(e.preventDefault(),!1):void t.goBack()},101)}).config(function(e,t){e.state("app",{url:"/app",abstract:!0,templateUrl:"templates/menu.html"}).state("homePage",{url:"/homePage",templateUrl:"templates/home.html",controller:"AppCtrl"}).state("exclusiveItemList",{url:"/itemList/exclusive",templateUrl:"templates/exclusive-list.html",controller:"exclusiveItemListCtrl"}).state("itemList",{url:"/itemList/:catagory",templateUrl:"templates/item-list.html",controller:"itemListCtrl"}).state("exclusivePlayer",{url:"/player/exclusive/:movieId",templateUrl:"templates/exclusivePlayer.html",controller:"exclusivePlayerCtrl"}).state("player",{url:"/player/:movieId",templateUrl:"templates/player.html",controller:"playerCtrl"}),t.otherwise("/homePage")}),angular.module("starter.controllers",["cinemagharhdServices","facebookModule","ratingModule","pushNotificationModule"]).controller("AppCtrl",function(e,t,o,n,i,a,l,r,c,s,u,d,g){a.$on("$ionicView.enter",function(t){e.start()}),t.show(),a.$on("loadingDone",function(){t.hide()}),a.loading=!0,s.getAllMovies().then(function(e){a.allMovies=e.data,console.log("all movies movies fetched in AppCtrl")},function(e){console.log(e)}),a.slideHasChanged=function(t){t+1==e.slidesCount()&&r(function(){e.slide(0)},3e3)},s.getSliderImages().then(function(t){a.sliderImages=t.data,r(function(){a.loading=!1,a.$broadcast("loadingDone"),e.update()},1e3)},function(e){console.log("fetching slider images failed "+e)}),s.getCatagoryImages().then(function(e){console.log(e.data),a.catagoryBannerImages=e.data},function(e){console.log(e)}),a.toggleLeft=function(){$ionicSideMenuDelegate.toggleLeft()},l.fromTemplateUrl("templates/searchModal.html",{scope:a}).then(function(e){a.searchModal=e}),a.createContact=function(e){a.contacts.push({name:e.firstName+" "+e.lastName}),a.searchModal.hide()},a.showDisclaimerModal=function(){n.show({title:"Disclaimer",templateUrl:"templates/disclaimerModal.html",buttons:[{text:"ok"}]})},a.data=["JavaScript","Java","Ruby","Python"],a.latestItem=function(e){c.path("/itemList/"+e)},a.ui={},a.ui.tabview="templates/tab-movie.html"}).controller("itemListCtrl",function(e,t,o,n,a,l){var r=n.catagory;t.show(),e.catagory=n.catagory,e.loading=!0;var c=l.getCachedMovies.array;for(e.allMovies=[],i=0;i<c.length;i++){var s=c[i].catagory.split(",");for(j=0;j<s.length;j++)s[j]==r&&e.allMovies.push(c[i]);e.loading=!1,t.hide()}e.homePage=function(){a.path("/homePage")}}).controller("exclusiveItemListCtrl",function(e,t,o,n,i,a){console.log("This is exclusive item ctlr");t.show(),e.allMovies=[],e.catagory=n.catagory,e.loading=!0;a.getExclusiveMovies().then(function(o){e.allMovies=o.data,e.loading=!1,t.hide()},function(){console.log("error fetching exclusive movies")});e.homePage=function(){i.path("/homePage")}}).controller("playerCtrl",function(e,t,o,n,a,l,r,c,s){console.log("inPlayerCtrl"),e.loading=!0,t.show(),e.myGoBack=function(t,o){1==t.value?(console.log("backbutton tapped"),l.ratingDiag.show(e,o).then(function(e){c.goBack()},function(e){c.goBack()})):c.goBack()},e.playerExclusiveMovie=function(){console.log(e.movie.embeddedLink),YoutubeVideoPlayer.openVideo(e.movie.embeddedLink)},e.play={},e.trailer=function(){e.moviePlayer={pause:!0},o.fromTemplateUrl("templates/youtubeModal.html",{scope:e}).then(function(t){e.playVideo={pause:!1},t.show(),e.$on("modal.hidden",function(){void 0!=typeof player.pauseVideo&&(e.playVideo.pause=!0)}),e.closeButtonClicked=function(e){e.preventDefault(),t.hide()}})},a.getAllMovies().then(function(o){var a=o.data,l=n.movieId;for(i=0;i<a.length;i++)if(a[i].id==l){var c=a[i].video_link;a[i].video_link=r.trustAsResourceUrl(a[i].video_link),a[i].trailer_link=r.trustAsResourceUrl(a[i].trailer_link),e.movie=a[i],e.movie.embeddedLink=c,t.hide()}},function(e){console.log(e)})}).controller("exclusivePlayerCtrl",function(e,t,o,n,a,l,r,c,s){console.log("here we are"),e.loading=!0,t.show(),e.myGoBack=function(t){console.log("backbutton tapped"),l.ratingDiag.show(e,t).then(function(e){c.goBack()},function(e){c.goBack()})},e.playerExclusiveMovie=function(){console.log(e.movie.embeddedLink),YoutubeVideoPlayer.openVideo(e.movie.embeddedLink)},e.play={},e.trailer=function(){e.moviePlayer={pause:!0},o.fromTemplateUrl("templates/youtubeModal.html",{scope:e}).then(function(t){e.playVideo={pause:!1},t.show(),e.$on("modal.hidden",function(){void 0!=typeof player.pauseVideo&&(e.playVideo.pause=!0)}),e.closeButtonClicked=function(e){e.preventDefault(),t.hide()}})},a.getExclusiveMovies().then(function(o){var a=o.data,l=n.movieId;for(i=0;i<a.length;i++)if(a[i].id==l){var c=a[i].video_link;a[i].video_link=r.trustAsResourceUrl(a[i].video_link),a[i].trailer_link=r.trustAsResourceUrl(a[i].trailer_link),e.movie=a[i],e.movie.embeddedLink=c,t.hide()}},function(e){console.log(e)})});var myDirectives=angular.module("cinemaghar_directives",["ionic"]).directive("ratingDiv",function(){return{scope:{rating:"="},link:function(e,t,o){e.$watch("rating",function(o,n){if(""!=o&&"undefined"!=typeof e.rating){var i=e.rating,a=i.split("/"),l=a[0]/a[1];i=Math.ceil(5*l);for(var r='<i class="icon ion-ios-star"></i>',c='<i class="icon ion-ios-star-outline"></i>',s="",u=0;u<5;u++)s+=u<i?r:c;t.append(s)}})}}}).directive("youTube",function(e,t,o,n,i){return{restrict:"E",transclude:!0,scope:{videoLink:"@",play:"=",spinner:"=",trailer:"@",movieName:"@",playPause:"=",description:"@"},template:'<div id="player"></div>',link:function(e,o,a){n.load.then(function(n){t.show(),e.$watch("videoLink",function(n,a){if("undefined"!=typeof n&&""!=n){console.log("playing success");var l=0,r=new YT.Player(o.children()[0],{height:"auto",width:"100%",videoId:n,playerVars:{autoplay:0,modestbranding:1,controls:1,rel:0,showinfo:0},events:{onReady:function(o){console.log("youtube player ready"),e.$apply(function(){e.spinner=!1,t.hide()})},onStateChange:function(t){console.log("code "+t.data),t.data!=YT.PlayerState.PLAYING||c||"true"==e.trailer||(console.log("playing success"),e.$apply(function(){e.play.value=!0})),t.data==YT.PlayerState.UNSTARTED&&l==YT.PlayerState.BUFFERING&&window.open("http://www.cinemagharhd.com/pages/player.php?videoId="+n+"&movieName="+e.movieName+"&description="+e.description,"_system"),l=t.data}}}),c=!1,s=function(e){return function(){e.pauseVideo()}};i.on("pause",s(r)),function(t){e.$watch("playPause.pause",function(e){1==e&&t.pauseVideo()})}(r)}})},function(e){console.log("Youtube api loading failed "+e)})}}}).directive("tabMenu",[function(){return{restrict:"A",require:"ngModel",scope:{modelValue:"=ngModel"},link:function(e,t,o,n){var i=t.find("a");i.on("click",function(t){t.preventDefault(),n.$setViewValue(angular.element(this).attr("href")),e.$apply()}),e.$watch("modelValue",function(){for(var t=0,o=i.length;t<o;++t){var n=angular.element(i[t]);n.attr("href")===e.modelValue?n.addClass("active"):n.removeClass("active")}})}}}]),facebook=angular.module("facebookModule",[]);facebook.factory("facebookServices",function(e,t,o,n,i){return facebookLoginDialog=function(){popUp=e.show({title:"<p>Connect with Facebook  for  better<br> viewing experience</p>",template:'<i class=" alert-close-icon button button-icon ion-close-circled" onclick="popUp.close();"></i><img class="button button-bar button-clear" onclick="login();" id="facebook-connect-button" src="img/facebook-connect-button.png">'})},simpleAlert=function(t){var o=e.show({title:t});setTimeout(function(){o.close()},2e3)},apiRequestWallPost=function(){return console.log("APIREQUESTWALL :"+window.localStorage.getItem("postPermission")),null==window.localStorage.getItem("postPermission")&&facebookConnectPlugin.api("me/?fields=id,first_name,last_name",["publish_actions"],function(e){console.log("POST PERMISSION SET "+JSON.stringify(e)),window.localStorage.setItem("postPermission","set")},function(e){console.log("error occured")}),window.localStorage.setItem("postPermission","set"),!1},apiGetPublicProfile=function(){facebookConnectPlugin.api("me/?fields=id,email,first_name,last_name",["public_profile"],function(e){console.log("API GET PUBLIC PROFILE "+JSON.stringify(e)),apiRequestWallPost(),simpleAlert("<h4 style='text-align:center'>Welcome back <br>"+e.first_name+"!</h4>")},function(e){console.log("ERROR in apiGetPublicProfile"),simpleAlert("something went wrong")})},login=function(){return facebookConnectPlugin.login(["email"],function(e){apiGetPublicProfile()}),popUp.close(),!0},getStatus=function(){facebookConnectPlugin.getLoginStatus(function(e){console.log("GET STATUS RES :"+JSON.stringify(e)),"unknown"==e.status?(t.localStorage.removeItem("postPermission"),facebookLoginDialog()):apiGetPublicProfile()},function(e){t.localStorage.removeItem("postPermission"),facebookLoginDialog()})},sendUserInfoToDb=function(e){var t=$.param({userInfo:e});i({url:"http://cinemagharhd.com/php/user_validation.php",data:t,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}})},postToFacebook=function(e,t,o){facebookConnectPlugin.getAccessToken(function(n){i({url:"http://cinemagharhd.com/php/post_to_facebook_v2.php",method:"GET",params:{access_token:n,rating:t,movieName:e,banner_link:o}}).then(function(e){console.log("success : "+JSON.stringify(e))},function(e){console.log("error : "+JSON.stringify(e))})},function(e){simpleAlert("Unable to Post rating. User is not logged in!")})},document.addEventListener("deviceready",function(){getStatus(),console.debug("device is ready now")},!1),{postToFb:postToFacebook}});var textFilterModule=angular.module("filterModule",[]).filter("capitalizeFirstLetter",function(){return function(e){var t="";if(void 0!=e){var o=e.split(" ");o.forEach(function(e){t=t+e[0].toUpperCase()+e.substring(1)+" "})}return t}}),ratingModule=angular.module("ratingModule",[]);ratingModule.service("ratingService",function(e,t,o,n){this.ratingDiag={show:function(i,a){var l=n.defer();return i.rating={},i.rating.value=0,e.fromTemplateUrl("templates/ratingModal.html",{scope:i}).then(function(e){i.ratingModal=e,i.ratingModal.show(),i.ratingDone=function(){e=3;var e=i.rating.value,n=a.name,r=a.banner_name;t.postToFb(n,e,r),o.sendRatingToDb(e,n),i.rating.done=!0,i.ratingModal.remove(),l.resolve(e)},i.closeButtonClicked=function(e){i.ratingModal.remove(),l.resolve()}}),l.promise}}}),ratingModule.directive("ratingSelectionStars",function(){return{restrict:"E",scope:{rating:"="},compile:function(e,t){var o=function(e){var t=angular.element("<img>");return t.attr({src:"img/ratingStars/outline-star-xxl.png",index:e}).css("width","40px"),t};for(i=1;i<=5;i++)e.append(o(i));return function(e,t,o){t.on("click",function(o){o.preventDefault();var n=angular.element(o.target).attr("index"),a=t.children();for(i=0;i<5;i++)i<n?a[i].src="img/ratingStars/Star-Full-icon.png":a[i].src="img/ratingStars/outline-star-xxl.png";e.$apply(function(){e.rating=n})})}}}});var cinemagharhdServicesModule=angular.module("cinemagharhdServices",[]);cinemagharhdServicesModule.factory("movieFactory",["$http",function(e){var t={},o=function(){return e.get("http://cinemagharhd.com/php/pull_movies.php?type=catagory&string=all").then(function(e){return t.array=e.data,e},function(e){console.log("error in cinemagharhdServices -> getAllMovies function")})};return{getAllMovies:o,getCachedMovies:t,getExclusiveMovies:function(){return e.get("http://cinemagharhd.com/php/pull_movies.php?type=catagory&string=exclusive")},getMovies:function(t){return e.get("http://cinemagharhd.com/php/pull_movies.php?type=catagory&string="+t)},getViewCount:function(t){return e.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+statistics&id="+t+"&maxResults=50&key=AIzaSyDnQc2xtPwYUgg5zuM_7FSU-2Z6iJAu_8c")},sendRatingToDb:function(t,o){var n=$.param({rating:t,movie_name:o});e({url:"http://cinemagharhd.com/php/submit_rating.php",data:n,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}})},getSliderImages:function(){return e.get("http://cinemagharhd.com/php/pull_slider_images_v2.php")},getCatagoryImages:function(){return e.get("http://cinemagharhd.com/php/getCatagoryImages.php")}}}]),cinemagharhdServicesModule.factory("YouTubeLoader",function(e,t){var o=document.createElement("script");o.src="https://www.youtube.com/iframe_api",o.async=!0;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n);var i=!1,a=e.defer();return t.onYouTubeIframeAPIReady=function(){i||(i=!0,a.resolve())},{load:a.promise}}),angular.module("tabSlideBox",[]).directive("onFinishRender",function(e){return{restrict:"A",link:function(t,o,n){t.$last===!0&&e(function(){t.$emit("ngRepeatFinished")})}}}).directive("tabSlideBox",["$timeout","$window","$ionicSlideBoxDelegate","$ionicScrollDelegate",function($timeout,$window,$ionicSlideBoxDelegate,$ionicScrollDelegate){"use strict";return{restrict:"A, E, C",link:function(e,t,o,n){function i(){var e=angular.element(r.querySelector(".tsb-icons")),t=e.find("a"),n=e[0].querySelector(".tsb-ic-wrp"),i=t.length;n.querySelector(".scroll");angular.forEach(t,function(e,t){var o=angular.element(e);o.on("click",function(){u.slide(t)}),o.attr("icon-off")&&o.attr("class",o.attr("icon-off"))});var l=o.tab;("undefined"==typeof o.tab||i<=l||l<0)&&(l=Math.floor(t.length/10)),0==l&&a(0),$timeout(function(){u.slide(l)},0)}function a(e){var t=angular.element(r.querySelector(".tsb-icons")),o=t.find("a"),n=t[0].querySelector(".tsb-ic-wrp"),i=(o.length,n.querySelector(".scroll")),a=t[0].offsetWidth/2,c=angular.element(o[e]),s=angular.element(t[0].querySelector(".active"));if(c&&c.length){var u=c[0].offsetWidth,g=c[0].offsetLeft;s.attr("icon-off")?s.attr("class",s.attr("icon-off")):s.removeClass("active"),c.attr("icon-on")&&c.attr("class",c.attr("icon-on")),c.addClass("active");var p=a-g-u/2+5;if(i){var f=n.offsetWidth,m=Math.abs(l(i.style.webkitTransform)),h=100,v=40;(m+f<g+u+v||m>g-h)&&(p>0&&(p=0),d.scrollTo(Math.abs(p),0,!0))}else var p=a-g-u/2+5+"px"}}function l(e){return e=e.replace("translate3d(",""),e=e.replace("translate(",""),parseInt(e)}var r=t[0],c=t;c.addClass("tabbed-slidebox"),"bottom"===o.tabsPosition&&c.addClass("btm");var s=r.querySelector(".slider").getAttribute("delegate-handle"),u=$ionicSlideBoxDelegate;s&&(u=u.$getByHandle(s));var d=$ionicScrollDelegate;s&&(d=d.$getByHandle(s));var g=e.events;g.on("slideChange",function(e){a(e.index)}),g.on("ngRepeatFinished",function(e){i()}),i()},controller:function($scope,$attrs,$element){$scope.events=new SimplePubSub,$scope.slideHasChanged=function(index){$scope.events.trigger("slideChange",{index:index}),$timeout(function(){$scope.onSlideMove&&$scope.onSlideMove({index:eval(index)})},100)},$scope.$on("ngRepeatFinished",function(e){$scope.events.trigger("ngRepeatFinished",{event:e})})}}}]);